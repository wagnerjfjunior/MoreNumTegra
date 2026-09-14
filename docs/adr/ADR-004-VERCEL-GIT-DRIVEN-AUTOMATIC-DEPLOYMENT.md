# ADR-004 — Vercel Git-driven automatic deployment

- Status: `CANDIDATE_IN_PR` until integrated in `main`; `ACCEPTED` when present in resolved `main`
- Date: `2026-09-14`
- Project: `MoreNumTegra`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Decision authority: Product Authority authorization in project conversation on `2026-09-14`
- Canonical base: `f21d0bb661cdd2a9fdeff7032ce663367d225e01`
- Supersedes deployment-trigger policy in ADR-002.

## Context

ADR-002 disabled automatic Git-triggered Vercel deployments while Vercel was primarily a homologation surface. Vercel is now being adopted as an operational hosting surface through custom domains, so requiring a manual deployment step creates avoidable drift between GitHub `main` and the deployed site.

## Decision

Adopt:

```text
VERCEL_DEPLOYMENT_MODE = GIT_DRIVEN_AUTOMATIC
GITHUB_MAIN = CANONICAL_SOURCE
FEATURE_BRANCH -> VERCEL_PREVIEW
MERGE_TO_MAIN -> VERCEL_PRODUCTION
```

The project removes `git.deploymentEnabled = false` from `vercel.json` and returns deployment triggering to the Vercel Git integration.

## Operational flow

```text
feature branch
-> Git push
-> Vercel Preview
-> validation
-> authorized merge to main
-> Vercel Production
-> smoke validation
```

## Relationship to ADR-002

ADR-002 remains valid historical evidence for the period in which manual gate-driven deployment was intentionally used. ADR-004 supersedes only the current trigger policy.

```text
ADR-002 MANUAL_GATE_DRIVEN = HISTORICAL / SUPERSEDED
ADR-004 GIT_DRIVEN_AUTOMATIC = CURRENT POLICY WHEN MERGED
```

## Build-capacity trade-off

Automatic Git deployment can consume build capacity for documentation-only commits. A filtered ignored-build policy is desirable but is not implemented by this ADR. Do not claim docs-only filtering until separately configured and validated.

## Boundaries

This ADR does not authorize apex DNS migration, Cloudflare proxy activation, final SEO canonical changes, analytics changes, or automatic merge. GitHub `main` remains canonical.

## Validation

After this PR is opened, validate:

1. a branch runtime change can create a Vercel Preview;
2. the Preview corresponds to the intended Git commit;
3. after an explicitly authorized merge, Vercel creates the Production deployment automatically;
4. the normal path no longer requires a manual deployment trigger.

Until validated:

```text
POLICY_CONFIGURED = YES
GIT_DRIVEN_END_TO_END_VALIDATED = NO
```
