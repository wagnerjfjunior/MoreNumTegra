#!/usr/bin/env node
// Enforce Product Authority decision: on-site agents use each project's own address.
// No cross-project fixed brokerage location; preserve known CEP and media identity.
import {readFileSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root='src-greenn/empreendimentos';
const slugs=readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name).sort();
let pages=0,agents=0,notApplicable=0;
for(const slug of slugs){
 const path=root+'/'+slug+'/index.html';
 let html;try{html=readFileSync(path,'utf8')}catch{continue}
 pages++;
 const nodes=[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>{const v=JSON.parse(m[1]);return v['@graph']||[v]});
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
assert.equal(pages,26,'Expected 26 audited project pages including Jerivás');
assert.equal(agents,20,'Expected 20 project-scoped RealEstateAgents including Jerivás');
assert.equal(notApplicable,6,'Pages without Realtor entity changed; review scope deliberately');
console.log('PASS: 20 project-scoped RealEstateAgents match local project addresses; 6 pages without separate RealEstateAgent unaffected');
