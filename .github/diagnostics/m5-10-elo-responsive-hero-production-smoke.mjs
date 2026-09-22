import assert from "node:assert/strict";
import { chromium } from "playwright";

const URL="https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
const ORIGINAL="Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp";

const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const context=await browser.newContext({viewport:{width:393,height:852},deviceScaleFactor:2.75});
const page=await context.newPage();
const seen=[];
page.on("request",req=>{
  const u=req.url();
  if(u.includes("/assets/elo-duo/hero-mobile-")||u.includes(ORIGINAL)||u.includes("googletagmanager.com/gtm.js")||u.includes("googletagmanager.com/gtag/js")||u.includes("back.gdigital.com.br/form/register")) seen.push(u);
});
await page.goto(URL,{waitUntil:"load",timeout:60000});
await page.waitForTimeout(1000);

const hero=seen.filter(u=>u.includes("/assets/elo-duo/hero-mobile-")||u.includes(ORIGINAL));
assert.ok(hero.some(u=>u.includes("hero-mobile-828.webp")||u.includes("hero-mobile-640.webp")),"mobile derivative must load in Production");
assert.equal(hero.some(u=>u.includes(ORIGINAL)),false,"160.9KB original must not load in mobile Production");
assert.equal(seen.filter(u=>u.includes("googletagmanager.com/gtm.js")).length,1,"late GTM remains single");
assert.equal(seen.filter(u=>u.includes("googletagmanager.com/gtag/js")).length,1,"GA4 tag remains single");
assert.equal(seen.filter(u=>u.includes("back.gdigital.com.br/form/register")).length,0,"QA must not submit Form46");

const box=await page.locator(".mt-hero-media").boundingBox();
assert.ok(box && Math.abs((box.width/box.height)-1.15)<0.03,"hero framing remains 1.15/1");
console.log("PROD_SMOKE_PASS",JSON.stringify({hero,box,gtm:1,gtag:1,leadPosts:0}));
await browser.close();
