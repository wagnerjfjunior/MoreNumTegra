#!/usr/bin/env node
// Páginas de bairro do Rio (Wagner, 2026-11-13): /rio-de-janeiro/regioes/ e /rio-de-janeiro/regioes/oeste/barra-da-tijuca/.
// Canal, form 47 e GTM já são cobertos por validate-commercial-channels-rj-sp e validate-measurement-region-rj
// (RJ_REGION_PAGES em scripts/lib/commercial-channels.mjs). Aqui: rotas, sitemap, SEO, links e independência do Rio.
import { readFileSync } from "node:fs";
import { RJ_PROJECT_SLUGS, RJ_REGION_PAGES } from "./lib/commercial-channels.mjs";

const SITE = "https://www.moretegra.com.br";
const HERO = "https://stracctegra.blob.core.windows.net/assets/Bairro/GuiaBairro/29/Imagem/59a1c0b7-2f30-4f6e-a212-665f2683ecd3.jpg";
const PAGES = { "/rio-de-janeiro/regioes/": RJ_REGION_PAGES[0], "/rio-de-janeiro/regioes/oeste/barra-da-tijuca/": RJ_REGION_PAGES[1] };
const fails = [];
const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
const sitemap = readFileSync("sitemap.xml", "utf8");
const hub = readFileSync("src-greenn/rio-de-janeiro/index.html", "utf8");

for (const [route, file] of Object.entries(PAGES)) {
  const h = readFileSync(file, "utf8");
  if (!vercel.rewrites.some((r) => r.source === route && r.destination === "/" + file)) fails.push(`${route}: Vercel rewrite missing`);
  if (!sitemap.includes(`<loc>${SITE}${route}</loc>`)) fails.push(`${route}: sitemap entry missing`);
  if (!h.includes(`<link rel="canonical" href="${SITE}${route}">`)) fails.push(`${route}: canonical`);
  if ((h.match(/<h1\b/g) || []).length !== 1) fails.push(`${route}: exactly one <h1>`);
  if (!h.includes(`<img src="${HERO}"`) || !h.includes(`<meta property="og:image" content="${HERO}">`)) fails.push(`${route}: official Tegra Barra hero/og image`);
  if (/pexels|unsplash/i.test(h)) fails.push(`${route}: third-party stock image`);
  const graph = JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
  const crumbs = graph.find((n) => n["@type"] === "BreadcrumbList");
  if (!crumbs || crumbs.itemListElement.at(-1).item !== SITE + route || crumbs.itemListElement[0].item !== SITE + "/rio-de-janeiro/") fails.push(`${route}: breadcrumb must start at the Rio hub and end at the page`);
  if (!graph.some((n) => n["@type"] === "FAQPage")) fails.push(`${route}: FAQPage missing`);
  // Independência do Rio: nenhum link para a home de São Paulo nem para os bairros de SP.
  const hrefs = [...h.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  if (hrefs.some((u) => u === "/" || u === SITE + "/" || /^\/regioes\//.test(u))) fails.push(`${route}: links to the São Paulo home or SP neighborhoods`);
}

const barra = readFileSync(PAGES["/rio-de-janeiro/regioes/oeste/barra-da-tijuca/"], "utf8");
for (const slug of RJ_PROJECT_SLUGS) if (!barra.includes(`href="/empreendimentos/${slug}/"`)) fails.push(`barra-da-tijuca: link to ${slug} missing`);
const list = JSON.parse(barra.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"].find((n) => n["@id"]?.endsWith("#projects"));
if (!list || list.itemListElement.length !== RJ_PROJECT_SLUGS.length) fails.push("barra-da-tijuca: ItemList must list the 7 Rio projects");
const idx = readFileSync(PAGES["/rio-de-janeiro/regioes/"], "utf8");
if (!idx.includes('href="/rio-de-janeiro/regioes/oeste/barra-da-tijuca/"')) fails.push("/rio-de-janeiro/regioes/: link to Barra da Tijuca missing");
// Slugs antigos (/rj/regioes/...) ficam como 301 para os novos (Wagner, 2026-11-13).
for (const route of Object.keys(PAGES)) {
  const old = route.replace("/rio-de-janeiro/regioes/", "/rj/regioes/");
  if (!vercel.redirects.some((r) => r.source === old && r.destination === route && (r.permanent === true || r.statusCode === 301))) fails.push(`${old}: permanent redirect to ${route} missing`);
  if (sitemap.includes(`<loc>${SITE}${old}</loc>`)) fails.push(`${old}: old slug still in the sitemap`);
}
// Estandes RealEstateAgent do Rio com imagem (aviso opcional do teste de resultados avançados).
for (const f of [hub, ...RJ_PROJECT_SLUGS.map((s) => readFileSync(`src-greenn/empreendimentos/${s}/index.html`, "utf8"))]) {
  const g = JSON.parse(f.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
  for (const n of g.filter((x) => x["@id"]?.endsWith("#estande-tegra"))) if (!/^https:\/\//.test(n.image || "")) fails.push(`${n["@id"]}: image missing`);
}
if (!hub.includes('href="/rio-de-janeiro/regioes/"') || !hub.includes('href="/rio-de-janeiro/regioes/oeste/barra-da-tijuca/"')) fails.push("hub: links to the Rio neighborhood pages missing");

if (fails.length) { fails.forEach((f) => console.error("FAIL " + f)); process.exit(1); }
console.log("PASS Rio neighborhood pages: routes, sitemap, canonical, Tegra hero, breadcrumb, FAQ, 7 project links, hub links, 301 from the old /rj/ slugs, estande images, no links to the São Paulo home.");
