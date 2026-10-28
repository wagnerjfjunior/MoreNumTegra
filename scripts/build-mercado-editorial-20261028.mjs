// Build-time authoring helper only. Output is portable HTML/CSS/vanilla JS.
// Uses the authoring runtime's marked package; no browser dependency or site bundler.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const modules=process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
if(!modules)throw new Error('Set CODEX_PRIMARY_RUNTIME_NODE_MODULES to the authoring dependencies');
const {marked}=await import(pathToFileURL(modules+'/marked/lib/marked.esm.js'));
const root='docs/editorial/mercado-2026-10-28';
const data=JSON.parse(readFileSync(root+'/mapa-artigos.json','utf8'));
const media=JSON.parse(readFileSync(root+'/midia.json','utf8'));
const template=readFileSync('src-greenn/blog/dicasedecor/cozinha-apartamento-layout-uso-diario/index.html','utf8');
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const host='https://www.moretegra.com.br';
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const fav=template.match(/<link rel="shortcut icon"[\s\S]*?<link rel="apple-touch-icon"[^>]*>/)[0];
const baseSchema=JSON.parse(template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
const footer=template.match(/<footer class="footer">[\s\S]*?<\/footer>/)[0];
let sabrina=template.match(/<section class="mnt-sabrina-card"[\s\S]*?<\/section>/)[0];
let next=template.match(/<section class="mnt-nextsteps"[\s\S]*?<\/section>/)[0].replace('Da escolha do layout à decisão imobiliária: explore as opções do MoreTegra.','Continue a pesquisa por regiões, empreendimentos e opções de uso.');
let nextImage=0;
next=next.replace(/<img\b[^>]*>/g,()=>{
 const key=['rua','tiel','aria'][nextImage++],m=media[key];
 const alt={rua:'Perspectiva ilustrada de Caminhos da Lapa',tiel:'Fachada do Tièl Vila Nova Conceição',aria:'Fachada do Ária Higienópolis'}[key];
 return '<img src="'+m.src+'" alt="'+alt+'" width="'+m.width+'" height="'+m.height+'" loading="lazy" decoding="async">';
});
const commonStyle=template.match(/<style>([\s\S]*?)<\/style>/)[1].replaceAll('mnt-kitchen-article','mnt-market-article');
const header='<a class="skip" href="#conteudo">Pular para o conteúdo</a><header class="site-header"><div class="wrap header-inner"><a class="brand" href="/"><img src="/assets/brand/tegra-vendas-256.webp" width="82" height="82" alt="Tegra Vendas">More em um Tegra</a><nav class="site-nav" aria-label="Navegação"><a href="/blog/">Blog</a><a href="/blog/mercado/">Mercado imobiliário</a><a href="/regioes/">Bairros</a></nav></div></header>';
const cardNames={orbita:['Universo Tatuapé Órbita','universo-tatuape-orbita','Conheça a página do projeto no Tatuapé e consulte as informações da unidade de interesse.'],tiel:['Tièl Vila Nova Conceição','tiel-vila-nova-conceicao','Examine as características apresentadas na página do empreendimento e solicite informações atuais.'],dsg:['DSG Itaim','dsg-itaim','Consulte a página do empreendimento para aprofundar a pesquisa de apartamentos na região.']};
for(const a of data){
 const m=media[a.media];const url=host+a.url;
 const wa='https://wa.me/5511960779328?text='+encodeURIComponent('Olá, Sabrina! Li o artigo “'+a.h1+'” no MoreTegra e quero comparar apartamentos Tegra em São Paulo.');
 let md=readFileSync(root+'/artigos/'+a.file,'utf8');
 const editorialText=marked.parse(md.replace(/<!--[^]*?-->/g,'')).replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/g,' ');
 md=md.replace(/<!-- CARD:(\w+) -->/g,(_,key)=>{const [name,project,copy]=cardNames[key],im=media[key];return '<aside class="mnt-project"><a href="/empreendimentos/'+project+'/"><img src="'+im.src+'" alt="'+e(name)+'" width="'+im.width+'" height="'+im.height+'" loading="lazy" decoding="async"><span><strong>'+name+'</strong><span>'+copy+'</span><b>Conhecer o empreendimento →</b></span></a></aside>';});
 let body=marked.parse(md).replace(/<table>/g,'<div class="mnt-table" role="region" aria-label="Tabela comparativa" tabindex="0"><table>').replace(/<\/table>/g,'</table></div>');
 const ids=new Set();body=body.replace(/<h([23])>(.*?)<\/h\1>/g,(_,n,t)=>{let id=slug(t.replace(/<[^>]+>/g,''));if(ids.has(id))throw new Error('Duplicate heading '+id);ids.add(id);return '<h'+n+' id="'+id+'">'+t+'</h'+n+'>';});
 const first=body.match(/^<p>([\s\S]*?)<\/p>/)[0];body=body.slice(first.length);
 const sab=sabrina.replace(/Escolha uma planta que combine com sua rotina/g,a.id===8?'Compare opções de moradia em São Paulo':'Converse sobre sua próxima escolha imobiliária').replace(/<p>Além de um bom acabamento,[\s\S]*?<\/p>/,'<p>'+e(a.cta)+'</p>').replace(/href="https:\/\/wa\.me\/[^\"]+"/,'href="'+wa+'"').replace(/aria-label="Conversar com Sabrina[^\"]+"/,'aria-label="Conversar com Sabrina da Tegra sobre apartamentos em São Paulo"');
 const image={ '@type':'ImageObject',url:host+m.src,width:m.width,height:m.height,caption:a.caption};
 const graph=[{'@type':'BlogPosting','@id':url+'#artigo',mainEntityOfPage:{'@type':'WebPage','@id':url},headline:a.h1,description:a.description,inLanguage:'pt-BR',author:{'@type':'Organization',name:'Equipe editorial More em um Tegra',url:host+'/blog/'},publisher:{'@type':'Organization',name:'More em um Tegra',url:host+'/'},isPartOf:{'@type':'Blog','@id':host+'/blog/#blog'},image,mentions:[{'@id':host+'/#sabrina-da-tegra'},{'@id':host+'/#sabrina-real-estate-agent'}]}, {'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:[['Início','/'],['Blog','/blog/'],['Mercado imobiliário','/blog/mercado/'],[a.breadcrumb,a.url]].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:host+path}))},...baseSchema.filter(x=>['Person','RealEstateAgent'].includes(x['@type']))];
 const structured=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c');
 const img='<img class="mnt-market-image" src="'+m.src+'"'+(m.srcset?' srcset="'+m.srcset+'" sizes="(max-width:840px) calc(100vw - 30px), 810px"':'')+' alt="'+e(a.alt)+'" width="'+m.width+'" height="'+m.height+'" fetchpriority="high" decoding="async"'+(m.origin.startsWith('https:')?' data-fallback="'+m.origin+'"':'')+'>';
 const html='<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>'+e(a.title)+'</title><meta name="description" content="'+e(a.description)+'"><link rel="canonical" href="'+url+'"><meta property="og:type" content="article"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="More em um Tegra"><meta property="og:title" content="'+e(a.h1)+'"><meta property="og:description" content="'+e(a.description)+'"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+host+m.src+'"><meta property="og:image:alt" content="'+e(a.alt)+'"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+e(a.h1)+'"><meta name="twitter:description" content="'+e(a.description)+'"><meta name="twitter:image" content="'+host+m.src+'">'+fav+'<link rel="stylesheet" href="/src-greenn/blog/blog.css"><link rel="stylesheet" href="/src-greenn/blog/mercado-editorial.css"><style>'+commonStyle+'</style><script type="application/ld+json">'+structured+'</script><script defer src="/src-greenn/blog/mercado-editorial.js"></script></head><body>'+header+'<main id="conteudo" class="wrap"><nav class="breadcrumbs" aria-label="Caminho da página"><ol><li><a href="/">Início</a></li><li><a href="/blog/">Blog</a></li><li><a href="/blog/mercado/">Mercado imobiliário</a></li><li aria-current="page">'+e(a.breadcrumb)+'</li></ol></nav><article class="mnt-market-article"><header><span class="eyebrow">Mercado imobiliário</span><h1>'+e(a.h1)+'</h1><p class="byline">Equipe editorial More em um Tegra</p>'+first+'</header><figure class="mnt-market-hero">'+img+'<figcaption>'+e(a.caption)+'</figcaption></figure><div class="mnt-market-copy">'+body+'</div>'+sab+next+'<p><a href="/blog/mercado/">Voltar para Mercado imobiliário</a></p></article></main>'+footer+'<nav class="mnt-market-dock" aria-label="Ações rápidas"><a href="/regioes/#formulario">Receber condições</a><a href="'+wa+'" target="_blank" rel="noopener noreferrer" aria-label="Conversar com Sabrina da Tegra no WhatsApp">WhatsApp</a></nav></body></html>\n';
 const dir='src-greenn'+a.url;mkdirSync(dir,{recursive:true});writeFileSync(dir+'index.html',html);
 a.words=editorialText.split(/\s+/).filter(x=>/[\p{L}\p{N}]/u.test(x)).length;
 a.internalLinks=[...body.matchAll(/href="(\/[^\"]+)"/g)].map(x=>x[1]);a.sources=[...body.matchAll(/href="(https:[^\"]+)"/g)].map(x=>x[1]);
}
writeFileSync(root+'/mapa-artigos.json',JSON.stringify(data,null,2)+'\n');
const v=JSON.parse(readFileSync('vercel.json','utf8'));
for(const a of data){if(!v.rewrites.some(r=>r.source===a.url))v.rewrites.push({source:a.url,destination:'/src-greenn'+a.url+'index.html'});}
writeFileSync('vercel.json',JSON.stringify(v,null,2)+'\n');
console.log(JSON.stringify(data.map(a=>({id:a.id,words:a.words,url:a.url}))));
