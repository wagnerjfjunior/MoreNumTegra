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

Não interpretar isso como autorização para tracking, backend, Ads ou mudanças DNS adicionais.

## 3. Regras de interpretação

- `main mergeada` != `Green atualizada`.
- `Green atualizada` != `smoke aprovado`.
- `dado presente em tabela` != `dado automaticamente atual`.
- `tool capability` != `authorization`.
- `www CNAME criado` != `certificado www validado`.
- `Form 46 funcionando` != `form customizado necessário`.

## 4. Sequência operacional vigente

```text
CHANGE/BRANCH
-> VERCEL PREVIEW
-> OWNER VALIDATION
-> MERGE MAIN
-> VERCEL PRODUCTION
-> GREEN SALES
-> PRODUCTION SMOKE
```

O domínio raiz `moretegra.com.br` está operacional em HTTPS. O `www` permanece dependente apenas da conclusão de certificado pela Green no momento deste registro.
