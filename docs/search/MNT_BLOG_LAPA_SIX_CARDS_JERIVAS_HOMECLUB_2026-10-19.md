# Blog Lapa — cards de seis condomínios e evidência de demanda (19/10/2026)

## Escopo
- Artigo: `/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/`.
- Reorganização dos cards com fotos em três grupos: `Lançamentos e imóveis em construção` (Nova Vivere, Garden Design); `Condomínios prontos para morar` (Elo Duo e Reserva, sendo Reserva entregue com venda original encerrada); `Mais condomínios do Caminhos da Lapa` (Jerivás e Home Club, comercialização original concluída).
- Cards dos quatro projetos com páginas MoreTegra preservam links internos. Jerivás e Home Club ainda não têm páginas comerciais MoreTegra: seus CTAs abrem diretamente `wa.me/5511960779328` com perguntas específicas, sem link externo para outro site de captação ou alegação de unidade disponível.
- Imagens Jerivás e Home Club reutilizadas do repositório do ecossistema `wagnerjfjunior/CaminhosdaLapaTegra` (`jerivas/index.html` e `home-club/index.html`), com URLs autorizadas Tegra/Azure Blob.
- Nenhum preço, estoque, unidade, prazo de entrega ou promessa de valorização novo foi incluído. H1, canonical, robots e BlogPosting/BreadcrumbList preservados.
- CSS adicional em `src-greenn/blog/lapa-artigo.css`: duas colunas de cards no desktop e uma no mobile; imagens dedicadas por entidade.

## Demanda comprovada (sem inferir intenção comercial apenas pelo volume)

- Google Keyword Planner, seis brutos 29/09/2026, trecho `Keyword_Stats_2026-09-29_at_14_57_08.csv`:
  - `condominio jerivas` / `condomínio jerivás` aproximadamente **500** médias mensais (grafias/linhas relacionadas: **não somar**).
  - `jerivas`, `jerivás`, `home club lapa`, `caminhos da lapa home club preço`, `caminhos da lapa jerivás preço`: **50** em linhas respectivas; valores são buckets Planner e não tráfego da página.
- GSC do domínio irmão `caminhosdalapategra.com.br`, observação 2025-05-13 a 2026-09-13:
  - `caminhos da lapa jerivas`: **207 impressões, 0 cliques**.
  - `caminhos da lapa home club`: **4 impressões, 0 cliques**.
  - Página histórica `/jerivas`: **546 impressões e 1 clique** em consolidado por URL, não somável à consulta.

## Contratos e fontes
- `docs/search/MNT_COMMERCIAL_MATRIX_AND_FORM46_AUDIT_2026-10-17.md`: sete entidades independentes (ELO, ELO Duo, Home Club, Jerivás, Reserva, Garden Design, Nova Vivere), sem herdar disponibilidade nem confundir identidade.
- `docs/search/MNT_CAMINHOS_SEARCH_INTELLIGENCE_STUDY_2026-09-30.md`, `docs/search/MNT_M3_02_CAMINHOS_GSC_SIBLING_EVIDENCE_2026-09-13.md`.
- Site Caminhos oficial em 19/10/2026 apresenta Garden Design em construção, Nova Vivere lançamento, Elo Duo pronto, Reserva e Jerivás 100% vendidos. A presença de Home Club como condomínio entregue/comercialização original concluída está documentada em página do repositório irmão `home-club/index.html`; não há disponibilidade assegurada.
- Não criar rota master `/caminhos-da-lapa/` no MoreTegra nem canibalizar propriedade da marca do complexo.

## Gates e rollback
- Verificar CI workflow favicon e imagem, presença 6 cards, 1 H1, links corretos e ausência de nova dependência JS.
- QA de toque/mobile e imagem remota HTTP não comprovados por CI; aceite visual em produção pendente.
- Reversão por PR revert do merge squash deste lote.
