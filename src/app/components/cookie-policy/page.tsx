import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика обработки cookie | APSOD',
  description: 'Информация об использовании файлов cookie на сайте APSOD',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Политика обработки файлов cookie
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4 mb-4">
              Что такое cookie?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Cookie — это небольшие текстовые файлы, которые сайт сохраняет на вашем устройстве. 
              Они помогают сайту запомнить информацию о вас, например, языковые предпочтения или 
              настройки темы, чтобы сделать ваш следующий визит более удобным.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              Какие cookie мы используем?
            </h2>
            
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mt-6 mb-3">
              Необходимые cookie
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Эти cookie необходимы для работы сайта и не могут быть отключены. Они обеспечивают 
              базовые функции, такие как безопасность и доступность сайта.
            </p>

            <h3 className="text-xl font-medium text-gray-800 dark:text-white mt-6 mb-3">
              Функциональные cookie
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Эти cookie позволяют сайту запоминать ваши предпочтения (например, тему сайта) 
              и предоставлять расширенные функции.
            </p>

            <h3 className="text-xl font-medium text-gray-800 dark:text-white mt-6 mb-3">
              Аналитические cookie
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Мы используем эти cookie для сбора анонимной статистики о посещаемости сайта, 
              чтобы улучшать его работу и контент.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              Как управлять cookie?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Вы можете управлять cookie через настройки вашего браузера. Большинство браузеров 
              позволяют:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Просматривать сохраненные cookie</li>
              <li>Удалять отдельные cookie или все сразу</li>
              <li>Блокировать cookie с определенных сайтов</li>
              <li>Запретить сохранение cookie</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              Согласие на использование cookie
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              При первом посещении сайта мы показываем уведомление о использовании cookie. 
              Продолжая использовать сайт, вы соглашаетесь с нашей политикой обработки cookie.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Ваши права
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Вы можете в любой момент отозвать свое согласие на использование cookie, 
                очистив кэш браузера или изменив настройки cookie в вашем браузере.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link 
                href="/" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← Вернуться на главную
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}