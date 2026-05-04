// AbogadoDiablo PWA · Service Worker
// Estrategia: App Shell Cache — cachea el HTML/CSS/JS, las llamadas API van siempre online

const CACHE_NAME = 'abogadodiablo-v1';

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
];

// ── INSTALL: cachea el shell ─────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(SHELL_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: limpia cachés antiguas ────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── FETCH: shell desde caché, API siempre network ───────────
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Las llamadas a Anthropic API siempre van por red — nunca cachear
  if (url.includes('anthropic.com') || url.includes('api.')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Google Fonts — network first, caché como fallback
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // App shell — cache first, network fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
