import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const RUNTIME_SHA="a43431ce65468a70a06844452fc17589fb49c68d";
const DEPLOYMENT="dpl_5nz8h9AzHNqYAwM9aaw12xorVrUX";
const BASELINE_LCP=8234;
const OUT="m5-10-elo-slice01-performance";
const RUNS=3;
fs.mkdirSync(OUT,{recursive:true});

function auditValue(lhr,id){
 const a=lhr.audits?.[id];
 return a&&Number.isFinite(a.numericValue)?a.numericValue:null;
}
function median(values){
 const nums=values.filter(Number.isFinite).sort((a,b)=>a-b);
 if(!nums.length)return null;
 return nums[Math.floor(nums.length/2)];
}
function lcpElement(lhr){
 const ids=["largest-contentful-paint-element","lcp-discovery-insight"];
 for(const id of ids){
  const items=lhr.audits?.[id]?.details?.items;
  if(!Array.isArray(items)||!items.length)continue;
  const item=items[0],node=item?.node||item?.items?.[0]?.node||null;
  const label=node?.nodeLabel||node?.snippet||item?.nodeLabel||null;
  if(label)return String(label).slice(0,700);
 }
 return null;
}
function resourceEvidence(lhr){
 const items=lhr.audits?.["network-requests"]?.details?.items||[];
 return items.filter(x=>String(x.url||"").includes("Caminhos%20da%20lapa%20-%20Elo%20Duo"))
   .map(x=>({url:x.url,resourceType:x.resourceType,transferSize:x.transferSize,resourceSize:x.resourceSize,startTime:x.startTime,endTime:x.endTime,statusCode:x.statusCode,mimeType:x.mimeType}));
}
function imageInsight(lhr){
 const a=lhr.audits?.["image-delivery-insight"];
 return a?{score:a.score,displayValue:a.displayValue||null,savingsBytes:a.details?.overallSavingsBytes??null,items:a.details?.items||[]}:null;
}

const runs=[];
for(let i=1;i<=RUNS;i++){
 const file=path.join(OUT,"elo-run-"+i+".json");
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
  "--output-path="+file,
  "--quiet",
  "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage"
 ];
 const proc=spawnSync("./node_modules/.bin/lighthouse",args,{encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout:180000});
 if(proc.status!==0||!fs.existsSync(file)){
  runs.push({run:i,state:"FAIL",exit_code:proc.status,stderr:String(proc.stderr||"").slice(-2000)});
  continue;
 }
 const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
 runs.push({
  run:i,state:"PASS",
  performance_score:Math.round((lhr.categories?.performance?.score??0)*100),
  fcp_ms:Math.round(auditValue(lhr,"first-contentful-paint")??0),
  lcp_ms:Math.round(auditValue(lhr,"largest-contentful-paint")??0),
  cls:Number((auditValue(lhr,"cumulative-layout-shift")??0).toFixed(4)),
  tbt_ms:Math.round(auditValue(lhr,"total-blocking-time")??0),
  total_byte_weight:Math.round(auditValue(lhr,"total-byte-weight")??0),
  lcp_element:lcpElement(lhr),
  resources:resourceEvidence(lhr),
  image_delivery:imageInsight(lhr)
 });
}
const pass=runs.filter(x=>x.state==="PASS");
if(pass.length!==3) throw new Error("Expected 3 passing Lighthouse runs, got "+pass.length);
const medians={
 performance_score:median(pass.map(x=>x.performance_score)),
 fcp_ms:median(pass.map(x=>x.fcp_ms)),
 lcp_ms:median(pass.map(x=>x.lcp_ms)),
 cls:median(pass.map(x=>x.cls)),
 tbt_ms:median(pass.map(x=>x.tbt_ms)),
 total_byte_weight:median(pass.map(x=>x.total_byte_weight))
};
const delta={
 baseline_lcp_ms:BASELINE_LCP,
 candidate_lcp_ms:medians.lcp_ms,
 delta_ms:medians.lcp_ms-BASELINE_LCP,
 improvement_percent:Number(((BASELINE_LCP-medians.lcp_ms)/BASELINE_LCP*100).toFixed(1))
};
const summary={
 task:"MNT-M5-10",
 slice:"ELO_DUO_GREEN_MEDIA_SLICE_01",
 runtime_sha:RUNTIME_SHA,
 deployment:DEPLOYMENT,
 url:URL,
 methodology:"Lighthouse 13.5.0 mobile 393x852 simulated throttling; 3 runs; median",
 runs,medians,delta,
 target:{lcp_ms:2500,cls:0.1,lcp:medians.lcp_ms<=2500?"PASS":"FAIL",cls:medians.cls<=0.1?"PASS":"FAIL"}
};
fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
console.log("M5-10 ELO SLICE 01");
console.log(JSON.stringify({medians,delta,target:summary.target},null,2));
for(const r of runs) console.log(JSON.stringify({run:r.run,lcp_ms:r.lcp_ms,cls:r.cls,total_byte_weight:r.total_byte_weight,lcp_element:r.lcp_element,resources:r.resources,image_delivery_savings:r.image_delivery?.savingsBytes??null}));
