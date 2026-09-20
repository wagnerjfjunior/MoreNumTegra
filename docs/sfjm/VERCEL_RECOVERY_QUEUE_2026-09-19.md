# Vercel Recovery Queue — MoreNumTegra

Status: `ACTIVE / DEPLOYMENT_PENDING / HISTORICAL_RATE_LIMIT_NOT_REPROVEN`  
Updated: `2026-09-20`

## Purpose

Preserve the exact ordered actions that must resume when the approved runtime can be safely redeployed after rechecking the historical Vercel `build-rate-limit` state. This runbook does not authorize artificial commits, deployment drift or automatic merging of later runtime PRs.

## Current identities

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CURRENT_MAIN_BEFORE_THIS_DOCS_PR = 50cc466e778feb2de38a5241b4b2820c6b1ea016

APPROVED_PENDING_RUNTIME_SHA = 353f4a5dba058f2fb60fd4001128f8c857cd6fce
APPROVED_PENDING_RUNTIME_SCOPE = PR #132 semantic on-page SEO
HISTORICAL_STATUS_FOR_APPROVED_RUNTIME = FAILURE / build-rate-limit
CURRENT_MORENUMTEGRA_RATE_LIMIT = NOT_REPROVEN
CURRENT_PRODUCTION_DEPLOYMENT = dpl_H6KtyTDQHHAaWxx4FXHSUJBk97HK / READY
CURRENT_PRODUCTION_SHA = 82fd666596b283d1ff5645776ba892abe27885a6
CURRENT_PRODUCTION_CONTENT = CONFIRMED_PRE_PR132 / HTTP_200

M5_01_F01_F02_PR = #133
M5_01_F01_F02_HEAD = 1a2401a2105e4fba62a7833754987c8598a6ce58
M5_01_F01_F02_STATE = READY / CLEAN / NOT_MERGED

M5_01_F10_F11_F13_PR = #135
M5_01_F10_F11_F13_HEAD = 08b132044ebbec49c0f8f978eff69eb76aac49fb
M5_01_F10_F11_F13_STATE = READY / CLEAN / NOT_MERGED / STACKED_ON_133

M5_01_F15_PR = #145
M5_01_F15_HEAD = 1bb048701d6eb97404ae7ca58c5f09cf4adf34fe
M5_01_F15_STATE = READY / CLEAN / NOT_MERGED / STACKED_ON_135 / LOCAL_CANDIDATE_PASS

M5_01_F17_F18_PR = #148
M5_01_F17_F18_HEAD = 508ebf55f4ea96261d8eeb4dc753158d7c0ec950
M5_01_F17_F18_STATE = READY / NOT_MERGED / LOCAL_CANDIDATE_PASS

M5_01_F12_F14_F16_PR = #137
M5_01_F12_F14_F16_HEAD = d8ad43e1c4cd16933576785fab2ecf01d70195e7
M5_01_F12_F14_F16_STATE = READY / CLEAN / NOT_MERGED / LOCAL_CANDIDATE_PASS

M5_01_F03_STATE = REGRESSION_REOPENED / NO_RUNTIME_CANDIDATE
M5_01_F19_STATE = OPEN / NO_RUNTIME_CANDIDATE
```

## Recovery sequence

### R1 — Recheck provider state

Resolve the live Vercel/GitHub deployment status for `353f4a5d...`.

The 2026-09-20 revalidation proved production is still `82fd666...` / `dpl_H6K...` READY and the historical `353f4a5d...` Git status remains `failure / build-rate-limit`. A controlled retry did not create a new MoreNumTegra deployment, so a current project-specific rate-limit block is not proven.

Do not infer release from elapsed time and do not create a new commit merely to obtain a build.

Direct authenticated production evidence already confirms the current canonical host is still pre-PR #132. See `docs/sfjm/PR132_PRODUCTION_NOT_UPDATED_EVIDENCE_2026-09-19.md`.

### R2 — Deploy the approved pending runtime

When a controlled production redeploy is available and no current provider block is observed, deploy/redeploy exactly:

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

### R9 — Fresh gate PR #145

After PR #135 is merged, deployed and smoke-tested:

- resolve PR #145 exact head against the then-current main;
- preserve the single-purpose F15 scope;
- require clean mergeability and successful checks;
- confirm 125% retains the dock and 200% hides it in production-equivalent reflow.

### R10 — PR #145 release and smoke

Validate:
- ordinary zoom keeps the floating dock;
- 200% reflow hides the dock only when required;
- Form 46 fields and submit action remain unobstructed;
- no loss of in-content conversion path.

### R11 — Fresh gate PR #148

After PR #145 is merged, deployed and smoke-tested:

- resolve PR #148 exact head against the then-current main;
- preserve the single-file shared exact-project CSS scope;
- require clean mergeability and applicable repository validation;
- confirm Elo Duo and Ária retain the dock at ordinary/150% zoom and hide it only in short reflow.

### R12 — PR #148 release and smoke

Validate:
- Elo Duo fixed actions remain available at ordinary/150% zoom;
- Ária fixed actions remain available at ordinary/150% zoom;
- both hide fixed actions at 200%/short reflow;
- Form 46/footer content remains unobstructed;
- no loss of in-content conversion paths.

### R13 — Fresh gate PR #137

After the shared exact-project remediation release is proven:

- resolve PR #137 exact head against the then-current main;
- require clean mergeability and successful checks;
- confirm the diff remains bounded to CAPIITOLO editorial ARIA/mobile-layout work plus the CAPIITOLO-specific runtime fixed-dock reflow rule.

### R14 — PR #137 release and smoke

Validate:
- ArrowLeft/ArrowRight/Home/End on both CAPIITOLO tablists;
- one tab in each list remains in the tab order;
- active `aria-selected`, `aria-controls` and panel `aria-labelledby` remain synchronized;
- tab panels expose visible focus when reached;
- content, product facts and Form 46 contract remain unchanged;
- 150%/ordinary zoom retains the fixed CAPIITOLO actions;
- 200%/short reflow hides the fixed actions;
- Form 46 remains unobstructed at 200%.

### R15 — M5-01 closure work

After #133, #135, #145, #148 and #137 runtimes are individually proven:

- mark F01/F02/F10/F11/F13/F15/F17/F12/F14/F16 resolved only with matching release evidence;
- finish remaining device/browser residuals;
- only then decide whether `MNT-M5-01 = COMPLETE_CANDIDATE`.

### R16 — M5-02 gate

Do not start `MNT-M5-02 — Core Web Vitals/performance baseline` until M5-01 reaches its own accepted/closed gate or governance explicitly supersedes that sequence.

## Hard stops

- no artificial deployment commit;
- no non-main production promotion;
- no merge of PR #133, #135, #145, #148 or #137 while the relevant exact head/scope is unresolved;
- no Form 46/CRM contract change from this recovery queue;
- no invented production SHA;
- `PROVIDER_BLOCKED` is not a code failure.
