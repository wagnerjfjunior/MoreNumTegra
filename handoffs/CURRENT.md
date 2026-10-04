# Handoff Atual — MoreNumTegra

Atualizado em `2026-10-04`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-29-RESF-RESPONSIVE-MEDIA-SALES-COPY.md`

Estado de transição registrado no handoff:

```text
main observado = 4454c21ab663ea9f8e00417eb6f5fc4b8f69423b
branch ativa = fix/resf-responsive-media-20260929
branch head observado = 9f5e3b71ed36fe57b92494900e69ac8db028d3f4
PR = #306 / OPEN
```

Os SHAs acima são evidência de handoff, não substituem resolução live.

Traceability standard:

`docs/governance/MNT_CHANGE_TRACEABILITY_STANDARD_V1.md`

Local Live Sync standard:

`docs/governance/MNT_LOCAL_LIVE_SYNC_VALIDATION_STANDARD_V1.md`

## NEXT SAFE ACTION

Ler o handoff detalhado e `docs/NEXT_SAFE_ACTION.md`.

Prioridade desta transição:

1. concluir correção RESF de responsive media nas páginas recém-expandidas;
2. preservar copy de venda forte nas páginas Chez Vous / Key / Ayla / Viso;
3. resolver o `validate` vermelho da PR #306 sem mascarar dívida pré-existente;
4. validar no Local Live Sync;
5. somente após aceite explícito, considerar merge/Production;
6. medir performance pós-release antes de afirmar ganho de LCP.


## PR #306 — RESF responsive media + Moema sales copy — CLOSED 2026-09-30

```text
PR = #306 / MERGED
validated head = 247bc1b1b10dd837cb34f3f5a337abc113bca82f
merge/runtime SHA = 6c36cdc765d1bd6781ce099ff799bfa4db755f66
Production deployment = dpl_GC3V5BCPPWgo2cEK2VaiTWKKJkJf
Production state = READY
canonical host = https://www.moretegra.com.br/
public smoke = USER_CONFIRMED / pages published and functioning
runtime errors post-release = NONE OBSERVED in the checked 1h window
```

Scope retained:
- RESF responsive hero/media delivery on the bounded project/regional set;
- strong consultation-led commercial copy on Chez Vous, Key, Ayla and Viso;
- Moema regional copy no longer frames those projects as dead/archive pages;
- canonical multi-frame favicon retained because restoring the older main blob failed the current favicon validator.

Validation note:
- Favicon standard validation = PASS;
- Commercial page standard validation = PASS;
- Social sharing metadata validation = PASS;
- M5-06 CTA/Form journey = RED due to pre-existing validator debt observed on main, not introduced by PR #306.

Do not claim an LCP improvement from this release until a post-release performance battery is executed.


## 2026-09-30 — PR #315 Garden Design + Nova Vivere semantic enrichment — CLOSED

```text
PR = #315 / MERGED
validated head = 7aa2e6db6d191ccea0e8943ed57f35170de37872
merge/runtime SHA = 759a4bcf6d0b7220993c4d87918f85e1d4d5f5f1
Production deployment = dpl_5LLtx8L1XJys9JSrkpqbRUG9stWD
Production state = READY
canonical host = https://www.moretegra.com.br/
local visual validation = USER_APPROVED
```

Scope delivered:
- Garden Design and Nova Vivere second-layer semantic enrichment;
- Garden Design visible copy measured at approximately 1,083 words;
- Nova Vivere visible copy measured at approximately 1,130 words;
- stronger Caminhos da Lapa, Lapa/Zona Oeste, plant, leisure, mobility and decision semantics;
- visible FAQ expanded to seven questions on each page;
- FAQ visible content kept in parity with FAQPage JSON-LD;
- title, H1, canonical, Form 46 and GTM preserved;
- no unsupported Vila Anastácio claim introduced.

Checks on approved head:
- Favicon standard validation = PASS;
- Commercial page standard validation = PASS;
- Social sharing metadata validation = PASS;
- M5-06 CTA/Form journey = RED / PRE-EXISTING VALIDATOR DEBT, also red before this delta.

Search-gap reconciliation:
- Reserva commercial/entity lifecycle remediation = EXECUTED before #315;
- Elo Duo FAQ/answerability = EXECUTED / PR #314;
- Garden Design + Nova Vivere local entity/amenity semantic enrichment = EXECUTED / PR #315;
- Garden Design commercial-truth revalidation = separate factual-data gate if price/reference changes are contemplated;
- Nova Vivere commercial-truth revalidation = separate factual-data gate if price/reference changes are contemplated.

Next safe action is governed by `docs/NEXT_SAFE_ACTION.md`.


## 2026-09-30 — Search ownership handoff

Caminhos/Lapa hierarchy is now resolved:

```text
REGION → MASTER DEVELOPMENT → EXACT PROJECT
/regioes/lapa/ → dedicated Caminhos property → /empreendimentos/*
```

`/caminhos-da-lapa/` remains reserved and must not be created.

Next bounded task: `MNT-REGION-LAPA-01` — Lapa regional discovery page, with project membership and semantic-boundary validation before runtime implementation.


## 2026-09-30 — PR #318 Lapa regional discovery page — CLOSED

```text
PR = #318 / MERGED
validated head = 3108b8de3103f181dcd9f59e355850353086bc59
merge/runtime SHA = d6dbc451554ca579d80ff7f16fee8c39e5a41da3
Production deployment = dpl_9KTywaqRc5TL7PPsP8u5aq28hAiL
Production state = READY
local visual validation = USER_APPROVED
route = https://www.moretegra.com.br/regioes/lapa/
```

Delivered:
- regional owner page for Lapa / Zona Oeste;
- approximately 1,431 visible words;
- editorial balance measured at ~72% region / ~28% projects + decision;
- projects linked: Elo Duo, Garden Design, Nova Vivere and Reserva;
- JSON-LD valid with WebPage, BreadcrumbList, ItemList and FAQPage;
- visible FAQ 6 / JSON-LD FAQ 6 / parity PASS;
- Form 46 and GTM preserved;
- Home discovery link, Vercel rewrite and sitemap entry added;
- MoreNumTegra `/caminhos-da-lapa/` remains reserved / not created.

Validation residuals:
- M5-06 CTA/Form journey = RED / pre-existing validator debt;
- M4-05R metadata validation = RED because the validator still expects legacy guarded MutationObserver logic in `src-greenn/portal-links.js`; current canonical file is intentionally a compatibility shim and PR #318 did not modify it.


## 2026-10-01 — PR #323 Higienópolis cluster Search release — CLOSED

```text
PR = #323 / MERGED
validated head = 2f8c98e1c860e9da5437b9a0c1149e3e009e65e1
merge/runtime SHA = b954992039895f238a72dd917beebd7cafe919d6
Production deployment = dpl_CGZjq9iaznc7CYLJk8Ggq8NcgDeb
Production state = READY
canonical host = https://www.moretegra.com.br/
```

Delivered:
- Ária + Mozae + Higienópolis region standardized as one Search cluster;
- semantic vocabulary and internal ownership links aligned;
- exact-project and regional JSON-LD balanced by page type;
- FAQ visible/schema parity restored;
- Form 46 and GTM preserved;
- production smoke = HTTP 200 on all three routes;
- post-release runtime errors on the three checked routes = NONE OBSERVED.

Canonical release evidence:
`docs/governance/MNT_PR323_HIGIENOPOLIS_CLUSTER_PRODUCTION_RELEASE_2026-10-01.md`.

AI/Search follow-up is recorded but not automatically authorized as runtime mutation.


## 2026-10-01 — PR #325 Mozae Rich Results correction — CLOSED

```text
PR = #325 / MERGED
validated head = 0489a5f439ae6d89dc7215ef549b8e3fdae280b4
merge/runtime SHA = c96b5e0118414e579a4d89d4cf4e05b2468ea4e0
Production deployment = dpl_BRDUZmji53c86zET1DpZQKvvts5Q
Production state = READY
route = https://www.moretegra.com.br/empreendimentos/mozae-higienopolis/
```

Delivered:
- Product.image added for Mozae;
- postalCode 01232-010 added to exact-address structured data;
- CEP added to governed footer address;
- canonical, Form 46 and GTM preserved;
- runtime errors in checked post-release window = NONE OBSERVED.

Next: re-run Google Rich Results Test to verify Merchant Listings no longer reports missing Product.image.


## 2026-10-01 — Higienópolis Regional Search/AI Profile v1

The published Higienópolis regional graph is now canonicalized as a **pilot profile for Higienópolis only**:

`docs/search/MNT_HIGIENOPOLIS_REGIONAL_SEARCH_AI_PROFILE_V1_2026-10-01.md`

```text
PR #328 = MERGED
runtime SHA = fb7304cc79717ea5e53a74c0aa536fa5287544fa
Production = dpl_BXWj3PBkP1AKDa3BjDc7wQdar4Gj / READY
HIGIENOPOLIS_PROFILE_V1 = CANONICAL_FOR_HIGIENOPOLIS
REGIONAL_STANDARD_GENERAL = NOT_YET_APPROVED
```

Do not mechanically propagate this schema profile to other regional pages before observation and explicit promotion.


## 2026-10-01 — Higienópolis cluster CLOSED

Final Google validation is recorded in:
`docs/search/MNT_HIGIENOPOLIS_CLUSTER_FINAL_CLOSURE_2026-10-01.md`

```text
HIGIENOPOLIS_CLUSTER = CLOSED
HIGIENOPOLIS_PROFILE_V1 = VALIDATED_IN_GOOGLE
REGIONAL_STANDARD_GENERAL = NOT_YET_APPROVED
```

Next comparison candidate: Lapa.


## 2026-10-03 — Reserva Caminhos da Lapa page-pattern closure

```text
PR #333 = MERGED
runtime SHA = 87194553074db86f901a3c40352dbcced3dbff21
Production = dpl_G6kP56utSR1apBpQYBZK27mJpGP4 / READY
visual validation = USER_APPROVED
JSON-LD = PASS
visible FAQ = 10
FAQPage = 10
visible/schema parity = PASS
```

The Reserva page is the accepted reference implementation for the next Lapa exact-project content/layout adaptations.

Canonical pattern:
`docs/search/MNT_LAPA_EXACT_PROJECT_PAGE_STANDARD_V1_2026-10-03.md`

Important:
- reuse information architecture and visual rhythm, not lifecycle-specific copy;
- Reserva remains resale/secondary-opportunity oriented;
- Garden Design and Nova Vivere remain active commercial projects and must keep their own lifecycle truth;
- next bounded adaptation = Garden Design;
- following bounded adaptation = Nova Vivere;
- do not bulk-apply both pages in one mutation.


## 2026-10-04 — PR #339 Nova Vivere exact-project pattern — CLOSED

```text
PR = #339 / MERGED
validated head = 77127d2e836e494869c396d7577a1b79b9fd2b4c
merge/runtime SHA = b872b637915ed5a27045754cf0511f5739dea8b1
Production deployment = dpl_BKhmeeUfdoGTTPRwVdBcBaorEdfw
Production state = READY
local visual validation = USER_APPROVED
```

Delivered:
- Nova Vivere aligned to the canonical Lapa exact-project pattern;
- Caminhos da Lapa / Rua Jardim and Morar na Lapa sections;
- regional figures and softer visit/Sabrina/Form 46 closing;
- gallery led by Family Space with concise editorial captions;
- visible FAQ 10 / FAQPage 10 / parity PASS;
- canonical, Form 46, measurement and consent preserved.

Validation residual:
- the broad `validate` job remains red because of pre-existing M5-06 legacy/global assertions; the Nova map assertion expects `www.google.com/maps?q=`, while canonical `main` already used the current `maps.google.com/maps?hl=...` regional embed before PR #339.

Lapa exact-project bounded sequence:
- Reserva = reference / COMPLETE;
- Garden Design = COMPLETE;
- Nova Vivere = COMPLETE;
- Elo Duo = preserve unless a specific bounded delta is selected.
