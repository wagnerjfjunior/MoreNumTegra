# MNT-M2-01 — Tracking Runtime Inventory

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-01 — Inventory tracking already present in live runtime`
- Mode: `STRICT READ_ONLY / DESIGN / INVENTORY_ONLY`
- Started: `2026-09-10`
- Canonical base observed at start: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`
- Commercial production: `https://moretegra.com.br/`
- Vercel homologation: `https://morenumtegra.vercel.app/`
- Runtime mutation: `NONE`
- Status: `ACTIVE / PARTIAL_EVIDENCE`

## 1. Scope

This task inventories measurement/tracking that is already demonstrably present. It does not design the future event taxonomy, install tags, create GTM/GA4/Meta assets, change consent behavior, publish Green modules, mutate Search Console, create campaigns or spend money.

Preserve:

```text
INVENTORY != IMPLEMENTATION
SOURCE ABSENCE != RUNTIME ABSENCE
FORM SUBMISSION != ANALYTICS EVENT
SEARCH CONSOLE PROPERTY != CLIENT-SIDE ANALYTICS
OBSERVED SCRIPT != CONSENT-COMPLIANT EXECUTION
```

## 2. Canonical project-owned surfaces inspected

The project-owned V1 composition resolved from canonical `main` is:

```text
src-greenn/blocks/01-html-inicial.html
-> native Green Form 46 inserted by the Green builder
-> src-greenn/blocks/02-html-pos-form.html
-> src-greenn/blocks/03-footer.html
+ src-greenn/moretegra.css
+ src-greenn/moretegra.js
```

Vercel homologation composes the same project-owned blocks through `src-greenn/preview/index.html`. `vercel.json` only rewrites `/` to that preview compositor and applies response headers.

## 3. Static/project-owned source inventory

### 3.1 `src-greenn/moretegra.js`

Observed responsibilities include catalogue/UI behavior and Search metadata/canonical/JSON-LD management. No project-owned Google Tag Manager, GA4 `gtag`, `dataLayer`, Meta `fbq`, `connect.facebook.net`, `sendBeacon`, or equivalent measurement bootstrap was found by repository code-search against canonical `main`.

Classification:

`PROJECT_OWNED_TRACKING_BOOTSTRAP = NOT_FOUND_IN_CANONICAL_SOURCE`

This is not proof that the Green platform does not inject scripts outside the project-owned payload.

### 3.2 HTML blocks

`01-html-inicial.html`, `02-html-pos-form.html` and `03-footer.html` contain content, navigation, catalogue/CTA surfaces and presentation markup. No project-owned analytics/pixel bootstrap is present in the inspected blocks.

Classification:

`PROJECT_OWNED_HTML_TRACKING = NOT_OBSERVED`

### 3.3 Vercel preview compositor

`src-greenn/preview/index.html` loads the three project-owned HTML blocks and `moretegra.js`. Its local mock Form 46 explicitly prevents submission and sends no PII. No GTM/GA4/Meta measurement bootstrap is present in the compositor.

Classification:

`VERCEL_PREVIEW_PROJECT_OWNED_TRACKING = NOT_OBSERVED`

### 3.4 Vercel configuration

`vercel.json` contains rewrite and security/indexing headers only. No Vercel Analytics/Speed Insights or measurement integration is declared in the project-owned configuration.

Classification:

`VERCEL_CONFIG_MEASUREMENT = NOT_OBSERVED`

## 4. Known external/runtime surfaces

| Surface | Current evidence | Inventory state |
|---|---|---|
| Green native Form 46 | Commercial V1 lead submission/persistence previously validated | `LEAD_CAPTURE_PRESENT / ANALYTICS_EVENT_NOT_PROVEN` |
| Google Search Console | Property/indexation and GSC T0 are documented | `SEARCH_PERFORMANCE_SOURCE_PRESENT / NOT_CLIENT_ANALYTICS` |
| LGPD modal | Documented as active | `UI_PRESENT / ENFORCEMENT_NOT_PROVEN` |
| Green builder/platform injected scripts | Not represented in project-owned GitHub payload | `NOT_PROVEN` |
| GTM container | No project-owned container ID or bootstrap found | `NOT_CONFIGURED_OR_NOT_PROVEN` |
| GA4 property/tag | No project-owned Measurement ID/bootstrap found | `NOT_CONFIGURED_OR_NOT_PROVEN` |
| Meta Pixel/Dataset | No project-owned pixel bootstrap found | `NOT_CONFIGURED_OR_NOT_PROVEN` |
| Meta CAPI | No backend/intermediate integration exists in V1 project architecture | `NOT_IMPLEMENTED_OR_NOT_PROVEN` |
| Google Ads conversion tag | No project-owned conversion bootstrap found | `NOT_CONFIGURED_OR_NOT_PROVEN` |
| Vercel Analytics / Speed Insights | No declaration found in canonical project configuration | `NOT_OBSERVED_IN_PROJECT_SOURCE` |

## 5. Repository code-search probes

Read-only searches against canonical `main` returned zero code matches for the following measurement bootstrap markers:

- `googletagmanager`
- `dataLayer`
- `gtag`
- `fbq`
- `connect.facebook.net`
- `sendBeacon`

These probes support the narrow claim that the canonical project-owned repository does not currently contain those markers. GitHub code-search reported `incomplete_results=true` in some responses; therefore this evidence is supporting, not sufficient by itself. Direct inspection of the V1 composition files above is the stronger project-source evidence.

## 6. Current conclusion

The strongest supportable state is:

```text
PROJECT_OWNED MEASUREMENT BOOTSTRAP = NOT OBSERVED
GREEN FORM 46 LEAD CAPTURE = PRESENT
SEARCH CONSOLE = PRESENT AS SEARCH OBSERVABILITY
GTM = NOT_CONFIGURED_OR_NOT_PROVEN
GA4 = NOT_CONFIGURED_OR_NOT_PROVEN
META PIXEL/DATASET = NOT_CONFIGURED_OR_NOT_PROVEN
CONSENT ENFORCEMENT = NOT_PROVEN
GREEN PLATFORM-INJECTED TRACKING = NOT_PROVEN
```

Do not convert `NOT OBSERVED IN PROJECT SOURCE` into `ABSENT FROM LIVE COMMERCIAL RUNTIME`.

## 7. Evidence gap required to close MNT-M2-01

MNT-M2-01 remains `ACTIVE` until the runtime-only layer is inspected read-only. Required closure evidence is one of:

1. browser DevTools/Network + rendered DOM inspection of `https://moretegra.com.br/`, recording third-party measurement requests/scripts and relevant consent state; or
2. a HAR/network export from the commercial page with no PII, sufficient to classify GTM/GA4/Meta/Ads/Green platform measurement calls; and, where useful,
3. equivalent read-only inspection of the stable Vercel homologation to separate project-owned behavior from Green-builder/platform injection.

No click on a conversion CTA or form submission is required merely to inventory bootstrap scripts. If a later test needs submission/event proof, it belongs to the appropriate consent/measurement QA task and requires its own boundary.

## 8. Exit criteria

MNT-M2-01 may become `COMPLETE` only when:

- project-owned source inventory is recorded;
- commercial runtime measurement/bootstrap inventory is recorded;
- platform-injected versus project-owned provenance is distinguished;
- unknowns remain explicitly `NOT_PROVEN` rather than inferred;
- no runtime mutation was made.

## 9. Next within-task safe action

`READ_ONLY COMMERCIAL RUNTIME NETWORK/DOM CAPTURE`.

Until that evidence exists, do not advance to MNT-M2-02 as though MNT-M2-01 were closed.
