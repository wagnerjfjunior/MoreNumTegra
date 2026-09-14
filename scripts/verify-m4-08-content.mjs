import fs from "node:fs";

const htmlPath = "src-greenn/blocks/01-html-inicial.html";
const html = fs.readFileSync(htmlPath, "utf8");

const required = [
  ["portfolio purpose", "O More em um Tegra é uma experiência de descoberta comercial para comparar empreendimentos Tegra em São Paulo por região, estágio e faixa de valor."],
  ["stage meaning", "O estágio descreve o momento do empreendimento e não confirma disponibilidade de unidades."],
  ["value interpretation", "Os valores exibidos são referências comerciais para comparação e não devem ser interpretados como condição final garantida."],
  ["region discovery boundary", "As zonas abaixo funcionam como caminhos de comparação dentro deste portfólio e não representam, por si só, disponibilidade de unidades."],
  ["catalog anchor", "href=\"#oportunidades\""],
  ["decision guide anchor", "href=\"#como-escolher\""],
  ["negotiation anchor", "href=\"#negociacao\""],
  ["form anchor", "href=\"#formulario\""]
];

const failures = [];
for (const [label, text] of required) {
  if (!html.includes(text)) failures.push(`missing: ${label}`);
}

const h1Count = (html.match(/<h1\b/gi) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

const prematureRoutes = [
  "/caminhos-da-lapa/",
  "/empreendimentos/",
  "/estagios/",
  "/regioes/"
].filter((route) => html.includes(`href=\"${route}`));
if (prematureRoutes.length) failures.push(`premature internal routes: ${prematureRoutes.join(", ")}`);

const faqCount = (html.match(/<details>/g) || []).length;
if (faqCount !== 4) failures.push(`expected 4 visible FAQ items, found ${faqCount}`);

if (failures.length) {
  console.error("M4-08 verification FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("M4-08 verification PASS: portfolio-root answerability, semantic H1, governed anchors and FAQ visibility.");
