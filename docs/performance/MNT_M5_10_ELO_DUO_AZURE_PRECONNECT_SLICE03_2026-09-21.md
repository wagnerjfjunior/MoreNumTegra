# MNT-M5-10 — Elo Duo Azure Preconnect Slice 03

Date: `2026-09-21`

Status: `COMPLETE / REJECTED / ROLLED_BACK`

## Product Authority scope

The Product Authority authorized additional bounded Elo Duo attempts to reduce LCP after Slice 01.

## Control state

Adjacent Production control before the candidate:

```text
RUNTIME_SHA = 00ce9808123e1491dab7b063ae9224171a06c850
DEPLOYMENT = dpl_4CqSUUCvDjii5JYGviT2VRfJW5Sz
STATE = READY
HERO_PRELOAD = ABSENT
S3_PRECONNECT = PRESENT
AZURE_PRECONNECT = PRESENT

RUN = 35656855740
JOB = 106522542312
CHROME = 152.0.7977.82
LIGHTHOUSE = 13.5.0
RUNS = 5

LCP = 3,895 / 3,039 / 3,676 / 3,776 / 3,128 ms
MEDIAN_LCP = 3,676 ms
MEDIAN_SCORE = 74
MEDIAN_TRANSFER = 1,061,852 B
```

## Candidate

Slice 03 removed only:

```html
<link rel="preconnect" href="https://stracctegra.blob.core.windows.net" crossorigin>
```

All Azure media URLs remained present. S3 preconnect, selected compact Green hero, hero dimensions, visible `fetchpriority="high"`, Search, Form 46, Measurement, Consent, CTA/WhatsApp, schema, accessibility and commercial content were preserved.

Candidate runtime:

```text
PR = #209
MERGE_SHA = cbe2794bac9f32e6bd16044f1f90c75623e95379
PRODUCTION_DEPLOYMENT = dpl_GM8wzPfeymp35aAjcynNHWXZ3upk
STATE = READY
```

## Production measurement

```text
RUN = 35657444861
JOB = 106524479813
CHROME = 152.0.7977.82
LIGHTHOUSE = 13.5.0
RUNS = 5
RESULT = SUCCESS

run 1 = LCP 6,726 ms / score 66 / transfer 1,061,782 B
run 2 = LCP 7,711 ms / score 54 / transfer 1,062,078 B
run 3 = LCP 5,289 ms / score 69 / transfer 1,061,786 B
run 4 = LCP 7,426 ms / score 57 / transfer 1,061,807 B
run 5 = LCP 7,233 ms / score 60 / transfer 1,061,885 B

median = LCP 7,233 ms / score 60 / transfer 1,061,807 B
```

Observed delta versus the adjacent control:

```text
LCP = +3,557 ms / +96.76%
score = -14
transfer = -45 B / effectively unchanged
target <=2,500 ms = FAIL
```

## Decision

Removing the Azure preconnect is **rejected** for the current Elo Duo runtime.

The experiment materially regressed LCP while payload stayed effectively unchanged. The safe action is to restore the Azure preconnect before any new optimization experiment.

This result does not establish a universal requirement for Azure preconnect. It establishes that the current page performs materially worse without it under the governed adjacent A/B methodology.

## Rollback contract

- restore the Azure preconnect exactly where it was;
- keep S3 preconnect;
- keep the selected compact Green hero;
- keep the rejected hero preload absent;
- preserve all accepted Search/Form46/Measurement/Consent/CTA/accessibility contracts;
- retire the Slice 03 validator/workflow as a current runtime contract.

M5-10 remains active. The `<=2,500 ms` LCP target remains unmet.
