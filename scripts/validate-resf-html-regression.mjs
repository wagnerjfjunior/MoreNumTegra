#!/usr/bin/env node
// RESF frozen-page regression guard, extracted from PostalAddress test.
// This check is independent of postal address and schema modifications.
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const BASE='9c8bdc74cb83dc9c9566f87d9288daf25f10c051';
const pages=[
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
const withoutJsonLd=html=>html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,'<script type="application/ld+json"></script>');
const documents=html=>[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m=>JSON.parse(m[1]));
const address=html=>documents(html).flatMap(x=>x['@graph']||[x]).find(x=>x['@type']==='ApartmentComplex')?.address;
const sabrina='<p>Ao chegar ao estande de vendas do Mozae Higienópolis, solicite atendimento por <strong>Sabrina da Tegra</strong>. Para agendar sua visita, fale pelo <a href="https://wa.me/5511960779328?text=Ol%C3%A1%2C%20quero%20agendar%20uma%20visita%20ao%20Mozae%20Higien%C3%B3polis%20com%20Sabrina%20da%20Tegra." target="_blank" rel="noopener noreferrer">WhatsApp (11) 96077-9328</a>.</p>';
let checked=0;
for(const [slug,street,cep] of pages){
 const filename='src-greenn/empreendimentos/'+slug+'/index.html';
 const original=execFileSync('git',['show',BASE+':'+filename],{encoding:'utf8'});
 const candidate=readFileSync(filename,'utf8');
 const prior=address(original);
 if(prior?.streetAddress!==street||prior?.postalCode!==cep)continue;
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
   const count=candidate.split(sabrina).length-1;
   assert(count===0||count===1,'Mozae: stand guidance duplicated');
   assert(!withoutJsonLd(original).includes(sabrina),'Mozae: frozen baseline unexpectedly contains guidance');
   assert.equal(withoutJsonLd(candidate.replace(sabrina,'')),withoutJsonLd(original),'Mozae: changes outside specifically approved Sabrina guidance');
 }else{
   assert.equal(withoutJsonLd(candidate),withoutJsonLd(original),slug+': previously complete page visible/runtime HTML changed');
 }
 checked++;
 console.log('RESF_HTML_REGRESSION_PASS',slug);
}
assert.equal(checked,7,'Expected seven historically complete pages');
console.log('RESF_HTML_REGRESSION_PASS: seven protected pages');
