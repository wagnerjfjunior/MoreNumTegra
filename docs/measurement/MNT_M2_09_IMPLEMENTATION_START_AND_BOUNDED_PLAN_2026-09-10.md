# MNT-M2-09 — Implementation Start and Bounded Tracking Plan — 2026-09-10

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Product Authority authorization: explicit `Autorizo iniciar MNT-M2-09.` on `2026-09-10`
- Canonical `main` resolved before execution: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Mode for this execution: `READ_ONLY ASSET RESOLUTION + BOUNDED IMPLEMENTATION PLANNING / NO UNBOUNDED EXTERNAL RUNTIME OR ADMIN MUTATION`
- Task state: `ACTIVE / PARTIAL_IMPLEMENTED`

## 1. Purpose

Start MNT-M2-09 without converting the start authorization into an unlimited mutation authorization.

The task sequence is deliberately bounded to:

1. resolve the live canonical project state;
2. inspect the current project-owned source and accepted Measurement contracts;
3. resolve existing dedicated GA4 and Meta assets read-only when possible;
4. where Product Authority explicitly creates a required asset, record the exact observed non-secret identifiers;
5. define the exact implementation delta required for project source and GTM destinations;
6. stop before any additional external publish/create/configure action that requires its own explicit mutation scope.

Preserve:

```text
M2-09 START AUTHORIZED != UNLIMITED EXTERNAL MUTATION AUTHORIZED
ASSET NOT PROVEN != ASSET DOES NOT EXIST
DESIGN/PLAN != IMPLEMENTED RUNTIME
BRANCH CHANGE != PRODUCTION
GTM WORKSPACE CHANGE != PUBLISHED GTM VERSION
DATA LAYER EVENT != DESTINATION DELIVERY
EVENT DELIVERY != CONVERSION VALIDITY
```

## 2. Accepted dependencies

MNT-M2-09 implementation is constrained by the already accepted contracts:

- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_06_META_PIXEL_DATASET_OWNERSHIP_CONTRACT_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

Binding runtime rules include:

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

## 3. Asset-resolution state

### 3.1 GA4

Initial Windsor.ai read-only resolution did not find a dedicated MoreNumTegra GA4 property in the connected scope. Product Authority then confirmed that no MoreNumTegra GA4 configuration existed and created the dedicated property + production web stream in Google Analytics.

Evidence is recorded in:

`docs/measurement/MNT_M2_09_GA4_ASSET_CREATION_EVIDENCE_2026-09-11.md`

Current proven GA4 identifiers:

```text
GA4_PROPERTY_NAME = MoreNumTegra
GA4_PROPERTY_ID = 553742649
GA4_STREAM_NAME = MoreNumTegra
GA4_STREAM_ID = 15759638334
GA4_MEASUREMENT_ID = G-57M2XR0CY2
GA4_PRODUCTION_HOST = moretegra.com.br
ENHANCED_MEASUREMENT = OFF
```

Current GA4 runtime state:

```text
GA4_ASSET_TOPOLOGY = PROVEN
GA4_RUNTIME_COLLECTION = NOT_YET_IMPLEMENTED / NOT_YET_PROVEN
GA4_KEY_EVENT_CONFIGURATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
GOOGLE_ADS_LINK = NOT_AUTHORIZED / NOT_IMPLEMENTED
```

### 3.2 Meta

Meta asset resolution remains incomplete:

```text
META_DATASET_ID = NOT_PROVEN
META_PIXEL_OR_BROWSER_SOURCE_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = NOT_PROVEN
```

Windsor.ai Meta Ads scope is insufficient to prove Events Manager Dataset/Pixel administration. A provider-native read-only Events Manager inspection remains required before Meta implementation.

## 4. Bounded project-source implementation plan

The project-owned source delta should implement the canonical source layer without coupling browser code to GA4 or Meta IDs.

### 4.1 Source emitter

`src-greenn/moretegra.js` should expose one internal project emitter that:

- runs only when the exact canonical production host is eligible;
- does not emit project Measurement on `www.moretegra.com.br`;
- does not emit production Measurement on `morenumtegra.vercel.app`;
- pushes canonical events to `window.dataLayer` only;
- creates one `mnt_event_id` per semantic occurrence;
- sets `mnt_event_version = 1`;
- always includes `page_identity = moretegra_home`, `product_identity = moretegra_portfolio`, `route = /`, and `funnel_stage`;
- sends only allowlisted controlled parameters;
- never sends visitor name, email, phone, Form 46 values, free-form message text or raw catalogue search text.

No project-owned direct `gtag()` or `fbq()` bootstrap is allowed.

### 4.2 Source events implementable from current deterministic UI signals

The following source events have deterministic attachment points in the current project source and may be implemented under the next bounded source-code mutation gate:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
```

Required safeguards:

- `mnt_page_view`: exactly once per eligible canonical document load;
- `mnt_section_click`: mutually exclusive with more-specific filter/intent semantics;
- `mnt_catalog_filter`: user-effective change only; programmatic control synchronization must not emit;
- `mnt_catalog_search`: debounced/committed event, never one event per keystroke, never raw query text;
- `mnt_intent`: exact allowlisted `intent_type`, `contact_channel` and `placement` mapping from M2-03.

### 4.3 Form events remain evidence-gated

The following events must not be manufactured from weaker DOM assumptions:

```text
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

`mnt_form_start` and `mnt_form_submit_attempt` require a stable, non-invasive identification of the native Green Form 46 lifecycle.

`mnt_lead_success` additionally requires a stable verified-success signal proving that native Green registration actually succeeded.

Until those signals are proven:

```text
FORM START IMPLEMENTATION = HOLD
FORM SUBMIT ATTEMPT IMPLEMENTATION = HOLD
LEAD SUCCESS IMPLEMENTATION = BLOCKED
```

No submit interception, duplicate POST, custom fetch replacement or global-form mutation is allowed.

## 5. GTM / GA4 implementation plan

GTM remains the sole project-owned browser dispatcher.

The now-proven GA4 destination is:

```text
source canonical mnt_* event
-> GTM-PGCR4R47
-> canonical-host + consent/eligibility controls
-> G-57M2XR0CY2
```

The implementation must:

1. preserve the published Version 4 Consent baseline;
2. consume only canonical project `mnt_*` source events;
3. enforce canonical-host eligibility;
4. prevent a second page-view path;
5. preserve one source occurrence -> one destination dispatch;
6. prevent direct duplicate GA4 bootstrap outside GTM;
7. preserve PII and raw-search exclusions;
8. keep `mnt_lead_success` disabled until the Green success signal is proven;
9. avoid automatic + manual page-view duplication.

No GA4 Key Event, Google Ads link, Ads conversion action, enhanced-conversion/user-provided-data feature or monetary lead value is authorized by the current scope.

## 6. Meta destination plan

Meta remains evidence-gated until exact Dataset/Pixel/browser-source identifiers and relationship are observed.

No direct `fbq()` path is allowed outside the governed GTM dispatcher.

CAPI remains outside this implementation slice. If browser + server transport is proposed later, its event identity, consent and Meta-native deduplication contract must be defined and proven separately.

## 7. Consent implementation boundary

Accepted state handling remains:

```text
DEFAULT = denied for ad_storage / analytics_storage / ad_user_data / ad_personalization
Green Continuar = granted all four
Green Cancelar = denied all four
persistence = proven
```

M2-09 must not create a second consent state machine.

The current acceptance proves state handling, not complete destination-network behavior. GA4/Meta destination firing rules must be explicitly validated in M2-10.

## 8. QA obligations before MNT-M2-09 can be COMPLETE

MNT-M2-09 may not be accepted complete merely because a branch or GTM workspace exists.

At minimum, later evidence must prove:

- exact adopted GA4 IDs — now proven;
- exact adopted Meta IDs/relationship if Meta browser collection is implemented;
- canonical `mnt_*` source events implemented for all supportable signals;
- one canonical project page-view path;
- no `www` project business Measurement;
- no duplicate `gtag()`/GA4 path;
- no duplicate direct `fbq()`/Meta path;
- no raw search text or visitor PII in event parameters;
- consent behavior for every configured destination;
- no false `mnt_lead_success`;
- exact GTM version/workspace change evidence;
- destination mapping inventory;
- source/destination dedup safeguards.

End-to-end behavioral acceptance remains MNT-M2-10.

## 9. Current next-safe action

GA4 asset discovery/creation is now resolved.

Next material implementation gate:

```text
1. authorize bounded source-code instrumentation for deterministic mnt_* events;
2. authorize bounded GTM GA4 destination configuration to G-57M2XR0CY2;
3. do not implement form/lead events until Green lifecycle/success signals are proven;
4. do not implement Meta destination until Meta Events Manager assets are proven;
5. validate branch/workspace before any GTM production publication;
6. publish only under an explicit GTM publication gate.
```

MNT-M2-09 remains `ACTIVE / PARTIAL_IMPLEMENTED`; it receives `0h accepted` until the task exit criteria are fully satisfied and accepted.
