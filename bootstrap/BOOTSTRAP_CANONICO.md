# Bootstrap Canônico — MoreNumTegra

> Ponto de entrada operacional para iniciar ou retomar o projeto sem depender do histórico de uma conversa.

## 1. Identificação

- Projeto: `MoreNumTegra`
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`
- Branch canônica: `main`
- Fonte de verdade integrada: GitHub `main`
- Baseline funcional vigente: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica vigente: `docs/baseline/TECHNICAL_BASELINE_V2_3.md`
- Baseline técnica anterior: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Padrão canônico de mídia responsiva: `docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md`
- Contrato canônico de atribuição/identificadores: `docs/attribution/MNT_M6_01_ATTRIBUTION_MODEL_IDENTIFIER_BOUNDARIES_V1_2026-09-22.md`
- Contrato canônico UTM/source/medium/campaign: `docs/attribution/MNT_M6_02_UTM_SOURCE_MEDIUM_CAMPAIGN_CONTRACT_V1_2026-09-22.md`
- Contrato UTM machine-readable: `docs/attribution/MNT_UTM_CONTRACT_V1.json`
- Arquitetura canônica de conversão Google Ads: `docs/attribution/MNT_M6_03_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1_2026-09-22.md`
- Arquitetura Google Ads machine-readable: `docs/attribution/MNT_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1.json`
- Contrato canônico SEM campanha/query: `docs/attribution/MNT_M6_04_SEM_CAMPAIGN_QUERY_CONTRACT_V1_2026-09-22.md`
- Contrato SEM machine-readable: `docs/attribution/MNT_SEM_QUERY_CONTRACT_V1.json`
- Mapeamento canônico landing/query: `docs/attribution/MNT_M6_05_LANDING_PAGE_QUERY_MAPPING_V1_2026-09-22.md`
- Mapa landing/query machine-readable: `docs/attribution/MNT_PAID_LANDING_QUERY_MAP_V1.json`
- ADRs operacionais atuais: ADR-004, ADR-005 e ADR-006
- Autoridade comercial transitória da Home: `docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md`
- Commercial Data Plane v3: `docs/architecture/MNT_COMMERCIAL_DATA_PLANE_V3.md`
- Schema comercial v3: `docs/architecture/MNT_COMMERCIAL_DATA_SCHEMA_V3.schema.json`
- Programa Search-to-Lead: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- WBS: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`
- Read model: `docs/sfjm/PROJECT_READ_MODEL.json`
- Task graph: `docs/sfjm/PROGRAM_TASK_GRAPH.json`
- Dashboard/WBS reconciliation: `docs/sfjm/MNT_DASHBOARD_WBS_STATE_RECONCILIATION_2026-09-23.md`
- Change traceability standard: `docs/governance/MNT_CHANGE_TRACEABILITY_STANDARD_V1.md`
- Local validation standard: `docs/governance/MNT_LOCAL_LIVE_SYNC_VALIDATION_STANDARD_V1.md`
- Latest traceability audit: `docs/governance/MNT_TRACEABILITY_AUDIT_2026-09-25.md`
- Historical planning baseline archive: `docs/roadmap/archive/MNT_RESF_PLANNING_BASELINE_2026-09-10.md`
- Data de referência desta revisão: `2026-09-23`

## 2. Regra de canonicalidade

A fonte canônica do estado integrado é `main`.

Em caso de divergência:

1. resolver lifecycle GitHub, SHA, base, checks e mergeability live;
2. requisitos funcionais vêm da baseline funcional vigente;
3. arquitetura/runtime vêm da baseline técnica vigente e ADRs integrados;
4. `handoffs/CURRENT.md` descreve o handoff operacional atual;
5. `docs/NEXT_SAFE_ACTION.md` define a única próxima ação segura;
6. `docs/BLOCKED_ACTIONS.md` preserva ações ainda gated;
7. WBS/task graph não transformam trabalho planejado em autorização;
8. branches/PRs são propostas até merge;
9. informação ausente não é preenchida por inferência;
10. conflito material usa a interpretação mais restritiva até reconciliação.

## 2.1. Definição operacional de estado live

`Estado live` é o estado real e atual do projeto, resolvido diretamente nas fontes canônicas no momento da ação. Ele não deve ser inferido de memória, de uma conversa anterior, de um handoff histórico ou de um SHA previamente observado.

Antes de qualquer mudança material, resolver no mínimo:

- SHA atual de `main`;
- branches e PRs relevantes ao escopo;
- relação da branch de trabalho com `main` (ahead/behind/mergeability quando aplicável);
- checks do head exato quando houver PR;
- deployment correspondente ao SHA aprovado quando a tarefa envolver release;
- coerência entre `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md` e o estado real observado;
- bloqueios ou mudanças de prioridade que tenham surgido desde a última reconciliação.

Regra de interpretação:

```text
DOCUMENTED_STATE = fotografia histórica/reconciliada
LIVE_STATE = estado atual observado diretamente nas fontes canônicas
LIVE_STATE > memória de conversa
LIVE_STATE > SHA histórico
LIVE_STATE > suposição operacional
```

Se houver divergência entre documentação e estado live, não prosseguir por inferência: registrar a divergência, reconciliar a fonte canônica aplicável e só então continuar.

## 3. Ordem mínima de leitura

1. `handoffs/CURRENT.md`
2. `docs/governance/MNT_CHANGE_TRACEABILITY_STANDARD_V1.md`
2a. `docs/governance/MNT_LOCAL_LIVE_SYNC_VALIDATION_STANDARD_V1.md`
3. `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
4. `docs/baseline/TECHNICAL_BASELINE_V2_3.md`
5. ADR-006 — produção Vercel / `www` canônico
6. ADR-004 — deploy Git-driven filtrado
7. ADR-005 — contrato Form 46 + Measurement
8. `docs/PROJECT_STATUS.md`
9. `docs/NEXT_SAFE_ACTION.md`
10. `docs/BLOCKED_ACTIONS.md`
11. `docs/sfjm/PROJECT_READ_MODEL.json` e `docs/sfjm/PROGRAM_TASK_GRAPH.json` quando programa/horas/progresso forem materiais
12. evidências específicas referenciadas pela tarefa.

Historical baselines/ADRs remain valid as point-in-time evidence, but current production semantics are governed by V2.3 + ADR-006.

## 4. Arquitetura V1 atual

- HTML5 semântico;
- CSS mobile-first;
- JavaScript vanilla;
- sem React/Next.js como requisito;
- sem bundler complexo;
- sem backend próprio obrigatório;
- GitHub `main` = fonte canônica;
- Vercel Preview = validação de branch/runtime;
- Vercel Production = produção web comercial;
- Green Sales/GDigital = backend de captação/CRM Form 46;
- Cloudflare = DNS autoritativo somente, sem proxy HTTP.

Topologia:

```text
Registro.br
-> Cloudflare authoritative DNS / DNS only
   -> moretegra.com.br -> Vercel -> 308 -> www.moretegra.com.br
   -> www.moretegra.com.br -> Vercel Production
   -> lp.moretegra.com.br -> Vercel permanent 308 -> www.moretegra.com.br
```

Host comercial/canônico:

`https://www.moretegra.com.br/`

`*.vercel.app` permanece não canônico e `noindex,nofollow`.

## 5. Deploy Vercel

ADR-004 governa:

```text
runtime change em branch
-> Vercel Preview automático

merge runtime em main
-> Vercel Production automático

docs-only
-> Ignored Build Step
-> sem build real
```

Deploy Hook manual é fallback, não caminho normal.

## 6. Formulário / Green Sales

Contrato vigente:

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
required = nome, email, telefone
optional = texto-livre
```

O frontend Vercel usa formulário project-owned com seletor específico, `fetch` nativo + `FormData`, normalização E.164, país/DDI, validação, `Enviando...`, prevenção de duplo clique, sucesso, erro e falha de rede.

Não expor segredo/token. Não criar backend intermediário sem necessidade comprovada.

Produção real de Form 46 é habilitada no host `www.moretegra.com.br`; previews arbitrários não devem transmitir leads reais.

## 7. Thank-you / conversão

Rota única:

`https://www.moretegra.com.br/obrigado/`

Ela atende home e futuras páginas de empreendimento. O contexto do projeto/oferta deve viajar por estado governado do formulário/dataLayer, não por uma thank-you URL separada para cada empreendimento.

`/obrigado/` permanece `noindex,nofollow`.

`mnt_lead_success` só pode ocorrer após sucesso real do Form 46 e consumo único de marcador fresco; acesso direto/refresh não pode duplicar conversão.

## 8. Measurement / consent

```text
GTM = GTM-PGCR4R47
GA4 property = 553742649
GA4 stream = 15759638334
GA4 measurement_id = G-57M2XR0CY2
primary source = mnt_lead_success
primary GA4 mapping = generate_lead
```

Host comercial de negócio: `www.moretegra.com.br`.

Taxonomia preservada:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success -> generate_lead
```

Consent Mode:

- default denied;
- aceite -> quatro sinais granted;
- recusa -> quatro sinais denied.

Nunca enviar nome, e-mail, telefone ou texto livre para GA4/dataLayer.

O número exato da versão GTM publicada para o cutover `www` não deve ser inventado quando não estiver registrado.

## 9. SEO / Search

Homepage canônica:

`https://www.moretegra.com.br/`

Estado validado em 2026-09-14:

```text
HTTP 200 = PASS
robots index,follow = PASS
canonical declarado www = PASS
GSC URL indexed = PASS
crawl allowed = PASS
indexing allowed = PASS
Google-selected canonical = www = PASS
```

Discovery:

- `/robots.txt` aponta para o sitemap;
- `/sitemap.xml` contém somente URLs reais, publicadas, indexáveis e canônicas;
- `/obrigado/`, previews e fallback Green não entram no sitemap.

Rich Results/JSON-LD é trilha separada e não é pré-condição para a indexação básica do site.

## 10. Namespace de rotas Search

Governado por M3/M4:

```text
/                                           portfolio root
/caminhos-da-lapa/                          master development
/empreendimentos/<project-slug>/            exact project
/estagios/<stage>/                          stage discovery
/regioes/<verified-location>/               verified location discovery
```

Future `/blog/...` requires its own ownership/content gate.

Rota reservada != rota publicada. Não inserir URL planejada no sitemap antes de existir, ser factual, indexável e self-canonical.

## 11. Identidade / mobile / performance

- amarelo Tegra: `#EBB92E`;
- logo amarelo transparente: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp`;
- logo cinza: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Cinza.webp`;
- não substituir o logo por `T` genérico.

Mobile é primeiro caminho de aceite. O relato `>90% mobile` permanece USER_REPORTED até analytics comprovar.

Targets:

- LCP <= 2,5 s;
- INP <= 200 ms;
- CLS <= 0,1.

Nenhuma função principal depende de hover. Vídeo/media não pode bloquear catálogo, filtros, CTA ou formulário.

Para páginas exatas e remediação fotográfica, aplicar `docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md`: hero descobrível no HTML inicial, derivados responsivos sem upscale, budgets mobile, gallery/thumb derivatives e fallback governado.

## 12. Produto / catálogo

Não inventar preço, disponibilidade, metragem, endereço, estágio ou característica.

Dados comerciais e claims continuam subordinados ao Product Fact & Claim Registry, decisões posteriores de Product Authority e gates de revalidação aplicáveis.

Desde 2026-09-22, a Home atual em Production possui autoridade comercial transitória explícita por `PA-MNT-HOME-COMMERCIAL-TRUTH-2026-09-22`. Essa decisão preserva os valores atuais enquanto o Commercial Data Plane v3 é desenhado; não autoriza mudanças automáticas de preço nem integração direta com FECH.AI.

Known project-fact residuals are not waived by the Vercel/DNS cutover.

## 13. SFJM / RESF / SES

O repositório MoreNumTegra continua dono da verdade. SFJM/RESF/SES são camadas de consumo, planejamento ou especialização e não transferem Product Authority.

Preservar:

```text
MORENUMTEGRA MAIN = PROJECT TRUTH
PROJECT_READ_MODEL = DERIVED CONSUMER ENTRYPOINT
PROGRAM_TASK_GRAPH = PROJECT-PUBLISHED PROGRAM STRUCTURE
WBS CURRENT STATE = DASHBOARD INPUT
WBS ARCHIVE_ONLY != CURRENT STATE
WBS PLANNED != AUTHORIZED
TOOL_CAPABILITY != AUTHORIZATION
SEARCH_RECOMMENDATION != IMPLEMENTATION_AUTHORIZATION
```

Para detalhe de adoção/roteamento SES e RESF, resolver os documentos project-owned referenciados pelo read model e pelo manifesto de adoção em `docs/frameworks/resf/`.

## 14. Gates separados

Exigem decisão própria:

- novas mudanças DNS/domínio;
- Cloudflare orange-cloud/proxy;
- futuras mutações GTM/GA4 fora de gate;
- Meta/CAPI;
- Google Ads/linkagem/spend;
- CMS/database/backend próprio;
- FECH.AI/n8n/Make;
- segredo/token no cliente;
- novas famílias materiais de rotas/conteúdo;
- claims comerciais sem evidência.

## 15. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.


## 16. Rastreabilidade obrigatória

Contrato canônico:

`docs/governance/MNT_CHANGE_TRACEABILITY_STANDARD_V1.md`

Regra operacional:

```text
MATERIAL_CHANGE
-> BRANCH
-> PR
-> EXACT-HEAD VALIDATION
-> MERGE
-> DEPLOYMENT RESOLUTION
-> PRODUCTION VALIDATION
-> CURRENT-STATE RECONCILIATION
```

Nenhuma conversa é fonte de verdade por si só.

Mudança material não pode ficar documentada apenas no chat.

Commit direto em `main` é exceção, não fluxo normal, e deve ser reconciliado no próximo PR de governança.
