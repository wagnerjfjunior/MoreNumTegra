# M7-04 — Tracking + Lead End-to-End QA

Date: 2026-09-23

Status: COMPLETE / ACCEPTED / COMPOSITE_CURRENT_EVIDENCE / NO_SYNTHETIC_REAL_LEAD

## 1. Chain under QA

~~~text
CTA
-> controlled Form 46 intent
-> Form 46 submission lifecycle
-> Green CRM
-> fresh single-use pending marker
-> /obrigado/
-> mnt_lead_success
-> GTM
-> GA4 generate_lead
~~~

## 2. Current runtime preservation proof

M5-09 accepted runtime:

~~~text
6dc362a63de8b797082fb1c7b4ac70a8a5aa2ae8
~~~

Current runtime:

~~~text
124b620855175a583c528733462d6d0f4f44cd41
~~~

Critical lead/measurement blobs are byte-identical across those runtimes:

~~~text
src-greenn/modules/moretegra.measurement.js
  blob = 4b451b0c4e05fb37009ca50ebd608d99707c0f78

src-greenn/modules/moretegra.lead-journey.js
  blob = 6b525f48393c70c4250df42429e73c646cf3ba61

src-greenn/thank-you/obrigado.js
  blob = 493dbd9b8abe13ccf7843605b0f9eef2f980bc29

src-greenn/preview/thank-you-measurement.js
  blob = 60cf8e9001260474b7ca0b0cd70c4c570794ff33

src-greenn/preview/measurement-core.js
  blob = b3e796303d8fcd3bc6c12ce76174cd2371fd8932
~~~

Later runtime changes were media/performance and Home content/interest-context work. The current exact tree separately passed the mobile CTA/Form journey matrix in run 35765733743.

## 3. Accepted downstream evidence retained

M5-08 real Green evidence already proved a real MoreEmUmTegra lead reaching Green CRM with controlled project + intent context.

M5-07 proved:

~~~text
GTM = GTM-PGCR4R47
published version = 12 / Live / Latest
source = mnt_lead_success
destination event = generate_lead
GA4 = G-57M2XR0CY2
project_name / offer_name mapping = accepted
~~~

No later authorized change replaced that GTM mapping.

## 4. Current live GA4 read

Read-only GA4 connector:

~~~text
property = 553742649 / MoreNumTegra
window = last 7 days including current-day availability
~~~

Observed recent events include:

~~~text
2026-09-18:
mnt_form_start = 7
mnt_form_submit_attempt = 3
generate_lead = 3

2026-09-21:
mnt_form_start = 4
mnt_form_submit_attempt = 4
generate_lead = 4

2026-09-22:
mnt_intent = 1
page_view = 10
~~~

These are observed event counts. Matching counts are not claimed as proof of per-user causality or a one-to-one join.

The material point is that the live GA4 destination continues to receive the canonical lead destination event `generate_lead`.

## 5. Privacy / semantics

Preserved:

- CTA is not a lead;
- form start is not a lead;
- submit attempt is not a lead;
- WhatsApp remains secondary intent;
- visitor name/e-mail/telephone/raw free text do not enter Measurement;
- controlled project/offer metadata may enter lead Measurement;
- no duplicate native Ads lead tag is introduced.

## 6. Test policy

No new real lead was manufactured solely for M7-04 because:

1. real Green evidence exists for the same lead contract;
2. critical lead/measurement runtime blobs are unchanged;
3. the current exact tree passed CTA/Form mobile regression;
4. current GA4 read proves `generate_lead` is still arriving.

## 7. Acceptance

~~~text
MNT-M7-04 = COMPLETE / ACCEPTED
P0 = 0
P1 = 0
runtime mutation = 0
real synthetic lead created = NO
~~~
