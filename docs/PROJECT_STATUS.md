# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-22`.

Fonte canônica: GitHub `main`. Resolver estado live antes de qualquer mutação.

## 1. Estado integrado

```text
CANONICAL_MAIN_RUNTIME = 8d99996edddd66a59835992da161edbbb3579ad0
PRODUCTION_DEPLOYMENT = dpl_6BP6WssMhisgJMdy91TbFSLyFVXX
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
MNT-M5-10 = ACTIVE / SLICE_07_RETAINED / NEXT_SLICE_DECISION_REQUIRED

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
PRODUCTION_SOURCE_SHA = 8d99996edddd66a59835992da161edbbb3579ad0
PRODUCTION_DEPLOYMENT = dpl_6BP6WssMhisgJMdy91TbFSLyFVXX
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

MNT-M5-07, MNT-M5-08 and MNT-M5-09 are complete. MNT-M5-10 is active; Slice 01 is complete and the next slice requires a new Product Authority decision.

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


## 11. M5-10 Elo Duo Slice 01 — final A/B state

Canonical transition evidence:

`handoffs/HANDOFF-2026-09-21-M5-10-ELO-MEDIA-AB-SESSION-TRANSITION.md`

Production:

```text
SHA = 5b60e5862fd8581996b92ca8e1e40ce93285b4e4
DEPLOYMENT = dpl_2FsJfM4L8o95vUzHTiV2Cp4ePrr8
STATE = READY
```

Current Elo Duo media:

- hero = compact-source Green WebP, `160,918 B`;
- complex/Rua Jardim = raw-source Green WebP, `83,076 B`.

Hero five-run medians:

```text
compact = LCP 3,947 ms / score 70 / transfer 1,062,054 B
original = LCP 4,037 ms / score 65 / transfer 1,086,450 B
```

The compact hero is selected, but the `<=2,500 ms` LCP target remains unmet.

The manually pre-compressed complex-source experiment was rejected because Green generated a larger WebP (`106,720 B`) than from the raw source (`83,076 B`).

M5-10 remains ACTIVE. No task hours are accepted from Slice 01 alone. The next performance slice requires a Product Authority decision.


## 12. M5-10 Elo Duo Slice 07 — retained late GTM bootstrap

Canonical evidence:

`docs/performance/MNT_M5_10_ELO_DUO_LATE_GTM_BOOTSTRAP_SLICE07_2026-09-22.md`

Runtime:

```text
PR = #217 / MERGED
SHA = 8d99996edddd66a59835992da161edbbb3579ad0
DEPLOYMENT = dpl_6BP6WssMhisgJMdy91TbFSLyFVXX
STATE = READY
```

The retained implementation keeps `GTM-PGCR4R47` as the sole dispatcher and keeps the canonical `gtm.js` queue marker immediate, but delays the GTM network bootstrap to `window.load` or first pointer/keyboard interaction.

Validation:

```text
PR #217 exact-head gates = 7/7 SUCCESS
Production QA run 35736764272 = SUCCESS
Final Consent/GA4 proof run 35737706576 = SUCCESS
Form46 lead submissions during QA = 0
```

Five-run Production median:

```text
LCP = 3,279 ms
score = 84
TBT = 237 ms
CLS = 0.0307
clean-control LCP = 3,676 ms
delta = -397 ms / -10.80%
```

The performance gain is material and Slice 07 is retained. The project target `LCP <= 2,500 ms` remains unmet.

No M5-10 task hours are accepted from Slice 07 alone. The next runtime slice requires a new Product Authority decision.
