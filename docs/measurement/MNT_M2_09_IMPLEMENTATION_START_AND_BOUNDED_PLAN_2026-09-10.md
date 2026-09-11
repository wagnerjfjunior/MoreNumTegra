# MNT-M2-09 — Implementation Start and Bounded Tracking Plan — 2026-09-10

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Product Authority authorization: explicit `Autorizo iniciar MNT-M2-09.` on `2026-09-10`
- Canonical `main` resolved before execution: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Initial execution mode: `READ_ONLY ASSET RESOLUTION + BOUNDED IMPLEMENTATION PLANNING`
- Later bounded source authorization: deterministic `mnt_*` source instrumentation + GA4 workspace preparation for `G-57M2XR0CY2`, with no GTM publish and no form/lead events
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

## 5. Bounded source instrumentation implemented on the Draft branch

The branch now contains a deterministic source instrumentation staging module:

`src-greenn/moretegra.measurement.js`

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

`mnt_catalog_search` is debounced/committed and sends only search state plus result count, never the query text.

Filter instrumentation suppresses initial/default state, no-op setter calls and programmatic desktop/mobile synchronization.

## 6. Form events remain evidence-gated

Not implemented:

```text
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

A stable, non-invasive identification of the native Green Form 46 lifecycle remains required for form events, and a verified successful native registration signal remains mandatory for `mnt_lead_success`.

No submit interception, duplicate POST, custom fetch replacement or generic form mutation is authorized.

## 7. GTM / GA4 bounded workspace design

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

The current chat has no authenticated Google Tag Manager write connector. Therefore the GTM workspace itself is not claimed as mutated by ChatGPT; the exact build specification is prepared and must be evidenced after provider-side application.

## 8. Consent boundary

Accepted state handling remains:

```text
DEFAULT = denied for ad_storage / analytics_storage / ad_user_data / ad_personalization
Green Continuar = granted all four
Green Cancelar = denied all four
persistence = proven
```

M2-09 must not create a second consent state machine.

The Google destination's denied/granted network behavior must be inspected in GTM Preview before a future publish gate. This plan does not silently choose or redefine a Basic-vs-Advanced Consent Mode policy.

## 9. ADR-001 single-JavaScript residual

ADR-001 defines one page-level JavaScript production payload:

`src-greenn/moretegra.js`

The temporary `src-greenn/moretegra.measurement.js` is branch-only staging for review and must not become a second permanent Green production payload.

Before PR #50 can be Ready/merged:

1. fold the reviewed measurement IIFE into `src-greenn/moretegra.js`;
2. remove the temporary staging module;
3. restore Preview consumption to the single canonical JS payload;
4. re-run exact-head review.

## 10. QA obligations before MNT-M2-09 can be COMPLETE

MNT-M2-09 may not be accepted merely because branch code or a GTM workspace exists.

Later evidence must prove at minimum:

- exact GA4 IDs and destination mapping;
- canonical supported `mnt_*` source events in the final single Green JS payload;
- exactly one canonical project page-view path;
- no `www` project business Measurement;
- no duplicate direct `gtag()`/GA4 path;
- no raw search text or visitor PII;
- consent behavior for the configured GA4 destination;
- no false `mnt_lead_success`;
- exact GTM workspace/version evidence;
- no accidental Ads/Meta implementation;
- source/destination duplicate safeguards.

Full behavioral end-to-end acceptance remains MNT-M2-10.

## 11. Current state / next safe action

```text
MNT-M2-09 = ACTIVE / PARTIAL_IMPLEMENTED
GA4 ASSET = PROVEN
SOURCE DETERMINISTIC SLICE = IMPLEMENTED ON DRAFT BRANCH
GTM GA4 BUILD SPECIFICATION = PREPARED
GTM WORKSPACE MUTATION = NOT_YET_EVIDENCED
GTM PUBLICATION = NOT AUTHORIZED
FORM/LEAD EVENTS = NOT IMPLEMENTED
ADR-001 SINGLE-JS CONSOLIDATION = REQUIRED BEFORE READY/MERGE
```

MNT-M2-09 receives `0h accepted` until its full exit criteria are satisfied and accepted.