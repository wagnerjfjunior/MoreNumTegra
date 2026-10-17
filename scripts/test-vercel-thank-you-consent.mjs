import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('src-greenn/preview/thank-you-measurement.js', 'utf8');
const now = 2_000_000;
function run({ consent = {}, marker, host = 'www.moretegra.com.br' } = {}) {
  const storage = new Map(marker === undefined ? [] : [['mnt.lead.pending.v2', JSON.stringify(marker)]]);
  const root = { dataset: {}, querySelector: () => null };
  const window = {
    location: { hostname: host, pathname: '/obrigado/' },
    localStorage: { getItem: key => consent[key] ?? null },
    sessionStorage: { getItem: key => storage.get(key) ?? null, removeItem: key => storage.delete(key) },
    crypto: { randomUUID: () => 'test-event' }, dataLayer: []
  };
  class Clock extends Date { static now() { return now; } }
  const context = vm.createContext({ window, document: { readyState: 'complete', querySelector: () => root }, Date: Clock, Symbol, Uint8Array });
  vm.runInContext(source, context);
  vm.runInContext(source, context);
  return { events: window.dataLayer, storage };
}
const choices = result => result.events.filter(e => e.event.startsWith('mnt_consent_')).map(e => e.event);
for (const legacy of [undefined, 'granted', 'denied']) {
  for (const current of ['granted', 'denied']) {
    const result = run({ consent: { 'mnt.consent.v1': legacy, 'mnt.consent.v2': current } });
    assert(choices(result).every(e => e === (current === 'granted' ? 'mnt_consent_accept' : 'mnt_consent_reject')));
    assert.equal(choices(result).length, 2);
  }
}
for (const legacy of ['granted', 'denied']) {
  assert.deepEqual(choices(run({ consent: { 'mnt.consent.v1': legacy } })), []);
}
assert.deepEqual(choices(run({ consent: { 'mnt.consent.v2': 'invalid', 'mnt.consent.v1': 'granted' } })), []);
assert.deepEqual(choices(run({ host: 'localhost', consent: { 'mnt.consent.v2': 'granted' } })), []);
assert.equal(run().events.length, 0);
const marker = { version: 2, submitted_at: now, project_name: 'Ária Higienópolis', offer_name: 'Ária Higienópolis' };
const accepted = run({ marker, consent: { 'mnt.consent.v2': 'denied', 'mnt.consent.v1': 'granted' } });
assert.equal(accepted.events.filter(e => e.event === 'mnt_lead_success').length, 1);
assert.equal(accepted.storage.size, 0);
assert(choices(accepted).every(e => e === 'mnt_consent_reject'));
for (const submitted_at of [now - 600001, now + 1]) {
  assert.equal(run({ marker: { ...marker, submitted_at } }).events.length, 0);
}
console.log('PASS: V2 choice is authoritative; legacy grants cannot override rejection; absent/invalid V2 fails closed; host guard and single-use lead unchanged. No network requests.');
