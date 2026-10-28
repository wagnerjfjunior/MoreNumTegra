# RIIO — ficha integrada, galerias e bairro — 28/10/2026

## Escopo do usuário

Correção da preparação em PR507, mesma branch `editorial/mercado-11-preparacao-20261028`. O usuário rejeitou a ficha como link/compêndio resumido, as fotos sem galeria, a ausência de galeria de plantas e o bloco superficial de bairro. Aprovou expressamente **hero e facts**; preservar ambos. Sem publicação/merge.

## Resultado implementado

- Ficha técnica nativa com terreno **30.003,73 m²**, **9 edifícios** e os **132 imóveis da composição do projeto**, sem tratar quantidade como estoque. Todos os grupos de apartamentos/penthouses, áreas, suítes e vagas de Sole, Mare, Brezza, Freschezza, Aria, Acqua, Alba, Luce e Orlo reproduzem os dados fornecidos pelo usuário em `riio-ficha-tecnica.json`. Dois endereços completos no rodapé canônico, acessíveis a partir da ficha. Não há substituição da ficha por botão de PDF.
- Uma galeria de **10 ambientes**: fachada, varanda, living, suíte master, lobby, piscinas/jardins, piscina coberta, gourmet, academia e wine bar. As perspectivas do projeto ficam reunidas nela; removida a fotografia de lobby isolada do bloco de arquitetura. Hero e fotos contextuais do bairro continuam em seus papéis próprios.
- Galeria separada de **11 pranchas de plantas**: filtros apartamento/penthouse, edifícios/colunas/pavimentos/áreas precisas, 4–6 suítes e vagas da ficha. As metragens arredondadas da ficha são diferenciadas das áreas precisas das pranchas, sem associá-las a estoque ou a uma unidade anunciada.
- Duas galerias independentes, seletor de miniaturas, anterior/próxima, contador, filtros, teclas de navegação, toque e ampliação em dialog nativo, zoom e rolagem. Fechar retorna o foco ao acionador; Escape é comportamento nativo do dialog. Sem autoplay. Sem JavaScript, os links abrem os arquivos reais; falhas de mídia têm indicação legível.
- Bairro: bloco editorial original sobre orla, serviços, deslocamentos e escolha/conservação do imóvel; três fotos contextuais e painel local, mapa do bairro sem apontar entrada exata e ação de localização confirmada via WhatsApp. Sem tempos de deslocamento inventados nem regional RJ artificial.
- Dados estruturados: todas as 15 variantes de área das 11 pranchas ligadas ao projeto; nove edifícios identificados como partes do complexo e galeria com suas imagens. Mantidos autorias/serviço/identidade e ausência de Offer/Product sem unidade governada. Sintaxe/relacionamentos locais não certificam Google ou Schema.org externos.

## Fontes e mídia

- Ficha integral fornecida pelo usuário nesta rodada, consistente com a referência de ficha https://www.tegralissoni.com.br/media/transamerica/Ficha_Tecnica.pdf. Quantidades derivam exclusivamente das linhas fornecidas. Vagas de Alba seguem **4**, conforme a ficha do usuário; não importar divergências de outros materiais antigos.
- Galeria e três fotos do bairro: URLs reais observadas no DOM do portal oficial https://www.tegraincorporadora.com.br/rj/rio-de-janeiro/oeste/barra-da-tijuca/transamerica. Usados os arquivos diretos de `stracctegra.blob.core.windows.net`, não proxies de otimização do portal. Cenas conferidas em contact sheet.
- Pranchas Tegra + Lissoni disponibilizadas publicamente em https://evandroimoveisrj.com.br/es/rio-by-piero-lissoni/; arquivos originais `riio-lissoni-planta-01.webp` a `11.webp`, URLs observadas e abertas. Arte, logotipos, plantas, notas e legendas foram preservados. Não foram usados preços, fluxo financeiro, prazo de entrega, texto de venda, credenciais ou contato do distribuidor. Proveniência e hashes em `midia.json`; identificação em `riio-plantas.json`. As legendas de cada prancha foram conferidas visualmente e com OCR, inclusive áreas múltiplas e escopo de edifício/coluna.
- O PDF de plantas público encontrado em distribuidor retornou 403 no download direto; não houve contorno. As pranchas individuais estavam acessíveis e forneceram a galeria completa desta preparação. Nenhuma planta foi desenhada por IA ou inferida a partir de uma perspectiva.
- Originais maiores e miniaturas em WebP com dimensões reais; imagens abaixo da dobra lazy. Mídia e dados são locais no candidato; o navegador não depende do site do distribuidor para mostrá-las. Sem alegação de melhoria medida em CWV/Lighthouse.

## Proteções e validação

Hashes congelados do HTML aprovado de hero/facts e Form46 em `riio-componentes-aprovados.json`, referência `d1821555694353879b2ffd41d90ecc193465ace8`. Os três blocos foram comparados byte a byte. CSS original `riio.css` não foi alterado; componentes novos estão isolados em `riio-galleries.css`. Form/runtime/mensuração existentes preservados. Os 11 artigos não foram alterados nesta rodada.

Validator novo protege ficha, edifícios, composição, fontes locais, galerias, variantes de área/schema, bairro, mapa/WhatsApp, IDs e os componentes aprovados. Teste em DOM simulado cobre independência dos viewers, filtros, seleção, wrap, teclado/foco, ampliação, zoom, retorno de foco, swipe sem abertura involuntária e erro de mídia. `jsdom@26.1.0` é dependência **somente de teste**, instalada fora da aplicação; não há biblioteca de carrossel ou framework carregado pelo site.

Rodapé comercial, cobertura de schema, contato remoto, favicon e gates Mercado passam localmente. CI do novo head precisa ser observado separadamente. Nenhum formulário ou WhatsApp foi enviado. Renderização mobile/desktop do novo código, dialog nativo/pinch e entrega CRM são evidências distintas do DOM simulado. Noindex, sitemap e ausência de release permanecem preservados.

## Correção do rodapé solicitada em seguida

O usuário apontou contato em linha corrida e navegação adicional fora do padrão. O builder agora reutiliza o footer real do Tièl aprovado, substituindo somente o endereço governado e preservando o anchor `riio-enderecos`. Nome/credencial em `strong`, quebra de linha antes do telefone, rótulo `perfil oficial Tegra Vendas`, mesmos disclaimers/logo e tipografia/cores/espaçamento de rodapé. Removida a linha extra de Empreendimentos em São Paulo / Blog / Site oficial do projeto. O validator compara o footer integral à referência, normalizando apenas endereço e anchor. Hero, facts, ficha, galerias, bairro, Form46 e runtime permanecem preservados. Gates locais de footer/RIIO/Mercado e interação das galerias passaram; o CI do novo head é conferido separadamente.
