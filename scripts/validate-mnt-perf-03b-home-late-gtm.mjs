import fs from "node:fs";

const file="src-greenn/preview/index.html";
const html=fs.readFileSync(file,"utf8");
const head=html.slice(0,html.indexOf("</head>"));

let failed=false;
const check=(ok,msg)=>{ if(ok) console.log("PASS:",msg); else {console.error("FAIL:",msg);failed=true;} };

const gtmMarker="w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'})";
const loadMarker="function load(){";
const networkMarker="j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl";

check(head.includes(gtmMarker),"GTM queue bootstrap remains in head");
check(head.includes(loadMarker),"idempotent late-load function exists");
check(head.includes("if(loaded)return"),"GTM loader is idempotent");
check(head.indexOf(gtmMarker) < head.indexOf(loadMarker),"gtm.js marker is queued before network loader");
check(head.includes("w.addEventListener('load',load,{once:true})"),"window.load activates GTM network");
check(head.includes("d.addEventListener('pointerdown',load,{once:true,capture:true,passive:true})"),"pointer interaction can activate GTM before load");
check(head.includes("d.addEventListener('keydown',load,{once:true,capture:true})"),"keyboard interaction can activate GTM before load");
check(head.includes(networkMarker),"same GTM network endpoint remains");
check((html.match(/GTM-PGCR4R47/g)||[]).length===2,"same sole GTM container remains in JS + noscript");
check((html.match(/googletagmanager\.com\/gtm\.js/g)||[]).length===1,"exactly one GTM JavaScript network path exists");
check(!html.includes("googletagmanager.com/gtag/js"),"no direct gtag bootstrap added");
check(!/\bgtag\s*\(/.test(html),"no project-owned direct gtag() call added");
check(html.includes('<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PGCR4R47"'),"noscript fallback preserved");
check(html.includes('<script src="/src-greenn/preview/runtime.js" defer></script>'),"Consent/Form46 runtime preserved");
check(html.includes('<script src="/src-greenn/preview/measurement-core.js" defer></script>'),"measurement core preserved");
check(html.includes('<script src="/src-greenn/preview/measurement-form.js" defer></script>'),"measurement form adapter preserved");
check(html.includes('data-moretegra-lead-form'),"Form46 markup preserved");
check(html.includes('data-hero-video data-video-id="SCCM3vzNlyk"'),"MNT-PERF-03A YouTube intent facade preserved");
check(!head.includes('<link rel="preconnect" href="https://www.youtube-nocookie.com">'),"YouTube eager preconnect remains absent");

if(failed) process.exit(1);
console.log("MNT-PERF-03B Home late-GTM bootstrap static validation: PASS");
