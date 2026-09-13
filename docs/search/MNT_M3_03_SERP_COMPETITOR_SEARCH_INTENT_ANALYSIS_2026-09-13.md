# MNT-M3-03 — SERP, competitor and search-intent analysis — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-03 — SERP, competitor and search-intent analysis`  
Planning estimate: `16h`  
Dependency head: `MNT-M3-02 @ 7e0e69fffac2603d2d7fddee09e9d181f04e78e0`  
Execution authorization: Product Authority explicitly authorized proceeding to the next task after completion of the MNT-M3-02 research candidate.  
Scope class: `RESEARCH / SERP OBSERVATION / INTENT HYPOTHESIS ONLY`  
Runtime/platform mutation: `NONE`.

## 1. Full-source basis and selection method

Product Authority required that consolidation never be based on first lines, snippets or sample rows presented as full-source analysis. M3-03 therefore starts from the complete audited source corpus produced in M3-02:

```text
MoreNumTegra GSC: all currently exposed query rows inspected
Caminhos da Lapa sibling GSC: full stabilized exposed query corpus inspected for 2025-05-13..2026-09-13
Keyword Planner: 9/9 exports, 8,321/8,321 rows, 3,859 unique keywords after deduplication
Tegra market studies: 8/8 PDFs, 46/46 pages visually inspected
```

A live SERP cannot be exhaustively executed for every one of the 3,859 Planner keywords without turning the task into a different crawl/market-monitoring program. Instead, after full-source inspection, M3-03 uses **stratified representative SERP validation** across every material query family exposed by the complete corpus.

The representative set covers:

- all six exposed MoreNumTegra GSC query shapes;
- high-signal sibling GSC master-development/project/bottom-funnel families;
- current catalogue project names with material Planner demand;
- broad city-level apartment purchase terms;
- neighborhood-level apartment purchase terms;
- development-stage terms (`pronto`, `em construção`, `lançamento`);
- architecture/paisagismo spillover;
- typo/noise examples.

This method does not claim that one representative query describes every keyword in its family. It exists to validate the dominant SERP/result-class and likely intent pattern before M3-05/M3-06 establish ownership.

Machine-readable matrix:

`docs/search/data/MNT_M3_03_SERP_INTENT_MATRIX_2026-09-13.csv`

## 2. Evidence boundaries

Preserve:

```text
SERP OBSERVATION != FINAL QUERY OWNERSHIP
INTENT HYPOTHESIS != FINAL INTENT CONTRACT
COMPETITOR IN SERP != BUSINESS COMPETITOR IN ALL CONTEXTS
OFFICIAL PROJECT PAGE != AUTOMATIC MORENUMTEGRA PAGE TARGET
SIBLING RANKING != MORENUMTEGRA RANKING
SEARCH VOLUME != RANKABILITY
MULTI-URL APPEARANCE != AUTOMATIC HARMFUL CANNIBALIZATION
```

M3-03 may resolve entities and describe observed result classes. M3-05 owns the final Search Intent / Query Ownership Contract and M3-06 owns the query-family to page-owner map.

## 3. MoreNumTegra GSC query resolution

### 3.1 `tegra`

The brand SERP resolves to Tegra corporate/official surfaces and corporate contact/about information. The likely intent is navigational brand/corporate discovery, potentially with secondary commercial exploration.

M3-03 does **not** assign the MoreNumTegra home as owner merely because the site contains Tegra inventory.

### 3.2 `tegra vendas`

Live search surfaces Tegra Vendas as a distinct sales house/organization. Observed authoritative surfaces include the Tegra Vendas Gupy careers site and official LinkedIn presence, which describe a large broker/sales organization and link to a broker portal.

Adjudication:

```text
ENTITY = TEGRA VENDAS
LIKELY INTENT = corporate / partner / recruitment / sales-house navigation
CONSUMER APARTMENT-PURCHASE INTENT = NOT PROVEN
MORENUMTEGRA PRODUCT FIT = LOW_TO_MEDIUM
```

This query should not be promoted as a consumer acquisition keyword solely because `vendas` sounds commercial.

### 3.3 `tegra conecta`

Live search did not establish a clear consumer-facing Tegra project entity. Results are consistent with broker/partner resource references and link-aggregation context.

Adjudication:

```text
ENTITY = PARTIALLY_RESOLVED
LIKELY INTENT = partner/broker/tool navigation
CONSUMER SEO TARGET = NOT_PROVEN
```

Keep this family unresolved for consumer ownership unless a later authoritative source establishes a relevant public consumer entity.

### 3.4 `amaro tegra`

Live SERP resolves `Amaro` to an official Tegra project in Santo Amaro. The official Tegra page identifies the project as delivered and 100% sold.

This upgrades the M3-02 lexical classification:

```text
M3-02: brand_plus_unresolved_entity
M3-03 entity resolution: AMARO_SANTO_AMARO / project_plus_brand
LIKELY INTENT = project entity navigation / project research
CURRENT COMMERCIAL FIT = LOW_TO_MEDIUM because official state is 100% sold
```

### 3.5 `ode perdizes tegra`

Live SERP resolves Ode Perdizes to an official Tegra project. Official Tegra evidence identifies it as delivered and 100% sold.

Likely intent is project-entity navigation/research. Current commercial fit is lower than for active inventory, but the query remains relevant for entity/portfolio understanding and potential sold-project content policy.

### 3.6 `tegra campo belo`

The official Tegra portfolio contains multiple Campo Belo projects, including Sofi Campo Belo plus other delivered/sold projects. Therefore `tegra campo belo` is better interpreted as **brand + location / portfolio exploration** than as a deterministic reference to one development.

Do not map the family to one project without a stronger modifier.

## 4. Project-name SERPs — current catalogue

### 4.1 Official Tegra dominance for many exact project queries

Live search resolves several current catalogue names directly to official Tegra product pages, including:

- DSG Itaim;
- Ária Higienópolis;
- Soma Perdizes;
- Ledge Brooklin;
- YPY Alto do Ipiranga;
- Garden Design;
- Nova Vivere.

Implication: exact project-name queries have strong entity intent and usually encounter an authoritative first-party Tegra destination. A future MoreNumTegra project page cannot justify itself by simply duplicating the official ficha/product copy. Any project-owner architecture must add distinct decision-useful value while remaining factually governed.

### 4.2 Multi-authority project SERPs

`Ledge Brooklin` has authoritative surfaces from both Tegra and co-developer Exto. This is a genuine multi-authority SERP, not a simple official-vs-broker structure.

`Bueno Brandão 257` shows strong specialized/project/broker surfaces, including Tegra sales infrastructure and multiple dedicated domains. This indicates that exact high-value project terms can be heavily contested by specialized SEO/lead-generation sites.

### 4.3 Caminhos da Lapa active project ecosystem

Live search for Caminhos-family products shows a dense ecosystem:

- official `caminhosdalapaoficial.com.br` master-development page;
- official Garden Design and Nova Vivere project pages;
- Tegra corporate project pages;
- standalone project domains;
- broker/specialized microsites.

The official master site currently presents a lifecycle mix across the complex, including active launch/construction/pronto products and sold projects. Therefore future MoreNumTegra architecture must distinguish:

```text
MASTER DEVELOPMENT
vs
ACTIVE PROJECT
vs
SOLD PROJECT
vs
STAGE/FILTER DISCOVERY
```

without copying factual claims that have not been admitted to the future Product Fact & Claim Registry.

## 5. Broad generic city-level purchase SERPs

The broad `apartamentos São Paulo` / `apartamentos à venda São Paulo` family is dominated by large marketplaces and inventory aggregators such as QuintoAndar, ZAP Imóveis and OLX.

Observed SERP behavior is strongly transactional/listing-oriented:

- large inventory counts;
- filterable listings;
- price/area/bedroom facets;
- neighborhood aggregation;
- direct property cards.

Adjudication:

```text
LIKELY INTENT = transactional inventory discovery
DOMINANT RESULT CLASS = large marketplace / aggregator
MORENUMTEGRA PRODUCT FIT = only partial unless qualified by Tegra/project/stage/location
```

This does not mean MoreNumTegra can never rank for a broad term. It means broad generic city terms should not be assigned to the home simply because Planner volume is high.

## 6. Neighborhood generic SERPs

### 6.1 Brooklin

`apartamento Brooklin` is inventory-heavy. QuintoAndar and local real-estate listing sites expose many units and rich commercial facets.

The likely intent is transactional neighborhood inventory discovery. A Tegra project page such as Ledge can satisfy a **specific product** query, but it is not semantically equivalent to the whole neighborhood inventory query.

### 6.2 Perdizes

`apartamento Perdizes` similarly resolves to large marketplace inventory, with extensive filters, nearby-neighborhood discovery and purchase FAQs.

This must remain separate from entity queries such as `Soma Perdizes` or `Ode Perdizes`.

### 6.3 Lapa ambiguity

The audited Planner universe already showed semantic/geographic noise around `Lapa`. Sibling GSC proves real São Paulo apartment queries such as `apartamento lapa` and `apartamento na lapa`, but live SERP behavior can mix real-estate inventory with other geographic/entity meanings unless São Paulo/product context is explicit.

Recommendation for later ownership work: prefer qualified forms such as `apartamentos na Lapa São Paulo`, `apartamentos Tegra na Lapa`, stage/project modifiers, or master-development entities over raw `lapa`.

## 7. Development-stage SERPs

Stage/state is validated as a real search architecture dimension, not only an internal MoreNumTegra filter.

### 7.1 Pronto para morar

`apartamento pronto para morar em São Paulo` returns both:

- dedicated inventory/state pages from incorporators, such as Setin;
- editorial/product-discovery content, including a Tegra article specifically targeting ready-to-move apartments in São Paulo.

Likely intent is mixed commercial category + informational support.

### 7.2 Em construção

`apartamentos em construção São Paulo` returns stage-specific inventory from marketplaces and incorporators. ZAP exposes a dedicated `em-construcao` listing surface; incorporators such as Paulo Mauro expose their own construction-stage inventory.

Likely intent is transactional stage-filtered inventory.

### 7.3 Lançamento

`lançamentos imobiliários São Paulo` returns launch inventory/curation from aggregators, brokers and project/portfolio sites. Apto.vc, for example, exposes a large launch-filtered inventory page.

Adjudication:

```text
READY / UNDER_CONSTRUCTION / LAUNCH
= validated external search dimensions
!= automatically one page each
```

Whether these become indexable state pages, sections, hubs or filtered catalogue routes belongs to M3-05/M3-06/M4.

## 8. Bottom-funnel modifiers from sibling first-party evidence

The full Caminhos GSC corpus materially strengthens confidence that bottom-funnel modifiers are real organic behavior rather than Planner-only suggestions.

Observed examples:

- `reserva caminhos da lapa preço` — 156 impressions;
- `elo caminhos da lapa preço` — 84 impressions;
- `reserva caminhos da lapa endereço` — 16 impressions;
- street-address searches for Caminhos products.

Intent hypotheses:

```text
PROJECT + PREÇO = commercial investigation / late consideration
PROJECT + ENDEREÇO = navigation / location verification
```

These are valuable future content fields only when verified by the Product Fact & Claim Registry. M3-03 does not authorize prices, addresses or availability to be published.

## 9. Architecture/paisagismo spillover and noise

The sibling site receives impressions for architecture/paisagismo entities and topics such as `projeto paisagístico`, Benedito Abbud and Königsberger Vannucchi.

Some of these entities are genuinely related to project authorship, but the query may be informational and unrelated to buying an apartment. They should not become target keywords merely because they generate impressions.

Likewise, the full sibling GSC contains misspellings, foreign-script brand variants and unrelated/weakly related query forms. This reinforces a core rule:

`GSC APPEARANCE != SEO TARGET`.

## 10. Competitor/result-class model

M3-03 does not define one universal competitor list. Competitor classes vary by query family.

| Query family | Observed competing/result classes |
|---|---|
| exact Tegra project | official Tegra project page, co-developer, project microsite, broker/specialized lead-gen |
| master development | official master-development site, corporate project pages, broker/specialized ecosystem |
| broad city apartment | QuintoAndar, ZAP, OLX and large aggregators |
| neighborhood apartment | marketplaces + local broker inventory |
| stage/state | marketplace stage filters, incorporator inventory pages, editorial discovery |
| corporate Tegra | Tegra corporate/about/contact, RI, Tegra Vendas/careers/partner surfaces |
| architecture/designer | architecture/paisagismo informational/entity results |

This distinction matters because a page can compete with totally different result classes depending on the query.

## 11. Sibling URL-overlap adjudication

M3-02 established exact query families appearing across multiple Caminhos URLs. M3-03 keeps this as **potential ownership conflict evidence** rather than automatically declaring harmful cannibalization.

Examples include `caminhos da lapa`, `caminhos da lapa elo`, `caminhos da lapa elo duo`, `reserva caminhos da lapa` and `elo caminhos da lapa preço` across home/project routes.

The observed pattern is sufficient to establish a design requirement for M3-05/M3-06:

> each high-value query family should have an explicit intended page role/owner so the MoreNumTegra architecture does not reproduce uncontrolled sibling overlap.

It is not sufficient to state that Caminhos currently has an SEO defect without deeper page-level/canonical/time-series evidence.

## 12. Strategic conclusions

### 12.1 Strongest search opportunity layers

Evidence converges on four high-fit layers:

1. **Tegra/project entities** — exact current product names and brand-qualified projects;
2. **location + Tegra/project** — neighborhood/zone where tied to verified inventory;
3. **stage/state discovery** — lançamento, em construção, pronto para morar;
4. **late-consideration modifiers** — preço, endereço, planta, metragem, disponibilidade/condições only when facts are governed.

These layers align materially better with the MoreNumTegra product than a strategy centered on broad `apartamentos São Paulo` alone.

### 12.2 Broad generic terms are useful but not automatic primary owners

Their Planner volume is large, but SERPs are inventory-portal dominated. They remain important for demand modeling, supporting content, long-tail qualification and later IA, but MoreNumTegra should not create thin doorway pages merely to chase volume.

### 12.3 Project pages require differentiation

Official Tegra already owns strong authoritative pages for many exact project entities. MoreNumTegra should add buyer-decision utility rather than replicate official content. Candidate differentiated utility for later design can include cross-project comparison, stage/location discovery, verified facts, decision filters and governed conversion paths.

This is a design inference, not implementation authorization.

### 12.4 Sold projects need an explicit policy

Several first-party GSC entity queries resolve to projects currently marked 100% sold by official Tegra sources (`Amaro`, `Ode Perdizes`, and sold Caminhos projects). M3-05 must decide whether sold-project queries belong to historical/entity coverage, redirect/supporting content, master-portfolio context, or no target at all.

Do not mix sold entity authority with active sales inventory.

## 13. Handoff requirements for M3-04 / M3-05 / M3-06

M3-03 establishes facts about SERP composition and likely intent, but leaves these decisions open:

- which project/location/stage facts are verified enough to publish → M3-04;
- which query families MoreNumTegra intentionally serves and their final intent labels → M3-05;
- which route/page owns each accepted family → M3-06.

Particularly important inputs for M3-04:

- project lifecycle state;
- current metragem/tipology;
- verified location/address;
- price/date/reference-unit provenance;
- active vs sold inventory;
- developer/co-developer attribution;
- stage.

## 14. Exit criteria adjudication

MNT-M3-03 candidate satisfies its bounded research scope because:

- it uses the complete audited M3-02 source universe as the source-selection basis;
- every material query family from the complete corpus is represented in live SERP validation;
- all exposed MoreNumTegra GSC query shapes were considered;
- ambiguous MoreNumTegra entities were resolved where authoritative evidence existed;
- sibling GSC was used only as sibling evidence;
- broad generic, neighborhood, stage, project, bottom-funnel, spillover and noise families were compared separately;
- competitor/result classes were assigned by query family rather than by a single generic competitor list;
- intent remains hypothesis-level and page ownership remains unassigned;
- no commercial fact was promoted to MoreNumTegra truth merely because it appeared in a SERP;
- no runtime/platform mutation occurred.

## 15. Candidate lifecycle

```text
MNT-M3-01 = COMPLETE / ACCEPTED
MNT-M3-02 = COMPLETE_CANDIDATE / PENDING_ACCEPTANCE / PR #57
MNT-M3-03 = COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE
MNT-M3-04 = PLANNED / NOT_AUTHORIZED
```

M3-03 is a stacked research candidate based on the unmerged exact M3-02 head. It must not be represented as integrated into `main` until dependency lifecycle is closed.

Current accepted program scope remains `424h / 1240h = 34.19%` until M3-02 and M3-03 are individually accepted and merged. Prospective accepted scope after both would be `456h / 1240h = 36.77%`.

## 16. Live SERP sources observed

Representative authoritative/result-class sources used in this task include:

- Tegra official corporate/about/contact and project pages under `tegraincorporadora.com.br`;
- official Caminhos master/project surfaces under `caminhosdalapaoficial.com.br`;
- Tegra Vendas Gupy and LinkedIn surfaces;
- Exto Ledge Brooklin co-developer page;
- QuintoAndar neighborhood inventory pages;
- ZAP `em construção` inventory;
- Setin ready-to-move inventory;
- Apto.vc launch inventory;
- project-specific and broker/specialized domains observed for Garden Design and Bueno Brandão 257.

Search results are point-in-time SERP observations and may change. URLs/result classes are evidence for this research snapshot, not permanent ranking assertions.
