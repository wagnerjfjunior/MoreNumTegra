# MoreNumTegra — SFJM Consumer Entrypoint

Status: `CANDIDATE_IN_PR` until merged into `main`.

This directory exposes project-owned structured state for read-only SFJM Workspace consumption.

## Primary entrypoint

`docs/sfjm/PROJECT_READ_MODEL.json`

The read model exposes project identity, objective, current program, phase summary, progress, current task/next safe action, issues/risks, evidence and pointers to the full task graph.

## Full task graph

`docs/sfjm/PROGRAM_TASK_GRAPH.json`

Human contract:
`docs/sfjm/PROGRAM_TASK_GRAPH.md`

Human WBS:
`docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`

## Resolution rule

A consumer must resolve `wagnerjfjunior/MoreNumTegra@main` live before current-state claims and record the observed SHA/time itself.

Then read, at minimum:

1. `bootstrap/BOOTSTRAP_CANONICO.md`;
2. `handoffs/CURRENT.md`;
3. `docs/PROJECT_STATUS.md`;
4. `docs/NEXT_SAFE_ACTION.md`;
5. `docs/BLOCKED_ACTIONS.md`;
6. `docs/sfjm/PROJECT_READ_MODEL.json`;
7. `docs/sfjm/PROGRAM_TASK_GRAPH.json` when WBS/task detail is needed.

## Authority boundary

```text
MORENUMTEGRA MAIN = PROJECT TRUTH
SFJM WORKSPACE = READ-ONLY DERIVED REPRESENTATION
```

Workspace must not invent tasks, hours, status, authorization or evidence. A cached/snapshot representation whose observed SHA differs from live MoreNumTegra main is stale.
