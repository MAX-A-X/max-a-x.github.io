// sw.js
const CACHE_NAME = 'maxmzh-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/js/main.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('正在预缓存静态资源');
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // 针对 GitHub API 请求采用网络优先策略（确保获取最新评论数据）
  if (requestUrl.origin === 'https://api.github.com') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // 将最新数据更新到缓存中
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 其他静态资源采用缓存优先策略，并在后台更新
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const networkFetch = fetch(event.request).then(networkResponse => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      return cachedResponse || networkFetch;
    })
  );
});
