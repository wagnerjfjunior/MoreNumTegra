import assert from "node:assert/strict";
import { chromium } from "playwright";

const URL="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const GA4="G-57M2XR0CY2";
const CONSENT_KEYS=["ad_storage","analytics_storage","ad_user_data","ad_personalization"];

function parseCollect(url){
  try{
    const u=new URL(url);
    return {
      tid:u.searchParams.get("tid"),
      en:u.searchParams.get("en"),
      gcs:u.searchParams.get("gcs"),
      gcd:u.searchParams.get("gcd"),
      npa:u.searchParams.get("npa"),
      url
    };
  }catch{return null}
}

async function run(choice){
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const context=await browser.newContext();
  await context.addInitScript(()=>{try{localStorage.removeItem("mnt.consent.v1")}catch{}});
  const page=await context.newPage();

  const collects=[];
  let leads=0;
  page.on("request",req=>{
    const url=req.url();
    if(url.includes("google-analytics.com/g/collect")){
      const parsed=parseCollect(url);
      if(parsed) collects.push(parsed);
    }
    if(url.includes("back.gdigital.com.br/form/register")) leads++;
  });

  await page.goto(URL,{waitUntil:"load",timeout:60000});
  await page.waitForFunction(()=>performance.getEntriesByType("resource").some(r=>r.name.includes("googletagmanager.com/gtag/js?id=G-57M2XR0CY2")),{timeout:15000});
  await page.waitForTimeout(1200);

  const defaultState=await page.evaluate(keys=>{
    const entries=window.google_tag_data?.ics?.entries||{};
    const out={};
    for(const k of keys){
      const v=entries[k];
      if(!v){out[k]=null;continue;}
      out[k]={
        default:v.default,
        update:v.update,
        quiet:v.quiet,
        implicit:v.implicit,
        declare:v.declare
      };
    }
    return out;
  },CONSENT_KEYS);

  const pageViews=collects.filter(x=>x.tid===GA4 && x.en==="page_view");

  const selector=choice==="granted"?"[data-consent-accept]":"[data-consent-reject]";
  const expectedEvent=choice==="granted"?"mnt_consent_accept":"mnt_consent_reject";
  await page.locator(selector).click({timeout:15000});
  await page.waitForFunction(ev=>(window.dataLayer||[]).some(x=>x?.event===ev),expectedEvent,{timeout:10000});
  await page.waitForTimeout(400);

  const afterChoiceState=await page.evaluate(keys=>{
    const entries=window.google_tag_data?.ics?.entries||{};
    const out={};
    for(const k of keys){
      const v=entries[k];
      if(!v){out[k]=null;continue;}
      out[k]={
        default:v.default,
        update:v.update,
        quiet:v.quiet,
        implicit:v.implicit,
        declare:v.declare
      };
    }
    return out;
  },CONSENT_KEYS);

  const beforeIntentCount=collects.length;
  await page.locator('[data-project-intent="conditions"]').first().click({timeout:15000});
  await page.waitForFunction(()=>(window.dataLayer||[]).some(x=>x?.event==="mnt_intent"),{timeout:10000});
  await page.waitForTimeout(1200);

  const newCollects=collects.slice(beforeIntentCount);
  const intentCollects=newCollects.filter(x=>x.tid===GA4 && x.en==="mnt_intent");
  if(choice==="granted"){
    assert.ok(intentCollects.length>=1,`${choice}: post-choice mnt_intent must reach the same GA4 destination`);
  }
  assert.equal(leads,0,`${choice}: consent/intent QA must not submit Form 46`);

  const stored=await page.evaluate(()=>localStorage.getItem("mnt.consent.v1"));
  assert.equal(stored,choice,`${choice}: project consent persistence remains`);

  console.log("CONSENT_PROOF",choice,JSON.stringify({
    defaultState,
    afterChoiceState,
    initialPageView:pageViews[0]||null,
    postChoiceIntent:intentCollects[0]||null,
    collectCount:collects.length,
    leads
  }));

  await browser.close();
}

await run("granted");
await run("denied");
console.log("M5-10 late GTM consent/GA4 Production proof: PASS");

// contract-corrected consent proof rerun
