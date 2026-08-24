# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-08-24`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline após integração desta revisão: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Parent baseline: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Regra: ausência nesta lista não constitui autorização.

## 1. Bloqueios ativos

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| publicar na Green antes da homologação pública estável | release precisa ser testada abertamente | Vercel Production homologada + dados revalidados + release SHA |
| usar formulário customizado `fetch` como produção Green | Green oferece Form 46 nativo | usar bloco nativo e JS somente para UX verificada |
| depender de seletor global `form` | risco de colisão com builder | seletores próprios/verificados ou nenhuma interceptação |
| abrir YouTube como fluxo principal do vídeo | remove usuário da página | player in-page com fallback |
| promover deployment Vercel diferente do estado aprovado | risco de drift | deployment/release correspondente ao `main` aprovado |
| permitir indexação orgânica da homologação Vercel | não é origem comercial canônica | decisão SEO específica |
| custom domain/DNS | efeito público/SEO | autorização específica |
| analytics/pixels/tags | telemetria/dados | autorização específica |
| CMS/database/backend próprio | não necessário no V1 | necessidade material + nova decisão |
| FECH.AI/n8n/Make/Ads | fora do escopo V1 atual | autorização específica |
| segredo/token no HTML/JS | risco de segurança | arquitetura segura aprovada |
| dados comerciais/inventário não verificados na Green | precisão/reputação | fonte atual/aprovada |
| copiar conteúdo/design do Capri | referência é apenas estratégica/comportamental | criar solução original |

## 2. Vercel Production — permitido

Vercel Production está **autorizada como homologação pública**, não como produção comercial V1.

URL estável:

`https://morenumtegra.vercel.app/`

Permitido após aprovação/merge do estado correspondente em `main`:

- promover Preview validado para Production;
- fazer redeploy da `main` aprovada em Production quando necessário;
- testar publicamente em desktop/mobile;
- usar essa URL como referência de homologação aberta.

Não interpretar essa autorização como permissão automática para Green Sales, custom domain/DNS ou indexação.

## 3. Regras de interpretação

- `Preview Ready` != `Preview aprovado`.
- `Preview aprovado` != `Vercel Production atualizada`.
- `Vercel Production homologada` != `Green publicada`.
- `main mergeada` != `Green publicada`.
- `Form 46 conhecido` != `form customizado necessário`.
- `YouTube disponível` != `click-out aceitável`.
- `dado presente em tabela/ZIP` != `dado automaticamente atual`.
- `tool capability` != `authorization`.
- `main` integrada é fonte canônica; branch/PR é proposta até merge.

## 4. Sequência V1 atual

```text
CHANGE/BRANCH
-> VERCEL PREVIEW
-> OWNER VALIDATION
-> MERGE MAIN
-> VERCEL PRODUCTION HOMOLOGATION
-> PUBLIC MOBILE/FUNCTION/SEO/PERF VALIDATION
-> COMMERCIAL DATA REVALIDATION
-> RELEASE SHA
-> GREEN BUILDER PUBLICATION GATE
-> GREEN COMMERCIAL V1
```

Domínio/DNS e integrações futuras permanecem fluxos separados.
