# MoreNumTegra — stale PR reconciliation — 2026-09-15

Canonical authority: `wagnerjfjunior/MoreNumTegra` / `main`.

Purpose: close the remaining stale pull-request queue created before the Vercel deployment-gating hardening and before the CAPIITOLO/Elo Duo production release, without replaying obsolete branches over current `main`.

## Disposition

- PR #84 — floating CTA / consent coordination: the still-useful runtime behavior is ported onto the current-main reconciliation branch. The stale branch itself must not be merged.
- PR #86 — M4 close / M5 start: superseded by later RESF/M3/M4 reconciliation work and subsequent canonical runtime releases. Do not merge the stale lifecycle snapshot.
- PR #88 — RESF M3/M4 conformance: preserved as historical audit evidence, but its proposed `PROJECT_STATUS` / `NEXT_SAFE_ACTION` mutations are stale relative to current production. Do not merge the old branch wholesale.
- PR #51 — recursive WBS: preserved as historical/planning evidence. Its task-graph snapshot is far behind current `main`; do not overwrite the current graph from the stale branch.

## Runtime fixes retained in this reconciliation

1. project-card exact-page links are normalized to one `Ver empreendimento →` link per eligible card, eliminating the duplicate CAPIITOLO link;
2. the floating CTA dock is coordinated with the consent banner so it moves above the banner and returns after the banner closes;
3. preview-only consent QA behavior remains isolated from production consent persistence/measurement.

## Deployment policy

This reconciliation is intentionally one controlled runtime release. After merge, `main` is authoritative and the stale PRs are closed as superseded rather than re-run individually through Vercel.
