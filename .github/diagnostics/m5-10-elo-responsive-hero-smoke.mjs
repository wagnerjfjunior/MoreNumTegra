import assert from "node:assert/strict";
import { chromium } from "playwright";

const URL="http://127.0.0.1:4173/empreendimentos/caminhos-da-lapa-elo-duo/";
const ORIGINAL="Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp";

async function scenario(name,viewport,deviceScaleFactor,expected){
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const context=await browser.newContext({viewport,deviceScaleFactor});
  const page=await context.newPage();
  const requests=[];

  await page.route("**/*", async route=>{
    const url=route.request().url();
    if(url.includes("googletagmanager.com/") || url.includes("google-analytics.com/")) return route.abort();
    if(url.includes("s3-gdigital.s3.amazonaws.com/") || url.includes("stracctegra.blob.core.windows.net/")){
      requests.push(url);
      return route.fulfill({status:200,contentType:"image/gif",body:Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==","base64")});
    }
    return route.continue();
  });

  page.on("request",req=>{
    const u=req.url();
    if(u.includes("/assets/elo-duo/hero-mobile-") || u.includes(ORIGINAL)) requests.push(u);
  });

  await page.goto(URL,{waitUntil:"load",timeout:30000});
  await page.waitForTimeout(300);

  const box=await page.locator(".mt-hero-media").boundingBox();
  assert.ok(box && box.width>0 && box.height>0,name+": hero box rendered");
  assert.ok(Math.abs((box.width/box.height)-1.15)<0.03,name+": existing hero aspect ratio preserved");

  const mobile640=requests.some(u=>u.includes("hero-mobile-640.webp"));
  const mobile828=requests.some(u=>u.includes("hero-mobile-828.webp"));
  const original=requests.some(u=>u.includes(ORIGINAL));

  if(expected==="mobile"){
    assert.ok(mobile640||mobile828,name+": a mobile derivative must load");
    assert.equal(original,false,name+": original 160.9KB hero must not load on mobile");
  } else {
    assert.equal(mobile640||mobile828,false,name+": mobile derivatives must not load on desktop");
    assert.equal(original,true,name+": original Green hero remains desktop source");
  }

  console.log("PASS:",name,JSON.stringify({box,requests:requests.filter(u=>u.includes("hero-mobile-")||u.includes(ORIGINAL))}));
  await browser.close();
}

await scenario("mobile 393x852 DPR2.75",{width:393,height:852},2.75,"mobile");
await scenario("mobile 360x800 DPR2",{width:360,height:800},2,"mobile");
await scenario("desktop 1280x900 DPR1",{width:1280,height:900},1,"desktop");
console.log("M5-10 Elo responsive hero Slice 08 browser smoke: PASS");
