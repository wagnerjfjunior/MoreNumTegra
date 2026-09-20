import { chromium, firefox, webkit } from "playwright";
const BASE="http://127.0.0.1:4173/src-greenn/empreendimentos/aria-higienopolis/index.html";
for(const [name,type] of Object.entries({chromium,firefox,webkit})){
  const b=await type.launch({headless:true});
  const c=await b.newContext({viewport:{width:393,height:852},locale:"pt-BR",hasTouch:true});
  const p=await c.newPage();
  const r=await p.goto(BASE,{waitUntil:"domcontentloaded",timeout:30000});
  if(!r?.ok()) throw new Error(`${name}: HTTP ${r?.status()}`);
  await p.waitForSelector("[data-gallery-next]",{state:"attached",timeout:15000});
  const box=await p.locator("[data-gallery-next]").boundingBox();
  if(!box||box.width<46||box.height<46) throw new Error(`${name}: gallery next box ${JSON.stringify(box)}`);
  const prev=await p.locator("[data-gallery-prev]").boundingBox();
  if(!prev||prev.width<46||prev.height<46) throw new Error(`${name}: gallery prev box ${JSON.stringify(prev)}`);
  const before=(await p.locator("[data-gallery-count]").textContent())?.trim();
  await p.locator("[data-gallery-next]").tap();
  await p.waitForTimeout(150);
  const after=(await p.locator("[data-gallery-count]").textContent())?.trim();
  if(before===after) throw new Error(`${name}: gallery did not advance`);
  const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);
  if(overflow) throw new Error(`${name}: horizontal overflow`);
  console.log(JSON.stringify({browser:name,next:box,prev,before,after,overflow:false,result:"PASS"}));
  await c.close(); await b.close();
}
