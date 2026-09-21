import fs from "node:fs";

const html=fs.readFileSync("src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html","utf8");
function assert(ok,msg){if(!ok){console.error("FAIL:",msg);process.exitCode=1}else console.log("PASS:",msg)}

const hero="https://s3-gdigital.s3.amazonaws.com/gdigital/313/Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp";
const preload='<link rel="preload" as="image" href="'+hero+'" fetchpriority="high">';
const heroImg='src="'+hero+'" alt="Elo Duo Caminhos da Lapa, apartamento pronto para morar na Lapa" width="1080" height="1350" fetchpriority="high" decoding="async"';

assert((html.match(new RegExp('rel="preload" as="image"','g'))||[]).length===1,"exactly one image preload is declared");
assert(html.includes(preload),"preload targets the selected compact Green hero with high priority");
assert(html.indexOf(preload)<html.indexOf('<link rel="stylesheet" href="/src-greenn/project-page.css">'),"hero preload is discovered before render-blocking project CSS");
assert(html.includes(heroImg),"visible hero remains the selected compact Green asset with intrinsic dimensions and high priority");
assert(!html.includes(heroImg+' loading="lazy"'),"hero remains non-lazy");
assert(html.includes('<link rel="preconnect" href="https://s3-gdigital.s3.amazonaws.com" crossorigin>'),"S3 preconnect remains present");

if(process.exitCode) process.exit(process.exitCode);
console.log("M5-10 Elo hero preload slice 02 static validation: PASS");
