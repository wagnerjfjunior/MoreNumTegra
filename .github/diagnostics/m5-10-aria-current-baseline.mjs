import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL="https://www.moretegra.com.br/empreendimentos/aria-higienopolis/";
const RUNS=5, OUT="m5-10-aria-current-baseline";
fs.mkdirSync(OUT,{recursive:true});
const round=(v,d=2)=>Number.isFinite(v)?Number(v.toFixed(d)):null;
const num=(lhr,id)=>{const a=lhr.audits?.[id];return a&&Number.isFinite(a.numericValue)?a.numericValue:null};
const median=v=>{const n=v.filter(Number.isFinite).sort((a,b)=>a-b);return n.length?n[Math.floor(n.length/2)]:null};

const rows=[];
for(let i=1;i<=RUNS;i++){
  const file=path.join(OUT,`run-${i}.json`);
  const p=spawnSync("./node_modules/.bin/lighthouse",[
    URL,
    "--only-categories=performance",
    "--form-factor=mobile",
    "--screenEmulation.mobile=true",
    "--screenEmulation.width=393",
    "--screenEmulation.height=852",
    "--screenEmulation.deviceScaleFactor=2.75",
    "--throttling-method=simulate",
    "--output=json",
    `--output-path=${file}`,
    "--quiet",
    "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage"
  ],{encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout:180000});
  if(p.status!==0||!fs.existsSync(file)){rows.push({run:i,state:"FAIL"});continue;}
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  const reqs=lhr.audits?.["network-requests"]?.details?.items||[];
  const hero=reqs.find(x=>String(x.url||"").includes("ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada"));
  const gallery=reqs.find(x=>String(x.url||"").includes("309b34e4-72f0-48d0-a8f8-1f8e94a90cbb"));
  const row={
    run:i,state:"PASS",
    score:round((lhr.categories?.performance?.score??0)*100,0),
    fcp_ms:round(num(lhr,"first-contentful-paint"),0),
    lcp_ms:round(num(lhr,"largest-contentful-paint"),0),
    cls:round(num(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(num(lhr,"total-blocking-time"),0),
    transfer:round(num(lhr,"total-byte-weight"),0),
    hero_transfer:hero?.transferSize||null,
    hero_url:hero?.url||null,
    gallery_transfer:gallery?.transferSize||null,
    gallery_requested:Boolean(gallery),
    lcp_selector:lhr.audits?.["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.selector||null
  };
  rows.push(row);
  console.log(`run=${i} PASS score=${row.score} LCP=${row.lcp_ms} CLS=${row.cls} TBT=${row.tbt_ms} bytes=${row.transfer} heroBytes=${row.hero_transfer} galleryReq=${row.gallery_requested}`);
}
const pass=rows.filter(r=>r.state==="PASS");
const med={
  runs:pass.length,
  score:median(pass.map(r=>r.score)),
  fcp_ms:median(pass.map(r=>r.fcp_ms)),
  lcp_ms:median(pass.map(r=>r.lcp_ms)),
  cls:median(pass.map(r=>r.cls)),
  tbt_ms:median(pass.map(r=>r.tbt_ms)),
  transfer:median(pass.map(r=>r.transfer)),
  hero_transfer:median(pass.map(r=>r.hero_transfer))
};
fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({rows,med},null,2));
console.log("ARIA_CURRENT_MEDIANS "+JSON.stringify(med));
