# MNT-M5-01 — Production Acceptance Closure

Status: `COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS`

Canonicalized: `2026-09-20`  
Repository: `wagnerjfjunior/MoreNumTegra`

## Decision

MNT-M5-01 reached its acceptance gate after the integrated remediation queue was deployed and the final representative Production matrix completed without behavioral failures.

```text
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
P0_OPEN = 0
P1_OPEN = 0
P2_OPEN = 0
P3_OPEN = 0
P2_FINDINGS_ACCEPTED = 13 / 13
AUTOMATED_PRODUCTION_MATRIX = 100 PASS / 0 FAIL / 2 NOT_OBSERVED / 102 TOTAL
SCREEN_READER = NOT_OBSERVED / ACCEPTED_RESIDUAL / NOT_PASS
PHYSICAL_DEVICE = NOT_OBSERVED / ACCEPTED_RESIDUAL / NOT_PASS
WCAG_CERTIFICATION_CLAIM = NO
```

The two residuals are explicitly adjudicated as non-blocking for this bounded M5-01 gate. They remain factual evidence gaps and must not be rewritten as PASS.

Authority for the residual-risk adjudication and gate decision: Product Authority instruction on 2026-09-20 to reconcile/adjudicate the two `NOT_OBSERVED` items and decide the M5-01 gate after Production revalidation.

## Repository and Production identity

```text
CANONICAL_MAIN_RUNTIME_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PR_177 = MERGED / 1d3d7d0f9213586ae8a5a3a015b8afda3ce21603
PR_178 = MERGED / 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

PR #178 was a bounded one-file fix in `src-greenn/preview/runtime.js` for the remaining WebKit consent focus-release timing issue. No Form 46 contract, GTM event name, SEO, canonical, DNS, commercial content or Vercel configuration was changed.

## Acceptance evidence

Pre-fix Production characterization:

```text
RUN = 35536868292
RUNTIME_SHA = 1d3d7d0f9213586ae8a5a3a015b8afda3ce21603
RESULT = 99 PASS / 1 FAIL / 2 NOT_OBSERVED / 102
UNIQUE_FAIL = Home / WebKit 393x852 / C02-ACCEPT
EVIDENCE = hidden=true; stored=granted; hiddenFocus=true; active=Aceitar
```

The investigation found no second consent handler in `src-greenn/moretegra.js`. The Home uses the static consent surface from `src-greenn/preview/index.html`, while the effective consent listener/focus release is owned by `src-greenn/preview/runtime.js`. The supported cause was therefore WebKit focus/timing behavior rather than a dual-handler race.

Post-fix Production acceptance:

```text
RUN = 35537580700
RUNTIME_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
RESULT = SUCCESS
SUMMARY = 100 PASS / 0 FAIL / 2 NOT_OBSERVED / 102
HOME_WEBKIT_C02_ACCEPT = PASS
HOME_WEBKIT_C02_ACCEPT_EVIDENCE = hidden=true; stored=granted; hiddenFocus=false; active=Receber condições
```

The matrix also retained PASS evidence for the governed F01/F02/F03/F10/F11/F12/F13/F14/F15/F16/F17/F18/F19 families, keyboard traversal, reflow, representative touch targets, overflow, consent Accept/Reject across the tested routes/engines, invalid Form 46 validation without sending a real lead, and axe serious/critical checks.

No real lead was sent by this acceptance run.

## Explicit residual adjudication

### Screen reader

```text
RESULT = NOT_OBSERVED
SCOPE = real NVDA/VoiceOver session
ADJUDICATION = ACCEPTED_RESIDUAL / NON_BLOCKING_FOR_M5_01
```

Reasoning:
- real assistive-technology announcement behavior was not executed;
- keyboard/focus semantics were exercised across Chromium, Firefox and WebKit;
- axe serious/critical checks were clean on the representative routes;
- semantic/tab/focus remediation has matching Production evidence;
- the evidence does not justify a screen-reader PASS or WCAG certification claim.

Reopening condition: a real AT session or user report exposes a material announcement, focus, naming or operability defect.

### Physical mobile device

```text
RESULT = NOT_OBSERVED
SCOPE = real physical touch device
ADJUDICATION = ACCEPTED_RESIDUAL / NON_BLOCKING_FOR_M5_01
```

Reasoning:
- real hardware touch was not executed;
- representative mobile viewports and three browser engines were exercised;
- governed target dimensions, overflow and reflow behavior have Production evidence;
- the evidence does not justify a physical-device PASS.

Reopening condition: physical-device evidence exposes touch, viewport, scroll, focus or layout behavior inconsistent with the accepted matrix.

## Program consequence

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 768
REMAINING_FORECAST_HOURS = 472
ACCEPTED_PERCENT = 61.94
MNT-M5 = ACTIVE
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = PLANNED / NOT_AUTHORIZED_BY_SEQUENCE
```

No later task is authorized merely by this acceptance closure.

## Diagnostic cleanup

PR #176 is a temporary diagnostic harness and must not be merged into runtime. After this evidence is merged into canonical `main`, PR #176 is to be closed as completed diagnostic evidence transport.
