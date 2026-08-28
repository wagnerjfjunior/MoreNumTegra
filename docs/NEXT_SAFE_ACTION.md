# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-28`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Estado: `SEARCH_PROVIDER_HANDOFF_READY`

## 1. Ação imediata

Entregar o estado live do MoreNumTegra ao provider Search vigente:

`wagnerjfjunior/Blogs-sites-portais-seo`

Modelo de autoridade:

```text
MoreNumTegra = consumer / Product Authority
blogs-sites-portais-seo = Search Center of Expertise / provider
```

O pacote project-local de entrada está em:

`handoffs/SEARCH_PROVIDER_HANDOFF_2026-08-28.md`

O provider deve executar auditoria/recomendação Search sobre a produção live e devolver handoff explícito antes de qualquer implementação material no MoreNumTegra.

## 2. Estado funcional já aprovado

Não repetir como gate bloqueante os itens já comprovados em produção:

- domínio raiz HTTPS;
- HTTP -> HTTPS;
- `www` com Domínio OK e HTTPS válido;
- navegação `www -> raiz` funcional por redirect page-level;
- favicon;
- catálogo;
- filtros desktop/mobile;
- busca por bairro;
- ELO e ODE promocionais;
- WhatsApp;
- Form 46 submit real;
- persistência/origem/vendedor na Green;
- CTAs flutuantes atravessando módulos até o footer.

## 3. Escopo mínimo do handoff Search

O provider deve avaliar e recomendar, sem transferir autoridade do produto:

- canonical de produção;
- tratamento final de `www`, incluindo limitação do redirect atual HTTP 200 + page-level;
- title e meta description;
- Open Graph;
- Twitter metadata quando aplicável;
- robots/indexabilidade;
- sitemap;
- Search Console;
- JSON-LD válido e estritamente factual;
- `WebSite`, `WebPage`, `ItemList` e `FAQPage` somente quando suportados pelo conteúdo real/visível;
- arquitetura de páginas/empreendimentos/bairros;
- Technical SEO;
- conteúdo semântico;
- links internos;
- estratégia de autoridade/backlinks;
- mensuração Search;
- SEM somente como recomendação até autorização separada de campanha/spend.

## 4. Implementação posterior

Após recomendação/handoff aprovado:

```text
Search recommendation
-> decisão/autoridade MoreNumTegra
-> GitHub branch/PR
-> Vercel Preview
-> validação
-> merge main
-> Vercel Production
-> Green Sales
-> smoke production
```

Nenhum provider pode publicar diretamente na Green ou alterar o MoreNumTegra sem autorização específica.

## 5. Dados comerciais

Preço, unidade, promoção e disponibilidade são fatos mutáveis.

Ao alterar qualquer dado comercial:

- preservar fonte/evidência;
- identificar unidade;
- registrar DE/POR quando aplicável;
- confirmar disponibilidade;
- não inferir informação ausente.

## 6. Analytics

GA4, GTM, Meta Pixel, Speed Insights adicional e outras tags continuam sob gate específico.

Search Console e mensuração orgânica devem ser recomendados pelo provider; qualquer implementação de tags continua separada da recomendação.

## 7. Condições de parada

Parar se uma mudança:

- divergir entre GitHub, Vercel e Green;
- exigir dado comercial não comprovado;
- alterar Form 46 de forma não conhecida;
- introduzir analytics/pixels sem gate;
- exigir backend/CMS/FECH.AI/n8n/Make sem autorização específica;
- tratar recomendação Search como autorização automática de implementação;
- alterar DNS sem necessidade comprovada e gate próprio.
