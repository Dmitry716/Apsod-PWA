import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика обработки cookie | APSOD',
  description: 'Политика использования файлов cookie на сайте apsod.com в соответствии с законодательством Республики Беларусь.',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Политика обработки файлов cookie
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Настоящая Политика разработана в соответствии с требованиями Закона Республики Беларусь от 7 мая 2021 г. № 99-З «О защите персональных данных» и является обязательной мерой по обеспечению защиты персональных данных пользователей сайта apsod.com. [citation:1][citation:10]
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              1. Что такое файлы cookie?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Файлы cookie — это текстовые файлы, сохраняемые в интернет-браузере пользовательского устройства (компьютер, мобильный телефон и т.д.) при посещении интернет-сайтов для отражения и (или) запоминания действий пользователя. Cookie-файлы позволяют не вводить заново или выбирать те же параметры при повторном посещении Сайта. [citation:1][citation:4]
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              2. Категории обрабатываемых файлов cookie
            </h2>
            
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mt-6 mb-3">
              2.1. Необходимые (технические) файлы cookie
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Эти файлы cookie необходимы для обеспечения полноценного и корректного функционирования Сайта. Они обрабатываются независимо от предоставления пользователем согласия и не сохраняют сведений о пользователе. Отключение технических файлов cookie через настройки браузера может привести к некорректной работе Сайта. [citation:10]
            </p>

            <h3 className="text-xl font-medium text-gray-800 dark:text-white mt-6 mb-3">
              2.2. Функциональные (персонализированные) файлы cookie
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Обеспечивают сохранение индивидуальных настроек при использовании Сайта (например, версия для слабовидящих). Обрабатываются на основании согласия пользователя. [citation:10]
            </p>

            <h3 className="text-xl font-medium text-gray-800 dark:text-white mt-6 mb-3">
              2.3. Аналитические (статистические) файлы cookie
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Позволяют собирать статистику посещаемости страниц Сайта в целях повышения качества его функционирования. Для улучшения пользовательского опыта используются инструменты веб-аналитики, которые могут собирать обезличенную информацию о посещениях. Обрабатываются на основании согласия пользователя. [citation:10]
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              3. Сроки хранения файлов cookie
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Часть необходимых файлов cookie хранится в течение текущего сеанса и удаляется после закрытия браузера (сессионные cookie). Срок хранения остальных файлов cookie ограничен 1 годом с момента первого посещения сайта (постоянные cookie). [citation:1][citation:4]
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              4. Правовые основания обработки
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Необходимые файлы cookie обрабатываются на основании законного интереса Оператора в обеспечении функционирования Сайта. Функциональные и аналитические файлы cookie обрабатываются на основании согласия пользователя, которое запрашивается при первом посещении Сайта через информационный баннер. [citation:1][citation:10]
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              5. Управление файлами cookie
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Пользователь может изменить настройки использования файлов cookie, в том числе отозвать ранее предоставленное согласие на их обработку, в любое время в интерфейсе Сайта либо в настройках своего браузера. [citation:1]
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Подробнее с параметрами управления файлами cookie можно ознакомиться на официальных интернет-сайтах браузеров:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Apple Safari</li>
              <li>Microsoft Edge</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              6. Трансграничная передача
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              При использовании сторонних аналитических сервисов может осуществляться трансграничная передача обезличенных данных. Используемые сервисы обеспечивают надлежащий уровень защиты данных в соответствии с требованиями законодательства. [citation:1]
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Дата последнего обновления: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}