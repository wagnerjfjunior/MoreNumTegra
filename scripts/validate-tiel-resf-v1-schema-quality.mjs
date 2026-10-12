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
const stripApprovedEditorialHead = text => text
 .replace(/<title>[^<]*<\/title>/,'<title>EDITORIAL_TITLE</title>')
 .replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="EDITORIAL_DESCRIPTION">')
 .replace(/<meta property="og:title" content="[^"]*">/,'<meta property="og:title" content="EDITORIAL_OG_TITLE">')
 .replace(/<meta name="twitter:title" content="[^"]*">/,'<meta name="twitter:title" content="EDITORIAL_TWITTER_TITLE">');
const stripApprovedTielUx = text => text
 .replace(/\n\/\* Tièl RESF — escala editorial e fotos do bairro \*\/[\s\S]*?(?=<\/style>)/,'')
 .replace('.quick .quick-wa{background:#25d366;color:#0c3420;border:1px solid #178744}','.quick .quick-wa{background:#fff;color:#111}')
 .replace('<a class="pilot" href="#formulario">Consultar unidades</a>','<a class="pilot" href="/regioes/vila-nova-conceicao/">Vila Nova Conceição</a>')
 .replace(' rel="noopener noreferrer" aria-label="Falar pelo WhatsApp sobre o Tièl">WhatsApp</a>',' rel="noopener noreferrer">WhatsApp</a>')
 .replace(/<script>\(\(\)=>\{"use strict";[\s\S]*?<\/script>/,'<script>RESF_GALLERY_RUNTIME_APPROVED</script>');
const stripRetiredHeroMetaCss = text => text.replace(/\.hero-meta(?: strong| span)?\{[^}]*\}/g,'');
// Facts CSS is an approved scoped RESF change alongside the retired hero-meta CSS.
const stripConversionCss = text => text.replace(/\/\* RESF V1: conversao clara e premium; contrato Form 46 e seletores JS preservados\. \*\/[\s\S]*?(?=\.faq-list details\{)/,'');
const stripFactsCss = text => text
 .replace(/\.facts\{background:var\(--ink\);color:#fff\}[\s\S]*?(?=\.ticker\{overflow:hidden;)/,'FACTS_CSS_APPROVED\n')
 .replace(/\.facts-in\{grid-template-columns:repeat\((?:2|1),1fr\)\}/g,'')
 .replace(/\.facts-in,(?=\.amenity-grid,\.local-grid\{grid-template-columns:1fr\})/g,'');
assert.equal(stripApprovedEditorialHead(stripFactsCss(stripConversionCss(stripApprovedTielUx(stripMain(html))))),stripApprovedEditorialHead(stripFactsCss(stripRetiredHeroMetaCss(stripApprovedTielUx(stripMain(baseline))))),'Only approved editorial metadata, facts/hero-meta CSS may differ outside main');
assert(!html.includes('hero-meta'),'Legacy hero-meta must be fully removed');
const captureSection=(text,id)=>text.match(new RegExp('<section[^>]*id="'+id+'"[\\s\\S]*?<\\/section>'))?.[0];
const captureForm=text=>text.match(/<form id="moretegra-lead-form"[\s\S]*?<\/form>/)?.[0];
assert.equal(captureForm(html),captureForm(baseline),'Form 46 fields, provider contract and submission markup must remain identical');
assert(html.includes('<section class="lead mt-conversion-form" id="formulario"'),'Modern conversion card must be present');
assert(html.includes('apartamentos e empreendimentos na Vila Nova Conceição</a>'),'Visible neighborhood link must be present');
for(const selector of ['hero','facts','galeria','residencias','localizacao','faq']){
 assert(html.includes(selector==='hero'?'<section class="hero"':selector==='facts'?'<section class="facts"':'id="'+selector+'"'), 'Missing RESF section '+selector);
}
const collectAssets=text=>[...text.matchAll(/<(?:img|iframe)\b[^>]*>/g)].map(m=>m[0].match(/\b(?:src|srcset)="([^"]+)/)?.[1]||'').sort();
const newNeighborhood=[...html.matchAll(/<figure class="neighborhood-card">[\s\S]*?<\/figure>/g)];
assert.equal(newNeighborhood.length,3,'Three sourced neighborhood photos required');
assert(newNeighborhood.every(m=>m[0].includes('loading="lazy"')&&m[0].includes('<small>Foto:')),'Lazy loading and attribution required');
const allowedNeighborhood=newNeighborhood.map(m=>m[0].match(/<img[^>]*src="([^"]+)"/)[1]);
const oldMainImage=baseline.match(/<img id="scene-image"[^>]*src="([^"]+)"/)?.[1];
const newMainImage=html.match(/<img id="scene-image"[^>]*src="([^"]+)"/)?.[1];
assert(newMainImage&&newMainImage.includes('Perspectiva-01-Boutique-Apartments'),'Gallery should open with an official interior');
const sortedExpected=collectAssets(baseline).filter(x=>x!==oldMainImage).concat([newMainImage,...allowedNeighborhood]).sort();
assert.deepEqual(collectAssets(html),sortedExpected,'Only approved gallery lead and three neighborhood images may change');
const script=html.match(/<script>\(\(\)=>\{"use strict";([\s\S]*?)<\/script>/)?.[1]||'';
assert((script.match(/\["Boutique Apartment ·/g)||[]).length===3,'Three distinct official interior scenes required');
assert(script.includes('const plants=['),'Plant navigation must remain');
assert(html.includes('<h1 id="title" class="display">Tièl Vila Nova Conceição<br>Apartamentos Tegra prontos para morar</h1>'));
const facts=html.match(/<section class="facts"[^>]*>[\s\S]*?<\/section>/)?.[0] || '';
assert.equal((facts.match(/class="fact"/g)||[]).length,4,'Four commercial facts required');
for(const label of ['Plantas oficiais','Tipologia','Região e diferencial','Estágio'])assert(facts.includes('<span>'+label+'</span>'),'Missing fact label '+label);
assert(facts.includes('<span>Estágio</span><b>Pronto para morar</b>'));
assert(facts.includes('<span>Plantas oficiais</span><b>19 m²</b>'));
assert(facts.includes('Unidade de 21 m² na referência comercial abaixo'));
assert(!facts.includes('Unidade 914'),'Commercial unit identifier must not appear in facts');
assert(facts.includes('Studios compactos'));
assert(html.includes('grid-template-columns:repeat(2,minmax(0,1fr))'),'Mobile facts must stay 2 columns');
assert(html.includes('@media(min-width:900px){.facts-in{grid-template-columns:repeat(4,minmax(0,1fr))}'),'Desktop facts must stay 4 columns');
assert(!html.includes('.facts-in,.amenity-grid,.local-grid{grid-template-columns:1fr}'),'No mobile one-column override');
assert(html.includes('<a href="/regioes/vila-nova-conceicao/">apartamentos e empreendimentos na Vila Nova Conceição</a>'),'Neighborhood link must remain visible and contextual');
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
