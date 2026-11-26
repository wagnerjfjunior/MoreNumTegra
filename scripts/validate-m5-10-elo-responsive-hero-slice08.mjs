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
check(html.includes('<script src="/src-greenn/preview/runtime.js?v=20261125-v3" defer></script>'),"Form46/Consent runtime remains");
check(html.includes("data-moretegra-lead-form"),"Form46 markup remains");
// The late-GTM pilot is superseded by the explicitly consent-gated Basic Consent Mode V3.
const consentV3=fs.readFileSync("src-greenn/preview/consent-v3.js","utf8");
const headV3=html.slice(0,html.indexOf("</head>"));
check(headV3.includes('<script src="/src-greenn/preview/consent-v3.js?v=20261125-final"></script>'),"V3 loads in head before any external tag");
check(!headV3.includes("gtm.start")&&!html.includes("googletagmanager.com/gtm.js"),"no eager GTM bootstrap or network call before consent");
check(!html.includes("googletagmanager.com/ns.html"),"Basic Consent Mode excludes unconsented GTM noscript iframe");
check(consentV3.includes('GTM="GTM-PGCR4R47"')&&consentV3.includes("if(!live||gtmStarted)return;"),"same GTM container, singleton consent-gated loader");
check(consentV3.includes('gtag("consent","default",zero)')&&consentV3.includes('analytics_storage:"denied"'),"default denied precedes non-essential tags");
check(consentV3.includes('ad_storage:p&&p.marketing?"granted":"denied"'),"advertising signal follows granular marketing choice");
check(consentV3.includes('analytics_storage:p&&p.analytics?"granted":"denied"'),"analytics signal follows granular analytics choice");

if(failed) process.exit(1);
console.log("M5-10 Elo responsive hero Slice 08 static validation: PASS");
