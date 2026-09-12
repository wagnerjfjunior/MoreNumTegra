# MoreNumTegra — SFJM Program Task Graph Contract

Status: `CANONICAL_CONSUMER_CONTRACT` when present in `main`  
Structural graph: `docs/sfjm/PROGRAM_TASK_GRAPH.json`  
Current-state overlay: `docs/sfjm/CURRENT_PROGRAM_STATE.json`  
Consumer read model: `docs/sfjm/PROJECT_READ_MODEL.json`  
Human WBS: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`

## 1. Authority

MoreNumTegra owns its project identity, objective, WBS hierarchy, task state, authorization state, project-published hours, evidence references and next-safe-action semantics.

SFJM Workspace may consume and render these contracts. It must not create tasks, infer missing hours, change status, flatten hierarchy or transfer Product Authority.

```text
MORENUMTEGRA CANONICAL MAIN
-> PROJECT READ MODEL
-> CURRENT PROGRAM STATE
-> STRUCTURAL TASK GRAPH
-> SFJM WORKSPACE DERIVED VIEW
```

`WORKSPACE_REPRESENTATION != MORENUMTEGRA_AUTHORITY`.

## 2. Consumer resolution order

A current-state consumer must:

1. resolve `wagnerjfjunior/MoreNumTegra@main` live;
2. record observed SHA and timestamp;
3. read `bootstrap/BOOTSTRAP_CANONICO.md`;
4. read `handoffs/CURRENT.md`;
5. read `docs/PROJECT_STATUS.md`;
6. read `docs/NEXT_SAFE_ACTION.md`;
7. read `docs/BLOCKED_ACTIONS.md`;
8. read `docs/sfjm/PROJECT_READ_MODEL.json`;
9. read `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
10. read `docs/sfjm/PROGRAM_TASK_GRAPH.json` for hierarchy/task detail;
11. fail closed on a material conflict.

## 3. State versus structure

`PROGRAM_TASK_GRAPH.json` is the project-owned structural planning graph: phases, task IDs, labels, planning hours and authorization annotations captured at publication.

`CURRENT_PROGRAM_STATE.json` is the project-owned lifecycle/progress overlay. It exists so later canonical lifecycle events can update current state without requiring consumers to infer status from an older structural snapshot.

Precedence:

```text
CURRENT LIFECYCLE STATE / PROGRESS
= CURRENT_PROGRAM_STATE.json

PROJECT SUMMARY
= PROJECT_READ_MODEL.json

HIERARCHY / TASK IDs / PLANNING HOURS
= PROGRAM_TASK_GRAPH.json
```

A later current-state overlay may supersede lifecycle-state/progress fields captured by an earlier graph snapshot. It may not silently rename, create or delete structural tasks or change planning hours without a corresponding project-owned structural update.

## 4. Current progress reference

As of the 2026-09-12 MNT-M2-09 closure reconciliation:

```text
forecast total = 1240h
accepted scope-equivalent = 376h
remaining forecast = 864h
program progress = 30.32%
```

Current M2 state:

```text
MNT-M2 accepted = 120h / 144h
MNT-M2-01..09 = COMPLETE
MNT-M2-10 = PLANNED / NEXT / EXECUTION_NOT_AUTHORIZED
```

The structural JSON may contain historical lifecycle/progress values from its planning publication; current consumers must overlay `CURRENT_PROGRAM_STATE.json` and `PROJECT_READ_MODEL.json` rather than treating those historical graph fields as live state.

## 5. Effort semantics

Initial values are planning estimates, not actual timesheets.

- M0 historical completed work = `RETROSPECTIVE_SCOPE_EQUIVALENT_ESTIMATE`;
- current/future work = `CONSUMER_PLANNING_ESTIMATE`;
- project-published task hours supersede earlier planning estimates;
- parent estimate = sum of immediate children;
- never sum parent and descendants together;
- accepted progress uses only project-published accepted/complete scope-equivalent hours;
- Workspace-specific estimates, if any, must remain separately labeled and cannot overwrite project values.

## 6. State and authorization are separate

```text
state = PLANNED
+ authorization = NOT_AUTHORIZED
!= executable work
```

Current execution authority:

```text
CURRENT_ACTIVE_PHASE = MNT-M2
CURRENT_ACTIVE_TASK = NONE
NEXT_TASK = MNT-M2-10
MNT-M2-10 = NOT_YET_AUTHORIZED
```

The dashboard must visually distinguish execution state from authorization state.

## 7. Presentation contract

Top level remains MNT-M0 through MNT-M7. The dashboard must show immediate child tasks only when a phase is expanded. Deeper canonical decomposition remains collapsed by default and expands recursively on demand.

The current/next-safe-action card is a separate concise view and must not dump the whole task tree.

## 8. Staleness

A Workspace snapshot is stale when its observed MoreNumTegra `main` SHA differs from current live `main` or when the project publishes a later current-state overlay/read model that the snapshot has not consumed.

A stale snapshot may remain visible as historical context only when explicitly labeled stale.

## 9. Mutation boundary

Reading/rendering these artifacts does not authorize changes to Green, Vercel, DNS, Search Console, GTM, GA4, Meta, Ads/spend, consent runtime or any external system.
