#!/usr/bin/env node
// Freeze original JSON-LD graph, allowing ONLY user-approved apartment complex PostalAddress.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const BASE='9c8bdc74cb83dc9c9566f87d9288daf25f10c051';
const expected=[
 ['ampere-brooklin','Rua André Ampére, 136','04562-080'],
 ['aria-higienopolis','Rua Coronel José Eusébio, 145','01239-030'],
 ['ayla-moema-studio-office','Avenida Chibarás, 75','04076-000'],
 ['bem-moema-studios-offices','Alameda dos Arapanés, 1241','04524-002'],
 ['bem-moema','Avenida Bem-te-vi, 221','04524-030'],
 ['bueno-brandao-257','Rua Bueno Brandão, 257','04509-021'],
 ['caminhos-da-lapa-elo-duo','Rua Fortunato Ferraz, 851','05093-000'],
 ['chateau-jardin','Rua Ministro Nelson Hungria, 400','05690-050'],
 ['chez-vous-moema','Avenida Rouxinol, 1017','04516-001'],
 ['garden-design','Rua Fortunato Ferraz, 625','05093-000'],
 ['key-moema','Avenida dos Imarés, 160','04085-000'],
 ['ledge-brooklin','Avenida Nova Independência, 110','04570-000'],
 ['mozae-higienopolis','Rua Conselheiro Brotero, 832','01232-010'],
 ['nova-vivere','Rua Fortunato Ferraz, 625','05093-000'],
 ['ode-perdizes','Rua Bartira, 856','05009-000'],
 ['reserva-caminhos-da-lapa','Rua Fortunato Ferraz, 280','05093-000'],
 ['soma-perdizes','Avenida Sumaré, 179','05016-090'],
 ['teg-sacoma','Rua Malvina Ferrara Samarone, 195','04279-035'],
 ['tiel-vila-nova-conceicao','Rua Jacques Félix, 309','04509-001'],
 ['universo-tatuape-orbita','Avenida Celso Garcia, 5040','03064-000'],
 ['viso-moema','Avenida Lavandisca, 627','04515-011'],
 ['ypy-alto-do-ipiranga','Rua Marquês de Olinda, 336','04277-000'],
 ['zahle-jardins','Rua Osório Duque Estrada, 40','04001-120']
];
function documents(html){return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m=>JSON.parse(m[1]))}
function flat(ds){return ds.flatMap(x=>x['@graph']||[x])}
function scrub(ds) {
 return ds.map(d=>{
  const x=structuredClone(d);
  const graph=x['@graph']||[x];
  for(const n of graph){
   if(n['@type']==='ApartmentComplex'){
     delete n.address;
     if(n['@id']==='https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#project')delete n.geo;
   }
  }
  return x;
 });
}
function normalizeOnsiteAgent(ds,originalDs,slug) {
 const copy=structuredClone(ds),current=flat(copy),baseline=flat(originalDs);
 const agent=current.find(n=>n['@type']==='RealEstateAgent');
 const prior=baseline.find(n=>n['@type']==='RealEstateAgent');
 if(!agent){assert(!prior,slug+': legacy RealEstateAgent removed');return copy}
 assert(prior,slug+': unexpected new RealEstateAgent');
 const project=current.find(n=>n['@type']==='ApartmentComplex');
 assert(project?.address?.streetAddress,slug+': project location missing');
 const address=agent.address;
 assert(address?.['@type']==='PostalAddress',slug+': onsite realtor address missing');
 for(const k of ['streetAddress','addressLocality','addressRegion'])assert.equal(address[k],project.address[k],slug+': onsite address '+k+' mismatch');
 assert.equal(typeof address.addressCountry==='string'?address.addressCountry:address.addressCountry?.name,
 typeof project.address.addressCountry==='string'?project.address.addressCountry:project.address.addressCountry?.name,slug+': country mismatch');
 if(project.address.postalCode)assert.equal(address.postalCode,project.address.postalCode,slug+': on-site postal code mismatch');
 else if(prior.address?.postalCode)assert.equal(address.postalCode,prior.address.postalCode,slug+': existing postal code must remain');
 assert.equal(agent.image,prior.image,slug+': commercial portrait must remain');
 const originalId=prior['@id'];
 if(slug==='caminhos-da-lapa-elo-duo'){
  const siteId='https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#sabrina-atendimento';
  assert.equal(agent['@id'],siteId,'Elo Duo must not reuse global Home RealEstateAgent @id for different on-site location');
  assert.deepEqual(agent.geo,project.geo,'Elo Duo realtor geo must use user-confirmed project geo');
  for(const node of current)if(node['@type']==='Service'&&node.provider?.['@id']===siteId)node.provider['@id']=originalId;
 }else assert.equal(agent['@id'],originalId,slug+': agent entity identity changed');
 const locationIndex=current.indexOf(agent);const restored=structuredClone(prior);current[locationIndex]=restored;
 for(const doc of copy)if(doc['@graph']){const idx=doc['@graph'].findIndex(x=>x===agent);if(idx>=0)doc['@graph'][idx]=restored}
 return copy;
}
function stripApprovedImages(ds,baselineDs,slug,html){
 const nodes=flat(ds),before=flat(baselineDs);
 const route='https://www.moretegra.com.br/empreendimentos/'+slug+'/';
 const main=html.slice(html.indexOf('<main'),html.indexOf('</main>')+7);
 const imgs=[...main.matchAll(/<img\b[^>]*>/gi)].slice(0,2).map(m=>({src:(m[0].match(/\bsrc=["']([^"']+)/)||[])[1],alt:(m[0].match(/\balt=["']([^"']*)/)||[])[1]}));
 assert.equal(imgs.length,2,slug+': two visible images required');
 assert(imgs[0].src&&imgs[1].src&&imgs[0].src!==imgs[1].src,slug+': primary/secondary source must be distinct');
 const page=nodes.find(n=>n['@type']==='WebPage');
 const oldPage=before.find(n=>n['@id']===page?.['@id']);
 const primary=nodes.find(n=>n['@id']===route+'#primary-image');
 const secondary=nodes.find(n=>n['@id']===route+'#secondary-image');
 assert(page&&oldPage&&primary&&secondary,slug+': image nodes/page missing');
 assert.equal(primary['@type'],'ImageObject');
 assert.equal(secondary['@type'],'ImageObject');
 assert.equal(primary.contentUrl,imgs[0].src,slug+': primary URL differs from visible hero');
 assert.equal(secondary.contentUrl,imgs[1].src,slug+': secondary URL differs from visible image');
 assert.equal(secondary.caption,imgs[1].alt,slug+': secondary ALT differs from visible image');
 assert.equal(page.primaryImageOfPage?.['@id'],primary['@id'],slug+': hero image owner changed');
 assert.deepEqual(page.image,[{'@id':primary['@id']},{'@id':secondary['@id']}],slug+': image order changed');
 const baselineIndex=new Map(before.filter(n=>n['@id']).map(n=>[n['@id'],n]));
 return ds.map(doc=>{
  const out=structuredClone(doc),graph=out['@graph']||[out];
  const kept=graph.filter(n=>n['@id']!==secondary['@id']&&(n['@id']!==primary['@id']||baselineIndex.has(primary['@id'])));
  for(const n of kept) {
   const prev=baselineIndex.get(n['@id']) || (n['@type']==='WebPage' ? oldPage : undefined);
   if(n['@type']==='WebPage'){
    if(Object.hasOwn(prev,'image'))n.image=structuredClone(prev.image);else delete n.image;
    if(Object.hasOwn(prev,'primaryImageOfPage'))n.primaryImageOfPage=structuredClone(prev.primaryImageOfPage);else delete n.primaryImageOfPage;
   }
   if(n['@type']==='ImageObject'&&n['@id']===primary['@id']&&slug==='aria-higienopolis'){
    assert.equal(primary.caption,imgs[0].alt,'Ária: approved hero caption mismatch');
    n.contentUrl=prev.contentUrl;n.caption=prev.caption;
   }
  }
  if(out['@graph'])out['@graph']=kept;
  return out;
 });
}
let changed=0,completeUnchanged=0;
for(const [slug,street,cep] of expected){
 const filename='src-greenn/empreendimentos/'+slug+'/index.html';
 const original=execFileSync('git',['show',BASE+':'+filename],{encoding:'utf8'});
 const candidate=readFileSync(filename,'utf8');
 const before=documents(original),after=documents(candidate);
 if(slug==='universo-tatuape-orbita'){
   // The separately gated Órbita commercial parity PR adds approved ImageObject,
   // actual FloorPlans and commercial entities; preserve all original entities.
   const baseline=flat(before);
   const enriched=flat(after);
   const photo=enriched.find(n=>n['@type']==='ImageObject');
   assert(photo&&photo.contentUrl,'Órbita approved image object missing');
   const kept=enriched.filter(n=>baseline.some(x=>x['@id']===n['@id'])).map(n=>{
     const x=structuredClone(n);
     if(x['@type']==='WebPage'){delete x.mentions;delete x.image;delete x.primaryImageOfPage}
     if(x['@type']==='ApartmentComplex'){
       delete x.accommodationFloorPlan;
       x.image=x.image.map(y=>y?.['@id']===photo['@id']?photo.contentUrl:y);
     }
     return x;
   });
   assert.deepEqual(scrub([{'@graph':kept}]),scrub([{'@graph':baseline}]),'Órbita: original schema entities must remain unchanged except approved new references');
   const newTypes=enriched.filter(n=>!baseline.some(x=>x['@id']===n['@id'])).map(n=>n['@type']);
   const allowed=['Organization','ContactPoint','Person','RealEstateAgent','Service','Product','Offer','ImageObject','ImageObject','FloorPlan','FloorPlan','FloorPlan','FloorPlan'];
   assert.deepEqual(newTypes.slice().sort(),allowed.slice().sort(),'Órbita: only specifically approved commercial/image/plan types may be added');
 }else {
   const normalized=normalizeOnsiteAgent(stripApprovedImages(after,before,slug,candidate),before,slug);
   assert.deepEqual(scrub(normalized),scrub(before),slug+': forbidden non-image/non-address schema change');
 }
 const prior=flat(before).filter(x=>x['@type']==='ApartmentComplex');
 const current=flat(after).filter(x=>x['@type']==='ApartmentComplex');
 assert.equal(prior.length,1,slug+': baseline must contain exactly one ApartmentComplex');
 assert.equal(current.length,1,slug+': candidate must contain exactly one ApartmentComplex');
 const addr=current[0].address;
 assert(addr&&addr['@type']==='PostalAddress',slug+': PostalAddress absent');
 assert.equal(addr.streetAddress,street,slug+': street differs from approved user CSV');
 assert.equal(addr.postalCode,cep,slug+': CEP differs from approved user CSV');
 assert.equal(addr.addressLocality,'São Paulo');
 assert.equal(addr.addressRegion,'SP');
 assert.equal(typeof addr.addressCountry==='string'?addr.addressCountry:addr.addressCountry?.name,'BR');
 assert(/^\d{5}-\d{3}$/.test(cep));
 const wasComplete=prior[0].address?.streetAddress===street && prior[0].address?.postalCode===cep;
 if(wasComplete){
  const outsideJsonld=x=>x.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,'<script type="application/ld+json"></script>');
  assert.equal(outsideJsonld(candidate),outsideJsonld(original),slug+': previously complete page visible/runtime HTML changed');
  completeUnchanged++;
 }else{
  changed++;
  const past=prior[0].address;
  // Preserve all previously existing address keys except the two approved amendments.
  if(past)for(const [key,value] of Object.entries(past)){
    if(!['streetAddress','postalCode'].includes(key))assert.deepEqual(addr[key],value,slug+': original PostalAddress property mutated: '+key);
  }
 }
 if(slug==='caminhos-da-lapa-elo-duo'){
  assert.equal(prior[0].geo,undefined,'Elo Duo baseline unexpectedly has geo');
  assert.deepEqual(current[0].geo,{
   '@type':'GeoCoordinates',
   latitude:-23.51768499139431,
   longitude:-46.72021320439278
  },'Elo Duo specific user-confirmed Google Maps coordinate mismatch');
  // Other entities (including stand Place/RealEstateAgent) are unchanged by graph comparison.
 }else assert.deepEqual(current[0].geo,prior[0].geo,slug+': existing geo changed');
 console.log('POSTAL_CONTRACT_PASS',slug,street,cep,wasComplete?'UNCHANGED':'UPDATED');
}
assert.equal(changed,16,'expected exactly 16 previously incomplete projects');
assert.equal(completeUnchanged,7,'expected exactly 7 already-complete projects');
console.log('POSTAL_CONTRACT_PASS: 23 checked, 16 updated, 7 unchanged, Elo Duo geo only, JSON-LD entities preserved');
