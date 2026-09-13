# Handoff Atual — MoreNumTegra

> Handoff SFJM de continuidade cognitiva. `main` é a fonte canônica; sempre resolver o SHA live antes de agir.

## Estado live resolvido em 2026-09-13

- Repositório: `wagnerjfjunior/MoreNumTegra`
- PR #54: `MERGED` por squash
- Merge SHA: `5d2db073a4b345ae4e0067b675cab1cfb4a068ed`
- MNT-M2-10: `COMPLETE / ACCEPTED_WITH_V1_RESIDUAL`
- MNT-M2: `COMPLETE`
- Próxima fase planejada: `MNT-M3 — Intelligence, Product Truth & Search Contract`
- Próxima task: `MNT-M3-01 — Market and Search demand research`
- MNT-M3-01: `PLANNED / NOT_YET_AUTHORIZED`

## Measurement aceito

```text
GA4 property = MoreNumTegra
property_id = 553742649
stream_id = 15759638334
measurement_id = G-57M2XR0CY2
GTM = GTM-PGCR4R47
published GTM version = 7
```

GTM Version 7 permanece aceita; nenhuma nova mutação GTM/GA4 foi necessária para fechar MNT-M2-10.

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

A Green possui um único campo de JavaScript customizado por página. Os módulos em `src-greenn/modules/` são fontes de desenvolvimento e não devem ser colados individualmente na Green.

## Funil validado

Fluxo aceito:

```text
mnt_form_start
-> mnt_form_submit_attempt
-> Green native Form 46 success
-> /obrigado?l_=<positive integer>&p_id=292
-> mnt_lead_success
-> GTM
-> GA4 generate_lead
```

QA live de MNT-M2-10 confirmou:

- `www` -> canonical sem Measurement project-owned no alias;
- um `page_view` project-owned por document load;
- reload gera novo event ID sem duplicação por load;
- busca de catálogo debounced sem raw free-form query no payload;
- `/obrigado` simples não fabrica lead;
- lead Green real gera exatamente um `mnt_lead_success` e um `generate_lead`;
- refresh/back não duplica lead;
- denied consent + persistência após reload;
- QA-01..QA-25 adjudicados.

## Residual V1 aceito

A página 294 usa um gate client-side. Um `pending` recente + entrada manual da forma completa aceita da URL pode satisfazer o gate. Isso é um `KNOWN / ACCEPTED V1 RESIDUAL` e **não** deve ser descrito como autenticação de sucesso pelo servidor/provider Green.

Esse residual é não-bloqueante para o fechamento de MNT-M2.

## Privacy / consent

- nenhum visitor name/email/phone é copiado para payload MNT/GA4;
- raw free-form catalogue search text permanece excluído;
- sem `gtag()`/`fbq()` direto no código do projeto;
- Consent Mode permanece default-denied com update conforme decisão do usuário;
- granted e denied persistence têm evidência aceita no escopo M2.

## Evidência canônica

- `docs/measurement/MNT_M2_09_TRACKING_IMPLEMENTATION_EVIDENCE_2026-09-12.md`
- `docs/measurement/MNT_M2_10_LIVE_QA_UPDATE_2026-09-13.md`
- `docs/measurement/MNT_M2_10_POST_MERGE_RECONCILIATION_2026-09-13.md`

## Progresso

```text
forecast total = 1240h
accepted scope-equivalent = 400h
remaining forecast = 840h
program progress = 32.26%
MNT-M2 accepted = 144h / 144h
```

## Próxima ação segura

Não iniciar MNT-M3-01 por sequência automática. A próxima ação é decisão explícita da Product Authority sobre autorizar:

`MNT-M3-01 — Market and Search demand research`.

Quando autorizada, a task deve permanecer research/evidence-first e não autoriza implicitamente Search Console, Ads, GTM/GA4, Green, DNS ou Vercel mutations.

## Residuals preservados

- Meta Pixel/Dataset/CAPI: não implementado; gate separado;
- Google Ads linking/conversions: não autorizado;
- Vercel Production: update manual via terminal permanece separado;
- FECH.AI/n8n/Make/webhook/backend: fora do escopo V1 atual;
- www HTTP 301/308: ainda não provado;
- sitemap/canonical Search residuals permanecem separados;
- lead-validity client-side residual aceito em MNT-M2-10 permanece registrado.
