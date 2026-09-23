# MoreNumTegra — Dashboard Reconciled / Post-RESF Backlog Visible

Date: `2026-09-23`

## Canonical repository state

```text
repository = wagnerjfjunior/MoreNumTegra
canonical branch = main
effective Production runtime SHA = 124b620855175a583c528733462d6d0f4f44cd41
Production deployment = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
Production state = READY
```

## RESF program

```text
MNT-RESF = CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
accepted = 1200 / 1240h = 96.77%
deferred = 40h

MNT-M7 = COMPLETE / ACCEPTED / 192h
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN / 24h
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07 / 16h
```

## Dashboard/WBS reconciliation

The active WBS historical planning summary was causing stale dashboard states.

Canonical correction:

`docs/sfjm/MNT_DASHBOARD_WBS_STATE_RECONCILIATION_2026-09-23.md`

Current structured lifecycle now reconciles:

```text
M1 = COMPLETE / ACCEPTED / 96h
M3 = COMPLETE / ACCEPTED / 144h
M4 = COMPLETE / ACCEPTED / 208h
M7 = COMPLETE / ACCEPTED / 192h
```

The original planning snapshot is now archive-only:

`docs/roadmap/archive/MNT_RESF_PLANNING_BASELINE_2026-09-10.md`

Dashboard consumers must not render that archive as current state.

## Current post-RESF priority

`COMMERCIAL_DATA_PLANE_REENTRY`

Decomposition:

```text
MNT-CDP-01 = ACTIVE / select and prove provider/publication owner
MNT-CDP-02 = PLANNED / public read + protected admin write
MNT-CDP-03 = PLANNED / PENDING / spreadsheet-CSV value update path
MNT-CDP-04 = PLANNED / approval-publish-version-rollback-audit
MNT-CDP-05 = PLANNED / NOT_AUTHORIZED / runtime consumer migration
MNT-CDP-06 = PLANNED / first value-only update without site deploy + rollback proof
```

The spreadsheet/CSV path is explicitly pending and visible. It is an operator input channel only; the browser must consume the governed v3 published snapshot, not the spreadsheet.

## Current Home commercial truth

Until the Commercial Data Plane is published and adopted:

`docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md`

governs the current Home commercial state.

Migration must preserve current values unless Product Authority separately changes them.

## Open residuals

No current P0/P1 release blocker is open.

```text
MNT-RES-01 = OPEN / P2 / CAPIITOLO client-side editorial composition
MNT-RES-02 = OPEN / P2 / Search favicon eligibility
MNT-RES-03 = NOT_OBSERVED / accepted residual / physical-device QA
MNT-RES-04 = NOT_OBSERVED / accepted residual / screen-reader validation
MNT-RES-05 = NOT_OBSERVED / accepted residual / field CWV / field INP
```

These must remain visible; they were accepted as residuals, not declared fixed.

## Architecture documentation reconciliation

Commercial Data Plane documentation now consistently uses v3.

Corrected drift:

- v2 single-offer shape = historical/superseded;
- v3 = current canonical candidate;
- spreadsheet/CSV path = explicit `MNT-CDP-03`;
- candidate/published lifecycle remains separate;
- `tablePrice` remains semantically separate from promotional `oldPrice`;
- multiple offers per project remain supported.

## Next safe action

`MNT-CDP-01 — select and prove provider/publication owner`.

No runtime migration is authorized yet.

Paid media remains frozen.
