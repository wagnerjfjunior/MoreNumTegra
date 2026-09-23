# M7-12 — Result Registration with Provenance

Date: 2026-09-23

Status: COMPLETE / ACCEPTED / PROVENANCE_REGISTERED

## Canonical runtime identity

~~~text
repository = wagnerjfjunior/MoreNumTegra
effective Production runtime SHA = 124b620855175a583c528733462d6d0f4f44cd41
runtime tree SHA = b40b9afb5b834b0fc0abdd32d3486f82198d0e9e
Vercel deployment = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
target = production
state = READY
canonical host = https://www.moretegra.com.br/
~~~

## M7 evidence registry

| Task | State | Primary evidence |
|---|---|---|
| M7-01 | COMPLETE | docs/qa/MNT_M7_01_PREVIEW_VALIDATION_ADJUDICATION_2026-09-22.md |
| M7-02 | COMPLETE / P2 residuals | docs/qa/MNT_M7_02_PRODUCT_TRUTH_READJUDICATION_2026-09-22.md |
| M7-03 | COMPLETE | docs/qa/MNT_M7_03_INDEPENDENT_MOBILE_QA_2026-09-23.md |
| M7-04 | COMPLETE | docs/qa/MNT_M7_04_TRACKING_LEAD_E2E_QA_2026-09-23.md |
| M7-05 | COMPLETE | docs/qa/MNT_M7_05_REGRESSION_SUITE_2026-09-23.md |
| M7-06 | COMPLETE | docs/qa/MNT_M7_06_P0_P1_RELEASE_ADJUDICATION_2026-09-23.md |
| M7-07 | COMPLETE | docs/qa/MNT_M7_07_VERCEL_PRODUCTION_HOMOLOGATION_2026-09-23.md |
| M7-08 | COMPLETE / superseded target | docs/qa/MNT_M7_08_GREEN_PUBLICATION_READJUDICATION_2026-09-23.md |
| M7-09 | COMPLETE | docs/qa/MNT_M7_09_PRODUCTION_SMOKE_2026-09-23.md |
| M7-10 | COMPLETE | docs/observability/MNT_M7_10_POST_RELEASE_MEASUREMENT_2026-09-23.md |
| M7-11 | COMPLETE | docs/observability/MNT_M7_11_GSC_GA4_ADS_OBSERVATION_WINDOW_2026-09-23.md |

## External/runtime observations

### GitHub exact-tree QA

~~~text
PR #231 tested head = 91735d13c702a32c4d14e6825fea9489374c1051
tested tree = b40b9afb5b834b0fc0abdd32d3486f82198d0e9e
Production merge tree = b40b9afb5b834b0fc0abdd32d3486f82198d0e9e
~~~

Selected exact-tree successful runs:

~~~text
35765733743 — M5-06 CTA/Form journey
35765733800 — M4-05R metadata validation
35765733660 — Favicon standard validation
35765733757 — Commercial page standard validation
~~~

Mobile CTA/Form run:

~~~text
job = 106874662809
viewport = 393x852
hasTouch = true
browsers = Chromium / Firefox / WebKit
result = 27 PASS / 0 FAIL
~~~

### GA4

~~~text
property = 553742649 / MoreNumTegra
destination event = generate_lead
GTM = GTM-PGCR4R47
published mapping evidence = version 12 / Live / Latest
~~~

Live read captured recent `generate_lead` events and exact post-release Home traffic after the current deployment became READY.

### Search Console

~~~text
property = sc-domain:moretegra.com.br
current available observations captured = YES
causal ranking claim = NO
~~~

### Google Ads

~~~text
target account = 560-869-4042 / SWL Consultoria de imoveis
M6-07 = DEFERRED / PAID_MEDIA_FROZEN
M6-08 = DEFERRED / DEPENDS_ON_M6-07
last-7-day observation query rows = 0
Ads mutation during M7 = 0
~~~

## Release severity

~~~text
P0 = 0
P1 = 0
P2 = 2
P3 = 0
~~~

Retained P2 residuals:

1. CAPIITOLO client-side editorial composition;
2. Search favicon eligibility residual.

## Causal-claim boundary

Observed traffic, events, GSC rows or performance measurements are registered as observations only.

This evidence does not claim that any isolated SEO, performance, content or measurement change caused ranking, traffic, lead or revenue movement.

## M7-12 acceptance

~~~text
MNT-M7-12 = COMPLETE / ACCEPTED
accepted hours = 16
provider learning intake = NEXT / M7-13
runtime mutation = 0
~~~
