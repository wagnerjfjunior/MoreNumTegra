// MNT-M2-09 measurement instrumentation v4.
// Source module for the single Green release artifact. No direct vendor dispatch.
(() => {
  "use strict";

  const CANONICAL_HOST = "moretegra.com.br";
  const ROOT_SELECTOR = "[data-moretegra]";
  const EVENT_VERSION = 1;
  const PAGE_IDENTITY = "moretegra_home";
  const PRODUCT_IDENTITY = "moretegra_portfolio";
  const ROUTE = "/";
  const SEARCH_DEBOUNCE_MS = 600;
  const PAGE_VIEW_MARKER = Symbol.for("morenumtegra.measurement.page_view.v1");
  const BIND_MARKER = Symbol.for("morenumtegra.measurement.delegated.v4");
  const SEARCH_STATE = new WeakMap();
  const SEARCH_LOCATION_INDEX = new Map();
  const NOT_APPLICABLE = "not_applicable";

  const ALLOWED_EVENT_PARAMETERS = Object.freeze({
    mnt_page_view: new Set(["placement"]),
    mnt_section_click: new Set(["section_target", "faq_item", "placement"]),
    mnt_catalog_filter: new Set(["filter_dimension", "filter_value", "result_count", "placement"]),
    mnt_catalog_search: new Set(["search_state", "search_location", "result_count", "placement"]),
    mnt_intent: new Set(["intent_type", "contact_channel", "placement", "project_name", "offer_name"])
  });

  const EVENT_PARAMETER_DEFAULTS = Object.freeze({
    mnt_section_click: Object.freeze({faq_item: NOT_APPLICABLE}),
    mnt_catalog_search: Object.freeze({search_location: NOT_APPLICABLE}),
    mnt_intent: Object.freeze({project_name: NOT_APPLICABLE, offer_name: NOT_APPLICABLE})
  });

  const STATUS_VALUE = Object.freeze({
    todos: "all",
    lancamento: "launch",
    construcao: "construction",
    entregue: "ready"
  });

  const ZONE_VALUE = Object.freeze({
    todas: "all",
    "Zona Sul": "south",
    "Zona Oeste": "west",
    "Zona Leste": "east"
  });

  const PRICE_VALUE = Object.freeze({
    todos: "all",
    ate700: "lte_700k",
    "700a1200": "700k_1_2m",
    "1200a2000": "1_2m_2m",
    acima2000: "gt_2m",
    consulta: "consult"
  });

  const PROJECT_NAME_OVERRIDES = Object.freeze({
    "Nova Vivere | 72 m²": "Nova Vivere",
    "Nova Vivere | 105 m²": "Nova Vivere",
    "CAPIITOLO by Piero Lissoni | à vista": "CAPIITOLO by Piero Lissoni"
  });

  const FAQ_ITEM_BY_QUESTION = Object.freeze({
    "os valores mostrados sao finais": "valores_finais",
    "como comparar os empreendimentos": "comparar_empreendimentos",
    "como negociar uma condicao melhor": "negociar_condicao",
    "este e o site institucional da tegra": "site_institucional"
  });

  function isEligibleHost() {
    return window.location.hostname === CANONICAL_HOST;
  }

  function projectRoot() {
    return document.querySelector(ROOT_SELECTOR);
  }

  function asElement(target) {
    if (target instanceof Element) return target;
    return target?.parentElement || null;
  }

  function normalizeSearchState(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function normalizeControlledText(value) {
    return normalizeSearchState(value)
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function slugControlledText(value) {
    return normalizeControlledText(value).replace(/\s+/g, "_");
  }

  function eventId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();

    if (window.crypto?.getRandomValues) {
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0"));
      return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
    }

    return `mnt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  }

  function cleanParameters(eventName, parameters) {
    const allowlist = ALLOWED_EVENT_PARAMETERS[eventName];
    if (!allowlist) return {};

    const defaults = EVENT_PARAMETER_DEFAULTS[eventName] || {};
    const source = {...defaults};
    Object.entries(parameters || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      source[key] = value;
    });

    return Object.entries(source).reduce((result, [key, value]) => {
      if (!allowlist.has(key)) return result;
      result[key] = value;
      return result;
    }, {});
  }

  function emit(eventName, funnelStage, parameters = {}) {
    if (!isEligibleHost() || !projectRoot()) return false;
    if (!ALLOWED_EVENT_PARAMETERS[eventName]) return false;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      mnt_event_id: eventId(),
      mnt_event_version: EVENT_VERSION,
      page_identity: PAGE_IDENTITY,
      product_identity: PRODUCT_IDENTITY,
      route: ROUTE,
      funnel_stage: funnelStage,
      ...cleanParameters(eventName, parameters)
    });
    return true;
  }

  function projectContext(offerName) {
    const offer = String(offerName || "").trim();
    if (!offer) return {};
    return {
      project_name: PROJECT_NAME_OVERRIDES[offer] || offer,
      offer_name: offer
    };
  }

  function selectedProjectContext() {
    return projectContext(document.documentElement.dataset.moretegraInterest || "");
  }

  function resultCount(root) {
    const raw = root?.querySelector("[data-result-count]")?.textContent || "";
    const value = Number.parseInt(raw, 10);
    return Number.isFinite(value) ? value : 0;
  }

  function currentStatus(root) {
    return (
      root?.querySelector("[data-filter-status].is-active")?.dataset.filterStatus ||
      root?.querySelector("[data-status-mobile]")?.value ||
      "todos"
    );
  }

  function hasEffectiveFilters(root) {
    if (!root) return false;
    const zone = root.querySelector("[data-zone-filter]")?.value || "todas";
    const price = root.querySelector("[data-price-filter]")?.value || "todos";
    const query = normalizeSearchState(root.querySelector("[data-project-search]")?.value || "");
    return currentStatus(root) !== "todos" || zone !== "todas" || price !== "todos" || Boolean(query);
  }

  function registerSearchLocation(label) {
    const normalized = normalizeControlledText(label);
    const slug = slugControlledText(label);
    if (!normalized || !slug || normalized === "todas") return;
    if (!SEARCH_LOCATION_INDEX.has(normalized)) SEARCH_LOCATION_INDEX.set(normalized, slug);
  }

  function refreshSearchLocationIndex(root) {
    root?.querySelectorAll(".mt-project-location").forEach((node) => {
      const parts = String(node.textContent || "")
        .split("·")
        .map((part) => part.trim())
        .filter(Boolean);
      if (parts[0]) registerSearchLocation(parts[0]);
      if (parts[1]) registerSearchLocation(parts[1]);
    });
  }

  function containsControlledPhrase(haystack, needle) {
    if (!haystack || !needle) return false;
    return ` ${haystack} `.includes(` ${needle} `);
  }

  function classifySearchLocation(rawValue) {
    const query = normalizeControlledText(rawValue);
    if (!query) return "";

    const exact = SEARCH_LOCATION_INDEX.get(query);
    if (exact) return exact;

    const candidates = new Set();
    for (const [known, slug] of SEARCH_LOCATION_INDEX.entries()) {
      if (containsControlledPhrase(query, known) || containsControlledPhrase(known, query)) {
        candidates.add(slug);
      }
    }

    return candidates.size === 1 ? [...candidates][0] : "other";
  }

  function faqItem(summary) {
    const question = normalizeControlledText(summary?.textContent || "");
    return FAQ_ITEM_BY_QUESTION[question] || "other";
  }

  function emitPageViewOnce() {
    if (!isEligibleHost() || !projectRoot() || window[PAGE_VIEW_MARKER]) return false;
    window[PAGE_VIEW_MARKER] = true;
    return emit("mnt_page_view", "discovery", {placement: "document"});
  }

  function sectionPlacement(link) {
    if (link.closest(".mt-header")) return "header_nav";
    if (link.closest(".mt-hero")) return "hero";
    if (link.closest(".mt-moments")) return "moment_selector";
    return "content";
  }

  function sectionTargetFromHref(href) {
    if (href === "#oportunidades") return "opportunities";
    if (href === "#como-escolher") return "how_to_choose";
    if (href === "#negociacao") return "negotiation";
    if (href === "#inicio") return "top";
    return "";
  }

  function scheduleAfterInteraction(callback) {
    window.setTimeout(callback, 0);
  }

  function emitFilter(root, dimension, sourceValue, placement) {
    const map = dimension === "status" ? STATUS_VALUE : dimension === "zone" ? ZONE_VALUE : PRICE_VALUE;
    const canonicalValue = map[sourceValue];
    if (!canonicalValue) return;

    emit("mnt_catalog_filter", "consideration", {
      filter_dimension: dimension,
      filter_value: canonicalValue,
      result_count: resultCount(root),
      placement
    });
  }

  function cancelPendingSearch(root, committedValue = "") {
    const search = root?.querySelector("[data-project-search]");
    if (!search) return;
    const state = SEARCH_STATE.get(search);
    if (!state) return;
    if (state.timer) window.clearTimeout(state.timer);
    state.timer = 0;
    state.lastCommitted = committedValue;
  }

  function handleSearchInput(event) {
    const target = asElement(event.target);
    if (!target?.matches("[data-project-search]")) return;
    const root = target.closest(ROOT_SELECTOR);
    if (!root) return;

    refreshSearchLocationIndex(root);

    let state = SEARCH_STATE.get(target);
    if (!state) {
      state = {lastCommitted: normalizeSearchState(target.defaultValue || ""), timer: 0};
      SEARCH_STATE.set(target, state);
    }

    const next = normalizeSearchState(target.value);
    if (state.timer) window.clearTimeout(state.timer);
    state.timer = window.setTimeout(() => {
      state.timer = 0;
      if (next === state.lastCommitted) return;
      state.lastCommitted = next;
      emit("mnt_catalog_search", "consideration", {
        search_state: next ? "active" : "cleared",
        search_location: next ? classifySearchLocation(next) : undefined,
        result_count: resultCount(root),
        placement: "catalog_search"
      });
    }, SEARCH_DEBOUNCE_MS);
  }

  function handleFilterChange(event) {
    const target = asElement(event.target);
    if (!target) return;
    const root = target.closest(ROOT_SELECTOR);
    if (!root) return;

    if (target.matches("[data-status-mobile]")) {
      const next = target.value || "todos";
      scheduleAfterInteraction(() => emitFilter(root, "status", next, "status_mobile"));
      return;
    }

    if (target.matches("[data-zone-filter]")) {
      const next = target.value || "todas";
      scheduleAfterInteraction(() => emitFilter(root, "zone", next, "zone_select"));
      return;
    }

    if (target.matches("[data-price-filter]")) {
      const next = target.value || "todos";
      scheduleAfterInteraction(() => emitFilter(root, "price", next, "price_select"));
    }
  }

  function handleClick(event) {
    const element = asElement(event.target);
    if (!element) return;

    const floating = element.closest("#mt-floating-dock a");
    if (floating) {
      if (floating.matches(".mt-floating-lead")) {
        const context = selectedProjectContext();
        scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
          intent_type: "request_conditions",
          contact_channel: "form",
          placement: "floating",
          ...context
        }));
        return;
      }

      if (floating.matches(".mt-floating-whatsapp")) {
        const context = selectedProjectContext();
        scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
          intent_type: "whatsapp_contact",
          contact_channel: "whatsapp",
          placement: "floating",
          ...context
        }));
      }
      return;
    }

    const root = element.closest(ROOT_SELECTOR);
    if (!root) return;

    const faqSummary = element.closest(".mt-faq summary");
    if (faqSummary && root.contains(faqSummary)) {
      const details = faqSummary.closest("details");
      const wasOpen = details?.open === true;
      const item = faqItem(faqSummary);
      if (!wasOpen) {
        scheduleAfterInteraction(() => emit("mnt_section_click", "consideration", {
          section_target: "faq",
          faq_item: item,
          placement: "faq"
        }));
      }
      return;
    }

    const target = element.closest("a,button");
    if (!target || !root.contains(target)) return;

    const cardInterest = target.closest("[data-interest]");
    if (cardInterest) {
      const context = projectContext(cardInterest.dataset.interest);
      scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
        intent_type: "project_interest",
        contact_channel: "form",
        placement: "catalog_card",
        ...context
      }));
      return;
    }

    const continueForm = target.closest("[data-continue-form]");
    if (continueForm) {
      const context = selectedProjectContext();
      scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
        intent_type: "request_project_conditions",
        contact_channel: "form",
        placement: "interest_context",
        ...context
      }));
      return;
    }

    const statusButton = target.closest("[data-filter-status]");
    if (statusButton) {
      const next = statusButton.dataset.filterStatus || "todos";
      if (statusButton.classList.contains("is-active")) return;
      scheduleAfterInteraction(() => emitFilter(root, "status", next, "status_buttons"));
      return;
    }

    const quickZone = target.closest("[data-quick-zone]");
    if (quickZone) {
      const next = quickZone.dataset.quickZone || "todas";
      if (quickZone.classList.contains("is-active")) return;
      scheduleAfterInteraction(() => emitFilter(root, "zone", next, "zone_quick"));
      return;
    }

    const momentStatus = target.closest("[data-set-status]");
    if (momentStatus) {
      const next = momentStatus.dataset.setStatus || "todos";
      if (next === currentStatus(root)) return;
      scheduleAfterInteraction(() => emitFilter(root, "status", next, "moment_selector"));
      return;
    }

    const clear = target.closest("[data-clear-filters],[data-empty-clear]");
    if (clear) {
      if (!hasEffectiveFilters(root)) return;
      cancelPendingSearch(root, "");
      const placement = clear.matches("[data-empty-clear]") ? "empty_state_reset" : "clear_filters";
      scheduleAfterInteraction(() => emit("mnt_catalog_filter", "consideration", {
        filter_dimension: "reset",
        filter_value: "all",
        result_count: resultCount(root),
        placement
      }));
      return;
    }

    const focusPrice = target.closest("[data-focus-price]");
    if (focusPrice) {
      scheduleAfterInteraction(() => emit("mnt_section_click", "consideration", {
        section_target: "opportunities",
        placement: "moment_selector"
      }));
      return;
    }

    const changeInterest = target.closest("[data-change-interest]");
    if (changeInterest) {
      scheduleAfterInteraction(() => emit("mnt_section_click", "consideration", {
        section_target: "opportunities",
        placement: "content"
      }));
      return;
    }

    const href = target.getAttribute("href") || "";
    if (href.startsWith("#")) {
      if (href === "#formulario") {
        if (target.closest(".mt-header")) {
          scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
            intent_type: "request_conditions",
            contact_channel: "form",
            placement: "header_nav"
          }));
          return;
        }

        if (target.closest(".mt-hero")) {
          scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
            intent_type: "request_conditions",
            contact_channel: "form",
            placement: "hero"
          }));
          return;
        }

        if (target.closest(".mt-negotiation")) {
          scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
            intent_type: "negotiate_scenario",
            contact_channel: "form",
            placement: "negotiation"
          }));
          return;
        }
      }

      const sectionTarget = sectionTargetFromHref(href);
      if (sectionTarget) {
        const placement = sectionPlacement(target);
        scheduleAfterInteraction(() => emit("mnt_section_click", "consideration", {
          section_target: sectionTarget,
          placement
        }));
      }
      return;
    }

    if (target.matches('a[href^="https://wa.me/"]') && target.closest(".mt-negotiation")) {
      scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
        intent_type: "schedule_visit",
        contact_channel: "whatsapp",
        placement: "negotiation"
      }));
    }
  }

  function bindDelegatedMeasurement() {
    if (window[BIND_MARKER]) return;
    window[BIND_MARKER] = true;
    document.addEventListener("click", handleClick, true);
    document.addEventListener("change", handleFilterChange, true);
    document.addEventListener("input", handleSearchInput, true);
  }

  function primeRuntime() {
    const root = projectRoot();
    if (!root) return false;
    refreshSearchLocationIndex(root);
    emitPageViewOnce();
    return true;
  }

  function waitForRootAndPrimeRuntime() {
    if (primeRuntime()) return;

    const observer = new MutationObserver(() => {
      if (!primeRuntime()) return;
      observer.disconnect();
    });

    observer.observe(document.documentElement, {childList: true, subtree: true});
    window.setTimeout(() => observer.disconnect(), 10000);
  }

  function start() {
    if (!isEligibleHost()) return;
    bindDelegatedMeasurement();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", waitForRootAndPrimeRuntime, {once: true});
    } else {
      waitForRootAndPrimeRuntime();
    }
  }

  start();
})();
