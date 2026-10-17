#!/usr/bin/env node
// RESF V2: source-only search-image ownership audit, no mutations.
import { readFile,writeFile,mkdir } from 'node:fs/promises';
import path from 'node:path';
const manifest=JSON.parse(await readFile('docs/resf-v2/data/APPROVED_HERO_IMAGES_2026-10-10.json','utf8'));
const out=process.argv[2];
const pat=/^https?:\/\//;
const cap=(html,k,attribute='property')=>{
 const tags=[...html.matchAll(/<meta\b[^>]*>/gi)].map(x=>x[0]);
 for(const tag of tags){
  const attrs=Object.fromEntries([...tag.matchAll(/([-\w:]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(x=>[x[1].toLowerCase(),x[2]??x[3]]));
  if(attrs[attribute]===k)return attrs.content??null;
 }
 return null;
};
const list=(html)=>[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(x=>JSON.parse(x[1]));
const urlOf=(node,index)=> {
 if(typeof node==='string')return pat.test(node)?node:null;
 if(Array.isArray(node))return node.map(x=>urlOf(x,index)).find(Boolean)??null;
 if(!node||typeof node!=='object')return null;
 if(node['@id']&&index.has(node['@id']))return urlOf(index.get(node['@id'])===node ? {...node,'@id':null} : index.get(node['@id']),index);
 return urlOf(node.contentUrl,index)||urlOf(node.url,index)||urlOf(node.image,index)||null;
};
const rows=[];
for(const approved of manifest.approved){
 const kind=approved.route.startsWith('/regioes/')?'region':'project';
 const file='src-greenn/'+approved.route.slice(1)+'index.html';
 const html=await readFile(file,'utf8');
 const nodes=[];
 for(const doc of list(html)){
  if(Array.isArray(doc['@graph']))nodes.push(...doc['@graph']);
  else if(Array.isArray(doc))nodes.push(...doc);
  else nodes.push(doc);
 }
 const index=new Map(nodes.filter(n=>n&&n['@id']).map(n=>[n['@id'],n]));
 const page=nodes.find(x=>([]).concat(x?.['@type']).includes('WebPage'));
 const imageObject=nodes.find(x=>([]).concat(x?.['@type']).includes('ImageObject')&&x['@id']===page?.primaryImageOfPage?.['@id']);
 const product=nodes.find(x=>([]).concat(x?.['@type']).includes('Product'));
 const project=nodes.find(x=>([]).concat(x?.['@type']).includes('ApartmentComplex')&&x['@id']?.startsWith('https://www.moretegra.com.br'+approved.route));
 const place=nodes.find(x=>([]).concat(x?.['@type']).includes('Place'));
 const heroTag=(html.match(/<section\b[^>]*class=["'][^"']*\bhero\b[^"']*["'][^>]*>[\s\S]{0,9500}?<\/section>/i)||[])[0]||'';
 const heroSrc=(heroTag.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)||[])[1]||null;
 const og=cap(html,'og:image');
 const twitter=cap(html,'twitter:image','name');
 const primary=urlOf(page?.primaryImageOfPage,index);
 const pageImage=urlOf(page?.image,index);
 const objectImage=urlOf(imageObject,index);
 const productImage=urlOf(product?.image,index);
 const projectImage=urlOf(project?.image,index);
 const placeImage=urlOf(place?.image,index);
 const primaryType=page?.['@type'];
 const errors=[];
 for(const [key,v] of [['og',og],['twitter',twitter],['primary',primary],['ImageObject',objectImage]]){
  if(v!==approved.heroUrl)errors.push(key+'_NOT_APPROVED_URL');
 }
 if(page?.image&&pageImage!==approved.heroUrl)errors.push('WEBPAGE_IMAGE_NOT_APPROVED_URL');
 if(product&&productImage!==approved.heroUrl)errors.push('PRODUCT_IMAGE_NOT_APPROVED_URL');
 if(project&&projectImage!==approved.heroUrl)errors.push('APARTMENT_COMPLEX_IMAGE_NOT_APPROVED_URL');
 if(place&&placeImage!==approved.heroUrl)errors.push('PLACE_IMAGE_NOT_APPROVED_URL');
 if(heroSrc&&heroSrc!==approved.heroUrl)errors.push('HERO_IMAGE_NOT_APPROVED_URL');
 if(!heroSrc)errors.push('HERO_IMAGE_NOT_RECOGNIZED');
 if(!page)errors.push('WEBPAGE_MISSING');
 if(!imageObject)errors.push('PRIMARY_IMAGE_OBJECT_NOT_RESOLVED');
 const agentImages=nodes.filter(x=>['Person','RealEstateAgent'].some(type=>[].concat(x?.['@type']).includes(type))).map(x=>urlOf(x.image,index)).filter(Boolean);
 const competing=agentImages.some(x=>x===primary||x===og||x===objectImage);
 if(competing)errors.push('PERSON_IMAGE_AS_PAGE_PRIMARY');
 rows.push({route:approved.route,file,kind,approved:approved.heroUrl,hero:heroSrc,og,twitter,primary,pageImage,imageObject:objectImage,productImage,projectImage,placeImage,
  hasAgentImages:agentImages.length>0,agentCompeting:competing,errors});
}
const totals={routes:rows.length,clean:rows.filter(r=>!r.errors.length).length,review:rows.filter(r=>r.errors.length).length,
 withPersonImages:rows.filter(r=>r.hasAgentImages).length,personImageAsPrimary:rows.filter(r=>r.agentCompeting).length};
const report={schema:'resf-v2-search-image-ownership-v1',source:'GitHub HTML files',scope:'36 owner-approved routes; no HTTP or rendered DOM',totals,rows};
console.log(JSON.stringify(totals));
for(const row of rows.filter(r=>r.errors.length))console.log(JSON.stringify({route:row.route,errors:row.errors}));
if(out){await mkdir(path.dirname(out),{recursive:true});await writeFile(out,JSON.stringify(report,null,2)+'\n')}
