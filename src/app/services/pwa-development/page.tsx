import Link from 'next/link'
import SeoJsonLd from '../../components/SeoJsonLd'
import { buildServiceMetadata, SITE_URL } from '../../lib/seo'

export const metadata = buildServiceMetadata('pwa-development')

export default function PWADevelopmentPage() {
  const benefits = [
    {
      icon: "📱",
      title: "Установка на устройство",
      description: "PWA можно установить на главный экран смартфона как нативное приложение — без магазинов приложений.",
      details: "Пользователь заходит на сайт, видит предложение установить приложение и добавляет иконку на рабочий стол в один клик."
    },
    {
      icon: "⚡",
      title: "Мгновенная загрузка",
      description: "PWA загружаются мгновенно даже при медленном интернете благодаря кэшированию ресурсов.",
      details: "Service Worker кэширует основные файлы при первом посещении, и при повторных заходах приложение открывается практически мгновенно."
    },
    {
      icon: "📴",
      title: "Работа офлайн",
      description: "Приложение продолжает работать без интернета — пользователь может просматривать контент и заполнять формы.",
      details: "Даже при отсутствии сети пользователь видит закэшированные страницы и может взаимодействовать с приложением."
    },
    {
      icon: "🔔",
      title: "Push-уведомления",
      description: "Отправляйте уведомления пользователям как в нативных приложениях, повышая вовлеченность.",
      details: "Push-уведомления работают даже когда браузер закрыт, что позволяет возвращать пользователей на сайт."
    },
    {
      icon: "🚀",
      title: "Высокая производительность",
      description: "PWA работают быстрее обычных сайтов благодаря оптимизации и кэшированию.",
      details: "Использование Service Worker и современных веб-технологий обеспечивает плавную работу без задержек."
    },
    {
      icon: "🔄",
      title: "Автоматические обновления",
      description: "Пользователи всегда видят самую свежую версию без необходимости скачивать обновления.",
      details: "При каждом входе проверяется новая версия, и приложение обновляется автоматически в фоне."
    }
  ];

  const seoBenefits = [
    {
      title: "Индексируемость поисковиками",
      description: "В отличие от нативных приложений, PWA полностью индексируются Google и другими поисковыми системами. Весь контент доступен для поисковых роботов.",
      icon: "🔍"
    },
    {
      title: "Быстрый Core Web Vitals",
      description: "PWA по своей природе имеют отличные показатели LCP (загрузка контента), FID (интерактивность) и CLS (стабильность), что напрямую влияет на ранжирование в Google.",
      icon: "📊"
    },
    {
      title: "Мобильный трафик",
      description: "Google отдает предпочтение сайтам, которые хорошо работают на мобильных устройствах. PWA идеально подходят для этого критерия.",
      icon: "📱"
    },
    {
      title: "Повторные визиты",
      description: "Благодаря установке на главный экран и push-уведомлениям, PWA увеличивают количество повторных визитов, что улучшает поведенческие факторы.",
      icon: "🔄"
    },
    {
      title: "Единый URL",
      description: "У PWA один URL для всех платформ, что упрощает продвижение и сбор ссылочной массы, в отличие от нативных приложений.",
      icon: "🔗"
    },
    {
      title: "Шеринг контента",
      description: "Контентом PWA легко делиться через ссылки, что увеличивает естественные упоминания и ссылки на сайт.",
      icon: "📤"
    }
  ];

  const comparisons = [
    {
      aspect: "Установка",
      pwa: "По ссылке, 1 клик",
      native: "Через App Store / Google Play",
      web: "Не устанавливается"
    },
    {
      aspect: "Обновления",
      pwa: "Автоматические, мгновенные",
      native: "Через магазин, нужно скачивать",
      web: "Автоматические при загрузке"
    },
    {
      aspect: "Работа офлайн",
      pwa: "✅ Полная поддержка",
      native: "✅ Полная поддержка",
      web: "❌ Требуется интернет"
    },
    {
      aspect: "Push-уведомления",
      pwa: "✅ Поддерживаются",
      native: "✅ Поддерживаются",
      web: "❌ Только через email/SMS"
    },
    {
      aspect: "SEO",
      pwa: "✅ Отличная индексация",
      native: "❌ Не индексируются",
      web: "✅ Отличная индексация"
    },
    {
      aspect: "Видимость в магазинах",
      pwa: "❌ Не требует магазинов",
      native: "✅ Есть в каталогах",
      web: "❌ Нет"
    },
    {
      aspect: "Стоимость разработки",
      pwa: "💰 1 кодовая база",
      native: "💰💰💰 iOS + Android отдельно",
      web: "💰💰 Только веб"
    },
    {
      aspect: "Доступ к устройству",
      pwa: "Ограниченный (камера, гео, уведомления)",
      native: "✅ Полный доступ",
      web: "Ограниченный"
    }
  ];

  const useCases = [
    {
      icon: "🛍️",
      title: "Интернет-магазины",
      description: "PWA для e-commerce показывают конверсию на 36% выше обычных сайтов благодаря скорости и удобству."
    },
    {
      icon: "📰",
      title: "Новостные порталы",
      description: "Мгновенная загрузка статей и работа офлайн идеальны для чтения в метро или при плохом интернете."
    },
    {
      icon: "🏨",
      title: "Сервисы бронирования",
      description: "Push-уведомления о подтверждении брони и напоминания повышают лояльность клиентов."
    },
    {
      icon: "📊",
      title: "Бизнес-дашборды",
      description: "Доступ к аналитике даже без интернета и мгновенное обновление данных при подключении."
    },
    {
      icon: "🎮",
      title: "Игры и развлечения",
      description: "Быстрый запуск с главного экрана как у нативных игр, но без скачивания из магазина."
    },
    {
      icon: "🏦",
      title: "Банкинг и финансы",
      description: "Быстрый доступ к балансу и операциям, push-уведомления о транзакциях, повышенная безопасность."
    }
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'PWA разработка',
    description: 'Разработка прогрессивных веб-приложений: установка на устройство, работа офлайн, push-уведомления.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Belarus' },
    url: `${SITE_URL}/services/pwa-development`,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: 'PWA разработка', item: `${SITE_URL}/services/pwa-development` },
    ],
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SeoJsonLd data={[serviceSchema, breadcrumbSchema]} />
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
              Прогрессивные веб-приложения
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              PWA{' '}
              <span className="text-blue-600 dark:text-blue-400">
                разработка
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Создаем приложения, которые работают как нативные, но распространяются как веб-сайты
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Заказать PWA
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

      {/* Что такое PWA */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Что такое{' '}
                <span className="text-blue-600 dark:text-blue-400">PWA</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Progressive Web App (PWA) — это технология, которая объединяет лучшие качества веб-сайтов и нативных мобильных приложений.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                PWA можно установить на телефон как обычное приложение, они работают без интернета, отправляют push-уведомления и загружаются мгновенно. При этом пользователю не нужно идти в App Store или Google Play — достаточно просто открыть сайт.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mt-6">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  📊 По данным Google, компании, внедрившие PWA, отмечают рост конверсии до 36% и увеличение трафика на 50%.
                </p>
              </div>
            </div>
            <div className="bg-linear-to-br from-blue-400 to-purple-500 rounded-2xl p-8 text-white">
              <div className="text-7xl mb-4 text-center">📱💻</div>
              <h3 className="text-2xl font-bold text-center mb-4">Одна кодовая база для всех платформ</h3>
              <p className="text-center text-white/90">
                Веб, мобильные устройства, планшеты, десктоп — всё в одном проекте
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества PWA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Преимущества PWA
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Почему Progressive Web Apps — идеальный выбор для современного бизнеса
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{benefit.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{benefit.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Влияние на SEO */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Влияние PWA на <span className="text-blue-600 dark:text-blue-400">SEO</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Как PWA помогает продвижению сайта в поисковых системах
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seoBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Google официально рекомендует PWA</h3>
            <p className="text-white/90 mb-4">
              В официальных руководствах Google PWA рассматриваются как лучшая практика для мобильных сайтов. 
              Они получают преимущество в ранжировании благодаря высокой скорости и хорошим пользовательским сигналам.
            </p>
            <p className="text-white/80 text-sm">
              Источник: Google Developers / Web Fundamentals
            </p>
          </div>
        </div>
      </section>

      {/* Сравнение PWA, нативных и обычных сайтов */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Сравнение технологий
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="p-4 text-left text-gray-900 dark:text-white font-semibold">Критерий</th>
                  <th className="p-4 text-center text-gray-900 dark:text-white font-semibold bg-blue-50 dark:bg-blue-900/30">PWA</th>
                  <th className="p-4 text-center text-gray-900 dark:text-white font-semibold">Нативное приложение</th>
                  <th className="p-4 text-center text-gray-900 dark:text-white font-semibold">Обычный сайт</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{item.aspect}</td>
                    <td className="p-4 text-center text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30">
                      {item.pwa}
                    </td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-300">{item.native}</td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-300">{item.web}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Для кого подходит PWA */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Для каких проектов идеально подходит PWA
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Реальные примеры использования Progressive Web Apps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Технический стек */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Технологии, которые мы используем
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Современный стек для создания быстрых и надежных PWA
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Next.js", desc: "React фреймворк с PWA модулем" },
              { name: "Service Workers", desc: "Кэширование и офлайн-режим" },
              { name: "Web App Manifest", desc: "Настройка установки" },
              { name: "IndexedDB", desc: "Хранение данных офлайн" },
              { name: "Push API", desc: "Уведомления" },
              { name: "Workbox", desc: "Библиотека от Google" },
              { name: "TypeScript", desc: "Типизация и надежность" },
              { name: "Tailwind CSS", desc: "Быстрая стилизация" }
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md"
              >
                <div className="font-semibold text-gray-900 dark:text-white">{tech.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Кейсы/Статистика */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Результаты внедрения PWA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">36%</div>
              <p className="text-white/80">рост конверсии</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">50%</div>
              <p className="text-white/80">увеличение трафика</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">2.5x</div>
              <p className="text-white/80">выше вовлеченность</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">80%</div>
              <p className="text-white/80">экономия на разработке</p>
            </div>
          </div>
          <p className="text-center text-white/70 text-sm mt-8">
            *По данным Google и Smashing Magazine
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Часто задаваемые вопросы о PWA
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "PWA работает на iPhone?",
                a: "Да, начиная с iOS 11.3, Safari поддерживает PWA. Пользователи могут добавить сайт на главный экран через меню 'Поделиться'."
              },
              {
                q: "Можно ли опубликовать PWA в App Store и Google Play?",
                a: "Да, Google Play поддерживает установку PWA напрямую. Для App Store можно упаковать PWA в оболочку (Trusted Web Activity) и опубликовать как обычное приложение."
              },
              {
                q: "Сложно ли превратить существующий сайт в PWA?",
                a: "В большинстве случаев это требует добавления Service Worker и манифеста. Мы можем оценить ваш проект и предложить оптимальный план работ."
              },
              {
                q: "Какие браузеры поддерживают PWA?",
                a: "Chrome, Firefox, Safari (с iOS 11.3+), Edge, Opera и современные мобильные браузеры. Поддержка постоянно расширяется."
              },
              {
                q: "Сколько стоит разработка PWA?",
                a: "Стоимость зависит от сложности проекта. PWA обычно на 30-50% дешевле разработки двух нативных приложений (iOS + Android)."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Хотите обсудить PWA-проект?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Расскажите нам о ваших задачах, и мы разработаем PWA, которое превзойдет ожидания
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl"
          >
            Получить консультацию
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}