# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-09-22`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline vigente após integração: `docs/baseline/TECHNICAL_BASELINE_V2_3.md`
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

Historical documents that describe Green Builder as the web production host or `lp.moretegra.com.br` as the Vercel canonical surface are point-in-time evidence and are superseded for current production semantics by ADR-006 + Technical Baseline V2.3.

## 2. Bloqueios ativos — código / runtime / deploy

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| alterar produção fora de branch/PR sem necessidade emergencial comprovada | quebra rastreabilidade | branch/PR + lifecycle governado |
| promover estado Vercel diferente de `main` aprovado | drift de produção | alinhar ao SHA autorizado |
| desabilitar deploy Git-driven automático sem nova decisão | ADR-004 é vigente | nova ADR/gate explícito |
| remover filtro docs-only sem necessidade comprovada | consome build sem benefício | decisão infra + QA |
| tratar Deploy Hook manual como caminho normal | supersedido por ADR-004 | usar apenas fallback/emergência |
| adicionar framework/bundler/backend complexo sem requisito | viola simplicidade V1 | necessidade comprovada + decisão arquitetural |
| segredo/token no HTML/JS | risco de segurança | arquitetura server-side segura aprovada |

## 3. Bloqueios ativos — DNS / domínio / hosting

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| novas mudanças DNS/domínio sem gate | risco de indisponibilidade/SEO | decisão explícita + rollback/QA |
| ativar Cloudflare orange-cloud/proxy na frente da Vercel | muda caminho HTTP, cache e segurança | necessidade comprovada + testes específicos |
| trocar novamente o canonical host | impacto SEO/redirect/measurement | decisão Search + infra + migration plan |
| reutilizar target DNS por memória em futura mudança | pode estar stale | usar valor live fornecido pelo provedor |
| remover `lp` fallback sem decisão | pode afetar rollback/Green legado | gate próprio |
| mexer em MX/SPF/DKIM/DMARC por causa do web cutover | escopo diferente | gate de e-mail próprio |

## 4. Bloqueios ativos — Form 46 / lead / CRM

Contrato vigente:

```text
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
```

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| substituir Green/GDigital como provider sem nova arquitetura | Form 46 real foi validado | necessidade + decisão + migration QA |
| adicionar backend intermediário sem necessidade comprovada | aumenta complexidade e superfície de falha | requisito técnico/segurança explícito |
| expor token/segredo no cliente | risco crítico | proibido; usar arquitetura segura |
| usar seletor global `form` para mutação/interceptação | risco de colisão | usar seletor específico do MoreNumTegra |
| remover validação/E.164/double-submit prevention | regressão funcional | nova decisão funcional + QA |
| emitir lead success por CTA, foco ou submit attempt | semântica incorreta | somente lifecycle de lead aceito |
| considerar `/obrigado` sozinho como prova de conversão | pode duplicar/ser acesso direto | manter marcador fresco/consumível ou arquitetura superior |

## 5. Bloqueios ativos — Measurement / GA4 / consent

```text
GTM = GTM-PGCR4R47
GA4 property = 553742649
GA4 stream = 15759638334
GA4 measurement_id = G-57M2XR0CY2
primary source = mnt_lead_success
primary GA4 mapping = generate_lead
business host = www.moretegra.com.br
```

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| adicionar segundo GTM container para a mesma superfície | viola single dispatcher | decisão arquitetural superseding |
| adicionar `gtag()` project-owned direto fora do GTM | risco de duplicação | decisão explícita |
| criar property/stream GA4 duplicados | ativos vigentes já existem | necessidade comprovada |
| substituir IDs por inferência | IDs canônicos observados | nova evidência explícita |
| marcar `mnt_form_start` ou `mnt_form_submit_attempt` como conversão | taxonomy vigente os classifica como não-conversão | revisão de taxonomy |
| criar `form_submit` redundante como conversão | duplicação semântica | revisão de contrato |
| enviar nome/e-mail/telefone/texto livre para Measurement | PII proibida | nova arquitetura privacy/security aprovada |
| habilitar enhanced conversions/user-provided data/advanced matching | não autorizado | privacy + ads gate específico |
| usar preço do imóvel como conversion value do lead | não representa valor de lead | modelo de lead value governado |
| inventar número da versão GTM publicada do cutover `www` | não registrado | evidência observada |

Consent Mode vigente:

```text
default = denied
accept = granted nos quatro sinais
reject = denied nos quatro sinais
```

## 6. Bloqueios ativos — Search / SEO / conteúdo

- publicar rota apenas porque está reservada na IA;
- inserir URL 404/não publicada/não indexável no sitemap;
- criar doorway por preço/metragem/planta/endereço/modificador quando o owner é a página exata do projeto;
- criar localização sem conjunto de projetos verificado;
- usar stage membership como prova de disponibilidade comercial;
- indexar `/obrigado/`;
- indexar `*.vercel.app` previews;
- alterar canonical/redirect sem gate Search + infra;
- inventar preço, metragem, endereço, disponibilidade, estágio ou claim;
- keyword stuffing;
- schema sem conteúdo visível/factual correspondente;
- tratar teste de Rich Results sem item elegível como falha de indexação básica;
- considerar sitemap deployment igual a sitemap processado pelo GSC sem evidência.

Namespace governado:

```text
/
/caminhos-da-lapa/
/empreendimentos/<project-slug>/
/estagios/<stage>/
/regioes/<verified-location>/
```

Future `/blog/...` requires its own content/ownership gate.

## 7. Meta / Ads / automação

Permanece bloqueado sem gate específico:

- inventar/criar Meta Dataset/Pixel por ausência de evidência;
- `fbq()` project-owned direto;
- Meta CAPI/Partner Gateway;
- Standard Events/Custom Conversions inferidos;
- Google Ads conversion tags/linkagem sem autorização;
- campaign/spend;
- FECH.AI/n8n/Make.

## 8. MNT-RESF / programa

- MNT-M5-10 Slice 01 Elo Duo está concluído; qualquer slice adicional continua bloqueado até nova decisão explícita da Product Authority.
- task planejada != task autorizada;
- merge de uma task != autorização automática da próxima;
- Product Authority continua sendo necessária para lifecycle material;
- SFJM/read model não pode inventar estado/horas/autorização;
- residual factual conhecido não pode ser tratado como PASS por conveniência.

## 9. Residuals atuais que não devem ser apagados

- `/favicon.ico` retornou 404 no HAR Pingdom pós-cutover;
- número exato da versão GTM publicada para o delta `www` não foi registrado;
- status de submissão/processamento do sitemap no GSC deve ser evidenciado separadamente;
- residual factual Mozae 45m² vs registry governado 46m²/73m² permanece sujeito ao gate Product Truth/Search;
- Rich Results/JSON-LD permanece trilha separada.

## 10. Regras de interpretação

```text
MAIN_MERGED != SMOKE_TESTED
DEPLOYMENT_SUCCESS != BUSINESS_FLOW_VALIDATED
SITEMAP_DEPLOYED != GSC_PROCESSED
URL_INDEXED != RICH_RESULT_ELIGIBLE
FORM_SUBMIT_ATTEMPT != LEAD_SUCCESS
LEAD_SUCCESS_QA != PERMISSION_TO SEND PII TO ANALYTICS
TOOL_CAPABILITY != AUTHORIZATION
PLANNED != AUTHORIZED
```


## M5-10 post-Slice-01 gate — 2026-09-21

- MNT-M5-10 Slice 01 Elo Duo media A/B is complete.
- No additional M5-10 runtime slice is authorized by sequence.
- Product Authority must choose the next bounded slice before further performance mutation.
- Do not infer approval to modify Ária, CAPIITOLO, GTM, Form 46, SEO/canonical, or additional Elo assets from Slice 01 completion.


## M5-10 post-Slice-07 gate — 2026-09-22

- Slice 07 late GTM bootstrap is retained and Production-validated at runtime SHA `8d99996edddd66a59835992da161edbbb3579ad0`.
- This retention does **not** authorize further GTM/GA4 changes, another Elo optimization, Ária optimization, Form 46 mutation, or any other runtime slice.
- No direct project `gtag()`, second GTM container, duplicate GA4 destination, or change to `mnt_lead_success -> generate_lead` is authorized.
- No M5-10 task hours are accepted merely from Slice 07.
- Product Authority must explicitly choose the next bounded M5-10 slice.
