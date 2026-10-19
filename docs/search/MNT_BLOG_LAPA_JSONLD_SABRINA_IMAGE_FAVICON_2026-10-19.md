# Lapa — JSON-LD Article, imagem, autora editorial, Sabrina e favicon — 2026-10-19

## Evidência do proprietário
Capturas do Google Rich Results Test em 19/10/2026: item `BlogPosting` detectado com **dois avisos opcionais**: campo `image` ausente; `author.url` ausente. São avisos não críticos, não erros invalidantes. A quantidade de itens reconhecidos como resultados avançados **não aumenta automaticamente** pela inclusão de entidades de contato.

## Correção exata
- `BlogPosting.image` aponta para um `ImageObject` `#primary-image`, referenciando a mesma foto da Lapa que aparece no corpo da página. `thumbnailUrl` usa essa URL.
- `BlogPosting.author` continua corretamente **Equipe editorial More em um Tegra** (Organization), com `url: https://www.moretegra.com.br/blog/`. **Sabrina não foi declarada autora** porque o artigo não a credita como redatora.
- `BlogPosting.publisher` = More em um Tegra, com URL, marca gráfica do portal e `contactPoint` que remete ao atendimento da Sabrina.
- `BlogPosting.mentions` remete ao nó `Person` da Sabrina, alinhado a `/regioes/lapa/` e referenciando CRECI-SP 209.905-F, WhatsApp e perfil Tegra Vendas.
- Incluídas `og:image`, `og:image:alt`, `twitter:card=summary_large_image`, `twitter:image` para compatibilidade de compartilhamento.
- `BreadcrumbList`, H1, canonical e seis cards preservados.

## Inventário de imagens/favicons
- Foto editorial principal: `https://helbor.com.br/storage/development/gallery/2026/03/13/Vista_aerea_Rua_Jardim_Vivas_a39ff60521.jpg`.
- Ícone/marca no rodapé: `/assets/brand/tegra-vendas-256.webp`.
- Foto Sabrina no Schema, herdada do guia regional Lapa: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/sNzJJWhmmsjkZjUV7gCKTgrlzRINCD6yDIAvkZOJ.webp`.
- O artigo já referencia os favicons públicos `/favicon.ico`, `/favicon-48x48.png`, `/favicon-32x32.png`, `/favicon-16x16.png`, `/apple-touch-icon.png`. O fetch binário pelo conector GitHub indicou objetos existentes, mas a ferramenta não os decodifica como texto.
- Os seis cards já apontam às imagens dos respectivos empreendimentos (Tegra Azure Blob e GDigital S3). Nenhuma imagem de terceiros foi criada ou movida.
- O validador estático verifica correspondência imagem JSON-LD/hero/OG/Twitter, alt e src de imagens, 5 referências de favicon, 6 cards, entidade Sabrina/contato e JSON válido.
- **HTTP 200 remoto, dimensiones reais, rastreamento das imagens pelo Google, aceitação de rich results e favicon apresentado na SERP permanecem SEM EVIDÊNCIA**, até inspeção de rede/Google.

## QA
- Arquivo: `scripts/validate-blog-lapa-schema.mjs`
- Workflow: `.github/workflows/blog-lapa-schema.yml`
- Após deploy, repetir Teste de Resultados Avançados e conferir se os dois avisos do `BlogPosting` desapareceram. A validação de Google pode variar conforme processamento e heurística.
- Rollback por revert específico do squash da PR.
