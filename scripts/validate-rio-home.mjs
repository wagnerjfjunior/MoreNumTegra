#!/usr/bin/env node
import fs from "node:fs";
import assert from "node:assert/strict";
const h=fs.readFileSync("src-greenn/rio-de-janeiro/index.html","utf8");
const js=fs.readFileSync("src-greenn/rio-de-janeiro/home.js","utf8");
const css=fs.readFileSync("src-greenn/rio-de-janeiro/home.css","utf8");
const route="https://www.moretegra.com.br/rio-de-janeiro/";
const titles=[...h.matchAll(/<title>([^<]+)<\/title>/g)];
assert.equal(titles.length,1,"SEO title unique");
assert.equal([...titles[0][1]].length<=65,true,"SEO title length");
assert(h.includes('name="robots" content="noindex,follow"'),"noindex must persist until publication approval");
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
assert(!/R\$\s*[\d.]+/.test(h),"stale promo price must not appear on the city hub");
assert(!/https:\/\/www\.tegraincorporadora\.com\.br/.test(h),"no outbound commercial links");
assert(!h.includes("/empreendimentos/claris-marapendi/"),"do not mix Claris phases");
assert(!h.includes('href="/sao-paulo/"'),"São Paulo hub not yet published");
assert(h.includes('Rafael Rabello de Barros')&&h.includes('CC BY-SA 3.0'),"hero photo source and license attribution");
assert(h.includes('Logo_Tegra_Amarelo'),"official Tegra brand");
const data=h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(data,"page schema");
const graph=JSON.parse(data[1])["@graph"];
const coll=graph.find(n=>n["@type"]==="CollectionPage"),list=graph.find(n=>n["@type"]==="ItemList"),faq=graph.find(n=>n["@type"]==="FAQPage");
assert.equal(coll.url,route);assert.equal(list.itemListElement.length,7);
assert.equal(faq.mainEntity.length,5);
const htmlText=h.replace(/<script[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
for(const f of faq.mainEntity)assert(htmlText.includes(f.name),"FAQ JSON-LD must match visible question "+f.name);
assert(css.includes("@media(max-width:720px)"),"mobile CSS");
assert(js.includes("data-rio-card")&&js.includes('addEventListener'),"interactive filters");
console.log("PASS Rio Home: 7 cards, scoped filters, 5 FAQ, Form46, brand, photo license, noindex, canonical, no stale pricing");
