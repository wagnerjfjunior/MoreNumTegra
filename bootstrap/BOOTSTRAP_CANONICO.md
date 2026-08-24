# Bootstrap Canônico — MoreNumTegra

> Ponto de entrada operacional para iniciar ou retomar o projeto sem depender do histórico de uma conversa.

## 1. Identificação

- Projeto: `MoreNumTegra`
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`
- Branch canônica: `main`
- Baseline funcional vigente após integração desta revisão: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline funcional supersedida: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Baseline técnica vigente após integração desta revisão: `docs/baseline/TECHNICAL_BASELINE_V2.md`
- Baseline técnica supersedida: `docs/baseline/TECHNICAL_BASELINE_V1.md`
- Data de referência: `2026-08-23`

## 2. Regra de canonicalidade

A fonte canônica do estado integrado do MoreNumTegra é `main`.

Em caso de divergência:

1. lifecycle GitHub, HEAD/base/checks/mergeability são resolvidos live;
2. requisitos funcionais vêm da baseline funcional vigente integrada;
3. arquitetura/stack vêm da baseline técnica vigente integrada;
4. `docs/NEXT_SAFE_ACTION.md` define a única próxima ação e seu escopo autorizado;
5. branches/PRs são propostas até merge;
6. informação ausente não é preenchida por inferência;
7. conflito material usa a interpretação mais restritiva até reconciliação.

## 3. Ordem mínima de leitura

1. `handoffs/CURRENT.md`
2. `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
3. `docs/baseline/TECHNICAL_BASELINE_V2.md`
4. `docs/PROJECT_STATUS.md`
5. `docs/NEXT_SAFE_ACTION.md`
6. `docs/BLOCKED_ACTIONS.md`
7. `README.md`

Se as baselines V2 ainda não estiverem em `main`, as baselines V1 continuam canônicas e a implementação portátil HTML/CSS/JS deve parar até a revisão ser integrada.

## 4. Arquitetura V1 vigente após V2

- HTML5 semântico;
- CSS mobile-first;
- JavaScript vanilla;
- sem framework/bundler/backend obrigatório no V1;
- artefatos principais em `src-greenn/`;
- mesmos HTML/CSS/JS validados no GitHub/Vercel e usados na Greenn com mínima adaptação;
- catálogo local/versionado;
- Vercel = Preview/homologação;
- Greenn = produção V1;
- formulário Greenn Form 46 = captação V1 conforme contrato verificado;
- FECH.AI/n8n/Make/Ads permanecem fora do escopo até autorização específica.

## 5. Performance / SEO / mobile

Mobile é o primeiro caminho de aceite. O relato `>90% mobile` permanece USER_REPORTED até analytics comprovar.

Targets:

- LCP <= 2,5 s;
- INP <= 200 ms;
- CLS <= 0,1.

SEO deve ser estrutural: metadata, HTML semântico, H1 único, headings coerentes, conteúdo textual indexável, alt, robots, canonical quando o domínio estiver aprovado, Open Graph/Twitter e JSON-LD somente para fatos verificados.

## 6. Formulário Greenn V1

Contrato verificado pelo embed:

- tenant_id = `313`
- form_id = `46`
- title = `MoreEmUmTegra`
- campos: `nome`, `email`, `telefone`
- endpoint: `POST https://back.gdigital.com.br/form/register`

Implementar validação, máscara/entrada mobile, estado `Enviando...`, proteção contra duplo clique, sucesso, erro e falha de rede. Nunca expor tokens/segredos.

## 7. Identidade Tegra

- amarelo: `#EBB92E`
- logo amarelo transparente: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp`
- logo cinza: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Cinza.webp`

Não substituir o logo por um `T` genérico.

## 8. Autorização vigente após V2 integrada

Permitido:

- branch `feat/initial-product-implementation` a partir do SHA exato live;
- implementação V1 portátil;
- testes/build/checks;
- Vercel Preview não-production;
- uso do formulário Greenn verificado com dados de teste não sensíveis;
- preparação de release rastreável.

Gate separado:

- publicação/alteração efetiva da página Greenn após Preview validado;
- custom domain/DNS;
- WhatsApp final não verificado;
- analytics/pixels/tags;
- CMS/database;
- FECH.AI/n8n/Make/Ads;
- expansão material.

## 9. Integração SES / SFJM

SES não substitui a autoridade do projeto. Preservar:

```text
REGISTERED != ADOPTED
ADOPTED != PROJECT_CONTEXT_READY
ROUTABLE != EXECUTED
PROJECT_CONTEXT_READY != AUTHORIZED_TO_MUTATE
TOOL_CAPABILITY != AUTHORIZATION
```

## 10. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

Após V2 integrada: resolver `main` live, alinhar/recriar a branch `feat/initial-product-implementation` somente se não houver commits únicos, implementar `src-greenn/moretegra.html`, `.css`, `.js`, validar e parar antes da publicação Greenn.

## 11. Regra anti-loop

Não abrir PR apenas para registrar lifecycle transitório. Registrar somente mudança material de requisito, arquitetura, risco, autorização, blocker ou próxima ação.
