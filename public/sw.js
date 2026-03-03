// public/sw.js
const CACHE_NAME = 'apsod-v1';

// Ресурсы для кэширования
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker устанавливается...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Кэш открыт');
        return cache.addAll(urlsToCache);
      })
  );
});

// Активация и очистка старого кэша
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker активирован');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Удаляем старый кэш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Обработка push-уведомлений
self.addEventListener('push', (event) => {
  console.log('📬 Push-уведомление получено');
  const data = event.data?.json() ?? {
    title: 'APSOD',
    body: 'Новое уведомление'
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png'
    })
  );
});

// Клик по уведомлению
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Клик по уведомлению');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://apsod.com')
  );
});

// Простая обработка сообщений
self.addEventListener('message', (event) => {
  console.log('📨 Сообщение:', event.data);
  // Ничего не возвращаем
});