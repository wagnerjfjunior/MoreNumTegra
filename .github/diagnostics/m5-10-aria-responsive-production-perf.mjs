import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL="https://www.moretegra.com.br/empreendimentos/aria-higienopolis/";
const SHA="ac7958db2f2f4cd3d3bfccf4b6e9592f81a5d739";
const RUNS=5, OUT="m5-10-aria-responsive-prod-qa";
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
    rows.push({run:i,state:"FAIL",exit:p.status,stderr:String(p.stderr||"").slice(-2000)});
    console.log(`run=${i} FAIL`);
    continue;
  }
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  const reqs=lhr.audits?.["network-requests"]?.details?.items||[];
  const hero=reqs.find(x=>String(x.url||"").includes("/assets/aria-higienopolis/hero-mobile-"));
  const gallery=reqs.find(x=>String(x.url||"").includes("/assets/aria-higienopolis/gallery1-mobile-"));
  const thumb=reqs.find(x=>String(x.url||"").includes("/assets/aria-higienopolis/gallery1-thumb-240.webp"));
  const row={
    run:i,state:"PASS",
    score:round((lhr.categories?.performance?.score??0)*100,0),
    fcp_ms:round(num(lhr,"first-contentful-paint"),0),
    lcp_ms:round(num(lhr,"largest-contentful-paint"),0),
    cls:round(num(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(num(lhr,"total-blocking-time"),0),
    transfer:round(num(lhr,"total-byte-weight"),0),
    hero_transfer:hero?.transferSize||null,
    gallery_transfer:gallery?.transferSize||null,
    thumb_transfer:thumb?.transferSize||null,
    hero_url:hero?.url||null,
    gallery_url:gallery?.url||null,
    lcp_selector:lhr.audits?.["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.selector||null
  };
  rows.push(row);
  console.log(`run=${i} PASS score=${row.score} LCP=${row.lcp_ms} CLS=${row.cls} TBT=${row.tbt_ms} bytes=${row.transfer} heroBytes=${row.hero_transfer} galleryBytes=${row.gallery_transfer} thumbBytes=${row.thumb_transfer}`);
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
  hero_transfer:median(pass.map(r=>r.hero_transfer)),
  gallery_transfer:median(pass.map(r=>r.gallery_transfer)),
  thumb_transfer:median(pass.map(r=>r.thumb_transfer))
};
const baseline={score:74,fcp_ms:906,lcp_ms:5621,cls:0.0285,tbt_ms:257,transfer:886131,hero_transfer:221539,hero_source_bytes:221132,gallery_source_bytes:314816};
const delta={
  score:med.score-baseline.score,
  fcp_ms:med.fcp_ms-baseline.fcp_ms,
  lcp_ms:med.lcp_ms-baseline.lcp_ms,
  lcp_percent:round((med.lcp_ms-baseline.lcp_ms)/baseline.lcp_ms*100,2),
  cls:round(med.cls-baseline.cls,4),
  tbt_ms:med.tbt_ms-baseline.tbt_ms,
  transfer:med.transfer-baseline.transfer,
  transfer_percent:round((med.transfer-baseline.transfer)/baseline.transfer*100,2)
};
fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({sha:SHA,rows,med,baseline,delta},null,2));
console.log("ARIA_RESPONSIVE_MEDIANS "+JSON.stringify(med));
console.log("ARIA_BASELINE "+JSON.stringify(baseline));
console.log("ARIA_DELTA "+JSON.stringify(delta));
console.log("ARIA_TARGET "+(med.lcp_ms<=2500?"PASS":"FAIL"));
