# MNT-M2-01 — Tracking Runtime Inventory

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-01 — Inventory tracking already present in live runtime`
- Mode: `STRICT READ_ONLY / DESIGN / INVENTORY_ONLY`
- Started: `2026-09-10`
- Completed evidence capture: `2026-09-10`
- Canonical base observed at start: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`
- Commercial production: `https://moretegra.com.br/`
- Runtime mutation: `NONE`
- Status: `COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE`

## 1. Scope

This task inventories measurement/tracking that is already demonstrably present. It does not design the future event taxonomy, install tags, create GTM/GA4/Meta assets, change consent behavior, publish Green modules, mutate Search Console, create campaigns or spend money.

Preserve:

```text
INVENTORY != IMPLEMENTATION
SOURCE ABSENCE != RUNTIME ABSENCE
FORM SUBMISSION != ANALYTICS EVENT
SEARCH CONSOLE PROPERTY != CLIENT-SIDE ANALYTICS
OBSERVED SCRIPT != CONSENT-COMPLIANT EXECUTION
THIRD_PARTY_MEDIA_TELEMETRY != GA4_OR_AD_PIXEL
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

### 3.1 JavaScript / HTML / Vercel

Direct inspection plus repository code-search found no project-owned bootstrap for:

- Google Tag Manager / `googletagmanager`;
- `dataLayer`;
- GA4 / `gtag`;
- Meta Pixel / `fbq` / `connect.facebook.net`;
- `sendBeacon` measurement bootstrap;
- Vercel Analytics / Speed Insights declaration.

Classification:

```text
PROJECT_OWNED_GTM = NOT_OBSERVED
PROJECT_OWNED_GA4 = NOT_OBSERVED
PROJECT_OWNED_META_PIXEL = NOT_OBSERVED
PROJECT_OWNED_ADS_CONVERSION_TAG = NOT_OBSERVED
VERCEL_PROJECT_OWNED_MEASUREMENT = NOT_OBSERVED
```

GitHub code-search reported `incomplete_results=true` in some responses, so direct inspection of the canonical V1 composition remains the stronger project-source evidence.

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

The raw HAR is not committed to the repository because it contains transient third-party request parameters/client metadata. This document stores the bounded, redacted evidence required for MNT-M2-01 plus the SHA-256 fingerprint of the supplied capture.

### 4.1 Standard advertising/analytics tags

DevTools console in the observed commercial session returned:

```text
window.dataLayer = undefined
typeof window.gtag = "undefined"
typeof window.fbq = "undefined"
```

The HAR contains no requests to the standard endpoints/hosts searched for GTM, GA4, Meta Pixel, Clarity, Hotjar or DoubleClick.

Classification for this observed session:

```text
GTM = NOT_OBSERVED
GA4 / GTAG = NOT_OBSERVED
META PIXEL / FBQ = NOT_OBSERVED
CLARITY = NOT_OBSERVED
HOTJAR = NOT_OBSERVED
DOUBLECLICK = NOT_OBSERVED
```

This is evidence of non-observation in the captured session, not a claim that the Green platform can never inject such tooling under other configuration/state.

### 4.2 Green/GDigital page-view telemetry

The HAR proves Green/GDigital runtime telemetry that is not present in the project-owned GitHub payload.

Observed request A:

```text
POST https://back.gdigital.com.br/page/view
origin/referer = https://www.moretegra.com.br/
payload = {"type":"view","page_id":293,"tenant_id":313}
response = HTTP 200
body = {"message":"View inserida com sucesso!"}
initiator = Green/GDigital Nuxt runtime (_nuxt/ff454f8.js mounted flow)
```

Observed request B:

```text
POST https://back.gdigital.com.br/page/view
origin/referer = https://moretegra.com.br/
payload = {"type":"view","page_id":292,"tenant_id":313}
response = HTTP 200
body = {"message":"View inserida com sucesso!"}
initiator = Green/GDigital Nuxt runtime (_nuxt/ff454f8.js mounted flow)
```

Classification:

```text
GREEN_GDIGITAL_PAGE_VIEW_TELEMETRY = OBSERVED / PLATFORM_INJECTED
GREEN_FORM_46_CONFIG_FETCH = OBSERVED
PROJECT_OWNED_SOURCE_FOR_PAGE_VIEW = NOT_OBSERVED
```

The same captured navigation sequence loaded `www.moretegra.com.br` and then `moretegra.com.br`, producing two distinct Green page-view writes with different Green page IDs. This is not adjudicated here as a defect because Green may model them as separate pages, but it creates a concrete `DUPLICATE_MEASUREMENT_RISK` that must be addressed in `MNT-M2-02 — transport architecture and duplicate-event prevention`.

### 4.3 YouTube embedded-player telemetry

The page uses `youtube-nocookie.com`, but the HAR shows that the embedded player still sends operational/usage telemetry after the player loads, including:

- `www.youtube-nocookie.com/api/stats/qoe`;
- `www.youtube-nocookie.com/api/stats/playback`;
- `www.youtube-nocookie.com/api/stats/watchtime`;
- `www.youtube-nocookie.com/api/stats/atr`;
- `www.youtube-nocookie.com/ptracking`;
- `www.youtube-nocookie.com/youtubei/v1/log_event`;
- related Google/YouTube player requests.

Observed requests include playback/device/browser/video context. No GA4/Google Ads tag is thereby proven.

Classification:

```text
YOUTUBE_EMBED_MEDIA_TELEMETRY = OBSERVED / THIRD_PARTY_MEDIA
YOUTUBE_TELEMETRY = NOT_EQUIVALENT_TO_GA4_OR_GOOGLE_ADS_PIXEL
```

In the supplied screenshot the LGPD notice was still visible while YouTube telemetry had already occurred. Therefore the bounded technical claim is:

`CONSENT_MODAL_DID_NOT_BLOCK_OBSERVED_YOUTUBE_NETWORK_TELEMETRY_IN_THIS_SESSION`.

This task does not make a legal-compliance conclusion. Consent policy/gating design belongs to MNT-M2-07/MNT-M2-08.

## 5. Inventory matrix

| Surface | Runtime state | Provenance |
|---|---|---|
| Green native Form 46 | `PRESENT` | Green platform |
| Green `/page/view` | `OBSERVED` | `PLATFORM_INJECTED` |
| GTM | `NOT_OBSERVED` | no project/runtime evidence in captured session |
| GA4 / gtag | `NOT_OBSERVED` | no project/runtime evidence in captured session |
| Meta Pixel / fbq | `NOT_OBSERVED` | no project/runtime evidence in captured session |
| Google Ads conversion tag | `NOT_OBSERVED` | no project/runtime evidence in captured session |
| Clarity / Hotjar / DoubleClick | `NOT_OBSERVED` | no runtime evidence in captured session |
| YouTube player telemetry | `OBSERVED` | `THIRD_PARTY_MEDIA` |
| Search Console | `PRESENT AS SEARCH OBSERVABILITY` | external Search tooling, not client analytics |
| LGPD modal | `PRESENT` | Green/runtime UI |
| Consent enforcement | `NOT_PROVEN` | requires later consent tasks |

## 6. Exit criteria adjudication

MNT-M2-01 exit criteria are satisfied at the evidence level:

- project-owned source inventory recorded: `YES`;
- commercial runtime inspected read-only: `YES`;
- platform-injected versus project-owned provenance distinguished: `YES`;
- unknowns preserved rather than inferred: `YES`;
- runtime mutation performed: `NO`;
- Form 46/PII submission required: `NO`.

Task evidence state:

`MNT-M2-01 = COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE`.

The 8h planning/scope-equivalent effort becomes accepted only if this evidence/state is integrated into canonical `main` through the applicable PR lifecycle.

## 7. Carry-forward findings

The following findings are intentionally carried forward rather than solved here:

1. `MNT-M2-02`: define transport/dedup architecture accounting for Green `/page/view`, the www→non-www double-write risk, future project-owned events and third-party media telemetry;
2. `MNT-M2-07`: define consent model/LGPD gating, including third-party video behavior;
3. `MNT-M2-08`: define denied/granted QA proof obligations;
4. later implementation tasks must not accidentally double-count Green page views or YouTube telemetry as business conversions.

## 8. Next safe action after canonical acceptance

After this PR is accepted and merged, the next task candidate is:

`MNT-M2-02 — Define transport architecture and duplicate-event prevention`.

It is **not active or authorized by MNT-M2-01 completion**. No GTM/GA4/Meta/Green/Ads/consent-runtime mutation is authorized by this evidence.
