import fs from "node:fs";

function read(path){return fs.readFileSync(path,"utf8")}
function assert(condition,message){if(!condition){console.error("FAIL:",message);process.exitCode=1}else console.log("PASS:",message)}

const runtime=read("src-greenn/preview/runtime.js");
const thankyou=read("src-greenn/preview/thank-you-measurement.js");
const core=read("src-greenn/preview/measurement-core.js");
const elo=read("src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html");
const aria=read("src-greenn/empreendimentos/aria-higienopolis/index.html");
const m203=read("docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md");
const m204=read("docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md");
const m209=read("docs/measurement/MNT_M2_09_FORM46_THANK_YOU_LEAD_CONTRACT_2026-09-12.md");

assert(runtime.includes('const LEAD_PENDING_KEY = "mnt.lead.pending.v2";'),"runtime writes versioned v2 lead marker");
assert(runtime.includes('const LEGACY_LEAD_PENDING_KEY = "mnt.lead.pending.v1";'),"runtime.explicitly cleans legacy v1 marker");
assert(runtime.includes("version: 2")&&runtime.includes("submitted_at: Date.now()"),"v2 marker contains version + submit timestamp");
assert(runtime.includes("project_name: PROJECT_NAME_OVERRIDES[offerName] || offerName")&&runtime.includes("offer_name: offerName"),"v2 marker contains only controlled project/offer business context");
assert(runtime.includes("setPendingLead(form);"),"marker is written only after successful Form46 response path");

assert(thankyou.includes('const LEAD_PENDING_KEY = "mnt.lead.pending.v2";'),"thank-you consumes v2 marker");
assert(thankyou.includes('const LEGACY_LEAD_PENDING_KEY = "mnt.lead.pending.v1";'),"thank-you preserves rollout compatibility with v1");
assert(thankyou.includes("if (leadContext === null) return false;"),"invalid/missing marker fails closed");
assert(thankyou.includes("...leadContext"),"lead success carries controlled project context");
assert(thankyou.includes("/[<>@\\r\\n]/"),"thank-you rejects obviously unsafe business-label input");

assert(core.includes('key==="payment_simulation"||key==="negotiate_scenario"'),"shared Measurement normalizes payment simulation to existing negotiation semantic");
assert(core.includes('intent("negotiate_scenario","form",place,c)'),"payment/negotiation form intent emits negotiate_scenario");
assert(core.includes('exactProject()?"request_project_conditions":"request_conditions"'),"conditions distinguish exact-project vs portfolio semantics");
assert(core.includes('intent("schedule_visit","form",place,c)'),"form-based visit emits schedule_visit");
assert(core.includes('projectFloating.matches(".mnt-contact-float")'),"CAPIITOLO floating form CTA is measured");
assert(core.includes('intent("whatsapp_contact","whatsapp","floating",c)'),"floating WhatsApp remains secondary intent");

assert(elo.includes('key==="payment_simulation"||key==="negotiate_scenario"')&&elo.includes('return"request_project_conditions"'),"Elo Duo inline semantics use canonical form mapping");
assert(elo.includes('const waType="whatsapp_contact"'),"Elo Duo WhatsApp emits contact intent");
assert(aria.includes('key==="payment_simulation"||key==="negotiate_scenario"')&&aria.includes('return"negotiate_scenario"'),"Ária payment simulation normalizes to negotiate_scenario");
assert(aria.includes('wa.closest("#visita")?"schedule_visit":"whatsapp_contact"'),"Ária visit WhatsApp is distinguished from general WhatsApp");

assert(m203.includes("Exact-project “Simular forma de pagamento”")&&m203.includes("`negotiate_scenario`"),"M2-03 records approved payment semantic");
assert(m204.includes("Simular forma de pagamento")&&m204.includes("mnt_intent.intent_type = negotiate_scenario"),"M2-04 records approved SECONDARY normalization");
assert(m209.includes("mnt.lead.pending.v2")&&m209.includes("project_name?:")&&m209.includes("offer_name?:"),"M2-09 records privacy-preserving marker v2");

if(process.exitCode) process.exit(process.exitCode);
console.log("M5-07 lead semantics static validation: PASS");
