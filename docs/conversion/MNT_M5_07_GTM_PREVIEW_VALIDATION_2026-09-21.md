# MNT-M5-07 — Production Semantics + GTM Preview Validation

Date: `2026-09-21`

Status: `ACTIVE / SOURCE_PRODUCTION_PASS / GTM_PREVIEW_PASS / GTM_PUBLISH_REQUIRED`

## Runtime
- main/runtime: `6dc362a63de8b797082fb1c7b4ac70a8a5aa2ae8`
- Production deployment: `dpl_AWHaTzE4UrJQaZ3LnKqhEMd8wsBs`
- Vercel state: `READY`
- runtime PR: `#194`

## Candidate validation
- exact-head M5-07 workflow: SUCCESS
- candidate semantic/lead-context smoke: `36 PASS / 0 FAIL`
- privacy assertions: no visitor name/e-mail/telephone/raw texto-livre in `mnt_lead_success`
- v1 marker rollout compatibility preserved
- refresh dedup guard preserved

## Production semantic validation
- diagnostic run: `35596887663`
- result: `SUCCESS`
- artifact: `10637092633`
- artifact digest: `sha256:13bfbe8de7acdcf35c43d2255270eba8b75e2f110d299859895c99deba9410a3`
- scope: read-only CTA/WhatsApp semantic regression against `www.moretegra.com.br`
- no real Form 46 lead submitted by this diagnostic

## GTM Preview evidence supplied by Product Authority
Container:
- `GTM-PGCR4R47`
- container canonical id: `263769019`
- preview state: `QUICK_PREVIEW`
- GA4 destination: `G-57M2XR0CY2`

Observed `mnt_lead_success`:
```text
event = mnt_lead_success
page_identity = moretegra_thank_you
product_identity = moretegra_portfolio
route = /obrigado
funnel_stage = lead
form_provider = green
form_id = 46
form_name = MoreEmUmTegra
lead_method = green_form_46
placement = form_46
project_name = Mozae Higienópolis
offer_name = Mozae Higienópolis
```

Observed GTM tag:
- `GA4 - Event - generate_lead - mnt_lead_success`
- execution: `execute_succeeded`
- event name: `generate_lead`
- mapping includes:
  - `project_name -> {{DLV - project_name}}`
  - `offer_name -> {{DLV - offer_name}}`

Observed GA4 outbound event parameters:
- `ep.project_name = Mozae Higienópolis`
- `ep.offer_name = Mozae Higienópolis`
- destination = `G-57M2XR0CY2`

This proves the approved M5-07 destination mapping works in GTM Preview.

## Remaining gate
The uploaded Tag Assistant export identifies the container as `QUICK_PREVIEW`; therefore this is not proof that the changed GTM workspace version is published.

Required before M5-07 acceptance:
1. publish the tested GTM workspace/container version;
2. record the published version identifier/name;
3. perform one production verification outside Preview that confirms `generate_lead` still carries `project_name` and `offer_name`;
4. only then close M5-07 and release M5-08.

## Boundaries preserved
- `mnt_lead_success` remains the sole PRIMARY conversion.
- WhatsApp and intent events remain SECONDARY.
- no PII/raw texto-livre enters Measurement.
- no conversion `value`/`currency` invented.
- no M5-10 performance remediation authorized.
