import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const root='docs/editorial/mercado-2026-10-28';
const read=p=>readFileSync(p,'utf8');
const data=JSON.parse(read(root+'/mapa-artigos.json'));
const base='bbe59c7a0b7b8a597826d56f6bc01d5291d9dfa5';
const baseline=p=>execFileSync('git',['show',base+':'+p],{encoding:'utf8'});
const v=JSON.parse(read('vercel.json')),vb=JSON.parse(baseline('vercel.json'));
assert.equal(data.length,11);
assert.deepEqual(v.redirects,vb.redirects,'Do not add migrations before individual publication approval');
for(const r of vb.rewrites)assert.ok(v.rewrites.some(x=>JSON.stringify(x)===JSON.stringify(r)),'Existing rewrite changed');
for(const a of data)assert.ok(read('sitemap.xml').includes('https://www.moretegra.com.br'+a.url),'Published article in sitemap');
for(const p of ['src-greenn/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/index.html'])assert.equal(read(p),baseline(p),'Protected source changed: '+p);
const titles=new Set(),descriptions=new Set(),h1s=new Set(),allLinks=new Set();
const rew=new Map(v.rewrites.map(r=>[r.source,r.destination]));
const results=[];
for(const a of data){
 const file='src-greenn'+a.url+'index.html',html=read(file),url='https://www.moretegra.com.br'+a.url;
 assert.notEqual(a.url,a.legacy);assert.ok(!h1s.has(a.h1));h1s.add(a.h1);
 assert.ok(!titles.has(a.title));titles.add(a.title);assert.ok(!descriptions.has(a.description));descriptions.add(a.description);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.ok(html.includes('<h1>'+a.h1+'</h1>'));
 assert.ok(html.includes('name="robots" content="index,follow,max-image-preview:large"'));
 assert.ok(html.includes('rel="canonical" href="'+url+'"'));
 assert.ok(html.includes('property="og:url" content="'+url+'"'));
 for(const field of ['og:image','og:title','og:description','twitter:image','twitter:title','twitter:description'])assert.ok(html.includes('"'+field+'"'));
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
 assert.deepEqual(graph.map(x=>x['@type']).sort(),['BlogPosting','BreadcrumbList','Person','RealEstateAgent'].sort());
 const post=graph.find(x=>x['@type']==='BlogPosting');assert.equal(post.headline,a.h1);assert.equal(post.mainEntityOfPage['@id'],url);assert.notEqual(post.author.name,'Sabrina da Tegra');
 const crumbs=graph.find(x=>x['@type']==='BreadcrumbList');assert.equal(crumbs.itemListElement.at(-1).item,url);
 assert.ok(html.includes('CRECI-SP 209.905-F'));assert.ok(html.includes('href="/regioes/#formulario"'));
 assert.ok(html.includes('https://wa.me/5511960779328?text='));
 assert.equal((html.match(/id="mt-floating-dock"/g)||[]).length,1,'One approved RESF dock');
 assert.ok(!html.includes('mnt-market-dock'),'Retired nonstandard dock must not return');
 const dock=html.match(/<nav id="mt-floating-dock"[\s\S]*?<\/nav>/)[0];
 assert.ok(dock.includes('mt-floating mt-floating-lead'));
 assert.ok(dock.includes('mt-floating mt-floating-whatsapp'));
 assert.ok(dock.includes('whatsapp-removebg.webp'),'Official WhatsApp logo');
 assert.ok(html.includes('var(--mt-consent-offset,14px)'),'Dock respects consent offset');
 const copy=html.match(/<div class="mnt-market-copy">([\s\S]*?)<\/div><section class="mnt-sabrina-card"/)[1];
 assert.ok(!/<p>[^]*?<a href="\//.test(copy.replace(/<aside\b[\s\S]*?<\/aside>/g,'')),'Internal editorial links must use cards');
 assert.ok(!html.includes('FAQPage'));assert.ok(!html.includes('<!-- CARD:'));assert.ok(!html.includes('localhost'));
 const ids=[...html.matchAll(/\bid="([^\"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate HTML id '+a.id);
 let imgCount=0;
 for(const [tag] of html.matchAll(/<img\b[^>]*>/g)){
  imgCount++;assert.ok(/\balt="[^\"]*"/.test(tag));assert.ok(/\bwidth="\d+"/.test(tag));assert.ok(/\bheight="\d+"/.test(tag));
  const src=tag.match(/\bsrc="([^\"]+)"/)[1];if(src.startsWith('/'))assert.ok(existsSync(src.slice(1)),src);
 }
 for(const [,href] of html.matchAll(/\bhref="([^\"]+)"/g)){
  if(!href.startsWith('/'))continue;allLinks.add(href);
  const [path,hash]=href.split('#');const dest=rew.get(path)||path;
  assert.ok(existsSync(dest.slice(1))||existsSync(dest.slice(1)+'index.html')||path==='/','Broken internal link '+href);
  if(hash){const target=path==='/'?'src-greenn/index.html':(existsSync(dest.slice(1))?dest.slice(1):dest.slice(1)+'index.html');assert.ok(read(target).includes('id="'+hash+'"'),'Missing anchor '+href);}
 }
 const legacyFile='src-greenn'+a.legacy+'index.html';assert.equal(read(legacyFile),baseline(legacyFile));assert.ok(read(legacyFile).includes('noindex'));
 assert.ok(a.words>=1800&&a.words<=2400,'Editorial word target '+a.id+' = '+a.words);
 assert.ok(a.sources.length>=2);assert.equal(rew.get(a.url),'/'+file);
 results.push({id:a.id,url:a.url,words:a.words,images:imgCount,source_links:a.sources.length,status:'STATIC_PASS'});
}
// Product-authority review regressions: check cards in editorial copy, not footer duplicates.
const cards=JSON.parse(read(root+'/cards.json'));
for(const [id,keys] of [[1,['tiel','studios','capiitolo','bueno']],[3,['caminhos']],[6,['studios']],[7,['studios']],[8,['riio']],[9,['bueno','tiel']]]){
 const a=data.find(x=>x.id===id),html=read('src-greenn'+a.url+'index.html');
 const cardLinks=[...html.matchAll(/<aside class="mnt-project"><a href="([^\"]+)"/g)].map(x=>x[1]);
 for(const key of keys)assert.ok(cardLinks.includes(cards[key].url),'Missing contextual card '+id+':'+key);
}
assert.equal(cards.caminhos.url,'https://www.caminhosdalapategra.com.br/','Master development has its own owner');
assert.ok(!/2026|3%|R\$\s*50|até dez vezes/.test(read(root+'/artigos/05-iptu.md')),'IPTU must not bake annual payment terms into evergreen copy');
assert.notEqual(data.find(x=>x.id===11).media,'rua','Inventory hero replaced');

const riio=read('src-greenn/empreendimentos/riio-by-piero-lissoni/index.html');
assert.equal((riio.match(/<h1\b/g)||[]).length,1);
assert.ok(riio.includes('name="robots" content="index,follow,max-image-preview:large"'));
assert.ok(riio.includes('href="https://www.moretegra.com.br/empreendimentos/riio-by-piero-lissoni/"'));
assert.equal((riio.match(/class="facts"/g)||[]).length,1);
assert.equal((riio.match(/class="fact"/g)||[]).length,4);
assert.ok(!riio.includes('hero-meta'));
assert.ok(riio.includes('<b>3 a 6 vagas</b>')&&riio.includes('<b>Em construção</b>'));
const rg=JSON.parse(riio.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
assert.ok(!rg.some(x=>['Product','Offer'].includes(x['@type'])),'No unverified unit offer');
assert.ok(!riio.includes('R$')&&!riio.includes('postalCode'),'No inherited price or invented CEP');
const questions=[...riio.matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(x=>[x[1].replaceAll('&amp;','&'),x[2].replaceAll('&amp;','&')]);
assert.deepEqual(rg.find(x=>x['@type']==='FAQPage').mainEntity.map(x=>[x.name,x.acceptedAnswer.text]),questions,'RIIO FAQ parity');
const form=riio.match(/<form id="moretegra-lead-form"[\s\S]*?<\/form>/)[0];
const reference=read('src-greenn/empreendimentos/jerivas-caminhos-da-lapa/index.html').match(/<form id="moretegra-lead-form"[\s\S]*?<\/form>/)[0].replaceAll('Jerivás Caminhos da Lapa','RIIO by Piero Lissoni').replaceAll('Jerivás','RIIO by Piero Lissoni');
assert.equal(form,reference,'Preserve native Form46, adjusting only project context');
for(const script of ['runtime.js','measurement-core.js','measurement-form.js']){
 assert.ok(riio.includes('/src-greenn/preview/'+script));
 assert.equal(read('src-greenn/preview/'+script),baseline('src-greenn/preview/'+script));
}
for(const [,src] of riio.matchAll(/<img[^>]+src="(\/[^\"]+)"/g))assert.ok(existsSync(src.slice(1)),'RIIO image '+src);
assert.equal(rew.get('/empreendimentos/riio-by-piero-lissoni/'),'/src-greenn/empreendimentos/riio-by-piero-lissoni/index.html');
console.log(JSON.stringify({pass:true,articles:results,unique_internal_links:allLinks.size,published:true,visual_browser_qa:'NOT_EXECUTED',official_schema_tests:'NOT_EXECUTED'},null,2));
