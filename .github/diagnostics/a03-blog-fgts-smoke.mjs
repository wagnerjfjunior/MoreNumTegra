// A03 — isolated browser smoke (localhost only; no lead submissions).
import assert from "node:assert/strict";
import {createServer} from "node:http";
import {readFile,stat} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {chromium} from "playwright";

const root=process.cwd(), origin="http://127.0.0.1:4178";
const expected="/blog/mercado/usar-fgts-comprar-apartamento/";
const routes=new Map([
  ["/blog/","/src-greenn/blog/index.html"],
  [expected,"/src-greenn/blog/mercado/usar-fgts-comprar-apartamento/index.html"]
]);
const mimes={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".webp":"image/webp"};
let methodViolations=0, checks=0;
const server=createServer(async(req,res)=>{
  if(req.method!=="GET"){methodViolations++;res.writeHead(405);res.end();return;}
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,origin).pathname);}catch{res.writeHead(400);res.end();return;}
  pathname=routes.get(pathname)||pathname;
  const file=resolve(root,"."+pathname);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  try{
    const target=(await stat(file)).isDirectory()?resolve(file,"index.html"):file;
    const body=await readFile(target);
    res.writeHead(200,{"Content-Type":mimes[extname(target)]||"application/octet-stream","Cache-Control":"no-store"});
    res.end(body);
  }catch{res.writeHead(404);res.end("Not found "+pathname);}
});
await new Promise(ok=>server.listen(4178,"127.0.0.1",ok));
let browser;
const ok=(name,info={})=>{checks++;console.log(JSON.stringify({name,result:"PASS",...info}));};
const noOverflow=async(page,name,width)=>{
  const measure=await page.evaluate(()=>({actual:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.ok(measure.actual<=measure.viewport+10,name+": horizontal overflow "+JSON.stringify(measure));
  ok(name,{width,...measure});
};
try{
  browser=await chromium.launch({headless:true});
  for(const width of [360,390,430,900,1440]){
    const page=await browser.newPage({viewport:{width,height:850},hasTouch:width<=430,isMobile:width<=430});
    await page.route("**/*",r=>r.request().url().startsWith(origin+"/")?r.continue():r.abort());
    await page.goto(origin+"/blog/",{waitUntil:"domcontentloaded",timeout:25000});
    assert.equal(await page.locator("h1").count(),1);
    ok("blog-h1-preserved",{width});
    const a=page.locator('.featured-grid a.featured-story[href="'+expected+'"]');
    assert.equal(await a.count(),1,"single blog featured FGTS link");
    assert.match(await a.innerText(),/Como usar o FGTS para comprar apartamento/);
    await a.scrollIntoViewIfNeeded();
    assert.ok(await a.isVisible(),"FGTS card invisible");
    ok("fgts-featured-card-visible",{width});
    assert.ok(await page.locator('a[href="/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/"]').count()>=1,"Lapa article lost");
    ok("lapa-article-preserved",{width});
    await noOverflow(page,"blog-no-horizontal-overflow",width);
    await a.click();
    await page.waitForURL(url=>new URL(url).pathname===expected);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://www.moretegra.com.br"+expected);
    assert.match(await page.locator("h1").first().innerText(),/FGTS/);
    ok("fgts-guide-navigation-and-canonical",{width});
    await noOverflow(page,"guide-no-horizontal-overflow",width);
    await page.close();
  }
  assert.equal(methodViolations,0,"non-GET request attempted against localhost");
  ok("no-lead-post");
  console.log("FINAL_SUMMARY "+JSON.stringify({passed:checks,failed:0}));
}catch(e){console.error("FINAL_FAILURE "+String(e.stack||e));process.exitCode=1;}
finally{if(browser)await browser.close();await new Promise(ok=>server.close(ok));}
