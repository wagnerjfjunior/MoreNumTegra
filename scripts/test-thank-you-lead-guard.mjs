import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import vm from "node:vm";

const repoRoot = process.cwd();
const sourcePath = path.join(repoRoot, "src-greenn", "thank-you", "obrigado.js");
const source = fs.readFileSync(sourcePath, "utf8");

function runScenario({
  search = "",
  pathname = "/obrigado",
  hostname = "moretegra.com.br",
  pending = false,
  pendingAgeMs = 0,
  now = 2_000_000
} = {}) {
  const storage = new Map();
  if (pending) storage.set("mnt.lead.pending.v1", String(now - pendingAgeMs));

  const eyebrow = {textContent: ""};
  const message = {textContent: ""};
  const root = {
    dataset: {},
    querySelector(selector) {
      if (selector === "[data-thanks-eyebrow]") return eyebrow;
      if (selector === "[data-thanks-message]") return message;
      return null;
    }
  };

  const metas = [];
  const document = {
    title: "",
    readyState: "complete",
    head: {appendChild(node) { metas.push(node); }},
    querySelector(selector) {
      if (selector === "[data-moretegra-thank-you]") return root;
      return null;
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return {
        attributes: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        }
      };
    },
    addEventListener() {
      throw new Error("unexpected DOMContentLoaded listener in complete document");
    }
  };

  const window = {
    location: {hostname, pathname, search},
    sessionStorage: {
      getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
      },
      setItem(key, value) {
        storage.set(key, String(value));
      },
      removeItem(key) {
        storage.delete(key);
      }
    },
    dataLayer: [],
    crypto: {
      randomUUID() {
        return "00000000-0000-4000-8000-000000000001";
      }
    }
  };

  const RealDate = Date;
  class FakeDate extends RealDate {
    static now() {
      return now;
    }
  }

  vm.runInNewContext(source, {
    window,
    document,
    URLSearchParams,
    Date: FakeDate,
    Math,
    Uint8Array,
    Number,
    String
  });

  return {
    events: window.dataLayer,
    pending: storage.get("mnt.lead.pending.v1"),
    root,
    eyebrow,
    message
  };
}

assert.equal(runScenario().events.length, 0, "direct /obrigado without pending must not emit lead");

const directAfterAttempt = runScenario({pending: true});
assert.equal(directAfterAttempt.events.length, 0, "fresh attempt without Green redirect signature must not emit lead");
assert.equal(directAfterAttempt.pending, undefined, "invalid thank-you visit must consume pending marker fail-closed");

const valid = runScenario({pending: true, search: "?l_=2974&p_id=292"});
assert.equal(valid.events.length, 1, "observed Green success redirect signature + fresh pending must emit one lead");
assert.equal(valid.events[0].event, "mnt_lead_success");
assert.equal(valid.pending, undefined, "valid lead must consume pending marker before emission");
assert.equal(valid.root.dataset.leadState, "verified");

assert.equal(
  runScenario({pending: true, search: "?l_=0&p_id=292"}).events.length,
  0,
  "zero Green lead reference must fail closed"
);
assert.equal(
  runScenario({pending: true, search: "?l_=abc&p_id=292"}).events.length,
  0,
  "non-numeric Green lead reference must fail closed"
);
assert.equal(
  runScenario({pending: true, search: "?l_=2974&p_id=999"}).events.length,
  0,
  "wrong Green source page must fail closed"
);
assert.equal(
  runScenario({pending: true, search: "?l_=2974&p_id=292", pendingAgeMs: 10 * 60 * 1000 + 1}).events.length,
  0,
  "stale pending marker must not emit lead"
);
assert.equal(
  runScenario({pending: true, search: "?l_=2974&p_id=292", pathname: "/outra"}).events.length,
  0,
  "wrong route must not emit lead"
);
assert.equal(
  runScenario({pending: true, search: "?l_=2974&p_id=292", hostname: "www.moretegra.com.br"}).events.length,
  0,
  "noncanonical host must not emit lead"
);

const firstLoad = runScenario({pending: true, search: "?l_=2974&p_id=292"});
assert.equal(firstLoad.events.length, 1);
const refreshWithoutPending = runScenario({pending: false, search: "?l_=2974&p_id=292"});
assert.equal(refreshWithoutPending.events.length, 0, "refresh without a new pending marker must not duplicate lead");

console.log("PASS test-thank-you-lead-guard: negative/direct/stale/refresh paths fail closed; valid Green redirect path emits exactly one lead.");
