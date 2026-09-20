# MNT-M5-06 — CTA/Form Journey Optimization Closure

Status: `COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED`

Date: `2026-09-20`

## 1. Authority

Product Authority granted continuing authorization on 2026-09-20 to proceed through planned MoreNumTegra tasks, Ready/merge lifecycle and post-merge validation, stopping only at a material decision.

M5-06 reached a material decision gate and Product Authority explicitly selected the context-preserving path:

```text
OPTION_B = APPROVED
CTA_CONTEXT -> PRESELECT_FORM46_INTENT
HOME_NEGOTIATE = "Negociar meu cenário"
CAPIITOLO_HERO = "Receber condições"
CAPIITOLO_VISIT = separate "Agendar visita"
```

Product Authority also required preservation of organic relevance for the natural search spelling `Capitolo` while keeping official branding `CAPIITOLO`.

## 2. Runtime identity

```text
RUNTIME_PR = #189
RUNTIME_CANDIDATE_HEAD = 77d6e5a3f1c370de6bc88edba600a1c37a4c8613
MERGED_MAIN_RUNTIME = be7f229ea04cf4050c40c471e21f262f4cfc845d
PRODUCTION_DEPLOYMENT = dpl_CZEKd9SmbVTx6T2L7y4rFkTRdQhP
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

## 3. Implemented journey contract

The shared Vercel Form 46 client now uses an allowlisted `data-form-intent` enum.

Canonical mappings:

```text
conditions
  -> Condições e disponibilidade

schedule_visit
  -> Agendar visita

payment_simulation
  -> Simular forma de pagamento

specialist
  -> Falar com especialista

negotiate_scenario
  -> Negociar meu cenário
```

Fail-closed behavior:

- invalid/unknown intent key -> ignored;
- missing select -> ignored;
- mapped value not present in select -> ignored;
- arbitrary CTA visible text is never copied into the form;
- no Form 46 provider/endpoint change;
- no new backend;
- no automatic form submission.

## 4. User journey effect

The user no longer needs to repeat a choice already expressed through the CTA.

Validated examples:

```text
Home "Quero negociar meu cenário"
  -> Negociar meu cenário

Ária "Agendar uma visita"
  -> Agendar visita

Ária "Simular possibilidades de pagamento"
  -> Simular forma de pagamento

Elo Duo "Negociar condições"
  -> Condições e disponibilidade

CAPIITOLO "Receber condições"
  -> Condições e disponibilidade

CAPIITOLO "Agendar visita"
  -> Agendar visita
```

Home project cards and governed floating conditions CTAs map to `Condições e disponibilidade`.

## 5. CAPIITOLO / Capitolo Search constraint

Official identity remains:

```text
BRAND = CAPIITOLO by Piero Lissoni
TITLE = CAPIITOLO Tegra Chácara Klabin | Piero Lissoni
H1 = CAPIITOLO Tegra Chácara Klabin
CANONICAL = https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/
```

The same canonical exact-project page now contains natural visible copy covering:

```text
Capitolo Tegra
Capitolo by Piero Lissoni
```

No alias route was created.

The official brand was not replaced.

External Search evidence observed on 2026-09-20 supports this split:

- current Tegra commercial surface uses `CAPIITOLO`;
- Tegra's 2024 integrated report contains `Capitolo by Piero Lissoni`;
- current real-estate portals also expose `Capitolo by Piero Lissoni`.

Therefore `Capitolo` is treated as a legitimate search spelling/variant that belongs to the same exact-project page, not as a second entity or route.

## 6. Exact-head candidate validation

PR #189 exact candidate:

`77d6e5a3f1c370de6bc88edba600a1c37a4c8613`

GitHub Actions:

```text
M5-06 CTA/Form journey = SUCCESS / run 35543109536
M4-05R metadata validation = SUCCESS / run 35543109510
Favicon standard validation = SUCCESS / run 35543109548
Commercial page standard validation = SUCCESS / run 35543109566
```

The M5-06 workflow ran:

- static allowlist/contract validation;
- Chromium mobile touch smoke;
- Firefox mobile touch smoke;
- WebKit mobile touch smoke;
- CAPIITOLO official title/H1/canonical guard;
- Capitolo same-page variant guard.

## 7. Production validation

Temporary diagnostic PR:

`#190 — diagnostic-only / never merge`

Production run:

```text
RUN = 35543247914
RUNTIME_SHA = be7f229ea04cf4050c40c471e21f262f4cfc845d
DEPLOYMENT = dpl_CZEKd9SmbVTx6T2L7y4rFkTRdQhP
PASS = 24
FAIL = 0
TOTAL = 24
ARTIFACT = 10615004501
ARTIFACT_SHA256 = 598ce8347e9e0ba884cdae6e35353f88ce700c81f8189a6b8125ff6733ebc331
```

No lead was submitted during this Production diagnostic.

Test matrix per browser:

- 7 CTA -> Form 46 selected-intent journeys;
- 1 CAPIITOLO/Capitolo Search-brand invariant;
- Chromium + Firefox + WebKit.

## 8. Explicitly unchanged

M5-06 did not change:

- Form 46 endpoint/provider;
- name/e-mail/telephone requirements;
- lead-success validity;
- `/obrigado/` conversion gate;
- GTM/GA4/Consent;
- DNS/routing/canonical;
- project-page Measurement `mnt_intent` remapping;
- backend architecture;
- M5-10 performance remediation.

Project-page Measurement semantic alignment is intentionally deferred to M5-07.

## 9. Completion

```text
MNT-M5-06 = COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED
OPEN_M5_06_FINDINGS = 0
```

## 10. Program consequence

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 848
REMAINING_FORECAST_HOURS = 392
ACCEPTED_PERCENT = 68.39
MNT-M5 = ACTIVE
MNT-M5-07 = AUTHORIZED / READY_TO_START
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```
