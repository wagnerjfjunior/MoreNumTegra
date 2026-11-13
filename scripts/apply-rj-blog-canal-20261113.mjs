// Posts do blog sobre o Rio de Janeiro passam a usar o canal RJ, sem a Sabrina (Wagner, 2026-11-13).
// Motivo: R1/R7 (docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md, seções 1 e 2). O blog de SP não muda.
// Idempotente: rodar de novo não altera nada. Uso: node scripts/apply-rj-blog-canal-20261113.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { CHANNELS, RJ_COPY } from "./lib/commercial-channels.mjs";
import { RJ_BLOG_POSTS } from "./lib/rj-blog-posts.mjs";

(() => {
  const rj = CHANNELS.rj;
  const sp = CHANNELS.sp;
  const RJ_FORM = "/rio-de-janeiro/#contato";
  const wa = (text) => `https://wa.me/${rj.whatsapp}?text=${encodeURIComponent(text)}`;
  const footerRj =
    `Central de atendimento RJ · <a href="tel:${rj.tel}">${rj.display}</a> · ` +
    `Encaminhamento ao corretor local autorizado. · <a href="${RJ_FORM}">Formulário</a>`;

  // Rodapé: duas variantes existentes nos posts do Rio.
  const FOOTER_SP = [
    /Atendimento Sabrina da Tegra · CRECI-SP 209\.905-F · <a href="tel:\+5511960779328">\(11\) 96077-9328<\/a> · <a href="\/regioes\/#formulario">Formulário<\/a>/g,
    /Sabrina da Tegra, CRECI-SP 209\.905-F · <a href="tel:\+5511960779328">\(11\) 96077-9328<\/a> · <a href="\/regioes\/#formulario">Formulário<\/a>/g,
  ];

  const card = (post) =>
    `<section class="mnt-rj-card" id="atendimento-rj" aria-labelledby="mnt-rj-title">` +
    `<div class="mnt-rj-content"><span class="eyebrow">Atendimento imobiliário personalizado</span>` +
    `<h2 id="mnt-rj-title">${post.cardTitle}</h2>` +
    `<p>${post.cardLead}</p>` +
    `<a class="mnt-rj-cta" href="${wa(post.whatsappText)}" target="_blank" rel="noopener noreferrer" ` +
    `aria-label="Conversar no WhatsApp com a central de atendimento RJ sobre ${post.product}">` +
    `${RJ_COPY.ctaWhatsapp} <span aria-hidden="true">↗</span></a>` +
    `<p class="mnt-rj-subtle">Central de atendimento RJ · ${rj.display}. Encaminhamento ao corretor local autorizado. ` +
    `Plantas, preços e disponibilidade devem ser confirmados para cada unidade.</p></div></section>`;

  // CSS do cartão: mesmo visual do cartão anterior, sem a coluna da foto.
  const fixCss = (html) =>
    html
      .replace(/\.mnt-sabrina-photo[^{]*\{[^}]*\}/g, "")
      .replace(/\.mnt-sabrina-card\{display:grid;grid-template-columns:minmax\(170px,\.75fr\) minmax\(0,1\.6fr\);/g, ".mnt-rj-card{display:grid;grid-template-columns:1fr;")
      .replace(/\.mnt-sabrina-card\{grid-template-columns:112px minmax\(0,1fr\);/g, ".mnt-rj-card{grid-template-columns:1fr;")
      .replace(/\.mnt-sabrina-card\{grid-template-columns:1fr\}/g, ".mnt-rj-card{grid-template-columns:1fr}")
      .replace(/\.mnt-sabrina-(content|cta|subtle)/g, ".mnt-rj-$1");

  // JSON-LD: remove os nós da Sabrina (Person, RealEstateAgent) e as menções a eles.
  const fixJsonLd = (html) =>
    html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (all, open, body, close) => {
      if (!/sabrina/i.test(body)) return all;
      const data = JSON.parse(body);
      const isSabrina = (n) => n && typeof n === "object" && /sabrina/i.test(String(n["@id"] || ""));
      const graph = (data["@graph"] || [data]).filter((n) => !isSabrina(n));
      for (const n of graph) {
        if (Array.isArray(n.mentions)) {
          n.mentions = n.mentions.filter((m) => !isSabrina(m));
          if (!n.mentions.length) delete n.mentions;
        }
      }
      const out = data["@graph"] ? { ...data, "@graph": graph } : graph[0];
      if (/sabrina/i.test(JSON.stringify(out))) throw new Error("Sabrina ainda referenciada no JSON-LD");
      return open + JSON.stringify(out) + close;
    });

  let changed = 0;
  for (const post of RJ_BLOG_POSTS) {
    const before = readFileSync(post.file, "utf8");
    let html = before;
    for (const re of FOOTER_SP) html = html.replace(re, footerRj);
    if (post.cardTitle) {
      html = html.replace(/<section (?:class="mnt-sabrina-card" id="sabrina-da-tegra" aria-labelledby="mnt-sabrina-title"|aria-labelledby="mnt-sabrina-title" class="mnt-sabrina-card" id="sabrina-da-tegra")>[\s\S]*?<\/section>/, card(post));
      html = fixCss(html);
    }
    // Barra flutuante (só nos posts que a têm): formulário e WhatsApp do Rio.
    html = html.replace(/(<a class="mt-floating mt-floating-lead" href=")\/regioes\/#formulario(")/g, `$1${RJ_FORM}$2`);
    html = html.replace(
      /<a class="mt-floating mt-floating-whatsapp" href="https:\/\/wa\.me\/5511960779328\?text=[^"]*"([^>]*?) aria-label="Conversar com Sabrina no WhatsApp"/g,
      `<a class="mt-floating mt-floating-whatsapp" href="${wa(post.whatsappText || "")}"$1 aria-label="Conversar no WhatsApp com a central de atendimento RJ"`
    );
    html = fixJsonLd(html);
    for (const forbidden of [/sabrina/i, new RegExp(sp.whatsapp), /96077-9328/, /CRECI/, /\/regioes\/#formulario/]) {
      if (forbidden.test(html)) throw new Error(`${post.file}: resta ${forbidden}`);
    }
    if (html !== before) {
      writeFileSync(post.file, html);
      changed++;
    }
  }
  console.log(`RJ blog: ${changed} arquivo(s) alterado(s) de ${RJ_BLOG_POSTS.length}.`);
})();
