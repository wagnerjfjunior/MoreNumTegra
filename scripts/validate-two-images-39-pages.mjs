#!/usr/bin/env node
// Canonical 42 URL contract (excluding investment hub): visible first hero and distinct second illustration.
// Read-only source audit. Dynamic DSG/CAPIITOLO content is loaded from experiments.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const sitemap=fs.readFileSync('sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>\s*(https:\/\/www\.moretegra\.com\.br\/[^<]*)\s*<\/loc>/g)].map(x=>x[1]);
const allPaths=urls.map(u=>new URL(u).pathname);
// The blog hub, Bairros collection and two authorial articles have independent SEO checks, not RESF's
// two-image contract for exact commercial and regional pages.
const decorArticlePaths=[
  "/blog/dicasedecor/salao-festas-espaco-gourmet-como-avaliar/",
  "/blog/dicasedecor/vaga-garagem-apartamento-acesso-manobra/",
  "/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/",
  "/blog/dicasedecor/brinquedoteca-condominio-uso-seguranca/",
  "/blog/dicasedecor/apartamento-com-pets-layout-materiais/",
  "/blog/dicasedecor/quadras-condominio-tenis-beach-tennis/",
  "/blog/dicasedecor/recarga-carro-eletrico-condominio-infraestrutura/",
  "/blog/dicasedecor/casa-condominio-layout-claris-barra/",
  "/blog/dicasedecor/piso-apartamento-materiais-acustica-umidade/",
  "/blog/dicasedecor/cores-decoracao-2026-paleta-apartamento/",
  "/blog/dicasedecor/cozinha-apartamento-layout-uso-diario/",
  "/blog/dicasedecor/iluminacao-natural-apartamento-orientacao-solar/"
];
const releasedDecor=decorArticlePaths.filter(p=>allPaths.includes(p));
const decorCategory=allPaths.includes('/blog/dicasedecor/')?['/blog/dicasedecor/']:[];
const blogPaths=allPaths.filter(p=>p.startsWith('/blog/'));
assert.deepEqual(blogPaths,[
 '/blog/',
 '/blog/bairros-sao-paulo/',
 '/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/',
 '/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/',
 ...releasedDecor,
 ...decorCategory
],'Blog sitemap additions must remain explicitly scoped');
const investmentPaths=allPaths.filter(p=>p.startsWith('/investimentos/'));
assert.deepEqual(investmentPaths,['/investimentos/studios-e-salas-comerciais/'],'New investment collection routes need an explicit own-image audit');
const paths=allPaths.filter(p=>!p.startsWith('/blog/')&&!p.startsWith('/investimentos/'));
assert.equal(new Set(allPaths).size,allPaths.length,'Duplicate sitemap URLs');
const rewrite=JSON.parse(fs.readFileSync('vercel.json','utf8')).rewrites;
assert.equal(paths.length,42,'Expected 42 canonical home/region/project URLs, including Jerivás and Studios Berrini');
assert.equal(new Set(paths).size,paths.length,'Duplicate sitemap URLs');
const exp=new Map([
 ['/empreendimentos/dsg-itaim/','experiments/dsg-itaim-editorial-v3/index.html'],
 ['/empreendimentos/capiitolo-piero-lissoni/','experiments/capiitolo-editorial-v3/index.html']
]);
const extract=s=>[...s.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>{
 const obj=JSON.parse(m[1]);return obj['@graph']||[obj];
});
const mainImages=s=>{
 const i=s.indexOf('<main'),j=s.indexOf('</main>',i);
 assert(i>=0&&j>i,'Page lacks <main>');
 return [...s.slice(i,j).matchAll(/<img\b[^>]*>/gi)].map(m=>({
  url:(m[0].match(/\bsrc=["']([^"']+)["']/i)||[])[1],
  alt:(m[0].match(/\balt=["']([^"']*)["']/i)||[])[1]
 })).filter(x=>x.url);
};
// Investment collection is not an RESF exact-project/regional page; validate its own source contract.
const investmentHtml=fs.readFileSync('src-greenn/investimentos/studios-e-salas-comerciais/index.html','utf8');
const investmentImages=mainImages(investmentHtml);
assert(investmentImages.length>=2,'Investment hub must render at least two visible images');
assert(investmentImages[0].url!==investmentImages[1].url,'Investment hub must have independent hero/secondary images');
assert(investmentHtml.includes('<meta property="og:image"'),'Investment hub requires share image');
const investmentGraph=extract(investmentHtml);
assert(investmentGraph.some(n=>n['@type']==='CollectionPage'&&n.url==='https://www.moretegra.com.br/investimentos/studios-e-salas-comerciais/'),'Investment collection schema missing');
assert(investmentGraph.some(n=>n['@type']==='ItemList'&&n.numberOfItems===15),'Investment list must preserve 15 selected projects');
console.log('INVESTMENT_HUB_IMAGES_PASS /investimentos/studios-e-salas-comerciais/');
// Published decoration articles have an editorial contract independent of RESF.
for(const path of releasedDecor){
 const target=rewrite.find(x=>x.source===path);
 assert(target,path+': missing article rewrite');
 const html=fs.readFileSync(target.destination.replace(/^\//,''),'utf8');
 assert(!/noindex/i.test(html),path+': article must be indexable');
 assert.equal((html.match(/<h1\b/gi)||[]).length,1,path+': expected one H1');
 const canonical=html.match(/<link\b(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']([^"']+)["'])[^>]*>/i);
 assert.equal(canonical?.[1],'https://www.moretegra.com.br'+path,path+': wrong canonical');
 const graph=extract(html);
 for(const type of ['BlogPosting','BreadcrumbList','Person','RealEstateAgent'])assert(graph.some(x=>x['@type']===type),path+': missing '+type);
 assert.equal(graph.find(x=>x['@type']==='BlogPosting').mainEntityOfPage['@id'],'https://www.moretegra.com.br'+path);
 assert(mainImages(html).length>=2,path+': missing editorial/closing imagery');
}
console.log('DECOR_EDITORIAL_SOURCE_PASS',releasedDecor.length);
let projects=0,regions=0,home=0;
for(const path of paths){
 const target=rewrite.find(x=>x.source===path);
 assert(target,path+': no exact Vercel rewrite');
 const file=target.destination.replace(/^\//,'');
 const html=fs.readFileSync(file,'utf8');
 const visualFile=exp.get(path);
 const images=mainImages(visualFile?fs.readFileSync(visualFile,'utf8'):html);
 assert(images.length>=2,path+': insufficient two images in source/rendered HTML');
 const [hero,secondary]=images;
 assert(hero.url!==secondary.url,path+': secondary duplicates hero');
 const graph=extract(html);
 // Studios Berrini is indexable and has a documented gallery, but it has not adopted
 // the RESF two-ImageObject graph. Preserve a bounded, explicit source gate instead
 // of pretending that its schema is identical to all other exact-project pages.
 if(path==='/empreendimentos/studios-berrini/'){
  assert(html.includes('<link rel="canonical" href="https://www.moretegra.com.br/empreendimentos/studios-berrini/">'),'Studios Berrini requires its exact self-canonical URL');
  assert(!/<meta[^>]*noindex/i.test(html),'Studios Berrini must not be noindex');
  assert(graph.some(n=>['WebPage','CollectionPage'].includes(n['@type'])&&n.url==='https://www.moretegra.com.br'+path),'Studios Berrini requires WebPage in JSON-LD');
  projects++;
  console.log('PROJECT_GALLERY_AND_CANONICAL_PASS',path,'RESF_SECONDARY_IMAGE_SCHEMA_NOT_ADOPTED');
  continue;
 }
 const page=graph.find(n=>['WebPage','CollectionPage'].includes(n['@type'])&&n.url==='https://www.moretegra.com.br'+path);
 assert(page,path+': page JSON-LD not found');
 const main=graph.find(n=>n['@id']===page.primaryImageOfPage?.['@id']);
 const second=graph.find(n=>n['@id']==='https://www.moretegra.com.br'+path+'#secondary-image');
 assert(main&&main['@type']==='ImageObject',path+': missing primary ImageObject');
 assert(second&&second['@type']==='ImageObject',path+': missing secondary ImageObject');
 assert.equal(main.contentUrl,hero.url,path+': primary not equal visible hero');
 assert.equal(second.contentUrl,secondary.url,path+': secondary not equal second illustration');
 assert.equal(second.caption,secondary.alt,path+': secondary caption not equal visible alt');
 assert.deepEqual(page.image,[{'@id':main['@id']},{'@id':second['@id']}],path+': primary/secondary order invalid');
 assert.equal(graph.filter(n=>n['@id']===second['@id']).length,1,path+': secondary id duplicated');
 if(path==='/')home++;else if(path.startsWith('/regioes/'))regions++;else if(path.startsWith('/empreendimentos/'))projects++;
 else throw Error('Unknown sitemap path '+path);
 console.log('TWO_IMAGES_PASS',path,visualFile?'DYNAMIC_EDITORIAL':'SOURCE_STATIC');
}
assert.deepEqual({home,regions,projects},{home:1,regions:14,projects:27});
console.log('PASS: 41 RESF routes with distinct primary/secondary ImageObjects; Studios Berrini separately validated for distinct gallery images, canonical and WebPage JSON-LD');
