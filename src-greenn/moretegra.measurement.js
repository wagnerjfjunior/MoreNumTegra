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

  const ALLOWED_EVENT_PARAMETERS = Object.freeze({
    mnt_page_view: new Set(["placement"]),
    mnt_section_click: new Set(["section_target", "placement"]),
    mnt_catalog_filter: new Set(["filter_dimension", "filter_value", "result_count", "placement"]),
    mnt_catalog_search: new Set(["search_state", "result_count", "placement"]),
    mnt_intent: new Set(["intent_type", "contact_channel", "placement", "project_name", "offer_name"])
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

  function isEligibleHost() {
    return window.location.hostname === CANONICAL_HOST;
  }

  function projectRoot() {
    return document.querySelector(ROOT_SELECTOR);
  }

  function normalizeSearchState(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
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

    return Object.entries(parameters || {}).reduce((result, [key, value]) => {
      if (!allowlist.has(key)) return result;
      if (value === undefined || value === null || value === "") return result;
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

  function emitPageViewOnce() {
    if (!isEligibleHost() || !projectRoot() || window[PAGE_VIEW_MARKER]) return;
    window[PAGE_VIEW_MARKER] = true;
    emit("mnt_page_view", "discovery", {placement: "document"});
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

  function initialFilterState(root) {
    const statusButton = root.querySelector("[data-filter-status].is-active");
    const statusMobile = root.querySelector("[data-status-mobile]");
    const zone = root.querySelector("[data-zone-filter]");
    const price = root.querySelector("[data-price-filter]");
    const search = root.querySelector("[data-project-search]");

    return {
      status: statusButton?.dataset.filterStatus || statusMobile?.value || "todos",
      zone: zone?.value || "todas",
      price: price?.value || "todos",
      query: normalizeSearchState(search?.value || "")
    };
  }

  function attachMeasurement(root) {
    if (!root || root.dataset.mntMeasurementBound === "true") return;
    root.dataset.mntMeasurementBound = "true";

    const state = initialFilterState(root);
    let lastCommittedSearch = state.query;
    let searchTimer = 0;

    const emitFilter = (dimension, sourceValue, placement) => {
      const map = dimension === "status" ? STATUS_VALUE : dimension === "zone" ? ZONE_VALUE : PRICE_VALUE;
      const canonicalValue = map[sourceValue];
      if (!canonicalValue) return;

      emit("mnt_catalog_filter", "consideration", {
        filter_dimension: dimension,
        filter_value: canonicalValue,
        result_count: resultCount(root),
        placement
      });
    };

    const commitSearch = () => {
      searchTimer = 0;
      const next = state.query;
      if (next === lastCommittedSearch) return;
      lastCommittedSearch = next;
      emit("mnt_catalog_search", "consideration", {
        search_state: next ? "active" : "cleared",
        result_count: resultCount(root),
        placement: "catalog_search"
      });
    };

    root.addEventListener("input", (event) => {
      const search = event.target.closest?.("[data-project-search]");
      if (!search) return;
      state.query = normalizeSearchState(search.value);
      if (searchTimer) window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(commitSearch, SEARCH_DEBOUNCE_MS);
    });

    root.addEventListener("change", (event) => {
      const target = event.target;

      if (target.matches?.("[data-status-mobile]")) {
        const next = target.value || "todos";
        if (next === state.status) return;
        state.status = next;
        emitFilter("status", next, "status_mobile");
        return;
      }

      if (target.matches?.("[data-zone-filter]")) {
        const next = target.value || "todas";
        if (next === state.zone) return;
        state.zone = next;
        emitFilter("zone", next, "zone_select");
        return;
      }

      if (target.matches?.("[data-price-filter]")) {
        const next = target.value || "todos";
        if (next === state.price) return;
        state.price = next;
        emitFilter("price", next, "price_select");
      }
    });

    root.addEventListener("click", (event) => {
      const target = event.target.closest?.("a,button");
      if (!target || !root.contains(target)) return;

      const cardInterest = target.closest("[data-interest]");
      if (cardInterest) {
        emit("mnt_intent", "intent", {
          intent_type: "project_interest",
          contact_channel: "form",
          placement: "catalog_card",
          ...projectContext(cardInterest.dataset.interest)
        });
        return;
      }

      const continueForm = target.closest("[data-continue-form]");
      if (continueForm) {
        emit("mnt_intent", "intent", {
          intent_type: "request_project_conditions",
          contact_channel: "form",
          placement: "interest_context",
          ...selectedProjectContext()
        });
        return;
      }

      const statusButton = target.closest("[data-filter-status]");
      if (statusButton) {
        const next = statusButton.dataset.filterStatus || "todos";
        if (next === state.status) return;
        state.status = next;
        emitFilter("status", next, "status_buttons");
        return;
      }

      const quickZone = target.closest("[data-quick-zone]");
      if (quickZone) {
        const next = quickZone.dataset.quickZone || "todas";
        if (next === state.zone) return;
        state.zone = next;
        emitFilter("zone", next, "zone_quick");
        return;
      }

      const momentStatus = target.closest("[data-set-status]");
      if (momentStatus) {
        const next = momentStatus.dataset.setStatus || "todos";
        if (next === state.status) return;
        state.status = next;
        emitFilter("status", next, "moment_selector");
        return;
      }

      const clear = target.closest("[data-clear-filters],[data-empty-clear]");
      if (clear) {
        const hadEffectiveFilter =
          state.status !== "todos" || state.zone !== "todas" || state.price !== "todos" || Boolean(state.query);
        if (!hadEffectiveFilter) return;

        if (searchTimer) {
          window.clearTimeout(searchTimer);
          searchTimer = 0;
        }
        state.status = "todos";
        state.zone = "todas";
        state.price = "todos";
        state.query = "";
        lastCommittedSearch = "";

        emit("mnt_catalog_filter", "consideration", {
          filter_dimension: "reset",
          filter_value: "all",
          result_count: resultCount(root),
          placement: clear.matches("[data-empty-clear]") ? "empty_state_reset" : "clear_filters"
        });
        return;
      }

      const focusPrice = target.closest("[data-focus-price]");
      if (focusPrice) {
        emit("mnt_section_click", "consideration", {
          section_target: "opportunities",
          placement: "moment_selector"
        });
        return;
      }

      const changeInterest = target.closest("[data-change-interest]");
      if (changeInterest) {
        emit("mnt_section_click", "consideration", {
          section_target: "opportunities",
          placement: "content"
        });
        return;
      }

      const href = target.getAttribute?.("href") || "";
      if (href.startsWith("#")) {
        if (href === "#formulario") {
          if (target.closest(".mt-header")) {
            emit("mnt_intent", "intent", {
              intent_type: "request_conditions",
              contact_channel: "form",
              placement: "header_nav"
            });
            return;
          }

          if (target.closest(".mt-hero")) {
            emit("mnt_intent", "intent", {
              intent_type: "request_conditions",
              contact_channel: "form",
              placement: "hero"
            });
            return;
          }

          if (target.closest(".mt-negotiation")) {
            emit("mnt_intent", "intent", {
              intent_type: "negotiate_scenario",
              contact_channel: "form",
              placement: "negotiation"
            });
            return;
          }
        }

        const sectionTarget = sectionTargetFromHref(href);
        if (sectionTarget) {
          emit("mnt_section_click", "consideration", {
            section_target: sectionTarget,
            placement: sectionPlacement(target)
          });
        }
        return;
      }

      const whatsapp = target.matches?.('a[href^="https://wa.me/"]') ? target : null;
      if (whatsapp && whatsapp.closest(".mt-negotiation")) {
        emit("mnt_intent", "intent", {
          intent_type: "schedule_visit",
          contact_channel: "whatsapp",
          placement: "negotiation"
        });
      }
    });
  }

  function attachFloatingActions() {
    if (document.documentElement.dataset.mntFloatingMeasurementBound === "true") return;
    document.documentElement.dataset.mntFloatingMeasurementBound = "true";

    document.addEventListener("click", (event) => {
      const target = event.target.closest?.("#mt-floating-dock a");
      if (!target) return;

      if (target.matches(".mt-floating-lead")) {
        emit("mnt_intent", "intent", {
          intent_type: "request_conditions",
          contact_channel: "form",
          placement: "floating",
          ...selectedProjectContext()
        });
        return;
      }

      if (target.matches(".mt-floating-whatsapp")) {
        emit("mnt_intent", "intent", {
          intent_type: "whatsapp_contact",
          contact_channel: "whatsapp",
          placement: "floating",
          ...selectedProjectContext()
        });
      }
    });
  }

  function boot() {
    if (!isEligibleHost()) return;
    const root = projectRoot();
    if (!root) return;
    attachMeasurement(root);
    attachFloatingActions();
    emitPageViewOnce();
  }

  function start() {
    if (!isEligibleHost()) return;

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot, {once: true});
    } else {
      boot();
    }

    if (!projectRoot()) {
      const observer = new MutationObserver(() => {
        if (!projectRoot()) return;
        observer.disconnect();
        boot();
      });
      observer.observe(document.documentElement, {childList: true, subtree: true});
    }
  }

  start();
})();
