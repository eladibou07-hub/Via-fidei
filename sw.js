const CACHE = 'via-fidei-5c7f31be552c48e3';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon.svg',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './icons/maskable-512.png', './bilingual.js', './sources.js', './faith-data.js', './v7.js', './pwa.js'];
const urls = ASSETS.map(path => new URL(path, self.registration.scope).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache =>
    cache.addAll(urls.map(url => new Request(url, {cache: 'reload'})))));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('via-fidei-') && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'CACHE_STATUS' && event.ports[0]) {
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE);
      const entries = await Promise.all(urls.map(url => cache.match(url)));
      event.ports[0].postMessage({cache: CACHE, ready: entries.every(r => r && r.ok)});
    })());
  }
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin ||
      !url.href.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    // Queries on an app navigation still open the same coherent offline shell.
    if (event.request.mode === 'navigate' &&
        (url.pathname === new URL('./', self.registration.scope).pathname ||
         url.pathname === new URL('./index.html', self.registration.scope).pathname)) {
      return (await cache.match(new URL('./index.html', self.registration.scope))) || fetch(event.request);
    }
    try { return await fetch(event.request); }
    catch (error) {
      if (event.request.mode === 'navigate') {
        const fallback = await cache.match(new URL('./index.html', self.registration.scope));
        if (fallback) return fallback;
      }
      return Response.error();
    }
  })());
});
