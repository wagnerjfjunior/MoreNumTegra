import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const releasePath = path.join(repoRoot, "src-greenn", "moretegra.js");
const measurementPath = path.join(repoRoot, "src-greenn", "modules", "moretegra.measurement.js");
const measurementMarker = /^\/\/ MNT-M2-09 measurement instrumentation v\d+\./m;

const release = fs.readFileSync(releasePath, "utf8");
const measurement = fs.readFileSync(measurementPath, "utf8").trim();
const markerIndex = release.search(measurementMarker);

if (markerIndex < 0) {
  throw new Error("Measurement marker not found in src-greenn/moretegra.js");
}
if (!measurementMarker.test(measurement)) {
  throw new Error("Measurement source module has no canonical marker");
}

const uiRuntime = release.slice(0, markerIndex).trimEnd();
const assembled = `${uiRuntime}\n\n${measurement}\n`;
fs.writeFileSync(releasePath, assembled, "utf8");

console.log("PASS build-moretegra-release: UI runtime preserved; measurement tail replaced deterministically.");
