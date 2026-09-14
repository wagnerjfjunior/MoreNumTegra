# MoreNumTegra — Vercel Git Deployment Validation — 2026-09-14

Status: `PREVIEW_OK / DOCS_FILTER_OK / PRODUCTION_OK`.

Observed on branch `infra/vercel-git-driven-filtered-deploy`:

- `d1e12bbd07194ff4582b72f22c69a7ea7c171ae0` produced a Vercel Preview.
- `6415a11183ac8cd423f733f022a022448a2102f9` added the filter in `vercel.json`.
- `f1e84cfed715dbd15d760c75ade81d0636754326` changed only `docs/` and Vercel reported `Canceled by Ignored Build Step`.
- PR #71 merged as `1df53f0360e093f80687ba84150d3bf736475c9c`; Vercel reported `Deployment has completed` for that merged `main` SHA.

Current result:

```text
AUTO_GIT_PREVIEW = VALIDATED
DOCS_ONLY_FILTER = VALIDATED
AUTO_GIT_PRODUCTION_AFTER_MAIN_MERGE = VALIDATED
GIT_DRIVEN_END_TO_END = VALIDATED
```

The deployment policy is now Git-driven with documentation-only build suppression. HTTP smoke validation of public custom domains remains a separate DNS/domain concern and is not inferred from the Vercel deployment status alone.
