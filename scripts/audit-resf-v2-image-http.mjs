#!/usr/bin/env node
// Read-only network probe. Never mutates media, source pages or deployments.
// Probe is supporting evidence: HTTP 200 is not image-quality/ownership approval.
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const input=process.argv[2],out=process.argv[3];
if(!input)throw Error('Expected media audit JSON path');
const report=JSON.parse(await readFile(input,'utf8'));
const targets=new Map();
for(const row of report.rows.filter(r=>r.scope==='IN_SCOPE')){
  const candidates=[['hero',row.media.heroSrc],['og',row.media.og],['twitter',row.media.twitter],
    ...row.media.jsonLdPrimary.map(x=>['jsonLdPrimary',x])];
  for(const [role,url] of candidates){
    if(!url || !/^https:\/\//i.test(url))continue;
    if(!targets.has(url))targets.set(url,new Set());
    targets.get(url).add(row.route+' '+role);
  }
}
const urls=[...targets.keys()],data=[];
let next=0;
async function probe(url){
  const ctrl=new AbortController(),timeout=setTimeout(()=>ctrl.abort(),10000);
  const result={url,roles:[...targets.get(url)],status:'INCONCLUSIVE',httpStatus:null,mime:null,method:null};
  try{
    for(const method of ['HEAD','GET']){
      try{
        const response=await fetch(url,{method,headers:method==='GET'?{'Range':'bytes=0-0'}:{},redirect:'follow',signal:ctrl.signal});
        result.httpStatus=response.status;
        result.mime=(response.headers.get('content-type')||'').split(';')[0];
        result.method=method;
        if(response.ok && result.mime.startsWith('image/')){
          result.status='IMAGE_HTTP_OK';await response.body?.cancel();break;
        }
        await response.body?.cancel();
        if(method==='HEAD' && [403,405,406,429,500,501,502,503].includes(response.status))continue;
        if(method==='HEAD' && response.ok && !result.mime.startsWith('image/'))continue;
        break;
      }catch(e){result.reason=String(e).slice(0,120);if(method==='GET')break;}
    }
    if(result.status==='INCONCLUSIVE' && result.httpStatus===404)result.status='HTTP_404';
    else if(result.status==='INCONCLUSIVE' && result.httpStatus && result.httpStatus>=400)result.status='HTTP_REVIEW';
  }finally{clearTimeout(timeout);}
  return result;
}
const workers=Array.from({length:5},async()=>{
  while(next<urls.length){
    const url=urls[next++];
    try{data.push(await probe(url));}
    catch(e){data.push({url,roles:[...targets.get(url)],status:'INCONCLUSIVE',reason:String(e).slice(0,120)});}
  }
});
await Promise.all(workers);
data.sort((a,b)=>a.url.localeCompare(b.url));
const metrics={uniqueHttpsImages:data.length,ok:data.filter(x=>x.status==='IMAGE_HTTP_OK').length,
  http404:data.filter(x=>x.status==='HTTP_404').length,
  otherReview:data.filter(x=>x.status==='HTTP_REVIEW').length,
  inconclusive:data.filter(x=>x.status==='INCONCLUSIVE').length};
const result={schema:'resf-v2-image-http-check-v1',scope:'IN_SCOPE_ONLY',generatedAt:new Date().toISOString(),metrics,results:data};
if(out){await mkdir(path.dirname(out),{recursive:true});await writeFile(out,JSON.stringify(result,null,2)+'\n');}
console.log('IMAGE_HTTP_TOTALS '+JSON.stringify(metrics));
for(const x of data.filter(x=>x.status!=='IMAGE_HTTP_OK'))console.log('IMAGE_HTTP_REVIEW '+JSON.stringify({url:x.url,status:x.status,httpStatus:x.httpStatus,mime:x.mime,roles:x.roles,reason:x.reason}));
