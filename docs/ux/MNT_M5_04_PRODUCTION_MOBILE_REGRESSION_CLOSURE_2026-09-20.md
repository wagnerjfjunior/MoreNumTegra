# MNT-M5-04 — Production Mobile Controls Regression Closure

Status: `COMPLETE / PRODUCTION_REGRESSION_PASS / PHYSICAL_DEVICE_NOT_OBSERVED`

Date: `2026-09-20`

## 1. Authority

Product Authority granted continuing authorization on 2026-09-20 to proceed through the planned MoreNumTegra tasks, including PR Ready/merge lifecycle, and to stop only when a material decision is required.

M5-10 performance remediation remains separately and explicitly blocked; this continuing authorization does not override that explicit block.

## 2. Runtime identity

```text
CANONICAL_MAIN_AFTER_REMEDIATION = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

## 3. Initial Production regression

Diagnostic PR: `#184` — temporary / never merge.

Pre-fix Production run:

```text
RUN = 35540073578
RUNTIME = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PASS = 54
FAIL = 3
NOT_OBSERVED = 1
TOTAL = 58
ARTIFACT = 10614497410
ARTIFACT_SHA256 = 7c8abf671d5f2926b502976c04a829694fc6611e63f23bc4ae7115fee6730d36
```

The three failures were one repeated real finding across the three browser engines:

```text
ROUTE = /empreendimentos/aria-higienopolis/
CONTROL = gallery previous/next arrows
VIEWPORT = 393x852 touch
CHROMIUM = 44x44
FIREFOX = 44x44
WEBKIT = 44x44
REQUIRED_PROJECT_TOUCH_TARGET = >=46x46
```

All other tested Home/project filter, touch, overflow and reflow checks passed.

## 4. Bounded remediation

Runtime PR: `#185 — M5-04: fix Aria gallery touch target regression`

Exact candidate head:

`a4fcec608ef038ab8ecd3671e4058db1f33b093b`

Bounded changes:

- Ária `.mt-gallery-arrow`: `44x44` -> `46x46`;
- repository regression guard added to `scripts/validate-mobile-ui-standard.mjs`.

No Form 46, GTM/GA4, SEO/canonical, DNS, content, media-source or performance-remediation change.

PR #185 merged as:

`a070e968a547cf94a68b0eb2a38a4bb2e9f64758`

## 5. Exact-head candidate gate

Final exact-head candidate run:

```text
RUN = 35540432189
CANDIDATE_SHA = a4fcec608ef038ab8ecd3671e4058db1f33b093b
RESULT = SUCCESS
```

Repository validators:

- Commercial page standard = PASS;
- M4-05R metadata = PASS;
- mobile UI standard = PASS;
- favicon standard = PASS.

Local 393x852 touch smoke:

```text
CHROMIUM = 46x46 / tap 1-of-7 -> 2-of-7 / no overflow
FIREFOX = 46x46 / tap 1-of-7 -> 2-of-7 / no overflow
WEBKIT = 46x46 / tap 1-of-7 -> 2-of-7 / no overflow
```

Two earlier diagnostic attempts failed only because of diagnostic-authoring defects:
- literal `\n` syntax error in the newly added validator guard;
- diagnostic script unavailable after exact-SHA checkout.

Both were corrected in the diagnostic lifecycle and are not runtime findings.

## 6. Post-merge Production regression

After Production became READY on `dpl_C9zyvyKSDgYmep24dEj88xacNZ73`, the same Production matrix was rerun.

```text
RUN = 35540543038
RUNTIME = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
RESULT = SUCCESS
PASS = 57
FAIL = 0
NOT_OBSERVED = 1
TOTAL = 58
ARTIFACT = 10614387172
ARTIFACT_SHA256 = 3b1486932824d4642c5ad8f642d0bedac8adbc13801664dd3871a3f3ecafefaf
```

Validated areas include:

- Home filter initialization;
- quick-zone touch filter;
- combined zone + stage;
- price filter;
- search;
- clear/reset;
- empty state + touch reset;
- Home filter/control touch targets;
- CAPIITOLO scene/type touch interaction;
- CAPIITOLO form/floating controls;
- Elo Duo form/quick controls;
- Ária gallery and form/quick controls;
- horizontal overflow at 360/375/393/440 on all governed routes;
- 150%/200%-equivalent reflow on all governed routes.

## 7. Evidence boundary

```text
PHYSICAL_DEVICE = NOT_OBSERVED / NOT_PASS
```

A real physical mobile device was not executed. Browser engines used touch-capable contexts and governed mobile viewport dimensions. This residual is explicit and must not be silently promoted to PASS.

## 8. Completion decision

```text
MNT-M5-04 = COMPLETE / PRODUCTION_REGRESSION_PASS / PHYSICAL_DEVICE_NOT_OBSERVED
OPEN_RUNTIME_FINDINGS = 0
```

This closes the authorized M5-04 regression scope while preserving the physical-device evidence limitation.

## 9. Program consequence

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 816
REMAINING_FORECAST_HOURS = 424
ACCEPTED_PERCENT = 65.81
MNT-M5 = ACTIVE
MNT-M5-05 = AUTHORIZED / READY_TO_START
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```
