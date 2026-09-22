import fs from "node:fs";

const file="src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html";
const html=fs.readFileSync(file,"utf8");

let failed=false;
function check(ok,msg){
  if(ok) console.log("PASS:",msg);
  else { console.error("FAIL:",msg); failed=true; }
}

const head=html.slice(0,html.indexOf("</head>"));
const gtmMarker="w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'})";
const loadMarker="function load(){";
const networkMarker="j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl";

check(head.includes(gtmMarker),"GTM queue bootstrap remains in head");
check(head.includes(loadMarker),"idempotent late-load function exists");
check(head.includes("if(loaded)return"),"GTM loader is idempotent");
check(head.indexOf(gtmMarker) < head.indexOf(loadMarker),"gtm.js queue marker is pushed before late loader definition");
check(head.includes("w.addEventListener('load',load,{once:true})"),"GTM network load is scheduled on window.load");
check(head.includes("d.addEventListener('pointerdown',load,{once:true,capture:true,passive:true})"),"first pointer interaction can activate GTM before window.load");
check(head.includes("d.addEventListener('keydown',load,{once:true,capture:true})"),"first keyboard interaction can activate GTM before window.load");
check(head.includes(networkMarker),"same Google Tag Manager network endpoint remains");
check((html.match(/GTM-PGCR4R47/g)||[]).length===2,"same sole GTM container appears only in JS bootstrap + noscript fallback");
check((html.match(/googletagmanager\.com\/gtm\.js/g)||[]).length===1,"exactly one JavaScript GTM network path exists");
check(!html.includes("googletagmanager.com/gtag/js"),"no direct gtag bootstrap was added");
check(!/\bgtag\s*\(/.test(html),"no project-owned direct gtag() call exists");
check(html.includes('<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PGCR4R47"'),"noscript GTM fallback is preserved");
check(html.includes('<script src="/src-greenn/preview/runtime.js" defer></script>'),"Form 46 + consent runtime remains");
check(html.includes('<script src="/src-greenn/project-page.js" defer></script>'),"commercial project runtime remains");
check(html.includes('event==="mnt_page_view"?"discovery":"intent"'),"project measurement source adapter remains");
check(html.includes('emit("mnt_page_view",{placement:"document"})'),"mnt_page_view source event remains");
check(html.includes("data-moretegra-lead-form"),"Form 46 markup remains");
check(html.includes("tenant_id"),"Form 46 tenant field remains in page");
check(html.includes('width="1080" height="1350" fetchpriority="high" decoding="async"'),"accepted hero contract remains");
check(!html.includes('rel="preload" as="image"'),"rejected hero preload remains absent");

if(failed) process.exit(1);
console.log("M5-10 Elo late GTM bootstrap Slice 07 static validation: PASS");
