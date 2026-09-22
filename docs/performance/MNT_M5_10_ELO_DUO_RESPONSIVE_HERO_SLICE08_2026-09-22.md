# MNT-M5-10 — Elo Duo Responsive Hero Slice 08

Date: `2026-09-22`

Status: `COMPLETE / RETAINED / TARGET_MET / PRODUCTION_VALIDATED`

## Authorization

Product Authority explicitly selected the bounded Elo responsive-hero option after retained Slice 07.

Scope remained limited to:

- Elo Duo exact-project hero;
- mobile responsive derivatives;
- existing Green/S3 hero preserved as desktop/fallback;
- no Measurement, Consent, Form 46, SEO/canonical, CTA or commercial-data mutation beyond the previously retained runtime.

## Runtime anchors

```text
START_CANONICAL_MAIN = 8f15f15b4adca177f46c771f3a467ffbe2e34918
START_EFFECTIVE_RUNTIME = 8d99996edddd66a59835992da161edbbb3579ad0
START_DEPLOYMENT = dpl_6BP6WssMhisgJMdy91TbFSLyFVXX / READY

SLICE_08_PR = #219
SLICE_08_HEAD = 5e6c6fb6f85efbb75de1097f2f23d862784bfa09
SLICE_08_MERGE_SHA = 90745255775129638b3d8f061ab067d8ecc1c425
SLICE_08_PRODUCTION = dpl_6Dw473nRdfcCgAiEBQGAk5Uer6QL / READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

## Responsive asset family

Existing Green/S3 source:

```text
dimensions = 1080x1350
bytes = 160,918
sha256 = b78a410c57a4f7c6dc27b15d2a5f8fec0b252ae4ebe80233f8736218f867809e
```

The current mobile CSS already renders the hero inside a `1.15/1` container with centered `object-fit:cover`.

The generated center crop reproduces the already-visible browser framing:

```text
crop = 1080x939
ratio = 1.15016
```

Generated WebP derivatives:

```text
640x557 = 52,278 B
828x720 = 72,376 B
```

Both stay below the M5-03 preferred mobile budget of 100 KiB.

The two derivatives are small essential runtime assets and are stored in GitHub under the V1 allowance for small essential assets. The large source remains external at Green/GDigital S3.

## Retained markup behavior

Below 720px:

- `picture/source` exposes 640w and 828w;
- `sizes="calc(100vw - 32px)"` matches the mobile shell;
- `fetchpriority=high` remains on the `img`;
- no lazy loading;
- no preload.

Desktop:

- the existing immutable Green/S3 hero remains the `img src` fallback.

This keeps direct initial-HTML discovery and does not add a JavaScript dependency to LCP.

## Exact-head validation

PR #219 exact head:

```text
HEAD = 5e6c6fb6f85efbb75de1097f2f23d862784bfa09
RESULT = ALL REQUIRED GATES SUCCESS
```

Dedicated responsive browser smoke proved:

```text
393x852 / DPR 2.75:
  box = 361 x 313.90625
  selected = hero-mobile-828.webp
  original hero requested = NO

360x800 / DPR 2:
  box = 328 x 285.203125
  selected = hero-mobile-828.webp
  original hero requested = NO

1280x900 / DPR 1:
  mobile derivative requested = NO
  original Green/S3 hero retained = YES
```

Existing gates also remained green for:

- Slice 07 late GTM bootstrap;
- Green media contract;
- commercial page contract;
- CTA/Form journey;
- lead semantics;
- metadata;
- favicon.

## Production smoke

Run:

```text
RUN = 35740314881
JOB = 106788050683
RESULT = SUCCESS
```

Public mobile Production observed:

```text
hero = https://www.moretegra.com.br/assets/elo-duo/hero-mobile-828.webp
box = 361 x 313.90625
GTM resources = 1
gtag resources = 1
Form46 lead POSTs = 0
original 160.9KB hero downloaded = NO
```

## Five-run Production performance

Methodology matches Slice 07:

```text
Lighthouse = 13.5.0
mobile viewport = 393x852
DPR = 2.75
throttling = simulated
runs = 5
```

| Run | Score | LCP | CLS | TBT | Total transfer | Hero transfer |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 91 | 2,223 ms | 0.0320 | 307 ms | 974,102 B | 72,570 B |
| 2 | 92 | 2,476 ms | 0.0318 | 248 ms | 974,078 B | 72,597 B |
| 3 | 92 | 2,418 ms | 0.0325 | 256 ms | 583,506 B | 72,579 B |
| 4 | 94 | 2,204 ms | 0.0329 | 236 ms | 974,108 B | 72,606 B |
| 5 | 94 | 2,383 ms | 0.0326 | 197 ms | 974,092 B | 72,597 B |

Medians:

```text
score = 92
FCP = 1,742 ms
LCP = 2,383 ms
CLS = 0.0325
TBT = 248 ms
total transfer = 974,092 B
hero transfer = 72,597 B
```

Slice 07 retained control:

```text
score = 84
LCP = 3,279 ms
CLS = 0.0307
TBT = 237 ms
total transfer = 1,062,608 B
```

Delta:

```text
LCP = -896 ms / -27.33%
score = +8
TBT = +11 ms
CLS = +0.0018
total transfer = -88,516 B
```

The isolated total-transfer outlier in run 3 did not affect hero selection or the median decision; the hero transfer remained stable around 72.6 KB in every run.

## Decision

```text
SLICE_08 = RETAINED
LAB_LCP_TARGET_2500_MS = PASS
FUNCTIONAL_REGRESSION = NOT_OBSERVED
CLS_TARGET_0_1 = PASS
LATE_GTM_SLICE_07 = PRESERVED
GA4 = PRESERVED
CONSENT_MODE = PRESERVED
FORM46_MUTATION = NO
REAL_LEAD_CREATED_BY_QA = NO
TASK_HOURS_ACCEPTED_FROM_SLICE_08 = 0
MNT_M5_10 = ACTIVE
```

This is the first retained Elo Duo Production slice in the current performance sequence to achieve the project lab target `LCP <= 2,500 ms`.

TBT increased by 11 ms versus Slice 07, which is materially smaller than the 896 ms LCP gain and does not establish field INP behavior. Field INP remains separate evidence.

No next runtime slice is authorized automatically.
