import fs from "node:fs";

function read(path){return fs.readFileSync(path,"utf8")}
function assert(condition,message){if(!condition){console.error("FAIL:",message);process.exitCode=1}else console.log("PASS:",message)}
function count(text,needle){return text.split(needle).length-1}

const runtime=read("src-greenn/preview/runtime.js");
const home=read("src-greenn/preview/index.html");
const homeJs=read("src-greenn/moretegra.js");
const elo=read("src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html");
const aria=read("src-greenn/empreendimentos/aria-higienopolis/index.html");
const ledge=read("src-greenn/empreendimentos/ledge-brooklin/index.html");
const soma=read("src-greenn/empreendimentos/soma-perdizes/index.html");
const zahle=read("src-greenn/empreendimentos/zahle-jardins/index.html");
const ypy=read("src-greenn/empreendimentos/ypy-alto-do-ipiranga/index.html");
const bem=read("src-greenn/empreendimentos/bem-moema/index.html");
const mozae=read("src-greenn/empreendimentos/mozae-higienopolis/index.html");
const cap=read("src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html");
const capSource=read("experiments/capiitolo-editorial-v3/index.html");

for(const [key,value] of Object.entries({
  conditions:"Condições e disponibilidade",
  schedule_visit:"Agendar visita",
  payment_simulation:"Simular forma de pagamento",
  specialist:"Falar com especialista",
  negotiate_scenario:"Negociar meu cenário"
})){
  assert(runtime.includes(`${key}: "${value}"`),`runtime allowlists ${key}`);
}
assert(runtime.includes('const formIntentTarget = element.closest("[data-form-intent]");'),"runtime observes only explicit data-form-intent controls");
assert(runtime.includes('if (formIntentTarget) applyFormIntent(formIntentTarget.dataset.formIntent);'),"runtime applies controlled intent key");
assert(runtime.includes('if (!value || !(intent instanceof HTMLSelectElement)) return false;'),"runtime fails closed for invalid mapping/select");
assert(runtime.includes('if (![...intent.options].some((option) => option.value === value)) return false;'),"runtime refuses unmapped form values");

for(const [name,text] of [["Home",home],["Elo Duo",elo],["Ária",aria],["Ledge",ledge],["Soma",soma],["Zahle",zahle],["YPY",ypy],["Bem Moema",bem],["Mozae",mozae],["CAPIITOLO source",capSource]]){
  assert(text.includes('value="Negociar meu cenário"'),`${name} exposes controlled Negociar meu cenário option`);
}

assert(home.includes('href="#formulario" data-form-intent="negotiate_scenario">Quero negociar meu cenário</a>'),"Home negotiation CTA preserves its intent");
assert(home.includes('href="#formulario" data-form-intent="conditions">Receber condições</a>'),"Home conditions CTA preserves conditions intent");
assert(homeJs.includes('data-interest="${escapeHtml(interestValue)}" data-form-intent="conditions"'),"Home project cards preserve conditions intent");
assert((home.match(/data-form-anchor/g)||[]).length===1,"Home exposes exactly one post-interest context mount");
assert(!home.includes('id="formulario" class="mt-form-anchor"'),"Home interest mount does not duplicate #formulario");
assert(homeJs.includes('function ensureInterestContext(root)')&&homeJs.includes('data-interest-gallery'),"Home preserves post-interest gallery journey");
assert(homeJs.includes('function projectSearchLead(project)')&&homeJs.includes('mt-project-search-lead'),"Home renders semantic project-card copy");
assert(homeJs.includes('"Preço a partir de"'),"Home regular price labels expose natural price intent");
assert(homeJs.includes('data-form-intent="conditions"\n         aria-label="Receber condições"'),"Home floating CTA preserves conditions intent");

assert(elo.includes('data-project-intent="conditions" data-form-intent="conditions"'),"Elo Duo commercial CTA maps to conditions");
assert(elo.includes('data-project-intent="floating-conditions" data-form-intent="conditions"'),"Elo Duo floating CTA maps to conditions");

assert(aria.includes('data-project-intent="schedule-visit" data-form-intent="schedule_visit"'),"Ária visit CTA maps to schedule visit");
assert(aria.includes('data-project-intent="payment-simulation" data-form-intent="payment_simulation"'),"Ária payment CTA maps to payment simulation");
assert(count(aria,'data-form-intent="conditions"')>=3,"Ária conditions CTAs consistently map to conditions");
assert(ledge.includes('data-form-intent="conditions">Receber condições ↓</a>'),"Ledge hero CTA maps to conditions");
assert(ledge.includes('data-form-intent="schedule_visit">Agendar atendimento'),"Ledge visit CTA maps to schedule visit");
assert(soma.includes('data-form-intent="conditions">Receber condições ↓</a>'),"Soma hero CTA maps to conditions");
assert(soma.includes('data-project-intent="floating-conditions" data-form-intent="conditions"'),"Soma floating CTA maps to conditions");
assert(zahle.includes('data-form-intent="conditions">Receber condições ↓</a>'),"Zahle hero CTA maps to conditions");
assert(zahle.includes('data-project-intent="floating-conditions" data-form-intent="conditions"'),"Zahle floating CTA maps to conditions");
assert(ypy.includes('data-form-intent="conditions">Receber condições ↓</a>'),"YPY hero CTA maps to conditions");
assert(ypy.includes('data-project-intent="floating-conditions" data-form-intent="conditions"'),"YPY floating CTA maps to conditions");
assert(bem.includes('data-form-intent="conditions">Receber condições ↓</a>'),"Bem Moema hero CTA maps to conditions");
assert(bem.includes('data-project-intent="floating-conditions" data-form-intent="conditions"'),"Bem Moema floating CTA maps to conditions");
assert(mozae.includes('data-form-intent="conditions">Receber condições ↓</a>'),"Mozae hero CTA maps to conditions");
assert(mozae.includes('data-project-intent="floating-conditions" data-form-intent="conditions"'),"Mozae floating CTA maps to conditions");

assert(cap.includes("<title>CAPIITOLO Tegra Chácara Klabin | Piero Lissoni</title>"),"CAPIITOLO official title is preserved");
assert(cap.includes("<h1>CAPIITOLO Tegra<br>Chácara Klabin</h1>"),"CAPIITOLO official fallback H1 is preserved");
assert(cap.includes('rel="canonical" href="https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/"'),"CAPIITOLO canonical route is unchanged");
assert(cap.includes("<strong>Capitolo Tegra</strong>") && cap.includes("<strong>Capitolo by Piero Lissoni</strong>"),"CAPIITOLO fallback naturally covers Capitolo search variants");
assert(capSource.includes("Capitolo Tegra") && capSource.includes("Capitolo by Piero Lissoni"),"rendered CAPIITOLO content covers Capitolo search variants");
assert(capSource.includes('data-form-intent="conditions">Receber condições ↓</a>'),"CAPIITOLO hero is single-purpose conditions CTA");
assert(!capSource.includes("Receber condições e agendar visita"),"CAPIITOLO mixed-intent hero CTA is removed");
assert(capSource.includes('data-form-intent="schedule_visit">Agendar visita'),"CAPIITOLO retains separate visit CTA");
assert(cap.includes('data-form-intent="conditions">Receber condições <span>↓</span></a>'),"CAPIITOLO inserted commercial CTA maps to conditions");

const sourceFiles=[home,elo,aria,ledge,soma,zahle,ypy,bem,mozae,capSource];
const allowed=new Set(["conditions","schedule_visit","payment_simulation","specialist","negotiate_scenario"]);
for(const [index,text] of sourceFiles.entries()){
  for(const match of text.matchAll(/data-form-intent="([^"]+)"/g)){
    assert(allowed.has(match[1]),`all static CTA intent keys are allowlisted [source ${index}: ${match[1]}]`);
  }
}

if(process.exitCode) process.exit(process.exitCode);
console.log("M5-06 CTA/Form journey static validation: PASS");
