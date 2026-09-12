# MNT-M2-09 — Parameter hygiene T12 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence class: `SOURCE CORRECTION / RUNTIME REVALIDATION PENDING`
- Branch: `feat/mnt-m2-09-tracking-implementation`
- Code correction head before this evidence commit: `ad3358a408656cf28b17ad0670dd7fc0056d3776`
- GTM published version remains: `5 — MNT M2-09 - Measurement v3 - 2026-09-11`
- GTM republish required by this source correction: `NO`

## 1. Trigger

Post-publication production inspection through GA4 network/debug evidence proved that separate source events were not duplicated because their `mnt_event_id` values were distinct. The same inspection exposed stale Data Layer model reuse for optional event parameters.

Observed example:

```text
mnt_catalog_search
search_state = cleared
search_location = lapa   # stale value from the previous active-search event
```

The issue was not duplicate dispatch. It was optional-parameter omission against GTM Data Layer Variable persistence.

The same class could affect:

- `faq_item` on non-FAQ `mnt_section_click` events after a FAQ event;
- `project_name` / `offer_name` on project-independent `mnt_intent` events after a project-context intent.

## 2. Design correction

Measurement source is now `v4` and materializes controlled defaults centrally before pushing to `window.dataLayer`.

Controlled default:

```text
not_applicable
```

Event-specific defaults:

```text
mnt_section_click
  faq_item = not_applicable

mnt_catalog_search
  search_location = not_applicable

mnt_intent
  project_name = not_applicable
  offer_name   = not_applicable
```

Meaningful values still override these defaults.

Examples:

```text
search active in Lapa
  search_location = lapa

search cleared
  search_location = not_applicable

FAQ open
  faq_item = valores_finais | comparar_empreendimentos | negociar_condicao | site_institucional | other

ordinary section navigation
  faq_item = not_applicable

project-specific intent
  project_name = Château Jardin
  offer_name = Château Jardin

project-independent intent
  project_name = not_applicable
  offer_name = not_applicable
```

## 3. Architectural boundary

The correction is centralized in parameter materialization rather than scattered resets or Data Layer cleanup calls.

Preserved:

- stable document-level delegated listeners;
- exact host guard `moretegra.com.br`;
- GTM as sole project-owned browser dispatcher;
- no raw free-form catalogue search text;
- no visitor PII;
- no direct `gtag()`;
- no direct `fbq()`;
- no form/lead events;
- no HTML/CSS/Form 46 change;
- accepted UI/runtime prefix preserved byte-for-byte.

The code does **not** clear the entire GTM Data Layer model and does not introduce a parallel measurement path.

## 4. Regression guard

`scripts/verify-moretegra-release.mjs` was hardened to require:

- Measurement source marker `v4`;
- controlled `NOT_APPLICABLE` value;
- event-specific parameter defaults;
- delegated v4 binding marker;
- existing FAQ/search semantics;
- absence of raw-search parameters, direct vendor dispatch and blocked form/lead events;
- exact Measurement-module equality with the tail of `src-greenn/moretegra.js`;
- byte-for-byte preservation of the accepted UI/runtime baseline;
- critical gallery / interest-context UI markers.

## 5. Bounded assembly proof

A temporary one-shot workflow applied the exact source replacements, assembled `src-greenn/moretegra.js`, executed the release guard, ran JavaScript syntax checks and asserted that the workflow delta contained only:

```text
src-greenn/modules/moretegra.measurement.js
src-greenn/moretegra.js
```

The workflow job concluded `success` and the temporary workflow file was removed immediately afterward.

Net compare from the previously published-source branch head `90dc59c65d56a70cc11cd3aa3b36cb75d4a705c1` to correction head `ad3358a408656cf28b17ad0670dd7fc0056d3776` contains only:

```text
scripts/verify-moretegra-release.mjs
src-greenn/modules/moretegra.measurement.js
src-greenn/moretegra.js
```

No UI/catalogue/HTML/CSS/Form 46 file is part of the net correction.

## 6. Required owner-controlled Green update and smoke

Copy the exact assembled `src-greenn/moretegra.js` from the current PR head into the Green page-level JavaScript field. Do not change HTML, CSS, native Form 46 or GTM Version 5.

Then validate at minimum:

```text
1. search lapa -> clear search
   cleared event must show search_location=not_applicable

2. open FAQ -> ordinary section navigation
   ordinary section event must show faq_item=not_applicable

3. select Château Jardin -> later project-independent intent
   project-independent event must show:
     project_name=not_applicable
     offer_name=not_applicable
```

Also smoke critical UI behavior: project galleries, interest context, filters, reset and scroll behavior.

`SOURCE CORRECTED != GREEN UPDATED != RUNTIME REVALIDATED != MNT-M2-09 COMPLETE`.
