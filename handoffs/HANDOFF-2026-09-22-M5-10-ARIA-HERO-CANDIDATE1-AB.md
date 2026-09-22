# Handoff — MNT-M5-10 Ária Hero Candidate 1 A/B

Date: `2026-09-22`

GitHub `main` remains canonical. Resolve live before any conclusion or mutation.

## Runtime

```text
LAST_RUNTIME_PR = #223 / MERGED
RUNTIME_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

## Candidate 1

Only the Product Authority-supplied residential-access image was tested.

Source:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/%C3%81ria%20Higien%C3%B3polis-Perspectiva%20ilustrada%20do%20acesso%20residencial..webp`

```text
source = 1600x853 WebP / 219,786 B
mobile 640x557 = 64,508 B
mobile 828x720 = 99,308 B
```

The Product Authority-supplied rooftop-pool image was not used or tested.

## Control

Immediately before candidate deployment:

```text
run = 35743393547 / attempt 3
LCP median = 1,853 ms
score = 95
CLS = 0.0287
TBT = 244 ms
transfer = 535,700 B
hero transfer ~= 83,042 B
```

## Candidate Production QA

Attempt 1:

```text
run = 35748892328 / attempt 1
job = 106817504327
LCP median = 2,149 ms
delta vs control = +296 ms / +15.97%
score = 92
transfer = 552,273 B
target <=2,500 ms = PASS
```

Attempt 2 without code/runtime mutation:

```text
run = 35748892328 / attempt 2
job = 106818874846
LCP median = 1,464 ms
delta vs control = -389 ms / -20.99%
score = 89
transfer = 552,242 B
target <=2,500 ms = PASS
```

The opposite LCP directions mean speed superiority/inferiority is not proven.

Deterministic payload:

```text
hero ~= +16.5 KB / +19.85%
total ~= +16.55 KB / +3.09%
```

Descriptive pooled candidate 10-run median ~= `1,818 ms`, effectively tied with the `1,853 ms` five-run contemporaneous control. Do not treat this pooled comparison as a controlled ten-run experiment.

## Validation

- public candidate 828w selected at 393x852 DPR2.75;
- original Green 219,786 B fallback not downloaded on mobile;
- responsive first gallery preserved;
- GTM/GA4 preserved;
- Form46 preserved;
- zero QA Form46 lead submissions;
- canonical/SEO/commercial contracts preserved;
- CLS target passed.

## Program state

```text
MNT-M5-10 = ACTIVE
CANDIDATE_1 = LIVE / TARGET_PASS / PERFORMANCE_DIRECTION_INCONCLUSIVE / PRODUCT_DECISION_REQUIRED
POOL_CANDIDATE = NOT_TESTED
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 896
ACCEPTED_PERCENT = 72.26
M5-10 ACCEPTED HOURS = 0
```

## Next safe action

STOP before another runtime mutation.

Product Authority must choose:

- retain Candidate 1 based on visual/commercial preference while accepting the deterministic +16.5 KB hero payload; or
- restore the prior retained Ária hero.

Only after that decision may the rooftop-pool image be separately authorized for its own bounded comparison.
