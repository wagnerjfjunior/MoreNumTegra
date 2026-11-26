import fs from "node:fs";

const html = fs.readFileSync("src-greenn/preview/index.html", "utf8");
const block = fs.readFileSync("src-greenn/blocks/01-html-inicial.html", "utf8");
const js = fs.readFileSync("src-greenn/moretegra.js", "utf8");
const css = fs.readFileSync("src-greenn/moretegra.css", "utf8");

const fail = (message) => {
  console.error("FAIL:", message);
  process.exitCode = 1;
};

const expect = (condition, message) => {
  if (!condition) fail(message);
};

expect(
  !html.includes('<link rel="preconnect" href="https://www.youtube-nocookie.com">'),
  "Home must not preconnect to youtube-nocookie before user intent."
);

for (const [name, source] of [["preview/index.html", html], ["blocks/01-html-inicial.html", block]]) {
  expect(source.includes('data-hero-video data-video-id="SCCM3vzNlyk"'), `${name}: governed campaign video id must remain present.`);
  expect(source.includes("Clique ou toque para reproduzir"), `${name}: explicit user-intent affordance must be visible.`);
  expect(source.includes("Toque para carregar o vídeo externo do YouTube. A reprodução automática depende das suas preferências de cookies e das condições do dispositivo."), `${name}: deferred-load explanation must be present.`);
}

const initStart = js.indexOf("  function initVideo(frame) {");
const initEnd = js.indexOf("\n  function initRoot(root)", initStart);
expect(initStart >= 0 && initEnd > initStart, "initVideo function must be locatable.");
const initVideo = initStart >= 0 && initEnd > initStart ? js.slice(initStart, initEnd) : "";

expect(initVideo.includes('frame.setAttribute("role", "button")'), "Video facade must expose button semantics.");
expect(initVideo.includes('frame.setAttribute("tabindex", "0")'), "Video facade must be keyboard focusable.");
expect(initVideo.includes('event.key === "Enter" || event.key === " "'), "Video facade must support Enter and Space.");
expect(!/frame\.addEventListener\("keydown"[\s\S]*?\}, \{once: true\}\);/.test(initVideo), "Keyboard handler must not be one-shot on unrelated keys.");
expect(initVideo.includes('frame.addEventListener("click"'), "Video iframe must be activated from click intent.");
expect(initVideo.includes("const player = mount();"), "Player mounting must occur inside play flow.");
expect(!initVideo.includes("IntersectionObserver"), "Video iframe must not mount from viewport intersection.");
expect(!initVideo.includes("setTimeout(() => mount"), "Video iframe must not bypass the play flow.");
expect(initVideo.includes("}, 3000);") && initVideo.includes("if (!iframe && autoAllowed()) play(false);"), "Autoplay waits 3000ms and checks eligibility.");
expect(initVideo.includes('window.MNTConsent?.allowed("marketing") === true'), "Automatic external video requires marketing consent.");
expect(initVideo.includes("event.origin !== origin || event.source !== iframe.contentWindow"), "Player messages must validate origin and source.");
expect(initVideo.includes('window.addEventListener("load", scheduleAutoplay, {once: true})'), "Autoplay must wait for window load.");
expect(initVideo.includes("frame.appendChild(iframe)") && !initVideo.includes("frame.replaceChildren(iframe)"), "Poster must remain mounted while player loads.");
expect(initVideo.includes("playerState === 1") && initVideo.includes("reveal()"), "Automatic reveal requires playing state.");
expect(initVideo.includes("window.setTimeout(reset, 15000)"), "Failed autoplay returns to poster.");
expect(css.includes('.mt-video-frame[data-video-ready="true"]{cursor:pointer}'), "Interactive video facade must expose pointer affordance.");

if (!process.exitCode) {
  console.log("PASS: Home YouTube autoplay is consent-gated and preserves poster until playback.");
}
