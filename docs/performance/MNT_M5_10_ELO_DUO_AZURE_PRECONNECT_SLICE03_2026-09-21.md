# MNT-M5-10 — Elo Duo Azure Preconnect Slice 03

Date: `2026-09-21`

Status: `ACTIVE / SLICE_03_AUTHORIZED / AZURE_PRECONNECT_EXPERIMENT`

## Product Authority scope

The Product Authority authorized additional bounded Elo Duo attempts to reduce LCP after Slice 01.

## Control state before candidate

After rejecting and rolling back the explicit hero preload, Production returned to:

```text
RUNTIME_SHA = 00ce9808123e1491dab7b063ae9224171a06c850
DEPLOYMENT = dpl_4CqSUUCvDjii5JYGviT2VRfJW5Sz
STATE = READY
HERO_PRELOAD = ABSENT
S3_PRECONNECT = PRESENT
AZURE_PRECONNECT = PRESENT
```

Contemporaneous rollback control:

```text
RUN = 35656855740
JOB = 106522542312
CHROME = 152.0.7977.82
LIGHTHOUSE = 13.5.0
RUNS = 5

LCP = 3,895 / 3,039 / 3,676 / 3,776 / 3,128 ms
MEDIAN_LCP = 3,676 ms
MEDIAN_SCORE = 74
MEDIAN_TRANSFER = 1,061,852 B
TARGET <=2,500 ms = FAIL
```

This adjacent control also confirms that the prior explicit hero preload candidate did not earn retention: its five-run median was `5,453 ms`.

## Hypothesis

The Elo hero is served from Green/GDigital S3 and already has the S3 preconnect. The page also speculatively opens a connection to Tegra Azure even though the Azure assets are below the fold.

On constrained mobile, the unnecessary early Azure connection may compete for connection/network resources without helping the LCP. This hypothesis must be measured, not assumed.

## Slice 03 single runtime variable

Remove only:

```html
<link rel="preconnect" href="https://stracctegra.blob.core.windows.net" crossorigin>
```

Preserve:

- S3 preconnect;
- selected compact Green hero and 160,918 B payload;
- visible hero `fetchpriority="high"`;
- no hero preload;
- all Azure image URLs themselves;
- lazy behavior of below-fold content;
- Search, Form 46, Measurement, Consent, CTA/WhatsApp, schema, accessibility and commercial content.

## Validation

After exact-head gates and Production deployment, execute the same five-run Lighthouse 13.5.0 mobile 393x852 simulated-throttling method and compare primarily with the adjacent rollback-control median `3,676 ms`.

Retain only if the candidate is non-regressive and provides useful evidence. Roll back if it is worse or inconclusive.
