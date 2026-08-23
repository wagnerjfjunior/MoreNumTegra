# Bootstrap Canônico — MoreNumTegra

> Ponto de entrada operacional para iniciar ou retomar o projeto sem depender do histórico de uma conversa.

## 1. Identificação

- Projeto: `MoreNumTegra`
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`
- Branch canônica: `main`
- Âncora inicial pré-SFJM: `3f45ac60352f917f32c6b9d52eecae414313cb68`
- Onboarding SFJM integrado em: `2819cc158d8775137c992fa2fd147e1c3806e38e`
- Baseline funcional V1 integrada em: `862e734dac9c60eceae8c311e30304d14efd687a`
- Baseline técnica V1: `docs/baseline/TECHNICAL_BASELINE_V1.md` quando presente em `main`
- Data de referência: `2026-08-23`
- Autoridade pelo estado do projeto: proprietário/responsável pelo projeto

## 2. Regra de canonicalidade

A fonte canônica do MoreNumTegra é o conteúdo versionado e integrado em `main`.

Em caso de divergência:

1. lifecycle GitHub, HEAD/base/checks/mergeability devem ser resolvidos live;
2. requisitos funcionais vêm da baseline funcional integrada;
3. arquitetura/stack vêm da baseline técnica integrada;
4. `docs/NEXT_SAFE_ACTION.md` define a única próxima ação e seu escopo autorizado;
5. branches/PRs são propostas até merge;
6. informação ausente não é preenchida por inferência;
7. conflito material usa a interpretação mais restritiva até reconciliação.

## 3. Ordem mínima de leitura

1. `handoffs/CURRENT.md`
2. `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
3. `docs/baseline/TECHNICAL_BASELINE_V1.md`
4. `docs/PROJECT_STATUS.md`
5. `docs/NEXT_SAFE_ACTION.md`
6. `docs/BLOCKED_ACTIONS.md`
7. `README.md`

Se a baseline técnica ainda não estiver presente em `main`, resolva a PR live e não trate a implementação como liberada.

## 4. Estado material esperado após integração da baseline técnica

- requisitos funcionais V1 estão canônicos;
- arquitetura técnica V1 está canônica;
- stack alvo: Next.js 16.x App Router + TypeScript strict + Node 24 LTS;
- renderização é static-first/server-first;
- catálogo V1 é local, tipado e versionado;
- DB/CMS não são necessários no V1;
- mobile é o primeiro caminho de aceite;
- targets de campo: LCP <=2.5s, INP <=200ms, CLS <=0.1;
- WCAG 2.2 AA é o target de acessibilidade;
- Vercel opera Preview-first;
- implementação V1 em branch dedicada está autorizada após gate live;
- Production e domínio/DNS continuam gates separados.

## 5. Estado Vercel observado na baseline técnica

- team conectado: `team_WIH0gs3BUjcZdk59oPViSjEm`;
- plano observado: `Hobby`;
- projetos observados: nenhum.

Não presuma que esse snapshot permanece atual: resolver Vercel live antes de criar Preview.

## 6. Autorização vigente

### Permitido após baseline técnica integrada

- leitura/inspeção;
- branch `feat/initial-product-implementation`;
- implementação V1 segundo as baselines;
- testes/build;
- formulário seguro de Preview sem PII real;
- Vercel Preview após gate técnico.

### Exige autorização separada

- Vercel Production;
- production branch/release operation;
- custom domain/DNS;
- lead real/CRM;
- WhatsApp destination final não verificado;
- analytics/pixels/tags;
- CMS/database além do V1;
- campanhas;
- segredos/dados pessoais fora do contrato autorizado;
- expansão material de produto.

## 7. Próxima ação segura

Registro autoritativo: `docs/NEXT_SAFE_ACTION.md`.

Resumo derivado: quando a baseline técnica estiver integrada e live, criar `feat/initial-product-implementation` do SHA exato e implementar o V1; validar Preview e parar antes de Production.

## 8. Instrução de retomada

Antes de agir:

1. resolver `main` live;
2. confirmar as duas baselines integradas;
3. ler handoff/status/NEXT/BLOCKED;
4. verificar se a ação pretendida cabe na autorização;
5. se implementação ainda não tiver branch, criar do SHA exato de `main`;
6. antes de Preview, resolver Vercel live e passar build/test gate;
7. não usar `--prod`, não alterar domínio/DNS e não transmitir PII real sem gate separado.

## 9. Regra anti-loop

Não abrir PR apenas para registrar:

- que a PR anterior mergeou;
- que `main` avançou;
- que uma branch mudou de Draft/Ready;
- que um Preview ganhou uma nova URL.

Registrar somente mudança material de requisito, arquitetura, risco, autorização, blocker ou próxima ação.

## 10. Critério de atualização

Atualizar este bootstrap somente se mudar canonicalidade, ordem mínima, baseline vigente, autorização, bloqueio relevante ou próxima ação semântica.