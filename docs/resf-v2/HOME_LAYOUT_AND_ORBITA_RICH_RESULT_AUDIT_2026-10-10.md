# Auditoria — Home layouts e resultados avançados Nova Vivere × Universo Tatuapé Órbita

Data: 2026-10-10
Baseline main no início: `f191a0b70a0fbd3a9a2632fd98418489646120cd`
Escopo desta PR: **somente CSS + remoção do inline grid da Home**, sem alterar SEO, JSON-LD, formulários, GTM, consentimento, imagens, LCP, performance ou páginas de empreendimentos.

## Evidências de UX fornecidas pelo usuário
- Consentimento full-width desktop: **visualmente aprovado** na captura após PR #370.
- `mt-seo`: título "Empreendimentos Tegra em São Paulo por região" extrapola a coluna esquerda, sobrepondo os cards de zonas à direita, no desktop.
- `mt-moments`: CSS tem `grid-template-columns:repeat(auto-fit,minmax(170px,1fr))` inline; causa 4 cartões muito estreitos ao lado do texto em desktop, 2 cartões estreitos em mobile 393px, com textos e CTAs quebrados/desalinhados.
- Correção candidata: remover estilo inline; responsividade da grade: 1 coluna até 599px, 2 até 979px, 3 acima de 980px; cards flex-col e CTAs ao rodapé; região desktop com duas colunas 1fr/1fr e fonte da chamada ajustada, sem sobreposição.
- Requer homologação real em mobile 393x852 e desktop 1280/1536; testes estáticos são necessários, não suficientes.

## Diferença do teste Google Rich Results Test (capturas de 2026-10-10)
| Página | Itens válidos na captura do Google | Grafo JSON-LD na main |
|---|---|---|
| Nova Vivere | **6** | WebSite, WebPage, BreadcrumbList, ImageObject, Brand, ApartmentComplex, FloorPlan (2), Organization, ContactPoint, Person, RealEstateAgent, Service, Product, Offer e FAQPage |
| Universo Tatuapé Órbita | **1** (Indicadores de localização atual) | WebSite, WebPage, BreadcrumbList, Brand, ApartmentComplex e FAQPage |

As contagens do teste de pesquisa aprimorada não são o número total de nós do grafo. O Google não garante exibir rich results mesmo quando o dado é válido. **Não é um erro automático** ter menos rich results, nem se deve copiar cegamente nós da Nova Vivere.

O HTML do Universo Tatuapé Órbita informa uma referência comercial concreta: **unidade AP0609, 69 m², R$ 611.685, equivalente a R$ 8.865/m²**, sujeita a confirmação comercial. Assim, há oportunidade factual para uma proposta futura de entidade Product/Offer, se a autoridade comercial validar os campos de oferta, preço e disponibilidade. Evitar inventar availability, estoque, avaliação, frete ou política de devolução para imóvel.

**Decisão desta PR:** auditoria/documentação apenas; nenhuma mudança de JSON-LD no Órbita e nenhuma tentativa de igualar artificialmente seis itens.

## Gates
- Validar HTML/CSS diferenciado em preview; confirmar que `data-set-status`, `data-focus-price` e âncoras permanecem funcionais por toque e teclado.
- Rodar `scripts/validate-home-moments-regions-layout.mjs` contra o baseline de produção e validar que HTML e CSS só mudaram nos trechos aprovados.
- Não publicar/reindexar enquanto não houver homologação/autorização explícita.
