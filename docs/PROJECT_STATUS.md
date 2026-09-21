# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-20`.

Fonte canônica: GitHub `main`. Resolver estado live antes de qualquer mutação.

## 1. Estado integrado

```text
CANONICAL_MAIN_RUNTIME = f4bb33e42f746682578f3404011daaa64e485e90
PRODUCTION_DEPLOYMENT = dpl_jm8WcAjoVFxEydxdn2XiSsf222dP
PRODUCTION_STATE = READY

MNT-M5 = ACTIVE
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
MNT-M5-03 = COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION
MNT-M5-04 = COMPLETE / PRODUCTION_REGRESSION_PASS / PHYSICAL_DEVICE_NOT_OBSERVED
MNT-M5-05 = COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M5-06 = COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED
MNT-M5-07 = COMPLETE / PRODUCTION_GA4_PASS / GTM_VERSION_12_LIVE
MNT-M5-08 = COMPLETE / CRM_HANDOFF_CONTRACT_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M5-09 = COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION
MNT-M5-10 = ACTIVE / SLICE_01_MEASURED / ROLLBACK_APPLIED / NEXT_DECISION_REQUIRED

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 896
REMAINING_FORECAST_HOURS = 344
ACCEPTED_PERCENT = 72.26
```

## 2. M5-06 CTA/Form journey

Canonical evidence:

`docs/conversion/MNT_M5_06_CTA_FORM_JOURNEY_CLOSURE_2026-09-20.md`

Runtime PR #189 introduced allowlisted CTA -> Form 46 intent preservation.

Examples:

- Home `Quero negociar meu cenário` -> `Negociar meu cenário`;
- Ária `Agendar uma visita` -> `Agendar visita`;
- Ária `Simular possibilidades de pagamento` -> `Simular forma de pagamento`;
- CAPIITOLO `Receber condições` -> `Condições e disponibilidade`;
- CAPIITOLO `Agendar visita` -> `Agendar visita`.

Candidate validation:

`35543109536 / SUCCESS`

Production validation:

```text
RUN = 35543247914
PASS = 24
FAIL = 0
TOTAL = 24
ARTIFACT = 10615004501
```

No validation lead was submitted.

## 3. CAPIITOLO / Capitolo

Official brand/title/H1 remain `CAPIITOLO`.

The same canonical exact-project page now naturally covers `Capitolo Tegra` and `Capitolo by Piero Lissoni`.

No alias/duplicate route was introduced and the canonical remains:

`https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`

## 4. Production

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_SOURCE_SHA = be7f229ea04cf4050c40c471e21f262f4cfc845d
PRODUCTION_DEPLOYMENT = dpl_CZEKd9SmbVTx6T2L7y4rFkTRdQhP
PRODUCTION_STATE = READY
```

## 5. M5-07 — Lead semantics

Status:

```text
MNT-M5-07 = COMPLETE / PRODUCTION_GA4_PASS / GTM_VERSION_12_LIVE
```

Canonical decision packet:

`docs/conversion/MNT_M5_07_LEAD_SEMANTICS_DECISION_GATE_2026-09-20.md`

Existing contracts resolve all currently observed semantic mappings except one: `Simular forma de pagamento`.

Product Authority approved on 2026-09-21:

- `Simular forma de pagamento` remains precise in Form 46/Green CRM;
- Measurement normalizes that action to `negotiate_scenario / form / SECONDARY`;
- controlled `project_name` / `offer_name` must continue through `mnt_lead_success` and the GA4 `generate_lead` destination;
- no visitor PII or raw `texto-livre` enters Measurement.

M5-07 is accepted. Progress is `864 / 1240h = 69.68%`.

MNT-M5-08 is blocked by M5-07 implementation/acceptance. MNT-M5-10 slice 01 was authorized and measured; additional slices require a new explicit decision.

## 6. M5-07 GTM Preview validation

Evidence: `docs/conversion/MNT_M5_07_GTM_PREVIEW_VALIDATION_2026-09-21.md`

- runtime PR #194 merged;
- Production semantics run `35596887663` = SUCCESS;
- GTM Preview proves `mnt_lead_success -> generate_lead` carries `project_name` and `offer_name` to `G-57M2XR0CY2`;
- uploaded GTM state is `QUICK_PREVIEW`, therefore publication is still required before acceptance.


## 7. M5-07 final acceptance

Final evidence confirms:

- GTM `GTM-PGCR4R47` version `12` = Live / Latest;
- version name = `Update "GA4 - Event - generate_lead - mnt_lead_success" tag`;
- GA4 `G-57M2XR0CY2` receives `generate_lead` with `project_name` and `offer_name`;
- normal-site Pixel Helper export contains no `gtm_debug`;
- no PII or raw `texto-livre` was added to Measurement.

M5-07 is COMPLETE and M5-08 is released under continuing Product Authority authorization.


## 8. M5-08 Green/Form 46 CRM handoff

Canonical contract:
`docs/conversion/MNT_M5_08_GREEN_FORM46_CRM_HANDOFF_CONTRACT_2026-09-21.md`

Accepted boundary:
- frontend sends Form 46 contract fields plus controlled `texto-livre`;
- real Green evidence proves project + commercial intent reach CRM;
- tag and seller are Green downstream enrichment, not frontend-owned payload;
- no runtime mutation required.

M5-08 is COMPLETE. M5-09 is authorized to start.


## 9. M5-09 Form/CTA conversion QA

Canonical evidence:
`docs/conversion/MNT_M5_09_FORM_CTA_CONVERSION_QA_2026-09-21.md`

Run `35602579028` = SUCCESS.

```text
candidate lead/privacy = 36 PASS / 0 FAIL
candidate + Production CTA/Form matrix = 42 PASS / 0 FAIL
```

No additional real Green lead was created by the diagnostic. Accepted M5-07/M5-08 real Green + GA4 evidence remained applicable because effective Production runtime is unchanged.

M5-09 is COMPLETE.

M5-10 slice 01 is complete at the evidence level; additional slices require Product Authority decision.


## 10. M5-10 Elo Duo slice 01 authorization

Product Authority authorized a bounded practical trial with two Green/GDigital-hosted Elo Duo images.

Media probe run `35606609562`:

```text
current hero = 236596 B JPEG / 694x930
Green hero = 175392 B WebP / 1080x1350
current complex = 62606 B WebP / 835x467
Green complex = 83076 B WebP / 1126x630
```

The raw uploaded Complexo PNG was 1318029 B and Green emitted an 83076 B WebP at the same dimensions (~93.7% reduction), supporting direct-original upload as the default workflow.

Authorization is limited to these two Elo Duo assets. Other M5-10 slices remain blocked pending evidence after this trial.


## 11. M5-10 Elo Duo slice 01 measured result

Evidence: docs/performance/MNT_M5_10_ELO_DUO_COMPACT_SOURCE_COMPARISON_2026-09-21.md

- raw-source Green WebP: 83,076 B;
- compact-source Green WebP: 106,720 B;
- manual pre-compression produced a 28.5% larger delivered WebP;
- compact trial PR #201 was rolled back by PR #202;
- current Production SHA f4bb33e42f746682578f3404011daaa64e485e90 / dpl_jm8WcAjoVFxEydxdn2XiSsf222dP / READY;
- LCP lab results show material run-to-run variability, so the below-fold asset is not assigned causal LCP impact.

Next M5-10 slice requires explicit Product Authority authorization.
