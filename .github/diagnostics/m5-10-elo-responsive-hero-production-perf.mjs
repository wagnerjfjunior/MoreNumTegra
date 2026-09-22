import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const SHA="90745255775129638b3d8f061ab067d8ecc1c425";
const RUNS=5, OUT="m5-10-elo-responsive-hero-prod-qa";
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
  if(p.status!==0||!fs.existsSync(file)){
    rows.push({run:i,state:"FAIL",exit:p.status,stderr:String(p.stderr||"").slice(-1800)});
    console.log(`run=${i} FAIL`);
    continue;
  }
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  const reqs=lhr.audits?.["network-requests"]?.details?.items||[];
  const hero=reqs.find(x=>String(x.url||"").includes("/assets/elo-duo/hero-mobile-")) || reqs.find(x=>String(x.url||"").includes("Compac%20-%20Caminhos"));
  const row={
    run:i,state:"PASS",
    score:round((lhr.categories?.performance?.score??0)*100,0),
    fcp_ms:round(num(lhr,"first-contentful-paint"),0),
    lcp_ms:round(num(lhr,"largest-contentful-paint"),0),
    cls:round(num(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(num(lhr,"total-blocking-time"),0),
    transfer:round(num(lhr,"total-byte-weight"),0),
    hero_url:hero?.url||null,
    hero_transfer:hero?.transferSize||null,
    lcp_element:lhr.audits?.["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.selector||null
  };
  rows.push(row);
  console.log(`run=${i} PASS score=${row.score} LCP=${row.lcp_ms} CLS=${row.cls} TBT=${row.tbt_ms} bytes=${row.transfer} heroBytes=${row.hero_transfer} hero=${row.hero_url}`);
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
const control={slice07_lcp_ms:3279,slice07_score:84,slice07_tbt_ms:237,slice07_cls:0.0307,slice07_transfer:1062608};
const delta={
  lcp_ms:med.lcp_ms-control.slice07_lcp_ms,
  lcp_percent:round((med.lcp_ms-control.slice07_lcp_ms)/control.slice07_lcp_ms*100,2),
  score:med.score-control.slice07_score,
  tbt_ms:med.tbt_ms-control.slice07_tbt_ms,
  transfer:med.transfer-control.slice07_transfer
};
fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({sha:SHA,rows,med,control,delta},null,2));
console.log("MEDIANS "+JSON.stringify(med));
console.log("CONTROL "+JSON.stringify(control));
console.log("DELTA "+JSON.stringify(delta));
console.log("TARGET "+(med.lcp_ms<=2500?"PASS":"FAIL"));
