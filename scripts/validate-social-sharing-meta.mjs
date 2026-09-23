import fs from "node:fs";

const pages = [
  ["Home", "src-greenn/preview/index.html", "https://www.moretegra.com.br/"],
  ["CAPIITOLO", "src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html", "https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/"],
  ["Elo Duo", "src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html", "https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/"],
  ["Ária", "src-greenn/empreendimentos/aria-higienopolis/index.html", "https://www.moretegra.com.br/empreendimentos/aria-higienopolis/"]
];

const failures = [];

function meta(html, attr, key) {
  const re = new RegExp(`<meta[^>]+${attr}=["']${key.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&")}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i");
  const reverse = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${key.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&")}["'][^>]*>`, "i");
  return html.match(re)?.[1] || html.match(reverse)?.[1] || "";
}

for (const [label, file, canonical] of pages) {
  const html = fs.readFileSync(file, "utf8");
  const ogTitle = meta(html, "property", "og:title");
  const ogDescription = meta(html, "property", "og:description");
  const ogUrl = meta(html, "property", "og:url");
  const ogImage = meta(html, "property", "og:image");
  const ogWidth = meta(html, "property", "og:image:width");
  const ogHeight = meta(html, "property", "og:image:height");
  const twitterCard = meta(html, "name", "twitter:card");
  const twitterImage = meta(html, "name", "twitter:image");

  if (!ogTitle) failures.push(`${label}: missing og:title`);
  if (!ogDescription) failures.push(`${label}: missing og:description`);
  if (ogUrl !== canonical) failures.push(`${label}: og:url mismatch (${ogUrl})`);
  if (!/^https:\/\//.test(ogImage)) failures.push(`${label}: og:image must be absolute HTTPS`);
  if (!/^\d+$/.test(ogWidth) || !/^\d+$/.test(ogHeight)) failures.push(`${label}: og:image width/height required`);
  if (twitterCard !== "summary_large_image") failures.push(`${label}: twitter:card must be summary_large_image`);
  if (twitterImage !== ogImage) failures.push(`${label}: twitter:image should match og:image`);
}

if (failures.length) {
  console.error(failures.map((x) => `FAIL: ${x}`).join("\n"));
  process.exit(1);
}

console.log(`PASS: social sharing metadata validated for ${pages.length} canonical pages`);
