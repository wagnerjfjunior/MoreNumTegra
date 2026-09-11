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

`CURRENT_PROGRAM_STATE.json` is the project-owned lifecycle/progress overlay. It exists so a later canonical lifecycle event can update current state without forcing consumers to infer status from an older structural snapshot.

Precedence:

```text
CURRENT LIFECYCLE STATE / PROGRESS
= CURRENT_PROGRAM_STATE.json

PROJECT SUMMARY
= PROJECT_READ_MODEL.json

HIERARCHY / TASK IDs / PLANNING HOURS
= PROGRAM_TASK_GRAPH.json
```

A later current-state overlay may supersede lifecycle-state fields captured by an earlier graph snapshot. It may not silently rename, create or delete structural tasks or change planning hours without a corresponding project-owned structural update.

## 4. Effort semantics

Initial values are planning estimates, not actual timesheets.

- M0 historical completed work = `RETROSPECTIVE_SCOPE_EQUIVALENT_ESTIMATE`;
- current/future work = `CONSUMER_PLANNING_ESTIMATE`;
- project-published task hours supersede earlier planning estimates;
- parent estimate = sum of immediate children;
- never sum parent and descendants together;
- accepted progress uses only project-published accepted/complete scope-equivalent hours;
- Workspace-specific estimates, if any, must remain separately labeled and cannot overwrite project values.

After MNT-M1 closure:

```text
forecast total = 1240h
accepted scope-equivalent = 256h
remaining forecast = 984h
program progress = 20.65%
```

## 5. State and authorization are separate

```text
state = PLANNED
+ authorization = NOT_AUTHORIZED
!= executable work
```

After PR #39:

```text
MNT-M1 = COMPLETE
MNT-M2 = PLANNED_NOT_AUTHORIZED / NEXT
CURRENT_ACTIVE_PHASE = NONE
```

The dashboard must visually distinguish execution state from authorization state.

## 6. Presentation contract

Top level remains MNT-M0 through MNT-M7. The dashboard must show immediate child tasks only when a phase is expanded. Deeper canonical decomposition remains collapsed by default and expands recursively on demand.

The current/next-safe-action card is a separate concise view and must not dump the whole task tree.

## 7. Staleness

A Workspace snapshot is stale when its observed MoreNumTegra `main` SHA differs from current live `main` or when the project publishes a later current-state overlay/read model that the snapshot has not consumed.

A stale snapshot may remain visible as historical context only when explicitly labeled stale.

## 8. Mutation boundary

Reading/rendering these artifacts does not authorize changes to Green, Vercel, DNS, Search Console, GTM, GA4, Meta, Ads/spend, consent runtime or any external system.

## 9. Recursive WBS decomposition

The structural graph may contain recursive `children` arrays below a task when additional granularity materially improves execution visibility. Tasks that do not benefit from further decomposition are explicitly marked `ATOMIC_NO_FURTHER_DECOMPOSITION_PLANNED`.

Consumer rendering rule:

```text
phase
  -> task
     -> child
        -> child ... when present
```

The dashboard should keep phase/task rows compact by default and expand descendants recursively on demand. Hours must roll up from immediate children without parent/descendant double counting. Planning weights are published at phase/task/subtask level for program, phase and parent contexts.

`RECURSIVE WBS DETAIL != EXECUTION AUTHORIZATION`.

Human-readable detailed decomposition: `docs/roadmap/MNT_RESF_WBS_RECURSIVE_DECOMPOSITION.md`.
