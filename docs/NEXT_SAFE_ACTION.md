# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-25`.

## Estado atual

```text
repository main = RESOLVE_LIVE
latest integrated runtime source = 43ca5ba30b738b32ef482a4b9864d4bce4d97474
Production = dpl_JLfW5GLsE4xwTu1fVr88Pc1Ms2iU / READY
runtime errors last 24h = NONE OBSERVED

MNT-RESF = CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
accepted = 1200 / 1240h = 96.77%
deferred = 40h
```

Traceability authority:

`docs/governance/MNT_CHANGE_TRACEABILITY_STANDARD_V1.md`

Current reconciliation:

`docs/governance/MNT_TRACEABILITY_AUDIT_2026-09-25.md`

## Explicitly authorized bounded exception — GA4 Audience Readiness

Product Authority authorized the current GA4 audience-readiness correction after RESF Audience Readiness adoption.

State:

```text
180d full-URL candidate = CREATED
540d full-URL candidate = CREATED
180d path-safe = CREATED
540d path-safe = CREATED
path-safe rule = Page path and screen class begins with /empreendimentos/
path-safe classifier validation = COMPLETE
accumulation observation = NEXT
legacy/export dependency check = PENDING
canonical window policy = PENDING
archival = NOT_AUTHORIZED
paid media = FROZEN
```

Next bounded action:

Observe initial accumulation for the path-safe audiences and check downstream dependency/export state before any archival. Do not archive any existing audience and do not activate Google Ads.

## MNT-PERF-02 closure

`MNT-PERF-02 = COMPLETE / EVIDENCE_CANONICALIZED / NO_RUNTIME_MUTATION`

Canonical evidence:

`docs/performance/MNT_PERF_02_CURRENT_RUNTIME_VERIFICATION_2026-09-25.md`

Remediation backlog:

`GitHub issue #266 — MNT-PERF-03 — current-runtime performance remediation planning`

Issue #266 does not authorize a runtime slice.

## Default backlog next action after the bounded GA4 exception

Unless Product Authority explicitly selects and authorizes one bounded MNT-PERF-03 remediation slice, resume:

```text
MNT-CDP-01 = provider/publication-owner selection
MNT-CDP-03 = spreadsheet/CSV value-update path
```

If Product Authority selects performance remediation, only the selected route/cause slice becomes authorized; do not batch Home, DSG, CAPIITOLO, Elo and Ária into one runtime change.



Resume documented backlog unless Product Authority selects another task:

```text
MNT-CDP-01 = provider/publication-owner selection
MNT-CDP-03 = spreadsheet/CSV value-update path
```

Paid media remains frozen:

```text
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07
```


## Active bounded performance follow-up — MNT-PERF-03A

The authorized Home remediation is merged and live.

```text
runtime SHA = 02feb3804a4a87c6d07bc12a5b9c7b983816b6ed
Production = dpl_3HqSohk1Sq32vWm8cUMFpgqY8GfW / READY
implementation = COMPLETE
post-change performance measurement = NEXT
```

Next safe action for this slice:

1. run five PageSpeed/Lighthouse Mobile samples on `https://www.moretegra.com.br/`;
2. use the same MNT-PERF-02 method (Moto G Power emulation / slow 4G / initial load);
3. record FCP/LCP/TBT/CLS/transfer and median;
4. verify that initial-load YouTube embed transfer is absent;
5. compare to MNT-PERF-02 Home median without treating TBT as INP;
6. adjudicate retain/rollback/further bounded Home remediation from evidence.

Do not start DSG, CAPIITOLO, Elo or Ária remediation from the MNT-PERF-03A authorization.


## MNT-PERF-03A measurement closure / next Home candidate

The five-run post-change Home battery is complete.

```text
MNT-PERF-03A = RETAIN
Home LCP median = 4.2 s
target <= 2.5 s = NOT MET
```

Product Authority said "Vamos seguir" after the completed battery. Treat the next bounded action as:

```text
MNT-PERF-03B = Home late GTM network bootstrap only
```

Boundary:

- reuse the accepted Elo Duo late-GTM pattern;
- preserve `GTM-PGCR4R47`;
- preserve the initial `gtm.js` dataLayer marker;
- preserve queued MNT events and Consent events;
- no event-name/parameter changes;
- no GA4 audience/configuration mutation;
- no Form46/commercial/SEO/project-page mutation;
- load GTM network on window load or first user interaction, whichever comes first;
- exact-head validation + browser smoke;
- Production resolution;
- five-run Home Mobile battery before performance conclusion.

Do not combine CSS, catalog DOM, project-page or other performance changes into MNT-PERF-03B.


## Active bounded performance follow-up — MNT-PERF-03B

The Home late-GTM runtime is merged and live.

```text
runtime SHA = 43ca5ba30b738b32ef482a4b9864d4bce4d97474
Production = dpl_JLfW5GLsE4xwTu1fVr88Pc1Ms2iU / READY
implementation = COMPLETE
post-change performance measurement = NEXT
```

Next safe action:

Run five Mobile PageSpeed/Lighthouse samples on the Home with the same method used for MNT-PERF-03A. Compare the new median primarily to 4.2 s. Do not start another runtime remediation before this battery is adjudicated.
