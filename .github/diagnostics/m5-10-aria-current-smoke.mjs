import assert from "node:assert/strict";
import { chromium } from "playwright";
const URL="https://www.moretegra.com.br/empreendimentos/aria-higienopolis/";
const HERO="ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada";
const GALLERY="309b34e4-72f0-48d0-a8f8-1f8e94a90cbb";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const context=await browser.newContext({viewport:{width:393,height:852},deviceScaleFactor:2.75});
const page=await context.newPage();
const seen=[];
page.on("request",req=>{const u=req.url();if(u.includes(HERO)||u.includes(GALLERY)||u.includes("back.gdigital.com.br/form/register"))seen.push(u);});
await page.goto(URL,{waitUntil:"load",timeout:60000});
await page.waitForTimeout(500);
const heroBox=await page.locator(".mt-hero-media").boundingBox();
assert.ok(heroBox,"hero visible");
await page.locator("[data-aria-gallery]").scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
const galleryBox=await page.locator("[data-gallery-main]").boundingBox();
assert.ok(galleryBox,"gallery visible after scroll");
console.log("ARIA_CURRENT_SMOKE",JSON.stringify({
  heroBox,galleryBox,
  heroRequests:seen.filter(u=>u.includes(HERO)).length,
  galleryRequests:seen.filter(u=>u.includes(GALLERY)).length,
  leadPosts:seen.filter(u=>u.includes("back.gdigital.com.br/form/register")).length
}));
await browser.close();
