import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const releasePath = path.join(repoRoot, "src-greenn", "moretegra.js");
const measurementPath = path.join(repoRoot, "src-greenn", "modules", "moretegra.measurement.js");
const leadJourneyPath = path.join(repoRoot, "src-greenn", "modules", "moretegra.lead-journey.js");
const measurementMarker = /^\/\/ MNT-M2-09 measurement instrumentation v\d+\./m;
const leadJourneyMarker = /^\/\/ MNT-M2-09 Form 46 lead journey arm v\d+\./m;

const release = fs.readFileSync(releasePath, "utf8");
const measurement = fs.readFileSync(measurementPath, "utf8").trim();
const leadJourney = fs.readFileSync(leadJourneyPath, "utf8").trim();
const markerIndex = release.search(measurementMarker);

if (markerIndex < 0) {
  throw new Error("Measurement marker not found in src-greenn/moretegra.js");
}
if (!measurementMarker.test(measurement)) {
  throw new Error("Measurement source module has no canonical marker");
}
if (!leadJourneyMarker.test(leadJourney)) {
  throw new Error("Lead-journey source module has no canonical marker");
}

const uiRuntime = release.slice(0, markerIndex).trimEnd();
const assembled = `${uiRuntime}\n\n${measurement}\n\n${leadJourney}\n`;
fs.writeFileSync(releasePath, assembled, "utf8");

console.log("PASS build-moretegra-release: UI runtime preserved; measurement + Form 46 lead-journey modules assembled deterministically.");
