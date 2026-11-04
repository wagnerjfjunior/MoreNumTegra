#!/usr/bin/env node
// MoreTegra Gate 02: cross-check canonical, social metadata, headings, and page-level JSON-LD.
// Usage: node scripts/validate-seo-gate-02.mjs <file.html> [...]
// Only strict structural invariants fail. Human review of ALT text and schema eligibility is separate.
import fs from "node:fs";
const files=process.argv.slice(2);if(!files.length){console.error("Supply changed HTML files.");process.exit(2)}
const chars=s=>Array.from(s).length;
const dec=s=>String(s??"").replace(/&amp;/gi,"&").replace(/&quot;/gi,'"').replace(/&apos;|&#39;/gi,"'").replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
function attrs(tag){const out={};for(const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g))out[m[1].toLowerCase()]=dec(m[2]??m[3]);return out}
let failures=[],warnings=[];
for(const file of files){
const html=fs.readFileSync(file,"utf8"),head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]||"";
const metas=Array.from(head.matchAll(/<meta\b[^>]*>/gi),m=>attrs(m[0]));
const get=(attr,key)=>metas.find(m=>m[attr]===key)?.content||"";
const t=dec(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||""),d=get("name","description");
const fail=msg=>failures.push(file+": "+msg),warn=msg=>warnings.push(file+": "+msg);
if(!t||chars(t)>60)fail("SEO title missing or >60 chars");
if(!d||chars(d)>160)fail("SEO meta description missing or >160 chars");
for(const [key,val] of [["og:title",t],["og:description",d]])if(get("property",key)!==val)fail(key+" not identical to canonical metadata");
if(get("name","twitter:card")==="")fail("missing twitter:card");
for(const [key,val] of [["twitter:title",t],["twitter:description",d]])if(get("name",key)!==val)fail(key+" absent or inconsistent");
const canonical=Array.from(head.matchAll(/<link\b[^>]*>/gi),m=>attrs(m[0])).find(m=>m.rel==="canonical")?.href||"";
if(!canonical.startsWith("https://www.moretegra.com.br/"))fail("unexpected canonical");
if(get("property","og:url")!==canonical)fail("og:url differs from canonical");
const ogImage=get("property","og:image");
if(get("name","twitter:card")==="summary_large_image"&&!ogImage)fail("large-image Twitter card without og:image");
if(ogImage&&get("name","twitter:image")!==ogImage)fail("twitter:image not equal to og:image");
if(!ogImage)warn("no og:image (visual/share-card review)");
const hs=Array.from(html.matchAll(/<h([1-6])\b/gi),m=>+m[1]);
if(hs.filter(x=>x===1).length!==1)fail("expected exactly one H1");
if(hs.some((v,i)=>i>0&&v>hs[i-1]+1))fail("heading-level skip");
for(const [i,img] of Array.from(html.matchAll(/<img\b[^>]*>/gi),m=>attrs(m[0])).entries()){
 if(!("alt" in img))fail("img["+i+"] alt missing");
 if(img.alt?.length>150)warn("img["+i+"] alt over 150 chars; evaluate in context");
}
for(const m of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
 let root;try{root=JSON.parse(m[1])}catch(e){fail("invalid JSON-LD: "+e.message);continue}
 const nodes=root["@graph"]||[root];
 for(const node of nodes){
  const types=Array.isArray(node["@type"])?node["@type"]:[node["@type"]];
  if(types.some(type=>type==="WebPage"||type==="CollectionPage")){
   if(node.name&&dec(node.name)!==t)fail("WebPage.name inconsistent with SEO title");
   if(node.description&&dec(node.description)!==d)fail("WebPage.description inconsistent with SEO description");
   if(node.url&&node.url!==canonical)fail("WebPage.url differs from canonical");
  }
  if(types.includes("FAQPage")){
    const visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").toLowerCase();
    for(const qa of node.mainEntity||[]){const q=String(qa.name||"").replace(/\s+/g," ").toLowerCase();if(q&&!visible.includes(q))warn("FAQ structured question not found verbatim in static HTML: "+q.slice(0,65))}
  }
 }
}
}
for(const x of failures)console.error("FAIL "+x);
for(const x of warnings)console.log("WARN "+x);
console.log(JSON.stringify({files:files.length,failures:failures.length,warnings:warnings.length},null,2));
if(failures.length)process.exitCode=1;
