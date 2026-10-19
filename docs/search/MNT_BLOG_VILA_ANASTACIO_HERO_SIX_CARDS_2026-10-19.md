# Blog Rua Jardim — Hero e cards dos seis empreendimentos (2026-10-19)

## Solicitação e escopo
Após aceite editorial #457, o proprietário solicitou substituir os links em lista por cards de **todos os empreendimentos do Caminhos da Lapa**, e escolher hero da Rua Jardim. Escopo restrito à URL `/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/`; outras páginas não mudam.

## Implementação
- Hero editorial com a vista aérea da Rua Jardim do guia regional da Lapa, fonte já presente e autorizada: `https://helbor.com.br/storage/development/gallery/2026/03/13/Vista_aerea_Rua_Jardim_Vivas_a39ff60521.jpg`. `img` HTML sem lazy, 1400 x 1400, `fetchpriority="high"`, overlay responsivo para contraste e H1 indexável.
- Seis cards com foto, estágio, metragem/tipologia, dormitórios/suítes, vagas e CTA. **Reutilizados literalmente** do artigo de mercado Lapa (PR #450/451): Nova Vivere, Garden Design, Elo Duo, Reserva, Jerivás e Home Club. Não inventar tipologias.
- Links internos para quatro páginas comerciais existentes. Para Jerivás/Home Club, cujas vendas primárias foram encerradas, CTA vai para WhatsApp de Sabrina com texto contextual e ressalva de disponibilidade.
- Reserva: entregue, vendas originais encerradas; oportunidades sob confirmação.
- CSS próprio `src-greenn/blog/vila-anastacio-cards.css` para não alterar estilos globais ou outras URLs; mobile com um card por linha, imagens proporcionais, conteúdo abaixo da imagem, áreas clicáveis grandes. Sem JS ou bibliotecas.
- A figura repetida no corpo do artigo foi retirada, mantendo a imagem na hero e no Schema/OG.
- Canonical, rota antiga e JSON-LD preservados, sem migração de slug; SEO integra Vila Anastácio/Rua Jardim/Caminhos da Lapa e não promove falsa oposição à Lapa.
- Sem mudança em CRM, preços, anúncios, ambientes Preview, domínios ou API.

## Teste/rollback
- `scripts/validate-blog-vila-anastacio-cards.mjs` e workflow `blog-vila-anastacio-cards.yml` validam seis cards, imagens/alt/lazy, specs, CTA, hero não lazy, CSS responsivo, H1 único e JSON-LD parseável.
- Validadores existentes continuam. Visual mobile depende de aceite de produção.
- Reverter PR específica caso necessário.
