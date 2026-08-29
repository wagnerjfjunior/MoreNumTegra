# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-08-29`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Regra: ausência nesta lista não constitui autorização.

## 1. Bloqueios ativos

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| correção manual somente na Green sem atualizar GitHub | cria drift da fonte canônica | alterar via branch/PR e homologar |
| usar formulário customizado `fetch` como produção | Form 46 nativo já está validado | necessidade comprovada + nova decisão |
| interceptar submit do Form 46 | risco de quebrar lifecycle Green | preservar submit nativo |
| usar seletor global `form` para mutação/interceptação | risco de colisão com builder | seletor específico verificado |
| promover Vercel diferente do `main` aprovado | drift de homologação | alinhar ao SHA aprovado |
| indexar Vercel Production como origem comercial | Green é produção comercial | decisão Search específica |
| novos ajustes DNS/domínio | efeito público | necessidade + autorização específica |
| tratar redirect page-level do `www` como 301/308 comprovado | HAR observado mostrou HTTP 200 antes da navegação | evidência HTTP real de 301/308 |
| aplicar metadata Green antes do lifecycle GitHub/Vercel | produziria drift entre fonte e produção | PR validada, merge e gate Green |
| inserir canonical em módulo HTML de body | canonical precisa de mecanismo de head confiável | capability Green de head/canonical comprovada |
| canonical via JavaScript fora do contrato 2026-08-29 | client-side canonical exige decisão técnica delimitada | somente o target `https://moretegra.com.br/` está aprovado no contrato vigente |
| declarar canonical Green implementado só porque Vercel possui canonical | ambientes têm funções distintas | prova no HTML/head da produção Green |
| JSON-LD/OG/Twitter fora do contrato 2026-08-29 | expansão Search não autorizada genericamente | somente OG/Twitter e `WebSite + WebPage` descritos no contrato vigente estão liberados |
| analytics/pixels/tags/Speed Insights adicional | telemetria/dados | gate específico |
| Search Console | propriedade/verificação externa | gate específico |
| CMS/database/backend próprio | não necessário no V1 | necessidade material + nova decisão |
| FECH.AI/n8n/Make/Ads | fora do escopo atual | autorização específica |
| segredo/token no HTML/JS | risco de segurança | arquitetura segura aprovada |
| publicar dado comercial não verificado | precisão/reputação | fonte atual/aprovada |
| copiar conteúdo/design de referência externa | referência não transfere autoria | solução original |

## 2. Green Sales — permitido

A produção comercial Green V1 está publicada e funcionalmente homologada.

Permitido após lifecycle/gate aplicável:

- manutenção dos mesmos artefatos derivados de `main`;
- correções homologadas no Vercel e mergeadas;
- atualização controlada dos módulos/configurações Green;
- smoke test após publicação.

A autorização do pacote Search + Conversion de 2026-08-29 não elimina os gates de Ready, merge ou produção.

## 3. Search provider — permitido

O provider `blogs-sites-portais-seo` pode:

- auditar o live;
- recomendar canonical, JSON-LD, metadata, arquitetura, conteúdo e Search tooling;
- devolver handoff versionado para MoreNumTegra;
- priorizar ações de SEO/SEM.

O provider result P0 está integrado no provider `main`.

O provider não pode, por esse vínculo:

- transferir a autoridade do produto;
- publicar na Green;
- alterar DNS;
- habilitar tracking;
- criar campanha/spend;
- mutar o MoreNumTegra sem autorização específica.

## 4. Regras de interpretação

- `main mergeada` != `Green atualizada`.
- `Green atualizada` != `smoke aprovado`.
- `dado presente em tabela` != `dado automaticamente atual`.
- `tool capability` != `authorization`.
- `www Domínio OK` != `redirect HTTP 301/308 comprovado`.
- `Vercel canonical` != `Green canonical implementado`.
- `Search recommendation` != `implementation authorization`.
- `Form 46 funcionando` != `form customizado necessário`.

## 5. Sequência operacional vigente

```text
SEARCH HANDOFF/RECOMMENDATION
-> MORENUMTEGRA DECISION
-> CHANGE/BRANCH
-> VERCEL PREVIEW
-> OWNER VALIDATION
-> MERGE MAIN
-> VERCEL PRODUCTION
-> GREEN SALES
-> PRODUCTION SMOKE
```

O domínio principal comercial é `https://moretegra.com.br/`. O `www` hoje usa redirect page-level. O target canonical non-www está adjudicado. O pacote 2026-08-29 autoriza o transporte client-side do canonical no JavaScript aprovado, com risco residual; redirect HTTP 301/308 continua dependente de capability proof.
