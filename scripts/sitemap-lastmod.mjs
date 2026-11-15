// <lastmod> do sitemap.xml a partir da data do último commit do HTML de cada URL (Wagner, 2026-11-13).
// Motivo: sem <lastmod>, Bing e Google não sabem quais páginas mudaram (o Bing ficou em 74 de 83 URLs).
// Uso:
//   node scripts/sitemap-lastmod.mjs          → grava/atualiza o <lastmod> de cada <url>
//   node scripts/sitemap-lastmod.mjs --check  → falha se algum <lastmod> faltar, for inválido ou for
//                                               anterior ao último commit do HTML da página (exige histórico
//                                               completo: actions/checkout com fetch-depth: 0)
// A data é o dia do commit no fuso America/Sao_Paulo (formato W3C AAAA-MM-DD).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

(() => {
  const ORIGIN = "https://www.moretegra.com.br";
  const SITEMAP = "sitemap.xml";
  const check = process.argv.includes("--check");

  if (execFileSync("git", ["rev-parse", "--is-shallow-repository"], { encoding: "utf8" }).trim() === "true") {
    throw new Error("Histórico Git raso: as datas sairiam erradas. Use fetch-depth: 0 (CI) ou git fetch --unshallow.");
  }

  const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
  const rewrites = new Map((vercel.rewrites || []).map((r) => [r.source, r.destination]));

  // URL pública → arquivo HTML servido (rewrite do vercel.json; senão, src-greenn/<caminho>/index.html).
  const sourceFile = (loc) => {
    const path = new URL(loc).pathname;
    const dest = rewrites.get(path);
    const candidates = dest ? [dest.replace(/^\//, "")] : [];
    candidates.push(`src-greenn${path}index.html`, `${path.replace(/^\//, "")}index.html`);
    const file = candidates.find((f) => existsSync(f));
    if (!file) throw new Error(`Sem arquivo de origem para ${loc} (rewrite: ${dest || "nenhum"})`);
    return file;
  };

  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" });
  const lastCommitDay = (file) => {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], { encoding: "utf8" }).trim();
    if (!iso) throw new Error(`Arquivo sem histórico no Git: ${file}`);
    return day.format(new Date(iso));
  };

  const xml = readFileSync(SITEMAP, "utf8");
  const problems = [];
  let count = 0;
  const out = xml.replace(/<url>([\s\S]*?)<\/url>/g, (block, inner) => {
    const loc = inner.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
    if (!loc || !loc.startsWith(ORIGIN + "/")) throw new Error(`<loc> inválido: ${loc}`);
    count++;
    const expected = lastCommitDay(sourceFile(loc));
    const current = inner.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/)?.[1];
    if (check) {
      if (!current) problems.push(`${loc}: sem <lastmod>`);
      else if (!/^\d{4}-\d{2}-\d{2}$/.test(current)) problems.push(`${loc}: <lastmod> fora do formato AAAA-MM-DD (${current})`);
      else if (current < expected) problems.push(`${loc}: <lastmod> ${current} anterior ao último commit da página (${expected})`);
      return block;
    }
    const indent = inner.match(/\n(\s*)<loc>/)?.[1] ?? "    ";
    const cleaned = inner.replace(/\s*<lastmod>[^<]*<\/lastmod>/, "");
    return `<url>${cleaned.replace(/(<loc>[^<]*<\/loc>)/, `$1\n${indent}<lastmod>${expected}</lastmod>`)}</url>`;
  });

  if (check) {
    if (problems.length) {
      console.error(problems.join("\n"));
      console.error("\nCorrija com: node scripts/sitemap-lastmod.mjs");
      process.exit(1);
    }
    console.log(`sitemap lastmod: ${count} URLs OK`);
    return;
  }
  if (out !== xml) writeFileSync(SITEMAP, out);
  console.log(`sitemap lastmod: ${count} URLs ${out !== xml ? "atualizadas" : "sem mudança"}`);
})();
