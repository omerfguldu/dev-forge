// Minimal, dependency-free service worker for offline support.
//
// Next.js chunk filenames are content-hashed at build time, so there is no
// fixed list of assets to precache at install. Instead this uses a
// stale-while-revalidate strategy: every successful GET response is cached
// as the user browses, so pages and tools they've already visited keep
// working offline, while the network is still preferred when available.
//
// One gap that strategy alone can't cover: Next's client-side router
// navigates between routes by fetching only the RSC payload for the new
// segment, never the full HTML document — so a route you only ever reached
// via in-app navigation has no cached document to reload from. The route
// list here is small and fixed, so its documents are precached explicitly
// at install to make a later hard reload/offline visit work regardless of
// how the route was first reached.
const CACHE_NAME = "devstack-v1";
const PRECACHE_ROUTES = [
  "/",
  "/json-formatter",
  "/converters",
  "/string-crypto",
  "/diff-checker",
  "/generators",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_ROUTES.map((route) =>
          fetch(route)
            .then((response) => response.ok && cache.put(route, response))
            .catch(() => {
              // Best-effort — a route that fails to precache falls back to
              // runtime caching on its first real visit.
            }),
        ),
      ),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Next's RSC payload requests (…/__next.*.txt) carry a `_rsc` cache-busting
// query param that's a different random token on every request, so an
// exact-URL cache lookup never hits on a second visit. Stripping it before
// using the URL as a cache key fixes both matching and avoids accumulating
// one cache entry per token forever.
function cacheKey(request) {
  const url = new URL(request.url);
  url.searchParams.delete("_rsc");
  return url.toString();
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const key = cacheKey(event.request);

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(key).then((cached) => {
        const network = fetch(event.request)
          .then((response) => {
            if (response.ok) {
              cache.put(key, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || network;
      }),
    ),
  );
});
