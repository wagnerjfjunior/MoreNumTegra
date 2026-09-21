import { spawnSync } from "node:child_process";
import fs from "node:fs";

const url="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const runtimeSha="a43431ce65468a70a06844452fc17589fb49c68d";
const out="m5-10-elo-post-green-lcp";
fs.mkdirSync(out,{recursive:true});

function auditValue(lhr,id){
  const a=lhr.audits?.[id];
  return a&&Number.isFinite(a.numericValue)?a.numericValue:null;
}
function round(v,d=0){return Number.isFinite(v)?Number(v.toFixed(d)):null}
function median(values){
  const xs=values.filter(Number.isFinite).sort((a,b)=>a-b);
  return xs.length?xs[Math.floor(xs.length/2)]:null;
}
function lcpElement(lhr){
  const a=lhr.audits?.["largest-contentful-paint-element"]||lhr.audits?.["lcp-discovery-insight"];
  const items=a?.details?.items;
  if(!Array.isArray(items)||!items.length)return null;
  const item=items[0];
  const node=item?.node||item?.items?.[0]?.node||null;
  return String(node?.nodeLabel||node?.snippet||item?.nodeLabel||"").slice(0,700)||null;
}
function imageInsight(lhr){
  const a=lhr.audits?.["image-delivery-insight"];
  return {
    score:a?.score??null,
    displayValue:a?.displayValue??null,
    savingsBytes:a?.details?.overallSavingsBytes??null,
    savingsMs:a?.details?.overallSavingsMs??null
  };
}

const runs=[];
for(let i=1;i<=3;i++){
  const file=`${out}/elo-run-${i}.json`;
  const args=[
    url,
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
  const p=spawnSync("./node_modules/.bin/lighthouse",args,{encoding:"utf8",timeout:180000});
  if(p.status!==0||!fs.existsSync(file)){
    runs.push({run:i,state:"FAIL",exit_code:p.status,stderr:String(p.stderr||"").slice(-2000)});
    continue;
  }
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  runs.push({
    run:i,
    state:"PASS",
    score:round((lhr.categories?.performance?.score??0)*100),
    fcp_ms:round(auditValue(lhr,"first-contentful-paint")),
    lcp_ms:round(auditValue(lhr,"largest-contentful-paint")),
    cls:round(auditValue(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(auditValue(lhr,"total-blocking-time")),
    bytes:round(auditValue(lhr,"total-byte-weight")),
    lcp_element:lcpElement(lhr),
    image_delivery:imageInsight(lhr),
    fetch_time:lhr.fetchTime||null
  });
}
const pass=runs.filter(x=>x.state==="PASS");
const summary={
  runtime_sha:runtimeSha,
  url,
  methodology:"Lighthouse 13.5.0 mobile 393x852 simulated throttling; 3 runs; median",
  runs,
  medians:{
    score:median(pass.map(x=>x.score)),
    fcp_ms:median(pass.map(x=>x.fcp_ms)),
    lcp_ms:median(pass.map(x=>x.lcp_ms)),
    cls:median(pass.map(x=>x.cls)),
    tbt_ms:median(pass.map(x=>x.tbt_ms)),
    bytes:median(pass.map(x=>x.bytes))
  },
  baseline:{
    runtime_sha:"6aec388443410a2bff4d7c7a8ddff9d90224d8c9",
    lcp_ms:8234,
    runs_ms:[8234,8022,8254]
  }
};
summary.delta={
  lcp_ms:summary.medians.lcp_ms-summary.baseline.lcp_ms,
  lcp_percent:round(((summary.medians.lcp_ms-summary.baseline.lcp_ms)/summary.baseline.lcp_ms)*100,1)
};
fs.writeFileSync(`${out}/summary.json`,JSON.stringify(summary,null,2)+"\n");
console.log(JSON.stringify(summary,null,2));
if(pass.length!==3)process.exit(1);
