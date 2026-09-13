# MNT-M3-04 — Governed Product Fact & Claim Registry — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-04 — Governed Product Fact & Claim Registry`  
Planning estimate: `24h`  
Execution authorization: Product Authority explicitly authorized start after authorizing Ready + merge of PR #57 on `2026-09-13`.  
Execution branch base: `a98e399d44b3f51794aea8979f77cf7d2fa5c6df` (`MNT-M3-03 COMPLETE_CANDIDATE`, reconciled to accepted MNT-M3-02 main).  
Scope class: `RESEARCH / PRODUCT TRUTH / CLAIM GOVERNANCE ONLY`.  
Runtime/platform mutation: `NONE`.

## 1. Purpose

MNT-M3-04 separates **what the MoreNumTegra runtime currently says** from **what may be stated as current product truth**.

The registry prevents a price, availability, metragem, stage, address, award or product feature from becoming Search/content copy merely because it already exists in JavaScript, an old commercial table, a historical study or a prior campaign.

Machine-readable registry:

`docs/product/data/MNT_M3_04_PRODUCT_FACT_CLAIM_REGISTRY_2026-09-13.csv`

Explicit discrepancy queue:

`docs/product/data/MNT_M3_04_CLAIM_CONFLICTS_2026-09-13.csv`

## 2. Complete source-boundary audit used for this consolidation

The consolidation does **not** derive current facts from partially inspected files.

Inspected as claim inventory / evidence:

```text
canonical runtime PROJECTS array = 23 / 23 cards inspected
unique product entities represented = 21 / 21

current first-party product surfaces = 21 / 21 product entities checked
current Tegra portfolio/status surface = checked where needed for inventory status
Bueno Brandão official redirect/microsite = inspected

Tegra/Agosto/Anuncios/Anúncios.md = 100% read
Tegra/Agosto/Valores_a_vista.md = 100% read
merged PR #32 factual contract = 100% read
merged PR #15 promotion contract = 100% read
```

The binary August table directories were enumerated but are **not** used by this candidate as current authoritative product truth. No fact below is certified from an unread PDF/image. Where the runtime references a historical commercial image/PDF that was not independently revalidated in this task, the registry classifies that runtime value as `POINT_IN_TIME / REVALIDATION_REQUIRED`, never as `CURRENT_VERIFIED`.

This preserves the Product Authority rule:

`PARTIAL_SOURCE_INSPECTION != CONSOLIDATED_TRUTH`

## 3. Source precedence

For the scope of MNT-M3-04:

1. current official Tegra project page / official product microsite;
2. current official Tegra portfolio/status surface;
3. merged MoreNumTegra factual contract with traceable evidence;
4. canonical current MoreNumTegra runtime as an inventory of what is published;
5. dated internal commercial evidence as point-in-time evidence only;
6. historical market studies as historical research only, never current product truth;
7. inference only when explicitly labelled.

When a current first-party source says `100% Vendido`, an older local availability/promotion claim cannot remain a current commercial fact without newer first-party evidence.

## 4. Claim classes

| Claim class | Examples | Volatility | Governed use |
|---|---|---|---|
| `IDENTITY_STATIC` | project name, city, neighborhood, canonical entity | low | usable after current first-party verification |
| `PRODUCT_STATIC` | headline typology, headline metragem, parking | low/medium | usable from current official product evidence |
| `ADDRESS_STATIC` | street/address | low | usable from current official product evidence |
| `STAGE` | lançamento, em construção, entregue | medium | revalidate before material content/release |
| `INVENTORY_STATUS` | últimas unidades, 100% vendido | high | must use current first-party evidence |
| `PRICE_UNIT` | price, unit, m² reference | very high | revalidate before any commercial publication |
| `PROMO_DISCOUNT` | old/new price, cash discount, specific unit | very high | point-in-time until same-unit revalidation |
| `AWARD` | Master Imobiliário 2026 | low after provenance fixed | exact wording must remain tied to source |
| `HISTORICAL_AUDIENCE` | buyer/prospect study findings | historical | research context only; not product fact |

No numerical commercial field is made evergreen by being present in `main`.

## 5. Registry coverage

The current runtime represents `23` cards but `21` unique project entities because Nova Vivere and CAPIITOLO each have a second commercial offer card.

Current official stage distribution in this registry:

```text
Entregue      = 13 projects
Em construção = 6 projects
Lançamento    = 2 projects
TOTAL         = 21 projects
```

Observed official inventory layer:

```text
100% Vendido                         = 2
Últimas unidades                     = 9
active project surface               = 8
availability not explicitly labelled = 2
TOTAL                                = 21
```

`active project surface` does not mean a specific unit is available. Unit availability remains dynamic.

## 6. Material adjudications

### 6.1 ODE Perdizes — current commercial claim blocked

Canonical runtime currently carries a specific `Última unidade` promotion for unit 22 at `R$ 2.090.000`.

The current official Tegra product page states:

```text
Entregue
100% Vendido
```

Disposition:

`BLOCKED_STALE_COMMERCIAL_CLAIM`

The project may remain a historical/entity fact for later Search-policy decisions, but the runtime availability/promotion must not be reused in future content/SEO implementation unless newer inventory evidence supersedes the sold-out status.

### 6.2 Reserva Caminhos da Lapa — current sale orientation blocked

The canonical runtime presents Reserva as `Pronto para morar` with `Valor sob consulta` in a sales-oriented catalogue.

The current first-party page states:

```text
Entregue
100% Vendido
```

Disposition:

`BLOCKED_STALE_COMMERCIAL_CLAIM`

The address, product typology, amenities and historical entity can remain factual. Current inventory/price/sales availability cannot be asserted.

### 6.3 Mozae Higienópolis — metragem correction required

Runtime headline:

`45m² a 73m²`

Current official headline:

`46m² e 73m²`

Disposition:

`RUNTIME_METRAGE_CORRECTION_REQUIRED`

Future content must use the current official headline values unless a stronger source establishes another product range.

### 6.4 Tièl — unit/price requires revalidation

Runtime references unit 914, `21m²`, `R$ 598.500`.

The inspected current official page presents Boutique Apartments and visibly exposes a `19m²` type, while no current price for unit 914 was observed.

Disposition:

`UNIT_PRICE_REVALIDATION_REQUIRED`

This is not enough evidence to call the historical runtime claim false; it is enough to prevent reusing it as current commercial truth without verification.

## 7. Commercial-price interpretation

Different current official `A partir de` values and current runtime values often refer to **different units/product types**. Those differences are not automatically factual conflicts.

Examples include Nova Vivere, Garden Design, Mozae, Universo Órbita, Ária, Bem Moema, Ledge, TEG Sacomã and YPY. The correct interpretation is:

`DIFFERENT UNIT REFERENCE != PRICE CONFLICT`

but also:

`OLD/OTHER UNIT PRICE != CURRENT GENERIC PRICE`

Therefore all unit/price/promo fields remain release-sensitive.

Two runtime values have a stronger current alignment:

- Ampère Brooklin: current official reference is `R$ 4.770.000`, 262m², unit 121; runtime carries the same price/unit family.
- Soma Perdizes: current official reference is `R$ 630.000`, 45m², unit 602; runtime carries the same price/unit family.

Even these must be revalidated before a future commercial release because availability can change.

## 8. Master Imobiliário 2026

The existence of the 2026 recognition for Caminhos da Lapa is supported by current Tegra RI recognition material and by the already merged MoreNumTegra PR #32 factual contract.

Allowed durable claim:

`Caminhos da Lapa — Prêmio Master Imobiliário 2026`

The exact local wording `Qualificação Urbana` remains tied to the merged PR #32 evidence chain. Do not silently substitute category wording from another source.

## 9. Search/content usage contract produced by M3-04

M3-04 does **not** assign query ownership or create pages. It tells downstream tasks which facts are safe inputs.

Allowed downstream categories:

```text
SEO_PRODUCT_FACT_OK
COMMERCIAL_REVALIDATION_REQUIRED
HISTORICAL_ENTITY_FACT_ONLY
DO_NOT_PUBLISH_CURRENT_AVAILABILITY
DO_NOT_PUBLISH_CURRENT_PROMO
```

A project being `100% Vendido` does not by itself decide whether an informational SEO page should exist. That decision belongs to MNT-M3-05/M3-06.

## 10. Revalidation rules

Before any future material implementation/release:

- `price`, `unit`, `discount`, `availability`: revalidate against current first-party/commercial evidence immediately before release;
- `stage` and `inventory status`: revalidate against current first-party product/portfolio surface;
- `address`, `headline typology`, `headline metragem`: use the registry only while no newer official source conflicts;
- `historical market-study data`: keep labelled with its original study period;
- unresolved conflicts fail closed: do not publish the disputed commercial claim.

The registry is evidence-governance, not a cache that overrides newer first-party truth.

## 11. No runtime mutation

This task deliberately does **not**:

- edit the live catalogue;
- remove ODE/Reserva cards;
- change prices;
- change Green;
- change GTM/GA4;
- change Vercel;
- assign canonical query/page owners.

The discrepancies are now governable inputs for later authorized implementation.

## 12. Exit criteria

MNT-M3-04 candidate satisfies its bounded scope because:

- all 23 current runtime cards / 21 unique entities were inventoried;
- all 21 entities received a current first-party product-truth disposition;
- static vs dynamic vs historical claims are separated;
- price differences by unit are not misclassified as automatic conflicts;
- explicit commercial conflicts are fail-closed;
- the Master Imobiliário claim has a traceable source class;
- historical market-study findings are excluded from current product truth;
- no downstream Search ownership decision was pre-empted;
- no runtime/platform mutation occurred.

## 13. Lifecycle

```text
MNT-M3-01 = COMPLETE / ACCEPTED
MNT-M3-02 = COMPLETE / ACCEPTED
MNT-M3-03 = COMPLETE_CANDIDATE / PENDING_ACCEPTANCE
MNT-M3-04 = COMPLETE_CANDIDATE / PENDING_ACCEPTANCE
MNT-M3-05 = PLANNED / NOT_AUTHORIZED
```

Accepted scope-equivalent remains:

```text
440h / 1240h = 35.48%
```

MNT-M3-03 (`16h`) and MNT-M3-04 (`24h`) contribute `0` accepted hours until their respective Product Authority acceptance/merge lifecycles are completed.
