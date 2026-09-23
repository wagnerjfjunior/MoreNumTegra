# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-23`.

## Estado atual

```text
MNT-RESF = CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
ACCEPTED = 1200 / 1240h = 96.77%
DEFERRED = 40h

MNT-M7 = COMPLETE / ACCEPTED
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN / NOT_ACCEPTED
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07 / NOT_ACCEPTED

COMMERCIAL_DATA_PLANE_REENTRY = ACTIVE / DECOMPOSED / OUTSIDE_RESF_ACCOUNTING
CURRENT_CHILD = MNT-CDP-01
```

Dashboard reconciliation:

`docs/sfjm/MNT_DASHBOARD_WBS_STATE_RECONCILIATION_2026-09-23.md`

## Current post-RESF decomposition

| ID | Item | State |
|---|---|---|
| MNT-CDP-01 | Selecionar e provar provider/publication owner | **ACTIVE / NEXT** |
| MNT-CDP-02 | Public read + protected admin write | PLANNED / BLOCKED_BY_CDP_01 |
| MNT-CDP-03 | **Planilha/CSV para atualização de valores** → import/normalize/validate/candidate snapshot | PLANNED / PENDING |
| MNT-CDP-04 | Approval/publish/version/rollback/audit | PLANNED |
| MNT-CDP-05 | Migrar Home/páginas exatas para snapshot v3 | PLANNED / NOT_AUTHORIZED |
| MNT-CDP-06 | Primeiro update de valor sem deploy + rollback E2E | PLANNED |

The planilha/CSV is not the runtime source. It is an operator input that must pass the same schema/business validation before publication.

## Única próxima ação segura

**MNT-CDP-01 — selecionar e provar o provider/publication owner.**

The provider must prove:

1. public HTTPS read;
2. protected authenticated/admin write;
3. versioned and atomic publication/current pointer;
4. rollback;
5. audit history;
6. browser-safe CORS/cache/freshness;
7. no browser secret;
8. ability to publish a commercial update without MoreNumTegra runtime deployment.

No runtime consumer migration is authorized by this step.

## Residuals still visible

```text
P0 = 0
P1 = 0
CURRENT_CODE_OWNED_P2 = 1

P2-01 = CAPIITOLO client-side editorial composition
FAVICON = SITE_SIDE_FIXED / AWAITING_GOOGLE_RECRAWL / NOT_OBSERVED

physical-device QA = NOT_OBSERVED
screen-reader validation = NOT_OBSERVED
field CWV / field INP = NOT_OBSERVED
```

## Still frozen/deferred

```text
M6-07 Google Ads external implementation = DEFERRED / PAID_MEDIA_FROZEN
M6-08 Paid conversion QA = DEFERRED / DEPENDS_ON_M6-07
Search spend = R$ 0
remarketing spend = R$ 0
Meta paid media/CAPI = NOT_AUTHORIZED
Looker Studio = DEFERRED
```

Do not activate paid media merely to change the RESF percentage.

Do not change current Home commercial values as part of architecture migration unless Product Authority separately changes them.


## Public surface remediation completed — 2026-09-23

```text
PR = #241
runtime SHA = 1543bb2a16d2ecace4d697fa6f381f9353df7582
deployment = dpl_GAKSbqFmB3xExV2wYhPMN1iErJfp / READY

/favicon.ico = HTTP 200
favicon format = ICO
favicon site-side issue = CLOSED
Google SERP visual refresh = AWAITING_EXTERNAL_RECRAWL

social sharing metadata = LIVE / VALIDATED
Home share image = 1280x720
CAPIITOLO/Capitolo variant strategy = LIVE / SINGLE_CANONICAL_PAGE
runtime errors after deploy = NONE OBSERVED
```

Next safe action remains `MNT-CDP-01`.
