# MNT-M3-05 — Search Intent / Query Ownership Contract — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-05 — Search Intent / Query Ownership Contract`  
Planning estimate: `24h`  
Scope class: `SEARCH STRATEGY / INTENT GOVERNANCE / LOGICAL OWNERSHIP ONLY`  
Runtime/platform mutation: `NONE`.

## 1. Purpose and boundary

M3-05 decides which query families MoreNumTegra intentionally serves, qualifies, supports or excludes. Exact URLs/routes belong to M3-06.

Preserve:

```text
QUERY FAMILY ACCEPTED != URL CREATED
SEARCH EVIDENCE != STRATEGY DECISION
SEARCH DEMAND NOT DETERMINED != NO DEMAND
PRODUCT FACT OBSERVED != SEARCH DEMAND OBSERVED
SYNTHETIC REPRESENTATIVE QUERY != OBSERVED QUERY
GSC IMPRESSION != TARGETING DECISION
EXCEPTION UNIT != GENERAL INVENTORY REOPENING
```

Machine-readable matrix:

`docs/search/data/MNT_M3_05_QUERY_OWNERSHIP_MATRIX_2026-09-13.csv`

## 2. Evidence aliases used by the matrix

- `M3-01_PLANNER` → `docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv`
- `M3-02_GSC_MORENUM` → `docs/search/data/MNT_M3_02_GSC_QUERY_CLASSIFICATION_2026-09-13.csv`
- `M3-02_GSC_CAMINHOS` → `docs/search/data/MNT_M3_02_CAMINHOS_GSC_FULL_QUERY_CORPUS_2025-05-13_2026-09-13.csv`
- `M3-03_SERP` → `docs/search/data/MNT_M3_03_SERP_INTENT_MATRIX_2026-09-13.csv`
- `M3-04_FACTS` → `docs/product/data/MNT_M3_04_PRODUCT_FACT_CLAIM_REGISTRY_2026-09-13.csv`
- `M3-04_SEPTEMBER` → `docs/product/MNT_M3_04_SEPTEMBER_COMMERCIAL_RECONCILIATION_2026-09-13.md`

The matrix now exposes, per family: `representative_query_status`, `evidence_classes`, `evidence_refs`, `observed_search_intent`, `strategy_service_intent`, `intent_confidence` and `decision_confidence`.

Allowed query-status semantics include `OBSERVED_GSC`, `OBSERVED_PLANNER`, `SERP_VALIDATED`, `FAMILY_GENERALIZATION` and `SYNTHETIC_EXAMPLE`. Multiple states may coexist. A synthetic example must never be interpreted as proof that the exact phrase had impressions or Planner volume.

## 3. Decision vocabulary

- `SERVE_PRIMARY`: core high-fit family; one explicit owner in M3-06.
- `SERVE_QUALIFIED`: relevant only with a valid qualifier/fact/entity context.
- `SERVE_ENTITY_HISTORICAL`: entity may remain useful although general current inventory is absent.
- `SERVE_EXCEPTION_COMMERCIAL`: governed returned/exception commercial state; fail-closed copy.
- `SUPPORT_SECONDARY`: supporting/discovery family, not default primary landing ownership.
- `DO_NOT_TARGET`: corporate/tool/noise/out-of-scope family; no intentional SEO owner.

Logical owner classes remain unchanged:

`BRAND_PORTFOLIO_SURFACE`, `MASTER_DEVELOPMENT_SURFACE`, `ACTIVE_PROJECT_SURFACE`, `SOLD_PROJECT_ENTITY_SURFACE`, `EXCEPTION_PROJECT_COMMERCIAL_SURFACE`, `LOCATION_PORTFOLIO_SURFACE`, `STAGE_DISCOVERY_SURFACE`, `PROJECT_FACT_SECTION`, `COMPARISON_DISCOVERY_SURFACE`, `SUPPORTING_CONTENT_ONLY`, `NO_OWNER`.

## 4. Evidence-to-decision corrections

For `tegra`, upstream evidence supports `navigational_brand_or_corporate` as observed intent. MoreNumTegra's portfolio-exploration treatment is a strategy decision, not a claim that portfolio exploration dominates the observed SERP.

CAPIITOLO remains `SERVE_PRIMARY`, but explicitly as a strategy/product-coverage decision: the Planner query is present with metrics unavailable, product/commercial facts are observed, project-specific SERP intent was not validated in M3-03, and search demand therefore remains `NOT DETERMINED`.

`mozae higienópolis metragem` is a family generalization: Mozae project demand is Planner-observed and the 46m²/73m² product fact is governed, but the exact metragem phrase is not treated as an observed query.

`planta apartamento tegra projeto` and `unidades disponíveis empreendimento tegra` are synthetic examples of late-consideration families derived from M3-03 strategy/fact policy; they are not represented as observed exact phrases.

Stage families remain strategically strong because Planner/SERP evidence validates lançamento, em construção and pronto para morar as search dimensions. The M3-05 phrases combining `Tegra + São Paulo + stage` are marked `SYNTHETIC_EXAMPLE` where the exact phrase was not observed.

Sibling GSC directly supports material project+price and project+address behavior for Caminhos families, including Reserva and Elo.

## 5. Product/search truth policy

Exact current project names may be `SERVE_PRIMARY` when governed coverage can add buyer-decision utility beyond the official Tegra page. Product existence alone never proves search demand.

Sold projects may retain entity coverage without implying active inventory.

ODE preserves `sold-out baseline + returned unit 22 exception`; Reserva preserves `100% sold baseline + exception units under consultation`. Both remain release-revalidation gated and must never be generalized into reopened stock.

Project+price, address, planta, metragem, tipologia and availability belong by default to the relevant project owner as a `PROJECT_FACT_SECTION`, not separate thin pages. Product fact admission and query-demand evidence are separate obligations.

## 6. Master / project / location / stage separation

Caminhos da Lapa is a master-development family. Nova Vivere, Garden Design, Elo Duo and Reserva are project entities. The master owner must not steal exact-project intent.

Brand+location may use `LOCATION_PORTFOLIO_SURFACE` only when a verified project set justifies the geography. M3-05 assigns an owner class conditionally; it does not create a route.

Stage discovery may coexist with project ownership. Current stage truth is required, while exact-project intent remains with the project owner.

## 7. Broad generic and noise policy

Broad city/neighborhood terms have Planner/SERP evidence but are marketplace-heavy; they remain `SUPPORT_SECONDARY` unless qualified by Tegra/project/stage/location facts. Raw `lapa`, corporate/tool queries, architecture spillover, typo/noise, rental and house inventory remain `DO_NOT_TARGET` under the governed matrix.

## 8. M3-06 handoff

M3-06 must resolve every accepted material family into exactly one concrete owner, unambiguous conditional state, support-only state or `NO_OWNER`, without creating uncontrolled overlap. Owner class does not itself authorize route creation.

## 9. Exit criteria after SES correction

This candidate is ready for focal re-review when:

- all 41 rows expose evidence lineage;
- observed intent is separate from strategy intent;
- intent confidence is separate from decision confidence;
- CAPIITOLO preserves the strategy decision without pretending search demand/intent were proved;
- metragem/planta/availability and stage synthetic phrases are labelled correctly;
- ODE/Reserva consume corrected M3-04 state;
- no runtime/platform mutation occurs.

## 10. Lifecycle

```text
MNT-M3-01 = COMPLETE / ACCEPTED
MNT-M3-02 = COMPLETE / ACCEPTED
MNT-M3-03 = COMPLETE / ACCEPTED — PR #58 merged
MNT-M3-04 = COMPLETE_CANDIDATE — PR #59 draft
MNT-M3-05 = COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE — PR #60 draft
MNT-M3-06 = downstream candidate; separate lifecycle
MNT-M3-07 = NOT_AUTHORIZED
```

No Ready/merge authorization is implied.