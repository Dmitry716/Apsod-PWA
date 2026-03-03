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

// Настройка VAPID ключей
if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.warn('⚠️ VAPID keys not configured');
} else {
  webPush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:karelinseo@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

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

// Сохранение подписок в файл
function saveSubscriptions(subscriptions: PushSubscription[]): void {
  try {
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2), 'utf-8');
  } catch (error) {
    console.error('❌ Ошибка сохранения подписок:', error);
  }
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

    // Проверка наличия VAPID ключей
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'VAPID ключи не настроены' },
        { status: 500 }
      );
    }

    let payload: string;

    // Разные типы уведомлений
    switch (type) {
      case 'new_lead':
        payload = JSON.stringify({
          title: '✅ Новая заявка',
          body: `${leadData.name} отправил(а) заявку на ${leadData.service}`,
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
          data: { 
            type: 'lead', 
            status: 'new',
            url: '/admin/leads'
          }
        });
        break;

      case 'lead_status':
        payload = JSON.stringify({
          title: `📊 Статус заявки: ${leadData.status}`,
          body: leadData.message || 'Статус вашей заявки изменился',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
          data: { 
            type: 'lead', 
            status: leadData.status,
            url: '/profile'
          }
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Неизвестный тип уведомления' }, 
          { status: 400 }
        );
    }

    console.log('📤 Отправка уведомления...');

    // Отправляем уведомления всем подписчикам
    const results: SendResult[] = [];
    const invalidSubscriptions: PushSubscription[] = [];

    for (const subscription of subscriptions) {
      try {
        const result = await webPush.sendNotification(subscription, payload);
        results.push({ 
          endpoint: subscription.endpoint, 
          success: true,
          statusCode: result.statusCode 
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`❌ Ошибка отправки: ${errorMessage}`);
        
        // Проверяем наличие statusCode в объекте ошибки
        if (error && typeof error === 'object' && 'statusCode' in error) {
          const statusCode = (error as { statusCode?: number }).statusCode;
          if (statusCode === 410 || statusCode === 404) {
            invalidSubscriptions.push(subscription);
          }
        }
        
        results.push({ 
          endpoint: subscription.endpoint, 
          success: false, 
          error: errorMessage
        });
      }
    }

    // Удаляем невалидные подписки
    if (invalidSubscriptions.length > 0) {
      const validSubscriptions = subscriptions.filter(
        s => !invalidSubscriptions.find(inv => inv.endpoint === s.endpoint)
      );
      saveSubscriptions(validSubscriptions);
      console.log(`🗑️ Удалено ${invalidSubscriptions.length} невалидных подписок`);
    }

    const successful = results.filter(r => r.success).length;

    return NextResponse.json({ 
      success: true, 
      sent: successful,
      total: subscriptions.length,
      invalid: invalidSubscriptions.length,
      message: `Уведомления отправлены ${successful} подписчикам`
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Ошибка сервера:', errorMessage);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}