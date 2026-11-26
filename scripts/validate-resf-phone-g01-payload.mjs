import fs from "node:fs";
import assert from "node:assert/strict";
const source=fs.readFileSync(new URL("../src-greenn/preview/runtime-resf-phone-v1.js",import.meta.url),"utf8");
const check=(x,msg)=>assert.ok(x,msg);
async function testRuntime(source,check){
 class Field {
  constructor(value=""){this.value=value;this.textContent="";this.hidden=false;this.listeners={};this.attrs={};this.validity={valid:true};}
  addEventListener(k,fn){this.listeners[k]=fn}
  removeAttribute(k){delete this.attrs[k]}
  setAttribute(k,v){this.attrs[k]=v}
  focus(){this.focused=true}
 }
 class Form extends Field {}
 class Params {constructor(s){this.s=String(s||"").replace(/^\?/,"").split("&")}get(k){for(const p of this.s){const [a,v]=p.split("=");if(a===k)return decodeURIComponent(v||"")}return null}}
 class Data {constructor(){this.map={}}append(k,v){this.map[k]=v}}
 class Abort {constructor(){this.signal={}}abort(){}}
 const results=[];
 for(const spec of [
 {name:"SP nacional BR",region:"SP",id:"46",iso:"BR",phone:"11987654321",want:"+5511987654321"},
 {name:"SP fallback internacional",region:"SP",id:"46",iso:"OTHER",phone:"00351912345678",want:"+351912345678"},
 {name:"RJ Itália",region:"RJ",id:"47",iso:"IT",phone:"0212345678",want:"+390212345678"},
 {name:"RJ colagem Portugal",region:"RJ",id:"47",iso:"BR",phone:"+351912345678",input:true,want:"+351912345678"},
 {name:"RJ trocado indevidamente para 46",region:"RJ",id:"46",iso:"BR",phone:"11987654321",blocked:true},
 {name:"RJ sem configuração",region:"RJ",id:"",iso:"BR",phone:"11987654321",blocked:true},
 {name:"SP hidden divergente",region:"SP",id:"46",hidden:"47",iso:"BR",phone:"11987654321",blocked:true},
 {name:"SP inválido",region:"SP",id:"46",iso:"OTHER",phone:"123456789",blocked:true},
 {name:"RJ troca país preserva dígitos",region:"RJ",id:"47",iso:"PT",phone:"+351912345678",change:true,want:"+351912345678"},
 {name:"SP preview não envia",region:"SP",id:"46",iso:"BR",phone:"11987654321",preview:true,blocked:true},
 {name:"RJ duplo submit",region:"RJ",id:"47",iso:"US",phone:"2025550123",double:true,want:"+12025550123"},
 {name:"SP erro de rede",region:"SP",id:"46",iso:"BR",phone:"11987654321",network:true,want:"+5511987654321"}
 ]){
  const form=new Form(),country=new Field(spec.iso),phone=new Field(spec.phone),error=new Field(),status=new Field(),submit=new Field(),label=new Field();label.textContent="Enviar";
  form.dataset={formId:spec.id,resfRegion:spec.region,projectName:"Projeto sintético"};
  form.elements={nome:new Field("Teste Sintético"),email:new Field("teste@example.invalid"),telefone_display:phone,"texto-livre":new Field("Condições e disponibilidade")};
  form.querySelector=k=>({"#mt-phone-country":country,"#mt-lead-phone":phone,"#mt-company-website":new Field(),"[data-moretegra-form-submit]":submit,"[data-submit-label]":label,"#mt-lead-error":error,"#mt-lead-status":status,'input[name="form_id"]':new Field(spec.hidden??spec.id)})[k]||null;
  const sent=[],redirects=[],storage=[];
  const document={querySelector:()=>form,documentElement:{dataset:{}},addEventListener(){},readyState:"complete"};
  const window={location:{hostname:spec.preview?"preview.vercel.app":"www.moretegra.com.br",search:"",assign:u=>redirects.push(u)},setTimeout:()=>1,clearTimeout(){},sessionStorage:{setItem:(k,v)=>storage.push([k,v]),removeItem(){}}};
  const fetch=async(url,opts)=>{sent.push({url,payload:opts.body.map});if(spec.network)throw Error("network mock");return {ok:true,json:async()=>({})}};
  const isolated=source.replace("    initConsent();\n    initCapiitoloExperience();\n    initForm();","    initForm();");
  check(isolated!==source,"harness startup");
  new Function("document","window","HTMLFormElement","HTMLSelectElement","Element","FormData","AbortController","URLSearchParams","fetch",isolated)(document,window,Form,Field,Field,Data,Abort,Params,fetch);
  if(spec.input)phone.listeners.input();
  if(spec.change){country.listeners.change();check(phone.value===spec.phone,spec.name+" preservation")}
  const event={preventDefault(){}};
  if(spec.double)await Promise.all([form.listeners.submit(event),form.listeners.submit(event)]);else await form.listeners.submit(event);
  if(spec.blocked){check(sent.length===0,spec.name+" blocked");check(redirects.length===0,spec.name+" redirect");}
  else{check(sent.length===1,spec.name+" single request");const {url,payload}=sent[0];check(url==="https://back.gdigital.com.br/form/register",spec.name+" endpoint");check(payload.form_id===spec.id&&payload.tenant_id==="313"&&payload.title==="MoreEmUmTegra"&&payload.telefone===spec.want,spec.name+" payload "+JSON.stringify(payload));check(payload["texto-livre"]==="Projeto sintético | Condições e disponibilidade",spec.name+" context");check(spec.network?redirects.length===0&&!!error.textContent:redirects[0]==="/obrigado/"&&storage.length===1,spec.name+" success or error");}
  results.push(spec.name);
 }
 return results;
}
console.log(await testRuntime(source,check));
