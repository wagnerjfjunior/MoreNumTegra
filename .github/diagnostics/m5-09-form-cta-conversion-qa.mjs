import { chromium, firefox, webkit } from "playwright";
import fs from "node:fs";
import path from "node:path";

const ROOT=process.cwd();
const LIVE="https://www.moretegra.com.br";
const LOCAL="https://www.moretegra.com.br";
const MAP=new Map([
 ["/","src-greenn/preview/index.html"],
 ["/empreendimentos/capiitolo-piero-lissoni/","src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html"],
 ["/empreendimentos/caminhos-da-lapa-elo-duo/","src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html"],
 ["/empreendimentos/aria-higienopolis/","src-greenn/empreendimentos/aria-higienopolis/index.html"],
 ["/experiments/capiitolo-editorial-v3/index.html","experiments/capiitolo-editorial-v3/index.html"]
]);
const cases=[
 {name:"home-negotiate",path:"/",cta:'a[data-form-intent="negotiate_scenario"]',selected:"Negociar meu cenário",intent:"negotiate_scenario"},
 {name:"home-conditions",path:"/",cta:'.mt-hero a[data-form-intent="conditions"]',selected:"Condições e disponibilidade",intent:"request_conditions"},
 {name:"elo-conditions",path:"/empreendimentos/caminhos-da-lapa-elo-duo/",cta:'a[data-project-intent="conditions"][data-form-intent="conditions"]',selected:"Condições e disponibilidade",intent:"request_project_conditions"},
 {name:"aria-visit",path:"/empreendimentos/aria-higienopolis/",cta:'a[data-project-intent="schedule-visit"][data-form-intent="schedule_visit"]',selected:"Agendar visita",intent:"schedule_visit"},
 {name:"aria-payment",path:"/empreendimentos/aria-higienopolis/",cta:'a[data-project-intent="payment-simulation"][data-form-intent="payment_simulation"]',selected:"Simular forma de pagamento",intent:"negotiate_scenario"},
 {name:"capiitolo-conditions",path:"/empreendimentos/capiitolo-piero-lissoni/",cta:'.hero-cta[data-form-intent="conditions"]',selected:"Condições e disponibilidade",intent:"request_project_conditions"},
 {name:"capiitolo-visit",path:"/empreendimentos/capiitolo-piero-lissoni/",cta:'.tour-card a[data-form-intent="schedule_visit"]',selected:"Agendar visita",intent:"schedule_visit"}
];
function typeOf(file){
 if(file.endsWith(".html"))return"text/html; charset=utf-8";
 if(file.endsWith(".js"))return"application/javascript; charset=utf-8";
 if(file.endsWith(".css"))return"text/css; charset=utf-8";
 return"text/plain; charset=utf-8";
}
async function localRoute(route){
 const u=new URL(route.request().url());
 if(u.origin!==LOCAL)return route.abort();
 let rel=MAP.get(u.pathname);
 if(!rel&&(u.pathname.startsWith("/src-greenn/")||u.pathname.startsWith("/experiments/")))rel=u.pathname.slice(1);
 if(!rel)return route.fulfill({status:404,body:"not found"});
 const file=path.join(ROOT,rel);
 if(!fs.existsSync(file))return route.fulfill({status:404,body:"missing"});
 return route.fulfill({status:200,contentType:typeOf(file),body:fs.readFileSync(file)});
}
async function runSurface(engine,browserName,surface,useLocal){
 const browser=await engine.launch({headless:true});
 let pass=0;
 for(const t of cases){
   const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
   const page=await context.newPage();
   if(useLocal)await page.route("**/*",localRoute);
   const response=await page.goto((useLocal?LOCAL:LIVE)+t.path,{waitUntil:"domcontentloaded",timeout:30000});
   if(!response?.ok())throw new Error(surface+"/"+browserName+"/"+t.name+": HTTP "+response?.status());
   await page.waitForSelector('[data-moretegra-lead-form] select[name="texto-livre"]',{state:"attached",timeout:20000});
   await page.waitForSelector(t.cta,{state:"attached",timeout:20000});
   await page.locator(t.cta).first().evaluate(el=>el.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true})));
   await page.waitForTimeout(120);
   const selected=await page.locator('[data-moretegra-lead-form] select[name="texto-livre"]').inputValue();
   if(selected!==t.selected)throw new Error(surface+"/"+browserName+"/"+t.name+": selected="+selected);
   const events=await page.evaluate(()=>window.dataLayer||[]);
   const intent=[...events].reverse().find(x=>x?.event==="mnt_intent");
   if(!intent||intent.intent_type!==t.intent)throw new Error(surface+"/"+browserName+"/"+t.name+": intent="+JSON.stringify(intent));
   const leads=events.filter(x=>x?.event==="mnt_lead_success").length;
   if(leads!==0)throw new Error(surface+"/"+browserName+"/"+t.name+": CTA manufactured lead");
   console.log(JSON.stringify({surface,browser:browserName,test:t.name,selected,intent_type:intent.intent_type,result:"PASS"}));
   pass++;
   await context.close();
 }
 await browser.close();
 return pass;
}
let total=0;
for(const [name,engine] of Object.entries({chromium,firefox,webkit})) total+=await runSurface(engine,name,"candidate",true);
for(const [name,engine] of Object.entries({chromium,firefox,webkit})) total+=await runSurface(engine,name,"production",false);
console.log("FINAL_SUMMARY "+JSON.stringify({pass:total,fail:0,total}));
