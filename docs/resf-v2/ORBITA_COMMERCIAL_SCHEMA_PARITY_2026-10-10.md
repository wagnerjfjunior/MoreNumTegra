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

## Gate

Executar `node scripts/validate-orbita-commercial-schema-parity.mjs`, verificação de CI geral e homologação com Google Rich Results Test + Schema Markup Validator **após** Preview/publicação autorizados. Não integrar com PRs em Draft não aprovadas ou refatorar outras páginas por extrapolação. Falhas M4/M5 preexistentes devem ser analisadas separadamente.
