# MoreNumTegra — SFJM Program Task Graph Contract

Status: `CANDIDATE_IN_PR` until merged into `main`  
Machine-readable source: `docs/sfjm/PROGRAM_TASK_GRAPH.json`  
Human WBS: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`

## 1. Authority

MoreNumTegra owns its project identity, objective, WBS hierarchy, task state, authorization state, project-published hours, evidence references and next-safe-action semantics.

SFJM Workspace may consume and render this contract. It must not create project tasks, infer missing hours, change status, flatten hierarchy or transfer Product Authority.

```text
MORENUMTEGRA CANONICAL MAIN
→ PROJECT TASK GRAPH
→ SFJM WORKSPACE READ MODEL
→ DASHBOARD / WBS PRESENTATION
```

`WORKSPACE_REPRESENTATION != MORENUMTEGRA_AUTHORITY`

## 2. Consumer resolution order

A current-state consumer must:

1. resolve `wagnerjfjunior/MoreNumTegra@main` live;
2. record the observed main SHA and observation timestamp;
3. read `bootstrap/BOOTSTRAP_CANONICO.md`;
4. read `handoffs/CURRENT.md`;
5. read `docs/PROJECT_STATUS.md`;
6. read `docs/NEXT_SAFE_ACTION.md`;
7. read `docs/BLOCKED_ACTIONS.md`;
8. read `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
9. read the WBS/evidence sources referenced by the graph when needed;
10. fail closed on material conflict rather than silently preferring the dashboard snapshot.

## 3. Required graph semantics

The machine-readable graph exposes:

- project ID/name/repository;
- objective and objective source;
- program ID/name/framework/provider pin;
- total forecast hours;
- accepted scope-equivalent hours;
- remaining forecast hours;
- progress percentage and calculation basis;
- current phase/work package/task;
- next safe action and source;
- milestones/phases;
- child tasks;
- task hours;
- accepted hours;
- effort class;
- state;
- authorization state when material;
- canonical source pointers;
- consumer rendering rules.

Future subtasks may be expressed recursively beneath tasks. The consumer must preserve recursive hierarchy and collapse deeper decomposition by default.

## 4. Effort rules

Initial values are MoreNumTegra planning estimates, not actual timesheets.

```text
M0 historical complete work
= RETROSPECTIVE_SCOPE_EQUIVALENT_ESTIMATE

future/current forecast
= CONSUMER_PLANNING_ESTIMATE
```

Rules:

- project-published canonical task hours supersede earlier planning estimates;
- parent estimate = sum of immediate children;
- never sum parent and descendants together;
- accepted progress uses only accepted/complete scope-equivalent task hours;
- active effort is not automatically accepted;
- Workspace-specific forecast, if ever added, must remain separately labeled and cannot overwrite the project graph.

## 5. State and authorization are separate

A task may be planned but not authorized for execution.

Examples:

```text
state = PLANNED
+ authorization = NOT_AUTHORIZED
!= executable work

state = ACTIVE
+ authorization = DOCUMENTATION_ONLY_AUTHORIZED
!= runtime mutation authority
```

The dashboard should visually distinguish execution state from authorization state.

## 6. Presentation contract

Top-level WBS view:

```text
MNT-M0  V1 Foundation & Commercial Production
MNT-M1  RESF Adoption & Existing-State Reconciliation
MNT-M2  Measurement Foundation & Consent
MNT-M3  Intelligence, Product Truth & Search Contract
MNT-M4  IA, Content, Schema, GEO/AEO & Linking
MNT-M5  UX, Performance, Conversion, Lead & CRM
MNT-M6  Attribution & Paid Media Readiness
MNT-M7  QA, Release, Observability & Learning Loop
```

The dashboard must not display all descendants in the main milestone list. Expand one parent manually to reveal immediate children and recurse only on demand.

The current/next-safe-action card is a separate concise view and must not dump the whole task tree.

## 7. Staleness

A Workspace snapshot becomes stale when the observed MoreNumTegra `main` SHA differs from current live `main`, or when a referenced project-state source materially changes.

A stale snapshot may remain visible as historical context only if clearly labeled; it must not be presented as current.

## 8. Initial progress baseline

At program creation:

```text
forecast total = 1240h
accepted scope-equivalent = 160h
remaining forecast = 1080h
accepted progress = 12.90%
current phase = MNT-M1
```

These values must be recalculated from the graph after future canonical state/hour changes; they must not be independently hardcoded by consumers.
