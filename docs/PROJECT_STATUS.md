# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-25`.

Fonte canônica: GitHub `main`. Resolver estado live antes de qualquer mutação.

## 1. Estado integrado

```text
CANONICAL_MAIN_RUNTIME = 95567db0d16e15d2c6971d8047ab7327d3171578
PRODUCTION_DEPLOYMENT = dpl_4r1JK6YPLsQC99dPumd8i7SCuwJW
PRODUCTION_STATE = READY

MNT-RESF = CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
MNT-M5 = COMPLETE / ACCEPTED
MNT-M6 = DEFERRED / PAID_MEDIA_FROZEN / 40H_UNACCEPTED
MNT-M7 = COMPLETE / ACCEPTED
MNT-M7-01 = COMPLETE / NO_ACTIVE_PREVIEW_CANDIDATE / EXISTING_RELEASE_EVIDENCE_REUSED
MNT-M7-02 = COMPLETE / ACCEPTED_WITH_P2_RESIDUALS
MNT-M7-03 = COMPLETE / ACCEPTED
MNT-M7-04 = COMPLETE / ACCEPTED
MNT-M7-05 = COMPLETE / ACCEPTED
MNT-M7-06 = COMPLETE / ACCEPTED / P0_P1_GATE_PASS
MNT-M7-07 = COMPLETE / ACCEPTED
MNT-M7-08 = COMPLETE / ACCEPTED_BY_SUPERSESSION
MNT-M7-09 = COMPLETE / ACCEPTED
MNT-M7-10 = COMPLETE / ACCEPTED
MNT-M7-11 = COMPLETE / ACCEPTED / PAID_MEDIA_FROZEN
MNT-M7-12 = COMPLETE / ACCEPTED
MNT-M7-13 = COMPLETE / PROVIDER_INTAKE_MERGED
MNT-M6-01 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6-06 = COMPLETE / BUDGET_SPEND_POLICY_AUTHORIZED / PAID_MEDIA_FROZEN
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
MNT-M5-03 = COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION
MNT-M5-04 = COMPLETE / PRODUCTION_REGRESSION_PASS / PHYSICAL_DEVICE_NOT_OBSERVED
MNT-M5-05 = COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M5-06 = COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED
MNT-M5-07 = COMPLETE / PRODUCTION_GA4_PASS / GTM_VERSION_12_LIVE
MNT-M5-08 = COMPLETE / CRM_HANDOFF_CONTRACT_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M5-09 = COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION
MNT-M5-10 = COMPLETE / ACCEPTED / CANDIDATE1_RETAINED / TARGET_PASS / PERFORMANCE_DIRECTION_INCONCLUSIVE

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 1200
REMAINING_FORECAST_HOURS = 40
ACCEPTED_PERCENT = 96.77
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
PRODUCTION_SOURCE_SHA = 95567db0d16e15d2c6971d8047ab7327d3171578
PRODUCTION_DEPLOYMENT = dpl_4F8SF29FyNj7EcpyqM9zT57oYAoi
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


## 13. M5-10 Elo Duo Slice 08 — responsive hero retained

Canonical evidence:

`docs/performance/MNT_M5_10_ELO_DUO_RESPONSIVE_HERO_SLICE08_2026-09-22.md`

Runtime:

```text
PR = #219 / MERGED
SHA = 90745255775129638b3d8f061ab067d8ecc1c425
DEPLOYMENT = dpl_6Dw473nRdfcCgAiEBQGAk5Uer6QL
STATE = READY
```

Retained mobile delivery:

```text
640x557 WebP = 52,278 B
828x720 WebP = 72,376 B
393x852 DPR2.75 selected = 828w
desktop fallback = original Green/S3 hero
```

Production QA run `35740314881` = SUCCESS.

Five-run medians:

```text
LCP = 2,383 ms
score = 92
CLS = 0.0325
TBT = 248 ms
hero transfer ~= 72.6 KB
total transfer = 974,092 B
```

Delta vs retained Slice 07:

```text
LCP 3,279 -> 2,383 ms
delta = -896 ms / -27.33%
score 84 -> 92
transfer delta = -88,516 B
```

Elo Duo now meets the current laboratory target `LCP <= 2,500 ms`.

No M5-10 task hours are accepted from Slice 08 alone. The next runtime slice requires a new Product Authority decision.


## 14. M5-10 Ária Slice 09 — responsive media replicated / standard adopted

Canonical evidence:

- `docs/performance/MNT_M5_10_ARIA_RESPONSIVE_MEDIA_SLICE09_2026-09-22.md`
- `docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md`

Runtime:

```text
PR = #221 / MERGED
SHA = ac7958db2f2f4cd3d3bfccf4b6e9592f81a5d739
DEPLOYMENT = dpl_6bepVcnUTT9hDhgkHbQsAdtkoE8T
STATE = READY
```

Pre-change Ária baseline:

```text
hero = 221,132 B JPEG
gallery1 = 314,816 B JPEG
LCP median = 5,621 ms
score = 74
transfer = 886,131 B
```

Retained mobile derivatives:

```text
hero 640x557 = 70,822 B
hero 714x621 = 82,846 B
gallery1 640x480 = 66,072 B
gallery1 828x621 = 102,838 B
thumb 240x180 = 10,474 B
```

No hero derivative upscales beyond the 714px-wide source. The 1080w gallery candidate at 151,796 B was excluded because it exceeded the preferred M5-03 mobile gallery budget.

Production QA attempt 1:

```text
RUN = 35743393547 / attempt 1
JOB = 106798642833
LCP median = 1,906 ms
delta = -66.09%
score = 88
transfer ~= 535.7 KB
```

Independent Production QA attempt 2:

```text
RUN = 35743393547 / attempt 2
JOB = 106800317696
LCP median = 1,442 ms
delta = -74.35%
score = 97
TBT median = 201 ms
transfer ~= 535.7 KB
```

Both independent post-change batteries meet `LCP <=2,500 ms`. Public browser smoke preserved gallery navigation/accessibility semantics, GTM/GA4 presence and zero Form46 lead submissions.

Cross-project consequence:

```text
ELO RESPONSIVE MEDIA = VALIDATED / TARGET PASS
ARIA RESPONSIVE MEDIA = VALIDATED / TARGET PASS / REPLICATED
RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1 = ADOPTED
```

The standard is the default for new exact-project photographic media. Existing-page bulk mutation remains unauthorized; each remediation stays bounded.

M5-10 remains ACTIVE and no task hours are accepted from Slice 09 alone.


## 15. M5-10 Ária Hero Candidate 1 — residential-access A/B

Canonical evidence:

`docs/performance/MNT_M5_10_ARIA_HERO_ACCESS_CANDIDATE1_2026-09-22.md`

Runtime:

```text
PR = #223 / MERGED
SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
STATE = READY
```

Candidate source supplied by Product Authority:

```text
Green source = 1600x853 WebP / 219,786 B
mobile 640x557 = 64,508 B
mobile 828x720 = 99,308 B
```

Contemporaneous control immediately before the hero change:

```text
RUN = 35743393547 / attempt 3
LCP median = 1,853 ms
score = 95
CLS = 0.0287
TBT = 244 ms
transfer = 535,700 B
hero transfer ~= 83,042 B
```

Candidate Production attempt 1:

```text
RUN = 35748892328 / attempt 1
JOB = 106817504327
LCP median = 2,149 ms
delta vs control = +296 ms / +15.97%
score = 92
transfer = 552,273 B
target <=2,500 ms = PASS
```

Candidate Production attempt 2, with no code/runtime mutation:

```text
RUN = 35748892328 / attempt 2
JOB = 106818874846
LCP median = 1,464 ms
delta vs control = -389 ms / -20.99%
score = 89
transfer = 552,242 B
target <=2,500 ms = PASS
```

Interpretation:

- both candidate batteries meet the LCP target;
- opposite LCP directions make a speed win/loss claim unsupported;
- descriptive pooled candidate 10-run median ~= 1,818 ms, effectively tied with the five-run 1,853 ms contemporaneous control but not a controlled ten-run comparison;
- deterministic hero payload increases by ~16.5 KB / ~19.85%;
- deterministic total transfer increases by ~3.09%;
- gallery, GTM/GA4, Form46, canonical and commercial contracts passed;
- zero QA Form46 leads were submitted;
- rooftop-pool candidate was not tested.

M5-10 remains ACTIVE. Product Authority must decide whether Candidate 1 is retained or the prior hero is restored. No M5-10 task hours are accepted from this A/B.


## 16. M5 final closure / M2-10 reconciliation

Canonical closure:

`docs/sfjm/MNT_M5_10_M5_PHASE_CLOSURE_2026-09-22.md`

Product Authority retained the live Ária Candidate 1 hero and accepted M5-10.

```text
MNT-M5-10 = COMPLETE / ACCEPTED / 24h
MNT-M5 = COMPLETE / ACCEPTED / 168h
```

Candidate 1 remains within the laboratory LCP target but its speed direction versus the prior hero remains inconclusive. No performance-win claim is made.

Live GitHub verification also confirmed historical M2-10 closure:

```text
PR #54 = MERGED
merge SHA = 5d2db073a4b345ae4e0067b675cab1cfb4a068ed
MNT-M2-10 = COMPLETE / ACCEPTED_WITH_V1_RESIDUAL
MNT-M2 = COMPLETE
```

M2-10 is reconciled without adding hours again.

Current aggregate:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 920
REMAINING_FORECAST_HOURS = 320
ACCEPTED_PERCENT = 74.19
```

Next gate: `MNT-M6-01 — Attribution model and identifier boundaries` / explicit authorization required.


## 17. M6-01 — Attribution model and identifier boundaries

Canonical contract:

`docs/attribution/MNT_M6_01_ATTRIBUTION_MODEL_IDENTIFIER_BOUNDARIES_V1_2026-09-22.md`

Status:

```text
MNT-M6-01 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
```

Core decisions:

```text
project attribution model = FIRST_ELIGIBLE_TOUCH + LAST_ELIGIBLE_TOUCH
project event identity = mnt_event_id
project user identity = NOT_DEFINED
cross-device identity = NOT_IMPLEMENTED
fingerprinting = FORBIDDEN
UTM class = RESERVED / exact contract deferred to M6-02
Google click IDs = gclid/wbraid/gbraid / OPAQUE / RESERVED
Meta click identifier contract = DEFERRED
CRM attribution transport = NOT_AUTHORIZED
Green l_/p_id = NOT lead/attribution IDs
enhanced conversions / hashed PII = NOT_AUTHORIZED
canonical host for M6 = www.moretegra.com.br
```

The historical M2-02 non-www canonical-host clause is point-in-time evidence and is superseded by ADR-006/current Technical Baseline for M6 work.

M6-01 performs no runtime, GTM, GA4, Google Ads, Meta, Green, DNS or budget mutation.

Program progress:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 936
REMAINING_FORECAST_HOURS = 304
ACCEPTED_PERCENT = 75.48
```

Next gate: `MNT-M6-02 — UTM/source/medium/campaign contract — 8h / AUTHORIZATION_REQUIRED`.


## 18. M6-02 — UTM / source / medium / campaign contract

Canonical authority:

- `docs/attribution/MNT_M6_02_UTM_SOURCE_MEDIUM_CAMPAIGN_CONTRACT_V1_2026-09-22.md`
- `docs/attribution/MNT_UTM_CONTRACT_V1.json`

Status:

```text
MNT-M6-02 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
```

Core decisions:

```text
minimum governed UTM tuple = utm_source + utm_medium + utm_campaign
future paid-launch tuple = utm_id + utm_source + utm_medium + utm_campaign
stable campaign key = utm_id / mnt-cmp-NNNNNN
paid source v1 = google/facebook/instagram/youtube
paid medium v1 = cpc/paid_social/paid_video
google search = google/cpc
facebook = facebook/paid_social
instagram = instagram/paid_social
youtube = youtube/paid_video
utm_content = optional controlled creative variant
utm_term = optional controlled term / never raw user query
inbound attribution allowlist = UTMs + gclid/wbraid/gbraid
direct/internal = never overwrite eligible touch
untagged referral/organic = vendor-native only in project V1
pre-consent = memory only
future persistence after grant = localStorage mnt_attribution_v1
project attribution window = fixed 30 days
internal UTM propagation = forbidden
destructive query cleanup = disabled by default
CRM attribution transport = still not authorized
active campaigns created = 0
```

No runtime, GTM, GA4, Google Ads, Meta, Green/Form46 or budget mutation occurred.

Program progress:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 944
REMAINING_FORECAST_HOURS = 296
ACCEPTED_PERCENT = 76.13
```

Next gate: `MNT-M6-03 — Google Ads conversion architecture — 16h / AUTHORIZATION_REQUIRED`.


## 19. M6-03 — Google Ads conversion architecture

Canonical authority:

- `docs/attribution/MNT_M6_03_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1_2026-09-22.md`
- `docs/attribution/MNT_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1.json`

Status:

```text
MNT-M6-03 = COMPLETE / DESIGN_CANONICALIZED / NO_EXTERNAL_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
```

Core decisions:

```text
V1 conversion source = GA4 generate_lead
project semantic = mnt_lead_success
category = Submit lead form
initial optimization = Secondary / observe only
promotion to Primary = only after M6-06 + M6-08 + explicit activation
counting = One
conversion value = none
click window = 30 days
attribution = Data-driven where available
credit channel target = Google paid channels / live-setting gate
Ads<->GA4 link = required
auto-tagging = required
gclid/wbraid/gbraid survival = required
parallel native Ads lead tag = forbidden in V1
enhanced conversions = not authorized
offline conversion import = not authorized
CRM click-ID transport = not authorized
property price as value = forbidden
```

M6-03 explicitly does not create any conversion action or external Ads mutation.

Program progress:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 960
REMAINING_FORECAST_HOURS = 280
ACCEPTED_PERCENT = 77.42
```

Next gate: `MNT-M6-04 — SEM campaign/query contract — 24h / AUTHORIZATION_REQUIRED`.


## 20. M6-04 — SEM campaign/query contract

Canonical authority:

- `docs/attribution/MNT_M6_04_SEM_CAMPAIGN_QUERY_CONTRACT_V1_2026-09-22.md`
- `docs/attribution/MNT_SEM_QUERY_CONTRACT_V1.json`

Status:

```text
MNT-M6-04 = COMPLETE / DESIGN_CANONICALIZED / INTERNAL_REGISTRY_ONLY / NO_EXTERNAL_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
```

Internal planned Search registry:

```text
mnt-cmp-000001 = Ária Higienópolis
mnt-cmp-000002 = Elo Duo
mnt-cmp-000003 = CAPIITOLO
mnt-cmp-000004 = Portfolio Tegra
external campaigns created = 0
```

Search V1:

```text
network = Search only
initial match = Exact + Phrase
Broad = not authorized initially
Broad-match campaign setting / AI Max = not authorized
competitor targeting = forbidden V1
ambiguous single-token positive keywords = blocked by default
final URL mapping = deferred to M6-05
geo targeting = deferred
```

Live Search Console read-only evidence:

```text
property = sc-domain:moretegra.com.br
window = last 90 days including today
query-page rows = 12
impressions = 29
clicks = 1
```

The sample is explicitly too small for demand/CPA/budget estimation and was used only as qualitative query evidence.

Observed project/portfolio query evidence includes:

- `aria higienopolis`;
- `caminhos da lapa elo`;
- `capítulo tegra`;
- `tegra vendas`.

Observed product queries without canonical exact-project pages remain catalog gaps and do not authorize paid campaigns.

Planned keyword seed registry = `30` records, all gated by M6-05 landing/query acceptance.

Program progress:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 984
REMAINING_FORECAST_HOURS = 256
ACCEPTED_PERCENT = 79.35
```

Next gate: `MNT-M6-05 — Landing-page/query mapping — 16h / AUTHORIZATION_REQUIRED`.


## 21. M6-05 — Landing-page/query mapping

Canonical authority:

- `docs/attribution/MNT_M6_05_LANDING_PAGE_QUERY_MAPPING_V1_2026-09-22.md`
- `docs/attribution/MNT_PAID_LANDING_QUERY_MAP_V1.json`

Status:

```text
MNT-M6-05 = COMPLETE / LANDING_QUERY_MAP_ACCEPTED / RUNTIME_REGRESSION_FIXED
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
```

Result:

```text
planned seeds = 30
READY = 29
BLOCKED_DO_NOT_TARGET = 1
HOLD = 0
blocked seed = prt-006 / tegra vendas
external keywords uploaded = 0
Ads spend = 0
```

Landing families:

- Ária Higienópolis -> exact-project page / READY
- Elo Duo -> exact-project page / READY
- CAPIITOLO -> exact-project page / READY
- Portfolio Tegra -> Home / READY

M6-05 runtime correction:

```text
PR = #231
runtime SHA = 124b620855175a583c528733462d6d0f4f44cd41
Production deployment = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
Production state = READY
```

The Home post-interest mount/gallery journey was restored without duplicating `#formulario`. Visible project cards now use natural project/location semantics and regular priced cards use `Preço a partir de`; commercial facts were not changed.

Historical progress immediately after M6-05/M6-06 closure:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS_AT_M6_CLOSURE = 1008
REMAINING_FORECAST_HOURS_AT_M6_CLOSURE = 232
ACCEPTED_PERCENT_AT_M6_CLOSURE = 81.29
```

Current progress is resolved from section 1 / `CURRENT_PROGRAM_STATE.json`. Paid-media continuation remains frozen by Product Authority.


## 22. M6-06 — Budget / spend authorization gate

Canonical policy:

`docs/attribution/MNT_M6_06_BUDGET_SPEND_AUTHORIZATION_GATE_2026-09-22.md`

Status:

```text
MNT-M6-06 = COMPLETE / BUDGET_SPEND_POLICY_AUTHORIZED / PAID_MEDIA_FROZEN
AUTHORIZED_SPEND_NOW = R$ 0
EXTERNAL_GOOGLE_ADS_MUTATIONS = 0
ACCEPTED_HOURS = 8
```

Read-only provider evidence observed during design on 2026-09-22:

- two connected Google Ads customer candidates exist, but the exact MoreNumTegra customer account is not adjudicated by M6-06;
- the current read path returned zero campaign/metric rows for both candidates;
- Keyword Planner was read for São Paulo city / Portuguese / Google Search;
- measurable canonical seeds showed average CPC values from approximately R$ 3.72 to R$ 12.25;
- the six canonical seed families with non-null average CPC had median ~= R$ 5.89 and mean ~= R$ 6.38.

Final authorized future envelope:

```text
financial ceiling = R$ 1,000
pilot = 30 days
full-stage configured average daily total = R$ 32/day
initial bidding = Maximize Clicks
max CPC bid limit = R$ 10.00
stages = Ária + Elo -> CAPIITOLO -> Portfolio
```

Product Authority then froze paid media. Campaign creation, keyword upload, conversion-action mutation and spend remain deferred; manual GA4 audience accumulation is the authorized zero-spend continuation.


M6-06 financial decision update:

```text
FINANCIAL_CEILING = R$ 1,000 / AUTHORIZED
PILOT_WINDOW = 30 days / AUTHORIZED
RECOMMENDED_CONFIGURED_DAILY_TOTAL = R$ 32/day
AUTHORIZED_SPEND_NOW = R$ 0
```


## M6 audience accumulation authorization

```text
GA4_AUDIENCE_ACCUMULATION = AUTHORIZED
REMARKETING_ACTIVATION = DEFERRED
REMARKETING_SPEND = R$ 0
CUSTOMER_MATCH = NOT_AUTHORIZED
GA4_ADMIN_WRITE_CAPABILITY_CURRENT_RUNTIME = NOT_EXPOSED
```

Canonical contract:
`docs/attribution/MNT_M6_AUDIENCE_ACCUMULATION_CONTRACT_V1_2026-09-22.md`


## M6-06 final closure / paid-media freeze

Product Authority approved the complete bounded Search policy and then froze paid media.

```text
MNT-M6-06 = COMPLETE / BUDGET_SPEND_POLICY_AUTHORIZED / PAID_MEDIA_FROZEN
accepted_hours = 8
program_progress_at_M6_06_closure = 1008 / 1240h = 81.29%
financial ceiling = R$ 1,000 / 30 days
configured average daily total = R$ 32/day
bidding = Maximize Clicks
max CPC = R$ 10
geo = São Paulo city
language = Portuguese
Search Partners = OFF initially
Display expansion = OFF
Broad = NOT_AUTHORIZED
AI Max = NOT_AUTHORIZED
current paid spend = R$ 0
external Google Ads mutations = 0
```

Future M6-07 preflight target designated by Product Authority:

```text
customer_id = 560-869-4042
display_name = SWL Consultoria de imoveis
state = USER_DESIGNATED_TARGET / NOT_YET_PREFLIGHT_VALIDATED
```

A user-provided screenshot showed overdue balance and ads not serving. Remediation is deferred while paid media is frozen.

GA4 audience accumulation remains authorized with zero spend. Because the connected GA4 integration exposes no write actions, creation is manual using:

`docs/attribution/MNT_GA4_AUDIENCE_MANUAL_RUNBOOK_V1_2026-09-22.md`

Looker Studio connection/dashboard is deferred.

Canonical closure handoff:

`handoffs/HANDOFF-2026-09-22-M6-06-COMPLETE-PAID-MEDIA-FROZEN.md`


## GA4 audience manual setup complete

Manual GA4 audience creation was completed on 2026-09-22 for property `553742649 / MoreNumTegra`.

Observed custom audiences: `11`. Existing `All Users` was retained and not duplicated.

Canonical evidence:
`docs/attribution/MNT_GA4_AUDIENCE_MANUAL_COMPLETION_2026-09-22.md`

Important GA4 semantic mapping:

```text
project source event = mnt_lead_success
GA4 destination event = generate_lead
GA4 lead-dependent audience rules = generate_lead
```

Paid media remains frozen:

```text
Search spend = R$ 0
remarketing spend = R$ 0
M6-07 = DEFERRED
Looker Studio = DEFERRED
```


## M7-01 / M7-02 QA state

M7-01 closed without an artificial Preview because no active runtime candidate exists and the effective runtime is already Production READY.

Canonical evidence:

- `docs/qa/MNT_M7_01_PREVIEW_VALIDATION_ADJUDICATION_2026-09-22.md`
- runtime SHA `124b620855175a583c528733462d6d0f4f44cd41`
- Production deployment `dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C / READY`

M7-02 technical/content QA was executed against the four canonical sitemap URLs.

Observed technical baseline:

```text
4/4 canonical URLs = HTTP 200
4/4 = self-canonical
4/4 = index,follow
4/4 = one H1
robots.txt = PASS
sitemap.xml = PASS / 4 canonical URLs
exact-project visible price vs Offer = PASS for CAPIITOLO / Elo Duo / Ária
```

Open findings:

```text
P0 = 0
P1 = 2
P2 = 2
P3 = 0
```

P1:

1. Home volatile commercial objects remain hardcoded/duplicated without current release-time revalidation and drift from newer exact-project commercial snapshots.
2. ODE Production Home runtime still exposes `De R$ 2.200.000 por R$ 2.090.000`; canonical M3-04 states the older R$ 2.200.000 comparative is not recertified and remains prohibited.

P2:

1. CAPIITOLO critical body is composed client-side from the editorial source through fetch/DOMParser/document replacement.
2. Historical M7-02 finding: Google Search favicon eligibility was unresolved for the former WebP favicon. Superseded by PR #241 on 2026-09-23.

Canonical M7-02 evidence:

`docs/qa/MNT_M7_02_TECHNICAL_CONTENT_QA_2026-09-22.md`

M7-02 remains ACTIVE at 0 accepted hours. RESF C15 P0=0/P1=0 release posture is not met. Product Authority/current commercial evidence is required before progression.


## M7-02 Product Truth re-adjudication

Product Authority explicitly recertified the current Home commercial state as interim commercial truth:

`docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md`

Re-adjudication:

`docs/qa/MNT_M7_02_PRODUCT_TRUTH_READJUDICATION_2026-09-22.md`

Result:

```text
P0 = 0
P1 = 0
P2 = 2
P3 = 0
MNT-M7-02 = COMPLETE / ACCEPTED_WITH_P2_RESIDUALS
accepted hours = 16
program progress = 1040 / 1240h = 83.87%
```

The closure is by direct Product Authority recertification, not by inference from the September Endomarket source.

The Home runtime remains unchanged.

## Commercial Data Plane v3 re-entry

Product Authority directed work on the commercial update medium while preserving the current Home exactly as-is.

Canonical architecture:

- `docs/architecture/MNT_COMMERCIAL_UPDATE_MEDIUM_REENTRY_2026-09-22.md`
- `docs/architecture/MNT_COMMERCIAL_DATA_PLANE_V3.md`
- `docs/architecture/MNT_COMMERCIAL_DATA_SCHEMA_V3.schema.json`

Candidate data artifacts:

- `docs/architecture/data/MNT_HOME_COMMERCIAL_SNAPSHOT_V3_CANDIDATE_2026-09-22.json`
- `docs/architecture/data/MNT_HOME_CARD_COMMERCIAL_BINDINGS_V1_2026-09-22.json`

Validation:

```text
projects = 21
offers = 25
Home cards = 23
runtime primary price parity = 23/23
runtime old/comparative price parity = PASS
provider = NOT_SELECTED
runtime mutation = 0
```

Live FECH.AI read-only discovery at `main@0e9573552cf96d4bad780f35d0517aefd6463d2c` found useful internal MesaCliente inventory structures but no proven public MoreNumTegra publication context. FECH.AI remains a candidate upstream only; direct browser access to internal FECH.AI tables is forbidden.


## M7-03 through M7-12 closure

Product Authority authorized continuation of the non-paid M7 sequence while M6-07/M6-08 remain frozen.

Canonical evidence:

- `docs/qa/MNT_M7_03_INDEPENDENT_MOBILE_QA_2026-09-23.md`
- `docs/qa/MNT_M7_04_TRACKING_LEAD_E2E_QA_2026-09-23.md`
- `docs/qa/MNT_M7_05_REGRESSION_SUITE_2026-09-23.md`
- `docs/qa/MNT_M7_06_P0_P1_RELEASE_ADJUDICATION_2026-09-23.md`
- `docs/qa/MNT_M7_07_VERCEL_PRODUCTION_HOMOLOGATION_2026-09-23.md`
- `docs/qa/MNT_M7_08_GREEN_PUBLICATION_READJUDICATION_2026-09-23.md`
- `docs/qa/MNT_M7_09_PRODUCTION_SMOKE_2026-09-23.md`
- `docs/observability/MNT_M7_10_POST_RELEASE_MEASUREMENT_2026-09-23.md`
- `docs/observability/MNT_M7_11_GSC_GA4_ADS_OBSERVATION_WINDOW_2026-09-23.md`
- `docs/observability/MNT_M7_12_RESULT_PROVENANCE_REGISTRY_2026-09-23.md`

Key receipts:

```text
Production runtime = 124b620855175a583c528733462d6d0f4f44cd41
Production tree = b40b9afb5b834b0fc0abdd32d3486f82198d0e9e
Production deployment = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C / READY

mobile touch QA = 27 PASS / 0 FAIL
browsers = Chromium + Firefox + WebKit
physical device = NOT_OBSERVED / explicit residual

P0 = 0
P1 = 0
P2 = 2
P3 = 0

Vercel runtime errors / last 24h = none observed
post-release Home traffic = observed after deployment READY
GSC current available window = captured
Google Ads target account last-7-day rows = 0 / paid media frozen
```

M7-08 was accepted by supersession, not by a synthetic Green web publication. ADR-006 makes Vercel Production the commercial web runtime and preserves Green/GDigital as Form46/CRM provider.

Current program progress:

```text
accepted = 1184 / 1240h
remaining = 56h
progress = 95.48%
```

Remaining forecast:

```text
M7-13 = 16h / provider evidence intake / next
M6-07 = 24h / deferred / paid media frozen
M6-08 = 16h / deferred / depends on M6-07
```

No Ads mutation, spend, synthetic paid conversion or new runtime deployment was used to obtain these closures.


## M7-13 / RESF final closure

Canonical closure:

`docs/sfjm/MNT_RESF_PROGRAM_CLOSURE_2026-09-23.md`

Provider evidence intake was merged:

```text
provider = wagnerjfjunior/Blogs-sites-portais-seo
PR = #15
consumer source = e6fc4fee3a375afc45988d456220891cbe11cb15
provider intake head = 6eb812f805bc1a6412f51dd1806b6699187b03dc
provider merge = c8cf9c8f49982c30d641b6c590ddf53018802e52
provider main after merge = c8cf9c8f49982c30d641b6c590ddf53018802e52
validate-agent-framework run = 35856574031 / success
SES Documentation Auditor = PASS_WITH_RESIDUAL_RISK
```

The provider intake remained classification-only:

```text
RESF provider lifecycle = CANDIDATE
framework lifecycle mutation = NO
framework registry mutation = NO
consumer mutation = NO
```

M7 final:

```text
MNT-M7 = COMPLETE / ACCEPTED
accepted = 192 / 192h
P0 = 0
P1 = 0
P2 = 2
P3 = 0
```

Program closure:

```text
MNT-RESF = CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
forecast = 1240h
accepted = 1200h
deferred = 40h
accepted percent = 96.77%
```

The 40h deferred scope is exactly:

- M6-07 = 24h / Google Ads external implementation / PAID_MEDIA_FROZEN;
- M6-08 = 16h / Paid conversion QA / DEPENDS_ON_M6-07.

No paid-media mutation or spend was used to close RESF.

The active priority after RESF closure is Commercial Data Plane v3 provider/publication-owner selection, outside RESF accepted-hour accounting.


## Dashboard/WBS reconciliation — 2026-09-23

Canonical reconciliation:

`docs/sfjm/MNT_DASHBOARD_WBS_STATE_RECONCILIATION_2026-09-23.md`

The stale historical planning table was removed from the active WBS current-state surface and archived at:

`docs/roadmap/archive/MNT_RESF_PLANNING_BASELINE_2026-09-10.md`

Current phase truth exposed to dashboard consumers:

```text
M0 = COMPLETE / 160h accepted
M1 = COMPLETE / ACCEPTED / 96h
M2 = COMPLETE / ACCEPTED / 144h
M3 = COMPLETE / ACCEPTED / 144h
M4 = COMPLETE / ACCEPTED / 208h
M5 = COMPLETE / ACCEPTED / 168h
M6 = 88h accepted / 40h DEFERRED / PAID_MEDIA_FROZEN
M7 = COMPLETE / ACCEPTED / 192h

TOTAL = 1200 / 1240h accepted
DEFERRED = 40h
```

The structured task graph was also reconciled: stale M1 ACTIVE and M3/M4 PLANNED states were corrected to their later accepted lifecycle.

### Frozen work must remain visible

```text
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN / NOT_ACCEPTED / 24h
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07 / NOT_ACCEPTED / 16h
```

### Post-RESF operational backlog

Current priority workstream is outside RESF accounting:

`COMMERCIAL_DATA_PLANE_REENTRY`

Published children:

```text
MNT-CDP-01 = ACTIVE / provider selection
MNT-CDP-02 = PLANNED / public-read + protected-admin-write contract
MNT-CDP-03 = PLANNED / PENDING / planilha-CSV para atualização de valores
MNT-CDP-04 = PLANNED / approval-publish-version-rollback-audit
MNT-CDP-05 = PLANNED / NOT_AUTHORIZED / runtime consumer migration
MNT-CDP-06 = PLANNED / first value-only update E2E + rollback proof
```

The spreadsheet/CSV is an operator input channel. It must be normalized/validated into a governed candidate snapshot; the browser must not consume the spreadsheet directly.

### General residual status

No current P0/P1 release blocker remains.

Still open/observable:

```text
MNT-RES-01 = OPEN / P2 / CAPIITOLO client-side editorial composition
MNT-RES-02 = SITE_SIDE_FIXED / AWAITING_GOOGLE_RECRAWL / NOT_OBSERVED
MNT-RES-03 = NOT_OBSERVED / physical-device mobile QA
MNT-RES-04 = NOT_OBSERVED / screen-reader validation
MNT-RES-05 = NOT_OBSERVED / field CWV / field INP
```

These residuals are not hidden PASS conditions and remain dashboard-visible.


## General live audit — 2026-09-23

Live Production verification:

```text
deployment = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
state = READY
runtime SHA = 124b620855175a583c528733462d6d0f4f44cd41
runtime errors / last 24h = NONE OBSERVED

Home = HTTP 200
CAPIITOLO = HTTP 200
Elo Duo = HTTP 200
Ária = HTTP 200
```

Not all residuals are eliminated:

```text
/favicon.ico = HISTORICAL_HTTP_404 / SUPERSEDED_BY_PR_241
CAPIITOLO client-side editorial composition = P2 / still open
physical-device QA = NOT_OBSERVED
screen-reader validation = NOT_OBSERVED
field CWV / field INP = NOT_OBSERVED
```

Therefore:

```text
P0 = 0
P1 = 0
P2 = 2
critical release blockers = NONE
all known problems eliminated = NO
```

The remaining items are explicitly visible in the dashboard/read-model backlog and do not invalidate the completed M7/RESF release gate.


## Public surface remediation — PR #241

Production:

```text
main = 1543bb2a16d2ecace4d697fa6f381f9353df7582
deployment = dpl_GAKSbqFmB3xExV2wYhPMN1iErJfp
state = READY
runtime errors / post-deploy = NONE OBSERVED
```

Validated live:

```text
/favicon.ico = HTTP 200 / image/vnd.microsoft.icon
Home = 200 / favicon=/favicon.ico / social image 1280x720
CAPIITOLO = 200 / favicon=/favicon.ico / Capitolo variant metadata live
Elo Duo = 200 / social metadata live
Ária = 200 / social metadata live
```

CAPIITOLO search handling keeps one canonical page and supports `Capitolo Tegra` through visible clarification, FAQ, schema alternateName and redirect aliases.

Current residual disposition:

```text
CAPIITOLO client-side editorial composition = OPEN / P2
Search favicon site-side defect = CLOSED
Google SERP favicon refresh = AWAITING_EXTERNAL_RECRAWL / NOT_OBSERVED
physical-device QA = NOT_OBSERVED
screen-reader validation = NOT_OBSERVED
field CWV / field INP = NOT_OBSERVED
```


## Final Tegra T favicon package — 2026-09-23

```text
PR = #244
runtime = 847a2f4460894e1f0fdcc30501f6b6396ec67b75
deployment = dpl_AeLHW8cj3w7kDgUdueLL56ezCeS7 / READY
source = Product Authority transparent PNG 500x500
/favicon.ico = HTTP 200 / image/x-icon
ICO frames = 48x48 / 96x96 / 192x192
apple-touch-icon = 180x180
cache = must-revalidate
```

The previous wordmark/blank-square favicon packages are superseded.

Site-side favicon state is complete. Google Search visual refresh remains external and must not be claimed until observed.


## Browser-tab favicon remediation — PR #246

Production feedback showed that the Search-oriented favicon package did not reliably appear in the browser tab.

Final site-side remediation:

```text
runtime = c80a8e1d773d85af563d9630f6e460e7ad85ea02
deployment = dpl_4F8SF29FyNj7EcpyqM9zT57oYAoi / READY
/favicon-16x16.png = HTTP 200
/favicon-32x32.png = HTTP 200
/favicon-48x48.png = HTTP 200
/favicon.ico = HTTP 200

HTML rel=icon = 48x48 PNG + 32x32 PNG + 16x16 PNG
ICO fallback frames = 16 / 32 / 48 / 96 / 192
apple-touch-icon = 180x180
cache-control = public, max-age=0, must-revalidate
workflow gates = 11 / 11 SUCCESS
```

The site-side browser-tab gap is remediated. A fresh browser/tab confirmation remains user-observed evidence; Google SERP refresh remains external.


## MNT-PERF-01 — Favicon load / LCP regression validation

Product Authority confirmed the current browser favicon is visually working and reported that it appears to take time to load.

Classification:

```text
favicon visual = WORKING / USER_CONFIRMED
perceived favicon delay = USER_REPORTED
LCP impact = NOT_MEASURED / NOT_PROVEN
task = AUTHORIZED / MEASUREMENT_ONLY
counted in RESF hours = NO
```

Current effective Production:

```text
runtime = c80a8e1d773d85af563d9630f6e460e7ad85ea02
deployment = dpl_4F8SF29FyNj7EcpyqM9zT57oYAoi
state = READY
```

Current deterministic favicon payload:

```text
favicon.ico = 5,428 B
favicon-16x16.png = 408 B
favicon-32x32.png = 587 B
favicon-48x48.png = 696 B
```

The payload sizes do not establish whether the favicon affected LCP.

MNT-PERF-01 must run a fresh production performance battery before any new favicon/cache/hero/GTM remediation.

Detailed session handoff:

`handoffs/HANDOFF-2026-09-23-FAVICON-LCP-RECHECK-NEXT.md`

After adjudication, resume `MNT-CDP-01`.


## Current-state reconciliation — 2026-09-25

Canonical audit:

`docs/governance/MNT_TRACEABILITY_AUDIT_2026-09-25.md`

Mandatory traceability standard:

`docs/governance/MNT_CHANGE_TRACEABILITY_STANDARD_V1.md`

Live state:

```text
main = 95567db0d16e15d2c6971d8047ab7327d3171578
Production deployment = dpl_4r1JK6YPLsQC99dPumd8i7SCuwJW
Production state = READY
runtime errors last 24h = NONE OBSERVED

Home = HTTP 200
DSG Itaim = HTTP 200
CAPIITOLO = HTTP 200
Elo Duo = HTTP 200
Ária Higienópolis = HTTP 200
favicon.ico = HTTP 200
```

Recent integrated runtime chain:

```text
#249-#253 = brand/performance/cache remediation
#254-#260 = DSG Itaim publication and iterative correction
#250 = CLOSED_UNMERGED / SUPERSEDED_BY_249
```

Four direct-to-main Sep-24 source-data commits are recorded as process exceptions in the traceability audit.

### Performance follow-up

Old current-state pointer:

`MNT-PERF-01 = ACTIVE / MEASUREMENT_ONLY`

is stale.

Current truthful disposition:

```text
MNT-PERF-01 = EXECUTED / REMEDIATION_CHAIN_MERGED
FINAL_POST_REMEDIATION_CURRENT_RUNTIME_MEASUREMENT_PACKET = NOT_CANONICALIZED
MNT-PERF-02 = NEXT / MEASUREMENT_ONLY
```

No final current-runtime LCP number is inferred.

### DSG current integrated state

Published route:

`https://www.moretegra.com.br/empreendimentos/dsg-itaim/`

Integrated through PR #260 with:

- CAPIITOLO-derived composition baseline;
- JSON-LD/canonical preservation;
- Home link + structured discovery integration;
- RealEstateAgent image/geo;
- gallery/typology visual corrections.

### Remaining backlog

```text
MNT-PERF-02 = NEXT
MNT-CDP-01 = PENDING
MNT-CDP-03 = PENDING / spreadsheet-CSV value update path
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07
field CWV / INP = NOT_PROVEN
Google SERP favicon visual refresh = NOT_OBSERVED / external
```

Earlier sections in this file remain historical execution evidence. When they conflict with this reconciliation, this section plus live provider resolution governs current state.


## GA4 Audience Readiness — 2026-09-25

Product Authority authorized a bounded audience-readiness correction after RESF provider/consumer reconciliation.

Observed live GA4 state:

```text
MNT | All project visitors | 180d = CREATED / SCREENSHOT_OBSERVED
MNT | All project visitors | 540d = CREATED / SCREENSHOT_OBSERVED
initial predicate = page_view AND page_location contains /empreendimentos/
```

Exact-head review reopened semantic validation because `page_location` is the complete URL and a query string can contain `/empreendimentos/` on a non-project page.

Therefore:

```text
2C 180d creation = COMPLETE
2C-540 540d creation = COMPLETE
2D classifier semantic validation = COMPLETE_FOR_PATH_SAFE_RULE
path-safe 180d = CREATED / SCREENSHOT_OBSERVED
path-safe 540d = CREATED / SCREENSHOT_OBSERVED
builder estimate for path-safe rule = 128 users / 64.6% (NOT membership proof)
accumulation proof = PENDING
legacy dependency/export check = PENDING
canonical window policy = PENDING
legacy / unsafe-candidate archival = NOT_AUTHORIZED
paid media = FROZEN
```

Validated path-safe live-builder rule: `Page path and screen class begins with /empreendimentos/`. Both 180d and 540d path-safe variants were created and observed in the GA4 audience table.


## MNT-PERF-02 current-runtime verification — CLOSED 2026-09-25

Canonical evidence:

`docs/performance/MNT_PERF_02_CURRENT_RUNTIME_VERIFICATION_2026-09-25.md`

```text
MNT-PERF-02 = COMPLETE / EVIDENCE_CANONICALIZED / NO_RUNTIME_MUTATION
Home LCP median = 10.4 s / FAIL
DSG Itaim LCP median = 5.1 s / FAIL
CAPIITOLO LCP median = 5.1 s / FAIL
Elo Duo LCP median = 5.1 s / FAIL
Ária Higienópolis LCP median = 2.0 s / PASS
all route CLS medians <= 0.1 = PASS
field CWV / field INP = NOT_PROVEN
```

Deterministic findings:
- Home has repeated high-LCP runs with material YouTube third-party payload/CPU contribution.
- DSG/CAPIITOLO retain Azure media-delivery opportunities.
- Elo Duo has small payload but render-delay/runtime variance; another media rewrite is not justified without isolation.
- Ária median LCP passes, but full-size Azure gallery images create ~6.4 MiB total transfer and multi-MiB thumbnail waste.

Remediation backlog: GitHub issue #266.

Issue #266 is planning/backlog evidence only. Runtime remediation still requires a separately authorized bounded slice.


## MNT-PERF-03A — Home YouTube intent-load remediation — PRODUCTION 2026-09-25

Evidence:
`docs/performance/MNT_PERF_03A_HOME_YOUTUBE_INTENT_LOAD_2026-09-25.md`

```text
authorization = BOUNDED HOME SLICE / PRODUCT AUTHORITY
PR = #268
initial failed head = 896d13710134e40a42f0b54f7d428bba3bf62d11
final validated head = 22fc140823870f557bcbc8edcb779a916a8cca89
merge/runtime SHA = 02feb3804a4a87c6d07bc12a5b9c7b983816b6ed
Production deployment = dpl_3HqSohk1Sq32vWm8cUMFpgqY8GfW / READY
production Home = HTTP 200
runtime behavior = YouTube player loads only after explicit user intent
post-change Lighthouse 5-run median = PENDING
```

All final-head workflows passed and both review findings were resolved before merge. No GTM/GA4, Form46, commercial-data, project-page or paid-media mutation occurred.

Do not claim Home LCP improvement until the post-change five-run Mobile battery is complete.


## MNT-PERF-03A post-change measurement — COMPLETE 2026-09-25

```text
Home baseline LCP median = 10.4 s
Home post-change LCP median = 4.2 s
LCP reduction = 6.2 s / 59.6%
FCP median = 1.0 s
TBT median = 110 ms
CLS median = 0
Performance median = 84
target LCP <= 2.5 s = NOT MET
retain runtime = YES
```

Canonical evidence:
`docs/performance/MNT_PERF_03A_POST_CHANGE_VALIDATION_2026-09-25.md`.

Residual recurring PageSpeed signals include ~131–133 KiB unused JavaScript and ~370–500 ms render-blocking opportunity. Read-only source inspection identified the accepted Elo late-GTM bootstrap pattern as the next bounded Home candidate.
