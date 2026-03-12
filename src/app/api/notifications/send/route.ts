import { NextResponse } from 'next/server';
import webPush from 'web-push';
import { getSubscriptions, deleteSubscription } from '@/app/lib/redis';

interface SendResult {
  endpoint: string;
  success: boolean;
  statusCode?: number;
  error?: string;
}

if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.warn('⚠️ VAPID keys not configured');
} else {
  webPush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:karelinseo@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function POST(request: Request) {
  console.log('📨 POST /api/notifications/send');

  try {
    const body = await request.json();
    const { title, body: bodyText, url, icon, badge, data, actions, indices } = body;

    if (!title || !bodyText) {
      return NextResponse.json(
        { error: 'Необходимо указать title и body' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'VAPID ключи не настроены' },
        { status: 500 }
      );
    }

    let subscriptions = await getSubscriptions();

    if (Array.isArray(indices) && indices.length > 0) {
      subscriptions = indices
        .filter((i: number) => Number.isInteger(i) && i >= 0 && i < subscriptions.length)
        .map((i: number) => subscriptions[i]);
    }

    if (subscriptions.length === 0) {
      return NextResponse.json(
        { error: 'Нет подписчиков для отправки' },
        { status: 404 }
      );
    }

    console.log(`📊 Отправка ${subscriptions.length} подписчикам`);

    const payload = JSON.stringify({
      title,
      body: bodyText,
      icon: icon || '/icons/icon-192x192.png',
      badge: badge || '/icons/icon-72x72.png',
      data: data || { url: url || '/' },
      actions: actions || [{ action: 'open', title: '🔗 Открыть' }],
    });

    let sent = 0;
    const invalidSubscriptions: typeof subscriptions = [];

    for (const subscription of subscriptions) {
      try {
        await webPush.sendNotification(subscription, payload);
        sent++;
      } catch (error: unknown) {
        const statusCode = error && typeof error === 'object' && 'statusCode' in error
          ? (error as { statusCode?: number }).statusCode
          : undefined;
        if (statusCode === 410 || statusCode === 404) {
          invalidSubscriptions.push(subscription);
        }
      }
    }

    for (const sub of invalidSubscriptions) {
      await deleteSubscription(sub.endpoint);
    }
    if (invalidSubscriptions.length > 0) {
      console.log('🗑️ Удалено невалидных подписок:', invalidSubscriptions.length);
    }

    return NextResponse.json({
      success: true,
      summary: {
        total: subscriptions.length,
        sent,
        failed: subscriptions.length - sent,
        invalidRemoved: invalidSubscriptions.length,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Ошибка отправки:', errorMessage);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const hasKeys = !!(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
  const subscriptions = await getSubscriptions();

  return NextResponse.json({
    status: hasKeys ? '✅ VAPID ключи настроены' : '❌ VAPID ключи не настроены',
    subject: process.env.VAPID_SUBJECT || 'не указан',
    hasPublicKey: !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    hasPrivateKey: !!process.env.VAPID_PRIVATE_KEY,
    subscriptionsCount: subscriptions.length,
    vapidPublicKeyPreview: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.substring(0, 20) + '...',
  });
}
