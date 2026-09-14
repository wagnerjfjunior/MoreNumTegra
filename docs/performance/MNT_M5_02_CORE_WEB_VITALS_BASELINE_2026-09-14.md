# MNT-M5-02 — Core Web Vitals / Performance Baseline

Status: `IN_PROGRESS / AUTHORIZED`  
Date: `2026-09-14`  
Canonical production target: `https://www.moretegra.com.br/`  
Planning effort: `16h`  
Source task: `MNT-M5-02 — Core Web Vitals/performance baseline`

## 1. Objective

Establish a reproducible performance baseline for the current commercial runtime before any remediation is proposed or implemented.

This task is baseline/evidence work only. A performance finding does not authorize a runtime change.

## 2. Acceptance targets

Project targets already governed by the technical baseline:

```text
LCP <= 2.5 s
INP <= 200 ms
CLS <= 0.1
```

These are acceptance targets, not observed current values.

## 3. Evidence classes

Every metric or conclusion must be classified as one of:

- `FIELD` — real-user field data, e.g. CrUX/Search Console CWV;
- `LAB` — synthetic test such as Lighthouse/PageSpeed/Pingdom;
- `SOURCE_LEVEL` — implementation evidence from HTML/CSS/JS;
- `NOT_OBSERVED` — numeric evidence is not available in the current evidence set.

Never convert `SOURCE_LEVEL` observations into claimed LCP/INP/CLS values.

## 4. Current numeric baseline state

At task start, repository evidence does **not** contain a current numeric p75 CWV baseline for the new canonical Vercel production host `www.moretegra.com.br`.

```text
FIELD mobile LCP = NOT_OBSERVED
FIELD mobile INP = NOT_OBSERVED
FIELD mobile CLS = NOT_OBSERVED
FIELD desktop LCP = NOT_OBSERVED
FIELD desktop INP = NOT_OBSERVED
FIELD desktop CLS = NOT_OBSERVED
LAB mobile Lighthouse/PageSpeed = NOT_OBSERVED
LAB desktop Lighthouse/PageSpeed = NOT_OBSERVED
```

Do not infer a PASS or FAIL from the absence of data.

## 5. Source-level baseline observations

### M5-02-S01 — Lightweight application architecture

- Evidence class: `SOURCE_LEVEL`
- Current architecture remains semantic HTML/CSS + vanilla JS with no framework/bundler requirement.
- Interpretation: favorable complexity boundary, but not proof of good CWV.

### M5-02-S02 — Catalog images are lazy-loaded

- Evidence class: `SOURCE_LEVEL`
- Project-card images are rendered with explicit `width="828" height="743"`, `loading="lazy"` and `decoding="async"`.
- Interpretation: positive below-the-fold loading/stability control; not a measured CLS/LCP result.

### M5-02-S03 — Gallery images reserve dimensions

- Evidence class: `SOURCE_LEVEL`
- Gallery images use explicit `width="960" height="720"`; non-primary gallery images use lazy loading.
- Interpretation: positive layout-stability control.

### M5-02-S04 — Hero video starts from a poster image

- Evidence class: `SOURCE_LEVEL`
- The production HTML provides a fixed-aspect hero video frame and an image placeholder before player initialization.
- Interpretation: reduces dependence on immediate iframe rendering, but actual LCP impact remains unmeasured.

### M5-02-S05 — Client-side block composition is on the critical rendering path

- Evidence class: `SOURCE_LEVEL`
- The production compositor fetches three HTML blocks, injects them, then loads `moretegra.js`.
- Interpretation: this introduces client-side network/JS dependency before the full portfolio runtime is mounted. It is a performance investigation candidate, not a proven regression.

### M5-02-S06 — Third-party/runtime dependencies

- Evidence class: `SOURCE_LEVEL`
- GTM is loaded on the production page and project media references external Tegra/GDigital/YouTube origins.
- Interpretation: third-party cost must be quantified in LAB evidence before prioritization.

## 6. Required measurement matrix

Before M5-02 can become `COMPLETE_CANDIDATE`, record where available:

| Surface | Device | Field LCP | Field INP | Field CLS | Lab score | Lab LCP | Lab TBT/INP proxy | Lab CLS |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | Mobile | pending | pending | pending | pending | pending | pending | pending |
| `/` | Desktop | pending | pending | pending | pending | pending | pending | pending |

Also capture:
- TTFB/server response signal;
- transfer size and request count;
- LCP element;
- render-blocking resources;
- main-thread/third-party cost;
- image/media waste;
- CLS contributors;
- whether field data exists at URL or origin level.

## 7. Current environmental constraint

The Vercel Hobby project reached its daily deployment limit during PR #84 work on 2026-09-14. That limit blocks fresh Preview deployment churn but does not itself prove any production performance problem.

M5-02 should prefer measurement against the current canonical production host until fresh Preview capacity is available for remediation comparison.

## 8. Gate

M5-02 is authorized to measure, document and classify performance evidence.

It does **not** authorize:
- M5-03;
- image/video/runtime remediation;
- changing Vercel/DNS configuration;
- changing GTM/GA4;
- merging PR #84;
- deploying an optimization to production.
