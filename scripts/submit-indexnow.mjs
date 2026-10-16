import { readFileSync, writeFileSync } from 'node:fs';
const origin = 'https://www.moretegra.com.br';
const key = readFileSync(new URL('../a49f38b7d2614ce6b9037e528dc16fa0.txt', import.meta.url), 'utf8').trim();
const keyLocation = origin + '/' + key + '.txt';
const request = (url, options = {}) => fetch(url, { ...options, redirect: 'error', signal: AbortSignal.timeout(30000) });
const mode = process.argv[2];
if (!['--sitemap', '--urls'].includes(mode)) throw new Error('Use --sitemap for initial submission or --urls URL...');
const keyResponse = await request(keyLocation);
if (keyResponse.status !== 200 || (await keyResponse.text()).trim() !== key) throw new Error('Production key not published or mismatched; nothing submitted');
let urls;
if (mode === '--sitemap') {
  const response = await request(origin + '/sitemap.xml');
  if (response.status !== 200) throw new Error('Production sitemap unavailable');
  const xml = await response.text();
  if (!xml.includes('<urlset')) throw new Error('Expected a flat sitemap urlset');
  urls = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m => m[1].trim().replaceAll('&amp;', '&'));
} else urls = process.argv.slice(3);
urls = [...new Set(urls)];
if (!urls.length || urls.length > 10000) throw new Error('Expected 1–10000 URLs');
for (const value of urls) {
  const u = new URL(value);
  if (u.origin !== origin || u.username || u.password || u.search || u.hash ||
      !(u.pathname === '/' || /^\/(empreendimentos|regioes|estagios)\/[^/]+\/$/.test(u.pathname)))
    throw new Error('URL outside canonical public page scope: ' + value);
}
if (mode === '--sitemap') {
  for (const url of urls) {
    const r = await request(url);
    if (r.status !== 200) throw new Error('Sitemap page not HTTP 200: ' + url);
    if (/noindex/i.test(r.headers.get('x-robots-tag') || '')) throw new Error('Noindex header: ' + url);
    const html = await r.text();
    const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].filter(m => /name\s*=\s*["'](?:robots|bingbot)["']/i.test(m[0]));
    if (robots.some(m => /noindex/i.test(m[0]))) throw new Error('Noindex page: ' + url);
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]);
    const canonical = links.find(tag => /rel\s*=\s*["']canonical["']/i.test(tag));
    const href = canonical?.match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
    if (href !== url) throw new Error('Canonical mismatch: ' + url);
  }
}
const response = await request('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'www.moretegra.com.br', key, keyLocation, urlList: urls })
});
const receipt = { timestamp: new Date().toISOString(), status: response.status, urls, body: (await response.text()).slice(0, 2000) };
writeFileSync('indexnow-receipt.json', JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify(receipt, null, 2));
if (![200, 202].includes(response.status)) throw new Error('IndexNow rejected submission; do not retry automatically');
console.log(response.status === 202 ? 'Received; ownership validation pending. Indexing not proven.' : 'Received. Crawling/indexing not guaranteed.');
