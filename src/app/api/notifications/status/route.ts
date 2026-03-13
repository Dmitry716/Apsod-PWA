import { NextResponse } from 'next/server';
import { hasRedis, getSubscriptions } from '@/app/lib/redis';

/**
 * GET /api/notifications/status
 * Диагностика: подключён ли Redis и сколько подписок сохранено.
 * Откройте https://apsod.com/api/notifications/status на боевом домене.
 */
export async function GET() {
  try {
    let subscriptionsCount = 0;
    let storage = 'none';
    let error: string | null = null;

    if (hasRedis()) {
      try {
        const subs = await getSubscriptions();
        subscriptionsCount = subs.length;
        storage = 'redis';
      } catch (e) {
        error = e instanceof Error ? e.message : 'Unknown error';
        storage = 'redis_error';
      }
    } else {
      storage = 'file_or_missing';
    }

    return NextResponse.json({
      ok: hasRedis() && !error,
      storage,
      subscriptionsCount,
      redisConnected: hasRedis() && !error,
      envHint: !hasRedis()
        ? 'В Vercel задайте KV_REST_API_REDIS_URL или REDIS_URL (redis://... или Upstash URL + токен). Для Production выберите Environment: Production.'
        : null,
      error: error || undefined,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json(
      { ok: false, error: message, storage: 'error' },
      { status: 500 }
    );
  }
}
