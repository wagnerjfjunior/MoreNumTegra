# MoreTegra Blog — Auditoria editorial do Blog Tegra e baseline GSC

**Data:** 2026-10-19  
**Estado:** PROPOSTA / DOCUMENTATION_ONLY / DRAFT — não é autorização para publicar 48 artigos  
**Repositório canônico:** `wagnerjfjunior/MoreNumTegra`  
**Main observada para este pacote:** `4736215439e26f96926649999d1438ffeefa2c50`  
**Fonte primária:** HTML SingleFile enviado pelo usuário, salvo em 19/10/2026 às 09:39 BRT, da página `https://www.tegraincorporadora.com.br/blog`; duas exportações Google Search Console em XLSX, recebidas na mesma conversa.

## 1. Inventário verificado e limitações

- **48 matérias distintas visíveis**, em quatro editorias, 12 cada: Mercado, Dicas & Decoração, Lifestyle e Tegra +. O blog possui carregamento adicional `Exibir mais artigos`; logo, **48 NÃO equivale ao acervo completo** e a contagem é somente da página inicial salva.
- Metadados recuperados da página inicial: título e URL. **Não foi feita auditoria de conteúdo integral de cada uma das 48 URLs.** Cinco URLs representativas foram examinadas em ferramenta pública para analisar jornada editorial, links de continuidade e produtos.
- Exemplos de direcionamento editorial da Tegra: Lapa e Vila Anastácio → interesse regional e projetos Caminhos da Lapa; Itaim Bibi → bairro e público de alto padrão; valorização de luxo → atributos de produto; Nova Vivere → comparação de plantas; nove matérias Bueno Brandão → fortalecimento de marca e aprofundamento do mesmo produto. Essas são hipóteses de intenção observáveis nos títulos, copy e links, **não** resultados de Semrush ou GSC da Tegra.
- Direitos: títulos e URLs podem ser catalogados; **não reproduzir os textos, fotos, infográficos ou simples paráfrases de artigos protegidos por direitos autorais**. Cada publicação MoreTegra necessita apuração editorial própria, fontes e exemplos validados.

## 2. Evidência das exportações Search Console MoreTegra

**Relatório Web / últimos 3 meses (filtro da própria exportação):**
- 57 cliques e 1.413 impressões agregados por dispositivo; desktop 39 cliques/835 impressões, celular 18/573, tablet 0/5.
- Consultas visíveis concentradas em marcas, empreendimentos e algumas buscas regionais. Exemplos: `aria higienopolis` 25 impressões, `orbita tegra` 22, `mozae higienópolis` 19, `lançamento itaim` 10, `apartamento na planta moema` 1. Não inferir ausência de demanda pelos termos sem cliques: a exportação de consultas está sujeita a anonimização/limites e soma apenas uma parte das impressões totais.
- Exemplos de páginas: Home 147 impressões/8 cliques; Ária 143/9; Elo Duo 116/2; Mozae 107/8; Órbita 75/1; regional Moema 39/0. Comparação temporal e causalidade exigem baseline antes/depois com data e URL.

**Relatório `Performance on Search — Generative AI Features`:**
- 38 impressões agregadas por dispositivo (30 desktop, 8 celular), com algumas URLs de projetos na lista.
- O arquivo não traz cliques ou prova de que o site foi citado ou gerou lead a partir de respostas de IA. Não rotular como `citações`, `AI Overview position` ou taxa de conversão.
- Os totais das tabelas `Páginas`, `Consultas` e `Dispositivos` não são necessariamente aditivos entre si; usar as dimensões agregadas explicitamente identificadas.

## 3. Matriz editorial e decisão sobre as 48 pautas

Inventário individual preparado na planilha entregue ao usuário `MoreTegra_Auditoria_Editorial_Blog_Tegra_2026-10-19.xlsx` (anexo de trabalho na conversa; não presumir arquivo presente no GitHub). Colunas: título e URL original, editoria, intenção presumida, consulta-alvo hipotética, prioridade, título próprio, rota proposta, destino comercial interno, requisitos de validação e status.

Classificação **preliminar editorial, não baseada em volume de busca auditado**:
- **P0 (4):** comparação Mooca/Tatuapé, Lapa/Vila Anastácio, morar no Itaim Bibi e Vila Nova Conceição/Ibirapuera; apoiar clusters locais reais do catálogo.
- **P1 (14):** compra de imóveis, IPTU, mercado e valorização, dicas de escolha com intenção comercial, Nova Vivere, Garden Design e aprofundamentos do Bueno Brandão que acrescentem valor.
- **P2 (21):** decoração, lazer, sustentabilidade, reformas, lifestyle e investimentos mais periféricos; medir antes de escalar.
- **Fora do escopo atual (9):** projetos/locais do Rio de Janeiro, esporte/saúde distante da conversão e relatórios corporativos históricos — manter no backlog, não publicar sem produto/demanda/direitos.
- Os **9 temas Bueno Brandão** devem ser agrupados em conteúdos realmente distintos ou incorporados à URL comercial; **não criar nove páginas quase duplicadas**. Reconciliar memorial e facts canônicos e a regra de copy sem justificativas de fonte para o público. Cluster VNC segue IN_PROGRESS.

## 4. Objetivo SEO e arquitetura proposta

- Hub: `/blog/`. Artigos com URL estável `/blog/<categoria>/<slug>/`, sem data no path; datas reais em `datePublished`/`dateModified`.
- Categorias candidatas: `bairros-sao-paulo`, `compra-imovel`, `financiamento-imobiliario`, `mercado-imobiliario`, `guia-do-imovel`, `tegra-e-empreendimentos`. **São propostas; URLs não existem e não devem receber links internos antes de publicação.**
- HTML/CSS/JS vanilla, mobile-first, imagens autorizadas em mídia externa adequada, static rewrites em `vercel.json`, sitemap, metadados, canonical, `BlogPosting`, `BreadcrumbList` quando aplicável, autoria identificada e conteúdo original.
- Não canibalizar `/regioes/`, `/regioes/<bairro>/` nem `/empreendimentos/<slug>/`. A página de blog responde a uma pergunta e conduz às páginas comerciais existentes, que mantêm fatos e conversão.
- Sem rotas de saída comerciais: links para dentro do MoreTegra; nomes de fontes e eventual citação de origem quando necessária com atribuição adequada. A decisão de não criar links externos comerciais não autoriza omitir atribuição de fontes quando exigida.
- Conversão preservada: formulário Greenn Form 46 tenant 313, Ligar e Mensagem com WhatsApp oficial e agendamento por Sabrina da Tegra; evitar novas APIs, não presumir captura já testada nos artigos novos.

## 5. Entregas e gates

1. Completar descoberta do arquivo **integral** do blog da Tegra (paginação/categorias), sem confundir 48 cards visíveis com todas as URLs.
2. Auditoria de cada pauta: leitura própria e fontes independentes, titularidade/licença de imagens, intenção de pesquisa, SERP, documentação comercial verificável; verificar direitos de republicação quando houver desejo de copiar qualquer material.
3. Consolidar artigos redundantes por cluster, criar outline e mapa links internos; priorizar primeiro um protótipo original P0 e um guia transacional de compra/financiamento, com SEO e revisão jurídica/financeira onde necessária.
4. Construir `/blog/` e um **artigo piloto original** em branch isolada, depois QA mobile, schema, HTTP, sitemap, consentimento, performance e CTA; aprovação explícita antes do merge. Não publicar 48 de uma vez.
5. Medir GSC/GA4 em 30/60/90 dias por URL, consulta, CTR e contato rastreado, sem prometer classificação ou citation rate.

## 6. Governança

Esta PR é exclusivamente documentação estratégica. Não altera runtime, Form 46, GSC, sitemap, domínio, Política de IA, PRs de clusters em curso, schema nem produção. Os contratos SFJM/RESF e as restrições de `docs/BLOCKED_ACTIONS.md` permanecem prioritários. Reconciliar o estado live e baselines antes da primeira implementação.
