import { spawnSync } from "node:child_process";
import fs from "node:fs";

const url="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const runtimeSha="df7bfdb07293ed6951024c59ecc3430c76172a57";
const out="m5-10-elo-hero-compact-lcp5";
fs.mkdirSync(out,{recursive:true});

function auditValue(lhr,id){const a=lhr.audits?.[id];return a&&Number.isFinite(a.numericValue)?a.numericValue:null}
function round(v,d=0){return Number.isFinite(v)?Number(v.toFixed(d)):null}
function median(values){const xs=values.filter(Number.isFinite).sort((a,b)=>a-b);return xs.length?xs[Math.floor(xs.length/2)]:null}
function lcpElement(lhr){
  const a=lhr.audits?.["largest-contentful-paint-element"]||lhr.audits?.["lcp-discovery-insight"];
  const items=a?.details?.items;
  if(!Array.isArray(items)||!items.length)return null;
  const item=items[0],node=item?.node||item?.items?.[0]?.node||null;
  return String(node?.nodeLabel||node?.snippet||item?.nodeLabel||"").slice(0,700)||null;
}
const runs=[];
for(let i=1;i<=5;i++){
  const file=`${out}/run-${i}.json`;
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
  if(p.status!==0||!fs.existsSync(file)){runs.push({run:i,state:"FAIL",exit_code:p.status,stderr:String(p.stderr||"").slice(-1500)});continue}
  const lhr=JSON.parse(fs.readFileSync(file,"utf8"));
  runs.push({
    run:i,state:"PASS",
    score:round((lhr.categories?.performance?.score??0)*100),
    fcp_ms:round(auditValue(lhr,"first-contentful-paint")),
    lcp_ms:round(auditValue(lhr,"largest-contentful-paint")),
    cls:round(auditValue(lhr,"cumulative-layout-shift"),4),
    tbt_ms:round(auditValue(lhr,"total-blocking-time")),
    bytes:round(auditValue(lhr,"total-byte-weight")),
    lcp_element:lcpElement(lhr)
  });
}
const pass=runs.filter(x=>x.state==="PASS");
const medians={
  score:median(pass.map(x=>x.score)),
  fcp_ms:median(pass.map(x=>x.fcp_ms)),
  lcp_ms:median(pass.map(x=>x.lcp_ms)),
  cls:median(pass.map(x=>x.cls)),
  tbt_ms:median(pass.map(x=>x.tbt_ms)),
  bytes:median(pass.map(x=>x.bytes))
};
const summary={
  variant:"compact-source Green WebP",
  hero_bytes:160918,
  runtime_sha:runtimeSha,
  url,
  methodology:"Lighthouse 13.5.0 mobile 393x852 simulated throttling; 5 runs; median",
  runs,medians
};
fs.writeFileSync(`${out}/summary.json`,JSON.stringify(summary,null,2)+"\n");
console.log(JSON.stringify(summary,null,2));
if(pass.length!==5)process.exit(1);
