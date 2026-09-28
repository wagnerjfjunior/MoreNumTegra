# Higienópolis regional page — evidence and boundaries

Date: 2026-09-28.
Current editorial refinement base: `ce231770a4546038fd1f2cc719815ebfa8c7d8ce`.

## Search and page ownership

- Primary intent: Higienópolis regional discovery with Tegra commercial continuation.
- Secondary: understand the neighborhood before comparing Ária and Mozae.
- Exact-project title intents remain owned by each project page.
- No independent real-estate marketplace, other developers, prices, investment return or availability claims are introduced.
- QuintoAndar and Pilar Homes were reviewed only as page-architecture references for the pattern `bairro/contexto -> facilidades -> imóveis`. No text, layout asset or photograph was copied from either source.

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
