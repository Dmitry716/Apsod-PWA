"use client";

import { useState, useEffect } from "react";

interface PushNotificationSubscribeProps {
  compact?: boolean;
}

export default function PushNotificationSubscribe({ compact = false }: PushNotificationSubscribeProps) {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Проверяем поддержку браузера
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
      setIsSupported(false);
      return;
    }

    // Получаем текущий статус разрешения
    setPermission(Notification.permission);

    // Проверяем существующую подписку
    checkExistingSubscription();
  }, []);

  const checkExistingSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration('/notification-sw.js');
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          console.log('✅ Уже есть активная подписка');
        }
      }
    } catch (error) {
      console.error('Ошибка проверки подписки:', error);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    setSubscriptionStatus(null);

    try {
      if (!isSupported) {
        throw new Error('Ваш браузер не поддерживает push-уведомления');
      }

      console.log('📱 Регистрация Service Worker...');
      
      // Регистрируем Service Worker
      const registration = await navigator.serviceWorker.register('/notification-sw.js');
      await navigator.serviceWorker.ready;
      console.log('✅ Service Worker готов');

      // Запрашиваем разрешение
      console.log('🔔 Запрос разрешения...');
      let currentPermission = permission;
      
      if (currentPermission === 'default') {
        currentPermission = await Notification.requestPermission();
        setPermission(currentPermission);
      }
      
      console.log('📊 Статус разрешения:', currentPermission);
      
      if (currentPermission !== 'granted') {
        throw new Error('Вы не разрешили уведомления');
      }

      // Проверяем существующую подписку
      let subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        console.log('✅ Уже подписаны');
        setSubscriptionStatus('✅ Вы уже подписаны');
        setTimeout(() => setSubscriptionStatus(null), 3000);
        setIsSubscribing(false);
        return;
      }

      // Получаем VAPID ключ
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      console.log('🔑 VAPID ключ:', vapidPublicKey ? 'найден' : 'не найден');
      
      if (!vapidPublicKey) {
        throw new Error('VAPID ключ не настроен на сервере');
      }

      // Создаем подписку
      console.log('📡 Создание подписки...');
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });
      console.log('✅ Подписка создана');

      // Отправляем на сервер
      console.log('📤 Отправка подписки на сервер...');
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      const data = await response.json();
      console.log('📦 Ответ сервера:', data);
      
      if (response.ok) {
        setSubscriptionStatus('✅ Успешно подписаны!');
        setTimeout(() => setSubscriptionStatus(null), 3000);
      } else {
        throw new Error(data.error || 'Ошибка при сохранении подписки');
      }

    } catch (error) {
      console.error('❌ Ошибка подписки:', error);
      setSubscriptionStatus(`❌ ${error instanceof Error ? error.message : 'Ошибка'}`);
      setTimeout(() => setSubscriptionStatus(null), 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration('/notification-sw.js');
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
          
          // Уведомляем сервер
          await fetch('/api/notifications/subscribe', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: subscription.endpoint })
          });
          
          setPermission('default');
          setSubscriptionStatus('✅ Отписались от уведомлений');
          setTimeout(() => setSubscriptionStatus(null), 3000);
        }
      }
    } catch (error) {
      console.error('Ошибка отписки:', error);
      setSubscriptionStatus('❌ Ошибка при отписке');
      setTimeout(() => setSubscriptionStatus(null), 3000);
    }
  };

  if (!isSupported) {
    return (
      <div className="text-sm text-gray-400">
        Ваш браузер не поддерживает push-уведомления
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-300">
          Получайте уведомления о новых статьях и акциях
        </p>
        {subscriptionStatus && (
          <div className={`text-xs ${subscriptionStatus.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
            {subscriptionStatus}
          </div>
        )}
        {permission === 'granted' ? (
          <button
            onClick={handleUnsubscribe}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-all"
          >
            Отписаться
          </button>
        ) : (
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {isSubscribing ? 'Подписка...' : '🔔 Подписаться'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
      <div className="flex items-start gap-4">
        <div className="text-4xl">🔔</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Push-уведомления
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Подпишитесь на уведомления о новых статьях и статусе заявок
          </p>
          {permission === 'granted' ? (
            <button
              onClick={handleUnsubscribe}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-all"
            >
              Отписаться от уведомлений
            </button>
          ) : (
            <button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {isSubscribing ? 'Подписка...' : '🔔 Подписаться на уведомления'}
            </button>
          )}
          {subscriptionStatus && (
            <p className={`mt-2 text-sm ${subscriptionStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {subscriptionStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}