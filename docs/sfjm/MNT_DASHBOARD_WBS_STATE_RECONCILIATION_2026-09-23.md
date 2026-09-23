# SFJM Dashboard / WBS State Reconciliation — 2026-09-23

Status: `COMPLETE / CANONICAL_STATE_RECONCILIATION / DOCS_ONLY`

## 1. Problem

The active WBS still contained a historical 2026-09-10 planning-state table near the top. That table showed M3/M4/M5/M6/M7 as `PLANNED`, even though later canonical execution had completed most of that work.

The structured `PROGRAM_TASK_GRAPH.json` also retained stale lifecycle for M1, M3 and M4:

- M1 = ACTIVE / 0 accepted;
- M3 = PLANNED / 0 accepted;
- M4 = PLANNED / 0 accepted.

Those states contradicted later accepted-program accounting and merged task evidence.

## 2. Accepted-hour proof

Final accepted RESF accounting:

~~~text
M0 = 160h
M1 = 96h
M2 = 144h
M3 = 144h
M4 = 208h
M5 = 168h
M6 = 88h accepted / 40h deferred
M7 = 192h

TOTAL ACCEPTED = 1200h
~~~

The M5 final closure already recorded aggregate accepted scope of `920h` immediately after M5 completion.

That total is exactly:

~~~text
M0 160
+ M1 96
+ M2 144
+ M3 144
+ M4 208
+ M5 168
= 920
~~~

Therefore current structured state cannot simultaneously claim M1/M3/M4 are unaccepted.

Canonical M5 closure:

`docs/sfjm/MNT_M5_10_M5_PHASE_CLOSURE_2026-09-22.md`

## 3. M1 proof

M1 adoption chain:

~~~text
PR #39 = adopt RESF v1 and publish canonical program WBS/read model
merge = dba0de3bfefc7aec90c5a88588c54eae4317c61f

PR #40 = close MNT-M1 after RESF adoption merge
merge = 347b62298d30ba3567a76d3f48a815e9f0f5b26c
~~~

Canonical M1 adoption artifacts:

- `docs/frameworks/resf/ADOPTION.yaml`
- `docs/frameworks/resf/ADOPTION_BASELINE.md`

Disposition:

~~~text
MNT-M1 = COMPLETE / ACCEPTED / 96h
MNT-M1-01..MNT-M1-08 = COMPLETE / ACCEPTED
~~~

## 4. M3 proof

Merged task chain:

~~~text
M3-01 PR #56 merge = f10caa45649816f62331546b3e6df31607573de2
M3-02 PR #57 merge = 8c1e99e210a7352d6371ad0179b9ff32e55bb5e2
M3-03 PR #58 merge = bb524d38fa17f54af06be183ad84b5e08b41383e
M3-04 PR #59 merge = 6d2230dc597ffdce8e1041616b1c13a5fd25b9ef
M3-05 PR #60 merge = e1a1c3cd9cff1d8c3aea4b2560170661d2972814
M3-06 PR #61 merge = 15876fc71d1e74b08d2a2be45565b2ef040c4d69
M3-07 PR #62 merge = 09405ae2c002b7e3b3298ca3a4fb434338b0ad3e
~~~

Current task evidence remains in the M3 research/product artifacts. Their internal candidate wording is point-in-time evidence; the later integrated program acceptance supersedes those labels for current dashboard lifecycle.

Disposition:

~~~text
MNT-M3 = COMPLETE / ACCEPTED / 144h
MNT-M3-01..MNT-M3-07 = COMPLETE / ACCEPTED
~~~

## 5. M4 proof

Merged task chain:

~~~text
M4-01 PR #65 merge = e683143af003be74eeb986fe5ffd3e38971407b3
M4-02 PR #66 merge = 54d391c018122b2d42afba176c343d94fbcd8f5f
M4-03 PR #67 merge = d6bab24e268ca72234f41aa936166cd74dd5ab8e
M4-04 PR #68 merge = bb4fd60ddd3571fce552da0fba02171d1aa4e983
M4-05 PR #69 merge = 8098997eef2eacfb74854f888bfaee2b6225b980
M4-06 PR #77 merge = 72ceeab91757ebec8edb0cec6c80c926e8bba43f
M4-07 PR #78 merge = 0df3e4e116bca19a843feae4c0416ecab68dda98
M4-08 PR #79 merge = 9073e3b70bd6a6e25255c1d5b147c26788c0630f
M4-09 PR #82 merge = a5c3766d93aa4b8ae76acfd6d544f03b204b9b20
~~~

M4-05 later received corrective acceptance:

`docs/sfjm/MNT_M4_05R_ACCEPTANCE_CLOSURE_2026-09-19.md`

Disposition:

~~~text
MNT-M4 = COMPLETE / ACCEPTED / 208h
MNT-M4-01..MNT-M4-09 = COMPLETE / ACCEPTED
~~~

## 6. Dashboard-state rule

Current dashboard consumers must use:

1. `docs/sfjm/CURRENT_PROGRAM_STATE.json` for current aggregate/lifecycle;
2. `docs/sfjm/PROGRAM_TASK_GRAPH.json` for reconciled task hierarchy/current task states;
3. `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md` current-state summary;
4. historical planning snapshot only from the archive file.

Historical snapshot:

`docs/roadmap/archive/MNT_RESF_PLANNING_BASELINE_2026-09-10.md`

~~~text
ARCHIVE_ONLY != CURRENT_DASHBOARD_STATE
~~~

## 7. Deferred and post-RESF visibility

The dashboard must continue to show:

~~~text
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN / NOT_ACCEPTED
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07 / NOT_ACCEPTED
~~~

It must also show the current post-RESF operational priority:

`COMMERCIAL_DATA_PLANE_REENTRY`

including the pending spreadsheet/CSV operator-update path.

The spreadsheet/CSV is an input channel only; it does not become a browser-consumed source of truth.

## 8. Residuals

No current P0/P1 release blocker remains.

Open/accepted residuals remain visible:

- CAPIITOLO client-side editorial composition — P2;
- Search favicon eligibility — P2;
- physical-device QA — NOT_OBSERVED;
- screen-reader validation — NOT_OBSERVED;
- field CWV / field INP — NOT_OBSERVED.

This reconciliation does not falsely close those residuals.

## 9. Runtime boundary

~~~text
runtime mutation = 0
Production mutation = 0
Ads mutation = 0
commercial value mutation = 0
~~~
