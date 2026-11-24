// A05: validate HTML-source + JS-hydrated regional links on an isolated local server.
// No provider POST, no deployment, no commercial data mutation.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { chromium } from "playwright";

const root=process.cwd(), origin="http://127.0.0.1:4179";
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".webp":"image/webp"};
const fixtures=[
  {name:"CAPIITOLO",page:"/empreendimentos/capiitolo-piero-lissoni/",region:"/regioes/chacara-klabin/",project:"CAPIITOLO by Piero Lissoni"},
  {name:"DSG Itaim",page:"/empreendimentos/dsg-itaim/",region:"/regioes/itaim-bibi/",project:"DSG Itaim"}
];
let writes=0,checks=0;
const server=createServer(async(req,res)=>{
  if(req.method!=="GET"){writes++;res.writeHead(405);res.end("No POST in local test");return;}
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,origin).pathname);}catch{res.writeHead(400);res.end();return;}
  if(/^\/(empreendimentos|regioes)\//.test(pathname))pathname="/src-greenn"+pathname;
  let file=resolve(root,"."+pathname);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  try{
    if((await stat(file)).isDirectory())file=resolve(file,"index.html");
    const body=await readFile(file);
    res.writeHead(200,{"Content-Type":mime[extname(file)]||"application/octet-stream","Cache-Control":"no-store"});
    res.end(body);
  }catch{res.writeHead(404);res.end("Missing "+pathname);}
});
await new Promise(ok=>server.listen(4179,"127.0.0.1",ok));
const pass=(name,data={})=>{checks++;console.log(JSON.stringify({name,status:"PASS",...data}))};
let browser;
try{
  for(const f of fixtures){
    const res=await fetch(origin+f.page);
    assert.equal(res.status,200,f.page+" initial status");
    const html=await res.text();
    assert.ok(html.includes('href="'+f.region+'"'),"source HTML missing internal regional link for "+f.name);
    assert.ok(html.includes('rel="canonical" href="https://www.moretegra.com.br'+f.page+'"'),"source canonical "+f.name);
    assert.ok(html.includes('content="index,follow'),"source indexability "+f.name);
    pass("source-html-region-and-seo",{page:f.name});
    if(f.name==="DSG Itaim"){
      assert.match(html,/A partir de R\$ 355\.000,00/,"shell price must match official Office reference");
      assert.match(html,/unidade 208 · Office · Nov\/26 · pagamento à vista/,"shell commercial unit and conditions mismatch");
      assert.ok(!/412\.500|Ago\/26/.test(html),"old Office reference in DSG shell");
      pass("dsg-office-source-price-nov26",{amount:355000,typology:"Office",unit:"208"});
    }
  }
  browser=await chromium.launch({headless:true});
  for(const width of [360,390,430,900,1440]){
    for(const f of fixtures){
      const page=await browser.newPage({viewport:{width,height:850},hasTouch:width<=430,isMobile:width<=430});
      const errors=[];
      page.on("pageerror",err=>errors.push(err.message));
      await page.route("**/*",route=>route.request().url().startsWith(origin+"/")?route.continue():route.abort());
      await page.goto(origin+f.page,{waitUntil:"domcontentloaded",timeout:25000});
      await page.locator('section[aria-labelledby="klabin-title"]').waitFor({timeout:15000,state:"attached"});
      assert.equal(await page.locator("h1").count(),1,"missing/surplus h1 "+f.name);
      const link=page.locator('main section[aria-labelledby="klabin-title"] a[href="'+f.region+'"]');
      assert.equal(await link.count(),1,"no single hydrated region link "+f.name);
      assert.ok(await link.isVisible(),"region link not visible "+f.name);
      pass("hydrated-regional-link",{page:f.name,width});
      assert.equal(await page.locator(".hero-meta, #hero-meta").count(),0,"RESF forbids duplicate hero-meta");
      const facts=page.locator("section.hero + section.facts");
      assert.equal(await facts.count(),1,"RESF requires a single facts band immediately after hero");
      assert.equal(await page.locator("section.facts").count(),1,"duplicate fact bands");
      const slots=facts.locator(".facts-in > .fact");
      assert.equal(await slots.count(),4,"RESF 4 ordered fact slots");
      const texts=(await slots.allTextContents()).map(x=>x.replace(/\s+/g," ").trim());
      if(f.name==="CAPIITOLO"){
        assert.match(texts[0],/210 m²/);
        assert.match(texts[0],/4 suítes/);
        assert.match(texts[1],/3 vagas/);
        assert.match(texts[2],/Torre única/);
        assert.match(texts[2],/Chácara Klabin/);
        assert.match(texts[3],/Em construção/);
        assert.equal(await facts.locator('[data-fact-gap]').count(),0);
      }else{
        assert.match(texts[0],/27–61 m²/);
        assert.match(texts[0],/Offices/);
        assert.match(texts[1],/Sob consulta/);
        assert.match(texts[1],/Vagas por tipologia/);
        assert.equal(await facts.locator('[data-fact-gap="parking"]').count(),1,"parking fact data gap not registered");
        assert.match(texts[2],/Uso misto/);
        assert.match(texts[2],/Itaim Bibi/);
        assert.match(texts[3],/Entregue/);
      }
      const grid=await facts.locator(".facts-in").evaluate(el=>{
        const style=getComputedStyle(el),r=el.getBoundingClientRect();
        const slots=[...el.querySelectorAll(":scope > .fact")].map(x=>({left:x.getBoundingClientRect().left,right:x.getBoundingClientRect().right,top:x.getBoundingClientRect().top}));
        return {display:style.display,cols:style.gridTemplateColumns.trim().split(/\s+/).length,box:r.toJSON(),slots};
      });
      assert.equal(grid.display,"grid","facts layout must be CSS Grid");
      assert.equal(grid.cols,width<=900?2:4,"RESF 2x2 until tablet breakpoint 900px, 4 desktop columns");
      assert.ok(grid.slots.every(x=>x.left>=grid.box.left-2&&x.right<=grid.box.right+2),"facts exceed their grid bounds");
      if(width<=900)assert.ok(grid.slots[0].top===grid.slots[1].top&&grid.slots[2].top===grid.slots[3].top&&grid.slots[2].top>grid.slots[0].top,"facts must be in two mobile rows");
      pass("resf-facts-single-band-no-hero-meta",{page:f.name,width,columns:grid.cols,slots:texts.map(x=>x.replace(/\s+/g," ").slice(0,100))});
      const robots=await page.locator('head meta[name="robots"]').getAttribute("content");
      assert.ok(robots.startsWith("index,follow"),"rendered noindex? "+robots);
      assert.equal(await page.locator('head link[rel="canonical"]').getAttribute("href"),"https://www.moretegra.com.br"+f.page);
      const form=page.locator('form#moretegra-lead-form');
      assert.equal(await form.getAttribute("data-form-id"),"46");
      assert.equal(await form.getAttribute("data-project-name"),f.project);
      pass("seo-form46-regression",{page:f.name,width});
      if(f.name==="DSG Itaim"){
        const amount=page.locator('.mnt-price-section [data-commercial-value]');
        await amount.waitFor({state:"visible"});
        assert.equal((await amount.innerText()).trim(),"R$ 355.000","rendered DSG offer differs from official");
        const detail=await page.locator(".mnt-price-section .mnt-price-reference").innerText();
        assert.match(detail,/32 m² · unidade 208 · Office · Nov\/26 · pagamento à vista/);
        assert.match(await page.locator(".mnt-price-section .mnt-price-note").innerText(),/uso comercial/);
        const content=await page.locator("main").innerText();
        assert.match(content,/R\$ 355\.000/);
        assert.ok(!content.includes("R$ 412.500")&&!content.includes("Ago/26"),"stale DSG price in page body/FAQ");
        pass("dsg-office-hydrated-price-and-faq",{width,price:"R$ 355.000",period:"Nov/26"});
      }
      const w=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
      assert.ok(w.scroll<=width+12,"project horizontal overflow "+JSON.stringify({page:f.name,width,...w}));
      pass("project-width",{page:f.name,width,...w});
      await link.click();
      await page.waitForURL(url=>new URL(url).pathname===f.region,{timeout:10000});
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://www.moretegra.com.br"+f.region);
      pass("region-navigation",{page:f.name,width});
      await page.close();
    }
  }
  assert.equal(writes,0,"Unexpected non-GET request; no synthetic leads may be sent");
  pass("zero-post");
  console.log("FINAL_SUMMARY "+JSON.stringify({passed:checks,failed:0}));
}catch(e){console.error("FINAL_FAILURE "+String(e.stack||e));process.exitCode=1;}
finally{if(browser)await browser.close();await new Promise(ok=>server.close(ok));}
