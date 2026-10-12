import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const file = 'src-greenn/empreendimentos/tiel-vila-nova-conceicao/index.html';
const baselineSha = 'aecff094bccd17ea5c2998934fbe0e1629277fe7';
const html = readFileSync(file,'utf8');
const baseline = execFileSync('git',['show',baselineSha+':'+file],{encoding:'utf8'});
const rx=/<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
const match=html.match(rx),prior=baseline.match(rx);
assert(match&&prior,'Missing JSON-LD');
const stripSchema = text=>text.replace(rx,'SCHEMA_ONLY');
const stripMain = text=>stripSchema(text).replace(/<main id="conteudo">[\s\S]*?<\/main>/,'<main id="conteudo">APPROVED_RESF_EDITORIAL_CONTENT</main>');
assert.equal(stripMain(html),stripMain(baseline),'No head, footer, JS, form assets or metadata outside main may change');
const captureSection=(text,id)=>text.match(new RegExp('<section[^>]*id="'+id+'"[\\s\\S]*?<\\/section>'))?.[0];
assert.equal(captureSection(html,'formulario'),captureSection(baseline,'formulario'),'Form 46 and all visible form fields must remain identical');
for(const selector of ['hero','facts','galeria','residencias','localizacao','faq']){
 assert(html.includes(selector==='hero'?'<section class="hero"':selector==='facts'?'<section class="facts">':'id="'+selector+'"'), 'Missing RESF section '+selector);
}
const collectAssets=text=>[...text.matchAll(/<(?:img|iframe)\b[^>]*>/g)].map(m=>m[0].match(/\b(?:src|srcset)="([^"]+)/)?.[1]||'').sort();
assert.deepEqual(collectAssets(html),collectAssets(baseline),'Media src and iframe must not change');
assert(html.includes('<h1 id="title" class="display">Tièl Vila Nova Conceição<br>Boutique Apartments</h1>'));
assert(html.includes('<div class="fact"><b>Pronto</b><span>para morar</span></div>'));
assert(html.includes('<a href="/regioes/vila-nova-conceicao/">Vila Nova Conceição</a>'));
assert(!html.includes('A página regional concentra'),'No meta-editorial page talk');

const graph=JSON.parse(match[1])['@graph'];
assert.equal(graph.length,17,'Expected governed 17-node Tièl graph');
const one=t=>{const nodes=graph.filter(n=>n['@type']===t);assert.equal(nodes.length,1,'Expected one '+t);return nodes[0]};
for(const t of ['WebSite','WebPage','BreadcrumbList','Brand','ApartmentComplex','FAQPage','Organization','ContactPoint','Person','RealEstateAgent','Service','Product','Offer'])one(t);
assert.equal(graph.filter(n=>n['@type']==='FloorPlan').length,2);
assert.equal(graph.filter(n=>n['@type']==='ImageObject').length,2);
const byId=new Map();for(const n of graph){assert(n['@id'],'Every node requires stable @id');assert(!byId.has(n['@id']),'Duplicate entity id');byId.set(n['@id'],n)}
const deref=(v)=>{assert(v&&typeof v['@id']==='string','Missing ID reference');assert(byId.has(v['@id']),'Dangling ID reference '+v['@id']);return byId.get(v['@id'])};
const page=one('WebPage'),project=one('ApartmentComplex'),product=one('Product'),offer=one('Offer'),agent=one('RealEstateAgent'),service=one('Service'),person=one('Person');
assert.equal(deref(page.mainEntity),project);
assert.equal(deref(page.primaryImageOfPage)['@type'],'ImageObject');
assert.equal(page.image.length,2);
for(const ref of page.image)deref(ref);
assert(!Object.hasOwn(project,'brand'),'Incompatible ApartmentComplex.brand returns Schema.org warning');
assert.equal(project.address.streetAddress,'Rua Jacques Félix, 309','Existing governed address preserved');
assert.equal(project.address.postalCode,'04509-001','Existing governed CEP preserved');
assert.equal(deref(product.offers),offer);
assert.equal(deref(offer.itemOffered),product);
assert.equal(deref(product.brand),one('Brand'));
assert.equal(deref(product.isRelatedTo),project);
assert.equal(offer.priceCurrency,'BRL');
assert.equal(offer.price,'598500.00');
assert(!Object.hasOwn(offer,'availability'),'Do not invent unit availability');
for(const invalid of ['aggregateRating','review','shippingDetails','hasMerchantReturnPolicy'])assert(!Object.hasOwn(product,invalid));
assert(html.includes('Unidade 914 · 21 m² · R$ 28.500/m² · valor de referência R$ 598.500'),'Commercial reference must be visible');
assert.equal(project.accommodationFloorPlan.length,2);
for(const [i,ref] of project.accommodationFloorPlan.entries()){
 const p=deref(ref);
 assert.equal(p['@type'],'FloorPlan');
 assert.equal(p.floorSize.value,19);
 assert.equal(p.floorSize.unitCode,'MTK');
 assert(html.includes(p.image),'FloorPlan URL must be published in page HTML');
 assert(p.name.includes('sugestão de decoração'),'FloorPlan must not imply 21 m² reference unit uses the 19 m² floorplan');
}
assert(html.includes(agent.telephone));
assert(html.includes('209.905-F'));
assert.equal(deref(agent.parentOrganization),one('Organization'));
assert.equal(deref(person.worksFor),one('Organization'));
assert.equal(deref(service.provider),one('Organization'));
assert.equal(deref(service.broker),person);
assert.equal(agent.address.addressLocality,'São Paulo');
assert.equal(agent.address.streetAddress,project.address.streetAddress,'Agent location must match governed on-site project reference');
assert.equal(agent.address.postalCode,project.address.postalCode,'Agent postal reference must match project');
const visible=[...html.matchAll(/<details><summary>(.*?)<\/summary><p>(.*?)<\/p><\/details>/gs)].map(m=>[m[1],m[2]]);
const questions=one('FAQPage').mainEntity.map(q=>[q.name,q.acceptedAnswer?.text]);
assert.equal(visible.length,8);
assert.deepEqual(questions,visible,'Visible FAQ and schema answers must match exactly and in order');
console.log('TIEL_RESF_V1_SCHEMA_QUALITY_GATE_PASS');
