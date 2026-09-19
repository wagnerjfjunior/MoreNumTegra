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
  assert(html.includes('class="mt-map-whatsapp"'), `${name} must expose a separate WhatsApp location CTA`);
  assert(html.includes('class="mt-map-external"'), `${name} must expose an external Maps CTA`);
  assert(!html.includes(".mt-map-cta{position:absolute"), `${name} map CTA must not cover the map`);
  assert(!html.includes("pointer-events:none"), `${name} embedded map must remain interactive`);
  assert(html.indexOf('<a class="mt-quick-lead"') < html.indexOf('<a class="mt-quick-whatsapp"'), `${name} floating actions must use lead-left / WhatsApp-right ordering`);
  assert(html.includes("mt-footer-address"), `${name} footer must use the muted address treatment`);
}

assert(aria.includes("Rua%20Coronel%20Jos%C3%A9%20Eus%C3%A9bio%2C%20145"), "Ária map must use the governed project address query");
assert(elo.includes("-23.517165527430233,-46.71861778788628"), "Elo Duo map must use the governed in-loco coordinates");

assert(runtime.includes('class="mnt-map-card"'), "CAPIITOLO runtime must use the shared visible map-card pattern");
assert(runtime.includes('class="mnt-map-whatsapp"'), "CAPIITOLO must expose a separate WhatsApp location CTA");
assert(runtime.includes('class="mnt-map-external"'), "CAPIITOLO must expose an external Maps CTA");
assert(!runtime.includes(".mnt-map-cta{position:absolute"), "CAPIITOLO map CTA must not cover the map");
assert(runtime.includes("-23.58341615763821,-46.62704356167254"), "CAPIITOLO map must preserve the governed coordinates");
assert(capiitolo.includes(".field select{width:100%;min-height:54px;border:1px solid #62625e;border-radius:12px"), "CAPIITOLO selects must read visually as selectable controls");
assert(capiitolo.includes(".footer-in span{color:#858178"), "CAPIITOLO footer address/contact line must use muted gray");
assert(homeHtml.includes("mt-footer-address"), "home footer address must use muted address treatment");

if (!process.exitCode) console.log("PASS: mobile UI standard validation");
