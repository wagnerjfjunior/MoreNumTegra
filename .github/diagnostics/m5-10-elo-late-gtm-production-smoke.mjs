import assert from "node:assert/strict";
import { chromium } from "playwright";

const URL="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const GTM="GTM-PGCR4R47";
const GA4="G-57M2XR0CY2";

async function run(choice){
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const context=await browser.newContext();
  await context.addInitScript(() => {
    try { localStorage.removeItem("mnt.consent.v1"); } catch {}
  });
  const page=await context.newPage();

  const seen=[];
  page.on("request", req => {
    const url=req.url();
    if(
      url.includes("googletagmanager.com/gtm.js") ||
      url.includes("googletagmanager.com/gtag/js") ||
      url.includes("google-analytics.com/g/collect") ||
      url.includes("back.gdigital.com.br/form/register")
    ) seen.push(url);
  });

  await page.goto(URL,{waitUntil:"load",timeout:60000});
  await page.waitForFunction(() => (window.dataLayer||[]).some(x=>x?.event==="mnt_page_view"),{timeout:15000});
  await page.waitForFunction(() => performance.getEntriesByType("resource").some(r=>r.name.includes("googletagmanager.com/gtm.js")),{timeout:15000});

  const before=await page.evaluate(() => {
    const nav=performance.getEntriesByType("navigation")[0];
    const resources=performance.getEntriesByType("resource").map(r=>({name:r.name,startTime:r.startTime,duration:r.duration}));
    return {
      loadEventStart:nav?.loadEventStart ?? null,
      domContentLoadedEventStart:nav?.domContentLoadedEventStart ?? null,
      events:(window.dataLayer||[]).map(x=>x?.event||null),
      gtm:resources.filter(r=>r.name.includes("googletagmanager.com/gtm.js")),
      gtag:resources.filter(r=>r.name.includes("googletagmanager.com/gtag/js"))
    };
  });

  assert.equal(before.events[0],"gtm.js",`${choice}: gtm.js must remain first dataLayer event`);
  assert.ok(before.events.includes("mnt_page_view"),`${choice}: mnt_page_view must remain present`);
  assert.equal(before.gtm.length,1,`${choice}: exactly one GTM resource load expected`);
  assert.ok(before.loadEventStart!=null && before.loadEventStart>0,`${choice}: loadEventStart must be observable`);
  assert.ok(before.gtm[0].startTime >= before.loadEventStart - 5,
    `${choice}: GTM resource should start at/after window.load (gtm=${before.gtm[0].startTime}, load=${before.loadEventStart})`);

  const selector=choice==="granted" ? "[data-consent-accept]" : "[data-consent-reject]";
  const expectedEvent=choice==="granted" ? "mnt_consent_accept" : "mnt_consent_reject";
  await page.locator(selector).click({timeout:15000});
  await page.waitForFunction(ev => (window.dataLayer||[]).some(x=>x?.event===ev),expectedEvent,{timeout:10000});
  await page.waitForTimeout(500);

  const after=await page.evaluate(() => ({
    saved:localStorage.getItem("mnt.consent.v1"),
    events:(window.dataLayer||[]).map(x=>x?.event||null),
    gtmCount:performance.getEntriesByType("resource").filter(r=>r.name.includes("googletagmanager.com/gtm.js")).length,
    gtagUrls:performance.getEntriesByType("resource").filter(r=>r.name.includes("googletagmanager.com/gtag/js")).map(r=>r.name)
  }));

  assert.equal(after.saved,choice,`${choice}: consent persistence must remain`);
  assert.ok(after.events.includes(expectedEvent),`${choice}: canonical consent source event must remain`);
  assert.equal(after.gtmCount,1,`${choice}: consent interaction must not duplicate GTM bootstrap`);

  const gtmRequests=seen.filter(u=>u.includes("googletagmanager.com/gtm.js"));
  const leadRequests=seen.filter(u=>u.includes("back.gdigital.com.br/form/register"));
  assert.equal(gtmRequests.length,1,`${choice}: network observer must see exactly one GTM request`);
  assert.equal(leadRequests.length,0,`${choice}: smoke must not submit any real Form 46 lead`);

  console.log("PASS",choice,JSON.stringify({
    loadEventStart:before.loadEventStart,
    gtmStartTime:before.gtm[0].startTime,
    gtmDeltaFromLoadMs:Number((before.gtm[0].startTime-before.loadEventStart).toFixed(2)),
    firstEvents:after.events.slice(0,10),
    gtagUrls:after.gtagUrls,
    sameGa4TagObserved:after.gtagUrls.some(u=>u.includes(GA4)),
    gtmRequests:gtmRequests.length,
    leadRequests:leadRequests.length
  }));

  await browser.close();
}

await run("granted");
await run("denied");
console.log("M5-10 late GTM Production smoke: PASS",GTM,GA4);
