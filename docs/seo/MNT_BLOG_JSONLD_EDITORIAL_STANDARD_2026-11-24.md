# Padrão editorial JSON-LD — MoreTegra SP

2026-11-24. Solicitado pelo proprietário após testes Google e Schema.org do artigo Imóvel ou CDI. Base main 28a62635967c573130a604a14aeb436ba3973787. Aplicável a novos artigos editoriais SP; não migra automaticamente páginas legadas nem RJ.

## Contrato
- WebPage, BlogPosting, BreadcrumbList, WebSite, Organization, Person, RealEstateAgent, ImageObject; FAQPage somente quando perguntas e respostas são visíveis e idênticas. Não inventar dados, autoria, avaliações, datas, endereço ou ofertas.
- Reutilizar os quatro IDs institucionais e respectivos dados do JSON-LD homologado da calculadora /investimentos/calculadora-rentabilidade-imovel/. Person e RealEstateAgent representam atendimento, não autoria editorial. Preservar autor editorial real e publisher More em um Tegra.
- WebPage referencia WebSite, breadcrumb, publisher e imagem. BlogPosting identifica página canônica, headline, description, autor, publisher, imagem visível, datas comprovadas. Não conectar todas as entidades a um único nó apenas para modelagem artificial; quantidade de raízes não equivale a qualidade SEO.
- Imagens com dimensões do HTML, URLs absolutas, sem inventar recortes. Datas de publicação/modificação somente com evidência. FGTS não tem data visível; omitir até confirmação. FAQPage não implica rich result Google para site imobiliário.
- RJ é contrato separado, sem Sabrina, CRECI-SP ou telefone SP. Páginas legadas ficam intactas até auditoria e autorização específica.

## Auditoria desta rodada
- Imóvel ou CDI, studios e FGTS: quatro nós antes, nove depois; 5 FAQ idênticas ao HTML por página; alterações exclusivamente JSON-LD; datas studios presentes no conteúdo; datas CDI preservadas.
- Compra de longo prazo, FII x imóvel físico e imóveis de luxo: quatro nós BlogPosting, BreadcrumbList, Person, RealEstateAgent; datas não declaradas. São lote legado com validador que exige conjunto exato de tipos e proíbe FAQPage; não alterar esse contrato sem autorização.
- Orla Barra: BlogPosting e BreadcrumbList; ausência de Sabrina intencional, canal RJ confirmado.

## Gate editorial obrigatório
Para cada artigo novo, conferir canonical, H1, headline, IDs únicos, dados institucionais idênticos ao modelo, imagem visível, FAQ parity e canal. Teste estático não substitui Schema.org Validator e Rich Results Test. Não prometer quantidade de rich results. O aviso não crítico do Google ainda não foi expandido pelo proprietário; causa não comprovada.

Autorizado pelo proprietário na conversa. Novo `scripts/validate-blog-editorial-schema.mjs` e workflow `.github/workflows/blog-editorial-schema.yml` implementados; nenhum validador existente modificado. O gate percorre as URLs do sitemap, exclui somente as rotas legadas explicitamente enumeradas e valida novos artigos SP. Novos artigos RJ exigem contrato regional próprio antes da publicação. Testes negativos de entidade ausente, divergência de headline e canal incorreto. A obrigatoriedade de status check como proteção de branch depende de configuração GitHub e não é presumida. O gate verifica a marcação FAQ do modelo editorial vigente e formato de datas, mas não comprova autoria, datas históricas ou validade semântica oficial.
