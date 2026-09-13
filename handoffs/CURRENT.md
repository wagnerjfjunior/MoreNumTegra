# Handoff Atual — MoreNumTegra

> Handoff SFJM de continuidade cognitiva. `main` é a fonte canônica; sempre resolver o SHA live antes de agir.

## Estado resolvido em 2026-09-13

- Repositório: `wagnerjfjunior/MoreNumTegra`
- PR #55: `MERGED` por squash
- Canonical main após PR #55: `894f0a7c94f15cf19a00481a45bc9d69749b067f`
- MNT-M2: `COMPLETE`
- MNT-M3: `ACTIVE`
- MNT-M3-01: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`
- MNT-M3-02: `PLANNED / NOT_YET_AUTHORIZED`

## MNT-M3-01 executado

A Product Authority autorizou explicitamente iniciar `MNT-M3-01 — Market and Search demand research` em 2026-09-13.

Branch candidate:

`research/mnt-m3-01-market-search-demand`

Evidence:

- `docs/search/MNT_M3_01_MARKET_SEARCH_DEMAND_RESEARCH_2026-09-13.md`
- `docs/search/data/MNT_M3_01_GSC_DEMAND_SNAPSHOT_2026-09-13.csv`
- `docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv`

No runtime/platform mutation was performed.

## Search demand snapshot

First-party GSC (`sc-domain:moretegra.com.br`, 2026-08-23..2026-09-13):

```text
clicks = 0
impressions = 26
weighted average position ≈ 27.52
```

The sample remains sparse and mostly brand/entity-related.

Selected Google Keyword Planner estimates, Brazil/Portuguese/Google Search:

```text
tegra = 4,400 avg monthly searches
tegra incorporadora = 3,600
apartamentos são paulo = 12,100
apartamentos a venda são paulo = 8,100
apartamentos para comprar são paulo = 1,900
apartamentos na planta em são paulo = 590
```

Selected verified catalogue project-name signals include:

```text
dsg itaim = 1,900
ária higienópolis = 1,900
teg sacomã = 1,900
ledge brooklin = 1,600
soma perdizes = 1,300
zahle jardins = 1,300
bueno brandão 257 = 1,300
ypy alto do ipiranga = 1,300
bem moema = 1,000
chateau jardin = 880
reserva caminhos da lapa = 720
```

These are Planner demand estimates, not proof of entity intent, SEO ranking difficulty or page ownership.

## Research conclusions

- the São Paulo new-residential market is active at material scale by Secovi-SP official evidence;
- current MoreNumTegra organic visibility is still very early compared with external brand/category demand;
- brand/entity, project-name and location families are the strongest direct-fit research clusters;
- generic São Paulo purchase terms are materially larger but need SERP/intent validation;
- stage/state queries correspond to current UI taxonomy;
- rental, houses and generic brokerage queries are excluded as out-of-scope noise;
- Semrush metrics were not available because the API-unit balance is insufficient.

## Progress

Until Product Authority accepts M3-01:

```text
forecast total = 1240h
accepted scope-equivalent = 400h
remaining forecast = 840h
program progress = 32.26%
MNT-M3-01 candidate = 24h / not yet accepted
```

## Measurement accepted baseline preserved

```text
GTM = GTM-PGCR4R47
published GTM version = 7
GA4 measurement_id = G-57M2XR0CY2
primary source = mnt_lead_success
GA4 destination = generate_lead Key event
```

The accepted V1 client-side lead-validity residual remains registered and non-blocking.

## Próxima ação segura

Product Authority reviews the MNT-M3-01 candidate and explicitly authorizes acceptance/Ready/merge if satisfied.

Do **not** start MNT-M3-02 by task sequence alone.

## Boundaries preservados

M3-01 did not and does not authorize Search Console mutation, Google Ads mutation/spend, GTM/GA4 changes, Meta runtime, Green structural changes, DNS, Vercel deployment, FECH.AI/n8n/Make or Search/content implementation.
