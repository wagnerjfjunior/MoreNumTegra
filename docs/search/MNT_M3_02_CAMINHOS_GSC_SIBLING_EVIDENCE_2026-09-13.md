# MNT-M3-02 — Caminhos da Lapa sibling GSC evidence — 2026-09-13

Status: `COMPLETE_SIBLING_EVIDENCE`

Project: `MoreNumTegra`  
Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task context: `MNT-M3-02 — Extract and classify Search Console queries`  
Sibling property: `sc-domain:caminhosdalapategra.com.br`  
Observation window: `2025-05-13..2026-09-13`  
Connector option: `include_fresh_data=false`  
Mutation: `NONE`.

## 1. Provenance boundary

This property is first-party Search Console evidence for a separate Tegra-specialized site. It is not MoreNumTegra Search Console data.

Preserve:

```text
CAMINHOS_GSC != MORENUMTEGRA_GSC
CAMINHOS_QUERY != MORENUMTEGRA_OBSERVED_QUERY
SIBLING_SITE_EVIDENCE = REAL SEARCH BEHAVIOR CONTEXT
SIBLING_SITE_EVIDENCE != MORENUMTEGRA PAGE OWNERSHIP
```

Its role in MNT-M3 is to provide a mature sibling-domain observation set for real vocabulary, brand/project modifiers, location modifiers, bottom-funnel modifiers and URL-overlap patterns while MoreNumTegra's own GSC corpus remains sparse.

## 2. Full-corpus inspection rule

The stabilized query corpus returned by the connected Search Console property for the full requested window was inspected in full before consolidation.

Canonicalized evidence files:

- `docs/search/data/MNT_M3_02_CAMINHOS_GSC_FULL_QUERY_CORPUS_2025-05-13_2026-09-13.csv` — all exposed query-level rows returned for the full window;
- `docs/search/data/MNT_M3_02_CAMINHOS_GSC_PAGE_TOTALS_2025-05-13_2026-09-13.csv` — page-level totals returned for the same window.

No first-page/sample-only interpretation was used.

## 3. Property-level baseline

Search Console property total for the stabilized window:

```text
clicks = 58
impressions = 10,686
CTR = 0.54%
average position = 28.7792
```

Do not sum query/page dimensional rows and compare mechanically with property-level totals. Search Console can suppress query rows and dimensional aggregation semantics can differ from property-level aggregation.

## 4. Page-level evidence

Observed pages:

| Page | Clicks | Impressions | CTR | Avg position |
|---|---:|---:|---:|---:|
| `/` | 41 | 6,752 | 0.61% | 40.4493 |
| `/reserva` | 10 | 3,033 | 0.33% | 20.4507 |
| `/elo` | 6 | 1,937 | 0.31% | 31.3211 |
| `/jerivas` | 1 | 546 | 0.18% | 29.2088 |
| `/eloduo` | 0 | 1,573 | 0% | 32.7877 |

These values are page-dimension evidence; they are not to be summed as a substitute for property totals.

## 5. Strong real-query families observed

### 5.1 Brand + master-development family

High-signal examples:

- `caminhos da lapa tegra` — 18 clicks / 511 impressions / position 4.319;
- `tegra caminhos da lapa` — 10 clicks / 559 impressions / position 5.0394;
- `tegra lapa` — 68 impressions / position 8.7647;
- `complexo caminhos da lapa` — 11 impressions / position 10.0909.

This is direct evidence that users combine the corporate brand and master-development/location naming in multiple lexical orders.

### 5.2 Project/entity family

Observed real project/entity variants include:

- `reserva caminhos da lapa`;
- `reserva - caminhos da lapa`;
- `caminhos da lapa reserva`;
- `caminhos da lapa elo`;
- `elo caminhos da lapa`;
- `caminhos da lapa elo duo`;
- `elo duo caminhos da lapa`;
- `eloduo`;
- `caminhos da lapa jerivas`;
- `jerivas caminhos da lapa`;
- `garden design caminhos da lapa`;
- `nova vivere caminhos da lapa`.

The corpus therefore proves that project-name demand is not restricted to one canonical spelling/order.

### 5.3 Bottom-funnel modifiers

Observed commercial/decision modifiers include:

- `reserva caminhos da lapa preço` — 156 impressions / position 28.4295;
- `elo caminhos da lapa preço` — 84 impressions / position 72.7024;
- `caminhos da lapa preço`;
- `reserva caminhos da lapa endereço` — 16 impressions / position 12.1875;
- `caminhos da lapa endereço`;
- street-address searches such as `rua fortunato ferraz 280` and `rua fortunato ferraz 1141`.

This is direct sibling-site evidence that price/address modifiers occur in organic demand for the product family. It does not authorize publishing unverified price/address claims in MoreNumTegra.

### 5.4 Product/category/location family

Observed unbranded or partially branded apartment/location terms include:

- `apartamento lapa` — 108 impressions;
- `apartamento na lapa` — 69 impressions;
- `apartamento caminhos da lapa`;
- `empreendimento caminhos da lapa` — 107 impressions;
- `condominio caminhos da lapa` / accented variants;
- `condominio lapa` / `condominio na lapa`;
- `lapa zona oeste` and related geographic-information variants.

These rows are useful for M3-03 intent/SERP analysis because they show that real sibling-site discovery extends beyond pure brand terms, even when current rankings are weak.

### 5.5 Architecture/designer/landscape spillover

The full corpus contains architectural/paisagismo terms including:

- `projeto paisagístico` — 372 impressions;
- `benedito abbud` and variants;
- `konigsberger` / `königsberger vannucchi`;
- `vannucci lapa`.

These are real search appearances but may represent informational/entity spillover rather than apartment-buying demand. M3-03 must inspect the SERP and intent before any content ownership decision.

### 5.6 Noise and typo family

The corpus also contains clearly noisy/ambiguous rows, including Tegra misspellings and unrelated/weakly related forms such as `tegrq`, `trgra`, `twgra`, `terga`, Cyrillic `тегра` / `тегро`, `casatudo`, `sabrina delazer` and others.

Their presence is evidence that not every Search Console query exposed by a relevant site should become an SEO target.

## 6. URL-overlap / possible cannibalization evidence

The query+page extraction shows several query families appearing on multiple URLs.

Examples:

### `caminhos da lapa`

Observed on:

- `/`;
- `/elo`;
- `/reserva`.

### `caminhos da lapa elo`

Observed on:

- `/`;
- `/elo`;
- `/eloduo`.

### `caminhos da lapa elo duo`

Observed on:

- `/`;
- `/elo`;
- `/eloduo`.

### `reserva caminhos da lapa`

Observed on:

- `/`;
- `/elo`;
- `/reserva`.

### `elo caminhos da lapa preço`

Observed on:

- `/`;
- `/elo`;
- `/eloduo`;
- `/reserva`.

This is **overlap evidence**, not automatic proof of harmful SEO cannibalization. M3-03 must determine whether SERP/intent and page-role overlap are materially conflicting before the project calls it cannibalization.

## 7. What this adds to MoreNumTegra research

Compared with the sparse current MoreNumTegra GSC corpus, this sibling domain proves the existence of real organic vocabulary in these families:

```text
brand + master development
master development + brand
project + master development
project-only / compressed name
project + price
project + address
master development + price/address
apartment + location
condominium + location/project
architect/landscape entity spillover
location informational queries
misspellings/noise
```

This is strategically useful because the uploaded Keyword Planner files estimate broader demand, while Caminhos GSC demonstrates which lexical forms have actually produced impressions/clicks on a real Tegra-specialized organic property.

## 8. Boundaries for MNT-M3-03

M3-03 may use this sibling corpus to prioritize SERP/intent checks, but it must not:

- rewrite Caminhos queries as MoreNumTegra queries;
- infer current MoreNumTegra rankings from sibling rankings;
- copy Caminhos page ownership automatically;
- call every multi-URL appearance cannibalization without SERP validation;
- publish prices/addresses/features unless the Product Fact & Claim Registry later verifies them;
- infer intent solely from lexical shape.

## 9. Exit statement

The connected Caminhos da Lapa Search Console property materially strengthens the research base because it provides mature, real first-party query behavior for a closely related Tegra product family.

For MNT-M3-02, its correct status is:

`SIBLING FIRST-PARTY CONTEXT — FULL CORPUS INSPECTED — NOT MORENUMTEGRA GSC`.
