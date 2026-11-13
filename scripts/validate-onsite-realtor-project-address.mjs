#!/usr/bin/env node
// Enforce Product Authority decision: on-site agents use each project's own address.
// No cross-project fixed brokerage location; preserve known CEP and media identity.
import {readFileSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
import {CHANNELS,RJ_FORBIDDEN} from './lib/commercial-channels.mjs';
const root='src-greenn/empreendimentos';
// Rio in-loco stand (Tegra RJ team) — address/CEP approved by Wagner on 2026-11-09; geo only where a Google Maps point inside Barra da Tijuca was confirmed.
const STAND=slug=>'https://www.moretegra.com.br/empreendimentos/'+slug+'/#estande-tegra';
const RIO_ADDR={'kronos-by-tegra':['Avenida Afonso Arinos de Melo Franco, 425','22631-455'],'claris-casa-e-clube':['Avenida Prefeito Dulcídio Cardoso, 2900','22631-052'],'claris-rosas':['Avenida Prefeito Dulcídio Cardoso, 2900','22631-052'],'gran-thai-leisure-residence':['Avenida Flamboyants da Península, 600','22776-070'],'singular-private-residence':['Avenida das Acácias da Península, 540','22776-000'],'gaea-home-resort':['Avenida Evandro Lins e Silva, 335','22640-100'],'riio-by-piero-lissoni':['Avenida Lúcio Costa, 4900','22630-011']};
function assertStand(slug,nodes,project,html){
 const [street,cep]=RIO_ADDR[slug];
 assert.equal(project.address.streetAddress,street,slug+': project street');
 assert.equal(project.address.postalCode,cep,slug+': project CEP');
 const s=nodes.find(n=>n['@id']===STAND(slug));
 assert(s&&s['@type']==='RealEstateAgent',slug+': in-loco Tegra stand entity missing');
 for(const k of ['streetAddress','postalCode','addressLocality','addressRegion'])assert.equal(s.address?.[k],project.address[k],slug+': stand address '+k+' must equal project');
 assert(!s.employee&&!s.identifier,slug+': stand must not borrow Sabrina identity or CRECI');
 // Telefone do estande: só a central de atendimento RJ (Wagner, 2026-11-13); nunca o número de SP/Sabrina.
 assert(!s.telephone||s.telephone===CHANNELS.rj.tel,slug+': stand phone must be the RJ central, never the SP/Sabrina number');
 assert.deepEqual(s.geo,project.geo,slug+': stand geo must equal project geo (or both absent)');
 if(project.geo){assert.equal(slug,'gaea-home-resort',slug+': geo only for confirmed point');}
 const foot=(html.match(/<span data-mnt-footer-address[^>]*>([\s\S]*?)<\/span>/)||[])[1]||'';
 assert(foot.includes(street.split(',')[0])&&foot.includes(street.split(',')[1].trim())&&foot.includes('CEP '+cep),slug+': footer address must match JSON-LD');
 assert(!/remoto; local exato/.test(html),slug+': obsolete remote-only footer text');
}
const slugs=readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name).sort();
let pages=0,agents=0,notApplicable=0;
for(const slug of slugs){
 const path=root+'/'+slug+'/index.html';
 let html;try{html=readFileSync(path,'utf8')}catch{continue}
 pages++;
 const nodes=[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>{const v=JSON.parse(m[1]);return v['@graph']||[v]});
 if(new Set(['kronos-by-tegra','claris-casa-e-clube','claris-rosas','gran-thai-leisure-residence','singular-private-residence','gaea-home-resort']).has(slug)){
  const residentialType=slug==='claris-casa-e-clube'?'GatedResidenceCommunity':'ApartmentComplex';
  const project=nodes.find(n=>n['@type']===residentialType);
  assert(project?.address?.addressLocality==='Rio de Janeiro'&&project.address.addressRegion==='RJ',slug+': project city/state missing');
  // Wagner 2026-11-09: in-loco service is the Tegra RJ stand team at the project address.
  // Wagner 2026-11-10: Rio pages carry no Sabrina reference (CRECI issue in RJ); contact is the RJ service center (R1/R7).
  assert(!nodes.some(n=>n['@type']==='RealEstateAgent'&&n.address&&n['@id']!==STAND(slug)),slug+': remote contact must not claim an onsite brokerage office');
  assertStand(slug,nodes,project,html);
  assert(html.includes('name="robots" content="index,follow,max-image-preview:large"')&&!/noindex/i.test(html),slug+': Rio page released for indexing on 2026-11-09 must stay indexable');
  assert(!RJ_FORBIDDEN.test(html.replace(/https?:\/\/[^"\s]+/g,''))&&html.includes('Central de atendimento RJ'),slug+': Rio page must use the RJ service center, without Sabrina/CRECI or Tegra attribution');
  assert(!/CRECI-RJ|CRECI RJ/.test(html),slug+': never invent RJ CRECI');
  notApplicable++;
  console.log('RIO_REMOTE_STAGING_PASS',slug);
  continue;
 }
 if(slug==='studios-berrini'){
  const place=nodes.find(n=>n['@type']==='Place'&&n['@id']==='https://www.moretegra.com.br/empreendimentos/studios-berrini/#project');
  const agent=nodes.find(n=>n['@type']==='RealEstateAgent');
  assert(place?.address?.streetAddress==='Rua Arandu, 150','NR Studios Berrini Place street missing');
  assert(place.address.addressLocality==='São Paulo'&&place.address.addressRegion==='SP','NR project city/state missing');
  assert(agent?.telephone==='+5511960779328'&&agent.employee?.['@id']==='https://www.moretegra.com.br/#sabrina-da-tegra','NR offsite consultation contact missing');
  assert(!agent.address,'NR remote consultation must not fabricate an onsite postal address');
  notApplicable++;
  console.log('NR_REMOTE_CONSULTATION_PASS',slug);
  continue;
 }
 if(slug==='riio-by-piero-lissoni'){
  // First RJ intake is explicitly remote; the project address is not an office.
  const project=nodes.find(n=>n['@type']==='ApartmentComplex');
  const agent=nodes.find(n=>n['@type']==='RealEstateAgent'&&n['@id']!==STAND(slug));
  const service=nodes.find(n=>n['@type']==='Service');
  assert.equal(project?.address?.streetAddress,'Avenida Lúcio Costa, 4900');
  assertStand(slug,nodes,project,html);
  assert.equal(project.address.addressLocality,'Rio de Janeiro');
  assert.equal(project.address.addressRegion,'RJ');
  assert(agent&&!agent.employee&&!agent.identifier&&!agent.parentOrganization&&agent.name.startsWith('Central de atendimento RJ'),'RIIO intake is the RJ service center, without broker identity or Tegra Vendas link');
  assert.equal(agent.telephone,CHANNELS.rj.tel);
  assert(!agent.parentOrganization,'RIIO RJ service center is not attached to Tegra Vendas');
  assert.equal(agent['@id'],'https://www.moretegra.com.br/empreendimentos/riio-by-piero-lissoni/#atendimento');
  assert.equal(service?.provider?.['@id'],agent['@id']);
  assert(!agent.address&&!agent.geo,'Remote RIIO intake must not fabricate on-site office/address');
  assert(!RJ_FORBIDDEN.test(html.replace(/https?:\/\/[^"\s]+/g,''))&&html.includes('Central de atendimento RJ'),'RIIO must use the RJ service center, without Sabrina/CRECI or Tegra attribution');
  assert(!/CRECI-RJ|CRECI RJ/.test(html),'Do not invent RJ credential');
  assert(html.includes('content="index,follow,max-image-preview:large"'),'RIIO publication is indexable');
  notApplicable++;
  console.log('RIIO_REMOTE_INTAKE_PASS',slug);
  continue;
 }
 const project=nodes.find(n=>n['@type']==='ApartmentComplex');
 const current=nodes.filter(n=>n['@type']==='RealEstateAgent');
 assert(project?.address?.streetAddress,slug+': project postal address missing');
 if(!current.length){notApplicable++;continue}
 assert.equal(current.length,1,slug+': multiple realtor entities require explicit review');
 const a=current[0],p=project.address;
 assert(a.address?.['@type']==='PostalAddress',slug+': RealEstateAgent must have PostalAddress');
 for(const k of ['streetAddress','addressLocality','addressRegion'])assert.equal(a.address[k],p[k],slug+': onsite agent address mismatch '+k);
 const country=x=>typeof x==='string'?x:x?.name;
 assert.equal(country(a.address.addressCountry),country(p.addressCountry),slug+': country mismatch');
 if(p.postalCode)assert.equal(a.address.postalCode,p.postalCode,slug+': onsite CEP mismatch');
 else assert(/^\d{5}-\d{3}$/.test(a.address.postalCode||''),slug+': preserve verified agent CEP where project omits CEP');
 assert(/^https:\/\//.test(a.image||''),slug+': realtor portrait absent');
 if(a.geo&&project.geo)assert.deepEqual(a.geo,project.geo,slug+': realtor and project geo mismatch');
 if(slug==='caminhos-da-lapa-elo-duo'){
  assert.equal(a['@id'],'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#sabrina-atendimento','Elo Duo must use route-scoped on-site identity');
  const service=nodes.find(n=>n['@type']==='Service');
  assert.equal(service?.provider?.['@id'],a['@id'],'Elo Duo service provider must reference local agent');
 }
 if(slug==='jerivas-caminhos-da-lapa'){
  assert.equal(p.streetAddress,'Rua Fortunato Ferraz, 250','Jerivás official condominium street drift');
  assert.equal(p.postalCode,'05093-000','Jerivás condominium CEP drift');
  assert.equal(a.image,'https://s3-gdigital.s3.amazonaws.com/gdigital/313/sNzJJWhmmsjkZjUV7gCKTgrlzRINCD6yDIAvkZOJ.webp','Jerivás Sabrina image drift');
 }
 agents++;
 console.log('ONSITE_AGENT_PASS',slug,a.address.streetAddress,a.address.postalCode);
}
assert.equal(pages,34,'Expected 28 existing plus six Rio staged project pages');
assert.equal(agents,20,'Expected 20 project-scoped RealEstateAgents including Jerivás');
assert.equal(notApplicable,14,'Expected 8 existing remote/non-applicable plus six Rio remote staging pages');
console.log('PASS: 20 on-site agents retain project addresses; 6 legacy non-agent projects, NR and RIIO plus six Rio remote staging pages checked separately');
