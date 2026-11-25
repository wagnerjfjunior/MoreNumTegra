import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const script=readFileSync(new URL("../src-greenn/preview/agentic-web.js",import.meta.url),"utf8");
const html=readFileSync(new URL("../src-greenn/preview/index.html",import.meta.url),"utf8");
const execute=new Function("document","location","URL","Symbol","Promise",script);
const makeCard=(name,href,zone,status,place,info,price,note="Referência")=>{
 const fields={"h3":name,".mt-project-location":place,".mt-project-info":info,".mt-feature":"Varanda",".mt-status":status,".mt-price-current":price,".mt-price-label":"A partir de",".mt-price-urgency":note};
 return {dataset:{city:"São Paulo",zone,status},querySelector(q){
  if(q==='a.mt-interest[href^="/empreendimentos/"]')return{getAttribute:()=>href};
  if(q===".mt-price-promo"||q===".mt-price-cash")return null;
  return Object.hasOwn(fields,q)?{textContent:fields[q]}:null;
 }};
};
const cards=[
makeCard("Nova Vivere | 105 m²","/empreendimentos/nova-vivere/?unidade=708#valores","Zona Oeste","lancamento","Lapa · Zona Oeste","105 m² · 3 suítes","R$ 1.129.900","Condição de 29/08/2026"),
makeCard("Garden Design","/empreendimentos/garden-design/","Zona Oeste","construcao","Lapa · Zona Oeste","61 m² a 78 m²","R$ 695.600"),
makeCard("Caminhos da Lapa Elo Duo","/empreendimentos/caminhos-da-lapa-elo-duo/","Zona Oeste","entregue","Lapa · Zona Oeste","67 m² · 2 dormitórios","R$ 690.000")];
const registered=[];let submits=0,scrolls=0,focuses=0;
const intent={value:"Condições",options:[{value:"Agendar visita"}]};
const form={elements:{"texto-livre":intent},scrollIntoView(){scrolls++},querySelector(){return{focus(){focuses++}}},submit(){submits++}};
const context={registerTool(tool){registered.push(tool);return Promise.resolve()}};
const document={modelContext:context,readyState:"complete",querySelectorAll(){return cards},querySelector(){return form}};
const location={hostname:"www.moretegra.com.br",pathname:"/",origin:"https://www.moretegra.com.br"};
execute(document,location,URL,Symbol,Promise);
assert.deepEqual(registered.map(tool=>tool.name),["search_properties","get_property_details","compare_properties","get_property_location","get_property_price","request_visit"]);
for(const tool of registered){assert.equal(tool.inputSchema.type,"object");assert.equal(tool.inputSchema.additionalProperties,false);assert.equal(typeof tool.execute,"function");}
const call=async(name,args={})=>JSON.parse(await registered.find(tool=>tool.name===name).execute(args));
let result=await call("search_properties",{region:"Zona Oeste",stage:"lancamento",min_area:100});
assert.equal(result.total,1);assert.equal(result.results[0].slug,"nova-vivere");assert.equal(result.results[0].published_price,1129900);
assert.equal(result.results[0].price_reference,"29/08/2026");
assert.equal(result.results[0].canonical_url,"https://www.moretegra.com.br/empreendimentos/nova-vivere/");
result=await call("search_properties",{neighborhood:"lápá",max_price:700000});assert.equal(result.total,2);
result=await call("search_properties",{query:"não existe"});assert.equal(result.total,0);
result=await call("search_properties",{limit:1});assert.equal(result.total,3);assert.equal(result.returned,1);
for(const params of [{bad:"x"},{query:"x".repeat(200)},{min_price:-1},{stage:"invalid"},{max_area:22,min_area:100},{limit:1000}]){
 assert.equal((await call("search_properties",params)).ok,false,JSON.stringify(params));
}
assert.equal((await call("search_properties",{query:"<script>alert(1)</script>"})).total,0);
assert.equal((await call("get_property_details",{slug:"nova-vivere"})).property.variants.length,1);
assert.equal((await call("get_property_details",{slug:"missing"})).ok,false);
assert.equal((await call("get_property_price",{slug:"nova-vivere"})).prices[0].price_note,"Condição de 29/08/2026");
assert.equal((await call("get_property_location",{slug:"garden-design"})).neighborhood,"Lapa");
assert.equal((await call("compare_properties",{slugs:["garden-design","nova-vivere"]})).comparison.length,2);
assert.equal((await call("compare_properties",{slugs:["nova-vivere","nova-vivere"]})).ok,false);
result=await call("request_visit");assert.equal(result.status,"prepared_only");
assert.equal(intent.value,"Agendar visita");assert.equal(scrolls,1);assert.equal(focuses,1);assert.equal(submits,0);
assert.match(html,/toolname="request_sales_contact"/);assert.match(html,/toolparamdescription=/);
assert.doesNotMatch(html,/toolautosubmit/i);assert.match(html,/src-greenn\/preview\/agentic-web\.js/);
assert.doesNotThrow(()=>execute({...document,modelContext:null},location,URL,Symbol,Promise));
assert.doesNotThrow(()=>execute(document,{...location,hostname:"example.com"},URL,Symbol,Promise));
assert.equal(registered.length,6);
assert.doesNotMatch(script,/\bfetch\s*\(|\bXMLHttpRequest\b|\bgtag\s*\(|\bfbq\s*\(|\.submit\s*\(/);
console.log("PASS AGENTIC-WEB-V1: tools/catalogue/search/validation/compare/Form46 fallback and no autosubmit.");
