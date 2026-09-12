# Handoff Atual — MoreNumTegra

> Handoff SFJM de continuidade cognitiva. `main` é a fonte canônica; sempre resolver o SHA live antes de agir.

## Estado live resolvido em 2026-09-12

- Repositório: `wagnerjfjunior/MoreNumTegra`
- PR #50: `MERGED` em `6eaacaca9af2c22243d45f20a24e04577ac58ce2`
- PR #52: `MERGED` em `70f2b77e93225b65a1972c12875c58bd7198be1d`
- MNT-M2-09: `COMPLETE / ACCEPTED`
- Próxima task: `MNT-M2-10 — Execute end-to-end Measurement QA`
- MNT-M2-10: `PLANNED / NOT_YET_AUTHORIZED`

## Measurement aceito

```text
GA4 property = MoreNumTegra
property_id = 553742649
stream_id = 15759638334
measurement_id = G-57M2XR0CY2
GTM = GTM-PGCR4R47
published GTM version = 7
```

GTM Version 7:

`MNT M2-09 - Form Funnel + generate_lead - 2026-09-12`

Foi publicada em 2026-09-12 e validada em Tag Assistant + GA4 DebugView.

## Green / Form 46

```text
page 292 = https://moretegra.com.br/
page 294 = https://moretegra.com.br/obrigado
Form 46 = tenant 313 / form_id 46 / title MoreEmUmTegra
```

Contrato de release Green:

```text
page 292 -> src-greenn/moretegra.js
page 294 -> src-greenn/thank-you/obrigado.js
```

A Green possui um único campo de JavaScript customizado por página. Os módulos em `src-greenn/modules/` são apenas fontes de desenvolvimento e nunca devem ser colados individualmente na Green.

O artefato consolidado da página 292 contém UI/runtime + Measurement v6 + Form 46 lead guard v4.

## Funil validado

O fluxo real aceito em produção foi:

```text
mnt_form_start
-> mnt_form_submit_attempt
-> Green native Form 46 success
-> /obrigado
-> mnt_lead_success
-> GTM
-> GA4 generate_lead
```

No teste aceito:

```text
mnt_form_start = 1
mnt_form_submit_attempt = 1
mnt_lead_success = 1
generate_lead = 1
```

`generate_lead` está configurado no GA4 como `Evento principal` / Key event.

`mnt_form_start` e `mnt_form_submit_attempt` permanecem não-conversões.

Green `gtm.formSubmit` continua sendo telemetria de plataforma e não é encaminhado como evento de negócio MoreNumTegra.

## Privacy / consent

- nenhum visitor name/email/phone é copiado para payload MNT/GA4;
- raw free-form catalogue search text permanece excluído;
- sem `gtag()`/`fbq()` direto no código do projeto;
- Consent Mode permanece default-denied com update conforme decisão do usuário;
- teste aceito mostrou consentimento granted e `wasSetLate=false` após aceite.

## Evidência canônica

`docs/measurement/MNT_M2_09_TRACKING_IMPLEMENTATION_EVIDENCE_2026-09-12.md`

Ela registra PRs, assets GA4/GTM, Version 7, runtime proof, DebugView, Key event e boundaries.

## Próxima ação segura

Não iniciar MNT-M2-10 por sequência automática. A próxima ação é decisão explícita da Product Authority sobre autorizar `MNT-M2-10 — Execute end-to-end Measurement QA`.

MNT-M2-10 deve validar o contrato completo de QA, incluindo canonical host, unicidade de eventos, ausência de caminhos duplicados, consent states, privacy e residuals.

## Residuals preservados

- Meta Pixel/Dataset/CAPI: não implementado por MNT-M2-09; gate separado;
- Google Ads linking/conversions: não autorizado;
- Vercel Production: update manual via terminal permanece pendente e separado;
- FECH.AI/n8n/Make/webhook/backend: fora do escopo V1 atual;
- www HTTP 301/308: ainda não provado;
- sitemap/canonical Search residuals permanecem separados.
