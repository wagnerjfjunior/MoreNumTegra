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

## 2. Evidence hierarchy for this task

MNT-M3-02 is specifically about **queries observed in Search Console**. Therefore:

1. `FIRST_PARTY_GSC` is the primary evidence for which queries MoreNumTegra is actually appearing for;
2. `GOOGLE_KEYWORD_PLANNER_USER_EXPORT` is contextual evidence for lexical/demand-family interpretation only;
3. `TEGRA_HISTORICAL_MARKET_STUDY` is contextual evidence for project/location/audience relevance only;
4. `INFERENCE` must remain explicit and cannot silently replace GSC observations.

Preserve:

```text
PLANNER KEYWORD != GSC QUERY
MARKET STUDY SIGNAL != GSC QUERY
QUERY SHAPE != FINAL SEARCH INTENT
QUERY ALIGNMENT != PAGE OWNERSHIP
```

## 3. Search Console extraction

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

## 4. Conservative query-shape classification

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

### 4.1 What this classification means

`brand_head` means the exposed query is the Tegra brand term without a visible modifier.

`brand_plus_commercial_modifier` means the lexical form contains the brand plus a commercial-word modifier. It does **not** by itself establish the user's final intent.

`project_plus_brand` means the query explicitly combines a current catalogue project name with Tegra.

`brand_plus_location` means the query combines Tegra with a geographic modifier. `Campo Belo` is represented in the broader apartment-demand corpus and in historical study geography, but MNT-M3-02 does not assign it to a future page.

`brand_plus_service_or_platform_modifier` and `brand_plus_unresolved_entity` are deliberately unresolved because their entity/intent meaning requires live SERP validation.

## 5. Context from the full Keyword Planner corpus

The uploaded Planner corpus is much larger than the first-party GSC query set:

```text
8,321 raw rows
3,859 unique keywords
4,462 repeated cross-file occurrences
0 inconsistent repeated rows
```

It shows material external demand in several families relevant to the product — brand/project, apartment purchase, location, development stage and typology — but also substantial rental, house/land, brokerage/service and ambiguous-location noise.

This difference is material: MoreNumTegra currently exposes only a very small first-party organic query footprint compared with the wider keyword universe supplied for research.

That statement is about **breadth of observed query coverage**, not a causal claim and not a forecast of obtainable traffic.

## 6. Context from the full historical market-study corpus

The eight supplied Tegra studies provide historical evidence about buyers, visitors/prospects, geography, age, profession and financial distributions across Soma Perdizes, Mozae, Reserva Caminhos da Lapa, Bueno Brandão 257, Ária Higienópolis, Ledge Brooklin, YPY Alto do Ipiranga and Universo Tatuapé/Órbita.

Important cross-source boundary:

- buyer samples range from extremely small in some projects (`Reserva ≈2`, `Bueno ≈5`) to materially larger in Soma;
- visitor samples are generally much larger and must not be treated as buyers;
- the standard dashboard period is 2023 through April 2024;
- Mozae adds qualitative motivations/location/product preferences;
- study methodology for several enrichment fields is not defined in the files.

Therefore these studies may help evaluate whether a future query family is commercially/product-relevant, but they cannot be used to manufacture GSC queries or declare a current 2026 persona.

## 7. Current first-party Search pattern

The six exposed queries are overwhelmingly Tegra/entity-shaped:

```text
pure brand = 1 exposed query
brand + commercial modifier = 1
project + brand = 1
brand + location = 1
brand + service/platform modifier = 1
brand + unresolved entity = 1
```

No exposed query row in this extraction is a generic unbranded phrase such as `apartamento em são paulo`, `apartamento pronto para morar` or a generic neighborhood+apartment phrase.

This is a direct observation about the currently exposed GSC query rows, not proof that generic demand does not exist. Planner evidence shows that broader generic demand exists externally; MNT-M3-03 must determine actual SERP/intent feasibility.

## 8. Implications for MNT-M3-03

The next research task, if separately authorized, should validate live SERPs/entities/intents for at least:

- the six exposed GSC query shapes, especially `tegra conecta` and `amaro tegra`;
- high-fit current catalogue project-name families found in Planner;
- generic apartment-purchase terms with high external demand;
- location families where Planner volume is material but ambiguity/noise is high;
- stage/state families such as ready-to-move, under-construction and launch terms.

MNT-M3-03 must keep entity ambiguity and SERP composition separate from raw Planner volume.

## 9. Exit criteria adjudication

MNT-M3-02 candidate satisfies the bounded research/classification scope because:

- the live Search Console property was queried using validated fields;
- property totals and query rows were separated;
- all currently exposed query rows were classified;
- suppressed/unexposed query content was not invented;
- full user-supplied Planner and market-study inputs were inspected before consolidation;
- Planner and historical studies were used only as contextual evidence;
- final search intent was deliberately not assigned;
- page ownership was deliberately not assigned;
- no Search Console, Ads, GTM/GA4, Green, DNS, Vercel or production mutation occurred.

## 10. Candidate lifecycle

```text
MNT-M3-01 = COMPLETE / ACCEPTED
MNT-M3-02 = COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE
MNT-M3-03 = PLANNED / NOT_AUTHORIZED
```

MNT-M3-02 planning effort (`16h`) must contribute `0` additional accepted hours until Product Authority accepts the candidate and the corresponding PR lifecycle is completed.

Before MNT-M3-02 acceptance:

```text
accepted scope-equivalent = 424h / 1240h
remaining forecast = 816h
program progress = 34.19%
```

If MNT-M3-02 is accepted, the accepted scope-equivalent would become `440h / 1240h = 35.48%`; this is a prospective calculation, not current accepted state.
