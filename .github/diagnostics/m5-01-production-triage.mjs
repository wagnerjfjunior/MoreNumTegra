import { chromium, firefox, webkit } from "playwright";
import axe from "axe-core";
import fs from "node:fs";

const BASE="https://www.moretegra.com.br";
const RUNTIME="16515a8c69e30dd97e04e092ded3077ea396319f";
const routes={
  home:"/",
  capi:"/empreendimentos/capiitolo-piero-lissoni/",
  elo:"/empreendimentos/caminhos-da-lapa-elo-duo/",
  aria:"/empreendimentos/aria-higienopolis/"
};
const rows=[];
function add(test,result,evidence,extra={}){const r={test,result,evidence,runtime:RUNTIME,...extra};rows.push(r);console.log(JSON.stringify(r));}
function ok(v,m){if(!v)throw new Error(m)}
const U=p=>new URL(p,BASE).toString();

async function ctx(browser,{viewport={width:393,height:852},reducedMotion}={}){
  const c=await browser.newContext({viewport,locale:"pt-BR",reducedMotion});
  await c.addInitScript(()=>{try{localStorage.setItem("mnt.consent.v1","granted")}catch{}});
  return c;
}
async function go(page,route,ready="body"){
  const r=await page.goto(U(route),{waitUntil:"domcontentloaded",timeout:30000});
  ok(r?.ok(),`HTTP ${r?.status()}`);
  await page.waitForSelector(ready,{state:"attached",timeout:20000});
  await page.waitForTimeout(500);
}
async function axeDetail(browser,route,ready){
  const c=await ctx(browser),p=await c.newPage();
  try{
    await go(p,route,ready);
    await p.addScriptTag({content:axe.source});
    const a=await p.evaluate(async()=>await axe.run(document,{
      runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa","wcag22aa"]},
      resultTypes:["violations"]
    }));
    const severe=a.violations.filter(v=>["critical","serious"].includes(v.impact)).map(v=>({
      id:v.id,impact:v.impact,help:v.help,
      nodes:v.nodes.map(n=>({target:n.target,html:n.html,failureSummary:n.failureSummary,any:n.any?.map(x=>x.message),all:n.all?.map(x=>x.message),none:n.none?.map(x=>x.message)}))
    }));
    add(`AXE_DETAIL ${route}`,severe.length?"FINDING":"PASS",JSON.stringify(severe),{route,browser:"chromium"});
  }catch(e){add(`AXE_DETAIL ${route}`,"HARNESS_ERROR",String(e),{route,browser:"chromium"});}
  await c.close();
}
async function f03(browser,name){
  const c=await ctx(browser),p=await c.newPage();
  try{
    await go(p,routes.home,"[data-status-mobile]");
    const init=await p.locator("[data-filter-status]").evaluateAll(xs=>xs.map(x=>[x.dataset.filterStatus,x.getAttribute("aria-pressed")]));
    ok(init.filter(x=>x[1]==="true").length===1,`initial ${JSON.stringify(init)}`);
    await p.locator("[data-status-mobile]").selectOption("construcao");
    await p.waitForTimeout(100);
    const state=await p.locator("[data-filter-status]").evaluateAll(xs=>xs.map(x=>[x.dataset.filterStatus,x.getAttribute("aria-pressed"),x.classList.contains("is-active")]));
    const hit=state.find(x=>x[0]==="construcao");
    ok(hit?.[1]==="true"&&hit?.[2]===true,`after mobile select ${JSON.stringify(state)}`);
    add("F03_MOBILE_SYNC","PASS",JSON.stringify(state),{route:routes.home,browser:name});
  }catch(e){add("F03_MOBILE_SYNC","FAIL",String(e),{route:routes.home,browser:name});}
  await c.close();
}
async function focusSequence(browser,name,route,ready,max=180){
  const c=await ctx(browser),p=await c.newPage();
  try{
    await go(p,route,ready);
    await p.evaluate(()=>scrollTo(0,0));
    const seq=[]; let reached=false;
    for(let i=0;i<max;i++){
      await p.keyboard.press("Tab");
      const s=await p.evaluate(()=>{
        const e=document.activeElement;
        return {tag:e?.tagName||"",id:e?.id||"",cls:String(e?.className||""),label:(e?.getAttribute?.("aria-label")||e?.textContent||"").trim().replace(/\s+/g," ").slice(0,100)};
      });
      seq.push(s);
      if(["mt-lead-intent","mt-lead-name","mt-lead-email","mt-phone-country","mt-lead-phone"].includes(s.id)){reached=true;break;}
    }
    add(`FOCUS_SEQUENCE ${route}`,reached?"PASS":"FINDING",JSON.stringify(seq),{route,browser:name,steps:seq.length});
  }catch(e){add(`FOCUS_SEQUENCE ${route}`,"HARNESS_ERROR",String(e),{route,browser:name});}
  await c.close();
}
async function consentSettle(browser,name,route){
  for(const choice of ["accept","reject"]){
    const c=await browser.newContext({viewport:{width:393,height:852},locale:"pt-BR"}),p=await c.newPage();
    try{
      await go(p,route,"body");
      await p.evaluate(()=>{try{localStorage.removeItem("mnt.consent.v1")}catch{}});
      await p.reload({waitUntil:"domcontentloaded"});
      const banner=p.locator("[data-mnt-consent]");
      const count=await banner.count();
      if(!count){
        const gtm=await p.locator('script').evaluateAll(xs=>xs.some(x=>(x.src||x.textContent||"").includes("GTM-PGCR4R47")));
        const runtime=await p.locator('script[src*="/src-greenn/preview/runtime.js"]').count();
        add(`CONSENT_PRESENCE ${route}`,"FINDING",`banner=0; GTM=${gtm}; runtime.js=${runtime}`,{route,browser:name,choice});
        await c.close(); continue;
      }
      await banner.waitFor({state:"visible",timeout:10000});
      await p.waitForTimeout(650);
      const dockSel=route===routes.home?"#mt-floating-dock":".mt-quick-actions";
      const geom=await p.evaluate(({dockSel})=>{
        const a=document.querySelector("[data-mnt-consent]")?.getBoundingClientRect(),b=document.querySelector(dockSel)?.getBoundingClientRect();
        const overlap=!!(a&&b&&a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top);
        return {a:a&&[a.left,a.top,a.right,a.bottom],b:b&&[b.left,b.top,b.right,b.bottom],overlap,offset:getComputedStyle(document.documentElement).getPropertyValue("--mt-consent-offset")};
      },{dockSel});
      ok(!geom.overlap,`overlap after settle ${JSON.stringify(geom)}`);
      const sel=choice==="accept"?"[data-consent-accept]":"[data-consent-reject]";
      await p.locator(sel).focus();
      await p.keyboard.press("Enter");
      await p.waitForTimeout(800);
      const post=await p.evaluate(()=>({hidden:document.querySelector("[data-mnt-consent]")?.hidden,stored:localStorage.getItem("mnt.consent.v1"),active:{tag:document.activeElement?.tagName,id:document.activeElement?.id,inside:!!document.activeElement?.closest?.("[data-mnt-consent]"),hiddenAncestor:!!document.activeElement?.closest?.("[data-mnt-consent][hidden]")}}));
      const exp=choice==="accept"?"granted":"denied";
      add(`CONSENT_${choice.toUpperCase()} ${route}`,post.hidden&&post.stored===exp&&!post.active.hiddenAncestor?"PASS":"FINDING",JSON.stringify({geom,post}),{route,browser:name});
    }catch(e){add(`CONSENT_${choice.toUpperCase()} ${route}`,"HARNESS_ERROR",String(e),{route,browser:name});}
    await c.close();
  }
}
async function webkitSkipAndVideo(){
  const browser=await webkit.launch({headless:true});
  {
    const c=await ctx(browser),p=await c.newPage();
    try{
      await go(p,routes.home,".mt-skip");
      await p.evaluate(()=>scrollTo(0,0));
      await p.keyboard.press("Tab");
      const before=await p.evaluate(()=>({tag:document.activeElement?.tagName,cls:document.activeElement?.className,text:document.activeElement?.textContent?.trim()}));
      await p.keyboard.press("Enter");
      await p.waitForTimeout(1000);
      const after=await p.evaluate(()=>({tag:document.activeElement?.tagName,id:document.activeElement?.id,hash:location.hash,scrollY}));
      add("WEBKIT_K01","OBSERVED",JSON.stringify({before,after}),{route:routes.home,browser:"webkit"});
    }catch(e){add("WEBKIT_K01","HARNESS_ERROR",String(e),{route:routes.home,browser:"webkit"});}
    await c.close();
  }
  {
    const c=await ctx(browser,{reducedMotion:"reduce"}),p=await c.newPage();
    try{
      await go(p,routes.home,"[data-hero-video]");
      const f=p.locator("[data-hero-video]");await f.focus();await p.keyboard.press("Enter");
      await p.waitForSelector("[data-hero-video] iframe",{state:"attached",timeout:10000});
      await p.waitForTimeout(1200);
      const s=await p.evaluate(()=>{const f=document.querySelector("[data-hero-video]"),i=f?.querySelector("iframe");return {role:f?.getAttribute("role"),tab:f?.getAttribute("tabindex"),label:f?.getAttribute("aria-label"),activeTag:document.activeElement?.tagName,activeIsIframe:document.activeElement===i,iframeTab:i?.tabIndex};});
      add("WEBKIT_F19","OBSERVED",JSON.stringify(s),{route:routes.home,browser:"webkit"});
    }catch(e){add("WEBKIT_F19","HARNESS_ERROR",String(e),{route:routes.home,browser:"webkit"});}
    await c.close();
  }
  await browser.close();
}

const chromiumBrowser=await chromium.launch({headless:true});
await f03(chromiumBrowser,"chromium");
await axeDetail(chromiumBrowser,routes.home,"[data-filter-status]");
await axeDetail(chromiumBrowser,routes.aria,"[data-aria-gallery]");
await axeDetail(chromiumBrowser,routes.capi,'[data-scene-nav] [role="tab"]');
for(const [route,ready] of [[routes.home,"[data-filter-status]"],[routes.capi,'[data-scene-nav] [role="tab"]'],[routes.aria,"[data-aria-gallery]"]]) await focusSequence(chromiumBrowser,"chromium",route,ready);
for(const route of [routes.home,routes.elo,routes.aria,routes.capi]) await consentSettle(chromiumBrowser,"chromium",route);
await chromiumBrowser.close();

const firefoxBrowser=await firefox.launch({headless:true});
await f03(firefoxBrowser,"firefox");
await consentSettle(firefoxBrowser,"firefox",routes.home);
await firefoxBrowser.close();

await webkitSkipAndVideo();
const webkitBrowser=await webkit.launch({headless:true});
await consentSettle(webkitBrowser,"webkit",routes.home);
await webkitBrowser.close();

const summary={runtime:RUNTIME,total:rows.length,pass:rows.filter(x=>x.result==="PASS").length,findings:rows.filter(x=>x.result==="FINDING").length,harness_errors:rows.filter(x=>x.result==="HARNESS_ERROR").length,rows};
fs.writeFileSync("m5-01-production-triage-results.json",JSON.stringify(summary,null,2)+"\n");
fs.writeFileSync("m5-01-production-triage-summary.txt",`RUNTIME=${RUNTIME}\nTOTAL=${summary.total}\nPASS=${summary.pass}\nFINDINGS=${summary.findings}\nHARNESS_ERRORS=${summary.harness_errors}\n`);
console.log("TRIAGE_SUMMARY",JSON.stringify({total:summary.total,pass:summary.pass,findings:summary.findings,harness_errors:summary.harness_errors}));
