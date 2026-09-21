import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const RUNTIME_SHA="db8c65460743347e60e8a6f2b27765be241fac81";
const RUNS=5;
const OUT="m5-10-elo-inline-css-5run";
fs.mkdirSync(OUT,{recursive:true});
function round(v,d=2){return Number.isFinite(v)?Number(v.toFixed(d)):null}
function num(lhr,id){const a=lhr.audits?.[id];return a&&Number.isFinite(a.numericValue)?a.numericValue:null}
function median(v){const n=v.filter(Number.isFinite).sort((a,b)=>a-b);return n.length?n[Math.floor(n.length/2)]:null}
function audit(lhr,id){
  const a=lhr.audits?.[id];
  if(!a)return null;
  return {id,score:a.score,displayValue:a.displayValue||null,numericValue:Number.isFinite(a.numericValue)?round(a.numericValue,0):null,details:a.details||null};
}
const rows=[];
for(let i=1;i<=RUNS;i++){
  const file=path.join(OUT,`run-${i}.json`);
  const args=[URL,"--only-categories=performance","--form-factor=mobile","--screenEmulation.mobile=true","--screenEmulation.width=393","--screenEmulation.height=852","--screenEmulation.deviceScaleFactor=2.75","--throttling-method=simulate","--output=json",`--output-path=${file}`,"--quiet","--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage"];
  const p=spawnSync("./node_modules/.bin/lighthouse",args,{encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout:180000});
  if(p.status!==0||!fs.existsSync(file)){rows.push({run:i,state:"FAIL",exit_code:p.status,stderr:String(p.stderr||"").slice(-2000)});continue}
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  rows.push({
    run:i,state:"PASS",
    performance_score:round((lhr.categories?.performance?.score??0)*100,0),
    fcp_ms:round(num(lhr,"first-contentful-paint"),0),
    lcp_ms:round(num(lhr,"largest-contentful-paint"),0),
    cls:round(num(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(num(lhr,"total-blocking-time"),0),
    speed_index_ms:round(num(lhr,"speed-index"),0),
    total_byte_weight:round(num(lhr,"total-byte-weight"),0),
    server_response_ms:round(num(lhr,"server-response-time"),0),
    render_blocking:audit(lhr,"render-blocking-insight"),
    main_thread:audit(lhr,"mainthread-work-breakdown"),
    bootup:audit(lhr,"bootup-time"),
    unused_js:audit(lhr,"unused-javascript")
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
const control={lcp_ms:3676,performance_score:74,total_byte_weight:1061852};
const delta={
  lcp_ms:medians.lcp_ms==null?null:medians.lcp_ms-control.lcp_ms,
  lcp_percent:medians.lcp_ms==null?null:round((medians.lcp_ms-control.lcp_ms)/control.lcp_ms*100,2),
  performance_score:medians.performance_score==null?null:medians.performance_score-control.performance_score,
  total_byte_weight:medians.total_byte_weight==null?null:medians.total_byte_weight-control.total_byte_weight
};
const rep=pass.length?[...pass].sort((a,b)=>Math.abs(a.lcp_ms-medians.lcp_ms)-Math.abs(b.lcp_ms-medians.lcp_ms))[0]:null;
fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify({task:"MNT-M5-10",slice:"ELO_INLINE_CSS_SLICE_05",runtime_sha:RUNTIME_SHA,rows,medians,control,delta,representative:rep},null,2));
console.log("MNT-M5-10 ELO INLINE-CSS 5-RUN");
console.log("runtime_sha="+RUNTIME_SHA);
for(const r of rows) console.log(`run=${r.run} state=${r.state} score=${r.performance_score??"NA"} FCP=${r.fcp_ms??"NA"} LCP=${r.lcp_ms??"NA"} CLS=${r.cls??"NA"} TBT=${r.tbt_ms??"NA"} bytes=${r.total_byte_weight??"NA"}`);
console.log("MEDIANS "+JSON.stringify(medians));
console.log("CONTROL "+JSON.stringify(control));
console.log("DELTA "+JSON.stringify(delta));
console.log("TARGET "+(medians.lcp_ms!=null&&medians.lcp_ms<=2500?"PASS":"FAIL"));
if(rep){
  console.log("REPRESENTATIVE_RUN "+rep.run);
  console.log("REPRESENTATIVE_RENDER_BLOCKING "+JSON.stringify(rep.render_blocking).slice(0,5000));
  console.log("REPRESENTATIVE_MAIN_THREAD "+JSON.stringify(rep.main_thread).slice(0,5000));
  console.log("REPRESENTATIVE_BOOTUP "+JSON.stringify(rep.bootup).slice(0,8000));
  console.log("REPRESENTATIVE_UNUSED_JS "+JSON.stringify(rep.unused_js).slice(0,8000));
}
