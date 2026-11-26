#!/usr/bin/env node
// SFJM: isolated Orbita commercial parity reconciliation after PR #604.
// Scoped approved facts and independent negative fixtures; no runtime edits.
import {readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import assert from "node:assert/strict";
const path="src-greenn/empreendimentos/universo-tatuape-orbita/index.html",old="3acd0a9228ebaf4d368fba40052f1ff41c0cbca2",approved="ed9978d75da3b3d7888b8bfd532c4f315b1f5052";
const source=readFileSync(path,"utf8");
const readRef=ref=>execFileSync("git",["show",ref+":"+path],{encoding:"utf8"});
const prior=readRef(old),baseline=readRef(approved);
function validate(source,prior,approved,assert){
 const pattern=/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
 const get=s=>{const m=[...s.matchAll(pattern)];assert.equal(m.length,1,"Exactly one JSON-LD script");const j=JSON.parse(m[0][1]);assert.equal(j["@context"],"https://schema.org","Schema context");assert(Array.isArray(j["@graph"]),"Graph required");return j["@graph"]};
 const graph=get(source),oldGraph=get(prior),baseline=get(approved),find=t=>graph.find(n=>n["@type"]===t);
 const walk=(x,fn)=>{if(x&&typeof x==="object"){if(!Array.isArray(x))fn(x);for(const v of Object.values(x))walk(v,fn)}};
 walk(graph,x=>{assert(![x["@type"]].flat().some(t=>["Product","Offer","AggregateOffer"].includes(t)),"Commercial Product/Offer paused");assert(!Object.hasOwn(x,"availability"),"Unverified availability forbidden")});
 const counts={WebSite:1,WebPage:1,BreadcrumbList:1,Brand:1,ApartmentComplex:1,FAQPage:1,Organization:1,ContactPoint:1,Person:1,RealEstateAgent:1,Service:1,ImageObject:2,FloorPlan:3};
 for(const [t,n] of Object.entries(counts))assert.equal(graph.filter(x=>x["@type"]===t).length,n,"Required entity count "+t);
 assert.equal(graph.length,16,"Exact graph cardinality");const ids=graph.map(n=>n["@id"]);assert(ids.every(x=>typeof x==="string"&&x.length),"Every entity has ID");assert.equal(new Set(ids).size,ids.length,"Unique entity IDs");
 walk(graph,x=>{if(Object.hasOwn(x,"@id"))assert(ids.includes(x["@id"]),"Unresolved graph reference: "+x["@id"])});
 assert.deepEqual([...ids].sort(),baseline.map(n=>n["@id"]).sort(),"Approved entity identities");
 for(const n of oldGraph)assert.equal(find(n["@type"])?.["@id"],n["@id"],"Canonical entity ID changed");
 for(const t of Object.keys(counts).filter(t=>t!=="FAQPage"))assert.deepEqual(graph.filter(n=>n["@type"]===t),baseline.filter(n=>n["@type"]===t),"Approved semantic content "+t);
 const faq=find("FAQPage");assert.equal(faq.mainEntity.length,12,"Twelve FAQ questions");assert.deepEqual(faq.mainEntity.slice(0,6),oldGraph.find(n=>n["@type"]==="FAQPage").mainEntity,"Original six FAQ entries");
 const section=(id,s=source)=>s.match(new RegExp('<section\\b[^>]*\\bid="'+id+'"[^>]*>([\\s\\S]*?)<\\/section>'))?.[1]||"";
 const displayed=[...section("faq").matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(m=>[m[1],m[2]]);
 assert.equal(displayed.length,12,"Visible FAQ count");assert.deepEqual(displayed,faq.mainEntity.map(q=>[q.name,q.acceptedAnswer.text]),"Visible FAQ and JSON-LD parity");
 const url="https://www.moretegra.com.br/empreendimentos/universo-tatuape-orbita/";
 assert(source.includes('<link rel="canonical" href="'+url+'">'),"Canonical URL");assert(source.includes('<meta name="robots" content="index,follow,max-image-preview:large">'),"Indexability");
 const web=find("WebPage"),complex=find("ApartmentComplex"),agent=find("RealEstateAgent"),svc=find("Service"),contact=find("ContactPoint");
 assert.equal(web.url,url,"WebPage canonical");assert.deepEqual(web.mainEntity,{"@id":complex["@id"]},"Project reference");
 assert.equal(complex.address.streetAddress,"Avenida Celso Garcia, 5040","Project street");assert.equal(complex.address.postalCode,"03064-000","Project CEP");assert.deepEqual(agent.address,complex.address,"Agent and project address parity");
 assert.equal(contact.telephone,"+5511960779328","Commercial contact");assert.equal(agent.identifier.value,"209.905-F","CRECI");assert.equal(svc.provider["@id"],"https://www.moretegra.com.br/#tegra-vendas","Service provider");
 const hero=graph.find(n=>n["@id"]===url+"#primary-image"),secondary=graph.find(n=>n["@id"]===url+"#secondary-image");assert(hero&&secondary&&hero.contentUrl!==secondary.contentUrl,"Distinct image entities");
 const attr=(tag,key)=>tag.match(new RegExp("\\b"+key+'="([^"]+)"'))?.[1];
 assert([...source.matchAll(/<img\b[^>]*>/g)].some(m=>m[0].includes('class="hero-poster"')&&attr(m[0],"src")===hero.contentUrl),"Visible hero image");assert(source.includes('content="'+hero.contentUrl+'"'),"OG image");
 const img=(source.match(/<figure class="orbita-opps-visual">([\s\S]*?)<\/figure>/)?.[1]||"").match(/<img\b[^>]*>/)?.[0]||"";
 assert.equal(attr(img,"src"),secondary.contentUrl,"Secondary visible image URL");assert.equal(attr(img,"alt"),secondary.caption,"Secondary visible image alt");
 assert.deepEqual(web.image,[{"@id":hero["@id"]},{"@id":secondary["@id"]}],"Ordered WebPage images");assert.equal(web.primaryImageOfPage["@id"],hero["@id"],"Primary image owner");assert.equal(complex.image[0]["@id"],hero["@id"],"Complex primary image");
 const array=(s,name,next)=>{const m=s.match(new RegExp("const "+name+"=(\\[[\\s\\S]*?\\]);const "+next+"="));assert(m,"Missing "+name+" inventory");return JSON.parse(m[1])};
 const scenes=array(source,"scenes","stage"),plants=array(source,"plants","pTabs");assert.equal(scenes.length,6,"Six gallery scenes");assert.equal(plants.length,15,"Fifteen official plants");assert.deepEqual(scenes,array(approved,"scenes","stage"),"Gallery inventory");assert.deepEqual(plants,array(approved,"plants","pTabs"),"Plant inventory");
 const plans=graph.filter(n=>n["@type"]==="FloorPlan");assert.deepEqual(complex.accommodationFloorPlan,plans.map(n=>({"@id":n["@id"]})),"Exact FloorPlan references");
 for(const n of plans)assert(plants.some(p=>p[3]===n.image),"Visible modeled FloorPlan");for(const p of plants)assert(p.length===4&&p[3].startsWith("https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/339/Planta/"),"Official plant origin");
 const gallery=section("galeria");for(const t of ["data-gallery","data-gallery-prev","data-gallery-next","data-scene-nav"])assert(gallery.includes(t),"Required gallery control "+t);
 const residences=section("residencias");for(const t of ['data-plant-groups','data-plant-tabs','data-plant-group="Residencial"','data-plant-group="Comercial"','data-plant-group="Implantação"'])assert(residences.includes(t),"Required plant control "+t);
 for(const t of ['class="wrap tour-grid"','class="tour-image"','https://arquivos.tegraincorporadora.com.br/tour360/orbita/','id="localizacao"','class="map-frame"','class="map-whatsapp"','https://wa.me/5511960779328','CRECI-SP 209.905-F','id="fgts"','id="livelo"','id="decorados"','id="oportunidades"'])assert(source.includes(t),"Required page feature "+t);
 assert(!source.includes("hero-meta")&&!source.includes('class="neighborhood-gallery"'),"Retired visual structures");
 const facts=[...source.matchAll(/<section class="facts"[^>]*>([\s\S]*?)<\/section>/g)];assert.equal(facts.length,1,"Single facts band");assert.equal((facts[0][1].match(/<div class="fact">/g)||[]).length,4,"Four facts");for(const t of ["38–69 m²","1 a 3","Tatuapé","Entregue"])assert(facts[0][1].includes(t),"Required fact "+t);
 const values=section("valores");assert(values.includes("Consultar Valor")&&values.includes('href="#formulario"')&&values.includes('data-form-intent="conditions"'),"Consultation CTA");
 assert(!/data-orbita-unit\s*=|343900\.00|R\$\s*343\.900|R\$\s*645\.800|Unidade 1814 · 1 dormitório/i.test(source),"Retired price/unit must not return");
 assert(source.includes("#moretegra-lead-form.form{background:#f9f7f1"),"Approved form style");const form=s=>s.match(/<form id="moretegra-lead-form"[\s\S]*?<\/form>/)?.[0]||"";
 const f=form(source);assert(f.length>0&&f.includes('data-form-id="46"')&&f.includes('name="tenant_id" value="313"')&&f.includes('name="form_id" value="46"'),"Form46 contract");assert.deepEqual(f,form(approved),"Approved Form46 markup");
}
function mutateGraph(s,change){return s.replace(/(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/i,(_,a,b,c)=>{const j=JSON.parse(b);change(j["@graph"]);return a+JSON.stringify(j)+c})}
function negativeCases(s,mg){return [
 ["missing entity",mg(s,g=>g.splice(g.findIndex(n=>n["@type"]==="Service"),1)),/Required entity count Service/],
 ["historical offer",mg(s,g=>g.push({"@type":"Offer","price":"343900.00"})),/Product\/Offer paused/],
 ["nested product",mg(s,g=>g[0].offers={"@type":"Product"}),/Product\/Offer paused/],
 ["unverified availability",mg(s,g=>g[0].availability="https://schema.org/InStock"),/availability forbidden/],
 ["orphan reference",mg(s,g=>g.find(n=>n["@type"]==="WebPage").mainEntity={"@id":"https://www.moretegra.com.br/#orphan"}),/Unresolved graph reference/],
 ["FAQ mismatch",s.replace("<summary>Como consultar o valor dos apartamentos no Órbita?</summary>","<summary>Alteração indevida?</summary>"),/FAQ and JSON-LD parity/],
 ["contact drift",mg(s,g=>g.find(n=>n["@type"]==="ContactPoint").telephone="+5500000000000"),/Approved semantic content ContactPoint/],
 ["wrong address",mg(s,g=>g.find(n=>n["@type"]==="ApartmentComplex").address.postalCode="00000-000"),/Approved semantic content ApartmentComplex/],
 ["wrong form",s.replace('data-form-id="46"','data-form-id="47"'),/Form46 contract/],
 ["secondary image drift",s.replace('alt="Lazer Órbita de Universo Tatuapé Órbita"','alt="Alteração indevida"'),/Secondary visible image alt/],
 ["plant regression",s.replace('data-plant-group="Comercial"','data-plant-group="Incorreto"'),/Required plant control/],
 ["retired price",s.replace("Consultar Valor","R$ 343.900"),/Consultation CTA|Retired price\/unit/],
 ["gallery control",s.replace("data-gallery-next aria-label","data-removed-next aria-label"),/Required gallery control/],
 ["new historical price",s.replace("Consultar Valor","Consultar Valor R$ 343.900"),/Retired price\/unit/]
]}
validate(source,prior,baseline,assert);
for(const [name,mutated,expected] of negativeCases(baseline,mutateGraph)){
 assert.notEqual(mutated,baseline,"Mutation fixture ineffective: "+name);
 assert.throws(()=>validate(mutated,prior,baseline,assert),expected,"Negative test must fail: "+name);
 console.log("NEGATIVE PASS",name);
}
console.log("PASS: Orbita schema, commercial pause, visible FAQ, approved imagery/plants and Form46; 14 negative fixtures rejected");
