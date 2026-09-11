import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {execFileSync} from "node:child_process";

const repoRoot = process.cwd();
const releaseRel = "src-greenn/moretegra.js";
const releasePath = path.join(repoRoot, releaseRel);
const measurementPath = path.join(repoRoot, "src-greenn", "modules", "moretegra.measurement.js");
const uiBaseRef = process.env.MNT_UI_BASE_REF || "0ab0de22e2d69bff4b127c2db7f24a1744ea5187";
const marker = /^\/\/ MNT-M2-09 measurement instrumentation v\d+\./m;

function fail(message) {
  console.error(`FAIL verify-moretegra-release: ${message}`);
  process.exit(1);
}

function splitArtifact(source) {
  const index = source.search(marker);
  if (index < 0) fail("measurement marker not found");
  return {
    ui: source.slice(0, index).trimEnd(),
    measurement: source.slice(index).trim()
  };
}

const release = fs.readFileSync(releasePath, "utf8");
const measurementModule = fs.readFileSync(measurementPath, "utf8").trim();
const current = splitArtifact(release);

let baseline;
try {
  baseline = execFileSync("git", ["show", `${uiBaseRef}:${releaseRel}`], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
} catch (error) {
  fail(`unable to read UI baseline ${uiBaseRef}: ${error.message}`);
}

const baselineParts = splitArtifact(baseline);

if (current.ui !== baselineParts.ui) {
  fail("UI runtime drift detected during a measurement-only release change");
}

if (current.measurement !== measurementModule) {
  fail("release measurement tail differs from src-greenn/modules/moretegra.measurement.js");
}

const requiredUiMarkers = [
  "const INTEREST_GALLERIES = Object.freeze({",
  '"CAPIITOLO by Piero Lissoni": [',
  '"Reserva Caminhos da Lapa": [',
  "function renderInterestGallery(context, project)",
  "function setInterestContext(root, interest)",
  "data-interest-gallery",
  "data-change-interest"
];

for (const token of requiredUiMarkers) {
  if (!current.ui.includes(token)) fail(`required UI marker missing: ${token}`);
}

const requiredMeasurementEvents = [
  "mnt_page_view",
  "mnt_section_click",
  "mnt_catalog_filter",
  "mnt_catalog_search",
  "mnt_intent"
];
for (const token of requiredMeasurementEvents) {
  if (!measurementModule.includes(token)) fail(`required measurement event missing: ${token}`);
}

const forbidden = [
  "mnt_form_start",
  "mnt_form_submit_attempt",
  "mnt_lead_success",
  "gtag(",
  "fbq("
];
for (const token of forbidden) {
  if (measurementModule.includes(token)) fail(`forbidden measurement token present: ${token}`);
}

if (!measurementModule.includes('document.addEventListener("click", handleClick, true)')) {
  fail("delegated click binding missing");
}
if (!measurementModule.includes('document.addEventListener("change", handleFilterChange, true)')) {
  fail("delegated change binding missing");
}
if (!measurementModule.includes('document.addEventListener("input", handleSearchInput, true)')) {
  fail("delegated input binding missing");
}

try {
  new Function(release);
  new Function(measurementModule);
} catch (error) {
  fail(`JavaScript syntax error: ${error.message}`);
}

console.log(`PASS verify-moretegra-release: UI baseline ${uiBaseRef} preserved; measurement module exact; syntax valid.`);
