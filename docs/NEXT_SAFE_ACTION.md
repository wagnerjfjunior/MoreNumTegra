# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-25`.

## Estado atual

```text
main = 95567db0d16e15d2c6971d8047ab7327d3171578
Production = dpl_4r1JK6YPLsQC99dPumd8i7SCuwJW / READY
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
180d generic candidate = CREATED
540d generic candidate = CREATED
page_location contains /empreendimentos/ = SEMANTICALLY UNSAFE FOR QUERY-BEARING NEGATIVE CASE
path-safe classifier live validation = NEXT
legacy audience archival = NOT_AUTHORIZED
paid media = FROZEN
```

Next bounded action:

Validate in the live GA4 audience builder whether `Page path and screen class` with `begins with /empreendimentos/` is available and produces the intended audience estimate. Do not archive any existing audience and do not activate Google Ads.

## Default backlog next action after the bounded exception

**MNT-PERF-02 — current-runtime performance verification**

State:

`ACTIVE_NEXT / AUTHORIZED_MEASUREMENT_ONLY / OUTSIDE_RESF_ACCOUNTING`

Why:

- historical `MNT-PERF-01` progressed into remediation PRs #249-#253;
- the final post-remediation measurement packet was not canonicalized;
- runtime changed further through DSG PRs #254-#260;
- current performance must therefore be measured against the current runtime, not inferred from older evidence.

Required scope:

1. resolve live `main` and Production deployment;
2. use runtime `95567db...` only if still current;
3. run the established Lighthouse mobile methodology on:
   - Home;
   - DSG Itaim;
   - CAPIITOLO;
   - Elo Duo;
   - Ária Higienópolis;
4. record five samples per route and medians for LCP/FCP/CLS/TBT/transfer;
5. record favicon/icon request timing only as contextual evidence;
6. compare with applicable historical evidence without treating historical runs as current controls;
7. distinguish deterministic payload changes from lab variance;
8. publish the result as a durable evidence packet;
9. stop before runtime remediation unless Product Authority separately authorizes it.

Targets remain:

```text
LCP <= 2500 ms
CLS <= 0.1
INP <= 200 ms
```

Lighthouse TBT is not field INP.

## After MNT-PERF-02

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
