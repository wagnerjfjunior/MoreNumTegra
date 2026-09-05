# Bootstrap Canônico — MoreNumTegra

> Ponto de entrada operacional para iniciar ou retomar o projeto sem depender do histórico de uma conversa.

## 1. Identificação

- Projeto: `MoreNumTegra`
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`
- Branch canônica: `main`
- Baseline funcional vigente: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica vigente após integração desta revisão: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Baseline técnica anterior: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- ADR de composição Green: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Data de referência: `2026-08-29`

## 2. Regra de canonicalidade

A fonte canônica do estado integrado do MoreNumTegra é `main`.

Em caso de divergência:

1. lifecycle GitHub, HEAD/base/checks/mergeability são resolvidos live;
2. requisitos funcionais vêm da baseline funcional vigente integrada;
3. arquitetura/stack/topologia Green e fluxo Vercel vêm da baseline técnica vigente e ADRs integrados;
4. `docs/NEXT_SAFE_ACTION.md` define a única próxima ação segura;
5. branches/PRs são propostas até merge;
6. informação ausente não é preenchida por inferência;
7. conflito material usa a interpretação mais restritiva até reconciliação.

## 3. Ordem mínima de leitura

1. `handoffs/CURRENT.md`
2. `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
3. `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
4. `docs/baseline/TECHNICAL_BASELINE_V2_1.md` para decisões não supersedidas
5. `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
6. quando Search/conversion 2026-08-29 for material: `docs/search/SEARCH_CONVERSION_PACKAGE_CONTRACT_2026-08-29.md`
7. `docs/PROJECT_STATUS.md`
8. `docs/NEXT_SAFE_ACTION.md`
9. `docs/BLOCKED_ACTIONS.md`

## 4. Arquitetura V1

- HTML5 semântico;
- CSS mobile-first;
- JavaScript vanilla;
- sem framework/bundler/backend obrigatório no V1;
- GitHub `main` = fonte canônica;
- Vercel Preview = teste intermediário;
- Vercel Production = homologação pública estável;
- Green Sales = produção comercial V1 via builder;
- mobile-first, SEO-first e performance-first.

Canonical public homologation URL:

`https://morenumtegra.vercel.app/`

Preservar:

```text
VERCEL_PREVIEW != VERCEL_PRODUCTION_HOMOLOGATION
VERCEL_PRODUCTION_HOMOLOGATION != GREEN_COMMERCIAL_PRODUCTION
MAIN_MERGED != GREEN_PUBLISHED
```

A unidade de publicação Green é:

```text
HTML 01 inicial
-> Form 46 nativo Green Sales
-> HTML 02 pós-form/CTA
-> HTML 03 footer
+ CSS global
+ JavaScript global
```

Estrutura canônica:

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

## 5. Formulário Green V1

Produção comercial usa o bloco de formulário nativo da Green Sales associado ao contrato conhecido:

- tenant_id = `313`
- form_id = `46`
- title = `MoreEmUmTegra`
- campos: `nome`, `email`, `telefone`

Não substituir o lifecycle nativo por `fetch` customizado enquanto o bloco nativo resolver a captação.

O HTML 01 expõe `#formulario` imediatamente antes do bloco nativo. Vercel usa somente mock não transmissor do formulário; nunca transmitir PII real no laboratório/homologação.

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

O vídeo deve permanecer dentro da página.

Preferência:

1. MP4/WebM autorizado em GDigital/S3 com `<video muted autoplay loop playsinline>` e fallback;
2. se só houver YouTube, iframe `youtube-nocookie.com` in-page com autoplay mudo, loop e `playsinline`.

Falha do player não pode bloquear catálogo, filtros, CTAs ou formulário.

## 8. Catálogo e preços

O catálogo integrado contém 21 empreendimentos únicos; a home pode exibir mais de um card/oferta do mesmo empreendimento quando houver tese comercial documentada. Dados comerciais, preço, disponibilidade, metragem, estágio e condições devem ser revalidados antes da Green comercial.

Valores exibidos como `A partir de` são referências; o cenário final depende de unidade, tabela, entrada, fluxo, forma de pagamento e negociação.

Não inventar preço, disponibilidade, metragem, endereço ou condição comercial.

## 9. Fluxo operacional

```text
feature/change
-> Vercel Preview
-> validação do proprietário
-> merge GitHub main
-> Vercel Production em https://morenumtegra.vercel.app/
-> testes públicos/mobile/funcionais
-> freeze SHA/release
-> montagem controlada na Green Sales
```

Depois de uma alteração aprovada e integrada em `main`, manter uma versão antiga em Vercel Production constitui drift de homologação e deve ser corrigido antes do teste público final.

Vercel Production deve permanecer `noindex, nofollow` salvo decisão SEO específica.

## 10. Integração SES / SFJM

O Specialist Engineering System (SES) é camada externa. Não substitui a autoridade do projeto.

Decisão de Search vigente no SES:

```text
ADOPTION_STATUS: ADOPTED
SEARCH_EXECUTION_MODE: PROJECT_LOCAL_CROSS_PROJECT_SERVICE
SERVICE_PROVIDER_PROJECT_ID: blogs-sites-portais-seo
CURRENT_PROVIDER_ROLES:
- seo_strategy
- technical_seo
- content_semantic_seo
- seo_analytics_growth
- paid_search_sem

FUTURE_SERVICE_INTENT_ONLY:
- local_seo
- authority_digital_pr
```

Para estado atual de adoção, resolver SES `projects/SPECIALIST_ADOPTION_MATRIX_CURRENT.md` -> versão corrente e `projects/morenumtegra/PROJECT_ADAPTER.md`. A matriz é snapshot de governança; o Project Adapter é o detalhe SES-side; este repositório continua dono da verdade e autoridade do MoreNumTegra.

Para trabalho mediado pelo SES, resolver também `core/protocols/MANUAL_SPECIALIST_HANDOFF_CONTRACT.md` no SES live quando houver consulta manual/copy-paste:

1. resolver o projeto em `projects/REGISTRY.md` por identificador explícito;
2. o Project Adapter deve apontar para este bootstrap/entrypoints;
3. nenhum arquétipo é adotado automaticamente;
4. role só é adotada por mapeamento explícito `ROLE -> ARCHETYPE_ID` no Project Adapter SES com `ADOPTION_STATUS: ADOPTED`; provider/delegação, quando existir, é metadata project-local separada;
5. para uma role `ADOPTED` com `EXECUTION_MODE: PROJECT_LOCAL_CROSS_PROJECT_SERVICE`, resolver também `SERVICE_PROVIDER_PROJECT_ID`, o Project Adapter do provider e o contexto live de ambos os projetos antes da execução;
6. role ausente/desconhecida/não adotada falha como `SPECIALIST_ROLE_NOT_ADOPTED`, sem fuzzy/fallback implícito;
7. não inventar registry/skill/override project-local ausente;
8. resolução de role, adoção, provider, roteabilidade, execução e autorização são estados distintos;
9. para qualquer specialist SES selecionado em handoff manual, `SPECIALIST_TARGET_NAME = ARCHETYPE_REGISTRY.CANONICAL_NAME`; labels legacy/project-local não podem substituir a identidade operacional do destino.

Preservar:

```text
REGISTERED != ADOPTED
ADOPTED != PROJECT_CONTEXT_READY
ROUTABLE != EXECUTED
PROJECT_CONTEXT_READY != AUTHORIZED_TO_MUTATE
TOOL_CAPABILITY != AUTHORIZATION
SPECIALIST_TARGET_NAME = ARCHETYPE_REGISTRY.CANONICAL_NAME
LEGACY_ALIAS != SPECIALIST_TARGET_NAME
CROSS_PROJECT_SERVICE != PROJECT_OWNERSHIP_TRANSFER
SEARCH_RECOMMENDATION != IMPLEMENTATION_AUTHORIZATION
BUDGET_RECOMMENDATION != SPEND_AUTHORIZATION
CAMPAIGN_DESIGNED != CAMPAIGN_PUBLISHED
```

## 10.1 Boundary — consumer consultation vs SES release lifecycle

MoreNumTegra must not replace its own next-safe-action chain with SES candidate certification work merely because a newer/noncurrent specialist runtime candidate exists.

```text
ADOPTED ROLE + ACTIVE ARCHETYPE + CURRENT SES LEDGER YES
→ CONSULTATION ELIGIBLE

NONCURRENT SES CANDIDATE EXISTS
!= MORENUMTEGRA BLOCKED

CONSUMER_RECERTIFICATION_DETOUR_FORBIDDEN = YES
```

An exact runtime fingerprint becomes a blocker only when explicitly required by the MoreNumTegra task or authority.

## 11. Gates separados

Exigem decisão/gate próprio:

- publicação efetiva na Green antes da homologação pública validada;
- domínio/DNS customizado;
- analytics/pixels/tags;
- CMS/database/backend próprio;
- FECH.AI/n8n/Make/Ads;
- expansão material de produto;
- segredo/token no cliente.

## 12. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.


## 13. Search + Conversion package 2026-08-29

Contrato aprovado pelo Product Authority:

`docs/search/SEARCH_CONVERSION_PACKAGE_CONTRACT_2026-08-29.md`

Esse contrato cria uma exceção delimitada ao P0-A anterior para:

- award copy;
- dois cards Nova Vivere na mesma home;
- unidade 708 / 105 m² / R$ 1.129.900 à vista;
- title/meta description;
- canonical comercial via JavaScript;
- OG/Twitter;
- JSON-LD `WebSite + WebPage`.

Não autoriza merge, Green, DNS, Search Console, analytics, SEM ou schema adicional.

`PACKAGE_APPROVED != READY`

`READY != MERGE`

`MERGE != GREEN`
