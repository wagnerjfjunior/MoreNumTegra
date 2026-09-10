# ADR-002 — Vercel Manual Gate-Driven Deployment

- Status: `CANDIDATE_IN_PR`; becomes `ACCEPTED` only after merge to `main`
- Date: `2026-09-10`
- Project: `MoreNumTegra`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Decision authority: Product Authority authorization in project conversation on 2026-09-10
- Canonical base at decision: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`

## Context

Automatic Vercel deployments were consuming build capacity for every Git push/commit, including documentation-only changes. The Hobby plan exposed a `build-rate-limit` condition during current project work.

The project still requires Vercel as an intermediate Preview/public homologation environment, but it does not require every commit to generate a deployment.

## Decision

Adopt:

```text
VERCEL_DEPLOYMENT_MODE = MANUAL_GATE_DRIVEN
```

Automatic Git-triggered deployments are disabled project-side through:

```json
{
  "git": {
    "deploymentEnabled": false
  }
}
```

in `vercel.json`.

The existing rewrite and response headers remain unchanged.

## Manual trigger

A Vercel Deploy Hook for branch `main` has been created by the Product Authority in the Vercel project UI. Its URL is intentionally NOT stored in GitHub because possession of the hook URL permits triggering deployments.

The hook is a deployment trigger, not a source of project truth. GitHub `main` remains canonical.

Until a controlled test is completed, preserve:

```text
HOOK_CREATED_USER_REPORTED != HOOK_EXECUTION_VALIDATED
```

## Operational flow

```text
branch / commits / documentation
-> no automatic Vercel deployment
-> task/PR reaches validation gate
-> run only the required manual Vercel deployment
-> validate resulting artifact
-> Ready / merge according to project governance
-> when stable main homologation is needed, trigger manual main deployment
-> validate https://morenumtegra.vercel.app/
-> Green publication remains a separate gate
```

Manual deployment does not authorize Green production, tracking, DNS, Search Console or Ads changes.

## Why this decision

- reduces unnecessary builds;
- avoids burning Hobby build-rate capacity on documentation-only commits;
- preserves Vercel Preview/homologation as a quality gate;
- keeps GitHub `main` as canonical source;
- keeps deployment timing explicit and auditable.

## Security / secret handling

- do not commit the Deploy Hook URL;
- do not paste the hook URL into public issue/PR comments;
- if exposed, revoke/delete the hook and create a new one;
- no Vercel token is required in client-delivered HTML/CSS/JS.

## Relationship to Technical Baseline V2.2

This ADR changes only the **trigger policy** for Vercel deployments. It does not change the environment semantics from `TECHNICAL_BASELINE_V2_2.md`:

```text
VERCEL_PREVIEW != VERCEL_PRODUCTION_HOMOLOGATION
VERCEL_PRODUCTION_HOMOLOGATION != GREEN_COMMERCIAL_PRODUCTION
MAIN_MERGED != GREEN_PUBLISHED
```

The V2.2 sequence remains valid, with Preview/Production deployments initiated manually at the appropriate gate rather than automatically on every Git event.

## Validation criteria

The decision is operationally validated only when both are observed:

1. a subsequent Git commit/push does not create an automatic Vercel deployment;
2. the retained Deploy Hook can still create the intended manual deployment when explicitly triggered.

If either condition fails, do not claim `MANUAL_GATE_DRIVEN_VALIDATED`; investigate before relying on the policy.
