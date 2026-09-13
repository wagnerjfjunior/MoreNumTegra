# MNT-M3-01 — Market and Search demand research — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-01 — Market and Search demand research`  
Planning estimate: `24h`  
Canonical base resolved before execution: `894f0a7c94f15cf19a00481a45bc9d69749b067f`  
Execution authorization: Product Authority explicitly authorized starting MNT-M3-01 on `2026-09-13` after the PR #55 lifecycle gate.  
Scope class: `RESEARCH / EVIDENCE ONLY`  
Runtime/platform mutation: `NONE`

## 1. Purpose and method

This task establishes the first governed market/search-demand view for MoreNumTegra. It follows the adopted RESF provider method in the order:

1. market research;
2. keyword universe;
3. research prioritization.

It does **not** finalize search intent, page ownership, SERP strategy, content implementation or campaign/spend. Those belong to later MNT-M3 tasks.

Evidence classes are kept separate:

- `FIRST_PARTY_GSC` — observed Search Console performance for `sc-domain:moretegra.com.br`;
- `GOOGLE_KEYWORD_PLANNER` — 12-month average query-demand estimates and ad-competition index;
- `OFFICIAL_MARKET_CONTEXT` — Secovi-SP market statistics;
- `PROJECT_TRUTH` — current verified catalogue and product scope from canonical MoreNumTegra source;
- `INFERENCE` — interpretation drawn from the evidence above, explicitly labelled as such.

No keyword volume, competition score, ranking, commercial fact or search intent is invented.

## 2. Product/search scope used

The current product is a Tegra residential discovery and lead-generation experience for São Paulo. The canonical home exposes:

- portfolio browsing by development;
- location/zone filtering;
- stage filtering (`Pronto para Morar`, `Em construção`, `Lançamento`);
- catalogue search by project name or neighborhood;
- native Green Form 46 conversion.

The current catalogue includes verified projects across Lapa, Cidade Jardim, Brooklin, Higienópolis, Tatuapé, Moema, Perdizes, Jardins, Vila Nova Conceição, Chácara Klabin, Itaim Bibi, Sacomã and Alto do Ipiranga.

Out-of-scope demand for this research includes rental-only, houses-only and generic brokerage/service queries that do not match the current Tegra development-discovery product.

## 3. Market context — São Paulo new residential market

Official Secovi-SP evidence confirms a large active new-residential market in the city of São Paulo:

- May 2026: `9,993` new residential units sold and `13,130` new units launched;
- rolling 12 months through May 2026: approximately `114.8k` units sold and `144.7k` units launched;
- June 2026: `9,308` new residential units sold;
- rolling 12 months July 2025–June 2026: approximately `114.0k` units sold.

Official sources:

- https://secovi.com.br/secovi-sp-divulga-dados-de-maio-do-mercado-imobiliario/
- https://secovi.com.br/pesquisa-mensal-do-mercado-imobiliario/
- https://secovi.com.br/secovi-sp-apresenta-ao-jp-morgan-panorama-do-mercado-imobiliario-de-sao-paulo/

Interpretation: the addressable category is active at material scale. These market totals are context, not a claim of MoreNumTegra share or causality.

## 4. First-party Search Console — current observed demand

Source: connected Google Search Console property `sc-domain:moretegra.com.br`.  
Observed range: `2026-08-23` through `2026-09-13`, including fresh data.  
Observed totals: `0 clicks`, `26 impressions`, weighted average position approximately `27.52`.

Observed queries:

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---:|---:|---:|---:|
| moretegra | 0 | 2 | 0% | 1.5 |
| tegra sp | 0 | 1 | 0% | 17 |
| tegra incorporadora | 0 | 1 | 0% | 79 |
| tegra lançamentos | 0 | 2 | 0% | 7.5 |
| tegra preço metro quadrado | 0 | 1 | 0% | 47 |
| tegra reclame aqui | 0 | 1 | 0% | 15 |
| tegra são paulo | 0 | 3 | 0% | 56.33 |
| tegra sp lançamentos | 0 | 2 | 0% | 9.5 |
| tegra telefone | 0 | 1 | 0% | 1 |
| tegra vendas | 0 | 1 | 0% | 6 |
| tegraf | 0 | 1 | 0% | 85 |

Assessment: first-party organic discovery is still sparse and overwhelmingly entity/brand-related. There is not enough first-party volume to infer a trend, conversion relationship or generic-query coverage. Absence of generic/location impressions in this small sample is an observed gap, not proof that those queries are unreachable.

## 5. Google Keyword Planner — external demand universe

Source: connected Google Ads Keyword Planner, read-only.  
Location: Brazil.  
Language: Portuguese.  
Network: Google Search.  
Metric: `avg_monthly_searches` = approximate average monthly searches over the previous 12 months.  
Competition: Google Ads competition index `0–100`; it is **paid-search competition**, not organic SEO difficulty.

### 5.1 Brand/entity family

| Query | Avg. monthly searches | Ads competition index |
|---|---:|---:|
| tegra | 4,400 | 25 |
| tegra incorporadora | 3,600 | 32 |
| tegra construtora | 320 | 51 |
| construtora tegra | 210 | 66 |
| tegra vendas | 210 | 10 |
| tegra empreendimentos | 30 | 50 |
| tegra lançamentos | 20 | 51 |
| apartamentos tegra | 20 | 82 |
| tegra caminhos da lapa | 30 | 51 |
| tegra bueno brandão | 40 | 40 |

Evidence implication: Tegra/entity demand materially exceeds the current MoreNumTegra Search Console exposure. This is a discoverability opportunity signal, not a ranking guarantee.

### 5.2 Generic transaction/category family

| Query | Avg. monthly searches | Ads competition index |
|---|---:|---:|
| apartamentos são paulo | 12,100 | 75 |
| apartamentos a venda são paulo | 8,100 | 78 |
| apartamentos para comprar são paulo | 1,900 | 81 |
| apartamentos em são paulo | 1,600 | 61 |
| comprar apartamento são paulo | 1,600 | 81 |
| apartamentos na planta em são paulo | 590 | 80 |
| lançamentos imobiliários | 480 | 39 |
| lançamentos são paulo | 140 | 81 |
| apartamento em construção são paulo | 110 | 80 |
| apartamento pronto para morar são paulo | 20 | 89 |

Evidence implication: generic transaction demand is far larger than the current first-party query footprint, but it is also commercially competitive. Whether MoreNumTegra should own these families is a later intent/page-ownership decision, not decided here.

### 5.3 Location/zone family aligned to current catalogue

| Query | Avg. monthly searches | Ads competition index |
|---|---:|---:|
| cidade jardim apartamentos | 1,300 | 54 |
| apartamentos perdizes | 1,300 | 79 |
| lapa apartamentos | 1,000 | 77 |
| apartamentos vila nova conceição | 720 | 72 |
| apartamentos jardins sao paulo | 590 | 72 |
| apartamentos zona sul sao paulo | 390 | 77 |
| apartamentos brooklin sao paulo | 320 | 69 |
| apartamentos zona leste sao paulo | 260 | 73 |
| apartamentos higienopolis sao paulo | 170 | 69 |
| apartamentos moema sao paulo | 140 | 73 |
| apartamentos zona oeste sao paulo | 40 | 80 |

Evidence implication: location demand overlaps materially with neighborhoods already represented in the product catalogue. This supports location as a valid research cluster for M3-02/M3-03.

### 5.4 Stage/state family

| Query | Avg. monthly searches | Ads competition index |
|---|---:|---:|
| apartamento na planta zona sul | 480 | 81 |
| apartamentos prontos para morar zona sul | 110 | 77 |
| apartamento pronto para morar zona leste | 110 | 76 |
| apartamento na planta são paulo zona sul | 110 | 83 |
| apartamentos em construção zona sul | 30 | 84 |

Evidence implication: stage/state demand exists, generally at lower volume than broad transaction/location demand and with high paid-search competition. It remains directly aligned to the existing UI taxonomy.

### 5.5 Project-name family

Exact project-name demand is notable for several projects already present in the canonical MoreNumTegra catalogue:

| Query | Avg. monthly searches | Ads competition index |
|---|---:|---:|
| dsg itaim | 1,900 | 26 |
| ária higienópolis | 1,900 | 31 |
| teg sacomã | 1,900 | 4 |
| ledge brooklin | 1,600 | 25 |
| soma perdizes | 1,300 | 24 |
| zahle jardins | 1,300 | 20 |
| bueno brandão 257 | 1,300 | 14 |
| ypy alto do ipiranga | 1,300 | 29 |
| bem moema | 1,000 | 20 |
| chateau jardin | 880 | 40 |
| caminhos da lapa reserva | 880 | 8 |
| reserva caminhos da lapa | 720 | 36 |
| ode perdizes | 720 | 53 |
| teg sacoma | 590 | 17 |
| mozae higienopolis | 390 | 26 |
| ampere brooklin | 170 | 54 |
| caminhos da lapa elo duo | 110 | 63 |
| nova vivere | 110 | 43 |
| garden design tegra | 50 | 29 |
| universo tatuapé órbita | 110 | 53 |
| capitolo piero lissoni | NOT_AVAILABLE | NOT_AVAILABLE |
| tiel vila nova conceicao | NOT_AVAILABLE | NOT_AVAILABLE |

Important caveat: Keyword Planner reports phrase demand, not entity disambiguation. Some names may overlap other entities, addresses or concepts. M3-03 must validate SERP/entity ambiguity before any ownership or content decision.

### 5.6 Decision-modifier examples

Small but concrete demand exists around project decision modifiers:

| Query | Avg. monthly searches | Ads competition index |
|---|---:|---:|
| reserva caminhos da lapa preço | 20 | 59 |
| bem moema preço | 20 | 86 |
| ária higienópolis preço | 20 | 83 |
| ode perdizes preço | 10 | 91 |
| dsg itaim preco | 10 | 86 |
| reserva caminhos da lapa planta | 10 | 0 |
| teg sacoma planta | 10 | 23 |
| zahle jardins endereço | 10 | 0 |

These are evidence of decision-stage query shapes only. They do not authorize publishing new price/address/plant claims without product-fact verification.

## 6. Excluded/noise families

Keyword Planner also returned high-volume terms outside the current product contract, especially:

- apartment/house rental queries;
- houses for sale/rent;
- generic brokerage (`imobiliária`) queries;
- unrelated neighborhood/service combinations.

These are deliberately excluded from MoreNumTegra demand priorities because the current product is Tegra development discovery/sale lead generation, not a general rental or brokerage marketplace.

## 7. Research priority tiers

These tiers prioritize **further analysis**, not implementation or page ownership.

### Tier A — direct product/entity fit

- Tegra/entity family;
- verified project names already in the catalogue;
- project + decision modifiers where factual coverage can later be governed.

Rationale: strongest product-fit and substantial observable Planner demand; current GSC exposure is much smaller.

### Tier B — location families matching the catalogue

- Lapa;
- Cidade Jardim;
- Vila Nova Conceição;
- Jardins;
- Perdizes;
- Brooklin;
- Higienópolis;
- Moema;
- Zona Sul / Zona Oeste / Zona Leste where factual inventory exists.

Rationale: direct overlap between user search geography and current catalogue structure.

### Tier C — generic sale/category families

- apartamentos São Paulo;
- apartamentos à venda São Paulo;
- comprar apartamento São Paulo;
- apartamentos na planta São Paulo;
- lançamentos imobiliários.

Rationale: very large external demand, but broader intent and competitive SERPs require M3-03/M3-05 before ownership decisions.

### Tier D — stage/state families

- lançamento;
- em construção;
- pronto para morar;
- na planta.

Rationale: direct product-taxonomy fit with smaller demand and high paid-search competition.

## 8. Main findings

1. `MARKET_ACTIVE`: São Paulo new-residential activity is materially large by Secovi-SP sales/launch evidence.
2. `GSC_EARLY_SPARSE`: MoreNumTegra currently has only 26 observed Search Console impressions in the pulled period and zero clicks; current discovery is mostly brand/entity-shaped.
3. `BRAND_VISIBILITY_GAP`: Keyword Planner estimates `tegra` at 4.4k monthly searches and `tegra incorporadora` at 3.6k, while current MoreNumTegra first-party impressions on these families are minimal.
4. `PROJECT_NAME_DEMAND`: multiple verified catalogue project names show hundreds to ~1.9k estimated monthly searches.
5. `LOCATION_DEMAND`: several current catalogue locations have material query demand, especially Cidade Jardim, Perdizes, Lapa, Vila Nova Conceição and Jardins.
6. `GENERIC_DEMAND_LARGE`: broad São Paulo apartment purchase queries are much larger than current organic exposure, but their search intent/competition must be validated before MoreNumTegra ownership is assigned.
7. `STAGE_DEMAND_PRESENT`: product-stage taxonomy corresponds to real query demand, although generally smaller and highly competitive in paid-search terms.
8. `NOISE_MUST_BE_EXCLUDED`: rental, houses and generic brokerage demand should not be counted as target opportunity merely because Keyword Planner returned it.

## 9. Limitations / NOT_PROVEN

- Search Console sample is small and cannot support trend or causality claims.
- Keyword Planner scope used Brazil/Portuguese, not São Paulo city-only; query relevance is therefore broader than the exact market footprint.
- Keyword Planner competition is Ads competition, not organic ranking difficulty.
- Some project-name phrases may be ambiguous and require SERP/entity validation.
- No page owner, canonical keyword, search intent, funnel stage or content action is finalized by M3-01.
- No Semrush volume/KD/CPC validation was possible because the connected Semrush API reported insufficient API-unit balance.
- Bid values were not used because account-currency evidence was not resolved in this bounded research run.
- No Search Console property mutation, Google Ads mutation, campaign/spend, GTM/GA4, Green, DNS or Vercel change was made.

## 10. Handoff to subsequent MNT-M3 tasks

M3-01 provides demand evidence only.

- `MNT-M3-02` should extract/classify Search Console query evidence systematically and preserve sparse-data semantics.
- `MNT-M3-03` should inspect SERPs, competitors and search intent, especially for high-volume generic/location/project-name families and entity ambiguity.
- `MNT-M3-04` should govern product facts/claims before content decisions use project/location/price/plant/address modifiers.
- `MNT-M3-05` and `MNT-M3-06` should own final query-family/page ownership decisions.
- `MNT-M3-07` should formalize KPI baseline/success criteria.

No later task is authorized by this document.

## 11. Exit assessment

The required M3-01 research/evidence objective has been completed as a candidate for Product Authority acceptance:

```text
MNT-M3-01 = COMPLETE_CANDIDATE / PENDING_ACCEPTANCE
RUNTIME_MUTATION = NONE
ACCEPTED_PROGRAM_HOURS = UNCHANGED_AT_400h_UNTIL_ACCEPTANCE
NEXT_EXECUTION = PRODUCT_AUTHORITY_ACCEPTANCE_DECISION
```
