// src/app/lib/redis.ts
import { Redis } from '@upstash/redis';
import { createClient } from 'redis';

const REDIS_KEY_SUBSCRIPTIONS = 'subscriptions';

// Строка redis:// (Redis Labs и т.п.) — один URL с паролем внутри. Upstash — отдельно url + token.
function getRedisConfig(): { type: 'upstash'; url: string; token: string } | { type: 'node'; url: string } | null {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.KV_REST_API_REDIS_URL ||
    process.env.KV_REST_API_REST_URL ||
    process.env.STORAGE_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.REDIS_URL;

  if (!url) {
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️ Redis не настроен — используется файл subscriptions.json');
    } else {
      console.warn('⚠️ Redis не настроен на продакшене. Добавьте KV_REST_API_REDIS_URL или REDIS_URL в Vercel (Environment: Production).');
    }
    return null;
  }

  // Строка redis:// — стандартный Redis (Redis Labs и др.), пароль в URL, токен не нужен
  if (url.startsWith('redis://') || url.startsWith('rediss://')) {
    return { type: 'node', url };
  }

  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.KV_REST_API_REDIS_TOKEN ||
    process.env.KV_REST_API_REST_TOKEN ||
    process.env.STORAGE_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_TOKEN;

  if (!token) {
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️ Redis (Upstash) без токена — используется файл');
    } else {
      console.warn('⚠️ Для Upstash нужны URL и токен. Для redis:// достаточно одного URL.');
    }
    return null;
  }

  return { type: 'upstash', url, token };
}

// Клиенты кэшируем в процессе; конфиг читаем при каждом вызове (на Vercel env доступны в runtime).
let upstashRedis: Redis | null = null;
let nodeRedisClient: NodeRedisClientLike | null = null;

interface NodeRedisClientLike {
  sAdd(key: string, value: string): Promise<number>;
  sMembers(key: string): Promise<string[]>;
  sRem(key: string, value: string): Promise<number>;
  del(key: string): Promise<number>;
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<unknown>;
  rPush(key: string, value: string): Promise<number>;
  lRange(key: string, start: number, stop: number): Promise<string[]>;
  lRem(key: string, count: number | string, value: string): Promise<number>;
  lPush(key: string, value: string): Promise<number>;
  isOpen: boolean;
}

// Upstash REST API (https://...) — создаём при первом обращении в этом процессе
function getUpstashRedis(): Redis | null {
  const config = getRedisConfig();
  if (config?.type !== 'upstash') return null;
  if (!upstashRedis) {
    upstashRedis = new Redis({ url: config.url, token: config.token });
  }
  return upstashRedis;
}

async function getNodeRedisClient(): Promise<NodeRedisClientLike | null> {
  const config = getRedisConfig();
  if (config?.type !== 'node') return null;
  if (nodeRedisClient?.isOpen) return nodeRedisClient;
  try {
    const client = createClient({ url: config.url });
    client.on('error', (err) => console.error('Redis client error:', err));
    await client.connect();
    nodeRedisClient = client as unknown as NodeRedisClientLike;
    return nodeRedisClient;
  } catch (e) {
    console.error('Redis connect error:', e);
    return null;
  }
}

export const redis = null as unknown as Redis | null; // для обратной совместимости; используйте getUpstashRedis()

export const REDIS_KEYS = {
  SUBSCRIPTIONS: REDIS_KEY_SUBSCRIPTIONS,
  SUBSCRIPTION_PREFIX: 'sub:',
  STATS: 'stats:',
};

async function redisSAdd(key: string, value: string): Promise<void> {
  const upstash = getUpstashRedis();
  if (upstash) {
    await upstash.sadd(key, value);
    return;
  }
  const client = await getNodeRedisClient();
  if (client) await client.sAdd(key, value);
}

async function redisSMembers(key: string): Promise<string[]> {
  const upstash = getUpstashRedis();
  if (upstash) {
    return (await upstash.smembers(key)) as string[];
  }
  const client = await getNodeRedisClient();
  if (!client) return [];
  return await client.sMembers(key);
}

async function redisSRem(key: string, value: string): Promise<void> {
  const upstash = getUpstashRedis();
  if (upstash) {
    await upstash.srem(key, value);
    return;
  }
  const client = await getNodeRedisClient();
  if (client) await client.sRem(key, value);
}

async function redisDel(key: string): Promise<void> {
  const upstash = getUpstashRedis();
  if (upstash) {
    await upstash.del(key);
    return;
  }
  const client = await getNodeRedisClient();
  if (client) await client.del(key);
}

async function redisRPush(key: string, value: string): Promise<number> {
  const upstash = getUpstashRedis();
  if (upstash) return (await upstash.rpush(key, value)) as number;
  const client = await getNodeRedisClient();
  if (!client) return 0;
  return await (client as NodeRedisClientLike & { rPush(key: string, value: string): Promise<number> }).rPush(key, value);
}

async function redisLRange(key: string, start: number, stop: number): Promise<string[]> {
  const upstash = getUpstashRedis();
  if (upstash) return (await upstash.lrange(key, start, stop)) as string[];
  const client = await getNodeRedisClient();
  if (!client) return [];
  return await (client as NodeRedisClientLike & { lRange(key: string, start: number, stop: number): Promise<string[]> }).lRange(key, start, stop);
}

async function redisLRem(key: string, count: number, value: string): Promise<number> {
  const upstash = getUpstashRedis();
  if (upstash) return (await upstash.lrem(key, count, value)) as number;
  const client = await getNodeRedisClient();
  if (!client) return 0;
  // node-redis v5: LREM key count value; command args must be string | Buffer (count as string)
  const c = client as unknown as Record<string, (k: string, cnt: string, v: string) => Promise<number>>;
  const fn = c.lRem ?? c.lrem;
  return typeof fn === 'function' ? await fn.call(client, key, String(count), value) : 0;
}

async function redisLPush(key: string, value: string): Promise<number> {
  const upstash = getUpstashRedis();
  if (upstash) return (await upstash.lpush(key, value)) as number;
  const client = await getNodeRedisClient();
  if (!client) return 0;
  return await (client as NodeRedisClientLike & { lPush(key: string, value: string): Promise<number> }).lPush(key, value);
}

async function redisGet(key: string): Promise<string | null> {
  const upstash = getUpstashRedis();
  if (upstash) return await upstash.get(key) as string | null;
  const client = await getNodeRedisClient();
  if (!client) return null;
  return await client.get(key);
}

async function redisSet(key: string, value: string): Promise<void> {
  const upstash = getUpstashRedis();
  if (upstash) {
    await upstash.set(key, value);
    return;
  }
  const client = await getNodeRedisClient();
  if (client) await client.set(key, value);
}

export const redisChat = {
  rpush: redisRPush,
  lrange: redisLRange,
  lrem: redisLRem,
  lpush: redisLPush,
  get: redisGet,
  set: redisSet,
};

export function hasRedis(): boolean {
  return !!getRedisConfig();
}

export async function saveSubscription(subscription: any): Promise<void> {
  const toStore = {
    ...subscription,
    createdAt: subscription.createdAt || new Date().toISOString(),
  };

  if (!hasRedis()) {
    const fs = require('fs');
    const path = require('path');
    const subscriptionsFile = path.join(process.cwd(), 'subscriptions.json');
    let subscriptions: any[] = [];
    try {
      if (fs.existsSync(subscriptionsFile)) {
        subscriptions = JSON.parse(fs.readFileSync(subscriptionsFile, 'utf-8'));
      }
    } catch (e) {}
    const exists = subscriptions.some((s: any) => s.endpoint === subscription.endpoint);
    if (!exists) {
      subscriptions.push(toStore);
      fs.writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2));
      console.log('✅ Подписка сохранена в файл');
    }
    return;
  }

  const existing = await getSubscriptions();
  if (existing.some((s: any) => s.endpoint === subscription.endpoint)) return;

  await redisSAdd(REDIS_KEY_SUBSCRIPTIONS, JSON.stringify(toStore));
  console.log('✅ Подписка сохранена в Redis');
}

export async function getSubscriptions(): Promise<any[]> {
  if (!hasRedis()) {
    const fs = require('fs');
    const path = require('path');
    const subscriptionsFile = path.join(process.cwd(), 'subscriptions.json');
    try {
      if (fs.existsSync(subscriptionsFile)) {
        return JSON.parse(fs.readFileSync(subscriptionsFile, 'utf-8'));
      }
    } catch (e) {}
    return [];
  }

  const raw = await redisSMembers(REDIS_KEY_SUBSCRIPTIONS);
  return raw.map((s) => {
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

export async function deleteSubscription(endpoint: string): Promise<void> {
  if (!hasRedis()) {
    const fs = require('fs');
    const path = require('path');
    const subscriptionsFile = path.join(process.cwd(), 'subscriptions.json');
    try {
      if (fs.existsSync(subscriptionsFile)) {
        let subscriptions = JSON.parse(fs.readFileSync(subscriptionsFile, 'utf-8'));
        subscriptions = subscriptions.filter((s: any) => s.endpoint !== endpoint);
        fs.writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2));
      }
    } catch (e) {}
    return;
  }

  const subscriptions = await getSubscriptions();
  const toRemove = subscriptions.find((s: any) => s.endpoint === endpoint);
  if (toRemove) {
    await redisSRem(REDIS_KEY_SUBSCRIPTIONS, JSON.stringify(toRemove));
    console.log('✅ Подписка удалена из Redis');
  }
}

export async function deleteAllSubscriptions(): Promise<void> {
  if (!hasRedis()) {
    const fs = require('fs');
    const path = require('path');
    const subscriptionsFile = path.join(process.cwd(), 'subscriptions.json');
    fs.writeFileSync(subscriptionsFile, '[]');
    console.log('✅ Все подписки удалены из файла');
    return;
  }
  await redisDel(REDIS_KEY_SUBSCRIPTIONS);
  console.log('✅ Все подписки удалены из Redis');
}

export async function migrateFileToRedis(): Promise<void> {
  if (!hasRedis()) {
    console.log('❌ Redis не настроен');
    return;
  }
  const subscriptions = await getSubscriptions();
  if (subscriptions.length === 0) {
    console.log('ℹ️ Нет подписок для миграции');
    return;
  }
  for (const sub of subscriptions) {
    await redisSAdd(REDIS_KEY_SUBSCRIPTIONS, JSON.stringify(sub));
  }
  console.log(`✅ Перенесено ${subscriptions.length} подписок в Redis`);
}
