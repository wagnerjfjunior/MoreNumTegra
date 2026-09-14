# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-09-14`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_3.md`
- Production decision: `docs/adr/ADR-006-VERCEL-COMMERCIAL-PRODUCTION-WWW-CANONICAL.md`
- Regra: ausência nesta lista não constitui autorização.

## 1. Estado de produção aceito

```text
WEB PRODUCTION = Vercel
CANONICAL HOST = https://www.moretegra.com.br/
APEX moretegra.com.br = 308 -> www
DNS AUTHORITY = Cloudflare / DNS only
CLOUDFLARE HTTP PROXY = OFF
GREEN/GDIGITAL = Form 46 provider + CRM
LP host = Green fallback / non-canonical
VERCEL DEPLOYMENT = GIT_DRIVEN_FILTERED_AUTOMATIC
```

## 2. Bloqueios ativos — código / runtime / deploy

- alterar produção fora de branch/PR sem necessidade emergencial comprovada;
- promover estado Vercel diferente de `main` aprovado;
- desabilitar deploy Git-driven automático sem nova decisão;
- remover filtro docs-only sem necessidade comprovada;
- tratar Deploy Hook manual como caminho normal;
- adicionar framework/bundler/backend complexo sem requisito comprovado;
- expor segredo/token no HTML/JS.

## 3. DNS / domínio / hosting

Permanece bloqueado sem gate próprio:
- novas mudanças DNS/domínio;
- Cloudflare orange-cloud/proxy;
- nova troca de canonical host;
- remoção do `lp` fallback;
- qualquer alteração de MX/SPF/DKIM/DMARC motivada pelo web cutover.

## 4. Form 46 / lead / CRM

Contrato vigente:

```text
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
```

Permanece bloqueado:
- substituir Green/GDigital como provider sem nova arquitetura;
- adicionar backend intermediário sem necessidade comprovada;
- usar seletor global `form` para interceptação;
- remover validação/E.164/double-submit prevention;
- emitir lead success por CTA, foco ou submit attempt;
- considerar `/obrigado` sozinho como prova de conversão.

## 5. Measurement / GA4 / consent

```text
GTM = GTM-PGCR4R47
GA4 property = 553742649
GA4 stream = 15759638334
GA4 measurement_id = G-57M2XR0CY2
primary source = mnt_lead_success
primary GA4 mapping = generate_lead
business host = www.moretegra.com.br
```

Permanece bloqueado:
- segundo GTM container para a mesma superfície;
- `gtag()` project-owned direto fora do GTM;
- property/stream GA4 duplicados;
- inventar IDs ou versão GTM não observada;
- converter `mnt_form_start` ou `mnt_form_submit_attempt` em conversão primária;
- enviar nome/e-mail/telefone/texto livre para Measurement;
- enhanced conversions/user-provided data/advanced matching sem gate específico;
- usar preço do imóvel como conversion value do lead.

Consent Mode vigente: default denied; aceite -> quatro sinais granted; recusa -> quatro sinais denied.

## 6. Search / SEO / conteúdo

Permanece bloqueado:
- publicar rota apenas porque está reservada na IA;
- inserir URL 404/não publicada/não indexável no sitemap;
- criar doorway por preço/metragem/planta/endereço/modificador;
- criar localização sem conjunto verificado de projetos;
- usar stage membership como prova de disponibilidade comercial;
- indexar `/obrigado/` ou `*.vercel.app` previews;
- alterar canonical/redirect sem gate Search + infra;
- inventar preço, metragem, endereço, disponibilidade, estágio ou claim;
- keyword stuffing;
- schema sem conteúdo visível/factual correspondente;
- considerar sitemap deployment igual a sitemap processado pelo GSC.

Namespace governado:

```text
/
/caminhos-da-lapa/
/empreendimentos/<project-slug>/
/estagios/<stage>/
/regioes/<verified-location>/
```

Future `/blog/...` requires its own content/ownership gate.

## 7. M5 — UX, Performance, Conversion, Lead & CRM

M5 está ACTIVE e M5-01 está `IN_PROGRESS / AUTHORIZED`.

A autorização atual cobre **auditoria mobile UX e acessibilidade** e registro de findings/evidências. Não autoriza automaticamente:
- remediation material de runtime;
- M5-02 ou tarefa posterior;
- mudanças GTM/GA4/Form 46/DNS/Search por consequência de um finding;
- publicação de produção fora do lifecycle governado.

Cada finding deve separar `OBSERVED`, `INFERRED` e `PROPOSED_REMEDIATION`.

## 8. Meta / Ads / automação

Permanece bloqueado sem gate específico:
- Meta Dataset/Pixel/CAPI/Partner Gateway;
- `fbq()` project-owned direto;
- Google Ads conversion tags/linkagem;
- campaign/spend;
- FECH.AI/n8n/Make.

## 9. Residuals atuais

- `/favicon.ico` retornou 404 no HAR Pingdom pós-cutover;
- número exato da versão GTM publicada para o delta `www` não foi registrado;
- status de submissão/processamento do sitemap no GSC deve ser evidenciado separadamente;
- Rich Results/JSON-LD permanece trilha separada.

Mozae metragem não é mais residual bloqueante: M4-09/PR #82 reconciliou áreas exatas observadas 44.85–73.40 m², tipologias comerciais atuais 46 m² e 73 m² e o uso permitido da faixa arredondada 45–73 m² quando descrita como range.

## 10. Regras de interpretação

```text
MAIN_MERGED != SMOKE_TESTED
DEPLOYMENT_SUCCESS != BUSINESS_FLOW_VALIDATED
SITEMAP_DEPLOYED != GSC_PROCESSED
URL_INDEXED != RICH_RESULT_ELIGIBLE
FORM_SUBMIT_ATTEMPT != LEAD_SUCCESS
LEAD_SUCCESS_QA != PERMISSION_TO SEND PII TO ANALYTICS
AUDIT_FINDING != REMEDIATION_AUTHORIZATION
TOOL_CAPABILITY != AUTHORIZATION
PLANNED != AUTHORIZED
```
