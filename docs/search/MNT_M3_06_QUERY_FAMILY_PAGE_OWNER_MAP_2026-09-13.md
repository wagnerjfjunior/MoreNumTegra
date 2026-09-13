# MNT-M3-06 — Query-family to Page-owner Map — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-06 — Query-family to page-owner map`  
Planning estimate: `24h`  
Execution authorization: Product Authority explicitly authorized MNT-M3-06 on `2026-09-13`.  
Reconciled stack: `main 5bd7ec7913e802589f6025a8bc98a1ef8378f84e -> PR #59 -> PR #60 -> PR #61`.  
Immediate upstream candidate: M3-05 head `33b11e216e94ea01c487bccee60e1cf886bd1baf`.  
Scope: `SEARCH ARCHITECTURE / PAGE OWNERSHIP / ANTI-CANNIBALIZATION ONLY`.  
Runtime/platform mutation: `NONE`.

Machine-readable map: `docs/search/data/MNT_M3_06_PAGE_OWNER_MAP_2026-09-13.csv`.

## 1. Boundary

M3-06 translates the M3-05 logical owner classes into one explicit primary owner, conditional owner, support-only disposition or no-owner decision per material query family.

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

No HTML/CSS/JS, Green, Vercel, Search Console, sitemap, canonical runtime, GTM/GA4, DNS or production routing is changed by this task.

## 2. Governed inputs

This candidate consumes M3-01..M3-05 evidence, including the M3-04 Product Fact & Claim Registry, the September commercial reconciliation, the M3-05 query ownership contract/matrix, and `docs/product/MNT_OFFICIAL_TEGRA_PROJECT_SURFACES_2026-09-13.md`.

Product Authority supplied the official Tegra project surfaces and confirmed permission to use Tegra content/images in downstream MoreNumTegra work. This is source-use permission, not automatic publication authorization. Volatile price, unit, inventory and promotional claims still require immediate release-time revalidation.

Where the base M3-04 registry conflicts with the September reconciliation on volatile commercial facts, the September reconciliation controls.

## 3. Route namespace

M3-06 reserves this architecture:

```text
/                                           brand/portfolio owner
/caminhos-da-lapa/                          master-development owner
/empreendimentos/<project-slug>/            exact project entity owner
/estagios/lancamento/                       launch-stage owner
/estagios/em-construcao/                    construction-stage owner
/estagios/pronto-para-morar/                ready/delivered discovery owner
/regioes/<verified-location>/                conditional brand+location owner
```

Except for `/`, these are architecture assignments only. Until an authorized M4 implementation creates a route, its state is `PLANNED_NOT_IMPLEMENTED`. No planned route receives a runtime canonical or indexability claim merely from this map.

## 4. Brand, master and location ownership

- `brand_head / tegra` -> `/` as MoreNumTegra brand/portfolio owner. It does not replace Tegra corporate authority.
- `tegra vendas` and `tegra conecta` -> `NO_OWNER`; corporate/partner/tool intent is not converted into consumer inventory intent.
- `caminhos da lapa tegra` and lexical reversal -> `/caminhos-da-lapa/`. The master owner represents the complex and lifecycle mix but must not steal exact child-project intent.
- `brand + location` -> `/regioes/<verified-location>/` only when a verified Tegra project/entity set justifies that geography. The representative `tegra campo belo` family currently has no owner because the supplied project-source set does not establish a qualifying Campo Belo portfolio. Future pattern `/regioes/campo-belo/` remains blocked until that fact gate is satisfied.

## 5. Exact project owners

Material M3-05 project families map to one exact project owner:

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

The governed current catalogue also receives collision-safe `ENTITY_ROUTE_RESERVATION` entries for Château Jardin, Ampère Brooklin, Universo Tatuapé Órbita, Bem Moema, Bem Moema Studios & Offices, Zahle Jardins, TEG Sacomã and Tièl Vila Nova Conceição. A reservation does not manufacture query demand, inventory or publication readiness.

## 6. Sold and exception entities

### Amaro

M3-05 classifies Amaro as historical entity intent. Reserved owner: `/empreendimentos/amaro/`. Treatment: `HISTORICAL_ENTITY_OWNER / NOINDEX_UNTIL_FACTUAL_PAGE_READY`. It must not imply active inventory.

### ODE Perdizes

Primary owner: `/empreendimentos/ode-perdizes/` for entity and governed returned-unit price intent.

```text
public lifecycle = entregue / sold-out baseline
commercial exception = returned unit 22
availability/price = immediate revalidation required
```

The returned unit remains a state/section of the same project owner, not a separate landing page and not general stock reopening. The older comparative `de R$ 2.200.000` is not re-certified by the September source.

### Reserva Caminhos da Lapa

Primary owner: `/empreendimentos/reserva-caminhos-da-lapa/`.

```text
public lifecycle = entregue / 100% sold baseline
commercial exception = exception units under consultation
quantity / unit numbers / price = NOT ESTABLISHED
```

`Sob consulta` may be surfaced only after current revalidation and must not imply general reopened inventory.

## 7. Bottom-funnel modifiers

Project + price, address, metragem, planta, availability and conditions remain sections of the exact project owner. They do not receive separate doorway pages by default.

- price -> exact project canonical; publish only revalidated commercial fact;
- address/location -> exact project canonical; verified factual section;
- metragem/tipologia/vagas -> exact project canonical; Product Fact Registry controls claims;
- planta -> exact project canonical when exact project/fact is resolved;
- availability/conditions -> exact project canonical; fail closed without current inventory evidence.

For Mozae, the governed headline is 46m²/73m²; stale 45m² must not be reused. Internal commission/VPL terms are not public search targets.

## 8. Stage owners

```text
stage_launch       -> /estagios/lancamento/
stage_construction -> /estagios/em-construcao/
stage_ready        -> /estagios/pronto-para-morar/
```

State: `CONDITIONAL_PLANNED_INDEXABLE`.

A stage route becomes indexable only after current stage membership is verified, it contains stable decision-useful textual content rather than only a JavaScript filter state, it does not duplicate exact project pages, and a later implementation/QA gate explicitly authorizes publication.

## 9. Broad generic and excluded families

`apartamentos são paulo`, `apartamentos à venda são paulo`, generic Brooklin/Perdizes/Lapa inventory families remain `SUPPORT_ONLY`. They may support portfolio copy, qualified location pages, stage pages, comparison modules and internal linking, but receive no dedicated primary owner in M3-06.

Raw `lapa`, design/professional spillover, typo/noise, rental and house-inventory families remain `NO_OWNER` unless a later evidence-backed contract supersedes the decision.

## 10. Canonical and internal-linking contract

- `/` remains the existing MoreNumTegra public owner; this task changes no runtime canonical behavior.
- Planned routes: `CURRENT_CANONICAL = NOT_APPLICABLE_UNTIL_ROUTE_EXISTS`; future self-canonical only after implementation/QA.
- Project modifiers share the exact project canonical.
- Support/no-owner families receive no dedicated canonical page.

Internal-link direction for later M4 implementation:

```text
/ -> master, stage and qualified project owners
/caminhos-da-lapa/ -> child project owners
stage/location owner -> exact project owners in that verified set
exact project owner -> relevant master/stage/location discovery surfaces
project fact sections -> stay within exact project canonical
sold/exception project -> may link to active alternatives without transferring entity intent
```

## 11. Anti-overlap rules

1. One primary owner per accepted query family.
2. Exact project intent beats master, stage, location and home ownership.
3. Caminhos da Lapa owns the master development; Nova Vivere, Garden Design, Elo Duo and Reserva own their exact project intent.
4. Stage pages own qualified stage discovery, never exact project names.
5. Location owners require a verified project set and cannot be thin geography pages.
6. Project commercial/fact modifiers stay on the exact project owner by default.
7. ODE returned unit and Reserva exception units are states of the same project entity, not separate landing pages.
8. Sold/historical ownership must not imply current general inventory.
9. Broad generic families remain support unless explicitly promoted by later evidence/authority.
10. Corporate/noise/unrelated families remain without owner.
11. No page is created solely for a keyword variant or lexical reversal.
12. No JavaScript-only filter state is treated as an indexable owner.

## 12. Exit criteria

M3-06 bounded scope is satisfied because every material M3-05 family has a primary, conditional, support-only or no-owner disposition in the machine-readable matrix; exact project and master-development ownership are separated; bottom-funnel modifiers stay on project canonicals; stage/location owners have explicit creation/indexability gates; ODE and Reserva preserve their dual-state commercial semantics; no stock, price, unit or availability was invented; official Tegra source/content/image permission is registered without being misrepresented as publication authorization; and no runtime/platform mutation occurred.

## 13. Lifecycle

```text
MNT-M3-01 = COMPLETE / ACCEPTED
MNT-M3-02 = COMPLETE / ACCEPTED
MNT-M3-03 = COMPLETE / ACCEPTED / PR #58 MERGED
MNT-M3-04 = COMPLETE_CANDIDATE / PR #59 OPEN DRAFT
MNT-M3-05 = COMPLETE_CANDIDATE / PR #60 OPEN DRAFT
MNT-M3-06 = COMPLETE_CANDIDATE / PR #61 OPEN DRAFT
MNT-M3-07 = PLANNED / NOT_AUTHORIZED
```

Review remains stack-ordered `#59 -> #60 -> #61`. Ready/merge requires separate explicit Product Authority authorization. M3-07 must not start by sequence alone.

`M3-06 COMPLETE_CANDIDATE != READY != MERGED != M3-07 AUTHORIZED`.
