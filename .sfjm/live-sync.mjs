#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const arg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const TARGET_BRANCH = arg("--branch");
const PORT = Number(arg("--port", "8080"));
let INITIAL_ROUTE = arg("--route", "/");
const POLL_MS = Math.max(2000, Number(arg("--poll-ms", "4000")) || 4000);

if (!TARGET_BRANCH) {
  console.error("ERRO: --branch obrigatoria. O Live Sync nunca reutiliza branch antiga silenciosamente.");
  process.exit(2);
}
if (!/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(TARGET_BRANCH) || /\.\.|\/\/|\/\.|\.\/|\.lock($|\/)|\/$|^refs\/|\.$/.test(TARGET_BRANCH)) {
  console.error("ERRO: nome de branch invalido.");
  process.exit(2);
}
if (!INITIAL_ROUTE.startsWith("/")) INITIAL_ROUTE = "/" + INITIAL_ROUTE;
if (!Number.isFinite(PORT) || PORT < 1 || PORT > 65535) {
  console.error("ERRO: porta invalida.");
  process.exit(2);
}

const __filename = fileURLToPath(import.meta.url);
const SCRIPT_DIR = path.dirname(__filename);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const EXPECTED_REPO = "wagnerjfjunior/MoreNumTegra";
const clients = new Set();

let servedHead = "";
let remoteHead = "";
let syncing = false;
let lastSyncAt = null;
let lastError = "";
let lastDirty = false;
let rewrites = [];

function git(args, options = {}) {
  const result = spawnSync("git", args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : "pipe",
    ...options
  });
  if (result.status !== 0) {
    const detail = String(result.stderr || result.stdout || "").trim();
    throw new Error(`git ${args.join(" ")} falhou${detail ? ": " + detail : ""}`);
  }
  return String(result.stdout || "").trim();
}

function repoSlugFromRemote(url) {
  const v = String(url || "").trim().replace(/\.git$/, "");
  const ssh = v.match(/github\.com[:/]([^/]+\/[^/]+)$/i);
  return ssh ? ssh[1] : "";
}

function ensureCanonicalRepo() {
  const top = git(["rev-parse", "--show-toplevel"]);
  if (path.resolve(top) !== REPO_ROOT) {
    throw new Error(`helper fora da raiz esperada. repo=${top} helper=${REPO_ROOT}`);
  }
  const remote = git(["remote", "get-url", "origin"]);
  const slug = repoSlugFromRemote(remote);
  if (slug.toLowerCase() !== EXPECTED_REPO.toLowerCase()) {
    throw new Error(`origin inesperado: ${remote}`);
  }
}

function currentBranch() {
  return git(["branch", "--show-current"]);
}

function currentHead() {
  return git(["rev-parse", "HEAD"]);
}

function isDirty() {
  return git(["status", "--porcelain"]).length > 0;
}

function localBranchExists(branch) {
  const r = spawnSync("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`], { cwd: REPO_ROOT });
  return r.status === 0;
}

function remoteTrackingExists(branch) {
  const r = spawnSync("git", ["show-ref", "--verify", "--quiet", `refs/remotes/origin/${branch}`], { cwd: REPO_ROOT });
  return r.status === 0;
}

function fetchLockedBranch() {
  git(["fetch", "--prune", "origin", `+refs/heads/${TARGET_BRANCH}:refs/remotes/origin/${TARGET_BRANCH}`]);
  if (!remoteTrackingExists(TARGET_BRANCH)) throw new Error("branch remota nao encontrada apos fetch");
  remoteHead = git(["rev-parse", `origin/${TARGET_BRANCH}`]);
  return remoteHead;
}

function safeSelectBranch() {
  const active = currentBranch();
  if (active === TARGET_BRANCH) return;
  if (isDirty()) {
    throw new Error(`WORKTREE_DIRTY: branch ativa=${active}; nao vou trocar para ${TARGET_BRANCH}`);
  }
  fetchLockedBranch();
  if (localBranchExists(TARGET_BRANCH)) {
    git(["switch", TARGET_BRANCH]);
  } else {
    git(["switch", "-c", TARGET_BRANCH, "--track", `origin/${TARGET_BRANCH}`]);
  }
  console.log(`[BRANCH] locked=${TARGET_BRANCH}`);
}

function loadRewrites() {
  try {
    const raw = fs.readFileSync(path.join(REPO_ROOT, "vercel.json"), "utf8");
    const cfg = JSON.parse(raw);
    rewrites = Array.isArray(cfg.rewrites)
      ? cfg.rewrites.filter(x => x && typeof x.source === "string" && typeof x.destination === "string")
      : [];
  } catch (e) {
    rewrites = [];
    console.warn(`[REWRITE] vercel.json indisponivel: ${e.message}`);
  }
}

function notifyReload(oldHead, newHead) {
  const payload = `data: ${JSON.stringify({ type: "reload", branch: TARGET_BRANCH, oldHead, head: newHead })}\n\n`;
  for (const res of clients) {
    try { res.write(payload); } catch {}
  }
}

async function syncOnce({ force = false } = {}) {
  if (syncing) return;
  syncing = true;
  try {
    if (currentBranch() !== TARGET_BRANCH) {
      throw new Error(`BRANCH_LOCK_VIOLATION: ativa=${currentBranch()} esperada=${TARGET_BRANCH}`);
    }
    const sha = fetchLockedBranch();
    const local = currentHead();
    lastDirty = isDirty();

    if (!force && sha === servedHead && local === sha) {
      lastError = "";
      return;
    }

    if (sha === local) {
      const old = servedHead;
      servedHead = sha;
      loadRewrites();
      lastSyncAt = new Date().toISOString();
      lastError = "";
      if (old && old !== sha) notifyReload(old, sha);
      return;
    }

    if (lastDirty) {
      lastError = "WORKTREE_DIRTY";
      console.warn(`[SYNC] BLOCKED worktree=DIRTY local=${local} remote=${sha}`);
      return;
    }

    console.log(`[SYNC] DETECTADO branch=${TARGET_BRANCH} local=${local} remote=${sha}`);
    const merge = spawnSync("git", ["merge", "--ff-only", `origin/${TARGET_BRANCH}`], {
      cwd: REPO_ROOT,
      encoding: "utf8"
    });
    if (merge.status !== 0) {
      throw new Error(`FF_ONLY_REQUIRED: ${String(merge.stderr || merge.stdout || "").trim()}`);
    }

    const newHead = currentHead();
    if (newHead !== sha) throw new Error(`HEAD_MISMATCH apos FF: local=${newHead} remote=${sha}`);

    const old = servedHead;
    servedHead = newHead;
    loadRewrites();
    lastSyncAt = new Date().toISOString();
    lastError = "";
    console.log(`[SYNC] OK branch=${TARGET_BRANCH} head=${servedHead}`);
    if (old && old !== servedHead) notifyReload(old, servedHead);
  } catch (e) {
    lastError = e.message;
    console.error(`[SYNC] ERRO branch=${TARGET_BRANCH}: ${e.message}`);
  } finally {
    syncing = false;
  }
}

function contentType(file) {
  return ({
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon"
  })[path.extname(file).toLowerCase()] || "application/octet-stream";
}

function safePath(candidate) {
  const resolved = path.resolve(REPO_ROOT, "." + candidate);
  return resolved.startsWith(REPO_ROOT + path.sep) || resolved === REPO_ROOT ? resolved : null;
}

function rewritePath(urlPath) {
  for (const r of rewrites) {
    if (r.source === urlPath) return r.destination;
  }
  return urlPath;
}

function fileFor(rawUrl) {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(rawUrl || "/", "http://localhost").pathname);
  } catch {
    return null;
  }

  let candidate = rewritePath(urlPath);
  const choices = [];

  const add = (p) => {
    if (!p.startsWith("/")) p = "/" + p;
    const full = safePath(p);
    if (full) choices.push(full);
  };

  add(candidate);
  if (candidate.endsWith("/")) add(candidate + "index.html");
  else add(candidate + "/index.html");

  if (candidate === "/") {
    add("/src-greenn/preview/index.html");
    add("/src-greenn/index.html");
    add("/index.html");
  }

  for (let f of choices) {
    try {
      const stat = fs.statSync(f);
      if (stat.isDirectory()) f = path.join(f, "index.html");
      if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
    } catch {}
  }
  return null;
}

function injectLiveReload(html) {
  const marker = `<script data-sfjm-live-reload>(()=>{const served=${JSON.stringify(servedHead)};const es=new EventSource("/__sfjm_live");es.onmessage=(ev)=>{try{const d=JSON.parse(ev.data);if(d.type==="reload"&&d.head&&d.head!==served){location.reload();}}catch{}};})();</script>`;
  return html.includes("</body>") ? html.replace("</body>", marker + "</body>") : html + marker;
}

function statusPayload() {
  let active = "";
  let local = "";
  try { active = currentBranch(); } catch {}
  try { local = currentHead(); } catch {}
  return {
    repository: EXPECTED_REPO,
    branch: TARGET_BRANCH,
    activeBranch: active,
    head: servedHead || local,
    remoteHead,
    worktree: lastDirty ? "DIRTY" : "CLEAN",
    syncPolicy: "REMOTE_WATCH_FF_ONLY",
    autoBrowserRefresh: true,
    pollMs: POLL_MS,
    route: INITIAL_ROUTE,
    lastSyncAt,
    lastError
  };
}

function startServer() {
  const server = http.createServer(async (req, res) => {
    if (req.url === "/__sfjm_live") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-store",
        "Connection": "keep-alive"
      });
      res.write(`data: ${JSON.stringify({ type: "connected", branch: TARGET_BRANCH, head: servedHead })}\n\n`);
      clients.add(res);
      req.on("close", () => clients.delete(res));
      return;
    }

    if (req.url === "/__sfjm_status") {
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end(JSON.stringify(statusPayload(), null, 2));
      return;
    }

    if (req.url === "/__sfjm_refresh") {
      await syncOnce({ force: true });
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end(JSON.stringify(statusPayload(), null, 2));
      return;
    }

    const file = fileFor(req.url);
    if (!file) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end(`404 - SFJM LVR local file not found\nbranch=${TARGET_BRANCH}\nhead=${servedHead}\npath=${req.url}\n`);
      return;
    }

    try {
      let data = await fsp.readFile(file);
      const type = contentType(file);
      if (type.startsWith("text/html")) data = Buffer.from(injectLiveReload(data.toString("utf8")));
      res.writeHead(200, {
        "Content-Type": type,
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
        "X-SFJM-Branch": TARGET_BRANCH,
        "X-SFJM-Head": servedHead
      });
      res.end(data);
    } catch (e) {
      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end(`500 - ${e.message}`);
    }
  });

  server.listen(PORT, "127.0.0.1", () => {
    const url = `http://localhost:${PORT}${INITIAL_ROUTE}`;
    console.log(`[SERVER] http://localhost:${PORT}/`);
    console.log(`[STATUS] http://localhost:${PORT}/__sfjm_status`);
    console.log(`[REFRESH] http://localhost:${PORT}/__sfjm_refresh`);
    console.log(`[LOCK] branch=${TARGET_BRANCH}`);
    console.log(`[LOCK] head=${servedHead}`);
    console.log(`[AUTO] remote-watch=${POLL_MS}ms ff-only browser-reload=ON`);
    openBrowser(url);
  });

  const keepAlive = setInterval(() => {
    for (const res of clients) {
      try { res.write(": keepalive\n\n"); } catch {}
    }
  }, 20000);
  keepAlive.unref?.();
}

function openBrowser(url) {
  let command;
  let args;
  if (process.platform === "darwin") {
    command = "open"; args = [url];
  } else if (process.platform === "win32") {
    command = "cmd.exe"; args = ["/c", "start", "", url];
  } else {
    command = "xdg-open"; args = [url];
  }
  try {
    const child = spawn(command, args, { detached: true, stdio: "ignore" });
    child.unref();
    console.log(`[OPEN] ${url}`);
  } catch {
    console.log(`[OPEN] abra manualmente: ${url}`);
  }
}

async function main() {
  console.log(`[SESSION] repository=${EXPECTED_REPO}`);
  console.log(`[SESSION] branch=${TARGET_BRANCH}`);
  console.log("[POLICY] remote watch + safe fast-forward only; reset/clean forbidden");

  ensureCanonicalRepo();
  if (isDirty()) {
    throw new Error("WORKTREE_DIRTY na inicializacao. O helper nao altera worktree com mudancas locais.");
  }

  fetchLockedBranch();
  safeSelectBranch();
  await syncOnce({ force: true });

  if (!servedHead) {
    servedHead = currentHead();
    loadRewrites();
  }

  console.log(`[SYNC] OK branch=${TARGET_BRANCH} head=${servedHead}`);
  startServer();

  setInterval(() => syncOnce(), POLL_MS);
}

main().catch((e) => {
  console.error(`[FATAL] ${e.message}`);
  process.exit(3);
});
