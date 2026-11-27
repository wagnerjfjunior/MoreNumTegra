import {isG01ApprovedPath,assertG01ApprovedSnapshot} from "./resf-g01-approved-snapshot.mjs";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
const BASE="3dca8bcad72a0b7f259cfae4088a73b2e70d7f04";
const MANAGER='/src-greenn/preview/consent-v3.js?v=20261125-final';
const dynamic=new Set(["src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html","src-greenn/empreendimentos/dsg-itaim/index.html"]);
export function applyV3(s,path){
 if(dynamic.has(path)){
  const i=s.toLowerCase().indexOf("</head>");assert(i>0,path+" missing head");
  let n=0;
  const head=s.slice(0,i).replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi,(m,a,b)=>{
   if((b.includes("default_consent")||b.includes("gtm.start"))&&!a.includes("ld+json")){n++;return "";}
   return m;
  });
  assert.equal(n,2,path+" original bootstrap count");
  s=head+s.slice(i);
  const lines=s.split("\n");
  assert.equal(lines.filter(x=>x.trimStart().startsWith('const gtm=doc.createElement("script")')).length,1);
  assert.equal(lines.filter(x=>x.trimStart().startsWith('const ns=doc.createElement("noscript")')).length,1);
  s=lines.filter(x=>!x.trimStart().startsWith('const gtm=doc.createElement("script")')&&!x.trimStart().startsWith('const ns=doc.createElement("noscript")')).join("\n");
  const find='      const doc=new DOMParser().parseFromString(html,"text/html");';
  const insert=find+'\n      // The effective commercial document is written by this adapter: initialize V3 there.\n      const consentScript=doc.createElement("script");\n      consentScript.src="'+MANAGER+'";\n      doc.head.insertBefore(consentScript,doc.head.firstChild);\n      doc.querySelectorAll(\'script[src^="/src-greenn/preview/"]\').forEach(node=>{node.src=node.getAttribute("src").split("?")[0]+"?v=20261125-v3";});';
  assert.equal(s.split(find).length,2);
  return s.replace(find,insert);
 }
 let z=s.replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi,(m,a,b)=>{
  if(/\bsrc\s*=/i.test(a))return m;
  if(b.includes("default_consent"))return "";
  if((b.includes("gtm.start")||b.includes("googletagmanager.com/gtm.js")||a.includes("mnt-gtm-pilot"))&&(b.includes("GTM-PGCR4R47")||a.includes("mnt-gtm-pilot")))return "";
  return m;
 });
 z=z.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/gi,m=>m.includes("googletagmanager.com/ns.html")?"":m);
 z=z.replace(/<script\s+src="\/src-greenn\/preview\/consent-v3\.js[^"]*"\s*><\/script>\s*/gi,"");
 z=z.replace(/<head\b[^>]*>/i,m=>m+'\n<script src="'+MANAGER+'"></script>\n');
 for(const f of ["runtime.js","measurement-core.js","measurement-form.js","thank-you-measurement.js","agentic-web.js"]){
  z=z.replace(new RegExp("(/src-greenn/preview/"+f.replace(".","\\.")+")(?:\\?[^\\\"]*)?(?=\\\")","g"),"$1?v=20261125-v3");
 }
 z=z.replace(/(\/src-greenn\/blog\/measurement-editorial\.js)(?:\?[^"]*)?(?=")/g,"$1?v=20261125-v3");
 return z;
}
export function verifiedPreV3(path){
 const before=execFileSync("git",["show",BASE+":"+path],{encoding:"utf8"});
 const current=readFileSync(path,"utf8");
 // Later approved G01 release: exact immutable equality, not a consent bypass.
 if(isG01ApprovedPath(path)){assertG01ApprovedSnapshot(path,current);return before;}
 let expected=applyV3(before,path);
 // Explicitly authorized post-V3 home edits (#639 and #640); retain exact equality for every other byte.
 if(path==="src-greenn/preview/index.html"){
  const image="https://helbor.com.br/storage/development/gallery/2026/03/13/Vista_aerea_Rua_Jardim_Vivas_a39ff60521.jpg";
  assert.equal(expected.split(image).length,3);
  expected=expected.split(image).join("https://s3-gdigital.s3.amazonaws.com/gdigital/313/Vista_aerea_Rua_Jardim.webp");
  assert.equal(expected.split("O player é carregado apenas quando você iniciar o vídeo.").length,2);
  expected=expected.replace("O player é carregado apenas quando você iniciar o vídeo.","Toque para carregar o vídeo externo do YouTube. A reprodução automática depende das suas preferências de cookies e das condições do dispositivo.");
  assert.equal(expected.split("moretegra.js?v=20261124-fgts-contexto").length,2);
  expected=expected.replace("moretegra.js?v=20261124-fgts-contexto","moretegra.js?v=20261126-poster-stable");
  // Authorized critical-path-only homepage changes: exact substitutions, no relaxed comparisons.
  for(const [oldValue,newValue] of [["<script src=\"/src-greenn/preview/consent-v3.js?v=20261125-final\"></script>\n\n  <meta charset=\"utf-8\">","  <meta charset=\"utf-8\">\n  <link rel=\"preconnect\" href=\"https://s3-gdigital.s3.amazonaws.com\">\n  <link rel=\"preload\" as=\"image\" href=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Tegra-Incorporadora-Perspectiva-Ilustrada-Caminhos-da-Lapa-Rua-Fortunato-Ferraz-1200x630.webp\" fetchpriority=\"high\">\n  <link rel=\"preload\" as=\"style\" href=\"/src-greenn/moretegra.css\">\n  <link rel=\"preload\" as=\"style\" href=\"/src-greenn/preview/runtime.css\">\n<script src=\"/src-greenn/preview/consent-v3.js?v=20261125-final\"></script>"],["  <link rel=\"preconnect\" href=\"https://s3-gdigital.s3.amazonaws.com\" crossorigin>\n",""],["<img class=\"mt-footer-logo\" src=\"/assets/brand/tegra-vendas-256.webp\" alt=\"Tegra\"","<img class=\"mt-footer-logo\" src=\"/assets/brand/tegra-vendas-256.webp\" width=\"256\" height=\"256\" alt=\"Tegra\""],["<img loading=\"lazy\" decoding=\"async\" src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Vista_aerea_Rua_Jardim.webp\"","<img loading=\"lazy\" decoding=\"async\" fetchpriority=\"low\" width=\"1668\" height=\"1080\" src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Vista_aerea_Rua_Jardim.webp\""]]){
   assert.equal(expected.split(oldValue).length,2,"critical rendering baseline");
   expected=expected.replace(oldValue,newValue);
  }
  assert.equal(expected.split("<script src=\"/src-greenn/preview/consent-v3.js?v=20261125-final\"></script>").length,2,"V6 manager singleton");
  expected=expected.replace("<script src=\"/src-greenn/preview/consent-v3.js?v=20261125-final\"></script>","<script src=\"/src-greenn/preview/consent-v3.js?v=20261125-final\" defer></script>");
  // V7: exact responsive asset substitutions; all other bytes remain governed.
  for(const [oldValue,newValue] of [["<link rel=\"preload\" as=\"image\" href=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Tegra-Incorporadora-Perspectiva-Ilustrada-Caminhos-da-Lapa-Rua-Fortunato-Ferraz-1200x630.webp\" fetchpriority=\"high\">","<link rel=\"preload\" as=\"image\" imagesrcset=\"/assets/home/hero-caminhos-da-lapa-960.webp 960w, https://s3-gdigital.s3.amazonaws.com/gdigital/313/Tegra-Incorporadora-Perspectiva-Ilustrada-Caminhos-da-Lapa-Rua-Fortunato-Ferraz-1200x630.webp 1200w\" imagesizes=\"(min-width: 980px) 42vw, 100vw\" fetchpriority=\"high\">"],["<img src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Tegra-Incorporadora-Perspectiva-Ilustrada-Caminhos-da-Lapa-Rua-Fortunato-Ferraz-1200x630.webp\" width=\"1200\" height=\"630\" alt=\"Perspectiva ilustrada do Caminhos da Lapa, empreendimento Tegra em São Paulo\" fetchpriority=\"high\" decoding=\"async\">","<img src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Tegra-Incorporadora-Perspectiva-Ilustrada-Caminhos-da-Lapa-Rua-Fortunato-Ferraz-1200x630.webp\" srcset=\"/assets/home/hero-caminhos-da-lapa-960.webp 960w, https://s3-gdigital.s3.amazonaws.com/gdigital/313/Tegra-Incorporadora-Perspectiva-Ilustrada-Caminhos-da-Lapa-Rua-Fortunato-Ferraz-1200x630.webp 1200w\" sizes=\"(min-width: 980px) 42vw, 100vw\" width=\"1200\" height=\"630\" alt=\"Perspectiva ilustrada do Caminhos da Lapa, empreendimento Tegra em São Paulo\" fetchpriority=\"high\" decoding=\"async\">"],["<img loading=\"lazy\" decoding=\"async\" fetchpriority=\"low\" width=\"1668\" height=\"1080\" src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Vista_aerea_Rua_Jardim.webp\" alt=\"Vista aérea da Rua Jardim e do entorno residencial na Lapa, Zona Oeste de São Paulo\">","<img loading=\"lazy\" decoding=\"async\" fetchpriority=\"low\" width=\"1920\" height=\"1080\" src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Vista_aerea_Rua_Jardim.webp\" srcset=\"/assets/home/rua-jardim-768.webp 768w, https://s3-gdigital.s3.amazonaws.com/gdigital/313/Vista_aerea_Rua_Jardim.webp 1920w\" sizes=\"90vw\" alt=\"Vista aérea da Rua Jardim e do entorno residencial na Lapa, Zona Oeste de São Paulo\">"],["<img src=\"https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp\" width=\"666\" height=\"375\" alt=\"Tegra\" decoding=\"async\">","<img src=\"/assets/home/logo-tegra-amarelo-288.webp\" width=\"288\" height=\"162\" srcset=\"/assets/home/logo-tegra-amarelo-288.webp 288w, https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp 666w\" sizes=\"(min-width: 760px) 96px, 82px\" alt=\"Tegra\" decoding=\"async\">"]]){
   assert.equal(expected.split(oldValue).length,2,"V7 responsive image baseline");
   expected=expected.replace(oldValue,newValue);
  }
 }
 assert.equal(current,expected,path+": actual HTML differs from the only authorized V3 migration; other business/schema/media changes prohibited");
 return before;
}
