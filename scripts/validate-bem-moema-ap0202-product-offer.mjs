#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';

const path='src-greenn/empreendimentos/bem-moema/index.html';
const baseline='08e727aa879ab2f4afa996dfbbe40aade85c3c72';
const html=readFileSync(path,'utf8');
const original=execFileSync('git',['show',baseline+':'+path],{encoding:'utf8'});
const pat=/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i;
const oldBlock=original.match(pat),newBlock=html.match(pat);
assert(oldBlock&&newBlock,'Expected exactly one schema block');
assert.equal(html.replace(newBlock[1],oldBlock[1]),original,'Changes outside JSON-LD are prohibited');
const oldGraph=JSON.parse(oldBlock[1])['@graph'];
const graph=JSON.parse(newBlock[1])['@graph'];
const baseGraph=graph.filter(n=>!['Product','Offer'].includes(n['@type']));
// Additional relations and actual floorplans are strictly covered by
// validate-bem-moema-orbita-graph-parity.mjs. Normalize only those approved
// structural additions before comparing against the frozen Product/Offer baseline.
const additions=new Set(['WebSite','Person','Service','FloorPlan']);
const normalized=baseGraph.filter(n=>!additions.has(n['@type'])).map(n=>{
 const prev=oldGraph.find(x=>x['@type']===n['@type']&&(!x['@id']||x['@id']===n['@id']));
 assert(prev,'Missing previous entity '+n['@type']);
 const copy=structuredClone(n);
 const fields=n['@type']==='WebPage'?['@id','isPartOf','mainEntity','breadcrumb','inLanguage','mentions']:n['@type']==='ApartmentComplex'?['@id','brand','accommodationFloorPlan','image']:n['@type']==='Organization'?['url','brand','contactPoint']:[];
 for(const k of fields)if(Object.hasOwn(prev,k))copy[k]=structuredClone(prev[k]);else delete copy[k];
 return copy;
});
assert.deepEqual(normalized,oldGraph,'Existing commercial/schema entities changed outside approved parity links');
const ps=graph.filter(n=>n['@type']==='Product'),os=graph.filter(n=>n['@type']==='Offer');
assert.equal(ps.length,1);assert.equal(os.length,1);
const product=ps[0],offer=os[0],route='https://www.moretegra.com.br/empreendimentos/bem-moema/';
assert.equal(product['@id'],route+'#product-ap0202');
assert.deepEqual(product.isRelatedTo,{'@id':route+'#project'},'AP0202 must link to same project');
assert.equal(offer['@id'],route+'#offer-ap0202');
assert.equal(product.offers['@id'],offer['@id']);
assert.equal(offer.itemOffered['@id'],product['@id']);
assert.equal(offer.priceCurrency,'BRL');
assert.equal(offer.price,'1811200.00');
const visible='Unidade AP0202 · 80 m² · R$ 22.640/m² · valor de referência R$ 1.811.200';
assert(html.includes(visible),'Commercial offer must be visible in human-readable page');
assert(html.includes('Consulte disponibilidade e condições vigentes.'),'Availability caveat required');
assert.equal(product.additionalProperty?.value,visible);
assert.equal(product.name,'Bem Moema — apartamento unidade AP0202 de 80 m²');
assert(!Object.hasOwn(graph.find(n=>n['@type']==='ApartmentComplex'),'brand'),'ApartmentComplex has no brand property');
const primary=graph.find(n=>n['@id']===route+'#primary-image');
assert.deepEqual(product.image,[primary.contentUrl]);
assert(!('availability' in offer),'Must not claim live inventory');
assert(!('priceValidUntil' in offer),'Must not fabricate expiration date');
assert(!('review' in product)&&!('aggregateRating' in product),'Must not fabricate reviews');
console.log('PASS: Bem Moema AP0202 visible 80m² unit and reference BRL Offer; schema-only change; no inventory/review assertions');
