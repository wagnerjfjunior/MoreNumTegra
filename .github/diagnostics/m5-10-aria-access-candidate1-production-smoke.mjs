import assert from "node:assert/strict";
import { chromium } from "playwright";

const URL="https://www.moretegra.com.br/empreendimentos/aria-higienopolis/";
const CANDIDATE="/assets/aria-higienopolis/candidate1/hero-access-mobile-828.webp";
const GREEN_FALLBACK="Ária Higienópolis-Perspectiva ilustrada do acesso residencial..webp";
const GALLERY="/assets/aria-higienopolis/gallery1-mobile-828.webp";

const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const context=await browser.newContext({viewport:{width:393,height:852},deviceScaleFactor:2.75});
const page=await context.newPage();
const seen=[];

page.on("request",req=>{
  const u=req.url();
  if(
    u.includes("/assets/aria-higienopolis/") ||
    decodeURIComponent(u).includes(GREEN_FALLBACK) ||
    u.includes("googletagmanager.com/gtm.js") ||
    u.includes("googletagmanager.com/gtag/js") ||
    u.includes("back.gdigital.com.br/form/register")
  ) seen.push(u);
});

await page.goto(URL,{waitUntil:"load",timeout:60000});
await page.waitForTimeout(700);

const hero=page.locator(".mt-hero-media img");
const heroCurrent=await hero.evaluate(img=>img.currentSrc);
assert.ok(heroCurrent.includes(CANDIDATE),"Production mobile should select candidate1 828w");
assert.equal(seen.some(u=>decodeURIComponent(u).includes(GREEN_FALLBACK)),false,"Green 219KB fallback must not download on mobile");

await page.locator("[data-aria-gallery]").scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
const galleryCurrent=await page.locator("[data-gallery-main]").evaluate(img=>img.currentSrc);
assert.ok(galleryCurrent.includes(GALLERY),"retained responsive gallery must remain selected");

assert.equal(seen.filter(u=>u.includes("back.gdigital.com.br/form/register")).length,0,"QA must not submit Form46");

console.log("ARIA_ACCESS_CANDIDATE1_PROD_SMOKE_PASS",JSON.stringify({
  heroCurrent,
  galleryCurrent,
  gtm:seen.filter(u=>u.includes("googletagmanager.com/gtm.js")).length,
  gtag:seen.filter(u=>u.includes("googletagmanager.com/gtag/js")).length,
  leadPosts:0
}));
await browser.close();
