import assert from "node:assert/strict";
import { chromium } from "playwright";

const URL="http://127.0.0.1:4173/empreendimentos/aria-higienopolis/";
const HERO_ORIG="ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada";
const GALLERY1_ORIG="309b34e4-72f0-48d0-a8f8-1f8e94a90cbb";
const GALLERY2_ORIG="71beba8c-baff-43aa-a782-9bbff8ad82e9";
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
      u.includes(HERO_ORIG) ||
      u.includes(GALLERY1_ORIG) ||
      u.includes(GALLERY2_ORIG)
    ) seen.push(u);
  });

  await page.route("**/*",async route=>{
    const u=route.request().url();
    if(u.includes("googletagmanager.com/")||u.includes("google-analytics.com/")) return route.abort();
    if(u.startsWith("https://stracctegra.blob.core.windows.net/")||u.startsWith("https://s3-gdigital.s3.amazonaws.com/")){
      return route.fulfill({status:200,contentType:"image/gif",body:PIXEL});
    }
    if(u.startsWith("https://")) return route.abort();
    return route.continue();
  });

  await page.goto(URL,{waitUntil:"load",timeout:30000});
  await page.waitForTimeout(300);

  const heroBox=await page.locator(".mt-hero-media").boundingBox();
  assert.ok(heroBox && Math.abs(heroBox.width/heroBox.height-1.15)<0.03,name+": hero box framing preserved");

  const heroCurrent=await page.locator(".mt-hero-media img").evaluate(img=>img.currentSrc);
  if(mobile){
    assert.ok(heroCurrent.includes("/assets/aria-higienopolis/hero-mobile-"),name+": responsive mobile hero selected");
    assert.equal(seen.some(u=>u.includes(HERO_ORIG)),false,name+": original 221KB hero not requested mobile");
  }else{
    assert.ok(heroCurrent.includes(HERO_ORIG),name+": desktop keeps Azure hero");
  }

  await page.locator("[data-aria-gallery]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const main=page.locator("[data-gallery-main]");
  const firstCurrent=await main.evaluate(img=>img.currentSrc);
  if(mobile){
    assert.ok(firstCurrent.includes("/assets/aria-higienopolis/gallery1-mobile-"),name+": responsive first gallery image selected");
    assert.equal(seen.some(u=>u.includes(GALLERY1_ORIG)),false,name+": original 315KB first gallery image not requested mobile");
    assert.ok(seen.some(u=>u.includes("/assets/aria-higienopolis/gallery1-thumb-240.webp")),name+": compact first thumbnail requested");

    await page.locator("[data-gallery-next]").click();
    await page.waitForTimeout(250);
    const secondCurrent=await main.evaluate(img=>img.currentSrc);
    assert.ok(secondCurrent.includes(GALLERY2_ORIG),name+": alternate gallery image still uses governed original source");
    assert.equal(await page.locator('[data-gallery-index="1"]').getAttribute("aria-current"),"true",name+": aria-current advances");

    await page.locator("[data-gallery-prev]").click();
    await page.waitForTimeout(250);
    const returned=await main.evaluate(img=>img.currentSrc);
    assert.ok(returned.includes("/assets/aria-higienopolis/gallery1-mobile-"),name+": responsive first image restored after navigation");
    assert.equal(await page.locator('[data-gallery-index="0"]').getAttribute("aria-current"),"true",name+": aria-current returns");
  }else{
    assert.ok(firstCurrent.includes(GALLERY1_ORIG),name+": desktop keeps original first gallery main");
  }

  console.log("PASS:",name,JSON.stringify({
    heroCurrent,
    galleryCurrent:await main.evaluate(img=>img.currentSrc),
    targetRequests:seen.filter(u=>u.includes("/assets/aria-higienopolis/")||u.includes(HERO_ORIG)||u.includes(GALLERY1_ORIG)||u.includes(GALLERY2_ORIG))
  }));
  await browser.close();
}

await run("mobile 393x852 DPR2.75",{width:393,height:852},2.75,true);
await run("mobile 360x800 DPR2",{width:360,height:800},2,true);
await run("desktop 1280x900 DPR1",{width:1280,height:900},1,false);
console.log("M5-10 Aria responsive media Slice 09 browser smoke: PASS");
