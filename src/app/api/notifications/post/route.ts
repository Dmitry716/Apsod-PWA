import { NextResponse } from 'next/server';
import webPush from 'web-push';
import fs from 'fs';
import path from 'path';
import { blogPosts } from '@/app/blog/data/posts';

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
  console.log('📨 Получен POST запрос на /api/notifications/post');
  
  try {
    // Проверка авторизации (опционально)
    const authHeader = request.headers.get('authorization');
    const secret = authHeader?.replace('Bearer ', '');
    
    if (secret !== process.env.NOTIFICATION_SECRET) {
      console.log('❌ Неверный секретный ключ');
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      );
    }

    // Проверка наличия VAPID ключей
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'VAPID ключи не настроены' },
        { status: 500 }
      );
    }

    const { slug } = await request.json();
    console.log('📦 Slug статьи:', slug);
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Не указан slug статьи' },
        { status: 400 }
      );
    }

    // Находим статью по slug
    const post = blogPosts.find(p => p.slug === slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      );
    }

    console.log('✅ Статья найдена:', post.title);

    const subscriptions = loadSubscriptions();
    
    if (subscriptions.length === 0) {
      return NextResponse.json(
        { error: 'Нет подписчиков' },
        { status: 404 }
      );
    }

    console.log(`📊 Подписчиков: ${subscriptions.length}`);

    // Формируем payload уведомления
    const payload = JSON.stringify({
      title: `📝 Новая статья: ${post.title}`,
      body: post.excerpt && post.excerpt.length > 100 
        ? post.excerpt.substring(0, 100) + '...' 
        : (post.excerpt || 'Новая статья в блоге APSOD'),
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      url: `/blog/${post.slug}`,
      data: {
        type: 'new_post',
        category: post.category,
        slug: post.slug,
        timestamp: Date.now()
      },
      actions: [
        {
          action: 'read',
          title: '📖 Читать статью'
        },
        {
          action: 'close',
          title: '❌ Закрыть'
        }
      ]
    });

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
      message: `Уведомления отправлены ${successful} подписчикам`,
      details: {
        total: subscriptions.length,
        sent: successful,
        failed: subscriptions.length - successful,
        invalid: invalidSubscriptions.length
      }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Ошибка:', errorMessage);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}