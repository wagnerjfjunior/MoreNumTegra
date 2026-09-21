import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const RUNTIME_SHA="c4e0ef29449e4efce0ec1be3df64b6d9d1e9c427";
const PAIRS=5;
const OUT="m5-10-elo-gtm-block-paired";
fs.mkdirSync(OUT,{recursive:true});

function round(v,d=2){return Number.isFinite(v)?Number(v.toFixed(d)):null}
function num(lhr,id){const a=lhr.audits?.[id];return a&&Number.isFinite(a.numericValue)?a.numericValue:null}
function median(v){const n=v.filter(Number.isFinite).sort((a,b)=>a-b);return n.length?n[Math.floor(n.length/2)]:null}
function audit(lhr,id){
  const a=lhr.audits?.[id];
  if(!a)return null;
  return {score:a.score,displayValue:a.displayValue||null,numericValue:Number.isFinite(a.numericValue)?round(a.numericValue,0):null,details:a.details||null};
}
function gtmNetworkCount(lhr){
  const items=lhr.audits?.["network-requests"]?.details?.items||[];
  return items.filter(x=>String(x.url||"").includes("googletagmanager.com")).length;
}
function run(mode,pair,ordinal){
  const file=path.join(OUT,`${mode}-pair-${pair}.json`);
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
  if(mode==="blocked") args.push("--blocked-url-patterns=*googletagmanager.com/*");
  const p=spawnSync("./node_modules/.bin/lighthouse",args,{encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout:180000});
  if(p.status!==0||!fs.existsSync(file)){
    return {mode,pair,ordinal,state:"FAIL",exit_code:p.status,stderr:String(p.stderr||"").slice(-3000)};
  }
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  return {
    mode,pair,ordinal,state:"PASS",
    performance_score:round((lhr.categories?.performance?.score??0)*100,0),
    fcp_ms:round(num(lhr,"first-contentful-paint"),0),
    lcp_ms:round(num(lhr,"largest-contentful-paint"),0),
    cls:round(num(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(num(lhr,"total-blocking-time"),0),
    speed_index_ms:round(num(lhr,"speed-index"),0),
    total_byte_weight:round(num(lhr,"total-byte-weight"),0),
    server_response_ms:round(num(lhr,"server-response-time"),0),
    gtm_network_count:gtmNetworkCount(lhr),
    main_thread:audit(lhr,"mainthread-work-breakdown"),
    bootup:audit(lhr,"bootup-time"),
    unused_js:audit(lhr,"unused-javascript"),
    lcp_breakdown:audit(lhr,"lcp-breakdown-insight")
  };
}

const rows=[];
let ordinal=0;
for(let pair=1;pair<=PAIRS;pair++){
  const order=pair%2===1?["normal","blocked"]:["blocked","normal"];
  for(const mode of order){
    ordinal++;
    const row=run(mode,pair,ordinal);
    rows.push(row);
    console.log(`pair=${pair} ordinal=${ordinal} mode=${mode} state=${row.state} score=${row.performance_score??"NA"} FCP=${row.fcp_ms??"NA"} LCP=${row.lcp_ms??"NA"} CLS=${row.cls??"NA"} TBT=${row.tbt_ms??"NA"} bytes=${row.total_byte_weight??"NA"} gtm_requests=${row.gtm_network_count??"NA"}`);
  }
}

function summarize(mode){
  const pass=rows.filter(r=>r.mode===mode&&r.state==="PASS");
  return {
    runs:pass.length,
    performance_score:median(pass.map(r=>r.performance_score)),
    fcp_ms:median(pass.map(r=>r.fcp_ms)),
    lcp_ms:median(pass.map(r=>r.lcp_ms)),
    cls:median(pass.map(r=>r.cls)),
    tbt_ms:median(pass.map(r=>r.tbt_ms)),
    speed_index_ms:median(pass.map(r=>r.speed_index_ms)),
    total_byte_weight:median(pass.map(r=>r.total_byte_weight)),
    server_response_ms:median(pass.map(r=>r.server_response_ms)),
    gtm_network_count:median(pass.map(r=>r.gtm_network_count))
  };
}
const normal=summarize("normal");
const blocked=summarize("blocked");
const delta={
  lcp_ms:blocked.lcp_ms-normal.lcp_ms,
  lcp_percent:round((blocked.lcp_ms-normal.lcp_ms)/normal.lcp_ms*100,2),
  fcp_ms:blocked.fcp_ms-normal.fcp_ms,
  tbt_ms:blocked.tbt_ms-normal.tbt_ms,
  performance_score:blocked.performance_score-normal.performance_score,
  total_byte_weight:blocked.total_byte_weight-normal.total_byte_weight
};
const repNormal=rows.filter(r=>r.mode==="normal"&&r.state==="PASS").sort((a,b)=>Math.abs(a.lcp_ms-normal.lcp_ms)-Math.abs(b.lcp_ms-normal.lcp_ms))[0]||null;
const repBlocked=rows.filter(r=>r.mode==="blocked"&&r.state==="PASS").sort((a,b)=>Math.abs(a.lcp_ms-blocked.lcp_ms)-Math.abs(b.lcp_ms-blocked.lcp_ms))[0]||null;
const out={task:"MNT-M5-10",experiment:"GTAG_GTM_BLOCK_PAIRED_LAB",runtime_sha:RUNTIME_SHA,methodology:"5 paired Lighthouse 13.5.0 mobile runs; alternating normal/blocked order; blocked mode blocks *googletagmanager.com/* only in lab",rows,normal,blocked,delta,representative:{normal:repNormal,blocked:repBlocked}};
fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(out,null,2));

console.log("MNT-M5-10 ELO GTM BLOCK PAIRED");
console.log("runtime_sha="+RUNTIME_SHA);
console.log("NORMAL_MEDIAN "+JSON.stringify(normal));
console.log("BLOCKED_MEDIAN "+JSON.stringify(blocked));
console.log("DELTA_BLOCKED_MINUS_NORMAL "+JSON.stringify(delta));
console.log("TARGET_NORMAL "+(normal.lcp_ms<=2500?"PASS":"FAIL"));
console.log("TARGET_BLOCKED "+(blocked.lcp_ms<=2500?"PASS":"FAIL"));
if(repNormal){
  console.log("REP_NORMAL pair="+repNormal.pair+" ordinal="+repNormal.ordinal);
  console.log("REP_NORMAL_BOOTUP "+JSON.stringify(repNormal.bootup).slice(0,9000));
  console.log("REP_NORMAL_MAIN_THREAD "+JSON.stringify(repNormal.main_thread).slice(0,6000));
  console.log("REP_NORMAL_UNUSED_JS "+JSON.stringify(repNormal.unused_js).slice(0,9000));
  console.log("REP_NORMAL_LCP_BREAKDOWN "+JSON.stringify(repNormal.lcp_breakdown).slice(0,6000));
}
if(repBlocked){
  console.log("REP_BLOCKED pair="+repBlocked.pair+" ordinal="+repBlocked.ordinal);
  console.log("REP_BLOCKED_BOOTUP "+JSON.stringify(repBlocked.bootup).slice(0,9000));
  console.log("REP_BLOCKED_MAIN_THREAD "+JSON.stringify(repBlocked.main_thread).slice(0,6000));
  console.log("REP_BLOCKED_UNUSED_JS "+JSON.stringify(repBlocked.unused_js).slice(0,9000));
  console.log("REP_BLOCKED_LCP_BREAKDOWN "+JSON.stringify(repBlocked.lcp_breakdown).slice(0,6000));
}

// trigger after workflow registration
