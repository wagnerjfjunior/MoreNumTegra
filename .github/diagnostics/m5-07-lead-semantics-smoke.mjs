import { chromium, firefox, webkit } from "playwright";
import fs from "node:fs";
import path from "node:path";

const ROOT=process.cwd();
const BASE="https://www.moretegra.com.br";
const MAP=new Map([
  ["/","src-greenn/preview/index.html"],
  ["/empreendimentos/capiitolo-piero-lissoni/","src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html"],
  ["/empreendimentos/caminhos-da-lapa-elo-duo/","src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html"],
  ["/empreendimentos/aria-higienopolis/","src-greenn/empreendimentos/aria-higienopolis/index.html"],
  ["/obrigado/","src-greenn/preview/obrigado.html"],
  ["/experiments/capiitolo-editorial-v3/index.html","experiments/capiitolo-editorial-v3/index.html"]
]);

function typeOf(file){
  if(file.endsWith(".html")) return "text/html; charset=utf-8";
  if(file.endsWith(".js")) return "application/javascript; charset=utf-8";
  if(file.endsWith(".css")) return "text/css; charset=utf-8";
  return "text/plain; charset=utf-8";
}
async function localRoute(route){
  const u=new URL(route.request().url());
  if(u.origin==="https://back.gdigital.com.br" && u.pathname==="/form/register"){
    return route.fulfill({status:200,contentType:"application/json",headers:{"Access-Control-Allow-Origin":BASE},body:JSON.stringify({query_params:"?l_=2992&p_id=0"})});
  }
  if(u.origin!==BASE) return route.abort();
  let rel=MAP.get(u.pathname);
  if(!rel && (u.pathname.startsWith("/src-greenn/")||u.pathname.startsWith("/experiments/"))) rel=u.pathname.slice(1);
  if(!rel) return route.fulfill({status:404,body:"not found"});
  const file=path.join(ROOT,rel);
  if(!fs.existsSync(file)) return route.fulfill({status:404,body:"missing"});
  return route.fulfill({status:200,contentType:typeOf(file),body:fs.readFileSync(file)});
}
async function open(context,p){
  const page=await context.newPage();
  await page.route("**/*",localRoute);
  const response=await page.goto(BASE+p,{waitUntil:"domcontentloaded",timeout:30000});
  if(!response?.ok()) throw new Error("HTTP "+response?.status()+" for "+p);
  await page.waitForTimeout(300);
  return page;
}
async function dataLayer(page){return page.evaluate(()=>window.dataLayer||[])}
async function semantic(page,selector,expected){
  await page.waitForSelector(selector,{state:"attached",timeout:20000});
  await page.locator(selector).first().evaluate(el=>el.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true})));
  await page.waitForTimeout(100);
  const events=await dataLayer(page);
  const evt=[...events].reverse().find(x=>x?.event==="mnt_intent");
  if(!evt) throw new Error("no mnt_intent for "+selector);
  for(const [key,value] of Object.entries(expected)){
    if(evt[key]!==value) throw new Error(selector+": expected "+key+"="+value+", got "+evt[key]);
  }
  return evt;
}
const rows=[];
function pass(browser,test,event){rows.push({browser,test,result:"PASS",event});console.log(JSON.stringify(rows.at(-1)))}

for(const [browserName,engine] of Object.entries({chromium,firefox,webkit})){
  const browser=await engine.launch({headless:true});

  {
    const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
    const page=await open(context,"/");
    const evt=await semantic(page,'a[data-form-intent="negotiate_scenario"]',{intent_type:"negotiate_scenario",contact_channel:"form",placement:"negotiation"});
    pass(browserName,"home-negotiate",evt);
    await context.close();
  }

  {
    const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
    const page=await open(context,"/empreendimentos/capiitolo-piero-lissoni/");
    let evt=await semantic(page,'.hero-cta[data-form-intent="conditions"]',{intent_type:"request_project_conditions",contact_channel:"form",placement:"hero",project_name:"CAPIITOLO by Piero Lissoni",offer_name:"CAPIITOLO by Piero Lissoni"});
    pass(browserName,"capiitolo-conditions",evt);
    evt=await semantic(page,'.tour-card a[data-form-intent="schedule_visit"]',{intent_type:"schedule_visit",contact_channel:"form",placement:"content",project_name:"CAPIITOLO by Piero Lissoni"});
    pass(browserName,"capiitolo-visit",evt);
    await page.waitForSelector(".mnt-contact-float",{state:"attached",timeout:20000});
    evt=await semantic(page,".mnt-contact-float",{intent_type:"request_project_conditions",contact_channel:"form",placement:"floating",project_name:"CAPIITOLO by Piero Lissoni"});
    pass(browserName,"capiitolo-floating-form",evt);
    evt=await semantic(page,".mnt-whatsapp-float",{intent_type:"whatsapp_contact",contact_channel:"whatsapp",placement:"floating",project_name:"CAPIITOLO by Piero Lissoni"});
    pass(browserName,"capiitolo-floating-whatsapp",evt);
    await context.close();
  }

  {
    const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
    const page=await open(context,"/empreendimentos/aria-higienopolis/");
    let evt=await semantic(page,'a[data-project-intent="schedule-visit"]',{intent_type:"schedule_visit",contact_channel:"form",placement:"content",project_name:"Ária Higienópolis"});
    pass(browserName,"aria-visit-form",evt);
    evt=await semantic(page,'a[data-project-intent="payment-simulation"]',{intent_type:"negotiate_scenario",contact_channel:"form",placement:"content",project_name:"Ária Higienópolis"});
    pass(browserName,"aria-payment",evt);
    evt=await semantic(page,'#visita a[href^="https://wa.me/"]',{intent_type:"schedule_visit",contact_channel:"whatsapp",placement:"content",project_name:"Ária Higienópolis"});
    pass(browserName,"aria-visit-whatsapp",evt);
    evt=await semantic(page,'.mt-quick-whatsapp',{intent_type:"whatsapp_contact",contact_channel:"whatsapp",placement:"floating",project_name:"Ária Higienópolis"});
    pass(browserName,"aria-floating-whatsapp",evt);
    await context.close();
  }

  {
    const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
    const page=await open(context,"/empreendimentos/caminhos-da-lapa-elo-duo/");
    let evt=await semantic(page,'a[data-project-intent="conditions"]',{intent_type:"request_project_conditions",contact_channel:"form",placement:"commercial_card",project_name:"Caminhos da Lapa Elo Duo"});
    pass(browserName,"elo-conditions",evt);
    evt=await semantic(page,'.mt-quick-whatsapp',{intent_type:"whatsapp_contact",contact_channel:"whatsapp",placement:"floating",project_name:"Caminhos da Lapa Elo Duo"});
    pass(browserName,"elo-floating-whatsapp",evt);
    await context.close();
  }

  await browser.close();
}

// Candidate-only provider mock: proves v2 marker -> thank-you source event, with no real Green lead.
{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
  const page=await open(context,"/");
  const card=page.locator("[data-interest]").first();
  await card.waitFor({state:"attached",timeout:20000});
  const offer=String(await card.getAttribute("data-interest")||"").trim();
  if(!offer) throw new Error("candidate card has no data-interest");
  await card.evaluate(el=>el.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true})));
  await page.waitForTimeout(80);
  await page.locator('[data-moretegra-lead-form] input[name="nome"]').fill("Teste M507");
  await page.locator('[data-moretegra-lead-form] input[name="email"]').fill("m507@example.invalid");
  await page.locator('[data-moretegra-lead-form] input[name="telefone_display"]').fill("(11) 98888-7777");
  await page.locator('[data-moretegra-lead-form] button[type="submit"]').click();
  await page.waitForURL(/\/obrigado\//,{timeout:20000});
  await page.waitForTimeout(300);
  const leadEvents=(await dataLayer(page)).filter(x=>x?.event==="mnt_lead_success");
  if(leadEvents.length!==1) throw new Error("expected one mnt_lead_success, got "+leadEvents.length);
  const lead=leadEvents[0];
  if(!lead.project_name||!lead.offer_name) throw new Error("missing project context: "+JSON.stringify(lead));
  if(lead.offer_name!==offer) throw new Error("offer mismatch: expected "+offer+", got "+lead.offer_name);
  const serialized=JSON.stringify(lead);
  for(const forbidden of ["Teste M507","m507@example.invalid","98888","texto-livre"]){
    if(serialized.includes(forbidden)) throw new Error("PII/raw-form leakage: "+forbidden);
  }
  const markerState=await page.evaluate(()=>({v2:sessionStorage.getItem("mnt.lead.pending.v2"),v1:sessionStorage.getItem("mnt.lead.pending.v1")}));
  if(markerState.v2!==null||markerState.v1!==null) throw new Error("marker not consumed: "+JSON.stringify(markerState));
  pass("chromium","lead-success-v2-context-no-pii",lead);

  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForTimeout(200);
  const refreshLead=(await dataLayer(page)).filter(x=>x?.event==="mnt_lead_success");
  if(refreshLead.length!==0) throw new Error("refresh manufactured duplicate lead");
  pass("chromium","lead-success-refresh-dedup");
  await context.close();
  await browser.close();
}

// Legacy v1 remains accepted during rollout but cannot invent project context.
{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext();
  await context.addInitScript(()=>{if(location.hostname==="www.moretegra.com.br"&&location.pathname.startsWith("/obrigado"))sessionStorage.setItem("mnt.lead.pending.v1",String(Date.now()))});
  const page=await open(context,"/obrigado/");
  const leadEvents=(await dataLayer(page)).filter(x=>x?.event==="mnt_lead_success");
  if(leadEvents.length!==1) throw new Error("legacy v1 marker not accepted: "+leadEvents.length);
  if("project_name" in leadEvents[0]||"offer_name" in leadEvents[0]) throw new Error("legacy marker invented project context");
  pass("chromium","legacy-v1-rollout-compatibility",leadEvents[0]);
  await context.close();
  await browser.close();
}

console.log("FINAL_SUMMARY "+JSON.stringify({pass:rows.length,fail:0,total:rows.length}));
