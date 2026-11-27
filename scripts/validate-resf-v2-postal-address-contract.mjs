#!/usr/bin/env node
import {verifiedPreV3} from "./lib/consent-v3-migration.mjs";
import {isG01ApprovedPath,assertG01ApprovedSnapshot} from "./lib/resf-g01-approved-snapshot.mjs";
// Freeze original JSON-LD graph, allowing ONLY user-approved apartment complex PostalAddress.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';

// A06-L01: owner-authorized exact metadata delta only. All existing snapshot
// comparisons remain active. No wildcard normalization of the head or graph.
const A06_META = {
  "ampere-brooklin": {
    "pairs": [
      [
        "<title>Tegra Ampère Brooklin | Apartamentos de 262 m² no Brooklin</title>",
        "<title>Ampère Brooklin Tegra | Apartamentos de 262 m² e 4 suítes</title>"
      ],
      [
        "<meta name=\"description\" content=\"Conheça o Tegra Ampère Brooklin: apartamentos em construção de 262 m², 4 suítes, 4 vagas e dois terraços em torre única. Consulte plantas e condições.\">",
        "<meta name=\"description\" content=\"Apartamentos de alto padrão no Brooklin, com 262 m², 4 suítes, 4 vagas e dois terraços. Conheça as plantas e consulte as condições.\">"
      ],
      [
        "<meta property=\"og:title\" content=\"Tegra Ampère Brooklin | Apartamentos de 262 m² no Brooklin\">",
        "<meta property=\"og:title\" content=\"Ampère Brooklin Tegra | Apartamentos de 262 m² e 4 suítes\">"
      ],
      [
        "<meta property=\"og:description\" content=\"Conheça o Tegra Ampère Brooklin: apartamentos em construção de 262 m², 4 suítes, 4 vagas e dois terraços em torre única. Consulte plantas e condições.\">",
        "<meta property=\"og:description\" content=\"Apartamentos de alto padrão no Brooklin, com 262 m², 4 suítes, 4 vagas e dois terraços. Conheça as plantas e consulte as condições.\">"
      ],
      [
        "<meta name=\"twitter:title\" content=\"Tegra Ampère Brooklin | Apartamentos de 262 m² no Brooklin\">",
        "<meta name=\"twitter:title\" content=\"Ampère Brooklin Tegra | Apartamentos de 262 m² e 4 suítes\">"
      ],
      [
        "<meta name=\"twitter:description\" content=\"Conheça o Tegra Ampère Brooklin: apartamentos em construção de 262 m², 4 suítes, 4 vagas e dois terraços em torre única. Consulte plantas e condições.\">",
        "<meta name=\"twitter:description\" content=\"Apartamentos de alto padrão no Brooklin, com 262 m², 4 suítes, 4 vagas e dois terraços. Conheça as plantas e consulte as condições.\">"
      ]
    ],
    "id": "https://www.moretegra.com.br/empreendimentos/ampere-brooklin/#webpage",
    "before": {
      "name": "Tegra Ampère Brooklin | Apartamentos de 262 m² no Brooklin",
      "description": "Conheça o Tegra Ampère Brooklin: apartamentos em construção de 262 m², 4 suítes, 4 vagas e dois terraços em torre única. Consulte plantas e condições."
    },
    "after": {
      "name": "Ampère Brooklin Tegra | Apartamentos de 262 m² e 4 suítes",
      "description": "Apartamentos de alto padrão no Brooklin, com 262 m², 4 suítes, 4 vagas e dois terraços. Conheça as plantas e consulte as condições."
    }
  },
  "aria-higienopolis": {
    "pairs": [
      [
        "<title>Ária Tegra Higienópolis | Studios e apartamentos prontos</title>",
        "<title>Ária Higienópolis Tegra | Studios e Apartamentos Prontos</title>"
      ],
      [
        "<meta name=\"description\" content=\"Conheça o Ária Higienópolis: studios de 30 m², apartamentos de 53 m² com 1 ou 2 dormitórios, salas comerciais, rooftop com piscina e empreendimento entregue.\">",
        "<meta name=\"description\" content=\"Conheça o Ária Higienópolis: studios de 30 m² e apartamentos de 53 m² prontos para morar. Consulte preços, plantas e condições.\">"
      ],
      [
        "<meta property=\"og:title\" content=\"Ária Tegra Higienópolis | Studios e apartamentos prontos\">",
        "<meta property=\"og:title\" content=\"Ária Higienópolis Tegra | Studios e Apartamentos Prontos\">"
      ],
      [
        "<meta property=\"og:description\" content=\"Studios de 30 m² e apartamentos de 53 m² em empreendimento entregue, com rooftop e piscina em Higienópolis.\">",
        "<meta property=\"og:description\" content=\"Conheça o Ária Higienópolis: studios de 30 m² e apartamentos de 53 m² prontos para morar. Consulte preços, plantas e condições.\">"
      ],
      [
        "<meta name=\"twitter:title\" content=\"Ária Tegra Higienópolis | Studios e apartamentos prontos\">",
        "<meta name=\"twitter:title\" content=\"Ária Higienópolis Tegra | Studios e Apartamentos Prontos\">"
      ],
      [
        "<meta name=\"twitter:description\" content=\"Conheça tipologias, lazer, localização e condições do Ária Higienópolis.\">",
        "<meta name=\"twitter:description\" content=\"Conheça o Ária Higienópolis: studios de 30 m² e apartamentos de 53 m² prontos para morar. Consulte preços, plantas e condições.\">"
      ]
    ],
    "id": "https://www.moretegra.com.br/empreendimentos/aria-higienopolis/#webpage",
    "before": {
      "name": "Ária Tegra Higienópolis | Studios e apartamentos prontos",
      "description": "Página do Ária Higienópolis, empreendimento entregue com studios, apartamentos, salas comerciais, lazer e rooftop."
    },
    "after": {
      "name": "Ária Higienópolis Tegra | Studios e Apartamentos Prontos",
      "description": "Conheça o Ária Higienópolis: studios de 30 m² e apartamentos de 53 m² prontos para morar. Consulte preços, plantas e condições."
    }
  },
  "ypy-alto-do-ipiranga": {
    "pairs": [
      [
        "<title>YPY Alto do Ipiranga Tegra | Apartamentos 65 e 80 m²</title>",
        "<title>YPY Alto do Ipiranga Tegra | Apartamentos de 2 e 3 Dorms.</title>"
      ],
      [
        "<meta name=\"description\" content=\"YPY Alto do Ipiranga Tegra: apartamentos de 65 e 80 m², 2 ou 3 dormitórios e lazer completo perto do metrô. Consulte unidades e condições.\">",
        "<meta name=\"description\" content=\"Conheça o YPY Alto do Ipiranga: apartamentos de 65 e 80 m², 2 ou 3 dormitórios com suíte, próximos ao metrô. Consulte plantas, preços e condições.\">"
      ],
      [
        "<meta property=\"og:title\" content=\"YPY Alto do Ipiranga Tegra\">",
        "<meta property=\"og:title\" content=\"YPY Alto do Ipiranga Tegra | Apartamentos de 2 e 3 Dorms.\">"
      ],
      [
        "<meta property=\"og:description\" content=\"Apartamentos de 65 e 80 m² no Alto do Ipiranga, com lazer e proximidade ao metrô.\">",
        "<meta property=\"og:description\" content=\"Conheça o YPY Alto do Ipiranga: apartamentos de 65 e 80 m², 2 ou 3 dormitórios com suíte, próximos ao metrô. Consulte plantas, preços e condições.\">"
      ],
      [
        "<meta name=\"twitter:title\" content=\"YPY Alto do Ipiranga Tegra\">",
        "<meta name=\"twitter:title\" content=\"YPY Alto do Ipiranga Tegra | Apartamentos de 2 e 3 Dorms.\">"
      ],
      [
        "<meta name=\"twitter:description\" content=\"Conheça o YPY Alto do Ipiranga e consulte unidades e condições.\">",
        "<meta name=\"twitter:description\" content=\"Conheça o YPY Alto do Ipiranga: apartamentos de 65 e 80 m², 2 ou 3 dormitórios com suíte, próximos ao metrô. Consulte plantas, preços e condições.\">"
      ]
    ],
    "id": "https://www.moretegra.com.br/empreendimentos/ypy-alto-do-ipiranga/#webpage",
    "before": {
      "name": "YPY Alto do Ipiranga Tegra | Apartamentos 65 e 80 m²",
      "description": "YPY Alto do Ipiranga Tegra: apartamentos de 65 e 80 m², 2 ou 3 dormitórios e lazer completo próximo ao metrô."
    },
    "after": {
      "name": "YPY Alto do Ipiranga Tegra | Apartamentos de 2 e 3 Dorms.",
      "description": "Conheça o YPY Alto do Ipiranga: apartamentos de 65 e 80 m², 2 ou 3 dormitórios com suíte, próximos ao metrô. Consulte plantas, preços e condições."
    }
  },
  "mozae-higienopolis": {
    "pairs": [
      [
        "<title>Mozae Higienópolis Tegra | Apartamentos 46 e 73 m²</title>",
        "<title>Mozae Higienópolis Tegra | Apartamentos de 1 e 2 Suítes</title>"
      ],
      [
        "<meta name=\"description\" content=\"Mozae Higienópolis Tegra: torre única com apartamentos de 46 e 73 m², 1 ou 2 suítes, rooftop e lazer. Consulte unidades e condições.\">",
        "<meta name=\"description\" content=\"Conheça o Mozae Higienópolis: apartamentos de 46 e 73 m², 1 ou 2 suítes, torre única, rooftop e 1 vaga. Consulte plantas, preços e condições.\">"
      ],
      [
        "<meta property=\"og:title\" content=\"Mozae Higienópolis Tegra\">",
        "<meta property=\"og:title\" content=\"Mozae Higienópolis Tegra | Apartamentos de 1 e 2 Suítes\">"
      ],
      [
        "<meta property=\"og:description\" content=\"Apartamentos de 46 e 73 m² em torre única em Higienópolis.\">",
        "<meta property=\"og:description\" content=\"Conheça o Mozae Higienópolis: apartamentos de 46 e 73 m², 1 ou 2 suítes, torre única, rooftop e 1 vaga. Consulte plantas, preços e condições.\">"
      ],
      [
        "<meta name=\"twitter:title\" content=\"Mozae Higienópolis Tegra\">",
        "<meta name=\"twitter:title\" content=\"Mozae Higienópolis Tegra | Apartamentos de 1 e 2 Suítes\">"
      ],
      [
        "<meta name=\"twitter:description\" content=\"Conheça o Mozae Higienópolis e consulte unidades e condições.\">",
        "<meta name=\"twitter:description\" content=\"Conheça o Mozae Higienópolis: apartamentos de 46 e 73 m², 1 ou 2 suítes, torre única, rooftop e 1 vaga. Consulte plantas, preços e condições.\">"
      ]
    ],
    "id": "https://www.moretegra.com.br/empreendimentos/mozae-higienopolis/#webpage",
    "before": {
      "name": "Mozae Higienópolis Tegra | Apartamentos 46 e 73 m²",
      "description": "Mozae Higienópolis Tegra: torre única com apartamentos de 46 e 73 m², 1 ou 2 suítes e lazer em Higienópolis."
    },
    "after": {
      "name": "Mozae Higienópolis Tegra | Apartamentos de 1 e 2 Suítes",
      "description": "Conheça o Mozae Higienópolis: apartamentos de 46 e 73 m², 1 ou 2 suítes, torre única, rooftop e 1 vaga. Consulte plantas, preços e condições."
    }
  }
};
function restoreA06L02C(html, slug) {
 if(slug!=='ypy-alto-do-ipiranga')return html;
 for(const [approved,prior,count] of [["Alto do Ipiranga · São Paulo · Pronto para morar","Alto do Ipiranga · São Paulo · Em construção",1],["<b>Entregue</b><span>Pronto para morar</span>","<b>Em construção</b><span>status oficial</span>",1],["<p>O YPY Alto do Ipiranga está entregue. Consulte as unidades disponíveis e as condições de compra.</p>","<p>A fonte oficial Tegra consultada apresenta o YPY como em construção.</p>",1],["\"text\":\"O YPY Alto do Ipiranga está entregue. Consulte as unidades disponíveis e as condições de compra.\"","\"text\":\"A página oficial da Tegra consultada apresenta o empreendimento como em construção.\"",1],["Empreendimento Tegra entregue no Alto do Ipiranga com apartamentos de 65 e 80 m², 2 ou 3 dormitórios, 1 suíte e 1 vaga.","Empreendimento Tegra no Alto do Ipiranga com apartamentos de 65 e 80 m², 2 ou 3 dormitórios, 1 suíte e 1 vaga.",1],["YPY Alto do Ipiranga Tegra | Apartamentos Prontos","YPY Alto do Ipiranga Tegra | Apartamentos de 2 e 3 Dorms.",4],["Apartamentos prontos no YPY Alto do Ipiranga: 65 e 80 m², 2 ou 3 dormitórios com suíte, perto do metrô. Consulte plantas, preços e condições.","Conheça o YPY Alto do Ipiranga: apartamentos de 65 e 80 m², 2 ou 3 dormitórios com suíte, próximos ao metrô. Consulte plantas, preços e condições.",4]]) {
  assert.equal(html.split(approved).length,count+1,slug+': L02C exact delta mismatch: '+approved);
  html=html.split(approved).join(prior);
 }
 return html;
}
function restoreA06Metadata(html, slug) {
 html=restoreA06L02C(html,slug);
 const rule=A06_META[slug];
 if(!rule)return html;
 const replaceOnce=(source,from,to)=>{
  assert.equal(source.split(from).length,2,slug+': A06 exact metadata missing, duplicated or changed');
  return source.replace(from,to);
 };
 const head=html.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0];
 assert(head,slug+': head missing');
 assert.equal((head.match(/<title\b/gi)||[]).length,1,slug+': duplicate title');
 for(const key of ['description','og:title','og:description','twitter:title','twitter:description']){
  const tags=[...head.matchAll(/<meta\b[^>]*>/gi)].filter(m=>new RegExp('\\b(?:name|property)\\s*=\\s*["\\\']'+key+'["\\\']','i').test(m[0]));
  assert.equal(tags.length,1,slug+': duplicate or missing '+key);
 }
 let out=html;
 for(const [prior,approved] of rule.pairs)out=replaceOnce(out,approved,prior);
 const blocks=[...out.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
 assert.equal(blocks.length,1,slug+': A06 graph count');
 const body=blocks[0][1], doc=JSON.parse(body);
 assert.equal(JSON.stringify(doc),body,slug+': A06 graph must remain compact and unambiguous');
 const nodes=(doc['@graph']||[doc]).filter(n=>n['@type']==='WebPage');
 assert.equal(nodes.length,1,slug+': WebPage count');
 const node=nodes[0];
 assert.equal(node['@id'],rule.id,slug+': WebPage identity');
 for(const key of ['name','description']){
  assert.equal(node[key],rule.after[key],slug+': A06 WebPage '+key);
  node[key]=rule.before[key];
 }
 return replaceOnce(out,body,JSON.stringify(doc));
}

// SFJM 2026-11-15: 'brand' is not a schema.org property of ApartmentComplex (Place). The approved snapshot pages
// (Garden Design, Mozae, YPY) accept exactly one delta: that property removed from the ApartmentComplex node.
const SNAPSHOT_BRAND_SLUGS=['garden-design','mozae-higienopolis','ypy-alto-do-ipiranga'];
const snapshotWithoutComplexBrand=html=>html.replace(/(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/i,(m,open,body,close)=>{
 const doc=JSON.parse(body);
 assert.equal(JSON.stringify(doc),body,'brand delta: snapshot JSON-LD must be compact so only the brand property changes');
 const complex=(doc['@graph']||[doc]).find(x=>x['@type']==='ApartmentComplex');
 assert(complex&&complex.brand&&complex.brand['@id']==='https://www.moretegra.com.br/#tegra-brand','brand delta: snapshot must carry the Tegra brand reference on ApartmentComplex');
 delete complex.brand;
 return open+JSON.stringify(doc)+close;
});
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
// Bueno Brandão 257: bounded RESF editorial FAQ/title amendment.
// All other project/schema nodes remain under the frozen postal baseline check.
function normalizeBuenoEditorial(ds,baselineDs,slug,html){
 if(slug!=='bueno-brandao-257')return ds;
 const out=structuredClone(ds),nodes=flat(out),old=flat(baselineDs);
 const page=nodes.find(n=>n['@type']==='WebPage'),priorPage=old.find(n=>n['@id']===page?.['@id']);
 const faq=nodes.find(n=>n['@type']==='FAQPage'),priorFaq=old.find(n=>n['@id']===faq?.['@id']);
 assert(page&&priorPage&&faq&&priorFaq,'Bueno editorial graph nodes missing');
 const title=(html.match(/<title>([^<]+)<\/title>/)||[])[1];
 assert.equal(page.name,title,'Bueno WebPage name must match title');
 assert.equal(faq.mainEntity.length,10,'Bueno RESF editorial FAQ count changed unexpectedly');
 const visible=[...html.matchAll(/<details><summary>([^<]+)<\/summary><p>([^<]+)<\/p><\/details>/g)];
 assert.equal(visible.length,10,'Bueno visible FAQ count changed');
 faq.mainEntity.forEach((q,i)=>{assert.equal(q.name,visible[i][1]);assert.equal(q.acceptedAnswer?.text,visible[i][2])});
 const route='https://www.moretegra.com.br/empreendimentos/bueno-brandao-257/';
 const extraTypes=['Person','Service','Product','Offer','Product','Offer'];
 const added=nodes.filter(n=>!old.some(x=>x['@id']===n['@id']));
 assert.deepEqual(added.map(x=>x['@type']).sort(),extraTypes.sort(),'Bueno: unapproved schema entities');
 const byId=id=>nodes.find(n=>n['@id']===route+'#'+id);
 const p500=byId('product-500'),o500=byId('offer-500'),p923=byId('product-923'),o923=byId('offer-923');
 assert(p500&&o500&&p923&&o923,'Bueno two commercial pairs absent');
 assert.equal(o500.price,'21750000.00');assert.equal(o923.price,'50000000.00');
 for(const [product,offer,code] of [[p500,o500,'500'],[p923,o923,'923']]){
  assert.equal(offer.priceCurrency,'BRL');
  assert.equal(offer.itemOffered?.['@id'],product['@id']);
  assert.equal(product.offers?.['@id'],offer['@id']);
  assert.equal(product.isRelatedTo?.['@id'],route+'#project');
  assert.equal(product.url,route+'?unidade='+code+'#valores');
  assert.equal(offer.url,product.url);
  assert(!Object.hasOwn(offer,'availability'),'Bueno unverified availability forbidden');
  assert(html.includes(code==='500'?'R$ 21.750.000':'R$ 50.000.000'),'Bueno price not visible');
 }
 // Commercial precision exception approved 2026-10-18: exact identifiers and areas.
 // Compare historic schema only after asserting the precise new facts.
 assert.equal(p500.additionalProperty?.value,'Unidade AP0031 · 500 m² · 5 suítes · 5 vagas');
 assert.equal(p923.additionalProperty?.value,'Cobertura duplex AP0251 · 923,58 m² · 5 suítes · 7 vagas');
 assert(p500.name.includes('AP0031'),'Bueno AP0031 absent');
 assert(p923.name.includes('AP0251')&&p923.name.includes('923,58'),'Bueno AP0251 absent');
 assert(!p923.name.includes('AP0031'),'Bueno coverage identity conflated');
 assert(o923.description.includes('AP0251'),'Bueno coverage offer not tied to AP0251');
 const fp=nodes.filter(n=>n['@type']==='FloorPlan');
 assert(fp.some(n=>n.name.includes('AP0031'))&&fp.some(n=>n.name.includes('AP0021'))&&fp.some(n=>n.name.includes('AP0251')),'Bueno floorplan identities missing');
 const agent=nodes.find(n=>n['@type']==='Person'),service=byId('atendimento');
 assert(agent&&service,'Bueno agent/service missing');
 assert.equal(service.broker?.['@id'],agent['@id']);
 assert.equal(service.provider?.['@id'],'https://www.moretegra.com.br/#tegra-vendas');
 assert.deepEqual(page.mentions,[
  {'@id':route+'#project'},
  {'@id':'https://www.moretegra.com.br/#sabrina-da-tegra'},
  {'@id':p500['@id']},{'@id':p923['@id']}
 ]);
 for(const doc of out)if(doc['@graph'])doc['@graph']=doc['@graph'].filter(n=>!added.some(a=>a['@id']===n['@id']));
 const complex=nodes.find(n=>n['@type']==='ApartmentComplex');
 const priorComplex=old.find(n=>n['@id']===complex?.['@id']);
 assert(complex&&priorComplex,'Bueno ApartmentComplex missing');
 assert(!Object.hasOwn(complex,'brand'),'Bueno ApartmentComplex must not declare unsupported brand');
 assert.deepEqual(priorComplex.brand,{'@id':'https://www.moretegra.com.br/#tegra-brand'},'Bueno baseline brand contract changed');
 // Bounded factual evolution: October 2026 Tegra sales mirror + 2022 memorial.
 assert(complex.description.includes('raia de 25 m'),'Bueno memorial detail absent');
 complex.description=priorComplex.description;
 for(const name of ['floorplan-500','floorplan-711','floorplan-923']){
  const node=byId(name),prev=old.find(n=>n['@id']===node?.['@id']);
  assert(node&&prev,'Bueno floorplan missing: '+name);
  node.name=prev.name;
  if(name==='floorplan-711'||name==='floorplan-923'){
   const exact=name==='floorplan-711'?711.67:923.58;
   assert.equal(node.floorSize?.value,exact,'Bueno: exact governed floor area changed '+name);
   assert.equal(node.floorSize?.unitCode,'MTK','Bueno: floor area unit must remain square meters');
   node.floorSize.value=prev.floorSize.value; // historical postal baseline comparison only
  }
 }

 // Restore the historical baseline property only in the comparison copy.
 // The published schema correctly omits unsupported ApartmentComplex.brand.
 complex.brand=structuredClone(priorComplex.brand);
 page.mentions=structuredClone(priorPage.mentions);
 page.name=priorPage.name;
 faq.mainEntity=structuredClone(priorFaq.mainEntity);
 return out;
}
let changed=0,completeUnchanged=0;
for(const [slug,street,cep] of expected){
 const filename='src-greenn/empreendimentos/'+slug+'/index.html';
 const original=execFileSync('git',['show',BASE+':'+filename],{encoding:'utf8'});
 const g01=isG01ApprovedPath(filename);
 const live=readFileSync(filename,'utf8');
 const candidateRaw=g01?assertG01ApprovedSnapshot(filename,live):restoreA06Metadata(verifiedPreV3(filename),slug);
 // SFJM 2026-11-15: approved internal-link module (HTML only, no JSON-LD) on four protected pages; Ampère handled in its own branch.
 const SFJM_STRIP=['aria-higienopolis','mozae-higienopolis','ledge-brooklin','ypy-alto-do-ipiranga'];
 const SFJM_CSS=[".mnb{margin:26px 0 0;padding:0;list-style:none;border-top:1px solid var(--line)}.mnb li{border-bottom:1px solid var(--line);padding:16px 0}.mnb a{color:var(--ink);font-weight:800;text-decoration:underline;text-decoration-color:var(--yellow);text-underline-offset:4px}.mnb span{display:block;max-width:820px;color:var(--muted);margin-top:4px}",".mnb{margin:26px 0 0;padding:0;list-style:none;border-top:1px solid rgba(128,128,128,.4)}.mnb li{border-bottom:1px solid rgba(128,128,128,.4);padding:16px 0}.mnb a{color:inherit;font-weight:800;text-decoration:underline;text-decoration-color:#EBB92E;text-underline-offset:4px}.mnb span{display:block;max-width:820px;opacity:.78;margin-top:4px}"];
 const sfjmStrip=html=>{
  const mod=[...html.matchAll(/<section [^>]*id="mais-no-bairro"[\s\S]*?<\/section>/g)];
  assert.equal(mod.length,1,slug+': internal-link module must occur exactly once');
  assert([...mod[0][0].matchAll(/href="([^"]*)"/g)].every(m=>/^\/(regioes|empreendimentos)\/[a-z0-9-]+\/$/.test(m[1])),slug+': module links must be internal');
  const css=SFJM_CSS.filter(c=>html.includes(c)); assert.equal(css.length,1,slug+': module CSS must occur exactly once');
  return html.replace(mod[0][0],'').replace(css[0],'');
 };
 const candidate=!g01&&SFJM_STRIP.includes(slug)?sfjmStrip(candidateRaw):candidateRaw;
 const before=documents(original),after=documents(candidate);
 if(!g01){ // Historical schema deltas apply only outside exact approved G01 release.
 const approvedCommercialSlugs=['aria-higienopolis','bem-moema','bem-moema-studios-offices','garden-design','mozae-higienopolis','ypy-alto-do-ipiranga'];
 if(approvedCommercialSlugs.includes(slug)){
  // Owner-approved commercial candidate: strict full-file snapshot, not an unchecked exemption.
  // Project postal address / CEP / municipality checks continue outside this branch.
  const approvedSnapshot=slug==='mozae-higienopolis'?'bdf2f66b74a89a1a6b0fb2fddcc7ad5245fad862':'f1324ef2fbee1e33179385ec1f189c1dd5bb98cf';
  // Mozae: owner-authorized market-intelligence editorial snapshot; still strict full-file parity.
  const approved=execFileSync('git',['show',approvedSnapshot+':'+filename],{encoding:'utf8'});
  // Accept only the seven descriptive thumbnail alts copied from the approved data-alt.
  let approvedWithThumbAlts=slug==='aria-higienopolis'?approved.replace(/(<button\b[^>]*class="mt-gallery-thumb"[^>]*data-alt="([^"]+)"[^>]*>)(<img\b[^>]*>)/g,(m,button,alt,img)=>button+img.replace('alt=""','alt="'+alt+'"')):approved;
  // Owner-approved measurement-only additions; full snapshot comparison remains strict.
  if(slug==='aria-higienopolis')approvedWithThumbAlts=approvedWithThumbAlts.replace('<html lang="pt-BR"','<html lang="pt-BR"'+" data-mnt-page-identity=\"aria_higienopolis_project\" data-mnt-product-identity=\"aria-higienopolis\" data-mnt-route=\"/empreendimentos/aria-higienopolis/\"").replace('<body','<body data-moretegra').replace('</body>',"<script src=\"/src-greenn/preview/measurement-core.js\" defer></script><script src=\"/src-greenn/preview/measurement-form.js\" defer></script>"+'</body>');
  assert.equal(candidate,SNAPSHOT_BRAND_SLUGS.includes(slug)?snapshotWithoutComplexBrand(approvedWithThumbAlts):approvedWithThumbAlts,slug+': approved commercial runtime HTML/schema has drifted');
 }else if(slug==='ampere-brooklin'){
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
   // The Sep/Oct historical normalization predates owner-approved commercial
    // conditions, hero/FACTS and WhatsApp. Pin the FULL approved integrated
    // HTML as the new immutable runtime snapshot; the postal/schema invariants
    // above still check historical facts independently.
    const approvedHtml=execFileSync('git',['show','ffe7dd2183e51360c8ecf6a217f61605b8ca652a:'+filename],{encoding:'utf8'});
    // SFJM 2026-11-15: remove only the approved internal-link module, its CSS and the approved H1, then require exact snapshot equality.
    const sfjmMods=[...candidate.matchAll(/<section [^>]*id="mais-no-bairro"[\s\S]*?<\/section>/g)];
    assert.equal(sfjmMods.length,1,'Ampere: internal-link module must occur exactly once');
    assert([...sfjmMods[0][0].matchAll(/href="([^"]*)"/g)].every(m=>/^\/(regioes|empreendimentos)\/[a-z0-9-]+\/$/.test(m[1])),'Ampere: module links must be internal');
    const sfjmCss=".mnb{margin:26px 0 0;padding:0;list-style:none;border-top:1px solid var(--line)}.mnb li{border-bottom:1px solid var(--line);padding:16px 0}.mnb a{color:var(--ink);font-weight:800;text-decoration:underline;text-decoration-color:var(--yellow);text-underline-offset:4px}.mnb span{display:block;max-width:820px;color:var(--muted);margin-top:4px}";
    assert.equal(candidate.split(sfjmCss).length,2,'Ampere: module CSS must occur exactly once');
    const sfjmH1='<h1 id="title" class="display">Ampère Brooklin Tegra<br>apartamentos de 262 m² e 4 suítes</h1>';
    assert.equal(candidate.split(sfjmH1).length,2,'Ampere: approved H1 missing or modified');
    const sfjmStripped=candidate.replace(sfjmMods[0][0],'').replace(sfjmCss,'').replace(sfjmH1,'<h1 id="title" class="display">Ampère Brooklin</h1>');
    assert.equal(sfjmStripped,approvedHtml,'Ampere full HTML drifted from USER_ACCEPTED integrated release baseline');
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
   // October/2026 Órbita changes only the commercial Product/Offer, not the
   // original ApartmentComplex identity, address, images or FAQ baseline.
   // Normalize legacy baseline shape explicitly; the approved RESF entity
   // already models developer via additionalProperty and the full postal address.
   const oldComplex=baseline.find(n=>n['@type']==='ApartmentComplex');
   const currentComplex=kept.find(n=>n['@type']==='ApartmentComplex');
   assert(oldComplex&&currentComplex,'Órbita: ApartmentComplex missing');
   assert.deepEqual(currentComplex.address, enriched.find(n=>n['@type']==='RealEstateAgent')?.address,'Órbita: on-site agent and project address must match');
   assert.equal(currentComplex.additionalProperty?.value,'Tegra','Órbita: developer attribution must remain Tegra');
   currentComplex.brand=structuredClone(oldComplex.brand);
   delete currentComplex.additionalProperty;
   delete currentComplex.address;
   // Specific RESF V1 FAQ extension: visible/schema parity and original FAQ prefix
   // are separately enforced by validate-orbita-commercial-schema-parity.mjs.
   const approvedFaq=enriched.find(n=>n['@type']==='FAQPage');
   const priorFaq=baseline.find(n=>n['@type']==='FAQPage');
   assert.equal(approvedFaq?.mainEntity?.length,12,'Órbita: require 12 grounded questions');
   assert.deepEqual(approvedFaq.mainEntity.slice(0,6),priorFaq.mainEntity,'Órbita: original FAQ cannot change');
   const normalizedFaq=kept.find(n=>n['@type']==='FAQPage');
   normalizedFaq.mainEntity=structuredClone(priorFaq.mainEntity);
   assert.deepEqual(scrub([{'@graph':kept}]),scrub([{'@graph':baseline}]),'Órbita: original schema entities must remain unchanged except approved new references');
   const newTypes=enriched.filter(n=>!baseline.some(x=>x['@id']===n['@id'])).map(n=>n['@type']);
   // MNT 2026-11-24 (SFJM) — Reconciliação SEO/JSON-LD Órbita: ausência TEMPORÁRIA e INTENCIONAL de Product/Offer
   // até confirmação de preço vigente. A lista exata de tipos novos permanece fechada (sem Product/Offer; 3 FloorPlan).
   const allowed=['Organization','ContactPoint','Person','RealEstateAgent','Service','ImageObject','ImageObject','FloorPlan','FloorPlan','FloorPlan'];
   assert(!enriched.some(n=>n['@type']==='Product'||n['@type']==='Offer'),'Órbita: MNT 2026-11-24 — Product/Offer must stay absent until a current price is confirmed');
   assert.deepEqual(newTypes.slice().sort(),allowed.slice().sort(),'Órbita: only specifically approved commercial/image/plan types may be added');
 }else {
   const normalized=normalizeOnsiteAgent(stripApprovedImages(stripBemMoemaRichEntities(after,slug),before,slug,candidate),before,slug);
   // SFJM 2026-11-15: 'brand' is not a schema.org property of ApartmentComplex (Place). Approved delta: that single
   // property is removed from the ApartmentComplex node on the listed pages; any other schema change still fails.
   const BRAND_REMOVAL_SLUGS=['soma-perdizes','zahle-jardins','chateau-jardin','ypy-alto-do-ipiranga','reserva-caminhos-da-lapa','teg-sacoma','garden-design','ledge-brooklin','nova-vivere','ode-perdizes','mozae-higienopolis'];
   if(BRAND_REMOVAL_SLUGS.includes(slug)){
     const cAfter=flat(normalized).find(n=>n['@type']==='ApartmentComplex'),cBefore=flat(before).find(n=>n['@type']==='ApartmentComplex');
     assert(cAfter&&cBefore,slug+': ApartmentComplex missing');
     assert(!('brand' in cAfter),slug+': ApartmentComplex must not carry brand');
     if('brand' in cBefore){assert.deepEqual(cBefore.brand,{'@id':'https://www.moretegra.com.br/#tegra-brand'},slug+': unexpected baseline brand value');delete cBefore.brand;}
   }
   if(slug==='ode-perdizes'){
     // SFJM 2026-11-23: user-approved removal of unverified price/unit/scarcity claims.
     // Normalize only these exact ODE fields against the frozen baseline; all other JSON-LD changes still fail.
     const current=flat(normalized),prior=flat(before);
     const pageNow=current.find(n=>n['@type']==='WebPage'),pageOld=prior.find(n=>n['@type']==='WebPage');
     const complexNow=current.find(n=>n['@type']==='ApartmentComplex'),complexOld=prior.find(n=>n['@type']==='ApartmentComplex');
     const faqNow=current.find(n=>n['@type']==='FAQPage'),faqOld=prior.find(n=>n['@type']==='FAQPage');
     assert(pageNow&&pageOld&&complexNow&&complexOld&&faqNow&&faqOld,'ODE: required schema nodes missing');
     const oldName='ODE Perdizes Tegra | Última unidade de 156 m² em Perdizes';
     const newName='ODE Perdizes Tegra | Pronto para morar em Perdizes';
     const oldDescription='ODE Perdizes Tegra pronto para morar: 156 m², 4 dormitórios, 2 ou 3 suítes, 2 vagas, plantas oficiais e condição da última unidade 22.';
     const newDescription='Conheça o ODE Perdizes da Tegra: 156 m², 4 dormitórios, 2 ou 3 suítes, 2 vagas, plantas e detalhes do projeto. Consulte as condições comerciais.';
     assert.equal(pageOld.name,oldName,'ODE: unexpected baseline WebPage.name');
     assert.equal(pageNow.name,newName,'ODE: WebPage.name differs from approved value');
     pageOld.name=newName;
     for(const [now,old,label] of [[pageNow,pageOld,'WebPage'],[complexNow,complexOld,'ApartmentComplex']]){
       assert.equal(old.description,oldDescription,'ODE: unexpected baseline '+label+'.description');
       assert.equal(now.description,newDescription,'ODE: '+label+'.description differs from approved value');
       old.description=newDescription;
     }
     const approvedAnswers=[
       ['Qual é o estágio do ODE Perdizes?',
        'O ODE Perdizes está pronto para morar e a condição comercial governada registra a Unidade 22 como última unidade disponível, sujeita à confirmação.',
        'O ODE Perdizes é um empreendimento entregue e pronto para morar em Perdizes, São Paulo.'],
       ['Como consultar preço e disponibilidade?',
        'Use o formulário ou o WhatsApp para confirmar a Unidade 22, disponibilidade e condições vigentes com a Tegra Vendas.',
        'Use o formulário ou o WhatsApp para consultar as condições comerciais e verificar a disponibilidade com a equipe Tegra Vendas.']
     ];
     for(const [name,oldAnswer,newAnswer] of approvedAnswers){
       const old=faqOld.mainEntity.find(q=>q.name===name),now=faqNow.mainEntity.find(q=>q.name===name);
       assert(old&&now,'ODE: FAQ question missing: '+name);
       assert.equal(old.acceptedAnswer.text,oldAnswer,'ODE: unexpected baseline FAQ: '+name);
       assert.equal(now.acceptedAnswer.text,newAnswer,'ODE: FAQ answer differs from approved value: '+name);
       old.acceptedAnswer.text=newAnswer;
     }
   }
   if(slug==='key-moema'){
     // SFJM 2026-11-15: WebPage.description was refreshed editorially after the 9c8bdc7 baseline.
     // Accept only this exact approved text; every other schema change still fails.
     const APPROVED_KEY_MOEMA_DESCRIPTION='Key Moema Tegra: apartamentos de 62 a 74 m², 2 dormitórios, 1 a 2 suítes, a 220 m da Estação Eucaliptos. Consulte disponibilidade e condições.';
     const pageAfter=flat(normalized).find(n=>n['@type']==='WebPage'),pageBefore=flat(before).find(n=>n['@type']==='WebPage');
     assert(pageAfter&&pageBefore,'Key Moema: WebPage missing');
     assert.equal(pageAfter.description,APPROVED_KEY_MOEMA_DESCRIPTION,'Key Moema: WebPage.description differs from the approved editorial text');
     pageBefore.description=APPROVED_KEY_MOEMA_DESCRIPTION;
   }
   if(slug==='soma-perdizes'){
     // SFJM 2026-11-15: three approved FAQ entries were added after the 9c8bdc7 baseline (page enrichment).
     // Accept only these exact questions, inserted before the last baseline question; every other schema change still fails.
     const APPROVED_SOMA_FAQ=['Quais áreas de lazer o Soma Perdizes tem?','O Soma Perdizes tem studios e salas comerciais?','Qual é a diferença entre o Soma Perdizes e o ODE Perdizes?'];
     const faqAfter=flat(normalized).find(n=>n['@type']==='FAQPage'),faqBefore=flat(before).find(n=>n['@type']==='FAQPage');
     assert(faqAfter&&faqBefore,'Soma: FAQPage missing');
     const addedNames=faqAfter.mainEntity.filter(q=>!faqBefore.mainEntity.some(b=>b.name===q.name)).map(q=>q.name);
     assert.deepEqual(addedNames,APPROVED_SOMA_FAQ,'Soma: only the approved FAQ entries may be added');
     faqAfter.mainEntity=faqAfter.mainEntity.filter(q=>!APPROVED_SOMA_FAQ.includes(q.name));
     // SFJM 2026-11-15: Soma gets the Nova Vivere commercial schema pattern. Accept only these exact additions
     // (Organization enrichment plus Person, Service, Product and Offer); everything else must still equal the baseline.
     const APPROVED_SOMA_COMMERCIAL={"org":{"@type":"Organization","@id":"https://www.moretegra.com.br/#tegra-vendas","name":"Tegra Vendas","url":"https://www.moretegra.com.br/","brand":{"@id":"https://www.moretegra.com.br/#tegra-brand"},"contactPoint":{"@id":"https://www.moretegra.com.br/#sabrina-contato"}},"person":{"@type":"Person","@id":"https://www.moretegra.com.br/#sabrina-da-tegra","name":"Sabrina da Tegra","jobTitle":"Corretora de imóveis","identifier":{"@type":"PropertyValue","propertyID":"CRECI-SP","value":"209.905-F"},"worksFor":{"@id":"https://www.moretegra.com.br/#tegra-vendas"},"contactPoint":{"@id":"https://www.moretegra.com.br/#sabrina-contato"},"sameAs":"https://corretor.tegravendas.com.br/sabrina/sp","image":"https://s3-gdigital.s3.amazonaws.com/gdigital/313/sNzJJWhmmsjkZjUV7gCKTgrlzRINCD6yDIAvkZOJ.webp","workLocation":{"@id":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/#project"}},"service":{"@type":"Service","@id":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/#atendimento","name":"Atendimento comercial Soma Perdizes","serviceType":"Atendimento para unidades do Soma Perdizes","provider":{"@id":"https://www.moretegra.com.br/#tegra-vendas"},"broker":{"@id":"https://www.moretegra.com.br/#sabrina-da-tegra"},"areaServed":{"@type":"City","name":"São Paulo"},"url":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/"},"product":{"@type":"Product","@id":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/#product","name":"Soma Perdizes — apartamento unidade 0602 de 45 m²","description":"Apartamento unidade 0602 de 45 m² no Soma Perdizes, empreendimento Tegra mixed use na Avenida Sumaré, em Perdizes.","url":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/","image":["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/314/ImagemPrincipal/Tegra-Incorporadora-Perspectiva-Ilustrada-Voo-Diurno-Fachada-Apartamentos-Studios-Salas-Comerciais-Soma-Perdizes-Sao-Paulo-SP-714x640-1715885527011.jpg"],"brand":{"@id":"https://www.moretegra.com.br/#tegra-brand"},"isRelatedTo":{"@id":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/#project"},"offers":{"@id":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/#offer"},"additionalProperty":{"@type":"PropertyValue","name":"Referência comercial","value":"Unidade 0602 · 45 m² · R$ 14.000/m²"}},"offer":{"@type":"Offer","@id":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/#offer","url":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/","priceCurrency":"BRL","price":"630000","description":"Unidade 0602 · 45 m² · referência de R$ 630.000. Disponibilidade e condições sujeitas à confirmação.","itemOffered":{"@id":"https://www.moretegra.com.br/empreendimentos/soma-perdizes/#product"}}};
     const flatAfter=flat(normalized),flatBefore=flat(before);
     const orgAfter=flatAfter.find(n=>n['@type']==='Organization'),orgBefore=flatBefore.find(n=>n['@type']==='Organization');
     assert(orgAfter&&orgBefore,'Soma: Organization missing');
     assert.deepEqual(orgAfter,APPROVED_SOMA_COMMERCIAL.org,'Soma: Organization differs from the approved enrichment');
     Object.assign(orgBefore,structuredClone(APPROVED_SOMA_COMMERCIAL.org));
     const addedNodes=flatAfter.filter(n=>!flatBefore.some(b=>b['@id']===n['@id']&&b['@type']===n['@type']));
     const approvedAdded=[APPROVED_SOMA_COMMERCIAL.person,APPROVED_SOMA_COMMERCIAL.service,APPROVED_SOMA_COMMERCIAL.product,APPROVED_SOMA_COMMERCIAL.offer];
     assert.deepEqual(addedNodes.filter(n=>n['@type']!=='Question'),approvedAdded,'Soma: only the approved Person, Service, Product and Offer nodes may be added');
     const graphAfter=normalized.find(x=>x['@graph'])?.['@graph'];
     if(graphAfter){for(const n of approvedAdded){const i=graphAfter.findIndex(x=>x['@id']===n['@id']&&x['@type']===n['@type']);assert(i>=0,'Soma: approved node not found in graph');graphAfter.splice(i,1);}}
     // SFJM 2026-11-15: the 'Onde fica' answer was aligned with the visible page copy (Tegra's own wording about the future
     // Estação Perdizes). Accept only this exact text; any other change to that answer still fails.
     const APPROVED_SOMA_WHERE_ANSWER='Em Perdizes, na Avenida Sumaré. A Tegra destaca o empreendimento em frente ao eixo da futura Estação Perdizes da linha laranja, com acesso ao Allianz Parque, Bourbon, West Plaza, Sesc Pompeia e Parque da Água Branca.';
     const whereAfter=faqAfter.mainEntity.find(q=>q.name==='Onde fica o Soma Perdizes?'),whereBefore=faqBefore.mainEntity.find(q=>q.name==='Onde fica o Soma Perdizes?');
     assert(whereAfter&&whereBefore,'Soma: FAQ "Onde fica" missing');
     assert.equal(whereAfter.acceptedAnswer.text,APPROVED_SOMA_WHERE_ANSWER,'Soma: FAQ "Onde fica" answer differs from the approved text');
     whereBefore.acceptedAnswer.text=APPROVED_SOMA_WHERE_ANSWER;
   }
   assert.deepEqual(scrub(normalizeBuenoEditorial(normalized,before,slug,candidate)),scrub(before),slug+': forbidden non-image/non-address schema change');
 }
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
  // Frozen visible HTML is now checked by the independent RESF regression job.
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
