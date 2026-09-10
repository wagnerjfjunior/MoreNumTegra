# MoreNumTegra — SFJM Consumer Entrypoint

Status: `CANONICAL_WHEN_MERGED_TO_MAIN`.

This directory exposes project-owned structured state for read-only SFJM Workspace consumption.

## Entrypoints

1. `docs/sfjm/PROJECT_READ_MODEL.json` — project summary, progress, issues/evidence and pointers.
2. `docs/sfjm/CURRENT_PROGRAM_STATE.json` — current lifecycle/progress overlay.
3. `docs/sfjm/PROGRAM_TASK_GRAPH.json` — structural MNT-M0..MNT-M7 hierarchy and planning hours.
4. `docs/sfjm/PROGRAM_TASK_GRAPH.md` — consumption/presentation contract.
5. `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md` — human WBS.

## Resolution rule

A consumer must resolve `wagnerjfjunior/MoreNumTegra@main` live and record observed SHA/time before current-state claims.

Then read, at minimum:

1. `bootstrap/BOOTSTRAP_CANONICO.md`;
2. `handoffs/CURRENT.md`;
3. `docs/PROJECT_STATUS.md`;
4. `docs/NEXT_SAFE_ACTION.md`;
5. `docs/BLOCKED_ACTIONS.md`;
6. `docs/sfjm/PROJECT_READ_MODEL.json`;
7. `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
8. `docs/sfjm/PROGRAM_TASK_GRAPH.json` when WBS/task detail is needed.

## State precedence

Current lifecycle state/progress comes from `CURRENT_PROGRAM_STATE.json`. Structural hierarchy/task IDs/planning hours come from `PROGRAM_TASK_GRAPH.json`. `PROJECT_READ_MODEL.json` is the consumer summary tying both together.

A later canonical current-state overlay can supersede lifecycle fields captured in an older structural graph, but cannot authorize a consumer to invent or modify hierarchy/hours.

## Authority boundary

```text
MORENUMTEGRA MAIN = PROJECT TRUTH
SFJM WORKSPACE = READ-ONLY DERIVED REPRESENTATION
```

Workspace must not invent tasks, hours, status, authorization or evidence. A snapshot whose observed SHA differs from live MoreNumTegra main is stale.
