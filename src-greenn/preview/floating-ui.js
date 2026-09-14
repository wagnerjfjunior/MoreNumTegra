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

  function initFloatingConsentCoordination() {
    const banner = document.querySelector("[data-mnt-consent]");
    if (!(banner instanceof HTMLElement)) return;

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
      const dockBaseBottom = Math.max(14, Number.parseFloat(getComputedStyle(root).getPropertyValue("--safe-area-inset-bottom")) || 0);
      const offset = Math.max(0, Math.ceil(bannerDistanceFromBottom + GAP_PX - dockBaseBottom));
      root.style.setProperty(OFFSET_VAR, `${offset}px`);
    };

    const scheduleSync = () => window.requestAnimationFrame(syncOffset);

    new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === "hidden")) scheduleSync();
    }).observe(banner, {attributes: true, attributeFilter: ["hidden"]});

    if ("ResizeObserver" in window) {
      new ResizeObserver(scheduleSync).observe(banner);
    }

    window.addEventListener("resize", scheduleSync, {passive: true});
    window.visualViewport?.addEventListener("resize", scheduleSync, {passive: true});

    if (!isLiveHost() && isPreviewHost()) {
      banner.hidden = false;
      banner.querySelector("[data-consent-accept]")?.addEventListener("click", () => {
        banner.hidden = true;
      }, {once: true});
      banner.querySelector("[data-consent-reject]")?.addEventListener("click", () => {
        banner.hidden = true;
      }, {once: true});
    }

    scheduleSync();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFloatingConsentCoordination, {once: true});
  } else {
    initFloatingConsentCoordination();
  }
})();
