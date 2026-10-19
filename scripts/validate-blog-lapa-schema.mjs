import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync("src-greenn/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/index.html","utf8");
const canonical = "https://www.moretegra.com.br/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/";
const graphRaw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(graphRaw,"JSON-LD must exist");
const data=JSON.parse(graphRaw[1]);
const graph=data["@graph"];
assert.equal(data["@context"],"https://schema.org");
const get=(type)=>graph.find(x=>x["@type"]===type);
const blog=get("BlogPosting");
const photo=get("ImageObject");
const agent=get("Person");
const point=get("ContactPoint");
const realEstateAgent=get("RealEstateAgent");
assert.ok(blog && get("BreadcrumbList") && photo && agent && point && realEstateAgent,"semantic graph incomplete");
assert.equal(blog.mainEntityOfPage["@id"],canonical);
assert.equal(blog.author.url,"https://www.moretegra.com.br/blog/","editorial author needs its own URL");
assert.equal(blog.image["@id"],photo["@id"]);
assert.equal(blog.thumbnailUrl,photo.contentUrl);
assert.ok(html.includes(`<img src="${photo.contentUrl}"`),"structured image must appear in visible content");
assert.equal(agent["@id"],"https://www.moretegra.com.br/#sabrina-da-tegra");
assert.equal(agent.sameAs,"https://corretor.tegravendas.com.br/sabrina/sp");
assert.equal(agent.identifier.value,"209.905-F");
assert.equal(point.telephone,"+5511960779328");
assert.equal(realEstateAgent.telephone,point.telephone);
assert.equal(realEstateAgent.contactPoint["@id"],point["@id"]);
assert.equal(realEstateAgent.identifier.value,"209.905-F");
assert.equal(realEstateAgent.sameAs,agent.sameAs);
assert.ok(blog.mentions.some(x=>x["@id"]===realEstateAgent["@id"]),"BlogPosting must reference commercial agent");
assert.equal(blog.mentions[0]["@id"],agent["@id"]);
assert.ok(html.includes(`<meta property="og:image" content="${photo.contentUrl}">`));
assert.ok(html.includes(`<meta name="twitter:image" content="${photo.contentUrl}">`));
assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`));
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert.equal((html.match(/class="mnt-project-card"/g)||[]).length,6);
for(const href of ["/favicon.ico","/favicon-48x48.png","/favicon-32x32.png","/favicon-16x16.png","/apple-touch-icon.png"]){
 assert.ok(html.includes(`href="${href}"`),"favicon reference missing "+href);
 assert.ok(!href.startsWith("http"),"favicon must be same origin");
}
const tags=[...html.matchAll(/<img\b[^>]*>/g)].map(x=>x[0]);
assert.ok(tags.length>=8,"expected project, brand, editorial images");
for(const tag of tags){
 assert.ok(/src="[^"]+"/.test(tag) && /alt="[^"]*"/.test(tag),"every image needs source and alt");
}
console.log(JSON.stringify({ok:true,article:canonical,types:graph.map(x=>x["@type"]),favicons:5,visibleImages:tags.length,projectCards:6},null,2));
