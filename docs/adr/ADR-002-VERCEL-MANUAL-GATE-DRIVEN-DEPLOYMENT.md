# ADR-002 — Vercel Manual Gate-Driven Deployment

- Status: `ACCEPTED / OPERATIONALLY_VALIDATED`
- Date: `2026-09-10`
- Project: `MoreNumTegra`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Decision authority: Product Authority authorization in project conversation on 2026-09-10
- Canonical base at decision: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`
- Acceptance anchor: PR `#42` / merge `308470e786a10970b23763cf56f81c3bb92bbe5f`

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

A Vercel Deploy Hook for branch `main` was created by the Product Authority in the Vercel project UI. Its URL is intentionally NOT stored in GitHub because possession of the hook URL permits triggering deployments.

The hook is a deployment trigger, not a source of project truth. GitHub `main` remains canonical.

The Product Authority executed the retained hook manually on 2026-09-10. GitHub then exposed Vercel status `success` for canonical SHA `347b62298d30ba3567a76d3f48a815e9f0f5b26c`, supporting:

```text
MANUAL_HOOK_EXECUTION = VALIDATED
HOOK_SECRET = NOT_STORED_IN_GITHUB
```

## Automatic-deployment validation

Validation evidence observed during the change lifecycle:

1. commits on the candidate branch after `git.deploymentEnabled = false` produced no Vercel check-runs/statuses automatically;
2. after PR #42 merged, merge SHA `308470e786a10970b23763cf56f81c3bb92bbe5f` likewise showed no Vercel commit status or pull-request workflow run attributable to an automatic Git deployment;
3. subsequent repository-only reconciliation commits also did not create Vercel status entries.

Therefore the supportable project state is:

```text
AUTO_GIT_DEPLOYMENT = DISABLED / VALIDATED_BY_OBSERVATION
MANUAL_DEPLOY_HOOK = VALIDATED
VERCEL_DEPLOYMENT_MODE = MANUAL_GATE_DRIVEN
```

This evidence is operational, not a guarantee against future Vercel platform behavior changes. Revalidate if the Vercel integration, project configuration or `vercel.json` policy changes.

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

## Revalidation criteria

Revalidate this ADR if any of the following changes materially:

- `vercel.json` Git deployment policy;
- Vercel Git integration settings;
- repository/project linkage;
- Deploy Hook rotation/recreation;
- Vercel plan or platform behavior affecting deployment triggers.
