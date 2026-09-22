import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL="https://www.moretegra.com.br/empreendimentos/aria-higienopolis/";
const SHA="5a0df7b6757930bf34664d04d66b9a41e841f577";
const RUNS=5, OUT="m5-10-aria-access-candidate1-prod-qa";
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
  const hero=reqs.find(x=>String(x.url||"").includes("/assets/aria-higienopolis/candidate1/hero-access-mobile-"));
  const gallery=reqs.find(x=>String(x.url||"").includes("/assets/aria-higienopolis/gallery1-mobile-"));
  const fallback=reqs.find(x=>decodeURIComponent(String(x.url||"")).includes("Ária Higienópolis-Perspectiva ilustrada do acesso residencial..webp"));

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
    fallback_requested:Boolean(fallback),
    lcp_selector:lhr.audits?.["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.selector||null
  };
  rows.push(row);
  console.log(`run=${i} PASS score=${row.score} LCP=${row.lcp_ms} CLS=${row.cls} TBT=${row.tbt_ms} bytes=${row.transfer} heroBytes=${row.hero_transfer} galleryBytes=${row.gallery_transfer} fallbackReq=${row.fallback_requested}`);
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
  gallery_transfer:median(pass.map(r=>r.gallery_transfer))
};

const control={
  score:95,
  fcp_ms:964,
  lcp_ms:1853,
  cls:0.0287,
  tbt_ms:244,
  transfer:535700,
  hero_transfer:83042,
  gallery_transfer:103041
};

const delta={
  score:med.score-control.score,
  fcp_ms:med.fcp_ms-control.fcp_ms,
  lcp_ms:med.lcp_ms-control.lcp_ms,
  lcp_percent:round((med.lcp_ms-control.lcp_ms)/control.lcp_ms*100,2),
  cls:round(med.cls-control.cls,4),
  tbt_ms:med.tbt_ms-control.tbt_ms,
  transfer:med.transfer-control.transfer,
  transfer_percent:round((med.transfer-control.transfer)/control.transfer*100,2),
  hero_transfer:med.hero_transfer-control.hero_transfer,
  hero_transfer_percent:round((med.hero_transfer-control.hero_transfer)/control.hero_transfer*100,2)
};

fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({sha:SHA,rows,med,control,delta},null,2));
console.log("ARIA_ACCESS_CANDIDATE1_MEDIANS "+JSON.stringify(med));
console.log("ARIA_ACCESS_CONTROL "+JSON.stringify(control));
console.log("ARIA_ACCESS_DELTA "+JSON.stringify(delta));
console.log("ARIA_ACCESS_TARGET "+(med.lcp_ms<=2500?"PASS":"FAIL"));
