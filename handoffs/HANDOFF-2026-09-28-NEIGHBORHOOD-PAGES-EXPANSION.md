# HANDOFF 2026-09-28 — Neighborhood Pages Expansion

Repository: wagnerjfjunior/MoreNumTegra
Canonical main at creation: 597fe3565c11941fd2f1774abb2959a64dcba39e

Current Production runtime:
- source SHA: c8f9de723f20f3bdbc84646aeb11144052aca5b7
- deployment: dpl_8Po99EaQDHvFbievvzx9QvPcyTC4
- state: READY

Just completed:
- PR #294 Higienópolis regional v2
- production URL: https://www.moretegra.com.br/regioes/higienopolis/
- HTTP 200
- middle-funnel regional SEO semantics
- exact Ária/Mozae intent remains on exact project pages

Reference pattern for future neighborhood pages:
regional hero with real local image
-> useful neighborhood context
-> factual facilities/mobility/culture/green areas
-> editorial visual break
-> verified Tegra projects in the neighborhood
-> middle-funnel stage/location semantics
-> exact-project links
-> Form 46
-> FAQ

SEO ownership:
- regional page owns location/stage discovery;
- project pages own exact project + price/plants/metragem/availability;
- do not create cannibalization;
- use canonical M3 Search evidence before drafting semantics.

Immediate next task:
MNT-REGION-COVERAGE-AUDIT-01 = AUTHORIZED / READ_ONLY

Create a table with:
- empreendimento;
- bairro/região;
- exact-project page state;
- neighborhood page state;
- neighborhood page OK / missing / needs rework;
- other projects sharing same neighborhood page;
- SEO/query-ownership notes.

Resolve live before answering:
- GitHub main;
- src-greenn/empreendimentos/;
- src-greenn/regioes/;
- current Home/catalogue;
- vercel.json;
- MNT_M3_01 search-demand research;
- MNT_M3_05 query-ownership contract;
- MNT_M3_06 page-owner map;
- applicable fact packs.

No new neighborhood page implementation until the coverage/grouping audit is complete and Product Authority selects the next region.

Workflow for future regional pages:
feature branch -> static checks -> Local Live Sync -> Product Authority approval -> merge -> Git-driven Production -> Production validation -> traceability reconciliation.
