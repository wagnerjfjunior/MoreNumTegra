# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-24`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical candidate: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- ADR candidate: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Estado: `GREENN_BUILDER_TOPOLOGY_MUST_MERGE_BEFORE_IMPLEMENTATION_RESHAPE`

## 1. Ação imediata

Revisar e integrar a V2.1/ADR que canonicalizam a topologia real da Green Sales:

```text
HTML 01
-> Form 46 nativo
-> HTML 02 pós-form/CTA
-> HTML 03 footer
+ CSS global
+ JavaScript global
```

A PR #6 não deve ser mergeada enquanto ainda representar a estrutura monolítica anterior.

## 2. Gate após merge da V2.1/ADR

Antes de alterar a implementação:

1. resolver `main` live;
2. confirmar `TECHNICAL_BASELINE_V2_1.md` e ADR-001 integrados;
3. sincronizar `feat/initial-product-implementation` com o SHA exato de `main` sem perder commits únicos;
4. confirmar que a PR #6 continua Draft;
5. manter Green production bloqueada.

## 3. Implementação autorizada depois do gate

Reestruturar a PR #6 para:

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

Requisitos:

- blocos HTML autocontidos;
- âncora `#formulario` imediatamente antes do Form 46 nativo;
- nenhuma submissão customizada em produção;
- Preview com mock visual do formulário e zero transmissão;
- hero escuro/white headline pode ser preservado;
- vídeo in-page, autoplay mudo quando permitido, loop, playsinline e fallback;
- recuperar o portfólio anterior, validando os campos antes de publicação;
- filtros mobile por estágio e zona/localização;
- badges;
- WhatsApp e `Receber condições`;
- SEO semântico;
- performance e acessibilidade.

## 4. Preview gate

Novo Vercel Preview somente quando:

- os snippets Green estiverem criados;
- o Preview os compuser na ordem real do builder;
- o mock do formulário não enviar dados;
- vídeo ficar dentro da página;
- catálogo renderizar e filtros funcionarem;
- não houver erro primário de runtime/console;
- Preview estiver `noindex, nofollow`;
- deploy for explicitamente `preview`, nunca production.

## 5. Green production gate

Só depois do novo Preview ser validado pelo proprietário:

- congelar SHA/release;
- identificar os 3 blocos HTML, CSS e JavaScript exatos;
- confirmar Form 46 no builder;
- confirmar CTA -> `#formulario`;
- revalidar mobile;
- preservar versão anterior para rollback quando possível;
- publicar de forma controlada.

## 6. Condições de parada

Parar se:

- V2.1/ADR ainda não estiverem em `main`;
- a sincronização da PR #6 ameaçar commits únicos;
- o formulário nativo exigir comportamento desconhecido para os CTAs;
- qualquer projeto exigir dado não verificado para ser exibido;
- o vídeo exigir segredo/token ou solução incompatível com Green;
- Vercel tentar Production;
- surgir necessidade de domínio/DNS, analytics, FECH.AI, n8n, Make, Ads, CMS/database ou backend sem nova decisão.