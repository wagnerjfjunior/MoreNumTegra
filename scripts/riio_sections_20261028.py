"""Authoring helpers for the RIIO RESF sections; no browser dependency."""
from html import escape as e
import json

PHOTO_ITEMS = [
    ('riio-fachada', 'Fachada e orla', 'Arquitetura'),
    ('riio-varanda', 'Varanda', 'Interiores'),
    ('riio-living', 'Living', 'Interiores'),
    ('riio-suite', 'Suíte master', 'Interiores'),
    ('riio-lobby', 'Lobby', 'Arquitetura'),
    ('riio-externa', 'Piscinas e jardins', 'Lazer'),
    ('riio-piscina', 'Piscina coberta', 'Lazer'),
    ('riio-gourmet', 'Espaço gourmet', 'Lazer'),
    ('riio-academia', 'Academia', 'Lazer'),
    ('riio-wine', 'Wine bar', 'Lazer'),
]

def number(n):
    return f'{n:,}'.replace(',', '.')

def architecture_section():
    return '''<section class="section"><div class="wrap riio-neighborhood-intro"><div><p class="eyebrow gold">ARQUITETURA, INTERIORES E PAISAGISMO</p><h2>Uma linguagem que conecta os ambientes</h2></div><div><p class="intro">O RIIO nasce da parceria Tegra + Lissoni. A concepção integrada do escritório italiano aproxima o desenho dos edifícios, os interiores e os jardins, com uma linguagem comum entre espaços de convivência e moradia.</p><p>Para escolher sua unidade, compare a distribuição dos ambientes, a posição no conjunto e a relação entre áreas internas e varanda. A vista ilustrada e a configuração de outra planta não substituem a conferência da unidade de interesse.</p><p>A galeria apresenta a arquitetura e os espaços do projeto em conjunto. Na seção de plantas, você pode aprofundar a comparação por edifício, coluna e pavimento.</p><div class="actions"><a class="button outline" href="#galeria">Explorar os ambientes</a><a class="button yellow" href="#plantas">Conhecer as plantas</a></div></div></div></section>'''


def technical_section(ficha):
    cards = []
    for building in ficha['buildings']:
        rows = ''.join(
            '<tr><th scope="row"><b>' + str(row['quantity']) + '</b> ' + e(row['type'].lower()) +
            '</th><td>' + ' / '.join(number(a) for a in row['areas']) +
            ' m²</td><td>' + str(row['suites']) + '</td><td>' + str(row['parking']) + '</td></tr>'
            for row in building['rows']
        )
        cards.append('<article class="riio-building" id="edificio-' + building['name'].lower() + '"><h3>' +
                     e(building['name']) + '</h3><table><caption class="visually-hidden">Configurações do edifício ' +
                     e(building['name']) + '</caption><thead><tr><th scope="col">Unidades</th><th scope="col">Área</th>' +
                     '<th scope="col">Suítes</th><th scope="col">Vagas</th></tr></thead><tbody>' + rows + '</tbody></table></article>')
    return '''<section class="section paper" id="tipologias"><div class="wrap">
<p class="eyebrow gold">FICHA TÉCNICA · TEGRA + LISSONI</p>
<h2>Nove edifícios, diferentes formas de morar</h2>
<p class="intro">Da escala dos apartamentos às configurações das penthouses, cada edifício tem sua própria composição. Compare as áreas, o número de suítes e as vagas antes de escolher a planta.</p>
<dl class="riio-project-data"><div><dt>Área do terreno</dt><dd>''' + ficha['terrain_label'] + '''</dd></div><div><dt>Composição do projeto</dt><dd>9 edifícios</dd></div><div><dt>Total de residências</dt><dd>132 unidades</dd></div><div><dt>Localização</dt><dd>Barra da Tijuca · Rio de Janeiro</dd></div></dl>
<p>O endereço reúne a Avenida Lúcio Costa e a Avenida Peregrino Junior, na orla da Barra. <a href="#riio-enderecos">Confira os endereços completos do empreendimento.</a></p>
<div class="riio-buildings">''' + ''.join(cards) + '''</div>
<p class="fine">Composição do projeto conforme ficha técnica. As quantidades acima descrevem os edifícios e não representam unidades atualmente disponíveis. As metragens resumidas da ficha e as áreas precisas identificadas em cada prancha têm níveis diferentes de detalhe.</p>
<div class="actions"><a class="button yellow" href="#plantas">Comparar as plantas</a><a class="button outline" href="#formulario" data-form-intent="conditions">Consultar opções por edifício</a></div>
</div></section>'''


def gallery_items(media, plans, mode):
    def view_media(key):
        return {k:media[key][k] for k in ['src','width','height','thumb','thumbWidth','thumbHeight']}
    if mode == 'photos':
        return [dict(view_media(key), id=key, title=title, category=category,
                     alt='Perspectiva ilustrada: ' + title.lower() + ' do RIIO by Piero Lissoni',
                     description='Perspectiva ilustrada oficial · RIIO by Piero Lissoni')
                for key, title, category in PHOTO_ITEMS]
    return [dict(view_media(p['media']), id=p['id'], title=p['area'] + ' m²', category=p['family'],
                 alt='Planta ilustrativa de ' + p['area'] + ' m² do RIIO: ' + p['buildings'],
                 description=p['buildings'] + ' · ' + p['floor'],
                 configuration=str(p['suites']) + ' suítes · ' + str(p['parking']) + ' vagas conforme ficha técnica')
            for p in plans]


def gallery_section(media, plans, mode):
    items = gallery_items(media, plans, mode)
    key = 'ambientes' if mode == 'photos' else 'plantas'
    title = 'Arquitetura, interiores e espaços de convivência' if mode == 'photos' else 'Encontre a configuração que combina com sua rotina'
    lead = ('Explore os ambientes do RIIO, da relação com a orla aos espaços internos. Selecione uma imagem, navegue pelas cenas e amplie os detalhes.'
            if mode == 'photos' else
            'Compare 11 pranchas ilustrativas de apartamentos e penthouses, com identificação de edifício, coluna e pavimento. Amplie cada planta para examinar ambientes, circulação e as áreas precisas indicadas no desenho.')
    first = items[0]
    filters = ['Todos'] + list(dict.fromkeys(i['category'] for i in items))
    controls = ''.join('<button type="button" data-filter="' + e(x) + '" aria-pressed="' + ('true' if x == 'Todos' else 'false') + '">' + e(x) + '</button>' for x in filters)
    thumbs = ''.join('<a class="riio-thumb" href="' + i['src'] + '" target="_blank" rel="noopener noreferrer" data-select="' + str(n) + '" aria-label="Selecionar ' + e(i['title']) + '"' + (' aria-current="true"' if n == 0 else '') + '><img src="' + i['thumb'] + '" alt="Miniatura: ' + e(i['title']) + ' · RIIO by Piero Lissoni" width="' + str(i['thumbWidth']) + '" height="' + str(i['thumbHeight']) + '" loading="lazy" decoding="async"><span>' + e(i['title']) + '</span><small>' + e(i['category']) + '</small></a>' for n, i in enumerate(items))
    serialized = json.dumps(items, ensure_ascii=False).replace('<', '\\u003c')
    return '<section class="section ' + ('riio-photo-section' if mode == 'photos' else 'paper') + '" id="' + ('galeria' if mode == 'photos' else 'plantas') + '"><div class="wrap"><p class="eyebrow gold">' + ('GALERIA DO PROJETO' if mode == 'photos' else 'GALERIA DE PLANTAS') + '</p><h2 id="' + key + '-title">' + title + '</h2><p class="intro">' + lead + '</p><div class="riio-viewer ' + ('is-plans' if mode == 'plans' else 'is-photos') + '" data-riio-gallery="' + key + '" role="region" aria-roledescription="carrossel" aria-labelledby="' + key + '-title"><div class="riio-filters" aria-label="Filtrar ' + key + '" hidden>' + controls + '</div><div class="riio-stage" tabindex="0" aria-label="Imagem selecionada. Use as setas para navegar."><a class="riio-main-link" data-open-image href="' + first['src'] + '" target="_blank" rel="noopener noreferrer" aria-label="Ampliar ' + e(first['title']) + '"><img data-main-image src="' + first['src'] + '" alt="' + e(first['alt']) + '" width="' + str(first['width']) + '" height="' + str(first['height']) + '" loading="lazy" decoding="async"></a><div class="riio-gallery-controls" hidden><button type="button" data-prev aria-label="' + ('Imagem' if mode == 'photos' else 'Planta') + ' anterior">←</button><span data-counter aria-live="polite">1 / ' + str(len(items)) + '</span><button type="button" data-next aria-label="Próxima ' + ('imagem' if mode == 'photos' else 'planta') + '">→</button></div></div><div class="riio-viewer-caption"><div><span data-category>' + e(first['category']) + '</span><h3 data-caption-title>' + e(first['title']) + '</h3><p data-caption-detail>' + e(first['description']) + '</p><p data-configuration>' + e(first.get('configuration', '')) + '</p></div><a class="button outline" data-open-image href="' + first['src'] + '" target="_blank" rel="noopener noreferrer">Ampliar ' + ('imagem' if mode == 'photos' else 'planta') + ' ↗</a></div><p class="riio-media-error" role="status" hidden>Não foi possível carregar esta imagem. Selecione outra imagem ou tente ampliar o arquivo.</p><nav class="riio-thumbs" aria-label="Selecionar ' + key + '">' + thumbs + '</nav><script type="application/json" data-gallery-data>' + serialized + '</script></div><p class="fine">' + ('Perspectivas ilustradas. Itens de entrega e acabamentos devem ser conferidos no memorial descritivo e nos documentos contratuais.' if mode == 'photos' else 'Plantas humanizadas ilustrativas, com sugestões de decoração. As notas e legendas originais foram preservadas. Consulte a planta da unidade pretendida e seus documentos; a existência de uma configuração não confirma sua disponibilidade.') + '</p></div></section>'


def neighborhood_section(media, image, wa):
    photos = [('riio-bairro', 'A paisagem da Barra', 'Praia e ocupação residencial na paisagem do bairro.'),
              ('riio-bairro-orla', 'Vida ao ar livre', 'A faixa de areia e os usos cotidianos da orla.'),
              ('riio-bairro-urbano', 'Entre mar e lagoas', 'O contexto urbano e natural da Barra da Tijuca.')]
    figures = ''.join('<figure>' + image(k, title + ', fotografia contextual da Barra da Tijuca') + '<figcaption><strong>' + title + '</strong><span>' + copy + '</span></figcaption></figure>' for k, title, copy in photos)
    location_wa = wa.replace('Quero%20solicitar%20materiais%20e%20informa%C3%A7%C3%B5es%20sobre%20o%20RIIO%20by%20Piero%20Lissoni%2C%20na%20Barra%20da%20Tijuca.', 'Quero%20receber%20a%20localiza%C3%A7%C3%A3o%20confirmada%20para%20conhecer%20o%20RIIO%20by%20Piero%20Lissoni.')
    return '''<section class="section paper riio-neighborhood" id="localizacao"><div class="wrap">
<div class="riio-neighborhood-intro"><div><p class="eyebrow gold">VIVER NA BARRA DA TIJUCA</p><h2>O mar como parte da rotina. A cidade ao seu alcance.</h2></div><div><p class="intro">Escolher a Barra é pensar no encontro entre uma paisagem aberta e uma rotina urbana. A praia, as lagoas e as áreas residenciais convivem com polos de serviços, comércio e trabalho. No RIIO, essa escolha começa na Avenida Lúcio Costa e precisa fazer sentido nos percursos que você realmente utiliza.</p><p>O endereço de um apartamento frente à orla muda a relação com o espaço externo: o caminho até a praia, o uso do calçadão e os momentos ao ar livre entram no planejamento da semana. A experiência de cada unidade, porém, depende de sua posição e configuração. A fotografia do bairro não representa uma vista garantida do apartamento.</p></div></div>
<div class="riio-neighborhood-photos">''' + figures + '''</div>
<p class="fine">Fotografias contextuais da Barra da Tijuca · acervo de divulgação Tegra. Não são imagens da vista de uma unidade.</p>
<div class="riio-neighborhood-topics"><article><span>01 · ORLA</span><h3>Tempo para estar do lado de fora</h3><p>Caminhar, pedalar ou simplesmente acompanhar o movimento da praia pode fazer parte de uma rotina junto ao mar. Vale conhecer o trecho em horários diferentes, observar os acessos e entender como você pretende usar esses espaços durante a semana e nos fins de semana.</p><p>Para quem pensa em segunda residência, a frequência de uso também importa. Considere quem acompanhará o apartamento entre as estadias e como a conservação será organizada ao longo do ano.</p></article>
<article><span>02 · CONVENIÊNCIA</span><h3>Serviços que precisam fazer sentido para você</h3><p>A Barra reúne centros comerciais, restaurantes, escolas, hospitais e atividades de trabalho em diferentes eixos. Uma escolha residencial se torna mais clara quando você localiza os serviços que já utiliza e compara suas alternativas, em vez de tratar tudo o que existe no bairro como se estivesse à porta.</p><p>Monte sua própria lista de referências: compras de rotina, escola, atendimento de saúde, atividade física e encontros. Essa lista ajuda a relacionar a localização à vida concreta da família.</p></article>
<article><span>03 · DESLOCAMENTOS</span><h3>Avalie os caminhos da sua semana</h3><p>O trajeto de uma visita nem sempre representa a rotina. Teste os percursos de trabalho, estudo e lazer nos horários relevantes e considere como pretende combinar carro, transporte público e deslocamentos locais. O tempo de viagem depende do destino e das condições de cada dia.</p><p>Ao organizar uma visita ao RIIO, peça o ponto de encontro e a rota confirmados. O mapa abaixo oferece contexto da Barra; ele não substitui a orientação para chegar ao atendimento.</p></article>
<article><span>04 · ESCOLHA DO IMÓVEL</span><h3>Localização, planta e conservação na mesma decisão</h3><p>A paisagem é parte da escolha, mas precisa conversar com a planta e o custo de manter o imóvel. Observe orientação, exposição, materiais, circulação e o que será entregue conforme os documentos. Compare esses pontos com o uso pretendido e com as tarefas de manutenção.</p><p>Nosso <a href="/blog/mercado/orla-barra-tijuca-localizacao-conservacao/">guia de imóveis na orla da Barra</a> aprofunda os cuidados de localização e conservação para quem está começando essa pesquisa.</p></article></div>
<div class="riio-local-facts"><div><strong>Rio de Janeiro</strong><span>Zona Oeste</span></div><div><strong>Barra da Tijuca</strong><span>Vida urbana e paisagem costeira</span></div><div><strong>Avenida Lúcio Costa</strong><span>O endereço do RIIO na orla</span></div><div><strong>Visita ao projeto</strong><span>Rota e atendimento sob confirmação</span></div></div>
<div class="riio-map-card"><div class="riio-map-visual"><iframe title="Mapa de contexto da Barra da Tijuca, Rio de Janeiro" src="https://maps.google.com/maps?hl=pt-BR&amp;output=embed&amp;q=Barra%20da%20Tijuca%2C%20Rio%20de%20Janeiro&amp;z=13" loading="lazy" referrerpolicy="no-referrer-when-downgrade" tabindex="-1" aria-hidden="true"></iframe><a href="''' + location_wa + '''" target="_blank" rel="noopener noreferrer" aria-label="Receber a localização confirmada do RIIO pelo WhatsApp"></a></div><div class="riio-map-actions"><div><strong>RIIO · Barra da Tijuca</strong><p>Mapa de contexto do bairro. Solicite a localização confirmada para organizar sua visita.</p></div><a class="button yellow" href="''' + location_wa + '''" target="_blank" rel="noopener noreferrer">Receber localização pelo WhatsApp</a></div></div>
</div></section>'''


def dialog_markup():
    return '''<dialog class="riio-lightbox" id="riio-image-dialog" aria-labelledby="riio-dialog-title"><div class="riio-lightbox-bar"><h2 id="riio-dialog-title">Imagem ampliada</h2><button type="button" data-close-dialog autofocus aria-label="Fechar imagem ampliada">Fechar ×</button></div><div class="riio-lightbox-tools"><button type="button" data-dialog-prev aria-label="Imagem ampliada anterior">← Anterior</button><div><button type="button" data-zoom-out aria-label="Diminuir zoom">−</button><button type="button" data-zoom-reset>Ajustar</button><button type="button" data-zoom-in aria-label="Aumentar zoom">+</button></div><button type="button" data-dialog-next aria-label="Próxima imagem ampliada">Próxima →</button></div><p class="riio-zoom-hint">Use + e − para ampliar; arraste ou role a imagem para examinar os detalhes. Escape fecha a ampliação.</p><div class="riio-lightbox-scroll" tabindex="0" aria-label="Imagem ampliada; role para ver os detalhes"><img data-dialog-image alt="Imagem selecionada do RIIO by Piero Lissoni" width="1600" height="1100"></div><p data-dialog-caption aria-live="polite"></p></dialog>'''


def floorplan_graph(plans, media, url):
    nodes = []
    for p in plans:
        for idx, area in enumerate(p['area'].split(' / ')):
            value = float(area.replace('.', '').replace(',', '.'))
            nodes.append({'@type': 'FloorPlan', '@id': url + '#' + p['id'] + '-' + str(idx+1),
                          'name': p['family'] + ' · ' + area + ' m²',
                          'description': 'Variante identificada na prancha conjunta: ' + p['buildings'] + '. Conferir a área de cada edifício e coluna na legenda original.',
                          'floorSize': {'@type': 'QuantitativeValue', 'value': value, 'unitCode': 'MTK'},
                          'numberOfBedrooms': p['suites'],
                          'image': 'https://www.moretegra.com.br' + media[p['media']]['src']})
    return nodes
