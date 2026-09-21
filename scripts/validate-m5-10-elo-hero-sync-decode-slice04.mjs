import fs from "node:fs";

const html=fs.readFileSync("src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html","utf8");
function assert(ok,msg){if(!ok){console.error("FAIL:",msg);process.exitCode=1}else console.log("PASS:",msg)}

const hero="https://s3-gdigital.s3.amazonaws.com/gdigital/313/Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp";
const heroTag='src="'+hero+'" alt="Elo Duo Caminhos da Lapa, apartamento pronto para morar na Lapa" width="1080" height="1350" fetchpriority="high" decoding="sync"';

assert(html.includes(heroTag),"visible Elo hero uses synchronous decoding candidate");
assert(!html.includes('src="'+hero+'" alt="Elo Duo Caminhos da Lapa, apartamento pronto para morar na Lapa" width="1080" height="1350" fetchpriority="high" decoding="async"'),"previous async decoding is absent from visible hero");
assert(!html.includes('rel="preload" as="image"'),"rejected explicit hero preload remains absent");
assert(html.includes('<link rel="preconnect" href="https://stracctegra.blob.core.windows.net" crossorigin>'),"Azure preconnect remains restored");
assert(html.includes('<link rel="preconnect" href="https://s3-gdigital.s3.amazonaws.com" crossorigin>'),"S3 preconnect remains present");

if(process.exitCode) process.exit(process.exitCode);
console.log("M5-10 Elo hero sync decode Slice 04 static validation: PASS");
