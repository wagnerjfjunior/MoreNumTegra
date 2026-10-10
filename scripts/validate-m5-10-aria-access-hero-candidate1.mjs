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

// Product Authority changed the Search image owner to the already-approved access hero on 2026-10-10.
check(html.includes('<link rel="canonical" href="https://www.moretegra.com.br/empreendimentos/aria-higienopolis/">'),"canonical unchanged");
const chosen="https://s3-gdigital.s3.amazonaws.com/gdigital/313/%C3%81ria%20Higien%C3%B3polis-Perspectiva%20ilustrada%20do%20acesso%20residencial..webp";
check(html.includes(`<meta property="og:image" content="${chosen}">`),"approved OG image preserved");
check(html.includes(`<meta name="twitter:image" content="${chosen}">`),"approved Twitter image preserved");
check(html.includes(`"contentUrl": "${chosen}"`),"approved ImageObject source preserved");

check(html.includes("GTM-PGCR4R47"),"GTM container remains");
check(html.includes("data-moretegra-lead-form"),"Form46 markup remains");
check(html.includes('<script src="/src-greenn/preview/runtime.js" defer></script>'),"Form46/Consent runtime remains");

if(failed) process.exit(1);
console.log("M5-10 Aria access hero candidate 1 static validation: PASS");
