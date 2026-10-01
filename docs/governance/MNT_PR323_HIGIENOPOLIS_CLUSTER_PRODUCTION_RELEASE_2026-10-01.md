# PR #323 — Higienópolis cluster Search release — 2026-10-01

## Scope

Bounded Search/semantic standardization across:

- `/empreendimentos/aria-higienopolis/`
- `/empreendimentos/mozae-higienopolis/`
- `/regioes/higienopolis/`

## Traceability

```text
PR = #323 / MERGED
validated head = 2f8c98e1c860e9da5437b9a0c1149e3e009e65e1
merge/runtime SHA = b954992039895f238a72dd917beebd7cafe919d6
Production deployment = dpl_CGZjq9iaznc7CYLJk8Ggq8NcgDeb
Production state = READY
canonical host = https://www.moretegra.com.br/
```

## Delivered

- Ária, Mozae and Higienópolis region aligned as one Search cluster;
- apartment/dormitory/suite/stage vocabulary distributed by page ownership;
- third-party phrasing such as "A Tegra apresenta" and "fonte oficial da Tegra" removed from the affected cluster;
- region ↔ exact-project contextual links added;
- visible FAQ and FAQPage JSON-LD parity enforced;
- Ária exact-project schema enriched with FloorPlan and related links;
- Mozae exact-project schema aligned with Product, Offer, Service, Person, FloorPlan and amenity semantics;
- Higienópolis region schema enriched with ItemList for Ária and Mozae;
- Form 46 and GTM preserved;
- price, metragem and lifecycle facts preserved.

## Validation

Exact-head relevant checks:

```text
Commercial page standard validation = PASS
Social sharing metadata validation = PASS
Favicon standard validation = PASS
M5-07 Lead semantics = PASS
```

Known red checks retained as pre-existing validator debt / global legacy expectations:

```text
M4-05R metadata validation = RED / portal-links legacy expectation
M5-06 CTA/Form journey = RED / global legacy failures outside this bounded delta
M5-10 Aria responsive media slice 09 = RED / global legacy failures outside this bounded delta
M5-10 Aria access hero candidate 1 = RED / global legacy failures outside this bounded delta
```

The failing logs still showed Ária and Mozae CTA intent checks as PASS.

## Production validation

Observed on the canonical host after deployment:

- Ária = HTTP 200 and new semantic copy present;
- Mozae = HTTP 200 and new semantic copy present;
- Higienópolis regional = HTTP 200 and new semantic copy/ItemList present;
- post-release runtime errors for the three routes in the checked 1h window = NONE OBSERVED.

## AI / answer-engine follow-up

Current `robots.txt` wildcard permits crawling:

```text
User-agent: *
Allow: /

Sitemap: https://www.moretegra.com.br/sitemap.xml
```

Next bounded Search/AI work may validate OAI-SearchBot runtime access, entity/answerability quality and Video SEO / VideoObject when factual official video is visibly embedded.

This release does not authorize schema stuffing, unsupported facts or another runtime slice by sequence alone.
