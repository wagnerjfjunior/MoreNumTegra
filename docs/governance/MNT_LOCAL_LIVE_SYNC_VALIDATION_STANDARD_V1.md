# MoreNumTegra — Local Live Sync Validation Standard V1

Status: CANONICAL_CONSUMER_VALIDATION_OPTION  
Effective date: 2026-09-28  
Owner: MoreNumTegra Product Authority  
Scope: branch/runtime validation when hosted Preview is unavailable, prohibited, rate-limited, or intentionally avoided.

## Purpose

Local Live Sync is a supported validation transport for MoreNumTegra. It allows an exact GitHub branch/head to be rendered locally without creating a Vercel Preview deployment.

It is a validation surface, not a deployment target and not a replacement for Production verification after an authorized merge.

## Canonical flow

```text
GitHub feature branch / exact head
-> authenticated read-only local sync
-> local HTTP server
-> browser/mobile smoke and visual review
-> correction on same branch
-> repeat until accepted
-> authorized merge to main
-> one Git-driven Production deployment
-> post-release Production verification when required
```

## Required properties

A Local Live Sync session is valid evidence only when:

1. the consumer repository and branch are explicit;
2. the exact branch head SHA is observable/recorded;
3. source files are fetched from the canonical GitHub repository, not manually reconstructed;
4. the local server preserves the repository route structure needed by the page under test;
5. cache is disabled or invalidated on branch-head change;
6. browser reload occurs after a new head is synchronized;
7. Production-only destructive or real-lead behavior remains disabled on localhost by the application contract;
8. secrets are not committed, emitted into HTML/JS, or sent to the assistant;
9. repository credentials use least privilege, preferably fine-grained read-only Contents access;
10. local evidence is identified as LOCAL and never reported as Preview or Production evidence.

## Acceptable use

Local Live Sync may satisfy branch-level review for:

- visual/UI inspection;
- responsive/mobile review;
- navigation and interaction smoke;
- local schema/DOM inspection;
- static runtime behavior that does not require Production host semantics;
- media framing;
- gallery behavior;
- local form validation where real submission is intentionally disabled;
- pre-merge correction loops.

## Does not prove

Local Live Sync alone does not prove:

- Vercel Production deployment success;
- canonical-domain behavior;
- DNS/redirect behavior;
- real Form 46 delivery;
- Production GA4/GTM delivery;
- Search Console/indexation;
- external cache/CDN behavior;
- Production performance metrics;
- any integration explicitly gated to `www.moretegra.com.br`.

Those require the corresponding consumer gate after merge when applicable.

## Relationship to Preview

Hosted Preview is not mandatory when the consumer has explicitly prohibited or unavailable Preview and the required review can be performed locally.

In that state:

```text
PREVIEW_UNAVAILABLE_OR_PROHIBITED
!=
VALIDATION_BLOCKED
```

Use Local Live Sync for eligible pre-merge evidence and preserve all post-merge Production gates.

## Current implementation

The current approved local workflow may use the user's existing portable Node runtime and an authenticated read-only GitHub sync process. The local helper itself is tooling; GitHub remains the source of truth.

The helper must not become a new canonical source repository, CMS, deployment origin, or shadow branch.

## Evidence notation

Recommended evidence record:

```text
VALIDATION_SURFACE = LOCAL_LIVE_SYNC
REPOSITORY = wagnerjfjunior/MoreNumTegra
BRANCH = <branch>
HEAD = <immutable SHA>
ROUTE = <local route>
RESULT = PASS | FAIL | PARTIAL
PRODUCTION_PROOF = NOT_CLAIMED
```

## Governance boundary

- GitHub `main` remains the canonical integrated source.
- Feature branches remain proposals until merge.
- Local Live Sync does not authorize merge or deploy.
- Product Authority still controls release.
- A local PASS cannot be promoted to a Production PASS without Production evidence where the consumer contract requires it.
