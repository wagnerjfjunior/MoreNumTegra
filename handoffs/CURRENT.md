# Handoff Atual — MoreNumTegra

`main` é a fonte canônica. Resolver GitHub live antes de agir.

Estado reconciliado em `2026-09-16` sobre a `main` observada em:

`f5b4b27cc31fa6247ad3394e40a295f2a58861d6`

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
CANONICAL_SHA_OBSERVED = f5b4b27cc31fa6247ad3394e40a295f2a58861d6
OPEN_PULL_REQUESTS = 0
```

Recent canonical lifecycle:

- PR #94 — merged: consolidated production/indexation of CAPIITOLO + Elo Duo exact-project pages;
- PR #95 — merged: stale-PR reconciliation and preservation of the current runtime line;
- PR #96 — merged, docs-only: Commercial Data Plane v2 contract/schema/hardcode inventory.

No open PR is carried into the next conversation.

## 2. DEPLOYMENT_STATE / PRODUCTION_STATE

The accepted production topology remains governed by Technical Baseline V2.3 + ADR-006:

```text
WEB PRODUCTION = Vercel
CANONICAL HOST = https://www.moretegra.com.br/
APEX = https://moretegra.com.br/ -> 308 -> www
DNS AUTHORITY = Cloudflare / DNS only
GREEN/GDIGITAL = Form 46 provider + CRM
```

This SFJM reconciliation is documentation-only and does not itself establish a new runtime deployment or a new production validation result.

Preserve:

```text
REPOSITORY_STATE != DEPLOYMENT_STATE
MERGED != DEPLOYED
DEPLOYED != PROD_SMOKE_TESTED
```

## 3. Exact-project publication stream

The canonical exact-project production release from PR #94 includes:

- `/empreendimentos/capiitolo-piero-lissoni/`;
- `/empreendimentos/caminhos-da-lapa-elo-duo/`.

The next MoreNumTegra conversation should resume publication of the remaining governed project pages from clean `main`.

The next project must be selected only after resolving current Product Fact & Claim Registry, query/page ownership, available factual evidence and runtime state. Historical conversation ordering is not authority.

## 4. Commercial Catalog / pricing architecture handoff

Commercial-value architecture is now a separate cross-project track.

Detailed handoff:

`docs/sfjm/MNT_FECHAI_COMMERCIAL_CATALOG_HANDOFF_2026-09-16.md`

Operational ownership:

```text
FECH.AI
= upstream Commercial Catalog / Publication architecture discovery

MoreNumTegra
= independent public consumer / presentation / SEO / performance / Form 46
```

PR #96 remains useful as the MoreNumTegra-side Commercial Data Plane/consumer contract boundary. Do not start its former local Stage B runtime migration while the FECH.AI upstream contract is still being discovered/adjudicated.

This handoff does NOT authorize MoreNumTegra to query FECH.AI internal Supabase tables or expose service credentials.

## 5. Security boundary carried forward

A read-only cross-project inspection observed FECH.AI/Supabase security-advisor findings that are being handed to the FECH.AI audit for live reconciliation against its current Security-to-Scale WBS.

Those observations are not independent vulnerability verdicts and must not be used as a reason to bypass the FECH.AI security program.

Until a governed public read contract exists:

- no direct browser access to FECH.AI internal tables;
- no service-role/client secret in MoreNumTegra;
- no new MoreNumTegra commercial backend;
- no cross-project runtime coupling.

## 6. Page-publication rules while Commercial Catalog is pending

Commercial Catalog discovery does not block publication of additional exact-project pages when existing gates pass.

For every new page:

- only governed factual product claims;
- only current governed commercial evidence if a price/reference is shown;
- otherwise consult-only behavior;
- visible commercial price and structured-data price must remain aligned;
- Form 46, GTM/GA4, consent, canonical, sitemap, mobile and performance contracts remain unchanged unless separately authorized;
- do not expand hardcoded commercial values as the target architecture.

## 7. Current next safe action

See `docs/NEXT_SAFE_ACTION.md`.

The intended local continuation is the governed exact-project page publication stream. Commercial Catalog / upstream data-platform design continues independently in FECH.AI and returns to MoreNumTegra only through a future separately authorized consumer-integration gate.
