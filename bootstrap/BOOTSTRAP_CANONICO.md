# Bootstrap Canônico — MoreNumTegra

> Ponto de entrada operacional para iniciar ou retomar o projeto sem depender do histórico de uma conversa.

## 1. Identificação

- Projeto: `MoreNumTegra`
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`
- Branch canônica: `main`
- Baseline funcional vigente: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica vigente após integração desta revisão: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- Baseline técnica anterior: `docs/baseline/TECHNICAL_BASELINE_V2.md`
- ADR de composição Green: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Data de referência: `2026-08-24`

## 2. Regra de canonicalidade

A fonte canônica do estado integrado do MoreNumTegra é `main`.

Em caso de divergência:

1. lifecycle GitHub, HEAD/base/checks/mergeability são resolvidos live;
2. requisitos funcionais vêm da baseline funcional vigente integrada;
3. arquitetura/stack/topologia Green vêm da baseline técnica vigente e ADRs integrados;
4. `docs/NEXT_SAFE_ACTION.md` define a única próxima ação segura;
5. branches/PRs são propostas até merge;
6. informação ausente não é preenchida por inferência;
7. conflito material usa a interpretação mais restritiva até reconciliação.

## 3. Ordem mínima de leitura

1. `handoffs/CURRENT.md`
2. `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
3. `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
4. `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
5. `docs/PROJECT_STATUS.md`
6. `docs/NEXT_SAFE_ACTION.md`
7. `docs/BLOCKED_ACTIONS.md`
8. baselines anteriores apenas para histórico quando necessário.

## 4. Arquitetura V1

- HTML5 semântico;
- CSS mobile-first;
- JavaScript vanilla;
- sem framework/bundler/backend obrigatório no V1;
- GitHub = fonte canônica;
- Vercel = laboratório/Preview;
- Green Sales = produção V1 via builder;
- mobile-first, SEO-first e performance-first.

A unidade de publicação Green não é um único HTML. A composição confirmada pelo proprietário é:

```text
HTML 01 inicial
-> Form 46 nativo Green Sales
-> HTML 02 pós-form/CTA
-> HTML 03 footer
+ CSS global
+ JavaScript global
```

Estrutura alvo:

```text
src-greenn/
  blocks/
    01-html-inicial.html
    02-html-pos-form.html
    03-footer.html
  moretegra.css
  moretegra.js
  preview/
    index.html
```

Cada bloco HTML deve ser autocontido. Não abrir uma tag em um módulo esperando fechá-la em outro.

## 5. Formulário Green V1

Produção usa o bloco de formulário nativo da Green Sales associado ao contrato conhecido:

- tenant_id = `313`
- form_id = `46`
- title = `MoreEmUmTegra`
- campos: `nome`, `email`, `telefone`

Não substituir o lifecycle nativo do formulário por `fetch` customizado na produção enquanto o bloco nativo resolver a captação.

O HTML 01 deve expor uma âncora estável, por exemplo `#formulario`, imediatamente antes do bloco nativo para que CTAs posteriores retornem ao formulário sem depender de classes/IDs internos da Green.

Preview Vercel usa somente mock não transmissor do formulário. Nunca transmitir PII real no laboratório.

## 6. Identidade / mobile / performance

- amarelo Tegra: `#EBB92E`;
- logo amarelo transparente: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp`;
- logo cinza: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Cinza.webp`;
- não substituir por `T` genérico.

Mobile é o primeiro caminho de aceite. O relato `>90% mobile` permanece USER_REPORTED até analytics comprovar.

Targets:

- LCP <= 2,5 s;
- INP <= 200 ms;
- CLS <= 0,1.

## 7. Vídeo

O comportamento alvo é vídeo dentro da própria página; não redirecionar o visitante ao YouTube para assistir.

Preferência:

1. MP4/WebM autorizado em GDigital/S3 com `<video muted autoplay loop playsinline>` e fallback;
2. se só houver YouTube, iframe `youtube-nocookie.com` in-page com autoplay mudo, loop e `playsinline`.

Vídeo é não crítico: falha do player não pode bloquear catálogo, filtros, CTAs ou formulário.

## 8. Catálogo

O pacote Green anterior fornecido pelo proprietário contém 19 cards e duas variantes de hero (vídeo e Château Jardin). É insumo de migração, não verdade automática de inventário.

A nova implementação deve recuperar o portfólio validado; não permanecer limitada ao ELO Duo do primeiro protótipo. Antes de publicar cada campo, validar nome, localização, estágio, metragens, mídia e URL quando exibidos.

Não inventar preço, disponibilidade, metragem, endereço ou condição comercial.

## 9. Fluxo

```text
GitHub
-> branch/PR de implementação
-> Vercel Preview simulando a ordem do builder
-> testes mobile/funcionais/SEO/performance
-> aprovação
-> release SHA
-> montagem controlada na Green Sales
```

Não usar Vercel Production como produção V1.

## 10. Integração SES / SFJM

O Specialist Engineering System (SES) é camada externa. Não substitui a autoridade do projeto.

Para trabalho mediado pelo SES:

1. resolver o projeto em `projects/REGISTRY.md` por identificador explícito;
2. o Project Adapter deve apontar para este bootstrap/entrypoints;
3. nenhum arquétipo é adotado automaticamente;
4. role só é adotada por mapeamento explícito `ROLE -> ARCHETYPE_ID` com `ADOPTION_STATUS: ADOPTED`;
5. role ausente/desconhecida/não adotada falha como `SPECIALIST_ROLE_NOT_ADOPTED`, sem fuzzy/fallback implícito;
6. não inventar registry/skill/override project-local ausente;
7. resolução de role, roteabilidade, execução e autorização são estados distintos.

Preservar:

```text
REGISTERED != ADOPTED
ADOPTED != PROJECT_CONTEXT_READY
ROUTABLE != EXECUTED
PROJECT_CONTEXT_READY != AUTHORIZED_TO_MUTATE
TOOL_CAPABILITY != AUTHORIZATION
```

## 11. Gates separados

Exigem decisão/gate próprio:

- publicação efetiva na Green antes de Preview validado;
- domínio/DNS;
- analytics/pixels/tags;
- CMS/database/backend próprio;
- FECH.AI/n8n/Make/Ads;
- expansão material de produto;
- segredo/token no cliente.

## 12. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

Após integração da V2.1/ADR, sincronizar `feat/initial-product-implementation` com `main`, migrar a PR #6 para a composição modular Green, recuperar/validar o portfólio e criar novo Preview antes de qualquer publicação Green.