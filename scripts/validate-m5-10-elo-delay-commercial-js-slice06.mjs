import fs from "node:fs";

const htmlPath="src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html";
const dataPath="src-greenn/data/commercial-values.json";
const html=fs.readFileSync(htmlPath,"utf8");
const payload=JSON.parse(fs.readFileSync(dataPath,"utf8"));
const commercial=payload?.projects?.["caminhos-da-lapa-elo-duo"];

function assert(ok,msg){if(!ok){console.error("FAIL:",msg);process.exitCode=1}else console.log("PASS:",msg)}
const brl=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(Number(commercial?.price)).replace(/\\u00a0/g," ");

assert(!html.includes('<script src="/src-greenn/project-page.js" defer></script>'),"direct parser-time deferred commercial script is absent");
assert(html.includes('window.addEventListener("load",load,{once:true})'),"commercial script waits for window load");
assert(html.includes('s.src="/src-greenn/project-page.js"'),"canonical commercial runtime remains the loaded implementation");
assert(html.includes('document.body.append(s)'),"commercial runtime is injected after the load boundary");
assert((html.match(/s\.src="\/src-greenn\/project-page\.js"/g)||[]).length===1,"exactly one delayed commercial loader exists");
assert(commercial?.state==="active_reference","governed Elo commercial state remains active_reference");
assert(html.includes(`data-commercial-price>${brl}</div>`),"initial HTML price matches governed commercial JSON");
assert(html.includes(`data-commercial-reference>${commercial.reference}</p>`),"initial HTML reference matches governed commercial JSON");
assert(html.includes("data-inventory-label>Consulte disponibilidade</strong>"),"pre-sync inventory fallback remains conservative");
assert(html.includes('width="1080" height="1350" fetchpriority="high" decoding="async"'),"accepted hero loading contract remains");
assert(!html.includes('rel="preload" as="image"'),"rejected hero preload remains absent");
assert(html.includes('<link rel="stylesheet" href="/src-greenn/project-page.css">'),"canonical external stylesheet remains restored");
assert(html.includes('<link rel="preconnect" href="https://stracctegra.blob.core.windows.net" crossorigin>'),"Azure preconnect remains");
assert(html.includes('<link rel="preconnect" href="https://s3-gdigital.s3.amazonaws.com" crossorigin>'),"S3 preconnect remains");

if(process.exitCode) process.exit(process.exitCode);
console.log("M5-10 Elo delayed commercial JS Slice 06 static validation: PASS");
