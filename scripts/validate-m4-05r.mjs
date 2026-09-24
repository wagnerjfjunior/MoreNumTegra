import { readFile } from 'node:fs/promises';
import process from 'node:process';

const TEGRA_BRAND_ID = 'https://www.moretegra.com.br/#tegra-brand';
const SABRINA_ID = 'https://www.moretegra.com.br/#sabrina-da-tegra';
const SABRINA_AGENT_ID = 'https://www.moretegra.com.br/#sabrina-real-estate-agent';
const TEGRA_VENDAS_ID = 'https://www.moretegra.com.br/#tegra-vendas';
const SABRINA_PROFILE = 'https://corretor.tegravendas.com.br/sabrina/sp';
const SABRINA_PHONE = '+5511960779328';
const SABRINA_CRECI = '209.905-F';
const SABRINA_POSTAL_CODE = '05093-000';
const SABRINA_BUSINESS_IMAGE = 'https://s3-gdigital.s3.amazonaws.com/gdigital/313/sNzJJWhmmsjkZjUV7gCKTgrlzRINCD6yDIAvkZOJ.webp';
const SABRINA_BUSINESS_LOGO = 'https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp';
const ESTANDE_ID = 'https://www.moretegra.com.br/#estande-caminhos-da-lapa';
const ESTANDE_LATITUDE = -23.517165527430233;
const ESTANDE_LONGITUDE = -46.71861778788628;
const CAPIITOLO_AGENT_ID = 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#sabrina-atendimento';
const CAPIITOLO_PROJECT_ID = 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#project';
const CAPIITOLO_LATITUDE = -23.58341615763821;
const CAPIITOLO_LONGITUDE = -46.62704356167254;
const VIDEO_UPLOAD_DATE = '2026-08-23T19:50:00Z';

const pages = [
  {
    name: 'home',
    file: 'src-greenn/preview/index.html',
    canonical: 'https://www.moretegra.com.br/',
    schemaId: 'mt-search-schema',
    requiredTypes: ['WebSite', 'CollectionPage', 'ItemList', 'RealEstateAgent', 'Brand', 'Person', 'Service', 'VideoObject'],
    requiredIds: ['https://www.moretegra.com.br/#website', 'https://www.moretegra.com.br/#webpage', 'https://www.moretegra.com.br/#projects', 'https://www.moretegra.com.br/#campaign-video', TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID],
    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328'],
    localBusinessScriptId: 'mt-localbusiness-schema'
  },
  {
    name: 'capiitolo',
    file: 'src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html',
    canonical: 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/',
    schemaId: 'mnt-capiitolo-schema',
    requiredTypes: ['WebSite', 'WebPage', 'BreadcrumbList', 'ApartmentComplex', 'FloorPlan', 'ImageObject', 'RealEstateAgent', 'Brand', 'Person', 'Service'],
    requiredIds: ['https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/#webpage', CAPIITOLO_PROJECT_ID, TEGRA_BRAND_ID, SABRINA_ID, CAPIITOLO_AGENT_ID],
    visibleNeedles: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328', 'R$ 3.539.900', 'Ref. 210 m² · unidade 33 · Ago/26'],
    commercialProjectId: 'capiitolo-piero-lissoni'
  },
  {
    name: 'elo-duo',
    file: 'src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html',
    canonical: 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/',
    schemaId: 'mt-project-schema',
    requiredTypes: ['WebSite', 'WebPage', 'BreadcrumbList', 'ApartmentComplex', 'FloorPlan', 'ImageObject', 'RealEstateAgent', 'Brand', 'Person', 'Service', 'Product', 'Offer'],
    requiredIds: ['https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#webpage', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#project', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#product', 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/#offer', TEGRA_BRAND_ID, SABRINA_ID, SABRINA_AGENT_ID],
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

  const expectedPageType = page.name === 'home' ? 'schema:CollectionPage' : 'schema:WebPage';
  const expectedHeadAbout = page.canonical + '#webpage';
  const headTag = html.match(/<head\b[^>]*>/i)?.[0] ?? '';
  if (!headTag.includes(`about="${expectedHeadAbout}"`) || !headTag.includes(`typeof="${expectedPageType}"`) || !headTag.includes('schema: https://schema.org/') || !headTag.includes('og: https://ogp.me/ns#')) fail(page.name, 'typed RDFa social metadata subject missing or inconsistent');
  for (const twitterSuffix of ['card','title','description','image','image:alt']) {
    if (!html.includes(`name="twitter:${twitterSuffix}"`)) fail(page.name, `Twitter/X card metadata missing: ${twitterSuffix}`);
    if (html.includes(`property="twitter:${twitterSuffix}"`)) fail(page.name, `Twitter/X metadata must not create RDFa triples: ${twitterSuffix}`);
  }
  if (headTag.includes('twitter: http://dev.twitter.com/docs/cards#')) fail(page.name, 'Twitter RDFa prefix must not be declared; Twitter Cards use name attributes');

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
    }
  }

  const webPage = nodes.find((node) => node['@type'] === 'WebPage' || node['@type'] === 'CollectionPage');
  if (!webPage) fail(page.name, 'page entity missing');
  else if (webPage.url !== page.canonical) fail(page.name, `page entity url mismatch: ${webPage.url ?? 'missing'}`);

  if (html.includes('tegraincorporadora.com.br')) fail(page.name, 'Tegra corporate-site URL is forbidden in public commercial HTML');

  for (const apartmentComplex of nodes.filter((node) => [].concat(node['@type'] ?? []).includes('ApartmentComplex'))) {
    if (Object.hasOwn(apartmentComplex, 'brand')) fail(page.name, 'brand is not valid on ApartmentComplex; keep brand identity in the governed Brand/Product graph');
  }

  if (page.name === 'home') {
    const video = typedNode(nodes, 'https://www.moretegra.com.br/#campaign-video', 'VideoObject');
    if (!video) fail(page.name, 'homepage VideoObject missing');
    else {
      if (video.uploadDate !== VIDEO_UPLOAD_DATE) fail(page.name, 'homepage VideoObject uploadDate must match verified UTC timestamp');
      if (![].concat(video.thumbnailUrl ?? []).some((value) => typeof value === 'string' && value.startsWith('https://'))) fail(page.name, 'homepage VideoObject thumbnailUrl missing');
      if (video.embedUrl !== 'https://www.youtube-nocookie.com/embed/SCCM3vzNlyk') fail(page.name, 'homepage VideoObject embedUrl mismatch');
    }
  }

  if (page.localBusinessScriptId) {
    const localRaw = getSchema(html, page.localBusinessScriptId);
    if (!localRaw) fail(page.name, 'standalone LocalBusiness JSON-LD root missing');
    else {
      try {
        const local = JSON.parse(localRaw);
        if (![local['@type']].flat().includes('RealEstateAgent')) fail(page.name, 'standalone LocalBusiness root must be RealEstateAgent');
        if (local.name !== 'Sabrina da Tegra — Corretora Tegra Vendas') fail(page.name, 'standalone LocalBusiness name mismatch');
        if (local.address?.['@type'] !== 'PostalAddress' || !local.address?.streetAddress || local.address?.postalCode !== SABRINA_POSTAL_CODE) fail(page.name, 'standalone LocalBusiness physical address/postalCode missing');
        if (local.priceRange !== 'Consulte condições' || local.image !== SABRINA_BUSINESS_IMAGE || local.logo !== SABRINA_BUSINESS_LOGO) fail(page.name, 'standalone LocalBusiness recommended fields mismatch');
        if (Number(local.geo?.latitude) !== ESTANDE_LATITUDE || Number(local.geo?.longitude) !== ESTANDE_LONGITUDE) fail(page.name, 'standalone LocalBusiness geo mismatch');
      } catch (error) { fail(page.name, `invalid standalone LocalBusiness JSON-LD: ${error.message}`); }
    }
  }

  const isCapiitolo = page.name === 'capiitolo';
  const expectedAgentId = isCapiitolo ? CAPIITOLO_AGENT_ID : SABRINA_AGENT_ID;
  const sabrinaAgent = typedNode(nodes, expectedAgentId, 'RealEstateAgent');
  if (!sabrinaAgent) fail(page.name, 'Sabrina RealEstateAgent/LocalBusiness entity missing');
  else {
    if (sabrinaAgent.name !== 'Sabrina da Tegra — Corretora Tegra Vendas') fail(page.name, 'Sabrina RealEstateAgent name mismatch');
    if (sabrinaAgent.url !== (isCapiitolo ? page.canonical : 'https://www.moretegra.com.br/')) fail(page.name, 'Sabrina RealEstateAgent url mismatch');
    if (sabrinaAgent.telephone !== SABRINA_PHONE) fail(page.name, 'Sabrina RealEstateAgent telephone mismatch');
    if (sabrinaAgent.sameAs !== SABRINA_PROFILE) fail(page.name, 'Sabrina RealEstateAgent official sameAs mismatch');
    const a = sabrinaAgent.address;
    const expectedStreet = isCapiitolo ? 'Rua Ibaragui Nissui, 166' : 'Rua Fortunato Ferraz, 625';
    const expectedPostalCode = isCapiitolo ? '04116-200' : SABRINA_POSTAL_CODE;
    if (a?.['@type'] !== 'PostalAddress' || a.streetAddress !== expectedStreet || a.addressLocality !== 'São Paulo' || a.addressRegion !== 'SP' || a.postalCode !== expectedPostalCode || a.addressCountry !== 'BR') fail(page.name, 'Sabrina RealEstateAgent address mismatch');
    if (sabrinaAgent.priceRange !== 'Consulte condições' || sabrinaAgent.image !== SABRINA_BUSINESS_IMAGE) fail(page.name, 'Sabrina RealEstateAgent recommended fields mismatch');
    if (!isCapiitolo && sabrinaAgent.logo !== SABRINA_BUSINESS_LOGO) fail(page.name, 'Sabrina RealEstateAgent logo mismatch');
    const expectedLat = isCapiitolo ? CAPIITOLO_LATITUDE : ESTANDE_LATITUDE;
    const expectedLng = isCapiitolo ? CAPIITOLO_LONGITUDE : ESTANDE_LONGITUDE;
    if (Number(sabrinaAgent.geo?.latitude) !== expectedLat || Number(sabrinaAgent.geo?.longitude) !== expectedLng) fail(page.name, 'Sabrina RealEstateAgent geo mismatch');
    if (sabrinaAgent.identifier?.propertyID !== 'CRECI-SP' || sabrinaAgent.identifier?.value !== SABRINA_CRECI) fail(page.name, 'Sabrina RealEstateAgent CRECI identifier mismatch');
  }

  const sabrina = typedNode(nodes, SABRINA_ID, 'Person');
  if (!sabrina) fail(page.name, 'Sabrina Person entity definition missing');
  else {
    if (sabrina.worksFor?.['@id'] !== TEGRA_VENDAS_ID) fail(page.name, 'Sabrina worksFor must reference Tegra Vendas');
    if (sabrina.sameAs !== SABRINA_PROFILE && ![].concat(sabrina.sameAs ?? []).includes(SABRINA_PROFILE)) fail(page.name, 'Sabrina official Tegra Vendas sameAs missing');
    if (sabrina.identifier?.value !== SABRINA_CRECI) fail(page.name, 'Sabrina CRECI mismatch');
    if (sabrina.image !== SABRINA_BUSINESS_IMAGE) fail(page.name, 'Sabrina Person image mismatch');
    const expectedWorkLocation = isCapiitolo ? CAPIITOLO_PROJECT_ID : ESTANDE_ID;
    if (sabrina.workLocation?.['@id'] !== expectedWorkLocation) fail(page.name, 'Sabrina workLocation mismatch');
  }

  const service = nodes.find((node) => [].concat(node['@type'] ?? []).includes('Service') && node.broker?.['@id'] === SABRINA_ID);
  if (!service) fail(page.name, 'Sabrina broker Service relation missing');
  else if (service.provider?.['@id'] !== expectedAgentId) fail(page.name, 'Service provider must reference the page-governed Sabrina RealEstateAgent');

  const workLocation = isCapiitolo ? typedNode(nodes, CAPIITOLO_PROJECT_ID, 'ApartmentComplex') : typedNode(nodes, ESTANDE_ID, 'Place');
  if (!workLocation) fail(page.name, 'Sabrina work location entity missing');
  else {
    const expectedWorkLat = isCapiitolo ? CAPIITOLO_LATITUDE : ESTANDE_LATITUDE;
    const expectedWorkLng = isCapiitolo ? CAPIITOLO_LONGITUDE : ESTANDE_LONGITUDE;
    if (Number(workLocation.geo?.latitude) !== expectedWorkLat || Number(workLocation.geo?.longitude) !== expectedWorkLng) fail(page.name, 'Sabrina work location geo mismatch');
  }

  const phone = nodes.find((node) => node['@id'] === 'https://www.moretegra.com.br/#sabrina-contato' && node.telephone);
  if (phone?.telephone !== SABRINA_PHONE) fail(page.name, 'Sabrina normalized commercial telephone mismatch');

  for (const needle of page.visibleNeedles) if (!html.includes(needle)) fail(page.name, `visible parity text missing: ${needle}`);
}

const governedCommercial = JSON.parse(await readFile('src-greenn/data/commercial-values.json', 'utf8'));
for (const page of pages.filter((item) => item.product || item.commercialProjectId)) {
  const commercialProjectId = page.product?.projectId || page.commercialProjectId;
  const commercial = governedCommercial.projects?.[commercialProjectId];
  if (!commercial || commercial.state !== 'active_reference') fail(page.name, 'governed commercial active_reference missing');
  else if (page.product && Number(commercial.price) !== page.product.price) fail(page.name, `governed commercial price mismatch: ${commercial.price ?? 'missing'}`);
  if (!commercial?.sourceClass) fail(page.name, 'commercial sourceClass missing');
}

const capiitolo = await readFile('src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html', 'utf8');
for (const stale of ['3647490', '3.647.490', 'Unidade 24', '17.369']) {
  if (capiitolo.includes(stale)) fail('capiitolo', `stale hardcoded commercial value remains: ${stale}`);
}

const capiitoloRenderGuards = [
  'const schemaText=document.getElementById("mnt-capiitolo-schema")?.textContent||""',
  "doc.head.querySelectorAll('#mnt-capiitolo-schema,#mnt-capiitolo-product-schema').forEach(node=>node.remove())",
  'schemaNode.id="mnt-capiitolo-schema"',
  'schemaNode.textContent=schemaText'
];
for (const needle of capiitoloRenderGuards) {
  if (!capiitolo.includes(needle)) fail('capiitolo', `rendered core schema preservation guard missing: ${needle}`);
}

const portalLinks = await readFile('src-greenn/portal-links.js', 'utf8');
if (portalLinks.includes('loadFloatingUi') || portalLinks.includes('floating-ui.js')) fail('home', 'floating consent overlay runtime must not be auto-loaded');
if (portalLinks.includes('observer.observe(document.documentElement')) fail('home', 'portal-links observer must not watch the full document');
if (!portalLinks.includes('observer.observe(grid, {subtree:true, childList:true})')) fail('home', 'portal-links observer must remain scoped and idempotent');
if (!portalLinks.includes('if (link.textContent !== "Ver empreendimento →")')) fail('home', 'portal-links text mutation must remain guarded');

const eloPage = await readFile('src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html', 'utf8');
const projectPageCss = await readFile('src-greenn/project-page.css', 'utf8');
if (!eloPage.includes('data-mnt-consent') || !eloPage.includes('/src-greenn/preview/runtime.js')) fail('elo-duo', 'consent markup/runtime missing');
if (!projectPageCss.includes('.mt-consent{position:fixed') || !projectPageCss.includes('.mt-consent[hidden]{display:none!important}')) fail('elo-duo', 'exact-project consent styles missing');

const staticHome = await readFile('src-greenn/preview/index.html', 'utf8');
const staticHomeJs = await readFile('src-greenn/moretegra.js', 'utf8');
if (staticHome.includes('const blocks = [') || staticHome.includes('fetch(url, {cache:"no-store"})')) fail('home', 'client-side primary block loader must not exist');
if (staticHome.includes('id="mt-block-02"') || staticHome.includes('id="mt-block-03"') || staticHome.includes('data-moretegra-fallback')) fail('home', 'dynamic/fallback block placeholders remain in initial HTML');
if (!staticHome.includes('src="/src-greenn/moretegra.js" defer')) fail('home', 'static moretegra.js include missing');
if ((staticHome.match(/id="formulario"/g) || []).length !== 1) fail('home', 'initial HTML must contain exactly one #formulario');
if ((staticHome.match(/data-form-anchor/g) || []).length !== 1) fail('home', 'initial HTML must contain exactly one interest-context mount');
if (staticHome.includes('id="formulario" class="mt-form-anchor"')) fail('home', 'interest-context mount must not reuse #formulario');
if (!staticHome.includes('data-moretegra')) fail('home', 'primary MoreNumTegra content missing from initial HTML');
if (!staticHomeJs.includes('function ensureInterestContext(root)') || !staticHomeJs.includes('data-interest-gallery')) fail('home', 'post-interest gallery journey must remain implemented');
if (!staticHomeJs.includes('function projectSearchLead(project)') || !staticHomeJs.includes('class="mt-project-search-lead"')) fail('home', 'semantic project-card search copy must remain rendered');
if (!staticHomeJs.includes('"Preço a partir de"')) fail('home', 'regular priced cards must expose natural price intent wording');
if (staticHomeJs.includes('applySearchMetadata') || staticHomeJs.includes('SEARCH_METADATA')) fail('home', 'runtime metadata/schema rewriting must not return');

if (failures.length) {
  console.error('\nM4-05R validation FAILED\n');
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`M4-05R validation PASS: ${pages.length} canonical surfaces checked.`);
