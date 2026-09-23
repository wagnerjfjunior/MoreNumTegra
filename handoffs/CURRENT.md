# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-23`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-23-PUBLIC-SURFACE-REMEDIATION-LIVE.md`

## REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
LATEST_RUNTIME_SHA = c80a8e1d773d85af563d9630f6e460e7ad85ea02
```

## DEPLOYMENT_STATE / PRODUCTION_STATE

```text
CANONICAL_HOST = www.moretegra.com.br
PRODUCTION_DEPLOYMENT = dpl_4F8SF29FyNj7EcpyqM9zT57oYAoi
PRODUCTION_SOURCE_SHA = c80a8e1d773d85af563d9630f6e460e7ad85ea02
PRODUCTION_STATE = READY
```

## RESF PROGRAM STATE

```text
MNT-RESF = CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
MNT-M7 = COMPLETE / ACCEPTED
MNT-M7-13 = COMPLETE / PROVIDER_INTAKE_MERGED

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 1200
DEFERRED_SCOPE_EQUIVALENT_HOURS = 40
ACCEPTED_PERCENT = 96.77
```

The program is intentionally not represented as 100% complete.

## PROVIDER INTAKE

```text
provider = wagnerjfjunior/Blogs-sites-portais-seo
PR = #15
provider merge = c8cf9c8f49982c30d641b6c590ddf53018802e52
workflow = 35856574031 / success
SES Documentation Auditor = PASS_WITH_RESIDUAL_RISK
framework lifecycle mutation = NO
framework registry mutation = NO
```

## RELEASE RESIDUALS

```text
P0 = 0
P1 = 0
P2 = 2
P3 = 0
```

Current residuals:

- CAPIITOLO client-side editorial composition — OPEN / P2;
- Google SERP favicon visual refresh — AWAITING_EXTERNAL_RECRAWL / NOT_OBSERVED.

## PAID MEDIA

```text
M6-07 = DEFERRED / PAID_MEDIA_FROZEN / NOT_ACCEPTED
M6-08 = DEFERRED / DEPENDS_ON_M6-07 / NOT_ACCEPTED
Search spend = R$ 0
remarketing spend = R$ 0
```

A later paid-media reopening requires a new explicit Product Authority decision.

## DASHBOARD / WBS STATE

Canonical dashboard reconciliation:

`docs/sfjm/MNT_DASHBOARD_WBS_STATE_RECONCILIATION_2026-09-23.md`

```text
M1 = COMPLETE / ACCEPTED
M3 = COMPLETE / ACCEPTED
M4 = COMPLETE / ACCEPTED
M7 = COMPLETE / ACCEPTED
M6-07 = DEFERRED / PAID_MEDIA_FROZEN
M6-08 = DEFERRED / DEPENDS_ON_M6_07
historical planning snapshot = ARCHIVE_ONLY
```

## CURRENT PRIORITY

Commercial Data Plane v3 is now the active product-priority workstream outside RESF accounting.

```text
COMMERCIAL_DATA_PLANE_REENTRY = ACTIVE / DECOMPOSED
CURRENT_CHILD = MNT-CDP-01 / provider selection
MNT-CDP-03 = PLANNED / PENDING / spreadsheet-CSV value update path
provider/publication owner = NOT_SELECTED
runtime migration = NOT_AUTHORIZED
current Home commercial truth = PRESERVE
```

The spreadsheet/CSV is an operator input channel, not a direct runtime data source.

## NEXT SAFE ACTION

Read `docs/NEXT_SAFE_ACTION.md`.

Execute MNT-CDP-01: select and prove the Commercial Data Plane publication provider/owner. Keep M6-07/M6-08 and the pending MNT-CDP-03 spreadsheet/CSV path visible in the dashboard.


## FINAL TEGRA T FAVICON

```text
source = Product Authority PNG 500x500 / transparent
source SHA-256 = 0fd8e12cc711543f44a6b34581bdb09981e7e30570b783cb8b29057ff408caf8
/favicon.ico = LIVE / 16x16 + 32x32 + 48x48 + 96x96 + 192x192 / Tegra yellow T
/favicon-16x16.png = LIVE
/favicon-32x32.png = LIVE
/favicon-48x48.png = LIVE
/favicon-96x96.png = LIVE
/favicon-192x192.png = LIVE
/apple-touch-icon.png = LIVE / 180x180
browser tab recheck = REQUIRED / site-side assets and declarations are LIVE
Google SERP refresh = AWAITING_EXTERNAL_RECRAWL / NOT_OBSERVED
```
