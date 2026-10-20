# SFJM — Handoff editorial: originalidade integral do Blog MoreTegra
**Data:** 2026-10-20  
**Projeto:** `wagnerjfjunior/MoreNumTegra`  
**Modalidade desta entrega:** DOCUMENTATION_ONLY / sem alteração de rotas, páginas ou produção  
**Estado observado no início do handoff:** `main` `bb0e7d6ba301c4e4eb06a62ac0aa43c48069b62e` (revalidar live na retomada)  
**Instrução do proprietário:** “todas estas slugs sao da tegra ... rever todos os artigos e todas as slugs para que fique do nosso jeito ... não podemos manter estas slugs e h1 e proprio conteudo identico ao da tegra”.

## 1. Decisão vinculante do proprietário (2026-10-20)

O trabalho realizado no artigo **Valorização imobiliária na Lapa** torna-se o **padrão editorial a aplicar ao inventário do blog**: transformar matérias oriundas do inventário de referência da Tegra em **peças substantivamente originais do MoreTegra**, com proposta de valor, intenção de busca, slug, title, H1, subtítulos, metadados, dados estruturados e conteúdo distintos, sem copiar texto institucional ou presumir direitos de reprodução.

**Não basta substituir palavras ou gerar paráfrases**. Cada novo artigo deve ter pergunta central própria, conteúdo útil, diferenciação de SERP, fontes e afirmações verificáveis, ligação à jornada de descoberta/regiões/empreendimentos/lead, e não deve canibalizar outras URLs do próprio domínio.

**A referência da Tegra não serve como autorização para copiar conteúdo, imagens ou números**. Sempre manter identificação correta da incorporadora, sem confundir conteúdo do portal MoreTegra com material corporativo oficial.

## 2. Inventário comprovado e escopo

Arquivo de inventário: `src-greenn/blog/catalogo-tegra-referencia.json`. É um **snapshot da Home Tegra enviado em 19/10/2026, limitado aos 48 cartões visíveis**, não o universo completo de todos os artigos do blog ou prova de duplicação efetiva. Distribuição encontrada:

| Categoria | Itens referenciados |
|---|---:|
| `mercado` | 12 |
| `dicasedecor` | 12 |
| `lifestyle` | 12 |
| `tegra` | 12 |
| **Total** | **48** |

O próprio catálogo marca conteúdos de referência como `EDITORIAL_PENDING` e `indexable: false`. É necessário inspecionar **cada fonte HTML / rota / status HTTP / robots / canonical** antes de afirmar que algum texto está indexável ou duplicado. **Não confundir uma URL reservada ou um cartão no inventário com um artigo original já publicado.**

Além desses 48 cartões, auditar os **artigos originais ativos**, as **categorias** e quaisquer outros slugs de `vercel.json`, `sitemap.xml` e arquivos `src-greenn/blog/**` que possam ter sido adicionados fora do snapshot. Não presumir número definitivo antes de reconciliar o inventário completo.

### Caso-padrão já entregue

- PR **#462** merged, commit `bb0e7d6ba301c4e4eb06a62ac0aa43c48069b62e` em 20/10/2026; no momento do release, Vercel Production reportou READY no mesmo SHA. Revalidar current production.
- Matéria original: `/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/` — foco em preço/m², liquidez, custos, riscos e infraestrutura, H1 e título diferenciados.
- URL legada `/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/` configurada no `vercel.json` com redirect permanente para a nova rota. Validadores estruturais passaram; evidência HTTP independente do 301 ainda deve ser discriminada.
- Categoria `/blog/bairros-sao-paulo/` criada; artigo urbanístico `/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/` mantido; página comercial `/regioes/lapa/` mantém intenção distinta.
- Usuário relatou que indexação e funcionamento estão validados. Registrar como **USER_REPORTED**, não como medição independente de GSC/Bing.

## 3. Método obrigatório de auditoria por URL

1. **Reconciliação live e SFJM:** ler `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md`, este arquivo e baselines aplicáveis; resolver SHA `main`, PRs, Vercel Production, sitemap, rewrites, redirects e indexabilidade antes de qualquer mudança.
2. **Inventário mestre:** levantar todas as URLs/blog routes com categoria, título, H1, metadescrição, canonical, robots, schema, sitemap, links internos, status de publicação, origem Tegra quando identificada, e presença de artigo de fato. Diferenciar `EXISTENTE_INDEXAVEL`, `EDITORIAL_PENDING_NOINDEX`, `INEXISTENTE`, `REDIRECT`; registrar evidência e não inventar.
3. **Matriz editorial de originalidade:** para cada artigo, comparar intenção/slug/title/H1/outline/copy com artigo de referência Tegra (quando acessível), avaliar sobreposição, definir novo ângulo MoreTegra e palavras-chave principal/secundárias sem prometer volume ou ranking sem dados. Identificar conflitos com páginas comerciais `/regioes/`, `/empreendimentos/` e com outros artigos.
4. **Priorização:** tratar primeiro URLs que estão publicadas e indexáveis com possível duplicação substancial; depois candidatos `noindex`, sem transformar automaticamente todo placeholder em artigo indexável. Apresentar matriz e estratégia ao proprietário antes de aplicar migrações em massa.
5. **Implementação controlada por lotes:** criar texto verdadeiramente novo, slug apropriado quando justificado, title/H1/metadescrição/OG/Twitter/BreadcrumbList/BlogPosting coerentes, links internos reais, sitemap só de canônicos indexáveis, `301` **somente quando existe URL anterior pública**; evitar soft-404 e cadeias de redirect. Não criar redirect de URL que nunca existiu publicamente por hábito.
6. **Qualidade:** HTML5/CSS/JS vanilla (Greenn-portable), mobile-first, SEO-first, performance, imagens autorizadas e alt correto, nenhuma afirmação de preço, métrica ou valorização sem fonte, não copiar mídias Tegra sem autorização, manter formulário Greenn Form 46, WhatsApp e identidade Tegra; nunca usar a própria mudança de slug como prova de originalidade.
7. **Gates:** testes por rota/categoria, conteúdo visível vs JSON-LD, heading único, canonical, OG, esquema validável, redirects, sitemap, vínculos internos, roteamento Vercel, mobile, favicon, CI, integração de leads sem enviar dados reais não autorizados. Exigir evidência HTTP/live quando afirmar 200/301. Fluxo GitHub main → Vercel Production; Preview não disponível neste projeto.
8. **Governança:** PRs rastreáveis, aprovação editorial/comercial do usuário por lote antes de publicar, reversibilidade e rollback. Não modificar produção sem gate; atualizar SFJM e handoff no fechamento de cada lote.

## 4. Entregáveis da próxima conversa

- **Matriz auditável** com uma linha para cada URL: categoria, URL atual, tipo/estado, referência Tegra, risco de semelhança (verificado vs hipótese), proposta de título, H1, slug original, keyword/intent, proposta de conteúdo, prioridade, destino 301 (se houver), status e evidência.
- **Mapa de arquitetura do blog**: categorias reais, hubs, textos originais, placeholders noindex, ligação aos clusters regionais e páginas comerciais.
- **Plano sequenciado de PRs/lotes** com dependências e testes, priorizando conteúdo realmente público e indexável.
- **Primeiro lote de implementação**, somente após aprovação do escopo editorial. Evitar reformular as 48 referências cegamente ou disparar 48 redirects desnecessários.

## 5. Restrições e ações bloqueadas

- NÃO concluir que todas as 48 URLs estão duplicadas/indexadas apenas por constarem do catálogo de referência.
- NÃO copiar nem apenas parafrasear copy da Tegra.
- NÃO manter por inércia slug/title/H1 idênticos aos originais corporativos quando o objetivo é conteúdo autoral; avaliar casos publicados individualmente com URL migrations seguras.
- NÃO apagar/renomear slugs em lote sem matriz de origem/destino, status indexável e riscos SEO.
- NÃO alterar páginas regionais/comerciais ou conteúdo RESF já aprovado por causa desta auditoria editorial, sem escopo específico.
- NÃO inventar métricas de GSC/Bing, disponibilidade, fontes, status de deployment ou autorização de merge.
- NÃO tratar CI como prova de indexação ou performance real.

## 6. Prompt canônico de retomada

> Retome `wagnerjfjunior/MoreNumTegra` pelo SFJM. Leia primeiro `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md` e `docs/sfjm/MNT_BLOG_ORIGINALIDADE_INTEGRAL_HANDOFF_2026-10-20.md`. Resolva live GitHub main, PRs, Vercel, `sitemap.xml`, `vercel.json` e `src-greenn/blog/catalogo-tegra-referencia.json`. **Objetivo: revisar TODO o inventário do Blog MoreTegra** para que nenhum artigo publicado replique slug, title, H1, estrutura e conteúdo de artigos Tegra, tomando como padrão a revisão autoral da Lapa aprovada na PR #462. O catálogo contém 48 cartões de referência (12 por editoria), mas há placeholders `EDITORIAL_PENDING/noindex`: não assuma que são 48 artigos publicados nem que todos precisam de 301. Faça inventário completo das rotas e artigos reais, confirme indexabilidade e similaridade com as origens Tegra, construa matriz URL antiga → nova URL/título/H1/intenção/editoria/conteúdo/301 e priorize URLs ativas. Preserve `/regioes/`, `/empreendimentos/`, categoria `/blog/bairros-sao-paulo/`, RESF, Greenn Form 46, WhatsApp e tracking. Entregue diagnóstico e plano de migração em lotes com evidências, CI, rollback e gates; **não publique ou faça merge em massa sem minha aprovação**. Registre status no SFJM e comece pelo primeiro lote de maior risco após aprovarmos a matriz.

## 7. Limite desta intervenção

Este commit de documentação **não reescreve os artigos, não muda o sitemap, nem inicia redirects**. Seu propósito é preservar a decisão e permitir retomada segura sem que a próxima conversa trate automaticamente 48 URLs de referência como 48 problemas já confirmados.
