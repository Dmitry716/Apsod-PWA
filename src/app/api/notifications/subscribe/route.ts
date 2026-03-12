import { NextResponse } from 'next/server';
import {
  redis,
  getSubscriptions,
  saveSubscription,
  deleteSubscription,
  deleteAllSubscriptions,
} from '@/app/lib/redis';

export async function POST(request: Request) {
  console.log('📨 POST /api/notifications/subscribe');

  if (process.env.NODE_ENV === 'production' && !redis) {
    console.error('❌ На продакшене не настроен Redis. Подписки не сохраняются.');
    return NextResponse.json(
      {
        error: 'Сервис подписок временно недоступен. Попробуйте позже.',
        code: 'STORAGE_NOT_CONFIGURED',
      },
      { status: 503 }
    );
  }

  try {
    const subscription = await request.json();

    if (!subscription?.endpoint) {
      return NextResponse.json(
        { error: 'Неверные данные подписки' },
        { status: 400 }
      );
    }

    const subscriptions = await getSubscriptions();
    const exists = subscriptions.some((s: any) => s.endpoint === subscription.endpoint);

    if (!exists) {
      await saveSubscription({
        ...subscription,
        userAgent: request.headers.get('user-agent') || 'unknown',
      });
      const total = (await getSubscriptions()).length;
      console.log('✅ Подписка добавлена. Всего:', total);
      return NextResponse.json({
        success: true,
        message: 'Подписка успешно сохранена',
        total,
      });
    }

    const total = subscriptions.length;
    return NextResponse.json({
      success: true,
      message: 'Подписка уже существует',
      total,
    });
  } catch (error) {
    console.error('❌ Ошибка подписки:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { endpoint, deleteAll } = body;

    if (deleteAll === true || (endpoint == null && Object.keys(body).length === 0)) {
      await deleteAllSubscriptions();
      return NextResponse.json({ success: true, total: 0, deletedAll: true });
    }

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Укажите endpoint или deleteAll: true' },
        { status: 400 }
      );
    }

    await deleteSubscription(endpoint);
    const subscriptions = await getSubscriptions();
    return NextResponse.json({
      success: true,
      total: subscriptions.length,
    });
  } catch (error) {
    console.error('❌ Ошибка удаления:', error);
    return NextResponse.json(
      { error: 'Ошибка удаления подписки' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscriptions = await getSubscriptions();

    const safeSubscriptions = subscriptions.map((s: any) => ({
      endpoint: s.endpoint ? s.endpoint.substring(0, 60) + (s.endpoint.length > 60 ? '...' : '') : '',
      createdAt: s.createdAt,
      userAgent: s.userAgent,
    }));

    return NextResponse.json({
      total: subscriptions.length,
      subscriptions: safeSubscriptions,
    });
  } catch (error) {
    console.error('❌ Ошибка получения подписок:', error);
    return NextResponse.json(
      { error: 'Ошибка получения подписок' },
      { status: 500 }
    );
  }
}
