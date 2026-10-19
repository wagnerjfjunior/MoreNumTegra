# Blog Lapa — complementação RealEstateAgent / 2026-10-19

## Motivo
Após PR #455, o BlogPosting tinha Person/ContactPoint da Sabrina, porém não tinha o tipo comercial `RealEstateAgent` presente nas páginas regionais RESF.

## Escopo
- Adicionado um nó `RealEstateAgent` de atendimento imobiliário da Sabrina no grafo JSON-LD do artigo.
- Dados reaproveitados de `src-greenn/regioes/lapa/index.html`: CRECI-SP 209.905-F, perfil Tegra Vendas, telefone +5511960779328, foto S3, endereço da base comercial Rua Fortunato Ferraz, 625, região Lapa/Vila Anastácio, priceRange "Consulte condições".
- O nó usa ID específico da página editorial e referência ao ContactPoint compartilhado; `BlogPosting.mentions` faz a ligação.
- Autoria segue da Equipe editorial More em um Tegra. Sabrina não é indicada como autora. Sem criação de unidades, vagas disponíveis, preços, novos CTAs ou imagens.
- Atualizado validador `scripts/validate-blog-lapa-schema.mjs`, integrado ao workflow `.github/workflows/blog-lapa-schema.yml`.

## Interpretação
O Google Rich Results Test pode continuar exibindo 2 itens principais: BlogPosting e BreadcrumbList. `RealEstateAgent` é entidade Schema.org, **não** garante um terceiro resultado avançado ou elegibilidade de feature Google própria.

## Gates / rollback
- CI específico de Schema, favicon e imagens.
- HTTP/site publicado e rich results após Vercel READY; não inferir estado indexado nem SERP.
- Reversão via revert do squash PR.
