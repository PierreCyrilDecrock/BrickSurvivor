/* Brick Survivor : service worker.
   Change VERSION à chaque mise en ligne pour forcer la mise à jour du cache. */
const VERSION = 'v0.6.0';
const CACHE = 'brick-survivor-' + VERSION;
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon.svg",
  "fonts/audiowide-latin-ext.woff2",
  "fonts/audiowide-latin.woff2",
  "fonts/vt323-latin-ext.woff2",
  "fonts/vt323-latin.woff2"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('brick-survivor-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Cache d'abord (le jeu démarre tout de suite, même hors ligne), puis mise à jour en arrière-plan.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const key = req.mode === 'navigate' ? new Request('index.html') : req;
    const hit = await cache.match(key, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res && res.ok) cache.put(key, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || (req.mode === 'navigate' ? cache.match('index.html') : Response.error());
  }));
});
