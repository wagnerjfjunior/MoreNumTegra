# MoreNumTegra — Cluster SEO FGTS + Órbita (23/11/2026)

**Status:** IMPLEMENTADO EM BRANCH / PR PENDENTE / SEM MERGE / SEM PRODUÇÃO.
**Autoridade:** solicitação direta do proprietário: “ótimo vamos fazer”, em resposta à proposta de artigo FGTS + enriquecimento cirúrgico da landing Órbita + links internos + PR separada sem merge automático.
**Repositório:** `wagnerjfjunior/MoreNumTegra`.
**Base main verificada antes da mudança:** `cc78efe0640bc4af2283f464137849b41afe72f4`.
**Branch:** `feat/seo-fgts-orbita-guia-20261123`.
**Validação prevista:** `LOCAL_LIVE_SYNC`, nunca Vercel Preview. **Não há autorização de merge/deploy**.

## 1. Objetivo e arquitetura de intenção

- Captar buscas informacionais relacionadas ao uso do FGTS na compra de apartamento por meio de **um único artigo principal**, sem páginas artificiais para cada variação de palavra-chave.
- Manter a landing `/empreendimentos/universo-tatuape-orbita/` com foco transacional, sem reescrever hero, title, JSON-LD comercial, FAQ existente ou a oferta.
- Converter a leitura em navegação interna para o Órbita, suas plantas e formulário; preservar canal SP, WhatsApp e Form 46.
- Evitar canibalização: artigo responde regras gerais; landing responde intenção localizada de compra no Tatuapé.
- Não criar simulador bancário nem prometer elegibilidade, aprovação de crédito ou disponibilidade de unidades.

## 2. Pesquisa de palavras-chave (OpenSEO, 23/11/2026)

Mercado Brasil/PT, volume estimado por mês e KD (dificuldade estimada). **Não são números de Search Console nem previsão de tráfego**:

| Palavra-chave | Volume estimado/mês | KD |
| --- | ---: | ---: |
| como usar fgts para comprar imovel | 260 | 16 |
| uso do fgts para compra de imóvel | 210 | 23 |
| fgts para comprar imóvel | 170 | 28 |
| regras fgts imovel | 110 | 29 |
| como usar o fgts para comprar apartamento | 40 | indisponível |
| usar fgts para comprar apartamento | 20 | indisponível |
| apartamento no tatuapé com fgts | não aferido | indisponível |

GSC conectado no OpenSEO, 20/08 a 20/11/2026: nenhuma consulta contendo FGTS no conjunto retornado; `orbita tegra` 60 impressões, 1 clique, posição média 6,3; `universo tatuapé órbita` 13 impressões, 0 cliques, posição média 30,8. Amostra pequena, não comprova potencial de ranking nem conversão. SERP mobile para FGTS geral mostrou Caixa, bancos e portais; consulta localizada mostrou resultados heterogêneos. **Semrush: relatórios de keyword indisponíveis porque a conta conectada está sem unidades API**; não inventar métricas Semrush.

## 3. Fontes oficiais e limites factuais

Consulta em 23/11/2026:
- CAIXA — Utilização do FGTS na Casa Própria: https://www.caixa.gov.br/voce/habitacao/Paginas/utilizacao-fgts.aspx
- FGTS — FGTS na Moradia Própria: https://www.fgts.gov.br/Paginas/trabalhador/fgts-na-moradia.aspx
- CAIXA — FAQ sobre uso do FGTS na proposta: https://www.caixa.gov.br/voce/habitacao/perguntas-frequentes-novos-financiamentos/Paginas/default.aspx
- FGTS — Aquisição de Imóvel Novo e Usado: https://www.fgts.gov.br/Paginas/subpaginas/aquisicao_imovel_novo_usado.aspx/
- CAIXA Notícias — Como se organizar para comprar um imóvel em 2026: https://caixanoticias.caixa.gov.br/Paginas/Not%C3%ADcias/2026/02-FEVEREIRO/Como-se-organizar-para-comprar-um-im%C3%B3vel-em-2026.aspx

Fatos consolidados: mínimo de três anos sob regime FGTS, períodos somáveis; regras de imóvel residencial para moradia do titular; restrições sobre propriedade de outro imóvel e financiamento SFH ativo; aquisição de imóvel concluído ou em construção; modalidades de entrada, amortização, quitação e parte das prestações; análise pelo agente financeiro.

**Divergência em fontes oficiais:** páginas consultadas exibem limites de avaliação diferentes (FGTS.gov 1,5 mi, CAIXA página 2,25 mi, CAIXA Notícias 2026 2,5 mi). Não afirmar teto numérico no artigo até resolver regra vigente aplicável e atualização das páginas. Não confundir entrada via FGTS com isenção de entrada nem garantir enquadramento do Órbita ou de unidade específica.

**Canal comercial:** não inserir links externos para CAIXA/FGTS na landing ou no artigo, preservando o funil MoreTegra; fontes documentadas aqui para revisão editorial. Artigo informa que o agente financeiro confirma as regras.

## 4. Arquivos e alterações propostas

1. `src-greenn/blog/mercado/usar-fgts-comprar-apartamento/index.html` — artigo original com H1 único, perguntas H2, passos de entrada, requisitos, imóvel pronto/na planta, amortização, documentos, quatro FAQs visíveis, JSON-LD `WebPage`, `BlogPosting`, `BreadcrumbList`, `FAQPage`, metadados OG/Twitter, canonical `www`, imagem já autorizada do Órbita, links internos, CTA para Órbita e WhatsApp SP.
2. `src-greenn/empreendimentos/universo-tatuape-orbita/index.html` — **somente** parágrafo/link contextual no card FGTS + CSS local de link. Preservar imagem FGTS, arte Livelo, alinhamento desktop `margin-top:auto`, CTAs e paridade FAQ/JSON-LD.
3. `src-greenn/blog/mercado/index.html` — hub de 12 para 13 guias; item HTML e `ItemList` em paridade.
4. `vercel.json` — rewrite específico da nova rota; **não** alterar política de deployment.
5. `sitemap.xml` — nova URL com lastmod 23/11/2026 e atualização de lastmod do hub Mercado.
6. Este dossiê e apontadores SFJM — rastreabilidade, gates e continuidade.

**URL proposta:** `https://www.moretegra.com.br/blog/mercado/usar-fgts-comprar-apartamento/`. Só será rota pública após merge autorizado + deploy confirmado. Nunca anunciar como publicada na fase de PR.

## 5. Gates de QA

- Confirmar `main` e head da PR ao vivo; diff restrito.
- HTML: um H1; canonical e OG coerentes; JSON-LD parseável; `FAQPage` com quatro pares idênticos ao FAQ visível; `ItemList` 13/13.
- Rota e sitemap: URL exata, rewrite sem colisão, links internos para URLs existentes; nenhum link externo no artigo além do WhatsApp SP.
- Mobile: 360/390/430px, sem scroll horizontal, hero com proporção reservada, dock e CTAs tocáveis; desktop 900/1440px.
- Órbita: imagens Livelo/FGTS alinhadas no desktop, Livelo 9:16 no mobile, nenhuma regressão Form46, WhatsApp, FAQ ou GTM.
- Executar CI do head e separar falhas novas das três falhas legadas já conhecidas da PR #594 (Product/Offer/FloorPlan/galeria); **não alterar validadores** sem autorização específica.
- LVR: `[SYNC] OK branch=feat/seo-fgts-orbita-guia-20261123 head=<SHA>`; registrar captura do usuário e aceite visual.
- Antes de eventual merge: revalidar regras FGTS, fatos comerciais e obter autorização **específica de merge**. Depois: Production READY/alias/SHA, HTTP200, schema, GSC/IndexNow quando autorizado, GA4/leads e rollback.

## 6. Medição pós-publicação (não executada)

Janelas sugeridas: 30/60/90 dias. Search Console por URL/query (impressões, cliques, CTR, posição), GA4 orgânico por landing page, eventos `generate_lead` e leads validados CRM. Não declarar ganho antes de observar dados. Não gastar em mídia nem ativar automação de rank tracking sem autorização.

## 7. Riscos e bloqueios

- Órbita já possuía três falhas de validadores legados no ciclo anterior. Esta PR não deve restaurar preços vencidos, entidades Product/Offer removidas ou conteúdo SEO oculto para satisfazer snapshots.
- Livelo 1:1 segue dependente de regulamento e elegibilidade específica do Órbita; **esta PR não altera a campanha**.
- O antigo topo `docs/NEXT_SAFE_ACTION.md` (15/11, H2/H3 Lote 1) está defasado frente a merges posteriores e não representa autorização para este escopo. Esta frente foi pedida diretamente em 23/11; o Lote 1 permanece pendente como frente distinta.
- Sem autorização para publicar; PR DRAFT e LVR primeiro.

## 8. CI observado no primeiro head da PR #595 (23/11/2026)

PR: https://github.com/wagnerjfjunior/MoreNumTegra/pull/595 (DRAFT).
Head inicial `c40f39f7d576af57d6d1db2b4d3769983d8925bd`: 13 workflows, **7 success / 6 failure**.

- **Falhas herdadas do main/PR #594 (4):** `Project structured data coverage guard` exige `Product` removido do Órbita; `Orbita commercial structured data parity` exige galeria antiga de três fotos; `RESF V2 approved project postal addresses` exige `FloorPlan`, `Offer` e `Product` antigos; `Mercado editorial 11 draft gates` compara `vercel.json.redirects` com snapshot anterior e já conflita com redirect do Complexo. Nenhuma foi introduzida pelo conteúdo FGTS. **Não corrigir com ofertas desatualizadas nem afrouxamento genérico.**
- **Falha nova corrigida em conteúdo:** `Favicon standard validation` identificou ausência dos favicons 32x32 e 16x16 no novo artigo; adicionados no commit `d460aef70e8303f3323387a7b3b6acd1f99b5067`.
- **Falha nova bloqueada por autorização:** `SEO two distinct images - 39 URLs` usa `scripts/validate-two-images-39-pages.mjs`, cujo array `blogPaths` está congelado em URLs anteriores. A nova URL no sitemap faz o teste falhar com `Blog sitemap additions must remain explicitly scoped`. **Correção técnica proposta:** adicionar **somente** `/blog/mercado/usar-fgts-comprar-apartamento/` à lista de blogs permitidos, mantendo intactas as demais asserções, e executar teste negativo para uma URL arbitrária não autorizada. **Aguardando autorização específica do proprietário para editar esse validador.** Não remover a URL do sitemap para disfarçar o gate.

Após a correção de favicon, CI do head final deve ser consultado novamente; números do primeiro head não representam o resultado final. LVR e QA visual ainda não executados.
