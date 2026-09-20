import { chromium, firefox, webkit } from "playwright";
import axe from "axe-core";
import fs from "node:fs";

const BASE = process.env.BASE_URL || "https://www.moretegra.com.br";
const EXPECTED_RUNTIME_SHA = process.env.EXPECTED_RUNTIME_SHA || "UNKNOWN";
const ROUTES = {
  HOME: "/",
  CAPIITOLO: "/empreendimentos/capiitolo-piero-lissoni/",
  ELO_DUO: "/empreendimentos/caminhos-da-lapa-elo-duo/",
  ARIA: "/empreendimentos/aria-higienopolis/"
};
const results = [];
const engines = { chromium, firefox, webkit };

function now(){ return new Date().toISOString(); }
function rec({id, route, browser="source", result, evidence, finding="NONE"}) {
  const row = {test_id:id, route, environment:"PRODUCTION", runtime_sha:EXPECTED_RUNTIME_SHA, browser_device:browser, result, evidence, finding_id:finding, observed_at:now()};
  results.push(row);
  console.log(`${result} | ${id} | ${route} | ${browser} | ${finding} | ${evidence}`);
}
function pass(id, route, browser, evidence, finding="NONE"){ rec({id,route,browser,result:"PASS",evidence,finding}); }
function fail(id, route, browser, evidence, finding="NONE"){ rec({id,route,browser,result:"FAIL",evidence,finding}); }
function note(id, route, browser, evidence, finding="NONE"){ rec({id,route,browser,result:"NOT_OBSERVED",evidence,finding}); }
function assert(cond,msg){ if(!cond) throw new Error(msg); }
function url(route){ return new URL(route, BASE).toString(); }
async function fetchText(path){
  const r=await fetch(url(path),{redirect:"follow",headers:{"cache-control":"no-cache"}});
  if(!r.ok) throw new Error(`${path} HTTP ${r.status}`);
  return await r.text();
}
function hexRgb(hex){ const h=hex.replace("#",""); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
function lum([r,g,b]){ return [r,g,b].map(v=>{v/=255; return v<=.03928?v/12.92:((v+.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0); }
function contrast(a,b){ const A=lum(hexRgb(a)),B=lum(hexRgb(b)); return (Math.max(A,B)+.05)/(Math.min(A,B)+.05); }

async function sourceAcceptance(){
  try{
    const [html,js,css,projectCss,capi,runtime]=await Promise.all([
      fetchText("/"),
      fetchText("/src-greenn/moretegra.js"),
      fetchText("/src-greenn/moretegra.css"),
      fetchText("/src-greenn/project-page.css"),
      fetchText("/experiments/capiitolo-editorial-v3/index.html"),
      fetchText("/src-greenn/preview/runtime.js")
    ]);
    const markers = [
      ["SRC-F01-F02", html.includes('class="mt-skip" href="#conteudo"') && css.includes("@media(max-width:759px)") && css.includes(".mt-header nav"), "Home skip/mobile navigation source markers", "F01/F02"],
      ["SRC-F03", js.includes('button.setAttribute("aria-pressed", active ? "true" : "false")'), "Home stage aria-pressed synchronization marker", "F03"],
      ["SRC-F15", css.includes("@media(max-height:400px){#mt-floating-dock{display:none}}"), "Home short-reflow dock guard", "F15"],
      ["SRC-F17-F18", projectCss.includes("@media(max-height:400px){body .mt-quick-actions{display:none}}") && projectCss.includes(".mt-back{display:inline-flex;align-items:center;min-height:46px"), "Shared exact-project reflow/touch-target source", "F17/F18"],
      ["SRC-F12-F14", capi.includes('role="tabpanel"') && capi.includes("function bindTabKeyboard") && capi.includes(".navin>*{min-width:0}") && capi.includes("font-size:clamp(2.55rem,13vw,5.4rem)"), "CAPIITOLO tab keyboard + mobile overflow source", "F12/F14"],
      ["SRC-F16", runtime.includes("@media(max-height:400px){.mnt-whatsapp-float,.mnt-contact-float{display:none}}"), "CAPIITOLO short-reflow floating guard", "F16"],
      ["SRC-F19", js.includes('frame.removeAttribute("role")') && js.includes("window.requestAnimationFrame(() => iframe.focus())"), "Home reduced-motion semantic cleanup/focus source", "F19"]
    ];
    for(const [id,ok,evidence,finding] of markers) ok?pass(id,"/", "HTTP/source", evidence,finding):fail(id,"/","HTTP/source",`missing: ${evidence}`,finding);

    const contrastRows=[
      ["F10-launch","#171813","#a97a00"],
      ["F10-build","#171813","#d96322"],
      ["F10-ready","#ffffff","#15864f"],
      ["F11-footer-secondary","#5f5b54","#ddd8cd"],
      ["F11-footer-strong","#555149","#ddd8cd"],
      ["F13-eyebrow","#80600e","#f4f1e9"],
      ["F13-zone-helper","#80600e","#ece8df"]
    ];
    for(const [id,fg,bg] of contrastRows){
      const ratio=contrast(fg,bg);
      ratio>=4.5?pass(id,"/","static contrast",`${fg} on ${bg} = ${ratio.toFixed(2)}:1`,id.split("-")[0]):fail(id,"/","static contrast",`${fg} on ${bg} = ${ratio.toFixed(2)}:1 (<4.50)`,id.split("-")[0]);
    }
  }catch(e){ fail("SRC-BASELINE","/","HTTP/source",String(e),"MULTI"); }
}

async function newContext(browser, viewport={width:393,height:852}, extra={}){
  const context=await browser.newContext({viewport,locale:"pt-BR",...extra});
  await context.addInitScript(() => {
    try { localStorage.setItem("mnt.consent.v1","granted"); } catch {}
  });
  return context;
}
async function goto(page,route,selector="body"){
  const response=await page.goto(url(route),{waitUntil:"domcontentloaded",timeout:30000});
  assert(response && response.ok(), `HTTP navigation failed: ${response?.status()}`);
  await page.waitForSelector(selector,{state:"attached",timeout:20000});
  await page.waitForTimeout(350);
}
async function visible(page,sel){
  const loc=page.locator(sel).first();
  if(await loc.count()===0) return false;
  return await loc.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=="none"&&s.visibility!=="hidden"&&r.width>0&&r.height>0;});
}
async function noOverflow(page){
  return await page.evaluate(()=>document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
}
async function rect(page,sel){
  const loc=page.locator(sel).first(); assert(await loc.count()>0,`missing ${sel}`);
  const r=await loc.boundingBox(); assert(r,`no box for ${sel}`); return r;
}
function overlaps(a,b){ return a.x < b.x+b.width && a.x+a.width > b.x && a.y < b.y+b.height && a.y+a.height > b.y; }

async function testHomeCore(browser,name){
  let context=await newContext(browser,{width:393,height:852});
  let page=await context.newPage();
  try{
    await goto(page,ROUTES.HOME,"[data-filter-status]");
    const navVisible=await visible(page,'.mt-header nav');
    const ov=await noOverflow(page);
    assert(navVisible,"mobile primary nav hidden");
    assert(ov,"page-level horizontal overflow");
    pass("F01-MOBILE-NAV",ROUTES.HOME,`${name} 393x852`,"primary nav visible; no page-level horizontal overflow","F01");

    await page.evaluate(()=>window.scrollTo(0,0));
    await page.keyboard.press("Tab");
    const first=await page.evaluate(()=>({text:document.activeElement?.textContent?.trim(),cls:document.activeElement?.className}));
    assert(first.text==="Ir para o conteúdo","first Tab did not focus skip link");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    const activeId=await page.evaluate(()=>document.activeElement?.id||"");
    assert(activeId==="conteudo",`skip activation focus=${activeId}`);
    pass("K01-SKIP",ROUTES.HOME,`${name} 393x852`,"first Tab focuses skip link; Enter transfers DOM focus to #conteudo","F02");

    const buttons=page.locator("[data-filter-status]");
    const count=await buttons.count(); assert(count>=4,`status buttons=${count}`);
    let pressed=await buttons.evaluateAll(xs=>xs.map(x=>x.getAttribute("aria-pressed")));
    assert(pressed.filter(x=>x==="true").length===1,`initial aria-pressed=${JSON.stringify(pressed)}`);
    await page.locator('[data-filter-status="construcao"]').click();
    pressed=await buttons.evaluateAll(xs=>xs.map(x=>({v:x.getAttribute("data-filter-status"),p:x.getAttribute("aria-pressed"),active:x.classList.contains("is-active")})));
    const c=pressed.find(x=>x.v==="construcao");
    assert(c?.p==="true" && c?.active===true,`construction state=${JSON.stringify(c)}`);
    assert(pressed.filter(x=>x.p==="true").length===1,"multiple aria-pressed true");
    pass("F03-STAGE-STATE",ROUTES.HOME,`${name} 393x852`,"aria-pressed initialized and synchronized after stage selection","F03");

    const targets=["[data-status-mobile]","[data-project-search]","[data-zone-filter]","[data-price-filter]"];
    for(const sel of targets){
      const r=await rect(page,sel); assert(r.height>=46,`${sel} height=${r.height}`);
    }
    pass("TOUCH-HOME-FILTERS",ROUTES.HOME,`${name} 393x852`,"mobile stage/search/zone/price controls each >=46px high","F01/F03");
  }catch(e){ fail("HOME-CORE",ROUTES.HOME,`${name} 393x852`,String(e),"F01/F02/F03"); }
  await context.close();

  context=await browser.newContext({viewport:{width:393,height:852},locale:"pt-BR",reducedMotion:"reduce"});
  await context.addInitScript(()=>{try{localStorage.setItem("mnt.consent.v1","granted")}catch{}});
  page=await context.newPage();
  try{
    await goto(page,ROUTES.HOME,"[data-hero-video]");
    const frame=page.locator("[data-hero-video]");
    assert(await frame.getAttribute("role")==="button","pre-activation role!=button");
    assert(await frame.getAttribute("tabindex")==="0","pre-activation tabindex!=0");
    assert((await frame.getAttribute("aria-label")||"").length>0,"missing pre-activation accessible name");
    await frame.focus();
    await page.keyboard.press("Enter");
    await page.waitForSelector("[data-hero-video] iframe",{state:"attached",timeout:10000});
    await page.waitForTimeout(150);
    const s=await page.evaluate(()=>{const f=document.querySelector("[data-hero-video]"),i=f?.querySelector("iframe");return {role:f?.getAttribute("role"),tab:f?.getAttribute("tabindex"),label:f?.getAttribute("aria-label"),active:document.activeElement===i};});
    assert(s.role===null && s.tab===null && s.label===null,`stale semantics ${JSON.stringify(s)}`);
    assert(s.active===true,`iframe focus transfer failed ${JSON.stringify(s)}`);
    pass("F19-REDUCED-MOTION",ROUTES.HOME,`${name} reduced-motion`,"explicit activation removes synthetic button semantics and transfers focus to iframe","F19");
  }catch(e){ fail("F19-REDUCED-MOTION",ROUTES.HOME,`${name} reduced-motion`,String(e),"F19"); }
  await context.close();
}

async function testCapiTabs(browser,name){
  const context=await newContext(browser,{width:393,height:852});
  const page=await context.newPage();
  try{
    await goto(page,ROUTES.CAPIITOLO,'[data-scene-nav] [role="tab"]');
    await page.waitForSelector('[data-type-tabs] [role="tab"]',{timeout:20000});
    for(const cfg of [
      {list:'[data-scene-nav]',panel:'#scene-panel',expectedMin:7,label:"scene"},
      {list:'[data-type-tabs]',panel:'#type-panel',expectedMin:3,label:"type"}
    ]){
      const tabs=page.locator(`${cfg.list} [role="tab"]`);
      const n=await tabs.count(); assert(n>=cfg.expectedMin,`${cfg.label} tab count=${n}`);
      let state=await tabs.evaluateAll(xs=>xs.map(x=>({id:x.id,selected:x.getAttribute("aria-selected"),tabindex:x.getAttribute("tabindex"),controls:x.getAttribute("aria-controls")})));
      assert(state.filter(x=>x.selected==="true").length===1,`${cfg.label} selected count`);
      assert(state.filter(x=>x.tabindex==="0").length===1,`${cfg.label} roving count`);
      const panel=page.locator(cfg.panel);
      assert(await panel.getAttribute("role")==="tabpanel",`${cfg.label} panel role`);
      let active=state.find(x=>x.selected==="true");
      assert(active && active.controls===cfg.panel.slice(1),`${cfg.label} aria-controls`);
      assert(await panel.getAttribute("aria-labelledby")===active.id,`${cfg.label} aria-labelledby initial`);

      await tabs.filter({has:undefined}).first().focus();
      await page.keyboard.press("ArrowRight");
      state=await tabs.evaluateAll(xs=>xs.map(x=>({id:x.id,selected:x.getAttribute("aria-selected"),tabindex:x.getAttribute("tabindex"),focused:document.activeElement===x})));
      assert(state[1]?.selected==="true" && state[1]?.focused===true && state[1]?.tabindex==="0",`${cfg.label} ArrowRight failed`);
      assert(await panel.getAttribute("aria-labelledby")===state[1].id,`${cfg.label} panel label after ArrowRight`);

      await page.keyboard.press("End");
      state=await tabs.evaluateAll(xs=>xs.map(x=>({id:x.id,selected:x.getAttribute("aria-selected"),focused:document.activeElement===x})));
      assert(state[n-1]?.selected==="true" && state[n-1]?.focused===true,`${cfg.label} End failed`);
      await page.keyboard.press("Home");
      state=await tabs.evaluateAll(xs=>xs.map(x=>({id:x.id,selected:x.getAttribute("aria-selected"),focused:document.activeElement===x})));
      assert(state[0]?.selected==="true" && state[0]?.focused===true,`${cfg.label} Home failed`);
      await page.keyboard.press("ArrowLeft");
      state=await tabs.evaluateAll(xs=>xs.map(x=>({id:x.id,selected:x.getAttribute("aria-selected"),focused:document.activeElement===x})));
      assert(state[n-1]?.selected==="true" && state[n-1]?.focused===true,`${cfg.label} ArrowLeft wrap failed`);
    }
    pass("T01-T02-T03-CAPIITOLO",ROUTES.CAPIITOLO,`${name} 393x852`,"scene/type tabs: single roving tab stop, ArrowLeft/Right/Home/End, aria-controls and dynamic aria-labelledby PASS","F12");
  }catch(e){ fail("T01-T02-T03-CAPIITOLO",ROUTES.CAPIITOLO,`${name} 393x852`,String(e),"F12"); }
  await context.close();
}

async function testConsent(browser,name,route){
  for(const choice of ["accept","reject"]){
    const context=await browser.newContext({viewport:{width:393,height:852},locale:"pt-BR"});
    const page=await context.newPage();
    try{
      await goto(page,route,"[data-mnt-consent]");
      await page.evaluate(()=>{try{localStorage.removeItem("mnt.consent.v1")}catch{}});
      await page.reload({waitUntil:"domcontentloaded"});
      await page.waitForSelector("[data-mnt-consent]:not([hidden])",{timeout:10000});
      const banner=await rect(page,"[data-mnt-consent]");
      const dockSel=route===ROUTES.HOME?"#mt-floating-dock":route===ROUTES.CAPIITOLO?".mnt-contact-float":".mt-quick-actions";
      await page.waitForSelector(dockSel,{state:"attached",timeout:15000});
      const dock=await rect(page,dockSel);
      assert(!overlaps(banner,dock),`consent overlaps dock before ${choice}`);
      const button=page.locator(choice==="accept"?"[data-consent-accept]":"[data-consent-reject]").first();
      await button.focus();
      await page.keyboard.press("Enter");
      await page.waitForFunction(()=>document.querySelector("[data-mnt-consent]")?.hidden===true,null,{timeout:5000});
      const persisted=await page.evaluate(()=>localStorage.getItem("mnt.consent.v1"));
      assert(persisted===(choice==="accept"?"granted":"denied"),`persisted=${persisted}`);
      const focusHidden=await page.evaluate(()=>!!document.activeElement?.closest?.("[data-mnt-consent][hidden]"));
      assert(!focusHidden,"focus remained inside hidden consent");
      pass(`C02-CONSENT-${choice.toUpperCase()}`,route,`${name} 393x852`,`${choice} hides panel, persists choice, no pre-choice dock overlap, focus not trapped in hidden panel`,"C02");
    }catch(e){ fail(`C02-CONSENT-${choice.toUpperCase()}`,route,`${name} 393x852`,String(e),"C02"); }
    await context.close();
  }
}

async function testReflow(browser,name,route,dockSel,finding){
  for(const [label,vp,shouldShow] of [
    ["150pct-equivalent",{width:911,height:512},true],
    ["200pct-equivalent",{width:683,height:384},false]
  ]){
    const context=await newContext(browser,vp);
    const page=await context.newPage();
    try{
      const ready=route===ROUTES.CAPIITOLO?".mnt-contact-float":"[data-moretegra-lead-form]";
      await goto(page,route,ready);
      await page.waitForSelector(dockSel,{state:"attached",timeout:15000});
      const show=await visible(page,dockSel);
      assert(show===shouldShow,`${dockSel} visible=${show}, expected=${shouldShow}`);
      assert(await noOverflow(page),"page-level horizontal overflow");
      const submit=page.locator("[data-moretegra-form-submit]").first();
      assert(await submit.count()>0,"missing submit");
      await submit.scrollIntoViewIfNeeded();
      const sr=await submit.boundingBox(); assert(sr && sr.width>0 && sr.height>0,"submit not visible");
      if(shouldShow){
        const dr=await rect(page,dockSel);
        assert(!overlaps(sr,dr),"dock overlaps submit");
      }
      pass(`Z01-${finding}-${label}`,route,`${name} ${vp.width}x${vp.height}`,`dock visible=${show}; no page overflow; Form46 submit unobstructed`,finding);
    }catch(e){ fail(`Z01-${finding}-${label}`,route,`${name} ${vp.width}x${vp.height}`,String(e),finding); }
    await context.close();
  }
}

async function testOverflowAndTouch(browser,name){
  for(const width of [360,375,393,440]){
    const context=await newContext(browser,{width,height:852});
    const page=await context.newPage();
    try{
      await goto(page,ROUTES.CAPIITOLO,'[data-scene-nav] [role="tab"]');
      assert(await noOverflow(page),`CAPIITOLO overflow at ${width}`);
      pass("F14-MOBILE-OVERFLOW",ROUTES.CAPIITOLO,`${name} ${width}x852`,"document scrollWidth <= clientWidth","F14");
    }catch(e){ fail("F14-MOBILE-OVERFLOW",ROUTES.CAPIITOLO,`${name} ${width}x852`,String(e),"F14"); }
    await context.close();
  }

  for(const route of [ROUTES.ELO_DUO,ROUTES.ARIA]){
    const context=await newContext(browser,{width:393,height:852});
    const page=await context.newPage();
    try{
      await goto(page,route,".mt-back");
      const back=await rect(page,".mt-back");
      assert(back.height>=46,`.mt-back height=${back.height}`);
      assert(await noOverflow(page),"page overflow");
      const country=await rect(page,"#mt-phone-country");
      const phone=await rect(page,"#mt-lead-phone");
      const submit=await rect(page,"[data-moretegra-form-submit]");
      assert(country.height>=46 && phone.height>=46 && submit.height>=46,`form targets country=${country.height}, phone=${phone.height}, submit=${submit.height}`);
      pass("F18-TOUCH-EXACT",route,`${name} 393x852`,`back=${back.height.toFixed(1)}px; form targets >=46px; no overflow`,"F18");
    }catch(e){ fail("F18-TOUCH-EXACT",route,`${name} 393x852`,String(e),"F18"); }
    await context.close();
  }

  {
    const context=await newContext(browser,{width:393,height:852});
    const page=await context.newPage();
    try{
      await goto(page,ROUTES.CAPIITOLO,'[data-scene-nav] [role="tab"]');
      const country=await rect(page,"#mt-phone-country");
      const phone=await rect(page,"#mt-lead-phone");
      const submit=await rect(page,"[data-moretegra-form-submit]");
      const scene=await rect(page,'[data-scene-nav] [role="tab"]');
      const type=await rect(page,'[data-type-tabs] [role="tab"]');
      await page.waitForSelector(".mnt-whatsapp-float",{state:"attached",timeout:10000});
      const wa=await rect(page,".mnt-whatsapp-float");
      const lead=await rect(page,".mnt-contact-float");
      assert(country.height>=46 && phone.height>=46 && submit.height>=46,"CAPI form targets <46");
      assert(scene.height>=46 && type.height>=46,`CAPI tabs scene=${scene.height}, type=${type.height}`);
      assert(wa.width>=46 && wa.height>=46 && lead.height>=46,`floating wa=${wa.width}x${wa.height}, lead=${lead.height}`);
      pass("TOUCH-CAPIITOLO",ROUTES.CAPIITOLO,`${name} 393x852`,"Form46, gallery/type tabs and floating actions meet >=46px target baseline","F12/F16");
    }catch(e){ fail("TOUCH-CAPIITOLO",ROUTES.CAPIITOLO,`${name} 393x852`,String(e),"F12/F16"); }
    await context.close();
  }
}

async function testKeyboardTraversal(browser,name,route,readySel){
  const context=await newContext(browser,{width:393,height:852});
  const page=await context.newPage();
  try{
    await goto(page,route,readySel);
    await page.evaluate(()=>window.scrollTo(0,0));
    const seq=[];
    let repeated=0,prev="";
    for(let i=0;i<90;i++){
      await page.keyboard.press("Tab");
      const s=await page.evaluate(()=>{
        const e=document.activeElement;
        if(!e) return null;
        const r=e.getBoundingClientRect(),cs=getComputedStyle(e);
        const indicator=(cs.outlineStyle!=="none" && parseFloat(cs.outlineWidth||"0")>0)||cs.boxShadow!=="none";
        return {tag:e.tagName,id:e.id||"",cls:String(e.className||""),text:(e.getAttribute("aria-label")||e.textContent||"").trim().slice(0,80),rect:[r.x,r.y,r.width,r.height],display:cs.display,visibility:cs.visibility,indicator,honeypot:e.id==="mt-company-website"};
      });
      if(!s) continue;
      const key=`${s.tag}#${s.id}.${s.cls}:${s.text}`;
      if(key===prev) repeated++; else repeated=0;
      prev=key;
      assert(repeated<3,`focus trap suspected at ${key}`);
      assert(!s.honeypot,"honeypot entered focus sequence");
      assert(s.display!=="none" && s.visibility!=="hidden" && s.rect[2]>0 && s.rect[3]>0,`hidden focus target ${key}`);
      seq.push(s);
      if(route===ROUTES.HOME && s.text.includes("Tegra Vendas")) break;
      if(route!==ROUTES.HOME && (s.text.includes("WhatsApp") || s.text.includes("perfil oficial"))) {
        if(seq.length>15) break;
      }
    }
    assert(seq.length>=8,`short focus sequence ${seq.length}`);
    const reachedForm=seq.some(x=>x.id==="mt-lead-name"||x.id==="mt-lead-email"||x.id==="mt-phone-country");
    assert(reachedForm,"focus sequence never reached Form46");
    const indicators=seq.filter(x=>x.indicator).length;
    assert(indicators>=Math.max(3,Math.floor(seq.length*.35)),`too few computed focus indicators ${indicators}/${seq.length}`);
    pass("K02-K03-TRAVERSAL",route,`${name} 393x852`,`Tab sequence ${seq.length} stops; Form46 reached; no honeypot/trap/hidden stop; computed visual focus indicator on ${indicators} stops`,"K02/K03");
  }catch(e){ fail("K02-K03-TRAVERSAL",route,`${name} 393x852`,String(e),"K02/K03"); }
  await context.close();
}

async function testAxe(browser,name,route,readySel){
  const context=await newContext(browser,{width:393,height:852});
  const page=await context.newPage();
  try{
    await goto(page,route,readySel);
    await page.addScriptTag({content:axe.source});
    const scan=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa","wcag22aa"]},resultTypes:["violations"]}));
    const severe=scan.violations.filter(v=>["critical","serious"].includes(v.impact));
    const digest=scan.violations.map(v=>`${v.id}:${v.impact}(${v.nodes.length})`).join(", ")||"none";
    assert(severe.length===0,`serious/critical axe violations: ${severe.map(v=>v.id+":"+v.impact).join(", ")}; all=${digest}`);
    pass("AXE-SUPPLEMENTAL",route,`${name} 393x852`,`no serious/critical WCAG axe violations; all violations: ${digest}`,"SUPPLEMENTAL");
  }catch(e){ fail("AXE-SUPPLEMENTAL",route,`${name} 393x852`,String(e),"SUPPLEMENTAL"); }
  await context.close();
}

async function runBrowser(name,type){
  const browser=await type.launch({headless:true});
  try{
    await testHomeCore(browser,name);
    await testCapiTabs(browser,name);
    await testConsent(browser,name,ROUTES.HOME);
    await testConsent(browser,name,ROUTES.ELO_DUO);
    await testConsent(browser,name,ROUTES.ARIA);
    await testConsent(browser,name,ROUTES.CAPIITOLO);
    await testReflow(browser,name,ROUTES.HOME,"#mt-floating-dock","F15");
    await testReflow(browser,name,ROUTES.CAPIITOLO,".mnt-contact-float","F16");
    await testReflow(browser,name,ROUTES.ELO_DUO,".mt-quick-actions","F17");
    await testReflow(browser,name,ROUTES.ARIA,".mt-quick-actions","F17");
    await testOverflowAndTouch(browser,name);
    if(name==="chromium"){
      for(const [route,ready] of [
        [ROUTES.HOME,"[data-filter-status]"],
        [ROUTES.CAPIITOLO,'[data-scene-nav] [role="tab"]'],
        [ROUTES.ELO_DUO,"[data-moretegra-lead-form]"],
        [ROUTES.ARIA,"[data-moretegra-lead-form]"]
      ]){
        await testKeyboardTraversal(browser,name,route,ready);
        await testAxe(browser,name,route,ready);
      }
    }
  } finally { await browser.close(); }
}

await sourceAcceptance();
for(const [name,type] of Object.entries(engines)){
  try{ await runBrowser(name,type); }
  catch(e){ fail("BROWSER-ENGINE","ALL",name,String(e),"MULTI"); }
}

note("SCREEN-READER","ALL","NVDA/VoiceOver","Real assistive-technology announcement semantics cannot be certified by Playwright/axe; requires representative NVDA+Chrome/Firefox or VoiceOver+Safari session.","SCREEN_READER");

const summary = {
  runtime_sha: EXPECTED_RUNTIME_SHA,
  production_base: BASE,
  total: results.length,
  pass: results.filter(r=>r.result==="PASS").length,
  fail: results.filter(r=>r.result==="FAIL").length,
  not_observed: results.filter(r=>r.result==="NOT_OBSERVED").length,
  results
};
fs.writeFileSync("m5-01-production-acceptance-results.json",JSON.stringify(summary,null,2)+"\n");
fs.writeFileSync("m5-01-production-acceptance-summary.txt",
  `M5-01 PRODUCTION ACCEPTANCE DIAGNOSTIC\nRUNTIME_SHA=${EXPECTED_RUNTIME_SHA}\nPASS=${summary.pass}\nFAIL=${summary.fail}\nNOT_OBSERVED=${summary.not_observed}\nTOTAL=${summary.total}\n`);
console.log(JSON.stringify({pass:summary.pass,fail:summary.fail,not_observed:summary.not_observed,total:summary.total}));
if(summary.fail>0) process.exit(1);
