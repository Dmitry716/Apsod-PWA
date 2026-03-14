import { NextResponse } from 'next/server';
import { hasRedis, getSubscriptions } from '@/app/lib/redis';

const REDIS_ENV_KEYS = [
  'KV_REST_API_URL',
  'KV_REST_API_REDIS_URL',
  'KV_REST_API_REST_URL',
  'STORAGE_URL',
  'UPSTASH_REDIS_REST_URL',
  'REDIS_URL',
] as const;

/**
 * GET /api/notifications/status
 * Диагностика: подключён ли Redis и сколько подписок сохранено.
 * Откройте https://apsod.com/api/notifications/status на боевом домене.
 */
export async function GET() {
  try {
    const envVarsFound = REDIS_ENV_KEYS.filter((k) => process.env[k]);
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

    const ok = hasRedis() && !error;
    const envHint = !ok
      ? envVarsFound.length > 0
        ? 'Переменные найдены (' +
          envVarsFound.join(', ') +
          '), но подключение не удалось. Проверьте значение URL (redis:// или rediss://) и переразверните проект.'
        : 'В Vercel задайте KV_REST_API_REDIS_URL или REDIS_URL (redis://...). Убедитесь, что переменная привязана к Production и сделайте Redeploy.'
      : null;

    return NextResponse.json({
      ok,
      storage,
      subscriptionsCount,
      redisConnected: ok,
      envHint: envHint || undefined,
      envVarsFound,
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
