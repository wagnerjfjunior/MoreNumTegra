// A02 FGTS — browser smoke only; localhost never sends CRM leads.
import assert from "node:assert/strict";
import {createServer} from "node:http";
import {readFile, stat} from "node:fs/promises";
import {resolve, extname, sep} from "node:path";
import {chromium} from "playwright";

const root=process.cwd(), origin="http://127.0.0.1:4177";
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".ico":"image/x-icon"};
const aliases=new Map([["/","/src-greenn/preview/index.html"]]);
let postAttempts=0;
const server=createServer(async(req,res)=>{
  if(req.method!=="GET"){postAttempts++;res.writeHead(405);res.end("Method not allowed");return;}
  let pathname;
  try {pathname=decodeURIComponent(new URL(req.url,origin).pathname);}catch{res.writeHead(400);res.end();return;}
  pathname=aliases.get(pathname)||pathname;
  let file=resolve(root,"."+pathname);
  if(file!==root && !file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  try {
    if((await stat(file)).isDirectory())file=resolve(file,"index.html");
    const body=await readFile(file);
    res.writeHead(200,{"Content-Type":mime[extname(file)]||"application/octet-stream","Cache-Control":"no-store"});
    res.end(body);
  }catch{res.writeHead(404);res.end("Not found: "+pathname);}
});
await new Promise(resolveServer=>server.listen(4177,"127.0.0.1",resolveServer));
let browser,checks=0;
function pass(label,extra={}){checks++;console.log(JSON.stringify({test:label,result:"PASS",...extra}));}
async function visit(page,route){await page.goto(origin+route,{waitUntil:"domcontentloaded",timeout:25000});}
try{
  browser=await chromium.launch({headless:true});
  for(const width of [360,390,430,900,1440]){
    const page=await browser.newPage({viewport:{width,height:850}});
    await page.route("**/*",route=>{
      const u=route.request().url();
      return u.startsWith(origin+"/")?route.continue():route.abort();
    });
    await visit(page,"/blog/mercado/usar-fgts-comprar-apartamento/");
    const first=page.locator('a[href="/?estagio=pronto&origem=fgts#oportunidades"]').first();
    assert.ok(await first.count(),"guide lacks filtered catalog link");
    pass("article-catalog-link",{width});
    await first.click();
    await page.waitForURL(/estagio=pronto.*origem=fgts/);
    await page.waitForFunction(()=>document.querySelector("[data-status-mobile]")?.value==="entregue",{timeout:12000});
    const elo=page.locator('a[href*="/empreendimentos/caminhos-da-lapa-elo-duo/"][href*="origem=fgts"]').first();
    await elo.waitFor({state:"attached",timeout:12000});
    pass("catalog-filter-and-elo-attribution",{width});
    await visit(page,"/?interesse=FGTS%20para%20comprar%20apartamento#formulario");
    await page.waitForFunction(()=>document.querySelector("#mt-lead-intent")?.value==="Simular forma de pagamento");
    const dataset=await page.locator("#moretegra-lead-form").evaluate(el=>el.dataset.regionContext);
    assert.equal(dataset,"Orientação FGTS na compra de apartamento");
    pass("form46-direct-prefill",{width});
    await visit(page,"/?utm_source=chatgpt.com#formulario");
    await page.locator("#mt-lead-intent").waitFor();
    assert.equal(await page.locator("#mt-lead-intent").inputValue(),"Condições e disponibilidade");
    pass("ordinary-visitor-no-fgts",{width});
    await visit(page,"/empreendimentos/universo-tatuape-orbita/?unidade=1814&origem=fgts#formulario");
    await page.locator("#mt-lead-intent").waitFor();
    const before=await page.locator("#mt-lead-intent").inputValue();
    assert.ok(before.startsWith("Condições e disponibilidade"),"project must not force simulation");
    await page.locator("#mt-lead-intent").selectOption("Simular forma de pagamento");
    assert.equal(await page.locator("#mt-lead-intent").inputValue(),"Simular forma de pagamento");
    assert.equal(await page.locator("#moretegra-lead-form").getAttribute("data-form-id"),"46");
    const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
    assert.equal(canonical,"https://www.moretegra.com.br/empreendimentos/universo-tatuape-orbita/");
    pass("orbita-form-intent-and-canonical",{width});
    const widthInfo=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert.ok(widthInfo.scroll<=widthInfo.viewport+20,"horizontal overflow "+JSON.stringify(widthInfo));
    pass("orbita-no-material-horizontal-overflow",{width,...widthInfo});
    await page.close();
  }
  const page=await browser.newPage();
  await page.route("**/*",route=>route.request().url().startsWith(origin+"/")?route.continue():route.abort());
  await visit(page,"/rio-de-janeiro/?origem=fgts#formulario");
  assert.equal(await page.locator("#moretegra-lead-form").getAttribute("data-form-id"),"47");
  pass("rj-form47-isolation-dom");
  await visit(page,"/empreendimentos/universo-tatuape-orbita/?unidade=1814&origem=fgts#formulario");
  await page.locator('#moretegra-lead-form button[type="submit"]').click();
  const message=await page.locator('#moretegra-lead-form').evaluate(el=>el.innerText);
  assert.ok(message.includes("Informe seu nome.")||message.includes("Informe um"),"invalid form did not show validation");
  pass("invalid-form-no-submission");
  await page.close();
  assert.equal(postAttempts,0,"localhost received forbidden POST");
  pass("no-crm-post-on-localhost");
  console.log("FINAL_SUMMARY "+JSON.stringify({passed:checks,failed:0}));
}catch(error){console.error("FINAL_FAILURE "+String(error.stack||error));process.exitCode=1;}
finally{if(browser)await browser.close();await new Promise(done=>server.close(done));}
