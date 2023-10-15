const cacheName = 'cache-v3';

const FILENAME = 'sw.js';

const getPathname = () => {
    const { pathname } = self.location;
    return pathname.substring(0, pathname.lastIndexOf(FILENAME));
}

const cachedFiles = [
    './',
    'js/register-components.js',
    'js/components/board.js',
    'js/components/dice.js',
    'js/components/menu.js',
    'js/components/piece.js',
    'icon.png',
    'index.html',
    'sw.js',
    'manifest.json',
];

const addFilesToCache = async () => {
    const cache = await caches.open(cacheName);
    return cache.addAll(cachedFiles);
};

const removeStaleCaches = async () => {
    const keys = await caches.keys();
    const staleKeys = keys.filter((key) => key !== cacheName);

    return Promise.all(staleKeys.map((key) => caches.delete(key)));
}

const fetchFromNetwork = async (cache, event) => {
    const networkResponse = await fetch(event.request);
    cache.put(event.request, networkResponse.clone());

    return networkResponse;
};

const fetchFromCacheFirst = async (event) => {
    const cache = await caches.open(cacheName);
    const response = await cache.match(event.request);

    if (response && !navigator.onLine) {
        return response;
    }

    return fetchFromNetwork(cache, event);
};

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => event.waitUntil(removeStaleCaches()));

self.addEventListener('fetch', (event) => event.respondWith(fetchFromCacheFirst(event)));
