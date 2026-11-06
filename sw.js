// Service worker: keeps the app itself on the phone so it opens without internet.
// Study data is never cached here; the app keeps its own copy and sends changes when online.
const BUILD = "__BUILD__";
const CACHE = "enox-shell-" + BUILD;
const RUNTIME = "enox-runtime";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest",
  "./vendor/supabase.min.js", "./vendor/xlsx.full.min.js",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(new Request(u, { cache: "reload" })))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("enox-shell-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname.endsWith("supabase.co")) return; // live data: handled by the app
  if (req.mode === "navigate") { e.respondWith(pageNetworkFirst(req)); return; }
  if (url.origin === self.location.origin) { e.respondWith(staleWhileRevalidate(req)); return; }
  if (/(^|\.)fonts\.(googleapis|gstatic)\.com$|^cdn\.jsdelivr\.net$|^cdnjs\.cloudflare\.com$/.test(url.hostname)) {
    e.respondWith(cacheFirst(req));
  }
});

// The page: try the network for up to 4 s (to pick up updates), otherwise use the saved copy.
async function pageNetworkFirst(req) {
  const c = await caches.open(CACHE);
  const net = fetch(req).then((r) => { if (r && r.ok) c.put("./index.html", r.clone()); return r; });
  try {
    return await Promise.race([net, new Promise((_, rej) => setTimeout(() => rej(new Error("slow")), 4000))]);
  } catch (err) {
    const saved = (await c.match("./index.html")) || (await c.match("./"));
    if (saved) return saved;
    return net.catch(() => new Response("<h1>Offline</h1><p>Open the app once with internet first.</p>", { headers: { "Content-Type": "text/html" } }));
  }
}

async function staleWhileRevalidate(req) {
  const c = await caches.open(CACHE);
  const hit = await c.match(req, { ignoreSearch: true });
  const net = fetch(req).then((r) => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
  return hit || (await net) || Response.error();
}

async function cacheFirst(req) {
  const c = await caches.open(RUNTIME);
  const hit = await c.match(req);
  if (hit) return hit;
  try { const r = await fetch(req); if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone()); return r; }
  catch (err) { return Response.error(); }
}
