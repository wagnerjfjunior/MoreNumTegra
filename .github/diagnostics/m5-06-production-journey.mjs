import { chromium, firefox, webkit } from "playwright";
import fs from "node:fs";

const BASE="https://www.moretegra.com.br";
const RUNTIME_SHA="be7f229ea04cf4050c40c471e21f262f4cfc845d";
const DEPLOYMENT="dpl_CZEKd9SmbVTx6T2L7y4rFkTRdQhP";
const cases=[
  {name:"home-negotiate",path:"/",cta:'a[data-form-intent="negotiate_scenario"]',expected:"Negociar meu cenário"},
  {name:"home-conditions",path:"/",cta:'.mt-hero a[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"elo-conditions",path:"/empreendimentos/caminhos-da-lapa-elo-duo/",cta:'a[data-project-intent="conditions"][data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"aria-visit",path:"/empreendimentos/aria-higienopolis/",cta:'a[data-project-intent="schedule-visit"][data-form-intent="schedule_visit"]',expected:"Agendar visita"},
  {name:"aria-payment",path:"/empreendimentos/aria-higienopolis/",cta:'a[data-project-intent="payment-simulation"][data-form-intent="payment_simulation"]',expected:"Simular forma de pagamento"},
  {name:"capiitolo-conditions",path:"/empreendimentos/capiitolo-piero-lissoni/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"capiitolo-visit",path:"/empreendimentos/capiitolo-piero-lissoni/",cta:'.tour-card a[data-form-intent="schedule_visit"]',expected:"Agendar visita"}
];

const rows=[];
function record(browser,test,result,evidence){
  const row={browser,test,result,evidence,runtime_sha:RUNTIME_SHA,deployment:DEPLOYMENT,observed_at:new Date().toISOString()};
  rows.push(row);
  console.log(JSON.stringify(row));
}

for(const [browserName,type] of Object.entries({chromium,firefox,webkit})){
  const browser=await type.launch({headless:true});
  for(const test of cases){
    const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
    await context.addInitScript(()=>{try{localStorage.setItem("mnt.consent.v1","granted")}catch{}});
    const page=await context.newPage();
    try{
      const response=await page.goto(BASE+test.path,{waitUntil:"domcontentloaded",timeout:30000});
      if(!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
      await page.waitForSelector('[data-moretegra-lead-form] select[name="texto-livre"]',{state:"attached",timeout:20000});
      await page.waitForSelector(test.cta,{state:"attached",timeout:20000});
      const label=(await page.locator(test.cta).first().innerText()).replace(/\s+/g," ").trim();
      await page.locator(test.cta).first().tap();
      await page.waitForTimeout(120);
      const selected=await page.locator('[data-moretegra-lead-form] select[name="texto-livre"]').inputValue();
      if(selected!==test.expected) throw new Error(`expected ${test.expected}, got ${selected}`);
      record(browserName,test.name,"PASS",`${label} -> ${selected}`);
    }catch(e){
      record(browserName,test.name,"FAIL",String(e));
    }
    await context.close();
  }

  const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
  await context.addInitScript(()=>{try{localStorage.setItem("mnt.consent.v1","granted")}catch{}});
  const page=await context.newPage();
  try{
    const response=await page.goto(BASE+"/empreendimentos/capiitolo-piero-lissoni/",{waitUntil:"domcontentloaded",timeout:30000});
    if(!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
    await page.waitForSelector("h1",{state:"visible",timeout:20000});
    const title=await page.title();
    const h1=(await page.locator("h1").first().innerText()).replace(/\s+/g," ").trim();
    const body=await page.locator("body").innerText();
    const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
    if(title!=="CAPIITOLO Tegra Chácara Klabin | Piero Lissoni") throw new Error(`title=${title}`);
    if(h1!=="CAPIITOLO Tegra Chácara Klabin") throw new Error(`h1=${h1}`);
    if(canonical!=="https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/") throw new Error(`canonical=${canonical}`);
    if(!body.includes("Capitolo Tegra")||!body.includes("Capitolo by Piero Lissoni")) throw new Error("Capitolo variant missing");
    record(browserName,"capiitolo-seo-brand","PASS",`title/H1 official CAPIITOLO; canonical unchanged; Capitolo variant present`);
  }catch(e){
    record(browserName,"capiitolo-seo-brand","FAIL",String(e));
  }
  await context.close();
  await browser.close();
}

const pass=rows.filter(r=>r.result==="PASS").length;
const fail=rows.filter(r=>r.result==="FAIL").length;
const summary={runtime_sha:RUNTIME_SHA,deployment:DEPLOYMENT,base:BASE,pass,fail,total:rows.length,rows};
fs.writeFileSync("m5-06-production-journey.json",JSON.stringify(summary,null,2)+"\n");
fs.writeFileSync("m5-06-production-journey.txt",`M5-06 PRODUCTION JOURNEY\nRUNTIME_SHA=${RUNTIME_SHA}\nDEPLOYMENT=${DEPLOYMENT}\nPASS=${pass}\nFAIL=${fail}\nTOTAL=${rows.length}\n`);
console.log("FINAL_SUMMARY",JSON.stringify({pass,fail,total:rows.length}));
if(fail>0) process.exit(1);
