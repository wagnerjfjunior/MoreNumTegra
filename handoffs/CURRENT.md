# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-28`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-25-TRACEABILITY-RECONCILED-CURRENT.md`

Traceability standard:

`docs/governance/MNT_CHANGE_TRACEABILITY_STANDARD_V1.md`

Traceability audit:

`docs/governance/MNT_TRACEABILITY_AUDIT_2026-09-25.md`

## REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
LATEST_INTEGRATED_RUNTIME_SHA = 43ca5ba30b738b32ef482a4b9864d4bce4d97474
```

## DEPLOYMENT_STATE / PRODUCTION_STATE

```text
CANONICAL_HOST = www.moretegra.com.br
PRODUCTION_DEPLOYMENT = dpl_JLfW5GLsE4xwTu1fVr88Pc1Ms2iU
PRODUCTION_SOURCE_SHA = 43ca5ba30b738b32ef482a4b9864d4bce4d97474
PRODUCTION_STATE = READY
RUNTIME_ERRORS_LAST_24H = NONE_OBSERVED
```

## RESF PROGRAM STATE

```text
MNT-RESF = CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
MNT-M7 = COMPLETE / ACCEPTED
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 1200
DEFERRED_SCOPE_EQUIVALENT_HOURS = 40
ACCEPTED_PERCENT = 96.77
```

## RECENT CHANGE CHAIN

```text
#239-#248 = RESF close / dashboard / favicon / social / performance handoff
#249-#253 = brand/performance/cache remediation chain
#254-#260 = DSG Itaim publication and iterative correction chain
#250 = CLOSED_UNMERGED / SUPERSEDED_BY_249
```

Four Sep-24 direct-to-main source-data commits are documented as process exceptions in the traceability audit.

## CURRENT PERFORMANCE EVIDENCE STATE

```text
MNT-PERF-01 = EXECUTED / REMEDIATION_CHAIN_MERGED
FINAL_POST_REMEDIATION_CURRENT_RUNTIME_MEASUREMENT_PACKET = NOT_CANONICALIZED
MNT-PERF-02 = COMPLETE / EVIDENCE_CANONICALIZED / NO_RUNTIME_MUTATION
```

Do not invent final current-runtime LCP numbers.

## CURRENT PUBLIC SURFACES

```text
Home = LIVE
DSG Itaim = LIVE
CAPIITOLO = LIVE
Elo Duo = LIVE
Ária Higienópolis = LIVE
favicon = LIVE
```

All returned HTTP 200 in the 2026-09-25 reconciliation smoke.

## PENDING / DEFERRED

```text
MNT-PERF-03A = RETAIN / POST_CHANGE_MEASUREMENT_COMPLETE / LCP_MEDIAN_4.2S
MNT-CDP-01 = PENDING
MNT-CDP-03 = PENDING / spreadsheet-CSV value-update path
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07
Google SERP favicon visual refresh = EXTERNAL / NOT_OBSERVED
field CWV / INP = NOT_PROVEN
```

## GA4 AUDIENCE READINESS — AUTHORIZED PARALLEL TASK

Product Authority explicitly authorized a bounded GA4 audience-readiness task after the RESF provider/consumer reconciliation.

Current observed state:

```text
MNT | All project visitors | 180d = CREATED / INITIAL FULL-URL CANDIDATE
MNT | All project visitors | 540d = CREATED / INITIAL FULL-URL CANDIDATE
MNT | All project visitors path-safe | 180d = CREATED / SCREENSHOT_OBSERVED
MNT | All project visitors path-safe | 540d = CREATED / SCREENSHOT_OBSERVED
path-safe condition = Page path and screen class begins with /empreendimentos/
semantic validation = COMPLETE_FOR_PATH_SAFE_RULE
accumulation proof = PENDING
legacy/export dependency check = PENDING
canonical window policy = PENDING
archival = NOT_AUTHORIZED
paid media = FROZEN
```

Canonical evidence:
`docs/attribution/MNT_GA4_PROJECT_AUDIENCE_CREATION_EVIDENCE_2026-09-25.md`.

## NEXT SAFE ACTION

Read `docs/NEXT_SAFE_ACTION.md`.

The explicitly authorized GA4 audience-readiness exception is currently active and must be resolved before any audience archival. MNT-PERF-02 remains the default backlog next action outside this bounded exception.


## MNT-PERF-02 closure — 2026-09-25

Canonical evidence:

`docs/performance/MNT_PERF_02_CURRENT_RUNTIME_VERIFICATION_2026-09-25.md`

```text
Home median LCP = 10.4 s
DSG Itaim median LCP = 5.1 s
CAPIITOLO median LCP = 5.1 s
Elo Duo median LCP = 5.1 s
Ária Higienópolis median LCP = 2.0 s
field CWV / INP = NOT_PROVEN
runtime mutation = NONE
remediation backlog = ISSUE #266 / OPEN
```

Issue #266 records bounded remediation candidates only and does not authorize runtime mutation.


## MNT-PERF-03A — Home YouTube intent-load remediation — 2026-09-25

Canonical evidence:

`docs/performance/MNT_PERF_03A_HOME_YOUTUBE_INTENT_LOAD_2026-09-25.md`

```text
PR = #268
final exact head = 22fc140823870f557bcbc8edcb779a916a8cca89
merge/runtime SHA = 02feb3804a4a87c6d07bc12a5b9c7b983816b6ed
Production = dpl_3HqSohk1Sq32vWm8cUMFpgqY8GfW / READY
Home = HTTP 200
YouTube preconnect = REMOVED
YouTube iframe initial auto-mount = REMOVED
player load = USER_INTENT_ONLY
post-change 5-run Lighthouse Mobile = PENDING
performance improvement = NOT YET PROVEN
```


## MNT-PERF-03A post-change validation — COMPLETE

Evidence:
`docs/performance/MNT_PERF_03A_POST_CHANGE_VALIDATION_2026-09-25.md`

```text
baseline Home LCP median = 10.4 s
post-change Home LCP median = 4.2 s
relative reduction = 59.6%
target <= 2.5 s = NOT_MET
retain PR #268 runtime = YES
rollback = NOT_INDICATED
field CWV / INP = NOT_PROVEN
```

Next bounded Home candidate: `MNT-PERF-03B — late GTM bootstrap`, reusing the accepted Elo Duo late-load pattern without changing event schema/container semantics.


## MNT-PERF-03B — Home late GTM bootstrap — PRODUCTION

```text
PR = #271
exact head = 9c04027652cf3c54ed3613e8c74883424ae41611
runtime SHA = 43ca5ba30b738b32ef482a4b9864d4bce4d97474
Production = dpl_JLfW5GLsE4xwTu1fVr88Pc1Ms2iU / READY
Home = HTTP 200
late GTM bootstrap = LIVE
post-change five-run Home battery = NEXT
performance outcome = NOT_YET_PROVEN
```

## PR #289 + PR #290 production release — 2026-09-28

Canonical release record:

`docs/governance/MNT_PR289_PR290_PRODUCTION_RELEASE_2026-09-28.md`

```text
PR #289 Château Jardin = MERGED
PR #290 Higienópolis regional = MERGED
runtime main = 89de7ae56b91d91d969e2b14101c33492cdf2402
Production = dpl_DaqZM8bm1RhyKU7snS5GjFHTryjZ / READY
Production source SHA = 89de7ae56b91d91d969e2b14101c33492cdf2402
Higienópolis = HTTP 200
Château Jardin = HTTP 200
GitHub Actions exact-head execution = NOT_AVAILABLE / RUNNER_ALLOCATION_FAILURE
```

No Hosted Preview was created. No visual/browser acceptance, physical-device validation, real Form 46 submission, screen-reader proof or field CWV/INP proof is claimed by this release.

## Higienópolis regional v2 — Production — 2026-09-28

Canonical release record:
`docs/governance/MNT_HIGIENOPOLIS_REGION_V2_PRODUCTION_RELEASE_2026-09-28.md`

```text
PR #294 = MERGED
runtime SHA = c8f9de723f20f3bdbc84646aeb11144052aca5b7
Production = dpl_8Po99EaQDHvFbievvzx9QvPcyTC4 / READY
/regioes/higienopolis/ = HTTP 200
```

