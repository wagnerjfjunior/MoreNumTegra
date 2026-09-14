import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const faqHtmlPath = path.join(repoRoot, "src-greenn", "blocks", "01-html-inicial.html");
const schemaHtmlPath = path.join(repoRoot, "src-greenn", "blocks", "02-html-pos-form.html");

function fail(message) {
  console.error(`FAIL verify-m4-05-schema: ${message}`);
  process.exit(1);
}

function stripTags(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const faqHtml = fs.readFileSync(faqHtmlPath, "utf8");
const schemaHtml = fs.readFileSync(schemaHtmlPath, "utf8");

const faqSection = faqHtml.match(/<section class="mt-faq"[\s\S]*?<\/section>/)?.[0];
if (!faqSection) fail("visible FAQ section not found");

const visible = [...faqSection.matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)]
  .map((match) => ({
    name: stripTags(match[1]).replace(/\+$/, "").trim(),
    text: stripTags(match[2])
  }));

if (visible.length !== 4) fail(`expected 4 visible FAQ entries, found ${visible.length}`);

const schemaText = schemaHtml.match(/<script id="mt-faq-schema" type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)?.[1];
if (!schemaText) fail("FAQPage JSON-LD script not found");

let schema;
try {
  schema = JSON.parse(schemaText);
} catch (error) {
  fail(`invalid JSON-LD: ${error.message}`);
}

if (schema["@context"] !== "https://schema.org") fail("schema.org context mismatch");
if (schema["@type"] !== "FAQPage") fail("@type must be FAQPage");
if (schema["@id"] !== "https://moretegra.com.br/#faq") fail("FAQ @id mismatch");
if (schema.isPartOf?.["@id"] !== "https://moretegra.com.br/#webpage") fail("FAQ isPartOf must target canonical #webpage");
if (!Array.isArray(schema.mainEntity) || schema.mainEntity.length !== visible.length) fail("mainEntity count mismatch");

schema.mainEntity.forEach((entity, index) => {
  const source = visible[index];
  if (entity?.["@type"] !== "Question") fail(`entity ${index + 1} is not Question`);
  if (entity?.name !== source.name) fail(`question ${index + 1} differs from visible FAQ`);
  if (entity?.acceptedAnswer?.["@type"] !== "Answer") fail(`answer ${index + 1} is not Answer`);
  if (entity?.acceptedAnswer?.text !== source.text) fail(`answer ${index + 1} differs from visible FAQ`);
});

const serialized = JSON.stringify(schema);
const forbidden = ["price", "offers", "availability", "floorSize", "address", "amenityFeature", "datePublished"];
for (const token of forbidden) {
  if (serialized.includes(`\"${token}\"`)) fail(`volatile/commercial field present: ${token}`);
}

console.log("PASS verify-m4-05-schema: visible FAQ and FAQPage JSON-LD are 4/4 exact; canonical linkage valid; volatile commercial fields absent.");
