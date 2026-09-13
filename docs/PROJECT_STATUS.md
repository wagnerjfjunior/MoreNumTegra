# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-13`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- MNT-M2 completion reconciliation: PR #55 / squash merge `894f0a7c94f15cf19a00481a45bc9d69749b067f`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M3 — ACTIVE`
- Task atual: `MNT-M3-01 — COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`
- Saúde operacional do V1: `verde`

## 1. Produção atual

- Green Sales: `https://moretegra.com.br/`
- Vercel homologation: `https://morenumtegra.vercel.app/`
- Vercel deployment mode: `MANUAL_GATE_DRIVEN` conforme ADR-002
- Form 46 nativo permanece autoritativo para captação
- Green page 292 usa `src-greenn/moretegra.js`
- Green page 294 usa `src-greenn/thank-you/obrigado.js`
- MNT-M3-01 não fez mutation em produção, GTM/GA4, Ads, Search Console, DNS, Green ou Vercel

Preservar:

```text
LIVE V1 OPERATIONAL != MNT-RESF PROGRAM COMPLETE
PROGRAM PROGRESS != V1 PRODUCT READINESS
MNT-M3-01 COMPLETE_CANDIDATE != ACCEPTED
MNT-M3-01 ACCEPTED != MNT-M3-02 AUTHORIZED
```

## 2. Programa MNT-RESF

```text
MNT-M0 COMPLETE
MNT-M1 COMPLETE
MNT-M2 COMPLETE
MNT-M3 ACTIVE
  MNT-M3-01 COMPLETE_CANDIDATE / PENDING_ACCEPTANCE
  MNT-M3-02..07 PLANNED / NOT_AUTHORIZED
MNT-M4..MNT-M7 PLANNED
```

Planning forecast enquanto o candidate M3-01 ainda não foi aceito:

```text
forecast total                = 1240h
accepted scope-equivalent     = 400h
remaining forecast            = 840h
program progress              = 32.26%
MNT-M3-01 candidate           = 24h / not yet accepted
```

## 3. MNT-M3-01 — Market and Search demand research

Evidence candidate:

- `docs/search/MNT_M3_01_MARKET_SEARCH_DEMAND_RESEARCH_2026-09-13.md`
- `docs/search/data/MNT_M3_01_GSC_DEMAND_SNAPSHOT_2026-09-13.csv`
- `docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv`

Execution base: `894f0a7c94f15cf19a00481a45bc9d69749b067f`.

Observed first-party Search Console range `2026-08-23..2026-09-13`:

```text
clicks = 0
impressions = 26
weighted average position ≈ 27.52
```

The current GSC sample is sparse and mostly brand/entity-shaped. It is insufficient for trend or causality claims.

Keyword Planner research was read-only, Brazil/Portuguese/Google Search. Material demand signals include:

```text
tegra = 4,400 avg monthly searches
tegra incorporadora = 3,600
apartamentos são paulo = 12,100
apartamentos a venda são paulo = 8,100
apartamentos para comprar são paulo = 1,900
apartamentos na planta em são paulo = 590
```

Project-name demand was also material for multiple current catalogue names, including DSG Itaim, Ária Higienópolis, TEG Sacomã, Ledge Brooklin, Soma Perdizes, Zahle Jardins, Bueno Brandão 257, YPY Alto do Ipiranga, Bem Moema and others. These values are query-demand estimates and do not themselves prove entity intent or page ownership.

## 4. Research interpretation

Candidate findings:

- São Paulo new-residential market remains active at material scale by official Secovi-SP data;
- MoreNumTegra organic visibility remains extremely early relative to the external Tegra/category demand universe;
- brand/entity and verified project-name families have strong direct product fit;
- location families overlap current catalogue structure materially;
- generic São Paulo apartment-purchase terms are much larger, but require SERP/intent validation before ownership decisions;
- stage/state families map to the existing product taxonomy but generally have lower volume and high paid-search competition;
- rental, houses and generic brokerage queries returned by Planner are noise/out of current product scope.

## 5. Limitations

- GSC sample remains too small for trend/causality;
- Planner target used Brazil/Portuguese, not São Paulo city-only;
- Planner competition index is paid-search competition, not organic SEO difficulty;
- some project names require SERP/entity disambiguation;
- Semrush metrics were unavailable because the connected API reported insufficient unit balance;
- no page owner, canonical query, final search intent or content action is defined by M3-01.

## 6. Measurement foundation remains closed

MNT-M2 remains `COMPLETE`; accepted runtime stays:

```text
GTM = GTM-PGCR4R47 / Version 7
GA4 = G-57M2XR0CY2
primary source = mnt_lead_success
destination = generate_lead Key event
```

The accepted V1 client-side lead-validity residual remains documented and non-blocking.

## 7. Search technical residuals preserved

- commercial canonical remains client-side;
- sitemap unavailable;
- `www` HTTP 301/308 semantics remain unproven;
- these residuals are not changed by M3-01.

## 8. Próxima ação

The only next safe action is Product Authority acceptance review of the MNT-M3-01 candidate and, if satisfied, explicit Ready + merge authorization for its PR.

MNT-M3-02 — `Extract and classify Search Console queries` remains planned and separately gated.

## 9. External gates preservados

Meta Dataset/Pixel/CAPI, Google Ads mutations/spend, DNS, Search Console mutation, Vercel deployment, Green structural changes, FECH.AI/n8n/Make and content implementation remain separately gated.
