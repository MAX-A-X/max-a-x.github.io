const CACHE_NAME = "pwa-cache-v1";
const STATIC_FILES = [
    "/",
    "/index.html",
    "/styles.css",
    "/js/main.js",
    "/manifest.json",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

// 预缓存静态资源
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("正在预缓存静态资源");
            return cache.addAll(STATIC_FILES);
        })
    );
    self.skipWaiting(); // 立即激活新 Service Worker
});

// 激活时清理旧缓存
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim(); // 立即接管所有页面
});

// 拦截请求并使用缓存
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
