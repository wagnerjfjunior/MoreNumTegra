from pathlib import Path

FILES = [
    Path('src-greenn/preview/index.html'),
    Path('src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html'),
    Path('src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html'),
]

AGENT_ID = 'https://www.moretegra.com.br/#sabrina-real-estate-agent'
SABRINA_ID = 'https://www.moretegra.com.br/#sabrina-da-tegra'

PRETTY_AGENT = '''      {
        "@type":"RealEstateAgent",
        "@id":"https://www.moretegra.com.br/#sabrina-real-estate-agent",
        "name":"Sabrina da Tegra — Corretora Tegra Vendas",
        "description":"Atendimento imobiliário de Sabrina da Tegra, corretora Tegra Vendas, para empreendimentos Tegra em São Paulo.",
        "url":"https://www.moretegra.com.br/",
        "sameAs":"https://corretor.tegravendas.com.br/sabrina/sp",
        "telephone":"+5511960779328",
        "address":{
          "@type":"PostalAddress",
          "streetAddress":"Rua Fortunato Ferraz, 625",
          "addressLocality":"São Paulo",
          "addressRegion":"SP",
          "addressCountry":"BR"
        },
        "areaServed":{"@type":"City","name":"São Paulo"}
      },
'''

COMPACT_AGENT = '{"@type":"RealEstateAgent","@id":"https://www.moretegra.com.br/#sabrina-real-estate-agent","name":"Sabrina da Tegra — Corretora Tegra Vendas","description":"Atendimento imobiliário de Sabrina da Tegra, corretora Tegra Vendas, para empreendimentos Tegra em São Paulo.","url":"https://www.moretegra.com.br/","sameAs":"https://corretor.tegravendas.com.br/sabrina/sp","telephone":"+5511960779328","address":{"@type":"PostalAddress","streetAddress":"Rua Fortunato Ferraz, 625","addressLocality":"São Paulo","addressRegion":"SP","addressCountry":"BR"},"areaServed":{"@type":"City","name":"São Paulo"}},'

for path in FILES:
    text = path.read_text(encoding='utf-8')
    if AGENT_ID not in text:
        pretty_marker = '      {\n        "@type":"Person",\n        "@id":"https://www.moretegra.com.br/#sabrina-da-tegra",'
        compact_marker = '{"@type":"Person","@id":"https://www.moretegra.com.br/#sabrina-da-tegra"'
        if pretty_marker in text:
            text = text.replace(pretty_marker, PRETTY_AGENT + pretty_marker, 1)
        elif compact_marker in text:
            text = text.replace(compact_marker, COMPACT_AGENT + compact_marker, 1)
        else:
            raise SystemExit(f'Person marker not found in {path}')

    service_anchor = '"broker":{"@id":"https://www.moretegra.com.br/#sabrina-da-tegra"}'
    provider_anchor = '"provider":{"@id":"https://www.moretegra.com.br/#sabrina-real-estate-agent"},' + service_anchor
    if provider_anchor not in text:
        if service_anchor not in text:
            raise SystemExit(f'Service broker anchor not found in {path}')
        text = text.replace(service_anchor, provider_anchor, 1)

    path.write_text(text, encoding='utf-8')

vp = Path('scripts/validate-m4-05r.mjs')
v = vp.read_text(encoding='utf-8')
if "const SABRINA_AGENT_ID" not in v:
    v = v.replace(
        "const SABRINA_ID = 'https://www.moretegra.com.br/#sabrina-da-tegra';",
        "const SABRINA_ID = 'https://www.moretegra.com.br/#sabrina-da-tegra';\nconst SABRINA_AGENT_ID = 'https://www.moretegra.com.br/#sabrina-real-estate-agent';",
    )
v = v.replace('TEGRA_ID, TEGRA_BRAND_ID, SABRINA_ID]', 'TEGRA_ID, TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID]')

if 'Sabrina RealEstateAgent/LocalBusiness entity missing' not in v:
    marker = "  const sabrina = typedNode(nodes, SABRINA_ID, 'Person');\n"
    block = "  const sabrinaAgent = typedNode(nodes, SABRINA_AGENT_ID, 'RealEstateAgent');\n  if (!sabrinaAgent) fail(page.name, 'Sabrina RealEstateAgent/LocalBusiness entity missing');\n  else {\n    if (sabrinaAgent.name !== 'Sabrina da Tegra — Corretora Tegra Vendas') fail(page.name, 'Sabrina RealEstateAgent name mismatch');\n    if (sabrinaAgent.url !== 'https://www.moretegra.com.br/') fail(page.name, 'Sabrina RealEstateAgent url mismatch');\n    if (sabrinaAgent.telephone !== SABRINA_PHONE) fail(page.name, 'Sabrina RealEstateAgent telephone mismatch');\n    if (sabrinaAgent.sameAs !== SABRINA_PROFILE) fail(page.name, 'Sabrina RealEstateAgent official sameAs mismatch');\n    const a = sabrinaAgent.address;\n    if (a?.['@type'] !== 'PostalAddress' || a.streetAddress !== 'Rua Fortunato Ferraz, 625' || a.addressLocality !== 'São Paulo' || a.addressRegion !== 'SP' || a.addressCountry !== 'BR') fail(page.name, 'Sabrina RealEstateAgent address mismatch');\n  }\n\n"
    if marker not in v:
        raise SystemExit('Validator Sabrina marker not found')
    v = v.replace(marker, block + marker, 1)

if 'Service provider must reference Sabrina RealEstateAgent' not in v:
    marker = "  const phone = nodes.find((node) => node['@id'] === 'https://www.moretegra.com.br/#sabrina-contato' && node.telephone);"
    block = "  const service = nodes.find((node) => [].concat(node['@type'] ?? []).includes('Service') && node.broker?.['@id'] === SABRINA_ID);\n  if (!service) fail(page.name, 'Sabrina broker Service relation missing');\n  else if (service.provider?.['@id'] !== SABRINA_AGENT_ID) fail(page.name, 'Service provider must reference Sabrina RealEstateAgent');\n\n"
    if marker not in v:
        raise SystemExit('Validator phone marker not found')
    v = v.replace(marker, block + marker, 1)

vp.write_text(v, encoding='utf-8')
