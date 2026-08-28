# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-28`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Estado: `P0A_GREEN_METADATA_JS_CORRECTION`

## 1. Contexto resolvido

O handoff Search foi concluído pelo consumer e a recomendação do provider está integrada em:

`wagnerjfjunior/Blogs-sites-portais-seo@c20c15ce6f591071b3ec5236291d7ed6e92934bf`

MoreNumTegra continua Product Authority.

O escopo P0-A autorizado é limitado a canonicalidade comercial e metadata, sem DNS, analytics, Search Console, JSON-LD, SEM, Ready, merge ou publicação fora de gate.

Contrato de implementação:

`docs/search/P0A_CANONICAL_METADATA_CONTRACT_2026-08-28.md`

## 2. Única próxima ação segura

Executar a correção do P0-A no artefato que realmente é copiado para a Green:

`src-greenn/moretegra.js`

Fluxo obrigatório:

1. Draft PR a partir de `main@698a9be2fa385e0e10534ab88aceda0de49eb11c`;
2. Vercel Preview do head exato;
3. validar que o Preview inicia com metadata de laboratório e, após carregar `moretegra.js`, apresenta:
   - title `Apartamentos Tegra em São Paulo | More em um Tegra`;
   - meta description P0-A;
   - `noindex,nofollow` preservado;
   - nenhum tracking/schema/canonical novo introduzido pelo JS;
4. após gate Ready separado, merge separado;
5. validar Vercel Production pública no novo `main`;
6. somente então o owner copia manualmente para a Green o `src-greenn/moretegra.js` aprovado;
7. owner publica/valida Green e devolve o resultado;
8. executar smoke READ_ONLY da produção quando a superfície de leitura permitir.

Não copiar novamente HTML 01, HTML 02, Footer ou CSS quando o diff aprovado não os alterar.

## 3. Estado funcional já aprovado

Não repetir como blocker:

- domínio raiz HTTPS;
- HTTP -> HTTPS;
- `www` com HTTPS;
- navegação page-level `www -> raiz`;
- favicon;
- catálogo;
- filtros desktop/mobile;
- busca;
- WhatsApp;
- Form 46;
- CTAs flutuantes.

O redirect `www` não é 301/308 comprovado.

## 4. P0-A

Target comercial:

`https://moretegra.com.br/`

Title:

`Apartamentos Tegra em São Paulo | More em um Tegra`

Meta description:

`Compare empreendimentos Tegra em São Paulo por região, estágio e faixa de valor. Veja lançamentos, imóveis em construção e prontos para morar e fale com a Tegra Vendas.`

O processo operacional da propriedade usa os artefatos `src-greenn/`; não depende de MCP ou automação Green. Title e meta description deste P0-A serão aplicados pelo JavaScript versionado que o owner copia manualmente para a Green.

Canonical e redirect 301/308 permanecem fora desta correção.

## 5. Condições de parada

Parar se:

- Vercel Preview não corresponder ao head exato;
- `noindex` for removido da homologação;
- canonical apontar para Vercel ou hostname divergente;
- surgir mutação de catálogo/Form 46;
- a solução exigir DNS;
- surgir canonical novo no JavaScript desta correção;
- surgir analytics, Search Console, JSON-LD ou SEM;
- for necessária publicação Green antes de merge;
- houver divergência material entre provider recommendation e consumer implementation.
