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
     if(n['@type']==='WebPage'){delete x.mentions; x.name=prior.name; x.description=prior.description;}
     if(n['@type']==='FAQPage'){assert.equal(x.mainEntity.length,12,'Ampere FAQ must have 12 items'); x.mainEntity=structuredClone(prior.mainEntity);}
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
   // PR #388 permits only the scoped visual change to the conversion section,
   // its footer and the extra CSS block; everything else must stay immutable.
   const withoutApprovedUx=x=>outsideJsonld(x)
     .replace(/<section class="lead(?: mt-conversion-form)?" id="formulario"[\s\S]*?<\/section>/,'APPROVED_FORM_SECTION')
     .replace(/<footer class="footer(?: mt-footer)?" data-mnt-commercial-footer>[\s\S]*?<\/footer>/,'APPROVED_FOOTER')
     .replace(/\n\/\* Ária Higienópolis UX\/CSS reference[^]*?(?=<\/style>)/,'');
   const normalizeApprovedFacts=x=>withoutApprovedUx(x)
     .replace(/<div class="hero-meta"><div><strong>262 m²<\/strong>[\s\S]*?<\/span><\/div><\/div>(?=<a class="hero-cta")/,'')
     .replace(/<section class="facts"(?: aria-label="Resumo do Ampère Brooklin")?>[\s\S]*?<\/section>/,'APPROVED_FACTS_SECTION')
     .replace(/\.hero-meta\{[^}]*\}\.hero-meta strong\{[^}]*\}\.hero-meta span\{[^}]*\}/,'')
     .replace(/\.facts\{[^}]*\}\.facts-in\{[^}]*\}\.fact\{[^}]*\}\.fact:last-child\{[^}]*\}\.fact b\{[^}]*\}\.fact span\{[^}]*\}/,'')
     .replace(/\.facts\{[^}]*\}\.facts-in\{[^}]*\}\.fact\{[^}]*\}\.fact:nth-child\(2n\)\{[^}]*\}\.fact:nth-child\(n\+3\)\{[^}]*\}\.fact b\{[^}]*\}\.fact span\{[^}]*\}\.fact em\{[^}]*\}@media\(min-width:900px\)\{\.facts-in\{[^}]*\}\.fact\{[^}]*\}\.fact:nth-child\(2n\)\{[^}]*\}\.fact:last-child\{[^}]*\}\}/,'')
     .replace('@media(max-width:900px){.facts-in{grid-template-columns:repeat(2,1fr)}','@media(max-width:900px){');
   // PR #389: approved marketing-copy nodes only; HTML tags, attributes, media,
   // form, schema, and tracking are still compared by the underlying HTML gate.
   const normalizeApprovedSeo=x=>normalizeApprovedFacts(x)
     .replace(/\n\/\* Ampère: neighborhood imagery is non-critical[\s\S]*?(?=<\/style>)/,'')
     .replace(/<div class="ampere-neighborhood"[\s\S]*?<\/div><div class="local-grid">/,'<div class="local-grid">')
     .replace(/<title>[^<]*<\/title>/,'APPROVED_SEO_TITLE')
     .replace(/<meta name="description" content="[^"]*">/,'APPROVED_SEO_DESCRIPTION')
     .replace(/<meta property="og:title" content="[^"]*">/,'APPROVED_OG_TITLE')
     .replace(/<meta property="og:description" content="[^"]*">/,'APPROVED_OG_DESCRIPTION')
     .replace(/<meta name="twitter:title" content="[^"]*">/,'APPROVED_TWITTER_TITLE')
     .replace(/<meta name="twitter:description" content="[^"]*">/,'APPROVED_TWITTER_DESCRIPTION')
     .replace(/<section class="section residences" id="visita"[\s\S]*?<\/section>/,'')
     .replace(/<section class="section" id="negociacao"[\s\S]*?<\/section>/,'')
     .replace(/<section class="section residences" id="faq">[\s\S]*?<\/section>/,'APPROVED_SEO_FAQ')
     .replace(/<p class="price-note">[\s\S]*?<\/p>/,'APPROVED_PRICE_COPY')
     .replace(/<p>No Tegra Ampère Brooklin,[\s\S]*?<\/p>/,'APPROVED_SIGNATURE_COPY')
     .replace(/<a class="pilot" href="\/regioes\/brooklin\/">Brooklin<\/a>/,'')
     .replace(/<h1 id="title" class="display">[\s\S]*?<\/h1>(?:<p|<h2) class="hero-lead">[\s\S]*?<\/(?:p|h2)>/,'APPROVED_HERO_COPY')
     .replace(/\.hero-lead\{[^}]*\}/,'APPROVED_HERO_LEAD_CSS')
     .replace(/<h2 class="display">[^<]*<\/h2>/g,'APPROVED_SECTION_HEADING')
     .replace(/<p class="intro-copy">[\s\S]*?<\/p>/g,'APPROVED_INTRO_COPY')
     .replace(/<p class="fine">[\s\S]*?<\/p>/g,'APPROVED_FINE_COPY')
     .replace(/<p>O projeto reúne piscinas,[\s\S]*?<\/p>/g,'APPROVED_SIGNATURE_COPY')
     .replace(/<p>Com o Living Double View,[\s\S]*?<\/p>/g,'APPROVED_SIGNATURE_COPY')
     .replace(/<p>Galeria ampliada com imagens oficiais do empreendimento\.[\s\S]*?<\/p>/,'APPROVED_GALLERY_COPY')
     .replace(/<p>Explore a piscina, o fitness,[\s\S]*?<\/p>/,'APPROVED_GALLERY_COPY')
     .replace(/<p>Plantas oficiais do material do empreendimento\.[\s\S]*?<\/p>/,'APPROVED_PLANT_COPY')
     .replace(/<p>Compare a planta padrão e as alternativas[\s\S]*?<\/p>/,'APPROVED_PLANT_COPY')
     .replace(/<small>Mapa de contexto da região\.[\s\S]*?<\/small>/,'APPROVED_MAP_COPY')
     .replace(/<small>Quer chegar ao endereço certo\?[\s\S]*?<\/small>/,'APPROVED_MAP_COPY');
   assert.equal(normalizeApprovedSeo(candidate),normalizeApprovedSeo(refFile),'Ampere non-editorial HTML invariant after SEO copy update');
 }else if(slug==='tiel-vila-nova-conceicao'){
   // RESF Tièl specific, source-verified commercial expansion. The separate
   // Tièl quality test verifies factual Product/Offer, two plans, FAQ pairs and
   // agent address. Here normalize only these approved changes against the
   // historical postal baseline; keep the baseline's project address contract.
   const prior=flat(before),current=flat(after);
   const oldById=new Map(prior.filter(n=>n['@id']).map(n=>[n['@id'],n]));
   const permitted=['Organization','ContactPoint','Person','RealEstateAgent','Service','Product','Offer','FloorPlan','FloorPlan'];
   const added=current.filter(n=>!oldById.has(n['@id']));
   const unowned=added.filter(n=>!['ImageObject',...permitted].includes(n['@type']));
   assert.deepEqual(unowned.map(n=>n['@type']),[],'Tièl: unexpected new entity types');
   const semanticAdded=added.filter(n=>n['@type']!=='ImageObject').map(n=>n['@type']);
   assert.deepEqual(semanticAdded.slice().sort(),permitted.slice().sort(),'Tièl: semantic addition allowlist changed');
   const copy=structuredClone(after);
   for(const doc of copy)if(doc['@graph']){
     doc['@graph']=doc['@graph'].filter(n=>!added.some(newNode=>newNode['@id']===n['@id'] && newNode['@type']!=='ImageObject'));
     for(const n of doc['@graph']){
       const old=oldById.get(n['@id']);
       if(!old){assert.equal(n['@type'],'ImageObject','Tièl: only historic-unowned ImageObject allowed here');continue;}
       if(n['@type']==='ApartmentComplex'){
         delete n.accommodationFloorPlan;
         if(Object.hasOwn(old,'brand'))n.brand=structuredClone(old.brand);
         else delete n.brand;
       }
       if(n['@type']==='WebPage'){
         // Tièl PR #395: only governed search-intent editorial metadata may change.
         assert.equal(n.name,'Tièl Vila Nova Conceição | Apartamentos Tegra prontos para morar');
         assert.equal(n.description,'Conheça o Tièl Vila Nova Conceição: apartamentos Tegra prontos para morar, piscina e bar no rooftop, fitness e plantas oficiais. Consulte unidades e condições.');
         n.name=structuredClone(old.name);
         n.description=structuredClone(old.description);
         if(Object.hasOwn(old,'mentions'))n.mentions=structuredClone(old.mentions);
         else delete n.mentions;
       }
       if(n['@type']==='FAQPage')n.mainEntity=structuredClone(old.mainEntity);
     }
   }
   const normalized=stripApprovedImages(copy,before,slug,candidate);
   assert.deepEqual(scrub(normalized),scrub(before),'Tièl: only approved semantic and responsive image deltas permitted');
 }else if(slug==='bem-moema-studios-offices'){
   // RESF V1 bounded copy/semantic adoption; preserve the existing governed
   // ApartmentComplex PostalAddress and restore only specifically approved schema deltas.
   const baseline=flat(before),current=flat(after);
   const oldById=new Map(baseline.filter(n=>n['@id']).map(n=>[n['@id'],n]));
   const newNodes=current.filter(n=>!oldById.has(n['@id']));
   const allowedTypes=['Organization','ContactPoint','Person','RealEstateAgent','Service','Product','Offer','FloorPlan','FloorPlan','ImageObject'];
   const addedImage=newNodes.find(n=>n['@type']==='ImageObject');
   assert.equal(addedImage?.['@id'],'https://www.moretegra.com.br/empreendimentos/bem-moema-studios-offices/#secondary-image','Bem Moema Studios Offices: only the approved secondary image addition is allowed');
   const mainImgs=[...candidate.slice(candidate.indexOf('<main'),candidate.indexOf('</main>')).matchAll(/<img\b[^>]*>/g)];
   const secondSrc=mainImgs[1]?.[0].match(/\bsrc="([^"]+)"/)?.[1];
   assert.equal(addedImage?.contentUrl,secondSrc,'Bem Moema Studios Offices: second image URL must match visible secondary media');
   assert.deepEqual(newNodes.map(n=>n['@type']).sort(),allowedTypes.slice().sort(),'Bem Moema Studios Offices: unexpected entity addition');
   const project=current.find(n=>n['@type']==='ApartmentComplex');
   const agent=current.find(n=>n['@type']==='RealEstateAgent');
   const product=current.find(n=>n['@type']==='Product');
   const offer=current.find(n=>n['@type']==='Offer');
   const plans=current.filter(n=>n['@type']==='FloorPlan');
   const route='https://www.moretegra.com.br/empreendimentos/bem-moema-studios-offices/';
   assert.deepEqual(agent?.address,project?.address,'Bem Moema Studios Offices: local realtor address mismatch');
   assert.equal(agent?.image,'https://s3-gdigital.s3.amazonaws.com/gdigital/313/sNzJJWhmmsjkZjUV7gCKTgrlzRINCD6yDIAvkZOJ.webp');
   assert.equal(product?.['@id'],route+'#product-studio-1702');
   assert.equal(offer?.['@id'],route+'#offer-studio-1702');
   assert.equal(offer?.price,'509600.00');
   assert.equal(offer?.priceCurrency,'BRL');
   assert(!Object.hasOwn(offer,'availability'),'Bem Moema Studios Offices: no invented availability');
   assert.equal(product?.isRelatedTo?.['@id'],route+'#project');
   assert.deepEqual(plans.map(p=>p.floorSize?.value).sort((a,b)=>a-b),[26,26]);
   assert.deepEqual(project.accommodationFloorPlan,[{'@id':route+'#floorplan-studio-26'},{'@id':route+'#floorplan-office-26'}]);
   assert(!Object.hasOwn(project,'brand'),'Bem Moema Studios Offices: remove incompatible ApartmentComplex.brand');
   const normalized=structuredClone(after);
   for(const doc of normalized)if(doc['@graph']){
     doc['@graph']=doc['@graph'].filter(n=>!newNodes.some(a=>a['@id']===n['@id']));
     for(let i=0;i<doc['@graph'].length;i++){
       const node=doc['@graph'][i];
       if(['WebPage','ApartmentComplex'].includes(node['@type'])){
         const old=oldById.get(node['@id']);
         assert(old,'Bem Moema Studios Offices: pre-existing ID changed');
         doc['@graph'][i]=structuredClone(old);
       }
     }
   }
   // 2026-10-14 editorial update: permit FAQ answer wording only when all
   // questions, order and text exactly match the rendered FAQ. Other schema
   // remains locked to the address/media baseline.
   const faqCurrent=current.find(n=>n['@type']==='FAQPage');
   const faqBaseline=baseline.find(n=>n['@type']==='FAQPage');
   assert(faqCurrent&&faqBaseline,'Bem Moema Studios Offices: FAQ missing');
   const visibleFAQ=[...candidate.matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(m=>({question:m[1].replaceAll('&amp;','&'),answer:m[2].replaceAll('&amp;','&')}));
   assert.equal(visibleFAQ.length,6,'Bem Moema Studios Offices: six visible FAQ items required');
   assert.equal(faqCurrent.mainEntity.length,visibleFAQ.length,'Bem Moema Studios Offices: FAQ schema cardinality mismatch');
   for(let i=0;i<visibleFAQ.length;i++){
     const currentItem=faqCurrent.mainEntity[i],oldItem=faqBaseline.mainEntity[i];
     assert.equal(currentItem.name,oldItem.name,'Bem Moema Studios Offices: FAQ question changed without authorization');
     assert.equal(currentItem.name,visibleFAQ[i].question,'Bem Moema Studios Offices: FAQ visible question differs from schema');
     assert.equal(currentItem.acceptedAnswer?.text,visibleFAQ[i].answer,'Bem Moema Studios Offices: FAQ visible answer differs from schema');
   }
   const normalizedFAQ=flat(normalized).find(n=>n['@type']==='FAQPage');
   assert(normalizedFAQ,'Bem Moema Studios Offices: normalized FAQ missing');
   normalizedFAQ.mainEntity=structuredClone(faqBaseline.mainEntity);
   assert.deepEqual(scrub(normalized),scrub(before),'Bem Moema Studios Offices: unauthorized changes to historical semantic nodes');
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
  if(slug==='bem-moema-studios-offices'){
    const form=x=>x.match(/<form id="moretegra-lead-form"[\s\S]*?<\/form>/)?.[0];
    const sources=x=>[...x.matchAll(/<(?:img|iframe)\b[^>]*>/g)].map(m=>(m[0].match(/\bsrc="([^"]+)"/)||[])[1]);
    const code=x=>[...x.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].filter(m=>!m[0].includes('application/ld+json')).map(m=>m[0]);
    assert.equal(form(candidate),form(original),'Bem Moema Studios Offices: Form 46 changed');
    const approvedNeighborhood=[...candidate.matchAll(/<figure class="neighborhood-card">[\s\S]*?<\/figure>/g)].map(m=>m[0]);
    assert.equal(approvedNeighborhood.length,3,'Bem Moema Studios Offices: RESF requires three sourced Moema photographs');
    const approvedSources=approvedNeighborhood.map(card=>card.match(/<img\b[^>]*src="([^"]+)"/)?.[1]);
    assert(approvedSources.every(Boolean)&&new Set(approvedSources).size===3,'Bem Moema Studios Offices: unique neighborhood sources required');
    assert(approvedSources.every(src=>src.startsWith('https://commons.wikimedia.org/wiki/Special:FilePath/')),'Bem Moema Studios Offices: disallowed photo origin');
    assert(approvedNeighborhood.every(card=>card.includes('loading="lazy"')&&card.includes('decoding="async"')&&card.includes('<figcaption>')),'Bem Moema Studios Offices: neighborhood lazy load/caption absent');
    assert.deepEqual(sources(candidate).filter(src=>!approvedSources.includes(src)),sources(original),'Bem Moema Studios Offices: original media sources changed');
    assert(candidate.includes('class="neighborhood-credits"'),'Bem Moema Studios Offices: license/credit references missing');
    assert(candidate.includes('<section class="lead mt-conversion-form" id="formulario"'),'Bem Moema Studios Offices: approved light conversion section absent');
    assert(candidate.includes('.mt-conversion-form .form{background:#fff;color:#171813'),'Bem Moema Studios Offices: approved white form card absent');
    assert(candidate.includes('.mt-conversion-form .field input,.mt-conversion-form .field select{width:100%;min-height:50px'),'Bem Moema Studios Offices: light form inputs absent');
    assert.deepEqual(code(candidate),code(original),'Bem Moema Studios Offices: functional scripts changed');
    assert(candidate.includes('grid-template-columns:repeat(2,minmax(0,1fr))'),'Bem Moema Studios Offices: mobile facts 2x2 absent');
    assert(!candidate.includes('.hero-meta{'),'Bem Moema Studios Offices: retired hero-meta CSS remains');
    assert(candidate.includes('href="/regioes/moema/"'),'Bem Moema Studios Offices: missing contextual regional link');
    assert(candidate.includes('id="moretegra-lead-form"'),'Bem Moema Studios Offices: Form46 missing');
   }else if(slug==='mozae-higienopolis'){
    // Exact approved RESF deltas: Sabrina guidance + three credited neighborhood
    // photographs + isolated light Form46 styling. Nothing else may change.
    const approved='<p>Ao chegar ao estande de vendas do Mozae Higienópolis, solicite atendimento por <strong>Sabrina da Tegra</strong>. Para agendar sua visita, fale pelo <a href="https://wa.me/5511960779328?text=Ol%C3%A1%2C%20quero%20agendar%20uma%20visita%20ao%20Mozae%20Higien%C3%B3polis%20com%20Sabrina%20da%20Tegra." target="_blank" rel="noopener noreferrer">WhatsApp (11) 96077-9328</a>.</p>';
    const acceptedCSS="/* RESF — Bairro Higienópolis: fotografias com origem e licença verificáveis. */\n.neighborhood-gallery{margin:clamp(28px,5vw,56px) 0 30px}\n.neighborhood-gallery-head{margin-bottom:22px;max-width:820px}\n.neighborhood-gallery-head h3{font:400 clamp(1.7rem,3vw,2.6rem)/1.1 Georgia,serif;margin:9px 0 12px}\n.neighborhood-gallery-head>p:last-child{color:var(--muted,#59564f);line-height:1.65}\n.neighborhood-gallery-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}\n.neighborhood-card{margin:0;min-width:0;background:#fff;border:1px solid #e5dfd4;border-radius:16px;overflow:hidden}\n.neighborhood-card img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;background:#ded8cf}\n.neighborhood-card figcaption{display:grid;gap:5px;padding:16px 17px 19px}\n.neighborhood-card figcaption strong{font-size:.95rem;line-height:1.3}\n.neighborhood-card figcaption span{font-size:.8rem;color:#625e56;line-height:1.5}\n.neighborhood-credits{font-size:.73rem;color:#645f55;margin-top:13px;line-height:1.55}\n.neighborhood-credits summary{cursor:pointer;text-decoration:underline;text-underline-offset:3px;min-height:42px}\n.neighborhood-credits a{color:#594111}\n@media(max-width:820px){.neighborhood-gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media(max-width:560px){.neighborhood-gallery-grid{grid-template-columns:1fr}}\n/* RESF — Formulário claro; Form 46 e JS permanecem intactos. */\n.mt-conversion-form{background:#f4f1e9;color:#171813;padding:clamp(56px,7vw,96px) 0}\n.mt-conversion-form .lead-grid{grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);gap:clamp(24px,6vw,80px);align-items:start}\n.mt-conversion-form .lead-copy .eyebrow{color:#866717}\n.mt-conversion-form .lead-copy h2{font:800 clamp(2rem,4vw,3.75rem)/1.06 -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;letter-spacing:-.045em;color:#171813;max-width:15ch}\n.mt-conversion-form .lead-copy p{color:#39362f;line-height:1.75}\n.mt-conversion-form .lead-copy a{color:#171813;font-weight:800}\n.mt-conversion-form .form{background:#fff;color:#171813;border:1px solid #ded8cc;border-radius:22px;padding:clamp(20px,3vw,36px);box-shadow:0 18px 42px rgba(32,28,20,.09)}\n.mt-conversion-form .form-grid{grid-template-columns:minmax(0,.38fr) minmax(0,.62fr);gap:16px}\n.mt-conversion-form .field{min-width:0;gap:7px}\n.mt-conversion-form .field span{font-size:.76rem;font-weight:800;letter-spacing:0;text-transform:none}\n.mt-conversion-form .field input,.mt-conversion-form .field select{width:100%;min-height:50px;border:1px solid #c7c1b5;border-radius:12px;background:#fff;color:#171813;padding:12px 14px;font:inherit}\n.mt-conversion-form .field input:focus-visible,.mt-conversion-form .field select:focus-visible{outline:3px solid rgba(235,185,46,.28);outline-offset:1px;border-color:#a57c12;box-shadow:none}\n.mt-conversion-form .field [aria-invalid=\"true\"]{border-color:#b42318}\n.mt-conversion-form .submit{min-height:52px;border-radius:999px;color:#171813;font-size:.96rem}\n.mt-conversion-form .privacy{color:#6d695f;line-height:1.5}\n.mt-conversion-form .error,.mt-conversion-form .message.error{color:#a1261d}\n.mt-conversion-form .message{color:#39362f}\n@media(max-width:900px){.mt-conversion-form .lead-grid{grid-template-columns:1fr}}\n@media(max-width:480px){.mt-conversion-form .form-grid{grid-template-columns:1fr}.mt-conversion-form .field{grid-column:1/-1}.mt-conversion-form .lead-copy h2{max-width:none}}\n";
    const acceptedGallery="<div class=\"neighborhood-gallery\" aria-label=\"Fotografias reais de Higienópolis\"><div class=\"neighborhood-gallery-head\"><p class=\"eyebrow\">HIGIENÓPOLIS · O ENTORNO</p><h3>Higienópolis em três perspectivas</h3><p>Conheça o verde do Parque Buenos Aires, a Praça Vilaboim e a arquitetura da Avenida Angélica. As fotografias apresentam pontos do bairro, não instalações ou vistas garantidas do Mozae.</p></div><div class=\"neighborhood-gallery-grid\"><figure class=\"neighborhood-card\"><img src=\"https://commons.wikimedia.org/wiki/Special:FilePath/Parque%20Buenos%20Aires%2001.JPG?width=960\" width=\"960\" height=\"720\" loading=\"lazy\" decoding=\"async\" alt=\"Parque Buenos Aires, área verde e convivência em higienópolis\"><figcaption><strong>Parque Buenos Aires</strong><span>Área verde e convivência em Higienópolis</span></figcaption></figure><figure class=\"neighborhood-card\"><img src=\"https://commons.wikimedia.org/wiki/Special:FilePath/Pra%C3%A7a%20Vilaboim%20-%20S%C3%A3o%20Paulo%20-%2020240914153652.jpg?width=960\" width=\"960\" height=\"720\" loading=\"lazy\" decoding=\"async\" alt=\"Praça Vilaboim, paisagem urbana e encontros no bairro\"><figcaption><strong>Praça Vilaboim</strong><span>Paisagem urbana e encontros no bairro</span></figcaption></figure><figure class=\"neighborhood-card\"><img src=\"https://commons.wikimedia.org/wiki/Special:FilePath/Im%C3%B3vel%20%C3%A0%20Avenida%20Ang%C3%A9lica%2C%20n%C2%BA%201647%20-%20S%C3%A3o%20Paulo%20-%2020240914160011.jpg?width=960\" width=\"960\" height=\"720\" loading=\"lazy\" decoding=\"async\" alt=\"Avenida Angélica, arquitetura histórica de higienópolis\"><figcaption><strong>Avenida Angélica</strong><span>Arquitetura histórica de Higienópolis</span></figcaption></figure></div><details class=\"neighborhood-credits\"><summary>Créditos e licenças das fotografias</summary><p>Parque Buenos Aires — Dornicke, <a href=\"https://commons.wikimedia.org/wiki/File:Parque_Buenos_Aires_01.JPG\" target=\"_blank\" rel=\"noopener noreferrer\">Wikimedia Commons</a>, <a href=\"https://creativecommons.org/licenses/by-sa/3.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC BY-SA 3.0</a>. Praça Vilaboim — TamiresAnsanelo, <a href=\"https://commons.wikimedia.org/wiki/File:Pra%C3%A7a_Vilaboim_-_S%C3%A3o_Paulo_-_20240914153652.jpg\" target=\"_blank\" rel=\"noopener noreferrer\">Wikimedia Commons</a>, <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC BY-SA 4.0</a>. Avenida Angélica — TamiresAnsanelo, <a href=\"https://commons.wikimedia.org/wiki/File:Im%C3%B3vel_%C3%A0_Avenida_Ang%C3%A9lica%2C_n%C2%BA_1647_-_S%C3%A3o_Paulo_-_20240914160011.jpg\" target=\"_blank\" rel=\"noopener noreferrer\">Wikimedia Commons</a>, <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC BY-SA 4.0</a>. Imagens do bairro exibidas com recorte responsivo; não representam as áreas do empreendimento.</p></details></div>";
    for(const [kind,fragment] of [['Sabrina',approved],['form/photography CSS',acceptedCSS],['Higienopolis photos',acceptedGallery]])assert.equal(candidate.split(fragment).length,2,'Mozae: '+kind+' absent or duplicated');
    assert.equal([...candidate.matchAll(/class="neighborhood-card"/g)].length,3,'Mozae: three neighborhood photographs are required');
    assert(candidate.includes('class="lead mt-conversion-form" id="formulario"'),'Mozae: light form missing');
    const form=x=>x.match(/<form id="moretegra-lead-form"[\s\S]*?<\/form>/)?.[0];
    assert.equal(form(candidate),form(original),'Mozae: Form 46 contract or scripts changed');
        const authorshipSection="<section class=\"section signature\" aria-labelledby=\"mozae-authorship-title\"><div class=\"wrap authorship-wrap\"><div class=\"authorship-intro\"><p class=\"eyebrow\">ARQUITETURA · INTERIORES · PAISAGISMO · ARTE</p><h2 class=\"display\" id=\"mozae-authorship-title\">Arquitetura e design do Mozae Higienópolis</h2><p>Quatro assinaturas contribuem para a identidade do Mozae Higienópolis. Conheça os profissionais responsáveis pela arquitetura, pelos interiores, pelo paisagismo e pelo mural exclusivo do empreendimento.</p></div><div class=\"authorship-grid\"><article class=\"authorship-card authorship-wordmark\"><div class=\"authorship-media\"><img src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/MoreTegra-Mozae-Arquitetura-Logo_Le_Arquitetos.webp\" alt=\"LE Arquitetos: arquitetura do Mozae Higienópolis\" loading=\"lazy\" decoding=\"async\" width=\"320\" height=\"180\"></div><div class=\"authorship-body\"><span class=\"authorship-role\">Arquitetura</span><p>O LE Arquitetos assina a concepção arquitetônica do Mozae Higienópolis, responsável pela identidade da torre e pelo desenho do conjunto.</p></div></article><article class=\"authorship-card authorship-pale\"><div class=\"authorship-media\"><img src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Suite-Arquitetos-SemFundo.webp\" alt=\"Suíte Arquitetos: interiores do Mozae Higienópolis\" loading=\"lazy\" decoding=\"async\" width=\"320\" height=\"180\"></div><div class=\"authorship-body\"><span class=\"authorship-role\">Interiores</span><h3>Suíte Arquitetos</h3><p>A Suíte Arquitetos assina o projeto de interiores, desenvolvendo a linguagem visual dos ambientes previstos para o empreendimento.</p></div></article><article class=\"authorship-card authorship-pale\"><div class=\"authorship-media\"><img src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/MoreTEgra-Mozae-Paisagismo-Cardim-removebg-preview.webp\" alt=\"Cardim Arquitetura Paisagística: paisagismo do Mozae Higienópolis\" loading=\"lazy\" decoding=\"async\" width=\"320\" height=\"180\"></div><div class=\"authorship-body\"><span class=\"authorship-role\">Paisagismo</span><h3>Cardim Arquitetura Paisagística</h3><p>O Cardim Arquitetura Paisagística assina o paisagismo, integrando o planejamento dos espaços verdes à proposta arquitetônica do Mozae.</p></div></article><article class=\"authorship-card authorship-art\"><div class=\"authorship-media\"><img src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Mural-Isabel-Ruas.webp\" alt=\"Isabel Ruas: mural exclusivo do Mozae Higienópolis\" loading=\"lazy\" decoding=\"async\" width=\"320\" height=\"180\"></div><div class=\"authorship-body\"><span class=\"authorship-role\">Mural exclusivo</span><h3>Isabel Ruas</h3><p>Isabel Ruas criou um mural exclusivo para o Mozae, inspirado no modernismo e na história de Higienópolis.</p></div></article></div></div></section>\n";
    const authorshipCSS="/* Mozae RESF: autoria editorial, logos legíveis e mural exclusivo */\n.signature .authorship-wrap{display:grid;grid-template-columns:minmax(0,.88fr) minmax(0,1.12fr);gap:clamp(28px,5vw,72px);align-items:start}\n.signature .authorship-intro{max-width:560px}\n.signature .authorship-intro h2{font-size:clamp(2.25rem,4.6vw,4.9rem);line-height:1.07;letter-spacing:-.04em;overflow-wrap:break-word}\n.signature .authorship-intro>p:last-child{margin:20px 0 0;max-width:50ch;line-height:1.7;font-size:clamp(.95rem,1.2vw,1.08rem)}\n.signature .authorship-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}\n.signature .authorship-card{min-width:0;border:1px solid #35342f;border-radius:16px;background:#191918;overflow:hidden;display:flex;flex-direction:column}\n.signature .authorship-media{min-height:130px;height:clamp(130px,13vw,178px);padding:20px;background:#20201e;display:flex;align-items:center;justify-content:center;overflow:hidden}\n.signature .authorship-media img{display:block;width:100%;height:100%;object-fit:contain}\n.signature .authorship-pale .authorship-media{background:#fff}\n.signature .authorship-art .authorship-media{padding:0;background:#282622}\n.signature .authorship-art .authorship-media img{object-fit:cover}\n.signature .authorship-body{padding:18px 19px 22px}\n.signature .authorship-role{display:block;color:#ebb92e;font-weight:800;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase}\n.signature .authorship-body h3{margin:9px 0 0;color:#f6f3eb;font-size:clamp(.95rem,1.2vw,1.08rem);line-height:1.35}\n.signature .authorship-body p{margin:10px 0 0;color:#d0ccc4;font-size:.87rem;line-height:1.6}\n@media(max-width:900px){.signature .authorship-wrap{grid-template-columns:1fr}.signature .authorship-intro h2{font-size:clamp(2.15rem,7vw,3.5rem)}}\n@media(max-width:540px){.signature .authorship-grid{grid-template-columns:1fr}.signature .authorship-intro h2{font-size:clamp(2.1rem,8vw,2.8rem)}.signature .authorship-media{height:150px}.signature .authorship-body{padding:17px 18px 21px}}\n";
        const approvedPlanSection="<section class=\"section residences mozae-plan-choice\" id=\"residencias\" aria-labelledby=\"mozae-choice-title\"><div class=\"wrap\"><p class=\"eyebrow\">Mozae Higienópolis · plantas e tipologias</p><h2 id=\"mozae-choice-title\" class=\"display\">Qual planta do Mozae combina com você?</h2><p class=\"mozae-plan-intro\">Compare as plantas oficiais de 46 m², com 1 suíte, e 73 m², com 2 suítes. As duas tipologias divulgadas incluem 1 vaga, conforme a configuração de cada unidade.</p><div class=\"mozae-plan-cards\" aria-label=\"Comparativo das plantas do Mozae Higienópolis\"><article class=\"mozae-plan-card\"><div class=\"mozae-plan-media\"><img loading=\"lazy\" decoding=\"async\" src=\"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/355/Planta/Tegra-Incorporadora-Planta-Tipo-1-Suite-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-1400x1400-1731866684717.jpg\" alt=\"Planta oficial 46 m² · 1 suíte\" width=\"1400\" height=\"1400\"></div><div class=\"mozae-plan-copy\"><h3>46 m² · 1 suíte</h3><p>A planta de 46 m² atende quem procura uma configuração mais compacta no Mozae, com 1 suíte. Para buscas por apartamento de 1 dormitório em Higienópolis, esta é a tipologia equivalente do projeto. A referência comercial exibida nesta página está vinculada à unidade AP0301.</p></div></article><article class=\"mozae-plan-card\"><div class=\"mozae-plan-media\"><img loading=\"lazy\" decoding=\"async\" src=\"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/355/Planta/Tegra-Incorporadora-Planta-Tipo-2-Suites-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-1400x1400-1731866746133.jpg\" alt=\"Planta oficial 73 m² · 2 suítes\" width=\"1400\" height=\"1400\"></div><div class=\"mozae-plan-copy\"><h3>73 m² · 2 suítes</h3><p>A opção de 73 m² amplia a área privativa e oferece 2 suítes. É a tipologia a considerar quando a busca é por apartamento de 2 dormitórios ou 2 suítes em Higienópolis e a necessidade de espaço pesa mais na decisão.</p></div></article></div><p class=\"mozae-plan-note\"><strong>Mozae em construção.</strong> Para comparar as opções, confirme o prazo, a configuração, a disponibilidade da unidade e a condição comercial vigente no atendimento. Plantas oficiais de referência; imagens e disponibilidade sujeitas à confirmação.</p><div class=\"intro reveal\" style=\"margin-top:28px\"><div><p class=\"eyebrow\">Rotina e lazer</p><h2 class=\"display\">Rooftop, piscina e espaços de uso cotidiano.</h2></div><div><p class=\"intro-copy\">A proposta do Mozae combina áreas para lazer, convivência e trabalho. Entre os ambientes apresentados estão piscina, fitness, coworking, pet place, churrasqueira, SPA, brinquedoteca e bicicletário, além do rooftop que aparece como um dos elementos centrais do projeto.</p><p class=\"intro-copy\">Esses diferenciais devem ser avaliados junto com a planta. Para alguns compradores, a prioridade será a metragem; para outros, a presença de áreas compartilhadas e a localização em Higienópolis terão peso maior na escolha do apartamento.</p></div></div></div></section>\n";
    const approvedPlanCSS="/* Mozae RESF — integração entre plantas e escolha, sem duplicar tipologias */\n.mozae-plan-choice .wrap>h2{font-size:clamp(2rem,3.6vw,3.5rem);line-height:1.12;letter-spacing:-.035em;max-width:19ch}\n.mozae-plan-intro{max-width:70ch;margin:18px 0 0;font-size:clamp(.98rem,1.3vw,1.1rem);line-height:1.65;color:#514e47}\n.mozae-plan-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:30px}\n.mozae-plan-card{min-width:0;border:1px solid #ddd7cb;border-radius:18px;background:#fff;overflow:hidden}\n.mozae-plan-media{padding:12px;background:#fff}\n.mozae-plan-media img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:contain}\n.mozae-plan-copy{padding:12px clamp(18px,2vw,25px) 24px}\n.mozae-plan-copy h3{font-size:clamp(1.2rem,2vw,1.55rem);margin:0 0 10px;color:#171813}\n.mozae-plan-copy p{font-size:.96rem;line-height:1.65;color:#4b4943;margin:0}\n.mozae-plan-note{margin:18px 0 0;max-width:85ch;font-size:.88rem;line-height:1.65;color:#514e47}\n@media(max-width:700px){.mozae-plan-cards{grid-template-columns:1fr;gap:18px}.mozae-plan-choice .wrap>h2{font-size:clamp(2rem,7.5vw,2.65rem)}.mozae-plan-card{border-radius:15px}}\n";
    const previousPlanSection="<section class=\"section residences\" id=\"residencias\"><div class=\"wrap\"><p class=\"eyebrow\">Mozae · tipologias</p><h2 class=\"display\">46 e 73 m².</h2><div class=\"decision-grid\"><article class=\"decision-item\"><h3>46 m²</h3><p>Apartamento com 1 suíte.</p></article><article class=\"decision-item\"><h3>73 m²</h3><p>Apartamento com 2 suítes.</p></article><article class=\"decision-item\"><h3>1 vaga</h3><p>Configuração das tipologias do empreendimento.</p></article></div><div class=\"mnt-plant-grid\" aria-label=\"Plantas oficiais do empreendimento\"><figure class=\"mnt-plant-card\"><img loading=\"lazy\" decoding=\"async\" src=\"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/355/Planta/Tegra-Incorporadora-Planta-Tipo-1-Suite-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-1400x1400-1731866684717.jpg\" alt=\"Planta oficial 46 m² · 1 suíte\"><figcaption>46 m² · 1 suíte</figcaption></figure><figure class=\"mnt-plant-card\"><img loading=\"lazy\" decoding=\"async\" src=\"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/355/Planta/Tegra-Incorporadora-Planta-Tipo-2-Suites-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-1400x1400-1731866746133.jpg\" alt=\"Planta oficial 73 m² · 2 suítes\"><figcaption>73 m² · 2 suítes</figcaption></figure></div><p class=\"mnt-plant-note\">Plantas oficiais de referência. Configuração e disponibilidade da unidade devem ser confirmadas no atendimento.</p></div></section>\n<section class=\"section residences\" id=\"escolha-mozae\" aria-labelledby=\"mozae-choice-title\"><div class=\"wrap\"><p class=\"eyebrow\">Escolha do apartamento</p><h2 id=\"mozae-choice-title\" class=\"display\">Como comparar os apartamentos de 46 e 73 m² do Mozae Higienópolis.</h2><div class=\"decision-grid\"><article class=\"decision-item\"><h3>46 m² · 1 suíte</h3><p>A planta de 46 m² atende quem procura uma configuração mais compacta no Mozae, com 1 suíte. Para buscas por apartamento de 1 dormitório em Higienópolis, esta é a tipologia equivalente do projeto. A referência comercial exibida nesta página está vinculada à unidade AP0301.</p></article><article class=\"decision-item\"><h3>73 m² · 2 suítes</h3><p>A opção de 73 m² amplia a área privativa e oferece 2 suítes. É a tipologia a considerar quando a busca é por apartamento de 2 dormitórios ou 2 suítes em Higienópolis e a necessidade de espaço pesa mais na decisão.</p></article><article class=\"decision-item\"><h3>Apartamento em construção</h3><p>O Mozae está em construção. Para quem pesquisa apartamento na planta em Higienópolis, vale comparar prazo, disponibilidade da unidade e condição comercial vigente no momento do atendimento.</p></article></div><div class=\"intro reveal\" style=\"margin-top:28px\"><div><p class=\"eyebrow\">Rotina e lazer</p><h2 class=\"display\">Rooftop, piscina e espaços de uso cotidiano.</h2></div><div><p class=\"intro-copy\">A proposta do Mozae combina áreas para lazer, convivência e trabalho. Entre os ambientes apresentados estão piscina, fitness, coworking, pet place, churrasqueira, SPA, brinquedoteca e bicicletário, além do rooftop que aparece como um dos elementos centrais do projeto.</p><p class=\"intro-copy\">Esses diferenciais devem ser avaliados junto com a planta. Para alguns compradores, a prioridade será a metragem; para outros, a presença de áreas compartilhadas e a localização em Higienópolis terão peso maior na escolha do apartamento.</p></div></div></div></section>\n";
    assert.equal(candidate.split(approvedPlanSection).length,2,'Mozae: merged official plans and choices missing or changed');
    assert.equal(candidate.split(approvedPlanCSS).length,2,'Mozae: approved plan layout CSS missing or changed');
const originalAuthorship=original.match(/<section class="section signature"[\s\S]*?(?=<section class="gallery")/)?.[0];
    assert(originalAuthorship,'Mozae: source signature section missing');
    assert.equal(candidate.split(authorshipSection).length,2,'Mozae: exact authored signature must occur once');
    assert.equal(candidate.split(authorshipCSS).length,2,'Mozae: signature responsive CSS missing or modified');
    let restored=candidate.replace(approved,'').replace(acceptedGallery,'').replace(acceptedCSS,'').replace('\n'+authorshipCSS,'').replace(authorshipSection,originalAuthorship).replace(approvedPlanSection,previousPlanSection).replace('\n'+approvedPlanCSS,'').replace('<section class="lead mt-conversion-form" id="formulario"','<section class="lead" id="formulario"');
    restored=restored.replace('.credit-logo{display:block;max-width:min(240px,100%);width:auto;height:auto;max-height:96px;object-fit:contain;object-position:left center;margin:0 0 14px}.credit-logo[hidden]{display:none}','');
assert.equal(outsideJsonld(restored),outsideJsonld(original),'Mozae: changes outside approved RESF deltas are forbidden');
   }else assert.equal(outsideJsonld(candidate),outsideJsonld(original),slug+': previously complete page visible/runtime HTML changed');
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
