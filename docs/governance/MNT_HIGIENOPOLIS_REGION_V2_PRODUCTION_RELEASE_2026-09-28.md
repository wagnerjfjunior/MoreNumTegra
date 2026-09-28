# Higienópolis regional editorial v2 — Production release record — 2026-09-28

## TASK / CHANGE ID
MNT-HIGIENOPOLIS-REGION-V2 / PR #294

## AUTHORITY / AUTHORIZATION
Product Authority approved Production after reviewing exact branch head through canonical Local Live Sync on 2026-09-28.

## BASE SHA
`ce231770a4546038fd1f2cc719815ebfa8c7d8ce`

## HEAD SHA
`6450c114d13aa3ec9aafe5f6f3f6fda889405b2a`

## PR NUMBER
`#294`

## CHANGED FILES / SCOPE
- `src-greenn/regioes/higienopolis/index.html`
- `docs/search/MNT_HIGIENOPOLIS_REGION_PILOT_EVIDENCE_2026-09-28.md`

No other runtime files were changed.

## VALIDATION / CHECKS

### Local Live Sync
```text
VALIDATION_SURFACE = LOCAL_LIVE_SYNC
REPOSITORY = wagnerjfjunior/MoreNumTegra
BRANCH = feat/region-higienopolis-editorial-v2-20260928
HEAD = 6450c114d13aa3ec9aafe5f6f3f6fda889405b2a
ROUTE = /regioes/higienopolis/
RESULT = USER_APPROVED_FOR_PRODUCTION
```

### Static exact-head checks
PASS:
- no duplicate IDs;
- no broken in-page anchors;
- JSON-LD parse;
- canonical;
- favicon references;
- Open Graph/Twitter metadata;
- Ária/Mozae links;
- Form 46 identity;
- Green/GDigital endpoint preserved in shared runtime;
- regional route preserved;
- semantic coverage for `apartamento pronto para morar em Higienópolis`;
- semantic coverage for `apartamento na planta em Higienópolis`.

### GitHub Actions
The only recorded exact-head workflow returned `failure`, but no runner was allocated:

```text
workflow = Favicon standard validation
runner_id = 0
runner_name = ""
steps = 0
classification = RUNNER_ALLOCATION_FAILURE
executed_test_result = NOT_AVAILABLE
```

This is not represented as PASS and not represented as an executed code-test failure.

## REVIEW FINDINGS
Product Authority rejected process-facing copy and required a middle-funnel regional SEO posture based on the canonical M3 Search study.

Final semantic ownership:
- region page: Higienópolis + location/stage discovery;
- exact Ária intent: exact Ária project page;
- exact Mozae intent: exact Mozae project page;
- project-specific price/plants/metragem/availability remain with exact project owners.

## MERGE SHA
`c8f9de723f20f3bdbc84646aeb11144052aca5b7`

## DEPLOYMENT ID
`dpl_8Po99EaQDHvFbievvzx9QvPcyTC4`

## DEPLOYMENT STATE
`READY`

## PRODUCTION SOURCE SHA
`c8f9de723f20f3bdbc84646aeb11144052aca5b7`

## PRODUCTION VALIDATION
URL: `https://www.moretegra.com.br/regioes/higienopolis/`

Observed:
```text
HTTP 200
title = Apartamentos em Higienópolis | Pronto e na Planta Tegra
H1 = Apartamentos em Higienópolis.
canonical = PASS
robots index,follow = PASS
favicon = PASS
Open Graph/Twitter = PASS
JSON-LD parse = PASS
regional hero = PASS
second editorial image = PASS
Ária link = PASS
Mozae link = PASS
Form 46 markup = PASS
ready-to-move semantic = PASS
off-plan semantic = PASS
```

## OUTCOME
```text
PR #294 = MERGED
PRODUCTION = LIVE
DEPLOYMENT = READY
```

## RESIDUALS
Not newly proven by this release:
- real Form 46 submission;
- physical-device validation;
- screen-reader validation;
- field CWV / field INP;
- successful GitHub Actions execution on the exact head.

## NEXT SAFE ACTION
Resume the canonical backlog unless Product Authority explicitly authorizes another bounded change.
