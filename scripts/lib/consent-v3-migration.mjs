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
 let expected=applyV3(before,path);
 // Explicitly authorized post-V3 home edits (#639 and #640); retain exact equality for every other byte.
 if(path==="src-greenn/preview/index.html"){
  const image="https://helbor.com.br/storage/development/gallery/2026/03/13/Vista_aerea_Rua_Jardim_Vivas_a39ff60521.jpg";
  assert.equal(expected.split(image).length,3);
  expected=expected.split(image).join("https://s3-gdigital.s3.amazonaws.com/gdigital/313/Vista_aerea_Rua_Jardim.webp");
  assert.equal(expected.split("O player é carregado apenas quando você iniciar o vídeo.").length,2);
  expected=expected.replace("O player é carregado apenas quando você iniciar o vídeo.","O vídeo inicia automaticamente após o carregamento da página, com atraso de 3 segundos. Você também pode tocar para iniciar.");
  assert.equal(expected.split("moretegra.js?v=20261124-fgts-contexto").length,2);
  expected=expected.replace("moretegra.js?v=20261124-fgts-contexto","moretegra.js?v=20261126-video-delay3");
 }
 assert.equal(current,expected,path+": actual HTML differs from the only authorized V3 migration; other business/schema/media changes prohibited");
 return before;
}
