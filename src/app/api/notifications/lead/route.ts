import { NextResponse } from 'next/server';
import webPush from 'web-push';
import { getSubscriptions, deleteSubscription } from '@/app/lib/redis';

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
  console.log('📨 POST /api/notifications/lead');

  try {
    const { type, leadData } = await request.json();

    const subscriptions = await getSubscriptions();

    if (subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        sent: 0,
        message: 'Нет подписчиков',
      });
    }

    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'VAPID ключи не настроены' },
        { status: 500 }
      );
    }

    let payload: string;

    switch (type) {
      case 'new_lead':
        payload = JSON.stringify({
          title: '✅ Новая заявка',
          body: `${leadData.name} отправил(а) заявку на ${leadData.service}`,
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
          data: { type: 'lead', status: 'new', url: '/admin/leads' },
        });
        break;
      case 'lead_status':
        payload = JSON.stringify({
          title: `📊 Статус заявки: ${leadData.status}`,
          body: leadData.message || 'Статус вашей заявки изменился',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
          data: { type: 'lead', status: leadData.status, url: '/profile' },
        });
        break;
      default:
        return NextResponse.json(
          { error: 'Неизвестный тип уведомления' },
          { status: 400 }
        );
    }

    let sent = 0;
    const invalidSubs: typeof subscriptions = [];

    for (const subscription of subscriptions) {
      try {
        await webPush.sendNotification(subscription, payload);
        sent++;
      } catch (error: unknown) {
        const statusCode =
          error && typeof error === 'object' && 'statusCode' in error
            ? (error as { statusCode?: number }).statusCode
            : undefined;
        if (statusCode === 410 || statusCode === 404) {
          invalidSubs.push(subscription);
        }
      }
    }

    for (const sub of invalidSubs) {
      await deleteSubscription(sub.endpoint);
    }

    return NextResponse.json({
      success: true,
      sent,
      total: subscriptions.length,
      invalid: invalidSubs.length,
      message: `Уведомления отправлены ${sent} подписчикам`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Ошибка:', msg);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
