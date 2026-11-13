// Smoke RJ/SP de formulário e mensuração (Wagner, 2026-11-10).
// Serve os arquivos do repositório sob https://www.moretegra.com.br (host exigido pelos módulos de mensuração),
// intercepta o GTM (nada vai ao Google) e a Green Sales (resposta 200 falsa; nenhum lead real é criado).
// Uso: node .github/diagnostics/rj-sp-form-measurement-smoke.mjs   (requer playwright + chromium)
import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const HOST = "https://www.moretegra.com.br";
const RJ = [
  ["/rio-de-janeiro/", "rio_de_janeiro_hub", null],
  ["/empreendimentos/kronos-by-tegra/", "kronos_by_tegra_project", "Kronos by Tegra"],
  ["/empreendimentos/singular-private-residence/", "singular_private_residence_project", "Singular Private Residence"],
  ["/empreendimentos/gaea-home-resort/", "gaea_home_resort_project", "Gaea Home Resort"],
  ["/empreendimentos/riio-by-piero-lissoni/", "riio_by_piero_lissoni_project", "RIIO by Piero Lissoni"],
  ["/empreendimentos/gran-thai-leisure-residence/", "gran_thai_leisure_residence_project", "Gran Thai Leisure Residence"],
  ["/empreendimentos/claris-rosas/", "claris_rosas_project", "Claris Rosas"],
  ["/empreendimentos/claris-casa-e-clube/", "claris_casa_e_clube_project", "Claris Casa & Clube"],
  ["/rio-de-janeiro/regioes/", "rj_regioes_hub", null],
  ["/rio-de-janeiro/regioes/oeste/barra-da-tijuca/", "rj_regiao_barra_da_tijuca", null],
];
const SP = [
  ["/empreendimentos/tiel-vila-nova-conceicao/", "Tièl Vila Nova Conceição"],
  ["/empreendimentos/chateau-jardin/", "Château Jardin"],
];
const TYPES = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".webp": "image/webp", ".svg": "image/svg+xml" };
const PII = /smoke@example\.com|11987654321|Teste Smoke/;

function local(p) {
  if (p === "/rio-de-janeiro/") p = "/src-greenn/rio-de-janeiro/index.html";
  else if (p.startsWith("/rio-de-janeiro/regioes/")) p = "/src-greenn" + p + "index.html";
  else if (p === "/obrigado/") p = "/src-greenn/preview/obrigado.html";
  else if (/^\/empreendimentos\/[^/]+\/$/.test(p)) p = "/src-greenn" + p + "index.html";
  const f = path.join(ROOT, decodeURIComponent(p));
  return fs.existsSync(f) && fs.statSync(f).isFile() ? f : null;
}

async function run(browser, route, viewport) {
  const ctx = await browser.newContext({ viewport, isMobile: viewport.width < 600, hasTouch: viewport.width < 600 });
  const page = await ctx.newPage();
  const seen = { gtm: 0, post: "" };
  await page.route("**/*", async (req) => {
    const u = new URL(req.request().url());
    if (u.hostname === "www.googletagmanager.com") { seen.gtm++; return req.fulfill({ status: 200, contentType: "application/javascript", body: "" }); }
    if (u.hostname === "back.gdigital.com.br") { seen.post = req.request().postData() || ""; return req.fulfill({ status: 200, contentType: "application/json", body: "{}" }); }
    if (u.hostname !== "www.moretegra.com.br") return req.abort();
    const f = local(u.pathname);
    if (!f) return req.fulfill({ status: 404, body: "" });
    return req.fulfill({ status: 200, contentType: TYPES[path.extname(f)] || "application/octet-stream", body: fs.readFileSync(f) });
  });
  await page.goto(HOST + route, { waitUntil: "load" });
  await page.waitForTimeout(800);
  const accept = page.locator("[data-consent-accept]");
  assert(await accept.first().isVisible(), `${route}: consent banner not visible`);
  await accept.first().click();
  const gtmOnPage = seen.gtm;
  const sabrinaVisible = await page.evaluate(() => document.body.innerText.includes("Sabrina"));
  await page.fill("#mt-lead-name", "Teste Smoke");
  await page.fill("#mt-lead-email", "smoke@example.com");
  await page.fill("#mt-lead-phone", "11987654321");
  for (const cb of await page.locator("#moretegra-lead-form input[type=checkbox][required]").all()) await cb.check();
  const before = await page.evaluate(() => (window.dataLayer || []).filter((e) => e && e.event).map((e) => ({ ...e })));
  await page.locator("[data-moretegra-form-submit]").first().click();
  await page.waitForURL("**/obrigado/", { timeout: 8000 });
  await page.waitForTimeout(1200);
  const fields = {};
  for (const m of seen.post.matchAll(/name="([^"]+)"\r?\n\r?\n([^\r\n]*)/g)) fields[m[1]] = m[2];
  const thanks = await page.evaluate(() => ({
    success: (window.dataLayer || []).filter((e) => e && e.event === "mnt_lead_success").map((e) => ({ ...e })),
    whatsapp: [...document.querySelectorAll('a[href^="https://wa.me/"]')].map((a) => a.href),
    message: document.querySelector("[data-thanks-message]")?.textContent || "",
  }));
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(1000);
  const successAfterReload = await page.evaluate(() => (window.dataLayer || []).filter((e) => e && e.event === "mnt_lead_success").length);
  await ctx.close();
  return { gtmOnPage, sabrinaVisible, before, fields, thanks, successAfterReload };
}

const browser = await chromium.launch();
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const tag = viewport.width < 600 ? "mobile" : "desktop";
    for (const [route, identity, project] of RJ) {
      const r = await run(browser, route, viewport);
      const ev = (name) => r.before.filter((e) => e.event === name);
      assert(r.gtmOnPage >= 1, `${route}: GTM not requested`);
      const order = r.before.map((e) => e.event);
      assert(order.indexOf("default_consent") >= 0 && order.indexOf("default_consent") < order.indexOf("gtm.js"), `${route}: default_consent must precede gtm.js`);
      assert.equal(ev("mnt_page_view").length, 1, `${route}: one mnt_page_view`);
      assert.equal(ev("mnt_page_view")[0].page_identity, identity, `${route}: page identity`);
      assert.equal(ev("mnt_form_start")[0]?.form_id, 47, `${route}: mnt_form_start form_id`);
      assert.equal(r.sabrinaVisible, false, `${route}: Sabrina visible on a Rio page`);
      assert.equal(r.fields.form_id, "47", `${route}: Green payload form_id`);
      assert.equal(r.fields.tenant_id, "313", `${route}: Green tenant`);
      assert(r.fields["texto-livre"] && (!project || r.fields["texto-livre"].startsWith(project)), `${route}: texto-livre without the project (${r.fields["texto-livre"]})`);
      assert.equal(r.thanks.success.length, 1, `${route}: exactly one mnt_lead_success`);
      assert.equal(r.thanks.success[0].form_id, 47, `${route}: conversion form_id`);
      assert.equal(r.thanks.success[0].lead_method, "green_form_47", `${route}: lead_method`);
      if (project) assert.equal(r.thanks.success[0].project_name, project, `${route}: conversion project_name`);
      assert(r.thanks.whatsapp.length && r.thanks.whatsapp.every((u) => u.startsWith("https://wa.me/5511951667227")), `${route}: /obrigado/ WhatsApp must be the RJ channel`);
      assert(r.thanks.message.includes("central de atendimento RJ"), `${route}: /obrigado/ message`);
      assert.equal(r.successAfterReload, 0, `${route}: conversion repeated on reload`);
      assert(!PII.test(JSON.stringify([r.before, r.thanks.success])), `${route}: personal data in dataLayer`);
      console.log(`PASS RJ ${tag} ${route} form 47, project=${project || "hub"}`);
    }
    for (const [route, project] of SP) {
      const r = await run(browser, route, viewport);
      assert.equal(r.before.find((e) => e.event === "mnt_form_start")?.form_id, 46, `${route}: SP mnt_form_start form_id`);
      assert.equal(r.fields.form_id, "46", `${route}: SP Green payload form_id`);
      assert(r.fields["texto-livre"].startsWith(project), `${route}: SP texto-livre`);
      assert.equal(r.thanks.success.length, 1, `${route}: SP exactly one mnt_lead_success`);
      assert.equal(r.thanks.success[0].form_id, 46, `${route}: SP conversion form_id`);
      assert.equal(r.thanks.success[0].lead_method, "green_form_46", `${route}: SP lead_method`);
      assert(r.thanks.whatsapp.every((u) => u.startsWith("https://wa.me/5511960779328")), `${route}: SP /obrigado/ WhatsApp must stay on the SP channel`);
      assert(r.thanks.message.includes("Tegra Vendas"), `${route}: SP /obrigado/ message unchanged`);
      assert.equal(r.successAfterReload, 0, `${route}: SP conversion repeated on reload`);
      assert(!PII.test(JSON.stringify([r.before, r.thanks.success])), `${route}: personal data in dataLayer`);
      console.log(`PASS SP ${tag} ${route} form 46 preserved`);
    }
  }
  console.log("PASS RJ/SP form and measurement smoke: 10 Rio pages on form 47, 2 São Paulo pages on form 46, desktop and mobile.");
} finally {
  await browser.close();
}
