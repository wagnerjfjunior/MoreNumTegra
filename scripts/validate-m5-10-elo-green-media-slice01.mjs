import fs from "node:fs";

const html=fs.readFileSync("src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html","utf8");
function assert(ok,msg){if(!ok){console.error("FAIL:",msg);process.exitCode=1}else console.log("PASS:",msg)}

const hero="https://s3-gdigital.s3.amazonaws.com/gdigital/313/Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp";
const complex="https://s3-gdigital.s3.amazonaws.com/gdigital/313/Compact-Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%20630x1126%20-%20Complexo.webp";
const oldHero="https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/317/ImagemPrincipal/8d3d8839-e0b7-4f21-9d0e-99c363c8f6bc.jpg";
const oldComplex="https://s3-gdigital.s3.amazonaws.com/gdigital/313/XUDkRhyRZbqT9VA4RRLdCijN2DlNrBt2yHMJLzul.webp";
const previousGreenComplex="https://s3-gdigital.s3.amazonaws.com/gdigital/313/Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%20630x1126%20-%20Complexo.webp";

assert(html.includes('src="'+hero+'"'),"Elo hero uses authorized Green WebP");
assert(html.includes('width="1080" height="1350" fetchpriority="high" decoding="async"'),"hero intrinsic dimensions and high priority are preserved");
assert(!html.includes('src="'+hero+'" alt="Elo Duo Caminhos da Lapa, apartamento pronto para morar na Lapa" width="1080" height="1350" loading="lazy"'),"hero is not lazy-loaded");
assert(html.includes('src="'+complex+'"'),"Rua Jardim/complex image uses authorized Green WebP");
assert(html.includes('width="1126" height="630" loading="lazy" decoding="async"'),"below-fold complex image keeps real dimensions and lazy loading");
assert(!html.includes(oldHero),"old Tegra hero URL is removed from Elo page");
assert(!html.includes(oldComplex),"old pre-Green complex URL is removed from Elo page");
assert(!html.includes(previousGreenComplex),"previous Green complex URL is removed for compact-source trial");

if(process.exitCode) process.exit(process.exitCode);
console.log("M5-10 Elo Green media slice 01 static validation: PASS");
