import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";
const pages=["kronos-by-tegra","gran-thai-leisure-residence","claris-casa-e-clube","claris-rosas","gaea-home-resort","singular-private-residence"];
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
fs.mkdirSync("/tmp/resf-rio-screenshots",{recursive:true});
let failures=[];
for(const [mode,viewport] of Object.entries({mobile:{width:390,height:844},desktop:{width:1440,height:900}})){
 const context=await browser.newContext({viewport,deviceScaleFactor:1,isMobile:mode==="mobile",hasTouch:mode==="mobile"});
 for(const slug of pages){
  const page=await context.newPage();
  // Consent/analytics and lead backends are disabled: screenshots must never submit real leads.
  await page.route(/(googletagmanager\.com|google-analytics\.com|back\.gdigital\.com\.br)/,route=>route.abort());
  const url="http://127.0.0.1:4173/src-greenn/empreendimentos/"+slug+"/index.html";
  try{
   await page.goto(url,{waitUntil:"domcontentloaded",timeout:30000});
   await page.locator(".hero .hero-content h1").waitFor({state:"visible",timeout:10000});
   await page.waitForTimeout(700);
   const loaded=await page.locator(".hero-poster").evaluate(img=>Promise.race([
     img.decode().then(()=>img.naturalWidth>0).catch(()=>false),
     new Promise(resolve=>setTimeout(()=>resolve(false),10000))
   ]));
   if(!loaded)throw Error("hero image did not load in browser; verify media source and hotlink policy");
   const x=await page.evaluate(()=>{
    const hero=document.querySelector(".hero"),facts=document.querySelectorAll(".facts .fact"),h1=document.querySelector(".hero-content h1");
    const r=f=>{const x=f.getBoundingClientRect();return {x:Math.round(x.x),y:Math.round(x.y),width:Math.round(x.width),height:Math.round(x.height)}};
    return {viewport:window.innerWidth,scrollWidth:document.documentElement.scrollWidth,hero:r(hero),h1:r(h1),
      cta:r(document.querySelector(".hero .button")),heroImg:!!document.querySelector(".hero .hero-poster"),facts:Array.from(facts,r),
      styleLoaded:getComputedStyle(hero).position==="relative",main:!!document.querySelector("#conteudo"),form:!!document.querySelector("#moretegra-lead-form")};
   });
   if(!x.styleLoaded||!x.main||!x.form||!x.heroImg)throw Error("RESF CSS, main, hero or form missing: "+JSON.stringify(x));
   if(x.scrollWidth>x.viewport+3)throw Error("horizontal overflow "+JSON.stringify(x));
   if(x.facts.length!==4)throw Error("not four facts");
   if(mode==="mobile"&&Math.abs(x.facts[0].x-x.facts[1].x)<30)throw Error("facts missing mobile two-column layout");
   if(mode==="desktop"&&Math.abs(x.facts[0].x-x.facts[1].x)<30)throw Error("facts missing desktop four-column layout");
   if(x.h1.width<=0||x.cta.width<=0)throw Error("hero H1 or CTA not visible");
   await page.locator("[data-gallery-next]").click();
   await page.waitForTimeout(550);
   const status=await page.locator("[data-gallery-status]").textContent();
   const expected=slug==="claris-rosas"?3:slug==="kronos-by-tegra"?12:10;
   if(status.trim()!=="2 / "+expected)throw Error("gallery touch/click navigation failed: "+status);
   if(mode==="desktop"){
     const media=await page.locator(".rio-gallery-track img").evaluateAll(async imgs=>Promise.all(imgs.map(async img=>{
       img.loading="eager";
       try{await Promise.race([img.decode(),new Promise((_,reject)=>setTimeout(()=>reject(Error("timeout")),12000))]);return {src:img.currentSrc||img.src,ok:img.naturalWidth>0};}
       catch(e){return {src:img.currentSrc||img.src,ok:false,error:String(e)}}
     })));
     const broken=media.filter(x=>!x.ok);
     if(broken.length)throw Error("broken gallery media: "+JSON.stringify(broken));
   }
   const count=await page.locator(".rio-gallery-track .rio-gallery-slide").count();
   if(count!==expected)throw Error("gallery scene count mismatch: "+count+" expected "+expected);
   const sectionCount=await page.locator("#plantas-oficiais").count();
   if(sectionCount!==1)throw Error("dedicated floorplan/implantation section missing");
   const file="/tmp/resf-rio-screenshots/"+slug+"-"+mode+".png";
   await page.screenshot({path:file,fullPage:true,animations:"disabled",timeout:30000});
   console.log("PASS",slug,mode,JSON.stringify({viewport:x.viewport,scrollWidth:x.scrollWidth,hero:x.hero.height,cta:x.cta.width,facts:x.facts.length}));
  }catch(e){failures.push(slug+" "+mode+": "+e.message);console.error("FAIL",slug,mode,e.message)}
  finally{await page.close()}
 }
 await context.close();
}
await browser.close();
assert.equal(failures.length,0,failures.join("\n"));
console.log("PASS: 6 RJ RESF pages x 2 viewports, no horizontal overflow, screenshots captured");
