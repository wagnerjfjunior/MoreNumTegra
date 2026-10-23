#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';

function restoreApprovedBemMoemaSurface(html){
  // Four exact, operator-approved M5-06 changes; everything else remains frozen.
  const changes=[["<div class=\"map-card\"><div class=\"map-visual\"><iframe class=\"map-frame\" title=\"Mapa da região de Moema\" loading=\"lazy\" src=\"https://maps.google.com/maps?hl=pt-BR&output=embed&q=Moema%2C%20S%C3%A3o%20Paulo%2C%20SP&z=14\" tabindex=\"-1\" aria-hidden=\"true\"></iframe><a class=\"map-hit\" href=\"https://wa.me/5511960779328?text=Por%20favor%20me%20envie%20a%20localiza%C3%A7%C3%A3o%20exata%20do%20Bem%20Moema.\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Solicitar localização exata do Bem Moema pelo WhatsApp\"></a></div><div class=\"map-actions\"><span><strong>Região do Bem Moema</strong><small>Toque no mapa ou use o botão para solicitar a localização exata pelo WhatsApp. Conheça também nosso <a href=\"/regioes/moema/\">guia de Moema</a>.</small></span><a class=\"map-whatsapp\" href=\"https://wa.me/5511960779328?text=Por%20favor%20me%20envie%20a%20localiza%C3%A7%C3%A3o%20exata%20do%20Bem%20Moema.\" target=\"_blank\" rel=\"noopener noreferrer\">Solicitar localização</a></div></div>","<div class=\"map-card\"><div class=\"map-visual\"><iframe class=\"map-frame\" title=\"Mapa da região de Moema\" loading=\"lazy\" src=\"https://maps.google.com/maps?hl=pt-BR&output=embed&q=Moema%2C%20S%C3%A3o%20Paulo%2C%20SP&z=14\" tabindex=\"-1\" aria-hidden=\"true\"></iframe><a class=\"map-hit\" href=\"/regioes/moema/\" aria-label=\"Ver página de Moema\"></a></div><div class=\"map-actions\"><span><strong>Veja também a página de Moema</strong><small>Compare as oportunidades Tegra da região.</small></span><a class=\"map-whatsapp\" href=\"/regioes/moema/\">Ver Moema</a></div></div>"],["<a class=\"btn yellow\" href=\"#formulario\" data-form-intent=\"conditions\">Receber condições →</a>","<a class=\"btn yellow\" href=\"#formulario\">Receber condições →</a>"],["<a class=\"quick-lead\" href=\"#formulario\" data-form-intent=\"conditions\">Receber condições</a>","<a class=\"quick-lead\" href=\"#formulario\">Receber condições</a>"],["<option value=\"Negociar meu cenário\">Negociar meu cenário</option>",""]];
  for(const [current,previous] of changes){
    assert.equal(html.split(current).length,2,'Approved Bem Moema delta missing/duplicated');
    html=html.replace(current,previous);
  }
  return html;
}
function restoreMatchPointCopy(s){
  // Only revert the explicitly approved commercial changes before the historical HTML freeze check.
  const updates=[['1.550.000','1.811.200'],['1550000.00','1811200.00'],['R$ 19.300/m² (referência do Match Point)','R$ 22.640/m²']];
  for(const [now,prior] of updates){if(now==='1550000.00'&&!s.includes(now))continue;assert(s.includes(now),'Match Point commercial copy missing: '+now);s=s.replaceAll(now,prior);}
  return s;
}
const path='src-greenn/empreendimentos/bem-moema/index.html';
const baseline='08e727aa879ab2f4afa996dfbbe40aade85c3c72';
const html=readFileSync(path,'utf8');
const original=execFileSync('git',['show',baseline+':'+path],{encoding:'utf8'});
const pat=/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i;
const oldBlock=original.match(pat),newBlock=html.match(pat);
assert(oldBlock&&newBlock,'Expected exactly one schema block');
assert.equal(restoreApprovedBemMoemaSurface(restoreMatchPointCopy(html.replace(newBlock[1],oldBlock[1]))),original,'Changes outside JSON-LD and the approved M5-06 map/form deltas are prohibited');
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
assert.equal(offer.price,'1550000.00');
const visible='Unidade AP0202 · 80 m² · R$ 19.300/m² (referência do Match Point) · valor de referência R$ 1.550.000';
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
