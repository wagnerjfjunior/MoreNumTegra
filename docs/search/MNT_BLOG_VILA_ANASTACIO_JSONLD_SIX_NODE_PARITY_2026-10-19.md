# Blog Vila Anastácio — paridade semântica com artigo de valorização da Lapa

Data: 2026-10-19.

## Solicitação
O proprietário observou dois itens no Google Rich Results Test e pediu JSON-LD com a mesma quantidade de entidades do artigo /blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/.

## Estado inicial e intervenção
- Artigo de valorização da Lapa: 6 nós `@graph`: BlogPosting, BreadcrumbList, ImageObject, Person, ContactPoint, RealEstateAgent.
- Artigo Lapa/Vila Anastácio antes da alteração: 4 nós, faltando ImageObject independente e RealEstateAgent.
- Inclusão de um ImageObject com ID próprio e foto hero da Rua Jardim já publicada, linked em BlogPosting.image e thumbnailUrl.
- Inclusão de RealEstateAgent específico para o atendimento do Caminhos da Lapa pela Sabrina, preservando CRECI-SP 209.905-F, WhatsApp, endereço comercial Rua Fortunato Ferraz 625, URL de perfil, foto já usada na Lapa e outras informações comuns.
- Paridade em author, publisher, Person e contactPoint entre os artigos. Autoria do artigo segue editorial, não Sabrina.
- BreadcrumbList, canonical, hero, seis cards, imagens e CTA preservados, sem alterar preços/estoque.
- Estendido script de CI `scripts/validate-blog-vila-anastacio-cards.mjs` para exigir seis nós e seus vínculos.

## Limites importantes
**Seis nós Schema.org != seis itens elegíveis em Resultados Avançados do Google.** O Google provavelmente continuará mostrando BlogPosting e BreadcrumbList como recursos elegíveis. Confirmar via Schema.org Validator os seis tipos e via Rich Results Test eventuais avisos; indexação depende Search Console.
Nenhum Preview nem deploy manual. Rollback por revert pontual da PR.
