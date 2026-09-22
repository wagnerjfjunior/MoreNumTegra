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


## M5-10 post-Slice-08 gate — 2026-09-22

- Slice 08 responsive Elo hero is retained and Production-validated at runtime SHA `90745255775129638b3d8f061ab067d8ecc1c425`.
- Elo Duo current five-run lab median LCP is `2,383 ms`, therefore the current `<=2,500 ms` lab target is met.
- This result does **not** authorize another Elo mutation, Ária optimization, CAPIITOLO optimization, GTM/GA4 change, Form 46 change, or any other runtime slice.
- The retained mobile derivatives are small essential assets; the large source remains external.
- No M5-10 task hours are accepted merely from Slice 08.
- Product Authority must explicitly select the next bounded M5-10 slice.


## M5-10 post-Slice-09 gate — 2026-09-22

- Slice 09 Ária responsive media is retained at runtime SHA `ac7958db2f2f4cd3d3bfccf4b6e9592f81a5d739`.
- Ária current lab target `LCP <=2,500 ms` is replicated across two independent five-run Production batteries.
- `docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md` is adopted as the canonical photographic delivery pattern for new exact-project pages.
- Standard adoption does **not** authorize an automatic bulk rewrite of existing project pages.
- CAPIITOLO remains a separate bounded slice because its hero composition/bootstrap differ materially.
- No M5-10 task hours are accepted merely from Slice 09.
- Product Authority must explicitly authorize the next material runtime slice.


## M5-10 Ária Hero Candidate 1 gate — 2026-09-22

- Candidate 1 residential-access hero is live at runtime SHA `5a0df7b6757930bf34664d04d66b9a41e841f577`.
- Deployment `dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc` is READY.
- Both independent candidate five-run batteries pass `LCP <=2,500 ms`.
- Candidate LCP direction is inconclusive: one batch is slower than contemporaneous control and the second is faster.
- Candidate deterministic payload is ~16.5 KB heavier for the hero and ~3.09% heavier for total transfer.
- Do not claim Candidate 1 is faster or slower overall from current lab evidence.
- The rooftop-pool image supplied by Product Authority was not tested and remains blocked until a new explicit decision.
- Do not introduce a hero slider/carousel or second hero image under the Candidate 1 authorization.
- No M5-10 task hours are accepted merely from this A/B.
- Product Authority must choose retain Candidate 1 or restore the prior hero before another Ária hero mutation.


## Post-M5 closure gate — 2026-09-22

- MNT-M5-10 is COMPLETE / ACCEPTED and Ária Candidate 1 is retained.
- MNT-M5 is COMPLETE / ACCEPTED at 168h.
- MNT-M2-10 is historically COMPLETE / ACCEPTED_WITH_V1_RESIDUAL via PR #54; do not rerun/count it merely because stale surfaces previously showed PLANNED.
- Program accepted progress is 920/1240h = 74.19%.
- Do not introduce the rooftop-pool hero, carousel or rotation without a new bounded authorization.
- MNT-M6-01 is the next gate but is not authorized by this closure.
- No Ads spend, campaign launch, conversion-action creation, Meta implementation or external paid-media mutation is authorized.


## M6-01 closure gate — 2026-09-22

- MNT-M6-01 is COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION.
- Canonical attribution model = FIRST_ELIGIBLE_TOUCH + LAST_ELIGIBLE_TOUCH.
- Event/campaign/click/lead/person identifier namespaces must remain separated.
- No project-owned user ID, cross-device identity or fingerprinting is authorized.
- No hashed PII / enhanced-conversion implementation is authorized by M6-01.
- No UTM persistence or CRM attribution transport is implemented yet.
- Google click IDs are reserved as opaque attribution data only.
- Meta identifier semantics remain deferred.
- Historical M2-02 non-www host wording must not override current ADR-006/www canonical host.
- MNT-M6-02 requires explicit Product Authority authorization.
- No Ads spend, campaign launch, external paid-media mutation, GTM/GA4 mutation or Meta implementation is authorized.


## M6-02 closure gate — 2026-09-22

- MNT-M6-02 is COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION.
- No active campaign was created.
- Only governed source/medium/campaign tuples may populate future project UTM attribution.
- Paid launch additionally requires stable project `utm_id`.
- Internal UTM propagation is forbidden.
- Direct/internal arrivals must not overwrite eligible acquisition state.
- Untagged organic/referral remains vendor-native only in project V1.
- Project attribution persistence is not implemented; future design requires affirmative consent and fixed 30-day project window.
- CRM attribution transport remains not authorized.
- No Ads conversion action, account link, spend, offline import, enhanced conversions, GTM/GA4 mutation or Meta mutation is authorized.
- MNT-M6-03 requires explicit Product Authority authorization.
