# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-23`.

## Estado atual

```text
MNT-RESF = CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
ACCEPTED = 1200 / 1240h = 96.77%
DEFERRED = 40h

EFFECTIVE_PRODUCTION_RUNTIME = c80a8e1d773d85af563d9630f6e460e7ad85ea02
PRODUCTION_DEPLOYMENT = dpl_4F8SF29FyNj7EcpyqM9zT57oYAoi
PRODUCTION_STATE = READY

FAVICON_VISUAL = WORKING / USER_CONFIRMED
FAVICON_PERCEIVED_LOAD_DELAY = USER_REPORTED
LCP_IMPACT = NOT_MEASURED / NOT_PROVEN
```

## Única próxima ação segura

**MNT-PERF-01 — Favicon load / LCP regression validation**

State:

`ACTIVE / AUTHORIZED / MEASUREMENT_ONLY / OUTSIDE_RESF_ACCOUNTING`

Detailed handoff:

`handoffs/HANDOFF-2026-09-23-FAVICON-LCP-RECHECK-NEXT.md`

Required work:

1. resolve live `main`, effective runtime and Production deployment;
2. measure cold-load and warm-load favicon/icon request timing;
3. record timing, transfer bytes, priority and cache behavior where observable;
4. verify whether favicon/icon requests interact with the LCP critical path;
5. run five Lighthouse mobile samples per canonical public route using the existing project methodology;
6. calculate medians for LCP/FCP/CLS/TBT/transfer;
7. compare against applicable accepted performance evidence as context;
8. use an exact prior deployment as a same-method control if it remains accessible;
9. do not claim causality without controlled evidence;
10. stop before runtime remediation unless separately authorized.

Targets remain:

```text
LCP <= 2500 ms
INP <= 200 ms
CLS <= 0.1
```

Lighthouse TBT is not field INP.

## Deterministic favicon payload context

```text
/favicon.ico = 5,428 B
/favicon-16x16.png = 408 B
/favicon-32x32.png = 587 B
/favicon-48x48.png = 696 B
```

The small payload does not by itself prove zero LCP impact.

## After MNT-PERF-01

Resume:

`MNT-CDP-01 — select and prove Commercial Data Plane provider/publication owner`

Pending value-update path remains:

`MNT-CDP-03 — Planilha/CSV para atualização de valores`

## Still frozen / deferred

```text
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN / NOT_ACCEPTED
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07 / NOT_ACCEPTED
Search spend = R$ 0
remarketing spend = R$ 0
Meta paid media/CAPI = NOT_AUTHORIZED
Looker Studio = DEFERRED
```
