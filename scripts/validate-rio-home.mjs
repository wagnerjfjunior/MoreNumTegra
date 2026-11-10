#!/usr/bin/env node
import fs from "node:fs";
import assert from "node:assert/strict";
import {CHANNELS,RJ_PROJECT_SLUGS,RJ_COPY,RJ_FORBIDDEN} from "./lib/commercial-channels.mjs";
const h=fs.readFileSync("src-greenn/rio-de-janeiro/index.html","utf8");
const js=fs.readFileSync("src-greenn/rio-de-janeiro/home.js","utf8");
const css=fs.readFileSync("src-greenn/rio-de-janeiro/home.css","utf8");
const route="https://www.moretegra.com.br/rio-de-janeiro/";
const titles=[...h.matchAll(/<title>([^<]+)<\/title>/g)];
assert.equal(titles.length,1,"SEO title unique");
assert.equal([...titles[0][1]].length<=65,true,"SEO title length");
assert(h.includes('name="robots" content="index,follow,max-image-preview:large"')&&!/noindex/i.test(h),"Rio Home released for indexing by Wagner on 2026-11-09 must stay indexable");
assert(h.includes('rel="canonical" href="'+route+'"'),"canonical");
assert(h.includes('property="og:url" content="'+route+'"'),"OG canonical");
assert.equal((h.match(/<h1\b/g)||[]).length,1,"one H1");
assert.equal((h.match(/data-rio-card\b/g)||[]).length,7,"seven project cards");
const slugs=["kronos-by-tegra","gran-thai-leisure-residence","claris-casa-e-clube","claris-rosas","gaea-home-resort","singular-private-residence","riio-by-piero-lissoni"];
for(const slug of slugs){
 const href='/empreendimentos/'+slug+'/';
 assert(h.includes('href="'+href+'"'),"missing internal CTA "+slug);
}
for(const id of ["rio-busca","rio-estagio","rio-tipo","rio-metragem","rio-limpar","rio-total","rio-vazio","moretegra-lead-form","mt-lead-name","mt-lead-email","mt-lead-phone"]){
 assert(h.includes('id="'+id+'"'),"missing control "+id);
}
assert(h.includes('name="tenant_id" value="313"'),"tenant contract");
assert(h.includes('name="form_id" value="46"'),"Form 46 contract");
assert(h.includes('data-moretegra-lead-form'),"runtime integration marker");
assert(h.includes('/src-greenn/preview/runtime.js'),"shared validated form runtime");
assert(h.includes('/src-greenn/rio-de-janeiro/home.js'),"filters attached");
const referencePrices=new Map([
 ["kronos-by-tegra","R$ 1.471.000"],
 ["gran-thai-leisure-residence","R$ 2.148.000"],
 ["claris-casa-e-clube","R$ 3.473.000"],
 ["claris-rosas","R$ 3.647.000"],
 ["gaea-home-resort","R$ 2.221.000"],
 ["singular-private-residence","R$ 3.610.000"],
 ["riio-by-piero-lissoni","R$ 8.212.000"]
]);
assert.equal((h.match(/class="rio-reference-price"/g)||[]).length,7,"every Rio card must include one reference price");
for(const [slug,price] of referencePrices){
 const card=h.match(new RegExp('<article class="rio-project"[^>]*>[\\s\\S]*?<a class="rio-project-media" href="/empreendimentos/'+slug+'/"[\\s\\S]*?<\\/article>'))?.[0];
 assert(card&&card.includes(price),"missing governed reference price "+slug);
 assert(card.includes("<span>Preço a partir de</span>")&&card.includes("rio-reference-price")&&card.includes("consulte a tabela vigente"),"reference price context absent "+slug);
}
assert(h.includes("Preço a partir de"),"commercial price framing missing");
assert(!h.includes('"@type":"Offer"'),"historical reference is not an active Offer");

assert(!/https:\/\/www\.tegraincorporadora\.com\.br/.test(h),"no outbound commercial links");
assert(!h.includes("/empreendimentos/claris-marapendi/"),"do not mix Claris phases");
assert(!h.includes('href="/sao-paulo/"'),"São Paulo hub not yet published");
assert(h.includes("images.pexels.com/photos/37212266/"),"licensed Pexels Barra panorama required");
assert(!h.includes("rio-photo-credit")&&!h.includes("rio-price-note")&&!h.includes("rio-cities"),"editorial clutter must be absent");
assert(h.includes("Seu próximo capítulo na Barra da Tijuca começa aqui."),"conversion Big Idea missing");
assert(h.includes("Encontrar meu imóvel")&&h.includes("Quero atendimento personalizado"),"hero conversion CTAs missing");
assert(h.includes('Logo_Tegra_Amarelo'),"official Tegra brand");
const data=h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(data,"page schema");
const graph=JSON.parse(data[1])["@graph"];
const coll=graph.find(n=>n["@type"]==="CollectionPage"),list=graph.find(n=>n["@type"]==="ItemList"),faq=graph.find(n=>n["@type"]==="FAQPage");
assert.equal(coll.url,route);assert.equal(list.itemListElement.length,7);
assert.equal(faq.mainEntity.length,5);
const htmlText=h.replace(/<script[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
for(const f of faq.mainEntity)assert(htmlText.includes(f.name),"FAQ JSON-LD must match visible question "+f.name);
// Decisão do Wagner (2026-11-10): canal RJ = central de atendimento RJ (R1/R7), sem Sabrina e sem atribuir o canal à Tegra.
const agentSec=(h.match(/<section class="rio-section rio-agent-section"[\s\S]*?<\/section>/)||[""])[0];
assert(agentSec.includes('id="atendimento"')&&agentSec.includes(RJ_COPY.blockTitle)&&agentSec.includes(RJ_COPY.blockLead)&&agentSec.includes(`wa.me/${CHANNELS.rj.whatsapp}`),"RJ service block with approved copy");
assert(!h.includes('id="sabrina"')&&!/rio-agent-photo|Sabrina/.test(agentSec),"no Sabrina portrait section on the hub");
assert(!/sabrina/i.test(h)&&!/CRECI/.test(h),"Rio hub carries no Sabrina reference nor CRECI");
assert(h.replace(/<[^>]+>/g,"").includes(RJ_COPY.footer),"RJ service-center contact in footer");
assert(!RJ_FORBIDDEN.test(h.replace(/https?:\/\/[^"\s]+/g,"")),"no Sabrina/CRECI or Tegra attribution on the Rio hub");
assert(!h.includes(CHANNELS.sp.whatsapp),"no São Paulo channel on the Rio hub");
assert(h.includes(`href="tel:${CHANNELS.rj.tel}"`),"contact identity");
assert(!graph.some(n=>n["@type"]==="Person"),"no broker Person on the Rio hub");
assert(graph.some(n=>n["@type"]==="ContactPoint"&&n.telephone===CHANNELS.rj.tel&&n.name==="Central de atendimento RJ"),"RJ service-center contact point");
assert(!graph.some(n=>n.contactPoint&&String(n["@id"]).endsWith("#tegra-vendas")),"RJ channel is not attached to Tegra Vendas");
assert(css.includes("@media(max-width:720px)"),"mobile CSS");
assert(js.includes("data-rio-card")&&js.includes('addEventListener'),"interactive filters");
console.log("PASS Rio Home: 7 priced cards, commercial Big Idea and CTAs, scoped filters, 5 FAQ, Form46, licensed photo, indexable and canonical");
