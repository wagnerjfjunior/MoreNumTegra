import fs from "node:fs";

const html=fs.readFileSync("src-greenn/empreendimentos/aria-higienopolis/index.html","utf8");
let failed=false;
const check=(ok,msg)=>{if(ok) console.log("PASS:",msg); else {console.error("FAIL:",msg);failed=true;}};

const assets=[
  ["assets/aria-higienopolis/gallery1-mobile-640.webp",66072,120*1024],
  ["assets/aria-higienopolis/gallery1-mobile-828.webp",102838,120*1024],
  ["assets/aria-higienopolis/gallery1-thumb-240.webp",10474,30*1024]
];

for(const [path,bytes,budget] of assets){
  check(fs.existsSync(path),path+" exists");
  if(fs.existsSync(path)){
    check(fs.statSync(path).size===bytes,path+" byte identity preserved");
    check(fs.statSync(path).size<=budget,path+" meets budget");
  }
}
check(!fs.existsSync("assets/aria-higienopolis/gallery1-mobile-1080.webp"),"over-budget unused 1080w gallery derivative removed");

const heroMatch=html.match(/<div class="mt-hero-media"><picture[\s\S]*?<source\s+media="\(max-width:719px\)"\s+type="image\/webp"\s+srcset="([^"]+)"\s+sizes="calc\(100vw - 32px\)"[\s\S]*?<img[^>]+fetchpriority="high"[^>]*>[\s\S]*?<\/picture><\/div>/);
check(Boolean(heroMatch),"Aria hero preserves responsive picture contract");
check(Boolean(heroMatch?.[1]?.includes("640w")),"Aria hero includes 640w mobile candidate");
check(Boolean(heroMatch?.[1] && /\s\d+w(?:,|$)/.test(heroMatch[1])),"Aria hero declares width-descriptor srcset");
check(!/mt-hero-media[\s\S]{0,1200}loading="lazy"/.test(html),"Aria hero remains non-lazy");
check(!html.includes('rel="preload" as="image"'),"no new hero preload");

check(html.includes('data-gallery-picture'),"first gallery main has picture wrapper");
check(html.includes('/assets/aria-higienopolis/gallery1-mobile-640.webp 640w'),"gallery 640w declared");
check(html.includes('/assets/aria-higienopolis/gallery1-mobile-828.webp 828w'),"gallery 828w declared");
check(html.includes('/assets/aria-higienopolis/gallery1-thumb-240.webp'),"first gallery thumbnail derivative used");
check(html.includes('data-mobile-srcset="/assets/aria-higienopolis/gallery1-mobile-640.webp 640w, /assets/aria-higienopolis/gallery1-mobile-828.webp 828w"'),"first gallery responsive contract is recoverable after navigation");
check(html.includes('source.removeAttribute("srcset")'),"gallery removes first-image responsive source for alternate scenes");
check(html.includes('source.srcset=srcset'),"gallery restores responsive first-image source");

check(html.includes("GTM-PGCR4R47"),"same GTM container remains");
check(!html.includes("googletagmanager.com/gtag/js"),"no direct project gtag script added");
check(html.includes('<script src="/src-greenn/preview/runtime.js" defer></script>'),"Form46/Consent runtime remains");
check(html.includes("data-moretegra-lead-form"),"Form46 markup remains");
check(html.includes('<link rel="canonical" href="https://www.moretegra.com.br/empreendimentos/aria-higienopolis/">'),"canonical remains");
if(failed) process.exit(1);
console.log("M5-10 Aria responsive media Slice 09 static validation: PASS");
