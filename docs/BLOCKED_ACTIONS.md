# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-08-28`
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
| implementar canonical/JSON-LD/meta Search sem handoff aprovado | Search pertence ao provider definido | recomendação/handoff + autorização MoreNumTegra |
| analytics/pixels/tags/Speed Insights adicional | telemetria/dados | gate específico |
| CMS/database/backend próprio | não necessário no V1 | necessidade material + nova decisão |
| FECH.AI/n8n/Make/Ads | fora do escopo atual | autorização específica |
| segredo/token no HTML/JS | risco de segurança | arquitetura segura aprovada |
| publicar dado comercial não verificado | precisão/reputação | fonte atual/aprovada |
| copiar conteúdo/design de referência externa | referência não transfere autoria | solução original |

## 2. Green Sales — permitido

A produção comercial Green V1 está publicada e funcionalmente homologada.

Permitido:

- manutenção dos mesmos artefatos derivados de `main`;
- correções homologadas no Vercel e mergeadas;
- atualização controlada dos módulos Green;
- smoke test após publicação.

Não interpretar isso como autorização para tracking, backend, Ads, mudanças DNS adicionais ou implementação automática de recomendações Search.

## 3. Search provider — permitido

O provider `blogs-sites-portais-seo` pode:

- auditar o live;
- recomendar canonical, JSON-LD, metadata, arquitetura, conteúdo e Search tooling;
- devolver handoff versionado para MoreNumTegra;
- priorizar ações de SEO/SEM.

Não pode, por esse vínculo:

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

Os dois hostnames públicos estão operacionais em HTTPS. O domínio principal pretendido para Search é `https://moretegra.com.br/`; o `www` hoje usa redirect page-level e requer tratamento de canonicalidade pelo provider.
