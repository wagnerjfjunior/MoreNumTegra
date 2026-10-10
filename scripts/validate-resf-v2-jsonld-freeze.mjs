#!/usr/bin/env node
// Only permitted JSON-LD deltas versus frozen main baseline.
// Usage: node scripts/validate-resf-v2-jsonld-freeze.mjs [project-page-path...]
// Does not mutate files. Strictly compares every entity and field other than approved image links.
import fs from 'node:fs';
import cp from 'node:child_process';
import assert from 'node:assert/strict';
const BASELINE='9c8bdc74cb83dc9c9566f87d9288daf25f10c051';
const manifest=JSON.parse(fs.readFileSync('docs/resf-v2/data/APPROVED_HERO_IMAGES_2026-10-10.json','utf8'));
const approved=new Map(manifest.approved.map(x=>[x.route,x.heroUrl]));
const known16=new Set([
 '/empreendimentos/ampere-brooklin/','/empreendimentos/ode-perdizes/','/empreendimentos/teg-sacoma/',
 '/empreendimentos/tiel-vila-nova-conceicao/','/empreendimentos/universo-tatuape-orbita/',
 '/regioes/alto-do-ipiranga/','/regioes/brooklin/','/regioes/chacara-klabin/',
 '/regioes/cidade-jardim/','/regioes/itaim-bibi/','/regioes/jardins/','/regioes/moema/',
 '/regioes/perdizes/','/regioes/sacoma/','/regioes/tatuape/','/regioes/vila-nova-conceicao/'
]);
const aria='/empreendimentos/aria-higienopolis/';
function graph(html){
 const blocks=[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
 return blocks.flatMap(m=>{const parsed=JSON.parse(m[1]);return Array.isArray(parsed)?parsed:Array.isArray(parsed['@graph'])?parsed['@graph']:[parsed]});
}
function copy(o){return structuredClone(o)}
function types(nodes){return nodes.map(n=>JSON.stringify(n['@type'])).sort()}
function normalized(nodes,mode){
 return nodes.map(n=>{
  const x=copy(n);
  if(mode==='16'){
   if(x['@type']==='WebPage'){delete x.image;delete x.primaryImageOfPage}
   if(x['@type']==='ApartmentComplex' && x['@id']?.startsWith('https://www.moretegra.com.br'+currentRoute)){delete x.image}
   if(x['@type']==='ImageObject'&&x['@id']==='https://www.moretegra.com.br'+currentRoute+'#primary-image')return null;
  }else if(mode==='aria' && x['@type']==='ImageObject' && x['@id']==='https://www.moretegra.com.br'+aria+'#primary-image'){
   delete x.contentUrl;delete x.caption;
  }
  return x;
 }).filter(Boolean);
}
let currentRoute='';
const paths=process.argv.slice(2);
if(!paths.length)throw Error('Supply exact paths to validate');
for(const filepath of paths){
 currentRoute='/'+filepath.replace(/^src-greenn\//,'').replace(/index\.html$/,'');
 assert(known16.has(currentRoute)||currentRoute===aria,'Unexpected protected route: '+currentRoute);
 const url=approved.get(currentRoute);
 assert(url,'No owner-approved hero mapping: '+currentRoute);
 const previous=cp.execFileSync('git',['show',BASELINE+':'+filepath],{encoding:'utf8'});
 const proposed=fs.readFileSync(filepath,'utf8');
 const oldNodes=graph(previous),newNodes=graph(proposed);
 const is16=known16.has(currentRoute);
 assert.equal(newNodes.length,oldNodes.length+(is16?1:0),currentRoute+' entity count changed');
 if(is16)assert.deepEqual(types(newNodes),[...types(oldNodes),JSON.stringify('ImageObject')].sort(),currentRoute+' entity types changed');
 else assert.deepEqual(types(newNodes),types(oldNodes),currentRoute+' entity types changed');
 assert.deepEqual(normalized(newNodes,is16?'16':'aria'),normalized(oldNodes,is16?'16':'aria'),currentRoute+' non-image JSON-LD contract changed');
 const page=newNodes.find(x=>x['@type']==='WebPage');
 const image=newNodes.find(x=>x['@type']==='ImageObject'&&x['@id']==='https://www.moretegra.com.br'+currentRoute+'#primary-image');
 assert(page&&image,currentRoute+' page/image missing');
 assert.equal(page.primaryImageOfPage?.['@id'],image['@id'],currentRoute+' primary ref');
 assert.equal(image.contentUrl,url,currentRoute+' approved image');
 if(is16){
  assert.equal(page.image?.['@id'],image['@id'],currentRoute+' page image');
  const oldProject=oldNodes.find(x=>x['@type']==='ApartmentComplex'&&x['@id']?.startsWith('https://www.moretegra.com.br'+currentRoute));
  const newProject=newNodes.find(x=>x['@type']==='ApartmentComplex'&&x['@id']?.startsWith('https://www.moretegra.com.br'+currentRoute));
  if(oldProject&&!oldProject.image)assert.equal(newProject.image?.['@id'],image['@id']);
 }else{
  const product=newNodes.find(x=>x['@type']==='Product'),project=newNodes.find(x=>x['@type']==='ApartmentComplex');
  assert.equal(product?.image?.['@id'],image['@id']);assert.equal(project?.image?.['@id'],image['@id']);
 }
 console.log('JSONLD_FROZEN_PASS',currentRoute,'oldEntities='+oldNodes.length,'newEntities='+newNodes.length);
}
console.log('JSONLD_CONTRACT_FREEZE_PASS: '+paths.length+' routes. Baseline '+BASELINE);
