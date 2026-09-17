from pathlib import Path
import json
import re

ROOT = Path('.')
HOME = ROOT / 'src-greenn/preview/index.html'
CAPI = ROOT / 'src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html'
ELO = ROOT / 'src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html'
COMM = ROOT / 'src-greenn/data/commercial-values.json'
VALIDATOR = ROOT / 'scripts/validate-m4-05r.mjs'

TEGRA_ID = 'https://www.tegraincorporadora.com.br/#organization'
SABRINA_AGENT_ID = 'https://www.moretegra.com.br/#sabrina-real-estate-agent'
SABRINA_PROFILE = 'https://corretor.tegravendas.com.br/sabrina/sp'
SABRINA_PHONE = '+5511960779328'


def replace_once(text, old, new, label):
    if old not in text:
        raise SystemExit(f'anchor not found: {label}')
    return text.replace(old, new, 1)


def insert_before_once(text, marker, insert, label):
    if marker not in text:
        raise SystemExit(f'insert marker not found: {label}')
    return text.replace(marker, insert + marker, 1)


# HOME: add a standalone LocalBusiness root that Google can evaluate independently.
home = HOME.read_text(encoding='utf-8')
local_business = '''  <script id="mt-localbusiness-schema" type="application/ld+json">
  {
    "@context":"https://schema.org/",
    "@type":"RealEstateAgent",
    "@id":"https://www.moretegra.com.br/#sabrina-real-estate-agent",
    "name":"Sabrina da Tegra — Corretora Tegra Vendas",
    "description":"Atendimento imobiliário de Sabrina da Tegra, corretora Tegra Vendas, para empreendimentos Tegra em São Paulo.",
    "url":"https://www.moretegra.com.br/",
    "sameAs":"https://corretor.tegravendas.com.br/sabrina/sp",
    "telephone":"+5511960779328",
    "priceRange":"Consulte condições",
    "identifier":{"@type":"PropertyValue","propertyID":"CRECI-SP","value":"209.905-F"},
    "address":{
      "@type":"PostalAddress",
      "streetAddress":"Rua Fortunato Ferraz, 625",
      "addressLocality":"São Paulo",
      "addressRegion":"SP",
      "addressCountry":"BR"
    },
    "areaServed":{"@type":"City","name":"São Paulo"}
  }
  </script>

'''
if 'id="mt-localbusiness-schema"' not in home:
    home = insert_before_once(home, '  <!-- Google Tag Manager -->', local_business, 'home localbusiness before GTM')
HOME.write_text(home, encoding='utf-8')


# CAPIITOLO: add a standalone Product + Offer root using the current official Tegra reference.
capi = CAPI.read_text(encoding='utf-8')
capi_product = '''  <script id="mnt-capiitolo-product-schema" type="application/ld+json">
  {
    "@context":"https://schema.org/",
    "@type":"Product",
    "@id":"https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#product",
    "name":"CAPIITOLO by Piero Lissoni — apartamento de 210 m²",
    "description":"Apartamento tipo de 210 m², 4 suítes e 3 vagas no CAPIITOLO by Piero Lissoni, empreendimento Tegra na Chácara Klabin.",
    "url":"https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/",
    "image":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/349/ImagemPrincipal/Tegra-Incorporadora-Detalhe-Fachada-CAPITOLO-by-Piero-Lissoni-Apartamentos-210-Metros-Chacara-Klabin-Sao-Paulo-SP-714x640-1736369712708.jpg",
    "brand":{"@type":"Brand","name":"Tegra"},
    "offers":{
      "@type":"Offer",
      "@id":"https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#offer",
      "url":"https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/",
      "priceCurrency":"BRL",
      "price":"3539900",
      "seller":{"@type":"Organization","@id":"https://www.tegraincorporadora.com.br/#organization","name":"Tegra Incorporadora","url":"https://www.tegraincorporadora.com.br/"}
    },
    "additionalProperty":{"@type":"PropertyValue","name":"Referência comercial Tegra","value":"Ref. 210 m² (unidade 33) - Ago/26 | pagamento à vista"}
  }
  </script>

'''
if 'id="mnt-capiitolo-product-schema"' not in capi:
    capi = insert_before_once(capi, '  <!-- Google Tag Manager -->', capi_product, 'capi product before GTM')

capi = replace_once(
    capi,
    '<p><strong>Condições atuais sob consulta.</strong> Valores e disponibilidade têm origem nas condições comerciais vigentes da Tegra e devem ser confirmados no atendimento.</p>',
    '<p><strong>A partir de R$ 3.539.900,00.</strong> Ref. 210 m² (unidade 33) - Ago/26 | com pagamento à vista. <a href="https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/chacara-klabin/chacaraklabin" target="_blank" rel="noopener noreferrer">Fonte: Tegra Incorporadora</a>. Valor, unidade e disponibilidade podem mudar e devem ser confirmados no atendimento.</p>',
    'capi visible bootstrap commercial reference'
)

pattern = re.compile(r'const priceSection=`<section class="mnt-price-section".*?</section>`;', re.S)
replacement = '''const priceSection=`<section class="mnt-price-section" id="valores" aria-labelledby="mnt-price-title"><div class="wrap mnt-price-grid"><div><p class="mnt-price-label">A partir de</p><h2 id="mnt-price-title" class="display">R$ 3.539.900</h2></div><div data-commercial-key="capiitolo"><p class="mnt-price-label">Referência oficial Tegra</p><p class="mnt-price-value" data-commercial-value aria-live="polite">Ref. 210 m² (unidade 33) - Ago/26 | pagamento à vista</p><p class="mnt-price-note">Fonte: Tegra Incorporadora. Valor, unidade e disponibilidade podem mudar; confirme as condições vigentes antes da proposta.</p><a class="btn yellow" href="#formulario">Receber condições <span>↓</span></a></div></div></section>`;'''
capi, count = pattern.subn(replacement, capi, count=1)
if count != 1:
    raise SystemExit('anchor not found: capi dynamic price section')
CAPI.write_text(capi, encoding='utf-8')


# ELO DUO: standalone Product + Offer root, plus source-visible fallback in initial HTML.
elo = ELO.read_text(encoding='utf-8')
elo_product = '''  <script id="mt-elo-product-schema" type="application/ld+json">
  {
    "@context":"https://schema.org/",
    "@type":"Product",
    "@id":"https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#product",
    "name":"Caminhos da Lapa Elo Duo — apartamento pronto na Lapa",
    "description":"Apartamento pronto para morar no Caminhos da Lapa, com plantas de 47 m², 55 m² e 67 m² e referência comercial oficial Tegra.",
    "url":"https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/",
    "image":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/317/ImagemPrincipal/8d3d8839-e0b7-4f21-9d0e-99c363c8f6bc.jpg",
    "brand":{"@type":"Brand","name":"Tegra"},
    "offers":{
      "@type":"Offer",
      "@id":"https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#offer",
      "url":"https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/",
      "priceCurrency":"BRL",
      "price":"658000",
      "seller":{"@type":"Organization","@id":"https://www.tegraincorporadora.com.br/#organization","name":"Tegra Incorporadora","url":"https://www.tegraincorporadora.com.br/"}
    },
    "additionalProperty":{"@type":"PropertyValue","name":"Referência comercial Tegra","value":"Ref. 68 m² (unidade 109) - Ago/26 | pagamento à vista"}
  }
  </script>
'''
if 'id="mt-elo-product-schema"' not in elo:
    elo = insert_before_once(elo, '  <script>(function(w,d,s,l,i)', elo_product, 'elo product before GTM')
elo = replace_once(elo, '<div class="mt-price" data-commercial-price>Carregando condição...</div>', '<div class="mt-price" data-commercial-price>R$ 658.000</div>', 'elo visible price')
elo = replace_once(elo, '<p class="mt-commercial-copy" data-commercial-reference>Consulte a referência comercial vigente.</p>', '<p class="mt-commercial-copy" data-commercial-reference>Ref. 68 m² (unidade 109) - Ago/26 | pagamento à vista</p>', 'elo visible reference')
elo = replace_once(elo, '<p class="mt-commercial-copy" data-commercial-disclaimer>Valores e disponibilidade podem mudar. Confirme a condição vigente no atendimento.</p>', '<p class="mt-commercial-copy" data-commercial-disclaimer>Valor de referência da Tegra Incorporadora. Disponibilidade, unidade e condições podem mudar; confirme a condição vigente no atendimento.</p>', 'elo visible disclaimer')
ELO.write_text(elo, encoding='utf-8')


# Governed commercial evidence file: Tegra remains the authoritative source.
commercial = json.loads(COMM.read_text(encoding='utf-8'))
commercial['updatedAt'] = '2026-09-17'
projects = commercial.setdefault('projects', {})
projects['capiitolo-piero-lissoni'] = {
    'state': 'active_reference',
    'priceLabel': 'A partir de',
    'price': 3539900,
    'reference': 'Ref. 210 m² (unidade 33) - Ago/26 | pagamento à vista',
    'sourceClass': 'TEGRA_OFFICIAL_WEBSITE',
    'sourceUrl': 'https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/chacara-klabin/chacaraklabin',
    'sourceObservedAt': '2026-09-17',
    'disclaimer': 'Valor de referência comercial da Tegra. Unidade, disponibilidade e condições podem mudar; confirme as condições vigentes no atendimento.'
}
if 'caminhos-da-lapa-elo-duo' in projects:
    projects['caminhos-da-lapa-elo-duo']['sourceClass'] = 'TEGRA_OFFICIAL_WEBSITE'
    projects['caminhos-da-lapa-elo-duo']['sourceObservedAt'] = '2026-09-17'
COMM.write_text(json.dumps(commercial, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


# Validator: read all JSON-LD roots, allow only governed Product/Offer pairs, and cross-check public prices against the governed source file.
v = VALIDATOR.read_text(encoding='utf-8')
v = replace_once(v,
    "    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328']\n  },",
    "    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328'],\n    localBusinessScriptId: 'mt-localbusiness-schema'\n  },",
    'validator home localbusiness config')

v = replace_once(v,
    "    requiredTypes: ['WebSite', 'WebPage', 'BreadcrumbList', 'ApartmentComplex', 'FloorPlan', 'ImageObject', 'RealEstateAgent', 'Brand', 'Person', 'Service'],\n    requiredIds: ['https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#webpage', 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#project', TEGRA_ID, TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID],\n    requiredSameAs: 'https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/chacara-klabin/chacaraklabin',\n    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328']",
    "    requiredTypes: ['WebSite', 'WebPage', 'BreadcrumbList', 'ApartmentComplex', 'FloorPlan', 'ImageObject', 'RealEstateAgent', 'Brand', 'Person', 'Service', 'Product', 'Offer'],\n    requiredIds: ['https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#webpage', 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#project', 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#product', 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#offer', TEGRA_ID, TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID],\n    requiredSameAs: 'https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/chacara-klabin/chacaraklabin',\n    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328', 'R$ 3.539.900', 'Ref. 210 m² (unidade 33) - Ago/26'],\n    product: { id: 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#product', offerId: 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#offer', projectId: 'capiitolo-piero-lissoni', price: 3539900 }",
    'validator capi product config')

v = replace_once(v,
    "    requiredTypes: ['WebSite', 'WebPage', 'BreadcrumbList', 'ApartmentComplex', 'FloorPlan', 'ImageObject', 'RealEstateAgent', 'Brand', 'Person', 'Service'],\n    requiredIds: ['https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#webpage', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#project', TEGRA_ID, TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID],\n    requiredSameAs: 'https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/caminhos-da-lapa-elo-duo',\n    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328']",
    "    requiredTypes: ['WebSite', 'WebPage', 'BreadcrumbList', 'ApartmentComplex', 'FloorPlan', 'ImageObject', 'RealEstateAgent', 'Brand', 'Person', 'Service', 'Product', 'Offer'],\n    requiredIds: ['https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#webpage', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#project', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#product', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#offer', TEGRA_ID, TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID],\n    requiredSameAs: 'https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/caminhos-da-lapa-elo-duo',\n    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328', 'R$ 658.000', 'Ref. 68 m² (unidade 109) - Ago/26'],\n    product: { id: 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#product', offerId: 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#offer', projectId: 'caminhos-da-lapa-elo-duo', price: 658000 }",
    'validator elo product config')

v = replace_once(v,
    "function getSchema(html, id) {\n  const scripts = [...html.matchAll(/<script\\b([^>]*)type=[\"']application\\/ld\\+json[\"']([^>]*)>([\\s\\S]*?)<\\/script>/gi)];\n  const found = scripts.find((m) => `${m[1]} ${m[2]}`.includes(`id=\"${id}\"`) || `${m[1]} ${m[2]}`.includes(`id='${id}'`));\n  if (!found) return null;\n  return found[3].trim();\n}\n",
    "function getSchema(html, id) {\n  const scripts = [...html.matchAll(/<script\\b([^>]*)type=[\"']application\\/ld\\+json[\"']([^>]*)>([\\s\\S]*?)<\\/script>/gi)];\n  const found = scripts.find((m) => `${m[1]} ${m[2]}`.includes(`id=\"${id}\"`) || `${m[1]} ${m[2]}`.includes(`id='${id}'`));\n  if (!found) return null;\n  return found[3].trim();\n}\n\nfunction getAllSchemas(html) {\n  return [...html.matchAll(/<script\\b[^>]*type=[\"']application\\/ld\\+json[\"'][^>]*>([\\s\\S]*?)<\\/script>/gi)].map((m) => m[1].trim());\n}\n",
    'validator all schema parser')

v = replace_once(v,
    "  const nodes = collectGraph(schema);",
    "  const allSchemas = [];\n  for (const raw of getAllSchemas(html)) {\n    try { allSchemas.push(JSON.parse(raw)); }\n    catch (error) { fail(page.name, `invalid secondary JSON-LD: ${error.message}`); }\n  }\n  const nodes = allSchemas.flatMap((item) => collectGraph(item));",
    'validator collect all JSON-LD roots')

v = replace_once(v,
    "  if (types.has('RealEstateListing')) fail(page.name, 'RealEstateListing is not approved for the M4-05R stable core');\n  if (types.has('Offer')) fail(page.name, 'Offer emitted without an M4-05R governed commercial evidence allowlist');",
    "  if (types.has('RealEstateListing')) fail(page.name, 'RealEstateListing is not approved for the M4-05R stable core');\n  if (types.has('Offer') && !page.product) fail(page.name, 'Offer emitted without a governed project Product allowlist');\n  if (nodes.some((node) => ['Review','AggregateRating'].some((type) => [].concat(node['@type'] ?? []).includes(type)))) fail(page.name, 'Review/AggregateRating must not be fabricated for Rich Results eligibility');\n\n  if (page.product) {\n    const product = typedNode(nodes, page.product.id, 'Product');\n    const offer = typedNode(nodes, page.product.offerId, 'Offer');\n    if (!product) fail(page.name, 'standalone Google Product root missing');\n    if (!offer) fail(page.name, 'governed Product Offer missing');\n    else {\n      if (Number(offer.price) !== page.product.price) fail(page.name, `Offer price mismatch: ${offer.price ?? 'missing'}`);\n      if (offer.priceCurrency !== 'BRL') fail(page.name, 'Offer priceCurrency must be BRL');\n      if (offer.url !== page.canonical) fail(page.name, 'Offer url must equal canonical');\n      if (offer.seller?.['@id'] !== TEGRA_ID) fail(page.name, 'Offer seller must reference authoritative Tegra entity');\n    }\n  }",
    'validator governed offer policy')

v = replace_once(v,
    "  const sabrinaAgent = typedNode(nodes, SABRINA_AGENT_ID, 'RealEstateAgent');",
    "  if (page.localBusinessScriptId) {\n    const localRaw = getSchema(html, page.localBusinessScriptId);\n    if (!localRaw) fail(page.name, 'standalone LocalBusiness JSON-LD root missing');\n    else {\n      try {\n        const local = JSON.parse(localRaw);\n        if (![local['@type']].flat().includes('RealEstateAgent')) fail(page.name, 'standalone LocalBusiness root must be RealEstateAgent');\n        if (local.name !== 'Sabrina da Tegra — Corretora Tegra Vendas') fail(page.name, 'standalone LocalBusiness name mismatch');\n        if (local.address?.['@type'] !== 'PostalAddress' || !local.address?.streetAddress) fail(page.name, 'standalone LocalBusiness physical address missing');\n      } catch (error) { fail(page.name, `invalid standalone LocalBusiness JSON-LD: ${error.message}`); }\n    }\n  }\n\n  const sabrinaAgent = typedNode(nodes, SABRINA_AGENT_ID, 'RealEstateAgent');",
    'validator standalone local business')

v = replace_once(v,
    "const capiitolo = await readFile('src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html', 'utf8');",
    "const governedCommercial = JSON.parse(await readFile('src-greenn/data/commercial-values.json', 'utf8'));\nfor (const page of pages.filter((item) => item.product)) {\n  const commercial = governedCommercial.projects?.[page.product.projectId];\n  if (!commercial || commercial.state !== 'active_reference') fail(page.name, 'governed commercial active_reference missing');\n  else if (Number(commercial.price) !== page.product.price) fail(page.name, `governed commercial price mismatch: ${commercial.price ?? 'missing'}`);\n  if (commercial?.sourceClass !== 'TEGRA_OFFICIAL_WEBSITE') fail(page.name, 'commercial source must be TEGRA_OFFICIAL_WEBSITE');\n}\n\nconst capiitolo = await readFile('src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html', 'utf8');",
    'validator commercial source cross-check')

VALIDATOR.write_text(v, encoding='utf-8')

print('Consolidated M4-05R Rich Results patch applied.')
