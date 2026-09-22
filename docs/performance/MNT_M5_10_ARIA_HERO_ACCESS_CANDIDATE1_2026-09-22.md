# MNT-M5-10 — Ária Hero Candidate 1 / Residential Access

Date: `2026-09-22`

Status: `ACTIVE / PRODUCT_AUTHORITY_AUTHORIZED / SINGLE-HERO-A-B`

## Authorization

Product Authority supplied two Green/GDigital Ária media candidates and explicitly requested:

1. test one image first;
2. do not introduce the rooftop-pool image in this slice;
3. compare timing before deciding whether to add/test the second image.

This slice therefore uses only:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/%C3%81ria%20Higien%C3%B3polis-Perspectiva%20ilustrada%20do%20acesso%20residencial..webp`

The pool candidate is out of scope.

## Start anchors

```text
CANONICAL_MAIN_AT_START = ca273a3d4e33053071b6050d8c4c79955161b5ac
EFFECTIVE_PRODUCTION_RUNTIME = ac7958db2f2f4cd3d3bfccf4b6e9592f81a5d739
PRODUCTION_DEPLOYMENT = dpl_6bepVcnUTT9hDhgkHbQsAdtkoE8T / READY
```

## Exact source probe

```text
Green source = 1600x853 WebP
bytes = 219,786
sha256 = 1d5c016e7d5aecfaa4caa97beff037b1de5b2b89036143d3a9be776e3b19687c
mobile 1.15:1 center crop = 981x853
```

Generated repository-owned test derivatives:

```text
640x557 WebP = 64,508 B
828x720 WebP = 99,308 B
```

Both remain within the Responsive Media Delivery Standard V1 preferred mobile hero budget of <=100 KiB and neither upscales beyond useful source detail.

## Contemporaneous retained-control baseline

Existing retained Ária Production was re-run immediately before mutation.

Run `35743393547`, attempt 3:

```text
score median = 95
FCP median = 964 ms
LCP median = 1,853 ms
CLS median = 0.0287
TBT median = 244 ms
transfer median = 535,700 B
current hero transfer ~= 83,042 B
gallery1 transfer ~= 103,041 B
target <=2,500 ms = PASS
```

This `1,853 ms` median is the primary contemporaneous control for candidate comparison. Historical post-Slice-09 medians remain supporting evidence but are not substituted for this control.

## Candidate isolation

Only hero delivery changes:

- mobile hero -> repository candidate derivatives;
- desktop/fallback hero -> Product Authority supplied Green WebP;
- alt text -> exact residential-access description.

Unchanged:

- first gallery responsive contract;
- all other gallery images;
- GTM/GA4/Consent;
- Form46;
- commercial data;
- canonical/robots/schema;
- OG/Twitter/JSON-LD primary-image references;
- CTA/WhatsApp;
- layout dimensions and hero priority.

## Retention rule

Retain only after:

1. exact-head regression gates PASS;
2. Production selects repository 828w candidate on 393x852 DPR2.75;
3. original Green 219,786 B source is not downloaded on mobile;
4. desktop candidate renders via Green source;
5. same five-run Lighthouse mobile methodology is completed;
6. CLS remains <=0.1;
7. no business-flow regression / no QA Form46 lead;
8. timing result is compared against the contemporaneous 1,853 ms median.

The second/pool image remains a separate future decision.
