import process from 'node:process';

const pages = [
  {
    name: 'home',
    url: 'https://www.moretegra.com.br/',
    canonical: 'https://www.moretegra.com.br/',
    h1: 'Encontre o Tegra que combina com o seu momento.',
    schemaId: 'mt-search-schema',
    requiredText: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328']
  },
  {
    name: 'capiitolo',
    url: 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/',
    canonical: 'https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/',
    h1: 'CAPIITOLO',
    schemaId: 'mnt-capiitolo-schema',
    requiredText: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328'],
    forbiddenText: ['3647490', '3.647.490', 'Unidade 24', '17.369']
  },
  {
    name: 'elo-duo',
    url: 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/',
    canonical: 'https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/',
    h1: 'Elo Duo Caminhos da Lapa',
    schemaId: 'mt-project-schema',
    requiredText: ['Sabrina da Tegra', 'CRECI-SP 209.905-F', '(11) 96077-9328']
  }
];

const failures = [];
const observations = [];

function fail(page, message) {
  failures.push(`${page}: ${message}`);
}

function meta(html, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const keyMatch = tag.match(new RegExp(`${key}=["']([^"']+)["']`, 'i'));
    if (keyMatch?.[1] !== value) continue;
    return tag.match(/content=["']([^"']*)["']/i)?.[1] ?? '';
  }
  return null;
}

function canonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (!/rel=["']canonical["']/i.test(tag)) continue;
    return tag.match(/href=["']([^"']+)["']/i)?.[1] ?? null;
  }
  return null;
}

function title(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null;
}

function h1Text(html) {
  return html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() ?? null;
}

function schemaRaw(html, id) {
  const scripts = [...html.matchAll(/<script\b([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi)];
  const hit = scripts.find((m) => `${m[1]} ${m[2]}`.includes(`id="${id}"`) || `${m[1]} ${m[2]}`.includes(`id='${id}'`));
  return hit?.[3]?.trim() ?? null;
}

async function fetchHtml(url, userAgent) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'user-agent': userAgent,
      'accept': 'text/html,application/xhtml+xml'
    },
    signal: AbortSignal.timeout(20000)
  });
  const body = await response.text();
  return { response, body };
}

// Canonical apex redirect invariant.
try {
  const apex = await fetch('https://moretegra.com.br/', {
    redirect: 'manual',
    headers: { 'user-agent': 'MoreNumTegra-M4-05R-Smoke/1.0' },
    signal: AbortSignal.timeout(20000)
  });
  const location = apex.headers.get('location');
  observations.push(`apex: status=${apex.status} location=${location ?? 'none'}`);
  if (![301, 302, 307, 308].includes(apex.status)) fail('apex', `expected redirect status, got ${apex.status}`);
  if (location && !location.startsWith('https://www.moretegra.com.br')) fail('apex', `unexpected redirect target: ${location}`);
} catch (error) {
  fail('apex', `request failed: ${error.message}`);
}

for (const page of pages) {
  let normal;
  let bot;
  try {
    normal = await fetchHtml(page.url, 'Mozilla/5.0 (M4-05R production smoke; +https://www.moretegra.com.br/)');
  } catch (error) {
    fail(page.name, `normal request failed: ${error.message}`);
    continue;
  }

  const { response, body } = normal;
  observations.push(`${page.name}: status=${response.status} final=${response.url} bytes=${Buffer.byteLength(body)} content-type=${response.headers.get('content-type') ?? 'none'}`);

  if (response.status !== 200) fail(page.name, `expected HTTP 200, got ${response.status}`);
  if (response.url !== page.url) fail(page.name, `unexpected final URL: ${response.url}`);
  if (!(response.headers.get('content-type') ?? '').toLowerCase().includes('text/html')) fail(page.name, 'response is not text/html');
  if ((response.headers.get('x-robots-tag') ?? '').toLowerCase().includes('noindex')) fail(page.name, `production X-Robots-Tag contains noindex: ${response.headers.get('x-robots-tag')}`);

  const liveCanonical = canonical(body);
  const ogUrl = meta(body, 'property', 'og:url');
  const liveH1 = h1Text(body);
  observations.push(`${page.name}: title=${JSON.stringify(title(body))} h1=${JSON.stringify(liveH1)} canonical=${liveCanonical ?? 'missing'} og:url=${ogUrl ?? 'missing'}`);

  if (liveCanonical !== page.canonical) fail(page.name, `canonical mismatch: ${liveCanonical ?? 'missing'}`);
  if (ogUrl !== page.canonical) fail(page.name, `og:url mismatch: ${ogUrl ?? 'missing'}`);
  if (!liveH1 || !liveH1.includes(page.h1)) fail(page.name, `expected H1 containing ${JSON.stringify(page.h1)}, got ${JSON.stringify(liveH1)}`);

  const social = [
    ['property', 'og:type'], ['property', 'og:site_name'], ['property', 'og:locale'],
    ['property', 'og:title'], ['property', 'og:description'], ['property', 'og:image'], ['property', 'og:image:alt'],
    ['name', 'twitter:card'], ['name', 'twitter:title'], ['name', 'twitter:description'], ['name', 'twitter:image'], ['name', 'twitter:image:alt']
  ];
  for (const [key, value] of social) if (!meta(body, key, value)) fail(page.name, `${value} missing in production response`);

  const raw = schemaRaw(body, page.schemaId);
  if (!raw) fail(page.name, `JSON-LD #${page.schemaId} missing in production response`);
  else {
    try {
      const schema = JSON.parse(raw);
      const serialized = JSON.stringify(schema);
      if (!serialized.includes('https://www.tegraincorporadora.com.br/#organization')) fail(page.name, 'authoritative Tegra @id missing from JSON-LD');
      if (!serialized.includes('https://www.moretegra.com.br/#sabrina-da-tegra')) fail(page.name, 'Sabrina @id missing from JSON-LD');
      if (serialized.includes('"@type":"Offer"')) fail(page.name, 'ungoverned Offer found in live JSON-LD');
    } catch (error) {
      fail(page.name, `live JSON-LD invalid: ${error.message}`);
    }
  }

  for (const needle of page.requiredText) if (!body.includes(needle)) fail(page.name, `visible/source parity text missing: ${needle}`);
  for (const needle of page.forbiddenText ?? []) if (body.includes(needle)) fail(page.name, `forbidden stale commercial text found: ${needle}`);

  try {
    bot = await fetchHtml(page.url, 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
    const botBody = bot.body;
    if (bot.response.status !== 200) fail(page.name, `Googlebot request returned ${bot.response.status}`);
    const fields = [
      ['title', title(body), title(botBody)],
      ['canonical', canonical(body), canonical(botBody)],
      ['h1', h1Text(body), h1Text(botBody)],
      ['og:url', meta(body, 'property', 'og:url'), meta(botBody, 'property', 'og:url')]
    ];
    for (const [field, normalValue, botValue] of fields) {
      if (normalValue !== botValue) fail(page.name, `bot/user ${field} mismatch: normal=${JSON.stringify(normalValue)} bot=${JSON.stringify(botValue)}`);
    }
    observations.push(`${page.name}: bot/user critical identity parity=PASS`);
  } catch (error) {
    fail(page.name, `Googlebot request failed: ${error.message}`);
  }
}

console.log('\nM4-05R PRODUCTION SMOKE OBSERVATIONS\n');
for (const line of observations) console.log(`- ${line}`);

if (failures.length) {
  console.error('\nM4-05R PRODUCTION SMOKE FAILED\n');
  for (const line of failures) console.error(`- ${line}`);
  process.exit(1);
}

console.log('\nM4-05R PRODUCTION SMOKE PASS\n');
process.exit(0);
