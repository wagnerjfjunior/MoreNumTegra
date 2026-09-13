# MNT-M3-06 — Query-family to Page-owner Map — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-06 — Query-family to page-owner map`  
Immediate corrected upstream: `PR #60 / resolve live before acting`.  
Scope: `SEARCH ARCHITECTURE / PAGE OWNERSHIP / ANTI-CANNIBALIZATION ONLY`  
Runtime/platform mutation: `NONE`.

Machine-readable map: `docs/search/data/MNT_M3_06_PAGE_OWNER_MAP_2026-09-13.csv`.

## 1. Boundary

M3-06 translates the M3-05 logical owner classes into exactly one concrete owner, unambiguous conditional state, support-only disposition or `NO_OWNER` per material query family.

Preserve:

```text
OWNER ASSIGNED != ROUTE CREATED
ROUTE RESERVED != PAGE PUBLISHED
PLANNED INDEXABLE != CURRENTLY INDEXED
PROJECT FACT SECTION != SEPARATE DOORWAY PAGE
ENTITY ROUTE RESERVATION != PROVEN SEARCH DEMAND
SOURCE PERMISSION != PUBLICATION AUTHORIZATION
M3-06 COMPLETE_CANDIDATE != ACCEPTED
M3-06 ACCEPTED != M3-07 AUTHORIZED
```

No HTML/CSS/JS, Green, Vercel, Search Console, sitemap, runtime canonical, GTM/GA4, DNS or production routing is changed by this task.

## 2. Governed inputs

This candidate consumes M3-01..M3-05 evidence, the corrected M3-04 Product Fact & Claim Registry/September reconciliation, the corrected M3-05 evidence-lineage matrix, and `docs/product/MNT_OFFICIAL_TEGRA_PROJECT_SURFACES_2026-09-13.md`.

Product Authority supplied the official Tegra project surfaces and permission to use Tegra content/images downstream. That is source permission, not automatic publication authority. Price, unit, inventory and promotion remain release-revalidation gated.

## 3. Route namespace

```text
/                                           brand/portfolio owner
/caminhos-da-lapa/                          master-development owner
/empreendimentos/<project-slug>/            exact project entity owner
/estagios/lancamento/                       launch-stage owner
/estagios/em-construcao/                    construction-stage owner
/estagios/pronto-para-morar/                ready/delivered discovery owner
/regioes/<verified-location>/                conditional location pattern only
```

Except for `/`, routes are architecture assignments only until later authorized implementation/QA. A pattern is not a concrete owner until its fact gate is satisfied.

## 4. Brand, master and location ownership

- `brand_head / tegra` → `/` as MoreNumTegra portfolio owner; this does not replace Tegra corporate authority.
- `tegra vendas` / `tegra conecta` → `NO_OWNER`.
- `caminhos da lapa tegra` and `tegra caminhos da lapa` → `/caminhos-da-lapa/`.
- Lexical reversal **maps to the same query family/page owner; no duplicate route**. This is query-family normalization, not URL-canonical terminology.
- Brand+location receives a concrete location owner only after a verified project/entity set exists.
- `tegra campo belo` therefore has `NO_OWNER + CONDITIONAL_OWNER_PATTERN`; `/regioes/<verified-location>/` is only the future pattern. No `/regioes/campo-belo/` owner is assigned by this candidate.

## 5. Exact project owners

```text
Nova Vivere                  -> /empreendimentos/nova-vivere/
Garden Design                -> /empreendimentos/garden-design/
Caminhos da Lapa Elo Duo     -> /empreendimentos/caminhos-da-lapa-elo-duo/
DSG Itaim                     -> /empreendimentos/dsg-itaim/
Ária Higienópolis             -> /empreendimentos/aria-higienopolis/
Soma Perdizes                 -> /empreendimentos/soma-perdizes/
Ledge Brooklin                -> /empreendimentos/ledge-brooklin/
Bueno Brandão 257             -> /empreendimentos/bueno-brandao-257/
CAPIITOLO by Piero Lissoni    -> /empreendimentos/capiitolo-piero-lissoni/
Mozae Higienópolis            -> /empreendimentos/mozae-higienopolis/
YPY Alto do Ipiranga          -> /empreendimentos/ypy-alto-do-ipiranga/
```

Route reservations for Château Jardin, Ampère Brooklin, Universo Tatuapé Órbita, Bem Moema, Bem Moema Studios & Offices, Zahle Jardins, TEG Sacomã and Tièl remain namespace reservations only; they do not assert query demand, inventory or publication readiness.

## 6. Sold and exception entities

Amaro reserves `/empreendimentos/amaro/` as a historical entity owner, `NOINDEX_UNTIL_FACTUAL_PAGE_READY`, without active-inventory implication.

ODE uses `/empreendimentos/ode-perdizes/` for entity and governed returned-unit intent:

```text
public baseline = entregue / sold out
commercial exception = returned unit 22
price/availability = explicit release revalidation required
```

Reserva uses `/empreendimentos/reserva-caminhos-da-lapa/`:

```text
public baseline = entregue / 100% sold
commercial exception = exception units under consultation
quantity / unit / price = not established
```

Exception state remains on the same project owner; no separate unit/price landing and no general stock reopening.

## 7. Bottom-funnel owner resolution

Known project modifiers now resolve to concrete owners:

- `elo caminhos da lapa preço` → `/empreendimentos/caminhos-da-lapa-elo-duo/`;
- `reserva caminhos da lapa endereço` → `/empreendimentos/reserva-caminhos-da-lapa/`;
- `mozae higienópolis metragem` → `/empreendimentos/mozae-higienopolis/`.

Parameterized families such as generic `planta apartamento tegra projeto` and `unidades disponíveis empreendimento tegra` do **not** pretend to have a URL owner before a project is known. Their machine-readable state is `NO_CONCRETE_OWNER_UNTIL_PROJECT_RESOLVED`, with resolution rule `RESOLVE_EXACT_PROJECT_THEN_INHERIT_PROJECT_OWNER`.

Project price/address/metragem/planta/availability remain sections of the resolved exact project owner, never separate thin doorway pages by default.

## 8. Stage owners

```text
stage_launch       -> /estagios/lancamento/
stage_construction -> /estagios/em-construcao/
stage_ready        -> /estagios/pronto-para-morar/
```

State: `CONDITIONAL_PLANNED_INDEXABLE`.

A stage route becomes publishable/indexable only after later implementation/QA. Membership must preserve current stage truth and commercial-state labels. In particular, physically delivered sold/historical projects must not be presented as available inventory merely because they satisfy a physical-stage condition. ODE/Reserva keep their specific exception gates.

## 9. Broad generic and excluded families

Broad São Paulo and generic Brooklin/Perdizes/Lapa inventory families remain `SUPPORT_ONLY`; no dedicated primary owner is created here. Raw `lapa`, corporate/tool queries, design/professional spillover, typo/noise, rental and house inventory remain `NO_OWNER` unless later evidence/authority supersedes the decision.

## 10. Canonical boundary and internal linking

This document defines architectural page ownership, not observed runtime canonical behavior.

- `/` is the current existing owner.
- Planned routes have no runtime canonical until they exist.
- Future self-canonical behavior is an implementation/QA requirement, not a current fact.
- Project fact sections inherit the exact project page owner.
- Support/no-owner families receive no dedicated canonical page.

Later internal-link direction remains: home → master/stage/projects; master → child projects; stage/location → verified exact projects; exact project → relevant discovery surfaces; sold/exception entities may link to active alternatives without transferring entity intent.

## 11. Anti-overlap contract

1. One ownership state per material query family.
2. Exact project intent beats master/stage/location/home.
3. Caminhos master and child projects remain separate.
4. Stage owns stage discovery, never exact project names.
5. Location owner requires verified project set; no concrete owner before that gate.
6. Project modifiers inherit the resolved exact project owner.
7. ODE/Reserva exceptions remain states of the same entity.
8. Sold/historical ownership must not imply general inventory.
9. Broad generics remain support unless later promoted.
10. Corporate/noise/unrelated remain no-owner.
11. No route solely for lexical variants.
12. No JS-only filter state treated as indexable owner.

## 12. Exit criteria after SES correction

The corrected candidate is ready for focal re-review when:

- all 41 M3-05 families reconcile;
- each ends in one concrete owner, `NO_OWNER`, support-only state or unambiguous conditional state;
- known project modifiers have concrete project owners;
- parameterized project modifiers have an explicit separate resolution rule;
- no blocked location has a concrete URL owner;
- master × project, stage × project and location × project overlap remains resolved;
- no runtime/platform mutation occurs.

## 13. Lifecycle

```text
MNT-M3-03 = COMPLETE / ACCEPTED / PR #58 MERGED
MNT-M3-04 = COMPLETE_CANDIDATE / PR #59 OPEN DRAFT
MNT-M3-05 = COMPLETE_CANDIDATE / PR #60 OPEN DRAFT
MNT-M3-06 = COMPLETE_CANDIDATE / PR #61 OPEN DRAFT
MNT-M3-07 = PLANNED / NOT_AUTHORIZED
```

Ready/merge requires separate explicit Product Authority authorization. M3-07 must not start by sequence alone.