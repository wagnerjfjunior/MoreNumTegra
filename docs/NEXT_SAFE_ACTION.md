# Próxima Ação Segura — MoreNumTegra

Estado reconciliado em `2026-09-16`.

Resolver `main` live antes de executar. Base observada desta reconciliação:

`f5b4b27cc31fa6247ad3394e40a295f2a58861d6`

## Estado atual

```text
OPEN_PULL_REQUESTS = 0
CAPIITOLO exact-project page = PUBLISHED / INDEXATION RELEASE MERGED
ELO DUO exact-project page = PUBLISHED / INDEXATION RELEASE MERGED
COMMERCIAL DATA PLANE V2 = DOCS CANONICALIZED
COMMERCIAL CATALOG UPSTREAM DISCOVERY = HANDED OFF TO FECH.AI
MORENUMTEGRA COMMERCIAL RUNTIME MIGRATION = DEFERRED
```

PR #94 consolidated the current CAPIITOLO + Elo Duo exact-project production release.

PR #95 reconciled the stale PR queue.

PR #96 canonicalized the docs-only commercial data contract/schema/inventory.

## Única próxima ação segura local

Resume the governed exact-project publication stream from canonical `main`.

Before selecting/building the next page:

1. resolve `main` live;
2. read the current bootstrap/handoff/status/blockers/baselines;
3. resolve the current Product Fact & Claim Registry and commercial reconciliation applicable to the candidate;
4. resolve query-family/page ownership and Search evidence;
5. inspect current homepage/catalog/runtime data for that project;
6. determine whether current commercial evidence is publishable or whether the page must use consult-only behavior;
7. choose one project or one deliberately bounded release batch;
8. create a branch/PR and keep Preview/deployment use controlled under the Vercel provider constraints.

Do not choose the next project solely from conversation memory, homepage ordering or an old roadmap overlay.

## Parallel FECH.AI track

The Commercial Catalog / Publication Context discovery is now owned upstream by the FECH.AI workstream described in:

`docs/sfjm/MNT_FECHAI_COMMERCIAL_CATALOG_HANDOFF_2026-09-16.md`

This parallel discovery is **not a blocker** for additional MoreNumTegra exact-project pages when their own factual/Search/runtime gates pass.

Until FECH.AI returns a reviewed public-consumer contract:

```text
NO direct FECH.AI internal-table access
NO service_role/browser secret
NO MoreNumTegra-owned replacement commercial backend
NO local Stage B Commercial Data Plane runtime migration
NO bulk migration of existing hardcoded prices into a new source by assumption
```

## Commercial publication rule during transition

A new page may publish a commercial price/reference only when the applicable current evidence authorizes it.

If current price/unit/availability evidence is absent or stale:

```text
PRICE = consult-only
STRUCTURED DATA Offer = omit when no valid offer exists
```

Do not invent or silently reuse an old embedded price.

## Separate future gate

When FECH.AI produces an accepted upstream Commercial Catalog / Publication contract, MoreNumTegra may open a separate consumer-integration gate covering:

- project identity mapping;
- public schema/version;
- fetch/cache/freshness behavior;
- fail-closed semantics;
- structured-data parity;
- security boundary;
- rollout/shadow validation;
- hardcode retirement.

That future integration is not authorized by this SFJM update.
