# MoreNumTegra — Matriz SEO editorial por artigo, etapa de funil e links internos (V1)

**Data:** 2026-10-19  
**Estado:** PLANEJAMENTO / DOCUMENTAÇÃO / SEM MUDANÇA EM RUNTIME  
**Main canônica consultada:** `24264f8a6afbfec71180ca22ac7c4eb84ed468fc`  
**Fontes canônicas:** `src-greenn/blog/catalogo-tegra-referencia.json` (48 títulos e slugs, sem conteúdo integral); `sitemap.xml` (destinos existentes); `docs/BLOCKED_ACTIONS.md`; RESF regional, e baseline Search Console documentado no dossiê da PR #442. Classificações abaixo são **hipóteses editoriais e comerciais**, não dados de volume de busca, conversão ou SERP validada.  

## 1. Princípio

Cada artigo responde a uma pergunta real, tem **uma URL principal de aprofundamento** e no máximo uma segunda saída contextual; links adicionais só se sustentados pelo texto. Não colocar três CTAs equivalentes em todos os parágrafos nem mandar o leitor indistintamente para a Home.

| Etapa | Busca/intenção | Destino editorial predominante | Conversão |
| --- | --- | --- | --- |
| **TOFU — descoberta** | dicas, conceitos, estilo de vida, ambientes | artigo relacionado, guia regional, em último caso Home | CTA sutil de exploração, sem urgência artificial |
| **MOFU — consideração** | bairro, tipologia, custos, investimento, comparação | hub regional / artigo de comparação; projeto exato secundário | CTA contextual "Conhecer opções na região" |
| **BOFU — decisão** | nome do produto, plantas, diferenciais, agendamento, condições | landing comercial exata | Form 46, ligar e mensagem Sabrina com contexto do projeto |
| **PAUSAR** | Rio de Janeiro, histórico institucional ou tema desalinhado | sem destino comercial inventado | manter no backlog e `noindex` |

O usuário pode progredir de TOFU → MOFU → BOFU, mas artigos podem atender a mais de uma etapa. O estágio principal é uma convenção de planejamento, não classificação universal.

## 2. Matriz individual das 48 pautas

Todas as URLs da coluna destino principal/secundário foram confrontadas com o sitemap da main em 19/10/2026. **Existir no sitemap não demonstra conteúdo correto, link público HTTP 200 nem oferta atual.** Caminhos apontam para páginas internas; textos completos das 48 matérias **não foram copiados nem publicados** e permanecem `noindex`.

| Nº | Editoria | Artigo (pauta atual) | Funil | Destino principal | Destino secundário | Observação de apuração |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Lifestyle | [Tênis, qualidade de vida e bem-estar: a conexão da Tegra com o esporte](/blog/lifestyle/tenis-qualidade-de-vida-e-bem-estar-a-conexao-da-tegra-com-o-esporte/) | TOFU | `/regioes/` | `/` | referências sobre bem-estar; evitar afirmar benefícios clínicos |
| 2 | Mercado imobiliário | [3 fatores que garantem a valorização de imóveis de luxo no longo prazo](/blog/mercado/3-fatores-que-garantem-a-valorizacao-de-imoveis-de-luxo-no-longo-prazo/) | MOFU | `/regioes/vila-nova-conceicao/` | `/` | evitar promessa de valorização; abordar critérios observáveis |
| 3 | Mercado imobiliário | [Mooca e Tatuapé: tradição, modernidade e infraestrutura na Zona Leste](/blog/mercado/mooca-e-tatuape-tradicao-modernidade-e-infraestrutura-na-zona-leste/) | MOFU | `/regioes/tatuape/` | `/empreendimentos/universo-tatuape-orbita/` | comparar bairros; conduzir ao produto somente quando pertinente |
| 4 | Mercado imobiliário | [Gentileza urbana: o papel dos empreendimentos na valorização do bairro](/blog/mercado/gentileza-urbana-o-papel-dos-empreendimentos-na-valorizacao-do-bairro/) | TOFU | `/regioes/` | `/` | distinguir gentileza urbana de valorização financeira |
| 5 | Mercado imobiliário | [ESG na construção civil: sustentabilidade e patrimônio](/blog/mercado/esg-na-construcao-civil-como-predio-sustentavel-valorizam-patrimonio/) | TOFU | `/` | `/regioes/` | apuração sobre ESG; não prometer retorno |
| 6 | Mercado imobiliário | [IPTU: saiba tudo sobre o imposto anual e planeje seu pagamento](/blog/mercado/iptu-saiba-tudo-sobre-o-imposto-anual-e-planeje-seu-pagamento/) | MOFU | `/` | `/regioes/` | revisão tributária e data de vigência obrigatórias |
| 7 | Mercado imobiliário | [Lapa: o novo polo de valorização na Zona Oeste de São Paulo](/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/) | MOFU | `/regioes/lapa/` | `/empreendimentos/caminhos-da-lapa-elo-duo/` | evitar afirmações quantitativas sem fonte |
| 8 | Mercado imobiliário | [Investimento a longo prazo: por que comprar um imóvel é uma estratégia](/blog/mercado/investimento-a-longo-prazo-comprar-um-imovel/) | MOFU | `/` | `/regioes/` | orientação sobre riscos de longo prazo |
| 9 | Mercado imobiliário | [FIIs vs imóvel físico: qual a melhor estratégia para investir?](/blog/mercado/fiis-vs-imovel-fisico-qual-a-melhor-estrategia-para-investir/) | MOFU | `/` | `/regioes/` | conteúdo financeiro exige revisão; sem recomendação de investimento |
| 10 | Mercado imobiliário | [A Orla da Barra da Tijuca: o novo cenário do luxo no Rio de Janeiro](/blog/mercado/a-orla-da-barra-da-tijuca-luxo-no-rio-de-janeiro/) | PAUSAR | — | — | foco Rio de Janeiro fora do catálogo SP atual |
| 11 | Mercado imobiliário | [Imóveis de luxo: por que investir no mercado de alto padrão?](/blog/mercado/imoveis-de-luxo-por-que-investir-no-mercado-de-alto-padrao/) | MOFU | `/regioes/vila-nova-conceicao/` | `/` | não inferir faixa de preço nem qualificação de luxo |
| 12 | Mercado imobiliário | [Guia do Itaim Bibi: por que o bairro é símbolo de luxo e negócios](/blog/mercado/guia-do-itaim-bibi-por-que-o-bairro-e-simbolo-de-luxo-e-negocios/) | MOFU | `/regioes/itaim-bibi/` | `/empreendimentos/dsg-itaim/` | verificar fatos locais e produto |
| 13 | Mercado imobiliário | [Inventário de imóvel: o que é, como funciona e quanto custa](/blog/mercado/inventario-de-imovel-o-que-e-como-funciona-e-quanto-custa/) | MOFU | `/` | `/regioes/` | conteúdo jurídico com revisão e limites |
| 14 | Dicas & Decoração | [Salões de festas e espaços gourmet: novo padrão em condomínios de luxo](/blog/dicasedecor/saloes-de-festas-e-espacos-gourmet-novo-padrao-em-condominios-de-luxo/) | TOFU | `/` | `/regioes/` | somente atributos confirmados de cada condomínio |
| 15 | Dicas & Decoração | [Garagem premium: evolução em condomínios de alto padrão](/blog/dicasedecor/garagem-premium-evolucao-em-condominios-de-alto-padrao/) | MOFU | `/` | `/regioes/` | não atribuir garagem premium a produto sem fonte |
| 16 | Dicas & Decoração | [Projeto luminotécnico: como a iluminação transforma os ambientes](/blog/dicasedecor/projeto-luminotecnico-como-a-iluminacao-transforma-os-ambientes/) | TOFU | `/` | `/regioes/` | dicas gerais de iluminação sem prometer diferenciais |
| 17 | Dicas & Decoração | [Espaço kids e brinquedotecas: design lúdico que estimula crianças](/blog/dicasedecor/espaco-kids-e-brinquedotecas-design-ludico-que-estimula-criancas/) | TOFU | `/` | `/regioes/` | não afirmar brinquedoteca em empreendimento específico |
| 18 | Dicas & Decoração | [Dicas para apartamento pet friendly: decoração, segurança e bem-estar](/blog/dicasedecor/dicas-para-apartamento-pet-friendly-decoracao-seguranca-e-bem-estar/) | TOFU | `/` | `/regioes/` | sem alegar política pet-friendly por inferência |
| 19 | Dicas & Decoração | [Do tênis ao beach tennis: quadras valorizam condomínios](/blog/dicasedecor/do-tenis-ao-beach-tennis-quadras-valorizam-condominios/) | TOFU | `/` | `/regioes/` | não prometer valorização por quadras esportivas |
| 20 | Dicas & Decoração | [Carro elétrico e condomínio: prédios com infraestrutura de recarga](/blog/dicasedecor/carro-eletrico-e-condominio-predios-com-infraestrutura-de-recarga/) | MOFU | `/` | `/regioes/` | infraestrutura de recarga deve ser validada por prédio |
| 21 | Dicas & Decoração | [Cozinhas modernas: tendências de layout e decoração para 2026](/blog/dicasedecor/cozinhas-modernas-tendencias-de-layout-e-decoracao-para-2026/) | TOFU | `/` | `/regioes/` | atualizar referência temporal 2026 se fizer sentido |
| 22 | Dicas & Decoração | [Condomínio de casas: entenda e conheça o Claris Casa & Clube](/blog/dicasedecor/condominio-de-casas-entenda-e-conheca-o-claris-casa-clube/) | PAUSAR | — | — | Claris no Rio fora do catálogo SP; sem link comercial forçado |
| 23 | Dicas & Decoração | [Como escolher o piso ideal para o seu apartamento](/blog/dicasedecor/como-escolher-o-piso-ideal-para-o-seu-apartamento/) | TOFU | `/` | `/regioes/` | materiais e usos, sem declaração de acabamentos de projetos |
| 24 | Dicas & Decoração | [Iluminação natural: faz bem para a saúde e para o seu projeto](/blog/dicasedecor/iluminacao-natural-faz-bem-para-a-saude-e-para-o-seu-projeto/) | TOFU | `/` | `/regioes/` | diferenciar recomendações de saúde de informação arquitetônica |
| 25 | Dicas & Decoração | [Cor do Ano 2026: tendência para o seu Tegra](/blog/dicasedecor/cor-do-ano-2026-tendencia-para-o-seu-tegra/) | TOFU | `/` | `/regioes/` | tendência sazonal; baixa prioridade |
| 26 | Lifestyle | [Tênis e longevidade: como o esporte transforma a saúde e a mente](/blog/lifestyle/tenis-e-longevidade-como-o-esporte-transforma-a-saude-e-a-mente/) | TOFU | `/` | `/regioes/` | não transformar relação entre esporte e saúde em promessa clínica |
| 27 | Lifestyle | [Volta ao mundo em casa: destinos que inspiram a arquitetura Tegra](/blog/lifestyle/volta-ao-mundo-em-casa-destinos-que-inspiram-a-arquitetura-tegra/) | TOFU | `/` | `/regioes/` | referências estéticas sem copiar imagens Tegra |
| 28 | Lifestyle | [Esportes de raquete: beach tennis e tênis no universo wellness](/blog/lifestyle/esportes-de-raquete-beach-tennis-e-tenis-no-universo-wellness/) | TOFU | `/` | `/regioes/` | não prometer benefícios de saúde |
| 29 | Lifestyle | [Kronos by Tegra: a primeira Blue Zone urbana do Rio](/blog/lifestyle/kronos-by-tegra-a-primeira-blue-zone-urbana-do-rio/) | PAUSAR | — | — | Kronos no Rio fora da seleção MoreTegra SP |
| 30 | Lifestyle | [Viver na ABM e o novo significado de conveniência na Barra da Tijuca](/blog/lifestyle/viver-na-abm-e-o-novo-significado-de-conveniencia-na-barra-da-tijuca/) | PAUSAR | — | — | Barra da Tijuca sem catálogo local |
| 31 | Lifestyle | [Pied-à-Terre em SP e no Rio: novo padrão para executivos](/blog/lifestyle/pied-a-terre-em-sp-e-no-rio-novo-padrao-para-executivos/) | MOFU | `/regioes/itaim-bibi/` | `/` | recorte São Paulo verificável; não confundir Rio e SP |
| 32 | Lifestyle | [Moradias suspensas: o luxo em plantas de 185 m² a 355 m²](/blog/lifestyle/moradias-suspensas-o-luxo-em-plantas-de-185-m-a-355-m/) | MOFU | `/` | `/regioes/` | plantas e metragens de outros projetos exigem fonte exata |
| 33 | Lifestyle | [O minimalismo do RIIO by Piero Lissoni redefine o luxo carioca](/blog/lifestyle/o-minimalismo-do-riio-by-piero-lissoni-redefine-o-luxo-carioca/) | PAUSAR | — | — | RIIO Rio fora do catálogo; manter backlink editorial opcional não comercial |
| 34 | Lifestyle | [2 ou 3 suítes? Encontre a planta ideal no Nova Vivere](/blog/lifestyle/2-ou-3-suites-encontre-a-planta-ideal-no-nova-vivere/) | BOFU | `/empreendimentos/nova-vivere/` | `/regioes/lapa/` | verificar tipologias exatas no projeto e não copiar artigo |
| 35 | Lifestyle | [A última reserva urbana da Zona Oeste tem um nome: Garden Design](/blog/lifestyle/a-ultima-reserva-urbana-da-zona-oeste-tem-um-nome-garden-design/) | BOFU | `/empreendimentos/garden-design/` | `/regioes/lapa/` | afirmação 'última reserva' não deve ser replicada sem evidência |
| 36 | Lifestyle | [Claris Casa & Clube: refúgio de alto padrão na Barra da Tijuca](/blog/lifestyle/claris-casa-clube-refugio-de-alto-padrao-na-barra-da-tijuca/) | PAUSAR | — | — | Claris Rio fora do catálogo SP |
| 37 | Tegra + | [Bueno Brandão: diferenciais de um novo morar](/blog/tegra/bueno-brandao-diferenciais-de-um-novo-morar/) | BOFU | `/empreendimentos/bueno-brandao-257/` | `/regioes/vila-nova-conceicao/` | usar facts aprovados, não inventar diferenciais |
| 38 | Tegra + | [Bueno Brandão: a força das assinaturas que definem o projeto](/blog/tegra/bueno-brandao-a-forca-das-assinaturas-que-definem-o-projeto/) | BOFU | `/empreendimentos/bueno-brandao-257/` | `/regioes/vila-nova-conceicao/` | assinaturas: confirmar profissionais nos facts canônicos |
| 39 | Tegra + | [Bueno Brandão: tipologias pensadas para o seu estilo de vida](/blog/tegra/bueno-brandao-tipologias-pensadas-para-o-seu-estilo-de-vida/) | BOFU | `/empreendimentos/bueno-brandao-257/` | `/regioes/vila-nova-conceicao/` | metragem e tipologias somente dados aprovados |
| 40 | Tegra + | [Bueno Brandão: o melhor do Ibirapuera e Vila Nova Conceição](/blog/tegra/bueno-brandao-o-melhor-do-ibirapuera-e-vila-nova-conceicao/) | MOFU | `/regioes/vila-nova-conceicao/` | `/empreendimentos/bueno-brandao-257/` | localização sem promessas; VNC cluster IN_PROGRESS |
| 41 | Tegra + | [Bueno Brandão: arte, sofisticação e um novo olhar sobre o morar](/blog/tegra/bueno-brandao-arte-sofisticacao-e-um-novo-olhar-sobre-o-morar/) | BOFU | `/empreendimentos/bueno-brandao-257/` | `/regioes/vila-nova-conceicao/` | arte e instalações somente se comprovadas |
| 42 | Tegra + | [Bueno Brandão: tecnologia e sustentabilidade a serviço do conforto](/blog/tegra/bueno-brandao-tecnologia-e-sustentabilidade-a-servico-do-conforto/) | BOFU | `/empreendimentos/bueno-brandao-257/` | `/regioes/vila-nova-conceicao/` | não inferir tecnologia/ESG não confirmado |
| 43 | Tegra + | [Bueno Brandão: natureza, cidade e o equilíbrio de viver bem](/blog/tegra/bueno-brandao-natureza-cidade-e-o-equilibrio-de-viver-bem/) | MOFU | `/regioes/vila-nova-conceicao/` | `/empreendimentos/bueno-brandao-257/` | natureza/entorno com localização verificável |
| 44 | Tegra + | [Bueno Brandão: bem-estar elevado a um novo padrão](/blog/tegra/bueno-brandao-bem-estar-elevado-a-um-novo-padrao/) | BOFU | `/empreendimentos/bueno-brandao-257/` | `/regioes/vila-nova-conceicao/` | verificar especificações de bem-estar |
| 45 | Tegra + | [Bueno Brandão: quando o morar se revela nos detalhes](/blog/tegra/bueno-brandao-quando-o-morar-se-revela-nos-detalhes/) | BOFU | `/empreendimentos/bueno-brandao-257/` | `/regioes/vila-nova-conceicao/` | evitar repetição/canibalização 9 URLs Bueno Brandão |
| 46 | Tegra + | [Relatório Integrado Tegra 2023: Sustentabilidade em foco](/blog/tegra/relatorio-integrado-tegra-2023/) | PAUSAR | — | — | relatório corporativo histórico fora do funil direto |
| 47 | Tegra + | [Conheça o Apê Perfeito da Tegra Incorporadora](/blog/tegra/ape-perfeito-da-tegra-incorporadora/) | MOFU | `/` | `/regioes/` | conteúdo institucional: tornar utilidade ao comprador explícita |
| 48 | Tegra + | [Tegra e Sustentabilidade: Relatório Integrado 2022](/blog/tegra/tegra-e-sustentabilidade-relatorio-integrado-2022/) | PAUSAR | — | — | relatório corporativo histórico sem demanda comprovada |

## 3. Regras de links e conteúdo

1. **Uma intenção de busca por página.** Abrir a pauta com problema específico; mapear título, H1, FAQ real e conteúdo que não canibalize o hub regional nem a página de empreendimento. Não indexar placeholders.
2. **Âncora descritiva, não genérica:** `Ver apartamentos Tegra na Lapa` → `/regioes/lapa/`; `Conhecer o Nova Vivere` → URL exata. Evitar âncoras genéricas `clique aqui`.
3. **Links somente onde a leitura justifica:** no meio do texto, uma saída para informação complementar e uma para a decisão, mais um bloco ao final com até três conteúdos relacionados efetivamente publicados. Não empurrar projeto aleatório em post sobre decoração.
4. **Reciprocidade planejada:** quando artigo aprovado e publicado, avaliar link de volta do guia regional ou produto que acrescente contexto ao usuário. Não alterar páginas RESF sem gate individual.
5. **Proteção comercial:** nenhum dado novo de preço, metragem, vaga, obra, estoque, endereço exato ou diferencial sem fonte confirmada; enviar dúvida ao atendimento Sabrina, preservar formulário Form46/tenant313 e contato `tel:+5511960779328` / `wa.me/5511960779328`.
6. **SEO técnico:** só retirar `noindex` após artigo autoral, apuração, revisão de direitos de imagem, title/meta/canonical, H1/H2/H3, data real de publicação/alteração, JSON-LD válido quando aplicável, links internos vivos, sitemap e QA mobile. `FAQPage` apenas para FAQ genuíno e visível; não prometer rich result.
7. **Originalidade/copyright:** o acervo Tegra informa assuntos e estratégia, não autoriza copiar integralmente texto, layout gráfico ou fotografia. Direitos e licenças devem ser checados antes de publicar.
8. **Anticanibalização:** as nove pautas Bueno Brandão devem receber estudo específico; consolidar variações redundantes na página do produto ou em um único artigo sólido antes de indexar muitas URLs semelhantes.
9. **Não fabricar CTA sobre “próximos lançamentos”:** confirmar estágio do projeto ao publicar; não usar urgência ou escassez sem dados.
10. **Governança:** branch → conteúdo original → QA → aprovação → merge rastreável → HTTP/GSC. Nada nesta matriz autoriza produção ou teste real de lead.

## 4. Ordem de implementação sugerida

**Lote A — intenção comercial/contextual com destino existente:** Lapa valorização (#7), Mooca/Tatuapé (#3), Itaim (#12), Nova Vivere tipologias (#34), Garden Design (#35). Revisão individual e publicação após gates.

**Lote B — cluster Vila Nova Conceição/Bueno:** #2, #11 e #37–45, com reconciliação com cluster VNC ainda IN_PROGRESS e análise de canibalização antes de liberar `noindex`.

**Lote C — compra e decisão:** IPTU (#6), longo prazo (#8), FIIs vs imóvel (#9), inventário (#13), infraestrutura de recarga (#20), seguidos de dicas e lifestyle quando houver tráfego/intenção.

**Pausadas:** #10, #22, #29, #30, #33, #36, #46, #48 enquanto não houver produto, evidência de procura ou propósito editorial; não criar um funil falso para projetos do Rio.

## 5. Evidências e próximos gates

- **Verificado no código:** 48 pautas catalogadas, 14 rotas de região (incluindo hub) e 25 rotas comerciais no sitemap, com correspondência de todas as URLs usadas nesta matriz.
- **NÃO VERIFICADO:** leitura integral e unicidade de cada pauta, direitos/licenças, palavras-chave e competição SERP por URL, intenção real de leads, validação HTTP pública de todos os destinos, eventos GA4 ou atribuição de conversão.
- **Próxima tarefa executável:** selecionar uma pauta do Lote A, criar briefing SEO original com intenção, consulta principal **hipotética até validação**, H1/H2, fontes factuais, links e CTAs; escrever, testar e liberar `noindex` somente após QA e aceite.
