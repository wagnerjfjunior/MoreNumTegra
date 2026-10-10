# Universo Tatuapé Órbita — contrato de dados estruturados comerciais

Data: 2026-10-10. Baseline da main: `3acd0a9228ebaf4d368fba40052f1ff41c0cbca2`.

## Motivação

O usuário comparou a página Nova Vivere (5 itens no Schema Markup Validator, 6 no Google Rich Results Test) com Universo Tatuapé Órbita (2 itens no Schema Markup Validator, 1 no Google Rich Results Test) e solicitou equivalência estrutural nas páginas de empreendimentos.

**Métrica correta:** resultado quantitativo exibido por validadores não é contratual. Os validadores aplicam políticas e subconjuntos diferentes de Schema.org e a contagem pode variar. Não assegurar 6 itens, visibilidade no Google ou concessão de rich result.

## Dados comprovados e reaproveitados

- Unidade AP0609, 69 m², R$ 8.865/m², referência R$ 611.685 — informação presente na seção comercial visível da página.
- Endereço do empreendimento: Avenida Celso Garcia, 5040, CEP 03064-000 — preservado sem alterar geolocalização.
- Telefone Sabrina da Tegra: +55 11 96077-9328; CRECI-SP 209.905-F, perfil oficial `https://corretor.tegravendas.com.br/sabrina/sp` — presentes na página.
- Imagem do produto: primeira imagem já publicada no `ApartmentComplex.image`; **não** altera OG, hero ou propriedade da imagem.

## Escopo desta PR

Preservar integralmente `WebSite`, `BreadcrumbList`, `Brand`, `ApartmentComplex`, `FAQPage`, com ajuste apenas em `WebPage.mentions` e introdução de nós `Organization`, `ContactPoint`, `Person`, `RealEstateAgent`, `Service`, `Product`, `Offer` com referências cruzadas canônicas.

- `Offer.priceCurrency = BRL`
- `Offer.price = 611685.00`
- Não afirmar `availability` ou disponibilidade atual, pois preço e estoque são sujeitos a confirmação.
- Não inventar `geo`, endereço próprio da corretora, `aggregateRating`, `review`, política de devolução ou dados de frete.
- Nenhuma alteração de conteúdo visível, formulário, tracking, CSS, JavaScript, imagem ou SEO de outras páginas.

## Mídia e plantas já presentes no site (extensão da PR)

O inventário `docs/resf-v2/data/APPROVED_HERO_IMAGES_2026-10-10.json` na PR #364 confirma a imagem principal aprovada para o Órbita: `https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/339/ImagemPrincipal/e56e585c-b5a8-44b5-95a6-c6227d8d18ea.jpg`. Essa mesma URL já é usada em `og:image`, Twitter, hero e `ApartmentComplex.image` no HTML atual; esta PR **não troca o asset**. O `ImageObject` novo usa essa URL aprovada, com `WebPage.primaryImageOfPage` e `WebPage.image` apontando para ele.

A página já apresenta três imagens oficiais de plantas de **1, 2 e 3 dormitórios**. Os nós `FloorPlan` representam essas três imagens exatamente como publicadas, sem atribuir-lhes metragem não comprovada. A página informa separadamente a unidade `AP0609` de **69 m²**, e há um quarto nó `FloorPlan` com `floorSize=69 MTK`, **sem imagem associada**, pois o HTML não especifica qual das três plantas visuais corresponde à unidade exata.

O validador exige paridade entre os URLs das três imagens reais, o objeto primário aprovado e a unidade de 69 m². Quaisquer regras de legibilidade, posicionamento ou troca do hero permanecem fora de escopo.

## Gate

Executar `node scripts/validate-orbita-commercial-schema-parity.mjs`, verificação de CI geral e homologação com Google Rich Results Test + Schema Markup Validator **após** Preview/publicação autorizados. Não integrar com PRs em Draft não aprovadas ou refatorar outras páginas por extrapolação. Falhas M4/M5 preexistentes devem ser analisadas separadamente.
