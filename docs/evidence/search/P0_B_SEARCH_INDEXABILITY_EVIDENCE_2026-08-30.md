# P0-B Search / Indexabilidade — Evidência Live — 2026-08-30

## 1. Escopo

Target comercial:

`https://moretegra.com.br/`

Homologação:

`https://morenumtegra.vercel.app/`

Objetivo do gate:

- comprovar metadata inicial e runtime;
- comprovar crawl/indexability;
- resolver robots/sitemap;
- comprovar isolamento da Vercel;
- caracterizar `www`;
- confirmar estado no Google Search Console.

## 2. Fontes de evidência

Evidência fornecida pelo owner e inspecionada em 2026-08-30:

- HTML inicial `view-source:https://moretegra.com.br/`;
- browser console da produção;
- `https://moretegra.com.br/robots.txt`;
- `https://moretegra.com.br/sitemap.xml`;
- Green Sales editor pages 292/293;
- browser console da Vercel homologation;
- Google Search Console — Domain property `moretegra.com.br`;
- Google Search Console — URL Inspection / Live Test para `https://moretegra.com.br/`.

Este arquivo registra os fatos observados. Não converte observação visual em capability não comprovada.

## 3. Green — HTML inicial

Observado no HTML inicial:

- title: `Apartamentos Tegra em São Paulo | More em um Tegra`;
- meta description correta já server-rendered;
- `og:title` server-rendered;
- `og:image` server-rendered;
- canonical estático: ausente;
- meta robots/noindex: ausente.

Também foi observada uma meta description vazia antes da description correta. Classificação: backlog técnico não bloqueante.

## 4. Green — runtime

Browser console retornou:

```text
title = Apartamentos Tegra em São Paulo | More em um Tegra
description = Compare empreendimentos Tegra em São Paulo por região, estágio e faixa de valor. Veja lançamentos, prontos para morar e opções no premiado Caminhos da Lapa.
canonical = https://moretegra.com.br/
robots = undefined
schema = WebSite + WebPage JSON-LD presente
```

Classificação:

```text
RUNTIME_TITLE = PASS
RUNTIME_DESCRIPTION = PASS
RUNTIME_CANONICAL = PASS
RUNTIME_META_ROBOTS = ABSENT
RUNTIME_JSON_LD = PASS
```

## 5. robots.txt

Conteúdo observado:

```text
User-agent: *
Disallow: /user
```

Adjudicação:

- robots presente;
- root não bloqueada;
- `/user` bloqueado;
- diretiva `Sitemap:` ausente.

## 6. sitemap.xml

`https://moretegra.com.br/sitemap.xml` exibiu a página Nuxt `Página não encontrada`.

O screenshot isolado não provou o status HTTP do endpoint.

Search Console posteriormente informou:

`Nenhum sitemap de referência foi detectado`.

Adjudicação:

`SITEMAP_AVAILABLE = NO`

Para a home única atual, ausência de sitemap não foi material para indexação.

## 7. www

Green Sales page 293 foi observada vinculada a:

`www.moretegra.com.br`

Configuração:

- redirect por tempo: ativo;
- atraso configurado: 1 segundo;
- destino: `https://moretegra.com.br`.

HAR/live evidence anterior classificou:

```text
WWW_FUNCTIONAL_REDIRECT = PASS
WWW_HTTP_301_308 = NOT_IMPLEMENTED / NOT_PROVEN
```

Não tratar redirect page-level como 301/308.

## 8. Vercel homologation

Browser console em `https://morenumtegra.vercel.app/` retornou:

```text
title = Apartamentos Tegra em São Paulo | More em um Tegra
robots = noindex,nofollow
canonical = https://moretegra.com.br/
```

Adjudicação:

```text
VERCEL_NOINDEX_NOFOLLOW = PASS
VERCEL_CANONICAL_TO_COMMERCIAL = PASS
VERCEL_INDEXABILITY = BLOCKED_AS_DESIGNED
```

## 9. Google Search Console

Property observada:

`moretegra.com.br`

Tipo visualizado:

Domain property.

URL inspecionada:

`https://moretegra.com.br/`

### 9.1 Live Test

Search Console mostrou:

- Googlebot Smartphone;
- rastreamento permitido: Sim;
- busca da página: Com êxito;
- indexação permitida: Sim;
- resposta HTTP: `200 OK`;
- todos os recursos carregados;
- um ou mais vídeos detectados.

Warning JavaScript observado:

`Unrecognized feature: 'web-share'`

Não bloqueou fetch, rendering, crawling ou indexability.

### 9.2 Índice do Google

Search Console mostrou:

- `O URL está no Google`;
- `A página está indexada`;
- HTTPS: `A página é exibida por HTTPS`;
- último rastreamento: `30 de ago. de 2026, 19:37:35`;
- rastreada como: `Googlebot Smartphone`;
- rastreamento permitido: `Sim`;
- busca de página: `Com êxito`;
- indexação permitida: `Sim`;
- sitemap: `Nenhum sitemap de referência foi detectado`;
- página de referência: `http://moretegra.com.br/`;
- URL canônico declarado pelo usuário: `https://moretegra.com.br/`;
- URL canônico selecionado pelo Google: `URL inspecionado`.

Adjudicação:

```text
URL_INDEXED = PASS
GOOGLEBOT_FETCH = PASS
CRAWL_ALLOWED = PASS
INDEXING_ALLOWED = PASS
HTTP_200 = PASS
HTTPS = PASS
DECLARED_CANONICAL = https://moretegra.com.br/
GOOGLE_SELECTED_CANONICAL = https://moretegra.com.br/
CANONICAL_ALIGNMENT = PASS
```

## 10. Vídeo

Search Console detectou o vídeo, mas não o indexou como vídeo principal porque ele é conteúdo complementar da página.

Classificação:

```text
VIDEO_DETECTED = PASS
VIDEO_INDEXING_REQUIRED = NO
VIDEO_NOT_PRIMARY_CONTENT = EXPECTED
```

Não alterar a tese da página para forçar video indexing.

## 11. Verdict

`PASS_WITH_RESIDUAL_RISK`

Não há blocker material para crawling ou indexação da home.

Riscos residuais:

1. canonical client-side, não estático no HTML inicial;
2. sitemap ausente;
3. `www` usa redirect temporizado em vez de 301/308 comprovado;
4. duplicate/empty description markup observado no SSR;
5. warning `web-share` não bloqueante.

## 12. Próxima ação

P0-B não deve ser reaberto por esses riscos não materiais.

Próxima etapa:

`Measurement Foundation`

Measurement permanece sujeita a gate/autorização específica antes de criar ou publicar tracking.
