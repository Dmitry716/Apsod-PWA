// src/lib/redis.ts
import { Redis } from '@upstash/redis';

// Проверяем наличие переменных окружения (Vercel KV / Upstash — возможны разные имена)
const getRedisConfig = () => {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.KV_REST_API_REST_URL ||
    process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.KV_REST_API_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️ Redis не настроен — используется файл subscriptions.json');
    } else {
      console.warn(
        '⚠️ Redis не настроен на продакшене. Добавьте KV_REST_API_URL и KV_REST_API_TOKEN в Vercel.'
      );
    }
    return null;
  }
  return { url, token };
};

const config = getRedisConfig();
export const redis = config ? new Redis(config) : null;

// Ключи для Redis
export const REDIS_KEYS = {
  SUBSCRIPTIONS: 'subscriptions',
  SUBSCRIPTION_PREFIX: 'sub:',
  STATS: 'stats:',
};

// Вспомогательные функции для работы с подписками
export async function saveSubscription(subscription: any): Promise<void> {
  const toStore = {
    ...subscription,
    createdAt: subscription.createdAt || new Date().toISOString(),
  };

  if (!redis) {
    // Для разработки используем файл
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

  // Redis: проверяем по endpoint, т.к. один и тот же пользователь может иметь разный userAgent
  const existing = await getSubscriptions();
  if (existing.some((s: any) => s.endpoint === subscription.endpoint)) {
    return;
  }
  await redis.sadd(REDIS_KEYS.SUBSCRIPTIONS, JSON.stringify(toStore));
  console.log('✅ Подписка сохранена в Redis');
}

export async function getSubscriptions(): Promise<any[]> {
  if (!redis) {
    // Для разработки читаем из файла
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

  // Используем Redis для продакшена
  const subscriptions = await redis.smembers(REDIS_KEYS.SUBSCRIPTIONS);
  return subscriptions.map(s => JSON.parse(s));
}

export async function deleteSubscription(endpoint: string): Promise<void> {
  if (!redis) {
    // Для разработки
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

  // Для продакшена - нужно найти и удалить конкретную подписку
  const subscriptions = await getSubscriptions();
  const toRemove = subscriptions.find(s => s.endpoint === endpoint);
  if (toRemove) {
    await redis.srem(REDIS_KEYS.SUBSCRIPTIONS, JSON.stringify(toRemove));
    console.log('✅ Подписка удалена из Redis');
  }
}

export async function deleteAllSubscriptions(): Promise<void> {
  if (!redis) {
    const fs = require('fs');
    const path = require('path');
    const subscriptionsFile = path.join(process.cwd(), 'subscriptions.json');
    fs.writeFileSync(subscriptionsFile, '[]');
    console.log('✅ Все подписки удалены из файла');
    return;
  }

  await redis.del(REDIS_KEYS.SUBSCRIPTIONS);
  console.log('✅ Все подписки удалены из Redis');
}

// Функция для миграции из файла в Redis (запустить один раз)
export async function migrateFileToRedis(): Promise<void> {
  if (!redis) {
    console.log('❌ Redis не настроен');
    return;
  }

  try {
    const subscriptions = await getSubscriptions(); // из файла
    if (subscriptions.length === 0) {
      console.log('ℹ️ Нет подписок для миграции');
      return;
    }

    for (const sub of subscriptions) {
      await redis.sadd(REDIS_KEYS.SUBSCRIPTIONS, JSON.stringify(sub));
    }
    console.log(`✅ Перенесено ${subscriptions.length} подписок в Redis`);
  } catch (error) {
    console.error('❌ Ошибка миграции:', error);
  }
}