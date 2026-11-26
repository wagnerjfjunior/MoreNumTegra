import fs from "node:fs";

const file="src-greenn/preview/index.html";
const html=fs.readFileSync(file,"utf8");
const head=html.slice(0,html.indexOf("</head>"));

let failed=false;
const check=(ok,msg)=>{ if(ok) console.log("PASS:",msg); else {console.error("FAIL:",msg);failed=true;} };



check(!html.includes("googletagmanager.com/gtag/js"),"no direct gtag bootstrap added");
check(!/\bgtag\s*\(/.test(html),"no project-owned direct gtag() call added");
check(html.includes('<script src="/src-greenn/preview/runtime.js?v=20261125-v3" defer></script>'),"Consent/Form46 runtime preserved");
check(html.includes('<script src="/src-greenn/preview/measurement-core.js?v=20261125-v3" defer></script>'),"measurement core preserved");
check(html.includes('<script src="/src-greenn/preview/measurement-form.js?v=20261125-v3" defer></script>'),"measurement form adapter preserved");
check(html.includes('data-moretegra-lead-form'),"Form46 markup preserved");
check(html.includes('data-hero-video data-video-id="SCCM3vzNlyk"'),"MNT-PERF-03A YouTube intent facade preserved");
check(!head.includes('<link rel="preconnect" href="https://www.youtube-nocookie.com">'),"YouTube eager preconnect remains absent");

// The late-GTM pilot is superseded by the explicitly consent-gated Basic Consent Mode V3.
const consentV3=fs.readFileSync("src-greenn/preview/consent-v3.js","utf8");
const headV3=html.slice(0,html.indexOf("</head>"));
check(consentV3.includes("if(!live||gtmStarted)return;"),"GTM loader is idempotent");
check((consentV3.match(/googletagmanager\.com\/gtm\.js/g)||[]).length===1&&!html.includes("googletagmanager.com/gtm.js"),"exactly one consent-gated GTM JavaScript network path exists");
check(headV3.includes('<script src="/src-greenn/preview/consent-v3.js?v=20261125-final" defer></script>'),"V3 remains first deferred executable script in head");
check(!headV3.includes("gtm.start")&&!html.includes("googletagmanager.com/gtm.js"),"no eager GTM bootstrap or network call before consent");
check(!html.includes("googletagmanager.com/ns.html"),"Basic Consent Mode excludes unconsented GTM noscript iframe");
check(consentV3.includes('GTM="GTM-PGCR4R47"')&&consentV3.includes("if(!live||gtmStarted)return;"),"same GTM container, singleton consent-gated loader");
check(consentV3.includes('gtag("consent","default",zero)')&&consentV3.includes('analytics_storage:"denied"'),"default denied precedes non-essential tags");
check(consentV3.includes('ad_storage:p&&p.marketing?"granted":"denied"'),"advertising signal follows granular marketing choice");
check(consentV3.includes('analytics_storage:p&&p.analytics?"granted":"denied"'),"analytics signal follows granular analytics choice");

if(failed) process.exit(1);
console.log("MNT-PERF-03B Home late-GTM bootstrap static validation: PASS");

// Ordered deferred scripts preserve the consent-first contract without blocking parsing.
const executable = [...html.matchAll(/<script\\b([^>]*)>([\\s\\S]*?)<\\/script>/gi)].filter(m=>!m[1].includes("ld+json"));
if(executable.length!==7 || executable[0][0]!=="<script src=\"/src-greenn/preview/consent-v3.js?v=20261125-final\" defer></script>" || executable.some(m=>! /\\bdefer\\b/.test(m[1]) || /\\basync\\b/.test(m[1]) || m[2].trim())) throw new Error("Home must execute consent before all deferred consumers; no inline or async executable scripts");
console.log("PASS: ordered deferred consent-first bootstrap");
