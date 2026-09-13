# MNT-M3-05 — Search Intent / Query Ownership Contract — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-05 — Search Intent / Query Ownership Contract`  
Planning estimate: `24h`  
Execution authorization: Product Authority explicitly authorized MNT-M3-05 on `2026-09-13`.  
Execution base: `MNT-M3-04 @ bd23a8b690bebee411c02af12646ac866566a2a3`, stacked while MNT-M3-03/M3-04 remain unmerged candidates.  
Scope class: `SEARCH STRATEGY / INTENT GOVERNANCE / LOGICAL OWNERSHIP ONLY`.  
Runtime/platform mutation: `NONE`.

## 1. Purpose and task boundary

MNT-M3-05 decides **which query families MoreNumTegra intentionally serves, which it serves only under qualification, and which it does not target**.

It does not yet assign exact URLs, route slugs, canonicals or indexable page inventory. Those decisions belong to MNT-M3-06.

Preserve:

```text
QUERY FAMILY ACCEPTED != URL CREATED
LOGICAL OWNER CLASS != FINAL ROUTE
SEARCH VOLUME != OWNERSHIP
GSC IMPRESSION != TARGETING DECISION
PROJECT ENTITY != CURRENT GENERAL INVENTORY
PUBLIC 100% SOLD != IMPOSSIBILITY OF A LATER EXCEPTION UNIT
EXCEPTION UNIT != GENERAL INVENTORY REOPENING
PRICE QUERY != PERMISSION TO PUBLISH AN UNVERIFIED PRICE
```

Machine-readable matrix:

`docs/search/data/MNT_M3_05_QUERY_OWNERSHIP_MATRIX_2026-09-13.csv`

## 2. Evidence basis consumed

This contract consumes the complete evidence already audited in upstream tasks rather than re-sampling the source corpus:

- MNT-M3-01 demand research;
- MNT-M3-02 complete exposed MoreNumTegra GSC query set;
- MNT-M3-02 full stabilized sibling GSC corpus for `caminhosdalapategra.com.br`;
- 9/9 Keyword Planner exports, 8,321/8,321 rows and 3,859 unique keywords after deduplication;
- 8/8 Tegra market-study PDFs, 46/46 pages;
- MNT-M3-03 SERP/result-class and intent-hypothesis matrix;
- MNT-M3-04 product fact/claim registry covering 23 runtime cards / 21 unique entities;
- the full September commercial source `Tegra/Setembro/Endomarket-Setembro.md` at commit `264d11477e2c6193a457f8541f58700c93743d26`;
- MNT-M3-04 September reconciliation, including the Product Authority clarification that ODE unit 22 returned and Reserva has exception units under consultation.

Where the original M3-04 registry conflicts with its September reconciliation on volatile commercial facts, the September reconciliation controls downstream interpretation.

## 3. Ownership decision vocabulary

### `SERVE_PRIMARY`

High-fit query family that belongs to the core MoreNumTegra search proposition. It should receive an explicit owner class in M3-06.

### `SERVE_QUALIFIED`

Relevant query family, but ownership is valid only with qualifiers such as Tegra, a verified location, a development stage, a project entity or an admissible fact.

### `SERVE_ENTITY_HISTORICAL`

Project/entity query whose current commercial inventory is absent or not generally active, but whose entity can still be meaningfully represented without pretending it is available.

### `SERVE_EXCEPTION_COMMERCIAL`

Project/entity query with a specifically governed returned/exception unit or under-consultation inventory. Ownership can exist, but commercial copy must preserve the exception scope and pass immediate revalidation.

### `SUPPORT_SECONDARY`

Semantically useful family for supporting copy, internal linking, comparison or broader discovery, but not a default primary landing-page owner because the dominant SERP/product fit is too broad or marketplace-heavy.

### `DO_NOT_TARGET`

Family should not receive an intentional SEO owner because it is corporate/partner/recruitment intent, unresolved tool intent, weak apartment-buying fit, noise or unrelated spillover.

## 4. Logical owner classes

M3-05 may assign an **owner class**, but not an exact URL:

- `BRAND_PORTFOLIO_SURFACE`
- `MASTER_DEVELOPMENT_SURFACE`
- `ACTIVE_PROJECT_SURFACE`
- `SOLD_PROJECT_ENTITY_SURFACE`
- `EXCEPTION_PROJECT_COMMERCIAL_SURFACE`
- `LOCATION_PORTFOLIO_SURFACE`
- `STAGE_DISCOVERY_SURFACE`
- `PROJECT_FACT_SECTION`
- `COMPARISON_DISCOVERY_SURFACE`
- `SUPPORTING_CONTENT_ONLY`
- `NO_OWNER`

M3-06 must translate accepted owner classes into one explicit page/route owner without creating uncontrolled overlap.

## 5. Core project/entity policy

### 5.1 Active project entities

Exact current product names and project+brand combinations are `SERVE_PRIMARY` when the project is commercially relevant and factual coverage can add buyer-decision utility beyond the official Tegra page.

Examples from the current catalogue include Nova Vivere, Garden Design, Ampère Brooklin, Mozae Higienópolis, Ária Higienópolis, Soma Perdizes, Ledge Brooklin, Bueno Brandão 257, CAPIITOLO, YPY Alto do Ipiranga and other governed catalogue entities.

Logical owner class: `ACTIVE_PROJECT_SURFACE`.

A future surface must not be a thin duplicate of the official Tegra ficha. Differentiation should come from governed comparison, stage, location, verified facts, decision filters and conversion context.

### 5.2 Sold project entities

A sold project can remain searchable as an entity without being presented as active general inventory.

Examples established upstream include Amaro and sold legacy entities.

Policy:

```text
ENTITY SEARCH VALUE = POSSIBLE
CURRENT GENERAL SALE CLAIM = NOT ALLOWED WITHOUT CURRENT INVENTORY EVIDENCE
```

Ownership: `SERVE_ENTITY_HISTORICAL` / `SOLD_PROJECT_ENTITY_SURFACE` when M3-06 determines that preserving entity coverage provides user value and avoids misleading commercial presentation.

### 5.3 ODE Perdizes returned-unit exception

ODE has a public sold-out baseline, but the September commercial evidence plus Product Authority clarification establishes a returned unit 22 at the observed dated reference.

Policy:

- entity query remains valid;
- current commercial treatment is `SERVE_EXCEPTION_COMMERCIAL`;
- logical owner class is `EXCEPTION_PROJECT_COMMERCIAL_SURFACE`;
- copy must state/behave as a specific exception, not general project inventory;
- price/availability must be revalidated immediately before release;
- the older comparative `De R$ 2.200.000` is not admitted by the September source unless separately revalidated.

### 5.4 Reserva Caminhos da Lapa exception units under consultation

Reserva has a public `100% vendido` baseline and newer commercial handling as `preço sob consulta`, with Product Authority clarification that exception units exist under consultation.

Policy:

- entity and historical product facts are valid;
- project+price and project+availability queries can be `SERVE_EXCEPTION_COMMERCIAL` because real sibling GSC demand exists;
- no quantity, unit number or price may be invented;
- `sob consulta` may only be surfaced after current revalidation;
- logical owner class is `EXCEPTION_PROJECT_COMMERCIAL_SURFACE`, not a general active-inventory class.

## 6. Caminhos da Lapa master-development policy

Queries such as `caminhos da lapa tegra` and `tegra caminhos da lapa` are `SERVE_PRIMARY` with logical owner `MASTER_DEVELOPMENT_SURFACE`.

The master-development owner must represent the complex and its lifecycle mix without stealing exact project intent from product-level owners.

Therefore:

```text
CAMINHOS DA LAPA = master-development entity
NOVA VIVERE / GARDEN DESIGN / ELO DUO / RESERVA = project entities
MASTER OWNER != AUTOMATIC OWNER OF EVERY PROJECT MODIFIER
```

The sibling GSC proved the same query families can currently appear across home/project routes. MoreNumTegra must not reproduce that uncontrolled overlap.

## 7. Brand and brand+location policy

### 7.1 `tegra`

`tegra` is primarily a corporate/brand entity query. MoreNumTegra has product relevance but should not assume universal ownership over the brand SERP.

Decision: `SERVE_QUALIFIED`.

Logical owner class: `BRAND_PORTFOLIO_SURFACE`, with the understanding that it competes with/alongside official Tegra corporate authority rather than replacing it.

### 7.2 `tegra + location`

Brand+location families such as `tegra campo belo` represent portfolio/location exploration when more than one project can satisfy the query.

Decision: `SERVE_QUALIFIED`.

Logical owner: `LOCATION_PORTFOLIO_SURFACE`, only where verified Tegra inventory/entities justify the geography. Do not collapse a multi-project location query onto one arbitrary project.

### 7.3 Corporate/partner brand modifiers

`tegra vendas` and `tegra conecta` do not show clean apartment-buyer intent in the upstream SERP work.

Decision: `DO_NOT_TARGET`.

Owner: `NO_OWNER`.

Do not reinterpret a corporate, recruitment, broker or tool query as a consumer acquisition keyword merely because it contains `Tegra` or `vendas`.

## 8. Development-stage policy

External SERPs validated `lançamento`, `em construção` and `pronto para morar` as real search dimensions.

These families are `SERVE_PRIMARY` when qualified to the MoreNumTegra proposition, e.g. Tegra/São Paulo/project portfolio context.

Logical owner: `STAGE_DISCOVERY_SURFACE`.

M3-05 does **not** decide whether this becomes an indexable page, static section or another architecture. M3-06/M4 must resolve that implementation shape.

Rules:

- no JavaScript-only filter state may be assumed indexable;
- stage copy must be driven by current governed product facts;
- stale stage data must fail closed;
- one project can appear in a stage discovery experience while retaining its own exact-project owner.

## 9. Location and generic inventory policy

### 9.1 Generic city-level inventory

`apartamentos São Paulo` and similar broad families have high Planner demand but marketplace-dominated SERPs.

Decision: `SUPPORT_SECONDARY`.

Logical owner: `COMPARISON_DISCOVERY_SURFACE` or `SUPPORTING_CONTENT_ONLY`, not automatically the home page.

MoreNumTegra should qualify broad demand through Tegra, stage, location or governed portfolio differentiation rather than build thin doorway pages to chase volume.

### 9.2 Generic neighborhood inventory

`apartamento Brooklin`, `apartamento Perdizes`, `apartamento Lapa` and comparable unbranded neighborhood families are also inventory-heavy and can represent a market much broader than Tegra.

Decision: `SUPPORT_SECONDARY` by default.

They become `SERVE_QUALIFIED` only when paired with Tegra/project/stage intent and a verified portfolio for that geography.

Raw ambiguous `lapa` is not an accepted ownership family.

## 10. Bottom-funnel modifier policy

Sibling GSC provides first-party evidence that project modifiers such as `preço` and `endereço` are real search behavior, not Planner-only ideas.

### 10.1 Project + preço

Decision: `SERVE_QUALIFIED` for active projects with governed commercial facts; `SERVE_EXCEPTION_COMMERCIAL` for ODE/Reserva exception states; `SERVE_ENTITY_HISTORICAL` or no commercial target for fully sold projects without current exception evidence.

Logical owner: normally the relevant project surface, with price handled as a `PROJECT_FACT_SECTION` rather than a separate thin page unless M3-06 later establishes a justified owner.

Rules:

- never manufacture generic `a partir de` from another unit;
- different unit reference is not a price conflict;
- dated internal price is not evergreen;
- every public price requires release-time revalidation.

### 10.2 Project + endereço/localização

Decision: `SERVE_QUALIFIED` when the address/location is verified.

Logical owner: relevant project or master-development surface, not a separate doorway page.

### 10.3 Project + planta / metragem / vagas / tipologia

Decision: `SERVE_QUALIFIED` when the Product Fact & Claim Registry admits the fact.

Logical owner: `PROJECT_FACT_SECTION` within the relevant project owner.

Mozae provides the governing example: downstream copy must use the governed 46m²/73m² headline rather than perpetuating the stale runtime 45m² value.

### 10.4 Project + disponibilidade / condições

Decision: `SERVE_QUALIFIED` only with current inventory evidence.

For returned or under-consultation units, use `SERVE_EXCEPTION_COMMERCIAL` and preserve the exception scope.

Internal conditions such as `Prêmio 2%` or `VPL -8%/-10%` are **not** automatically public search-copy targets.

## 11. Architecture/designer and informational spillover

Queries for architects, paisagismo or generic design topics can generate impressions while having weak apartment-buying fit.

Decision: `DO_NOT_TARGET` by default unless a later content strategy proves a buyer-decision use case tied to a project.

A factual architect/designer attribution may exist on a project surface without making the professional/entity query a primary SEO target.

## 12. Noise, typo and unrelated policy

Misspellings, foreign-script variants, rental intent, houses, unrelated projects, unrelated cities and weakly related GSC rows do not become targets because Google once exposed an impression.

Decision: `DO_NOT_TARGET` / `NO_OWNER` unless a later classification proves material product intent.

Preserve:

`GSC APPEARANCE != SEARCH OWNERSHIP`.

## 13. Ownership exclusivity and overlap contract

M3-06 must enforce one **primary** page owner per accepted high-value query family.

A page can rank for adjacent queries without violating the contract, but architecture must not intentionally assign the same primary family to multiple owners.

Required rules:

1. exact project entity → project owner class;
2. master development → master owner class;
3. brand+location with multiple qualifying projects → location/portfolio owner class;
4. stage → stage discovery owner class;
5. project commercial modifier → project owner/fact section, not a separate page by default;
6. sold project without exception inventory → entity/historical owner, not active inventory;
7. returned/exception inventory → same project entity with explicit exception commercial state;
8. broad generic city/neighborhood queries → secondary/support unless sufficiently qualified;
9. corporate/noise/spillover → no owner.

If two proposed surfaces would own the same family, M3-06 must choose one primary owner and demote the other to supporting/internal-linking role.

## 14. Current commercial exception model

The contract introduces a required dual-state representation:

```text
PUBLIC LIFECYCLE STATE
and
CURRENT COMMERCIAL EXCEPTION STATE
```

For ODE:

```text
public lifecycle = entregue / sold-out baseline
commercial exception = returned unit 22, subject to revalidation
```

For Reserva:

```text
public lifecycle = entregue / 100% sold baseline
commercial exception = some units under consultation, quantity/details not established
```

This model prevents both failure modes:

- falsely declaring a sold-out project generally available;
- falsely suppressing a valid current exception unit because the public portfolio page has not reflected the exception.

## 15. M3-06 handoff contract

For every accepted M3-05 family, M3-06 must provide:

- canonical family ID;
- representative queries and variants;
- final intent label;
- M3-05 service decision;
- exact primary page/route owner;
- supporting surfaces, if any;
- canonical/indexability treatment;
- active/sold/exception commercial state policy;
- fact-registry dependencies;
- internal-linking direction;
- explicit anti-overlap note;
- `NO_OWNER` records for excluded families where exclusion matters operationally.

M3-06 must not silently create routes merely because an owner class exists.

## 16. Exit criteria adjudication

MNT-M3-05 candidate satisfies its bounded scope because:

- every material M3-03 query/result family receives a serve/exclude policy;
- brand, master-development, active project, sold entity, exception inventory, stage, location, generic, bottom-funnel and noise classes are separated;
- ODE and Reserva preserve the September exception-inventory semantics without generalizing stock;
- commercial modifiers are gated by the Product Fact & Claim Registry;
- internal commission/VPL conditions are not promoted to public SEO claims;
- broad high-volume terms are not assigned ownership solely by volume;
- one-primary-owner anti-overlap rules are explicit;
- exact URLs/routes remain deferred to M3-06;
- no runtime, Green, Vercel, Search Console, GTM or GA4 mutation occurred.

## 17. Lifecycle

```text
MNT-M3-01 = COMPLETE / ACCEPTED
MNT-M3-02 = COMPLETE / ACCEPTED
MNT-M3-03 = READY / MERGE AUTHORIZED / ACTUAL MERGE PENDING
MNT-M3-04 = COMPLETE_CANDIDATE / PENDING_ACCEPTANCE
MNT-M3-05 = COMPLETE_CANDIDATE / PENDING_ACCEPTANCE
MNT-M3-06 = PLANNED / NOT_AUTHORIZED
```

Accepted scope-equivalent remains:

```text
440h / 1240h = 35.48%
```

MNT-M3-03 (`16h`), MNT-M3-04 (`24h`) and MNT-M3-05 (`24h`) contribute zero accepted hours until their respective acceptance/merge lifecycle is completed.