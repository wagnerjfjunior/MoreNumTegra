(() => {
  "use strict";

  const LIVE_HOST = "www.moretegra.com.br";
  const OFFSET_VAR = "--mt-floating-consent-offset";
  const PREVIEW_HOST_RE = /\.vercel\.app$/i;
  const GAP_PX = 14;

  function isLiveHost() {
    return window.location.hostname === LIVE_HOST;
  }

  function isPreviewHost() {
    return PREVIEW_HOST_RE.test(window.location.hostname);
  }

  function injectStyles() {
    if (document.getElementById("mt-floating-consent-style")) return;
    const style = document.createElement("style");
    style.id = "mt-floating-consent-style";
    style.textContent = `
      #mt-floating-dock{bottom:calc(max(14px,env(safe-area-inset-bottom)) + var(--mt-floating-consent-offset,0px));transition:bottom .22s ease}
      #mt-floating-dock .mt-floating{position:relative;min-height:38px;padding:6px 16px;font-size:12px;line-height:1;box-shadow:0 8px 20px rgba(0,0,0,.16)}
      #mt-floating-dock .mt-floating::before{content:"";position:absolute;inset:-3px 0;border-radius:inherit}
      @media(max-width:767px){
        #mt-floating-dock{right:10px;gap:7px}
        #mt-floating-dock .mt-floating{min-height:38px;padding:6px 15px;font-size:12px;line-height:1;max-width:calc(100vw - 20px)}
      }
    `;
    document.head.appendChild(style);
  }

  function initFloatingConsentCoordination() {
    const banner = document.querySelector("[data-mnt-consent]");
    if (!(banner instanceof HTMLElement)) return;

    injectStyles();
    const root = document.documentElement;

    const syncOffset = () => {
      if (banner.hidden) {
        root.style.setProperty(OFFSET_VAR, "0px");
        return;
      }

      const rect = banner.getBoundingClientRect();
      if (!rect.height) {
        root.style.setProperty(OFFSET_VAR, "0px");
        return;
      }

      const bannerDistanceFromBottom = Math.max(0, window.innerHeight - rect.top);
      const offset = Math.max(0, Math.ceil(bannerDistanceFromBottom + GAP_PX - 14));
      root.style.setProperty(OFFSET_VAR, `${offset}px`);
    };

    const scheduleSync = () => window.requestAnimationFrame(syncOffset);

    new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === "hidden")) scheduleSync();
    }).observe(banner, {attributes:true, attributeFilter:["hidden"]});

    if ("ResizeObserver" in window) new ResizeObserver(scheduleSync).observe(banner);
    window.addEventListener("resize", scheduleSync, {passive:true});
    window.visualViewport?.addEventListener("resize", scheduleSync, {passive:true});

    if (!isLiveHost() && isPreviewHost()) {
      banner.hidden = false;
      banner.querySelector("[data-consent-accept]")?.addEventListener("click", () => { banner.hidden = true; }, {once:true});
      banner.querySelector("[data-consent-reject]")?.addEventListener("click", () => { banner.hidden = true; }, {once:true});
    }

    scheduleSync();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initFloatingConsentCoordination, {once:true});
  else initFloatingConsentCoordination();
})();
