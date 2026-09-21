# MNT-M5-10 — Elo Duo Hero Preload Slice 02

Date: `2026-09-21`

Status: `COMPLETE / REJECTED / ROLLED_BACK`

## Product Authority decision

The Product Authority selected continuation of Elo Duo optimization after Slice 01 and authorized additional bounded attempts to reduce LCP.

## Candidate

The experiment added one explicit head preload for the already-selected compact Green hero while preserving the hero URL, dimensions, visible `fetchpriority="high"`, Search, Form 46, Measurement, Consent, CTA/WhatsApp, schema, accessibility and commercial content.

Candidate runtime:

```text
PR = #207
MERGE_SHA = 5625ae092385cf44afd37790c52d354909f1129a
PRODUCTION_DEPLOYMENT = dpl_5r8edwxMp4gRm83h74dGCD5p7Gj1
STATE = READY
```

## Diagnostic evidence boundary

- the supplied Pingdom HAR uses Chromium 61 and is not suitable for validating native `loading="lazy"` behavior;
- the supplied modern DevTools trace identifies the compact Green hero as the LCP image but contains browser-extension main-thread contamination, so it is diagnostic only;
- canonical A/B adjudication therefore uses the same Lighthouse 13.5.0 mobile 393x852 simulated-throttling methodology used by M5-02/Slice 01.

Diagnostic run:

```text
RUN = 35656184835
JOB = 106520320760
RUNNER = ubuntu-24.04
CHROME = 152.0.7977.82
LIGHTHOUSE = 13.5.0
RUNS = 5
RESULT = SUCCESS
```

Five Production runs:

```text
run 1 = LCP 4,025 ms / score 66 / transfer 1,062,016 B
run 2 = LCP 3,760 ms / score 72 / transfer 1,062,088 B
run 3 = LCP 5,453 ms / score 62 / transfer 1,062,087 B
run 4 = LCP 6,035 ms / score 64 / transfer 1,061,998 B
run 5 = LCP 6,075 ms / score 69 / transfer 1,062,051 B

median = LCP 5,453 ms / score 66 / transfer 1,062,051 B
```

Preserved no-preload Slice 01 baseline:

```text
median LCP = 3,947 ms
median score = 70
median transfer = 1,062,054 B
```

Observed delta:

```text
LCP = +1,506 ms / +38.16%
score = -4
transfer = -3 B / effectively unchanged
target <=2,500 ms = FAIL
```

## Decision

The explicit hero preload is **rejected** for the current Elo Duo runtime.

The experiment did not reduce payload and the five-run Production median regressed materially. Because the candidate's only runtime variable was the preload, the safe action is to remove it and restore the prior no-preload runtime before another optimization experiment.

This result does not prove that preload is universally harmful; it proves that this exact preload candidate did not earn retention under the governed A/B methodology.

## Rollback contract

- remove only the candidate hero preload from runtime;
- retain the selected compact Green hero;
- retain S3 preconnect and the current complex/Rua Jardim asset;
- preserve all accepted Search/Form46/Measurement/Consent/CTA/accessibility contracts;
- do not carry the rejected preload validator/workflow as a current runtime contract.

M5-10 remains active. The `<=2,500 ms` LCP target remains unmet.
