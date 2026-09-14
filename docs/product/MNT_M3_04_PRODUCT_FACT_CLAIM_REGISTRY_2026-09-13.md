# MNT-M3-04 — Governed Product Fact & Claim Registry — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Scope: `RESEARCH / PRODUCT TRUTH / CLAIM GOVERNANCE ONLY`. Runtime/platform mutation: `NONE`.

## 1. Contract

M3-04 separates what runtime currently says from what may be asserted as governed product truth.

Canonical candidate artifacts:

- this registry;
- `MNT_M3_04_SEPTEMBER_COMMERCIAL_RECONCILIATION_2026-09-13.md`;
- `data/MNT_M3_04_PRODUCT_FACT_CLAIM_REGISTRY_2026-09-13.csv`;
- `data/MNT_M3_04_CLAIM_CONFLICTS_2026-09-13.csv`.

All four must express the same adjudication. Downstream consumers must not apply a prose patch over stale CSV state.

The machine-readable registry is deliberately a **governance-state index**, not a cache of volatile prices. Its columns are `project_id, stage, inventory, disposition, evidence`. Exact commercial objects remain in their cited evidence and require release-time revalidation.

## 2. Evidence boundary

Coverage: `23/23` runtime cards, `21/21` unique project entities, current official project surfaces, current portfolio/status evidence where required, August commercial sources, and complete `Tegra/Setembro/Endomarket-Setembro.md` at commit `264d11477e2c6193a457f8541f58700c93743d26`.

Official project-source locator for the governed entity set: `Tegra/Empreendimentos_Tegra.md`.

Unread binary material is not promoted to current truth.

`PARTIAL_SOURCE_INSPECTION != CONSOLIDATED_TRUTH`

## 3. Source precedence by claim class

| Claim class | Primary authority | Rule |
|---|---|---|
| identity/address/headline product | current official Tegra page/microsite | usable while no newer official source conflicts |
| stage/general inventory baseline | current official project/portfolio surface | revalidate before material release |
| exact exception unit/price/consultation state | newest dated Product Authority commercial evidence + explicit authority adjudication when interpretation is required | release-blocked until the same commercial object is revalidated |
| comparative promotion | same unit + both prices + current availability proven together | otherwise prohibited |
| historical study | dated study | historical context only |

Preserve:

`PUBLIC SOLD-OUT BASELINE + GOVERNED EXCEPTION != GENERAL STOCK REOPENING`

`DATED COMMERCIAL EVIDENCE != EVERGREEN AVAILABILITY`

## 4. Material adjudications

### ODE Perdizes

Public baseline: `Entregue / 100% Vendido`.

September evidence: unit 22 / 2º andar / `R$ 2.090.000`.

Authority decision: `PA-MNT-M3-04-ODE-2026-09-13` = unit 22 returned.

Disposition: `SOLD_OUT_BASELINE + CURRENT_RETURNED_UNIT_EXCEPTION / RELEASE_REVALIDATION_REQUIRED`.

Do not present ODE as generally reopened. Unit 22 requires explicit release-time revalidation. The older comparative `De R$ 2.200.000` remains prohibited because it was not recertified.

### Reserva Caminhos da Lapa

Public baseline: `Entregue / 100% Vendido`.

September evidence: `100% Vendido / Preço sob consulta`.

`Preço sob consulta` alone does not prove inventory. Authority decision `PA-MNT-M3-04-RESERVA-2026-09-13` separately records exception units under consultation.

Disposition: `SOLD_OUT_BASELINE_WITH_EXCEPTION_UNITS_UNDER_CONSULTATION / RELEASE_REVALIDATION_REQUIRED`.

Do not invent quantity, unit or price; do not imply general reopening.

### Tièl Vila Nova Conceição

September evidence records unit 914 / `21m²` / `R$ 28.500/m²`, and product families of 19m² and 21m².

`21 × 28.500 = 598.500`, matching the runtime `R$ 598.500` total.

Disposition: `CURRENT_INTERNAL_MATCH / RELEASE_REVALIDATION_REQUIRED`.

The prior 19m²-versus-21m² conflict is resolved; availability and price remain volatile.

### Mozae Higienópolis

Runtime `45m² a 73m²` conflicts with governed `46m² e 73m²`.

Disposition: `RUNTIME_METRAGE_CORRECTION_REQUIRED`.

This is the remaining open row in the conflict queue.

## 5. Product Authority clarification provenance

The September reconciliation records two direct Product Authority decision IDs. They were incorporated under the explicit `2026-09-13` authorization to correct PR #59 according to the blocking `content_semantic_seo` findings.

Stable PR locator: `https://github.com/wagnerjfjunior/MoreNumTegra/pull/59`.

These decisions are authority assertions, not facts inferred from `Endomarket-Setembro.md`.

## 6. Deterministic release-time revalidation

No TTL is invented. A volatile claim remains release-blocked until an explicit verification record exists for the same commercial object.

Minimum record:

```text
project_id
unit when applicable
relevant metragem
price when claimed
availability / consultation state
promotion/comparison condition when applicable
source URL and/or repo path + commit SHA
verification timestamp
validating authority/source
```

Price, unit, discount and availability must refer to the same object. Comparative price requires both prices and same-unit identity. Unresolved conflicts fail closed.

## 7. Downstream use

M3-04 does not create pages or assign query ownership. It supplies governed factual state to M3-05/M3-06 and later implementation gates.

Allowed categories include `SEO_PRODUCT_FACT_OK`, `COMMERCIAL_REVALIDATION_REQUIRED`, `HISTORICAL_ENTITY_FACT_ONLY`, `DO_NOT_PUBLISH_CURRENT_AVAILABILITY`, and `DO_NOT_PUBLISH_CURRENT_PROMO`.

A `100% Vendido` project may still have an informational SEO owner; that is a downstream Search-policy decision.

## 8. No runtime mutation

This task does not change the live catalogue, Green, Vercel, GTM/GA4, Search Console, DNS, price, availability or page ownership.

## 9. Lifecycle

```text
MNT-M3-01 = COMPLETE / ACCEPTED
MNT-M3-02 = COMPLETE / ACCEPTED
MNT-M3-03 = COMPLETE / ACCEPTED — PR #58 merged
MNT-M3-04 = COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE — PR #59 draft
```

Downstream candidates do not make M3-04 accepted. No Ready/merge authorization is implied by this correction.