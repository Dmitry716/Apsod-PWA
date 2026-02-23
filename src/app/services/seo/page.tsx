import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO продвижение | Вывод в топ | APSOD',
  description: 'Профессиональное SEO продвижение сайтов. Выводим в топ поисковых систем, увеличиваем трафик и продажи. Аудит, оптимизация, работа с контентом.',
  keywords: 'seo продвижение, раскрутка сайта, вывод в топ, поисковая оптимизация, seo аудит, продвижение в яндексе, продвижение в google',
}

export default function SEOPage() {
  const benefits = [
    {
      title: "Увеличение трафика",
      description: "Рост поискового трафика до 500% за счет вывода в топ по целевым запросам.",
      icon: "📈"
    },
    {
      title: "Целевые посетители",
      description: "Привлекаем пользователей, которые уже ищут ваши товары или услуги.",
      icon: "🎯"
    },
    {
      title: "Долгосрочный результат",
      description: "В отличие от рекламы, SEO работает годами без постоянных вложений.",
      icon: "⏳"
    },
    {
      title: "Доверие пользователей",
      description: "Топ-позиции в поиске воспринимаются как знак качества и надежности.",
      icon: "🤝"
    },
    {
      title: "Рост бренда",
      description: "Постоянное присутствие в поиске повышает узнаваемость вашего бренда.",
      icon: "🏆"
    },
    {
      title: "Аналитика",
      description: "Прозрачная отчетность по позициям, трафику и конверсиям.",
      icon: "📊"
    }
  ];

  const services = [
    {
      title: "SEO-аудит",
      description: "Полный анализ сайта: технические ошибки, контент, ссылочная масса, юзабилити.",
      price: "от 800 BYN"
    },
    {
      title: "Техническая оптимизация",
      description: "Исправление ошибок, улучшение скорости загрузки, настройка индексации.",
      price: "от 1500 BYN"
    },
    {
      title: "Сбор семантики",
      description: "Составление полного ядра поисковых запросов, кластеризация.",
      price: "от 500 BYN"
    },
    {
      title: "Оптимизация контента",
      description: "Написание SEO-текстов, оптимизация мета-тегов, работа с контентом.",
      price: "от 1000 BYN"
    },
    {
      title: "Ссылочное продвижение",
      description: "Наращивание качественной ссылочной массы на естественных площадках.",
      price: "индивидуально"
    },
    {
      title: "Комплексное SEO",
      description: "Полный комплекс работ по продвижению сайта под ключ.",
      price: "от 3000 BYN/мес"
    }
  ];

  const advantages = [
    {
      title: "Безопасные методы",
      description: "Используем только белые методы продвижения, рекомендованные поисковиками.",
      icon: "🛡️"
    },
    {
      title: "Прозрачная отчетность",
      description: "Регулярные отчеты по позициям, трафику и достигнутым результатам.",
      icon: "📋"
    },
    {
      title: "Индивидуальный подход",
      description: "Разрабатываем стратегию под ваш бизнес, а не используем шаблоны.",
      icon: "🎯"
    },
    {
      title: "Работа с конверсией",
      description: "Оптимизируем не только трафик, но и конверсию в заявки и продажи.",
      icon: "💰"
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
              Выводим в топ поисковых систем
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              SEO{' '}
              <span className="text-blue-600 dark:text-blue-400">
                продвижение
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Привлекайте целевых клиентов из поисковых систем и увеличивайте продажи без постоянных затрат на рекламу
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Заказать SEO
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Наши кейсы
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Что такое SEO */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Что такое{' '}
                <span className="text-blue-600 dark:text-blue-400">SEO</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                SEO (Search Engine Optimization) — это комплекс мер по оптимизации сайта для поисковых систем, направленный на вывод сайта в топ выдачи по целевым запросам.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                В отличие от контекстной рекламы, где вы платите за каждый клик, SEO приносит бесплатный трафик из поиска. Результаты SEO сохраняются надолго и работают даже после завершения работ.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mt-6">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  📊 Первое место в поиске получает около 30% всех кликов. В топ-3 уходит более 60% трафика.
                </p>
              </div>
            </div>
            <div className="bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-white">
              <div className="text-7xl mb-4 text-center">📈🔝</div>
              <h3 className="text-2xl font-bold text-center mb-4">Будьте в топе</h3>
              <p className="text-center text-white/90">
                Первые позиции в поиске — первые продажи в бизнесе
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества SEO */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Почему стоит инвестировать в SEO
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Долгосрочные результаты и окупаемость
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Наши услуги по SEO */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Наши услуги по SEO
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Комплексный подход к продвижению
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{service.description}</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Наши преимущества */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Почему выбирают нас
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-3">{advantage.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{advantage.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Этапы работы */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Этапы продвижения
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Аудит</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Анализ текущего состояния</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Семантика</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Сбор и кластеризация запросов</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Оптимизация</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Техническая и контентная</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-3">
                4
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Наращивание</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ссылочная масса</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-3">
                5
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Аналитика</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Отслеживание результатов</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Хотите в топ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Проведем аудит, составим стратегию и выведем ваш сайт в лидеры поиска
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Получить консультацию
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}