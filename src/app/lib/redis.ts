// src/app/lib/redis.ts
import { Redis } from '@upstash/redis';
import { createClient } from 'redis';

const REDIS_KEY_SUBSCRIPTIONS = 'subscriptions';
const NODE_REDIS_CONNECT_MS = 4000;

function isServerlessRuntime(): boolean {
  return process.env.VERCEL === '1' || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
}

function getRestRedisEnv(): { url: string; token: string } | null {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.KV_REST_API_REDIS_URL ||
    process.env.KV_REST_API_REST_URL ||
    process.env.STORAGE_URL ||
    process.env.UPSTASH_REDIS_REST_URL;

  if (!url || !(url.startsWith('https://') || url.startsWith('http://'))) {
    return null;
  }

  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.KV_REST_API_REDIS_TOKEN ||
    process.env.KV_REST_API_REST_TOKEN ||
    process.env.STORAGE_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_TOKEN;

  if (!token) return null;
  return { url, token };
}

function getRedisConfig(): { type: 'upstash'; url: string; token: string } | { type: 'node'; url: string } | null {
  const rest = getRestRedisEnv();
  if (rest) {
    return { type: 'upstash', url: rest.url, token: rest.token };
  }

  const tcpUrl = process.env.REDIS_URL;
  if (tcpUrl && (tcpUrl.startsWith('redis://') || tcpUrl.startsWith('rediss://'))) {
    if (isServerlessRuntime() && process.env.REDIS_ALLOW_TCP !== 'true') {
      console.warn('redis:// skipped on serverless — use KV_REST_API_URL + KV_REST_API_TOKEN');
      return null;
    }
    return { type: 'node', url: tcpUrl };
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Redis not configured — using file storage');
  } else if (!isServerlessRuntime()) {
    console.warn('Redis not configured. Add KV_REST_API_URL and KV_REST_API_TOKEN in Vercel.');
  }
  return null;
}

// Клиенты кэшируем в процессе; конфиг читаем при каждом вызове (на Vercel env доступны в runtime).
let upstashRedis: Redis | null = null;
let nodeRedisClient: NodeRedisClientLike | null = null;
let nodeRedisConnectFailed = false;
let nodeRedisConnectPromise: Promise<NodeRedisClientLike | null> | null = null;

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
  if (nodeRedisConnectFailed) return null;
  if (nodeRedisClient?.isOpen) return nodeRedisClient;
  if (nodeRedisConnectPromise) return nodeRedisConnectPromise;

  nodeRedisConnectPromise = (async () => {
    try {
      const client = createClient({
        url: config.url,
        socket: {
          connectTimeout: NODE_REDIS_CONNECT_MS,
          reconnectStrategy: () => false,
        },
      });
      client.on('error', () => {
        // Ошибки после connect обрабатываем через fallback, без бесконечного спама.
      });
      await Promise.race([
        client.connect(),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Redis connect timeout')), NODE_REDIS_CONNECT_MS + 500);
        }),
      ]);
      nodeRedisClient = client as unknown as NodeRedisClientLike;
      return nodeRedisClient;
    } catch (e) {
      nodeRedisConnectFailed = true;
      nodeRedisClient = null;
      console.error('Redis connect error:', e);
      return null;
    } finally {
      nodeRedisConnectPromise = null;
    }
  })();

  return nodeRedisConnectPromise;
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
  try {
    const upstash = getUpstashRedis();
    if (upstash) return (await upstash.rpush(key, value)) as number;
    const client = await getNodeRedisClient();
    if (!client) return 0;
    return await (client as NodeRedisClientLike & { rPush(key: string, value: string): Promise<number> }).rPush(key, value);
  } catch (e) {
    console.error('Redis rpush error:', e);
    return 0;
  }
}

async function redisLRange(key: string, start: number, stop: number): Promise<string[]> {
  try {
    const upstash = getUpstashRedis();
    if (upstash) return (await upstash.lrange(key, start, stop)) as string[];
    const client = await getNodeRedisClient();
    if (!client) return [];
    return await (client as NodeRedisClientLike & { lRange(key: string, start: number, stop: number): Promise<string[]> }).lRange(key, start, stop);
  } catch (e) {
    console.error('Redis lrange error:', e);
    return [];
  }
}

async function redisLRem(key: string, count: number, value: string): Promise<number> {
  try {
    const upstash = getUpstashRedis();
    if (upstash) return (await upstash.lrem(key, count, value)) as number;
    const client = await getNodeRedisClient();
    if (!client) return 0;
    const c = client as unknown as Record<string, (k: string, cnt: string, v: string) => Promise<number>>;
    const fn = c.lRem ?? c.lrem;
    return typeof fn === 'function' ? await fn.call(client, key, String(count), value) : 0;
  } catch (e) {
    console.error('Redis lrem error:', e);
    return 0;
  }
}

async function redisLPush(key: string, value: string): Promise<number> {
  try {
    const upstash = getUpstashRedis();
    if (upstash) return (await upstash.lpush(key, value)) as number;
    const client = await getNodeRedisClient();
    if (!client) return 0;
    return await (client as NodeRedisClientLike & { lPush(key: string, value: string): Promise<number> }).lPush(key, value);
  } catch (e) {
    console.error('Redis lpush error:', e);
    return 0;
  }
}

async function redisGet(key: string): Promise<string | null> {
  try {
    const upstash = getUpstashRedis();
    if (upstash) return await upstash.get(key) as string | null;
    const client = await getNodeRedisClient();
    if (!client) return null;
    return await client.get(key);
  } catch (e) {
    console.error('Redis get error:', e);
    return null;
  }
}

async function redisSet(key: string, value: string): Promise<void> {
  try {
    const upstash = getUpstashRedis();
    if (upstash) {
      await upstash.set(key, value);
      return;
    }
    const client = await getNodeRedisClient();
    if (client) await client.set(key, value);
  } catch (e) {
    console.error('Redis set error:', e);
  }
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

function getSubscriptionsFilePath(): string {
  const path = require('path') as typeof import('path');
  if (process.env.SUBSCRIPTIONS_DATA_PATH) return process.env.SUBSCRIPTIONS_DATA_PATH;
  if (isServerlessRuntime()) return path.join('/tmp', 'subscriptions.json');
  return path.join(process.cwd(), 'subscriptions.json');
}

function canUseFileSubscriptionStorage(): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  if (isServerlessRuntime()) return true;
  if (process.env.SUBSCRIPTIONS_ALLOW_FILE_STORAGE === 'true') return true;
  if (!process.env.AWS_LAMBDA_FUNCTION_NAME) return true;
  return false;
}

export function isSubscriptionStorageAvailable(): boolean {
  return hasRedis() || canUseFileSubscriptionStorage();
}

function readSubscriptionsFile(): any[] {
  if (!canUseFileSubscriptionStorage()) return [];
  const fs = require('fs') as typeof import('fs');
  const file = getSubscriptionsFilePath();
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    }
  } catch (e) {
    console.error('Read subscriptions file failed:', e);
  }
  return [];
}

function writeSubscriptionsFile(subscriptions: any[]): boolean {
  if (!canUseFileSubscriptionStorage()) return false;
  const fs = require('fs') as typeof import('fs');
  const path = require('path') as typeof import('path');
  const file = getSubscriptionsFilePath();
  try {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(subscriptions, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Write subscriptions file failed:', e);
    return false;
  }
}

async function saveSubscriptionToRedis(toStore: Record<string, unknown>): Promise<boolean> {
  if (!hasRedis()) return false;
  try {
    await redisSAdd(REDIS_KEY_SUBSCRIPTIONS, JSON.stringify(toStore));
    return true;
  } catch (e) {
    console.error('Redis save subscription failed:', e);
    return false;
  }
}

export async function saveSubscription(subscription: any): Promise<void> {
  const toStore = {
    ...subscription,
    createdAt: subscription.createdAt || new Date().toISOString(),
  };

  const existing = await getSubscriptions();
  if (existing.some((s: any) => s.endpoint === subscription.endpoint)) return;

  if (await saveSubscriptionToRedis(toStore)) {
    console.log('✅ Подписка сохранена в Redis');
    return;
  }

  const fileSubs = readSubscriptionsFile();
  if (fileSubs.some((s: any) => s.endpoint === subscription.endpoint)) return;
  fileSubs.push(toStore);
  if (writeSubscriptionsFile(fileSubs)) {
    console.log('✅ Подписка сохранена в файл');
    return;
  }

  throw new Error('Не удалось сохранить подписку');
}

export async function getSubscriptions(): Promise<any[]> {
  if (hasRedis()) {
    try {
      const raw = await redisSMembers(REDIS_KEY_SUBSCRIPTIONS);
      return raw
        .map((s) => {
          try {
            return JSON.parse(s);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
    } catch (e) {
      console.error('Redis get subscriptions failed, fallback to file:', e);
    }
  }

  return readSubscriptionsFile();
}

export async function deleteSubscription(endpoint: string): Promise<void> {
  if (hasRedis()) {
    try {
      const subscriptions = await getSubscriptions();
      const toRemove = subscriptions.find((s: any) => s.endpoint === endpoint);
      if (toRemove) {
        await redisSRem(REDIS_KEY_SUBSCRIPTIONS, JSON.stringify(toRemove));
        console.log('✅ Подписка удалена из Redis');
        return;
      }
    } catch (e) {
      console.error('Redis delete subscription failed, fallback to file:', e);
    }
  }

  const fileSubs = readSubscriptionsFile().filter((s: any) => s.endpoint !== endpoint);
  writeSubscriptionsFile(fileSubs);
}

export async function deleteAllSubscriptions(): Promise<void> {
  if (hasRedis()) {
    try {
      await redisDel(REDIS_KEY_SUBSCRIPTIONS);
      console.log('✅ Все подписки удалены из Redis');
      return;
    } catch (e) {
      console.error('Redis delete all subscriptions failed, fallback to file:', e);
    }
  }

  writeSubscriptionsFile([]);
  console.log('✅ Все подписки удалены из файла');
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
