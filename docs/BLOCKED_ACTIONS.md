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
| alterações adicionais de GTM além da baseline Consent Mode aceita | GTM/Consent já possui baseline publicada; novas mudanças podem alterar measurement/consent | task/gate correspondente + QA |
| criar/configurar GA4 ou eventos GA4 | taxonomy/conversions/transport ainda não estão fechados | concluir/autorizar tarefas MNT-M2 aplicáveis |
| instalar/configurar Google Ads conversion tags | conversões/atribuição ainda não estão fechadas | gate MNT-M2/MNT-M6 aplicável |
| instalar/configurar Meta Pixel/Dataset/CAPI | ownership/arquitetura Meta não concluídos | gate específico após desenho |
| configurar Green Pixel/integração adicional | pode duplicar telemetria ou alterar consent boundary | arquitetura de transporte/dedup + gate específico |
| tratar Green `/page/view` como equivalente a GA4/business conversion | semântica e dedup não definidos | MNT-M2-02/03/04 |
| tratar telemetry YouTube como conversão MoreNumTegra | third-party media telemetry não é evento de negócio | taxonomy explícita |
| novas mutações Search Console | estado externo já possui propriedade/indexação comprovadas | gate específico |
| CMS/database/backend próprio | não necessário no V1 | necessidade material + nova decisão |
| FECH.AI/n8n/Make/Ads campaign/spend | fora do escopo autorizado atual | autorização específica |
| segredo/token no HTML/JS | risco de segurança | arquitetura segura aprovada |
| publicar dado comercial não verificado | precisão/reputação | fonte atual/aprovada |
| copiar conteúdo/design de referência externa | referência não transfere autoria | solução original |

## 2. GTM / Consent baseline aceita pela reconciliação

Esta lista não deve ser interpretada como se GTM/Consent continuassem inexistentes.

Evidence:
`docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

Baseline observada:

```text
GTM = GTM-PGCR4R47
Published version = 4
Default = denied for ad_storage / analytics_storage / ad_user_data / ad_personalization
Green Continuar = granted all four
Green Cancelar = denied all four
Persistence after reload = validated for granted and denied
```

Preservar:

```text
ACCEPTED GTM CONSENT BASELINE != AUTHORIZATION FOR FURTHER TRACKING MUTATION
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
