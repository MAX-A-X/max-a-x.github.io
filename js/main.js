// js/main.js
if ('serviceWorker' in navigator) {
  // 如果你希望 Service Worker 控制整个网站，请指定 scope 为 '/'
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(registration => {
      console.log('Service Worker 注册成功，作用域：', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker 注册失败：', error);
    });
}
