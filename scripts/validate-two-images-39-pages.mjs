#!/usr/bin/env node
// Canonical 40 URL contract (including regional hub): visible first hero and distinct second illustration.
// Read-only source audit. Dynamic DSG/CAPIITOLO content is loaded from experiments.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const sitemap=fs.readFileSync('sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>\s*(https:\/\/www\.moretegra\.com\.br\/[^<]*)\s*<\/loc>/g)].map(x=>x[1]);
const allPaths=urls.map(u=>new URL(u).pathname);
// The two editorial blog URLs are governed by BlogPosting/SEO checks, not RESF's
// two-image contract for exact commercial and regional pages.
const blogPaths=allPaths.filter(p=>p.startsWith('/blog/'));
assert.deepEqual(blogPaths,[
 '/blog/',
 '/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/'
],'Blog sitemap additions must remain explicitly scoped');
const paths=allPaths.filter(p=>!p.startsWith('/blog/'));
assert.equal(new Set(allPaths).size,allPaths.length,'Duplicate sitemap URLs');
const rewrite=JSON.parse(fs.readFileSync('vercel.json','utf8')).rewrites;
assert.equal(paths.length,40,'Expected 40 canonical URLs; update inventory explicitly if scope changes');
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
assert.deepEqual({home,regions,projects},{home:1,regions:14,projects:25});
console.log('PASS: 40/40 exact canonical routes have visible, distinct primary and secondary images with matching JSON-LD');
