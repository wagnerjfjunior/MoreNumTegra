#!/usr/bin/env node
// Coverage guard: a project must never lose existing structured data; enriched
// or modified schema must pass the full evidence-based contract. Legacy deficits
// are listed explicitly until their own product facts are approved.
import {readFileSync,readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const BASE='3acd0a9228ebaf4d368fba40052f1ff41c0cbca2';
const root='src-greenn/empreendimentos';
const slugs=readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name).filter(x=>{try{readFileSync(root+'/'+x+'/index.html');return true}catch{return false}}).sort();
function graph(s){return [...s.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>{const v=JSON.parse(m[1]);return v['@graph']||[v]})}
function type(n,t){return n['@type']===t||(Array.isArray(n['@type'])&&n['@type'].includes(t))}
const mustExist=['WebPage','ApartmentComplex'];
const enriched=['BreadcrumbList','ImageObject','Organization','ContactPoint','RealEstateAgent','Service','Product','Offer'];
const issues=[];
for(const slug of slugs){
 const path=root+'/'+slug+'/index.html';
 const now=graph(readFileSync(path,'utf8'));
 let base;try{base=graph(execFileSync('git',['show',BASE+':'+path],{encoding:'utf8',stdio:['ignore','pipe','ignore']}))}catch{base=[]}
 for(const req of mustExist)assert(now.some(n=>type(n,req)),slug+': missing essential '+req);
 for(const old of base){
   if(!old['@id'])continue;
   let newer=now.find(n=>n['@id']===old['@id']);
   if(!newer&&slug==='caminhos-da-lapa-elo-duo'&&old['@type']==='RealEstateAgent'&&old['@id']==='https://www.moretegra.com.br/#sabrina-real-estate-agent'){
     const id='https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#sabrina-atendimento';
     newer=now.find(n=>n['@id']===id&&n['@type']==='RealEstateAgent');
     assert(newer,'Elo Duo must replace global identity with exact local Realtor identity');
     const project=now.find(n=>n['@type']==='ApartmentComplex');
     assert.equal(newer.address?.streetAddress,project.address?.streetAddress,'Elo Duo on-site street mismatch');
     assert.equal(newer.address?.postalCode,project.address?.postalCode,'Elo Duo on-site CEP mismatch');
     assert.deepEqual(newer.geo,project.geo,'Elo Duo on-site verified coordinates mismatch');
     assert.equal(newer.image,old.image,'Elo Duo Realtor image changed');
     const restored={...newer,'@id':old['@id'],address:old.address,geo:old.geo};
     assert.deepEqual(restored,old,'Elo Duo Realtor has unintended changes besides scoped identity/location');
   }
   assert(newer,slug+': schema entity deleted: '+old['@type']+' '+old['@id']);
 }
 const beforeTypes=new Set(base.map(n=>n['@type']));
 const currentTypes=new Set(now.map(n=>n['@type']));
 // Count alone is never the Google rich-result count. This detects concrete
 // missing commercial schema and uses hard gates for explicitly upgraded pages.
 const absent=enriched.filter(t=>!currentTypes.has(t));
 const hardGate=slug==='universo-tatuape-orbita';
 if(hardGate)for(const required of enriched)assert(currentTypes.has(required),slug+': REQUIRED structured entity missing: '+required);
 for(const t of beforeTypes)assert(currentTypes.has(t),slug+': structured entity type regressed: '+t);
 const product=now.find(n=>type(n,'Product')),offer=now.find(n=>type(n,'Offer'));
 if(product&&offer){
   assert(product.offers,slug+': Product.offers missing');
   const target=typeof product.offers==='object'?product.offers['@id']:null;
   assert(target===offer['@id']||typeof product.offers==='object'&&product.offers['@type']==='Offer',slug+': Product.offers must link Offer');
   assert(offer.priceCurrency==='BRL'||!offer.price,slug+': price currency must be BRL');
 }
 if(hardGate)assert(product&&offer,slug+': commercially upgraded page must have paired Product + Offer');
 if(now.length<8||absent.length){
   issues.push({slug,entities:now.length,missing:absent.join(', '),legacy:!hardGate});
 }
 console.log('COVERAGE',slug,now.length,'nodes',hardGate?'STRICT':'BASELINE_PROTECTED');
}
console.log('\nLEGACY COVERAGE AUDIT (missing types are NOT fabricated):');
for(const x of issues.filter(x=>x.legacy))console.log('DEBT',x.slug,'nodes='+x.entities,'missing='+x.missing);
console.log('DEBT_SUMMARY',JSON.stringify({projectPages:slugs.length,pagesWithLessThanEightEntities:slugs.filter(slug=>issues.some(x=>x.slug===slug&&x.entities<8)).length,legacyCoverageFindings:issues.filter(x=>x.legacy).length}));
assert.equal(slugs.length,25,'Expected 25 project pages; catalog expansion requires updating the audited scope');
console.log('PASS: no schema removals/regressions in 25 project pages, Orbita commercial coverage strict, legacy shortfalls reported');
