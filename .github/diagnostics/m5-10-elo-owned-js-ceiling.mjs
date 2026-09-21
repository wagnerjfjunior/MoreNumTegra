import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const RUNTIME_SHA="c4e0ef29449e4efce0ec1be3df64b6d9d1e9c427";
const MODES=[
  {name:"normal",patterns:[]},
  {name:"block_runtime",patterns:["*moretegra.com.br/src-greenn/preview/runtime.js*"]},
  {name:"block_project",patterns:["*moretegra.com.br/src-greenn/project-page.js*"]},
  {name:"block_both_owned",patterns:["*moretegra.com.br/src-greenn/*.js*"]}
];
const ROUNDS=5;
const OUT="m5-10-elo-owned-js-ceiling";
fs.mkdirSync(OUT,{recursive:true});

function round(v,d=2){return Number.isFinite(v)?Number(v.toFixed(d)):null}
function num(lhr,id){const a=lhr.audits?.[id];return a&&Number.isFinite(a.numericValue)?a.numericValue:null}
function median(v){const n=v.filter(Number.isFinite).sort((a,b)=>a-b);return n.length?n[Math.floor(n.length/2)]:null}
function audit(lhr,id){
  const a=lhr.audits?.[id];
  if(!a)return null;
  return {score:a.score,displayValue:a.displayValue||null,numericValue:Number.isFinite(a.numericValue)?round(a.numericValue,0):null,details:a.details||null};
}
function countUrl(lhr,needle){
  const items=lhr.audits?.["network-requests"]?.details?.items||[];
  return items.filter(x=>String(x.url||"").includes(needle)).length;
}
function run(mode,roundNo,ordinal){
  const file=path.join(OUT,`${mode.name}-round-${roundNo}.json`);
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
  for(const pattern of mode.patterns) args.push(`--blocked-url-patterns=${pattern}`);
  const p=spawnSync("./node_modules/.bin/lighthouse",args,{encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout:180000});
  if(p.status!==0||!fs.existsSync(file)){
    return {mode:mode.name,round:roundNo,ordinal,state:"FAIL",exit_code:p.status,stderr:String(p.stderr||"").slice(-3000)};
  }
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  return {
    mode:mode.name,round:roundNo,ordinal,state:"PASS",
    performance_score:round((lhr.categories?.performance?.score??0)*100,0),
    fcp_ms:round(num(lhr,"first-contentful-paint"),0),
    lcp_ms:round(num(lhr,"largest-contentful-paint"),0),
    cls:round(num(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(num(lhr,"total-blocking-time"),0),
    speed_index_ms:round(num(lhr,"speed-index"),0),
    total_byte_weight:round(num(lhr,"total-byte-weight"),0),
    runtime_requests:countUrl(lhr,"/src-greenn/preview/runtime.js"),
    project_requests:countUrl(lhr,"/src-greenn/project-page.js"),
    main_thread:audit(lhr,"mainthread-work-breakdown"),
    bootup:audit(lhr,"bootup-time"),
    lcp_breakdown:audit(lhr,"lcp-breakdown-insight")
  };
}

const rotations=[
  ["normal","block_runtime","block_project","block_both_owned"],
  ["block_runtime","block_project","block_both_owned","normal"],
  ["block_project","block_both_owned","normal","block_runtime"],
  ["block_both_owned","normal","block_runtime","block_project"],
  ["normal","block_project","block_runtime","block_both_owned"]
];
const modeByName=Object.fromEntries(MODES.map(m=>[m.name,m]));
const rows=[];
let ordinal=0;
for(let roundNo=1;roundNo<=ROUNDS;roundNo++){
  for(const name of rotations[roundNo-1]){
    ordinal++;
    const row=run(modeByName[name],roundNo,ordinal);
    rows.push(row);
    console.log(`round=${roundNo} ordinal=${ordinal} mode=${name} state=${row.state} score=${row.performance_score??"NA"} FCP=${row.fcp_ms??"NA"} LCP=${row.lcp_ms??"NA"} CLS=${row.cls??"NA"} TBT=${row.tbt_ms??"NA"} bytes=${row.total_byte_weight??"NA"} runtime_req=${row.runtime_requests??"NA"} project_req=${row.project_requests??"NA"}`);
  }
}

function summarize(name){
  const pass=rows.filter(r=>r.mode===name&&r.state==="PASS");
  return {
    runs:pass.length,
    performance_score:median(pass.map(r=>r.performance_score)),
    fcp_ms:median(pass.map(r=>r.fcp_ms)),
    lcp_ms:median(pass.map(r=>r.lcp_ms)),
    cls:median(pass.map(r=>r.cls)),
    tbt_ms:median(pass.map(r=>r.tbt_ms)),
    speed_index_ms:median(pass.map(r=>r.speed_index_ms)),
    total_byte_weight:median(pass.map(r=>r.total_byte_weight)),
    runtime_requests:median(pass.map(r=>r.runtime_requests)),
    project_requests:median(pass.map(r=>r.project_requests))
  };
}
const summaries=Object.fromEntries(MODES.map(m=>[m.name,summarize(m.name)]));
const normal=summaries.normal;
const deltas={};
for(const name of ["block_runtime","block_project","block_both_owned"]){
  const x=summaries[name];
  deltas[name]={
    lcp_ms:x.lcp_ms-normal.lcp_ms,
    lcp_percent:round((x.lcp_ms-normal.lcp_ms)/normal.lcp_ms*100,2),
    fcp_ms:x.fcp_ms-normal.fcp_ms,
    tbt_ms:x.tbt_ms-normal.tbt_ms,
    performance_score:x.performance_score-normal.performance_score,
    total_byte_weight:x.total_byte_weight-normal.total_byte_weight
  };
}
const representatives={};
for(const mode of MODES){
  const s=summaries[mode.name];
  representatives[mode.name]=rows.filter(r=>r.mode===mode.name&&r.state==="PASS").sort((a,b)=>Math.abs(a.lcp_ms-s.lcp_ms)-Math.abs(b.lcp_ms-s.lcp_ms))[0]||null;
}
fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({task:"MNT-M5-10",experiment:"OWNED_JS_CEILING_LAB",runtime_sha:RUNTIME_SHA,methodology:"5 rounds x 4 modes, rotated order, Lighthouse 13.5.0 mobile simulated throttling",rows,summaries,deltas,representatives},null,2));

console.log("MNT-M5-10 ELO OWNED-JS CEILING");
console.log("runtime_sha="+RUNTIME_SHA);
for(const [name,s] of Object.entries(summaries)) console.log("MEDIAN "+name+" "+JSON.stringify(s));
for(const [name,d] of Object.entries(deltas)) console.log("DELTA "+name+" "+JSON.stringify(d));
for(const [name,r] of Object.entries(representatives)){
  if(!r) continue;
  console.log("REP "+name+" round="+r.round+" ordinal="+r.ordinal);
  console.log("REP_BOOTUP "+name+" "+JSON.stringify(r.bootup).slice(0,9000));
  console.log("REP_MAIN_THREAD "+name+" "+JSON.stringify(r.main_thread).slice(0,6000));
  console.log("REP_LCP_BREAKDOWN "+name+" "+JSON.stringify(r.lcp_breakdown).slice(0,6000));
}
