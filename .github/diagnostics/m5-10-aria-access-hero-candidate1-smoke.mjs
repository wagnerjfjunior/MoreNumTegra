import assert from "node:assert/strict";
import { chromium } from "playwright";

const URL="http://127.0.0.1:4173/empreendimentos/aria-higienopolis/";
const GREEN="Ária%20Higien%C3%B3polis-Perspectiva%20ilustrada%20do%20acesso%20residencial..webp";
const OLD_HERO="/assets/aria-higienopolis/hero-mobile-714.webp";
const GALLERY="/assets/aria-higienopolis/gallery1-mobile-828.webp";
const PIXEL=Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==","base64");

async function run(name,viewport,dpr,mobile){
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const context=await browser.newContext({viewport,deviceScaleFactor:dpr});
  const page=await context.newPage();
  const seen=[];
  page.on("request",req=>{
    const u=req.url();
    if(
      u.includes("/assets/aria-higienopolis/") ||
      u.includes(GREEN) ||
      u.includes("back.gdigital.com.br/form/register")
    ) seen.push(u);
  });
  await page.route("**/*",async route=>{
    const u=route.request().url();
    if(u.includes("googletagmanager.com/")||u.includes("google-analytics.com/")) return route.abort();
    if(u.startsWith("https://s3-gdigital.s3.amazonaws.com/")||u.startsWith("https://stracctegra.blob.core.windows.net/")){
      return route.fulfill({status:200,contentType:"image/gif",body:PIXEL});
    }
    if(u.startsWith("https://")) return route.abort();
    return route.continue();
  });

  await page.goto(URL,{waitUntil:"load",timeout:30000});
  await page.waitForTimeout(300);

  const hero=page.locator(".mt-hero-media img");
  const heroCurrent=await hero.evaluate(img=>img.currentSrc);
  const heroBox=await page.locator(".mt-hero-media").boundingBox();
  assert.ok(heroBox && Math.abs(heroBox.width/heroBox.height-1.15)<0.03,name+": hero framing preserved");

  if(mobile){
    assert.ok(heroCurrent.includes("/assets/aria-higienopolis/candidate1/hero-access-mobile-828.webp"),name+": candidate 828w selected");
    assert.equal(seen.some(u=>u.includes(GREEN)),false,name+": Green original not downloaded on mobile");
    assert.equal(seen.some(u=>u.includes(OLD_HERO)),false,name+": previous hero derivative not downloaded");
  }else{
    assert.ok(heroCurrent.includes(GREEN),name+": desktop uses Green candidate source");
  }

  await page.locator("[data-aria-gallery]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const galleryCurrent=await page.locator("[data-gallery-main]").evaluate(img=>img.currentSrc);
  if(mobile) assert.ok(galleryCurrent.includes(GALLERY),name+": retained responsive gallery unchanged");

  assert.equal(seen.filter(u=>u.includes("back.gdigital.com.br/form/register")).length,0,name+": no Form46 POST");

  console.log("PASS:",name,JSON.stringify({heroCurrent,galleryCurrent,heroBox}));
  await browser.close();
}

await run("mobile 393x852 DPR2.75",{width:393,height:852},2.75,true);
await run("desktop 1280x900 DPR1",{width:1280,height:900},1,false);
console.log("M5-10 Aria access hero candidate 1 browser smoke: PASS");
