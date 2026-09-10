# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADRs: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`, `docs/adr/ADR-002-VERCEL-MANUAL-GATE-DRIVEN-DEPLOYMENT.md`
- Regra: ausência nesta lista não constitui autorização.

## 1. Bloqueios ativos

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| correção manual somente na Green sem atualizar GitHub | cria drift da fonte canônica | alterar via branch/PR e homologar |
| usar formulário customizado `fetch` como produção | Form 46 nativo já está validado | necessidade comprovada + nova decisão |
| interceptar submit do Form 46 | risco de quebrar lifecycle Green | preservar submit nativo |
| usar seletor global `form` para mutação/interceptação | risco de colisão com builder | seletor específico verificado |
| restaurar deploy automático Vercel por commit | ADR-002 adotou `MANUAL_GATE_DRIVEN` | nova decisão explícita + revalidação |
| promover Vercel diferente do `main` aprovado | drift de homologação | alinhar ao SHA aprovado |
| indexar Vercel Production como origem comercial | Green é produção comercial | decisão Search específica |
| novos ajustes DNS/domínio | efeito público | necessidade + autorização específica |
| tratar redirect page-level do `www` como 301/308 comprovado | HAR observado mostrou HTTP 200 antes da navegação | evidência HTTP real de 301/308 |
| aplicar metadata Green antes do lifecycle GitHub/Vercel | produziria drift entre fonte e produção | PR validada, merge e gate Green |
| inserir canonical em módulo HTML de body | canonical precisa de mecanismo de head confiável | capability Green de head/canonical comprovada |
| canonical via JavaScript fora do contrato 2026-08-29 | client-side canonical exige decisão técnica delimitada | somente o target aprovado no contrato vigente |
| declarar canonical Green implementado só porque Vercel possui canonical | ambientes têm funções distintas | prova no HTML/head da produção Green |
| JSON-LD/OG/Twitter fora do contrato 2026-08-29 | expansão Search não autorizada genericamente | somente escopo aprovado no contrato vigente |
| alterações adicionais de GTM além da baseline Consent Mode aceita | novas mudanças podem alterar Measurement/Consent | task/gate correspondente + QA |
| criar/configurar GA4, data stream, Google tag ou eventos GA4 | transporte, taxonomy e conversion roles estão definidos, mas ownership e implementation gates ainda não estão fechados | concluir/autorizar MNT-M2-05 e MNT-M2-09 aplicáveis |
| marcar eventos como GA4 key events/conversions | project conversion role não é configuração administrativa de destino | ownership/configuration gate aplicável + implementação autorizada |
| instalar/configurar Google Ads conversion tags | classificação de negócio existe, mas atribuição/Ads implementation permanece futura | gate MNT-M6 aplicável + autorização específica |
| copiar mecanicamente `PRIMARY`/`SECONDARY` do projeto para Google Ads | semântica de otimização/counting/attribution ainda não foi decidida em MNT-M6 | contrato MNT-M6 + autorização específica |
| instalar/configurar Meta Pixel/Dataset/CAPI | ownership/arquitetura Meta não concluídos | gate específico após MNT-M2-06/desenho |
| configurar Green Pixel/integração adicional | pode duplicar telemetria ou alterar consent boundary | arquitetura aceita + gate de implementação específico |
| tratar Green `/page/view` como equivalente a evento/conversão MoreNumTegra | Green é telemetria de plataforma, não origem semântica do projeto | proibido salvo decisão arquitetural superseding explícita |
| tratar telemetry YouTube como conversão MoreNumTegra | third-party media telemetry não é evento de negócio | proibido pela taxonomy v1 |
| enviar texto bruto da busca do catálogo para Measurement | campo é free-form e pode conter dado pessoal inesperado | não enviar; taxonomy v1 usa somente estado/result_count |
| enviar nome/email/telefone/valores digitados do Form 46 como parâmetro de evento | PII do visitante não pertence ao contrato de Measurement v1 | nova arquitetura explícita de privacy/security se algum dia necessária |
| emitir `mnt_lead_success` por CTA, WhatsApp, foco ou submit attempt | esses sinais não provam criação de lead | somente sucesso estável e verificável do Form 46 |
| implementar `mnt_lead_success` sem sinal Green de sucesso comprovado | risco de falso positivo de conversão | provar sinal estável, não invasivo e deduplicável |
| tratar `mnt_form_submit_attempt`, `mnt_form_start` ou `mnt_intent:project_interest` como conversão | MNT-M2-04 os classifica como `NONE` | revisão explícita do contrato de conversão, se houver nova evidência |
| usar preço de imóvel/oferta como conversion value | preço de imóvel não é receita/valor de lead | modelo de valor de lead governado posteriormente |
| novas mutações Search Console | estado externo já possui propriedade/indexação comprovadas | gate específico |
| CMS/database/backend próprio | não necessário no V1 | necessidade material + nova decisão |
| FECH.AI/n8n/Make/Ads campaign/spend | fora do escopo autorizado atual | autorização específica |
| segredo/token no HTML/JS | risco de segurança | arquitetura segura aprovada |
| publicar dado comercial não verificado | precisão/reputação | fonte atual/aprovada |
| copiar conteúdo/design de referência externa | referência não transfere autoria | solução original |

## 2. Baselines Measurement aceitas

### GTM / Consent

Evidence: `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

```text
GTM = GTM-PGCR4R47
Published version = 4
Default = denied for ad_storage / analytics_storage / ad_user_data / ad_personalization
Green Continuar = granted all four
Green Cancelar = denied all four
Persistence after reload = validated for granted and denied
```

### Transport / dedup

Evidence: `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`.

```text
moretegra.com.br = only project Measurement production host
www.moretegra.com.br = no project business/page Measurement
GTM-PGCR4R47 = sole project-owned browser dispatcher
Green /page/view = platform telemetry
one project page-view path per canonical document load
```

### Canonical event taxonomy v1

Evidence: `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`.

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

### Conversion classification v1

Evidence: `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`.

```text
PRIMARY = mnt_lead_success
SECONDARY = request_conditions / request_project_conditions / negotiate_scenario / schedule_visit / whatsapp_contact
NONE = page/section/filter/search/project_interest/form_start/form_submit_attempt
LEAD_CONVERSION_VALUE = NOT_DEFINED
```

Preservar:

```text
ACCEPTED CONVERSION ROLE != DESTINATION CONFIGURED
PRIMARY CONVERSION != PRIMARY ADS ACTION
SECONDARY CONVERSION != VERIFIED LEAD
ACCEPTED TAXONOMY != EVENTS IMPLEMENTED
CONSENT STATE QA != FULL MEASUREMENT E2E QA
```

## 3. Green Sales — permitido

A produção comercial Green V1 está publicada e funcionalmente homologada.

Permitido após lifecycle/gate aplicável:

- manutenção dos mesmos artefatos derivados de `main`;
- correções homologadas no Vercel e mergeadas;
- atualização controlada dos módulos/configurações Green;
- smoke test após publicação.

## 4. Search provider — permitido

O provider `blogs-sites-portais-seo` pode auditar/recomendar e devolver handoff versionado. Não pode, por esse vínculo, transferir autoridade do produto, publicar Green, alterar DNS, habilitar tracking adicional, criar campaign/spend ou mutar MoreNumTegra sem autorização específica.

## 5. Regras de interpretação

- `main mergeada` != `Green atualizada`.
- `Green atualizada` != `smoke aprovado`.
- `tool capability` != `authorization`.
- `GTM Version 4 published` != `GA4 implemented`.
- `Consent Mode validated` != `full Measurement complete`.
- `event defined` != `conversion`.
- `conversion classified` != `destination configured`.
- `project PRIMARY/SECONDARY` != `Google Ads primary/secondary action setting`.
- `MNT-M2-05 partial evidence` != `MNT-M2-05 complete or authorized`.
- `MNT-M2-09 partial` != `MNT-M2-09 complete`.
- `www Domínio OK` != `redirect HTTP 301/308 comprovado`.
- `Search recommendation` != `implementation authorization`.
- `planned WBS` != `authorized execution`.

## 6. Sequência operacional vigente

```text
PROJECT DESIGN / EVIDENCE
-> MORENUMTEGRA DECISION
-> CHANGE / BRANCH
-> MANUAL VERCEL PREVIEW WHEN NEEDED
-> OWNER VALIDATION
-> MERGE MAIN
-> MANUAL VERCEL PRODUCTION WHEN NEEDED
-> GREEN SALES WHEN NEEDED
-> PRODUCTION SMOKE
```

O domínio principal comercial é `https://moretegra.com.br/`. O `www` segue com redirect page-level e o risco de semântica HTTP permanece separado.
