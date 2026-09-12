# MNT-M2-09 — Source Instrumentation T3 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Product Authority authorization: deterministic `mnt_*` source instrumentation on PR #50 branch + GTM/GA4 workspace preparation for `G-57M2XR0CY2`; no GTM publish; no form/lead events.
- Canonical main resolved before material mutation: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Working branch: `feat/mnt-m2-09-tracking-implementation`
- External production mutation by this code slice: `NONE`

## 1. Implemented source slice

A bounded branch-only measurement module was added at:

`src-greenn/moretegra.measurement.js`

Git blob observed after commit:

`6ea4c7965634756a2acb0d9031f6ce0cd4cb9e34`

Local verification against the exact committed bytes:

```text
git hash-object = 6ea4c7965634756a2acb0d9031f6ce0cd4cb9e34
SHA-256        = 150c44c4526185df0ffe3774bfe3bc9cf904b932b6c161614a0c91b31502f182
node --check    = PASS
```

Static forbidden-signal scan returned no occurrence of:

```text
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
gtag(
fbq(
form_id
email
telefone
phone
```

Canonical implemented source event names observed in the module:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
```

## 2. Host / transport boundary

The source emitter is guarded by the exact production hostname:

```text
moretegra.com.br
```

It does not emit project Measurement on the Vercel preview hostname or `www.moretegra.com.br`.

Transport is source-only:

```text
semantic occurrence -> window.dataLayer.push(canonical mnt_* event)
```

The module contains no direct `gtag()` or `fbq()` transport.

## 3. Envelope / privacy controls

Every source push created by this slice carries:

```text
event
mnt_event_id
mnt_event_version = 1
page_identity = moretegra_home
product_identity = moretegra_portfolio
route = /
funnel_stage
placement when applicable
```

Each event uses an explicit parameter allowlist. Visitor PII, native Green Form values, free-form message text and raw catalogue search text are not part of the source schema.

`mnt_catalog_search` uses a 600 ms committed/debounced state transition and sends only:

```text
search_state = active | cleared
result_count
placement = catalog_search
```

It does not send the typed query.

## 4. Duplicate-prevention behavior

Implemented safeguards include:

- `mnt_page_view` guarded by a global Symbol marker and exact-host eligibility;
- filter events only when effective filter state changes;
- programmatic desktop/mobile synchronization does not dispatch source events;
- reset emits one reset semantic occurrence and cancels any pending search commit;
- a more-specific `mnt_catalog_filter` or `mnt_intent` branch returns before generic section-click mapping;
- floating actions are delegated outside the project root so dynamically mounted actions do not require rebinding.

## 5. Intent mapping implemented

The source slice implements the accepted M2-03 mapping for:

- header form request;
- hero form request;
- negotiation scenario request;
- negotiation WhatsApp visit scheduling;
- catalogue card project interest;
- selected-project request for conditions;
- floating form request;
- floating WhatsApp request.

Project context uses existing offer/project names and only the already accepted variant-to-project normalization for Nova Vivere and CAPIITOLO offer variants. No synthetic project ID or slug is invented.

## 6. Preview composition

`src-greenn/preview/index.html` was changed on the branch to load, in order:

```text
/src-greenn/moretegra.js
/src-greenn/moretegra.measurement.js
```

The measurement module immediately no-ops outside exact host `moretegra.com.br`, so this composition does not turn Vercel into a production Measurement host.

No Vercel deployment was triggered by this slice.

## 7. Green artifact architecture residual — merge blocker

ADR-001 defines one canonical page-level Green JavaScript payload:

`src-greenn/moretegra.js`

Therefore `src-greenn/moretegra.measurement.js` is **branch-only staging**, not a new permanent Green production artifact.

Before PR #50 can become Ready/mergeable by governance, the measurement IIFE must be folded/concatenated into the canonical `src-greenn/moretegra.js`, the temporary staging file must be removed, and the preview must return to consuming the single canonical JavaScript payload.

Classification:

```text
SOURCE_SEMANTICS_IMPLEMENTED_ON_BRANCH = YES
FINAL_SINGLE_GREEN_JS_ARTIFACT = NOT_YET_RECONCILED
PR_50_READY_FOR_MERGE = NO
```

## 8. GTM workspace preparation boundary

The exact GTM configuration is specified in:

`docs/measurement/MNT_M2_09_GTM_GA4_WORKSPACE_BUILD_SHEET_2026-09-11.md`

This chat has no authenticated Google Tag Manager write connector. Therefore the branch contains the exact build specification, but no false claim is made that ChatGPT mutated the GTM workspace.

No GTM version was published.

## 9. Current task classification

```text
MNT-M2-09 = ACTIVE / PARTIAL_IMPLEMENTED
SOURCE DETERMINISTIC EVENT SLICE = IMPLEMENTED ON DRAFT BRANCH
GA4 ASSET = PROVEN
GTM WORKSPACE BUILD SPEC = PREPARED
GTM WORKSPACE MUTATION = NOT_YET_EVIDENCED
GTM PUBLICATION = NOT_AUTHORIZED / NOT_PERFORMED
FORM EVENTS = NOT_IMPLEMENTED
LEAD SUCCESS = NOT_IMPLEMENTED
MNT-M2-10 = NOT_STARTED
```

MNT-M2-09 remains at `0h accepted` until its full exit criteria are satisfied and accepted.