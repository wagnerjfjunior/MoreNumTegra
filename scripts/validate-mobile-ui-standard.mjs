import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
};

const homeCss = read("src-greenn/moretegra.css");
const homeJs = read("src-greenn/moretegra.js");
const homeHtml = read("src-greenn/preview/index.html");
const runtime = read("src-greenn/preview/runtime.js");
const capiitolo = read("experiments/capiitolo-editorial-v3/index.html");
const aria = read("src-greenn/empreendimentos/aria-higienopolis/index.html");
const elo = read("src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html");

assert(homeCss.includes("aspect-ratio:9/16"), "home mobile campaign video must be vertical 9:16");
assert(homeCss.includes("bottom:max(var(--mt-consent-offset,14px)"), "home floating dock must respect consent offset");
assert(homeCss.includes("grid-template-columns:minmax(0,1fr) 54px"), "home floating dock must use lead + circular WhatsApp mobile layout");
assert(homeJs.includes("whatsapp-removebg.webp"), "home WhatsApp floating action must use the approved icon");

for (const [name, html] of [["Ária", aria], ["Elo Duo", elo]]) {
  assert(html.includes('class="mt-map-card"'), `${name} must use the shared visible map-card pattern`);
  assert(html.includes('class="mt-map-whatsapp"'), `${name} must expose the yellow WhatsApp location CTA`);
  assert(html.includes('class="mt-map-hit"'), `${name} map visual must be a WhatsApp click surface`);
  assert(!html.includes('class="mt-map-external"'), `${name} must not expose an external Maps CTA`);
  assert(!html.includes("google.com/maps/search"), `${name} must not expose direct Maps navigation`);
  assert(html.includes("pointer-events:none"), `${name} embedded map must not be zoomable/pannable`);
  assert(html.indexOf('<a class="mt-quick-lead"') < html.indexOf('<a class="mt-quick-whatsapp"'), `${name} floating actions must use lead-left / WhatsApp-right ordering`);
  assert(html.includes("data-mnt-footer-address"), `${name} footer must use the governed address treatment`);
}

assert(aria.includes(".mt-gallery-arrow{position:absolute;z-index:2;top:50%;translate:0 -50%;display:grid;place-items:center;width:46px;height:46px;"), "Ária gallery arrows must preserve >=46px touch targets");
assert(!aria.includes('<iframe src="https://www.google.com/maps') || aria.includes("Higien%C3%B3polis%2C%20S%C3%A3o%20Paulo"), "Ária visible map, when embedded, must be neighborhood-level only");
assert(!aria.includes("Rua%20Coronel%20Jos%C3%A9%20Eus%C3%A9bio%2C%20145"), "Ária exact address must not leak into visible map query");
assert(!elo.includes('<iframe src="https://www.google.com/maps') || elo.includes("Caminhos%20da%20Lapa%2C%20S%C3%A3o%20Paulo"), "Elo Duo visible map, when embedded, must be neighborhood-level only");
assert(!elo.includes("-23.517165527430233,-46.71861778788628&z="), "Elo Duo exact coordinates must not drive the visible map");

assert(runtime.includes('class="mnt-map-card"'), "CAPIITOLO runtime must use the shared visible map-card pattern");
assert(runtime.includes('class="mnt-map-whatsapp"'), "CAPIITOLO must expose the yellow WhatsApp location CTA");
assert(runtime.includes('class="mnt-map-hit"'), "CAPIITOLO map visual must be a WhatsApp click surface");
assert(!runtime.includes('class="mnt-map-external"'), "CAPIITOLO must not expose an external Maps CTA");
assert(!runtime.includes("google.com/maps/search"), "CAPIITOLO must not expose direct Maps navigation");
assert(runtime.includes("pointer-events:none"), "CAPIITOLO embedded map must not be zoomable/pannable");
assert(runtime.includes("Ch%C3%A1cara%20Klabin%2C%20S%C3%A3o%20Paulo"), "CAPIITOLO visible map must be neighborhood-level only");
assert(!runtime.includes("-23.58341615763821,-46.62704356167254&z="), "CAPIITOLO exact coordinates must not drive the visible map");
assert(capiitolo.includes(".field select{width:100%;min-height:54px;border:1px solid #62625e;border-radius:12px"), "CAPIITOLO selects must read visually as selectable controls");
assert(capiitolo.includes("footer-standard"), "CAPIITOLO must use the canonical commercial footer standard");
assert(homeHtml.includes("data-mnt-footer-address"), "home footer address must use the governed address treatment");

if (!process.exitCode) console.log("PASS: mobile UI standard validation");
