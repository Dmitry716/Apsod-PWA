import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | APSOD',
  description: 'Политика конфиденциальности и обработки персональных данных ИП Карелин Д.В.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Политика конфиденциальности
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Настоящая Политика конфиденциальности персональных данных (далее – Политика конфиденциальности) 
              действует в отношении всей информации, которую ИП Карелин Д.В. (УНП 391853923) может получить 
              о пользователях во время использования ими сайта.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              1. Определение терминов
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              В настоящей Политике конфиденциальности используются следующие термины:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>«Администрация сайта» – ИП Карелин Д.В., уполномоченные сотрудники на управления сайтом, действующие от имени ИП Карелин Д.В.</li>
              <li>«Персональные данные» – любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу.</li>
              <li>«Конфиденциальность персональных данных» – обязательное для соблюдения Администрацией сайта требование не раскрывать третьим лицам и не распространять персональные данные без согласия пользователя.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              2. Общие положения
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Использование сайта означает безоговорочное согласие пользователя с настоящей Политикой 
              конфиденциальности и указанными в ней условиями обработки его персональной информации. 
              В случае несогласия с этими условиями пользователь должен воздержаться от использования сайта.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              3. Предмет политики конфиденциальности
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Настоящая Политика конфиденциальности устанавливает обязательства Администрации сайта по 
              неразглашению и обеспечению режима защиты конфиденциальности персональных данных, которые 
              пользователь предоставляет при заполнении форм обратной связи.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              4. Цели сбора персональной информации пользователей
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Администрация сайта может использовать персональные данные пользователя в целях:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Установления с пользователем обратной связи</li>
              <li>Предоставления пользователю эффективной клиентской и технической поддержки</li>
              <li>Предоставления доступа пользователю на сайты или сервисы партнеров с целью получения продуктов, обновлений и услуг</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              5. Реквизиты ИП
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
              <p className="text-gray-800 dark:text-white font-medium">Индивидуальный предприниматель Карелин Дмитрий Владимирович</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">УНП 391853923</p>
              <p className="text-gray-600 dark:text-gray-300">Дата регистрации: 15.03.2018</p>
              <p className="text-gray-600 dark:text-gray-300">Адрес: г. Витебск, ул. Ленина, 1</p>
              <p className="text-gray-600 dark:text-gray-300">Email: info@apsod.com</p>
              <p className="text-gray-600 dark:text-gray-300">Тел.: +375 (29) 123-45-67</p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Дата последнего обновления: 21 февраля 2026 года
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 mt-4 hover:underline"
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