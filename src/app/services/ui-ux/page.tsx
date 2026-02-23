import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UI/UX дизайн | Разработка интерфейсов | APSOD',
  description: 'Профессиональный UI/UX дизайн сайтов и мобильных приложений. Создаем удобные и красивые интерфейсы, которые повышают конверсию.',
  keywords: 'ui ux дизайн, проектирование интерфейсов, дизайн сайтов, дизайн приложений, figma, прототипирование',
}

export default function UIUXPage() {
  const services = [
    {
      title: "UX-исследования",
      description: "Анализ целевой аудитории, CJM, глубинное интервью, юзабилити-тестирование",
      icon: "🔍"
    },
    {
      title: "Прототипирование",
      description: "Создание интерактивных прототипов для тестирования гипотез и согласования с заказчиком",
      icon: "📐"
    },
    {
      title: "UI-дизайн",
      description: "Разработка визуального стиля: цветовые схемы, типографика, иконки, иллюстрации",
      icon: "🎨"
    },
    {
      title: "Дизайн-системы",
      description: "Создание библиотек компонентов для масштабирования и единого стиля",
      icon: "🧩"
    },
    {
      title: "Адаптивный дизайн",
      description: "Дизайн для всех устройств: десктоп, планшеты, мобильные телефоны",
      icon: "📱"
    },
    {
      title: "Анимация интерфейсов",
      description: "Микро-анимации, переходы, интерактивные элементы для оживления интерфейса",
      icon: "✨"
    }
  ];

  const process = [
    {
      step: "Исследование",
      description: "Изучаем бизнес-цели, целевую аудиторию, анализируем конкурентов",
      icon: "📊"
    },
    {
      step: "Прототипирование",
      description: "Создаем структуру и логику интерфейса, утверждаем с заказчиком",
      icon: "📝"
    },
    {
      step: "Визуальный дизайн",
      description: "Разрабатываем стиль, отрисовываем все экраны и состояния",
      icon: "🎨"
    },
    {
      step: "Передача в разработку",
      description: "Готовим макеты, спецификации и ресурсы для разработчиков",
      icon: "⚙️"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Дизайн, который продает
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              UI/UX{' '}
              <span className="text-blue-600 dark:text-blue-400">
                дизайн
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Создаем удобные и красивые интерфейсы, которые повышают конверсию и лояльность пользователей
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Заказать дизайн
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Наши работы
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Что такое UI/UX */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Что такое{' '}
                <span className="text-blue-600 dark:text-blue-400">UI/UX дизайн</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                <strong>UX (User Experience)</strong> — это то, как пользователь взаимодействует с продуктом. Мы проектируем логику, структуру и сценарии, чтобы пользователю было удобно и понятно.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                <strong>UI (User Interface)</strong> — это визуальное воплощение: цвета, шрифты, иконки, кнопки, анимация. Мы создаем красивый и современный дизайн, который отражает ваш бренд.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Вместе UI и UX создают продукт, которым приятно пользоваться и который решает задачи бизнеса.
              </p>
            </div>
            <div className="bg-linear-to-br from-pink-400 to-purple-500 rounded-2xl p-8 text-white">
              <div className="text-7xl mb-4 text-center">🎨✨</div>
              <h3 className="text-2xl font-bold text-center mb-4">Красиво и удобно</h3>
              <p className="text-center text-white/90">
                Дизайн, который нравится пользователям и повышает продажи
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Наши услуги */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Что мы делаем
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Полный цикл дизайна от исследования до готовых макетов
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Процесс работы */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Как мы работаем
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.step}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Почему дизайн важен */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Почему дизайн важен для бизнеса
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Рост конверсии</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Хороший дизайн повышает конверсию до 200% за счет понятного интерфейса и удобства использования.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Лояльность</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Пользователи возвращаются к продуктам, которыми приятно пользоваться.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Преимущество</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Выделяйтесь среди конкурентов современным и качественным дизайном.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Хотите крутой дизайн?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Расскажите о вашем проекте, и мы создадим дизайн, который понравится пользователям
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Обсудить проект
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}