# MNT-PERF-03A — Post-change Home Performance Validation

Date: 2026-09-25  
Route: `https://www.moretegra.com.br/`  
Runtime under test: `02feb3804a4a87c6d07bc12a5b9c7b983816b6ed`  
Production deployment: `dpl_3HqSohk1Sq32vWm8cUMFpgqY8GfW`

## Method

Same PageSpeed Insights / Lighthouse Mobile methodology used by MNT-PERF-02:

- Moto G Power emulated;
- Lighthouse 13.5.0;
- slow 4G;
- initial page load;
- single-page session;
- HeadlessChromium 153.0.8010.36;
- five valid samples.

## Raw samples

| Run | Performance | FCP s | LCP s | TBT ms | CLS | Speed Index s |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 81 | 0.9 | 4.7 | 170 | 0 | 2.4 |
| 2 | 85 | 1.0 | 4.1 | 10 | 0 | 4.0 |
| 3 | 78 | 1.0 | 4.6 | 240 | 0 | 3.9 |
| 4 | 84 | 1.0 | 4.2 | 110 | 0 | 3.9 |
| 5 | 98 | 0.9 | 2.3 | 80 | 0 | 1.1 |

## Medians

```text
Performance = 84
FCP = 1.0 s
LCP = 4.2 s
TBT = 110 ms
CLS = 0
Speed Index = 3.9 s
```

## Baseline comparison

MNT-PERF-02 Home baseline:

```text
FCP = 6.5 s
LCP = 10.4 s
TBT = 120 ms
CLS = 0.001
Performance = 58
```

Post MNT-PERF-03A:

```text
FCP = 1.0 s
LCP = 4.2 s
TBT = 110 ms
CLS = 0
Performance = 84
```

LCP absolute reduction: `6.2 s`.  
LCP relative reduction: `59.6%`.

## Adjudication

```text
MNT-PERF-03A IMPLEMENTATION = SUCCESS
MNT-PERF-03A RETAIN = YES
ROLLBACK = NOT_INDICATED
LCP IMPROVEMENT = CONFIRMED_IN_LAB
LCP TARGET <= 2.5 s = NOT_MET
FIELD CWV / INP = NOT_PROVEN
```

The YouTube intent-load change materially improved the Home lab profile and reduced run-to-run variance. It must be retained.

Residual PageSpeed findings were stable across the post-change runs:

- render-blocking resources: ~370–500 ms estimated opportunity;
- unused JavaScript: ~131–133 KiB estimated opportunity;
- small image-delivery opportunity: ~12–17 KiB;
- DOM optimization remains reported;
- image elements without explicit dimensions remain reported;
- long tasks varied by run;
- one run reported browser console errors and Best Practices 96; four runs reported Best Practices 100.

The final run reached LCP 2.3 s, proving the current runtime can enter the target range under the same lab profile, but the five-run median remains 4.2 s and therefore does not satisfy the acceptance target.

## Next bounded candidate

Read-only source inspection after this battery found an already accepted project-page pattern for late GTM network loading on Elo Duo:

`scripts/validate-m5-10-elo-late-gtm-bootstrap-slice07.mjs`

The Home still downloads GTM immediately in the head, while its post-change Lighthouse runs continue to report ~131–133 KiB of unused JavaScript.

Therefore the next bounded candidate is:

```text
MNT-PERF-03B = HOME_LATE_GTM_BOOTSTRAP
scope = Home only
pattern = reuse accepted Elo late-GTM bootstrap
event schema = unchanged
container = GTM-PGCR4R47 unchanged
dataLayer queue = preserved
Consent/Form46/commercial/SEO = unchanged
post-change five-run Home battery = required
```

This packet does not itself authorize GTM semantic changes. The candidate is limited to network bootstrap timing and must preserve the existing event/dataLayer contract.
