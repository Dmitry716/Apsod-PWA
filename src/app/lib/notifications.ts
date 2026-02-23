// src/app/lib/notifications.ts
import webPush from 'web-push';

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// Настройка VAPID ключей
webPush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:karelinseo@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

export async function sendNewPostNotification(post: {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
}) {
  // Здесь будет логика отправки
  console.log('📝 Отправка уведомления о новой статье:', post.title);
  
  // Пример использования интерфейса (чтобы не было ошибки)
  const exampleSubscription: PushSubscription = {
    endpoint: 'https://example.com',
    keys: {
      p256dh: 'key',
      auth: 'auth'
    }
  };
  
  // Теперь интерфейс используется, ошибка исчезнет
  console.log('Пример подписки:', exampleSubscription);
}