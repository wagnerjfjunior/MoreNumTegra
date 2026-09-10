# MNT-M2-09 — Implementation Start and Bounded Tracking Plan — 2026-09-10

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Product Authority authorization: explicit `Autorizo iniciar MNT-M2-09.` on `2026-09-10`
- Canonical `main` resolved before execution: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Mode for this first execution slice: `READ_ONLY ASSET RESOLUTION + BOUNDED IMPLEMENTATION PLANNING / NO EXTERNAL RUNTIME OR ADMIN MUTATION`
- Runtime mutation in this first slice: `NONE`
- External-platform mutation in this first slice: `NONE`
- Task state after this first slice: `ACTIVE / PARTIAL_IMPLEMENTED`

## 1. Purpose

Start MNT-M2-09 without converting the start authorization into an unlimited mutation authorization.

The first mandatory slice is deliberately bounded to:

1. resolve the live canonical project state;
2. inspect the current project-owned source and accepted Measurement contracts;
3. resolve, read-only, any existing dedicated GA4 and Meta assets when account access is available;
4. define the exact implementation delta required for the project source layer and GTM destinations;
5. stop before any external publish/create/configure action that requires its own explicit mutation scope.

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

## 3. Read-only asset-resolution state at start

Canonical evidence currently proves:

```text
GTM container = GTM-PGCR4R47
GTM published Consent baseline = Version 4
GA4 governance target = one dedicated MoreNumTegra property + one production stream
Meta governance target = one dedicated MoreNumTegra Dataset + one browser source relationship if implemented
```

Canonical evidence does not yet prove:

```text
GA4_PROPERTY_ID = NOT_PROVEN
GA4_STREAM_ID = NOT_PROVEN
GA4_MEASUREMENT_ID = NOT_PROVEN
META_DATASET_ID = NOT_PROVEN
META_PIXEL_OR_BROWSER_SOURCE_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = NOT_PROVEN
```

No identifier is invented by this task.

The current canonical project source was inspected at task start. The existing `src-greenn/moretegra.js` contains catalogue, navigation, CTA, interest-context, filtering and media behavior, but canonical `mnt_*` event emission is not yet accepted as implemented in the project source. The Vercel compositor also remains a non-transmitting laboratory for Form 46.

## 4. External-access dependency

The exact GA4 and Meta identifiers cannot be established from canonical repository evidence alone.

Before destination configuration is implemented, an authorized read-only operator must inspect the relevant Google Analytics / Meta account surfaces and record only the non-secret identifiers actually observed.

Required read-only capture:

### GA4

- property name;
- property ID;
- production web-stream name;
- stream ID;
- Measurement ID;
- associated host = `moretegra.com.br`;
- whether the property/stream is already dedicated to MoreNumTegra.

### Meta

- Dataset name;
- Dataset ID;
- Pixel/browser-source name if separately represented;
- Pixel/browser-source ID if separately represented;
- observed relationship between Dataset and browser source;
- whether the asset is already dedicated to MoreNumTegra.

Credentials, passwords, recovery data, tokens and secrets must not be stored in GitHub.

## 5. Bounded project-source implementation plan

After the read-only asset-resolution step, the project-owned source delta should implement the canonical source layer without coupling the browser code to GA4 or Meta IDs.

### 5.1 Source emitter

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

### 5.2 Source events implementable from current deterministic UI signals

The following source events have deterministic attachment points in the current project source and may be implemented once the bounded source-code mutation slice is explicitly executed:

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

### 5.3 Form events remain evidence-gated

The following events must **not** be manufactured from weaker DOM assumptions:

```text
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

`mnt_form_start` and `mnt_form_submit_attempt` require a stable, non-invasive identification of the native Green Form 46 lifecycle.

`mnt_lead_success` additionally requires a stable verified-success signal proving that the native Green registration actually succeeded.

Until those signals are proven:

```text
FORM START IMPLEMENTATION = HOLD
FORM SUBMIT ATTEMPT IMPLEMENTATION = HOLD
LEAD SUCCESS IMPLEMENTATION = BLOCKED
```

No submit interception, duplicate POST, custom fetch replacement or global-form mutation is allowed.

## 6. GTM implementation plan

GTM remains the sole project-owned browser dispatcher.

When the exact destination IDs are proven and the applicable mutation scope is explicitly authorized, the GTM implementation must:

1. preserve the published Version 4 Consent baseline;
2. consume only canonical project `mnt_*` source events;
3. enforce canonical-host eligibility;
4. prevent a second page-view path;
5. preserve one source occurrence -> one destination dispatch per intended destination;
6. prevent direct duplicate GA4 or Meta bootstraps outside GTM;
7. preserve PII and raw-search exclusions;
8. keep `mnt_lead_success` disabled until the Green success signal is proven;
9. retain destination-native deduplication as destination-specific rather than assuming `mnt_event_id` is automatically sufficient.

## 7. GA4 destination plan

After exact GA4 identifiers are observed and an applicable mutation gate is granted:

```text
source canonical mnt_* event
-> GTM-PGCR4R47
-> canonical-host + consent/eligibility controls
-> dedicated MoreNumTegra GA4 web stream
```

The implementation must avoid automatic + manual page-view duplication. The exact GA4 page-view strategy must be explicit before publish.

No GA4 Key Event, Google Ads link, Ads conversion action, enhanced-conversion/user-provided-data feature or monetary lead value is authorized by this start slice.

## 8. Meta destination plan

After exact Meta identifiers are observed and an applicable mutation gate is granted:

```text
source canonical mnt_* event
-> GTM-PGCR4R47
-> canonical-host + consent/eligibility controls
-> dedicated MoreNumTegra Meta Dataset/browser source
```

No direct `fbq()` path is allowed outside the governed GTM dispatcher.

Meta Standard Event / Custom Event / Custom Conversion mapping is not inferred merely from the project PRIMARY/SECONDARY labels. Mapping must preserve M2-03/M2-04 semantics and later paid-media/optimization contracts.

CAPI remains outside this implementation slice. If browser + server transport is proposed later, its event identity, consent and Meta-native deduplication contract must be defined and proven separately.

## 9. Consent implementation boundary

Accepted state handling remains:

```text
DEFAULT = denied for ad_storage / analytics_storage / ad_user_data / ad_personalization
Green Continuar = granted all four
Green Cancelar = denied all four
persistence = proven
```

M2-09 must not create a second consent state machine.

The current acceptance proves state handling, not complete destination-network behavior. GA4/Meta destination firing rules must be explicitly validated in M2-10.

## 10. QA obligations before MNT-M2-09 can be COMPLETE

MNT-M2-09 may not be accepted complete merely because a branch or GTM workspace exists.

At minimum, later evidence must prove:

- exact adopted GA4 IDs;
- exact adopted Meta IDs/relationship if Meta browser collection is implemented;
- canonical `mnt_*` source events implemented for all signals that are actually supportable;
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

## 11. Current stop condition

This first M2-09 slice stops before external platform mutation because the exact GA4 and Meta destination assets are not yet canonically proven and the current start gate does not authorize unlimited external creation/publish/configuration.

Current next-safe action:

```text
1. resolve existing GA4 and Meta assets read-only;
2. record the exact observed non-secret IDs/relationships;
3. finalize the exact source/GTM destination delta against those assets;
4. obtain explicit mutation scope for the external changes actually required;
5. implement on branch/workspace;
6. validate before any production publication.
```

MNT-M2-09 remains `ACTIVE / PARTIAL_IMPLEMENTED`; it receives `0h accepted` until the task exit criteria are fully satisfied and accepted.