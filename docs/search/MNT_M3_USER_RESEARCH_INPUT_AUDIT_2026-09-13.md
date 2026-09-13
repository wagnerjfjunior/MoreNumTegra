# MNT-M3 — Full audit of user-supplied Search and market-research inputs — 2026-09-13

Status: `FULL_SOURCE_AUDIT_COMPLETE`

Project: `MoreNumTegra`  
Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Execution context: `MNT-M3-02 — Extract and classify Search Console queries`  
Canonical execution base: `f10caa45649816f62331546b3e6df31607573de2`  
Scope of this document: provenance/data-quality audit of the files supplied by Product Authority for MNT-M3 research.  
Runtime/platform mutation: `NONE`.

## 1. Inspection rule

This audit was produced only after complete inspection of the supplied corpus.

```text
KEYWORD PLANNER CSV FILES = 9 / 9 inspected
KEYWORD PLANNER RAW DATA ROWS = 8,321 / 8,321 parsed
MARKET STUDY PDF FILES = 8 / 8 inspected
MARKET STUDY PDF PAGES = 46 / 46 visually reviewed
TOTAL USER-SUPPLIED FILES IN THIS RESEARCH CORPUS = 17
```

No final consolidation may treat a first-page snippet, a sampled row set or a partial extraction as the complete source.

Source classes remain distinct:

- `FIRST_PARTY_GSC`: queries actually exposed by Search Console for `sc-domain:moretegra.com.br`;
- `GOOGLE_KEYWORD_PLANNER_USER_EXPORT`: external keyword-demand estimates supplied by Product Authority;
- `TEGRA_HISTORICAL_MARKET_STUDY`: project/profile studies supplied as PDFs;
- `INFERENCE`: interpretation derived from evidence, always labelled separately.

`KEYWORD_PLANNER != SEARCH_CONSOLE` and `MARKET_STUDY != CURRENT_LIVE_BUYER_PROFILE`.

## 2. Keyword Planner — complete file audit

All nine files use the same 26-column Google Keyword Planner export schema and the period `1 de setembro de 2025 - 31 de agosto de 2026`.

| File | Data rows | Columns | Empty keywords | Duplicate keywords inside file | SHA-256 |
|---|---:|---:|---:|---:|---|
| Keyword Stats 2026-09-13 at 12_52_22.csv | 1,553 | 26 | 0 | 0 | `5ea30e4d7c5b051ffa8d8580fb7901f2ba5d3c529ddf61c347479f4fd71e7672` |
| Keyword Stats 2026-09-13 at 12_57_37.csv | 864 | 26 | 0 | 0 | `ddcc3d8c065c0150aa0e8a8c29d9dc3b2ad803d7cf96b7260b009ee768841fc4` |
| Keyword Stats 2026-09-13 at 12_58_56.csv | 1,522 | 26 | 0 | 0 | `acb7a36f146c5f326a81cde8e37848135d91d3e955024600769b534bfc1158d4` |
| Keyword Stats 2026-09-13 at 12_59_35.csv | 1,522 | 26 | 0 | 0 | `517cfe331bc62e12bbeb126f7b791c3d0948b700a56933a61c53f69ccd90a784` |
| Keyword Stats 2026-09-13 at 13_00_36.csv | 1,513 | 26 | 0 | 0 | `b1d2d87d5b608a2bd04dd33a7d6906b4ad2f6c194f1a8b8e361d598f4039ba02` |
| Keyword Stats 2026-09-13 at 13_06_37.csv | 1,250 | 26 | 0 | 0 | `4626fbdcf91ecba2d0bc38eef8ccdfb50e2f1b772fac436036486b6de47e554c` |
| Keyword Stats 2026-09-13 at 13_09_31.csv | 57 | 26 | 0 | 0 | `91f245ac86add17121d8d8b1daa2bcc8709835145fe3ebfd33b51c373b94de27` |
| Keyword Stats 2026-09-13 at 13_12_36.csv | 13 | 26 | 0 | 0 | `a8353a4f627aa7b8c324c36dd3084a5c360ba741c568e648f42962a8f090b81e` |
| Keyword Stats 2026-09-13 at 13_13_40.csv | 27 | 26 | 0 | 0 | `971d1961267ee3c5cd66e5231baa09fa7548d0adcf0c62fdad7ce03a536462da` |
| **TOTAL** | **8,321** |  | **0** | **0** |  |

### 2.1 Cross-file deduplication

Across all 8,321 raw rows:

```text
UNIQUE KEYWORDS = 3,859
REPEATED CROSS-FILE OCCURRENCES = 4,462
INCONSISTENT REPEATED ROWS = 0
```

When a keyword appears in more than one export, all observed columns are identical across occurrences. Therefore cross-file deduplication by keyword can preserve one observed row without conflicting metrics.

The exports `12_58_56` and `12_59_35` contain the same 1,522 keyword set with identical values. The `13_00_36` export overlaps heavily with that universe. These are source-overlap facts and must not be interpreted as additional demand.

### 2.2 Column completeness

The complete schema includes Keyword, Currency, Avg. monthly searches, 3-month change, YoY change, Competition, indexed competition, low/high top-of-page bid, impression-share/organic fields, account/plan flags and twelve monthly search columns.

Observed completeness across the 8,321 raw rows:

```text
competition indexed value = populated in 8,057 rows
low bid = populated in 7,182 rows
high bid = populated in 7,182 rows
In account? = populated in 74 rows
Ad impression share = 0 populated
Organic impression share = 0 populated
Organic average position = 0 populated
In plan? = 0 populated
Sep-2025 .. Aug-2026 monthly search columns = 0 populated in every month
```

Therefore the supplied Planner exports do **not** support monthly seasonality analysis, organic ranking claims or organic impression-share claims.

### 2.3 Demand buckets observed after deduplication

Among the 3,859 unique keywords, `Avg. monthly searches` uses coarse Planner buckets:

| Avg monthly searches | Unique keywords |
|---:|---:|
| 0 | 6 |
| 50 | 1,782 |
| 500 | 1,230 |
| 5,000 | 779 |
| 50,000 | 58 |
| 500,000 | 4 |

Competition classifications among unique keywords:

```text
High = 1,584
Medium = 801
Low = 1,363
Unknown = 111
```

Planner Competition is paid-search competition. It is not organic SEO difficulty.

### 2.4 Research-shape scan of the complete deduplicated universe

A non-exclusive lexical scan of all 3,859 unique keywords produced these context flags:

```text
apartment-shaped = 1,659
commercial-modifier-shaped = 915
relevant-location token = 733
stage/state-shaped = 709
rental-shaped = 431
non-apartment product (house/land/etc.) = 292
typology-shaped = 185
brand/project-shaped = 156
service/brokerage-shaped = 142
investment-shaped = 12
```

These flags overlap and are **not** final search-intent categories. They exist only to quantify the breadth and noise of the supplied universe before MNT-M3-03.

### 2.5 Important quality findings

- high-volume generic terms can be highly ambiguous; `lapa`, for example, contains non-product and non-São-Paulo meanings in the returned universe;
- rental, houses, land and generic brokerage/service queries are present and cannot be treated as MoreNumTegra targets by volume alone;
- variants overlap heavily, so summing Planner volumes would overstate addressable demand;
- coarse Planner volume buckets must not be presented as exact market-size measurements;
- project-name phrases require entity/SERP validation when the name is ambiguous.

Observed examples from the full corpus include `apartamento pronto para morar` (5,000), `chácara klabin` (50,000), `apartamento morumbi` (5,000), `chateau jardin` (500), `universo tatuapé orbita` (500), plus exact/near-exact project-family signals for several current catalogue products. These are Planner estimates, not Search Console observations and not proof of page ownership.

## 3. Tegra market-study PDFs — complete visual audit

Seven of the eight PDFs are dashboard-like/image-heavy documents where extracted text alone is insufficient. Every page was therefore reviewed visually. Mozae contains a longer qualitative/product study and was also reviewed page-by-page.

| File | Pages inspected | SHA-256 | Evidence type |
|---|---:|---|---|
| Estudo de Mercado - Soma.pdf | 5 / 5 | `1186f7323b41338e5c6ecd7e23f9178e60f71d8565b63e143c2f847bdf0ee967` | historical buyer/visitor profile dashboard |
| Estudo de Mercado - Mozae.pdf | 11 / 11 | `974ef058ecd4c09f523cdd8525676b33d7cd52854bbeb00ef92c83e18d31b47a` | qualitative target/motivation/location/product study |
| Estudo de Mercado - Reserva Caminhos da Lapa.pdf | 5 / 5 | `d00765e7b39ee582b45621925e1a1b253405689ac35f59aee99df321932af712` | historical buyer/visitor profile dashboard |
| Estudo de Mercado - Bueno Brandao.pdf | 5 / 5 | `2615d7d4c1c20d621636ce91a53b1b8480984f298ea482013f33bcbff744d7e1` | historical buyer/visitor profile dashboard |
| Estudo Mercado - Ária.pdf | 5 / 5 | `6e492d8c1af142cc306f364ee1a31f03a04db4c5ea28b30c050f63aa1cd365a1` | historical buyer/visitor profile dashboard |
| Estudo de Mercado - Ledge Brooklin.pdf | 5 / 5 | `06af38e49d5c2a2512af895f53fd2ed3cf33f9c054d0f87f7675ffa43a857630` | historical buyer/visitor profile dashboard |
| Estudo de Mercado - YPY.pdf | 5 / 5 | `59dc73e713a1f5aeff547ae6d6e07082eae11fafdd0420ba493068be301fbe78` | historical buyer/visitor profile dashboard |
| Estudo de Mercado - Universo.pdf | 5 / 5 | `ada4dad34bcb4a5865643f0af5bc5b96701689c021234200323d863b2897c4d5` | historical buyer/visitor profile dashboard |
| **TOTAL** | **46 / 46** |  |  |

### 3.1 Common dashboard structure

Soma, Reserva, Bueno Brandão, Ária, Ledge, YPY and Universo repeat the same analytical structure:

1. cover;
2. buyer profile: sex, marital status, age, digital behavior, profession, city, neighborhood and radius;
3. visitor/prospect profile using the same dimensions;
4. buyer financial profile: properties, vehicles, score, monthly income, family income;
5. visitor financial profile using the same dimensions.

The visible period is generally `01/01/2023` through `29/04/2024` or `30/04/2024`. These files are therefore **historical profile evidence**, not proof of the current 2026 audience.

### 3.2 Sample-size/data-quality boundary

The buyer samples vary sharply by project and cannot be weighted equally:

```text
Reserva buyer sample ≈ 2
Bueno Brandão buyer sample ≈ 5
YPY buyer sample = 15
Ledge buyer sample = 21
Universo buyer sample = 32
Ária buyer dimensions ≈ 30-32
Soma buyer dimensions ≈ 107-115
```

Visitor/prospect samples are materially larger:

```text
Reserva ≈ 189
Soma ≈ 275
Bueno ≈ 327
Ária ≈ 408-409
Ledge ≈ 1,426-1,428
YPY ≈ 2,081-2,087
Universo ≈ 2,999-3,023
```

Some dimensions within the same project use different denominators, indicating incomplete/variable source coverage. Percentages therefore must retain their own observed denominator where material.

The PDFs do not define the methodology/source for `Comportamento Digital`, financial score, income/asset enrichment or the origin used for `Faixa Raio`. Those values must be described as study-reported, not independently verified.

### 3.3 Project findings retained from the complete files

#### Soma Perdizes

Buyer evidence is materially stronger than the tiny-sample studies. Age peaks at 41-50 (`27.4%`); `Empresário` is the largest visible buyer profession (`25 / 23.36%`); São Paulo accounts for `65 / 56.52%` of the city table; visible buyer neighborhoods include Centro (`10 / 8.70%`) and Perdizes (`8 / 6.96%`). Buyer `Faixa Raio >=10 Km` is `75 / 66.96%`. Buyer score is concentrated in `801-900` (`38.10%`) and `>900` (`22.86%`). Monthly and family-income distributions are broad, with `Acima 60 K` material in both (`19.09%` monthly; `19.82%` family). Visitors are concentrated mainly across 31-50 years, with São Paulo `186 / 67.64%`, Perdizes the largest visible neighborhood (`19 / 6.91%`) and `>=10 Km` `146 / 53.48%`.

#### Reserva Caminhos da Lapa

Buyer n≈2 is too small for broad persona generalization. Visitor evidence is more useful: sample ~189; age peaks at 31-40 (`28.6%`); visible neighborhoods include Lapa (`8 / 4.23%`) and Barra Funda, Centro, Perdizes, Pinheiros, Vila Ipojuca and Vila Leopoldina (`4 / 2.12%` each). Visitor score is strongest in `801-900` (`39.68%`) and `601-800` (`24.34%`).

#### Bueno Brandão 257

Buyer n≈5 is too small for general persona claims. The visible buyer age split is 31-40 (`40%`) and 41-50 (`60%`), with the displayed city table entirely São Paulo. Visitor sample is ~327; age visually peaks above 70 (`33.9%`); visible neighborhoods include Vila Nova Conceição (`16 / 4.89%`), Centro (`14 / 4.28%`), Itaim Bibi (`13 / 3.98%`) and Jardim Paulista (`11 / 3.36%`). Visitor score is concentrated in `801-900` (`34.78%`), `601-800` (`24.84%`) and `>900` (`24.22%`).

#### Ária Higienópolis

Buyer age includes 31-40 (`25.0%`) and 51-60 (`21.9%`) as the largest visible bands. `Empresário` is the top visible profession (`7 / 23.33%`), followed by `Advogado` (`5 / 16.67%`). São Paulo represents `14 / 43.75%` of the buyer city table, with several non-SP cities also represented. Buyer `>=10 Km` is `20 / 62.50%`; buyer score concentrates in `801-900` (`48.28%`) and `601-800` (`27.59%`). Visitor sample is ~408/409; São Paulo `247 / 60.54%`; visible neighborhoods include Centro (`18 / 4.40%`), Bela Vista (`12 / 2.93%`), Santa Cecília (`12 / 2.93%`), Consolação (`11 / 2.69%`) and Vila Buarque (`11 / 2.69%`).

#### Ledge Brooklin

Buyer n=21. Male `13 / 62%`; age 31-40 `52.4%`; São Paulo `17 / 80.95%`. Analyst and Engineer are the largest visible professions (`3 / 14.29%` each). Buyer score concentrates in `801-900` (`47.62%`) and `601-800` (`33.33%`). Monthly income peaks at `20-30 K` (`33.33%`) and family income also has its largest visible band at `20-30 K` (`23.81%`). Visitor sample ~1,426-1,428; São Paulo `937 / 65.71%`; visible neighborhoods include Cidade Monções (`42 / 2.94%`), Centro (`39 / 2.73%`), Brooklin Paulista (`33 / 2.31%`), Campo Belo (`24 / 1.68%`) and Vila Olímpia (`22 / 1.54%`).

#### YPY Alto do Ipiranga

Buyer n=15; 31-40 is `46.7%`, followed by 18-30 `26.7%`; São Paulo `13 / 86.67%`. Buyer financial percentages are based on this small sample and require caution. Visitor sample ~2,081-2,087; 31-40 is `37.1%`; visible neighborhoods include Centro (`55 / 2.64%`), Ipiranga (`53 / 2.54%`), Vila Mariana (`31 / 1.49%`), Bela Vista (`23 / 1.10%`), Cambuci (`21 / 1.01%`), Brás (`20 / 0.96%`), Saúde (`19 / 0.91%`) and Mooca (`18 / 0.86%`). Visitor monthly income `Até 5 K` is `44.80%`; family income `Até 5 K` is `36.67%` in the study.

#### Universo Tatuapé / Órbita

Buyer n=32; age 18-30 `34.4%`, 31-40 `21.9%`, 41-50 `28.1%`; São Paulo `31 / 96.88%`. Visible buyer neighborhoods Brás, Chácara Califórnia and Tatuapé each show `3 / 9.38%`. Visitor sample ~2,999-3,023; São Paulo `2,240 / 74.69%`; visible neighborhoods include Tatuapé (`134 / 4.43%`), Centro (`79 / 2.61%`), Vila Formosa (`55 / 1.82%`), Vila Gomes Cardim (`52 / 1.72%`) and Brás (`47 / 1.55%`). Visitor monthly income `Até 5 K` is `55.73%`; family income `Até 5 K` is `46.06%`.

#### Mozae

Mozae is a different source type and provides qualitative/product evidence rather than the five-page dashboard only.

Observed target definitions:

- `46m²`: 30-49 years, single or married/living together, no children;
- `73m²`: 30-49 years, married, with child;
- investor: 40-59 years;
- professions explicitly listed include entrepreneur, doctor, administrator, lawyer, consultant, sales representative, economist and others;
- slightly more than 50% of the resident profile own property; among owners, most live in apartments.

Residence-neighborhood shares displayed: Pompéia `20%`, Higienópolis `19%`, Perdizes `14%`, Barra Funda `14%`, Bela Vista `10%`. Work-neighborhood shares displayed: Centro `9%`, Barra Funda `7%`, Lapa `7%`, Higienópolis `5%`, Perdizes `5%`.

The study states that owning a property is the main resident motivator, with upgrade drivers including more leisure/security, newer/modern property and better use of internal space. Investor drivers shown are appreciation potential `44%`, ease of payment `33%`, and lower value than a ready property `27%`.

Location is described positively for access, public transport, important roads and infrastructure; the study highlights commerce, services, restaurants/bars, supermarket and shopping. The location itself is described as one of the main purchase factors, with a residential/neighborhood feel and proximity to universities, leisure and culture.

For product evaluation, leisure is the strongest spontaneous attraction; floor plans are positively evaluated for layout/use of space and number of suites; pool, fitness and barbecue stand out. Common-area concepts shown include pool, fitness, party room, playground, barbecue and delivery space.

Positive 46m² plan attributes shown: lavabo, layout, terrace dimensions, suite dimensions and air-conditioning technical area. Positive 73m² attributes shown: two suites, lavabo, master-suite dimensions, natural bathroom ventilation and terrace dimensions.

The file does not expose a sample-size/methodology section sufficient to independently reconstruct how these qualitative findings were generated.

## 4. How these sources may be used in MNT-M3

The files strengthen the research corpus but have distinct permitted meanings:

| Evidence | Permitted use | Not permitted by evidence alone |
|---|---|---|
| Search Console | observed current query/performance evidence for MoreNumTegra | infer hidden/suppressed queries or external market size |
| Keyword Planner | demand-universe expansion, lexical families, paid competition/bid context | claim actual MoreNumTegra traffic, exact market size, SEO difficulty or page ownership |
| Historical Tegra dashboards | historical profile/location/financial signals with sample-size caveats | claim current 2026 buyer persona or causality |
| Mozae qualitative study | historical motivations, location/product attributes and declared target profiles | generalize unchanged to every Tegra project/current buyer without validation |

## 5. Consolidation rule

Any MNT-M3-02/MNT-M3-03 consolidation derived from this corpus must:

1. preserve source class and date/period;
2. state sample size/denominator limitations where available;
3. distinguish buyer from visitor/prospect;
4. not convert Planner volume into observed GSC demand;
5. not infer missing monthly seasonality from empty Planner monthly columns;
6. not assign final search intent or page ownership before the applicable M3 gates;
7. not sum overlapping Planner variants as unique market demand;
8. keep unresolved/ambiguous entities unresolved until SERP/entity validation;
9. treat all study-specific financial/digital enrichment as study-reported unless methodology is separately proven;
10. never claim that partial-file inspection represents full-corpus review.

This document is the source-audit prerequisite for the MNT-M3-02 consolidation candidate.
