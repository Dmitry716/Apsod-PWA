import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | APSOD',
  description: 'Политика конфиденциальности и обработки персональных данных ИП Карелин Д.В. в соответствии с Законом РБ № 99-З «О защите персональных данных».',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Политика конфиденциальности
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Настоящая Политика конфиденциальности разработана в соответствии с требованиями Закона Республики Беларусь от 7 мая 2021 г. № 99-З «О защите персональных данных» (далее – Закон) и определяет порядок обработки персональных данных пользователей сайта apsod.com (далее – Сайт), владельцем которого является Индивидуальный предприниматель Карелин Дмитрий Васильевич (далее – Оператор). [citation:1][citation:10]
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              1. Общие положения
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Издание настоящей Политики является одной из принимаемых Оператором мер по обеспечению защиты персональных данных, предусмотренных статьей 17 Закона. Политика разъясняет пользователям Сайта, как, для каких целей и на каком правовом основании их персональные данные собираются, используются или иным образом обрабатываются. [citation:1]
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              2. Состав персональных данных
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Оператор может обрабатывать следующие персональные данные пользователей:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>фамилия, имя, отчество;</li>
              <li>номер контактного телефона;</li>
              <li>адрес электронной почты;</li>
              <li>наименование организации (при наличии);</li>
              <li>содержание обращений и запросов.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              3. Цели обработки персональных данных
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Оператор обрабатывает персональные данные пользователей в следующих целях:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>установление и поддержание связи с пользователем;</li>
              <li>предоставление информации об услугах Оператора;</li>
              <li>обработка заявок и запросов пользователей;</li>
              <li>заключение и исполнение договоров;</li>
              <li>направление информационных и маркетинговых сообщений (при наличии согласия).</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              4. Правовые основания обработки персональных данных
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Обработка персональных данных осуществляется на следующих правовых основаниях:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Конституция Республики Беларусь;</li>
              <li>Закон Республики Беларусь от 7 мая 2021 г. № 99-З «О защите персональных данных»;</li>
              <li>согласие пользователя на обработку персональных данных;</li>
              <li>договоры, заключаемые между Оператором и пользователем.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              5. Сроки обработки и хранения персональных данных
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Обработка персональных данных осуществляется в сроки, необходимые для достижения целей обработки, либо в течение сроков, установленных законодательством Республики Беларусь. Персональные данные, срок обработки которых истек, подлежат удалению или обезличиванию.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              6. Права субъектов персональных данных
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              В соответствии со статьей 11 Закона пользователь имеет право:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>отозвать согласие на обработку персональных данных;</li>
              <li>получать информацию, касающуюся обработки своих персональных данных;</li>
              <li>требовать внесения изменений в свои персональные данные;</li>
              <li>получать информацию о предоставлении своих персональных данных третьим лицам;</li>
              <li>требовать прекращения обработки персональных данных и их удаления;</li>
              <li>обжаловать действия Оператора в уполномоченный орган по защите прав субъектов персональных данных.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              7. Контактная информация
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
              <p className="text-gray-800 dark:text-white font-medium">Индивидуальный предприниматель Карелин Дмитрий Васильевич</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">УНП 391853923</p>
              <p className="text-gray-600 dark:text-gray-300">Адрес: г. Минск, ул.Фрунзе 9</p>
              <p className="text-gray-600 dark:text-gray-300">Email: karelin@apsod.com</p>
              <p className="text-gray-600 dark:text-gray-300">Тел.: +375 (44) 577-77-24</p>
            </div>

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