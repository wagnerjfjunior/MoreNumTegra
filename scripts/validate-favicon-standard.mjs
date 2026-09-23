import fs from "node:fs";
import path from "node:path";

const CANONICAL_FAVICON = "/favicon.ico";
const APPLE_TOUCH_ICON = "/apple-touch-icon.png";
const OLD_WEBP_FAVICON = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Favicon_Tegra_500x500_nobg.webp";
const OLD_HORIZONTAL_LOGO = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp";

let failed = false;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failed = true;
}

function validatePng(file, expectedWidth, expectedHeight) {
  if (!fs.existsSync(file)) {
    fail(`${file} is missing`);
    return;
  }
  const png = fs.readFileSync(file);
  const sig = [137, 80, 78, 71, 13, 10, 26, 10];
  if (png.length < 24 || !sig.every((value, index) => png[index] === value)) {
    fail(`${file} is not a valid PNG`);
    return;
  }
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  if (width !== expectedWidth || height !== expectedHeight) {
    fail(`${file} must be ${expectedWidth}x${expectedHeight}; found ${width}x${height}`);
  }
}

if (!fs.existsSync("favicon.ico") || fs.statSync("favicon.ico").size < 100) {
  fail("root favicon.ico is missing or unexpectedly small");
} else {
  const ico = fs.readFileSync("favicon.ico");
  const reserved = ico.readUInt16LE(0);
  const type = ico.readUInt16LE(2);
  const count = ico.readUInt16LE(4);

  if (reserved !== 0 || type !== 1 || count < 1 || ico.length < 6 + count * 16) {
    fail("favicon.ico is not a valid ICO directory");
  } else {
    const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
    const requiredIcoSizes = new Set([48, 96, 192]);
    const observedIcoSizes = new Set();
    let hasRecommendedSquare = false;

    for (let i = 0; i < count; i += 1) {
      const offset = 6 + i * 16;
      const width = ico[offset] === 0 ? 256 : ico[offset];
      const height = ico[offset + 1] === 0 ? 256 : ico[offset + 1];
      const size = ico.readUInt32LE(offset + 8);
      const imageOffset = ico.readUInt32LE(offset + 12);

      if (width === height && [48, 96, 192].includes(width)) {
        hasRecommendedSquare = true;
        observedIcoSizes.add(width);
      }
      if (imageOffset + size > ico.length) {
        fail(`favicon.ico frame ${i} points outside the file`);
        continue;
      }

      const frame = ico.subarray(imageOffset, imageOffset + size);
      const isPng = pngSignature.every((value, index) => frame[index] === value);
      if (!isPng) fail(`favicon.ico frame ${i} is not a valid embedded PNG frame`);
    }

    if (!hasRecommendedSquare) fail("favicon.ico must contain a recommended 48/96/192 square frame");
    for (const size of requiredIcoSizes) {
      if (!observedIcoSizes.has(size)) fail(`favicon.ico is missing required ${size}x${size} frame`);
    }
  }
}

validatePng("favicon-48x48.png", 48, 48);
validatePng("favicon-96x96.png", 96, 96);
validatePng("favicon-192x192.png", 192, 192);
validatePng("apple-touch-icon.png", 180, 180);

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

let standaloneCount = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (!/<head[\s>]/i.test(html)) continue;
  standaloneCount += 1;

  const iconLinks = [...html.matchAll(/<link[^>]+rel=["']icon["'][^>]*>/gi)].map((m) => m[0]);
  const appleLinks = [...html.matchAll(/<link[^>]+rel=["']apple-touch-icon["'][^>]*>/gi)].map((m) => m[0]);

  if (iconLinks.length !== 1) {
    fail(`${file} must declare exactly one rel=icon; found ${iconLinks.length}`);
  } else if (!iconLinks[0].includes(`href="${CANONICAL_FAVICON}"`) && !iconLinks[0].includes(`href='${CANONICAL_FAVICON}'`)) {
    fail(`${file} must use canonical favicon ${CANONICAL_FAVICON}`);
  }

  if (appleLinks.length !== 1) {
    fail(`${file} must declare exactly one apple-touch-icon; found ${appleLinks.length}`);
  } else if (!appleLinks[0].includes(`href="${APPLE_TOUCH_ICON}"`) && !appleLinks[0].includes(`href='${APPLE_TOUCH_ICON}'`)) {
    fail(`${file} must use canonical apple-touch-icon ${APPLE_TOUCH_ICON}`);
  }

  if (html.includes(OLD_WEBP_FAVICON)) fail(`${file} still uses the former WebP favicon`);
  if (iconLinks.some((link) => link.includes(OLD_HORIZONTAL_LOGO))) fail(`${file} still uses the horizontal Tegra logo as favicon`);
}

if (failed) process.exit(1);
console.log(`PASS: Tegra favicon package validated on ${standaloneCount} standalone HTML pages`);
