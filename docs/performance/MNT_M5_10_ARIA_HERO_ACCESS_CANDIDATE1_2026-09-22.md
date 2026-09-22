# MNT-M5-10 — Ária Hero Candidate 1 / Residential Access

Date: `2026-09-22`

Status: `COMPLETE / LIVE_VISUAL_CANDIDATE / PERFORMANCE_INCONCLUSIVE / LCP_TARGET_PASS / SECOND_IMAGE_NOT_AUTHORIZED`

## Authorization

Product Authority supplied two Green/GDigital Ária media candidates and explicitly requested:

1. test one image first;
2. do not introduce the rooftop-pool image in this slice;
3. compare timing before deciding whether to add/test the second image.

This slice uses only:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/%C3%81ria%20Higien%C3%B3polis-Perspectiva%20ilustrada%20do%20acesso%20residencial..webp`

The rooftop-pool candidate remains out of scope and untouched.

## Runtime anchors

```text
START_CANONICAL_MAIN = ca273a3d4e33053071b6050d8c4c79955161b5ac
START_EFFECTIVE_RUNTIME = ac7958db2f2f4cd3d3bfccf4b6e9592f81a5d739
START_DEPLOYMENT = dpl_6bepVcnUTT9hDhgkHbQsAdtkoE8T / READY

RUNTIME_PR = #223
RUNTIME_MERGE_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc / READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

## Exact Green source

```text
dimensions = 1600x853
bytes = 219,786
sha256 = 1d5c016e7d5aecfaa4caa97beff037b1de5b2b89036143d3a9be776e3b19687c
mobile 1.15:1 center crop = 981x853
```

Repository-owned responsive test derivatives:

```text
640x557 WebP = 64,508 B
828x720 WebP = 99,308 B
```

Both are <=100 KiB and do not upscale beyond useful source detail.

The Green original remains the desktop/fallback source. The mobile derivatives are versioned in the canonical repository.

## Contemporaneous control

The retained pre-candidate Ária Production was rerun immediately before runtime mutation.

Run `35743393547`, attempt 3:

```text
score median = 95
FCP median = 964 ms
LCP median = 1,853 ms
CLS median = 0.0287
TBT median = 244 ms
transfer median = 535,700 B
hero transfer ~= 83,042 B
gallery1 transfer ~= 103,041 B
target <=2,500 ms = PASS
```

This is the primary control for candidate comparison.

## Exact-head validation

PR #223 exact-head gates ultimately passed after two validator-maintenance corrections:

1. normalize percent-encoded Green candidate URL assertion;
2. generalize the prior Slice-09 hero regression guard so it validates the responsive-media contract instead of freezing the former hero URL;
3. fix local test URL-constructor shadowing.

These were QA harness corrections only. They did not change the candidate media payload or commercial runtime semantics.

Final exact-head gates:

- candidate dedicated static/browser smoke = PASS;
- prior Ária responsive-media contract = PASS;
- commercial-page standard = PASS;
- metadata = PASS;
- favicon = PASS;
- M5-06 CTA/Form journey = PASS;
- M5-07 lead semantics = PASS.

## Public Production smoke

Production candidate:

```text
SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc / READY
```

Public smoke:

```text
hero currentSrc = /assets/aria-higienopolis/candidate1/hero-access-mobile-828.webp
gallery currentSrc = /assets/aria-higienopolis/gallery1-mobile-828.webp
Green 219,786 B fallback requested on mobile = NO
GTM requests = 1
gtag requests = 1
Form46 lead POSTs = 0
```

## Production performance — attempt 1

Run `35748892328`, attempt 1, job `106817504327`.

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
hero transfer = 99,535 B
```

Delta vs contemporaneous control:

```text
LCP = +296 ms / +15.97%
score = -3
TBT = +68 ms
transfer = +16,573 B / +3.09%
hero transfer = +16,493 B / +19.86%
target <=2,500 ms = PASS
```

## Production performance — independent attempt 2

Same runtime. No code, media or deployment change.

Run `35748892328`, attempt 2, job `106818874846`.

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
hero transfer = 99,525 B
```

Delta vs contemporaneous control:

```text
LCP = -389 ms / -20.99%
score = -6
TBT = +212 ms
transfer = +16,542 B / +3.09%
hero transfer = +16,483 B / +19.85%
target <=2,500 ms = PASS
```

## Interpretation

The two independent candidate batteries disagree on LCP direction:

```text
control median = 1,853 ms
candidate attempt 1 = 2,149 ms / +15.97%
candidate attempt 2 = 1,464 ms / -20.99%
```

Therefore:

```text
CANDIDATE_1_LCP_EFFECT = INCONCLUSIVE
CANDIDATE_1_LCP_TARGET = PASS / PASS
DETERMINISTIC_PAYLOAD_DELTA = +~16.5 KB HERO / +~3.1% TOTAL
FUNCTIONAL_REGRESSION = NOT_OBSERVED
```

It is not valid to claim that the new residential-access image improves performance. It is equally unsupported to claim that it materially regresses LCP under the current lab variance.

The deterministic tradeoff is a roughly 16.5 KB larger mobile hero transfer.

The image may remain as a live visual/commercial candidate because both independent batteries meet the project laboratory target and no functional regression was observed. Its retention is not justified by performance improvement.

## Decision boundary

```text
CANDIDATE_1 = LIVE_VISUAL_CANDIDATE
PERFORMANCE_WINNER = NOT_DETERMINED
CURRENT_LCP_TARGET = PASS
SECOND_POOL_IMAGE = NOT_TESTED / NOT_AUTHORIZED
TASK_HOURS_ACCEPTED = 0
MNT_M5_10 = ACTIVE
```

Stop before introducing a second hero image, carousel, rotation, or rooftop-pool candidate. Those require a new explicit Product Authority decision.
