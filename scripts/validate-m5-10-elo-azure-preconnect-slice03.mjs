import fs from "node:fs";

const html=fs.readFileSync("src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html","utf8");
function assert(ok,msg){if(!ok){console.error("FAIL:",msg);process.exitCode=1}else console.log("PASS:",msg)}

const hero="https://s3-gdigital.s3.amazonaws.com/gdigital/313/Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp";
assert(!html.includes('<link rel="preconnect" href="https://stracctegra.blob.core.windows.net" crossorigin>'),"Azure preconnect is removed for Slice 03");
assert(html.includes('<link rel="preconnect" href="https://s3-gdigital.s3.amazonaws.com" crossorigin>'),"S3 preconnect for the LCP hero remains");
assert(!html.includes('rel="preload" as="image"'),"rejected hero preload remains absent");
assert(html.includes('src="'+hero+'"'),"selected compact Green hero remains");
assert(html.includes('width="1080" height="1350" fetchpriority="high" decoding="async"'),"hero dimensions and high priority remain");
assert(html.includes("https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/317/"),"Azure media URLs remain for below-fold content; only speculative preconnect is removed");

if(process.exitCode) process.exit(process.exitCode);
console.log("M5-10 Elo Azure preconnect Slice 03 static validation: PASS");
