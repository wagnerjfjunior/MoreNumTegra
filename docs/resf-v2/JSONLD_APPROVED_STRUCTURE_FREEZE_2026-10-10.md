# JSON-LD homologado — congelamento de contrato estrutural

Data: 2026-10-10
Decisão: Product Authority explicitamente aprovou preservar a estrutura JSON-LD homologada por página (não um número global uniforme).
Estado operacional: CANDIDATE, documental na PR #364; **não integrado à main**.

## Baseline
- A fonte canônica é a `main`, baseline SHA constatado: `9c8bdc74cb83dc9c9566f87d9288daf25f10c051`.
- Evidência entregue pelo usuário: teste Google Rich Results de `/empreendimentos/mozae-higienopolis/` em 2026-10-10 15:05:34 (5 itens válidos; Product Snippets e Merchant Listings com Product/Offer detectados) e `/regioes/higienopolis/` em 2026-10-10 15:05:04 (6 itens válidos).
- As capturas são evidências específicas dessas duas URLs, não homologação exaustiva das 36 páginas.
- Preservar quantidade e tipos de entidades de **cada rota**, grafo, `@id`, relações e campos comerciais. A arquitetura de páginas regionais pode diferir da arquitetura de empreendimentos.
- `Product`, `Offer`, `price`, `priceCurrency`, `Brand`, `RealEstateAgent`, `Person`, `Service`, FAQ e breadcrumbs existentes não podem ser recriados ou eliminados como efeito colateral da política de imagens.
- Avisos opcionais `availability`, `aggregateRating`, `review`, `shippingDetails` e `hasMerchantReturnPolicy` não autorizam invenção de dados.

## Exceções expressamente permitidas
- PR #366, 16 páginas: adicionar `ImageObject` para URL aprovada de hero, os vínculos `WebPage.primaryImageOfPage` e `WebPage.image`, e quando previamente ausente `ApartmentComplex.image`. **Único incremento permitido:** +1 `ImageObject` nessas páginas.
- PR #367, Ária Higienópolis: manter a contagem e o tipo de TODAS as entidades existentes; modificar somente `ImageObject.contentUrl`/`caption` para a imagem aprovada de acesso residencial. OG/Twitter e metadados de imagem atualizados fora do JSON-LD. Produto/Offer mantidos inalterados.
- Nenhuma alteração em DSG Itaim e CAPIITOLO no RESF V2 comum; sua eventual atualização de mídia é tratada em PR isolada #365.
- Nenhuma alteração na Home ou Mozae sem nova autorização, preservados contratos das PRs #353/#355.

## Gate formal
1. Comparar o JSON-LD analisado a partir do HTML existente no baseline com o HTML da PR. Normalizar APENAS os campos de imagem previstos, sem reduzir, adicionar ou modificar outros campos.
2. Comparar listas de `@type` e contagem de entidades. No lote #366 o `ImageObject` adicional é a única exceção autorizada; Ária #367 deve ter contagem e tipos invariáveis.
3. Verificar referências `@id`, URL de imagem aprovada, `og:image`, `twitter:image`, imagem do hero e ausência de foto da Sabrina como imagem da página.
4. Executar validação técnica, testes mobile/formulário e testes de dados estruturados antes da integração. Não afirmar que o resultado no Rich Results Test é garantia de SERP.
5. Reconciliar a cadeia das PRs (#366 depende de #364; #367 baseia-se em main) antes de eventual merge.
6. Adiar solicitações de recrawl e ajustes de sitemap até o release completo, com produção aprovada; não confundir Rich Results Test com Search Console indexação real.

## Evidência automatizada
- PR #366: `scripts/validate-resf-v2-jsonld-freeze.mjs` fixa baseline e compara 16 páginas. GitHub Actions executa gate de regressão.
- PR #367: GitHub Actions `aria-search-image.yml` adiciona a comparação da estrutura antiga e nova e verifica integridade de `Product`/`Offer`.
- Aprovação de política não equivale a autorização de merge: manter PRs draft até verificação e decisão de release.
