#!/usr/bin/env node
// Mensuração por região (Wagner, 2026-11-10). Contrato: scripts/lib/commercial-channels.mjs;
// motivo e diagnóstico: docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md.
// - Páginas RJ: um único bootstrap GTM igual ao de SP (consentimento padrão antes do gtm.js), identidade de
//   página, raiz [data-moretegra], runtime + measurement-core + measurement-form, formulário 47.
// - Fora do Rio: nenhum formulário 47.
// - Módulos compartilhados: form 47 só por declaração explícita; padrão 46 (SP) preservado.
// - Dados pessoais: os módulos de mensuração não leem nome, e-mail nem telefone (V6).
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { ANALYTICS, CHANNELS, RJ_PAGES, RJ_PROJECT_SLUGS } from "./lib/commercial-channels.mjs";

const fails = [];
const count = (s, needle) => s.split(needle).length - 1;
const LEGACY_RUNTIME="/src-greenn/preview/runtime.js?v=20261125-v3";
const RESF_RUNTIME="/src-greenn/preview/runtime-resf-phone-v1.js?v=20261126-g01";
const RESF_RJ=new Set(["src-greenn/empreendimentos/riio-by-piero-lissoni/index.html","src-greenn/empreendimentos/kronos-by-tegra/index.html"]);
const MEASUREMENT_SCRIPTS=["measurement-core.js","measurement-form.js"].map(n=>"/src-greenn/preview/"+n+"?v=20261125-v3");
function scriptContract(file,h){
 const result=[];
 const expected=RESF_RJ.has(file)?RESF_RUNTIME:LEGACY_RUNTIME;
 const other=expected===RESF_RUNTIME?LEGACY_RUNTIME:RESF_RUNTIME;
 const scripts=[expected,...MEASUREMENT_SCRIPTS];
 for(const tag of scripts)if(count(h,tag)!==1)result.push(file+": "+tag+" must be loaded exactly once");
 if(count(h,other)!==0)result.push(file+": unexpected alternate runtime");
 // Count actual runtime script tags independently of version to catch duplicates.
 if([...h.matchAll(/<script\b[^>]*\bsrc=["']\/src-greenn\/preview\/(?:runtime|runtime-resf-phone-v1)\.js(?:\?[^"']*)?["'][^>]*>/gi)].length!==1)result.push(file+": runtime script tag must be unique");
 const manager="/src-greenn/preview/consent-v3.js?v=20261125-final";
 if(h.indexOf(expected)<0||h.indexOf(manager)<0||h.indexOf(manager)>h.indexOf(expected))result.push(file+": manager must precede runtime");
 if(h.indexOf(expected)>h.indexOf(scripts[1])||h.indexOf(scripts[1])>h.indexOf(scripts[2]))result.push(file+": runtime/core/form execution order");
 return result;
}

for (const file of RJ_PAGES) {
  const h = readFileSync(file, "utf8");
  const slug = file.split("/").at(-2);
  // Basic Consent Mode V3: centralized loader is first in <head>, inline GTM is forbidden.
  const manager = '/src-greenn/preview/consent-v3.js?v=20261125-final';
  if (count(h, manager) !== 1 || h.indexOf(manager) > h.indexOf("</head>")) fails.push(file + ": V3 manager must be unique and early");
  if (h.includes("gtm.start") || h.includes("default_consent") || h.includes("googletagmanager.com/ns.html")) fails.push(file + ": legacy GTM bootstrap forbidden");
  fails.push(...scriptContract(file,h));
  if (!/<body[^>]*\bdata-moretegra\b(?!-)/.test(h)) fails.push(`${file}: <body> without [data-moretegra] root`);
  const html = (h.match(/<html[^>]*>/) || [""])[0];
  if (!/data-mnt-page-identity="[a-z0-9_]+"/.test(html) || !/data-mnt-product-identity="[a-z0-9-]+"/.test(html)) fails.push(`${file}: page/product identity missing on <html>`);
  if (RJ_PROJECT_SLUGS.includes(slug)) {
    if (!html.includes(`data-mnt-page-identity="${slug.replace(/-/g, "_")}_project"`) || !html.includes(`data-mnt-product-identity="${slug}"`)) fails.push(`${file}: identity must follow <slug>_project / <slug>`);
    if (!/data-moretegra-interest="[^"]+"/.test(html)) fails.push(`${file}: project name (data-moretegra-interest) missing, generate_lead would lose project_name`);
  }
  if(RESF_RJ.has(file)){
    if(!scriptContract(file,h.replace(RESF_RUNTIME,LEGACY_RUNTIME)).length)fails.push(file+": negative test accepted legacy runtime");
    if(!scriptContract(file,h.replace(RESF_RUNTIME,RESF_RUNTIME+" "+LEGACY_RUNTIME)).length)fails.push(file+": negative test accepted two runtimes");
  }
  if (count(h, `data-form-id="${CHANNELS.rj.formId}"`) !== 1 || count(h, `name="form_id" value="${CHANNELS.rj.formId}"`) !== 1) fails.push(`${file}: Rio lead form must be Green form ${CHANNELS.rj.formId}`);
  if (h.includes(`data-form-id="${CHANNELS.sp.formId}"`) || h.includes(`name="form_id" value="${CHANNELS.sp.formId}"`)) fails.push(`${file}: São Paulo form ${CHANNELS.sp.formId} on a Rio page`);
  if (!h.includes(`name="tenant_id" value="${ANALYTICS.greenTenant}"`)) fails.push(`${file}: Green tenant ${ANALYTICS.greenTenant} missing`);
}

const rj = new Set(RJ_PAGES.map((p) => path.normalize(p)));
const walk = (d) => readdirSync(d).flatMap((n) => { const p = path.join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const file of walk("src-greenn").filter((f) => f.endsWith(".html") && !rj.has(path.normalize(f)))) {
  const h = readFileSync(file, "utf8");
  if (h.includes(`data-form-id="${CHANNELS.rj.formId}"`) || h.includes(`name="form_id" value="${CHANNELS.rj.formId}"`)) fails.push(`${file}: Rio form ${CHANNELS.rj.formId} outside the Rio pages`);
}

for(const runtimeName of ["runtime.js","runtime-resf-phone-v1.js"]){
const runtime = readFileSync("src-greenn/preview/"+runtimeName, "utf8");
if (!runtime.includes('const FORM_ID = "46";') || !runtime.includes('const FORM_IDS = Object.freeze(["46", "47"]);')) fails.push("runtime.js: form allowlist 46/47 with default 46 missing");
if (!runtime.includes('payload.append("form_id", formIdOf(form));')) fails.push("runtime.js: payload must use the declared (allowlisted) form id");
if (!runtime.includes("form_id: formIdOf(form),")) fails.push("runtime.js: conversion marker must carry the form id");
}
const mform = readFileSync("src-greenn/preview/measurement-form.js", "utf8");
if (!mform.includes(`[data-form-id="47"]`) || !mform.includes('f.dataset.formId==="47"?{form_id:47,placement:"form_47"}:{}')) fails.push("measurement-form.js: form 47 must be recognized only by explicit declaration");
if (!mform.includes("form_id:46,")) fails.push("measurement-form.js: São Paulo default (form 46) changed");
const ty = readFileSync("src-greenn/preview/thank-you-measurement.js", "utf8");
if (!ty.includes('leadFormId = marker.form_id === "47" ? 47 : 46;')) fails.push("thank-you-measurement.js: only the exact marker value \"47\" may identify a Rio lead");
if (!ty.includes(`wa.me/${CHANNELS.rj.whatsapp}`)) fails.push("thank-you-measurement.js: Rio /obrigado/ WhatsApp must be the RJ channel");

// V6: módulos de mensuração não leem campos pessoais do formulário.
const PII = /elements\s*\[\s*["'](?:nome|email|telefone)["']\s*\]|name=\\?["'](?:nome|email|telefone)\\?["']|#mt-lead-(?:name|email|phone)|\bresult\.(?:name|email|phone)\b/;
for (const f of ["measurement-core.js", "measurement-form.js", "thank-you-measurement.js"]) {
  const s = readFileSync(`src-greenn/preview/${f}`, "utf8");
  const hit = s.match(PII);
  if (hit) fails.push(`${f}: reads a personal form field (${hit[0]})`);
}

if (fails.length) { fails.forEach((f) => console.error("FAIL " + f)); process.exit(1); }
console.log(`PASS measurement by region: ${RJ_PAGES.length} Rio pages with one ${ANALYTICS.gtm} bootstrap, identity and form ${CHANNELS.rj.formId}; no form ${CHANNELS.rj.formId} outside Rio; SP default form ${CHANNELS.sp.formId}; no personal fields in measurement modules.`);
