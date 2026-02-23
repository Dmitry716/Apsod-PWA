// src/hooks/usePushNotifications.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

// Типы для подписки
interface PushSubscriptionJSON {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supported = 'serviceWorker' in navigator && 
                     'PushManager' in window && 
                     'Notification' in window;
    
    console.log('📱 Проверка поддержки PWA:', { supported });
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);
      checkExistingSubscription();
    }
  }, []);

  const checkExistingSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      console.log('🔍 Проверка Service Worker:', registration);
      
      if (registration) {
        const existingSubscription = await registration.pushManager.getSubscription();
        console.log('📦 Существующая подписка:', existingSubscription);
        setSubscription(existingSubscription);
      }
    } catch (err) {
      console.error('❌ Ошибка проверки подписки:', err);
    }
  };

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError('Ваш браузер не поддерживает уведомления');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('🔔 Запрос разрешения на уведомления...');
      
      const result = await Notification.requestPermission();
      console.log('✅ Результат запроса:', result);
      
      setPermission(result);

      if (result === 'granted') {
        return true;
      } else if (result === 'denied') {
        setError('Вы заблокировали уведомления. Разрешите их в настройках браузера.');
      } else {
        setError('Разрешение на уведомления не получено');
      }
      
      return false;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка запроса разрешения';
      setError(message);
      console.error('❌ Ошибка:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscriptionToJson = (subscription: PushSubscription): PushSubscriptionJSON => {
    const key = subscription.getKey ? subscription.getKey('p256dh') : null;
    const auth = subscription.getKey ? subscription.getKey('auth') : null;

    return {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: key ? btoa(String.fromCharCode(...new Uint8Array(key))) : '',
        auth: auth ? btoa(String.fromCharCode(...new Uint8Array(auth))) : ''
      }
    };
  };

  const subscribe = useCallback(async () => {
    if (!isSupported) {
      setError('Ваш браузер не поддерживает уведомления');
      return null;
    }

    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('📡 Начинаем подписку на уведомления...');

      const registration = await navigator.serviceWorker.register('/notification-sw.js');
      console.log('✅ Service Worker зарегистрирован:', registration);

      await navigator.serviceWorker.ready;
      console.log('✅ Service Worker активирован');

      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      
      if (!vapidPublicKey) {
        throw new Error('VAPID ключ не настроен. Добавьте NEXT_PUBLIC_VAPID_PUBLIC_KEY в .env.local');
      }

      console.log('🔑 VAPID ключ получен');

      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

      // Исправление здесь - явное приведение типа
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey as Uint8Array
      });

      console.log('✅ Подписка создана:', newSubscription);
      setSubscription(newSubscription);

      const subscriptionData = subscriptionToJson(newSubscription);
      console.log('📤 Отправка подписки на сервер:', subscriptionData);

      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionData)
      });

      if (!response.ok) {
        throw new Error('Ошибка при сохранении подписки на сервере');
      }

      const result = await response.json();
      console.log('✅ Подписка сохранена на сервере:', result);

      return newSubscription;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка подписки';
      setError(message);
      console.error('❌ Ошибка подписки:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, permission, requestPermission]);

  const unsubscribe = useCallback(async () => {
    if (!subscription) {
      console.log('ℹ️ Нет активной подписки');
      return true;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('🔇 Отписываемся от уведомлений...');

      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint })
      });

      await subscription.unsubscribe();
      console.log('✅ Отписка выполнена');
      
      setSubscription(null);

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка отписки';
      setError(message);
      console.error('❌ Ошибка отписки:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [subscription]);

  return {
    isSupported,
    permission,
    subscription,
    isLoading,
    error,
    requestPermission,
    subscribe,
    unsubscribe
  };
}