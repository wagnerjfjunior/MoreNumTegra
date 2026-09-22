# MNT-M5-10 — Ária Hero Candidate 1 / Residential Access

Date: `2026-09-22`

Status: `ACTIVE / PRODUCT_AUTHORITY_AUTHORIZED / SINGLE-HERO-A-B`

## Authorization

Product Authority supplied two Green/GDigital Ária media candidates and explicitly requested:

1. test one image first;
2. do not introduce the rooftop-pool image in this slice;
3. compare timing before deciding whether to add/test the second image.

This slice therefore uses only:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/%C3%81ria%20Higien%C3%B3polis-Perspectiva%20ilustrada%20do%20acesso%20residencial..webp`

The pool candidate is out of scope.

## Start anchors

```text
CANONICAL_MAIN_AT_START = ca273a3d4e33053071b6050d8c4c79955161b5ac
EFFECTIVE_PRODUCTION_RUNTIME = ac7958db2f2f4cd3d3bfccf4b6e9592f81a5d739
PRODUCTION_DEPLOYMENT = dpl_6bepVcnUTT9hDhgkHbQsAdtkoE8T / READY
```

## Exact source probe

```text
Green source = 1600x853 WebP
bytes = 219,786
sha256 = 1d5c016e7d5aecfaa4caa97beff037b1de5b2b89036143d3a9be776e3b19687c
mobile 1.15:1 center crop = 981x853
```

Generated repository-owned test derivatives:

```text
640x557 WebP = 64,508 B
828x720 WebP = 99,308 B
```

Both remain within the Responsive Media Delivery Standard V1 preferred mobile hero budget of <=100 KiB and neither upscales beyond useful source detail.

## Contemporaneous retained-control baseline

Existing retained Ária Production was re-run immediately before mutation.

Run `35743393547`, attempt 3:

```text
score median = 95
FCP median = 964 ms
LCP median = 1,853 ms
CLS median = 0.0287
TBT median = 244 ms
transfer median = 535,700 B
current hero transfer ~= 83,042 B
gallery1 transfer ~= 103,041 B
target <=2,500 ms = PASS
```

This `1,853 ms` median is the primary contemporaneous control for candidate comparison. Historical post-Slice-09 medians remain supporting evidence but are not substituted for this control.

## Candidate isolation

Only hero delivery changes:

- mobile hero -> repository candidate derivatives;
- desktop/fallback hero -> Product Authority supplied Green WebP;
- alt text -> exact residential-access description.

Unchanged:

- first gallery responsive contract;
- all other gallery images;
- GTM/GA4/Consent;
- Form46;
- commercial data;
- canonical/robots/schema;
- OG/Twitter/JSON-LD primary-image references;
- CTA/WhatsApp;
- layout dimensions and hero priority.

## Retention rule

Retain only after:

1. exact-head regression gates PASS;
2. Production selects repository 828w candidate on 393x852 DPR2.75;
3. original Green 219,786 B source is not downloaded on mobile;
4. desktop candidate renders via Green source;
5. same five-run Lighthouse mobile methodology is completed;
6. CLS remains <=0.1;
7. no business-flow regression / no QA Form46 lead;
8. timing result is compared against the contemporaneous 1,853 ms median.

The second/pool image remains a separate future decision.


## Exact-head / Production result

Runtime:

```text
PR = #223 / MERGED
MERGE_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

Final exact-head gates passed after generalizing the Slice 09 regression guards to validate the responsive hero contract rather than freeze the prior hero URL.

Preserved contracts:

- M4-05R metadata = SUCCESS;
- Commercial page standard = SUCCESS;
- Favicon standard = SUCCESS;
- M5-06 CTA/Form = SUCCESS;
- M5-07 Lead semantics = SUCCESS;
- Slice 09 responsive-media regression = SUCCESS;
- Candidate 1 static/browser gate = SUCCESS.

Public Production smoke:

```text
hero currentSrc = /assets/aria-higienopolis/candidate1/hero-access-mobile-828.webp
gallery currentSrc = /assets/aria-higienopolis/gallery1-mobile-828.webp
GTM requests = 1
gtag requests = 1
Form46 lead POSTs = 0
Green 219,786 B fallback requested on mobile = NO
```

## Production QA — attempt 1

Run `35748892328`, attempt 1, job `106817504327`:

| Run | Score | LCP | CLS | TBT | Transfer | Hero |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 73 | 1,927 ms | 0.0132 | 1,650 ms | 552,175 B | 99,516 B |
| 2 | 93 | 2,149 ms | 0.0308 | 270 ms | 552,193 B | 99,526 B |
| 3 | 91 | 2,165 ms | 0.0308 | 329 ms | 552,273 B | 99,569 B |
| 4 | 92 | 2,205 ms | 0.0297 | 301 ms | 552,405 B | 99,535 B |
| 5 | 92 | 2,103 ms | 0.0310 | 312 ms | 552,277 B | 99,560 B |

Medians:

```text
score = 92
FCP = 911 ms
LCP = 2,149 ms
CLS = 0.0308
TBT = 312 ms
transfer = 552,273 B
hero transfer ~= 99,535 B
gallery1 transfer ~= 103,041 B
target <=2,500 ms = PASS
```

Delta vs contemporaneous control:

```text
LCP = +296 ms / +15.97%
score = -3
transfer = +16,573 B / +3.09%
hero transfer = +16,493 B / +19.86%
```

## Production QA — attempt 2

The exact same QA job was rerun with no code or Production change.

Run `35748892328`, attempt 2, job `106818874846`:

| Run | Score | LCP | CLS | TBT | Transfer | Hero |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 88 | 1,709 ms | 0.0310 | 460 ms | 552,273 B | 99,528 B |
| 2 | 89 | 1,439 ms | 0.0297 | 433 ms | 552,242 B | 99,535 B |
| 3 | 87 | 1,428 ms | 0.0325 | 519 ms | 552,213 B | 99,520 B |
| 4 | 94 | 1,582 ms | 0.0284 | 276 ms | 552,238 B | 99,516 B |
| 5 | 89 | 1,464 ms | 0.0294 | 456 ms | 552,309 B | 99,525 B |

Medians:

```text
score = 89
FCP = 907 ms
LCP = 1,464 ms
CLS = 0.0297
TBT = 456 ms
transfer = 552,242 B
hero transfer ~= 99,525 B
gallery1 transfer ~= 103,050 B
target <=2,500 ms = PASS
```

Delta vs contemporaneous control:

```text
LCP = -389 ms / -20.99%
score = -6
transfer = +16,542 B / +3.09%
hero transfer = +16,483 B / +19.85%
```

## Interpretation

The two independent post-change LCP medians point in opposite directions:

```text
control = 1,853 ms
candidate attempt 1 = 2,149 ms
candidate attempt 2 = 1,464 ms
```

Therefore no directional LCP claim is justified.

For descriptive context only, pooling the ten candidate LCP observations produces an ordinary even-sample median of approximately `1,818 ms`, only `35 ms / 1.89%` below the contemporaneous control. This pooled value is not treated as a controlled ten-run A/B because the control itself is one five-run batch.

Deterministic evidence does not vary:

```text
control hero transfer ~= 83,042 B
candidate hero transfer ~= 99,530 B
delta ~= +16.5 KB / +19.85%

control total transfer = 535,700 B
candidate total transfer ~= 552,250 B
delta ~= +16.55 KB / +3.09%
```

Both candidate batteries meet the project LCP target and preserve CLS. Score/TBT were weaker in both candidate batches, but TBT remains lab-noisy and is not interpreted as field INP or attributed causally to the hero image.

## Current decision gate

```text
CANDIDATE_1_RUNTIME = LIVE
CANDIDATE_1_LCP_TARGET = PASS
CANDIDATE_1_DIRECTIONAL_SPEED_WIN = NOT_PROVEN
CANDIDATE_1_DIRECTIONAL_SPEED_LOSS = NOT_PROVEN
CANDIDATE_1_DETERMINISTIC_PAYLOAD = +~16.5 KB HERO / +~3.09% TOTAL
FUNCTIONAL_REGRESSION = NOT_OBSERVED
REAL_FORM46_QA_LEAD = NO
POOL_CANDIDATE = NOT_TESTED / NOT_AUTHORIZED_BY_THIS_SLICE
PRODUCT_DECISION = REQUIRED
TASK_HOURS_ACCEPTED = 0
```

Product Authority must decide whether to retain Candidate 1 for its visual/commercial value or restore the prior hero. The rooftop-pool image remains a separate future candidate and must not be introduced automatically.
