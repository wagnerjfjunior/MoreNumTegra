// CDP V3 commercial editor — deterministic arithmetic and guardrail checks.
// Run: node --test prototypes/cdp-v3-commercial-editor/pricing.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
const parse = v => { const s=v.trim().replace(/\s/g,''); if(!s||!/^\d+(?:[.,]\d+)?$/.test(s))return NaN;return Number(s.replace(',','.')); };
const calc=(mode,amount,percent,area)=>{const a=parse(amount),p=mode==='vpl'?parse(percent):null,m=parse(area);if(!Number.isFinite(a)||a<=0||!Number.isFinite(m)||m<=0||mode==='vpl'&&(!Number.isFinite(p)||p<0||p>100))throw Error('Invalid commercial input');const price=mode==='direct'?a:a*(1-p/100);if(!Number.isFinite(price)||price<=0||price>Number.MAX_SAFE_INTEGER)throw Error('Invalid final price');return {price,perSqm:price/m};};
test('approved Bueno reference direct',()=>assert.deepEqual(calc('direct','21750000','', '500'),{price:21750000,perSqm:43500}));
test('illustrative VPL 13% produces same price',()=>assert.deepEqual(calc('vpl','25000000','13','500'),{price:21750000,perSqm:43500}));
test('no extra discount on direct model',()=>assert.equal(calc('direct','21750000','13','500').price,21750000));
test('accept decimal comma',()=>assert.equal(calc('vpl','1000,50','10','100').price,900.45));
test('reject ambiguous thousands separator',()=>assert.ok(Number.isNaN(parse('25.000.000'))));
test('reject negative and invalid discounts',()=>{for(const v of ['-1','101','abc'])assert.throws(()=>calc('vpl','25000000',v,'500'))});
test('reject zero final and area',()=>{assert.throws(()=>calc('vpl','25000000','100','500'));assert.throws(()=>calc('direct','100','', '0'))});
test('reject huge monetary values',()=>assert.throws(()=>calc('direct','99999999999999999','','500')));
