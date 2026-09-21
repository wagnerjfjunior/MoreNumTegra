# MNT-M5-10 — Elo Duo Inline CSS Slice 05

Date: `2026-09-21`

Status: `COMPLETE / REJECTED / ROLLED_BACK`

## Candidate

The experiment removed the external `/src-greenn/project-page.css` request on Elo Duo and inlined the exact byte-for-byte contents of the canonical stylesheet in the same head position.

No CSS rule, hero asset, preconnect, Form 46, Measurement, Consent, CTA, schema, accessibility or commercial-content semantics were changed.

Candidate runtime:

```text
PR = #213
MERGE_SHA = db8c65460743347e60e8a6f2b27765be241fac81
PRODUCTION_DEPLOYMENT = dpl_Eoz5C332j6PbnotadvUUWzEzc7vy
STATE = READY
```

## Control

Nearest clean five-run control:

```text
LCP = 3,895 / 3,039 / 3,676 / 3,776 / 3,128 ms
MEDIAN_LCP = 3,676 ms
MEDIAN_SCORE = 74
MEDIAN_TRANSFER = 1,061,852 B
```

## Five-run Production evidence

```text
RUN = 35660251814
JOB = 106533528329
CHROME = 152.0.7977.82
LIGHTHOUSE = 13.5.0

run 1 = LCP 4,119 ms / score 70 / TBT 615 ms
run 2 = LCP 3,875 ms / score 78 / TBT 404 ms
run 3 = LCP 5,805 ms / score 59 / TBT 851 ms
run 4 = LCP 5,208 ms / score 69 / TBT 408 ms
run 5 = LCP 5,255 ms / score 71 / TBT 343 ms

median LCP = 5,208 ms
median score = 70
median TBT = 408 ms
median transfer = 1,061,291 B
```

Delta versus control:

```text
LCP = +1,532 ms / +41.68%
score = -4
transfer = -561 B / effectively unchanged
target <=2,500 ms = FAIL
```

## Diagnostic finding

The candidate successfully removed the external render-blocking stylesheet from Lighthouse, but did not improve LCP.

Representative run 4:

```text
render-blocking resources = none
main-thread work ~= 1,973 ms
script evaluation ~= 785 ms
style/layout ~= 412 ms
script parse/compile ~= 187 ms
```

Boot-up CPU attribution in the representative run:

```text
GTM container ~= 430 ms
gtag ~= 391 ms
MoreNumTegra preview/runtime.js ~= 222 ms
MoreNumTegra project-page.js ~= 122 ms
```

Lighthouse unused-JavaScript evidence:

```text
gtag wasted ~= 75.8 KB
GTM wasted ~= 63.2 KB
total estimated unused JS ~= 136 KiB
estimated LCP savings ~= 750 ms
```

This does not authorize a Measurement mutation by itself. It establishes that the next performance investigation should prioritize main-thread JavaScript over further hero/CSS delivery experiments.

## Decision

Inline CSS is rejected for Elo Duo. It removes one request but materially worsens the five-run Production LCP and adds undesirable source duplication.

Rollback restores the canonical external stylesheet link and retires the candidate-specific validator/workflow.

M5-10 remains active. The `<=2,500 ms` target remains unmet.
