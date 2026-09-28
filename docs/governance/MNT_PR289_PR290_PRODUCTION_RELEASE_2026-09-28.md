# PR #289 + PR #290 — Production release record — 2026-09-28

## Scope

Authorized scope only:

- PR #289 — Château Jardin refinement;
- PR #290 — Higienópolis regional discovery page.

No Hosted Preview was created. Local Live Sync was intentionally skipped for this publication cycle.

## Authority

Product Authority authorization in the 2026-09-28 publication instruction:

- prepare/correct;
- merge;
- publish;
- resolve Git-driven deployment;
- validate both Production URLs;
- update traceability/current-state records.

## Repository state

```text
BASE_MAIN_AT_RELEASE_START = 017b98e2aebe8299db2081a9d0b540017153cbfb
PR_289_HEAD = db90790fc646d77fb3106b2c1eefc5d08558b936
PR_289_MERGE_SHA = 9286601b59ef46912283e65b02a15e091fb12c19
PR_290_HEAD = 9a2fb4645e52e92df7600a7105385fa9518c98da
PR_290_MERGE_SHA = 89de7ae56b91d91d969e2b14101c33492cdf2402
RUNTIME_MAIN_AFTER_RELEASE = 89de7ae56b91d91d969e2b14101c33492cdf2402
```

Merge order:

1. PR #289;
2. PR #290.

PR #289 changed only:

- `docs/search/MNT_CHATEAU_JARDIN_RESF_C17_FACT_PACK_2026-09-28.md`;
- `src-greenn/empreendimentos/chateau-jardin/index.html`.

PR #290 changed only:

- `docs/search/MNT_HIGIENOPOLIS_REGION_PILOT_EVIDENCE_2026-09-28.md`;
- `src-greenn/preview/index.html`;
- `src-greenn/preview/runtime.js`;
- `src-greenn/regioes/higienopolis/index.html`;
- `vercel.json`.

No unrelated runtime files were included in this release sequence.

## Pre-merge / exact-head validation evidence

GitHub Actions for both exact heads reported `failure`, but the jobs did not obtain runners:

```text
runner_id = 0
runner_name = ""
steps = 0
```

Therefore those workflow records are classified as:

```text
RUNNER_ALLOCATION_FAILURE
EXECUTED_TEST_RESULT = NOT_AVAILABLE
```

They are not treated as PASS, and they are not treated as code-test FAIL evidence.

Equivalent static/source checks were performed where possible.

### Higienópolis source checks

PASS:

- route file exists at `src-greenn/regioes/higienopolis/index.html`;
- `vercel.json` contains `/regioes/higienopolis/`;
- canonical points to the Production regional URL;
- favicon package references are present;
- Open Graph metadata present;
- Twitter metadata present;
- JSON-LD parses successfully;
- Ária internal link present;
- Mozae internal link present;
- Form 46 identity present;
- shared runtime retains canonical Form endpoint, tenant 313, form 46 and title `MoreEmUmTegra`;
- shared runtime contains the regional-context handling introduced by PR #290.

### Château Jardin source checks

PASS:

- canonical points to the Château Production URL;
- favicon package references are present;
- Open Graph metadata present;
- Twitter metadata present;
- JSON-LD is present and parses successfully;
- 213 m² reconciled plan is present;
- regional Cidade Jardim map context is present;
- exact-location handoff uses WhatsApp;
- direct Google Maps navigation surface is not exposed;
- exact governed address remains allowed in structured data and canonical commercial footer under current location policy;
- Form 46 identity present and shared runtime retains the canonical Green/GDigital endpoint.

## Production deployment

PR #289 generated an intermediate READY Production deployment:

```text
DEPLOYMENT = dpl_7zYSaa2pawhVTcyyNchKQBZm9RCj
SOURCE_SHA = 9286601b59ef46912283e65b02a15e091fb12c19
STATE = READY
```

Final integrated Production deployment after PR #290:

```text
DEPLOYMENT = dpl_DaqZM8bm1RhyKU7snS5GjFHTryjZ
SOURCE_SHA = 89de7ae56b91d91d969e2b14101c33492cdf2402
TARGET = production
STATE = READY
```

Because the final SHA descends from PR #289 merge SHA, the final deployment contains both authorized runtime changes.

## Production validation

### Higienópolis

URL:

`https://www.moretegra.com.br/regioes/higienopolis/`

Observed:

```text
HTTP = 200
canonical = PASS
robots index/follow = PASS
favicon references = PASS
Open Graph = PASS
Twitter metadata = PASS
JSON-LD parse = PASS
Ária link = PASS
Mozae link = PASS
Form 46 markup = PASS
```

Linked exact-project routes were also resolved:

- Ária Higienópolis = HTTP 200;
- Mozae Higienópolis = HTTP 200.

### Château Jardin

URL:

`https://www.moretegra.com.br/empreendimentos/chateau-jardin/`

Observed:

```text
HTTP = 200
canonical = PASS
favicon references = PASS
Open Graph = PASS
Twitter metadata = PASS
JSON-LD parse = PASS
213 m² plan content = PASS
Cidade Jardim regional map context = PASS
WhatsApp exact-location handoff = PASS
```

Favicon runtime:

- `/favicon.ico` = HTTP 200;
- `/favicon-48x48.png` = HTTP 200.

## Evidence not obtained

Not claimed:

- visual/browser acceptance in this publication cycle;
- physical-device validation;
- screen-reader validation;
- a real Form 46 lead submission;
- field CWV / field INP;
- successful execution of the GitHub Actions checks on these heads.

Static/source checks are not relabeled as visual validation.

## Outcome

```text
PR_289 = MERGED / PRODUCTION_INCLUDED
PR_290 = MERGED / PRODUCTION_INCLUDED
FINAL_RUNTIME_SHA = 89de7ae56b91d91d969e2b14101c33492cdf2402
FINAL_PRODUCTION_DEPLOYMENT = dpl_DaqZM8bm1RhyKU7snS5GjFHTryjZ
FINAL_PRODUCTION_STATE = READY
HIGIENOPOLIS = LIVE / HTTP_200
CHATEAU_JARDIN = LIVE / HTTP_200
```

## Residuals

- GitHub Actions execution evidence remains unavailable because runner allocation failed before any step executed.
- This release did not perform a real Form 46 submission.
- This release did not establish new visual, physical-device, screen-reader or field-performance evidence.

## Next safe action

Resume the existing canonical backlog in `docs/NEXT_SAFE_ACTION.md`. This release does not authorize unrelated runtime, Ads, CRM-provider, DNS, FECH.AI, GTM/GA4 or performance changes.
