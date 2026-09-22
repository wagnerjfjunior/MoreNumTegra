import assert from "node:assert/strict";
import { chromium } from "playwright";

const URL="https://www.moretegra.com.br/empreendimentos/aria-higienopolis/";
const HERO_ORIG="ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada";
const G1_ORIG="309b34e4-72f0-48d0-a8f8-1f8e94a90cbb";
const G2_ORIG="71beba8c-baff-43aa-a782-9bbff8ad82e9";

const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const context=await browser.newContext({viewport:{width:393,height:852},deviceScaleFactor:2.75});
const page=await context.newPage();
const seen=[];
page.on("request",req=>{
  const u=req.url();
  if(
    u.includes("/assets/aria-higienopolis/") ||
    u.includes(HERO_ORIG) ||
    u.includes(G1_ORIG) ||
    u.includes(G2_ORIG) ||
    u.includes("googletagmanager.com/gtm.js") ||
    u.includes("googletagmanager.com/gtag/js") ||
    u.includes("back.gdigital.com.br/form/register")
  ) seen.push(u);
});

await page.goto(URL,{waitUntil:"load",timeout:60000});
await page.waitForTimeout(700);

const hero=await page.locator(".mt-hero-media img").evaluate(img=>img.currentSrc);
assert.ok(hero.includes("/assets/aria-higienopolis/hero-mobile-714.webp"),"Production mobile should select native-width-capped 714 hero");
assert.equal(seen.some(u=>u.includes(HERO_ORIG)),false,"Production mobile should not download original hero");

await page.locator("[data-aria-gallery]").scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);

const main=page.locator("[data-gallery-main]");
const first=await main.evaluate(img=>img.currentSrc);
assert.ok(first.includes("/assets/aria-higienopolis/gallery1-mobile-828.webp"),"Production mobile should select responsive first gallery image");
assert.equal(seen.some(u=>u.includes(G1_ORIG)),false,"Production mobile should not download original first gallery image");
assert.ok(seen.some(u=>u.includes("/assets/aria-higienopolis/gallery1-thumb-240.webp")),"compact first thumbnail should load");

await page.locator("[data-gallery-next]").click();
await page.waitForTimeout(300);
assert.ok((await main.evaluate(img=>img.currentSrc)).includes(G2_ORIG),"alternate gallery source remains original governed source");
assert.equal(await page.locator('[data-gallery-index="1"]').getAttribute("aria-current"),"true","aria-current advances");

await page.locator("[data-gallery-prev]").click();
await page.waitForTimeout(300);
assert.ok((await main.evaluate(img=>img.currentSrc)).includes("/assets/aria-higienopolis/gallery1-mobile-828.webp"),"responsive first image restores");
assert.equal(await page.locator('[data-gallery-index="0"]').getAttribute("aria-current"),"true","aria-current restores");

assert.equal(seen.filter(u=>u.includes("back.gdigital.com.br/form/register")).length,0,"QA must not submit Form46");
console.log("ARIA_RESPONSIVE_PROD_SMOKE_PASS",JSON.stringify({
  heroCurrent:hero,
  galleryCurrent:await main.evaluate(img=>img.currentSrc),
  gtm:seen.filter(u=>u.includes("googletagmanager.com/gtm.js")).length,
  gtag:seen.filter(u=>u.includes("googletagmanager.com/gtag/js")).length,
  leadPosts:0
}));
await browser.close();
