// src/app/api/notifications/send/route.ts
import { NextResponse } from 'next/server';
import webPush from 'web-push';
import fs from 'fs';
import path from 'path';

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  createdAt?: string;
  userAgent?: string;
}

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), 'subscriptions.json');

// Настройка VAPID ключей
webPush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:karelinseo@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

// Загрузка подписок из файла
function loadSubscriptions(): PushSubscription[] {
  try {
    if (fs.existsSync(SUBSCRIPTIONS_FILE)) {
      const data = fs.readFileSync(SUBSCRIPTIONS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('❌ Ошибка загрузки подписок:', error);
  }
  return [];
}

export async function POST(request: Request) {
  console.log('📨 Получен POST запрос на /api/notifications/send');
  
  try {
    const { title, body, url, icon, badge, data, actions } = await request.json();

    if (!title || !body) {
      return NextResponse.json(
        { error: 'Необходимо указать title и body' },
        { status: 400 }
      );
    }

    const subscriptions = loadSubscriptions();
    
    if (subscriptions.length === 0) {
      return NextResponse.json(
        { error: 'Нет подписчиков' },
        { status: 404 }
      );
    }

    console.log(`📊 Подписчиков: ${subscriptions.length}`);

    const payload = JSON.stringify({
      title,
      body,
      icon: icon || '/icons/icon-192x192.png',
      badge: badge || '/icons/icon-72x72.png',
      url: url || '/',
      data: data || {},
      actions: actions || [
        {
          action: 'open',
          title: '🔗 Открыть'
        },
        {
          action: 'close',
          title: '❌ Закрыть'
        }
      ]
    });

    const results = await Promise.allSettled(
      subscriptions.map(async (subscription: PushSubscription) => {
        try {
          const result = await webPush.sendNotification(
            subscription,
            payload,
            { TTL: 3600 }
          );
          
          return {
            endpoint: subscription.endpoint,
            success: true,
            statusCode: result.statusCode
          };
        } catch (err) {
          const error = err as Error & { statusCode?: number };
          if (error.statusCode === 410 || error.statusCode === 404) {
            console.log(`🗑️ Невалидная подписка: ${subscription.endpoint}`);
          }
          
          return {
            endpoint: subscription.endpoint,
            success: false,
            error: error.message,
            statusCode: error.statusCode
          };
        }
      })
    );

    // Подсчет успешных отправок
    let successful = 0;
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value && typeof result.value === 'object' && 'success' in result.value && result.value.success === true) {
        successful++;
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        total: subscriptions.length,
        sent: successful,
        failed: subscriptions.length - successful
      }
    });

  } catch (error) {
    console.error('❌ Ошибка:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const hasKeys = !!(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
  const subscriptions = loadSubscriptions();
  
  return NextResponse.json({
    status: hasKeys ? '✅ VAPID ключи настроены' : '❌ VAPID ключи не настроены',
    subject: process.env.VAPID_SUBJECT || 'не указан',
    hasPublicKey: !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    hasPrivateKey: !!process.env.VAPID_PRIVATE_KEY,
    subscriptionsCount: subscriptions.length
  });
}