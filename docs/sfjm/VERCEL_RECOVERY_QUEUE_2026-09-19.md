# Vercel Recovery Queue — MoreNumTegra

Status: `ACTIVE / PROVIDER_BLOCKED`  
Updated: `2026-09-19`

## Purpose

Preserve the exact ordered actions that must resume when the current Vercel `build-rate-limit` block clears. This runbook does not authorize artificial commits, deployment drift or automatic merging of later runtime PRs.

## Current identities

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CURRENT_MAIN_BEFORE_THIS_DOCS_PR = df17eb027060551589514d69ea9211031524d8d4

APPROVED_PENDING_RUNTIME_SHA = 353f4a5dba058f2fb60fd4001128f8c857cd6fce
APPROVED_PENDING_RUNTIME_SCOPE = PR #132 semantic on-page SEO
APPROVED_PENDING_RUNTIME_DEPLOYMENT = PROVIDER_BLOCKED / build-rate-limit

M5_01_REMEDIATION_PR = #133
M5_01_REMEDIATION_HEAD = 5e054b9799159364139be5fce757cc06133269b6
M5_01_REMEDIATION_STATE = READY / CLEAN / NOT_MERGED
```

## Recovery sequence

### R1 — Recheck provider state

Resolve the live Vercel/GitHub deployment status for `353f4a5d...`.

Do not infer release from elapsed time and do not create a new commit merely to obtain a build.

### R2 — Deploy the approved pending runtime

When the provider block clears, deploy/redeploy exactly:

`353f4a5dba058f2fb60fd4001128f8c857cd6fce`

Do not substitute the later docs-only `main` SHA as the runtime target.

### R3 — Production smoke for PR #132

Validate on `https://www.moretegra.com.br/` and the three exact-project routes:

- HTTP/runtime availability;
- Home title/H1 and `Escolha Tegra` semantic update;
- CAPIITOLO H1, `Giardino (Garden)`, 3-vaga type fact and Chácara Klabin content;
- Elo Duo title/H1;
- Ária title/H1;
- canonical/robots;
- favicon baseline;
- floating CTA/WhatsApp;
- Form 46 render and contract presence;
- no obvious mobile horizontal overflow or first-fold regression;
- no unexpected console/network regression where tooling permits.

Do not send a real Form 46 lead during smoke unless a separately safe QA submission is explicitly authorized.

### R4 — Record deployment state

Only after R3 passes:

```text
DEPLOYMENT_STATE = SUCCESS
PRODUCTION_STATE = UPDATED_TO_353f4a5d...
VALIDATION_STATE = PR132_PRODUCTION_SMOKE_PASS
```

If R3 fails, stop and classify the failure before touching PR #133.

### R5 — Fresh gate PR #133

After PR #132 production validation:

- resolve live `main`;
- resolve PR #133 exact head;
- require `mergeable = true / clean`;
- require `behind main = 0` or reconcile without importing unrelated runtime drift;
- require all repository checks success;
- confirm diff remains Home-only HTML/CSS for mobile nav + skip link.

PR #133 merge remains a separate lifecycle gate. This runbook does not pre-authorize a merge if its scope/head changes.

### R6 — PR #133 release and smoke

After a valid merge gate, the resulting new runtime SHA must be deployed and validated for:

- mobile Home primary navigation visible and touch-usable below 760px;
- no horizontal page overflow introduced by the scrollable nav;
- skip link appears on keyboard focus and moves focus to `#conteudo`;
- desktop navigation preserved;
- Home H1/canonical/robots/Form 46 unchanged.

### R7 — M5-01 closure work

After the #133 runtime is proven:

- mark F01/F02 resolved only with matching production evidence;
- adjudicate F10/F11 color-contrast remediation;
- finish remaining device/browser residuals;
- only then decide whether `MNT-M5-01 = COMPLETE_CANDIDATE`.

### R8 — M5-02 gate

Do not start `MNT-M5-02 — Core Web Vitals/performance baseline` until M5-01 reaches its own accepted/closed gate or governance explicitly supersedes that sequence.

## Hard stops

- no artificial deployment commit;
- no non-main production promotion;
- no merge of PR #133 while its exact head/scope is unresolved;
- no Form 46/CRM contract change from this recovery queue;
- no invented production SHA;
- `PROVIDER_BLOCKED` is not a code failure.
