const CACHE_NAME = 'msrs-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Installs the app inside the phone's cache storage memory offline
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepts clicks and forces the phone to load from storage instead of the internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
