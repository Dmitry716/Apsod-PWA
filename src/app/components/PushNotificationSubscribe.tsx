"use client";

import { useState } from "react";

interface PushNotificationSubscribeProps {
  compact?: boolean;
}

export default function PushNotificationSubscribe({ compact = false }: PushNotificationSubscribeProps) {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    setSubscriptionStatus(null);

    try {
      // Проверка поддержки браузера
      if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker не поддерживается');
      }
      if (!('PushManager' in window)) {
        throw new Error('Push Manager не поддерживается');
      }

      console.log('📱 Регистрация Service Worker...');
      
      // Регистрируем Service Worker
      const registration = await navigator.serviceWorker.register('/notification-sw.js');
      await navigator.serviceWorker.ready;
      console.log('✅ Service Worker готов');

      // Запрашиваем разрешение
      console.log('🔔 Запрос разрешения...');
      const permission = await Notification.requestPermission();
      console.log('📊 Статус разрешения:', permission);
      
      if (permission !== 'granted') {
        throw new Error('Вы не разрешили уведомления');
      }

      // Получаем VAPID ключ
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      console.log('🔑 VAPID ключ:', vapidPublicKey ? 'найден' : 'не найден');
      
      if (!vapidPublicKey) {
        throw new Error('VAPID ключ не настроен на сервере');
      }

      // Конвертируем ключ
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

      // Создаем подписку
      console.log('📡 Создание подписки...');
      const subscription = await registration.pushManager.subscribe({
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
        <button
          onClick={handleSubscribe}
          disabled={isSubscribing}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {isSubscribing ? 'Подписка...' : '🔔 Подписаться'}
        </button>
      </div>
    );
  }

  // Полная версия
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
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {isSubscribing ? 'Подписка...' : '🔔 Подписаться'}
          </button>
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