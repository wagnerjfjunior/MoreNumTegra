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
function stripBemMoemaRichEntities(ds,slug){
 if(slug!=='bem-moema')return ds;
 const out=structuredClone(ds),nodes=flat(out);
 const route='https://www.moretegra.com.br/empreendimentos/bem-moema/';
 const list=['BreadcrumbList','Brand','Organization','ContactPoint','RealEstateAgent'];
 const get=t=>nodes.filter(n=>n['@type']===t);
 for(const t of list)assert.equal(get(t).length,1,'Bem Moema: expected exactly one '+t);
 const breadcrumb=get('BreadcrumbList')[0];
 assert.equal(breadcrumb['@id'],route+'#breadcrumb');
 assert.deepEqual(breadcrumb.itemListElement,[{'@type':'ListItem',position:1,name:'More em um Tegra',item:'https://www.moretegra.com.br/'},{'@type':'ListItem',position:2,name:'Bem Moema',item:route}]);
 const brand=get('Brand')[0],org=get('Organization')[0],contact=get('ContactPoint')[0],agent=get('RealEstateAgent')[0],project=get('ApartmentComplex')[0];
 assert.equal(brand['@id'],'https://www.moretegra.com.br/#tegra-brand');
 assert.equal(brand.name,'Tegra');
 assert.equal(org['@id'],'https://www.moretegra.com.br/#tegra-vendas');
 assert.equal(org.name,'Tegra Vendas');
 assert.equal(contact['@id'],'https://www.moretegra.com.br/#sabrina-contato');
 assert.equal(contact.telephone,'+5511960779328');
 assert.equal(agent['@id'],route+'#sabrina-atendimento');
 assert.deepEqual(agent.address,project.address,'Bem Moema: agent location must equal project');
 assert.equal(agent.image,'https://s3-gdigital.s3.amazonaws.com/gdigital/313/sNzJJWhmmsjkZjUV7gCKTgrlzRINCD6yDIAvkZOJ.webp');
 assert.equal(agent.telephone,'+5511960779328');
 assert.equal(agent.identifier?.value,'209.905-F');
 assert.equal(agent.url,route);
 assert.equal(agent.parentOrganization?.['@id'],org['@id']);
 const product=get('Product'),offer=get('Offer');
 assert.equal(product.length,1,'Bem Moema AP0202: one Product required');
 assert.equal(offer.length,1,'Bem Moema AP0202: one Offer required');
 const unit=product[0],deal=offer[0];
 assert.equal(unit['@id'],route+'#product-ap0202');
 assert.deepEqual(unit.isRelatedTo,{'@id':route+'#project'},'Bem Moema Product project ownership must match ApartmentComplex');
 const imageBaseline=['https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/336/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Bem-Moema-Sao-Paulo-SP-714x640-1715883122503.jpg'];
 assert.equal(project.image.filter(x=>x===imageBaseline[0]).length,1,'Bem Moema image duplicated');
 assert.equal(project.image.length,6,'Bem Moema gallery cardinality must reflect one duplicate removal');
 assert.equal(deal['@id'],route+'#offer-ap0202');
 assert.equal(unit.name,'Bem Moema — apartamento unidade AP0202 de 80 m²');
 assert.equal(unit.url,route);assert.equal(deal.url,route);
 assert.equal(unit.brand?.['@id'],brand['@id']);
 assert.equal(unit.offers?.['@id'],deal['@id']);
 assert.equal(deal.itemOffered?.['@id'],unit['@id']);
 assert.equal(deal.price,'1811200.00');assert.equal(deal.priceCurrency,'BRL');
 assert(!('availability' in deal),'Unverified availability cannot be claimed');
 assert(!('aggregateRating' in unit)&&!('review' in unit),'No manufactured ratings');
 const photo=get('ImageObject').find(n=>n['@id']===route+'#primary-image');
 assert.deepEqual(unit.image,[photo?.contentUrl],'AP0202 must preserve exact approved primary photo');
 assert.equal(unit.additionalProperty?.value,'Unidade AP0202 · 80 m² · R$ 22.640/m² · valor de referência R$ 1.811.200');
 assert(deal.description.includes('sujeitos à confirmação'),'Reference offer must have clear qualification');
 const site=get('WebSite'),person=get('Person'),service=get('Service'),plans=get('FloorPlan');
 assert.equal(site.length,1,'Bem Moema: exactly one WebSite');
 assert.equal(person.length,1,'Bem Moema: exactly one Person');
 assert.equal(service.length,1,'Bem Moema: exactly one Service');
 assert.equal(plans.length,3,'Bem Moema: three verified FloorPlans');
 const page=get('WebPage')[0];
 assert.equal(page['@id'],route+'#webpage');
 assert.equal(site[0]['@id'],'https://www.moretegra.com.br/#website');
 assert.equal(site[0].url,'https://www.moretegra.com.br/');
 assert.equal(page.isPartOf?.['@id'],site[0]['@id']);
 assert.equal(page.mainEntity?.['@id'],route+'#project');
 assert.equal(page.breadcrumb?.['@id'],breadcrumb['@id']);
 assert.equal(page.inLanguage,'pt-BR');
 assert.deepEqual(page.mentions,[{'@id':route+'#project'},{'@id':person[0]['@id']}]);
 assert.equal(project['@id'],route+'#project');
 assert(!Object.hasOwn(project,'brand'),'Schema.org ApartmentComplex cannot carry brand; Product and Organization retain it');
 assert.equal(project.brand,undefined,'ApartmentComplex brand must be absent');
 assert.equal(org.url,'https://www.moretegra.com.br/');
 assert.equal(org.brand?.['@id'],brand['@id']);
 assert.equal(org.contactPoint?.['@id'],contact['@id']);
 assert.equal(person[0]['@id'],'https://www.moretegra.com.br/#sabrina-da-tegra');
 assert.equal(person[0].identifier?.value,'209.905-F');
 assert.equal(person[0].worksFor?.['@id'],org['@id']);
 assert.equal(person[0].workLocation?.['@id'],project['@id']);
 assert.equal(service[0]['@id'],route+'#atendimento');
 assert.equal(service[0].provider?.['@id'],org['@id']);
 assert.equal(service[0].broker?.['@id'],person[0]['@id']);
 assert.equal(service[0].url,route);
 const verified=[[80,'1715461967103'],[123,'1715462066241'],[148,'1715462148337']];
 assert.deepEqual(project.accommodationFloorPlan,verified.map(([sqm])=>({'@id':route+'#floorplan-'+sqm})));
 for(const [sqm,assetSuffix] of verified){
   const plan=plans.find(x=>x['@id']===route+'#floorplan-'+sqm);
   assert(plan,'Bem Moema: missing floorplan '+sqm);
   assert.equal(plan.floorSize?.value,sqm);
   assert.equal(plan.floorSize?.unitCode,'MTK');
   assert(plan.image?.endsWith(assetSuffix+'.jpg'),'Bem Moema: plant image ownership changed '+sqm);
 }
 // Compare against the last approved Bem Moema baseline, then remove only
 // the exact nodes/relationships that this PR added. This preserves all
 // other commercial and media claims.
 const baselineFile='src-greenn/empreendimentos/bem-moema/index.html';
 const approved=execFileSync('git',['show','b5da71bf80cacc115026466f5b37c79a7f98e13c:'+baselineFile],{encoding:'utf8'});
 const oldGraph=flat(documents(approved));
 const oldProject=oldGraph.find(n=>n['@type']==='ApartmentComplex');
 assert(oldProject?.image?.length===7,'Bem Moema source image inventory unexpectedly changed');
 const expectedDedup=oldProject.image.filter((u,i,a)=>a.indexOf(u)===i);
 assert.deepEqual(project.image,expectedDedup,'Only an exact duplicate image can be removed');
 for(const type of ['WebPage','ApartmentComplex','Organization']){
  const current=get(type)[0],previous=oldGraph.find(n=>n['@type']===type);
  assert(current&&previous,'Missing old/new '+type);
  const permitted=type==='WebPage'?['@id','isPartOf','mainEntity','breadcrumb','inLanguage','mentions']:type==='ApartmentComplex'?['@id','brand','accommodationFloorPlan','image']:['url','brand','contactPoint'];
  const normalized=structuredClone(current);
  for(const k of permitted)if(Object.hasOwn(previous,k))normalized[k]=structuredClone(previous[k]);else delete normalized[k];
  assert.deepEqual(normalized,previous,'Bem Moema: forbidden existing entity delta '+type);
 }
 const ids=new Set([breadcrumb,brand,org,contact,agent,unit,deal,site[0],person[0],service[0],...plans].map(n=>n['@id']));
 for(const d of out)if(d['@graph']){
  d['@graph']=d['@graph'].filter(n=>!ids.has(n['@id']));
  for(const n of d['@graph'])if(['WebPage','ApartmentComplex','Organization'].includes(n['@type'])){
   const previous=oldGraph.find(x=>x['@type']===n['@type']);
   const fields=n['@type']==='WebPage'?['@id','isPartOf','mainEntity','breadcrumb','inLanguage','mentions']:n['@type']==='ApartmentComplex'?['@id','brand','accommodationFloorPlan','image']:['url','brand','contactPoint'];
   for(const k of fields)if(Object.hasOwn(previous,k))n[k]=structuredClone(previous[k]);else delete n[k];
  }
 }
 return out;
}
let changed=0,completeUnchanged=0;
for(const [slug,street,cep] of expected){
 const filename='src-greenn/empreendimentos/'+slug+'/index.html';
 const original=execFileSync('git',['show',BASE+':'+filename],{encoding:'utf8'});
 const candidate=readFileSync(filename,'utf8');
 const before=documents(original),after=documents(candidate);
 if(slug==='ampere-brooklin'){
   // Schema-only PR #386: preserve all pre-existing entities except the bounded
   // WebPage mentions, ApartmentComplex.brand removal and verified FloorPlan links.
   // Compare against immediately preceding main instead of the 2026-09-xx address baseline.
   const refFile=execFileSync('git',['show','7e5e2297c21eb6a01cad52c829a0533f5c1b7214:'+filename],{encoding:'utf8'});
   const baseline=flat(documents(refFile)),current=flat(after),baselineIds=new Set(baseline.map(n=>n['@id']));
   const retained=current.filter(n=>baselineIds.has(n['@id'])).map(n=>{
     const x=structuredClone(n),prior=baseline.find(o=>o['@id']===n['@id']);
     if(n['@type']==='WebPage')delete x.mentions;
     if(n['@type']==='FAQPage'){
       assert.equal(n.mainEntity.length,12,'Ampere: 12 FAQ questions must be present');
       assert.deepEqual(n.mainEntity.slice(0,6),prior.mainEntity,'Ampere: six previously validated questions must stay intact');
       x.mainEntity=structuredClone(prior.mainEntity);
     }
     if(n['@type']==='ApartmentComplex'){
       delete x.accommodationFloorPlan;
       x.brand=structuredClone(prior.brand);
       assert(!Object.hasOwn(n,'brand'),'Ampere: ApartmentComplex.brand must be absent');
     }
     return x;
   });
   assert.deepEqual(retained,baseline,'Ampere: existing graph may only gain bounded relations and remove invalid brand');
   const newTypes=current.filter(n=>!baselineIds.has(n['@id'])).map(n=>n['@type']).sort();
   assert.deepEqual(newTypes,['Organization','ContactPoint','Person','RealEstateAgent','Service','Product','Offer','FloorPlan','FloorPlan','FloorPlan'].sort(),'Ampere: unexpected new entity type');
   const outsideJsonld=x=>x.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,'JSONLD');
   // PR #387 only adds six SEO FAQ pairs to the visible FAQ; other HTML is frozen.
   const outsideApprovedFaq=x=>outsideJsonld(x).replace(/<section class="section residences" id="faq">[\s\S]*?<\/section>/,'FAQ_SECTION');
   assert.equal(outsideApprovedFaq(candidate),outsideApprovedFaq(refFile),'Ampere HTML outside approved FAQ must remain unchanged');
 }else if(slug==='universo-tatuape-orbita'){
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
   const normalized=normalizeOnsiteAgent(stripApprovedImages(stripBemMoemaRichEntities(after,slug),before,slug,candidate),before,slug);
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
