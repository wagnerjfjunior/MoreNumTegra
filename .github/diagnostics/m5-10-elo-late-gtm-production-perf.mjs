import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const SHA="8d99996edddd66a59835992da161edbbb3579ad0";
const RUNS=5;
const OUT="m5-10-elo-late-gtm-prod-qa";
fs.mkdirSync(OUT,{recursive:true});

function round(v,d=2){return Number.isFinite(v)?Number(v.toFixed(d)):null}
function num(lhr,id){const a=lhr.audits?.[id];return a&&Number.isFinite(a.numericValue)?a.numericValue:null}
function median(v){const n=v.filter(Number.isFinite).sort((a,b)=>a-b);return n.length?n[Math.floor(n.length/2)]:null}
function audit(lhr,id){
  const a=lhr.audits?.[id];
  if(!a)return null;
  return {score:a.score,displayValue:a.displayValue||null,numericValue:Number.isFinite(a.numericValue)?round(a.numericValue,0):null,details:a.details||null};
}
function countRequests(lhr,needle){
  const items=lhr.audits?.["network-requests"]?.details?.items||[];
  return items.filter(x=>String(x.url||"").includes(needle)).length;
}

const rows=[];
for(let i=1;i<=RUNS;i++){
  const file=path.join(OUT,`run-${i}.json`);
  const args=[URL,
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
  const p=spawnSync("./node_modules/.bin/lighthouse",args,{encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout:180000});
  if(p.status!==0||!fs.existsSync(file)){
    rows.push({run:i,state:"FAIL",exit_code:p.status,stderr:String(p.stderr||"").slice(-2500)});
    console.log(`run=${i} state=FAIL exit=${p.status}`);
    continue;
  }
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  const row={
    run:i,state:"PASS",
    performance_score:round((lhr.categories?.performance?.score??0)*100,0),
    fcp_ms:round(num(lhr,"first-contentful-paint"),0),
    lcp_ms:round(num(lhr,"largest-contentful-paint"),0),
    cls:round(num(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(num(lhr,"total-blocking-time"),0),
    speed_index_ms:round(num(lhr,"speed-index"),0),
    total_byte_weight:round(num(lhr,"total-byte-weight"),0),
    server_response_ms:round(num(lhr,"server-response-time"),0),
    gtm_requests:countRequests(lhr,"googletagmanager.com/gtm.js"),
    gtag_requests:countRequests(lhr,"googletagmanager.com/gtag/js"),
    bootup:audit(lhr,"bootup-time"),
    main_thread:audit(lhr,"mainthread-work-breakdown"),
    unused_js:audit(lhr,"unused-javascript"),
    lcp_breakdown:audit(lhr,"lcp-breakdown-insight")
  };
  rows.push(row);
  console.log(`run=${i} state=PASS score=${row.performance_score} FCP=${row.fcp_ms} LCP=${row.lcp_ms} CLS=${row.cls} TBT=${row.tbt_ms} bytes=${row.total_byte_weight} gtm=${row.gtm_requests} gtag=${row.gtag_requests}`);
}

const pass=rows.filter(r=>r.state==="PASS");
const medians={
  runs:pass.length,
  performance_score:median(pass.map(r=>r.performance_score)),
  fcp_ms:median(pass.map(r=>r.fcp_ms)),
  lcp_ms:median(pass.map(r=>r.lcp_ms)),
  cls:median(pass.map(r=>r.cls)),
  tbt_ms:median(pass.map(r=>r.tbt_ms)),
  speed_index_ms:median(pass.map(r=>r.speed_index_ms)),
  total_byte_weight:median(pass.map(r=>r.total_byte_weight)),
  server_response_ms:median(pass.map(r=>r.server_response_ms)),
  gtm_requests:median(pass.map(r=>r.gtm_requests)),
  gtag_requests:median(pass.map(r=>r.gtag_requests))
};

const controls={
  restored_clean_2026_09_21:{lcp_ms:3676,performance_score:74,total_byte_weight:1061852},
  slice01_compact_2026_09_21:{lcp_ms:3947,performance_score:70,total_byte_weight:1062054}
};
const deltas={};
for(const [name,c] of Object.entries(controls)){
  deltas[name]={
    lcp_ms:medians.lcp_ms-c.lcp_ms,
    lcp_percent:round((medians.lcp_ms-c.lcp_ms)/c.lcp_ms*100,2),
    performance_score:medians.performance_score-c.performance_score,
    total_byte_weight:medians.total_byte_weight-c.total_byte_weight
  };
}

const rep=pass.length?[...pass].sort((a,b)=>Math.abs(a.lcp_ms-medians.lcp_ms)-Math.abs(b.lcp_ms-medians.lcp_ms))[0]:null;
fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({
  task:"MNT-M5-10",slice:"ELO_LATE_GTM_BOOTSTRAP_SLICE_07",runtime_sha:SHA,
  methodology:"Lighthouse 13.5.0 mobile 393x852 dpr2.75 simulated throttling 5 runs medians",
  rows,medians,controls,deltas,representative:rep
},null,2));

console.log("MNT-M5-10 ELO LATE GTM PRODUCTION 5-RUN");
console.log("runtime_sha="+SHA);
console.log("MEDIANS "+JSON.stringify(medians));
console.log("CONTROLS "+JSON.stringify(controls));
console.log("DELTAS "+JSON.stringify(deltas));
console.log("TARGET "+(medians.lcp_ms<=2500?"PASS":"FAIL"));
if(rep){
  console.log("REPRESENTATIVE_RUN "+rep.run);
  console.log("REP_BOOTUP "+JSON.stringify(rep.bootup).slice(0,9000));
  console.log("REP_MAIN_THREAD "+JSON.stringify(rep.main_thread).slice(0,6000));
  console.log("REP_UNUSED_JS "+JSON.stringify(rep.unused_js).slice(0,9000));
  console.log("REP_LCP_BREAKDOWN "+JSON.stringify(rep.lcp_breakdown).slice(0,6000));
}
