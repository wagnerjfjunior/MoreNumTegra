#!/usr/bin/env node
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const path='src-greenn/empreendimentos/bem-moema/index.html';
const baseline='b5da71bf80cacc115026466f5b37c79a7f98e13c';
const before=execFileSync('git',['show',baseline+':'+path],{encoding:'utf8'});
const after=readFileSync(path,'utf8'),rx=/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i;
const old=before.match(rx),now=after.match(rx);
assert(old&&now);
assert.equal(after.replace(now[1],old[1]),before,'Visible HTML/JS, form, metadata and media must not change');
const original=JSON.parse(old[1])['@graph'],nodes=JSON.parse(now[1])['@graph'];
const get=t=>nodes.filter(x=>x['@type']===t),one=t=>{assert.equal(get(t).length,1,t+' count');return get(t)[0]};
const p=one('WebPage'),project=one('ApartmentComplex'),agent=one('RealEstateAgent');
const route='https://www.moretegra.com.br/empreendimentos/bem-moema/';
assert.equal(nodes.length,18);
assert.equal(one('WebSite')['@id'],'https://www.moretegra.com.br/#website');
assert.equal(p['@id'],route+'#webpage');
assert.equal(p.mainEntity['@id'],route+'#project');
assert.equal(p.breadcrumb['@id'],route+'#breadcrumb');
assert.equal(p.isPartOf['@id'],one('WebSite')['@id']);
assert.equal(project['@id'],route+'#project');
assert(!Object.hasOwn(project,'brand'),'ApartmentComplex.brand is not Schema.org-compatible');
assert.equal(one('Product').brand?.['@id'],one('Brand')['@id']);
assert.equal(one('Organization').brand?.['@id'],one('Brand')['@id']);
assert.deepEqual(one('Product').isRelatedTo,{'@id':project['@id']},'AP0202 must link to its own project');
assert.equal(new Set(project.image.map(x=>typeof x==='string'?x:JSON.stringify(x))).size,project.image.length,'Duplicate project image forbidden');
assert.deepEqual(agent.address,project.address,'Agent serves in loco');
assert.equal(one('Person').workLocation['@id'],project['@id']);
assert.equal(one('Person').worksFor['@id'],one('Organization')['@id']);
assert.equal(one('Service').broker['@id'],one('Person')['@id']);
assert.equal(one('Service').provider['@id'],one('Organization')['@id']);
assert.deepEqual(p.image,original.find(x=>x['@type']==='WebPage').image,'Image hierarchy preserved');
assert.equal(p.primaryImageOfPage['@id'],route+'#primary-image');
const source=after.match(/const ps=\[(\["80 m²"[\s\S]*?)\],pt=document\.querySelector/);
assert(source,'Plant viewer data absent');
const assets=[...source[1].matchAll(/\["(\d+) m²","Planta tipo oficial de \d+ m²\.","\d+ m²","(https:[^"]+)"\]/g)].map(m=>[Number(m[1]),m[2]]);
assert.equal(assets.length,3);
assert.deepEqual(assets.map(x=>x[0]),[80,123,148]);
const plans=get('FloorPlan');
assert.equal(plans.length,3);
assert.deepEqual(project.accommodationFloorPlan,assets.map(([sqm])=>({'@id':route+'#floorplan-'+sqm})));
for(const [sqm,url] of assets){const x=plans.find(n=>n['@id']===route+'#floorplan-'+sqm);assert(x);assert.equal(x.image,url);assert.equal(x.floorSize?.value,sqm);assert.equal(x.floorSize?.unitCode,'MTK');}
for(const oldNode of original){
 const curr=nodes.find(n=>n['@type']===oldNode['@type']&&(!oldNode['@id']||n['@id']===oldNode['@id']));
 assert(curr,'Old type missing '+oldNode['@type']);
 const allowed=oldNode['@type']==='WebPage'?['@id','isPartOf','mainEntity','breadcrumb','inLanguage','mentions']:oldNode['@type']==='ApartmentComplex'?['@id','brand','accommodationFloorPlan','image']:oldNode['@type']==='Organization'?['url','brand','contactPoint']:oldNode['@type']==='Product'?['isRelatedTo']:[];
 const normalized=structuredClone(curr);
 for(const k of allowed){if(Object.hasOwn(oldNode,k))normalized[k]=structuredClone(oldNode[k]);else delete normalized[k];}
 assert.deepEqual(normalized,oldNode,'Unexpected delta in '+oldNode['@type']);
}
assert.equal(one('Offer').price,'1811200.00');
assert(!('availability' in one('Offer')));
console.log('PASS Bem Moema 18-node factual Orbita-pattern parity: 3 source-backed plans; unchanged media, forms, price, and onsite agent');
