# MNT-M6-04 — SEM Campaign / Query Contract v1

Date: 2026-09-22

Status: COMPLETE / DESIGN_CANONICALIZED / INTERNAL_CAMPAIGN_REGISTRY_CREATED / NO_EXTERNAL_ADS_MUTATION

## 1. Purpose

Define the canonical Search/SEM campaign and query architecture for MoreNumTegra before landing-page mapping, budget authorization or Google Ads implementation.

M6-04 owns:
- internal planned Search campaign registry;
- campaign/ad-group boundaries;
- query-intent classes;
- positive-keyword eligibility;
- match-type policy;
- ambiguous-query policy;
- competitor-query policy;
- negative-keyword governance;
- search-term governance;
- RSA/ad-group structural requirements;
- campaign-query QA contract.

M6-04 does not:
- create Google Ads campaigns;
- create ad groups/keywords/ads in Google Ads;
- allocate budget;
- activate spend;
- set bids;
- create conversion actions;
- mutate GTM/GA4;
- change landing pages;
- create new project pages;
- publish external ads.

## 2. Canonical dependencies

Project authority:
- docs/attribution/MNT_M6_01_ATTRIBUTION_MODEL_IDENTIFIER_BOUNDARIES_V1_2026-09-22.md
- docs/attribution/MNT_M6_02_UTM_SOURCE_MEDIUM_CAMPAIGN_CONTRACT_V1_2026-09-22.md
- docs/attribution/MNT_UTM_CONTRACT_V1.json
- docs/attribution/MNT_M6_03_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1_2026-09-22.md
- docs/attribution/MNT_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1.json

Canonical content inventory observed at main:
- Home: Apartamentos Tegra em São Paulo
- Ária Higienópolis: apartamentos/studios prontos
- Elo Duo Caminhos da Lapa: apartamento pronto na Lapa
- CAPIITOLO Chácara Klabin: 210 m² / Piero Lissoni

No other exact-project Search landing page is assumed by M6-04.

## 3. External Google behavior used by this contract

Current Google Ads documentation confirms:
- Broad, Phrase and Exact are distinct positive keyword match types;
- broader match types reach the narrower queries plus additional related queries;
- search terms can differ from configured keyword match type because of close variants;
- negative keyword match behavior differs from positive matching and does not automatically cover all synonyms/singular/plural variants;
- tightly themed ad groups improve relevance between query, keyword, ad and landing page;
- responsive search ads should be centered on a specific business goal and match what the user searches to what they find on the landing page.

Current Google behavior also indicates that the campaign-level broad-match setting is tied to conversion-based Smart Bidding and, from September 2026, broad-match campaign settings are being moved toward AI Max behavior.

Therefore MoreNumTegra does not authorize campaign-level Broad Match/AI Max in the initial Search launch.

## 4. Search-only V1 scope

Initial SEM scope:

SEARCH NETWORK ONLY

Explicitly out of M6-04 V1:
- Performance Max;
- Demand Gen;
- Display;
- Video campaigns;
- Shopping;
- app campaigns;
- Local campaigns;
- broad-match-only campaign setting;
- AI Max activation;
- dynamic search ads;
- competitor conquest campaigns.

Later expansion requires explicit architecture and budget review.

## 5. Internal campaign registry

M6-04 allocates the following stable internal campaign IDs.

These are project registry records only. They are NOT Google Ads campaign IDs and do not prove external campaign existence.

### MNT-CMP-000001

utm_id: mnt-cmp-000001
utm_campaign: aria-higienopolis-leads-sp-202609
target: aria-higienopolis
objective: leads
channel: google / cpc
external_state: NOT_CREATED
candidate landing family: Ária exact-project page
campaign class: exact-project Search

### MNT-CMP-000002

utm_id: mnt-cmp-000002
utm_campaign: elo-duo-leads-sp-202609
target: elo-duo
objective: leads
channel: google / cpc
external_state: NOT_CREATED
candidate landing family: Elo Duo exact-project page
campaign class: exact-project Search

### MNT-CMP-000003

utm_id: mnt-cmp-000003
utm_campaign: capiitolo-leads-sp-202609
target: capiitolo-piero-lissoni
objective: leads
channel: google / cpc
external_state: NOT_CREATED
candidate landing family: CAPIITOLO exact-project page
campaign class: exact-project Search

### MNT-CMP-000004

utm_id: mnt-cmp-000004
utm_campaign: portfolio-tegra-leads-sp-202609
target: portfolio-tegra
objective: leads
channel: google / cpc
external_state: NOT_CREATED
candidate landing family: MoreNumTegra Home
campaign class: portfolio/brand Search

M6-05 owns the exact landing-page/query mapping and may block any of these campaign records if landing relevance is insufficient.

## 6. Campaign isolation

V1 rule:

ONE PRIMARY COMMERCIAL INTENT FAMILY PER CAMPAIGN

Do not place multiple exact projects into one generic Search campaign merely to simplify account setup.

Reasons:
- independent budgets/queries can be inspected later;
- project relevance stays explicit;
- project-specific negative and query governance remains possible;
- landing-page relevance is easier to prove;
- campaign UTM identity stays unambiguous.

The portfolio campaign is intentionally separate from exact-project campaigns.

## 7. Ad-group architecture

Each exact-project campaign may contain at most these initial ad-group classes:

### A. PROJECT_BRAND

Purpose:
- exact project-name and project+developer queries;
- strong navigational/commercial intent.

Examples by project:
- aria higienopolis
- aria tegra
- elo duo
- elo duo tegra
- caminhos da lapa elo duo
- capiitolo
- capiitolo tegra
- capiitolo piero lissoni

### B. PROJECT_COMMERCIAL

Purpose:
- project name plus commercial/product modifiers.

Allowed modifier classes:
- apartamento
- apartamentos
- studio/studios when supported by exact project content
- preço/valor/condições
- venda/comprar
- visita/agendar visita
- planta/plantas
- metragem
- dormitórios/suítes only where supported by exact page content
- pronto/pronto para morar only where supported by exact project content
- localização/endereço only where page actually provides governed location context

Do not copy an unsupported modifier from one project to another.

### C. LOCATION_PRODUCT

State:
DEFERRED_TO_M6_05

Generic locality queries such as "apartamento higienopolis" or "apartamento chacara klabin" have broader intent and require explicit landing relevance/ad-copy proof before activation.

They are not automatically authorized by the existence of a project page.

## 8. Portfolio campaign ad groups

MNT-CMP-000004 may initially contain:

### A. TEGRA_PORTFOLIO

Eligible query intent:
- apartamentos tegra
- apartamentos tegra sao paulo
- empreendimentos tegra sao paulo
- tegra apartamentos
- moretegra / more tegra brand queries where relevant

### B. TEGRA_LOCATION_PORTFOLIO

State:
DEFERRED_TO_M6_05

Generic queries combining Tegra + region/location require Home-page relevance proof before activation.

The portfolio campaign must not absorb exact-project queries merely because the Home lists projects.

Exact-project queries belong to the exact-project campaign where possible.

## 9. Ambiguous single-token queries

The following examples are prohibited as standalone positive keywords in V1:

- aria
- elo
- duo
- tegra
- jardim
- garden
- reserva
- capitolo/capiitolo only if query ambiguity is later demonstrated by live search-term evidence

Rationale:
- single tokens can carry unrelated intent;
- project naming alone does not guarantee commercial real-estate intent;
- Broad is not required to discover these users in V1.

Exception:
- a highly distinctive project token may later be allowed only after Search Terms evidence demonstrates commercial precision.

CAPIITOLO full spelling remains eligible in PROJECT_BRAND because it is the full exact-project identifier used by the canonical page. The generic Italian spelling "capitolo" is not automatically treated as the same keyword.

## 10. Match-type policy

Initial V1 positive match types:

EXACT + PHRASE

Broad:
NOT_AUTHORIZED_FOR_INITIAL_LAUNCH

Rules:
- every activated keyword must have a governed query-intent class;
- Exact is used for highest-confidence project/commercial queries;
- Phrase is used for controlled expansion around the same intent;
- Broad may not be enabled simply to gain volume;
- campaign-level Broad Match/AI Max is not authorized by M6-04;
- future Broad activation requires:
  1. conversion action promoted/eligible for optimization;
  2. M6-08 conversion QA PASS;
  3. post-launch Search Terms evidence;
  4. negative coverage reviewed;
  5. explicit optimization decision.

## 11. Keyword syntax registry

Machine-readable keyword records must store:

- keyword_id;
- campaign_id;
- ad_group_class;
- normalized_term;
- match_type = EXACT | PHRASE;
- intent_class;
- project_scope;
- status = PLANNED | BLOCKED | ACTIVE_LATER;
- evidence/provenance.

Human-entered Google Ads syntax such as brackets or quotation marks is rendering/output format, not the canonical stored term.

Example internal term:
normalized_term = aria higienopolis
match_type = EXACT

External-rendered form later:
[aria higienopolis]

## 12. Query-intent classes

Canonical Search query classes:

### Q1 PROJECT_NAVIGATIONAL

User explicitly names the exact project.

Expected value:
high relevance / high commercial likelihood.

### Q2 PROJECT_COMMERCIAL

Exact project + commercial modifier.

Examples:
- project + preço
- project + apartamento
- project + comprar
- project + visita
- project + condições

### Q3 PROJECT_FEATURE

Exact project + factual feature that the landing page proves.

Examples:
- project + 210 m2 only for CAPIITOLO where canonical content proves 210 m²;
- project + studio only for Ária where canonical content proves studios;
- project + pronto only for pages whose canonical content states ready/delivered.

No feature keyword may be generated from memory alone.

### Q4 LOCATION_PROJECT_DISCOVERY

Location + product, without exact project name.

State:
DEFERRED_TO_M6_05 relevance mapping.

### Q5 TEGRA_PORTFOLIO

Tegra + apartment/development/SP intent.

Candidate Home-page family.

### Q6 RESEARCH_LOW_INTENT

Examples:
- institutional/corporate research;
- employment;
- supplier;
- customer support;
- rental-only;
- unrelated meaning of project tokens.

Not positive-keyword eligible in V1.

### Q7 COMPETITOR_BRAND

Other developer/project brand queries.

V1:
DO_NOT_TARGET

No competitor-conquest architecture is authorized.

## 13. Initial positive keyword seed policy

M6-04 defines seed families, not a volume-maximizing keyword dump.

A keyword can enter the planned seed set only if:
- its project/portfolio entity is canonical;
- query intent is Q1/Q2/Q3/Q5;
- landing relevance can be proven in M6-05;
- factual modifiers exist on the canonical page;
- no PII/user-generated text is used.

No keyword is added because a third-party tool suggests volume alone.

Search volume may prioritize later activation; it does not override factual relevance.

## 14. Initial negative keyword governance

V1 creates a shared negative-intent baseline for Search, but actual external negative keywords remain unimplemented until M6-07.

Strong exclusion families:

### Careers
- emprego / empregos
- vaga / vagas
- estágio / estagio
- jovem aprendiz
- trabalhar na tegra
- trabalhe conosco
- salário / salarios

### Rental-only intent
- aluguel
- alugar
- locação / locacao
- temporada
- airbnb

### Supplier/procurement
- fornecedor / fornecedores
- portal fornecedor
- compras fornecedor

### Existing-customer support
- segunda via
- boleto
- assistência técnica / assistencia tecnica
- portal do cliente
- login cliente
- pós venda / pos venda

These are semantic families, not a claim that one negative token automatically excludes all linguistic variants.

Because Google negative match types do not expand exactly like positive close variants, M6-07 must materialize explicit singular/plural/accent variants where required.

## 15. Protected commercial queries — do not negative by default

The following can be valid buyer research and must not be globally excluded without Search Terms evidence:

- preço / valor
- endereço / localização
- telefone / contato
- fotos
- planta / planta baixa
- metragem
- condomínio
- financiamento
- entrada
- visita
- reclamação / avaliação / review
- entrega
- pronto para morar
- lançamento
- obra

Some may ultimately be poor traffic, but they remain plausible commercial research.

## 16. Competitor policy

V1:
COMPETITOR POSITIVE TARGETING = FORBIDDEN

Do not create keyword groups for:
- Cyrela;
- Even;
- Gafisa;
- Lavvi;
- Mitre;
- EZTEC;
- other developer/project brands.

M6-04 does not automatically add every competitor brand as a global negative because query context can appear in legitimate comparison/research searches and overblocking is possible.

If competitor terms appear in Search Terms:
- review individually;
- exclude when clearly non-relevant;
- do not create conquest ads without a new Product Authority decision and policy/legal review.

## 17. Exact-project cross-negative policy

To avoid internal cannibalization:

- Ária campaign should not bid intentionally on Elo Duo/CAPIITOLO exact-project terms;
- Elo Duo should not bid intentionally on Ária/CAPIITOLO exact-project terms;
- CAPIITOLO should not bid intentionally on Ária/Elo Duo exact-project terms;
- portfolio campaign should not intentionally displace exact-project campaigns for exact-project queries.

However, M6-07 must use Google Ads campaign/ad-group priority and negatives carefully; no automatic blanket negative is published until M6-05 final mapping confirms all landing routes.

## 18. Search Terms governance

The Search Terms report is the authoritative provider evidence for what actual user queries triggered ads.

After launch, every meaningful search term must be classified into:
- KEEP;
- PROMOTE_TO_KEYWORD;
- NEGATIVE;
- MONITOR;
- LANDING_MISMATCH;
- NEW_INTENT_REVIEW.

Rules:
- do not assume the configured match type equals the actual search-term relationship;
- close variants can match Exact/Phrase;
- a negative is added for semantic irrelevance, not merely low conversion count in a tiny sample;
- query classification must retain campaign/ad-group/keyword provenance.

## 19. Broad expansion gate

Broad match may be considered later only when:
- M6-08 PASS;
- conversion action is safely usable for optimization;
- sufficient search-term evidence exists;
- campaign has reviewed negative coverage;
- landing mapping remains relevant;
- Product Authority authorizes the optimization slice.

Broad-match-only campaign setting / AI Max:
NOT_AUTHORIZED_BY_M6_04

## 20. Responsive Search Ad structural contract

M6-04 does not author ad copy, but later implementation must preserve:
- at least one valid RSA per ad group;
- target state: at least two RSAs with Good/Excellent Ad Strength when practical under current Google guidance;
- each active ad group centered on one specific business goal/theme;
- ad copy must be supported by the target landing page;
- no invented price, discount, availability, delivery date or feature;
- final URL must be approved by M6-05;
- no project-specific claim may be reused across unrelated projects.

Text customization or automatically created assets are not authorized merely by this structural contract; they require explicit implementation review because generated text can create unsupported commercial claims.

## 21. Final URL / landing boundary

M6-04 records candidate landing families only.

M6-05 must explicitly map:
- campaign;
- ad group;
- query class;
- keyword seed;
- final URL;
- factual claim coverage;
- CTA/form readiness.

No external Search campaign can be activated before M6-05 accepts its landing mapping.

## 22. UTM / ValueTrack boundary

For later Google Search implementation, every external campaign must use its canonical M6-02 utm_id and utm_campaign.

M6-04 does not yet choose the exact Google Ads Final URL Suffix or ValueTrack template.

M6-07 must implement that from the accepted M6-02 contract without duplicating GCLID into UTMs.

The canonical landing URL itself remains clean; campaign parameters are transport metadata, not SEO identity.

## 23. Geographic intent boundary

The campaign slugs use "sp" to describe the target market/property geography, not necessarily the user's physical location.

M6-04 does not finalize Google Ads geo-targeting settings.

Do not assume that only users physically inside São Paulo can be valid buyers.

Exact location targeting belongs to M6-06/M6-07 with budget and campaign evidence.

## 24. Brand policy boundary

MoreNumTegra may create internal query records containing canonical Tegra/project names because those names already exist in the accepted site content.

M6-04 does not adjudicate Google trademark policy, advertiser verification, brand authorization or ad-copy approval.

M6-07 must stop if Google Ads policy/account state requires evidence not present in the project.

## 25. Machine-readable contract

Canonical companion:
docs/attribution/MNT_SEM_QUERY_CONTRACT_V1.json

It contains:
- campaign registry;
- ad-group classes;
- query classes;
- match policy;
- negative families;
- blocked scopes;
- implementation gates.

## 26. M6-04 canonical decisions

D01 NETWORK_V1 = SEARCH_ONLY
D02 EXTERNAL_CAMPAIGNS_CREATED = ZERO
D03 INTERNAL_CAMPAIGN_RECORDS = FOUR
D04 CAMPAIGN_000001 = ARIA
D05 CAMPAIGN_000002 = ELO_DUO
D06 CAMPAIGN_000003 = CAPIITOLO
D07 CAMPAIGN_000004 = TEGRA_PORTFOLIO
D08 INITIAL_MATCH_TYPES = EXACT + PHRASE
D09 BROAD_INITIAL = FORBIDDEN
D10 BROAD_MATCH_CAMPAIGN_SETTING = FORBIDDEN
D11 AI_MAX = NOT_AUTHORIZED
D12 COMPETITOR_TARGETING = FORBIDDEN_V1
D13 SINGLE_TOKEN_AMBIGUOUS_QUERY = BLOCKED_BY_DEFAULT
D14 Q1_Q2_Q3_Q5 = SEED_ELIGIBLE
D15 Q4_LOCATION_DISCOVERY = DEFERRED_TO_M6_05
D16 QUERY_TERMS_REPORT = POST_LAUNCH_PROVIDER_EVIDENCE
D17 NEGATIVE_FAMILIES = CAREERS + RENTAL + SUPPLIER + SUPPORT
D18 FINAL_URL_MAPPING = DEFERRED_TO_M6_05
D19 AUTO_TEXT_CUSTOMIZATION = NOT_AUTHORIZED_BY_M6_04
D20 EXTERNAL_ADS_MUTATION = NONE

## 27. External references observed

Official Google documentation observed on 2026-09-22:
- keyword match options:
  https://support.google.com/google-ads/answer/7478529?hl=pt-BR
- keyword matching:
  https://support.google.com/google-ads/answer/14996023?hl=pt-BR
- negative keywords:
  https://support.google.com/google-ads/answer/2453972?hl=pt-BR
- Search Terms report:
  https://support.google.com/google-ads/answer/2472708?hl=en
- broad-match campaign setting:
  https://support.google.com/google-ads/answer/13389795?hl=pt-BR
- responsive Search ads:
  https://support.google.com/google-ads/answer/7684791?hl=pt-BR
- create an ad group with responsive Search ad:
  https://support.google.com/google-ads/answer/7510328?hl=en
- optimize ads and landing pages:
  https://support.google.com/google-ads/answer/6238826

These references inform architecture only.

## 28. Acceptance

M6-04 is complete when this contract and machine-readable registry are integrated into canonical main.

MNT-M6-04 = COMPLETE / DESIGN_CANONICALIZED / INTERNAL_REGISTRY_ONLY / NO_EXTERNAL_MUTATION
accepted_scope_equivalent = 24h

Program progress after acceptance:
- forecast total = 1240h
- accepted = 984h
- remaining = 256h
- accepted percent = 79.35%

Next gate:
MNT-M6-05 — Landing-page/query mapping — 16h / AUTHORIZATION_REQUIRED


## 29. Live Search Console evidence — MoreTegra

Read-only Search Console evidence was observed for `sc-domain:moretegra.com.br` over the last 90 days including today.

Observed aggregate:

```text
query-page rows = 12
impressions = 29
clicks = 1
```

This sample is too small to estimate Search Ads demand, CPA, budget or match-type performance. It is used only as qualitative query evidence.

Observed exact-project/query evidence includes:

```text
aria higienopolis -> Ária exact-project page
caminhos da lapa elo -> Elo Duo exact-project page
capítulo tegra -> CAPIITOLO exact-project page
```

Observed portfolio evidence includes:

```text
tegra vendas
tegra
```

`tegra` remains blocked as a standalone positive seed despite organic appearance because it is semantically broad. `tegra vendas` is admitted as a planned Q5 portfolio seed because it carries explicit commercial intent.

Observed queries for products without a canonical exact-project page include:

```text
amaro tegra
brooklin bricks tegra
ode perdizes tegra
tegra campo belo
```

These queries do not authorize paid campaigns or keywords. They remain `CATALOG_GAP / NO_POSITIVE_SEED` until a canonical product/landing exists and Product Authority admits it.

This reinforces:

```text
SEARCH_QUERY_EXISTS != CANONICAL_PRODUCT_EXISTS
ORGANIC_IMPRESSION != PAID_KEYWORD_AUTHORIZATION
```

## 30. Initial planned seed registry

The following keyword records are canonical planned seeds only. They are not uploaded to Google Ads and remain subject to M6-05 landing-page/query mapping.

### Ária — mnt-cmp-000001

```text
aria-001 | ária higienópolis | EXACT  | Q1_PROJECT_NAVIGATIONAL
aria-002 | ária higienópolis | PHRASE | Q1_PROJECT_NAVIGATIONAL
aria-003 | ária tegra | EXACT | Q1_PROJECT_NAVIGATIONAL
aria-004 | apartamento ária higienópolis | PHRASE | Q2_PROJECT_COMMERCIAL
aria-005 | studio ária higienópolis | PHRASE | Q3_PROJECT_FEATURE
aria-006 | ária higienópolis preço | PHRASE | Q2_PROJECT_COMMERCIAL
aria-007 | ária higienópolis visita | PHRASE | Q2_PROJECT_COMMERCIAL
aria-008 | ária higienópolis pronto para morar | PHRASE | Q3_PROJECT_FEATURE
```

### Elo Duo — mnt-cmp-000002

```text
elo-001 | elo duo | EXACT | Q1_PROJECT_NAVIGATIONAL
elo-002 | elo duo | PHRASE | Q1_PROJECT_NAVIGATIONAL
elo-003 | elo duo tegra | EXACT | Q1_PROJECT_NAVIGATIONAL
elo-004 | caminhos da lapa elo duo | PHRASE | Q1_PROJECT_NAVIGATIONAL
elo-005 | apartamento elo duo | PHRASE | Q2_PROJECT_COMMERCIAL
elo-006 | elo duo preço | PHRASE | Q2_PROJECT_COMMERCIAL
elo-007 | elo duo visita | PHRASE | Q2_PROJECT_COMMERCIAL
elo-008 | elo duo pronto para morar | PHRASE | Q3_PROJECT_FEATURE
```

### CAPIITOLO — mnt-cmp-000003

```text
cap-001 | capiitolo | EXACT | Q1_PROJECT_NAVIGATIONAL
cap-002 | capiitolo tegra | EXACT | Q1_PROJECT_NAVIGATIONAL
cap-003 | capiitolo piero lissoni | PHRASE | Q1_PROJECT_NAVIGATIONAL
cap-004 | capiitolo chácara klabin | PHRASE | Q1_PROJECT_NAVIGATIONAL
cap-005 | apartamento capiitolo | PHRASE | Q2_PROJECT_COMMERCIAL
cap-006 | capiitolo 210 m2 | PHRASE | Q3_PROJECT_FEATURE
cap-007 | capiitolo preço | PHRASE | Q2_PROJECT_COMMERCIAL
cap-008 | capiitolo visita | PHRASE | Q2_PROJECT_COMMERCIAL
```

### Portfolio Tegra — mnt-cmp-000004

```text
prt-001 | apartamentos tegra | EXACT | Q5_TEGRA_PORTFOLIO
prt-002 | apartamentos tegra | PHRASE | Q5_TEGRA_PORTFOLIO
prt-003 | apartamentos tegra são paulo | PHRASE | Q5_TEGRA_PORTFOLIO
prt-004 | empreendimentos tegra são paulo | PHRASE | Q5_TEGRA_PORTFOLIO
prt-005 | tegra apartamentos | PHRASE | Q5_TEGRA_PORTFOLIO
prt-006 | tegra vendas | EXACT | Q5_TEGRA_PORTFOLIO / SEARCH_CONSOLE_OBSERVED
```

Keyword accents are preserved in the canonical planned text. Google positive matching can treat accents as close variants; duplicate accentless keyword records are not created merely to mirror an organic query spelling.

## 31. SEO coexistence

Paid Search and organic Search are separate acquisition surfaces.

Rules:

- an organic ranking does not automatically block a paid keyword;
- an organic impression does not justify paid activation;
- exact-project paid terms with organic overlap must be measured for incremental value after launch rather than assumed to be cannibalization;
- no SEO title/H1/content should be distorted merely to mirror ad keyword syntax;
- paid UTM parameters never become canonical SEO URLs;
- Search Console evidence and Ads Search Terms evidence remain separate provider datasets.

Later observation may classify a paid keyword as:

```text
INCREMENTAL
CANNIBALIZING
UNDETERMINED
```

No such classification is made by M6-04 because no paid campaign exists yet.
