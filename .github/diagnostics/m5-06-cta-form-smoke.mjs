import { chromium, firefox, webkit } from "playwright";

const ORIGIN="http://127.0.0.1:4173";
const cases=[
  {name:"home-negotiate",path:"/",cta:'a[data-form-intent="negotiate_scenario"]',expected:"Negociar meu cenário"},
  {name:"home-conditions",path:"/",cta:'.mt-hero a[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"elo-conditions",path:"/empreendimentos/caminhos-da-lapa-elo-duo/",cta:'a[data-project-intent="conditions"][data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"aria-visit",path:"/empreendimentos/aria-higienopolis/",cta:'a[data-project-intent="schedule-visit"][data-form-intent="schedule_visit"]',expected:"Agendar visita"},
  {name:"aria-payment",path:"/empreendimentos/aria-higienopolis/",cta:'a[data-project-intent="payment-simulation"][data-form-intent="payment_simulation"]',expected:"Simular forma de pagamento"},
  {name:"capiitolo-conditions",path:"/empreendimentos/capiitolo-piero-lissoni/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"capiitolo-visit",path:"/empreendimentos/capiitolo-piero-lissoni/",cta:'.tour-card a[data-form-intent="schedule_visit"]',expected:"Agendar visita"}
];

for(const [browserName,type] of Object.entries({chromium,firefox,webkit})){
  const browser=await type.launch({headless:true});
  for(const test of cases){
    const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
    const page=await context.newPage();
    const response=await page.goto(ORIGIN+test.path,{waitUntil:"domcontentloaded",timeout:30000});
    if(!response?.ok()) throw new Error(`${browserName}/${test.name}: HTTP ${response?.status()}`);
    await page.waitForSelector('[data-moretegra-lead-form] select[name="texto-livre"]',{state:"attached",timeout:20000});
    await page.waitForSelector(test.cta,{state:"attached",timeout:20000});
    const ctaText=(await page.locator(test.cta).first().innerText()).replace(/\s+/g," ").trim();
    await page.locator(test.cta).first().tap();
    await page.waitForTimeout(80);
    const selected=await page.locator('[data-moretegra-lead-form] select[name="texto-livre"]').inputValue();
    if(selected!==test.expected) throw new Error(`${browserName}/${test.name}: expected ${test.expected}, got ${selected}`);
    console.log(JSON.stringify({browser:browserName,test:test.name,cta:ctaText,selected,result:"PASS"}));
    await context.close();
  }

  const context=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
  const page=await context.newPage();
  await page.goto(ORIGIN+"/empreendimentos/capiitolo-piero-lissoni/",{waitUntil:"domcontentloaded",timeout:30000});
  await page.waitForSelector("h1",{state:"visible",timeout:20000});
  const title=await page.title();
  const h1=(await page.locator("h1").first().innerText()).replace(/\s+/g," ").trim();
  const body=await page.locator("body").innerText();
  const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
  if(title!=="CAPIITOLO Tegra Chácara Klabin | Piero Lissoni") throw new Error(`${browserName}: CAPIITOLO title changed: ${title}`);
  if(h1!=="CAPIITOLO Tegra Chácara Klabin") throw new Error(`${browserName}: CAPIITOLO H1 changed: ${h1}`);
  if(!body.includes("Capitolo Tegra")||!body.includes("Capitolo by Piero Lissoni")) throw new Error(`${browserName}: Capitolo search variant missing`);
  if(canonical!=="https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/") throw new Error(`${browserName}: canonical changed: ${canonical}`);
  console.log(JSON.stringify({browser:browserName,test:"capiitolo-seo-brand",title,h1,canonical,variant:true,result:"PASS"}));
  await context.close();
  await browser.close();
}
