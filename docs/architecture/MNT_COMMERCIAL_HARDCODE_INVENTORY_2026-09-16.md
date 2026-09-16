# MoreNumTegra — Commercial hardcode inventory

Status: `BASELINE INVENTORY / STAGE A`
Observed against canonical base: `379233a7f5c6127f405eff10ba7513950b8e5723`
Date: 2026-09-16

## Purpose

Record the known commercial-data duplication/hardcoding that must be removed by Commercial Data Plane v2 without changing current values during the architecture phase.

This inventory is not itself authority for any price. It identifies code locations and ownership problems.

## 1. Homepage catalog — `src-greenn/moretegra.js`

Current state: `MIGRATION_REQUIRED`.

The monolithic `PROJECTS` collection mixes durable product/presentation data with volatile commercial state.

Commercial fields observed in project entries include:

- `price`;
- `priceState`;
- `priceLabel`;
- `priceNote`;
- `promo`;
- promotion unit identifier;
- old promotional price;
- current promotional price;
- commercial evidence references embedded with presentation state;
- unit/area/R$/m² narrative inside `priceNote`.

Examples of affected project entries observed in the current source include Nova Vivere, Château Jardin, Caminhos da Lapa Elo Duo, Garden Design, Ampère Brooklin, Mozae Higienópolis, Universo Tatuapé Órbita, Ária Higienópolis, Bem Moema and other catalog records in the same collection.

Target:

```text
PROJECTS owns stable project identity/presentation facts
COMMERCIAL FEED owns volatile commercial state
```

Homepage rendering must join by stable `projectId` rather than by duplicated commercial values.

## 2. Elo Duo — current externalized seed

### `src-greenn/data/commercial-values.json`

Current state: `USEFUL_SEED / V1 / REPOSITORY-LOCAL`.

The file already externalizes Elo Duo commercial data including:

- state;
- inventory label;
- price label;
- price;
- commercial reference;
- typology availability;
- observation/source metadata;
- disclaimer.

Problem:

The same project still has commercial data duplicated in the homepage monolith. The file is also inside the MoreNumTegra deployment tree, so updating it is not yet operationally independent from Vercel deployment.

Target:

- migrate shape to v2;
- make it the same logical source used by homepage and exact-project consumers;
- later move current commercial snapshot to the authorized independent data plane.

### `src-greenn/project-page.js`

Current state: `REFERENCE IMPLEMENTATION / GENERALIZE`.

Positive behaviors to preserve:

- `projectId` lookup;
- native `fetch`;
- `cache: no-store` in current local implementation;
- fail-closed behavior;
- dynamic commercial label/price/reference/disclaimer;
- typology availability synchronization;
- dynamic structured-data `Offer` creation from commercial state rather than static page text.

Target:

Generalize this behavior into a reusable consumer without making Elo Duo-specific canonical/DOM assumptions.

## 3. CAPIITOLO production page

### `src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html`

Current state: `MIGRATION_REQUIRED / DUPLICATED COMMERCIAL TRUTH`.

Known hardcoded commercial locations:

1. bootstrap/fallback presentation includes a literal current price plus unit, area and R$/m² narrative;
2. generated `priceSection` includes the same current price as visible text;
3. generated price-section note repeats unit, area, R$/m² and current price;
4. the commercial block is injected by production wrapper code rather than consuming the governed commercial feed.

Target:

- production HTML contains no current price fallback;
- bootstrap uses neutral loading/consult-only copy;
- price block uses semantic commercial hooks;
- project identity resolves to `capiitolo-piero-lissoni`;
- current price/unit/area/derived R$/m² come only from valid commercial state;
- failure removes/omits current `Offer` and displays consult-only behavior.

## 4. CAPIITOLO editorial source

### `experiments/capiitolo-editorial-v3/index.html`

Current state: `NO PRIMARY PRICE SOURCE / PRESERVE DESCRIPTIVE CONTENT`.

The editorial source contains static product facts and presentation. The production wrapper currently adds the commercial section around it.

Migration rule:

Do not move current commercial truth into the editorial experiment. Commercial state belongs to the shared commercial consumer/data plane.

## 5. Structured data

Current state: `REVIEW_REQUIRED DURING STAGE B`.

Any static or generated schema `Offer` carrying price must obey the same commercial source as the visible price.

Invariant:

```text
VISIBLE_COMMERCIAL_STATE == STRUCTURED_COMMERCIAL_STATE
```

If current commercial data fails validation, an `Offer` with a stale price must not survive independently in JSON-LD.

## 6. Current Vercel coupling

Current `vercel.json` ignores documentation/governance-only changes but does not exclude `src-greenn/data/` from deployment-relevant changes.

Therefore:

```text
MOVE PRICE TO REPOSITORY JSON
!=
DEPLOYMENT INDEPENDENCE
```

Changing the current repository-local commercial JSON remains runtime/deployment activity.

Commercial Data Plane v2 Stage D must prove that a commercial update can occur without changing/deploying the MoreNumTegra site code.

## 7. Forbidden post-migration ownership

After a project is migrated, the following must not be reintroduced as current commercial truth inside its presentation source:

- literal current BRL price used for sale/reference;
- `price` field inside the stable homepage project catalog;
- current unit tied to a price;
- current promotional old/current price pair;
- current availability claim owned only by page markup;
- independently maintained R$/m² derived from the same price/area;
- static JSON-LD `Offer` price not sourced from the commercial consumer.

This rule does not prohibit permanent numeric product facts such as addresses, typology areas, form IDs, measurement IDs, dates in evidence metadata or other non-commercial numbers.

## 8. Stage B precondition

Before runtime mutation, resolve the exact current `main` again and produce a machine-assisted inventory of all candidate commercial literals/fields on that exact base.

The Stage B migration must not rely only on this 2026-09-16 inventory if `main` has advanced.

## 9. Initial migration order

Recommended bounded sequence:

1. introduce reusable commercial consumer + v2 repository-local snapshot for local testing;
2. migrate homepage commercial rendering;
3. migrate CAPIITOLO;
4. reconcile Elo Duo to the shared consumer;
5. run anti-duplication/hardcode checks;
6. verify visible values and structured data locally;
7. only then select/authorize the independent data-plane provider and remote publication mechanism.

No production deployment is authorized by this inventory.
