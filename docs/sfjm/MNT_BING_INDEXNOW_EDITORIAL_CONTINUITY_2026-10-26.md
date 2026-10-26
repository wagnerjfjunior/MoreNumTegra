# SFJM — Handoff integral Bing, IndexNow, OpenSEO e originalidade editorial — 2026-10-26

## 0. Escopo e proteção contra perda de contexto
DOCUMENTATION_ONLY. Este registro **acrescenta**, sem substituir, o handoff `docs/sfjm/MNT_BLOG_ORIGINALIDADE_INTEGRAL_HANDOFF_2026-10-20.md`, os recibos comerciais #472/#474 e o bootstrap SFJM. Não altera SEO de produção nem remove noindex. Na retomada: ler este documento inteiro junto com `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md` e o handoff editorial de 20/10; reconciliar GitHub main, Vercel, URLs, Bing, GSC antes de agir. Classificar toda afirmação como CONFIRMED, USER_SCREENSHOT, INFERRED ou PENDING. Não usar contagem histórica como estado live.

## 1. Decisões que permanecem vinculantes
- Blog MoreTegra: originalidade integral e revisão de slugs/title/H1/metadados/conteúdo com diferenciação substantiva da Tegra; padrão aprovado no artigo Lapa PR #462. Inventário histórico de 48 referências NÃO é prova de 48 artigos publicados/indexados. Conteúdos EDITORIAL_PENDING mantêm noindex até validação individual e aprovação por lote. NUNCA remover noindex ou enviar essas páginas para indexação por inferência.
- MoreTegra: somente oferta comercial Tegra; nenhum conteúdo promocional concorrente. Nenhuma alteração em páginas comerciais, Form46, CRM, RESF, GA4, consentimento e produção além de autorização específica. Manter produção-only e rollback rastreável.
- Não confundir Domain Overview estimado com Google Search Console, aviso do Bing com bloqueio, sitemap descoberto com indexação e IndexNow enviado com indexação concluída.

## 2. Implementação IndexNow confirmada
### MoreTegra
- Host canônico: https://www.moretegra.com.br/ ; excluir sempre lp.moretegra.com.br.
- Chave nova OpenSEO: `09128e68c40340f0afb5ef697e165917`; arquivo na **raiz estática** `/09128e68c40340f0afb5ef697e165917.txt` (o projeto não usa a pasta public do Next.js).
- Chave legada `a49f38b7d2614ce6b9037e528dc16fa0.txt` preservada. PR #476 MERGED, squash `294458c38b650723532eac5f6d29e6a87759936d`; Vercel Production READY `dpl_D6JBUP9x4A9sgoQLC8fHeLXCFHXS` no SHA correto. Usuário comprovou HTTP 200 + corpo exato no Chrome; OpenSEO mostrou Found.
- OpenSEO project `a071ab48-dda6-4b7c-bf71-2e3e3d40694d`: primeira submissão 11 URLs e depois carga das **46 URLs canônicas do sitemap.xml**. API retornou `submitted`, `skipped=[]`, sem créditos. Não inclui artigos fora do sitemap nem lp. Isto não certifica indexação.
### Caminhos da Lapa
- Host canônico: https://www.caminhosdalapategra.com.br/
- Chave `af5621474b5e4e2487526e2f3f9c0a6d`, arquivo estático na raiz com mesmo nome .txt. Repo `wagnerjfjunior/CaminhosdaLapaTegra`, PR #7 MERGED, squash `b94a72a75982c18cd4e9ee1d147b7d9821f63432`, Vercel production READY `dpl_9pdtdVAYrqGkD3k73NJXf3BprzxK`, host www associado. HTTP público e status Found no OpenSEO ainda exigem confirmação independente.
- OpenSEO project `05351fd8-c0c6-4a1e-8f52-b69ef701a5e5`: 6 URLs do sitemap enviadas, `submitted`, `skipped=[]`, sem créditos: /, /jerivas/, /home-club/, /elo/, /eloduo/, /reserva/.
- Bing Webmaster: URL correta do sitemap sem barra final após xml `https://www.caminhosdalapategra.com.br/sitemap.xml`; usuário confirmou submissão; estava Processing, 0 URLs descobertas naquele instante, não concluir falha definitiva.

## 3. Bing Site Explorer e URL Inspection — evidência do usuário 26/10
- Mais recente screenshot Caminhos: Site Explorer raiz mostra 10 URLs indexadas, 0 erros, 0 warnings, 0 excluded, 512 impressões e 22 cliques (janela 6 meses). Inclui páginas não necessariamente no sitemap. ELO Duo: 148 impressões/8 cliques; ELO 51/5; Reserva 99/5; Home 101/4; Jerivás 96/0; Home Club 10/0. Não somar exportações de filtros diferentes.
- MoreTegra: raiz Site Explorer mostrando 22 URLs conhecidas, 1 indexed, 20 warning, 1 excluded, 0 error, 13 impressões e cliques não apresentados. Screenshot foi do nó de host sem www, apesar de propriedade e sitemap www; **não extrapolar para o total do www**. Homepage na árvore mostrou último HTTP 304, que por si só não é erro. Separadamente, URL Inspection da homepage `https://www.moretegra.com.br/` mostrou Indexed successfully, Live URL pode ser indexada e resposta HTTP 200 sem SEO/GEO issues.
- CSVs históricos do Site Explorer: 20 artigos de blog nos grupos lifestyle (6), dicasedecor (5), tegra (5), mercado (4) apresentavam HTTP 200, document size 0 e 0 impressões; **isso por si só não comprova documento vazio**. Muitos estavam no host sem www.
- **Causa comprovada para uma URL específica, por screenshot de URL Inspection:** `https://moretegra.com.br/blog/dicasedecor/cozinhas-modernas-tendencias-de-layout-e-decoracao-para-2026/`: Bing `Not indexed due to NOINDEX directive`, `Crawl allowed=Yes`, `Page Fetch=Successful`, `Indexing allowed=No`; HTML `<meta name="robots" content="noindex,follow">`. Bing adicionalmente relatou `Title too long`, `Meta Description tag missing`, e `Meta robots tag contains restrictive robots directives`. Isso é consistente com proteção editorial, não erro de Vercel ou obrigação de remoção de noindex. Não afirmar sem nova evidência que os outros 19 warnings são exatamente noindex.
- OpenGraph: usuário viu JSON-LD apenas na inspeção armazenada do MoreTegra e JSON-LD+OpenGraph no Caminhos. **Código-fonte HTML canônico MoreTegra `src-greenn/preview/index.html` contém og:type, og:site_name, og:title, og:description, og:url, og:image e twitter:card. NÃO adicionar tags duplicadas** por ausência na UI do Bing. Verificar dimensões reais da og:image; os atributos no fonte são 1280x720 e nome do arquivo sugere 1200x630 — hipótese sem confirmação.
- Bing URL Inspection exibe histórico de consultas e inspeções, NÃO lista de todas as páginas indexadas. Para cobertura usar Site Explorer e Search Performance. Um aviso de meta description longa da Home Caminhos foi mostrado pelo Bing; 6 meta descriptions longas (home, jerivas, home-club, elo, eloduo, reserva) foram informadas pela auditoria OpenSEO concluída em 26/10, 6 páginas e 12 Lighthouse. Isso **não bloqueia** indexação e deve ser tratado com revisão editorial, não repetição de IndexNow.
- Site Explorer Caminhos reportou rotas antigas /jerivas2 (404), /reserva2 (308), /reserva-99 (302), /milano (308) em exportações. Auditar origem e destino antes de criar qualquer redirect; sem autorização para refatoração.

## 4. OpenSEO configuração, limites e links
- Ambos projetos com GSC e GA4 correspondentes, contexto e Key Pages. Domain Overview em 26/10 estimou MoreTegra 13 visitas/mês e 8 keywords; Caminhos 4 visitas/mês e 6 keywords; métricas estimadas NÃO equivalem a GSC.
- MoreTegra Rank Tracker semanal 53 termos ID `44f1f6c4-36e7-4f65-8ca0-fa1f45b08480` — checagem 26/10 run `c8241f1d-c978-4527-9dd1-5485fc5d3a6c`, limite estimado 743 créditos, foi reportado `running` com `UPSTREAM_UNAVAILABLE`, posições numéricas não confirmadas. Não duplicar/repetir sem checar estado e custo. Caminhos tracker manual 12 termos ID `ac830ef4-21de-41c4-a719-0493b3dfe957` run `7b4ded66-66da-49e9-a6f6-9c7f65cad77f` estava running, teto 168 créditos.
- MoreTegra auditoria Lighthouse 75 páginas ID `d9e9a8c0-8912-43a4-92fb-6619dfa36704` em execução na última consulta; buscar resultado final. Caminhos auditoria ID `c41ff97c-768a-4e40-8d65-ad87363c1806`, completed, 6 URLs, 12 Lighthouse, seis meta descriptions longas (informativo).
- AI Visibility: MoreTegra 15 prompts×ChatGPT+Gemini semanal (60 créditos/ciclo estimado; `INSUFFICIENT_CREDITS` histórico); Caminhos 15×ChatGPT semanal (30 créditos/ciclo estimado); preservar e revalidar antes de ampliar.
- Backlinks API: MoreTegra 2 backlinks/2 referring domains; Caminhos 25/23, dados de referência externa, não autoridade oficial do Google.
- OpenSEO IndexNow MoreTegra: https://app.openseo.so/p/a071ab48-dda6-4b7c-bf71-2e3e3d40694d/settings/integrations#indexnow . Caminhos: https://app.openseo.so/p/05351fd8-c0c6-4a1e-8f52-b69ef701a5e5/settings/integrations#indexnow .

## 5. Next safe actions — ordem e gates
1. READ_ONLY: reconciliar HEAD main, Vercel READY, status dos PRs e handoffs prévios; tratar referências acima como históricas.
2. READ_ONLY: inspecionar Live URL e Bing Index para 1–2 artigos EDITORIAL_PENDING em cada categoria, com e sem www, e amostra de páginas comerciais; registrar HTTP, robots, canonical e classificação de Warning individual. NÃO liberar noindex nem mudar redirect sem aprovação por URL/lote.
3. READ_ONLY: obter inventário completo dos 46 URLs www canônicos e status real no Bing + GSC; não confundir with nó de host sem-www (22).
4. EDITORIAL: levantar DE/PARA completo dos artigos antes de mudar slugs/title/H1, preservar conteúdo original e prova de não-canibalização, seguir documento 20/10. Submeter proposta ao usuário para validação antes de PRs runtime.
5. Caminhos: proposta de revisão de seis descriptions, com aprovação e separação de escopo do MoreTegra; não alterar repositório Caminhos por este documento.
6. Novas submissões IndexNow somente em URLs efetivamente novas/alteradas e indexáveis, após release validado. Não reenviar em massa páginas noindex.
7. Não tocar preço, estoque, cards, RESF, CRM, GTM, Clarity, schema de produção por extensão desta análise. Status final da investigação: causa noindex CONFERIDA PARA UM ARTIGO, não para vinte.

## 6. Continuidade e anticontaminação
- Este documento é o ponto de retomada operacional Bing/IndexNow e complementa, sem substituir, o handoff de blog, Match Point, Ampère/Capiitolo e RESF.
- Guardar a separação **fatos observados**, **inferências**, **desconhecidos**, **ações executadas** e **ações propostas**. Nunca afirmar teste HTTP externo sem evidência.
- Nenhuma alteração da produção autorizada por este registro documental. Seu merge docs-only não deve disparar deployment runtime conforme `vercel.json`.
