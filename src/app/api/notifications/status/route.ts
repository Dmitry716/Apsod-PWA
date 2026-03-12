import { NextResponse } from 'next/server';
import { redis, getSubscriptions } from '@/app/lib/redis';

/**
 * GET /api/notifications/status
 * Диагностика: подключён ли Redis и сколько подписок сохранено.
 * Откройте https://apsod.com/api/notifications/status на боевом домене.
 */
export async function GET() {
  try {
    const hasRedis =
      !!(process.env.KV_REST_API_URL || process.env.KV_REST_API_REST_URL || process.env.UPSTASH_REDIS_REST_URL) &&
      !!(process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_REST_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN);

    let subscriptionsCount = 0;
    let storage = 'none';
    let error: string | null = null;

    if (redis) {
      try {
        const subs = await getSubscriptions();
        subscriptionsCount = subs.length;
        storage = 'redis';
      } catch (e) {
        error = e instanceof Error ? e.message : 'Unknown error';
        storage = 'redis_error';
      }
    } else {
      storage = hasRedis ? 'redis_config_failed' : 'file_or_missing';
    }

    return NextResponse.json({
      ok: !!redis && !error,
      storage,
      subscriptionsCount,
      redisConnected: !!redis && !error,
      envHint: !hasRedis
        ? 'В Vercel не заданы KV_REST_API_URL и KV_REST_API_TOKEN (или UPSTASH_*). Подписки на продакшене не сохраняются.'
        : !redis
          ? 'Переменные заданы, но Redis не инициализирован — проверьте значения в Vercel.'
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
