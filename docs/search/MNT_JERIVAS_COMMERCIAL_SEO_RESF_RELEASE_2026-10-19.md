# MoreTegra — Jerivás comercial SEO, Form46 e prevenção de canibalização — 19/10/2026

## Origem e autorização
Usuário aprovou a divisão de intenção SEO: `caminhosdalapategra.com.br` assume história, plantas, lazer, infraestrutura; `moretegra.com.br` concentra valores, condições e captação. Usuário autorizou prosseguir com a primeira página comercial: Jerivás.

## Estado pré-release
- MoreNumTegra `main`: `2f29c32b7261e95f1d5a2a444096772e1da59420`.
- CaminhosdaLapaTegra `main`: `584d07f98825cda90d6ed8a229b3861ca0e6cd85`; Jerivás `/jerivas/`.
- Modelo comercial Form46 validado anteriormente: `src-greenn/empreendimentos/reserva-caminhos-da-lapa/index.html`. Runtime padrão em `src-greenn/preview/runtime.js` + `measurement-core.js` + `measurement-form.js`.
- Arquitetura aprovada de site: HTML/CSS/vanilla JS, produção Vercel somente `main`, sem Preview, formulário embedded Greenn, rollback pontual.

## Conteúdo e ownership SEO
- Nova URL: `https://www.moretegra.com.br/empreendimentos/jerivas-caminhos-da-lapa/` — **consultas comerciais** "Jerivás preço", "Jerivás valor", "Jerivás Caminhos da Lapa disponibilidade", oportunidades particulares e contato Sabrina.
- Site irmão `https://www.caminhosdalapategra.com.br/jerivas/` mantém autoria temática de plantas, implementação, história, lazer, tour e identidade condominial. Link contextual para esse detalhe a partir da página comercial, sem canonical cruzado nem noindex.
- Vínculos alterados nos dois artigos Lapa do MoreTegra: card Jerivás passa a apontar à URL comercial própria; Home Club permanece WhatsApp até ter página própria.
- Sem inventar tabelas: condomínio Jerivás entregue, comercialização original encerrada, tipologias 105 ou 136 m², 3 ou 4 dormitórios, 1 ou 2 suítes, 2 ou 3 vagas. Lazer e imagens advêm do `ApartmentComplex` do site irmão em produção, `/jerivas/`. Não foram comprovados estoque de revenda, unidade ou preço vigentes.
- SEO: meta title, description, canonical self, OG/Twitter, H1 único, conteúdo visível orientado a busca comercial, FAQ visível 5 itens com FAQPage em paridade, JSON-LD ApartmentComplex/FloorPlan/RealEstateAgent/ContactPoint/BreadcrumbList/ImageObject sem `Offer`.
- 5 imagens do acervo Tegra/Azure, hero preload/high priority, imagens abaixo da dobra lazy; CSS isolado, responsivo, sem framework ou novo backend. WhatsApp oficial Sabrina, CRECI-SP 209.905-F.
- Form46 embutido com `tenant_id=313`, `form_id=46`, `title=MoreEmUmTegra`, campos nome/email/telefone, o tratamento de rede/consentimento e métricas do runtime existente (nenhum envio real automatizado para não criar lead fictício).
- Novo rewrite exato `/empreendimentos/jerivas-caminhos-da-lapa/` e URL no `sitemap.xml`.

## Testes e limitações
- `scripts/validate-jerivas-commercial.mjs` e workflow `.github/workflows/jerivas-commercial.yml`: SEO, six schema types, 5 FAQ visíveis, dados reais do projeto, Form46, 2 links editoriais, favicon, LCP image priority e layout CSS mobile.
- Gates herdados do repositório: favicon, duas imagens SEO, validators de blog.
- Os testes estáticos não comprovam submissão real/CRM, HTTP externo, PageSpeed, aceitação do Google/Bing nem visual em iPhone; esses aceites ficam pendentes de evidências.
- NÃO executar Preview nem deployment manual redundante; promover pela `main` automaticamente; confirmar Vercel `READY` para mesmo SHA.
- Rollback: revert pontual da PR no `main`, com remoção do rewrite, URL sitemap e enlaces editoriais. Preservar sites irmãos e dados comerciais existentes.

## Próximas URLs, fora deste escopo
- Reserva: otimização comercial existente, sem alterar sem nova evidência e testes.
- Home Club: criar página comercial separada somente após Jerivás.
- ELO: identidade independente, fase histórica, seguir estratégia de preço no MoreTegra quando evidências e escopo permitirem.
