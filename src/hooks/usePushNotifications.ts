// src/hooks/usePushNotifications.ts
'use client'; // Важно! Хук работает только на клиенте

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
  // Состояния хука
  const [isSupported, setIsSupported] = useState(false);        // Поддерживает ли браузер
  const [permission, setPermission] = useState<NotificationPermission>('default'); // Статус разрешения
  const [subscription, setSubscription] = useState<PushSubscription | null>(null); // Текущая подписка
  const [isLoading, setIsLoading] = useState(false);            // Загрузка
  const [error, setError] = useState<string | null>(null);      // Ошибки

  // Шаг 3.1: Проверка поддержки браузером
  useEffect(() => {
    // Проверяем, что все необходимые API доступны в браузере
    const supported = 'serviceWorker' in navigator &&           // Service Worker
                     'PushManager' in window &&                  // Push API
                     'Notification' in window;                    // Notifications API
    
    console.log('📱 Проверка поддержки PWA:', { supported });
    setIsSupported(supported);

    if (supported) {
      // Если поддерживается, получаем текущий статус разрешений
      setPermission(Notification.permission);
      
      // Проверяем, есть ли уже подписка
      checkExistingSubscription();
    }
  }, []); // Пустой массив - выполняется один раз при монтировании

  // Шаг 3.2: Проверка существующей подписки
  const checkExistingSubscription = async () => {
    try {
      // Получаем регистрацию Service Worker
      const registration = await navigator.serviceWorker.getRegistration();
      console.log('🔍 Проверка Service Worker:', registration);
      
      if (registration) {
        // Если есть Service Worker, проверяем наличие подписки
        const existingSubscription = await registration.pushManager.getSubscription();
        console.log('📦 Существующая подписка:', existingSubscription);
        setSubscription(existingSubscription);
      }
    } catch (err) {
      console.error('❌ Ошибка проверки подписки:', err);
    }
  };

  // Шаг 3.3: Запрос разрешения на уведомления
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError('Ваш браузер не поддерживает уведомления');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('🔔 Запрос разрешения на уведомления...');
      
      // Запрашиваем разрешение у пользователя
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

  // Шаг 3.4: Вспомогательная функция для конвертации VAPID ключа
  // VAPID ключ приходит в base64 формате, а Push API требует Uint8Array
  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    // Добавляем паддинг если нужно
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')  // Заменяем - на + (base64url -> base64)
      .replace(/_/g, '/'); // Заменяем _ на /
    
    // Декодируем base64
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // Шаг 3.5: Вспомогательная функция для преобразования подписки в JSON
  // Нужно для отправки на сервер
  const subscriptionToJson = (subscription: PushSubscription): PushSubscriptionJSON => {
    // Получаем ключи из подписки
    const key = subscription.getKey ? subscription.getKey('p256dh') : null;
    const auth = subscription.getKey ? subscription.getKey('auth') : null;

    return {
      endpoint: subscription.endpoint,
      keys: {
        // Конвертируем ключи в base64 строки
        p256dh: key ? btoa(String.fromCharCode(...new Uint8Array(key))) : '',
        auth: auth ? btoa(String.fromCharCode(...new Uint8Array(auth))) : ''
      }
    };
  };

  // Шаг 3.6: Подписка на уведомления
  const subscribe = useCallback(async () => {
    if (!isSupported) {
      setError('Ваш браузер не поддерживает уведомления');
      return null;
    }

    // Если нет разрешения, запрашиваем его
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('📡 Начинаем подписку на уведомления...');

      // Шаг 3.6.1: Регистрируем Service Worker
      const registration = await navigator.serviceWorker.register('/notification-sw.js');
      console.log('✅ Service Worker зарегистрирован:', registration);

      // Шаг 3.6.2: Ждем активации Service Worker
      await navigator.serviceWorker.ready;
      console.log('✅ Service Worker активирован');

      // Шаг 3.6.3: Получаем VAPID ключ
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      
      if (!vapidPublicKey) {
        throw new Error('VAPID ключ не настроен. Добавьте NEXT_PUBLIC_VAPID_PUBLIC_KEY в .env.local');
      }

      console.log('🔑 VAPID ключ получен');

      // Шаг 3.6.4: Конвертируем VAPID ключ
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

      // Шаг 3.6.5: Создаем подписку
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true, // Все уведомления будут видны пользователю
        applicationServerKey: applicationServerKey
      });

      console.log('✅ Подписка создана:', newSubscription);
      setSubscription(newSubscription);

      // Шаг 3.6.6: Отправляем подписку на сервер
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

  // Шаг 3.7: Отписка от уведомлений
  const unsubscribe = useCallback(async () => {
    if (!subscription) {
      console.log('ℹ️ Нет активной подписки');
      return true;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('🔇 Отписываемся от уведомлений...');

      // Шаг 3.7.1: Удаляем подписку с сервера
      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint })
      });

      // Шаг 3.7.2: Отписываемся локально
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

  // Шаг 3.8: Возвращаем всё, что нужно компонентам
  return {
    isSupported,      // Поддерживает ли браузер
    permission,       // Текущий статус разрешения ('default', 'granted', 'denied')
    subscription,     // Объект подписки (null если нет)
    isLoading,        // Идёт ли загрузка
    error,            // Сообщение об ошибке
    requestPermission, // Функция запроса разрешения
    subscribe,        // Функция подписки
    unsubscribe       // Функция отписки
  };
}