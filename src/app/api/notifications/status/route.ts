import { NextResponse } from 'next/server';
import {
  hasRedis,
  getSubscriptions,
  isSubscriptionStorageAvailable,
} from '@/app/lib/redis';

export const runtime = 'nodejs';

const REST_ENV_KEYS = [
  'KV_REST_API_URL',
  'KV_REST_API_REDIS_URL',
  'KV_REST_API_REST_URL',
  'STORAGE_URL',
  'UPSTASH_REDIS_REST_URL',
] as const;

/**
 * GET /api/notifications/status
 * Диагностика: доступно ли хранилище подписок и сколько записей сохранено.
 */
export async function GET() {
  try {
    const envVarsFound = REST_ENV_KEYS.filter((k) => process.env[k]);
    const storageAvailable = isSubscriptionStorageAvailable();
    let subscriptionsCount = 0;
    let storage = 'none';
    let error: string | null = null;

    if (storageAvailable) {
      try {
        const subs = await getSubscriptions();
        subscriptionsCount = subs.length;
        storage = hasRedis() ? 'redis' : 'file';
      } catch (e) {
        error = e instanceof Error ? e.message : 'Unknown error';
        storage = 'error';
      }
    }

    const ok = storageAvailable && !error;
    const envHint = !hasRedis()
      ? envVarsFound.length > 0
        ? `Найдены ${envVarsFound.join(', ')}, но REST Redis не подключён. Проверьте KV_REST_API_TOKEN и сделайте Redeploy.`
        : 'Для стабильных подписок на Vercel задайте KV_REST_API_URL и KV_REST_API_TOKEN (Upstash / Vercel KV).'
      : null;

    return NextResponse.json({
      ok,
      storage,
      subscriptionsCount,
      redisConnected: hasRedis(),
      storageAvailable,
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
