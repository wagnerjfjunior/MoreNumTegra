# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver live antes de agir
- Onboarding SFJM: `2819cc158d8775137c992fa2fd147e1c3806e38e`
- Baseline funcional V1: integrada em `862e734dac9c60eceae8c311e30304d14efd687a`
- Baseline técnica V1: `docs/baseline/TECHNICAL_BASELINE_V1.md` quando presente em `main`

## 1. Objetivo operacional

Permitir continuidade direta para implementação do MoreNumTegra V1 após integração da baseline técnica, sem voltar a discutir decisões já fechadas e sem permitir que Preview seja confundido com Production.

## 2. Estado confirmado

1. GitHub `main` é a autoridade integrada.
2. A baseline funcional V1 está integrada desde `862e734...`.
3. A baseline técnica candidata define Next.js 16.x App Router, TypeScript strict, Node 24 LTS e arquitetura static-first.
4. O V1 usa catálogo local tipado; banco/CMS não são necessários agora.
5. Mobile é o primeiro caminho de aceite e os targets de campo são LCP <=2.5s, INP <=200ms e CLS <=0.1.
6. O Vercel conectado está no plano Hobby e não possuía projetos no momento da baseline.
7. O primeiro deployment autorizado é Preview; Production e domínio/DNS continuam gates separados.
8. O responsável autorizou implementação após a baseline técnica passar pré-merge e estar integrada.

## 3. Decisões vigentes

| Decisão | Estado | Autoridade |
|---|---|---|
| Next.js 16.x App Router + TypeScript | decidida | technical baseline |
| Node.js 24 LTS | decidida | technical baseline |
| static-first / Server Components by default | decidida | technical baseline |
| catálogo local tipado V1 | decidida | technical baseline |
| sem DB/CMS V1 | decidida | technical baseline |
| formulário Preview sem PII real | decidida | technical baseline |
| WCAG 2.2 AA target | decidida | technical baseline |
| Vercel Preview-first | decidida | technical baseline |
| Production separado do Preview | decidida | autorização do responsável + baseline |
| custom domain/DNS separado | decidida | autorização do responsável + baseline |

## 4. Próxima frente

Quando `TECHNICAL_BASELINE_V1.md` estiver integrada em `main`:

1. resolver `main` live;
2. criar `feat/initial-product-implementation` do SHA exato;
3. implementar o V1;
4. validar build/tests/mobile;
5. criar Preview somente quando o branch estiver buildável;
6. validar Preview;
7. parar antes de Production.

## 5. Limites da implementação autorizada

Permitido:

- código da aplicação V1;
- estilos/componentes;
- catálogo local;
- filtros e badges;
- assets aprovados;
- CTAs sem destino inventado;
- formulário mock/safe Preview;
- testes;
- metadata/sitemap/robots;
- Vercel Preview após gate técnico.

Não permitido nesta autorização:

- Vercel Production;
- domínio/DNS;
- lead real/CRM;
- analytics/pixels/tags;
- campanhas;
- segredos/dados pessoais não autorizados.

## 6. Riscos ativos

| Risco | Controle |
|---|---|
| Next.js patch crítico pendente | versão exata resolvida live no scaffold; não congelar versão vulnerável |
| regressão mobile | Playwright mobile + performance gate |
| mídia pesada/quebrada | vídeo lazy/non-critical; imagem otimizada |
| preview indexado | verificar `X-Robots-Tag: noindex` |
| produção acidental | Production gate separado; não usar `--prod` |
| PII em preview | form local/mock sem transmissão |

## 7. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

Resumo: implementar em `feat/initial-product-implementation` somente depois da presença live da baseline técnica em `main`; Preview autorizado dentro dos limites; Production/domain não.

## 8. Ordem de leitura

1. `bootstrap/BOOTSTRAP_CANONICO.md`
2. `handoffs/CURRENT.md`
3. `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
4. `docs/baseline/TECHNICAL_BASELINE_V1.md`
5. `docs/PROJECT_STATUS.md`
6. `docs/NEXT_SAFE_ACTION.md`
7. `docs/BLOCKED_ACTIONS.md`
8. `README.md`

Se a baseline técnica não estiver em `main`, tratar esta transição como candidata e resolver a PR live.

## 9. Regra de divergência

- lifecycle/HEAD/base/checks: GitHub live;
- requisitos: functional baseline integrada;
- arquitetura: technical baseline integrada;
- próxima ação/autorização operacional: `docs/NEXT_SAFE_ACTION.md`;
- conflito material: interpretação mais restritiva até reconciliação.

## 10. Critério de atualização

Atualizar apenas por mudança material. Não fazer reconciliação documental para registrar lifecycle transitório já resolvível live.

## 11. Prompt curto de retomada

> Resolva `wagnerjfjunior/MoreNumTegra` `main` live. Confirme as baselines funcional e técnica. Leia `docs/NEXT_SAFE_ACTION.md`. Se a baseline técnica estiver integrada e não supersedida, continue a implementação em `feat/initial-product-implementation` dentro dos limites canônicos. Não promova Production nem altere domínio/DNS sem gate separado.