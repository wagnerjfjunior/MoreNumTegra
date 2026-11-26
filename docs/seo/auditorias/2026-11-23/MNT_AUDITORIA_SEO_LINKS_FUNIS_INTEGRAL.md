# AUDITORIA INTEGRAL DE ARQUITETURA SEO, LINKS INTERNOS E FUNIS
## MoreNumTegra | São Paulo + Rio de Janeiro
**Data-base:** 23 de novembro de 2026  •  **Modalidade:** somente leitura  •  **Objeto:** `wagnerjfjunior/MoreNumTegra` (`main`)  •  **Produto:** `moretegra.com.br`

**Estado:** diagnóstico e plano de ação; nenhum arquivo, branch, PR, Search Console, IndexNow ou deploy foi alterado nesta execução.

> **Precisão da evidência:** este relatório cruza o sitemap GitHub de 23/11 (84 URLs), leitura estática individual das 84 rotas (para `/` foi lido `src-greenn/preview/index.html`), auditoria OpenSEO *já existente* de 14/11 (87 URLs HTTP 200; fotografia histórica), e dados reais do Search Console entre **20/08 e 20/11/2026**. Os dados de demanda vêm da pesquisa OpenSEO/DataForSEO de 23/11. O material NÃO constitui um novo crawl HTTP ao vivo de todas as URLs em 23/11 nem mede conversões reais de GA4/CRM. Qualquer conclusão de código deve ser homologada em LVR e produção antes de mudar o site.

## 1. Parecer executivo
**Veredito:** o problema mais relevante não é ausência generalizada de links, mas **desigualdade na arquitetura de descoberta → comparação → página comercial → lead**. Existem clusters eficazes (Lapa, Higienópolis, Moema e o guia FGTS) e outros incompletos (projetos SP com quase nenhuma saída contextual; relações do RJ usando fragmentos inexistentes; artigos de dicas com links comerciais genéricos).

| Evidência | Resultado | Interpretação |
|---|---:|---|
| URLs no `sitemap.xml` atual | **84** | Universo de auditoria do SEO publicado na `main` |
| Rotas revisadas no GitHub | **84/84** | 83 arquivos de rota em `src-greenn/` + home de `preview` |
| Auditoria OpenSEO existente (14/11) | **87 HTTP 200** | Fotografia anterior ao artigo FGTS e às últimas edições |
| Avisos no crawl antigo | **14** | 10 títulos acima do limiar da ferramenta e 4 URLs `noindex` auxiliares; não equivalem a 14 defeitos graves |
| GSC | **20/08 a 20/11** | Dados reais de consultas e posições médias, não garantia de ranking atual |
| Guia FGTS | **0 consultas GSC nesse recorte** | Recorte termina antes do lançamento de 23/11; não é prova de baixa procura |
| Links RJ com fragmentos inválidos | **Confirmado** | `/#projeto-1` etc. não correspondem a IDs no HTML do hub RJ |
| Leads efetivamente gerados | **Não aferidos** | GA4/CRM/Green Sales fora do escopo de leitura obtida |

### Decisões recomendadas
1. **P0 funcional:** substituir links de comparação RJ por destinos de empreendimentos reais; corrigir o salto por fragmentos inexistentes.
2. **P0 funil:** testar o guia FGTS até o filtro de prontos e o Form46, com qualificação da elegibilidade.
3. **P1 SEO de retorno rápido:** priorizar snippets e links das páginas que já têm impressões e posições médias de 5–15 no GSC (Órbita, ODE, Ária, Mozae, Ampère, Elo Duo e YPY).
4. **P1 arquitetura:** instituir links de ida e volta entre hub de região e página do empreendimento, além de pelo menos uma alternativa pertinente quando faz sentido comercial.
5. **P1/2 conteúdo:** usar os artigos como respostas a dúvidas reais que encaminhem ao imóvel, não como fábrica de URLs ou textos com repetição de palavras-chave.

## 2. Metodologia, cobertura e limitações
**Camada 1 – Código (23/11):** conferidos `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md`, padrão RESF, `sitemap.xml`, HTML das 84 rotas, `src-greenn/preview/index.html`, arquivos de homepage e snippets relevantes. Extraídos `href` internos, contagem de links e links no `<main>`. Em aplicações com JS e estrutura compartilhada, uma contagem em HTML-fonte não representa necessariamente todos os links renderizados.
**Camada 2 – Crawl pré-existente:** auditoria OpenSEO `e541d749-de85-431a-ae15-a4020cbe01fe` concluída em 14/11, com 87 páginas HTTP 200, 4 `noindex` no Complexo e 10 avisos informativos de comprimento de título. Não foi iniciado novo crawl porque a exigência é somente leitura.
**Camada 3 – Google:** Search Console do projeto MoreTegra, 20/08–20/11/2026; números de cliques, impressões, CTR e posição média por URL/consulta. Métricas não demonstram que a pessoa virou lead.
**Camada 4 – Pesquisa de demanda:** OpenSEO/DataForSEO, 23/11/2026, Brasil/português. Foram pesquisados `usar fgts para comprar apartamento`, `apartamento lapa`, `apartamento tatuapé`, `apartamento perdizes`. A lista bruta mistura cidades, locação e temas irrelevantes; o relatório filtra exclusivamente termos compatíveis com compra dos produtos do catálogo. Volumes são **estimativas nacionais mensais**, não buscas no site nem posição orgânica; não somar variantes próximas como se fossem buscas independentes.
**Não examinados com certificado ao vivo:** HTTP/canonical de todas as 84 rotas após 23/11, renderização real de JS em todas as larguras, performance Lighthouse, funcionamento final do Form46/47, indexação individual atual no Google/Bing, funis GA4/CRM, valores/estoques recentes, backlinks externos. Esses itens aparecem como gates, não como resultados presumidos.

### Observação de governança
Os documentos no topo do SFJM ainda tratam a PR #595 como não mesclada, embora o histórico desta conversa tenha registro de merge de #595 e #596. O estado documental deve ser reconciliado com o GitHub ao vivo antes de qualquer PR de correção. **Esta auditoria não atualiza documentação.**

## 3. Diagnóstico técnico de links e navegação
### 3.1 Estrutura existente que funciona
- **Lapa:** `/regioes/lapa/` já aponta a Elo Duo, Garden Design, Nova Vivere e Reserva; artigo Lapa/Vila Anastácio e artigo de valorização acrescentam contexto e caminhos de comparação.
- **Higienópolis:** região liga Ária e Mozae; ambos se conectam e retornam ao hub.
- **Moema:** hub liga seis projetos; Chez Vous, Key, Ayla e Viso apresentam links de comparação entre projetos. O desafio é diferenciação de intenção, não adicionar mais 20 links.
- **Perdizes:** região liga ODE e Soma; as páginas já se referenciam e Soma aponta também ao guia FGTS.
- **FGTS:** guia central articula três projetos residenciais candidatos, filtro `estagio=pronto`, orientação comercial e retorno dos projetos. Fundamento transversal correto; exige validação funcional e oficial.
- **RJ:** hub regional e Barra ligam os sete projetos; há base de descoberta regional, mas o módulo de “outros projetos” em páginas de destino utiliza fragmentos inadequados.

### 3.2 Defeitos e oportunidades específicas
| Severidade | Página / bloco | Evidência observada | Solução recomendada |
|---|---|---|---|
| **P0** | Páginas Kronos, Claris, Claris Rosas, Gran Thai, Singular, Gaea | links para `/rio-de-janeiro/#projeto-1` até `#projeto-4`; `id="projeto-N"` não existe no hub RJ | substituir por URL canônica do empreendimento ou criar IDs estáveis; preferir destino direto |
| **P1** | Artigo Claris Barra | não possui link direto à página `/empreendimentos/claris-casa-e-clube/`; encaminha genericamente a regiões SP/investimentos | ligar artigo a Claris + Barra/RJ; preservar política comercial RJ |
| **P1** | CAPIITOLO e DSG Itaim | apenas link global “More em um Tegra”; nenhum link interno contextual no conteúdo principal | adicionar retorno à Chácara Klabin/Itaim e conteúdo complementar verificado |
| **P1** | YPY, Ledge, Nova Vivere, Garden, Reserva, Château | zero links internos no conteúdo principal, segundo extração HTML-fonte | inserir 1–3 links justificáveis ao hub e produto comparável |
| **P1** | Blog home | sem link para guia FGTS, apesar de ele já estar no índice Mercado | destaque editorial na capa do blog |
| **P1** | Artigo FGTS | guia já contém enlaces corretos; exige QA de `/?estagio=pronto#oportunidades` e de Form46 | testar filtros e captação antes de escalonar |
| **P1** | RIIO | links de planta/imagem não são conexões SEO entre páginas | distinguir galeria do grafo e ligar projeto à região Rio/Barra |
| **P2** | Artigos Dicas | rodapés genéricos “regiões”, “studios e salas” aparecem inclusive em assuntos que não citam projetos relacionados | adicionar 1–2 pontes de conteúdo e retirar conexão indevida somente quando comprovada |
| **P2** | URL legado fora do sitemap | GSC exibe `/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/`, ausente do sitemap e do crawl de 14/11 | verificar status e canonização; não redirecionar por suposição |

**Sobre os limites da contagem:** zero links no `<main>` não significa página órfã: ela pode receber links da home e do hub regional, e possuir CTAs de formulário externos/âncoras locais. O relatório distingue “não tem link de saída contextual” de “não tem link de entrada”. A auditoria OpenSEO de 14/11 não identificou problemas de link quebrado pela regra da ferramenta; isso não invalida os fragmentos RJ observados no HTML, que exigem checagem específica de IDs.

## 4. O que o Google já mostra: tabela de prioridades
Janela **20/08 a 20/11/2026**, Search Console. Ordenação por oportunidade comercial, não por promessa de tráfego.

| Página | Impressões | Cliques | CTR | Posição média | Leitura |
|---|---:|---:|---:|---:|---|
| Home | 479 | 9 | 1.88% | 11.5 | CTR e intenção de consulta |
| ODE | 187 | 9 | 4.81% | 7.7 | CTR e intenção de consulta |
| Órbita | 257 | 8 | 3.11% | 9.5 | CTR e intenção de consulta |
| Ária | 487 | 7 | 1.44% | 9.4 | CTR e intenção de consulta |
| Bem Moema Studios | 191 | 7 | 3.66% | 10.0 | CTR e intenção de consulta |
| DSG Itaim | 141 | 7 | 4.96% | 8.8 | consolidar cluster e relevância |
| Mozae | 294 | 4 | 1.36% | 9.6 | CTR e intenção de consulta |
| Nova Vivere | 147 | 4 | 2.72% | 11.5 | consolidar cluster e relevância |
| Elo Duo | 219 | 3 | 1.37% | 10.3 | CTR e intenção de consulta |
| Tièl | 121 | 3 | 2.48% | 6.4 | consolidar cluster e relevância |
| Artigo Lapa/Anastácio | 366 | 2 | 0.55% | 12.6 | CTR e intenção de consulta |
| Soma | 141 | 2 | 1.42% | 9.0 | consolidar cluster e relevância |
| Ampère | 285 | 1 | 0.35% | 9.7 | CTR e intenção de consulta |
| Ledge | 170 | 1 | 0.59% | 9.5 | consolidar cluster e relevância |
| YPY | 218 | 1 | 0.46% | 9.1 | CTR e intenção de consulta |

### Consultas que já aparecem no GSC (não são apenas ideias)
| Busca real | URL associada | Impressões | Cliques | Posição média | Próxima ação |
|---|---|---:|---:|---:|---|
| ode perdizes | ODE Perdizes | 76 | 4 | 9.1 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| ode perdizes tegra | ODE Perdizes | 15 | 0 | 5.9 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| orbita tegra | Universo Tatuapé Órbita | 60 | 1 | 6.3 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| aria higienopolis | Ária Higienópolis | 93 | 0 | 9.9 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| aria tegra | Ária Higienópolis | 31 | 1 | 5.9 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| mozae tegra | Mozae Higienópolis | 48 | 1 | 7.1 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| mozae higienópolis | Mozae Higienópolis | 37 | 2 | 15.5 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| elo duo | Elo Duo | 30 | 0 | 10.8 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| elo duo tegra | Elo Duo | 23 | 0 | 7.1 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| ampere tegra | Ampère Brooklin | 43 | 0 | 6.3 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| tegra ampere | Ampère Brooklin | 36 | 0 | 6.6 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| ypy tegra | YPY Ipiranga | 35 | 0 | 8.3 | revisar snippet, título e termos de diferenciação sem forçar frase exata |
| studios da tegra em moema | Bem Moema Studios & Offices | 19 | 0 | 9.1 | responder dúvida e encadear para hub regional/projeto |
| vila anastácio lapa | Artigo Lapa/Vila Anastácio | 19 | 0 | 12.9 | responder dúvida e encadear para hub regional/projeto |

**Interpretação:** as posições médias 5–15 em termos de **marca** sugerem uma oportunidade de ganhar cliques na mesma URL. Isso **não prova** que o site já está bem colocado para palavras amplas (“apartamento à venda no Tatuapé”, “apartamento Perdizes”, “FGTS apartamento”). A estratégia deve primeiro ganhar presença não-branded, usando páginas com intenção correta. O CTR zerado com 15–90 impressões pode ter variância estatística grande: avaliar série temporal e SERP, não editar só pelo número.

## 5. Pesquisa real de palavras-chave e caudas longas
Pesquisas OpenSEO/DataForSEO realizadas em 23/11/2026; volume mensal **estimado Brasil**. Não são posições ocupadas pelo MoreNumTegra e a “dificuldade 0” do fornecedor não garante facilidade de ranqueamento.

| Cluster | Termo de busca | Volume/mês | Intenção | Página proprietária |
|---|---|---:|---|---|
| FGTS | usar fgts para comprar apartamento | 20 | Transacional | Guia FGTS |
| FGTS | como usar o fgts para comprar apartamento | 40 | Informacional | Guia FGTS |
| FGTS | posso usar fgts para comprar apartamento na planta | 10 | Transacional | FAQ do guia; sem promessa |
| FGTS | posso usar fgts para comprar apartamento | 10 | Transacional | Guia FGTS |
| Lapa | apartamento lapa | 1000 | Navegacional (classificação da plataforma) | Região Lapa; qualificar intenção |
| Lapa | apartamento na lapa são paulo | 170 | Transacional | Região Lapa |
| Lapa | comprar apartamento na lapa | 90 | Transacional | Região Lapa |
| Lapa | caminhos da lapa | 1000 | Informacional | Artigo Lapa + projetos |
| Tatuapé | apartamento tatuapé | 1600 | Comercial | Região Tatuapé |
| Tatuapé | apartamento à venda no tatuapé | 480 | Transacional | Região Tatuapé |
| Tatuapé | apartamento tatuapé pronto para morar | 50 | Transacional | Região Tatuapé + Órbita (verificar estágio) |
| Tatuapé | apartamento 3 dormitórios no tatuapé | 70 | Transacional | Órbita se tipologia condizente |
| Perdizes | apartamento perdizes | 880 | Navegacional (classificação da plataforma) | Região Perdizes |
| Perdizes | apartamento a venda perdizes | 720 | Transacional | Região Perdizes |
| Perdizes | comprar apartamento perdizes | 320 | Transacional | Região Perdizes |
| Perdizes | apartamento 2 quartos perdizes | 50 | Transacional | Soma se tipologia condizente |
| Perdizes | apartamento 3 quartos perdizes | 50 | Transacional | ODE se tipologia condizente |

**Descartes deliberados:** variantes de aluguel, cidades fora do escopo, plataformas concorrentes, consultas vagas como “minha área sp” e sinônimos repetidos, embora o gerador de ideias os apresente com grandes volumes. Capturar buscas erradas aumentaria visitas sem leads. Em termos como “apartamento lapa”, a intenção pode conflitar com Lapa/RJ e aluguel; usar geografia São Paulo explicitamente no texto.

## 6. Arquitetura de funis proposta (10 trilhas)
**Conceito:** TOFU = descoberta/educação, MOFU = comparação e qualificação, BOFU = página exata de empreendimento e CTA. Uma página pode integrar mais de um funil sem duplicar seu conteúdo. Links devem existir como HTML rastreável (`<a href>`) e ter texto descritivo.

### F01 — FGTS residencial transversal (P0)
- **Consultas / caudas:** “como usar o fgts para comprar apartamento”; “usar fgts para comprar apartamento”; “posso usar FGTS na planta?”.
- **TOFU:** `/blog/mercado/usar-fgts-comprar-apartamento/`.
- **MOFU:** `/regioes/lapa/ + /regioes/tatuape/ + /regioes/perdizes/ + `/?estagio=pronto#oportunidades``.
- **BOFU:** `/empreendimentos/caminhos-da-lapa-elo-duo/ + /empreendimentos/universo-tatuape-orbita/ + /empreendimentos/soma-perdizes/`.
- **Ação de conversão:** Form46 via homepage ou WhatsApp; checagem de elegibilidade e tipo residencial.
- **Contrato de qualidade:** Título genérico deve continuar como proprietário do tema; não criar 10 artigos FGTS redundantes; o agente financeiro decide enquadramento.

### F02 — Apartamento na Lapa (P1)
- **Consultas / caudas:** “apartamento lapa”; “apartamento na lapa são paulo”; “comprar apartamento na lapa”.
- **TOFU:** `/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/`.
- **MOFU:** `/regioes/lapa/ + /blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/`.
- **BOFU:** `/empreendimentos/nova-vivere/ + /empreendimentos/garden-design/ + /empreendimentos/caminhos-da-lapa-elo-duo/`.
- **Ação de conversão:** Form de imóvel exato e WhatsApp.
- **Contrato de qualidade:** Distinguir oferta ativa, produto entregue, histórico de venda e compromisso de disponibilidade; evitar promessas de valorização.

### F03 — Tatuapé / pronto para morar (P1)
- **Consultas / caudas:** “apartamento tatuapé”; “apartamento à venda no tatuapé”; “apartamento tatuapé pronto para morar”.
- **TOFU:** `/blog/mercado/mooca-ou-tatuape-rotina-mobilidade/`.
- **MOFU:** `/regioes/tatuape/`.
- **BOFU:** `/empreendimentos/universo-tatuape-orbita/`.
- **Ação de conversão:** Form46 / condições Órbita.
- **Contrato de qualidade:** Manter tema FGTS como elegibilidade opcional, não como promessa aplicável a toda unidade/sala.

### F04 — Perdizes / ODE x Soma (P1)
- **Consultas / caudas:** “apartamento a venda perdizes”; “comprar apartamento perdizes”; “ode perdizes”.
- **TOFU:** `/blog/mercado/alto-padrao-criterios-valor-compra/`.
- **MOFU:** `/regioes/perdizes/`.
- **BOFU:** `/empreendimentos/ode-perdizes/ + /empreendimentos/soma-perdizes/`.
- **Ação de conversão:** Form da página escolhida.
- **Contrato de qualidade:** Separar apartamentos amplos de tipologias compactas, studios e uso comercial; ODE tem consulta de marca já posicionada.

### F05 — Higienópolis / Ária x Mozae (P1)
- **Consultas / caudas:** “aria higienopolis”; “mozae tegra”; “apartamento higienópolis” (hipótese de expansão).
- **TOFU:** `/blog/mercado/infraestrutura-entorno-escolha-imovel/`.
- **MOFU:** `/regioes/higienopolis/`.
- **BOFU:** `/empreendimentos/aria-higienopolis/ + /empreendimentos/mozae-higienopolis/`.
- **Ação de conversão:** Form de cada empreendimento.
- **Contrato de qualidade:** Corrigir lacuna de CTR de marca antes de criar novas páginas de bairro redundantes.

### F06 — Moema / residencial x studios (P1)
- **Consultas / caudas:** “studios da tegra em moema” (GSC); “apartamento em Moema” (hipótese).
- **TOFU:** `/blog/dicasedecor/cozinha-apartamento-layout-uso-diario/`.
- **MOFU:** `/regioes/moema/ + /investimentos/studios-e-salas-comerciais/`.
- **BOFU:** `/empreendimentos/bem-moema/ + /empreendimentos/bem-moema-studios-offices/ + /empreendimentos/key-moema/ + /empreendimentos/ayla-moema-studio-office/`.
- **Ação de conversão:** Form segmentado por uso.
- **Contrato de qualidade:** Distinção residencial, studio e sala sem confundir FGTS; hub Moema já interliga muitos projetos.

### F07 — Brooklin / alto padrão x investimentos (P1)
- **Consultas / caudas:** “ampere tegra”; “apartamento brooklin” (hipótese); “studio berrini” (hipótese).
- **TOFU:** `/blog/mercado/alto-padrao-criterios-valor-compra/`.
- **MOFU:** `/regioes/brooklin/ + /investimentos/studios-e-salas-comerciais/`.
- **BOFU:** `/empreendimentos/ampere-brooklin/ + /empreendimentos/ledge-brooklin/ + /empreendimentos/studios-berrini/`.
- **Ação de conversão:** Form de planta/uso selecionado.
- **Contrato de qualidade:** Páginas Ampère e Ledge têm impressões e CTR baixo, mas âncoras precisam refletir uso/produto.

### F08 — Itaim Bibi / decisão por bairro (P2)
- **Consultas / caudas:** “dsg itaim” (GSC); “morar no Itaim Bibi” (hipótese).
- **TOFU:** `/blog/mercado/morar-itaim-bibi-rotina-custo/`.
- **MOFU:** `/regioes/itaim-bibi/`.
- **BOFU:** `/empreendimentos/dsg-itaim/`.
- **Ação de conversão:** Solicitação DSG.
- **Contrato de qualidade:** Página DSG tem pouca cobertura contextual; ampliar apenas conteúdo verificado.

### F09 — RJ / Barra e projetos Tegra (P0/P1)
- **Consultas / caudas:** “apartamento Barra da Tijuca” (a validar); nomes Kronos, Claris, Gran Thai, RIIO.
- **TOFU:** `/blog/mercado/orla-barra-tijuca-localizacao-conservacao/ + /blog/dicasedecor/casa-condominio-layout-claris-barra/`.
- **MOFU:** `/rio-de-janeiro/ + /rio-de-janeiro/regioes/oeste/barra-da-tijuca/`.
- **BOFU:** `/empreendimentos/claris-casa-e-clube/ + /empreendimentos/claris-rosas/ + /empreendimentos/kronos-by-tegra/ + /empreendimentos/gran-thai-leisure-residence/ + /empreendimentos/riio-by-piero-lissoni/ + outros RJ`.
- **Ação de conversão:** Canal comercial RJ vigente, confirmado localmente.
- **Contrato de qualidade:** Trocar `/#projeto-N` inexistentes por URLs canônicas; não inserir Sabrina/WhatsApp de SP no RJ.

### F10 — Diferenciais de uso cotidiano / Dicas (P2)
- **Consultas / caudas:** “vaga garagem apartamento”; “iluminação natural”; “pets”; “brinquedoteca”; “recarga carro elétrico” (volumes não medidos).
- **TOFU:** `/blog/dicasedecor/`.
- **MOFU:** `Artigos temáticos Dicas & Decoração`.
- **BOFU:** `1–2 projetos com os diferenciais **confirmados** + hub regional correspondente`.
- **Ação de conversão:** CTA contextual e progressivo.
- **Contrato de qualidade:** Não conectar artigo de recarga a imóvel sem infraestrutura comprovada; não criar links comerciais genéricos apenas para link juice.

## 7. Regras editoriais e técnicas para cada novo link
1. **Página proprietária por intenção:** “apartamento à venda no Tatuapé” pertence prioritariamente ao hub Tatuapé; “Universo Tatuapé Órbita” pertence à página do projeto; “como usar FGTS” pertence ao guia. Não competir consigo mesmo no title/H1.
2. **Texto âncora:** usar rótulos naturais (“Veja as plantas e características do Órbita no Tatuapé”), não “clique aqui”, não dezenas de links exatos idênticos. Variar sem perder precisão.
3. **Quantidade:** preferir 1–3 links contextuais na seção com justificativa e um bloco de alternativas realmente correlatas; não transformar cada página em catálogo total.
4. **HTML:** links rastreáveis com `<a href="/caminho/">`; CTAs de JS precisam de destinos acessíveis; testar `#id` existente. Navegação por filtros não precisa virar URL indexável.
5. **Correção semântica:** não indicar FGTS para salas comerciais nem declarar que todo pronto o aceita. Confirmar estágio e elegibilidade por operação/unidade.
6. **Design mobile / conversão:** links editoriais não podem deslocar CTA principal ou cobrir form; mobile 360/390/430px e teclado; consentimento e scripts preservados.
7. **Schema:** manter WebPage, Article/BlogPosting, BreadcrumbList, ItemList/FAQPage quando apropriados e coerentes com HTML; não adicionar `Dataset` fictício, nem inventar preços, estoques, localizações e benefícios.
8. **SP x RJ:** atendimento e regras comerciais independentes; jamais levar lead RJ a canal de SP por reutilização de componente.
9. **Verificação factual:** estágios, preços, últimos estoques, campanhas e benefícios precisam de autoridade comercial atualizada; nenhuma inferência SEO autoriza afirmação comercial nova.
10. **Links para artigos fora do sitemap:** resolver canonização/redirecionamento após verificar HTTP, não apenas porque o GSC exibe impressões históricas.

## 8. Plano de ação operacional, sem execução
| ID | Prioridade | Intervenção | Gate de aceite |
|---|---|---|---|
| A01 | P0 | RJ: corrigir 6 páginas com links para #projeto-1..4 inexistentes | Criar PR isolada, testes desktop/mobile e regressão RJ |
| A02 | P0 | Validar funil FGTS de ponta a ponta | LVR 360/390/430/900/1440; evento real após aceite |
| A03 | P1 | Promover o guia FGTS na capa do blog | Inserção editorial contextual; verificar SEO e conversão |
| A04 | P1 | Hubs de bairro -> projetos e retorno recíproco | Priorizar páginas com intenção de compra confirmada no GSC |
| A05 | P1 | Capiitolo e DSG: lacuna de links e cobertura comercial | Revalidar fatos com fonte Tegra; adicionar conteúdo não duplicado |
| A06 | P1 | Foco CTR páginas em posição 5–11 | Experimentos de title/description e headings, sem mudar claims comerciais |
| A07 | P1 | Conectar artigo Claris ao empreendimento e hub RJ | Canal local RJ preservado; revisão copy/routing |
| A08 | P1 | Separar funis residencial FGTS e studio/sala | Legal/factual + QA schema/FAQ |
| A09 | P1 | Coerência de status Garden Design em conteúdo Lapa | Confirmar governança comercial |
| A10 | P2 | Fortalecer cluster de estágios por bairro | Sem URL indexável por filtro; usar hubs existentes |
| A11 | P2 | Revisar conteúdo imobiliário em artigos Dicas | Priorizar os que já têm impressões relevantes |
| A12 | P2 | Auditar legado fora de sitemap e auxiliares noindex | Avaliar canonicals/HTTP sem desindexar automaticamente |
| A13 | P2 | Revisar blocos de relacionados do RJ | Verificar intenção, tipologia, estágio e oferta; preservar Form47 |
| A14 | P2 | Schema e texto visível com paridade | Validação em rich results + HTML visível + dados oficiais |
| A15 | P2 | Obter medição GA4/CRM e GSC por funil | Consentimento, eventos verificados, lead Form46/47 |

### Sequência sugerida em 4 lotes independentes
- **Lote 0, integridade funcional:** A01, A02, A07. Resolver fragmentos RJ, validar Form46 e corrigir ponte Claris sem remodelar o layout.
- **Lote 1, páginas em posição de ataque no GSC:** A03, A04, A05, A06, A09. Começar ODE, Órbita, Ária, Mozae, Ampère, Elo Duo e hubs correlatos.
- **Lote 2, funis de intenção e separação de produtos:** A08, A10, A11, A13. Melhorar links contextuais sem multiplicar URLs de baixa utilidade.
- **Lote 3, governança e medição:** A12, A14, A15; resolver legado e aferir conversão real antes de escala editorial.

### Critérios objetivos de aceite por lote
**Técnico:** todas as origens e destinos válidos; HTTP 200, canonical correto e sem desvio noindex; nenhum `#id` sem destino; breadcrumbs e JSON-LD sem regressão; `href` rastreável; Form46/47/WhatsApp medidos; LVR 360/390/430/900/1440 e comparação visual; CI verde ou falhas antigas justificadas; rollback rastreável.
**Conteúdo:** uma URL responsável por intenção; texto âncora com utilidade; estágio/estoque/fontes corretos; FAQ visível corresponde a schema; nenhum parágrafo inserido só para “SEO”.
**Negócio:** registrar fonte `organic`, página de entrada, clique de avanço ao projeto, CTA, envio de formulário, taxa de lead válido e destino de atendimento. A posição orgânica isolada não confirma receita.

## 9. Hipóteses a testar com Search Console e funis Analytics
- **H1 – CTR de marca:** alterar snippets por grupo pode aumentar cliques sem criar páginas novas; medir 28 dias contra período anterior e controlar sazonalidade.
- **H2 – Trânsito artigo → região → projeto:** evento de navegação e landing page permitirão verificar se os links editoriais participam de jornadas que terminam em lead.
- **H3 – FGTS transversal:** o guia pode capturar busca informativa e transferir para imóveis residenciais elegíveis; medir cliques de filtro, abandono antes de formulário e leads qualificados pelo CRM.
- **H4 – Moema e RJ:** links por tipologia/destino mais específicos devem reduzir cliques inúteis e melhorar lead útil, mesmo que diminuam clicks gerais.
- **H5 – Cobertura de cauda longa:** enriquecer perguntas reais nas páginas de intenção correta deve elevar impressões de consultas não-branded; medir por cluster, não pela soma de páginas publicadas.

## 10. Quais conteúdos NÃO devem ser criados agora
1. Uma landing page para cada variação “como usar FGTS”, “posso usar meu FGTS”, “FGTS entrada”, sem diferenciação real. Isso fragmentaria a autoridade do guia existente.
2. Páginas indexáveis com querystring de filtro (`?estagio=pronto`, `?interesse=...`). O filtro deve ser função da experiência, com canonical da homepage preservado.
3. Conteúdo RJ com CTA de corretor SP por reaproveitamento de bloco.
4. Páginas nacionais genéricas de aluguel e destinos fora do catálogo Tegra, mesmo que a ferramenta mostre volume alto.
5. Blocos JSON-LD artificiais apenas para aumentar “itens válidos” no Rich Results Test.

## 11. Inventário completo das 84 URLs: observação e correção
A matriz abaixo contém todas as rotas do sitemap, contagem de links internos no HTML e no conteúdo principal. Para ações por origem/destino e observações longas, consulte também o CSV anexo. **Números são contagens estáticas do código**, não PageRank nem tráfego; links de imagens em galerias podem estar incluídos. A homepage usa a representação `src-greenn/preview/index.html`.

| # | Caminho | Tipo | Links HTML | Links no main | Prioridade | Funil |
|---:|---|---|---:|---:|:---:|---|
| 1 | `/` | Home SP | 40 | N/A | P1 | Navegação canônica / conversão |
| 2 | `/regioes/` | Hub regiões SP | 46 | 40 | P2 | Região -> empreendimento -> Lead |
| 3 | `/empreendimentos/capiitolo-piero-lissoni/` | Empreendimento SP | 1 | 0 | P1 | Chácara Klabin -> Capiitolo |
| 4 | `/empreendimentos/caminhos-da-lapa-elo-duo/` | Empreendimento SP | 8 | 6 | P1 | Lapa -> Elo Duo -> Lead |
| 5 | `/empreendimentos/aria-higienopolis/` | Empreendimento SP | 5 | 3 | P2 | Página comercial -> conversão |
| 6 | `/empreendimentos/dsg-itaim/` | Empreendimento SP | 1 | 0 | P1 | Itaim -> DSG |
| 7 | `/empreendimentos/ledge-brooklin/` | Empreendimento SP | 2 | 0 | P1 | Brooklin -> Ledge |
| 8 | `/empreendimentos/studios-berrini/` | Empreendimento SP | 5 | 4 | P2 | Página comercial -> conversão |
| 9 | `/empreendimentos/soma-perdizes/` | Empreendimento SP | 6 | 4 | P1 | Perdizes -> Soma -> Lead |
| 10 | `/empreendimentos/zahle-jardins/` | Empreendimento SP | 3 | 1 | P2 | Página comercial -> conversão |
| 11 | `/empreendimentos/ypy-alto-do-ipiranga/` | Empreendimento SP | 2 | 0 | P1 | Ipiranga -> YPY |
| 12 | `/empreendimentos/bem-moema/` | Empreendimento SP | 3 | 1 | P2 | Página comercial -> conversão |
| 13 | `/empreendimentos/mozae-higienopolis/` | Empreendimento SP | 5 | 3 | P2 | Página comercial -> conversão |
| 14 | `/empreendimentos/bueno-brandao-257/` | Empreendimento SP | 5 | 3 | P2 | Página comercial -> conversão |
| 15 | `/empreendimentos/chateau-jardin/` | Empreendimento SP | 2 | 0 | P2 | Cidade Jardim -> Château |
| 16 | `/empreendimentos/reserva-caminhos-da-lapa/` | Empreendimento SP | 2 | 0 | P1 | Lapa -> Reserva -> alternativas |
| 17 | `/empreendimentos/jerivas-caminhos-da-lapa/` | Empreendimento SP | 4 | 1 | P2 | Lapa -> alternativas |
| 18 | `/empreendimentos/nova-vivere/` | Empreendimento SP | 2 | 0 | P1 | Lapa -> Nova Vivere |
| 19 | `/empreendimentos/garden-design/` | Empreendimento SP | 2 | 0 | P1 | Lapa -> Garden |
| 20 | `/regioes/higienopolis/` | Região SP | 9 | 7 | P2 | Região -> empreendimento -> Lead |
| 21 | `/regioes/lapa/` | Região SP | 7 | 5 | P2 | Região -> empreendimento -> Lead |
| 22 | `/regioes/cidade-jardim/` | Região SP | 4 | 2 | P2 | Região -> empreendimento -> Lead |
| 23 | `/regioes/brooklin/` | Região SP | 5 | 3 | P2 | Região -> empreendimento -> Lead |
| 24 | `/regioes/perdizes/` | Região SP | 5 | 3 | P2 | Região -> empreendimento -> Lead |
| 25 | `/regioes/moema/` | Região SP | 9 | 7 | P2 | Região -> empreendimento -> Lead |
| 26 | `/regioes/vila-nova-conceicao/` | Região SP | 6 | 4 | P2 | Região -> empreendimento -> Lead |
| 27 | `/regioes/jardins/` | Região SP | 4 | 2 | P2 | Região -> empreendimento -> Lead |
| 28 | `/regioes/itaim-bibi/` | Região SP | 4 | 2 | P2 | Região -> empreendimento -> Lead |
| 29 | `/regioes/chacara-klabin/` | Região SP | 4 | 2 | P2 | Região -> empreendimento -> Lead |
| 30 | `/regioes/alto-do-ipiranga/` | Região SP | 4 | 2 | P2 | Região -> empreendimento -> Lead |
| 31 | `/regioes/tatuape/` | Região SP | 4 | 2 | P2 | Região -> empreendimento -> Lead |
| 32 | `/regioes/sacoma/` | Região SP | 4 | 2 | P2 | Região -> empreendimento -> Lead |
| 33 | `/empreendimentos/ampere-brooklin/` | Empreendimento SP | 2 | 1 | P1 | Brooklin -> Ampère |
| 34 | `/empreendimentos/bem-moema-studios-offices/` | Empreendimento SP | 2 | 1 | P2 | Página comercial -> conversão |
| 35 | `/empreendimentos/ode-perdizes/` | Empreendimento SP | 4 | 2 | P1 | Perdizes -> Ode -> Lead |
| 36 | `/empreendimentos/tiel-vila-nova-conceicao/` | Empreendimento SP | 5 | 4 | P2 | Página comercial -> conversão |
| 37 | `/empreendimentos/universo-tatuape-orbita/` | Empreendimento SP | 5 | 3 | P1 | Tatuapé -> Órbita -> Form46 |
| 38 | `/empreendimentos/teg-sacoma/` | Empreendimento SP | 3 | 1 | P2 | Página comercial -> conversão |
| 39 | `/empreendimentos/chez-vous-moema/` | Empreendimento SP | 16 | 13 | P2 | Página comercial -> conversão |
| 40 | `/empreendimentos/key-moema/` | Empreendimento SP | 16 | 13 | P2 | Página comercial -> conversão |
| 41 | `/empreendimentos/ayla-moema-studio-office/` | Empreendimento SP | 16 | 13 | P2 | Página comercial -> conversão |
| 42 | `/empreendimentos/viso-moema/` | Empreendimento SP | 16 | 13 | P2 | Página comercial -> conversão |
| 43 | `/blog/` | Hub blog | 35 | 29 | P1 | Descoberta -> Guia FGTS |
| 44 | `/blog/bairros-sao-paulo/` | Hub Bairros | 12 | 6 | P2 | Hub -> cluster |
| 45 | `/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/` | Artigo Bairros | 20 | 13 | P1 | Dúvida geográfica -> região -> projeto |
| 46 | `/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/` | Artigo Mercado | 20 | 12 | P2 | Pesquisa de bairro -> empreendimento |
| 47 | `/investimentos/studios-e-salas-comerciais/` | Hub Investimentos | 33 | 30 | P1 | Intenção investimento -> produto |
| 48 | `/blog/dicasedecor/salao-festas-espaco-gourmet-como-avaliar/` | Artigo Dicas | 14 | 9 | P2 | Pesquisa -> comparação -> oportunidade |
| 49 | `/blog/dicasedecor/vaga-garagem-apartamento-acesso-manobra/` | Artigo Dicas | 13 | 8 | P2 | Pesquisa -> comparação -> oportunidade |
| 50 | `/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/` | Artigo Dicas | 13 | 8 | P2 | Pesquisa -> comparação -> oportunidade |
| 51 | `/blog/dicasedecor/brinquedoteca-condominio-uso-seguranca/` | Artigo Dicas | 14 | 9 | P2 | Pesquisa -> comparação -> oportunidade |
| 52 | `/blog/dicasedecor/apartamento-com-pets-layout-materiais/` | Artigo Dicas | 14 | 9 | P2 | Pesquisa -> comparação -> oportunidade |
| 53 | `/blog/dicasedecor/quadras-condominio-tenis-beach-tennis/` | Artigo Dicas | 14 | 9 | P2 | Pesquisa -> comparação -> oportunidade |
| 54 | `/blog/dicasedecor/recarga-carro-eletrico-condominio-infraestrutura/` | Artigo Dicas | 12 | 7 | P2 | Pesquisa -> comparação -> oportunidade |
| 55 | `/blog/dicasedecor/casa-condominio-layout-claris-barra/` | Artigo Dicas | 12 | 7 | P1 | Artigo RJ -> Claris -> Lead local |
| 56 | `/blog/dicasedecor/piso-apartamento-materiais-acustica-umidade/` | Artigo Dicas | 12 | 7 | P2 | Pesquisa -> comparação -> oportunidade |
| 57 | `/blog/dicasedecor/cores-decoracao-2026-paleta-apartamento/` | Artigo Dicas | 13 | 8 | P2 | Pesquisa -> comparação -> oportunidade |
| 58 | `/blog/dicasedecor/cozinha-apartamento-layout-uso-diario/` | Artigo Dicas | 12 | 7 | P2 | Pesquisa -> comparação -> oportunidade |
| 59 | `/blog/dicasedecor/iluminacao-natural-apartamento-orientacao-solar/` | Artigo Dicas | 15 | 10 | P2 | Pesquisa -> comparação -> oportunidade |
| 60 | `/blog/dicasedecor/` | Hub Dicas | 31 | 27 | P2 | Hub -> cluster |
| 61 | `/blog/mercado/` | Hub Mercado | 32 | 28 | P1 | Hub Mercado -> FGTS |
| 62 | `/blog/mercado/alto-padrao-criterios-valor-compra/` | Artigo Mercado | 28 | 22 | P2 | Pesquisa -> comparação -> oportunidade |
| 63 | `/blog/mercado/mooca-ou-tatuape-rotina-mobilidade/` | Artigo Mercado | 18 | 12 | P1 | Mooca/Tatuapé -> Região -> Órbita |
| 64 | `/blog/mercado/infraestrutura-entorno-escolha-imovel/` | Artigo Mercado | 16 | 10 | P2 | Pesquisa -> comparação -> oportunidade |
| 65 | `/blog/mercado/condominio-sustentavel-solucoes-custos/` | Artigo Mercado | 16 | 10 | P2 | Pesquisa -> comparação -> oportunidade |
| 66 | `/blog/mercado/iptu-apartamento-sp-consulta-orcamento/` | Artigo Mercado | 14 | 8 | P2 | Pesquisa -> comparação -> oportunidade |
| 67 | `/blog/mercado/usar-fgts-comprar-apartamento/` | Artigo Mercado | 20 | 15 | P0 | SEO informacional -> imóvel elegível -> Lead |
| 68 | `/blog/mercado/compra-imovel-investimento-longo-prazo/` | Artigo Mercado | 16 | 10 | P2 | Pesquisa -> comparação -> oportunidade |
| 69 | `/blog/mercado/fii-ou-imovel-fisico-comparacao/` | Artigo Mercado | 15 | 9 | P2 | Pesquisa -> comparação -> oportunidade |
| 70 | `/blog/mercado/orla-barra-tijuca-localizacao-conservacao/` | Artigo Mercado | 16 | 10 | P2 | Pesquisa -> comparação -> oportunidade |
| 71 | `/blog/mercado/imoveis-luxo-renda-custos-liquidez/` | Artigo Mercado | 18 | 12 | P2 | Pesquisa -> comparação -> oportunidade |
| 72 | `/blog/mercado/morar-itaim-bibi-rotina-custo/` | Artigo Mercado | 17 | 11 | P2 | Pesquisa -> comparação -> oportunidade |
| 73 | `/blog/mercado/imovel-herdado-inventario-documentos-etapas/` | Artigo Mercado | 13 | 7 | P2 | Pesquisa -> comparação -> oportunidade |
| 74 | `/empreendimentos/riio-by-piero-lissoni/` | Empreendimento RJ | 29 | 26 | P1 | Rio -> RIIO |
| 75 | `/rio-de-janeiro/` | Hub RJ | 23 | 18 | P1 | Hub RJ -> projeto |
| 76 | `/rio-de-janeiro/regioes/` | Região RJ | 8 | 4 | P2 | Região -> empreendimento -> Lead |
| 77 | `/rio-de-janeiro/regioes/oeste/barra-da-tijuca/` | Região RJ | 20 | 16 | P2 | Região -> empreendimento -> Lead |
| 78 | `/empreendimentos/kronos-by-tegra/` | Empreendimento RJ | 10 | 7 | P0 | Projeto RJ -> projeto relacionado / atendimento local |
| 79 | `/empreendimentos/claris-casa-e-clube/` | Empreendimento RJ | 10 | 7 | P0 | Projeto RJ -> projeto relacionado / atendimento local |
| 80 | `/empreendimentos/claris-rosas/` | Empreendimento RJ | 10 | 7 | P0 | Projeto RJ -> projeto relacionado / atendimento local |
| 81 | `/empreendimentos/gran-thai-leisure-residence/` | Empreendimento RJ | 10 | 7 | P0 | Projeto RJ -> projeto relacionado / atendimento local |
| 82 | `/empreendimentos/singular-private-residence/` | Empreendimento RJ | 10 | 7 | P0 | Projeto RJ -> projeto relacionado / atendimento local |
| 83 | `/empreendimentos/gaea-home-resort/` | Empreendimento RJ | 10 | 7 | P0 | Projeto RJ -> projeto relacionado / atendimento local |
| 84 | `/complexo-lapa-pirituba/` | Página especial | 4 | 1 | P2 | Mobilidade / conteúdo informacional |

### 11.1 URLs adicionais identificadas fora do sitemap
O crawl anterior percorreu quatro subpáginas do Complexo com `noindex,follow` e HTTP 200, que não estão no sitemap atual. Isso pode estar correto; é uma política deliberada a confirmar. O GSC também traz uma URL legada de mercado fora do sitemap. Não há autorização para indexar/desindexar/redirecionar essas URLs por presunção.
- `/complexo-lapa-pirituba/acessos-trajetos/` — NOINDEX intencional a confirmar
- `/complexo-lapa-pirituba/obras/` — NOINDEX intencional a confirmar
- `/complexo-lapa-pirituba/previsao-entrega/` — NOINDEX intencional a confirmar
- `/complexo-lapa-pirituba/projeto/` — NOINDEX intencional a confirmar
- `/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/` — URL legada com impressões GSC, fora do sitemap atual e do crawl 14/11; testar canonical/status

## 12. Fontes e rastreabilidade
- **Código canônico:** `https://github.com/wagnerjfjunior/MoreNumTegra` — branch `main`, sitemap e arquivos `src-greenn/`; referência RESF em `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`.
- **OpenSEO – projeto:** `https://app.openseo.so/p/a071ab48-dda6-4b7c-bf71-2e3e3d40694d` — auditoria de 14/11, ID `e541d749-de85-431a-ae15-a4020cbe01fe`.
- **Google Search Console via OpenSEO:** consultas e páginas, 20/08–20/11/2026. Dados exportados neste relatório em CSV. Dados de baixo volume/posição média exigem cautela.
- **Pesquisa de palavras-chave OpenSEO/DataForSEO:** Brasil, português, 23/11/2026; 4 seeds pesquisadas; termos de aluguel/outra geografia descartados.
- **Google Search Central:** https://developers.google.com/search/docs/crawling-indexing/links-crawlable — HTML links rastreáveis e âncoras descritivas.
- **Google SEO Starter Guide:** https://developers.google.com/search/docs/fundamentals/seo-starter-guide — conteúdo útil, intenção e navegação.
- **CAIXA FGTS Moradia Própria:** https://www.caixa.gov.br/voce/habitacao/Paginas/utilizacao-fgts.aspx — exigências do trabalhador, imóvel e contrato.

## 13. Limites de execução e decisão
**Nenhuma alteração foi feita.** O plano não autoriza merge, deploy, alteração do RESF, SEO/schema no runtime, formulários, campanhas, alterações de status, desconto ou preço. Qualquer lote requer PR própria, diff limitado, QA técnico e comercial, e autorização específica de merge após validação.

### Entregáveis anexos
1. `MoreNumTegra_Auditoria_SEO_Funis_Completa_2026-11-23.pdf` — relatório executivo/técnico integral.
2. `MoreNumTegra_Auditoria_SEO_Funis_Completa_2026-11-23.md` — fonte editável e pesquisável.
3. `MoreNumTegra_Auditoria_89_URLs_2026-11-23.csv` — matriz por página (84 URLs sitemap + 5 adicionais).
4. `MoreNumTegra_Plano_Acao_Auditavel.csv` — 15 ações, prioridade, origem, destino e gate.
5. `MoreNumTegra_GSC_Consultas_Com_Evidencias.csv` — consultas com posições efetivas.
6. `MoreNumTegra_Palavras_Chave_Funis.csv` — termos pesquisados, volume BR, intenção e URL proprietária.
7. `MoreNumTegra_GSC_Paginas_Prioritarias.csv` — CTR e posições por URL.
