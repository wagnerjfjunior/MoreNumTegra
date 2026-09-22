import fs from "node:fs";

const htmlPath="src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html";
const html=fs.readFileSync(htmlPath,"utf8");
let failed=false;
const check=(ok,msg)=>{if(ok) console.log("PASS:",msg); else {console.error("FAIL:",msg);failed=true;}};

const a640="assets/elo-duo/hero-mobile-640.webp";
const a828="assets/elo-duo/hero-mobile-828.webp";
const original="https://s3-gdigital.s3.amazonaws.com/gdigital/313/Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp";

check(fs.existsSync(a640),"640w derivative exists");
check(fs.existsSync(a828),"828w derivative exists");
check(fs.statSync(a640).size===52278,"640w derivative byte identity preserved");
check(fs.statSync(a828).size===72376,"828w derivative byte identity preserved");
check(fs.statSync(a640).size<=100*1024,"640w derivative meets mobile <=100 KiB budget");
check(fs.statSync(a828).size<=100*1024,"828w derivative meets mobile <=100 KiB budget");
check(html.includes('<picture style="display:block;width:100%;height:100%">'),"hero picture wrapper is explicit and fills existing aspect-ratio box");
check(html.includes('media="(max-width:719px)"'),"responsive source is mobile-bounded below desktop breakpoint");
check(html.includes('/assets/elo-duo/hero-mobile-640.webp 640w'),"640w candidate is declared");
check(html.includes('/assets/elo-duo/hero-mobile-828.webp 828w'),"828w candidate is declared");
check(html.includes('sizes="calc(100vw - 32px)"'),"mobile sizes matches project shell width");
check(html.includes('src="'+original+'"'),"existing Green hero remains img fallback/desktop source");
check(html.includes('fetchpriority="high" decoding="async"'),"hero keeps high-priority direct discovery");
check(!html.includes('loading="lazy"') || html.indexOf('fetchpriority="high"') < html.indexOf('loading="lazy"'),"hero is not lazy-loaded");
check(!html.includes('rel="preload" as="image"'),"rejected hero preload remains absent");
check(html.includes("w.addEventListener('load',load,{once:true})"),"retained late GTM bootstrap remains");
check(html.includes("GTM-PGCR4R47"),"same GTM container remains");
check(html.includes('<script src="/src-greenn/preview/runtime.js" defer></script>'),"Form46/Consent runtime remains");
check(html.includes("data-moretegra-lead-form"),"Form46 markup remains");
if(failed) process.exit(1);
console.log("M5-10 Elo responsive hero Slice 08 static validation: PASS");
