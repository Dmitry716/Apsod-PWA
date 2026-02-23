// src/app/api/notifications/subscribe/route.ts
import { NextResponse } from 'next/server';
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
function saveSubscriptions(subscriptions: PushSubscription[]) {
  try {
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2), 'utf-8');
    console.log('✅ Подписки сохранены в файл');
  } catch (error) {
    console.error('❌ Ошибка сохранения подписок:', error);
  }
}

export async function POST(request: Request) {
  console.log('📨 Получен POST запрос на /api/notifications/subscribe');
  
  try {
    const subscription = await request.json();
    
    console.log('📦 Данные подписки:', {
      endpoint: subscription.endpoint ? subscription.endpoint.substring(0, 50) + '...' : 'отсутствует',
      hasKeys: !!(subscription.keys?.p256dh && subscription.keys?.auth)
    });

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: 'Неверные данные подписки' },
        { status: 400 }
      );
    }

    const subscriptions = loadSubscriptions();
    
    const exists = subscriptions.some((s: PushSubscription) => s.endpoint === subscription.endpoint);
    
    if (!exists) {
      subscriptions.push({
        ...subscription,
        createdAt: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || 'unknown'
      });
      
      saveSubscriptions(subscriptions);
      console.log(`✅ Новая подписка добавлена. Всего подписок: ${subscriptions.length}`);
    } else {
      console.log('ℹ️ Подписка уже существует');
    }

    return NextResponse.json({ 
      success: true,
      message: exists ? 'Подписка уже существует' : 'Подписка успешно сохранена',
      total: subscriptions.length
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
  try {
    const subscriptions = loadSubscriptions();
    
    const safeSubscriptions = subscriptions.map((s: PushSubscription) => ({
      endpoint: s.endpoint,
      createdAt: s.createdAt,
      userAgent: s.userAgent,
    }));
    
    return NextResponse.json({ 
      total: subscriptions.length,
      subscriptions: safeSubscriptions
    });
  } catch (error) {
    console.error('❌ Ошибка:', error);
    return NextResponse.json(
      { error: 'Ошибка получения подписок' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    saveSubscriptions([]);
    return NextResponse.json({ 
      success: true,
      message: 'Все подписки удалены'
    });
  } catch (error) {
    console.error('❌ Ошибка:', error);
    return NextResponse.json(
      { error: 'Ошибка удаления подписок' },
      { status: 500 }
    );
  }
}