#!/usr/bin/env node
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
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
  for(const [now,prior] of updates){assert(s.includes(now),'Match Point commercial copy missing: '+now);s=s.replaceAll(now,prior);}
  return s.replaceAll('AP202','AP0202').replaceAll('ap202','ap0202');
}
const path='src-greenn/empreendimentos/bem-moema/index.html';
const baseline='b5da71bf80cacc115026466f5b37c79a7f98e13c';
const before=execFileSync('git',['show',baseline+':'+path],{encoding:'utf8'});
const after=readFileSync(path,'utf8'),rx=/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i;
const old=before.match(rx),now=after.match(rx);
assert(old&&now);
assert.equal(restoreApprovedBemMoemaSurface(restoreMatchPointCopy(after.replace(now[1],old[1]))),before,'Visible HTML/JS, form, metadata and media must not change outside approved M5-06 deltas');
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
assert.deepEqual(one('Product').isRelatedTo,{'@id':project['@id']},'AP202 must link to its own project');
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
 if(oldNode['@type']==='Product'){assert.equal(curr.additionalProperty?.value,'Unidade AP202 · 80 m² · R$ 19.300/m² (referência do Match Point) · valor de referência R$ 1.550.000');normalized.additionalProperty=structuredClone(oldNode.additionalProperty);}
 if(oldNode['@type']==='Offer'){assert.equal(curr.price,'1550000.00');normalized.price=oldNode.price;normalized.description=oldNode.description;}
 assert.deepEqual(normalized,oldNode,'Unexpected delta in '+oldNode['@type']);
}
assert.equal(one('Offer').price,'1550000.00');
assert(!('availability' in one('Offer')));
console.log('PASS Bem Moema 18-node factual Orbita-pattern parity: 3 source-backed plans; unchanged media, forms, price, and onsite agent');
