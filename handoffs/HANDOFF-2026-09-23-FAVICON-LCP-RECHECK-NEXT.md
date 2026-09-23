# MoreNumTegra — Session Transition / Favicon Load + LCP Recheck

Date: `2026-09-23`

Status: `SESSION_TRANSITION / MNT-PERF-01_NEXT`

## Canonical repository / runtime

```text
repository = wagnerjfjunior/MoreNumTegra
canonical branch = main
repository main at transition = 4cdb1f743c1efee076643ed4679890e7de50059c
effective Production runtime SHA = c80a8e1d773d85af563d9630f6e460e7ad85ea02
Production deployment = dpl_4F8SF29FyNj7EcpyqM9zT57oYAoi
Production state = READY
canonical host = https://www.moretegra.com.br/
```

The newer repository main is documentation-only and its Vercel attempt was canceled by the Ignored Build Step.

## Favicon current state

Product Authority confirmed the browser favicon is now visually working.

Canonical package:

```text
/favicon.ico = LIVE
ICO frames = 16x16 + 32x32 + 48x48 + 96x96 + 192x192
/favicon-16x16.png = LIVE / 408 B
/favicon-32x32.png = LIVE / 587 B
/favicon-48x48.png = LIVE / 696 B
/favicon.ico repository payload = 5,428 B
/apple-touch-icon.png = LIVE
```

Current Home declarations:

```html
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

Live `/favicon.ico` observation:

```text
HTTP = 200
content-type = image/x-icon
cache-control = public, max-age=0, must-revalidate
```

## New Product Authority observation

```text
favicon visual = WORKING / USER_CONFIRMED
favicon perceived load delay = USER_REPORTED
LCP impact = NOT_MEASURED / NOT_PROVEN
```

Do not infer causality from the perceived delay.

## MNT-PERF-01 — Favicon load / LCP regression validation

State:

`AUTHORIZED / MEASUREMENT_ONLY / NEXT_SAFE_ACTION`

Counted in RESF hours:

`NO / POST_RESF_OPERATIONAL_FOLLOWUP`

### Question to answer

Did the current favicon/browser-tab package materially worsen page loading or LCP?

### Required measurement

1. resolve GitHub `main`, effective Production runtime and deployment live;
2. capture favicon/icon request timing on cold and warm page loads;
3. record request start, duration, transfer size, priority and cache behavior where observable;
4. verify whether favicon/icon requests are render-blocking or interact with the LCP critical path;
5. execute a fresh Lighthouse mobile battery using the established project method:
   - viewport 393x852;
   - simulated throttling;
   - five runs per current canonical route;
   - Home;
   - CAPIITOLO;
   - Elo Duo;
   - Ária;
6. record median LCP, FCP, CLS, TBT and total transfer;
7. compare with applicable accepted historical performance evidence only as contextual evidence;
8. if an exact prior Production deployment remains accessible, use the same methodology as an additional control;
9. distinguish deterministic payload/timing evidence from noisy lab variation;
10. make no causal claim unless the evidence supports it.

### Existing contextual performance anchors

Historical baseline:

`docs/performance/MNT_M5_02_PRODUCTION_PERFORMANCE_BASELINE_2026-09-20.md`

Recorded historical medians:

```text
Home = 1,346 ms / one 2,760 ms outlier
CAPIITOLO = 5,493 ms historical baseline
Elo Duo = 8,234 ms historical baseline
Ária = 5,357 ms historical baseline
```

Later retained evidence:

```text
Elo Duo responsive hero retained median = 2,383 ms
Ária contemporaneous retained control = 1,853 ms
Ária candidate batches = 2,149 ms and 1,464 ms
Ária directional performance effect = INCONCLUSIVE
```

Historical values are not automatically current controls.

### Acceptance / decision outcomes

Allowed conclusions:

```text
NO_MATERIAL_REGRESSION_OBSERVED
POSSIBLE_REGRESSION / INCONCLUSIVE
MATERIAL_REGRESSION_PROVEN
PROVIDER_OR_LAB_VARIABILITY / INCONCLUSIVE
```

If a favicon-related regression is proven, return a bounded remediation proposal.

Do not mutate favicon declarations, cache headers, hero/media, GTM or other runtime behavior during the measurement slice unless Product Authority separately authorizes remediation.

## Existing priorities after MNT-PERF-01

Resume:

`MNT-CDP-01 — select and prove Commercial Data Plane provider/publication owner`

Pending commercial update path remains:

`MNT-CDP-03 — spreadsheet/CSV value-update path`

Paid media remains frozen:

```text
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07
```

## Session start instruction

New conversation must begin by:

1. resolve live `main`;
2. execute canonical bootstrap;
3. read this handoff;
4. read current performance baseline/retained performance evidence;
5. perform MNT-PERF-01 measurement only;
6. stop before remediation unless evidence and Product Authority authorize the next mutation.
