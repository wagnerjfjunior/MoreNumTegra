#!/usr/bin/env node
// MoreTegra metadata quality gate. Run: node scripts/validate-seo-content.mjs [--strict] [files...]
// Without file arguments: audits all HTML beneath src-greenn. --strict fails on hard violations.
import fs from "node:fs";
import path from "node:path";
const strict=process.argv.includes("--strict");
const supplied=process.argv.slice(2).filter(v=>v!=="--strict");
const limits={title:60,description:160};
const chars=s=>Array.from(s).length;
const decode=s=>String(s??"").replace(/&(?:amp|quot|apos|lt|gt|nbsp);|&#(?:x[0-9a-f]+|\d+);/gi,m=>({ "&amp;":"&","&quot;":'"',"&apos;":"'","&lt;":"<","&gt;":">","&nbsp;":" "}[m.toLowerCase()]??String.fromCodePoint(m[2].toLowerCase()==="x"?parseInt(m.slice(3,-1),16):parseInt(m.slice(2,-1),10))));
function list(dir){if(!fs.existsSync(dir))return [];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?list(p):e.isFile()&&p.endsWith(".html")?[p]:[]})}
function attrs(tag){const out={};for(const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g))out[m[1].toLowerCase()]=decode(m[2]??m[3]);return out}
function inspect(file){
 const html=fs.readFileSync(file,"utf8"),head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]??"";
 const tags=Array.from(head.matchAll(/<meta\b[^>]*>/gi),m=>attrs(m[0]));
 const meta=(type,key)=>tags.find(a=>a[type]===key)?.content??"";
 const title=decode(head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]*>/g,"").trim()??"");
 const description=meta("name","description");
 const robots=meta("name","robots");
 const canonical=Array.from(head.matchAll(/<link\b[^>]*>/gi),m=>attrs(m[0])).find(a=>a.rel==="canonical")?.href??"";
 const h1=Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi),m=>decode(m[1].replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()));
 const issues=[];
 if(!title)issues.push("ERROR missing title");
 else if(chars(title)>limits.title)issues.push("ERROR title "+chars(title)+">"+limits.title);
 if(!description)issues.push("ERROR missing description");
 else if(chars(description)>limits.description)issues.push("ERROR description "+chars(description)+">"+limits.description);
 if(h1.length!==1)issues.push("ERROR H1 count "+h1.length+" (expected 1)");
 if(h1.length===1&&(chars(h1[0])<12||chars(h1[0])>90))issues.push("WARN H1 length "+chars(h1[0])+" (editorial review; not Google limit)");
 if(canonical&&!/^https:\/\/www\.moretegra\.com\.br\//.test(canonical))issues.push("ERROR canonical hostname");
 if(!canonical)issues.push("ERROR missing canonical");
 for(const key of ["og:title","og:description"]){const val=meta("property",key);if(!val)issues.push("ERROR missing "+key);else if(chars(val)>limits[key.endsWith("title")?"title":"description"])issues.push("ERROR long "+key)}
 for(const key of ["twitter:title","twitter:description"]){const val=meta("name",key);if(val&&chars(val)>limits[key.endsWith("title")?"title":"description"])issues.push("ERROR long "+key)}
 const images=Array.from(html.matchAll(/<img\b[^>]*>/gi),m=>attrs(m[0]));
 for(const [i,a] of images.entries()){
   if(a.alt===undefined)issues.push("ERROR img["+i+"] alt missing");
   else if(chars(a.alt)>150)issues.push("WARN img["+i+"] alt over 150 characters; review context");
   if(a.alt&&/imagem de|foto de|picture of/i.test(a.alt))issues.push("WARN img["+i+"] redundant alt introduction");
 }
 if(/\bnoindex\b/i.test(robots))issues.push("INFO robots noindex (manual release decision)");
 for(const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
  try{JSON.parse(match[1])}catch{issues.push("ERROR invalid JSON-LD")}
 }
 return {file,title,titleChars:chars(title),descriptionChars:chars(description),h1:h1.length,images:images.length,issues};
}
const paths=supplied.length?supplied:list("src-greenn");
const results=paths.map(inspect);const counts={error:0,warning:0,info:0};
for(const r of results){for(const issue of r.issues){const level=issue.split(" ")[0];counts[level==="ERROR"?"error":level==="WARN"?"warning":"info"]++;console.log(level+" "+r.file+" — "+issue)}}
console.log(JSON.stringify({files:results.length,...counts,strict},null,2));
if(strict&&counts.error)process.exitCode=1;
