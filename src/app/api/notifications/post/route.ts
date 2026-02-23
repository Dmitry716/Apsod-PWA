// src/app/api/notifications/post/route.ts
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
  console.log('📨 Получен POST запрос на /api/notifications/post');
  
  try {
    // Проверка авторизации
    const authHeader = request.headers.get('authorization');
    const secret = authHeader?.replace('Bearer ', '');
    
    if (secret !== process.env.NOTIFICATION_SECRET) {
      console.log('❌ Неверный секретный ключ');
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
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
      body: post.excerpt.length > 100 
        ? post.excerpt.substring(0, 100) + '...' 
        : post.excerpt,
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
    const results = await Promise.allSettled(
      subscriptions.map((subscription: PushSubscription) => 
        webPush.sendNotification(subscription, payload).catch((err) => {
          console.error('❌ Ошибка отправки подписчику:', err);
          return null;
        })
      )
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;

    return NextResponse.json({
      success: true,
      message: `Уведомления отправлены ${successful} подписчикам`,
      details: {
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