import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {execFileSync} from "node:child_process";

const repoRoot = process.cwd();
const releaseRel = "src-greenn/moretegra.js";
const releasePath = path.join(repoRoot, releaseRel);
const measurementPath = path.join(repoRoot, "src-greenn", "modules", "moretegra.measurement.js");
const leadJourneyPath = path.join(repoRoot, "src-greenn", "modules", "moretegra.lead-journey.js");
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
    tail: source.slice(index).trim()
  };
}

const release = fs.readFileSync(releasePath, "utf8");
const measurementModule = fs.readFileSync(measurementPath, "utf8").trim();
const leadJourneyModule = fs.readFileSync(leadJourneyPath, "utf8").trim();
const expectedTail = `${measurementModule}\n\n${leadJourneyModule}`;
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

if (current.tail !== expectedTail) {
  fail("release tail differs from measurement + Form 46 lead-journey source modules");
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
  "mnt_intent",
  "mnt_form_start",
  "mnt_form_submit_attempt"
];
for (const token of requiredMeasurementEvents) {
  if (!measurementModule.includes(token)) fail(`required measurement event missing: ${token}`);
}

const requiredMeasurementSemantics = [
  '// MNT-M2-09 measurement instrumentation v5.',
  'const NOT_APPLICABLE = "not_applicable";',
  'const EVENT_PARAMETER_DEFAULTS = Object.freeze({',
  'mnt_section_click: Object.freeze({faq_item: NOT_APPLICABLE})',
  'mnt_catalog_search: Object.freeze({search_location: NOT_APPLICABLE})',
  'mnt_intent: Object.freeze({project_name: NOT_APPLICABLE, offer_name: NOT_APPLICABLE})',
  'mnt_form_start: Object.freeze({project_name: NOT_APPLICABLE, offer_name: NOT_APPLICABLE})',
  'function isGreenForm46(form)',
  'function emitFormStartOnce(form)',
  'function handleFormSubmitAttempt(event)',
  'document.addEventListener("focusin", handleFormInteraction, true)',
  'document.addEventListener("submit", handleFormSubmitAttempt, true)',
  'Symbol.for("morenumtegra.measurement.delegated.v5")'
];
for (const token of requiredMeasurementSemantics) {
  if (!measurementModule.includes(token)) fail(`required measurement semantic marker missing: ${token}`);
}

const requiredLeadJourneySemantics = [
  '// MNT-M2-09 Form 46 lead journey arm v1.',
  'const JOURNEY_KEY = "mnt.lead.journey.v1";',
  'const SENT_KEY = "mnt.lead.sent.v1";',
  'event_id: eventId()',
  'lead_token: eventId()',
  'submitted_at: Date.now()',
  'window.sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(state))',
  'document.addEventListener("submit", armLeadJourney, true)'
];
for (const token of requiredLeadJourneySemantics) {
  if (!leadJourneyModule.includes(token)) fail(`required lead-journey marker missing: ${token}`);
}

const forbiddenMeasurement = [
  "mnt_lead_success",
  "gtag(",
  "fbq(",
  "search_term",
  "search_query",
  "raw_search"
];
for (const token of forbiddenMeasurement) {
  if (measurementModule.includes(token)) fail(`forbidden measurement token present: ${token}`);
}

const forbiddenLeadJourney = [
  "gtag(",
  "fbq(",
  ".value",
  "FormData(",
  "nome:",
  "email:",
  "telefone:"
];
for (const token of forbiddenLeadJourney) {
  if (leadJourneyModule.includes(token)) fail(`lead-journey module may be reading/storing visitor data: ${token}`);
}

try {
  new Function(release);
  new Function(measurementModule);
  new Function(leadJourneyModule);
} catch (error) {
  fail(`JavaScript syntax error: ${error.message}`);
}

console.log(`PASS verify-moretegra-release: UI baseline ${uiBaseRef} preserved; measurement + Form 46 lead-journey modules exact; syntax valid.`);
