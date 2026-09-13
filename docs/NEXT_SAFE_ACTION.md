# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura quando esta revisão estiver integrada em `main`.

- Definida em: `2026-09-13`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Base resolvida antes da execução: `894f0a7c94f15cf19a00481a45bc9d69749b067f`
- MNT-M2: `COMPLETE`
- MNT-M3-01: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

## 1. Estado de entrada

A Product Authority autorizou explicitamente o início de `MNT-M3-01 — Market and Search demand research` em `2026-09-13` após o fechamento da PR #55.

A execução foi research/evidence-only e produziu:

- `docs/search/MNT_M3_01_MARKET_SEARCH_DEMAND_RESEARCH_2026-09-13.md`;
- `docs/search/data/MNT_M3_01_GSC_DEMAND_SNAPSHOT_2026-09-13.csv`;
- `docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv`.

Nenhuma mutação Search Console, Google Ads, GTM/GA4, Green, DNS ou Vercel foi feita.

## 2. Única próxima ação segura

A próxima ação é uma **decisão explícita da Product Authority sobre aceitar o candidate MNT-M3-01 e autorizar o lifecycle Ready + merge da PR correspondente**.

Até essa decisão:

```text
CURRENT_ACTIVE_PHASE = MNT-M3
CURRENT_ACTIVE_TASK = MNT-M3-01
MNT-M3-01 = COMPLETE_CANDIDATE / PENDING_ACCEPTANCE
MNT-M3-02 = PLANNED / NOT_AUTHORIZED
```

A sequência do WBS não autoriza MNT-M3-02.

## 3. Candidate MNT-M3-01

O candidate registra, com proveniência separada:

- contexto oficial do mercado residencial novo de São Paulo via Secovi-SP;
- snapshot live do Search Console de `moretegra.com.br`;
- universo de demanda via Google Keyword Planner;
- famílias de pesquisa de marca/entidade, genéricas de compra, localização, estágio, projetos e modificadores de decisão;
- exclusão explícita de ruído fora do produto atual, como aluguel, casas e buscas genéricas de imobiliária;
- limitações: GSC ainda esparso, Planner em escopo Brasil/Português, competition index pago e não SEO difficulty, ambiguidade de algumas entidades, Semrush indisponível por saldo insuficiente de API units.

Nenhum page owner, search intent final, conteúdo, campanha ou spend foi autorizado/definido por M3-01.

## 4. Progresso programático

Enquanto o candidate MNT-M3-01 não for aceito:

```text
forecast total = 1240h
accepted scope-equivalent = 400h
remaining forecast = 840h
program progress = 32.26%
MNT-M3-01 candidate hours = 24h / NOT_YET_ACCEPTED
```

Effort semantics permanecem `PLANNING_FORECAST_NOT_ACTUAL_TIMESHEET`.

## 5. Mutation boundary preservado

MNT-M3-01 não autoriza automaticamente:

- Search Console mutation;
- Google Ads linking, conversion tags, campaign, keyword push ou spend;
- nova publicação/configuração GTM ou GA4;
- Meta Dataset/Pixel/CAPI;
- Green structural/runtime changes;
- DNS;
- Vercel automatic deployment;
- FECH.AI/n8n/Make/webhook/backend;
- conteúdo/SEO implementation;
- iniciar MNT-M3-02..07.

## 6. Próximo gate após aceitação

Somente depois de MNT-M3-01 ser aceito/mergeado, o próximo candidate de sequência será:

`MNT-M3-02 — Extract and classify Search Console queries`

MNT-M3-02 continuará exigindo autorização explícita separada.

## 7. Condições de parada

Stop se qualquer ação tentar:

- contabilizar as 24h de M3-01 como aceitas antes do gate de aceitação/merge;
- inferir autorização de M3-02 pela sequência;
- converter demanda Planner em intenção/page ownership sem M3-02/M3-03/M3-05/M3-06;
- inventar volume/KD/CPC/posição/concorrente;
- transformar recomendação de Search em implementação sem gate;
- alterar plataformas externas para forçar resultado de pesquisa.

`MNT-M3-01 COMPLETE_CANDIDATE != ACCEPTED != MNT-M3-02 AUTHORIZED`.
