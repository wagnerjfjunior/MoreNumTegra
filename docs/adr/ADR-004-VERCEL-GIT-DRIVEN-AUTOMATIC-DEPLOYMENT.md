# ADR-004 — Vercel Git deployment mode

Status: `ACCEPTED / OPERATIONALLY_VALIDATED`.
Date: 2026-09-14.

Vercel deployments are triggered from Git changes. Runtime changes create deployments. Documentation-only changes are skipped by the `ignoreCommand` configured in `vercel.json`.

Documentation-only paths: `docs/`, `handoffs/`, `bootstrap/`, and `README.md`. Other changed paths continue the build.

Validation evidence:

- branch runtime/config changes produced Vercel Preview deployments;
- documentation-only commits were reported as `Canceled by Ignored Build Step`;
- PR #71 merged as `1df53f0360e093f80687ba84150d3bf736475c9c` and Vercel reported `Deployment has completed` for that merged `main` SHA.

ADR-002 remains the historical record of the earlier manual mode. ADR-004 is the current deployment-trigger policy.
