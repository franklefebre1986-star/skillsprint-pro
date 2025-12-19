
const CACHE_NAME = 'skillsprint-pro-v1';
const ROOT = '/skillsprint-pro/';
const ASSETS = [
  ROOT,
  ROOT + 'index.html',
  ROOT + 'styles.css',
  ROOT + 'app.js',
  ROOT + 'manifest.json',
  ROOT + 'assets/icons/icon-192.png',
  ROOT + 'assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(network => {
        const copy = network.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(()=>{});
        return network;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
