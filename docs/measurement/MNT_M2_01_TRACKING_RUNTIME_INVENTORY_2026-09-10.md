# MNT-M2-01 — Tracking Runtime Inventory — T0 Historical Evidence

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-01 — Inventory tracking already present in live runtime`
- Evidence class: `T0 / PRE-GTM IMPLEMENTATION / HISTORICAL RUNTIME INVENTORY`
- Mode: `STRICT READ_ONLY / DESIGN / INVENTORY_ONLY`
- Started: `2026-09-10`
- Completed evidence capture: `2026-09-10`
- Canonical base observed at capture start: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`
- Commercial production: `https://moretegra.com.br/`
- Runtime mutation during this inventory: `NONE`
- Status when this reconciliation is merged: `COMPLETE`
- Raw HAR SHA-256: `c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446`

## 0. Historical-classification rule

This evidence package predates the later GTM/Consent implementation performed on 2026-09-10.

Therefore all `NOT_OBSERVED` statements below are bounded to the captured T0 session and MUST NOT be interpreted as current-runtime truth after the later GTM publication.

Preserve:

```text
T0_PRE_GTM_GTM_NOT_OBSERVED = VALID HISTORICAL EVIDENCE
T0_PRE_GTM_GTM_NOT_OBSERVED != CURRENT_RUNTIME_GTM_ABSENT
T1_GTM_CONSENT_EVIDENCE SUPERSEDES T0 FOR CURRENT GTM/CONSENT CLAIMS
```

Current GTM/Consent evidence is maintained separately in:

`docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

## 1. Scope

This task inventories measurement/tracking that was demonstrably present in the captured commercial runtime before the later GTM/Consent implementation. It does not design the future event taxonomy, install tags, create GA4/Meta assets, change consent behavior, publish Green modules, mutate Search Console, create campaigns or spend money.

Preserve:

```text
INVENTORY != IMPLEMENTATION
SOURCE ABSENCE != RUNTIME ABSENCE
FORM SUBMISSION != ANALYTICS EVENT
SEARCH CONSOLE PROPERTY != CLIENT-SIDE_ANALYTICS
OBSERVED SCRIPT != CONSENT_COMPLIANT_EXECUTION
THIRD_PARTY_MEDIA_TELEMETRY != GA4_OR_AD_PIXEL
```

## 2. Project-owned surfaces inspected at T0

The project-owned V1 composition resolved from canonical `main` at the time of capture was:

```text
src-greenn/blocks/01-html-inicial.html
-> native Green Form 46 inserted by the Green builder
-> src-greenn/blocks/02-html-pos-form.html
-> src-greenn/blocks/03-footer.html
+ src-greenn/moretegra.css
+ src-greenn/moretegra.js
```

Vercel homologation composes the same project-owned blocks through `src-greenn/preview/index.html`.

## 3. Static/project-owned source inventory at T0

Direct inspection plus repository code-search found no project-owned bootstrap for:

- Google Tag Manager / `googletagmanager`;
- `dataLayer`;
- GA4 / `gtag`;
- Meta Pixel / `fbq` / `connect.facebook.net`;
- `sendBeacon` measurement bootstrap;
- Vercel Analytics / Speed Insights declaration.

T0 classification:

```text
PROJECT_OWNED_GTM = NOT_OBSERVED_AT_T0
PROJECT_OWNED_GA4 = NOT_OBSERVED_AT_T0
PROJECT_OWNED_META_PIXEL = NOT_OBSERVED_AT_T0
PROJECT_OWNED_ADS_CONVERSION_TAG = NOT_OBSERVED_AT_T0
VERCEL_PROJECT_OWNED_MEASUREMENT = NOT_OBSERVED_AT_T0
```

GitHub code-search reported `incomplete_results=true` in some responses, so direct inspection of the canonical V1 composition remained the stronger project-source evidence.

## 4. Commercial runtime evidence — DevTools + HAR

The Product Authority supplied a Chrome DevTools capture and HAR from an anonymous-browser session against the commercial runtime on `2026-09-10`.

Raw HAR facts:

```text
HAR entries = 89
HAR SHA-256 = c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446
observed pages:
- https://www.moretegra.com.br/
- https://moretegra.com.br/
```

The raw HAR is not committed because it contains transient third-party request parameters/client metadata. This document preserves the bounded, redacted evidence and immutable HAR fingerprint.

### 4.1 Standard advertising/analytics tags at T0

DevTools console in the captured commercial session returned:

```text
window.dataLayer = undefined
typeof window.gtag = "undefined"
typeof window.fbq = "undefined"
```

The HAR contained no requests to the standard endpoints/hosts searched for GTM, GA4, Meta Pixel, Clarity, Hotjar or DoubleClick.

T0 classification:

```text
GTM = NOT_OBSERVED_AT_T0
GA4 / GTAG = NOT_OBSERVED_AT_T0
META PIXEL / FBQ = NOT_OBSERVED_AT_T0
CLARITY = NOT_OBSERVED_AT_T0
HOTJAR = NOT_OBSERVED_AT_T0
DOUBLECLICK = NOT_OBSERVED_AT_T0
```

These are historical non-observation claims for that captured session only.

### 4.2 Green/GDigital page-view telemetry

The HAR proves Green/GDigital runtime telemetry that was not present in the project-owned GitHub payload.

Observed request A:

```text
POST https://back.gdigital.com.br/page/view
origin/referer = https://www.moretegra.com.br/
payload = {"type":"view","page_id":293,"tenant_id":313}
response = HTTP 200
body = {"message":"View inserida com sucesso!"}
initiator = Green/GDigital Nuxt runtime
```

Observed request B:

```text
POST https://back.gdigital.com.br/page/view
origin/referer = https://moretegra.com.br/
payload = {"type":"view","page_id":292,"tenant_id":313}
response = HTTP 200
body = {"message":"View inserida com sucesso!"}
initiator = Green/GDigital Nuxt runtime
```

Classification:

```text
GREEN_GDIGITAL_PAGE_VIEW_TELEMETRY = OBSERVED / PLATFORM_INJECTED
GREEN_FORM_46_CONFIG_FETCH = OBSERVED
PROJECT_OWNED_SOURCE_FOR_PAGE_VIEW = NOT_OBSERVED
```

The same captured navigation sequence loaded `www.moretegra.com.br` and then `moretegra.com.br`, producing two distinct Green page-view writes with different Green page IDs. This is not adjudicated here as a platform defect, but it remains a concrete `DUPLICATE_MEASUREMENT_RISK` input for `MNT-M2-02`.

### 4.3 YouTube embedded-player telemetry

The page uses `youtube-nocookie.com`, but the HAR showed embedded-player operational/usage telemetry after player load, including:

- `www.youtube-nocookie.com/api/stats/qoe`;
- `www.youtube-nocookie.com/api/stats/playback`;
- `www.youtube-nocookie.com/api/stats/watchtime`;
- `www.youtube-nocookie.com/api/stats/atr`;
- `www.youtube-nocookie.com/ptracking`;
- `www.youtube-nocookie.com/youtubei/v1/log_event`;
- related Google/YouTube player requests.

Observed requests included playback/device/browser/video context. No GA4/Google Ads tag was thereby proven.

Classification:

```text
YOUTUBE_EMBED_MEDIA_TELEMETRY = OBSERVED / THIRD_PARTY_MEDIA
YOUTUBE_TELEMETRY = NOT_EQUIVALENT_TO_GA4_OR_GOOGLE_ADS_PIXEL
```

In the supplied T0 session the LGPD notice was still visible while YouTube telemetry had already occurred. Therefore the bounded historical technical claim remains:

`CONSENT_MODAL_DID_NOT_BLOCK_OBSERVED_YOUTUBE_NETWORK_TELEMETRY_IN_T0_SESSION`.

This is not a legal-compliance conclusion and does not invalidate the later GTM Consent Mode state-handling proof.

## 5. T0 inventory matrix

| Surface | T0 runtime state | Provenance |
|---|---|---|
| Green native Form 46 | `PRESENT` | Green platform |
| Green `/page/view` | `OBSERVED` | `PLATFORM_INJECTED` |
| GTM | `NOT_OBSERVED_AT_T0` | no project/runtime evidence in captured T0 session |
| GA4 / gtag | `NOT_OBSERVED_AT_T0` | no project/runtime evidence in captured T0 session |
| Meta Pixel / fbq | `NOT_OBSERVED_AT_T0` | no project/runtime evidence in captured T0 session |
| Google Ads conversion tag | `NOT_OBSERVED_AT_T0` | no project/runtime evidence in captured T0 session |
| Clarity / Hotjar / DoubleClick | `NOT_OBSERVED_AT_T0` | no runtime evidence in captured T0 session |
| YouTube player telemetry | `OBSERVED` | `THIRD_PARTY_MEDIA` |
| Search Console | `PRESENT AS SEARCH OBSERVABILITY` | external Search tooling, not client analytics |
| LGPD modal | `PRESENT` | Green/runtime UI |
| Consent enforcement | `NOT_PROVEN_AT_T0` | superseded for GTM consent-state handling by T1 evidence |

## 6. Exit criteria adjudication

MNT-M2-01 exit criteria are satisfied:

- project-owned source inventory recorded: `YES`;
- commercial runtime inspected read-only: `YES`;
- platform-injected versus project-owned provenance distinguished: `YES`;
- unknowns preserved rather than inferred: `YES`;
- runtime mutation performed by this inventory: `NO`;
- Form 46/PII submission required: `NO`.

When this reconciliation is integrated into canonical `main`:

`MNT-M2-01 = COMPLETE`.

## 7. T0 -> T1 continuity

```text
T0 PRE-GTM
- Green /page/view observed
- GTM/GA4/Meta not observed in captured session
- duplicate-measurement risk identified

T1 LATER ON 2026-09-10
- GTM container GTM-PGCR4R47 exists
- GTM Version 4 published
- Consent Mode state handling implemented and validated
```

The T0 evidence is preserved as historical baseline; current GTM/Consent claims must resolve T1.