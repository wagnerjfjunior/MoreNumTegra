#!/usr/bin/env node
// Isolamento dos canais comerciais RJ/SP (Wagner, 2026-11-10; R1/R7 dos guardrails RESF).
// - Páginas RJ: só o canal da central de atendimento RJ; nenhuma Sabrina, CRECI ou atribuição do canal à Tegra.
// - Todo o resto de src-greenn: só o canal SP; o número RJ não vaza para fora do Rio.
// Fonte dos números e das páginas: scripts/lib/commercial-channels.mjs.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { CHANNELS, RJ_PAGES, RJ_COPY, RJ_FORBIDDEN } from "./lib/commercial-channels.mjs";

const ROOT = "src-greenn";
// Arquivos fora das páginas RJ que citam o canal RJ por desenho:
// - thank-you-measurement.js troca o WhatsApp de /obrigado/ para o canal RJ só quando o marcador é do form 47.
const REGIONAL_SHARED = new Set(["src-greenn/preview/thank-you-measurement.js"]);
const fails = [];
const rj = new Set(RJ_PAGES.map((p) => path.normalize(p)));
const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = path.join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const withoutUrls = (s) => s.replace(/https?:\/\/[^"'\s<>]+/g, "");

for (const file of RJ_PAGES) {
  const html = readFileSync(file, "utf8");
  const wa = [...html.matchAll(/wa\.me\/(\d+)/g)].map((m) => m[1]);
  const tels = [...html.matchAll(/tel:(\+\d+)/g)].map((m) => m[1]);
  if (!wa.length) fails.push(`${file}: no WhatsApp link`);
  for (const n of wa) if (n !== CHANNELS.rj.whatsapp) fails.push(`${file}: WhatsApp ${n} is not the RJ channel`);
  if (!tels.length) fails.push(`${file}: no tel: link`);
  for (const t of tels) if (t !== CHANNELS.rj.tel) fails.push(`${file}: tel ${t} is not the RJ channel`);
  if (html.includes(CHANNELS.sp.whatsapp) || html.includes(CHANNELS.sp.display)) fails.push(`${file}: São Paulo channel present`);
  const hit = withoutUrls(html).match(RJ_FORBIDDEN);
  if (hit) fails.push(`${file}: forbidden on a Rio page (R7): "${hit[0]}"`);
  if (!html.replace(/<[^>]+>/g, "").includes(RJ_COPY.footer)) fails.push(`${file}: approved RJ footer contact missing`);
  for (const blk of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const graph = JSON.parse(blk[1])["@graph"] || [];
    for (const n of graph) {
      if (n.telephone && n.telephone !== CHANNELS.rj.tel) fails.push(`${file}: JSON-LD telephone ${n.telephone} is not the RJ channel`);
      if (n.contactPoint && String(n["@id"]).endsWith("#tegra-vendas")) fails.push(`${file}: RJ ContactPoint attached to Tegra Vendas`);
      if (n["@type"] === "Person") fails.push(`${file}: broker Person on a Rio page`);
    }
  }
}
const hub = readFileSync("src-greenn/rio-de-janeiro/index.html", "utf8");
if (!hub.includes(RJ_COPY.blockTitle) || !hub.includes(RJ_COPY.blockLead)) fails.push("hub: approved RJ service block copy missing");

let spFiles = 0;
for (const file of walk(ROOT).filter((f) => /\.(html|js|json)$/.test(f))) {
  if (rj.has(path.normalize(file)) || REGIONAL_SHARED.has(file)) continue;
  const s = readFileSync(file, "utf8");
  if (s.includes(CHANNELS.rj.whatsapp) || s.includes(CHANNELS.rj.display)) fails.push(`${file}: RJ channel outside the Rio pages`);
  for (const m of s.matchAll(/wa\.me\/(\d+)/g)) if (m[1] !== CHANNELS.sp.whatsapp) fails.push(`${file}: WhatsApp ${m[1]} is not the SP channel`);
  if (s.includes(CHANNELS.sp.whatsapp)) spFiles++;
}
if (spFiles === 0) fails.push("São Paulo channel disappeared from the site");

if (fails.length) { fails.forEach((f) => console.error("FAIL " + f)); process.exit(1); }
console.log(`PASS commercial channels: ${RJ_PAGES.length} Rio pages on the RJ channel only; ${spFiles} non-Rio files on the SP channel only.`);
