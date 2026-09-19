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

M5_01_F01_F02_PR = #133
M5_01_F01_F02_HEAD = 5e054b9799159364139be5fce757cc06133269b6
M5_01_F01_F02_STATE = READY / CLEAN / NOT_MERGED

M5_01_F10_F11_F13_PR = #135
M5_01_F10_F11_F13_HEAD = 08b132044ebbec49c0f8f978eff69eb76aac49fb
M5_01_F10_F11_F13_STATE = READY / CLEAN / NOT_MERGED / STACKED_ON_133

M5_01_F12_PR = #137
M5_01_F12_HEAD = ccffe32e4197c01264656b30279f01ff8009cd0e
M5_01_F12_STATE = READY / CLEAN / NOT_MERGED
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

### R7 — Fresh gate PR #135

After #133 is merged, deployed and smoke-tested:

- re-resolve PR #135 exact head;
- reconcile its stacked base to the new main without widening scope;
- require clean mergeability and successful checks;
- confirm scope remains Home CSS-only contrast remediation for F10/F11/F13.

### R8 — PR #135 release and smoke

Validate:
- stage-badge contrast treatments;
- light-footer text contrast treatment;
- small gold helper-text contrast;
- no semantic stage/content changes;
- no visual regression in Home hierarchy.

### R9 — Fresh gate PR #137

After the previous Home remediation release is proven:

- resolve PR #137 exact head against the then-current main;
- require clean mergeability and successful checks;
- confirm the diff remains CAPIITOLO editorial ARIA/keyboard behavior only.

### R10 — PR #137 release and smoke

Validate:
- ArrowLeft/ArrowRight/Home/End on both CAPIITOLO tablists;
- one tab in each list remains in the tab order;
- active `aria-selected`, `aria-controls` and panel `aria-labelledby` remain synchronized;
- tab panels expose visible focus when reached;
- content, product facts and Form 46 remain unchanged.

### R11 — M5-01 closure work

After #133, #135 and #137 runtimes are individually proven:

- mark F01/F02/F10/F11/F13/F12 resolved only with matching release evidence;
- finish remaining device/browser residuals;
- only then decide whether `MNT-M5-01 = COMPLETE_CANDIDATE`.

### R12 — M5-02 gate

Do not start `MNT-M5-02 — Core Web Vitals/performance baseline` until M5-01 reaches its own accepted/closed gate or governance explicitly supersedes that sequence.

## Hard stops

- no artificial deployment commit;
- no non-main production promotion;
- no merge of PR #133, #135 or #137 while the relevant exact head/scope is unresolved;
- no Form 46/CRM contract change from this recovery queue;
- no invented production SHA;
- `PROVIDER_BLOCKED` is not a code failure.
