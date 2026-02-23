// public/notification-sw.js
self.addEventListener('push', () => {
  console.log('📬 Получено push-уведомление');
});

self.addEventListener('notificationclick', () => {
  console.log('🔔 Клик по уведомлению');
});

self.addEventListener('notificationclose', () => {
  console.log('❌ Уведомление закрыто');
});

self.addEventListener('activate', () => {
  console.log('🚀 Service Worker активирован');
});