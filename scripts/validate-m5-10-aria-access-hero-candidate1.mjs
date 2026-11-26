import fs from "node:fs";

const html=fs.readFileSync("src-greenn/empreendimentos/aria-higienopolis/index.html","utf8");
let failed=false;
const check=(ok,msg)=>{if(ok) console.log("PASS:",msg); else {console.error("FAIL:",msg);failed=true;}};

const files=[
  ["assets/aria-higienopolis/candidate1/hero-access-mobile-640.webp",64508,100*1024],
  ["assets/aria-higienopolis/candidate1/hero-access-mobile-828.webp",99308,100*1024]
];
for(const [path,bytes,budget] of files){
  check(fs.existsSync(path),path+" exists");
  if(fs.existsSync(path)){
    check(fs.statSync(path).size===bytes,path+" byte identity preserved");
    check(fs.statSync(path).size<=budget,path+" meets <=100KiB hero budget");
  }
}

check(html.includes('/assets/aria-higienopolis/candidate1/hero-access-mobile-640.webp 640w'),"candidate 640w declared");
check(html.includes('/assets/aria-higienopolis/candidate1/hero-access-mobile-828.webp 828w'),"candidate 828w declared");
check(html.includes('sizes="calc(100vw - 32px)"'),"mobile sizes preserved");
check(html.includes('fetchpriority="high" decoding="async"'),"hero remains high priority and non-lazy");
check(html.includes('%C3%81ria%20Higien%C3%B3polis-Perspectiva%20ilustrada%20do%20acesso%20residencial..webp'),"Green candidate retained as desktop/fallback source");
check(html.includes('alt="Perspectiva ilustrada do acesso residencial do Ária Higienópolis"'),"candidate alt matches content");
check(!html.includes('rel="preload" as="image"'),"no blanket image preload added");

// Slice 09 gallery contract must remain untouched.
check(html.includes('/assets/aria-higienopolis/gallery1-mobile-640.webp 640w'),"retained gallery 640w remains");
check(html.includes('/assets/aria-higienopolis/gallery1-mobile-828.webp 828w'),"retained gallery 828w remains");
check(html.includes('/assets/aria-higienopolis/gallery1-thumb-240.webp'),"retained gallery thumbnail remains");

// SEO/social/schema intentionally remain governed by prior facade source.
check(html.includes('<link rel="canonical" href="https://www.moretegra.com.br/empreendimentos/aria-higienopolis/">'),"canonical unchanged");
check(html.includes('https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/312/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Studio-Salas-Comerciais-Aria-Higienopolis-Sao-Paulo-SP-1715881825537.jpg'),"governed social/schema facade source remains present");

check(html.includes("data-moretegra-lead-form"),"Form46 markup remains");
check(html.includes('<script src="/src-greenn/preview/runtime.js?v=20261125-v3" defer></script>'),"Form46/Consent runtime remains");

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
console.log("M5-10 Aria access hero candidate 1 static validation: PASS");
