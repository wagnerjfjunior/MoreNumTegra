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
MNT-M5-08 = COMPLETE / CRM_HANDOFF_CONTRACT_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M5-09 = COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION
MNT-M5-10 = ACTIVE / SLICE_01_COMPLETE / NEXT_SLICE_DECISION_REQUIRED

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

Next gate: M5-10 performance remediation remains explicitly not authorized and requires Product Authority decision.


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


## 11. M5-10 Elo Duo slice 01 result

Runtime:
`a43431ce65468a70a06844452fc17589fb49c68d`

Production:
`dpl_5nz8h9AzHNqYAwM9aaw12xorVrUX / READY`

Performance evidence:
`35608067789 / SUCCESS / artifact 10643068494`

```text
historical Elo LCP = 8234 ms
slice01 LCP = 7486 ms
directional improvement = 9.1%
CLS = 0.0357 / PASS
```

The LCP element remains the Elo hero. Observed hero resource-load duration fell to ~486 ms median from ~1442 ms historical baseline.

The Green media workflow is accepted for ordinary migration:
- direct-original upload is acceptable;
- Green WebP output must still be verified;
- dimension/crop governance remains mandatory;
- manual pre-compression is not required by default.

M5-10 remains ACTIVE but no additional slice is authorized yet. Program accepted hours remain unchanged until M5-10 is completed/accepted as a task.
