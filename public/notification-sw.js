// public/notification-sw.js

// Установка Service Worker
self.addEventListener('install', () => {
  console.log('📦 Service Worker устанавливается...');
  self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker активирован');
  event.waitUntil(clients.claim());
});

// Обработка push-уведомлений
self.addEventListener('push', (event) => {
  console.log('📬 Получено push-уведомление');

  let data = {
    title: 'APSOD',
    body: 'У вас новое уведомление',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    data: { url: '/' }
  };

  if (event.data) {
    try {
      const parsedData = event.data.json();
      data = { ...data, ...parsedData };
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    vibrate: [200, 100, 200],
    data: data.data,
    actions: data.actions || [
      {
        action: 'open',
        title: '🔗 Открыть'
      }
    ],
    requireInteraction: true,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Клик по уведомлению:', event.action);
  
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes(self.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(urlToOpen);
    })
  );
});

// Обработка закрытия уведомления
self.addEventListener('notificationclose', (event) => {
  console.log('❌ Уведомление закрыто:', event.notification.title);
});

// Обработка сообщений от клиента
self.addEventListener('message', (event) => {
  console.log('📨 Сообщение от клиента:', event.data);
  
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});