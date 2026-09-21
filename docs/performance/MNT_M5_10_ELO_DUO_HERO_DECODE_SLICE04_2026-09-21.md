# MNT-M5-10 — Elo Duo Hero Decode Slice 04

Date: `2026-09-21`

Status: `ACTIVE / SLICE_04_AUTHORIZED / HERO_DECODE_EXPERIMENT`

## Product Authority scope

The Product Authority authorized additional bounded attempts on Elo Duo to reduce LCP.

## Preserved control

The restored Production runtime before Slice 04 is:

```text
RUNTIME_SHA = 093b59d0f5e2f98c8d22fc8c6d69ac6e95f0f7f4
DEPLOYMENT = dpl_3dArqtMgTcARmHGuPcvqg6unz2Pb
STATE = READY
HERO_PRELOAD = ABSENT
AZURE_PRECONNECT = PRESENT
S3_PRECONNECT = PRESENT
HERO_DECODING = async
```

The nearest clean five-run control of this same runtime shape recorded:

```text
LCP = 3,895 / 3,039 / 3,676 / 3,776 / 3,128 ms
MEDIAN_LCP = 3,676 ms
MEDIAN_SCORE = 74
MEDIAN_TRANSFER = 1,061,852 B
TARGET <=2,500 ms = FAIL
```

Rejected prior experiments:

- explicit hero preload: median LCP `5,453 ms`;
- Azure preconnect removal: median LCP `7,233 ms`.

## Hypothesis

The visible LCP image currently declares `decoding="async"`. For an above-the-fold LCP image, asynchronous decode may allow the browser to defer image presentation even after the resource is available. This slice tests the opposite policy directly.

This is a bounded browser-rendering hypothesis, not an assumption of guaranteed improvement.

## Slice 04 single runtime variable

Change only the visible Elo hero from:

```html
decoding="async"
```

to:

```html
decoding="sync"
```

Preserve:

- exact hero URL and bytes;
- width/height attributes;
- `fetchpriority="high"`;
- no explicit hero preload;
- Azure and S3 preconnects;
- all below-fold media behavior;
- Search, Form 46, Measurement, Consent, CTA/WhatsApp, schema, accessibility and commercial content.

The existing Slice 01 media validator is narrowed to its proper concern—source, intrinsic dimensions and fetch priority—so decode strategy can be tested independently without weakening the media-source contract.

## Validation

After exact-head repository gates and exact Production deployment, run the same Lighthouse 13.5.0 mobile 393x852 simulated-throttling five-run battery.

Primary comparison: adjacent clean control median `3,676 ms`.

Retain only if the candidate is non-regressive and materially useful. Otherwise restore `decoding="async"`.
