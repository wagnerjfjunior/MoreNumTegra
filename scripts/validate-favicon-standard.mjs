import fs from "node:fs";
import path from "node:path";

const CANONICAL_FAVICON = "/favicon.ico";
const OLD_WEBP_FAVICON = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Favicon_Tegra_500x500_nobg.webp";
const OLD_HORIZONTAL_LOGO = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp";

if (!fs.existsSync("favicon.ico") || fs.statSync("favicon.ico").size < 100) {
  console.error("FAIL: root favicon.ico is missing or unexpectedly small");
  process.exit(1);
}

const roots = ["src-greenn", "experiments"];
const htmlFiles = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}

roots.forEach(walk);

let failed = false;
let standaloneCount = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (!/<head[\s>]/i.test(html)) continue;
  standaloneCount += 1;

  const iconLinks = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)].map((m) => m[0]);
  const canonicalMatches = iconLinks.filter((link) => link.includes(`href="${CANONICAL_FAVICON}"`) || link.includes(`href='${CANONICAL_FAVICON}'`));

  if (iconLinks.length !== 1) {
    console.error(`FAIL: ${file} must declare exactly one favicon link; found ${iconLinks.length}`);
    failed = true;
  }
  if (canonicalMatches.length !== 1) {
    console.error(`FAIL: ${file} must use canonical favicon ${CANONICAL_FAVICON}`);
    failed = true;
  }
  if (iconLinks.some((link) => link.includes(OLD_WEBP_FAVICON))) {
    console.error(`FAIL: ${file} still uses the former WebP favicon`);
    failed = true;
  }
  if (iconLinks.some((link) => link.includes(OLD_HORIZONTAL_LOGO))) {
    console.error(`FAIL: ${file} still uses the horizontal Tegra logo as favicon`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`PASS: local ICO favicon enforced on ${standaloneCount} standalone HTML pages`);
