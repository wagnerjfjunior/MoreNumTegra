import { chromium, firefox, webkit } from "playwright";

const ORIGIN="http://127.0.0.1:4173";
const cases=[
  {name:"home-negotiate",path:"/",cta:'a[data-form-intent="negotiate_scenario"]',expected:"Negociar meu cenário"},
  {name:"home-conditions",path:"/",cta:'.mt-hero a[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"elo-conditions",path:"/empreendimentos/caminhos-da-lapa-elo-duo/",cta:'a[data-project-intent="conditions"][data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"aria-visit",path:"/empreendimentos/aria-higienopolis/",cta:'a[data-project-intent="schedule-visit"][data-form-intent="schedule_visit"]',expected:"Agendar visita"},
  {name:"aria-payment",path:"/empreendimentos/aria-higienopolis/",cta:'a[data-project-intent="payment-simulation"][data-form-intent="payment_simulation"]',expected:"Simular forma de pagamento"},
  {name:"ledge-conditions",path:"/empreendimentos/ledge-brooklin/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"ledge-visit",path:"/empreendimentos/ledge-brooklin/",cta:'.tour-card a[data-form-intent="schedule_visit"]',expected:"Agendar visita"},
  {name:"soma-conditions",path:"/empreendimentos/soma-perdizes/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"soma-floating-conditions",path:"/empreendimentos/soma-perdizes/",cta:'.mt-quick-lead[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"zahle-conditions",path:"/empreendimentos/zahle-jardins/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"zahle-floating-conditions",path:"/empreendimentos/zahle-jardins/",cta:'.mt-quick-lead[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"ypy-conditions",path:"/empreendimentos/ypy-alto-do-ipiranga/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"ypy-floating-conditions",path:"/empreendimentos/ypy-alto-do-ipiranga/",cta:'.mt-quick-lead[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"bem-conditions",path:"/empreendimentos/bem-moema/",cta:'.btn.yellow[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"bem-floating-conditions",path:"/empreendimentos/bem-moema/",cta:'.quick-lead[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"mozae-conditions",path:"/empreendimentos/mozae-higienopolis/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"mozae-floating-conditions",path:"/empreendimentos/mozae-higienopolis/",cta:'.mt-quick-lead[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"bueno-conditions",path:"/empreendimentos/bueno-brandao-257/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"bueno-floating-conditions",path:"/empreendimentos/bueno-brandao-257/",cta:'.mt-quick-lead[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"chateau-conditions",path:"/empreendimentos/chateau-jardin/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"chateau-floating-conditions",path:"/empreendimentos/chateau-jardin/",cta:'.mt-quick-lead[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"reserva-visit",path:"/empreendimentos/reserva-caminhos-da-lapa/",cta:'.hero-cta[data-form-intent="schedule_visit"]',expected:"Agendar visita"},
  {name:"reserva-floating-whatsapp",path:"/empreendimentos/reserva-caminhos-da-lapa/",cta:'.mt-quick-lead[data-project-intent="floating-conditions"]',kind:"external-whatsapp",expectedHref:"https://wa.me/5511960779328?text=Quero%20saber%20mais%20sobre%20o%20Reserva%20Caminhos%20da%20Lapa."},
  {name:"nova-conditions",path:"/empreendimentos/nova-vivere/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"nova-floating-conditions",path:"/empreendimentos/nova-vivere/",cta:'.mt-quick-lead[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"garden-conditions",path:"/empreendimentos/garden-design/",cta:'.hero-cta[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
  {name:"garden-floating-conditions",path:"/empreendimentos/garden-design/",cta:'.mt-quick-lead[data-form-intent="conditions"]',expected:"Condições e disponibilidade"},
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
    if(test.kind==="external-whatsapp"){
      const cta=page.locator(test.cta).first();
      const label=(await cta.innerText()).replace(/\\s+/g," ").trim();
      const href=await cta.getAttribute("href");
      if(label!=="Consulte disponibilidade"||href!==test.expectedHref)
        throw new Error(`${browserName}/${test.name}: availability WhatsApp label or approved URL drift: ${label} / ${href}`);
      if(await cta.getAttribute("target")!=="_blank" || !(await cta.getAttribute("rel"))?.includes("noopener"))
        throw new Error(`${browserName}/${test.name}: secure external target lost`);
      if(await cta.getAttribute("data-form-intent"))
        throw new Error(`${browserName}/${test.name}: external consultation must not masquerade as Form46 intent`);
      console.log(JSON.stringify({browser:browserName,test:test.name,cta:label,href,result:"PASS"}));
      await context.close();
      continue;
    }
    const ctaText=(await page.locator(test.cta).first().innerText()).replace(/\s+/g," ").trim();
    await page.locator(test.cta).first().tap();
    await page.waitForTimeout(80);
    const selected=await page.locator('[data-moretegra-lead-form] select[name="texto-livre"]').inputValue();
    const bueno=test.name.startsWith("bueno-");
    const expected=bueno?selected.startsWith("Condições e disponibilidade — Bueno Brandão 257, Apartamento tipo, 500 m², 5 vagas, referência R$ 21.750.000"):selected===test.expected;
    if(!expected) throw new Error(`${browserName}/${test.name}: expected ${test.expected}${bueno?" with Bueno 500 m² unit context":""}, got ${selected}`);
    console.log(JSON.stringify({browser:browserName,test:test.name,cta:ctaText,selected,result:"PASS"}));
    await context.close();
  }

  const homeContext=await browser.newContext({viewport:{width:393,height:852},hasTouch:true,locale:"pt-BR"});
  const homePage=await homeContext.newPage();
  await homePage.goto(ORIGIN+"/",{waitUntil:"domcontentloaded",timeout:30000});
  const somaCard=homePage.locator('.mt-project-card').filter({has:homePage.locator('h3',{hasText:"Soma Perdizes"})}).first();
  await somaCard.waitFor({state:"visible",timeout:20000});
  const searchLead=(await somaCard.locator(".mt-project-search-lead").innerText()).replace(/\s+/g," ").trim();
  if(searchLead!=="Studios e apartamentos Tegra em Perdizes.") throw new Error(`${browserName}/home-soma: unexpected search lead: ${searchLead}`);
  const info=(await somaCard.locator(".mt-project-info").innerText()).replace(/\s+/g," ").trim();
  if(!info.includes("apartamentos de 41m² e 45m²")||!info.includes("salas comerciais")) throw new Error(`${browserName}/home-soma: expanded product wording missing: ${info}`);
  const priceLabel=(await somaCard.locator('.mt-price-block span').first().innerText()).replace(/\s+/g," ").trim();
  if(priceLabel.toLocaleLowerCase("pt-BR")!=="preço a partir de") throw new Error(`${browserName}/home-soma: unexpected price label: ${priceLabel}`);
  await somaCard.locator('a[data-interest="Soma Perdizes"]').tap();
  const interest=homePage.locator("[data-interest-context]");
  await interest.waitFor({state:"visible",timeout:20000});
  const interestName=(await interest.locator("[data-interest-name]").innerText()).replace(/\s+/g," ").trim();
  if(interestName!=="Soma Perdizes") throw new Error(`${browserName}/home-soma: unexpected interest name: ${interestName}`);
  const galleryCount=await interest.locator("[data-interest-gallery] img").count();
  if(galleryCount<2) throw new Error(`${browserName}/home-soma: expected curated gallery with >=2 images, got ${galleryCount}`);
  if(await interest.locator("[data-continue-form]").count()!==1) throw new Error(`${browserName}/home-soma: continue-form CTA missing`);
  const selectedProject=await homePage.locator("[data-moretegra-lead-form]").getAttribute("data-selected-project");
  if(selectedProject!=="Soma Perdizes") throw new Error(`${browserName}/home-soma: form selected project mismatch: ${selectedProject}`);
  console.log(JSON.stringify({browser:browserName,test:"home-soma-interest-gallery",searchLead,priceLabel,interestName,galleryCount,selectedProject,result:"PASS"}));
  await homeContext.close();

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
