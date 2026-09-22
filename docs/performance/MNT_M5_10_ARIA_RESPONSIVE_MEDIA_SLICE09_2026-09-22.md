# MNT-M5-10 — Ária Responsive Media Slice 09

Date: `2026-09-22`

Status: `COMPLETE / RETAINED / REPLICATED / TARGET_MET / STANDARD_VALIDATION_PASS`

## Purpose

Validate whether the responsive-image pattern retained on Elo Duo produces a material, repeatable benefit on a second exact-project page before treating it as the canonical remediation pattern.

Scope:

- Ária hero;
- first gallery main image;
- first gallery thumbnail;
- no GTM/GA4/Consent/Form46 change;
- no SEO/canonical/commercial-data change;
- original Azure assets preserved as desktop/fallback.

## Runtime anchors

```text
START_CANONICAL_MAIN = aba2672a7bbbcd28528d237eb206c064b77c8e6c
START_EFFECTIVE_PRODUCTION_RUNTIME = 90745255775129638b3d8f061ab067d8ecc1c425
START_DEPLOYMENT = dpl_6Dw473nRdfcCgAiEBQGAk5Uer6QL / READY

SLICE_09_PR = #221
SLICE_09_HEAD = dbbb1f5ebeb21d590e0bfac3dbf24ecdcdf910ba
SLICE_09_MERGE_SHA = ac7958db2f2f4cd3d3bfccf4b6e9592f81a5d739
SLICE_09_PRODUCTION = dpl_6bepVcnUTT9hDhgkHbQsAdtkoE8T / READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

## Baseline

Baseline run `35741908269` on the pre-Slice-09 Production:

```text
hero source = 714x640 JPEG / 221,132 B
gallery1 source = 1920x873 JPEG / 314,816 B

five-run medians:
score = 74
FCP = 906 ms
LCP = 5,621 ms
CLS = 0.0285
TBT = 257 ms
transfer = 886,131 B
hero Lighthouse transfer = 221,539 B
gallery1 requested in all runs = YES
```

## Retained derivative family

Hero:

```text
source = 714x640
existing mobile framing = centered object-fit:cover in 1.15/1 box
equivalent crop = 714x621

640x557 WebP = 70,822 B
714x621 WebP = 82,846 B
```

No hero derivative exceeds the native source width.

First gallery:

```text
source = 1920x873
existing mobile framing = centered object-fit:cover in 4/3 box
equivalent crop = 1164x873

640x480 WebP = 66,072 B
828x621 WebP = 102,838 B
thumbnail 240x180 WebP = 10,474 B
```

A generated 1080w gallery candidate measured `151,796 B`, exceeded the preferred M5-03 mobile gallery budget and was excluded from runtime.

## Retained delivery behavior

Mobile <720px:

- hero uses responsive WebP 640w/714w;
- first gallery main uses responsive WebP 640w/828w;
- first gallery thumbnail uses 240x180 WebP;
- original hero and first-gallery JPEGs are not downloaded for the tested mobile viewport.

Desktop/fallback:

- original Azure hero remains;
- original Azure first gallery main remains.

Gallery navigation preserves:

- arrows;
- keyboard navigation;
- captions;
- `aria-current`;
- restoration of the first-image responsive source after navigating away and back.

## Exact-head repository gates

PR #221 exact head `dbbb1f5ebeb21d590e0bfac3dbf24ecdcdf910ba` passed all triggered required gates:

- M4-05R metadata;
- commercial page standard;
- favicon standard;
- M5-06 CTA/Form journey;
- M5-07 lead semantics;
- dedicated M5-10 Ária responsive-media static/browser gate.

Dedicated local browser smoke proved:

```text
393x852 DPR2.75:
  hero = hero-mobile-714.webp
  gallery1 = gallery1-mobile-828.webp
  first thumb = gallery1-thumb-240.webp
  original hero requested = NO
  original gallery1 requested = NO
  navigate next/back = PASS

360x800 DPR2:
  same responsive selection contract = PASS

1280x900 DPR1:
  original Azure hero = YES
  original Azure gallery1 main = YES
```

## Production QA — independent attempt 1

Run `35743393547`, job `106798642833`, attempt 1:

```text
Production smoke = PASS
hero currentSrc = /assets/aria-higienopolis/hero-mobile-714.webp
gallery currentSrc = /assets/aria-higienopolis/gallery1-mobile-828.webp
GTM requests = 1
gtag requests = 1
Form46 lead POSTs = 0
```

Five-run results:

| Run | Score | LCP | CLS | TBT | Transfer |
|---|---:|---:|---:|---:|---:|
| 1 | 75 | 1,906 ms | 0.0301 | 1,290 ms | 535,690 B |
| 2 | 88 | 2,311 ms | 0.0303 | 402 ms | 535,692 B |
| 3 | 84 | 3,105 ms | 0.0317 | 416 ms | 535,892 B |
| 4 | 88 | 1,468 ms | 0.0309 | 486 ms | 535,707 B |
| 5 | 92 | 1,756 ms | 0.0315 | 337 ms | 535,762 B |

Medians:

```text
score = 88
LCP = 1,906 ms
CLS = 0.0309
TBT = 416 ms
transfer = 535,707 B
hero transfer ~= 83,068 B
gallery1 transfer ~= 103,041 B
```

Delta vs baseline:

```text
LCP = -3,715 ms / -66.09%
score = +14
transfer = -350,424 B / -39.55%
```

## Production QA — independent attempt 2

The same exact QA job was rerun without code or Production mutation.

Run `35743393547`, attempt 2, job `106800317696`:

```text
Production smoke = PASS
hero currentSrc = /assets/aria-higienopolis/hero-mobile-714.webp
gallery currentSrc = /assets/aria-higienopolis/gallery1-mobile-828.webp
GTM requests = 1
gtag requests = 1
Form46 lead POSTs = 0
```

Five-run results:

| Run | Score | LCP | CLS | TBT | Transfer |
|---|---:|---:|---:|---:|---:|
| 1 | 73 | 2,371 ms | 0.0407 | 1,280 ms | 535,743 B |
| 2 | 97 | 1,443 ms | 0.0281 | 205 ms | 535,673 B |
| 3 | 97 | 1,439 ms | 0.0284 | 195 ms | 535,696 B |
| 4 | 97 | 1,401 ms | 0.0287 | 201 ms | 535,757 B |
| 5 | 98 | 1,442 ms | 0.0298 | 178 ms | 535,733 B |

Medians:

```text
score = 97
FCP = 923 ms
LCP = 1,442 ms
CLS = 0.0287
TBT = 201 ms
transfer = 535,733 B
hero transfer ~= 83,051 B
gallery1 transfer ~= 103,041 B
```

Delta vs baseline:

```text
LCP = -4,179 ms / -74.35%
score = +23
TBT = -56 ms
transfer = -350,398 B / -39.54%
```

## Replication interpretation

The image-delivery result is replicated across two independent five-run batteries with no runtime change between them.

Both post-change medians:

- materially outperform the `5,621 ms` baseline;
- meet `LCP <= 2,500 ms`;
- preserve CLS <=0.1;
- preserve Form46/Measurement contracts.

TBT varied substantially in isolated runs, including one large outlier in each post-change battery. The second-battery median was lower than baseline. This variation is not attributed to the image pattern, and TBT is not treated as field INP evidence.

## Cross-project evidence

Elo Duo Slice 08:

```text
LCP 3,279 -> 2,383 ms
delta = -896 ms / -27.33%
target <=2,500 ms = PASS
```

Ária Slice 09:

```text
baseline LCP = 5,621 ms
replication A median = 1,906 ms / -66.09%
replication B median = 1,442 ms / -74.35%
target <=2,500 ms = PASS in both independent batteries
```

## Decision

```text
SLICE_09 = RETAINED
ARIA_LAB_LCP_TARGET = PASS / REPLICATED
FUNCTIONAL_REGRESSION = NOT_OBSERVED
CLS_TARGET = PASS
MEASUREMENT_MUTATION = NO
FORM46_MUTATION = NO
REAL_LEAD_CREATED_BY_QA = NO
RESPONSIVE_MEDIA_PATTERN = CROSS_PROJECT_VALIDATED
STANDARD_ADOPTION = APPROVED
TASK_HOURS_ACCEPTED_FROM_SLICE_09 = 0
MNT_M5_10 = ACTIVE
```

Canonical standard:

`docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md`

Standard adoption does not authorize automatic bulk mutation of every route. Each material existing-page remediation remains a bounded slice with exact-head and Production validation.
