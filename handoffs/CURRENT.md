# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-08-24`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver live antes de agir
- Baseline funcional vigente: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica vigente após integração desta revisão: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- ADR aplicável: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`

## 1. Estado atual

A arquitetura V1 portátil continua HTML/CSS/JavaScript vanilla. A decisão nova do proprietário clarifica a topologia real da Green Sales: a produção é montada em módulos do builder, com formulário nativo entre blocos HTML.

A PR #6 contém o primeiro protótipo Vercel e permanece Draft. Esse protótipo comprovou a direção visual escura/contraste branco, mas não é ainda o artefato final da Green porque usa um HTML monolítico e formulário customizado de laboratório.

## 2. Composição alvo Green

```text
HTML 01 inicial
-> bloco nativo Form 46
-> HTML 02 pós-form / CTA para o formulário
-> HTML 03 footer
+ CSS global
+ JavaScript global
```

Estrutura alvo no repositório:

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

O Preview Vercel monta os snippets exatos e usa somente um mock visual não transmissor do Form 46.

## 3. Vídeo

O clique que abre YouTube fora da página não atende ao alvo.

Comportamento aceito:

- vídeo rodando in-page;
- autoplay mudo quando permitido;
- loop;
- `playsinline` no mobile;
- poster/fallback;
- player não crítico para LCP e para os fluxos principais.

Se houver arquivo MP4/WebM autorizado em GDigital/S3, preferir `<video>`. Caso contrário, usar embed `youtube-nocookie.com` in-page.

## 4. Portfólio

O ZIP enviado pelo proprietário contém 19 cards e duas variantes de hero: campanha More em um Tegra e Château Jardin.

Esse material deve ser usado como inventário de migração para evitar regressão do catálogo, mas cada dado visível deve ser validado antes de produção. O primeiro protótipo com somente ELO Duo não representa o escopo final.

## 5. Fluxo operacional

```text
GitHub main
-> feat/initial-product-implementation
-> composição modular Green-compatible
-> Vercel Preview
-> testes/validação mobile
-> release SHA
-> montagem controlada na Green Sales
```

## 6. Limites

Continuam fora do escopo sem gate específico:

- Vercel Production como produção V1;
- domínio/DNS;
- analytics/pixels/tags;
- FECH.AI/n8n/Make/Ads;
- CMS/database/backend próprio;
- segredo/token client-side;
- dados comerciais ou inventário não verificados.

## 7. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

Após a V2.1/ADR entrar em `main`, sincronizar a branch da PR #6 e reestruturar a implementação em blocos Green + Preview compositor, preservando a direção visual escura e recuperando o portfólio validado.