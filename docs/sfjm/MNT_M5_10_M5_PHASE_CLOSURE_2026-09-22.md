# MNT-M5-10 / MNT-M5 — Final Acceptance Closure — 2026-09-22

Status: `COMPLETE / ACCEPTED`

## 1. Product Authority decision

Product Authority approved continuing from the current Ária Candidate 1 state and closing the performance topic.

Decision:

```text
ARIA_HERO_CANDIDATE_1 = RETAINED
PERFORMANCE_WINNER_VS_PRIOR_HERO = NOT_DETERMINED
LAB_LCP_TARGET <= 2500 ms = PASS
ROOFTOP_POOL_IMAGE = NOT_TESTED / NOT_PART_OF_CLOSURE
```

Candidate 1 is retained for visual/commercial value under an accepted payload tradeoff. This closure does **not** reclassify the inconclusive A/B as a performance win.

Canonical candidate evidence:

`docs/performance/MNT_M5_10_ARIA_HERO_ACCESS_CANDIDATE1_2026-09-22.md`

## 2. Runtime anchor

```text
LAST_RUNTIME_PR = #223 / MERGED
RUNTIME_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

## 3. M5-10 acceptance basis

Accepted M5-10 work includes the bounded remediation sequence that produced and validated:

- Elo Duo late GTM bootstrap retained;
- Elo Duo responsive hero retained;
- Ária responsive hero + first-gallery delivery retained;
- Responsive Media Delivery Standard V1 cross-project validated and adopted;
- Ária Candidate 1 residential-access hero retained by Product Authority;
- LCP laboratory target `<=2.5s` achieved on Elo and Ária retained responsive-media states;
- Form 46, GTM/GA4, Consent, CTA, SEO/canonical and accessibility contracts preserved through the accepted slices.

Candidate 1 final comparison remains:

```text
contemporaneous prior-hero control LCP median = 1,853 ms
candidate attempt 1 median = 2,149 ms
candidate attempt 2 median = 1,464 ms
candidate target <=2,500 ms = PASS / PASS
speed direction = INCONCLUSIVE
deterministic hero payload delta ~= +16.5 KB
```

Therefore:

```text
MNT-M5-10 = COMPLETE / ACCEPTED / CANDIDATE1_RETAINED
accepted_scope_equivalent = 24h
```

## 4. M5 phase acceptance

M5 tasks:

```text
M5-01 = COMPLETE / 16h
M5-02 = COMPLETE / 16h
M5-03 = COMPLETE / 16h
M5-04 = COMPLETE / 16h
M5-05 = COMPLETE / 16h
M5-06 = COMPLETE / 16h
M5-07 = COMPLETE / 16h
M5-08 = COMPLETE / 16h
M5-09 = COMPLETE / 16h
M5-10 = COMPLETE / 24h
```

Total:

```text
MNT-M5 = COMPLETE / ACCEPTED
accepted_scope_equivalent = 168h / 168h
```

Accepted residuals remain explicit:

- M5-01 screen-reader validation = NOT_OBSERVED / accepted residual;
- M5-01 physical-device validation = NOT_OBSERVED / accepted residual;
- M5-02 field CWV / INP = NOT_OBSERVED; lab evidence does not substitute for field evidence;
- Candidate 1 speed direction vs the immediately prior Ária hero = INCONCLUSIVE;
- rooftop-pool image = NOT_TESTED and not required for M5 closure.

None of these residuals is a hidden PASS.

## 5. Historical M2-10 reconciliation

During closure preparation, live GitHub resolution confirmed:

```text
PR #54 = MERGED
merge SHA = 5d2db073a4b345ae4e0067b675cab1cfb4a068ed
MNT-M2-10 = COMPLETE / ACCEPTED_WITH_V1_RESIDUAL
MNT-M2 = COMPLETE
```

Canonical evidence:

- `docs/measurement/MNT_M2_10_LIVE_QA_UPDATE_2026-09-13.md`
- `docs/measurement/MNT_M2_10_POST_MERGE_RECONCILIATION_2026-09-13.md`

The accepted V1 residual is the documented client-side thank-you lead guard limitation. No unadjudicated P0/P1 Measurement defect remained in the bounded M2-10 scope.

This 2026-09-22 reconciliation **does not add another 24h** to aggregate program progress. M2-10 was already accepted historically and is only being restored to current lifecycle/read-model visibility.

## 6. Program progress

Canonical aggregate before M5-10 acceptance:

```text
accepted = 896h
remaining = 344h
progress = 72.26%
```

Newly accepted by this closure:

```text
M5-10 = +24h
```

Result:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 920
REMAINING_FORECAST_HOURS = 320
ACCEPTED_PERCENT = 74.19
```

## 7. Next gate

There is no M5-11.

M2-10 does not need to be rerun merely because stale WBS/read-model surfaces still showed it as planned.

The next structural phase after the completed current phase is:

```text
MNT-M6 — Attribution & Paid Media Readiness
MNT-M6-01 — Attribution model and identifier boundaries — 16h
```

Execution of M6-01 is a separate Product Authority gate. This closure does not authorize Ads spend, Google Ads conversion creation, Meta implementation, campaign launch or budget mutation.
