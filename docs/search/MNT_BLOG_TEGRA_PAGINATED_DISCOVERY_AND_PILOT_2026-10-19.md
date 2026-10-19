# Blog MoreTegra — Paginação Tegra ampliada e piloto V1

Data: 2026-10-19
Modo: IMPLEMENTAÇÃO EM PR / SEM PUBLICAÇÃO
Fonte da auditoria inicial: `docs/search/MNT_BLOG_TEGRA_EDITORIAL_AUDIT_GSC_2026-10-19.md` (PR #442, ainda Draft no início desta execução); planilha de 48 registros entregue na conversa do usuário.
Branch de implementação: `feat/blog-home-artigo-lapa-piloto-20261019`.
Main reconciliada na abertura: `4736215439e26f96926649999d1438ffeefa2c50`.

## Ampliação do inventário

A homepage Tegra mostrava 12 artigos em cada editoria (48). A navegação `Exibir mais artigos` revelou URLs reais de paginação `?pagina=2` e `?pagina=3` nas quatro editorias:
- `https://www.tegraincorporadora.com.br/blog/mercado?pagina=2`, `?pagina=3`
- `https://www.tegraincorporadora.com.br/blog/dicasedecor?pagina=2`, `?pagina=3`
- `https://www.tegraincorporadora.com.br/blog/lifestyle?pagina=2`, `?pagina=3`
- `https://www.tegraincorporadora.com.br/blog/tegra?pagina=2`, `?pagina=3`

Itens visíveis contabilizados nas três páginas por categoria (não prova do catálogo integral):
| Editoria | P1 | P2 | P3 | Total observado |
| --- | ---: | ---: | ---: | ---: |
| Mercado | 12 | 12 | 12 | 36 |
| Dicas & Decoração | 12 | 12 | 12 | 36 |
| Lifestyle | 12 | 12 | 12 | 36 |
| Tegra + | 12 | 12 | 7 | 31 |
| **Total** | **48** | **48** | **43** | **139** |

A navegação ainda mostrava controle de carregamento em P3. **139 não é total definitivo.** O arquivo de matriz da primeira fase cobre as 48 da primeira página; os 91 registros adicionais devem ser incorporados ao workbook numa fase de expansão com URL de artigo, categoria, slug e prioridade próprios após coleta sistemática.

## Intenções SEO adicionais identificadas na expansão

- **Mercado P2/P3:** habite-se, transferência de imóvel, compra em São Paulo, bairro Alto do Ipiranga, Vila Nova Conceição, compra de usado, tabela Price, planejamento financeiro, apartamento na planta, motivos de reprovação no financiamento.
- **Decoração P2/P3:** acústica, varanda gourmet, home office, pequenas áreas, integração sala/cozinha, fechaduras, andar ideal do apartamento, aproveitamento de garden e terraço.
- **Lifestyle P2/P3:** studios de luxo, Perdizes, Higienópolis, Moema, Chácara Klabin, Brooklin, Ipiranga, apartamentos em construção e prontos para morar em São Paulo.
- **Tegra + P2/P3:** ESG institucional, sustentabilidade, eventos corporativos e arquivo histórico. Baixa prioridade para SEO de intenção de compra, salvo validação específica.

As inferências são hipóteses com base em títulos e distribuição editorial, NÃO dados do tráfego ou palavras-chave internas Tegra. Nenhuma matéria ou foto foi copiada.

## 2026-10-19 — Escopo ampliado: catálogo por matéria (sem cópia de conteúdo)

Após esclarecimento do usuário, o objetivo deixou de ser somente o artigo piloto: a branch agora contém **as 48 matérias visíveis do HTML enviado como inventário navegável**, organizadas em quatro categorias (12 cada). O arquivo `src-greenn/blog/catalogo-tegra-referencia.json` contém somente título/slug/categoria/URL de origem/status, não textos ou imagens. Também foram criados:
- `src-greenn/blog/<categoria>/index.html` (quatro categorias com listagens);
- `src-greenn/blog/<categoria>/<slug>/index.html` (48 páginas de pauta, com `robots=noindex,follow` e mensagem clara de revisão pendente);
- `vercel.json`: 54 rewrites blog, contando home, artigo autoral piloto, quatro categorias e 48 pautas;
- Home mostra as quatro editorias, e o sitemap continua limitado a home e artigo autoral, **sem indexar as páginas de pauta**.

A existência de cada um dos 48 HTMLs foi verificada pela leitura da branch (16+16+16); isto **não certifica HTTP local nem publicação**. O Live Sync exige selecionar explicitamente `feat/blog-home-artigo-lapa-piloto-20261019` e conferir o HEAD atual. Não publicar placeholders como artigos prontos; seguir a pauta com textos próprios, direitos verificados e revisão SEO por página. Os 91 cartões adicionais vistos na paginação ainda não foram convertidos em páginas ou catálogo neste ciclo. O acervo completo não foi esgotado.

## Arquitetura piloto proposta e concretizada na branch

- `/blog/` → `src-greenn/blog/index.html`.
- `/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/` → `src-greenn/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/index.html`.
- Estilos portáveis e mobile-first: `src-greenn/blog/blog.css`; sem framework, bundler, API ou dependências JS novas.
- `vercel.json` com rewrites exatos; `sitemap.xml` atualizado na branch.
- A home apresenta apenas o artigo verdadeiramente escrito como link; os dois próximos temas aparecem **sem hiperlink** e explicitamente “Em preparação”, evitando páginas vazias e links 404.
- Artigo original com roteiros de comparação, links internos para Lapa e páginas exatas de empreendimentos já existentes; sem preços, métricas, tipologias ou disponibilidade inventados. JSON-LD `BlogPosting` + `BreadcrumbList`, sem `datePublished` até a data real de publicação ser confirmada.
- CTAs Formulário, Ligar e Mensagem. **Formulário** encaminha ao Form 46 do hub já ativo em `/regioes/#formulario` (sem copiar integração); telefone `+5511960779328`; WhatsApp utiliza logo canônico.
- Sem novas rotas de saída comercial no corpo do artigo; perfil Tegra Vendas fica somente no footer comercial.
- Branding via `/assets/brand/tegra-vendas-256.webp`; não inventar fotos.

## Critérios de homologação / bloqueios antes de merge
1. Validar HTML, JSON-LD, BreadcrumbList, canonical e sitemap em rotas; identificar o comportamento de `trailingSlash` na Vercel.
2. QA mobile (375/390px), CTAs, contraste, scroll e CSS carregado de `/src-greenn/blog/blog.css`.
3. Conferir favicon, consentimento e a instrumentação GTM/GA4 atual antes de publicar; não afirmar eventos no blog sem verificar. Não ampliar scripts pesados nem copiar tags cegamente.
4. Confirmar fotos e direitos se houver ilustrações; nunca copiar conteúdo Tegra.
5. Aceite de conteúdo e título editorial e **autorização explícita de merge**. Não marcar produção, Search Console nem Form46 real como testados.

Este release não altera páginas RESF, fatos comerciais, backend, Form 46, VNC ou os arquivos `llms.txt` / `.well-known/ai.txt`.
