import { readFile } from 'node:fs/promises';
import process from 'node:process';

const TEGRA_ID = 'https://www.tegraincorporadora.com.br/#organization';
const TEGRA_BRAND_ID = 'https://www.moretegra.com.br/#tegra-brand';
const SABRINA_ID = 'https://www.moretegra.com.br/#sabrina-da-tegra';
const SABRINA_AGENT_ID = 'https://www.moretegra.com.br/#sabrina-real-estate-agent';
const TEGRA_VENDAS_ID = 'https://www.moretegra.com.br/#tegra-vendas';
const SABRINA_PROFILE = 'https://corretor.tegravendas.com.br/sabrina/sp';
const SABRINA_PHONE = '+5511960779328';
const SABRINA_CRECI = '209.905-F';

const pages = [
  {
    name: 'home',
    file: 'src-greenn/preview/index.html',
    canonical: 'https://www.moretegra.com.br/',
    schemaId: 'mt-search-schema',
    requiredTypes: ['WebSite', 'CollectionPage', 'ItemList', 'RealEstateAgent', 'Brand', 'Person', 'Service'],
    requiredIds: ['https://www.moretegra.com.br/#website', 'https://www.moretegra.com.br/#webpage', 'https://www.moretegra.com.br/#projects', TEGRA_ID, TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID],
    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328'],
    localBusinessScriptId: 'mt-localbusiness-schema'
  },
  {
    name: 'capiitolo',
    file: 'src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html',
    canonical: 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/',
    schemaId: 'mnt-capiitolo-schema',
    requiredTypes: ['WebSite', 'WebPage', 'BreadcrumbList', 'ApartmentComplex', 'FloorPlan', 'ImageObject', 'RealEstateAgent', 'Brand', 'Person', 'Service', 'Product', 'Offer'],
    requiredIds: ['https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#webpage', 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#project', 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#product', 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#offer', TEGRA_ID, TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID],
    requiredSameAs: 'https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/chacara-klabin/chacaraklabin',
    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328', 'R$ 3.539.900', 'Ref. 210 m² (unidade 33) - Ago/26'],
    product: { id: 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#product', offerId: 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#offer', projectId: 'capiitolo-piero-lissoni', price: 3539900 }
  },
  {
    name: 'elo-duo',
    file: 'src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html',
    canonical: 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/',
    schemaId: 'mt-project-schema',
    requiredTypes: ['WebSite', 'WebPage', 'BreadcrumbList', 'ApartmentComplex', 'FloorPlan', 'ImageObject', 'RealEstateAgent', 'Brand', 'Person', 'Service', 'Product', 'Offer'],
    requiredIds: ['https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#webpage', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#project', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#product', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#offer', TEGRA_ID, TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID],
    requiredSameAs: 'https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/caminhos-da-lapa-elo-duo',
    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328', 'R$ 658.000', 'Ref. 68 m² (unidade 109) - Ago/26'],
    product: { id: 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#product', offerId: 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#offer', projectId: 'caminhos-da-lapa-elo-duo', price: 658000 }
  }
];

const failures = [];

function fail(page, message) {
  failures.push(`${page}: ${message}`);
}

function attr(html, selectorPattern, attrName) {
  const match = html.match(selectorPattern);
  if (!match) return null;
  const tag = match[0];
  const attribute = tag.match(new RegExp(`${attrName}=["']([^"']+)["']`, 'i'));
  return attribute?.[1] ?? null;
}

function metaBy(html, key, value, contentAttr = 'content') {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const keyMatch = tag.match(new RegExp(`${key}=["']([^"']+)["']`, 'i'));
    if (keyMatch?.[1] !== value) continue;
    const content = tag.match(new RegExp(`${contentAttr}=["']([^"']*)["']`, 'i'));
    return content?.[1] ?? '';
  }
  return null;
}

function getSchema(html, id) {
  const scripts = [...html.matchAll(/<script\b([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi)];
  const found = scripts.find((m) => `${m[1]} ${m[2]}`.includes(`id="${id}"`) || `${m[1]} ${m[2]}`.includes(`id='${id}'`));
  if (!found) return null;
  return found[3].trim();
}

function getAllSchemas(html) {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1].trim());
}

function walk(value, visit) {
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit);
    return;
  }
  if (!value || typeof value !== 'object') return;
  visit(value);
  for (const child of Object.values(value)) walk(child, visit);
}

function collectGraph(schema) {
  const nodes = [];
  walk(schema, (node) => nodes.push(node));
  return nodes;
}

function typedNode(nodes, id, type) {
  return nodes.find((node) => node['@id'] === id && [].concat(node['@type'] ?? []).includes(type));
}

for (const page of pages) {
  const html = await readFile(page.file, 'utf8');

  if (!/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)) fail(page.name, 'H1 missing from initial HTML source');

  const canonical = attr(html, /<link\b[^>]*rel=["']canonical["'][^>]*>/i, 'href');
  if (canonical !== page.canonical) fail(page.name, `canonical mismatch: ${canonical ?? 'missing'}`);

  const ogUrl = metaBy(html, 'property', 'og:url');
  if (ogUrl !== page.canonical) fail(page.name, `og:url mismatch: ${ogUrl ?? 'missing'}`);

  const requiredSocial = [
    ['property', 'og:type'], ['property', 'og:site_name'], ['property', 'og:locale'],
    ['property', 'og:title'], ['property', 'og:description'], ['property', 'og:image'], ['property', 'og:image:alt'],
    ['name', 'twitter:card'], ['name', 'twitter:title'], ['name', 'twitter:description'], ['name', 'twitter:image'], ['name', 'twitter:image:alt']
  ];
  for (const [key, value] of requiredSocial) {
    if (!metaBy(html, key, value)) fail(page.name, `${value} missing or empty`);
  }

  const rawSchema = getSchema(html, page.schemaId);
  if (!rawSchema) {
    fail(page.name, `JSON-LD script #${page.schemaId} missing`);
    continue;
  }

  let schema;
  try {
    schema = JSON.parse(rawSchema);
  } catch (error) {
    fail(page.name, `invalid JSON-LD: ${error.message}`);
    continue;
  }

  const allSchemas = [];
  for (const raw of getAllSchemas(html)) {
    try { allSchemas.push(JSON.parse(raw)); }
    catch (error) { fail(page.name, `invalid secondary JSON-LD: ${error.message}`); }
  }
  const nodes = allSchemas.flatMap((item) => collectGraph(item));
  const types = new Set();
  const ids = new Set();
  const sameAs = new Set();
  for (const node of nodes) {
    for (const type of [].concat(node['@type'] ?? [])) types.add(type);
    if (typeof node['@id'] === 'string') ids.add(node['@id']);
    for (const value of [].concat(node.sameAs ?? [])) if (typeof value === 'string') sameAs.add(value);
  }

  for (const type of page.requiredTypes) if (!types.has(type)) fail(page.name, `required Schema.org type missing: ${type}`);
  for (const id of page.requiredIds) if (!ids.has(id)) fail(page.name, `required @id missing: ${id}`);
  if (page.requiredSameAs && !sameAs.has(page.requiredSameAs)) fail(page.name, `official Tegra project sameAs missing: ${page.requiredSameAs}`);

  if (types.has('RealEstateListing')) fail(page.name, 'RealEstateListing is not approved for the M4-05R stable core');
  if (types.has('Offer') && !page.product) fail(page.name, 'Offer emitted without a governed project Product allowlist');
  if (nodes.some((node) => ['Review','AggregateRating'].some((type) => [].concat(node['@type'] ?? []).includes(type)))) fail(page.name, 'Review/AggregateRating must not be fabricated for Rich Results eligibility');

  if (page.product) {
    const product = typedNode(nodes, page.product.id, 'Product');
    const offer = typedNode(nodes, page.product.offerId, 'Offer');
    if (!product) fail(page.name, 'standalone Google Product root missing');
    if (!offer) fail(page.name, 'governed Product Offer missing');
    else {
      if (Number(offer.price) !== page.product.price) fail(page.name, `Offer price mismatch: ${offer.price ?? 'missing'}`);
      if (offer.priceCurrency !== 'BRL') fail(page.name, 'Offer priceCurrency must be BRL');
      if (offer.url !== page.canonical) fail(page.name, 'Offer url must equal canonical');
      if (offer.seller?.['@id'] !== TEGRA_ID) fail(page.name, 'Offer seller must reference authoritative Tegra entity');
    }
  }

  const webPage = nodes.find((node) => node['@type'] === 'WebPage' || node['@type'] === 'CollectionPage');
  if (!webPage) fail(page.name, 'page entity missing');
  else if (webPage.url !== page.canonical) fail(page.name, `page entity url mismatch: ${webPage.url ?? 'missing'}`);

  const tegra = typedNode(nodes, TEGRA_ID, 'RealEstateAgent');
  if (!tegra) fail(page.name, 'authoritative Tegra entity definition missing or wrong type');
  else if (tegra.brand?.['@id'] !== TEGRA_BRAND_ID) fail(page.name, 'Tegra brand must be attached to the authoritative organization entity');

  for (const apartmentComplex of nodes.filter((node) => [].concat(node['@type'] ?? []).includes('ApartmentComplex'))) {
    if (Object.hasOwn(apartmentComplex, 'brand')) fail(page.name, 'brand is not valid on ApartmentComplex; reconcile via official project sameAs and Tegra organization entity');
  }

  if (page.localBusinessScriptId) {
    const localRaw = getSchema(html, page.localBusinessScriptId);
    if (!localRaw) fail(page.name, 'standalone LocalBusiness JSON-LD root missing');
    else {
      try {
        const local = JSON.parse(localRaw);
        if (![local['@type']].flat().includes('RealEstateAgent')) fail(page.name, 'standalone LocalBusiness root must be RealEstateAgent');
        if (local.name !== 'Sabrina da Tegra — Corretora Tegra Vendas') fail(page.name, 'standalone LocalBusiness name mismatch');
        if (local.address?.['@type'] !== 'PostalAddress' || !local.address?.streetAddress) fail(page.name, 'standalone LocalBusiness physical address missing');
      } catch (error) { fail(page.name, `invalid standalone LocalBusiness JSON-LD: ${error.message}`); }
    }
  }

  const sabrinaAgent = typedNode(nodes, SABRINA_AGENT_ID, 'RealEstateAgent');
  if (!sabrinaAgent) fail(page.name, 'Sabrina RealEstateAgent/LocalBusiness entity missing');
  else {
    if (sabrinaAgent.name !== 'Sabrina da Tegra — Corretora Tegra Vendas') fail(page.name, 'Sabrina RealEstateAgent name mismatch');
    if (sabrinaAgent.url !== 'https://www.moretegra.com.br/') fail(page.name, 'Sabrina RealEstateAgent url mismatch');
    if (sabrinaAgent.telephone !== SABRINA_PHONE) fail(page.name, 'Sabrina RealEstateAgent telephone mismatch');
    if (sabrinaAgent.sameAs !== SABRINA_PROFILE) fail(page.name, 'Sabrina RealEstateAgent official sameAs mismatch');
    const a = sabrinaAgent.address;
    if (a?.['@type'] !== 'PostalAddress' || a.streetAddress !== 'Rua Fortunato Ferraz, 625' || a.addressLocality !== 'São Paulo' || a.addressRegion !== 'SP' || a.addressCountry !== 'BR') fail(page.name, 'Sabrina RealEstateAgent address mismatch');
  }

  const sabrina = typedNode(nodes, SABRINA_ID, 'Person');
  if (!sabrina) fail(page.name, 'Sabrina Person entity definition missing');
  else {
    if (sabrina.worksFor?.['@id'] !== TEGRA_VENDAS_ID) fail(page.name, 'Sabrina worksFor must reference Tegra Vendas');
    if (sabrina.sameAs !== SABRINA_PROFILE && ![].concat(sabrina.sameAs ?? []).includes(SABRINA_PROFILE)) fail(page.name, 'Sabrina official Tegra Vendas sameAs missing');
    if (sabrina.identifier?.value !== SABRINA_CRECI) fail(page.name, 'Sabrina CRECI mismatch');
  }

  const service = nodes.find((node) => [].concat(node['@type'] ?? []).includes('Service') && node.broker?.['@id'] === SABRINA_ID);
  if (!service) fail(page.name, 'Sabrina broker Service relation missing');
  else if (service.provider?.['@id'] !== SABRINA_AGENT_ID) fail(page.name, 'Service provider must reference Sabrina RealEstateAgent');

  const phone = nodes.find((node) => node['@id'] === 'https://www.moretegra.com.br/#sabrina-contato' && node.telephone);
  if (phone?.telephone !== SABRINA_PHONE) fail(page.name, 'Sabrina normalized commercial telephone mismatch');

  for (const needle of page.visibleNeedles) if (!html.includes(needle)) fail(page.name, `visible parity text missing: ${needle}`);
}

const governedCommercial = JSON.parse(await readFile('src-greenn/data/commercial-values.json', 'utf8'));
for (const page of pages.filter((item) => item.product)) {
  const commercial = governedCommercial.projects?.[page.product.projectId];
  if (!commercial || commercial.state !== 'active_reference') fail(page.name, 'governed commercial active_reference missing');
  else if (Number(commercial.price) !== page.product.price) fail(page.name, `governed commercial price mismatch: ${commercial.price ?? 'missing'}`);
  if (commercial?.sourceClass !== 'TEGRA_OFFICIAL_WEBSITE') fail(page.name, 'commercial source must be TEGRA_OFFICIAL_WEBSITE');
}

const capiitolo = await readFile('src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html', 'utf8');
for (const stale of ['3647490', '3.647.490', 'Unidade 24', '17.369']) {
  if (capiitolo.includes(stale)) fail('capiitolo', `stale hardcoded commercial value remains: ${stale}`);
}

if (failures.length) {
  console.error('\nM4-05R validation FAILED\n');
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`M4-05R validation PASS: ${pages.length} canonical surfaces checked.`);
