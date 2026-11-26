# RESF — inventário inicial de escala e recibo Órbita

26/11/2026. Main de origem 8958cf198f0319909ed4b48f037ccde7b68ba7c9 (#651). Inventário estático do sitemap.xml e vercel.json, não certifica HTTP/canonical/robots em produção. 92 entradas sitemap, 92 únicas, 138 rewrites, 46 fora do sitemap; não tratar todos como páginas indexáveis. Manifesto RESF: 13 chaves. Escopo >100 páginas informado pelo proprietário; reconciliar aliases e noindex antes de escala. Família por rota, não inspeção integral de template.

## Recibo #651
PSI mobile USER_REPORTED 14:05/14:12/14:16 BRT: 100/100/100 performance, 97 accessibility, 100 best practices/SEO, 6/6 agentic; LCP 1.5/1.5/1.5, SI .9/2.1/.9, FCP .9/1/.9, TBT/CLS zero. LAB 3/5, não CrUX nem aceite funcional. GTmetrix Seattle 14:03/14:12/14:19 BRT 93/92/92, estrutura 97, LCP 1.7/1.7/1.8, 755 KB, 10 requests. Pingdom HAR 14:03/14:19 BRT: edge lhr1 MISS / gru1 HIT, onload 2922/862ms, fully loaded 3481/904ms, ETag HTML idêntico. Todos os HTML/JS HTTP200 comprimidos br/gzip; cache-control próprio presente. 6 JPEG Azure + 3 WebP S3 sem Cache-Control/Expires explícitos; ~3.11 MiB. 301 do Google embed, preservar mapa e clique WhatsApp integralmente por decisão expressa. HAR não prova algoritmo de notas Pingdom. Não trocar Brotli, não alterar headers globais, não criar proxy, não adicionar imagens ao GitHub nesta rodada. Manifesto Órbita só hero 640 WebP; derivados adicionais dependem de origem autorizada e validação visual. Contraste 97: obter nós reprovados antes de editar CSS. Form46 Brasil existente preservado. Nenhuma nova edição runtime nesta PR. CI/funcional/READY ainda não certificados por este recibo.

## Inventário inicial

| Rota | Família | Rewrite | Variantes no manifesto por chave exata | Estado |
|---|---|---|---:|---|
| / | Home | /src-greenn/preview/index.html | — | REF 3/5 |
| /regioes/ | Hubs regionais | /src-greenn/regioes/index.html | — | INVENTORIED |
| /empreendimentos/capiitolo-piero-lissoni/ | Projetos SP | /src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html | — | INVENTORIED |
| /empreendimentos/caminhos-da-lapa-elo-duo/ | Projetos SP | /src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html | — | INVENTORIED |
| /empreendimentos/aria-higienopolis/ | Projetos SP | /src-greenn/empreendimentos/aria-higienopolis/index.html | — | INVENTORIED |
| /empreendimentos/dsg-itaim/ | Projetos SP | /src-greenn/empreendimentos/dsg-itaim/index.html | — | INVENTORIED |
| /empreendimentos/ledge-brooklin/ | Projetos SP | /src-greenn/empreendimentos/ledge-brooklin/index.html | — | INVENTORIED |
| /empreendimentos/studios-berrini/ | Projetos SP | /src-greenn/empreendimentos/studios-berrini/index.html | — | INVENTORIED |
| /empreendimentos/soma-perdizes/ | Projetos SP | /src-greenn/empreendimentos/soma-perdizes/index.html | — | INVENTORIED |
| /empreendimentos/zahle-jardins/ | Projetos SP | /src-greenn/empreendimentos/zahle-jardins/index.html | — | INVENTORIED |
| /empreendimentos/ypy-alto-do-ipiranga/ | Projetos SP | /src-greenn/empreendimentos/ypy-alto-do-ipiranga/index.html | — | INVENTORIED |
| /empreendimentos/bem-moema/ | Projetos SP | /src-greenn/empreendimentos/bem-moema/index.html | 1 | INVENTORIED |
| /empreendimentos/mozae-higienopolis/ | Projetos SP | /src-greenn/empreendimentos/mozae-higienopolis/index.html | — | INVENTORIED |
| /empreendimentos/bueno-brandao-257/ | Projetos SP | /src-greenn/empreendimentos/bueno-brandao-257/index.html | — | INVENTORIED |
| /empreendimentos/chateau-jardin/ | Projetos SP | /src-greenn/empreendimentos/chateau-jardin/index.html | — | INVENTORIED |
| /empreendimentos/reserva-caminhos-da-lapa/ | Projetos SP | /src-greenn/empreendimentos/reserva-caminhos-da-lapa/index.html | — | INVENTORIED |
| /empreendimentos/jerivas-caminhos-da-lapa/ | Projetos SP | /src-greenn/empreendimentos/jerivas-caminhos-da-lapa/index.html | — | INVENTORIED |
| /empreendimentos/nova-vivere/ | Projetos SP | /src-greenn/empreendimentos/nova-vivere/index.html | — | INVENTORIED |
| /empreendimentos/garden-design/ | Projetos SP | /src-greenn/empreendimentos/garden-design/index.html | — | INVENTORIED |
| /regioes/higienopolis/ | Hubs regionais | /src-greenn/regioes/higienopolis/index.html | — | INVENTORIED |
| /regioes/lapa/ | Hubs regionais | /src-greenn/regioes/lapa/index.html | — | INVENTORIED |
| /regioes/cidade-jardim/ | Hubs regionais | /src-greenn/regioes/cidade-jardim/index.html | — | INVENTORIED |
| /regioes/brooklin/ | Hubs regionais | /src-greenn/regioes/brooklin/index.html | 1 | INVENTORIED |
| /regioes/perdizes/ | Hubs regionais | /src-greenn/regioes/perdizes/index.html | 1 | INVENTORIED |
| /regioes/moema/ | Hubs regionais | /src-greenn/regioes/moema/index.html | — | INVENTORIED |
| /regioes/vila-nova-conceicao/ | Hubs regionais | /src-greenn/regioes/vila-nova-conceicao/index.html | 1 | INVENTORIED |
| /regioes/jardins/ | Hubs regionais | /src-greenn/regioes/jardins/index.html | — | INVENTORIED |
| /regioes/itaim-bibi/ | Hubs regionais | /src-greenn/regioes/itaim-bibi/index.html | — | INVENTORIED |
| /regioes/chacara-klabin/ | Hubs regionais | /src-greenn/regioes/chacara-klabin/index.html | — | INVENTORIED |
| /regioes/alto-do-ipiranga/ | Hubs regionais | /src-greenn/regioes/alto-do-ipiranga/index.html | — | INVENTORIED |
| /regioes/tatuape/ | Hubs regionais | /src-greenn/regioes/tatuape/index.html | — | INVENTORIED |
| /regioes/sacoma/ | Hubs regionais | /src-greenn/regioes/sacoma/index.html | — | INVENTORIED |
| /empreendimentos/ampere-brooklin/ | Projetos SP | /src-greenn/empreendimentos/ampere-brooklin/index.html | 1 | INVENTORIED |
| /empreendimentos/bem-moema-studios-offices/ | Projetos SP | /src-greenn/empreendimentos/bem-moema-studios-offices/index.html | 1 | INVENTORIED |
| /empreendimentos/ode-perdizes/ | Projetos SP | /src-greenn/empreendimentos/ode-perdizes/index.html | — | INVENTORIED |
| /empreendimentos/tiel-vila-nova-conceicao/ | Projetos SP | /src-greenn/empreendimentos/tiel-vila-nova-conceicao/index.html | 1 | INVENTORIED |
| /empreendimentos/universo-tatuape-orbita/ | Projetos SP | /src-greenn/empreendimentos/universo-tatuape-orbita/index.html | 1 | LAB 3/5 |
| /empreendimentos/teg-sacoma/ | Projetos SP | /src-greenn/empreendimentos/teg-sacoma/index.html | 1 | INVENTORIED |
| /empreendimentos/chez-vous-moema/ | Projetos SP | /src-greenn/empreendimentos/chez-vous-moema/index.html | 2 | INVENTORIED |
| /empreendimentos/key-moema/ | Projetos SP | /src-greenn/empreendimentos/key-moema/index.html | 2 | INVENTORIED |
| /empreendimentos/ayla-moema-studio-office/ | Projetos SP | /src-greenn/empreendimentos/ayla-moema-studio-office/index.html | 2 | INVENTORIED |
| /empreendimentos/viso-moema/ | Projetos SP | /src-greenn/empreendimentos/viso-moema/index.html | 2 | INVENTORIED |
| /blog/ | Hubs blog | /src-greenn/blog/index.html | — | INVENTORIED |
| /blog/bairros-sao-paulo/ | Hubs blog | /src-greenn/blog/bairros-sao-paulo/index.html | — | INVENTORIED |
| /blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/ | Artigos | /src-greenn/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/index.html | — | INVENTORIED |
| /blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/ | Artigos | /src-greenn/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/index.html | — | INVENTORIED |
| /investimentos/studios-e-salas-comerciais/ | Investimentos | /src-greenn/investimentos/studios-e-salas-comerciais/index.html | — | INVENTORIED |
| /investimentos/calculadora-rentabilidade-imovel/ | Investimentos | /src-greenn/investimentos/calculadora-rentabilidade-imovel/index.html | — | INVENTORIED |
| /blog/dicasedecor/salao-festas-espaco-gourmet-como-avaliar/ | Artigos | /src-greenn/blog/dicasedecor/salao-festas-espaco-gourmet-como-avaliar/index.html | — | INVENTORIED |
| /blog/dicasedecor/vaga-garagem-apartamento-acesso-manobra/ | Artigos | /src-greenn/blog/dicasedecor/vaga-garagem-apartamento-acesso-manobra/index.html | — | INVENTORIED |
| /blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/ | Artigos | /src-greenn/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/index.html | — | INVENTORIED |
| /blog/dicasedecor/brinquedoteca-condominio-uso-seguranca/ | Artigos | /src-greenn/blog/dicasedecor/brinquedoteca-condominio-uso-seguranca/index.html | — | INVENTORIED |
| /blog/dicasedecor/apartamento-com-pets-layout-materiais/ | Artigos | /src-greenn/blog/dicasedecor/apartamento-com-pets-layout-materiais/index.html | — | INVENTORIED |
| /blog/dicasedecor/quadras-condominio-tenis-beach-tennis/ | Artigos | /src-greenn/blog/dicasedecor/quadras-condominio-tenis-beach-tennis/index.html | — | INVENTORIED |
| /blog/dicasedecor/recarga-carro-eletrico-condominio-infraestrutura/ | Artigos | /src-greenn/blog/dicasedecor/recarga-carro-eletrico-condominio-infraestrutura/index.html | — | INVENTORIED |
| /blog/dicasedecor/casa-condominio-layout-claris-barra/ | Artigos | /src-greenn/blog/dicasedecor/casa-condominio-layout-claris-barra/index.html | — | INVENTORIED |
| /blog/dicasedecor/piso-apartamento-materiais-acustica-umidade/ | Artigos | /src-greenn/blog/dicasedecor/piso-apartamento-materiais-acustica-umidade/index.html | — | INVENTORIED |
| /blog/dicasedecor/cores-decoracao-2026-paleta-apartamento/ | Artigos | /src-greenn/blog/dicasedecor/cores-decoracao-2026-paleta-apartamento/index.html | — | INVENTORIED |
| /blog/dicasedecor/cozinha-apartamento-layout-uso-diario/ | Artigos | /src-greenn/blog/dicasedecor/cozinha-apartamento-layout-uso-diario/index.html | — | INVENTORIED |
| /blog/dicasedecor/iluminacao-natural-apartamento-orientacao-solar/ | Artigos | /src-greenn/blog/dicasedecor/iluminacao-natural-apartamento-orientacao-solar/index.html | — | INVENTORIED |
| /blog/dicasedecor/ | Hubs blog | /src-greenn/blog/dicasedecor/index.html | — | INVENTORIED |
| /blog/mercado/ | Hubs blog | /src-greenn/blog/mercado/index.html | — | INVENTORIED |
| /blog/mercado/alto-padrao-criterios-valor-compra/ | Artigos | /src-greenn/blog/mercado/alto-padrao-criterios-valor-compra/index.html | — | INVENTORIED |
| /blog/mercado/mooca-ou-tatuape-rotina-mobilidade/ | Artigos | /src-greenn/blog/mercado/mooca-ou-tatuape-rotina-mobilidade/index.html | — | INVENTORIED |
| /blog/mercado/infraestrutura-entorno-escolha-imovel/ | Artigos | /src-greenn/blog/mercado/infraestrutura-entorno-escolha-imovel/index.html | — | INVENTORIED |
| /blog/mercado/condominio-sustentavel-solucoes-custos/ | Artigos | /src-greenn/blog/mercado/condominio-sustentavel-solucoes-custos/index.html | — | INVENTORIED |
| /blog/mercado/iptu-apartamento-sp-consulta-orcamento/ | Artigos | /src-greenn/blog/mercado/iptu-apartamento-sp-consulta-orcamento/index.html | — | INVENTORIED |
| /blog/mercado/usar-fgts-comprar-apartamento/ | Artigos | /src-greenn/blog/mercado/usar-fgts-comprar-apartamento/index.html | — | INVENTORIED |
| /blog/mercado/compra-imovel-investimento-longo-prazo/ | Artigos | /src-greenn/blog/mercado/compra-imovel-investimento-longo-prazo/index.html | — | INVENTORIED |
| /blog/mercado/fii-ou-imovel-fisico-comparacao/ | Artigos | /src-greenn/blog/mercado/fii-ou-imovel-fisico-comparacao/index.html | — | INVENTORIED |
| /blog/mercado/orla-barra-tijuca-localizacao-conservacao/ | Artigos | /src-greenn/blog/mercado/orla-barra-tijuca-localizacao-conservacao/index.html | — | INVENTORIED |
| /blog/mercado/imoveis-luxo-renda-custos-liquidez/ | Artigos | /src-greenn/blog/mercado/imoveis-luxo-renda-custos-liquidez/index.html | — | INVENTORIED |
| /blog/mercado/morar-itaim-bibi-rotina-custo/ | Artigos | /src-greenn/blog/mercado/morar-itaim-bibi-rotina-custo/index.html | — | INVENTORIED |
| /blog/mercado/imovel-herdado-inventario-documentos-etapas/ | Artigos | /src-greenn/blog/mercado/imovel-herdado-inventario-documentos-etapas/index.html | — | INVENTORIED |
| /blog/mercado/investir-em-studios-sao-paulo/ | Artigos | /src-greenn/blog/mercado/investir-em-studios-sao-paulo/index.html | — | INVENTORIED |
| /blog/mercado/imovel-ou-cdi/ | Artigos | /src-greenn/blog/mercado/imovel-ou-cdi/index.html | — | INVENTORIED |
| /blog/mercado/comprar-sala-comercial-para-alugar/ | Artigos | /src-greenn/blog/mercado/comprar-sala-comercial-para-alugar/index.html | — | INVENTORIED |
| /blog/mercado/studio-residencial-ou-nr/ | Artigos | /src-greenn/blog/mercado/studio-residencial-ou-nr/index.html | — | INVENTORIED |
| /blog/mercado/imovel-ou-poupanca/ | Artigos | /src-greenn/blog/mercado/imovel-ou-poupanca/index.html | — | INVENTORIED |
| /blog/mercado/como-calcular-roi-yield-imobiliario/ | Artigos | /src-greenn/blog/mercado/como-calcular-roi-yield-imobiliario/index.html | — | INVENTORIED |
| /blog/mercado/melhores-bairros-investir-studios-sao-paulo/ | Artigos | /src-greenn/blog/mercado/melhores-bairros-investir-studios-sao-paulo/index.html | — | INVENTORIED |
| /empreendimentos/riio-by-piero-lissoni/ | Projetos RJ | /src-greenn/empreendimentos/riio-by-piero-lissoni/index.html | — | INVENTORIED |
| /rio-de-janeiro/ | Hubs regionais | /src-greenn/rio-de-janeiro/index.html | — | INVENTORIED |
| /rio-de-janeiro/regioes/ | Hubs regionais | /src-greenn/rio-de-janeiro/regioes/index.html | — | INVENTORIED |
| /rio-de-janeiro/regioes/oeste/barra-da-tijuca/ | Hubs regionais | /src-greenn/rio-de-janeiro/regioes/oeste/barra-da-tijuca/index.html | — | INVENTORIED |
| /empreendimentos/kronos-by-tegra/ | Projetos RJ | /src-greenn/empreendimentos/kronos-by-tegra/index.html | — | INVENTORIED |
| /empreendimentos/claris-casa-e-clube/ | Projetos RJ | /src-greenn/empreendimentos/claris-casa-e-clube/index.html | — | INVENTORIED |
| /empreendimentos/claris-rosas/ | Projetos RJ | /src-greenn/empreendimentos/claris-rosas/index.html | — | INVENTORIED |
| /empreendimentos/gran-thai-leisure-residence/ | Projetos RJ | /src-greenn/empreendimentos/gran-thai-leisure-residence/index.html | — | INVENTORIED |
| /empreendimentos/singular-private-residence/ | Projetos RJ | /src-greenn/empreendimentos/singular-private-residence/index.html | — | INVENTORIED |
| /empreendimentos/gaea-home-resort/ | Projetos RJ | /src-greenn/empreendimentos/gaea-home-resort/index.html | — | INVENTORIED |
| /complexo-lapa-pirituba/ | Complexo/outros | /src-greenn/complexo-lapa-pirituba/index.html | — | INVENTORIED |

## Rotas fora do sitemap (não assumir indexabilidade)

- /.well-known/ai-catalog.json → /.well-known/ard.json
- /complexo-lapa-pirituba-v2/ → /src-greenn/complexo-lapa-pirituba-v2/index.html
- /complexo-lapa-pirituba/obras/ → /src-greenn/complexo-lapa-pirituba/obras/index.html
- /complexo-lapa-pirituba/acessos-trajetos/ → /src-greenn/complexo-lapa-pirituba/acessos-trajetos/index.html
- /complexo-lapa-pirituba/projeto/ → /src-greenn/complexo-lapa-pirituba/projeto/index.html
- /complexo-lapa-pirituba/previsao-entrega/ → /src-greenn/complexo-lapa-pirituba/previsao-entrega/index.html
- /obrigado/ → /src-greenn/preview/obrigado.html
- /blog/lifestyle/ → /src-greenn/blog/lifestyle/index.html
- /blog/tegra/ → /src-greenn/blog/tegra/index.html
- /blog/lifestyle/tenis-qualidade-de-vida-e-bem-estar-a-conexao-da-tegra-com-o-esporte/ → /src-greenn/blog/lifestyle/tenis-qualidade-de-vida-e-bem-estar-a-conexao-da-tegra-com-o-esporte/index.html
- /blog/mercado/3-fatores-que-garantem-a-valorizacao-de-imoveis-de-luxo-no-longo-prazo/ → /src-greenn/blog/mercado/3-fatores-que-garantem-a-valorizacao-de-imoveis-de-luxo-no-longo-prazo/index.html
- /blog/mercado/mooca-e-tatuape-tradicao-modernidade-e-infraestrutura-na-zona-leste/ → /src-greenn/blog/mercado/mooca-e-tatuape-tradicao-modernidade-e-infraestrutura-na-zona-leste/index.html
- /blog/mercado/gentileza-urbana-o-papel-dos-empreendimentos-na-valorizacao-do-bairro/ → /src-greenn/blog/mercado/gentileza-urbana-o-papel-dos-empreendimentos-na-valorizacao-do-bairro/index.html
- /blog/mercado/esg-na-construcao-civil-como-predio-sustentavel-valorizam-patrimonio/ → /src-greenn/blog/mercado/esg-na-construcao-civil-como-predio-sustentavel-valorizam-patrimonio/index.html
- /blog/mercado/iptu-saiba-tudo-sobre-o-imposto-anual-e-planeje-seu-pagamento/ → /src-greenn/blog/mercado/iptu-saiba-tudo-sobre-o-imposto-anual-e-planeje-seu-pagamento/index.html
- /blog/mercado/investimento-a-longo-prazo-comprar-um-imovel/ → /src-greenn/blog/mercado/investimento-a-longo-prazo-comprar-um-imovel/index.html
- /blog/mercado/fiis-vs-imovel-fisico-qual-a-melhor-estrategia-para-investir/ → /src-greenn/blog/mercado/fiis-vs-imovel-fisico-qual-a-melhor-estrategia-para-investir/index.html
- /blog/mercado/a-orla-da-barra-da-tijuca-luxo-no-rio-de-janeiro/ → /src-greenn/blog/mercado/a-orla-da-barra-da-tijuca-luxo-no-rio-de-janeiro/index.html
- /blog/mercado/imoveis-de-luxo-por-que-investir-no-mercado-de-alto-padrao/ → /src-greenn/blog/mercado/imoveis-de-luxo-por-que-investir-no-mercado-de-alto-padrao/index.html
- /blog/mercado/guia-do-itaim-bibi-por-que-o-bairro-e-simbolo-de-luxo-e-negocios/ → /src-greenn/blog/mercado/guia-do-itaim-bibi-por-que-o-bairro-e-simbolo-de-luxo-e-negocios/index.html
- /blog/mercado/inventario-de-imovel-o-que-e-como-funciona-e-quanto-custa/ → /src-greenn/blog/mercado/inventario-de-imovel-o-que-e-como-funciona-e-quanto-custa/index.html
- /blog/dicasedecor/cozinhas-modernas-tendencias-de-layout-e-decoracao-para-2026/ → /src-greenn/blog/dicasedecor/cozinhas-modernas-tendencias-de-layout-e-decoracao-para-2026/index.html
- /blog/dicasedecor/iluminacao-natural-faz-bem-para-a-saude-e-para-o-seu-projeto/ → /src-greenn/blog/dicasedecor/iluminacao-natural-faz-bem-para-a-saude-e-para-o-seu-projeto/index.html
- /blog/lifestyle/tenis-e-longevidade-como-o-esporte-transforma-a-saude-e-a-mente/ → /src-greenn/blog/lifestyle/tenis-e-longevidade-como-o-esporte-transforma-a-saude-e-a-mente/index.html
- /blog/lifestyle/volta-ao-mundo-em-casa-destinos-que-inspiram-a-arquitetura-tegra/ → /src-greenn/blog/lifestyle/volta-ao-mundo-em-casa-destinos-que-inspiram-a-arquitetura-tegra/index.html
- /blog/lifestyle/esportes-de-raquete-beach-tennis-e-tenis-no-universo-wellness/ → /src-greenn/blog/lifestyle/esportes-de-raquete-beach-tennis-e-tenis-no-universo-wellness/index.html
- /blog/lifestyle/kronos-by-tegra-a-primeira-blue-zone-urbana-do-rio/ → /src-greenn/blog/lifestyle/kronos-by-tegra-a-primeira-blue-zone-urbana-do-rio/index.html
- /blog/lifestyle/viver-na-abm-e-o-novo-significado-de-conveniencia-na-barra-da-tijuca/ → /src-greenn/blog/lifestyle/viver-na-abm-e-o-novo-significado-de-conveniencia-na-barra-da-tijuca/index.html
- /blog/lifestyle/pied-a-terre-em-sp-e-no-rio-novo-padrao-para-executivos/ → /src-greenn/blog/lifestyle/pied-a-terre-em-sp-e-no-rio-novo-padrao-para-executivos/index.html
- /blog/lifestyle/moradias-suspensas-o-luxo-em-plantas-de-185-m-a-355-m/ → /src-greenn/blog/lifestyle/moradias-suspensas-o-luxo-em-plantas-de-185-m-a-355-m/index.html
- /blog/lifestyle/o-minimalismo-do-riio-by-piero-lissoni-redefine-o-luxo-carioca/ → /src-greenn/blog/lifestyle/o-minimalismo-do-riio-by-piero-lissoni-redefine-o-luxo-carioca/index.html
- /blog/lifestyle/2-ou-3-suites-encontre-a-planta-ideal-no-nova-vivere/ → /src-greenn/blog/lifestyle/2-ou-3-suites-encontre-a-planta-ideal-no-nova-vivere/index.html
- /blog/lifestyle/a-ultima-reserva-urbana-da-zona-oeste-tem-um-nome-garden-design/ → /src-greenn/blog/lifestyle/a-ultima-reserva-urbana-da-zona-oeste-tem-um-nome-garden-design/index.html
- /blog/lifestyle/claris-casa-clube-refugio-de-alto-padrao-na-barra-da-tijuca/ → /src-greenn/blog/lifestyle/claris-casa-clube-refugio-de-alto-padrao-na-barra-da-tijuca/index.html
- /blog/tegra/bueno-brandao-diferenciais-de-um-novo-morar/ → /src-greenn/blog/tegra/bueno-brandao-diferenciais-de-um-novo-morar/index.html
- /blog/tegra/bueno-brandao-a-forca-das-assinaturas-que-definem-o-projeto/ → /src-greenn/blog/tegra/bueno-brandao-a-forca-das-assinaturas-que-definem-o-projeto/index.html
- /blog/tegra/bueno-brandao-tipologias-pensadas-para-o-seu-estilo-de-vida/ → /src-greenn/blog/tegra/bueno-brandao-tipologias-pensadas-para-o-seu-estilo-de-vida/index.html
- /blog/tegra/bueno-brandao-o-melhor-do-ibirapuera-e-vila-nova-conceicao/ → /src-greenn/blog/tegra/bueno-brandao-o-melhor-do-ibirapuera-e-vila-nova-conceicao/index.html
- /blog/tegra/bueno-brandao-arte-sofisticacao-e-um-novo-olhar-sobre-o-morar/ → /src-greenn/blog/tegra/bueno-brandao-arte-sofisticacao-e-um-novo-olhar-sobre-o-morar/index.html
- /blog/tegra/bueno-brandao-tecnologia-e-sustentabilidade-a-servico-do-conforto/ → /src-greenn/blog/tegra/bueno-brandao-tecnologia-e-sustentabilidade-a-servico-do-conforto/index.html
- /blog/tegra/bueno-brandao-natureza-cidade-e-o-equilibrio-de-viver-bem/ → /src-greenn/blog/tegra/bueno-brandao-natureza-cidade-e-o-equilibrio-de-viver-bem/index.html
- /blog/tegra/bueno-brandao-bem-estar-elevado-a-um-novo-padrao/ → /src-greenn/blog/tegra/bueno-brandao-bem-estar-elevado-a-um-novo-padrao/index.html
- /blog/tegra/bueno-brandao-quando-o-morar-se-revela-nos-detalhes/ → /src-greenn/blog/tegra/bueno-brandao-quando-o-morar-se-revela-nos-detalhes/index.html
- /blog/tegra/relatorio-integrado-tegra-2023/ → /src-greenn/blog/tegra/relatorio-integrado-tegra-2023/index.html
- /blog/tegra/ape-perfeito-da-tegra-incorporadora/ → /src-greenn/blog/tegra/ape-perfeito-da-tegra-incorporadora/index.html
- /blog/tegra/tegra-e-sustentabilidade-relatorio-integrado-2022/ → /src-greenn/blog/tegra/tegra-e-sustentabilidade-relatorio-integrado-2022/index.html

## Continuidade
Aplicar runbook V7 por família, pequenos lotes 3–5 com gates individuais e autorização de merge específica. Priorizar projetos com variantes já registradas e lacunas comprovadas; não modificar páginas conformes por pontuação. Próximo slice: auditoria estática das páginas Ampère/Bem Moema/Tièl e seleção de lacunas, sem transplantar conteúdo. Órbita: completar 2 PSI e QA visual/CRM/consent/WhatsApp; mídia externa depende de origem autorizada, contraste depende de nós. Não modificar mapa.