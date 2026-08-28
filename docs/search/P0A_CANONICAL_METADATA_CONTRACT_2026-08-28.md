# P0-A — Canonicalidade comercial e metadata — 2026-08-28

## Status

`IMPLEMENTATION_CANDIDATE / CONSUMER_AUTHORIZED / GREEN_NOT_MUTATED`

## 1. Provenance

Consumer / Product Authority:

`wagnerjfjunior/MoreNumTegra@b4cdbc1ac0be9a98112cb74a378571b64cf16e7f`

Search provider result integrado:

`wagnerjfjunior/Blogs-sites-portais-seo@c20c15ce6f591071b3ec5236291d7ed6e92934bf`

Provider recommendation:

`docs/assets/morenumtegra-search-provider-recommendation-2026-08-28.md`

Consumer input:

`handoffs/SEARCH_PROVIDER_HANDOFF_2026-08-28.md`

Autorização de escopo recebida em 2026-08-28:

- P0-A limitado a canonicalidade comercial e metadata;
- branch/PR no MoreNumTegra quando houver alteração versionável;
- Green somente por controles tecnicamente comprovados;
- sem DNS, analytics, Search Console, JSON-LD, SEM, Ready, merge ou publicação adicional sem os respectivos gates.

## 2. Decisão P0-A

Origem comercial preferida e canonical target:

`https://moretegra.com.br/`

Hostname alternativo:

`https://www.moretegra.com.br/`

Estado observado no handoff consumer:

- raiz HTTPS operacional;
- `www` HTTPS operacional;
- `www` responde HTTP 200 antes de navegação page-level para a raiz;
- redirect HTTP 301/308 não foi comprovado.

Target de hostname permanece:

`www -> 301/308 -> non-www`

quando existir mecanismo tecnicamente comprovado e autorizado. O redirect page-level atual não deve ser descrito como equivalente.

## 3. Metadata aprovada para P0-A

### Title

`Apartamentos Tegra em São Paulo | More em um Tegra`

### Meta description

`Compare empreendimentos Tegra em São Paulo por região, estágio e faixa de valor. Veja lançamentos, imóveis em construção e prontos para morar e fale com a Tegra Vendas.`

A descrição não cria garantia de disponibilidade, preço ou condição comercial.

## 4. Capacidade Green comprovada

A documentação oficial da Green Sales consultada em 2026-08-28 comprova controles de página para:

- Título;
- Link da Página;
- Favicon;
- Thumbnail de compartilhamento;
- Descrição para Buscadores;
- JavaScript e CSS.

Fontes:

- https://ajuda.greenn.com.br/pt-br/article/criando-uma-pagina-do-zero-1y2zp29/
- https://ajuda.greenn.com.br/pt-br/article/como-utilizar-o-mcp-do-sales-criacao-de-paginas-com-ia-5bgltm/

Nesta rodada não foi obtida prova oficial suficiente de controle nativo para:

- `<link rel="canonical">` na produção Green;
- `/robots.txt`;
- `/sitemap.xml`;
- redirect de hostname HTTP 301/308.

Ausência de prova não equivale a ausência de capacidade.

## 5. Regra de implementação

Não inserir canonical dentro dos módulos de body `src-greenn/blocks/*`.

Não usar JavaScript client-side para fabricar canonical como solução P0 sem evidência específica de necessidade e comportamento de renderização.

`BODY_MODULE != HEAD_CONTROL`

`CLIENT_INJECTED_CANONICAL != PROVEN_SERVER_HEAD_CANONICAL`

Se a Green comprovar um campo/API/MCP específico de head/canonical, usar esse mecanismo após o lifecycle de implementação.

## 6. Alteração versionável desta revisão

A homologação Vercel passa a reproduzir a identidade Search comercial aprovada:

- title final;
- meta description final;
- canonical apontando para a origem comercial;
- `noindex,nofollow` preservado.

Isso não transforma Vercel em produção comercial e não prova canonical na Green.

`VERCEL_CANONICAL_TO_COMMERCIAL_ROOT != GREEN_CANONICAL_IMPLEMENTED`

## 7. Green production

Nenhuma mutação Green faz parte deste commit.

A aplicação na Green somente pode ocorrer depois do fluxo:

```text
Draft PR
-> Vercel Preview
-> validação
-> Ready gate
-> merge gate
-> Vercel Production homologation
-> Green Sales production gate
-> production smoke
```

Na Green, os controles atualmente comprovados e elegíveis no P0-A são Title e Descrição para Buscadores. Canonical/301/308 permanecem bloqueados até capability proof.

## 8. Explicitamente fora de escopo

- DNS;
- Search Console;
- GA4/GTM/pixels;
- JSON-LD;
- Open Graph/Twitter;
- sitemap;
- novas URLs;
- IA/cluster/internal linking;
- SEM/campanha/spend;
- alteração do Form 46;
- catálogo/preços;
- publicação Green nesta revisão.

## 9. Critérios de aceite desta revisão

- Vercel Preview mantém `noindex,nofollow`;
- title exato presente no `<head>`;
- meta description exata presente no `<head>`;
- canonical do Preview aponta para `https://moretegra.com.br/`;
- nenhum canonical aponta para Vercel;
- nenhum módulo Green body recebe metadata de head;
- nenhum tracking ou schema é introduzido;
- PR permanece Draft até gate próprio.
