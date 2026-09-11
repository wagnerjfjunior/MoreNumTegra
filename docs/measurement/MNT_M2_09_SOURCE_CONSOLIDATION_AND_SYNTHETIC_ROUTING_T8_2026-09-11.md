# MNT-M2-09 — Source Consolidation and Synthetic Routing T8 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Canonical main resolved before material mutation: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Working branch: `feat/mnt-m2-09-tracking-implementation`
- Product Authority scope: consolidate the reviewed deterministic `mnt_*` instrumentation into the single canonical Green JS payload, remove the temporary staging file, restore Preview single-JS composition, and execute exact-head review; no Green publication and no GTM publication.

## 1. ADR-001 consolidation

The earlier T3 staging module was historical branch scaffolding:

```text
src-greenn/moretegra.measurement.js
blob = 6ea4c7965634756a2acb0d9031f6ce0cd4cb9e34
```

Under the authorized consolidation slice:

1. the reviewed measurement IIFE was appended inside the one page-level production artifact `src-greenn/moretegra.js`;
2. the temporary `src-greenn/moretegra.measurement.js` file was deleted;
3. `src-greenn/preview/index.html` was restored to loading only `/src-greenn/moretegra.js`.

Consolidation commits:

```text
0d569fd8e7beddfc57a7b04e7d7a61b52d575db7  consolidate measurement into moretegra.js
6cbcbc41dfaf96880bdd05359bb138900f03bec3  remove temporary measurement staging file
752640c2fbcfc742cfa167a520ff6e90cd4454ec  restore Preview to single canonical JS payload
```

Observed `moretegra.js` blob after consolidation:

```text
d9d9067701920c729bd92c21e3343c0820791c6d
```

The Preview file now matches canonical main's single-JS composition blob:

```text
7046d48a602709e82dd31e68f4698e25d66254d1
```

Classification:

```text
ADR_001_SINGLE_PAGE_JS_PAYLOAD = SATISFIED_ON_BRANCH
TEMPORARY_MEASUREMENT_FILE = REMOVED
PREVIEW_SECOND_JS_REFERENCE = REMOVED
GREEN_PUBLICATION = NOT_PERFORMED
GTM_PUBLICATION = NOT_PERFORMED
```

## 2. Consolidated source contract

The current `src-greenn/moretegra.js` contains the authorized deterministic source slice for exactly:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
```

The measurement IIFE preserves:

- exact production-host guard `window.location.hostname === "moretegra.com.br"`;
- `window.dataLayer.push(...)` as the only project source transport;
- `mnt_event_version = 1`;
- `page_identity = moretegra_home`;
- `product_identity = moretegra_portfolio`;
- `route = /`;
- controlled funnel stages and allowlisted event parameters;
- no visitor name/email/phone/form-field values;
- no raw catalogue search text;
- no direct `gtag()` / `fbq()` path;
- one global page-view marker for `mnt_page_view`;
- state-change suppression for no-op filters/search commits.

The authorized slice still excludes:

```text
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

No native Green Form 46 submit interception, replacement POST or generic form binding was introduced.

## 3. Synthetic GTM / GA4 routing proof

Before source consolidation, the prepared unpublished GTM workspace was exercised against `https://moretegra.com.br` through Tag Assistant using controlled synthetic `dataLayer.push(...)` occurrences.

Previously recorded page-view evidence proves:

```text
mnt_page_view -> GA4 page_view tag = 1 intended firing
GA4 destination = G-57M2XR0CY2
second project page-view tag firing for the occurrence = not observed
```

The four remaining source events were then tested individually. Product Authority screenshots show each selected source occurrence had exactly its corresponding GA4 Event tag under `Tags Fired`, with status `Succeeded`, while the other eight tags did not fire.

Screenshot evidence:

```text
18832c32-a0e3-48d3-b888-570dd41f6b3e.png
SHA-256 a69e82a861de1bd46aac827c12bbd652c32d66b8878485f6768ead38252e665d
Observed: mnt_catalog_search -> GA4 - Event - mnt_catalog_search only

582aca49-8a0e-4e38-a1e1-e632572099c2.png
SHA-256 d1ad6ea59212b1507f3f2eb8a7e5e010106982d9e2b1bc581ad878c8257e12d6
Observed: mnt_intent -> GA4 - Event - mnt_intent only

d3b021df-5d4f-4b43-bdaf-80c928bfbed3.png
SHA-256 fa27bb8cc0b1768f6a97bd55d5f38a2f37ec34c31d524c1f22416dd0c0c5bb49
Observed: mnt_catalog_filter -> GA4 - Event - mnt_catalog_filter only

02b000f2-60c0-4038-82d8-a4d2047374ed.png
SHA-256 c23b7f9a22f7ce4f660b6a4549f8b814a3642b781c8429496927896a04fcdd9b
Observed: mnt_section_click -> GA4 - Event - mnt_section_click only
```

Supported adjudication for the synthetic workspace test:

```text
MNT_SECTION_CLICK_ROUTING = PASS
MNT_CATALOG_FILTER_ROUTING = PASS
MNT_CATALOG_SEARCH_ROUTING = PASS
MNT_INTENT_ROUTING = PASS
INTENDED_GA4_TAG_FIRING_COUNT_PER_TEST_OCCURRENCE = 1
CROSS_FIRE_IN_THE_FOUR_SELECTED_OCCURRENCES = 0 OBSERVED
```

These are synthetic GTM-workspace routing proofs. They are not yet real-source Green runtime proof for the newly consolidated `moretegra.js` artifact.

## 4. Consent evidence relationship

The current evidence chain also includes:

- granted-state Consent Update proof for all four Google consent signals;
- denied-state Cancel path proof;
- GA4 denied-state `g/collect` evidence;
- clean-session denied test with no `_ga` / `_ga_*` before or after the controlled page-view occurrence;
- one clean-room GA4 collect request for the controlled denied test.

See:

- `docs/measurement/MNT_M2_09_GTM_GA4_PREVIEW_PAGE_VIEW_T5_2026-09-11.md`
- `docs/measurement/MNT_M2_09_GTM_GA4_PREVIEW_DENIED_CONSENT_T6_2026-09-11.md`
- `docs/measurement/MNT_M2_09_GA4_DENIED_HAR_T6_2026-09-11.md`
- `docs/measurement/MNT_M2_09_GA4_DENIED_CLEAN_ROOM_T7_2026-09-11.md`

The clean-room denied behavior is consistent with Advanced Consent Mode cookieless measurement for that tested session.

## 5. Exact-head review boundary

The consolidation removes the ADR-001 temporary-file blocker, but it does **not** complete MNT-M2-09.

Still required before task acceptance:

1. real-source runtime proof after an explicitly authorized Green artifact update using the consolidated `src-greenn/moretegra.js`;
2. proof that real user actions produce the intended canonical `mnt_*` events and destination mappings without duplicate/cross-fire behavior;
3. separately authorized GTM Submit/Publish if and when the workspace is accepted for production;
4. exact published GTM version evidence after publication;
5. continued exclusion of form/lead events until the native Green Form 46 lifecycle and verified success signal are proven;
6. end-to-end acceptance remains owned by MNT-M2-10.

No Green publication or GTM Submit/Publish occurred in this consolidation slice.

## 6. Current classification

```text
MNT-M2-09 = ACTIVE / PARTIAL_IMPLEMENTED
SOURCE_SINGLE_JS_CONSOLIDATION = COMPLETE_ON_DRAFT_BRANCH
SYNTHETIC_GTM_GA4_ROUTING = PASS_FOR_AUTHORIZED_FIVE_EVENT_SLICE
GRANTED_CONSENT_PATH = PROVEN
DENIED_CLEAN_ROOM_COOKIE_SUPPRESSION = PASS_FOR_TESTED_SESSION
REAL_SOURCE_GREEN_RUNTIME_PROOF = OPEN
GTM_SUBMIT_PUBLISH = NOT_AUTHORIZED / NOT_PERFORMED
FORM_LEAD_INSTRUMENTATION = NOT_IMPLEMENTED
MNT-M2-10 = NOT_STARTED
```

MNT-M2-09 remains at `0h accepted` until its full exit criteria are satisfied and explicitly accepted.