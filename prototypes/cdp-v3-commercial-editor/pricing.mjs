// Shared deterministic commercial arithmetic. No DOM, persistence or publication.
export function parseCommercialNumber(value) {
  const s = String(value).trim().replace(/\s/g, '');
  if (!s || !/^\d+(?:[.,]\d+)?$/.test(s)) return NaN;
  return Number(s.replace(',', '.'));
}
export function calculateCommercialPrice({ mode, amount, percent, area }) {
  if (mode !== 'direct' && mode !== 'vpl') throw new Error('Modelo inválido.');
  const a = parseCommercialNumber(amount);
  const sqm = parseCommercialNumber(area);
  const pct = mode === 'vpl' ? parseCommercialNumber(percent) : null;
  if (!Number.isFinite(a) || a <= 0 || a > Number.MAX_SAFE_INTEGER) throw new Error('Valor inválido.');
  if (!Number.isFinite(sqm) || sqm <= 0) throw new Error('Área inválida.');
  if (mode === 'vpl' && (!Number.isFinite(pct) || pct < 0 || pct >= 100)) throw new Error('VPL deve estar entre 0% e menos de 100%.');
  const price = Math.round((mode === 'direct' ? a : a * (1 - pct / 100)) * 100) / 100;
  if (!Number.isFinite(price) || price <= 0 || price > Number.MAX_SAFE_INTEGER) throw new Error('Preço final inválido.');
  const pricePerSqm = Math.round((price / sqm) * 100) / 100;
  return { price, pricePerSqm, discountAmount: mode === 'vpl' ? Math.round((a - price) * 100) / 100 : null, tablePrice: mode === 'vpl' ? a : null, commercialDiscountPercent: pct, areaSqm: sqm };
}
