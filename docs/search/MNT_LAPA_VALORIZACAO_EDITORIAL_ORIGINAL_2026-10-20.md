# Revisão autoral — valorização imobiliária na Lapa — 20/10/2026

## Decisão editorial / intenção SEO
O usuário solicitou diferenciar o artigo MoreTegra do artigo original da Tegra, que já possui presença orgânica estabelecida. Referência original apenas factual e temática: https://www.tegraincorporadora.com.br/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo

A nova abordagem responde à consulta **"valorização imobiliária na Lapa SP"** com método de análise imobiliária independente, sem repetir o título institucional "Lapa: o novo polo de valorização na Zona Oeste de São Paulo", sem mimetizar parágrafos e sem prometer rentabilidade.

## Fatos verificáveis e distinções
- Original Tegra publicado em janeiro de 2026, trata da história, mobilidade, três sub-regiões, presença institucional e condomínios. Não usar suas afirmações de crescimento de preço como dados empíricos.
- Conteúdo MoreTegra: metodologia de imóveis comparáveis, micro-localização, área privativa, preço pedido x transação, liquidez, custos de aquisição/manutenção, horizonte, riscos e checklist de sete perguntas. Nenhum dado de mercado, valorização percentual ou preço comercial inventado.
- Complexo Viário Pirituba–Lapa: mantida referência externa da Prefeitura publicada em 07/08/2026; texto explicita que conclusão e operação dependem de confirmação posterior e uma ponte não assegura valorização.
- O domínio Caminhos da Lapa continua responsável por informações históricas, implantação e plantas. A Home/região MoreTegra continua responsável por descoberta e comparação comercial.
- SEO: novo title, H1, descrição e OG; `BlogPosting.headline` e descrição alinhados. Canonical **não muda**; a URL histórica permanece para não perder a trilha de sinais indexados.
- Preservados: seis cards de empreendimentos, destinos comerciais, Sabrina/WhatsApp/Form46 via página regional, imagens, JSON-LD seis entidades, CSS premium e estrutura RESF; CSS recebeu checklist mobile.
- Esta revisão não é plágio por substituição de palavras. A organização do conteúdo e proposta editorial são substantivamente diferentes.

## Escopo e testes
`src-greenn/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/index.html`
`src-greenn/blog/lapa-artigo.css`
`scripts/validate-blog-lapa-originalidade.mjs`
`.github/workflows/blog-lapa-originalidade.yml`

Checagens: metadados consistentes, canonical mantido, 1 H1, seções editoriais novas, referência à Prefeitura, 6 cards, links e Schema.org válido; guardrails de blog existentes ainda são obrigatórios.

## Publicação
**PR editorial inicialmente Draft, sem merge até revisão/aceite do usuário.** Production-only, sem Preview nem teste CRM real. Após aprovação, merge na main com checks 100% verdes, deployment automático Vercel e possibilidade de revert da PR. A publicação não garante ranking, canonicidade escolhida pelo Google, Bing indexação, nem superioridade à página original da Tegra.

## Adendo de arquitetura e migração — aprovado em 20/10/2026

Após inspeção da navegação, foi confirmado que o artigo de Vila Anastácio residia na pasta `/blog/bairros-sao-paulo/` sem índice da editoria. O usuário autorizou corrigir a estrutura e executar a URL abreviada previamente aprovada para a matéria de Mercado.

- Nova editoria **`/blog/bairros-sao-paulo/`**: página HTML/CSS própria com conteúdo de orientação editorial, uma matéria efetivamente publicada, ligação a Mercado, guia regional `/regioes/lapa/` e fonte histórica `caminhosdalapategra.com.br`; `CollectionPage`, `ItemList` e `BreadcrumbList` somente sobre conteúdo existente, canonical próprio e sitemap.
- Blog Home: link de navegação `#bairros-sao-paulo`, seção própria com card editorial e CTA para o índice; mantém `/regioes/` como catálogo comercial e as demais editorias existentes.
- Matéria Vila Anastácio: breadcrumb visível e JSON-LD atualizados com a categoria ancestral. Sem mudança de URL.
- Matéria Mercado: canonical, arquivo HTML e referências ativas migradas de `/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/` para **`/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/`**; o caminho antigo recebe redirect `permanent: true` 301 na Vercel; removido do sitemap e sem duplicata física. Corrige BlogPosting, OG, artigos relacionados, índice Mercado e verificações.
- O validador global RESF de imagens preserva 41 páginas comerciais/regionais e atualiza o inventário de URLs editoriais (blog hub, categoria, dois artigos).
- Novo gate `scripts/validate-blog-bairros-urls.mjs` com CI `.github/workflows/blog-bairros-urls.yml` confirma rewrites, 301, sitemap, canonical, links, JSON-LD e navegação.
- Endereço antigo já pode aparecer por algum tempo nas buscas externas; o redirect deve ser testado por HTTP real após publicação e o novo URL submetido à indexação. A migração pode ocasionar volatilidade de indexação.
- Este adendo substitui a instrução inicial de preservar o slug original; não significa que a migração já esteja em produção antes do merge.
