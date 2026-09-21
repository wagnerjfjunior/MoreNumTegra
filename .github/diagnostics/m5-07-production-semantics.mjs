import { chromium } from "playwright";
import fs from "node:fs";

const BASE="https://www.moretegra.com.br";
const tests=[
  ["/",'a[data-form-intent="negotiate_scenario"]',"negotiate_scenario","form","negotiation"],
  ["/empreendimentos/capiitolo-piero-lissoni/",'.hero-cta[data-form-intent="conditions"]',"request_project_conditions","form","hero"],
  ["/empreendimentos/capiitolo-piero-lissoni/",'.tour-card a[data-form-intent="schedule_visit"]',"schedule_visit","form","content"],
  ["/empreendimentos/capiitolo-piero-lissoni/",".mnt-contact-float","request_project_conditions","form","floating"],
  ["/empreendimentos/capiitolo-piero-lissoni/",".mnt-whatsapp-float","whatsapp_contact","whatsapp","floating"],
  ["/empreendimentos/aria-higienopolis/",'a[data-project-intent="schedule-visit"]',"schedule_visit","form","content"],
  ["/empreendimentos/aria-higienopolis/",'a[data-project-intent="payment-simulation"]',"negotiate_scenario","form","content"],
  ["/empreendimentos/aria-higienopolis/",'#visita a[href^="https://wa.me/"]',"schedule_visit","whatsapp","content"],
  ["/empreendimentos/aria-higienopolis/",".mt-quick-whatsapp","whatsapp_contact","whatsapp","floating"],
  ["/empreendimentos/caminhos-da-lapa-elo-duo/",'a[data-project-intent="conditions"]',"request_project_conditions","form","commercial_card"],
  ["/empreendimentos/caminhos-da-lapa-elo-duo/",".mt-quick-whatsapp","whatsapp_contact","whatsapp","floating"]
];

const browser=await chromium.launch({headless:true});
const rows=[];
for(const [path,selector,intent,channel,placement] of tests){
  const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
  const page=await context.newPage();
  const response=await page.goto(BASE+path,{waitUntil:"domcontentloaded",timeout:30000});
  if(!response?.ok()) throw new Error(path+" HTTP "+response?.status());
  await page.waitForSelector(selector,{state:"attached",timeout:20000});
  await page.locator(selector).first().evaluate(el=>el.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true})));
  await page.waitForTimeout(120);
  const evt=await page.evaluate(()=>[...(window.dataLayer||[])].reverse().find(x=>x?.event==="mnt_intent"));
  if(!evt) throw new Error("no mnt_intent for "+selector);
  if(evt.intent_type!==intent||evt.contact_channel!==channel||evt.placement!==placement){
    throw new Error(selector+" semantic mismatch: "+JSON.stringify(evt));
  }
  rows.push({path,selector,result:"PASS",intent_type:evt.intent_type,contact_channel:evt.contact_channel,placement:evt.placement,project_name:evt.project_name,offer_name:evt.offer_name});
  console.log(JSON.stringify(rows.at(-1)));
  await context.close();
}
await browser.close();
const summary={runtime_sha:"6dc362a63de8b797082fb1c7b4ac70a8a5aa2ae8",deployment:"dpl_AWHaTzE4UrJQaZ3LnKqhEMd8wsBs",pass:rows.length,fail:0,total:rows.length,rows};
fs.writeFileSync("m5-07-production-semantics.json",JSON.stringify(summary,null,2)+"\n");
console.log("FINAL_SUMMARY "+JSON.stringify({pass:rows.length,fail:0,total:rows.length}));
