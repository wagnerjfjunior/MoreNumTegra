# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-20`.

Fonte canônica: GitHub `main`. Resolver estado live antes de qualquer mutação.

## 1. Estado integrado

```text
CANONICAL_MAIN_RUNTIME = 6dc362a63de8b797082fb1c7b4ac70a8a5aa2ae8
PRODUCTION_DEPLOYMENT = dpl_AWHaTzE4UrJQaZ3LnKqhEMd8wsBs
PRODUCTION_STATE = READY

MNT-M5 = ACTIVE
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
MNT-M5-03 = COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION
MNT-M5-04 = COMPLETE / PRODUCTION_REGRESSION_PASS / PHYSICAL_DEVICE_NOT_OBSERVED
MNT-M5-05 = COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M5-06 = COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED
MNT-M5-07 = COMPLETE / PRODUCTION_GA4_PASS / GTM_VERSION_12_LIVE
MNT-M5-08 = AUTHORIZED / READY_TO_START
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 864
REMAINING_FORECAST_HOURS = 376
ACCEPTED_PERCENT = 69.68
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

MNT-M5-08 is blocked by M5-07 implementation/acceptance. MNT-M5-10 remains explicitly not authorized.

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
