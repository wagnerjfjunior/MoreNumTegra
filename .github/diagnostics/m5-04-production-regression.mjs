import { chromium, firefox, webkit } from "playwright";
import fs from "node:fs";

const BASE="https://www.moretegra.com.br";
const RUNTIME_SHA="a070e968a547cf94a68b0eb2a38a4bb2e9f64758";
const R={HOME:"/",CAPI:"/empreendimentos/capiitolo-piero-lissoni/",ELO:"/empreendimentos/caminhos-da-lapa-elo-duo/",ARIA:"/empreendimentos/aria-higienopolis/"};
const rows=[];
const U=p=>new URL(p,BASE).toString();
function add(id,route,browser,result,evidence,finding="NONE"){const x={test_id:id,route,environment:"PRODUCTION",runtime_sha:RUNTIME_SHA,browser_device:browser,result,evidence,finding_id:finding,observed_at:new Date().toISOString()};rows.push(x);console.log(JSON.stringify(x))}
function ok(v,m){if(!v)throw new Error(m)}
async function ctx(browser,viewport={width:393,height:852}){const c=await browser.newContext({viewport,locale:"pt-BR",hasTouch:true});await c.addInitScript(()=>{try{localStorage.setItem("mnt.consent.v1","granted")}catch{}});return c}
async function go(p,route,ready){const r=await p.goto(U(route),{waitUntil:"domcontentloaded",timeout:30000});ok(r?.ok(),`HTTP ${r?.status()}`);await p.waitForSelector(ready,{state:"attached",timeout:20000});await p.waitForTimeout(500)}
async function visible(p,sel){const l=p.locator(sel).first();if(!await l.count())return false;return l.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=="none"&&s.visibility!=="hidden"&&r.width>0&&r.height>0})}
async function box(p,sel){const l=p.locator(sel).first();ok(await l.count(),`missing ${sel}`);const b=await l.boundingBox();ok(b,`no box ${sel}`);return b}
async function noOverflow(p){return p.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)}
async function homeState(p){return p.evaluate(()=>({count:Number(document.querySelector("[data-result-count]")?.textContent||"-1"),cards:[...document.querySelectorAll("[data-project-grid] .mt-project-card")].map(x=>({status:x.dataset.status,zone:x.dataset.zone,title:x.querySelector("h3")?.textContent?.trim()||"",text:x.textContent||""})),status:document.querySelector("[data-status-mobile]")?.value,zone:document.querySelector("[data-zone-filter]")?.value,price:document.querySelector("[data-price-filter]")?.value,query:document.querySelector("[data-project-search]")?.value||"",emptyHidden:document.querySelector("[data-empty-state]")?.hidden,clearHidden:document.querySelector("[data-clear-filters]")?.hidden,quick:[...document.querySelectorAll("[data-quick-zone]")].map(x=>({zone:x.dataset.quickZone,pressed:x.getAttribute("aria-pressed"),active:x.classList.contains("is-active")}))}))}

async function checkHomeFilters(browser,name){
 const c=await ctx(browser),p=await c.newPage();
 try{
  await go(p,R.HOME,"[data-status-mobile]");
  const initial=await homeState(p);ok(initial.count>0&&initial.count===initial.cards.length,`initial=${JSON.stringify(initial)}`);
  ok(await visible(p,"[data-status-mobile]"),"mobile status hidden");
  ok(!(await visible(p,"[data-zone-filter]")),"desktop zone select should be hidden on mobile");
  ok(await visible(p,'[data-quick-zone="Zona Oeste"]'),"quick zone hidden");
  ok(await noOverflow(p),"initial overflow");
  add("M5-04-HOME-INITIAL",R.HOME,`${name} 393x852 touch`,"PASS",`count=${initial.count}; mobile status+quick zones visible; desktop zone select hidden by design; no overflow`);

  await p.locator('[data-quick-zone="Zona Oeste"]').tap(); await p.waitForTimeout(120);
  let s=await homeState(p);ok(s.count>0&&s.cards.every(x=>x.zone==="Zona Oeste"),`zone=${JSON.stringify(s)}`);ok(s.quick.find(x=>x.zone==="Zona Oeste")?.pressed==="true","zone aria state");
  add("M5-04-HOME-ZONE",R.HOME,`${name} 393x852 touch`,"PASS",`Zona Oeste count=${s.count}; all rendered cards match; aria-pressed synchronized`);

  await p.locator("[data-status-mobile]").selectOption("construcao"); await p.waitForTimeout(120);
  s=await homeState(p);ok(s.count>0&&s.cards.every(x=>x.zone==="Zona Oeste"&&x.status==="construcao"),`combined=${JSON.stringify(s)}`);
  add("M5-04-HOME-STATUS-ZONE",R.HOME,`${name} 393x852 touch`,"PASS",`combined Zona Oeste + construcao count=${s.count}; all cards match`);

  await p.locator("[data-price-filter]").selectOption("700a1200"); await p.waitForTimeout(120);
  s=await homeState(p);ok(s.count>0,"combined price unexpectedly empty");
  add("M5-04-HOME-PRICE",R.HOME,`${name} 393x852 touch`,"PASS",`price 700a1200 combined result_count=${s.count}`);

  await p.locator("[data-project-search]").fill("Mozae"); await p.waitForTimeout(120);
  s=await homeState(p);ok(s.count===1&&s.cards[0]?.title.includes("Mozae"),`search=${JSON.stringify(s)}`);
  add("M5-04-HOME-SEARCH",R.HOME,`${name} 393x852 touch`,"PASS",`search Mozae -> ${s.cards[0]?.title}`);

  ok(await visible(p,"[data-clear-filters]"),"clear filters not visible");
  await p.locator("[data-clear-filters]").tap(); await p.waitForTimeout(120);
  s=await homeState(p);ok(s.count===initial.count&&s.status==="todos"&&s.zone==="todas"&&s.price==="todos"&&!s.query,`reset=${JSON.stringify(s)}`);ok(s.quick.find(x=>x.zone==="todas")?.pressed==="true","reset quick zone");
  add("M5-04-HOME-RESET",R.HOME,`${name} 393x852 touch`,"PASS",`restored ${s.count} cards and all filter state`);

  await p.locator("[data-project-search]").fill("__m5_04_no_match__"); await p.waitForTimeout(120);
  s=await homeState(p);ok(s.count===0&&s.emptyHidden===false,`empty=${JSON.stringify(s)}`);
  await p.locator("[data-empty-clear]").tap(); await p.waitForTimeout(120);
  s=await homeState(p);ok(s.count===initial.count&&s.emptyHidden===true,"empty reset failed");
  add("M5-04-HOME-EMPTY-RESET",R.HOME,`${name} 393x852 touch`,"PASS","empty state exposed and touch reset restored full catalog");

  const targets=["[data-status-mobile]","[data-project-search]","[data-price-filter]",'[data-quick-zone="Zona Sul"]','[data-quick-zone="Zona Oeste"]','[data-quick-zone="Zona Leste"]'];
  const vals={};for(const sel of targets){vals[sel]=(await box(p,sel)).height;ok(vals[sel]>=46,`${sel}=${vals[sel]}`)}
  add("M5-04-HOME-TOUCH",R.HOME,`${name} 393x852 touch`,"PASS",JSON.stringify(vals));
 }catch(e){add("M5-04-HOME-CORE",R.HOME,`${name} 393x852 touch`,"FAIL",String(e),"M5-04")}
 await c.close();
}

async function checkProjectControls(browser,name,route){
 const c=await ctx(browser),p=await c.newPage();
 try{
  const ready=route===R.CAPI?'[data-scene-nav] [role="tab"]':"[data-moretegra-form-submit]";
  await go(p,route,ready);ok(await noOverflow(p),"horizontal overflow");
  if(route===R.CAPI){
   const scene=p.locator('[data-scene-nav] [role="tab"]');const types=p.locator('[data-type-tabs] [role="tab"]');ok(await scene.count()>=7&&await types.count()>=3,"missing tabs");
   await scene.nth(1).tap();await p.waitForTimeout(120);ok(await scene.nth(1).getAttribute("aria-selected")==="true","scene tap state");
   await types.nth(1).tap();await p.waitForTimeout(120);ok(await types.nth(1).getAttribute("aria-selected")==="true","type tap state");
   const vals={scene:(await box(p,'[data-scene-nav] [role="tab"]')).height,type:(await box(p,'[data-type-tabs] [role="tab"]')).height,country:(await box(p,"#mt-phone-country")).height,phone:(await box(p,"#mt-lead-phone")).height,submit:(await box(p,"[data-moretegra-form-submit]")).height,whatsapp:(await box(p,".mnt-whatsapp-float")).height,contact:(await box(p,".mnt-contact-float")).height};
   ok(Object.values(vals).every(x=>x>=46),JSON.stringify(vals));
   add("M5-04-CAPI-CONTROLS",route,`${name} 393x852 touch`,"PASS",`scene/type tap state synchronized; targets=${JSON.stringify(vals)}`);
  }else{
   const vals={back:(await box(p,".mt-back")).height,country:(await box(p,"#mt-phone-country")).height,phone:(await box(p,"#mt-lead-phone")).height,submit:(await box(p,"[data-moretegra-form-submit]")).height,quick:(await box(p,".mt-quick-actions a")).height};
   ok(Object.values(vals).every(x=>x>=46),JSON.stringify(vals));
   if(route===R.ARIA){
    await p.waitForSelector("[data-gallery-next]",{state:"attached",timeout:12000});
    const before=(await p.locator("[data-gallery-count]").textContent())?.trim();
    const nextBox=await box(p,"[data-gallery-next]");ok(nextBox.height>=46&&nextBox.width>=46,`gallery next ${JSON.stringify(nextBox)}`);
    await p.locator("[data-gallery-next]").tap();await p.waitForTimeout(180);
    const after=(await p.locator("[data-gallery-count]").textContent())?.trim();ok(before!==after,`gallery count unchanged ${before}`);
    const thumbBox=await box(p,".mt-gallery-thumb");ok(thumbBox.height>=46,`thumb=${thumbBox.height}`);
    vals.galleryNext=Math.min(nextBox.width,nextBox.height);vals.thumb=thumbBox.height;
   }
   add("M5-04-PROJECT-CONTROLS",route,`${name} 393x852 touch`,"PASS",JSON.stringify(vals));
  }
 }catch(e){add("M5-04-PROJECT-CONTROLS",route,`${name} 393x852 touch`,"FAIL",String(e),"M5-04")}
 await c.close();
}

async function checkWidthMatrix(browser,name){
 for(const w of [360,375,393,440]){
  for(const route of [R.HOME,R.CAPI,R.ELO,R.ARIA]){
   const c=await ctx(browser,{width:w,height:852}),p=await c.newPage();
   try{
    const ready=route===R.HOME?"[data-status-mobile]":route===R.CAPI?'[data-scene-nav] [role="tab"]':"[data-moretegra-form-submit]";
    await go(p,route,ready);ok(await noOverflow(p),`overflow ${w}`);
    add("M5-04-OVERFLOW",route,`${name} ${w}x852 touch`,"PASS","document scrollWidth <= clientWidth");
   }catch(e){add("M5-04-OVERFLOW",route,`${name} ${w}x852 touch`,"FAIL",String(e),"M5-04")}
   await c.close();
  }
 }
}

async function checkReflow(browser,name,route,dock){
 for(const [label,vp,expected] of [["150pct-equivalent",{width:911,height:512},true],["200pct-equivalent",{width:683,height:384},false]]){
  const c=await ctx(browser,vp),p=await c.newPage();
  try{
   await go(p,route,"[data-moretegra-form-submit]");await p.waitForSelector(dock,{state:"attached",timeout:15000});
   const v=await visible(p,dock);ok(v===expected,`dock visible=${v}`);ok(await noOverflow(p),"overflow");
   const sb=await box(p,"[data-moretegra-form-submit]");ok(sb.width>0&&sb.height>0,"submit hidden");
   add("M5-04-REFLOW",route,`${name} ${label}`,"PASS",`dock visible=${v}; submit visible; no overflow`);
  }catch(e){add("M5-04-REFLOW",route,`${name} ${label}`,"FAIL",String(e),"M5-04")}
  await c.close();
 }
}

for(const [name,type] of Object.entries({chromium,firefox,webkit})){
 const b=await type.launch({headless:true});
 try{
  await checkHomeFilters(b,name);
  await checkProjectControls(b,name,R.CAPI);
  await checkProjectControls(b,name,R.ELO);
  await checkProjectControls(b,name,R.ARIA);
  if(name==="chromium"){
   await checkWidthMatrix(b,name);
   await checkReflow(b,name,R.HOME,"#mt-floating-dock");
   await checkReflow(b,name,R.CAPI,".mnt-contact-float");
   await checkReflow(b,name,R.ELO,".mt-quick-actions");
   await checkReflow(b,name,R.ARIA,".mt-quick-actions");
  }
 } finally {await b.close()}
}

add("PHYSICAL-DEVICE","ALL","Real mobile device","NOT_OBSERVED","Touch-capable browser-engine and viewport regression executed; no physical-device claim inferred.","PHYSICAL_DEVICE");
const summary={runtime_sha:RUNTIME_SHA,production_base:BASE,total:rows.length,pass:rows.filter(x=>x.result==="PASS").length,fail:rows.filter(x=>x.result==="FAIL").length,not_observed:rows.filter(x=>x.result==="NOT_OBSERVED").length,rows};
fs.writeFileSync("m5-04-production-regression.json",JSON.stringify(summary,null,2)+"\n");
fs.writeFileSync("m5-04-production-regression.txt",`M5-04 PRODUCTION REGRESSION\nRUNTIME_SHA=${RUNTIME_SHA}\nPASS=${summary.pass}\nFAIL=${summary.fail}\nNOT_OBSERVED=${summary.not_observed}\nTOTAL=${summary.total}\n`);
console.log("FINAL_SUMMARY",JSON.stringify({pass:summary.pass,fail:summary.fail,not_observed:summary.not_observed,total:summary.total}));
if(summary.fail>0) process.exit(1);
