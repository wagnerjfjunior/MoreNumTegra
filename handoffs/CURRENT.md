# Handoff Atual — MoreNumTegra

> Handoff SFJM de continuidade cognitiva. `main` continua canônico até merge da PR #50.

## Estado live resolvido em 2026-09-12

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Working PR: `#50 — feat: start MNT-M2-09 tracking implementation`
- Working branch: `feat/mnt-m2-09-tracking-implementation`
- Exact head antes desta atualização: `89d8d5a13a33e4cd9d948c60b73615d727c1faed`
- Base main observada: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- PR: `OPEN / DRAFT / MERGEABLE / NOT_MERGED`
- Product Authority autorizou explicitamente o merge nesta conversa.

## MNT-M2-09 — estado do incremento

GA4 / GTM observados:

```text
GA4 property = MoreNumTegra
property_id = 553742649
stream_id = 15759638334
measurement_id = G-57M2XR0CY2
GTM = GTM-PGCR4R47
published GTM version = 6
```

Green:

```text
page 292 = https://moretegra.com.br/
page 294 = https://moretegra.com.br/obrigado
Form 46 success destination = page 294
page 294 visual/JS + Pixel MORETEGRA = published by Product Authority
```

A Green oferece um único campo de JavaScript customizado por página. O contrato de release é:

```text
page 292 -> src-greenn/moretegra.js
page 294 -> src-greenn/thank-you/obrigado.js
```

Os módulos em `src-greenn/modules/` são somente fontes de desenvolvimento. Nunca devem ser colados separadamente na Green.

## Artefato consolidado da página 292

`src-greenn/moretegra.js` foi regenerado deterministicamente e validado com sucesso em GitHub Actions antes deste handoff.

O arquivo consolidado contém, nesta ordem:

```text
UI/runtime aceito
+ measurement instrumentation v5
+ Form 46 lead guard v3
```

O measurement v5 inclui:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
mnt_form_start
mnt_form_submit_attempt
```

O lead guard v3:

- observa apenas o botão real `button.g-recaptcha.button_hover[data-action="submit"]` dentro de `form#form.form-content`;
- exige os campos `nome`, `email`, `telefone` e `form.checkValidity()`;
- não intercepta nem substitui o submit nativo da Green;
- grava somente `sessionStorage["mnt.lead.pending.v1"] = Date.now()`;
- não lê nem persiste PII.

A página `/obrigado` emite `mnt_lead_success` somente se existir pending timestamp fresco (<=10 minutos), consumindo-o antes da emissão. Acesso direto, refresh/back sem nova submissão e pending stale não fabricam lead.

## Próximo passo após merge

1. usar o `src-greenn/moretegra.js` de `main` como o único JavaScript da página 292;
2. publicar a página 292 na Green;
3. executar um único lead real e provar `mnt_form_start -> mnt_form_submit_attempt -> /obrigado -> mnt_lead_success`;
4. configurar no GTM `mnt_lead_success -> GA4 generate_lead`;
5. validar um único `generate_lead` em `G-57M2XR0CY2`;
6. Vercel permanece manual via terminal; não promover automaticamente.

## Guardrails preservados

- sem webhook/backend/Stape/n8n/Make nesta V1;
- sem PII em Measurement;
- sem `gtag()`/`fbq()` direto;
- Form 46 nativo continua autoritativo;
- Green main recebe apenas o artefato consolidado;
- Vercel manual gate-driven.
