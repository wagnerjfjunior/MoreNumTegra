import { spawnSync } from "node:child_process";
import fs from "node:fs";

const url="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const runtimeSha="c6ae6922263b045ac1bc62be9db0d2ab2b9cfb0c";
const out="m5-10-elo-hero-original-lcp5";
fs.mkdirSync(out,{recursive:true});

function auditValue(lhr,id){const a=lhr.audits?.[id];return a&&Number.isFinite(a.numericValue)?a.numericValue:null}
function round(v,d=0){return Number.isFinite(v)?Number(v.toFixed(d)):null}
function median(values){const xs=values.filter(Number.isFinite).sort((a,b)=>a-b);return xs.length?xs[Math.floor(xs.length/2)]:null}

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
    bytes:round(auditValue(lhr,"total-byte-weight"))
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
  variant:"original-source Green WebP",
  hero_bytes:185446,
  runtime_sha:runtimeSha,
  url,
  methodology:"Lighthouse 13.5.0 mobile 393x852 simulated throttling; 5 runs; median",
  runs,medians,
  compact_reference:{
    hero_bytes:160918,
    runtime_sha:"df7bfdb07293ed6951024c59ecc3430c76172a57",
    lcp_ms:3947,
    bytes:1062054,
    score:70
  },
  delta_vs_compact:{
    hero_bytes:185446-160918,
    hero_percent:round(((185446-160918)/160918)*100,1),
    lcp_ms:medians.lcp_ms-3947,
    lcp_percent:round(((medians.lcp_ms-3947)/3947)*100,1),
    bytes:medians.bytes-1062054,
    bytes_percent:round(((medians.bytes-1062054)/1062054)*100,1),
    score:medians.score-70
  }
};
fs.writeFileSync(`${out}/summary.json`,JSON.stringify(summary,null,2)+"\n");
console.log(JSON.stringify(summary,null,2));
if(pass.length!==5)process.exit(1);
