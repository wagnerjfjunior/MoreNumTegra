import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root='docs/editorial/mercado-2026-10-28',path='src-greenn/empreendimentos/riio-by-piero-lissoni/';
const read=p=>readFileSync(p,'utf8'),html=read(path+'index.html');
const ficha=JSON.parse(read(root+'/riio-ficha-tecnica.json')),plans=JSON.parse(read(root+'/riio-plantas.json')),media=JSON.parse(read(root+'/midia.json')),approved=JSON.parse(read(root+'/riio-componentes-aprovados.json'));
for(const [key,pattern] of [['hero',/<section class="riio-hero">[\s\S]*?<\/section>/],['facts',/<section class="facts"[\s\S]*?<\/section>/],['form46',/<form id="moretegra-lead-form"[\s\S]*?<\/form>/]])assert.equal(createHash('sha256').update(html.match(pattern)[0]).digest('hex'),approved.sha256[key],'Approved '+key+' changed');
assert.equal(ficha.buildings.length,9);assert.equal(ficha.terrain_m2,30003.73);
assert.equal(ficha.buildings.reduce((n,b)=>n+b.rows.reduce((total,row)=>total+row.quantity,0),0),132);
const technical=html.match(/<section[^>]+id="tipologias"[\s\S]*?<\/section>/)[0];
assert(technical.includes('30.003,73 m²'));assert(!technical.includes('.pdf'),'Ficha must be integrated, not a PDF substitute');
for(const b of ficha.buildings){
 const card=technical.match(new RegExp('<article class="riio-building" id="edificio-'+b.name.toLowerCase()+'">([\\s\\S]*?)</article>'))[1];
 assert.equal((card.match(/<tr>/g)||[]).length,b.rows.length+1,'Every configuration of '+b.name+' must be present');
 for(const row of b.rows)assert(card.includes('<b>'+row.quantity+'</b> '+row.type.toLowerCase()),'Unit group omitted: '+b.name);
}
assert(html.includes('Avenida Lúcio Costa, 4900 e Avenida Peregrino Junior, 133'));
const galleries=[...html.matchAll(/<div class="riio-viewer[^>]+data-riio-gallery="([^\"]+)"[\s\S]*?<script type="application\/json" data-gallery-data>([\s\S]*?)<\/script>/g)];
assert.deepEqual(galleries.map(x=>x[1]),['ambientes','plantas']);
const photos=JSON.parse(galleries[0][2]),plateItems=JSON.parse(galleries[1][2]);
assert.equal(photos.length,10);assert.equal(plateItems.length,11);assert.equal(new Set(plateItems.map(x=>x.src)).size,11);
for(const gallery of galleries){assert(gallery[0].includes('data-prev'));assert(gallery[0].includes('data-next'));assert(gallery[0].includes('data-open-image'));}
for(const item of [...photos,...plateItems]){
 assert(existsSync(item.src.slice(1))&&existsSync(item.thumb.slice(1)),'Gallery media must be local and present');
 assert(item.width>0&&item.height>0&&item.thumbWidth>0&&item.thumbHeight>0);
}
const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
const fp=graph.filter(n=>n['@type']==='FloorPlan');
assert.equal(fp.length,plans.reduce((n,p)=>n+p.area.split(' / ').length,0));
for(const p of plans){
 const nodes=fp.filter(n=>n.image==='https://www.moretegra.com.br'+media[p.media].src);
 assert.deepEqual(nodes.map(n=>n.floorSize.value),p.area.split(' / ').map(x=>Number(x.replaceAll('.','').replace(',','.'))),'Exact areas must match each drawing');
}
const neighborhood=html.match(/<section[^>]+id="localizacao"[\s\S]*?<\/section>/)[0];
assert.equal((neighborhood.match(/<figure>/g)||[]).length,3);
assert.equal((neighborhood.match(/<article>/g)||[]).length,4);
assert(neighborhood.includes('pointer-events')||read(path+'riio-galleries.css').includes('pointer-events:none'));
assert(neighborhood.includes('riio-map-visual')&&neighborhood.includes('https://wa.me/5511960779328'));
assert(!neighborhood.includes('google.com/maps/search'),'Use contextual map with WhatsApp route request');
assert(html.includes('id="riio-image-dialog"')&&html.includes('data-zoom-in')&&html.includes('data-close-dialog'));
assert.equal((html.match(/riio-gallery\.js"/g)||[]).length,1);
assert(html.includes('name="robots" content="noindex,follow"'));
const ids=[...html.matchAll(/\bid="([^\"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size,'Unique HTML IDs');
// Only the governed address/anchor differs from the approved exact-project footer.
const footer=html.match(/<footer\b[\s\S]*?<\/footer>/)[0];
const referenceFooter=read('src-greenn/empreendimentos/tiel-vila-nova-conceicao/index.html').match(/<footer\b[\s\S]*?<\/footer>/)[0];
const normalizeFooter=s=>s.replace(/<span data-mnt-footer-address[^>]*>[\s\S]*?<\/span>/,'<span data-mnt-footer-address>PROJECT_ADDRESS</span>');
assert.equal(normalizeFooter(footer),normalizeFooter(referenceFooter),'RIIO must follow the approved RESF footer without extra navigation');
console.log('PASS: approved hero/facts/Form46 unchanged; complete 9-building ficha, 132 residences, 10 gallery scenes, 11 plan plates with precise linked areas, 3 neighborhood photos and WhatsApp context map. Static evidence only.');
