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
// MNT 2026-11-24 (SFJM): a lista de redirects segue FECHADA. Além do baseline, só entram as adições explicitamente aprovadas abaixo
// (limpeza do caminho interno do Complexo Lapa-Pirituba; não é migração de artigo). Qualquer outra adição continua reprovando.
const APPROVED_REDIRECT_ADDITIONS=[{source:'/src-greenn/complexo-lapa-pirituba/index.html',destination:'/complexo-lapa-pirituba/',permanent:true}];
const rk=r=>JSON.stringify(Object.fromEntries(Object.entries(r).sort()));
assert.deepEqual(v.redirects.map(rk).sort(),[...vb.redirects,...APPROVED_REDIRECT_ADDITIONS].map(rk).sort(),'Do not add migrations before individual publication approval');
for(const r of vb.rewrites)assert.ok(v.rewrites.some(x=>JSON.stringify(x)===JSON.stringify(r)),'Existing rewrite changed');
for(const a of data)assert.ok(read('sitemap.xml').includes('https://www.moretegra.com.br'+a.url),'Published article in sitemap');
// MNT 2026-11-24 (SFJM): fonte protegida presa ao snapshot aprovado aa1cd583 (2026-11-14: Sabrina -> Time Tegra Vendas, titulo aprovado).
// Qualquer outra alteracao na pagina continua reprovando.
for(const p of ['src-greenn/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/index.html'])assert.equal(read(p),execFileSync('git',['show','aa1cd583:'+p],{encoding:'utf8'}).replace('</head>',"<script>window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:\"default_consent\",ad_storage:\"denied\",analytics_storage:\"denied\",ad_user_data:\"denied\",ad_personalization:\"denied\"});</script>\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var loaded=false;function load(){if(loaded)return;loaded=true;var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j)}if(d.readyState==='complete')load();else w.addEventListener('load',load,{once:true});d.addEventListener('pointerdown',load,{once:true,capture:true,passive:true});d.addEventListener('keydown',load,{once:true,capture:true})})(window,document,'script','dataLayer','GTM-PGCR4R47');</script>\n<script src=\"/src-greenn/preview/runtime.js\" defer></script>\n<script src=\"/src-greenn/blog/measurement-editorial.js\" defer></script>\n"+'</head>'),'Protected source changed beyond approved snapshot aa1cd583: '+p);
const titles=new Set(),descriptions=new Set(),h1s=new Set(),allLinks=new Set();
const rew=new Map(v.rewrites.map(r=>[r.source,r.destination]));
const results=[];
// Artigos sobre o Rio usam o canal RJ, sem a Sabrina (Wagner, 2026-11-13; scripts/lib/rj-blog-posts.mjs).
const RJ_IDS=new Set([8]);
const RJ_FOOTER='Central de atendimento RJ · <a href="tel:+5511951667227">(11) 95166-7227</a> · Encaminhamento ao corretor local autorizado. · <a href="/rio-de-janeiro/#contato">Formulário</a>';
for(const a of data){
 const file='src-greenn'+a.url+'index.html',html=read(file),url='https://www.moretegra.com.br'+a.url,rj=RJ_IDS.has(a.id);
 assert.notEqual(a.url,a.legacy);assert.ok(!h1s.has(a.h1));h1s.add(a.h1);
 assert.ok(!titles.has(a.title));titles.add(a.title);assert.ok(!descriptions.has(a.description));descriptions.add(a.description);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.ok(html.includes('<h1>'+a.h1+'</h1>'));
 assert.ok(html.includes('name="robots" content="index,follow,max-image-preview:large"'));
 assert.ok(html.includes('rel="canonical" href="'+url+'"'));
 assert.ok(html.includes('property="og:url" content="'+url+'"'));
 for(const field of ['og:image','og:title','og:description','twitter:image','twitter:title','twitter:description'])assert.ok(html.includes('"'+field+'"'));
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
 assert.deepEqual(graph.map(x=>x['@type']).sort(),(rj?['BlogPosting','BreadcrumbList']:['BlogPosting','BreadcrumbList','Person','RealEstateAgent']).sort());
 const post=graph.find(x=>x['@type']==='BlogPosting');assert.equal(post.headline,a.h1);assert.equal(post.mainEntityOfPage['@id'],url);assert.notEqual(post.author.name,'Sabrina da Tegra');
 const crumbs=graph.find(x=>x['@type']==='BreadcrumbList');assert.equal(crumbs.itemListElement.at(-1).item,url);
 if(rj){assert.ok(!/sabrina|CRECI|5511960779328|\/regioes\/#formulario/i.test(html),'RJ article without SP channel '+a.id);assert.ok(html.includes('https://wa.me/5511951667227?text='));assert.ok(html.includes(RJ_FOOTER));}
 else{assert.ok(html.includes('CRECI-SP 209.905-F'));assert.ok(html.includes('href="/regioes/#formulario"'));
 assert.ok(html.includes('https://wa.me/5511960779328?text='));}
 assert.equal((html.match(/id="mt-floating-dock"/g)||[]).length,1,'One approved RESF dock');
 assert.ok(!html.includes('mnt-market-dock'),'Retired nonstandard dock must not return');
 const dock=html.match(/<nav id="mt-floating-dock"[\s\S]*?<\/nav>/)[0];
 assert.ok(dock.includes('mt-floating mt-floating-lead'));
 assert.ok(dock.includes('mt-floating mt-floating-whatsapp'));
 assert.ok(dock.includes('whatsapp-removebg.webp'),'Official WhatsApp logo');
 assert.ok(html.includes('var(--mt-consent-offset,14px)'),'Dock respects consent offset');
 const copy=html.match(/<div class="mnt-market-copy">([\s\S]*?)<\/div><section class="mnt-(?:sabrina|rj)-card"/)[1];
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
 const legacyFile='src-greenn'+a.legacy+'index.html',legacyBase=baseline(legacyFile);assert.equal(read(legacyFile),rj?legacyBase.replace('Atendimento Sabrina da Tegra · CRECI-SP 209.905-F · <a href="tel:+5511960779328">(11) 96077-9328</a> · <a href="/regioes/#formulario">Formulário</a>',RJ_FOOTER):legacyBase);assert.ok(read(legacyFile).includes('noindex'));
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
// MNT 2026-11-24 (SFJM): o unico CEP permitido no RIIO e o governado por validate-onsite-realtor-project-address.mjs (22630-011, #561).
// Preco herdado e qualquer outro CEP continuam reprovando.
assert.ok(!riio.includes('R$')&&[...riio.matchAll(/"postalCode":"([^"]*)"/g)].every(m=>m[1]==='22630-011'),'No inherited price or invented CEP');
const questions=[...riio.matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(x=>[x[1].replaceAll('&amp;','&'),x[2].replaceAll('&amp;','&')]);
assert.deepEqual(rg.find(x=>x['@type']==='FAQPage').mainEntity.map(x=>[x.name,x.acceptedAnswer.text]),questions,'RIIO FAQ parity');
const form=riio.match(/<form id="moretegra-lead-form"[\s\S]*?<\/form>/)[0];
const reference=read('src-greenn/empreendimentos/jerivas-caminhos-da-lapa/index.html').match(/<form id="moretegra-lead-form"[\s\S]*?<\/form>/)[0].replaceAll('Jerivás Caminhos da Lapa','RIIO by Piero Lissoni').replaceAll('Jerivás','RIIO by Piero Lissoni')
 // MNT 2026-11-24 (SFJM): deltas aprovados do canal RJ (#561): form 47 e atendimento 'especialista' (sem Sabrina). Nada além disso.
 .replace('data-form-id="46"','data-form-id="47"').replace('name="form_id" value="46"','name="form_id" value="47"').replace('Falar com Sabrina</option>','Falar com especialista</option>');
assert.equal(form,reference,'Preserve native Form46, adjusting only project context');
// MNT 2026-11-24 (SFJM): scripts compartilhados presos ao ultimo snapshot aprovado de cada um
// (runtime.js: #600 FGTS/origem no Form46; measurement-form.js: #561 canal RJ/form 47). measurement-core.js segue no baseline.
const SCRIPT_SNAPSHOT={'runtime.js':'3389f77e','measurement-core.js':base,'measurement-form.js':'8fe1043a'};
for(const script of ['runtime.js','measurement-core.js','measurement-form.js']){
 assert.ok(riio.includes('/src-greenn/preview/'+script));
 const p='src-greenn/preview/'+script;
 assert.equal(read(p),execFileSync('git',['show',SCRIPT_SNAPSHOT[script]+':'+p],{encoding:'utf8'}),'Shared script drifted from approved snapshot: '+script);
}
for(const [,src] of riio.matchAll(/<img[^>]+src="(\/[^\"]+)"/g))assert.ok(existsSync(src.slice(1)),'RIIO image '+src);
assert.equal(rew.get('/empreendimentos/riio-by-piero-lissoni/'),'/src-greenn/empreendimentos/riio-by-piero-lissoni/index.html');
console.log(JSON.stringify({pass:true,articles:results,unique_internal_links:allLinks.size,published:true,visual_browser_qa:'NOT_EXECUTED',official_schema_tests:'NOT_EXECUTED'},null,2));
