# MoreNumTegra — Change Traceability Standard v1

Status: `CANONICAL_CANDIDATE` until merged to `main`
Date: `2026-09-25`

## Purpose

No material project decision or mutation may depend on chat history as its only evidence.

The durable reconstruction path is GitHub-first.

A future conversation must be able to answer, from the repository and live providers:

1. what changed;
2. who/what authorized it;
3. which exact source state was changed;
4. which PR/commit carried the change;
5. which checks ran;
6. whether it merged;
7. which Production deployment actually became effective;
8. what passed or failed after publication;
9. what was superseded, rolled back or left residual;
10. what the next safe action is.

## Mandatory traceability contract

For every material runtime, data, SEO, measurement, infrastructure or governance change, preserve all applicable fields:

~~~text
TASK / CHANGE ID
AUTHORITY / AUTHORIZATION
BASE SHA
HEAD SHA
PR NUMBER
CHANGED FILES / SCOPE
VALIDATION / CHECKS
REVIEW FINDINGS
MERGE SHA
DEPLOYMENT ID
DEPLOYMENT STATE
PRODUCTION SOURCE SHA
PRODUCTION VALIDATION
OUTCOME
RESIDUALS
SUPERSESSION / ROLLBACK RELATION
NEXT SAFE ACTION
~~~

## Pull-request rule

Default rule:

`MATERIAL_CHANGE -> BRANCH -> PR -> VALIDATION -> MERGE -> PRODUCTION VALIDATION`

Direct-to-`main` mutation is prohibited as a normal workflow.

A direct commit is allowed only when an exceptional operational reason exists. It must then be reconciled by the next governance PR with:

- exact commit SHA;
- author/date;
- files changed;
- reason;
- whether it produced a deployment;
- whether it changed runtime behavior;
- any follow-up correction.

## Failed and superseded work

Failed, abandoned, duplicate or superseded work must not disappear from the record.

Examples of valid dispositions:

~~~text
MERGED
CLOSED_UNMERGED
SUPERSEDED_BY_PR_<N>
ROLLED_BACK_BY_PR_<N>
FAILED_VALIDATION
PROVIDER_BLOCKED
DOCS_ONLY
NO_RUNTIME_EFFECT
~~~

Do not rewrite history to make an unsuccessful attempt look as if it never happened.

## Current-state pointer rule

A PR history alone is not sufficient for current-state reconstruction.

Whenever a material sequence changes the effective project state, reconcile the current pointers:

- `handoffs/CURRENT.md`;
- `docs/PROJECT_STATUS.md`;
- `docs/NEXT_SAFE_ACTION.md`;
- `docs/BLOCKED_ACTIONS.md` when gates/residuals change;
- `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- `docs/sfjm/PROJECT_READ_MODEL.json`;
- `docs/sfjm/PROGRAM_TASK_GRAPH.json` when current work/task hierarchy changes.

A stale current-state pointer must be classified as drift, not treated as truth.

## Runtime truth

Repository state and Production state are separate.

Every current-runtime claim must resolve live:

~~~text
REPOSITORY_STATE
DEPLOYMENT_STATE
PRODUCTION_STATE
VALIDATION_STATE
~~~

A docs-only `main` SHA may legitimately be newer than the effective Production runtime.

A Vercel `CANCELED` deployment caused by the configured Ignored Build Step is not a runtime failure.

## New-conversation bootstrap rule

A new conversation must not continue from memory alone.

Minimum reconstruction:

1. resolve GitHub `main` live;
2. read `bootstrap/BOOTSTRAP_CANONICO.md`;
3. read `handoffs/CURRENT.md`;
4. read `docs/PROJECT_STATUS.md`;
5. read `docs/NEXT_SAFE_ACTION.md`;
6. read `docs/BLOCKED_ACTIONS.md`;
7. read current SFJM structured state when task/progress is material;
8. resolve the relevant PR/commit/deployment evidence for the specific task;
9. distinguish historical evidence from current state;
10. stop on material contradiction until reconciled.

## Six-month reconstruction test

A change is adequately traced only if, six months later, another conversation can reconstruct it without relying on the original chat transcript.

If the answer to any of these is unknown, traceability is incomplete:

- Why was this changed?
- What exact version was changed?
- What passed before merge?
- What actually reached Production?
- What did we observe after deploy?
- What remained broken or unproven?
- What later superseded it?

## Canonical principle

~~~text
CHAT_CONTEXT != PROJECT_TRUTH
GITHUB_MAIN = INTEGRATED_PROJECT_TRUTH
PR_HISTORY = CHANGE_PROVENANCE
LIVE_PROVIDER_STATE = DEPLOYMENT/PRODUCTION_TRUTH
CURRENT_POINTERS = CURRENT_OPERATIONAL_ENTRYPOINT
~~~
