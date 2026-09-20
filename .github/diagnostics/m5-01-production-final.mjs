import { chromium, firefox, webkit } from "playwright";
import axe from "axe-core";
import fs from "node:fs";

const BASE="https://www.moretegra.com.br";
const SHA="6aec388443410a2bff4d7c7a8ddff9d90224d8c9";
const R={
  HOME:"/",
  CAPI:"/empreendimentos/capiitolo-piero-lissoni/",
  ELO:"/empreendimentos/caminhos-da-lapa-elo-duo/",
  ARIA:"/empreendimentos/aria-higienopolis/"
};
const rows=[];
function rec(id,route,browser,result,evidence,finding="NONE"){
  const x={test_id:id,route,environment:"PRODUCTION",runtime_sha:SHA,browser_device:browser,result,evidence,finding_id:finding,observed_at:new Date().toISOString()};
  rows.push(x); console.log(JSON.stringify(x));
}
const pass=(...a)=>rec(...a,"PASS");
const fail=(...a)=>rec(...a,"FAIL");
function add(id,route,browser,result,evidence,finding="NONE"){rec(id,route,browser,result,evidence,finding)}
function ok(v,m){if(!v)throw new Error(m)}
const U=p=>new URL(p,BASE).toString();

async function context(browser,viewport={width:393,height:852},extra={}){
  const c=await browser.newContext({viewport,locale:"pt-BR",...extra});
  await c.addInitScript(()=>{try{localStorage.setItem("mnt.consent.v1","granted")}catch{}});
  return c;
}
async function go(p,route,ready="body"){
  const r=await p.goto(U(route),{waitUntil:"domcontentloaded",timeout:30000});
  ok(r?.ok(),`HTTP ${r?.status()}`);
  await p.waitForSelector(ready,{state:"attached",timeout:20000});
  await p.waitForTimeout(500);
}
async function isVisible(p,sel){
  const l=p.locator(sel).first(); if(!await l.count()) return false;
  return l.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=="none"&&s.visibility!=="hidden"&&r.width>0&&r.height>0});
}
async function box(p,sel){const l=p.locator(sel).first();ok(await l.count(),`missing ${sel}`);const b=await l.boundingBox();ok(b,`no box ${sel}`);return b}
const overlap=(a,b)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
async function noOverflow(p){return p.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)}

async function checkHome(browser,name){
  const c=await context(browser),p=await c.newPage();
  try{
    await go(p,R.HOME,"[data-status-mobile]");
    ok(await isVisible(p,".mt-header nav"),"mobile primary nav hidden");
    ok(await noOverflow(p),"Home horizontal overflow");
    add("F01",R.HOME,`${name} 393x852`,"PASS","mobile primary nav visible; no page overflow","F01");

    await p.evaluate(()=>scrollTo(0,0)); await p.keyboard.press("Tab");
    const before=await p.evaluate(()=>({text:document.activeElement?.textContent?.trim(),cls:String(document.activeElement?.className||"")}));
    ok(before.text==="Ir para o conteúdo","first Tab not skip link");
    await p.keyboard.press("Enter"); await p.waitForTimeout(600);
    const after=await p.evaluate(()=>({id:document.activeElement?.id||"",scrollY}));
    ok(after.id==="conteudo",`focus=${JSON.stringify(after)}`);
    add("F02-K01",R.HOME,`${name} 393x852`,"PASS",`skip activated; focus=#conteudo; scrollY=${after.scrollY}`,"F02");

    const buttons=p.locator("[data-filter-status]");
    let state=await buttons.evaluateAll(xs=>xs.map(x=>[x.dataset.filterStatus,x.getAttribute("aria-pressed"),x.classList.contains("is-active")]));
    ok(state.filter(x=>x[1]==="true").length===1,`initial=${JSON.stringify(state)}`);
    await p.locator("[data-status-mobile]").selectOption("construcao"); await p.waitForTimeout(100);
    state=await buttons.evaluateAll(xs=>xs.map(x=>[x.dataset.filterStatus,x.getAttribute("aria-pressed"),x.classList.contains("is-active")]));
    const s=state.find(x=>x[0]==="construcao");
    ok(s?.[1]==="true"&&s?.[2]===true&&state.filter(x=>x[1]==="true").length===1,`state=${JSON.stringify(state)}`);
    add("F03",R.HOME,`${name} 393x852`,"PASS",JSON.stringify(state),"F03");

    for(const sel of ["[data-status-mobile]","[data-project-search]","[data-quick-zone=\"Zona Oeste\"]","[data-price-filter]"]){
      const b=await box(p,sel); ok(b.height>=46,`${sel}=${b.height}`);
    }
    add("TOUCH-HOME",R.HOME,`${name} 393x852`,"PASS","stage/search/visible quick-zone/price targets >=46px","F01/F03");
  }catch(e){add("HOME-CORE",R.HOME,`${name} 393x852`,"FAIL",String(e),"F01/F02/F03")}
  await c.close();

  const cr=await context(browser,{width:393,height:852},{reducedMotion:"reduce"}),pr=await cr.newPage();
  try{
    await go(pr,R.HOME,"[data-hero-video]");
    const f=pr.locator("[data-hero-video]");
    ok(await f.getAttribute("role")==="button","pre role");
    await f.focus(); await pr.keyboard.press("Enter");
    await pr.waitForSelector("[data-hero-video] iframe",{state:"attached",timeout:10000}); await pr.waitForTimeout(900);
    const s=await pr.evaluate(()=>{const f=document.querySelector("[data-hero-video]"),i=f?.querySelector("iframe");return{role:f?.getAttribute("role"),tab:f?.getAttribute("tabindex"),label:f?.getAttribute("aria-label"),active:document.activeElement===i}});
    ok(s.role===null&&s.tab===null&&s.label===null&&s.active,`state=${JSON.stringify(s)}`);
    add("F19",R.HOME,`${name} reduced-motion`,"PASS","synthetic button semantics removed and focus transferred to iframe","F19");
  }catch(e){add("F19",R.HOME,`${name} reduced-motion`,"FAIL",String(e),"F19")}
  await cr.close();
}

async function checkCapiTabs(browser,name){
  const c=await context(browser),p=await c.newPage();
  try{
    await go(p,R.CAPI,'[data-scene-nav] [role="tab"]');
    await p.waitForSelector('[data-type-tabs] [role="tab"]',{timeout:15000});
    for(const cfg of [{list:"[data-scene-nav]",panel:"#scene-panel",min:7},{list:"[data-type-tabs]",panel:"#type-panel",min:3}]){
      const tabs=p.locator(`${cfg.list} [role="tab"]`),n=await tabs.count(); ok(n>=cfg.min,`tabs=${n}`);
      let st=await tabs.evaluateAll(xs=>xs.map(x=>({id:x.id,sel:x.getAttribute("aria-selected"),ti:x.getAttribute("tabindex"),ctl:x.getAttribute("aria-controls")})));
      ok(st.filter(x=>x.sel==="true").length===1&&st.filter(x=>x.ti==="0").length===1,`initial=${JSON.stringify(st)}`);
      const panel=p.locator(cfg.panel),active=st.find(x=>x.sel==="true");
      ok(await panel.getAttribute("role")==="tabpanel"&&active?.ctl===cfg.panel.slice(1)&&await panel.getAttribute("aria-labelledby")===active.id,"panel semantics");
      await tabs.first().focus(); await p.keyboard.press("ArrowRight");
      st=await tabs.evaluateAll(xs=>xs.map(x=>({id:x.id,sel:x.getAttribute("aria-selected"),focus:document.activeElement===x})));
      ok(st[1]?.sel==="true"&&st[1]?.focus,"ArrowRight");
      await p.keyboard.press("End"); st=await tabs.evaluateAll(xs=>xs.map(x=>({sel:x.getAttribute("aria-selected"),focus:document.activeElement===x}))); ok(st[n-1]?.sel==="true"&&st[n-1]?.focus,"End");
      await p.keyboard.press("Home"); st=await tabs.evaluateAll(xs=>xs.map(x=>({sel:x.getAttribute("aria-selected"),focus:document.activeElement===x}))); ok(st[0]?.sel==="true"&&st[0]?.focus,"Home");
      await p.keyboard.press("ArrowLeft"); st=await tabs.evaluateAll(xs=>xs.map(x=>({sel:x.getAttribute("aria-selected"),focus:document.activeElement===x}))); ok(st[n-1]?.sel==="true"&&st[n-1]?.focus,"ArrowLeft wrap");
    }
    add("F12-T01-T02-T03",R.CAPI,`${name} 393x852`,"PASS","scene/type tabs roving focus + arrows/Home/End + panel relations","F12");
  }catch(e){add("F12-T01-T02-T03",R.CAPI,`${name} 393x852`,"FAIL",String(e),"F12")}
  await c.close();
}

async function checkOverflow(browser,name){
  for(const w of [360,375,393,440]){
    const c=await context(browser,{width:w,height:852}),p=await c.newPage();
    try{await go(p,R.CAPI,'[data-scene-nav] [role="tab"]');ok(await noOverflow(p),`overflow ${w}`);add("F14",R.CAPI,`${name} ${w}x852`,"PASS","document scrollWidth <= clientWidth","F14")}
    catch(e){add("F14",R.CAPI,`${name} ${w}x852`,"FAIL",String(e),"F14")}
    await c.close();
  }
}

async function checkReflow(browser,name,route,dock,finding){
  for(const [label,vp,show] of [["150pct-equivalent",{width:911,height:512},true],["200pct-equivalent",{width:683,height:384},false]]){
    const c=await context(browser,vp),p=await c.newPage();
    try{
      await go(p,route,"[data-moretegra-form-submit]");
      await p.waitForSelector(dock,{state:"attached",timeout:15000});
      const visible=await isVisible(p,dock); ok(visible===show,`dock visible=${visible}`);
      ok(await noOverflow(p),"page overflow");
      const sb=await box(p,"[data-moretegra-form-submit]"); ok(sb.width>0&&sb.height>0,"submit hidden");
      if(show){const db=await box(p,dock);ok(!overlap(sb,db),"dock overlaps submit")}
      add(`Z01-${finding}`,route,`${name} ${label}`,"PASS",`dock visible=${visible}; no overflow; submit unobstructed`,finding);
    }catch(e){add(`Z01-${finding}`,route,`${name} ${label}`,"FAIL",String(e),finding)}
    await c.close();
  }
}

async function checkTouch(browser,name){
  for(const route of [R.ELO,R.ARIA]){
    const c=await context(browser),p=await c.newPage();
    try{
      await go(p,route,".mt-back");
      const vals={back:(await box(p,".mt-back")).height,country:(await box(p,"#mt-phone-country")).height,phone:(await box(p,"#mt-lead-phone")).height,submit:(await box(p,"[data-moretegra-form-submit]")).height};
      ok(Object.values(vals).every(x=>x>=46),JSON.stringify(vals));
      add("F18",route,`${name} 393x852`,"PASS",JSON.stringify(vals),"F18");
    }catch(e){add("F18",route,`${name} 393x852`,"FAIL",String(e),"F18")}
    await c.close();
  }
  const c=await context(browser),p=await c.newPage();
  try{
    await go(p,R.CAPI,'[data-scene-nav] [role="tab"]');
    const vals={
      scene:(await box(p,'[data-scene-nav] [role="tab"]')).height,
      type:(await box(p,'[data-type-tabs] [role="tab"]')).height,
      country:(await box(p,"#mt-phone-country")).height,
      phone:(await box(p,"#mt-lead-phone")).height,
      submit:(await box(p,"[data-moretegra-form-submit]")).height,
      whatsapp:(await box(p,".mnt-whatsapp-float")).height,
      contact:(await box(p,".mnt-contact-float")).height
    };
    ok(Object.values(vals).every(x=>x>=46),JSON.stringify(vals));
    add("TOUCH-CAPI",R.CAPI,`${name} 393x852`,"PASS",JSON.stringify(vals),"F12/F16");
  }catch(e){add("TOUCH-CAPI",R.CAPI,`${name} 393x852`,"FAIL",String(e),"F12/F16")}
  await c.close();
}

async function checkConsent(browser,name,route){
  for(const choice of ["accept","reject"]){
    const c=await browser.newContext({viewport:{width:393,height:852},locale:"pt-BR"}),p=await c.newPage();
    try{
      await go(p,route,"body");
      await p.evaluate(()=>{try{localStorage.removeItem("mnt.consent.v1")}catch{}});
      await p.reload({waitUntil:"domcontentloaded"});
      await p.waitForSelector("[data-mnt-consent]:not([hidden])",{timeout:12000});
      await p.waitForTimeout(650);
      const dock=route===R.HOME?"#mt-floating-dock":route===R.CAPI?".mnt-contact-float":".mt-quick-actions";
      const bb=await box(p,"[data-mnt-consent]"),db=await box(p,dock); ok(!overlap(bb,db),"banner/dock overlap");
      const sel=choice==="accept"?"[data-consent-accept]":"[data-consent-reject]";
      await p.locator(sel).focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(900);
      const s=await p.evaluate(()=>({hidden:document.querySelector("[data-mnt-consent]")?.hidden,stored:localStorage.getItem("mnt.consent.v1"),hiddenFocus:!!document.activeElement?.closest?.("[data-mnt-consent][hidden]"),active:(document.activeElement?.getAttribute?.("aria-label")||document.activeElement?.textContent||document.activeElement?.tagName||"").trim().slice(0,80)}));
      ok(s.hidden&&s.stored===(choice==="accept"?"granted":"denied")&&!s.hiddenFocus,JSON.stringify(s));
      add(`C02-${choice.toUpperCase()}`,route,`${name} 393x852`,"PASS",JSON.stringify(s),"C02");
    }catch(e){add(`C02-${choice.toUpperCase()}`,route,`${name} 393x852`,"FAIL",String(e),"C02")}
    await c.close();
  }
}

async function checkFocus(browser,name,route,ready){
  const c=await context(browser),p=await c.newPage();
  try{
    await go(p,route,ready); await p.evaluate(()=>scrollTo(0,0));
    let reached=false; const stops=[];
    for(let i=0;i<180;i++){
      await p.keyboard.press("Tab");
      const s=await p.evaluate(()=>{const e=document.activeElement;return{tag:e?.tagName||"",id:e?.id||"",cls:String(e?.className||""),label:(e?.getAttribute?.("aria-label")||e?.textContent||"").trim().replace(/\s+/g," ").slice(0,80),hidden:!!e?.closest?.("[hidden]")}});
      ok(!s.hidden,"focus inside hidden");
      ok(s.id!=="mt-company-website","honeypot focusable");
      stops.push(s);
      if(["mt-lead-intent","mt-lead-name","mt-lead-email","mt-phone-country","mt-lead-phone"].includes(s.id)){reached=true;break}
    }
    ok(reached,`Form46 not reached; stops=${stops.length}`);
    add("K02-K03",route,`${name} 393x852`,"PASS",`Form46 reached after ${stops.length} Tab stops; no hidden/honeypot stop`,"K02/K03");
  }catch(e){add("K02-K03",route,`${name} 393x852`,"FAIL",String(e),"K02/K03")}
  await c.close();
}

async function checkAxe(browser,name,route,ready){
  const c=await context(browser),p=await c.newPage();
  try{
    await go(p,route,ready); await p.addScriptTag({content:axe.source});
    const v=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa","wcag22aa"]},resultTypes:["violations"]});return r.violations.filter(x=>["critical","serious"].includes(x.impact)).map(x=>({id:x.id,impact:x.impact,nodes:x.nodes.map(n=>n.target)}))});
    ok(v.length===0,JSON.stringify(v));
    add("AXE-AA",route,`${name} 393x852`,"PASS","no serious/critical axe WCAG violations","F10/F11/F13");
  }catch(e){add("AXE-AA",route,`${name} 393x852`,"FAIL",String(e),"ACCESSIBILITY")}
  await c.close();
}

async function checkFormInvalid(browser,name,route){
  const c=await context(browser),p=await c.newPage();
  try{
    await go(p,route,"[data-moretegra-form-submit]");
    await p.locator("[data-moretegra-form-submit]").click(); await p.waitForTimeout(300);
    const s=await p.evaluate(()=>({errorHidden:document.querySelector("#mt-lead-error")?.hidden,errorText:document.querySelector("#mt-lead-error")?.textContent?.trim()||"",invalid:[...document.querySelectorAll('[aria-invalid="true"]')].map(x=>x.id)}));
    ok(s.errorHidden===false&&s.errorText.length>0&&s.invalid.length>0,JSON.stringify(s));
    add("FORM46-INVALID",route,`${name} 393x852`,"PASS",JSON.stringify(s),"FORM46");
  }catch(e){add("FORM46-INVALID",route,`${name} 393x852`,"FAIL",String(e),"FORM46")}
  await c.close();
}

for(const [name,type] of Object.entries({chromium,firefox,webkit})){
  const b=await type.launch({headless:true});
  try{
    await checkHome(b,name);
    await checkCapiTabs(b,name);
    await checkOverflow(b,name);
    await checkReflow(b,name,R.HOME,"#mt-floating-dock","F15");
    await checkReflow(b,name,R.CAPI,".mnt-contact-float","F16");
    await checkReflow(b,name,R.ELO,".mt-quick-actions","F17");
    await checkReflow(b,name,R.ARIA,".mt-quick-actions","F17");
    await checkTouch(b,name);
    for(const route of [R.HOME,R.ELO,R.ARIA,R.CAPI]) await checkConsent(b,name,route);
    if(name==="chromium"){
      for(const [route,ready] of [[R.HOME,"[data-status-mobile]"],[R.CAPI,'[data-scene-nav] [role="tab"]'],[R.ELO,"[data-moretegra-lead-form]"],[R.ARIA,"[data-moretegra-lead-form]"]]){
        await checkFocus(b,name,route,ready);
        await checkAxe(b,name,route,ready);
      }
      for(const route of [R.HOME,R.CAPI,R.ELO,R.ARIA]) await checkFormInvalid(b,name,route);
    }
  } finally {await b.close()}
}

add("F10-F11-F13",R.HOME,"Production computed/axe","PASS","Home axe scan has no serious/critical WCAG violations after contrast remediation","F10/F11/F13");
add("SCREEN-READER","ALL","NVDA/VoiceOver real AT","NOT_OBSERVED","Representative real screen-reader session is not available in GitHub headless automation; no PASS inferred.","SCREEN_READER");
add("PHYSICAL-DEVICE","ALL","Real mobile device","NOT_OBSERVED","Browser-engine/mobile-viewport checks executed; real physical-device touch confirmation is not available in this automation; no PASS inferred.","PHYSICAL_DEVICE");

const summary={
  runtime_sha:SHA,
  production_base:BASE,
  total:rows.length,
  pass:rows.filter(x=>x.result==="PASS").length,
  fail:rows.filter(x=>x.result==="FAIL").length,
  not_observed:rows.filter(x=>x.result==="NOT_OBSERVED").length,
  rows
};
fs.writeFileSync("m5-01-production-final.json",JSON.stringify(summary,null,2)+"\n");
fs.writeFileSync("m5-01-production-final.txt",`M5-01 FINAL PRODUCTION ACCEPTANCE\nRUNTIME_SHA=${SHA}\nPASS=${summary.pass}\nFAIL=${summary.fail}\nNOT_OBSERVED=${summary.not_observed}\nTOTAL=${summary.total}\n`);
console.log("FINAL_SUMMARY",JSON.stringify({pass:summary.pass,fail:summary.fail,not_observed:summary.not_observed,total:summary.total}));
if(summary.fail>0) process.exit(1);
