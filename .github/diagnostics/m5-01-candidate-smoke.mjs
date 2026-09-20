import { chromium, webkit } from "playwright";
import axe from "axe-core";
import fs from "node:fs";

const BASE="http://127.0.0.1:4173";
const rows=[];
function add(test,result,evidence){const r={test,result,evidence};rows.push(r);console.log(JSON.stringify(r));}
function ok(v,m){if(!v)throw new Error(m)}
async function axePass(browser,path,ready){
  const c=await browser.newContext({viewport:{width:393,height:852},locale:"pt-BR"}),p=await c.newPage();
  try{
    await p.goto(BASE+path,{waitUntil:"domcontentloaded"});
    await p.waitForSelector(ready,{timeout:15000});
    await p.waitForTimeout(400);
    await p.addScriptTag({content:axe.source});
    const v=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa","wcag22aa"]},resultTypes:["violations"]});return r.violations.filter(x=>["critical","serious"].includes(x.impact)).map(x=>({id:x.id,impact:x.impact,nodes:x.nodes.map(n=>n.target)}));});
    ok(v.length===0,JSON.stringify(v));
    add("AXE "+path,"PASS","no serious/critical violations");
  }catch(e){add("AXE "+path,"FAIL",String(e));}
  await c.close();
}

const chromiumBrowser=await chromium.launch({headless:true});
await axePass(chromiumBrowser,"/src-greenn/preview/index.html","[data-filter-status]");
await axePass(chromiumBrowser,"/src-greenn/empreendimentos/aria-higienopolis/index.html","[data-aria-gallery]");
{
  const c=await chromiumBrowser.newContext({viewport:{width:393,height:852},locale:"pt-BR"}),p=await c.newPage();
  try{
    await p.goto(BASE+"/src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html",{waitUntil:"domcontentloaded"});
    await p.waitForSelector('[data-scene-nav] [role="tab"]',{timeout:15000});
    await p.waitForSelector("[data-mnt-consent]",{state:"attached",timeout:10000});
    const s=await p.evaluate(()=>{const b=document.querySelector("[data-mnt-consent]");return {className:b?.className,hidden:b?.hidden,accept:!!b?.querySelector("[data-consent-accept]"),reject:!!b?.querySelector("[data-consent-reject]"),style:!!document.getElementById("mnt-runtime-consent-style")};});
    ok(s.className.includes("mnt-runtime-consent")&&s.hidden&&s.accept&&s.reject&&s.style,JSON.stringify(s));
    add("CAPI_CONSENT_FALLBACK_LOCAL","PASS",JSON.stringify(s));
  }catch(e){add("CAPI_CONSENT_FALLBACK_LOCAL","FAIL",String(e));}
  await c.close();
}
await chromiumBrowser.close();

const wb=await webkit.launch({headless:true});
{
  const c=await wb.newContext({viewport:{width:393,height:852},locale:"pt-BR"}),p=await c.newPage();
  try{
    await p.goto(BASE+"/src-greenn/preview/index.html",{waitUntil:"domcontentloaded"});
    await p.waitForSelector(".mt-skip");
    await p.evaluate(()=>scrollTo(0,0));
    await p.keyboard.press("Tab");
    ok((await p.locator(":focus").getAttribute("class")||"").includes("mt-skip"),"first Tab not skip");
    await p.keyboard.press("Enter");
    await p.waitForTimeout(500);
    const state=await p.evaluate(()=>({id:document.activeElement?.id,scrollY}));
    ok(state.id==="conteudo",JSON.stringify(state));
    add("WEBKIT_K01_LOCAL","PASS",JSON.stringify(state));
  }catch(e){add("WEBKIT_K01_LOCAL","FAIL",String(e));}
  await c.close();
}
await wb.close();

const runtime=fs.readFileSync("candidate/src-greenn/preview/runtime.js","utf8");
ok(runtime.includes("function ensureConsentBanner()"),"ensureConsentBanner missing");
ok(runtime.includes("function releaseConsentFocus(banner)"),"releaseConsentFocus missing");
ok(runtime.includes('".mnt-contact-float"')&&runtime.includes('"#mt-floating-dock .mt-floating-lead"'),"focus targets missing");
add("CONSENT_SOURCE_CONTRACT","PASS","fallback banner + deterministic focus release present");

const fail=rows.filter(x=>x.result==="FAIL").length;
fs.writeFileSync("m5-01-candidate-smoke.json",JSON.stringify({total:rows.length,fail,rows},null,2)+"\n");
console.log("CANDIDATE_SUMMARY",JSON.stringify({total:rows.length,fail}));
if(fail) process.exit(1);
