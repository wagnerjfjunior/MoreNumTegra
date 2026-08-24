# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-08-24`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver live antes de agir
- Baseline funcional vigente: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica vigente após integração desta revisão: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Baseline técnica anterior: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- ADR aplicável: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`

## 1. Estado atual

A PR #6 foi mergeada em `main`. A implementação canônica já usa HTML/CSS/JavaScript vanilla e composição modular compatível com o builder Green Sales.

Arquivos integrados:

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

O catálogo integrado contém 19 empreendimentos, filtros por estágio/zona/ticket, badges, preços de referência, vídeo in-page, CTAs e mock Vercel não transmissor do Form 46.

## 2. Composição Green comercial

```text
HTML 01 inicial
-> bloco nativo Form 46
-> HTML 02 pós-form
-> HTML 03 footer
+ CSS global
+ JavaScript global
```

Produção Green usa o Form 46 nativo. O JavaScript não deve interceptar o submit nativo.

## 3. Vercel

O projeto usa dois ambientes operacionais:

- **Vercel Preview**: validação intermediária de branch/change;
- **Vercel Production**: homologação pública estável após aprovação e merge em `main`.

URL pública de homologação:

`https://morenumtegra.vercel.app/`

Vercel Production não é a produção comercial V1. Green Sales continua sendo a produção comercial.

Fluxo:

```text
change
-> Preview
-> aprovação
-> merge main
-> Vercel Production homologação pública
-> testes abertos/mobile
-> release SHA
-> Green Sales
```

## 4. Situação de homologação

A última implementação aprovada foi mergeada em `main`, porém o Vercel Production pode permanecer apontando para um deployment antigo até promoção/redeploy explícito. Quando isso ocorrer, classificar como `HOMOLOGATION_DRIFT`.

A próxima ação é alinhar `https://morenumtegra.vercel.app/` ao estado aprovado de `main`, depois executar os testes públicos finais.

## 5. Dados comerciais

Os preços atuais são referências de teste provenientes da tabela fornecida pelo proprietário. Casos sem ticket seguro permanecem `Sob consulta`; itens explicitamente esgotados permanecem `Esgotado`.

Antes da Green comercial, revalidar todos os fatos visíveis relevantes, especialmente preço, disponibilidade, metragem, estágio e condições.

## 6. Vídeo / mídia

- vídeo in-page;
- autoplay mudo quando permitido;
- loop;
- `playsinline`;
- poster/fallback;
- mídia não crítica;
- imagens de cards usam origem real quando possível e fallback resiliente.

## 7. Limites

Continuam fora do escopo sem gate específico:

- publicação Green antes da homologação pública final;
- custom domain/DNS;
- analytics/pixels/tags;
- FECH.AI/n8n/Make/Ads;
- CMS/database/backend próprio;
- segredo/token client-side;
- dados comerciais não verificados.

## 8. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.
