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
  expect(source.includes("O player é carregado apenas quando você iniciar o vídeo."), `${name}: deferred-load explanation must be present.`);
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
expect(initVideo.includes("const iframe = mount();"), "Player mounting must occur inside explicit play flow.");
expect(!initVideo.includes("IntersectionObserver"), "Video iframe must not mount from viewport intersection.");
expect(!initVideo.includes("setTimeout(() => mount"), "Video iframe must not mount from a timer.");
expect(initVideo.includes("frame.replaceChildren(iframe)"), "Poster facade must be replaced by the iframe after intent.");
expect(css.includes('.mt-video-frame[data-video-ready="true"]{cursor:pointer}'), "Interactive video facade must expose pointer affordance.");

if (!process.exitCode) {
  console.log("PASS: Home YouTube player is deferred until explicit user intent with keyboard-accessible facade.");
}
