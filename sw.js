const CACHE = 'fetalmetrics-v2';
const ASSETS = [
  '/fetalmetrics/',
  '/fetalmetrics/index.html',
  '/fetalmetrics/manifest.json',
  '/fetalmetrics/icon-192.png',
  '/fetalmetrics/icon-512.png'
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  ev.respondWith(
    caches.match(ev.request).then(cached => cached || fetch(ev.request))
  );
});
