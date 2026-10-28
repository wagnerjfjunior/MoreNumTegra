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
assert.equal(read('sitemap.xml'),baseline('sitemap.xml'),'No drafts in sitemap');
for(const p of ['src-greenn/blog/mercado/index.html','src-greenn/blog/index.html','src-greenn/blog/catalogo-tegra-referencia.json','src-greenn/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/index.html'])assert.equal(read(p),baseline(p),'Protected source changed: '+p);
const titles=new Set(),descriptions=new Set(),h1s=new Set(),allLinks=new Set();
const rew=new Map(v.rewrites.map(r=>[r.source,r.destination]));
const results=[];
for(const a of data){
 const file='src-greenn'+a.url+'index.html',html=read(file),url='https://www.moretegra.com.br'+a.url;
 assert.notEqual(a.url,a.legacy);assert.ok(!h1s.has(a.h1));h1s.add(a.h1);
 assert.ok(!titles.has(a.title));titles.add(a.title);assert.ok(!descriptions.has(a.description));descriptions.add(a.description);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.ok(html.includes('<h1>'+a.h1+'</h1>'));
 assert.ok(html.includes('name="robots" content="noindex,follow"'));
 assert.ok(html.includes('rel="canonical" href="'+url+'"'));
 assert.ok(html.includes('property="og:url" content="'+url+'"'));
 for(const field of ['og:image','og:title','og:description','twitter:image','twitter:title','twitter:description'])assert.ok(html.includes('"'+field+'"'));
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
 assert.deepEqual(graph.map(x=>x['@type']).sort(),['BlogPosting','BreadcrumbList','Person','RealEstateAgent'].sort());
 const post=graph.find(x=>x['@type']==='BlogPosting');assert.equal(post.headline,a.h1);assert.equal(post.mainEntityOfPage['@id'],url);assert.notEqual(post.author.name,'Sabrina da Tegra');
 const crumbs=graph.find(x=>x['@type']==='BreadcrumbList');assert.equal(crumbs.itemListElement.at(-1).item,url);
 assert.ok(html.includes('CRECI-SP 209.905-F'));assert.ok(html.includes('href="/regioes/#formulario"'));
 assert.ok(html.includes('https://wa.me/5511960779328?text='));
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
console.log(JSON.stringify({pass:true,articles:results,unique_internal_links:allLinks.size,sitemap_unchanged:true,production_unchanged:true,visual_browser_qa:'NOT_EXECUTED',official_schema_tests:'NOT_EXECUTED'},null,2));
