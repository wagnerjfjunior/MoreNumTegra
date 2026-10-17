# Parecer SES — SEO/GEO e governança de aquisição

**MoreNumTegra e ecossistema · 17/10/2026 · America/Sao_Paulo**

Estado: parecer estratégico emitido; recomendações para decisão de Wagner. Nenhuma alteração em repositórios, páginas, produção, DNS, GTM, CRM, campanhas ou orçamento. Este documento não certifica release, CI completo, indexação ou resultados comerciais.

## 1. Diagnóstico e decisão recomendada

O caminho mais defensável para os próximos 90 dias é **melhorar a passagem da descoberta regional para as páginas dos empreendimentos e medir contatos qualificados**, aproveitando a estrutura existente. A evidência não justifica começar por novos domínios, dezenas de artigos ou outra reformulação geral do site.

Higienópolis é o melhor primeiro experimento operacional: já há procura nominal, cliques observados e uma revisão delimitada em andamento. Isso não demonstra maior retorno econômico que Vila Nova Conceição ou Lapa. Os três núcleos continuam no plano; a ordem financeira entre eles permanece indeterminada sem disponibilidade atendível, leads qualificados, visitas, vendas e remuneração comparáveis.

As vulnerabilidades mais relevantes são: fatos comerciais envelhecidos ou vinculados a unidades diferentes; documentos históricos que parecem descrever pendências já resolvidas; fronteiras ainda não registradas entre os ativos; e mensuração insuficiente do resultado após o clique. Aumentar palavras, FAQs ou entidades de schema não resolve esses pontos sozinho.

**Primeira ação concreta recomendada:** concluir a revisão do candidato Higienópolis da PR #422 no head `cf66a929c548fe782461dd5602b01db1636817a2`, preservando o que foi aprovado, e preparar seu recibo de validação. Em paralelo, fechar a matriz comercial dos oito projetos exatos já atendidos e das três entidades adicionais do complexo. A publicação permanece uma decisão posterior do consumidor.

## 2. Fontes, cobertura e mapa de afirmações

O encaminhamento foi lido antes da análise. Os **114 itens do MANIFESTO_SHA256.csv conferiram, sem divergências**. Após extrair os sete CSVs do ZIP GSC interno, o inventário de trabalho contém 122 arquivos, incluindo manifesto e encaminhamento. Todas as linhas dos seis brutos Planner e dos quatro ATP foram processadas; todos os CSV/JSON disponíveis foram abertos e suas estruturas examinadas, junto aos documentos, textos extraídos, código de consolidação e HTML candidato. Duplicatas documentais/derivadas não foram contadas como pesquisas independentes. O inventário anexo registra caminhos e hashes.

**Não estão no pacote:** os nove CSVs originais de 13/09 e os oito PDFs de mercado, totalizando 46 páginas, referidos pela auditoria histórica. Foi lida a auditoria e suas sínteses; não houve releitura independente desses originais ausentes. Isso limita especialmente conclusões sobre compradores, renda e personas.

| ID | Afirmação material | Fonte e data | Classe / limite |
|---|---|---|---|
| E01 | 16.257 linhas e 13.686 keywords literais nos seis brutos | `01-estudo-historico-github/docs/search/data/search-intelligence/raw/.../2026-09-29/` | Recalculado integralmente; período set/2025–ago/2026; estimativas, não tráfego |
| E02 | O recorte bruto Higienópolis não representa sua demanda inteira | `02-consolidacao.../01-planner-bruto-recorte-rastreavel.csv` e consolidação anterior | Seleção lexical com 18 candidatos de locação/portal não invalida Ária/Mozae |
| E03 | Planner e pesquisas históricas têm universos e métodos diferentes | `MNT_M3_USER_RESEARCH_INPUT_AUDIT_2026-09-13.md` | Auditoria secundária; originais anteriores ausentes; sem somar bases |
| E04 | ATP contém duplicações, ruído e conflitos | Quatro CSVs originais de 16/10 | 657 registros, 372 expressões distintas somadas por arquivo; não tamanho de mercado |
| E05 | GSC registra 52 cliques/1.199 impressões no gráfico | ZIP original, `Gráfico.csv`, exportado 16/10 | 47 datas: 29/08–14/10; não 90 dias completos |
| E06 | Páginas e consultas não fecham com o gráfico | `Páginas.csv`, `Consultas.csv`, `Filtros.csv` | 54/1.233 em 42 páginas; 5/393 em 100 consultas; dimensões separadas |
| E07 | Higienópolis possui maior tração observada neste recorte | Três linhas de página Higienópolis no mesmo ZIP | Não demonstra ROI ou taxa de conversão; amostras pequenas |
| E08 | Mobile não representa 90% dos cliques orgânicos desta exportação | `Dispositivos.csv`, 16/10 | 16/52 cliques, 30,77%; não representa todos os canais/sessões |
| E09 | Mapa M3-06 contém decisões superadas | M3-06 de 13/09 versus reconciliação de ownership de 30/09 | Não criar master `/caminhos-da-lapa/`; ELO não herda owner ELO Duo |
| E10 | Parte do backlog Lapa já foi executada | `MNT_CAMINHOS_EXACT_PROJECT_SEO_GAP_ANALYSIS_2026-09-30.md`, reconciliação final | Reserva, FAQ ELO Duo e enriquecimento Garden/Nova executados; não recriar |
| E11 | O padrão regional foi promovido | `MNT_REGIONAL_PAGE_JSONLD_STANDARD_V1_2026-10-05.md` e parecer SES | Supera a restrição do piloto de 01/10; não certifica cada página atual |
| E12 | Reserva tem modelo posterior de revenda/mercado secundário | `MNT_LAPA_EXACT_PROJECT_PAGE_STANDARD_V1_2026-10-03.md` | Supera tratamento apenas histórico de 28/09; não prova unidade disponível hoje |
| E13 | Tièl não continua no bloqueio da primeira proposta de schema | Recibo de release Tièl de 12/10, consultado no GitHub | PRs #393–396 e aceite relatados; CWV/QA independente continuam separados |
| E14 | Caminhos Oficial é fonte externa, não ativo próprio | `04-ecossistema/config/assets.yaml`, lifecycle e encaminhamento 17/10 | Registro de placement permanece candidate/partial; não autoriza migração |
| E15 | A jornada comercial MoreTegra fica no MoreTegra até contato | Encaminhamento, decisão de 17/10 | Decisão de produto mais recente; ainda pendente de reconciliação documental nos repos |
| E16 | PR #422 segue aberta/Draft e sem merge | Consulta GitHub de 17/10, head cf66a92 | Verificação live; `statuses: []` não comprova CI completo nem CI aprovado |
| E17 | Candidato tem 4 cards, H1 único, 10 FAQs visíveis/schema, sem Product/Offer regional | HTML em `05-candidato-higienopolis/`, inspeção estática nesta avaliação | Sem navegador, sem prova de renderização/toque/CWV/CRM |
| E18 | 12 páginas comerciais/regionais retornam 200, self-canonical e meta robots indexável | Leitura HTTP direta de 17/10, arquivo de evidências anexo | HTML recebido; não é inspeção Google nem verificação de headers em toda a cadeia |
| E19 | Topic Insights: 1/10 citado e share reportado de 25% | Encaminhamento, rodada 16/10, relato do usuário | Sem respostas completas, fontes ou denominador do share; causalidade desconhecida |
| E20 | FAQ rich results e llms.txt não são oportunidades de destaque Google | Documentação Google consultada em 17/10, referências ao final | FAQ feature retirada; llms.txt ignorado para visibilidade/ranking Google; não generalizar a todos os motores |

Leituras live complementares: bootstrap, CURRENT, PROJECT_STATUS, NEXT_SAFE_ACTION, BLOCKED_ACTIONS e manifesto RESF do consumidor; padrão V1/adendos e recibo Tièl. Os ponteiros ainda carregam camadas históricas. A PR #422 confirma sua base, mas **não foi certificado um novo SHA global de main nem deployment Vercel nesta auditoria**. O parecer se apoia no snapshot fornecido, em leituras documentais atuais e no HTML público; qualquer execução deve resolver novamente head/base/deployment e conflitos.

## 3. Reconciliação temporal: o que manter, superar e deixar pendente

| Tema | Reconciliação | Consequência |
|---|---|---|
| Agosto: Green como produção, raiz sem www, metadata por JS | Bootstrap atual estabelece produção web Vercel e `www` canônico; Green Sales é captação/CRM | Não restaurar canonical antigo nem publicar no Green por instrução histórica |
| M3-06: master MoreTegra `/caminhos-da-lapa/` | Decisão de 30/09 mantém namespace reservado e proíbe criação duplicada | Complexo no ativo Caminhos; bairro na regional Lapa |
| M3-06: `elo ... preço` atribuído a ELO Duo | Encaminhamento de 17/10 e fontes posteriores distinguem as entidades | Corrigir futuramente o mapa documental; nenhuma reescrita/redirect automático |
| Setembro: Reserva só histórico/alternativas | Padrão de 03/10 já contempla mercado secundário via Sabrina | Preservar modelo aprovado, identificar revenda e confirmar cada oportunidade |
| Setembro: FAQ ELO Duo ausente; Garden/Nova pobres em contexto | Reconciliação documenta execução #314/#315; HTTP atual encontra FAQs | Retirar tarefas de criação do primeiro lote; avaliar apenas divergência real |
| 01/10: Higienópolis é piloto não generalizável | Padrão regional promovido em 05/10 após Higienópolis + Lapa | Reutilizar contrato factual; não copiar conteúdo, número de itens ou agentes |
| Tièl #393: candidato bloqueado | Recibo atual registra integração das PRs #393–396 e aceite | Não recriar entidades nem exigir resolver o mesmo bloqueio como se persistisse |
| Links Caminhos ↔ MoreTegra permitidos antes | Decisão posterior remove encaminhamento comercial de saída do MoreTegra | Registrar nova direção; preservar créditos/licenças/perfil/WhatsApp e links obrigatórios |
| Estudos recomendavam mais três pesquisas ATP | Os quatro originais de 16/10 já estão presentes | Não solicitar nem executar de novo como pré-requisito |
| Higienópolis oito cards | Candidato final consolida quatro ilustrados, desktop 2×2/mobile uma coluna | Preservar decisão visual; não voltar aos oito nem transformar quota em padrão universal |
| “Validar schema” como sinônimo de SEO pronto | Contratos posteriores separam paridade, completude, Google, experiência e conversão | Sem aprovação global por JSON válido, número de FAQs ou quantidade de entidades |

## 4. Diagnóstico SEO: demanda, concorrência e experiência

### Demanda e limitações

Planner sustenta interesse nominal histórico por Ária, Mozae, Bueno Brandão, Reserva e outros projetos. As médias consolidadas de 13/09 e os buckets dos brutos posteriores não são séries temporais comparáveis. Não somar variantes Reserva/Caminhos, volumes de fontes diferentes ou reproduções Google/Bing/YouTube/TikTok.

| ATP original de 16/10 | Registros | Expressões distintas | Tratamento reconciliado |
|---|---:|---:|---|
| Apartamento na Lapa | 195 | 105 | Preservar filtro anterior: 32 manter, 26 condicionais, 47 excluir; 8 conflitos intraplataforma e divergência adicional entre plataformas |
| Apartamento em Higienópolis | 73 | 40 | 14 manter, 18 excluir, 3 condicionais, 5 sociais separados; encontrados 2 conflitos intraplataforma em termos excluídos |
| Apartamento na Vila Nova Conceição | 29 | 12 | 7 pertinentes, 4 locação excluídos, 1 social separado; volume zero não elimina tema |
| Caminhos da Lapa | 360 | 215 | 62 expressões sociais separadas; 153 restantes precisam de destino por intenção, não de 153 páginas; 14 expressões com conflito |

Para Caminhos, usar quatro grupos: identidade/composição/condomínios; pesquisa de projeto; consulta comercial condicionada a estoque/modelo; e utilidades locais eventualmente editoriais. Aluguel, captação de proprietário e navegação exclusiva por portais ficam fora da aquisição atual MoreTegra. Cinema, feira, associação, CEP e telefone de condomínio não são automaticamente leads de compra. Publicar informações operacionais locais só com fonte e manutenção próprias. Não usar demanda de Home Club/Jerivás para presumir autorização de venda ou criar estoque.

### Linha de base GSC

Fonte de todos os números abaixo: exportação original de 16/10, **29/08 a 14/10**, Web. Posição é média da página em múltiplas consultas, países e dispositivos; não é ranking de palavra específica.

| URL no MoreTegra | Cliques | Impressões | Posição média | Leitura prática |
|---|---:|---:|---:|---|
| `/regioes/higienopolis/` | 5 | 19 | 35,58 | Poucas impressões; CTR 26,32% não é benchmark estável |
| `/empreendimentos/aria-higienopolis/` | 9 | 131 | 16,66 | Maior evidência de entrada entre os projetos do recorte |
| `/empreendimentos/mozae-higienopolis/` | 8 | 98 | 10,89 | Interesse nominal e oportunidade de apoiar decisão |
| `/regioes/vila-nova-conceicao/` | 0 | 17 | 28,59 | Exposição insuficiente para concluir fracasso |
| `/empreendimentos/tiel-vila-nova-conceicao/` | 0 | 9 | 9,56 | Amostra muito pequena; preservar release recente |
| `/empreendimentos/bueno-brandao-257/` | 0 | 8 | 19,88 | Sinal de demanda externa não virou tração demonstrada nesta janela |
| `/regioes/lapa/` | 0 | 7 | 54,43 | Priorizar clareza de seleção, não presumir erro técnico |
| `/empreendimentos/caminhos-da-lapa-elo-duo/` | 2 | 105 | 11,46 | Oportunidade de consulta qualificada; distinguir ELO |
| Mesma rota ELO Duo sem barra | 1 | 4 | 4,00 | Registro histórico separado; não prova canonical quebrado hoje |
| `/empreendimentos/nova-vivere/` | 1 | 40 | 10,38 | Consulta exata “nova vivere caminhos da lapa” está em 43 com 8 impressões; não confundir |
| `/empreendimentos/garden-design/` | 0 | 13 | 17,69 | Não justifica troca de title/H1 pelo desempenho de amostra pequena |
| `/empreendimentos/reserva-caminhos-da-lapa/` | 1 | 19 | 16,16 | Separar intenção entidade/revenda de estoque da incorporadora |

O gráfico totaliza 52/1.199, CTR calculado **4,34%**. A soma da tabela de páginas é 54/1.233 e a de consultas é 5/393. Preservar as três superfícies, sem inventar linhas ocultas ou atribuir cada consulta a uma página. O ZIP não contém consulta × página × data. A documentação Google explica que agregação, limites e anonimização podem produzir diferenças; ela não identifica a causa exata de cada diferença deste arquivo.

Em dispositivos: computador 36 cliques/692 impressões; celular 16/502; tablet 0/5. Mobile segue como prioridade de projeto, mas a alegação de >90% do tráfego permanece não comprovada e não corresponde a este recorte de cliques orgânicos.

### Concorrência observada em 17/10

Pesquisa exploratória com dois mecanismos, consultas em português qualificadas para São Paulo. A localização do usuário final não foi controlada: **não é auditoria de Google local em São Paulo, ranking top 10 ou share of voice**. Listagem de resultados não prova liderança. As páginas dos próprios concorrentes foram usadas para observar apresentação, nunca como autoridade sobre nosso preço/estoque.

| Família consultada | Superfícies encontradas | Implicação estratégica |
|---|---|---|
| Ária Higienópolis | Tegra, QuintoAndar, Booking, ZAP e especialistas | Nome do prédio reúne compra, locação e hospedagem; qualificar venda/moradia sem importar promessa de renda |
| Mozae Higienópolis | Tegra, Real 21, iApartamentos, Apto e domínios dedicados | A presença Real 21 foi reencontrada, mas não foi demonstrado por que uma IA a escolheu |
| Bueno Brandão 257 | Domínios dedicados, portais e fonte autoral KV | Competir por utilidade técnica e atendimento qualificado; não apenas adjetivos de luxo |
| Tièl Vila Nova Conceição | Tegra, QuintoAndar e especialistas | Tornar inequívoca a tipologia compacta, sem misturá-la ao produto Bueno |
| Caminhos / Nova Vivere / ELO Duo | Oficial do complexo, Tegra/Helbor, especialistas e portais | Identidade e lifecycle precisam ser mais claros que a nomenclatura confusa encontrada em terceiros |
| Apartamento nos três bairros | QuintoAndar, Viva Real/ZAP e imobiliárias | MoreTegra oferece seleção Tegra; não precisa prometer cobertura de todo o mercado |

O resultado da Real 21 consultado apresentou metragens de Mozae diferentes das fontes governadas do pacote. Outros portais misturam ELO/ELO Duo ou exibem estágio/data de modo inconsistente. **Isso demonstra risco de copiar terceiros, não superioridade automática do MoreTegra nem erro comercial definitivamente auditado nesses sites.**

Na leitura HTTP direta desta sessão, Home + três regionais + oito páginas exatas retornaram 200, um H1, self-canonical e meta robots indexável. O primeiro mecanismo de leitura chegou a falhar em Lapa/VNC; a leitura direta confirmou 200 e a segunda leitura de Lapa também funcionou. Não existe finding de 404 sustentado. Não foram medidos CWV, renderização real, Google-selected canonical, atribuição ou entrega CRM.

## 5. Arquitetura reconciliada e mapa de intenções

| Superfície | Intenção proprietária | Próximo passo comercial | Limites |
|---|---|---|---|
| Home MoreTegra | Portfólio Tegra atendido em São Paulo | Empreendimento; regional quando útil; Form46/WhatsApp | Não simular site institucional nem todas as ofertas do mercado |
| Regional Higienópolis | Descobrir e escolher Ária/Mozae | Página exata adequada | Comparar momento/tipologia; não duplicar preços por unidade |
| Regional VNC | Descoberta com bifurcação de necessidade | Tièl para compactos; Bueno para grandes residências | Não sugerir substituição direta por bairro comum |
| Regional Lapa | Geografia e seleção Tegra na Lapa/SP | Projetos exatos verificados | Não virar segunda página master do complexo |
| Páginas exatas MoreTegra | Nome + planta + preço + unidade + disponibilidade + visita | Form46/WhatsApp com contexto do projeto | Seções na mesma URL; sem doorway para cada modificador |
| Caminhos da Lapa Tegra | Complexo, Rua Jardim, fases, história e contexto durável dos sete projetos | MoreTegra pertinente quando a oferta for atendida | Papel editorial distinto; não duplicar proposta comercial/estoque |
| Blogs especializados | Dúvida contextual com experiência e utilidade próprias | Regional ou projeto pertinente | Marca/domínio/operação ainda precisam de placement; sem rede artificial |
| Portal híbrido multimarcas | Descoberta/comparação editorial entre incorporadoras | Tegra → MoreTegra; demais → respectivos destinos | Conceito aprovado; nome, domínio e marcas concretas não definidos |
| Estágios | Lançamento, construção e pronto, com membros verificados | Página exata | Rotas reservadas/propostas não são publicação; não criar lote automaticamente |
| Caminhos Oficial / sites institucionais | Fonte externa factual | Não integra navegação comercial proposta MoreTegra | Não é ativo próprio nem candidato a receber migração do seu domínio |

**Jornada aprovada:** Home ou regional MoreTegra → empreendimento → contato. Editorial/portal/Caminhos → destino comercial pertinente. Não inserir saídas comerciais MoreTegra → portal/blog/concorrentes. Isso não proíbe links internos MoreTegra, WhatsApp, perfil profissional ou atribuições obrigatórias de mídia. Não apagar indiscriminadamente links existentes.

O conceito multimarcas foi incluído por orientação do usuário; “outras empresas” foi interpretado como incorporadoras. Nenhuma lista de marcas foi validada. Não criar `/blog` no MoreTegra nem registrar domínio novo como consequência automática deste parecer.

Para Caminhos, manter Home Club, Jerivás, ELO, ELO Duo, Reserva, Garden e Nova como sete entidades distintas. Os quatro owners exatos existentes MoreTegra não precisam ser replicados integralmente no domínio editorial. ELO/Jerivás/Home Club mantêm contexto durável em Caminhos; eventual oferta comercial exigirá fonte, modelo de atendimento e URL deliberadamente escolhida. Não criar páginas MoreTegra desses três apenas para completar um conjunto.

## 6. Prioridades por URL e primeiro lote

Classes: **G0** = dependência/fidelidade/mensuração; **L1** = primeiro lote recomendado; **L2** = sequência condicionada; **M** = manter/monitorar. Não são ranking de ROI. Esforços abaixo são estimativas novas de planejamento em horas de trabalho focado; não são horas SFJM aceitas e não incluem espera por dados, reviews ou calendário de publicação.

| URL / escopo | Classe | Manter, atualizar ou criar | Ação mínima e dependência | Esforço |
|---|---|---|---|---:|
| Todas as oito páginas exatas | G0 | Atualizar evidências antes de valores | Matriz nome/unidade/área/preço/condição/data/fonte/estoque/modelo; comparação Home ↔ HTML ↔ Offer | 8–12 h total |
| Mensuração das três regionais e oito exatas | G0 | Validar existente | Contexto projeto/região, sucesso real, testes excluídos, deduplicação e origem CRM; sem novo tracking nesta avaliação | 6–10 h total |
| `/regioes/higienopolis/` | L1 | Concluir candidato existente | QA exato PR #422; cards/comparação antes do bairro; preservar 4 cards e Form46; sem reconstruir | 3–5 h |
| `/empreendimentos/aria-higienopolis/` | L1 | Manter; atualizar delta factual | Confirmar disponibilidade por tipologia e coerência da referência comercial; melhorar apenas resposta ainda faltante | 2–4 h |
| `/empreendimentos/mozae-higienopolis/` | L1 | Manter; atualizar delta factual | Preservar 46/73 m², imagem/galeria e identidade aprovadas; separar projeto de unidade; sem copiar metragem concorrente | 2–4 h |
| `/empreendimentos/caminhos-da-lapa-elo-duo/` | L1 condicional | Manter FAQ/title/H1 | Checar preço/unidade; consolidar diagnóstico de alias sem barra via HTTP/GSC; ELO != ELO Duo | 2–4 h |
| `/regioes/lapa/` | L2 | Atualizar de forma delimitada | Seleção/comparação perto do início; resposta de consulta de preço; transporte específico somente com fonte | 4–6 h |
| `/empreendimentos/nova-vivere/` | L2; G0 comercial antes | Manter estrutura | Validar referências 72/105 e unidades distintas; preço/condição/Offer coerentes; não refazer enriquecimento já entregue | 2–4 h |
| `/empreendimentos/garden-design/` | L2; G0 comercial antes | Manter estrutura | Reconciliar unidade 0112 versus 101 e datas; diferença entre unidades não é contradição provada | 2–4 h |
| `/empreendimentos/reserva-caminhos-da-lapa/` | G0 lifecycle; M editorial | Manter modelo aprovado | Identificar mercado secundário, confirmar oportunidade concreta; não apresentar estoque Tegra; preservar entidade/plantas | 2–4 h |
| `/regioes/vila-nova-conceicao/` | L2 | Atualizar seleção | Compacto x grande residência por necessidade; verificar lacuna no HTML atual antes de editar | 3–5 h |
| `/empreendimentos/bueno-brandao-257/` | L2 condicional | Manter; preparar delta | Resolver overlap PR #412 antes de trabalho; comparar planta tipo/garden/cobertura somente com fontes válidas | 4–6 h |
| `/empreendimentos/tiel-vila-nova-conceicao/` | M / QA | Manter release recente | Separação 19 m² ilustrativos x 21 m² unidade, QA pendente e mensuração; não reconstruir schema já entregue | 2–3 h |
| `https://www.caminhosdalapategra.com.br/` | G0 ownership; L2 editorial | Manter e atualizar com consumer próprio | Matriz sete entidades, papéis e CTAs; GSC atual do próprio domínio antes de consolidação técnica | 6–10 h |
| Caminhos `/home-club/`, `/jerivas/`, `/elo/`, `/eloduo/`, `/reserva/` | L2 condicional | Auditar antes de atualizar | Preservar URLs; contexto durável separado de venda atual; confirmar domínio/canonical efetivos por rota | 4–8 h conjunto |
| Home MoreTegra | M | Manter | Conferir encaminhamento e contexto das ofertas; sem ampliar catálogo com esgotados ou mudar hero sem evidência | 1–2 h |
| `/llms.txt`, `/.well-known/ai.txt`, robots/sitemap | M | Manter | HTTP 200 e tipos textuais/XML observados; preservar política e identidade; sem expectativa de ganho Google por llms.txt | 1–2 h |
| Estágios `/estagios/.../` | L2 condicionado | Não criar já | Revalidar se existem e adoção vigente; selecionar um piloto apenas se houver tese e manutenção | Estimar após inventário |
| Blogs / portal híbrido | L2 condicionado | Planejar; sem domínio novo automático | Brief de ativo, owner, operação e três pautas úteis; publicação exige decisão específica | 4–6 h de desenho |

**Sequência parcial determinada:** fatos/contrato de conversão → qualquer alteração comercial; QA do candidato → eventual publicação; owner correto → novo conteúdo. **Sequência não determinada por evidência econômica:** Ária vs Bueno vs Reserva; Higienópolis vs VNC vs Lapa. Se um projeto estiver sem oferta atendível, sua tarefa comercial sai do lote e preserva-se sua cobertura factual. Se dados de vendas mostrarem maior valor esperado em outro núcleo com oferta válida, reordenar a execução sem alterar a arquitetura.

Primeiro lote recomendado: G0 comercial/medição + encerramento do candidato Higienópolis + verificação dos deltas de Ária/Mozae. São **21–35 h estimadas**, sem somar tarefas globais por URL novamente. ELO Duo é a próxima alternativa de baixo escopo quando fatos e dados estiverem resolvidos. Não sobrescrever o NEXT_SAFE_ACTION global Órbita com esta recomendação; registrar tarefa estratégica separada e reconciliar a fila com Wagner.

Critério por URL alterada: fonte comercial datada, ownership preservado, diff mínimo, QA mobile/desktop, links e estados do formulário, paridade visível/schema, checks do head, publicação aprovada, deployment/HTTP após release e recibo/rollback próprios. Um PASS estático não substitui outro gate.

## 7. Revisão específica do candidato Higienópolis

**Parecer: favorável à direção estratégica, com liberação de produção ainda pendente.** A revisão reduz a distância entre intenção de compra e escolha de projeto. A ordem de seções observada no HTML é hero → empreendimentos → escolha/comparação → bairro → quatro cards → tipologias → formulário → FAQ.

A comparação estática independente com o HTML público também confirmou o formulário e os três scripts externos idênticos entre produção e candidato; isso não prova execução em navegador. Verificados nesta avaliação: um H1; quatro `.neighborhood-card`; dez `<details>` e dez perguntas em FAQPage; ausência de Product/Offer regional; referências próprias de Ária/Mozae. A PR live continua Draft/open, merged=false, com dois arquivos alterados. O endpoint consultado de status de commit retornou lista vazia: não é certificação dos workflows GitHub Actions.

Preservar: title/H1 aprovados, hero, identidade, quatro fotografias com créditos, 2×2 desktop/uma coluna mobile, seletor/contexto de projeto, Form46, scripts e consentimento. Não há razão para refazer a página ou aumentar texto para uma meta de SEO.

Gates residuais: confirmar head servido no Live Sync; testar largura pequena, toque e foco, cards/âncoras, crop/carregamento das quatro fotos, consent banner e CTA fixo sem sobreposição; validar seleção do projeto até o formulário sem envio; recuperar CI completo; medir performance quando aplicável. Não houve teste real de CRM nem de CWV nesta auditoria. O aceite “ficou ótimo” permanece USER_REPORTED sem comprovação independente do head final servido. As condições comerciais dos empreendimentos exigem revalidação própria.

## 8. GEO: respostas citáveis e protocolo de evidência

GEO aqui significa descoberta e citação em respostas de IA, não posicionamento geográfico local. O trabalho deve melhorar a utilidade de conteúdo e a identificação das entidades: empreendimento, tipologia, momento de compra, complexo, bairro, unidade de referência e responsável pelo atendimento. Respostas curtas funcionam quando respondem uma dúvida; não transformar o site em fragmentos artificiais para cada pergunta.

Priorizar três ativos de informação: comparação verificável Ária/Mozae na regional; bifurcação Tièl/Bueno por necessidade; quadro claro das sete entidades Caminhos. Nas páginas exatas, responder planta/metragem, estágio, preço condicionado à referência e como confirmar disponibilidade. Incluir experiência comercial verificável, materiais próprios autorizados e análise concreta de planta quando disponíveis, em vez de apenas reescrever material institucional.

A documentação Google consultada em 17/10 atualiza dois pressupostos: FAQ rich results deixaram de aparecer em maio/2026; e Google Search ignora llms.txt para visibilidade/ranking. Manter FAQs úteis, a paridade JSON-LD e o índice já aprovado continua compatível com o projeto, mas **não são promessas de citação nem uma razão para priorizar mais arquivos de IA**. A documentação também descreve um relatório de desempenho de IA generativa; sua disponibilidade/configuração nesta propriedade não foi consultada. Não presumir que o ZIP Web recebido contenha separação de IA.

Protocolo proposto, sem automação criada:

1. Preservar o conjunto original de dez perguntas como versão V1 e arquivar a rodada 16/10.
2. Na rodada prevista para 23/10, repetir V1 no mesmo serviço/modelo declarado, idioma e configuração. Guardar pergunta, resposta integral, data/hora, fontes citadas, URL, entidade e correção factual.
3. Criar V2 dos três núcleos como série separada, aproveitando as quinze perguntas propostas no estudo. Registrar que são prompts editoriais, não consultas GSC observadas.
4. Medir por motor/modelo/versão: prompts respondidos, prompts com citação ao domínio, URL citada, menção sem citação, acurácia e encaminhamento comercial correto. Repetições são diagnóstico de variabilidade, não usuários independentes.
5. Não calcular melhora causal comparando V1 contra V2; não interpretar competitive share 25% sem denominador; não atribuir ausência a indexação/conteúdo sem evidência.

Se uma resposta citar área, estágio ou oferta errada, investigar a fonte que sustenta esse erro e corrigir a informação governada pertinente; não criar imediatamente outra página. Uso de robôs/treinamento e referências de identidade permanece conforme decisão aprovada. Permissão de rastreamento não implica uso, treinamento, citação ou concessão de direitos sobre mídia de terceiros.

## 9. Conteúdo editorial e autoridade

| Pauta candidata | Owner adequado | Valor próprio e encaminhamento |
|---|---|---|
| Ária ou Mozae: prazo, plantas e uso dos espaços | Seção regional Higienópolis existente | Comparação factual; levar às exatas sem página duplicada |
| Como avaliar uma planta compacta na VNC | Blog especializado ou portal, após placement | Análise original de circulação/uso com plantas autorizadas; Tièl quando pertinente, sem prometer rendimento |
| O que muda entre apartamento tipo, garden e cobertura no Bueno | Página Bueno, como seção | Ajudar decisão do mesmo projeto; sem URLs finas para cada variante |
| Quais condomínios integram Caminhos e como se distinguem | Propriedade Caminhos existente | Mapa das sete entidades com fontes e data; encaminhar ofertas atendidas ao MoreTegra |
| ELO e ELO Duo são o mesmo projeto? | Contexto Caminhos; resumo pertinente no owner exato | Desambiguação factual; sem fundir URLs ou copiar catálogo |
| Comprar pronto ou durante a obra: critérios concretos | Um owner editorial escolhido, com referência dos projetos | Sem fluxo financeiro universal nem previsão de valorização |
| Plantas Nova 72/105 ou Garden por tipologia | Respectiva página exata | Rotina, vagas e configuração comprovadas; não repetir toda a informação na regional |

Nos primeiros 90 dias, priorizar atualizações e **até três pautas editoriais de fato distintas**, condicionadas à capacidade de produzir e manter material próprio. Não é uma quota de publicação. Se o portal/blog não tiver operação e owner definidos, preparar briefs e melhorar os owners existentes; não criar domínio para acomodar o calendário.

Autoridade deve resultar de recursos úteis: análise de plantas com fontes, fotografias próprias autorizadas, entrevistas identificadas, história documentada do complexo e informações verificáveis que uma publicação possa referenciar espontaneamente. Propor relacionamento editorial legítimo com veículos/entidades relevantes quando houver material publicável; não executar contato nesta avaliação. Sem compra/troca de links, PBN, depoimentos inventados ou “matérias” que só reproduzem oferta.

Local SEO/Authority & Digital PR constam como papéis futuros/não adotáveis no registry fornecido, sem certificação atual independente nesta sessão. As sugestões são estratégicas; não constituem execução por especialista certificado nem criação de Google Business Profile. Endereço de empreendimento, estande e endereço profissional devem continuar distintos.

## 10. Plano de 90 dias

Cronograma proposto se o ciclo começar em 18/10/2026: dia 1–30 = 18/10–16/11; dia 31–60 = 17/11–16/12; dia 61–90 = 17/12–15/01/2027. Datas são marcos de trabalho, sem garantia de indexação, ranking, citação ou venda. Publicações dependem de autorizações e gates já estabelecidos.

| Janela | Entregas | Responsabilidade proposta | Evidência de conclusão / condição de avanço |
|---|---|---|---|
| Dias 1–7 | Matriz factual; baseline congelada GSC/CRM; pendências head #422; reconciliação documental de links/owners preparada | Product Authority + Analytics + Technical/Content | Oito owners exatos e sete entidades mapeados sem estoque presumido; QA do candidato descrito; sem dados faltantes convertidos em zero |
| Dias 8–30 | Concluir Higienópolis conforme autorização; deltas mínimos Ária/Mozae; investigar alias ELO Duo; proposta Lapa perto da dobra | Consumer + Content + Technical | Recibo por alteração; teste de contexto/sucesso quando autorizado; sem regressão de Form46/consentimento; primeira observação pós-release |
| Dias 31–45 | Lapa e VNC regional em lotes independentes; Nova/Garden/Reserva conforme fatos; resolver overlap Bueno antes de editar | Consumer + Product Authority | Jornada regional → exata clara; disponibilidade e tipo de operação identificados; nenhuma URL nova por variante |
| Dias 46–60 | Conteúdo Caminhos e primeiro recurso editorial original; brief portal/blog se aprovado; primeira comparação de janelas equivalentes | Content + Strategy + Analytics | Fonte, owner e manutenção definidos; GSC dos dois domínios comparável; atribuição de contato separada de clique |
| Dias 61–75 | Segundo/terceiro recurso útil se justificados; reforçar links internos reais; investigar consultas com owner divergente | Content + Technical + Analytics | Nenhuma duplicação comercial entre domínios; variações de resposta IA documentadas com fontes |
| Dias 76–90 | Revisão de desempenho por URL/projeto, qualidade de contatos/visitas, custo de manutenção e próximo trimestre | Strategy + Analytics + Wagner | Manter/ajustar/interromper por evidência; prioridade econômica somente se houver denominador comparável |

Concluir G0 e validar as primeiras mudanças tem precedência sobre preencher calendário editorial. A descoberta de falha de conversão, preço material errado ou indisponibilidade atendível suspende a ampliação comercial da URL afetada. Não exige apagar sua entidade nem desfazer outras páginas.

## 11. KPIs e critérios de avaliação

| Camada | Métrica / contrato | Linha de base | Uso correto |
|---|---|---|---|
| Search | Cliques/impressões/CTR por URL e família; país/dispositivo constantes | GSC 29/08–14/10, com dimensões preservadas | Comparar janelas iguais; séries diárias e contagens antes de percentuais |
| Ownership | Consulta × página × data e mudanças do owner predominante | Ausente no ZIP | Detectar sobreposição; mais de uma URL não prova canibalização prejudicial |
| Jornada | Passagem regional → exata, por projeto | Não calculada | Validar evento/classificador já existente antes de propor outro |
| Captação | Sucesso Form46 aceito/deduplicado e contato WhatsApp separado | Baseline comercial não demonstrada | Clique WhatsApp é intenção, não conversa ou lead qualificado |
| Qualidade | Contato válido, interesse em projeto atendido e necessidade identificada | Não baselined | Classificar no CRM; não enviar PII ou texto livre ao Analytics |
| Comercial | Leads qualificados → visitas agendadas → visitas realizadas → proposta → venda | Não fornecida | Definir coorte e janela de acompanhamento; não dividir vendas atuais por leads de outra janela |
| Eficiência | Custo orgânico atribuível por lead qualificado/visita; comissão líquida esperada quando houver dados | Indeterminado | Não atribuir “CPL zero” a orgânico nem usar preço do imóvel como valor da conversão |
| GEO | Citação/menção/acurácia por motor, versão e conjunto fixo | V1: 1/10 reportado | Guardar respostas e URLs; share de 25% sem denominador fica apenas reportado |
| Técnica | Indexação/canonical escolhida; problemas por URL; LCP/INP/CLS | Sem medição nova nesta avaliação | Targets 2,5 s/200 ms/0,1; laboratório não substitui campo |

Metas de execução propostas: 100% dos owners do lote com fonte e estado comercial; nenhum preço/schema contraditório introduzido; 100% das alterações com recibo e rollback; nenhuma submissão de teste na contagem comercial; contexto de projeto preservado quando validado. Metas numéricas de leads, vendas e crescimento de tráfego serão definidas após baseline limpa, volume e capacidade comercial. Fixá-las agora criaria precisão sem base.

Os sete `generate_lead` de setembro foram adjudicados TEST_ONLY. Não devem virar baseline de vendas. Taxa orgânica só é computável com numerador comercial válido e denominador Organic Search da mesma propriedade/janela/semântica. Não usar tentativa de envio, abertura de formulário ou acesso direto ao obrigado como lead.

Proposta de leitura: semanal para bugs/fatos; a cada 28 dias para sinal de Search e jornada; no dia 60/90 para decisão estratégica. Com amostras pequenas, manter contagens e intervalos de exposição; não declarar vitória por um clique extra. Mudança de conteúdo, estoque, sazonalidade e idade da URL confundem antes/depois; não inferir causalidade sem desenho suficiente.

## 12. Riscos, dependências e encaminhamentos

| Encaminhamento | Entrega concreta solicitada | Condição que impede avanço |
|---|---|---|
| SES — Technical SEO Specialist | HTTP/canonical/Google-selected canonical por rota, alias ELO, indexação e diagnóstico CWV; revisar diferenças iniciais/renderizadas quando material | Sem afirmar indexação/CI/performance de coleta estática |
| SES — Content & Semantic SEO Specialist | Delta regional/exata, desambiguação ELO, respostas e comparação sem duplicação; manter padrão aprovado | Sem preço/estoque/entrega ou distâncias não governados |
| SES — SEO Analytics & Growth Specialist | GSC consulta-página-data das duas propriedades; baseline limpa GA4/CRM e qualidade dos contatos; verificar relatório IA disponível | Sem somar dimensões, misturar teste e negócio ou inferir ROI |
| Consumer / Wagner | Verdade comercial e prioridade final; overlaps e aprovação de mudança/release | Parecer não autoriza produção, orçamento ou novo domínio |
| Governança provider/consumer | Registrar política de saída de 17/10, owner Caminhos e correções de mapas legados | Não resolver conflito documental com redirect/noindex/canonical destrutivo |

Handoffs acima estão preparados como recomendações; não foram enviados a outros especialistas. Não há alegação de revisão independente adicional.

Lacunas materiais: GSC atual do domínio Caminhos; consulta × página × data comparável; leads qualificados/visitas/vendas por origem e projeto; fonte comercial vigente por unidade; originais históricos de mercado ausentes; respostas completas Topic Insights; CI completo da PR #422; teste mobile e CRM do candidato; SHA global de main/deployment resolvidos para eventual execução; registry SES live para papéis futuros. Não é necessário reenviar arquivos já presentes para continuar o que não depende dessas lacunas.

**Veredito:** a arquitetura comercial e editorial é coerente após a reconciliação; a estratégia recomendada é consolidar conversão e clareza factual nas URLs existentes, testar primeiro Higienópolis e desenvolver Lapa/VNC em paralelo conforme oferta e capacidade. O pacote sustenta esse plano operacional, mas ainda não sustenta ranking financeiro dos núcleos, garantia de citações ou alegação de SEO integralmente concluído.

## Referências externas consultadas em 17/10/2026

- [Google — otimização para recursos de IA generativa](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): utilidade própria, llms.txt, estrutura e mensuração; guia mais recente que a página AI Features de 2025 também consultada.
- [Google — atualizações de documentação](https://developers.google.com/search/updates): 08/05 e 15/06/2026, retirada do FAQ rich result; esclarecimento sobre llms.txt.
- [Google — divergências no relatório de desempenho](https://support.google.com/webmasters/answer/17010575): agregação, anonimização e diferenças com outros sistemas.
- [Google — políticas de spam](https://developers.google.com/search/docs/essentials/spam-policies): limites para páginas/redes e conteúdo voltado a manipulação.
- [Real 21 — Mozae](https://real21.com.br/mozae-higienopolis/), [iApartamentos — Mozae](https://iapartamentos.com.br/empreendimento/mozae-higienopolis/), [Apto — Mozae](https://apto.vc/br/sp/sao-paulo/higienopolis/mozae-higienopolis): presença e apresentação concorrente, não autoridade de fatos do consumidor.
- [Tegra — Ária](https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/aria-higienopolis), [Tegra — Mozae](https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/mozaehigienopolis), [Tegra — Tièl](https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/vila-nova-conceicao/tielvilanovaconceicao), [Tegra — ELO Duo](https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/caminhos-da-lapa-elo-duo): fontes institucionais encontradas; disponibilidade permanece revalidação de negócio.
- [KV — Bueno Brandão](https://kvarch.com/projetos/bueno-brandao/): fonte autoral identificada, sem transferir autoridade sobre comercialização.
- [PR #422](https://github.com/wagnerjfjunior/MoreNumTegra/pull/422): estado live open/Draft no head informado, sem merge.

Anexos: inventário de fontes, evidências HTTP diretas e matriz executável de prioridades por URL. Nenhum anexo contém dados pessoais de leads.


---

# Recibo de execução do consumidor — 17/10/2026

Este complemento registra verificações próprias; não altera nem amplia as conclusões do parecer acima.

## Candidato verificado

- PR #422, Draft, aberta, sem merge. Head de código: cf66a929c548fe782461dd5602b01db1636817a2.
- Status do Live Sync observado no navegador conectado: branch feat/higienopolis-regional-search-20261017; HEAD e referência local origin cf66a929c548fe782461dd5602b01db1636817a2; worktree limpo; porta 8080; 40 rewrites. Conferência remota da PR confirmou o mesmo head.
- HTML preservado neste registro documental; nenhum ajuste adicional em página, produção ou rastreamento.

## Evidências próprias do navegador

- Regional local: quatro neighborhood-card, em duas colunas no viewport desktop de 1366 px.
- Mobile em aba de teste com viewport confirmado de 390 px: quatro cards em uma coluna, largura 343 px, início x=16; scrollWidth 375 px, sem overflow horizontal da página.
- Quatro fotos do bairro completas e naturalWidth positivo; fachadas Ária e Mozae também carregadas após navegação à seção de projetos.
- Link Ver Ária e Mozae levou a #empreendimentos.
- Receber condições do Ária levou a #formulario; dataset do formulário selectedProject=Ária Higienópolis, formId=46, regionContext=Higienópolis | São Paulo | Tegra.
- Receber condições do Mozae em mobile levou a #formulario; selectedProject=Mozae Higienópolis, mesmos formId e regionContext. Campos e botão visíveis entre x=40 e x=335, dentro da largura. Honeypot permanece fora da tela por desenho.
- FAQ de preço abriu com resposta contextual e sem oferta única para a região.
- Nenhum dado pessoal preenchido ou formulário enviado; nenhum contato CRM criado. Não houve comprovação de entrega CRM, eventos Analytics, atribuição ou conversão.
- Override temporário de viewport removido ao fim. Avaliação de geometria/DOM não substitui inspeção visual completa por screenshot nem teste em aparelho real.

## Checks existentes e limites

Os checks estáticos anteriores constam no recibo MNT_HIGIENOPOLIS_REGIONAL_SEARCH_UPDATE_2026-10-17.md. No head de código, os dois workflows reportados foram bem-sucedidos: contrato SEO de duas imagens nas 39 URLs (39056343110) e padrão de favicon (39056343105). Isso não é declaração de CI global completo.

## Próxima ação delimitada

1. Fechar matriz comercial com fonte, data, empreendimento, tipologia/unidade, estágio e disponibilidade confirmada; tratar divergências antes de alterar ofertas. Não inferir estoque a partir de entregue/pronto.
2. Validar mensuração de contatos qualificados e entrega Form46 em fluxo controlado, sem poluir CRM.
3. Concluir revisão visual e evidências de conversão; decisão de publicação separada. Preservar quatro cards e a jornada regional → empreendimento.
4. Depois, melhorias delimitadas Lapa/Vila Nova Conceição. Não reabrir pendências documentadas como executadas; não substituir NEXT_SAFE_ACTION global de outro fluxo por este parecer SEO.

Fonte recebida: Parecer_SES_SEO_GEO_2026-10-17.md. O ZIP de anexos citado no parecer não foi recebido nesta etapa; as verificações de manifesto e análises históricas acima são declarações atribuídas ao SES, não reprocessamento independente neste recibo.
