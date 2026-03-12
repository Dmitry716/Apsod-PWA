import { NextResponse } from 'next/server';
import webPush from 'web-push';
import { blogPosts } from '@/app/blog/data/posts';
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
  console.log('📨 POST /api/notifications/post');

  try {
    const authHeader = request.headers.get('authorization');
    const secret = authHeader?.replace('Bearer ', '');

    if (secret !== process.env.NOTIFICATION_SECRET) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'VAPID ключи не настроены' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { slug, indices } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'Не указан slug статьи' },
        { status: 400 }
      );
    }

    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) {
      return NextResponse.json({ error: 'Статья не найдена' }, { status: 404 });
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

    const payload = JSON.stringify({
      title: `📝 Новая статья: ${post.title}`,
      body:
        post.excerpt && post.excerpt.length > 100
          ? post.excerpt.substring(0, 100) + '...'
          : (post.excerpt || 'Новая статья в блоге APSOD'),
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      url: `/blog/${post.slug}`,
      data: {
        url: `/blog/${post.slug}`,
        type: 'new_post',
        category: post.category,
        slug: post.slug,
        timestamp: Date.now(),
      },
      actions: [
        { action: 'read', title: '📖 Читать статью' },
        { action: 'close', title: '❌ Закрыть' },
      ],
    });

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
      message: `Уведомление о статье отправлено ${sent} подписчикам`,
      details: {
        total: subscriptions.length,
        sent,
        failed: subscriptions.length - sent,
        invalidRemoved: invalidSubs.length,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Ошибка:', msg);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
