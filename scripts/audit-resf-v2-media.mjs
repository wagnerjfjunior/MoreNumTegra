#!/usr/bin/env node
// MNT-SEARCH-IMAGE-AUDIT-01: source-only media ownership, NO runtime mutation.
// This does not verify published image availability, Google thumbnails, approvals, or SERP.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const ROOT = path.resolve('src-greenn');
const excluded = new Set(['empreendimentos/dsg-itaim/index.html','empreendimentos/capiitolo-piero-lissoni/index.html']);
const out = process.argv[2] && path.resolve(process.argv[2]);
const markdown = process.argv[3] && path.resolve(process.argv[3]);
async function walk(dir) {
  const all=[];
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    const file=path.join(dir,entry.name);
    if(entry.isDirectory())all.push(...await walk(file));
    else if(entry.isFile() && entry.name==='index.html')all.push(file);
  }
  return all;
}
function attribute(tag,name){
  const match=new RegExp('(?:^|\\s)'+name+'\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))','i').exec(tag||'');
  return match ? match[1]??match[2]??match[3]??null : null;
}
function tags(str,name){return [...str.matchAll(new RegExp('<'+name+'\\b[^>]*>','gi'))].map(m=>m[0]);}
function meta(str,key,attr='name'){
  const t=tags(str,'meta').find(n=>attribute(n,attr)?.toLowerCase()===key.toLowerCase());
  return t?attribute(t,'content'):null;
}
function urls(v,output=new Set(),depth=0){
  if(depth>14||v==null)return output;
  if(typeof v==='string') {
    if(/^(https?:\/\/|\/)/.test(v) && !v.startsWith('/#'))output.add(v);
  }else if(Array.isArray(v)){for(const x of v)urls(x,output,depth+1);}
  else if(typeof v==='object'){
    // Only image URL-bearing keys: avoid treating schema entity URLs as images.
    for(const [k,x] of Object.entries(v))if(['url','contentUrl','image','thumbnailUrl','logo'].includes(k))urls(x,output,depth+1);
  }
  return output;
}
function scanSchema(html) {
  const blocks=[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const primary=new Set(), imageNodes=new Set(), personImages=new Set(), errors=[];
  function explore(value,depth=0){
    if(depth>20 || !value || typeof value!=='object')return;
    if(Array.isArray(value)){value.forEach(x=>explore(x,depth+1));return;}
    if(value.primaryImageOfPage)urls(value.primaryImageOfPage,primary);
    const types=[value['@type']].flat().filter(Boolean);
    if(types.includes('ImageObject'))urls(value,imageNodes);
    if(types.includes('Person') || types.includes('RealEstateAgent'))urls(value.image,personImages);
    Object.values(value).forEach(x=>explore(x,depth+1));
  }
  for(const block of blocks)try{explore(JSON.parse(block[1]));}catch(e){errors.push('JSON_PARSE_FAILED');}
  return {primary:[...primary],imageObjects:[...imageNodes],person:[...personImages],errors,blockCount:blocks.length};
}
function imageTags(html){
  return tags(html,'img').map(t=>({src:attribute(t,'src'),srcset:attribute(t,'srcset'),alt:attribute(t,'alt'),className:attribute(t,'class')||'',loading:attribute(t,'loading'),fetchpriority:attribute(t,'fetchpriority')}));
}
function heroInfo(html){
  const m=/<(?:section|header|div)\b[^>]*class=["'][^"']*(?:\bhero\b|\bmt-hero\b)[^"']*["'][^>]*>/i.exec(html);
  if(!m)return {detected:false,images:[],cssBackgroundCandidate:false,video:false};
  // Extract a bounded section after first hero opening (nested tags make regex balancing unsafe).
  const section=html.slice(m.index,m.index+9000);
  const next=/<\/section\s*>/i.exec(section);
  const candidate=next?section.slice(0,next.index+next[0].length):section;
  const imgs=imageTags(candidate).slice(0,5);
  const backgrounds=[...candidate.matchAll(/(?:background-image|background)\s*:[^;{}]*url\(([^)]+)\)/gi)].map(x=>x[1]);
  return {detected:true,images:imgs,cssBackgroundCandidate:backgrounds.length>0,backgrounds,
    video:/<video\b/i.test(candidate),hasPicture:/<picture\b/i.test(candidate)};
}
const rows=[];
for(const file of (await walk(ROOT)).sort()){
  const relative=path.relative(ROOT,file).split(path.sep).join('/');
  const kind=relative.startsWith('empreendimentos/')?'exact-project':relative.startsWith('regioes/')?'region':'support';
  if(kind==='support')continue;
  const scope=excluded.has(relative)?'EXCLUDED_FROM_RESF_V2':'IN_SCOPE';
  const html=await readFile(file,'utf8');
  const h=heroInfo(html),schema=scanSchema(html);
  const og=meta(html,'og:image','property'),twitter=meta(html,'twitter:image');
  const all=imageTags(html);
  const firstHero=h.images.find(x=>x.src)?.src||null;
  const imageSignals=[];
  if(!og)imageSignals.push('OG_IMAGE_MISSING_SOURCE');
  if(!twitter)imageSignals.push('TWITTER_IMAGE_MISSING_SOURCE');
  if(og&&twitter&&og!==twitter)imageSignals.push('OG_TWITTER_DIFFERENCE_REVIEW');
  if(!h.detected)imageSignals.push('HERO_STRUCTURE_UNRECOGNIZED');
  if(h.detected&&!h.images.length&&!h.cssBackgroundCandidate)imageSignals.push('HERO_IMAGE_NOT_FOUND_IN_SOURCE_WINDOW');
  if(h.detected&&h.images.length>1)imageSignals.push('MULTIPLE_HERO_IMAGES_REVIEW');
  if(h.images.some(x=>x.loading==='lazy'))imageSignals.push('LAZY_HERO_REVIEW');
  if(schema.errors.length)imageSignals.push('JSON_LD_PARSE_REVIEW');
  if(!schema.primary.length)imageSignals.push('JSON_LD_PRIMARY_IMAGE_ABSENT_REVIEW');
  if(schema.primary.length&&og&&!schema.primary.includes(og))imageSignals.push('OG_SCHEMA_PRIMARY_DIVERGENCE_REVIEW');
  if(firstHero&&og&&firstHero!==og)imageSignals.push('HERO_OG_DIFFERENCE_REVIEW');
  if(schema.person.some(v=>!schema.primary.includes(v)&&v!==og&&v!==firstHero))imageSignals.push('PERSON_IMAGE_PRESENT_REVIEW');
  const route='/'+relative.replace(/index\.html$/,'');
  rows.push({route,source:relative,pageType:kind,scope,media:{
      heroDetected:h.detected,heroSrc:firstHero,heroImages:h.images,heroHasPicture:h.hasPicture||false,
      heroVideo:h.video||false,cssBackgroundCandidate:h.cssBackgroundCandidate||false,
      og,twitter,jsonLdPrimary:schema.primary,jsonLdImageObjects:schema.imageObjects,
      personImages:schema.person,imageTagCount:all.length,
      imageTagsMissingAlt:all.filter(x=>x.alt===null).length},
    signals:scope==='IN_SCOPE'?imageSignals:[],
    observation:scope==='IN_SCOPE'?'SOURCE_ONLY_NOT_APPROVAL_OR_LIVE':'EXCLUDED_NO_MIGRATION_OR_MEDIA_CHANGE'});
}
const active=rows.filter(x=>x.scope==='IN_SCOPE');
const metrics={
  allCommercialSources:rows.length,inScope:active.length,excluded:rows.length-active.length,
  exactProjects:active.filter(x=>x.pageType==='exact-project').length,
  regions:active.filter(x=>x.pageType==='region').length,
  withSourceReviewSignals:active.filter(x=>x.signals.length).length,
  withoutOg:active.filter(x=>!x.media.og).length,
  withoutTwitter:active.filter(x=>!x.media.twitter).length,
  withoutJsonLdPrimary:active.filter(x=>!x.media.jsonLdPrimary.length).length,
  withPersonImages:active.filter(x=>x.media.personImages.length).length,
  heroSourceUnrecognized:active.filter(x=>!x.media.heroDetected).length,
  withoutHeroSourceImage:active.filter(x=>!x.media.heroSrc).length
};
const report={schema:'mnt-search-image-audit-source-v1',generatedAt:new Date().toISOString(),
  basis:'SOURCE_ONLY_NO_HTTP_NO_GOOGLE_PROCESSING',approvedMediaNotInferred:true,metrics,rows};
if(out){await mkdir(path.dirname(out),{recursive:true});await writeFile(out,JSON.stringify(report,null,2)+'\n');}
else process.stdout.write(JSON.stringify(report,null,2)+'\n');
if(markdown){
  const table=['# RESF 2.0 — Media ownership audit','','Source inspection only. No approved changes; URLs need live checks and visual approval.','',
    '| URL | Scope | Hero | OG | Twitter | JSON-LD primary | Person | Review signals |',
    '|---|---|---|---|---|---|---|---|',
    ...rows.map(r=>'| '+r.route+' | '+r.scope+' | '+(r.media.heroSrc||'REVIEW')+
      ' | '+(r.media.og||'MISSING')+' | '+(r.media.twitter||'MISSING')+
      ' | '+(r.media.jsonLdPrimary.join('; ')||'NOT_DETECTED')+
      ' | '+(r.media.personImages.join('; ')||'none detected')+
      ' | '+(r.signals.join('; ')||'none static')+' |'),
    '','## Notes',
    '- A different hero and OG image can be intentional and approved; do not enforce equality.',
    '- Person/RealEstateAgent schema is not proof the photo competes in Google Search.',
    '- Missing JSON-LD primaryImageOfPage is not necessarily an error for every page type.',
    '- Google thumbnail selection cannot be promised.',
    '- No binary image fetch, dimensions, actual mobile source selection, or live HTTP verification performed.',
    '- Excluded pages are listed solely for audit traceability, not remediation.',''];
  await mkdir(path.dirname(markdown),{recursive:true});
  await writeFile(markdown,table.join('\n')+'\n');
}
