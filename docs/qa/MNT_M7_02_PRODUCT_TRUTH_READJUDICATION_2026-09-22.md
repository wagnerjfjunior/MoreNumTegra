# M7-02 — Product Truth Re-adjudication

Date: 2026-09-22

Status: COMPLETE / ACCEPTED_WITH_P2_RESIDUALS

Authority:

docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md

## Trigger

M7-02 originally recorded two P1 findings:

- F01: Home volatile commercial objects lacked release-time revalidation;
- F02: ODE comparative R$ 2.200.000 -> R$ 2.090.000 lacked recertification.

Product Authority subsequently made a direct, explicit decision that the current Home commercial state is the interim commercial truth of the MoreNumTegra Home until a governed update mechanism supersedes it.

## Re-adjudication

~~~text
F01 = CLOSED_BY_PRODUCT_AUTHORITY_RECERTIFICATION
F02 = CLOSED_BY_PRODUCT_AUTHORITY_RECERTIFICATION

P0 = 0
P1 = 0
P2 = 2
P3 = 0
~~~

The closure is not inferred from Endomarket-Setembro.md. It comes from direct Product Authority recertification of the current Production Home state at runtime SHA 124b620855175a583c528733462d6d0f4f44cd41.

The ODE comparative currently present in the Home is explicitly included in that recertification.

## Residuals retained

P2 residuals remain:

1. CAPIITOLO critical body is still composed client-side through fetch/DOMParser/document replacement.
2. Google Search favicon eligibility remains unresolved for the canonical WebP favicon.

Neither residual is upgraded or erased by this Product Truth decision.

## Acceptance

~~~text
MNT-M7-02 = COMPLETE / ACCEPTED_WITH_P2_RESIDUALS
accepted hours = 16
program accepted = 1040 / 1240h
remaining = 200h
accepted percent = 83.87%
~~~

No runtime, Production, Vercel, Ads, GTM, GA4 or Form 46 mutation was required to close the Product Truth P1 findings.
