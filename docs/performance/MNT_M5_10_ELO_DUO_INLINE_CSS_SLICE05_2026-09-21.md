# MNT-M5-10 — Elo Duo Inline CSS Slice 05

Date: `2026-09-21`

Status: `ACTIVE / SLICE_05_AUTHORIZED / CSS_DELIVERY_EXPERIMENT`

## Product Authority scope

The Product Authority authorized additional bounded Elo Duo attempts to reduce LCP.

## Current clean control

Production before Slice 05:

```text
RUNTIME_SHA = bbf3520dec470c7a65b0d0b1ca21947dfa6ea440
DEPLOYMENT = dpl_4vkZDEbz3WpvQeVZzuDUmdWZZdQW
STATE = READY
HERO = compact Green WebP / 160,918 B / 1080x1350
HERO_DECODING = async
HERO_PRELOAD = absent
AZURE_PRECONNECT = present
S3_PRECONNECT = present
```

Nearest clean five-run control:

```text
LCP = 3,895 / 3,039 / 3,676 / 3,776 / 3,128 ms
MEDIAN_LCP = 3,676 ms
MEDIAN_SCORE = 74
MEDIAN_TRANSFER = 1,061,852 B
TARGET <=2,500 ms = FAIL
```

## Evidence supporting this attempt

The Slice 04 representative Lighthouse run showed:

```text
LCP timeToFirstByte ~= 51.9 ms
LCP resourceLoadDelay ~= 28.6 ms
LCP resourceLoadDuration ~= 174.6 ms
LCP elementRenderDelay ~= 225.8 ms
```

LCP discovery already passes all relevant checks: initial-document discoverability, eager loading and `fetchpriority=high`.

The remaining render-blocking audit identifies only:

```text
/src-greenn/project-page.css
transfer ~= 2.3 KiB
estimated blocking savings ~= 161 ms
```

The canonical stylesheet is 6,578 source characters and is already minified. This slice therefore tests CSS delivery only, without changing CSS semantics.

An independent media probe also confirmed the current HTML intrinsic dimensions are correct:

```text
hero WebP = 1080x1350 / 160,918 B
complex WebP = 1126x630 / 83,076 B
```

## Slice 05 single runtime variable

On Elo Duo only:

- remove the external render-blocking `<link rel="stylesheet" href="/src-greenn/project-page.css">`;
- inline the **exact byte-for-byte contents** of canonical `src-greenn/project-page.css` in the same head position.

No CSS rule changes are permitted by this slice.

## Preservation contract

Preserve:

- exact hero and complex media;
- hero `decoding="async"`, dimensions and `fetchpriority="high"`;
- both preconnects;
- no hero preload;
- Search, Form 46, Measurement, Consent, CTA/WhatsApp, schema, accessibility and commercial content;
- canonical shared CSS file itself unchanged.

This is an A/B delivery experiment. It is not a decision to duplicate shared CSS permanently. If retained, architecture must subsequently decide whether an automated inline-build step is preferable to committed duplication.

## Validation

1. exact-head static and browser gates;
2. Production READY on exact merge SHA;
3. same Lighthouse 13.5.0 mobile 393x852 simulated-throttling 5-run battery;
4. compare median LCP, performance score, CLS, TBT and transfer against the adjacent clean control.

Retain only if evidence is useful and non-regressive. Otherwise restore the external stylesheet link.
