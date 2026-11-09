import assert from "node:assert/strict";
import fs from "node:fs";
import {chromium} from "playwright";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
fs.mkdirSync("/tmp/rio-home-screenshots",{recursive:true});
const failures=[];
for(const [label,viewport] of Object.entries({mobile:{width:390,height:844},desktop:{width:1440,height:900}})){
 const ctx=await browser.newContext({viewport,isMobile:label==="mobile",hasTouch:label==="mobile",deviceScaleFactor:1});
 const page=await ctx.newPage();
 await page.route(/(googletagmanager\.com|google-analytics\.com|back\.gdigital\.com\.br)/,route=>route.abort());
 try{
  const resp=await page.goto("http://127.0.0.1:4173/rio-de-janeiro/",{waitUntil:"domcontentloaded",timeout:30000});
  assert.equal(resp.status(),200,"city route must work");
  await page.locator(".rio-hero h1").waitFor({state:"visible",timeout:12000});
  await page.waitForTimeout(500);
  const measure=await page.evaluate(()=>{
   const hero=document.querySelector(".rio-hero");
   return {viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,heroHeight:hero.getBoundingClientRect().height,
    css: getComputedStyle(hero).position, cards:document.querySelectorAll("[data-rio-card]").length,
    image:document.querySelector(".rio-hero-media img")?.getAttribute("src")||""};
  });
  assert.equal(measure.css,"relative","CSS must be loaded");
  assert(measure.scrollWidth<=measure.viewport+3,"no horizontal overflow: "+JSON.stringify(measure));
  assert.equal(measure.cards,7,"seven cards must be present");
  const pricing=await page.locator("[data-rio-card] .rio-reference-price strong").allTextContents();
  assert.deepEqual(pricing,["R$ 1.471.000","R$ 2.148.000","R$ 3.473.000","R$ 3.647.000","R$ 2.221.000","R$ 3.610.000","R$ 8.212.000"],"reference prices in cards");
  assert.equal(await page.locator(".rio-price-note").count(),0,"sales page must not include an editorial price warning");

  const image=await page.locator(".rio-hero-media img").evaluate(async img=>{
   try{await Promise.race([img.decode(),new Promise((_,reject)=>setTimeout(()=>reject(new Error("timeout")),10000))]);return {ok:img.naturalWidth>0,width:img.naturalWidth};}catch(e){return {ok:false,error:String(e)}}
  });
  assert(image.ok,"Rio panoramic hero image did not load: "+JSON.stringify(image));
  if(label==="desktop"){
   const media=await page.locator(".rio-project-media img").evaluateAll(async imgs=>Promise.all(imgs.map(async img=>{
     img.loading="eager";
     try{await Promise.race([img.decode(),new Promise((_,reject)=>setTimeout(()=>reject(Error("timeout")),12000))]);return {src:img.currentSrc||img.src,ok:img.naturalWidth>0};}
     catch(e){return {src:img.currentSrc||img.src,ok:false,error:String(e)}}
   })));
   const broken=media.filter(m=>!m.ok);
   assert.equal(broken.length,0,"project cards must not have broken images: "+JSON.stringify(broken));
   console.log("PASS seven project card images decoded",media.length);
  }
  const agent=page.locator(".rio-agent-photo img");
  assert.equal(await agent.count(),1,"Sabrina portrait must be present");
  // The portrait is loading="lazy" below the fold: bring it into view so the browser actually fetches it before decode().
  await agent.scrollIntoViewIfNeeded();
  const agentImage=await agent.evaluate(async img=>{try{await Promise.race([img.decode(),new Promise((_,reject)=>setTimeout(()=>reject(Error("timeout")),12000))]);return {ok:img.naturalWidth>0,width:img.naturalWidth};}catch(e){return {ok:false,error:String(e)}}});
  assert(agentImage.ok,"approved Sabrina portrait did not decode: "+JSON.stringify(agentImage));
  console.log("PASS canonical Sabrina photo",label,agentImage.width);
  assert.equal(await page.locator("[data-rio-card]:visible").count(),7,"show all projects");
  await page.locator("#rio-busca").fill("Kronos");
  assert.equal(await page.locator("[data-rio-card]:visible").count(),1,"search by name");
  await page.locator("#rio-limpar").click();
  assert.equal(await page.locator("[data-rio-card]:visible").count(),7,"clear filters");
  await page.locator("#rio-tipo").selectOption("casas");
  assert.equal(await page.locator("[data-rio-card]:visible").count(),2,"two Claris houses");
  await page.locator("#rio-limpar").click();
  await page.locator("#rio-estagio").selectOption("Lançamento");
  assert.equal(await page.locator("[data-rio-card]:visible").count(),1,"stage filter");
  await page.locator("#rio-limpar").click();
  await page.locator("#rio-metragem").selectOption("450");
  assert.equal(await page.locator("[data-rio-card]:visible").count(),4,"area filter (Claris 2 + RIIO + Singular)");
  await page.locator("#rio-limpar").click();
  await page.locator("[data-rio-interest]").first().click();
  assert.equal(await page.locator("#moretegra-lead-form").getAttribute("data-selected-project"),"Kronos by Tegra","interest carried into Form46");
  await page.locator("#mt-lead-name").fill("Teste Interno");
  await page.locator("#mt-lead-email").fill("teste@example.com");
  await page.locator("#mt-lead-phone").fill("(11) 99999-9999");
  await page.locator("[data-moretegra-form-submit]").click();
  await page.waitForTimeout(450);
  const msg=(await page.locator("#mt-lead-status").textContent())||"";
  assert(msg.includes("somente em www.moretegra.com.br"),"local mode must not send a real lead: "+msg);
  await page.locator("#rio-limpar").click();
  await page.screenshot({path:"/tmp/rio-home-screenshots/rio-home-"+label+".png",fullPage:true,animations:"disabled",timeout:30000});
  console.log("PASS",label,JSON.stringify(measure),"hero loaded",image.width,"Form46 local protected");
 }catch(e){failures.push(label+": "+e.message);console.error("FAIL",label,e.message)}
 finally{await page.close();await ctx.close()}
}
await browser.close();
assert.equal(failures.length,0,failures.join("\n"));
console.log("PASS Rio City Home: filters, responsive, photo, lead intent, local-only Form46");
