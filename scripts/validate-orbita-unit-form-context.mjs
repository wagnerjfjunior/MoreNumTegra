import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const page=fs.readFileSync('src-greenn/empreendimentos/universo-tatuape-orbita/index.html','utf8');
const runtime=fs.readFileSync('src-greenn/preview/runtime.js','utf8');
function fn(name){const start=runtime.indexOf(`  function ${name}(`);assert(start>=0);const end=runtime.indexOf('\n  function ',start+1);return runtime.slice(start,end);}
const selector=[...page.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]).find(x=>x.includes('data-orbita-unit'));
assert(selector);
const intents=[...page.matchAll(/<option value="([^"]+)"/g)].map(x=>x[1]).filter(x=>!x.startsWith('+'));
assert.equal(intents.length,5);
const project='Universo Tatuapé Órbita';
let cases=0;
for(const initial of ['2408','1305','unknown']){
 const form={dataset:{projectName:project},elements:{}};
 const intent={value:intents[0],form};form.elements['texto-livre']=intent;
 const buttons=['2408','1305'].map(id=>({dataset:{orbitaUnit:id},attributes:{},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,f){this.click=f;}}));
 const nodes={'orbita-unit-label':{},'orbita-unit-price':{},'orbita-unit-note':{},'mt-lead-intent':intent};
 const ctx=vm.createContext({URLSearchParams,location:{search:`?unidade=${initial}`},document:{querySelectorAll:()=>buttons,getElementById:id=>nodes[id]},selectedInterest:()=>'',NO_PROJECT_CONTEXT:'Nenhum empreendimento selecionado',PROJECT_NAME_OVERRIDES:{}});
 vm.runInContext(fn('leadProjectContext')+fn('measurementProjectContext')+fn('composeLeadContext')+selector,ctx);
 assert.equal(form.dataset.leadUnit,initial==='unknown'?'2408':initial);
 for(const unit of ['2408','1305'])for(const choice of intents){
  intent.value=choice;buttons.find(b=>b.dataset.orbitaUnit===unit).click();
  ctx.testForm=form;
  assert.equal(vm.runInContext('composeLeadContext(testForm)',ctx),`${project} | Unidade ${unit} | ${choice}`);
  assert.equal(intent.value,choice,'unit change must preserve selected intent');
  assert.equal(buttons.find(b=>b.dataset.orbitaUnit===unit).attributes['aria-pressed'],'true');
  assert.equal(vm.runInContext('measurementProjectContext(testForm).offer_name',ctx),project,'unit must not change measurement offer');
  cases++;
 }
 delete form.dataset.leadUnit;ctx.testForm=form;
 assert.equal(vm.runInContext('composeLeadContext(testForm)',ctx),`${project} | ${intent.value}`,'forms without unit must retain existing context');
 intent.value='';assert.equal(vm.runInContext('composeLeadContext(testForm)',ctx),project);
}
assert(runtime.includes('payload.append("texto-livre", result.leadContext)'));
console.log(`PASS: ${cases} unit/intent transitions; default/deep links, fallback, measurement isolation and non-unit forms; no network requests`);
