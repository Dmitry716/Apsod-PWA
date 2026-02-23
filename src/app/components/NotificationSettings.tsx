"use client";

import { useState } from "react";

export function NotificationSettings() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        🔔 Уведомления
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Получать уведомления
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              О новых статьях, статусе заявок и акциях
            </p>
          </div>
          
          <button
            className="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Включить
          </button>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
          ℹ️ Нажмите &quot;Включить&quot;, чтобы разрешить уведомления
        </div>

        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Какие уведомления мы отправляем?
          </button>
          
          {showTooltip && (
            <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
              <ul className="space-y-1 list-disc list-inside">
                <li>✍️ Новые статьи в блоге</li>
                <li>📊 Статус ваших заявок</li>
                <li>🎉 Специальные предложения</li>
                <li>🔔 Важные обновления</li>
              </ul>
              <div className="absolute left-4 top-full w-2 h-2 bg-gray-900 transform rotate-45"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}