import assert from "node:assert/strict";
import { chromium } from "playwright";

const TARGET="http://www.moretegra.com.br:4173/empreendimentos/caminhos-da-lapa-elo-duo/";
const HERO_TOKEN="Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp";
const PIXEL=Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==","base64");

async function runScenario(name, choiceBeforeLoad){
  const browser=await chromium.launch({
    headless:true,
    args:[
      "--no-sandbox",
      "--host-resolver-rules=MAP www.moretegra.com.br 127.0.0.1"
    ]
  });
  const context=await browser.newContext();
  const page=await context.newPage();

  let gtmRequests=0;
  let heroRelease;
  let heroSeenResolve;
  const heroGate=new Promise(resolve=>{heroRelease=resolve;});
  const heroSeen=new Promise(resolve=>{heroSeenResolve=resolve;});

  await page.route("**/*", async route=>{
    const url=route.request().url();

    if(url.startsWith("https://www.googletagmanager.com/gtm.js")){
      gtmRequests++;
      return route.fulfill({
        status:200,
        contentType:"application/javascript",
        body:`window.__mntGtmStub={loaded:true,loadedAt:performance.now(),queueAtLoad:(window.dataLayer||[]).map(x=>x&&x.event||null)};`
      });
    }

    if(url.includes(HERO_TOKEN)){
      heroSeenResolve();
      await heroGate;
      return route.fulfill({status:200,contentType:"image/gif",body:PIXEL});
    }

    if(url.startsWith("https://s3-gdigital.s3.amazonaws.com/")){
      return route.fulfill({status:200,contentType:"image/gif",body:PIXEL});
    }

    if(url.startsWith("https://stracctegra.blob.core.windows.net/")){
      return route.fulfill({status:200,contentType:"image/gif",body:PIXEL});
    }

    if(url.startsWith("https://")){
      return route.abort();
    }

    return route.continue();
  });

  await page.goto(TARGET,{waitUntil:"domcontentloaded",timeout:30000});
  await heroSeen;

  const before=await page.evaluate(()=>({
    readyState:document.readyState,
    events:(window.dataLayer||[]).map(x=>x&&x.event||null),
    stub:window.__mntGtmStub||null
  }));

  assert.notEqual(before.readyState,"complete",`${name}: window.load must still be blocked by held hero`);
  assert.equal(gtmRequests,0,`${name}: GTM network must not start before load/interaction`);
  assert.equal(before.stub,null,`${name}: GTM stub must not be loaded before trigger`);
  assert.equal(before.events[0],"gtm.js",`${name}: first queued event must remain gtm.js`);
  assert.ok(before.events.includes("mnt_page_view"),`${name}: mnt_page_view must queue before GTM network load`);

  if(choiceBeforeLoad){
    const selector=choiceBeforeLoad==="granted" ? "[data-consent-accept]" : "[data-consent-reject]";
    const expected=choiceBeforeLoad==="granted" ? "mnt_consent_accept" : "mnt_consent_reject";

    await page.locator(selector).click({timeout:10000});
    await page.waitForFunction(()=>window.__mntGtmStub?.loaded===true,{timeout:10000});

    const early=await page.evaluate(()=>({
      readyState:document.readyState,
      events:(window.dataLayer||[]).map(x=>x&&x.event||null),
      stub:window.__mntGtmStub
    }));

    assert.notEqual(early.readyState,"complete",`${name}: first interaction should load GTM before held window.load`);
    assert.equal(gtmRequests,1,`${name}: first interaction must request GTM exactly once`);
    assert.ok(early.events.includes(expected),`${name}: consent source event must remain in dataLayer`);
    assert.equal(early.stub.queueAtLoad[0],"gtm.js",`${name}: GTM sees gtm.js first even on early interaction`);
  }

  heroRelease();
  await page.waitForLoadState("load",{timeout:10000});
  await page.waitForFunction(()=>window.__mntGtmStub?.loaded===true,{timeout:10000});
  await page.waitForTimeout(100);

  if(!choiceBeforeLoad){
    assert.equal(gtmRequests,1,`${name}: window.load must request GTM exactly once`);
    const atLoad=await page.evaluate(()=>window.__mntGtmStub);
    assert.equal(atLoad.queueAtLoad[0],"gtm.js",`${name}: GTM sees gtm.js first on load-trigger path`);

    await page.locator("[data-consent-accept]").click({timeout:10000});
    await page.waitForTimeout(50);
  }

  const after=await page.evaluate(()=>({
    events:(window.dataLayer||[]).map(x=>x&&x.event||null),
    saved:localStorage.getItem("mnt.consent.v2"),
    gtmStub:window.__mntGtmStub
  }));

  assert.equal(gtmRequests,1,`${name}: load + interaction combination must never duplicate GTM request`);
  assert.equal(after.events[0],"gtm.js",`${name}: queue ordering remains stable`);
  assert.ok(after.events.includes("mnt_page_view"),`${name}: page-view source event remains present`);

  if(choiceBeforeLoad==="denied"){
    assert.equal(after.saved,"denied",`${name}: denied choice persists`);
    assert.ok(after.events.includes("mnt_consent_reject"),`${name}: denied consent source event remains`);
  } else {
    assert.equal(after.saved,"granted",`${name}: granted choice persists`);
    assert.ok(after.events.includes("mnt_consent_accept"),`${name}: granted consent source event remains`);
  }

  console.log("PASS:",name,JSON.stringify({
    gtmRequests,
    firstEvents:after.events.slice(0,6),
    saved:after.saved,
    queueAtLoad:after.gtmStub.queueAtLoad.slice(0,6)
  }));

  await browser.close();
}

await runScenario("load-trigger + accept-after-load",null);
await runScenario("accept-before-load triggers GTM","granted");
await runScenario("reject-before-load triggers GTM","denied");

console.log("M5-10 Elo late GTM bootstrap browser smoke: PASS");
