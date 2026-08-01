import Link from 'next/link'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { buildServiceMetadata, SITE_URL } from '../../lib/seo'

export const metadata = buildServiceMetadata('pwa-development')

export default function PWADevelopmentPage() {
  const benefits = [
    {
      title: "Установка на устройство",
      description: "PWA можно установить на главный экран смартфона как нативное приложение — без магазинов приложений.",
      details: "Пользователь заходит на сайт, видит предложение установить приложение и добавляет иконку на рабочий стол в один клик."
    },
    {
      title: "Мгновенная загрузка",
      description: "PWA загружаются мгновенно даже при медленном интернете благодаря кэшированию ресурсов.",
      details: "Service Worker кэширует основные файлы при первом посещении, и при повторных заходах приложение открывается практически мгновенно."
    },
    {
      title: "Работа офлайн",
      description: "Приложение продолжает работать без интернета — пользователь может просматривать контент и заполнять формы.",
      details: "Даже при отсутствии сети пользователь видит закэшированные страницы и может взаимодействовать с приложением."
    },
    {
      title: "Push-уведомления",
      description: "Отправляйте уведомления пользователям как в нативных приложениях, повышая вовлеченность.",
      details: "Push-уведомления работают даже когда браузер закрыт, что позволяет возвращать пользователей на сайт."
    },
    {
      title: "Высокая производительность",
      description: "PWA работают быстрее обычных сайтов благодаря оптимизации и кэшированию.",
      details: "Использование Service Worker и современных веб-технологий обеспечивает плавную работу без задержек."
    },
    {
      title: "Автоматические обновления",
      description: "Пользователи всегда видят самую свежую версию без необходимости скачивать обновления.",
      details: "При каждом входе проверяется новая версия, и приложение обновляется автоматически в фоне."
    }
  ];

  const seoBenefits = [
    {
      title: "Индексируемость поисковиками",
      description: "В отличие от нативных приложений, PWA полностью индексируются Google и другими поисковыми системами. Весь контент доступен для поисковых роботов.",
    },
    {
      title: "Быстрый Core Web Vitals",
      description: "PWA по своей природе имеют отличные показатели LCP (загрузка контента), FID (интерактивность) и CLS (стабильность), что напрямую влияет на ранжирование в Google.",
    },
    {
      title: "Мобильный трафик",
      description: "Google отдает предпочтение сайтам, которые хорошо работают на мобильных устройствах. PWA идеально подходят для этого критерия.",
    },
    {
      title: "Повторные визиты",
      description: "Благодаря установке на главный экран и push-уведомлениям, PWA увеличивают количество повторных визитов, что улучшает поведенческие факторы.",
    },
    {
      title: "Единый URL",
      description: "У PWA один URL для всех платформ, что упрощает продвижение и сбор ссылочной массы, в отличие от нативных приложений.",
    },
    {
      title: "Шеринг контента",
      description: "Контентом PWA легко делиться через ссылки, что увеличивает естественные упоминания и ссылки на сайт.",
    }
  ];


  const useCases = [
    {
      title: "Интернет-магазины",
      description: "Быстрый доступ с телефона, сохранение корзины и push о статусе заказа — без обязательной публикации в сторах."
    },
    {
      title: "Новостные порталы",
      description: "Мгновенная загрузка статей и работа офлайн идеальны для чтения в метро или при плохом интернете."
    },
    {
      title: "Сервисы бронирования",
      description: "Push-уведомления о подтверждении брони и напоминания повышают лояльность клиентов."
    },
    {
      title: "Бизнес-дашборды",
      description: "Доступ к аналитике даже без интернета и мгновенное обновление данных при подключении."
    },
    {
      title: "Игры и развлечения",
      description: "Быстрый запуск с главного экрана как у нативных игр, но без скачивания из магазина."
    },
    {
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
    areaServed: { '@type': 'City', name: 'Minsk' },
    url: `${SITE_URL}/services/pwa-development`,
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ServiceBreadcrumbs service="pwa-development" />
      <SeoJsonLd data={serviceSchema} />
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200 dark:bg-cyan-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full "></span>
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
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Запросить консультацию
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
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-6 mt-6">
                <p className="text-slate-700 dark:text-slate-200 font-medium">
                  PWA подходит, когда нужен быстрый доступ с телефона, офлайн-сценарии и push — без
                  обязательной публикации в магазинах приложений.
                </p>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80 mb-4 text-center">
                PWA
              </p>
              <h3 className="text-2xl font-bold text-center mb-4">Одна кодовая база для платформ</h3>
              <p className="text-center text-white/90">
                Веб, мобильные устройства, планшеты и десктоп — в одном продуктовом контуре
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
            Когда нужна установка с сайта, офлайн-сценарии и push без обязательной публикации в сторах
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 transition-colors"
              >
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              PWA в экосистеме Google
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              В материалах Google Developers PWA описаны как практика для быстрых мобильных
              продуктов: установка с сайта, устойчивость к сети и понятные пользовательские сигналы.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Источник: Google Developers / Web Fundamentals
            </p>
          </div>
        </div>
      </section>

      {/* Для кого подходит PWA */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Для каких задач подходит PWA
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
            Обсудим PWA для вашей компании
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Краткий бриф — предложение по этапам, стеку и зоне ответственности
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
          >
            Получить консультацию
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
          <ServiceFaqBlock service="pwa-development" />
</div>
  )
}