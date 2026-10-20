import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const page="src-greenn/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/index.html";
const html=readFileSync(page,"utf8");
const css=readFileSync("src-greenn/blog/lapa-artigo.css","utf8");
const canonical="https://www.moretegra.com.br/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/";
const headline="Imóveis na Lapa valorizam? Como analisar preços e potencial em São Paulo";
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert.ok(html.includes("<h1>"+headline+"</h1>"));
assert.ok(html.includes('<title>Valorização imobiliária na Lapa (SP): preços, riscos e potencial | MoreTegra</title>'));
assert.ok(html.includes('rel="canonical" href="'+canonical+'"'));
assert.ok(html.includes('name="robots" content="index,follow,max-image-preview:large"'));
assert.ok(html.includes('content="Valorização imobiliária na Lapa (SP): aprenda a comparar preço por m²'));
assert.ok(html.includes('property="og:title" content="'+headline+'"'));
const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
const blog=graph.find(x=>x["@type"]==="BlogPosting");
assert.equal(blog.headline,headline);
assert.equal(blog.mainEntityOfPage["@id"],canonical);
assert.ok(blog.description.includes("liquidez"));
assert.ok(graph.some(x=>x["@type"]==="BreadcrumbList"));
assert.ok(graph.some(x=>x["@type"]==="RealEstateAgent"));
for(const id of ["metodo","preco-metro-quadrado","ponte-pirituba-lapa","diferencas","decisao","leia-tambem","empreendimentos-lapa"])
 assert.ok(html.includes('id="'+id+'"'),"missing section "+id);
for(const q of ["micro-localização","preço por m²","liquidez","Custos de entrada","obra","horizonte"])
 assert.ok(html.toLowerCase().includes(q.toLowerCase()),"missing distinct analysis "+q);
assert.ok(html.includes("Prefeitura informou avanços")||html.includes("Prefeitura informou"));
assert.ok(html.includes("7 de agosto de 2026"));
assert.ok(html.includes('href="https://prefeitura.sp.gov.br/web/obras/'));
assert.ok(!html.includes("Lapa: o novo polo de valorização na Zona Oeste de São Paulo"),"no reuse of original Tegra headline");
assert.ok(!html.includes("a Lapa se consolida como um território diverso"),"no original Tegra prose");
assert.ok(!html.includes("sem garantir valorização")||html.includes("não geram valorização automática"));
assert.ok(!/R\$\s*\d/.test(html),"editorial must not fabricate price examples");
assert.equal((html.match(/class="mnt-project-card"/g)||[]).length,6);
for(const href of ["/empreendimentos/jerivas-caminhos-da-lapa/","/empreendimentos/reserva-caminhos-da-lapa/","/empreendimentos/caminhos-da-lapa-elo-duo/","/empreendimentos/garden-design/","/empreendimentos/nova-vivere/","/regioes/lapa/","/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/"])
 assert.ok(html.includes('href="'+href+'"'),"lost commercial/editorial link "+href);
assert.ok(html.includes('data-mnt-commercial-footer'));
assert.ok(html.includes("5511960779328"));
assert.ok(css.includes(".mnt-checklist")&&css.includes("@media(max-width:600px)"));
console.log(JSON.stringify({pass:true,canonical,headings:(html.match(/<h2\b/g)||[]).length,projects:6,seoEntities:graph.length}));
