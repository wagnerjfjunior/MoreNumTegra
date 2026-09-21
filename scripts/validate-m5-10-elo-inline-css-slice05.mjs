import fs from "node:fs";

const html=fs.readFileSync("src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html","utf8");
const css=fs.readFileSync("src-greenn/project-page.css","utf8");
function assert(ok,msg){if(!ok){console.error("FAIL:",msg);process.exitCode=1}else console.log("PASS:",msg)}

const marker='<style data-mt-project-page-css>';
const start=html.indexOf(marker);
const end=start>=0?html.indexOf('</style>',start):-1;
const inlined=start>=0&&end>start?html.slice(start+marker.length,end):null;

assert(!html.includes('<link rel="stylesheet" href="/src-greenn/project-page.css">'),"Elo no longer blocks on the external shared stylesheet");
assert(start>=0&&end>start,"Elo contains the marked inline shared stylesheet");
assert(inlined===css,"inlined CSS is byte-for-byte identical to canonical project-page.css");
assert((html.match(/data-mt-project-page-css/g)||[]).length===1,"exactly one inline shared stylesheet is present");
assert(html.includes('width="1080" height="1350" fetchpriority="high" decoding="async"'),"hero async decode control is restored");
assert(!html.includes('rel="preload" as="image"'),"rejected hero preload remains absent");
assert(html.includes('<link rel="preconnect" href="https://stracctegra.blob.core.windows.net" crossorigin>'),"Azure preconnect remains");
assert(html.includes('<link rel="preconnect" href="https://s3-gdigital.s3.amazonaws.com" crossorigin>'),"S3 preconnect remains");

if(process.exitCode) process.exit(process.exitCode);
console.log("M5-10 Elo inline CSS Slice 05 static validation: PASS");
