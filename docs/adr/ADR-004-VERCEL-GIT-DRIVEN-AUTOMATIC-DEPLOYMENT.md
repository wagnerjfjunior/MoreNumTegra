# ADR-004 — Vercel Git deployment mode

Status: candidate.
Date: 2026-09-14.

Vercel deployments are triggered from Git changes. Runtime changes create deployments. Documentation-only changes are skipped by the `ignoreCommand` configured in `vercel.json`.

Documentation-only paths: `docs/`, `handoffs/`, `bootstrap/`, and `README.md`. Other changed paths continue the build.

Observed on this branch: Preview triggering works and a documentation-only commit was canceled by the Ignored Build Step. Production behavior remains to be checked after merge.

ADR-002 remains the historical record of the earlier manual mode.
