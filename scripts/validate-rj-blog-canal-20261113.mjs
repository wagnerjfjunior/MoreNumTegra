// Guarda: posts do blog sobre o Rio não podem ter a Sabrina nem o canal de SP (Wagner, 2026-11-13; R1/R7).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CHANNELS } from "./lib/commercial-channels.mjs";
import { RJ_BLOG_POSTS } from "./lib/rj-blog-posts.mjs";

(() => {
  const read = (p) => readFileSync(p, "utf8");
  const rj = CHANNELS.rj;
  const sp = CHANNELS.sp;
  const footer =
    `Central de atendimento RJ · <a href="tel:${rj.tel}">${rj.display}</a> · ` +
    `Encaminhamento ao corretor local autorizado. · <a href="/rio-de-janeiro/#contato">Formulário</a>`;
  const forbidden = [/sabrina/i, /CRECI/, new RegExp(sp.whatsapp), new RegExp(sp.display.replace(/[()]/g, "\\$&")), /\/regioes\/#formulario/];

  assert.ok(read("src-greenn/rio-de-janeiro/index.html").includes('id="contato"'), "Hub do Rio precisa da âncora #contato");

  for (const post of RJ_BLOG_POSTS) {
    const html = read(post.file);
    for (const re of forbidden) assert.ok(!re.test(html), `${post.file}: canal SP ou Sabrina (${re})`);
    assert.ok(html.includes(footer), `${post.file}: rodapé RJ`);
    for (const [, body] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(body);
    for (const [, href] of html.matchAll(/href="https:\/\/wa\.me\/(\d+)/g)) assert.equal(href, rj.whatsapp, `${post.file}: WhatsApp fora do canal RJ`);
    if (post.cardTitle) {
      assert.equal((html.match(/<section class="mnt-rj-card"/g) || []).length, 1, `${post.file}: um cartão RJ`);
      assert.ok(html.includes(`https://wa.me/${rj.whatsapp}?text=`), `${post.file}: CTA RJ`);
    }
  }

  // O post de SP que cita o Claris de passagem continua com o canal SP.
  const spPost = read("src-greenn/blog/dicasedecor/quadras-condominio-tenis-beach-tennis/index.html");
  assert.ok(spPost.includes(`https://wa.me/${sp.whatsapp}?text=`), "Post de SP mantém o canal SP");

  console.log(`RJ blog canal: ${RJ_BLOG_POSTS.length} posts OK`);
})();
