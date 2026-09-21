# MNT-M5-10 — Elo Duo Delayed Commercial JS Slice 06

Date: `2026-09-21`

Status: `COMPLETE / REJECTED_AS_INCONCLUSIVE / ROLLED_BACK`

## Candidate

The bounded experiment changed only the Elo Duo loading schedule for the already-governed commercial synchronization runtime `/src-greenn/project-page.js`:

- control: parser-discovered `defer` script;
- candidate: inject the same script after `window.load`.

No change was made to `project-page.js`, `commercial-values.json`, Measurement, Form 46, media, CSS, CTA, schema or accessibility.

Candidate runtime:

```text
PR = #215
MERGE_SHA = f4b025f9ccddba541a8827cc7037f9a78129ddad
PRODUCTION_DEPLOYMENT = dpl_7HULHSf5P8TLySCxBGQkiA3xRp4b
STATE = READY
```

## Commercial safety

Before JavaScript, candidate HTML continued to expose the governed values:

```text
price = R$ 658.000
reference = Ref. 68 m² (unidade 109) - Ago/26 | pagamento à vista
inventory fallback = Consulte disponibilidade
```

The more specific inventory state remained in canonical `commercial-values.json` and synchronized after load.

## Production performance evidence

```text
RUN = 35662744385
JOB = 106541527185
CHROME = 152.0.7977.82
LIGHTHOUSE = 13.5.0
RUNS = 5

run 1 = LCP 3,637 ms / score 77 / TBT 482 ms
run 2 = LCP 3,642 ms / score 77 / TBT 472 ms
run 3 = LCP 3,586 ms / score 79 / TBT 461 ms
run 4 = LCP 3,678 ms / score 76 / TBT 490 ms
run 5 = LCP 3,779 ms / score 68 / TBT 890 ms

median LCP = 3,642 ms
median score = 77
median TBT = 482 ms
median transfer = 1,062,105 B
```

Nearest accepted clean historical control using the same five-run methodology:

```text
median LCP = 3,676 ms
median score = 74
median transfer = 1,061,852 B
```

Observed delta:

```text
LCP = -34 ms / -0.92%
score = +3
transfer = +253 B / effectively unchanged
target <=2,500 ms = FAIL
```

## Decision

The `34 ms / 0.92%` median improvement is too small to classify as a material LCP win under the observed Lighthouse runner variance.

The candidate also intentionally delays inventory/typology synchronization, so keeping added scheduling complexity without material performance value is not justified.

Therefore Slice 06 is **rejected as inconclusive/non-useful** and the direct `defer` load is restored.

## Remaining dominant bottleneck

The adjacent paired laboratory that blocked only `googletagmanager.com` in Lighthouse—without changing Production—showed:

```text
normal median LCP = 5,080 ms
GTM/gtag-blocked median LCP = 3,166 ms
delta = -1,914 ms / -37.68%

normal median TBT = 496 ms
GTM/gtag-blocked median TBT = 33 ms
delta = -463 ms

normal median score = 70
blocked median score = 93
```

Representative CPU attribution showed GTM + gtag as the largest boot-up costs. This is diagnostic evidence only. It does not authorize a Measurement runtime or GTM publication change.

M5-10 remains active. Target LCP remains `<=2,500 ms`.
