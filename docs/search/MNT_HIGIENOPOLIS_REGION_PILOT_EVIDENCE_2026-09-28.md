# Higienópolis regional page — evidence and boundaries

Date: 2026-09-28.
Current editorial refinement base: `ce231770a4546038fd1f2cc719815ebfa8c7d8ce`.

## Search and page ownership

This refinement is explicitly grounded in the canonical M3 Search program:

- `docs/search/MNT_M3_01_MARKET_SEARCH_DEMAND_RESEARCH_2026-09-13.md`;
- `docs/search/MNT_M3_03_SERP_COMPETITOR_SEARCH_INTENT_ANALYSIS_2026-09-13.md`;
- `docs/search/MNT_M3_05_SEARCH_INTENT_QUERY_OWNERSHIP_CONTRACT_2026-09-13.md`;
- `docs/search/MNT_M3_06_QUERY_FAMILY_PAGE_OWNER_MAP_2026-09-13.md`;
- `docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv`;
- `docs/search/data/MNT_M3_05_QUERY_OWNERSHIP_MATRIX_2026-09-13.csv`;
- `docs/search/data/MNT_M3_06_PAGE_OWNER_MAP_2026-09-13.csv`.

Relevant observed demand from the canonical Planner universe:

```text
apartamentos higienopolis sao paulo = 170 avg monthly searches / Ads competition index 69
apartamentos na planta em são paulo = 590 / 80
apartamento em construção são paulo = 110 / 80
apartamento pronto para morar são paulo = 20 / 89
ária higienópolis = 1,900 / 31
mozae higienopolis = 390 / 26
```

Interpretation boundary:

- exact project-name intent remains owned by the exact project pages;
- project modifiers such as metragem/planta/availability inherit the exact project owner;
- stage families are valid Search dimensions and have their own governed stage-owner pattern;
- broad generic city/neighborhood inventory remains support-secondary unless qualified by verified Tegra/project/stage/location context;
- a verified multi-project location may use the `/regioes/<verified-location>/` owner pattern.

For this page, Higienópolis now satisfies the verified project-set condition through Ária + Mozae. Therefore the regional page is positioned deliberately at **mid-funnel location discovery**, not bottom-funnel exact-project ownership.

Primary semantic family:
- apartamentos em Higienópolis;
- apartamentos em Higienópolis São Paulo;
- apartamentos Tegra em Higienópolis.

Supporting mid-funnel stage/location semantics:
- apartamento pronto para morar em Higienópolis;
- apartamento na planta em Higienópolis;
- apartamento em Higienópolis na planta;
- apartamento em construção em Higienópolis.

Anti-cannibalization:
- `Ária Higienópolis` exact/project-detail intent remains on `/empreendimentos/aria-higienopolis/`;
- `Mozae Higienópolis` exact/project-detail intent remains on `/empreendimentos/mozae-higienopolis/`;
- the regional page must not become the primary owner for project-specific price, plant, metragem, availability or exact-project queries.

QuintoAndar and Pilar Homes were reviewed only as information-architecture references for the pattern `bairro/contexto -> facilidades -> imóveis`. No text, layout asset or photograph was copied from either source.

## Governed neighborhood facts

- Parque Buenos Aires: Prefeitura de São Paulo, `https://prefeitura.sp.gov.br/web/meio_ambiente/w/parques/regiao_centrooeste/5732`.
  - located on Avenida Angélica in Higienópolis;
  - inaugurated in 1913;
  - designed by French landscape architect Joseph-Antoine Bouvard;
  - provides cultural-presentation area, picnic lawn, playground, reflecting pool, dog area, walking/rest spaces and accessible facilities;
  - the same Prefeitura page records the neighborhood's late-19th-century planned-development history and Avenida Angélica as an early principal axis.
- Higienópolis–Mackenzie station / Linha 4–Amarela: current Prefeitura Parque Buenos Aires access guidance names the station as the metro access for the park. No travel-time or distance claim is made.
- FAAP: Prefeitura neighborhood-history material identifies FAAP in the regional historical/cultural context. No ranking or distance claim is made.

## Hero photograph

Regional hero asset:
`https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/At_Parque_Buenos_Aires_2023_102.jpg/1280px-At_Parque_Buenos_Aires_2023_102.jpg`

Source page:
`https://commons.wikimedia.org/wiki/File:At_Parque_Buenos_Aires_2023_102.jpg`

- author: Mike Peel;
- date: 2023-11-23;
- subject/location metadata: Avenida Angélica / Higienópolis, São Paulo;
- license: CC BY-SA 4.0;
- visible attribution is included in the hero;
- the file is externally hosted for this candidate; no copy is stored in GitHub.

Second editorial image:
`https://commons.wikimedia.org/wiki/Special:FilePath/Edif%C3%ADcio_Louveira%2C_Jo%C3%A3o_Batista_Vilanova_Artigas_e_Carlos_Cascaldi_%285877913511%29.jpg?width=1280`

Source page:
`https://commons.wikimedia.org/wiki/File:Edif%C3%ADcio_Louveira,_Jo%C3%A3o_Batista_Vilanova_Artigas_e_Carlos_Cascaldi_(5877913511).jpg`

- subject: Edifício Louveira, Rua Piauí / Praça Vilaboim, Higienópolis;
- photographer: André Deak / Arte Fora do Museu;
- license: CC BY 2.0;
- visible attribution is included with the image.

## Product truth

- Ária product: `src-greenn/empreendimentos/aria-higienopolis/index.html`.
  - delivered;
  - studios 30 m²;
  - apartments 53 m²;
  - rooftop and pool.
- Mozae product: `src-greenn/empreendimentos/mozae-higienopolis/index.html` and `docs/search/MNT_MOZAE_HIGIENOPOLIS_RESF_C17_FACT_PACK_2026-09-28.md`.
  - construction;
  - 46 and 73 m²;
  - 1 or 2 suites;
  - rooftop;
  - mural by Isabel Ruas.
- Conflicting or ungoverned commercial prices remain excluded.

## Editorial V2 change

Product Authority correction on 2026-09-28:

- remove internal/process-facing copy such as “Primeiro o bairro. Depois o imóvel.”;
- use buyer-facing mid-funnel language;
- represent Ária with the commercially meaningful stage phrase `apartamento pronto para morar em Higienópolis`;
- represent Mozae with `apartamento na planta em Higienópolis` while preserving the factual current stage `em construção`;
- strengthen the regional page for broader location/stage discovery without taking exact-project ownership from Ária/Mozae pages.

The page title/H1/meta/section headings/FAQ/schema now support that corrected semantic architecture.



The regional page now follows:

```text
regional hero
-> how Higienopolis works as a neighborhood
-> factual facilities/context
-> editorial image break
-> two Tegra proposals
-> factual comparison by stage/type
-> Form 46
-> FAQ
```

The project cards use equal media aspect ratios, fixed structural rows and bottom-anchored CTA groups so the image/content divider and buttons remain aligned when the cards sit side by side.

Mobile keeps one project card per row.

## Conversion and measurement boundaries

The existing Form 46 runtime is unchanged:

```text
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
```

A region-only lead keeps `Higienópolis | São Paulo | Tegra` in the existing controlled regional context. Selecting a project sets project context. No new provider field, GTM container, GA4 stream, backend or PII-in-analytics behavior is introduced.

## Validation boundary

This branch is intended for the canonical Local Live Sync review.

Required evidence before merge:

```text
VALIDATION_SURFACE = LOCAL_LIVE_SYNC
REPOSITORY = wagnerjfjunior/MoreNumTegra
BRANCH = feat/region-higienopolis-editorial-v2-20260928
HEAD = <resolve live>
ROUTE = /regioes/higienopolis/
PRODUCTION_PROOF = NOT_CLAIMED
```

Static checks may validate structure, links, schema and contracts. They must not be called visual validation.

No Hosted Preview is required or authorized for this candidate. Production merge/deploy remains gated on Product Authority approval after Local Live Sync review.
