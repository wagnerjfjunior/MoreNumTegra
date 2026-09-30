# MoreNumTegra — PR #318 Lapa Region Production Release — 2026-09-30

Status: `COMPLETE / MERGED / PRODUCTION_READY / USER_VISUAL_APPROVED`

## Traceability

```text
repository = wagnerjfjunior/MoreNumTegra
branch = feat/region-lapa-20260930
PR = #318
validated head = 3108b8de3103f181dcd9f59e355850353086bc59
merge/runtime SHA = d6dbc451554ca579d80ff7f16fee8c39e5a41da3
Production deployment = dpl_9KTywaqRc5TL7PPsP8u5aq28hAiL
Production state = READY
route = https://www.moretegra.com.br/regioes/lapa/
```

## Runtime scope

- `src-greenn/regioes/lapa/index.html`
- `vercel.json`
- `sitemap.xml`
- `src-greenn/preview/index.html`

## Outcome

The Lapa page is a regional buying guide rather than an exact-project or master-development duplicate.

Measured visible editorial balance before merge:
- total visible words: ~1,431;
- regional content before project section: ~72% of region + project-decision copy;
- project/decision content: ~28%.

Exact-project owners preserved:
- Elo Duo;
- Garden Design;
- Nova Vivere;
- Reserva Caminhos da Lapa.

`/caminhos-da-lapa/` remains reserved and was not created.

## Contracts preserved

- canonical `https://www.moretegra.com.br/regioes/lapa/`;
- Form 46;
- GTM `GTM-PGCR4R47`;
- JSON-LD valid;
- FAQ visible/schema parity 6/6;
- no internal Search-governance jargon in customer copy.

## Checks

PASS:
- Favicon standard validation;
- Commercial page standard validation;
- Social sharing metadata validation;
- MNT-PERF-03A Home video intent-load validation;
- MNT-PERF-03B Home late GTM validation.

Residual RED:
- M5-06 CTA/Form journey — pre-existing validator debt;
- M4-05R metadata validation — validator expects legacy `portal-links.js` observer/text guards while the current canonical file is intentionally a compatibility shim. PR #318 did not modify that file.

## Production

Vercel resolved the exact merge SHA to deployment `dpl_9KTywaqRc5TL7PPsP8u5aq28hAiL` with state `READY`.

The external web fetch tool could not access the public route for an independent HTTP-content smoke in this session; do not treat that tool failure as a site failure.
