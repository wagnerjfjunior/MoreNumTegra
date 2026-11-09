#!/usr/bin/env node
import fs from "node:fs";
import assert from "node:assert/strict";
const root="src-greenn/empreendimentos/";
const slugs=["kronos-by-tegra","gran-thai-leisure-residence","claris-casa-e-clube","claris-rosas","gaea-home-resort","singular-private-residence"];
const css=fs.readFileSync(root+"rio/resf-rio.css","utf8");
for(const check of [".hero{position:relative;min-height:96svh", ".hero-shade{position:absolute", ".facts-in{display:grid;grid-template-columns:repeat(4", "@media(max-width:900px)", ".facts-in{grid-template-columns:repeat(2", ".dock{position:fixed", ".leadform{background:#fff"]) assert(css.includes(check),"Rio stylesheet differs from canonical visual architecture: "+check);
let errors=[];
const d=x=>String(x||"").replaceAll("&amp;","&").replaceAll("&quot;",'"').replaceAll("&#39;","'");
for(const slug of slugs) {
 const path=root+slug+"/index.html",h=fs.readFileSync(path,"utf8");
 const body=h.slice(h.indexOf("<body"));
 assert(!/31\/10\/2026|Fonte e transparência|Fonte:|fonte: galeria pública|tabela de setembro\/2026|promoção encerrada/i.test(body),slug+": internal audit or expired campaign language in conversion page");
 assert(body.includes("class=\"pricebox\"")&&body.includes("Consultar condições com Sabrina"),slug+": price CTA missing");
 assert(body.includes("Seu próximo passo")&&body.includes("Quero receber uma proposta"),slug+": conversion section missing");
 const fail=m=>errors.push(slug+": "+m);
 const hero=h.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0]||"";
 const facts=h.match(/<section class="facts"[\s\S]*?<\/section>/)?.[0]||"";
 const gallery=h.match(/<section class="section" id="galeria"[\s\S]*?<\/section>/)?.[0]||"";
 const faqNode=[...h.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(x=>{
   try{const z=JSON.parse(x[1]);return z["@graph"]||[z]}catch{fail("invalid JSON-LD");return []}
 }).find(n=>n["@type"]==="FAQPage");
 if(!h.includes('href="/src-greenn/empreendimentos/rio/resf-rio.css"'))fail("shared RESF stylesheet missing");
 if(!h.includes('<a class="skip" href="#conteudo"'))fail("skip link missing");
 if(!h.includes('<main id="conteudo">'))fail("semantic main missing");
 if(!h.includes('class="topbar"'))fail("topbar missing");
 if(!hero.includes('class="hero-media"')||!hero.includes('class="hero-poster"')||!hero.includes('class="hero-shade"')||!hero.includes('class="wrap hero-content"')||!hero.includes('fetchpriority="high"'))fail("hero not full-bleed high-priority RESF");
 if(!/class="hero-media"[\s\S]*class="hero-shade"[\s\S]*class="wrap hero-content"/.test(hero))fail("hero layering mismatch");
 const posHero=h.indexOf(hero),posFacts=h.indexOf(facts);
 if(!facts||posFacts!==posHero+hero.length)fail("facts band must immediately follow hero");
 const factCount=(facts.match(/class="fact"/g)||[]).length;
 if(factCount!==4)fail("facts must have 4 slots ordered [area,parking,differential,stage]");
 if(!/m²/.test(facts))fail("area fact missing");
 if(!/(vagas?|Garagem)/i.test(facts))fail("parking fact not marked");
 if(!/(Pronto para morar|Em construção|Lançamento)/.test(facts))fail("stage fact missing");
 if(!h.includes('<section class="section" id="galeria"'))fail("gallery landmark missing");
 if(!gallery.includes("<figure")||!gallery.includes('loading="lazy"'))fail("gallery must contain lazy project scenes");
 const expectedSlides=slug==="claris-rosas"?3:slug==="kronos-by-tegra"?9:10;
 const slideCount=(gallery.match(/class="photo rio-gallery-slide"/g)||[]).length;
 if(slideCount!==expectedSlides||!gallery.includes("data-rio-gallery")||!gallery.includes("data-gallery-next")||!gallery.includes("data-gallery-prev"))fail("gallery count/controls wrong: "+slideCount+" expected "+expectedSlides);
 if(!h.includes('id="plantas-oficiais"'))fail("missing distinct floorplans/implantation section");
 if(slug==="claris-rosas")console.warn("MEDIA_GAP Claris Rosas: seven more verified distinct images required for target 10");
 if(!h.includes('src="/src-greenn/empreendimentos/rio/resf-rio-gallery.js"'))fail("portable vanilla gallery script missing");
 if((h.match(/<h1\b/gi)||[]).length!==1)fail("H1 must be unique");
 if((h.match(/<img\b(?![^>]*\balt=)[^>]*>/gi)||[]).length)fail("one or more images missing ALT");
 if(!h.includes('id="plantas"'))fail("tipology section missing");
 if(!h.includes('id="formulario"'))fail("conversion section missing");
 if(!h.includes('id="moretegra-lead-form"')||!h.includes('name="tenant_id" value="313"')||!h.includes('name="form_id" value="46"'))fail("Greenn Form 46 contract missing");
 if(!h.includes('id="mt-floating-dock"'))fail("floating WhatsApp and conditions dock missing");
 if(!h.includes('href="#formulario"'))fail("conditions CTA missing");
 if(!h.includes('s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo'))fail("official yellow Tegra logo missing");
 if(!faqNode||!Array.isArray(faqNode.mainEntity)||faqNode.mainEntity.length===0)fail("FAQPage absent");
 const visible=d(h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<[^>]*>/g," ").replace(/\s+/g," ")).toLowerCase();
 for(const q of faqNode?.mainEntity||[]){
   const name=d(q.name).toLowerCase().trim();
   if(name&&!visible.includes(name))fail("FAQ schema question not visible: "+name);
 }
 const robots=h.match(/<meta name="robots" content="([^"]+)"/)?.[1];
 if(robots!=="index,follow,max-image-preview:large")fail("robots must be indexable after launch approval of 2026-11-09");
 if(/31\/10\/2026|Rio Open|setembro(\/| de )2026|maio\/2026/i.test(h))fail("expired campaign or dated table reference must not return (HTML or JSON-LD)");
 console.log("CHECK",slug,"facts="+factCount,"faq="+(faqNode?.mainEntity?.length||0));
}
for(const e of errors)console.error("FAIL",e);
console.log("RESF Rio: "+slugs.length+" pages, "+errors.length+" structural failures");
if(errors.length)process.exitCode=1;
