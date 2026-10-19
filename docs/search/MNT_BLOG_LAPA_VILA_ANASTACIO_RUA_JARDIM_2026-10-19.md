# Blog Lapa e Vila Anastácio — Rua Jardim e Caminhos da Lapa (2026-10-19)

## Problema registrado pelo proprietário
A URL existente opunha Lapa e Vila Anastácio como bairros concorrentes ("Lapa ou Vila Anastácio?"), incompatível com a narrativa correta do empreendimento: Vila Anastácio abriga o complexo Caminhos da Lapa, planejado em parceria da Tegra, Helbor e Toledo Ferrari; Rua Fortunato Ferraz concentra a primeira Rua Jardim de São Paulo e proposta de comércio ao ar livre.

## Fatos documentados
- Portal do empreendimento `https://www.caminhosdalapaoficial.com.br/`: Caminhos da Lapa como projeto urbano com condomínios independentes, lazer, comércio e conveniência; primeira Rua Jardim de São Paulo; cerca de 1.200 metros de paisagismo, fiação subterrânea, duplicação arborizada e infraestrutura cicloviária.
- Tegra: `https://qa-caminhosdalapa.tegraincorporadora.com.br/`: Rua Jardim e projeto de Benedito Abbud, showroom na Rua Fortunato Ferraz 625.
- Projeto `https://www.caminhosdalapa.com.br/empreendimentos`: mall de lojas/serviços semelhante a shopping a céu aberto, **proposta comercial**, não garantia de ocupação ou inauguração integral.
- `https://www.caminhosdalapaoficial.com.br/`: Tegra, Helbor e Toledo Ferrari realizadoras/construtoras. Não atribuir exclusividade da autoria à Tegra.

## Alterações
- H1/title/description/OG/schema/breadcrumb/WhatsApp reescritos para conexão territorial, Rua Jardim e Caminhos da Lapa.
- Editorial com Rua Fortunato Ferraz, projeto urbano, Rua Jardim, conveniência e quatro empreendimentos com ressalva explícita de estoque.
- Foto já utilizada no guia regional (vista aérea da Rua Jardim) reaproveitada, sem duplicar asset.
- `BlogPosting` com image/author.url e entidade Sabrina, sem atribuir autoria editorial à corretora.
- Card interno no artigo de valorização corrigido: sai oposição `Lapa × Vila Anastácio`, entra `Lapa + Vila Anastácio`.
- URL/canonical antigos preservados para evitar migração sem dados GSC; avaliar mudança com redirecionamento 301 apenas após evidência.
- Página comercial/regional, preços, leads, Form 46, sitemap e produção ficam preservados até o merge.

## Gates
- `scripts/validate-blog-lapa-vila-anastacio.mjs` via workflow.
- Validadores SEO/favicons existentes e Vercel produção READY no SHA do merge.
- Não afirmar indexação, feature de rich results nem conclusão de mall. Revert pontual da PR.
