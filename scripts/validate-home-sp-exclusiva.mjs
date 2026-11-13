#!/usr/bin/env node
// Home exclusiva de São Paulo (Wagner: aprovada em 2026-11-10, executada em 2026-11-12). CRECI é regional:
// a home www.moretegra.com.br/ não mostra nem linka o Rio. O hub /rio-de-janeiro/ e as 7 páginas RJ são
// independentes e seguem no sitemap. Única exceção aprovada: o bloco do Prêmio Master Imobiliário 2026,
// que cita o RIIO sem link (decisão do Wagner, 2026-11-12).
import { readFileSync } from "node:fs";
import { CHANNELS, RJ_PROJECT_SLUGS } from "./lib/commercial-channels.mjs";

const fails = [];
const html = readFileSync("src-greenn/preview/index.html", "utf8");
const js = readFileSync("src-greenn/moretegra.js", "utf8");
const sitemap = readFileSync("sitemap.xml", "utf8");

const AWARD = /<article class="mt-award-card">\s*<span>SOLUÇÕES ARQUITETÔNICAS<\/span>\s*<strong>RIIO BY PIERO LISSONI<\/strong>\s*<small>Tegra · Rio de Janeiro<\/small>\s*<\/article>/;
if (!AWARD.test(html)) fails.push("home: approved award block (RIIO, no link) changed; review this rule with Wagner");
const rest = html.replace(AWARD, "");
const RIO = /Rio de Janeiro|Barra da Tijuca|\bRJ\b|rio-de-janeiro|RIIO|Kronos|Claris|Gaea|Gran Thai|Singular Private/i;
const hit = rest.match(RIO);
if (hit) fails.push(`home HTML: Rio reference outside the approved award block: "${hit[0]}"`);
if (/data-city-filter/.test(html)) fails.push("home HTML: city filter must not exist (São Paulo only)");
for (const slug of RJ_PROJECT_SLUGS) if (html.includes(slug) || js.includes(slug)) fails.push(`home: link or data for Rio project ${slug}`);
if (/\/rio-de-janeiro\//.test(html)) fails.push("home HTML: link to the Rio hub");
if (/RJ_PROJECTS|city:\s*"Rio de Janeiro"|Barra da Tijuca/.test(js)) fails.push("moretegra.js: Rio catalog data on the São Paulo home");
if (js.includes(CHANNELS.rj.whatsapp) || html.includes(CHANNELS.rj.whatsapp)) fails.push("home: RJ commercial channel on the São Paulo home");

// São Paulo preservado.
if (!html.includes(`data-form-id="${CHANNELS.sp.formId}"`) || !html.includes(`name="form_id" value="${CHANNELS.sp.formId}"`)) fails.push("home: São Paulo form 46 missing");
if (!html.includes(CHANNELS.sp.whatsapp)) fails.push("home: São Paulo WhatsApp missing");
if (!/Sabrina da Tegra/.test(html)) fails.push("home: Sabrina da Tegra identity missing");
if (!/const PROJECTS = Object\.freeze\(\[\.\.\.SP_PROJECTS\]\);/.test(js)) fails.push("moretegra.js: catalog must be SP_PROJECTS only");

// Rio independente e indexável.
for (const url of ["/rio-de-janeiro/", ...RJ_PROJECT_SLUGS.map((s) => `/empreendimentos/${s}/`)]) {
  if (!sitemap.includes(`<loc>https://www.moretegra.com.br${url}</loc>`)) fails.push(`sitemap: ${url} missing (Rio pages must stay indexable)`);
}

if (fails.length) { fails.forEach((f) => console.error("FAIL " + f)); process.exit(1); }
console.log("PASS home SP exclusive: no Rio cards, menu, filter, links or metadata (approved award block kept); SP form 46, WhatsApp and Sabrina preserved; 8 Rio URLs in the sitemap.");
