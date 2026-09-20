import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BASE = "https://www.moretegra.com.br";
const RUNTIME_SHA = "6aec388443410a2bff4d7c7a8ddff9d90224d8c9";
const ROUTES = [
  { id: "home", route: "/" },
  { id: "capiitolo", route: "/empreendimentos/capiitolo-piero-lissoni/" },
  { id: "elo-duo", route: "/empreendimentos/caminhos-da-lapa-elo-duo/" },
  { id: "aria", route: "/empreendimentos/aria-higienopolis/" }
];
const RUNS_PER_ROUTE = 3;
const OUT = "m5-02-performance-baseline";
fs.mkdirSync(OUT, { recursive: true });

const metricIds = {
  performance_score: null,
  fcp_ms: "first-contentful-paint",
  lcp_ms: "largest-contentful-paint",
  cls: "cumulative-layout-shift",
  tbt_ms: "total-blocking-time",
  speed_index_ms: "speed-index",
  server_response_ms: "server-response-time",
  total_byte_weight: "total-byte-weight",
  main_thread_work_ms: "mainthread-work-breakdown",
  bootup_time_ms: "bootup-time",
  inp_ms: "interaction-to-next-paint"
};

function round(v, d = 2) {
  return Number.isFinite(v) ? Number(v.toFixed(d)) : null;
}

function auditValue(lhr, id) {
  const a = lhr.audits?.[id];
  return a && Number.isFinite(a.numericValue) ? a.numericValue : null;
}

function extractLcpElement(lhr) {
  const ids = ["largest-contentful-paint-element", "lcp-discovery-insight"];
  for (const id of ids) {
    const a = lhr.audits?.[id];
    const items = a?.details?.items;
    if (!Array.isArray(items) || !items.length) continue;
    const item = items[0];
    const node = item?.node || item?.items?.[0]?.node || null;
    const label = node?.nodeLabel || node?.snippet || item?.nodeLabel || null;
    if (label) return String(label).slice(0, 500);
  }
  return null;
}

function extractTopDiagnostics(lhr) {
  const wanted = [
    "render-blocking-insight",
    "image-delivery-insight",
    "network-dependency-tree-insight",
    "unused-javascript",
    "unused-css-rules",
    "offscreen-images",
    "modern-image-formats",
    "uses-rel-preconnect"
  ];
  return wanted
    .map(id => {
      const a = lhr.audits?.[id];
      if (!a) return null;
      const savingsMs = Number.isFinite(a.details?.overallSavingsMs) ? a.details.overallSavingsMs : null;
      const savingsBytes = Number.isFinite(a.details?.overallSavingsBytes) ? a.details.overallSavingsBytes : null;
      const numericValue = Number.isFinite(a.numericValue) ? a.numericValue : null;
      return {
        id,
        score: a.score,
        displayValue: a.displayValue || null,
        numericValue,
        savingsMs,
        savingsBytes
      };
    })
    .filter(Boolean);
}

function median(values) {
  const nums = values.filter(Number.isFinite).sort((a,b)=>a-b);
  if (!nums.length) return null;
  const m = Math.floor(nums.length/2);
  return nums.length % 2 ? nums[m] : (nums[m-1] + nums[m]) / 2;
}

async function fetchPsiField(url) {
  const endpoint = new URL("https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.append("category", "performance");
  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(90000) });
    const text = await response.text();
    if (!response.ok) {
      return { state: "API_UNAVAILABLE", http_status: response.status, detail: text.slice(0, 500) };
    }
    const data = JSON.parse(text);
    const le = data.loadingExperience || {};
    const ole = data.originLoadingExperience || {};
    const extract = exp => {
      const m = exp?.metrics || {};
      const lcp = m.LARGEST_CONTENTFUL_PAINT_MS;
      const inp = m.INTERACTION_TO_NEXT_PAINT;
      const cls = m.CUMULATIVE_LAYOUT_SHIFT_SCORE;
      if (!lcp && !inp && !cls) return null;
      return {
        overall_category: exp.overall_category || null,
        lcp: lcp ? { percentile_ms: lcp.percentile ?? null, category: lcp.category ?? null } : null,
        inp: inp ? { percentile_ms: inp.percentile ?? null, category: inp.category ?? null } : null,
        cls: cls ? { percentile: cls.percentile != null ? lcp ? cls.percentile / 100 : cls.percentile / 100 : null, raw_percentile: cls.percentile ?? null, category: cls.category ?? null } : null
      };
    };
    const urlField = extract(le);
    const originField = extract(ole);
    if (!urlField && !originField) {
      return { state: "NOT_OBSERVED", reason: "PSI returned no CrUX field metrics for URL or origin." };
    }
    return { state: "OBSERVED", url: urlField, origin: originField };
  } catch (error) {
    return { state: "API_UNAVAILABLE", detail: String(error?.message || error) };
  }
}

const results = [];
for (const target of ROUTES) {
  const url = BASE + target.route;
  const runs = [];
  for (let i = 1; i <= RUNS_PER_ROUTE; i++) {
    const file = path.join(OUT, `${target.id}-run-${i}.json`);
    const args = [
      url,
      "--only-categories=performance",
      "--form-factor=mobile",
      "--screenEmulation.mobile=true",
      "--screenEmulation.width=393",
      "--screenEmulation.height=852",
      "--screenEmulation.deviceScaleFactor=2.75",
      "--throttling-method=simulate",
      "--output=json",
      `--output-path=${file}`,
      "--quiet",
      "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage"
    ];
    const proc = spawnSync("./node_modules/.bin/lighthouse", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 180000
    });
    if (proc.status !== 0 || !fs.existsSync(file)) {
      runs.push({
        run: i,
        state: "FAIL",
        exit_code: proc.status,
        stderr: String(proc.stderr || "").slice(-2000)
      });
      continue;
    }
    const lhr = JSON.parse(fs.readFileSync(file, "utf8"));
    const row = { run: i, state: "PASS" };
    row.performance_score = round((lhr.categories?.performance?.score ?? 0) * 100, 0);
    for (const [name, id] of Object.entries(metricIds)) {
      if (!id || name === "performance_score") continue;
      const value = auditValue(lhr, id);
      row[name] = value == null ? null : round(value, name === "cls" ? 4 : 0);
    }
    row.lcp_element = extractLcpElement(lhr);
    row.diagnostics = extractTopDiagnostics(lhr);
    row.fetch_time = lhr.fetchTime || null;
    runs.push(row);
  }

  const passes = runs.filter(r => r.state === "PASS");
  const med = {};
  for (const name of Object.keys(metricIds)) {
    if (name === "performance_score") {
      med[name] = round(median(passes.map(r => r.performance_score)), 0);
    } else {
      const d = name === "cls" ? 4 : 0;
      med[name] = round(median(passes.map(r => r[name])), d);
    }
  }
  const representative = passes.length
    ? [...passes].sort((a,b)=>(a.lcp_ms ?? Infinity)-(b.lcp_ms ?? Infinity))[Math.floor((passes.length-1)/2)]
    : null;

  const field = await fetchPsiField(url);
  results.push({
    id: target.id,
    route: target.route,
    url,
    lab: {
      methodology: "Lighthouse 13.5.0 mobile, 393x852, simulated throttling, 3 runs; medians recorded.",
      runs,
      medians: med,
      representative_lcp_element: representative?.lcp_element || null,
      representative_diagnostics: representative?.diagnostics || []
    },
    field
  });
}

const thresholds = { lcp_ms: 2500, inp_ms: 200, cls: 0.1 };
for (const r of results) {
  const m = r.lab.medians;
  r.lab.target_assessment = {
    lcp: m.lcp_ms == null ? "NOT_OBSERVED" : (m.lcp_ms <= thresholds.lcp_ms ? "PASS" : "FAIL"),
    cls: m.cls == null ? "NOT_OBSERVED" : (m.cls <= thresholds.cls ? "PASS" : "FAIL"),
    inp: m.inp_ms == null ? "NOT_OBSERVED_LAB" : (m.inp_ms <= thresholds.inp_ms ? "PASS" : "FAIL")
  };
}

const summary = {
  task: "MNT-M5-02",
  environment: "PRODUCTION",
  canonical_host: BASE,
  runtime_sha: RUNTIME_SHA,
  generated_at: new Date().toISOString(),
  thresholds,
  caution: [
    "Lighthouse is lab evidence, not CrUX field evidence.",
    "Do not infer INP from TBT. INP remains NOT_OBSERVED unless Lighthouse exposes a numeric interaction metric or CrUX field data is returned.",
    "No runtime mutation or real lead submission is performed by this harness."
  ],
  results
};

fs.writeFileSync(path.join(OUT, "m5-02-performance-baseline.json"), JSON.stringify(summary, null, 2));

const lines = [];
lines.push(`MNT-M5-02 PRODUCTION PERFORMANCE BASELINE`);
lines.push(`runtime_sha=${RUNTIME_SHA}`);
lines.push(`generated_at=${summary.generated_at}`);
for (const r of results) {
  const m = r.lab.medians;
  lines.push("");
  lines.push(`${r.route} score=${m.performance_score} LCP=${m.lcp_ms}ms CLS=${m.cls} TBT=${m.tbt_ms}ms FCP=${m.fcp_ms}ms SI=${m.speed_index_ms}ms bytes=${m.total_byte_weight}`);
  lines.push(`targets: LCP=${r.lab.target_assessment.lcp} CLS=${r.lab.target_assessment.cls} INP=${r.lab.target_assessment.inp}`);
  lines.push(`field=${JSON.stringify(r.field)}`);
}
fs.writeFileSync(path.join(OUT, "m5-02-performance-baseline.txt"), lines.join("\n") + "\n");
console.log(lines.join("\n"));
