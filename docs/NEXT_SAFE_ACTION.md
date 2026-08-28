# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-28`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Estado: `P0A_CANONICAL_METADATA_IMPLEMENTATION`

## 1. Contexto resolvido

O handoff Search foi concluído pelo consumer e a recomendação do provider está integrada em:

`wagnerjfjunior/Blogs-sites-portais-seo@c20c15ce6f591071b3ec5236291d7ed6e92934bf`

MoreNumTegra continua Product Authority.

O escopo P0-A autorizado é limitado a canonicalidade comercial e metadata, sem DNS, analytics, Search Console, JSON-LD, SEM, Ready, merge ou publicação fora de gate.

Contrato de implementação:

`docs/search/P0A_CANONICAL_METADATA_CONTRACT_2026-08-28.md`

## 2. Única próxima ação segura

Para a revisão P0-A aberta a partir do `main` atual:

1. resolver a Draft PR e o head exato live;
2. aguardar/inspecionar o Vercel Preview do head exato;
3. validar no Preview:
   - `noindex,nofollow` preservado;
   - title exato;
   - meta description exata;
   - canonical para `https://moretegra.com.br/`;
   - ausência de tracking/schema fora de escopo;
4. parar após a validação e exigir o próximo gate aplicável.

Não aplicar a Green antes de merge e do gate de produção correspondente.

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

A documentação Green comprova controle nativo de Título e Descrição para Buscadores.

Canonical e redirect 301/308 na Green permanecem `CAPABILITY_NOT_PROVEN`.

## 5. Condições de parada

Parar se:

- Vercel Preview não corresponder ao head exato;
- `noindex` for removido da homologação;
- canonical apontar para Vercel ou hostname divergente;
- surgir mutação de catálogo/Form 46;
- a solução exigir DNS;
- canonical depender de body tag ou JS client-side não aprovado;
- surgir analytics, Search Console, JSON-LD ou SEM;
- for necessária publicação Green antes de merge;
- houver divergência material entre provider recommendation e consumer implementation.
