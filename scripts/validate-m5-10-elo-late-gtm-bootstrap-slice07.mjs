import fs from "node:fs";

const file="src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html";
const html=fs.readFileSync(file,"utf8");

let failed=false;
function check(ok,msg){
  if(ok) console.log("PASS:",msg);
  else { console.error("FAIL:",msg); failed=true; }
}

const head=html.slice(0,html.indexOf("</head>"));

check(head.includes("if(loaded)return"),"GTM loader is idempotent");
check((html.match(/googletagmanager\.com\/gtm\.js/g)||[]).length===1,"exactly one JavaScript GTM network path exists");
check(!html.includes("googletagmanager.com/gtag/js"),"no direct gtag bootstrap was added");
check(!/\bgtag\s*\(/.test(html),"no project-owned direct gtag() call exists");
check(html.includes('<script src="/src-greenn/preview/runtime.js?v=20261125-v3" defer></script>'),"Form 46 + consent runtime remains");
check(html.includes('<script src="/src-greenn/project-page.js" defer></script>'),"commercial project runtime remains");
check(html.includes('event==="mnt_page_view"?"discovery":"intent"'),"project measurement source adapter remains");
check(html.includes('emit("mnt_page_view",{placement:"document"})'),"mnt_page_view source event remains");
check(html.includes("data-moretegra-lead-form"),"Form 46 markup remains");
check(html.includes("tenant_id"),"Form 46 tenant field remains in page");
check(html.includes('width="1080" height="1350" fetchpriority="high" decoding="async"'),"accepted hero contract remains");
check(!html.includes('rel="preload" as="image"'),"rejected hero preload remains absent");

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
console.log("M5-10 Elo late GTM bootstrap Slice 07 static validation: PASS");
