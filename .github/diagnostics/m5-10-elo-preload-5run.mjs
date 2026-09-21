import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL = "https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const RUNTIME_SHA = "5625ae092385cf44afd37790c52d354909f1129a";
const RUNS = 5;
const OUT = "m5-10-elo-preload-5run";
fs.mkdirSync(OUT,{recursive:true});

function round(v,d=2){return Number.isFinite(v)?Number(v.toFixed(d)):null}
function numeric(lhr,id){const a=lhr.audits?.[id];return a&&Number.isFinite(a.numericValue)?a.numericValue:null}
function median(values){const n=values.filter(Number.isFinite).sort((a,b)=>a-b);if(!n.length)return null;return n[Math.floor(n.length/2)]}
function lcpElement(lhr){
  for(const id of ["largest-contentful-paint-element","lcp-discovery-insight"]){
    const a=lhr.audits?.[id];
    const items=a?.details?.items;
    if(!Array.isArray(items)||!items.length)continue;
    const item=items[0];
    const node=item?.node||item?.items?.[0]?.node||null;
    const label=node?.nodeLabel||node?.snippet||item?.nodeLabel||null;
    if(label)return String(label).slice(0,800);
  }
  return null;
}
function auditSummary(lhr,id){
  const a=lhr.audits?.[id];
  if(!a)return null;
  return {
    id,
    score:a.score,
    displayValue:a.displayValue||null,
    numericValue:Number.isFinite(a.numericValue)?round(a.numericValue,0):null,
    savingsMs:Number.isFinite(a.details?.overallSavingsMs)?round(a.details.overallSavingsMs,0):null,
    savingsBytes:Number.isFinite(a.details?.overallSavingsBytes)?round(a.details.overallSavingsBytes,0):null
  };
}

const rows=[];
for(let i=1;i<=RUNS;i++){
  const file=path.join(OUT,`elo-preload-run-${i}.json`);
  const args=[
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
  ];
  const proc=spawnSync("./node_modules/.bin/lighthouse",args,{encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout:180000});
  if(proc.status!==0||!fs.existsSync(file)){
    rows.push({run:i,state:"FAIL",exit_code:proc.status,stderr:String(proc.stderr||"").slice(-2000)});
    continue;
  }
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  rows.push({
    run:i,
    state:"PASS",
    performance_score:round((lhr.categories?.performance?.score??0)*100,0),
    fcp_ms:round(numeric(lhr,"first-contentful-paint"),0),
    lcp_ms:round(numeric(lhr,"largest-contentful-paint"),0),
    cls:round(numeric(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(numeric(lhr,"total-blocking-time"),0),
    speed_index_ms:round(numeric(lhr,"speed-index"),0),
    total_byte_weight:round(numeric(lhr,"total-byte-weight"),0),
    server_response_ms:round(numeric(lhr,"server-response-time"),0),
    lcp_element:lcpElement(lhr),
    lcp_discovery:auditSummary(lhr,"lcp-discovery-insight"),
    image_delivery:auditSummary(lhr,"image-delivery-insight"),
    render_blocking:auditSummary(lhr,"render-blocking-insight"),
    fetch_time:lhr.fetchTime||null
  });
}
const pass=rows.filter(r=>r.state==="PASS");
const medians={
  performance_score:median(pass.map(r=>r.performance_score)),
  fcp_ms:median(pass.map(r=>r.fcp_ms)),
  lcp_ms:median(pass.map(r=>r.lcp_ms)),
  cls:median(pass.map(r=>r.cls)),
  tbt_ms:median(pass.map(r=>r.tbt_ms)),
  speed_index_ms:median(pass.map(r=>r.speed_index_ms)),
  total_byte_weight:median(pass.map(r=>r.total_byte_weight)),
  server_response_ms:median(pass.map(r=>r.server_response_ms))
};
const baseline={lcp_ms:3947,performance_score:70,total_byte_weight:1062054};
const delta={
  lcp_ms:medians.lcp_ms==null?null:medians.lcp_ms-baseline.lcp_ms,
  lcp_percent:medians.lcp_ms==null?null:round((medians.lcp_ms-baseline.lcp_ms)/baseline.lcp_ms*100,2),
  performance_score:medians.performance_score==null?null:medians.performance_score-baseline.performance_score,
  total_byte_weight:medians.total_byte_weight==null?null:medians.total_byte_weight-baseline.total_byte_weight
};
const summary={
  task:"MNT-M5-10",
  slice:"ELO_HERO_PRELOAD_SLICE_02",
  environment:"PRODUCTION",
  runtime_sha:RUNTIME_SHA,
  production_url:URL,
  methodology:"Lighthouse 13.5.0 mobile, 393x852, deviceScaleFactor 2.75, simulated throttling, 5 runs; medians recorded.",
  target_lcp_ms:2500,
  baseline,
  rows,
  medians,
  delta
};
fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2));
console.log("MNT-M5-10 ELO PRELOAD 5-RUN");
console.log("runtime_sha="+RUNTIME_SHA);
for(const r of rows){
  console.log(`run=${r.run} state=${r.state} score=${r.performance_score??"NA"} FCP=${r.fcp_ms??"NA"} LCP=${r.lcp_ms??"NA"} CLS=${r.cls??"NA"} TBT=${r.tbt_ms??"NA"} bytes=${r.total_byte_weight??"NA"}`);
}
console.log("MEDIANS "+JSON.stringify(medians));
console.log("BASELINE "+JSON.stringify(baseline));
console.log("DELTA "+JSON.stringify(delta));
console.log("TARGET "+(medians.lcp_ms!=null&&medians.lcp_ms<=2500?"PASS":"FAIL"));
