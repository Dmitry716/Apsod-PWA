// src/app/api/notifications/lead/route.ts
import { NextResponse } from 'next/server';
import webPush from 'web-push';
import fs from 'fs';
import path from 'path';

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), 'subscriptions.json');

// Интерфейс для подписки
interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  createdAt?: string;
  userAgent?: string;
}

// Интерфейс для результата отправки
interface SendResult {
  endpoint: string;
  success: boolean;
  statusCode?: number;
  error?: string;
}

// Интерфейс для payload уведомления
interface NotificationPayload {
  title: string;
  body: string;
  icon: string;
  badge: string;
  url: string;
  data: {
    type: string;
    status: string;
    leadId?: number;
  };
  actions?: Array<{
    action: string;
    title: string;
  }>;
}

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
  console.log('📨 Получен запрос на уведомление о заявке');
  
  try {
    const { type, leadData } = await request.json();
    console.log('📦 Данные:', { type, leadData });

    const subscriptions = loadSubscriptions();
    
    if (subscriptions.length === 0) {
      console.log('📭 Нет подписчиков');
      return NextResponse.json({ 
        success: true, 
        sent: 0,
        message: 'Нет подписчиков'
      });
    }

    let payload: NotificationPayload;

    // Разные типы уведомлений
    switch (type) {
      case 'new_lead':
        payload = {
          title: '✅ Заявка получена',
          body: `${leadData.name}, спасибо за обращение! Мы свяжемся с вами в ближайшее время.`,
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
          url: '/contact',
          data: { 
            type: 'lead', 
            status: 'new',
            leadId: Date.now()
          },
          actions: [
            { 
              action: 'open', 
              title: '📋 Посмотреть заявку' 
            }
          ]
        };
        break;

      case 'lead_status':
        payload = {
          title: `📊 Статус заявки: ${leadData.status}`,
          body: leadData.message || 'Статус вашей заявки изменился',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
          url: '/contact',
          data: { 
            type: 'lead', 
            status: leadData.status 
          }
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Неизвестный тип уведомления' }, 
          { status: 400 }
        );
    }

    console.log('📤 Отправка уведомления:', payload.title);

    // Отправляем уведомления всем подписчикам
    const results = await Promise.allSettled(
      subscriptions.map(async (subscription: PushSubscription): Promise<SendResult> => {
        try {
          const result = await webPush.sendNotification(
            subscription,
            JSON.stringify(payload),
            { TTL: 3600 }
          );
          return { 
            endpoint: subscription.endpoint, 
            success: true,
            statusCode: result.statusCode 
          };
        } catch (err) {
          const error = err as Error & { statusCode?: number };
          console.error(`❌ Ошибка отправки подписчику: ${error.message}`);
          return { 
            endpoint: subscription.endpoint, 
            success: false,
            error: error.message 
          };
        }
      })
    );

    // Подсчет успешных отправок простым способом
    let successful = 0;
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value && result.value.success === true) {
        successful++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      sent: successful,
      total: subscriptions.length,
      message: `Уведомления отправлены ${successful} подписчикам`
    });

  } catch (error) {
    console.error('❌ Ошибка сервера:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}