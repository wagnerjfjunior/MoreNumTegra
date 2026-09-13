# MNT-M3-02 — Extract and classify Search Console queries — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-02 — Extract and classify Search Console queries`  
Planning estimate: `16h`  
Canonical execution base: `f10caa45649816f62331546b3e6df31607573de2`  
Execution authorization: Product Authority explicitly authorized MNT-M3-02 after MNT-M3-01 acceptance/merge and post-merge reconciliation authorization on `2026-09-13`.  
Scope class: `RESEARCH / EVIDENCE / CLASSIFICATION ONLY`  
Runtime/platform mutation: `NONE`.

## 1. Prerequisite — full input audit

Product Authority required complete inspection of the research corpus before consolidation. That prerequisite is satisfied by:

`docs/search/MNT_M3_USER_RESEARCH_INPUT_AUDIT_2026-09-13.md`

Audit coverage:

```text
9 / 9 Keyword Planner CSV files
8,321 / 8,321 Planner raw data rows
3,859 unique Planner keywords after cross-file deduplication
8 / 8 Tegra market-study PDFs
46 / 46 PDF pages visually inspected
17 user-supplied research files total
```

The earlier partial six-row classification artifact was explicitly removed and replaced only after this complete audit.

A second complete inspection was then executed against the connected sibling Search Console property `sc-domain:caminhosdalapategra.com.br`, using the full stabilized 16-month observation window requested for the connector (`2025-05-13..2026-09-13`). All exposed query-level rows returned for that window were inspected and canonicalized before this document was revised.

Sibling evidence:

- `docs/search/MNT_M3_02_CAMINHOS_GSC_SIBLING_EVIDENCE_2026-09-13.md`;
- `docs/search/data/MNT_M3_02_CAMINHOS_GSC_FULL_QUERY_CORPUS_2025-05-13_2026-09-13.csv`;
- `docs/search/data/MNT_M3_02_CAMINHOS_GSC_PAGE_TOTALS_2025-05-13_2026-09-13.csv`.

## 2. Evidence hierarchy for this task

MNT-M3-02 is specifically about **queries observed in Search Console**. Evidence classes remain separate:

1. `FIRST_PARTY_GSC_MORENUMTEGRA` — primary evidence for which queries MoreNumTegra itself is actually appearing for;
2. `SIBLING_FIRST_PARTY_GSC_CAMINHOS` — real first-party query behavior from a separate Tegra-specialized domain, used as contextual evidence only;
3. `GOOGLE_KEYWORD_PLANNER_USER_EXPORT` — contextual evidence for lexical/demand-family interpretation only;
4. `TEGRA_HISTORICAL_MARKET_STUDY` — contextual evidence for project/location/audience relevance only;
5. `INFERENCE` — interpretation derived from evidence and labelled separately.

Preserve:

```text
CAMINHOS_GSC != MORENUMTEGRA_GSC
PLANNER KEYWORD != GSC QUERY
MARKET STUDY SIGNAL != GSC QUERY
QUERY SHAPE != FINAL SEARCH INTENT
QUERY ALIGNMENT != PAGE OWNERSHIP
```

## 3. MoreNumTegra Search Console extraction

Connected property:

`sc-domain:moretegra.com.br`

Observed range:

`2026-08-23` through `2026-09-13`.

### 3.1 Property-level totals

With fresh data enabled:

```text
clicks = 0
impressions = 26
CTR = 0%
average position = 26.4231
```

With fresh data disabled/stabilized:

```text
clicks = 0
impressions = 23
CTR = 0%
average position = 26.2609
```

The difference is expected from inclusion of fresh Search Console data and must not be described as a trend by itself.

### 3.2 Query rows exposed by GSC

The query-dimension extraction exposed six rows on `https://moretegra.com.br/`:

| Query | Clicks | Impressions | CTR | Avg position |
|---|---:|---:|---:|---:|
| `tegra vendas` | 0 | 6 | 0% | 28.6667 |
| `tegra` | 0 | 4 | 0% | 26 |
| `tegra conecta` | 0 | 2 | 0% | 65 |
| `amaro tegra` | 0 | 1 | 0% | 52 |
| `ode perdizes tegra` | 0 | 1 | 0% | 50 |
| `tegra campo belo` | 0 | 1 | 0% | 75 |

Visible query rows account for `15` impressions, while the fresh property total is `26`.

```text
PROPERTY IMPRESSIONS = 26
VISIBLE QUERY-ROW IMPRESSIONS = 15
DIFFERENCE = 11
```

The missing 11 impressions are **not classified**. Search Console can suppress/omit query-level rows for privacy/aggregation reasons. Their query texts must not be inferred.

## 4. Conservative MoreNumTegra query-shape classification

The machine-readable classification is:

`docs/search/data/MNT_M3_02_GSC_QUERY_CLASSIFICATION_2026-09-13.csv`

| Query | Query shape | Product alignment | Confidence | Final intent | Page owner |
|---|---|---|---|---|---|
| `tegra` | `brand_head` | HIGH | HIGH | NOT_FINALIZED | NOT_ASSIGNED |
| `tegra vendas` | `brand_plus_commercial_modifier` | HIGH | HIGH | NOT_FINALIZED | NOT_ASSIGNED |
| `ode perdizes tegra` | `project_plus_brand` | HIGH | HIGH | NOT_FINALIZED | NOT_ASSIGNED |
| `tegra campo belo` | `brand_plus_location` | PARTIAL | MEDIUM | NOT_FINALIZED | NOT_ASSIGNED |
| `tegra conecta` | `brand_plus_service_or_platform_modifier` | UNRESOLVED | MEDIUM | NOT_FINALIZED | NOT_ASSIGNED |
| `amaro tegra` | `brand_plus_unresolved_entity` | UNRESOLVED | LOW | NOT_FINALIZED | NOT_ASSIGNED |

`brand_head` means the exposed query is the Tegra brand term without a visible modifier.

`brand_plus_commercial_modifier` means the lexical form contains the brand plus a commercial-word modifier. It does **not** by itself establish the user's final intent.

`project_plus_brand` means the query explicitly combines a current catalogue project name with Tegra.

`brand_plus_location` means the query combines Tegra with a geographic modifier. `Campo Belo` is represented in the broader apartment-demand corpus and in historical study geography, but MNT-M3-02 does not assign it to a future page.

`brand_plus_service_or_platform_modifier` and `brand_plus_unresolved_entity` are deliberately unresolved because their entity/intent meaning requires live SERP validation.

## 5. Context from the full Keyword Planner corpus

The uploaded Planner corpus is much larger than the first-party MoreNumTegra GSC query set:

```text
8,321 raw rows
3,859 unique keywords
4,462 repeated cross-file occurrences
0 inconsistent repeated rows
```

It shows material external demand in several families relevant to the product — brand/project, apartment purchase, location, development stage and typology — but also substantial rental, house/land, brokerage/service and ambiguous-location noise.

The MoreNumTegra organic query footprint is therefore still very small relative to the wider keyword universe supplied for research. This is about breadth of observed query coverage, not causality and not a forecast of obtainable traffic.

## 6. Context from the full historical market-study corpus

The eight supplied Tegra studies provide historical evidence about buyers, visitors/prospects, geography, age, profession and financial distributions across Soma Perdizes, Mozae, Reserva Caminhos da Lapa, Bueno Brandão 257, Ária Higienópolis, Ledge Brooklin, YPY Alto do Ipiranga and Universo Tatuapé/Órbita.

Important boundary:

- buyer samples range from extremely small in some projects (`Reserva ≈2`, `Bueno ≈5`) to materially larger in Soma;
- visitor samples are generally much larger and must not be treated as buyers;
- the standard dashboard period is 2023 through April 2024;
- Mozae adds qualitative motivations/location/product preferences;
- study methodology for several enrichment fields is not defined in the files.

These studies may help evaluate future commercial/product relevance, but cannot manufacture GSC queries or declare a current 2026 persona.

## 7. Full sibling GSC evidence — Caminhos da Lapa

Connected sibling property:

`sc-domain:caminhosdalapategra.com.br`

Stabilized observation window:

`2025-05-13..2026-09-13`

Property-level totals:

```text
clicks = 58
impressions = 10,686
CTR = 0.54%
average position = 28.7792
```

Observed page-level totals include:

| Page | Clicks | Impressions | CTR | Avg position |
|---|---:|---:|---:|---:|
| `/` | 41 | 6,752 | 0.61% | 40.4493 |
| `/reserva` | 10 | 3,033 | 0.33% | 20.4507 |
| `/elo` | 6 | 1,937 | 0.31% | 31.3211 |
| `/jerivas` | 1 | 546 | 0.18% | 29.2088 |
| `/eloduo` | 0 | 1,573 | 0% | 32.7877 |

Do not sum dimensional rows as a substitute for property totals; Search Console dimensional aggregation semantics differ and query rows can be suppressed.

### 7.1 Real lexical families proven by sibling GSC

The full query corpus contains real search behavior in these families:

```text
brand + master development
master development + brand
project + master development
project-only / compressed project name
project + price
project + address
master development + price/address
apartment + location
condominium + location/project
architect / landscape entity spillover
location informational queries
misspellings / unrelated noise
```

High-signal observed examples include:

- `caminhos da lapa tegra` — 18 clicks / 511 impressions / position 4.319;
- `tegra caminhos da lapa` — 10 clicks / 559 impressions / position 5.0394;
- `reserva caminhos da lapa` — 2 clicks / 806 impressions / position 13.1141;
- `elo tegra` — 1 click / 169 impressions / position 8.6686;
- `tegra lapa` — 68 impressions / position 8.7647;
- `eloduo` — 27 impressions / position 7.7407;
- `reserva caminhos da lapa preço` — 156 impressions / position 28.4295;
- `reserva caminhos da lapa endereço` — 16 impressions / position 12.1875;
- `apartamento lapa` — 108 impressions;
- `apartamento na lapa` — 69 impressions;
- `empreendimento caminhos da lapa` — 107 impressions;
- `projeto paisagístico` — 372 impressions / position 77.6075.

These are sibling-domain observations, not MoreNumTegra observations.

### 7.2 URL overlap

Several exact query families are exposed against more than one Caminhos URL. Examples include:

- `caminhos da lapa` on `/`, `/elo`, `/reserva`;
- `caminhos da lapa elo` on `/`, `/elo`, `/eloduo`;
- `caminhos da lapa elo duo` on `/`, `/elo`, `/eloduo`;
- `reserva caminhos da lapa` on `/`, `/elo`, `/reserva`;
- `elo caminhos da lapa preço` on `/`, `/elo`, `/eloduo`, `/reserva`.

This proves query/page overlap, not automatically harmful SEO cannibalization. MNT-M3-03 must validate SERP composition, intent and page-role conflict before assigning that label.

## 8. Current first-party MoreNumTegra Search pattern

The six exposed MoreNumTegra queries are overwhelmingly Tegra/entity-shaped:

```text
pure brand = 1 exposed query
brand + commercial modifier = 1
project + brand = 1
brand + location = 1
brand + service/platform modifier = 1
brand + unresolved entity = 1
```

No exposed MoreNumTegra query row in this extraction is a generic unbranded phrase such as `apartamento em são paulo`, `apartamento pronto para morar` or a generic neighborhood+apartment phrase.

This does not mean generic demand is absent. Planner shows it externally and Caminhos GSC shows real sibling-site impressions for unbranded location/category variants. MNT-M3-03 must determine actual SERP/intent feasibility.

## 9. Implications for MNT-M3-03

MNT-M3-03 has explicit Product Authority authorization to begin after MNT-M3-02 finalization. Its first research wave should validate live SERPs/entities/intents for:

- the six exposed MoreNumTegra GSC query shapes, especially `tegra conecta` and `amaro tegra`;
- high-fit current catalogue project-name families from Planner;
- sibling-proven brand/master-development/project variants from Caminhos;
- bottom-funnel modifiers such as `preço` and `endereço`;
- generic apartment-purchase terms with high external demand;
- location families where Planner volume is material but ambiguity/noise is high;
- stage/state families such as ready-to-move, under-construction and launch terms;
- overlapping query/page families where sibling evidence suggests possible ownership conflict.

MNT-M3-03 must keep entity ambiguity, SERP composition, sibling-site ranking and MoreNumTegra page ownership separate.

## 10. Exit criteria adjudication

MNT-M3-02 candidate satisfies the bounded research/classification scope because:

- live MoreNumTegra Search Console was queried using validated fields;
- property totals and exposed query rows were separated;
- all currently exposed MoreNumTegra query rows were classified;
- suppressed/unexposed MoreNumTegra query content was not invented;
- all 9 user-supplied Planner files / 8,321 rows were inspected before consolidation;
- all 8 Tegra market-study PDFs / 46 pages were inspected before consolidation;
- the full stabilized Caminhos sibling GSC query corpus for the 16-month window was inspected and canonicalized;
- sibling evidence was kept separate from MoreNumTegra first-party evidence;
- Planner and historical studies were used only as contextual evidence;
- final search intent was deliberately not assigned;
- MoreNumTegra page ownership was deliberately not assigned;
- no Search Console, Ads, GTM/GA4, Green, DNS, Vercel or production mutation occurred.

## 11. Candidate lifecycle

```text
MNT-M3-01 = COMPLETE / ACCEPTED
MNT-M3-02 = COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE
MNT-M3-03 = EXECUTION_AUTHORIZED_BY_PRODUCT_AUTHORITY / DEPENDENT_ON_M3-02_CANDIDATE
```

MNT-M3-02 planning effort (`16h`) contributes `0` additional accepted hours until Product Authority accepts the candidate and the corresponding PR lifecycle is completed.

Current accepted scope remains:

```text
accepted scope-equivalent = 424h / 1240h
remaining forecast = 816h
program progress = 34.19%
```

If MNT-M3-02 is accepted, accepted scope-equivalent becomes `440h / 1240h = 35.48%`. This is prospective until acceptance/merge.
