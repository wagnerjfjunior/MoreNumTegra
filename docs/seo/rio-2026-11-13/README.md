# Base de demanda SEO do Rio de Janeiro (2026-11-13)

Insumo oficial para a auditoria e o plano de SEO do hub `/rio-de-janeiro/` e das páginas do Rio. Levantamento do Wagner (Google Trends e Keyword Planner, baixados em 2026-11-13); leitura e consolidação do Claude. Fato, hipótese e decisão estão separados.

## Arquivos

| Caminho | Conteúdo |
|---|---|
| `raw/keyword-planner/01..09-*.csv` | Exportações originais do Keyword Planner (UTF-16, tab). O sufixo diz a rede e a região |
| `raw/trends/*/` | Exportações originais do Google Trends (região Brasil, 12 meses) |
| `rio-keywords-consolidado.csv` | 1.446 termos do Rio em UTF-8, com intenção, faixa por rede e região, concorrência e CPC |
| `build_consolidado.py` | Gera o consolidado a partir de `raw/` (`python3 -I docs/seo/rio-2026-11-13/build_consolidado.py`) |

Exportações do Planner (período nov/2025 a out/2026):

| # | Sementes | Rede | Região |
|---|---|---|---|
| 01 | geral (comprar apartamento em São Paulo etc.) | Google | Brasil |
| 02 | apartamento na planta (Tegra) | Google | Brasil |
| 03 | apartamento na planta (Cyrela) | Google | Brasil |
| 04 | site Tegra | Google + parceiros | Brasil |
| 05 | apartamento (Cyrela) | Google + parceiros | Brasil |
| 06 | Barra | Google + parceiros | Brasil |
| 07 | Barra | Google | Brasil |
| 08 | Barra da Tijuca | **Google** | **Estado do RJ** |
| 09 | nomes dos empreendimentos do Rio | não registrada no arquivo | Brasil |

A rede de 01 a 05 foi informada pelo Wagner ("Brasil inteiro; o volume maior é a seleção Google + parceiros") e conferida pela comparação dos termos em comum: 04 e 05 nunca ficam abaixo de 01, 02 e 03.

## Limites dos dados (fatos)

1. O Planner entrega faixas, não números: 50 = 10–100, 500 = 100–1 mil, 5.000 = 1–10 mil, 50.000 = 10–100 mil buscas por mês. As colunas mês a mês vieram vazias, o que é típico de conta sem gasto ativo.
2. Para SEO vale a rede Google. Os parceiros de pesquisa inflam o volume e não têm resultado orgânico.
3. A variação "-90%" em termos quase iguais é efeito das faixas. Não serve para decidir.
4. O Trends foi baixado com região Brasil, inclusive os estudos "SP". Isso mistura homônimos: "Lapa" tem RJ 29, PR 31 e BA 47. Para usar o Trends em SP, refazer filtrando o estado de São Paulo.
5. Ruído no Trends: o que sobe em Tatuapé é uma explosão de fogos e academia; o estudo de imobiliárias é QuintoAndar e aluguel; "sawadee" (arquivo 09) são hotéis nas Canárias.
6. A coluna `intencao` do consolidado vem de regra por palavra. Nomes de condomínios de outras marcas caem em "informacional/outro".

## Achados (fatos dos arquivos)

**Arquivo 08 (Google, estado do RJ), 1.027 termos.** 25 têm 1–10 mil buscas por mês:
- Venda: apartamento (a venda) (na/em) barra da tijuca e variações, CPC máximo de R$ 4,65 a 5,38.
- Aluguel: alugar apartamento barra da tijuca e variações, CPC R$ 2,20. Fora do nosso negócio.
- Condomínio: condomínios barra da tijuca, condomínio na barra da tijuca, condomínio barra sul, CPC até R$ 5,77.

Intenção de compra com 100–1 mil buscas no RJ:

| Termo | CPC máx. |
|---|---|
| apartamento na planta barra da tijuca | R$ 16,46 |
| tegra incorporadora rj | R$ 15,14 |
| lançamento(s) na barra da tijuca | R$ 11,06 |
| apartamento na planta rio de janeiro | R$ 10,63 |
| comprar apartamento barra da tijuca | R$ 8,60 |
| apartamento à venda na barra da tijuca (≈15 grafias) | R$ 5,13 |
| apartamento 2 e 3 quartos barra da tijuca | R$ 3,94 a 3,98 |
| apartamento jardim oceânico | R$ 3,38 |
| condomínio península na barra da tijuca; península na barra da tijuca | R$ 2,69 a 3,34 |
| cobertura (a venda) barra da tijuca | R$ 2,50 a 2,84 |

Outros fatos:
- Inflados pelos parceiros (BR + parceiros → Google RJ): "apartamento na planta rio de janeiro" e "apartamento na barra da tijuca" caem de 1–10 mil para 100–1 mil.
- A Península tem 1–10 mil buscas no Brasil (Google) e 100–1 mil no RJ: parte da busca vem de fora do estado.
- Na cauda longa há cerca de 70 condomínios de outras marcas com 100–1 mil buscas (Riserva Golf, Ilha Pura, Saint Tropez, Alfa Barra, Golden Green, Le Parc, Mudra, Oceana Golf…).
- Termos de 1–10 mil que só aparecem nos arquivos com parceiros (04 e 05), com volume possivelmente inflado: "bairro nobre (do) rio de janeiro", "imóveis rio de janeiro", "apartamento a venda rio de janeiro".

**Arquivo 09 (nomes dos empreendimentos, Brasil):**

| Termo | Faixa | Observação |
|---|---|---|
| gaea home resort | 1–10 mil | -90% em 3 meses e no ano |
| kronos tegra | 100–1 mil | ∞ no ano (termo novo) |
| gran thai | 10–100 | CPC máximo R$ 14,77 |
| claris casa clube / claris casa & clube / claris casa | 10–100 cada | — |
| singular península, riio lissoni | sem dado | abaixo do mínimo ou grafia diferente |

**Nossas páginas hoje (fato do código, `main` em `4ed7151`):**
- Nenhuma página do Rio usa "na planta". O hub e a página da Barra quase não usam "à venda" nem "lançamento". A Península aparece de 10 a 16 vezes por página.
- Títulos:
  - hub: "Apartamentos e Casas Tegra no Rio de Janeiro";
  - Barra: "Apartamentos e casas Tegra na Barra da Tijuca";
  - Gaea: "Gaea Home Resort | Apartamentos na Barra da Tijuca";
  - Kronos: "Kronos by Tegra | Apartamentos na Barra da Tijuca" (a busca é "kronos tegra").

## Hipóteses (para o especialista validar ou descartar)

| # | Hipótese |
|---|---|
| H1 | A página da Barra é a candidata ao núcleo "apartamento à venda na Barra da Tijuca" (1–10 mil no RJ) |
| H2 | O hub `/rio-de-janeiro/` mira "lançamentos na Barra da Tijuca / imóveis em construção e na planta no Rio" |
| H3 | Uma página da Península (`/rio-de-janeiro/regioes/oeste/barra-da-tijuca/peninsula/`) tem demanda própria; Gran Thai e Singular ficam lá |
| H4 | "Condomínios na Barra da Tijuca" (1–10 mil) cabe como seção da página da Barra. Os nossos 7 são condomínios, mas a busca pode ser por condomínios prontos |
| H5 | Gaea e Kronos têm demanda de marca. Gran Thai, Claris, Singular e RIIO dependem dos termos de bairro e dos links internos |
| H6 | "Bairro nobre do Rio" é tema de topo de funil, para FAQ ou guia, não para página de venda |

## Decisões e restrições do Wagner

- **"Em construção" e "na planta" (2026-11-13):** a sugestão do Wagner é trabalhar os dois juntos em palavras-chave, títulos e H1–Hn. **A decisão final é do especialista em SEO.** Fato a respeitar: só o Kronos é lançamento; os outros seis estão em construção.
- **R1 e R7 continuam valendo:** Rio sem Sabrina, canal da central RJ, e o site não se apresenta como a Tegra. Vale também para "tegra incorporadora rj".
- **SP fica fora:** nada no site de SP muda por decisão do Rio.
- **Merge só com aprovação do Wagner.** Uma PR por mudança.

## Pedido ao especialista: plano SEO do hub do Rio e das páginas

Escopo: as 10 páginas do Rio em produção.
- `/rio-de-janeiro/`
- `/rio-de-janeiro/regioes/`
- `/rio-de-janeiro/regioes/oeste/barra-da-tijuca/`
- 7 empreendimentos: `/empreendimentos/{kronos-by-tegra, gran-thai-leisure-residence, singular-private-residence, gaea-home-resort, claris-rosas, claris-casa-e-clube, riio-by-piero-lissoni}/`

Entregas:
1. **Auditoria independente**, feita por um agente que não construiu as páginas.
   - Frentes: técnico (indexação, canonical, sitemap, renderização, velocidade), schema contra o conteúdo visível, arquitetura e links internos, SEO local (Barra e estandes), conteúdo e AEO/GEO.
   - Cada problema vem com a sua evidência.
2. **Mapa palavra-chave → página**, com uma página canônica por intenção e sem canibalização. Usar esta base; o arquivo 08 é a fonte principal.
3. **Plano por página:** title, meta description, H1–H3, seções e FAQ a criar ou ajustar, links internos, schema. A decisão sobre "em construção" e "na planta" entra aqui, com a justificativa.
4. **Páginas novas, se houver:** a Península (H3) e outras que os dados sustentarem, com prioridade e esforço.
5. **Plano de ação em ordem:** dependências, dono (Wagner ou Claude), como medir (Search Console, GA4) e riscos.

Sem promessa de posição, tráfego ou citação em IA.
