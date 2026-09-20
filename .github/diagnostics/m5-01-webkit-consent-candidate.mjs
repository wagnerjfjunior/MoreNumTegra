import { webkit } from "playwright";
import fs from "node:fs";

const BASE="http://127.0.0.1:4173";
const routes=["/src-greenn/preview/index.html","/src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html"];
const rows=[];
function add(route,choice,iteration,result,evidence){const r={route,choice,iteration,result,evidence};rows.push(r);console.log(JSON.stringify(r));}
function ok(v,m){if(!v)throw new Error(m)}

const browser=await webkit.launch({headless:true});
for(const route of routes){
  for(const choice of ["accept","reject"]){
    for(let i=1;i<=8;i++){
      const c=await browser.newContext({viewport:{width:393,height:852},locale:"pt-BR"});
      const p=await c.newPage();
      try{
        await p.goto(BASE+route,{waitUntil:"domcontentloaded",timeout:30000});
        await p.evaluate(()=>{try{localStorage.removeItem("mnt.consent.v1")}catch{}});
        await p.reload({waitUntil:"domcontentloaded"});
        await p.waitForSelector("[data-mnt-consent]:not([hidden])",{timeout:12000});
        const sel=choice==="accept"?"[data-consent-accept]":"[data-consent-reject]";
        await p.locator(sel).focus();
        await p.keyboard.press("Enter");
        await p.waitForTimeout(250);
        const s=await p.evaluate(()=>({
          hidden:document.querySelector("[data-mnt-consent]")?.hidden,
          stored:localStorage.getItem("mnt.consent.v1"),
          hiddenFocus:!!document.activeElement?.closest?.("[data-mnt-consent][hidden]"),
          active:(document.activeElement?.getAttribute?.("aria-label")||document.activeElement?.textContent||document.activeElement?.tagName||"").trim().replace(/\s+/g," ").slice(0,120)
        }));
        ok(s.hidden===true,`banner not hidden ${JSON.stringify(s)}`);
        ok(s.stored===(choice==="accept"?"granted":"denied"),`storage mismatch ${JSON.stringify(s)}`);
        ok(!s.hiddenFocus,`focus remained in hidden banner ${JSON.stringify(s)}`);
        add(route,choice,i,"PASS",JSON.stringify(s));
      }catch(e){add(route,choice,i,"FAIL",String(e))}
      await c.close();
    }
  }
}
await browser.close();

const source=fs.readFileSync("candidate/src-greenn/preview/runtime.js","utf8");
ok(source.includes("transferFocus();")&&source.includes("if (banner.contains(document.activeElement)) transferFocus();"),"synchronous + rAF focus contract missing");

const fail=rows.filter(x=>x.result==="FAIL").length;
const summary={total:rows.length,pass:rows.length-fail,fail,rows};
fs.writeFileSync("m5-01-webkit-consent-candidate.json",JSON.stringify(summary,null,2)+"\n");
console.log("TARGETED_SUMMARY",JSON.stringify({total:summary.total,pass:summary.pass,fail:summary.fail}));
if(fail) process.exit(1);
