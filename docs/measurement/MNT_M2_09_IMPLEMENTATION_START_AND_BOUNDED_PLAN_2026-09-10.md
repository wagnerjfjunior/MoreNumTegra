# MNT-M2-09 — Implementation Start and Bounded Tracking Plan — 2026-09-10

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Product Authority authorization: explicit `Autorizo iniciar MNT-M2-09.` on `2026-09-10`
- Canonical `main` resolved before execution: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Initial execution mode: `READ_ONLY ASSET RESOLUTION + BOUNDED IMPLEMENTATION PLANNING`
- Later bounded source authorization: deterministic `mnt_*` source instrumentation + GA4 workspace preparation for `G-57M2XR0CY2`, with no GTM publish and no form/lead events
- Later consolidation authorization: fold the reviewed source instrumentation into canonical `src-greenn/moretegra.js`, remove temporary staging, restore single-JS Preview composition, execute exact-head review; no Green/GTM publication
- Task state: `ACTIVE / PARTIAL_IMPLEMENTED`

## 1. Purpose

Execute MNT-M2-09 in bounded slices without converting task-start or later source/workspace authorization into unlimited external mutation authority.

Preserve:

```text
M2-09 START AUTHORIZED != UNLIMITED EXTERNAL MUTATION AUTHORIZED
ASSET NOT PROVEN != ASSET DOES NOT EXIST
BRANCH CHANGE != PRODUCTION
GTM WORKSPACE CHANGE != PUBLISHED GTM VERSION
DATA LAYER EVENT != DESTINATION DELIVERY
EVENT DELIVERY != CONVERSION VALIDITY
```

## 2. Accepted dependencies

MNT-M2-09 is constrained by:

- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_06_META_PIXEL_DATASET_OWNERSHIP_CONTRACT_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

Binding runtime rules:

```text
PROJECT_BROWSER_DISPATCHER = GTM-PGCR4R47
PROJECT_MEASUREMENT_HOST = moretegra.com.br
www.moretegra.com.br project business Measurement = BLOCKED
morenumtegra.vercel.app project production Measurement = BLOCKED
Green /page/view = PLATFORM TELEMETRY / NOT PROJECT EVENT
one semantic source occurrence -> one project dataLayer event
visitor PII/raw catalogue search text -> FORBIDDEN IN ORDINARY MEASUREMENT
only verified Green Form 46 success -> mnt_lead_success
```

## 3. Resolved GA4 destination

The Product Authority created and evidenced a dedicated GA4 destination:

```text
Property: MoreNumTegra
Property ID: 553742649
Production web stream ID: 15759638334
Measurement ID: G-57M2XR0CY2
Production host: https://moretegra.com.br
Enhanced Measurement: OFF
```

Windsor.ai subsequently exposed `553742649 | MoreNumTegra` in the connected GA4 scope.

No existing unrelated GA4 property is repurposed.

## 4. Meta destination state

Still unresolved:

```text
META_DATASET_ID = NOT_PROVEN
META_PIXEL_OR_BROWSER_SOURCE_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = NOT_PROVEN
```

The connected Windsor Meta Ads surface does not provide sufficient Events Manager admin inventory to prove those resources.

Meta implementation is not part of the current bounded source/GA4 workspace slice.

## 5. Deterministic source instrumentation

The authorized source instrumentation now resides in the single canonical Green page-level JavaScript artifact:

`src-greenn/moretegra.js`

Implemented source events:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
```

The source emitter:

- runs only on exact host `moretegra.com.br`;
- pushes canonical events to `window.dataLayer` only;
- creates one `mnt_event_id` per semantic occurrence;
- sets `mnt_event_version = 1`;
- includes `page_identity = moretegra_home`, `product_identity = moretegra_portfolio`, `route = /` and canonical funnel stage;
- sends only allowlisted controlled parameters;
- never sends visitor name, email, phone, Form 46 values, free-form message text or raw catalogue search text;
- contains no direct `gtag()` or `fbq()` path.

`mnt_catalog_search` uses a 600 ms committed/debounced state transition and sends only:

```text
search_state = active | cleared
result_count
placement = catalog_search
```

It does not send the typed query.

Filter instrumentation suppresses initial/default state, no-op setter calls and programmatic desktop/mobile synchronization.

The earlier temporary staging artifact `src-greenn/moretegra.measurement.js` was removed after consolidation. `src-greenn/preview/index.html` again consumes only the canonical `moretegra.js` payload.

Consolidation evidence is recorded in:

`docs/measurement/MNT_M2_09_SOURCE_CONSOLIDATION_AND_SYNTHETIC_ROUTING_T8_2026-09-11.md`.

## 6. Form events remain evidence-gated

Not implemented:

```text
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

A stable, non-invasive identification of the native Green Form 46 lifecycle remains required for form events, and a verified successful native registration signal remains mandatory for `mnt_lead_success`.

No submit interception, duplicate POST, custom fetch replacement or generic form mutation is authorized.

## 7. GTM / GA4 bounded workspace design and current proof

The exact non-published workspace build is specified in:

`docs/measurement/MNT_M2_09_GTM_GA4_WORKSPACE_BUILD_SHEET_2026-09-11.md`

It requires:

```text
Google tag destination = G-57M2XR0CY2
send_page_view = false
canonical host = moretegra.com.br
source mnt_page_view -> exactly one GA4 page_view destination event
other supported mnt_* -> explicit GA4 event mappings
no form/lead tags
no Ads tags
no Meta tags
no publication
```

Provider-side GTM workspace preparation has subsequently been evidenced by Product Authority screenshots and GTM Preview / Tag Assistant tests. Synthetic routing proof currently supports one intended firing per tested source occurrence for the authorized five-event slice, with no cross-fire observed in the selected occurrences.

The current ChatGPT toolset still has no authenticated Google Tag Manager write connector; no claim is made that ChatGPT itself mutated or published the GTM workspace.

## 8. Consent boundary and proof

Accepted state handling remains:

```text
DEFAULT = denied for ad_storage / analytics_storage / ad_user_data / ad_personalization
Green Continuar = granted all four
Green Cancelar = denied all four
persistence = proven
```

M2-09 does not create a second consent state machine.

The prepared GA4 destination has now been tested in GTM Preview for granted and denied paths. Clean-session denied evidence supports cookieless GA4 collection with no `_ga` / `_ga_*` cookie observed before or after the controlled denied test. This is a bounded test result, not a claim about every future browser/session.

## 9. ADR-001 single-JavaScript reconciliation

ADR-001 defines one page-level JavaScript production payload:

`src-greenn/moretegra.js`

The temporary staging file has been folded into the canonical JS and removed. Preview again loads only `src-greenn/moretegra.js`.

Current classification:

```text
ADR_001_SINGLE_JS_CONSOLIDATION = COMPLETE_ON_DRAFT_BRANCH
TEMPORARY_MEASUREMENT_FILE = REMOVED
PREVIEW_SINGLE_JS_COMPOSITION = RESTORED
```

This removes the former temporary-file consolidation blocker. It does not authorize Green publication or GTM publication.

## 10. QA obligations before MNT-M2-09 can be COMPLETE

MNT-M2-09 may not be accepted merely because branch code or a GTM workspace exists.

Still required at minimum:

- real-source runtime proof from the final consolidated Green JS artifact after an explicitly authorized Green update;
- exact canonical supported `mnt_*` source events from real page interactions;
- exactly one canonical project page-view path in real runtime;
- no `www` project business Measurement;
- no duplicate direct `gtag()`/GA4 path;
- no raw search text or visitor PII;
- no false `mnt_lead_success`;
- separately authorized GTM Submit/Publish before any new production GTM version exists;
- exact published GTM version evidence after any future publication;
- no accidental Ads/Meta implementation;
- source/destination duplicate safeguards.

Full behavioral end-to-end acceptance remains MNT-M2-10.

## 11. Current state / next safe action

```text
MNT-M2-09 = ACTIVE / PARTIAL_IMPLEMENTED
GA4 ASSET = PROVEN
SOURCE DETERMINISTIC SLICE = CONSOLIDATED INTO CANONICAL moretegra.js ON DRAFT BRANCH
SYNTHETIC GTM/GA4 ROUTING = PASS FOR AUTHORIZED FIVE-EVENT SLICE
CONSENT GRANTED/DENIED BOUNDED QA = PROVEN FOR TESTED SESSIONS
GTM WORKSPACE PREPARATION = EVIDENCED / UNPUBLISHED
GTM PUBLICATION = NOT AUTHORIZED / NOT PERFORMED
GREEN PUBLICATION OF CONSOLIDATED JS = NOT AUTHORIZED / NOT PERFORMED
FORM/LEAD EVENTS = NOT IMPLEMENTED
REAL-SOURCE GREEN RUNTIME PROOF = OPEN
```

MNT-M2-09 receives `0h accepted` until its full exit criteria are satisfied and accepted.