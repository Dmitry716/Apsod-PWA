import Link from 'next/link'
import { buildSnippetMetadata } from '../lib/seo'

export const metadata = buildSnippetMetadata('/about')

export default function AboutPage() {
  const stats = [
    { value: '15+', label: 'лет в digital', icon: '⏳' },
    { value: '350+', label: 'реальных кейсов', icon: '🚀' },
    { value: 'полный цикл', label: 'от аналитики до поддержки', icon: '🧭' },
    { value: '100%', label: 'уникальный код', icon: '🔒' },
  ]

  const industries = [
    {
      title: 'Экономика и финансы',
      icon: '📊',
      description: 'Корпоративные сайты, кабинеты и дашборды для финансового и B2B-сектора.',
      color: 'from-emerald-500 to-teal-500',
      projects: 'Направление',
      features: ['Корпоративные сайты', 'Личные кабинеты', 'Аналитика', 'Интеграции']
    },
    {
      title: 'Медицина и здравоохранение',
      icon: '🏥',
      description: 'Сайты клиник, запись на приём, лендинги услуг и сопровождение проектов.',
      color: 'from-blue-500 to-cyan-500',
      projects: 'Направление',
      features: ['Сайты клиник', 'Онлайн-запись', 'Лендинги услуг', 'SEO']
    },
    {
      title: 'Спорт и образование',
      icon: '🏋️',
      description: 'Сайты школ и спортивных организаций: расписание, тренеры, новости — как у Maxximum и Динамо-Витебск.',
      color: 'from-green-500 to-lime-500',
      projects: 'Кейсы РБ',
      features: ['Расписание', 'Блог', 'Запись', 'Мобильная вёрстка']
    },
    {
      title: 'Автосервис и ритейл услуг',
      icon: '🔧',
      description: 'Сайты автосервисов и услуг населению: каталог услуг, прайс, онлайн-запись — Amba Detail, NEXTON, BMservice, ArtDetailing.',
      color: 'from-orange-500 to-amber-500',
      projects: 'Кейсы РБ',
      features: ['Услуги и прайс', 'Онлайн-запись', 'SEO', 'Скорость']
    }
  ]

  const expertise = [
    {
      title: 'Веб-разработка',
      items: ['Корпоративные сайты', 'Интернет-магазины', 'Веб-порталы', 'SPA приложения', 'PWA'],
      icon: '🌐',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Мобильные приложения',
      items: ['iOS', 'Android', 'React Native', 'Flutter', 'Кроссплатформенные'],
      icon: '📱',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'CRM системы',
      items: ['Битрикс24', 'AmoCRM', 'Кастомные CRM', 'Интеграции с сайтом'],
      icon: '🤝',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'ERP и учёт',
      items: ['1С интеграция', 'Кастомный учёт', 'Склад', 'Отчёты'],
      icon: '⚙️',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const values = [
    {
      title: 'Качество',
      description: 'Мы не сдаем проекты, пока они не пройдут все этапы тестирования и не будут идеально работать.',
      icon: '✨'
    },
  {
    title: 'Надежность',
    description:
      '15 лет в digital и ответственность за результат: от договорённостей на старте до поддержки после запуска.',
    icon: '🔒'
  },
  {
    title: 'Уникальность',
    description:
      'Только индивидуальная разработка. Конструкторы и типовые шаблоны сознательно исключены.',
    icon: '💡'
  },
  {
    title: 'Прозрачность',
    description:
      'Открыты на каждом этапе: аналитика, прототипы, спринты, приёмка и отчётность по развитию.',
    icon: '🔍'
  }
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              О{' '}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                компании
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              APSOD — профессиональная команда, которая выстраивает бизнес в интернете: от аналитики
              и стратегии до уникальной безопасной разработки, SEO и сопровождения. Только
              индивидуальные продукты на уникальном коде. С конструкторами сайтов не работаем. ИП в
              Витебске, проекты — удалённо по РБ, РФ и миру.
            </p>
            
            {/* Статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Миссия */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Наша миссия
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Создавать технологии, которые реально работают и приносят пользу бизнесу. Мы объединяем 15-летнюю экспертизу в разработке с пониманием специфики разных отраслей, чтобы предлагать решения, которые действительно решают задачи клиентов.
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Экспертиза */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Наша экспертиза
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Мы работаем на всех популярных платформах и технологиях
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="p-6">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <ul className="space-y-2">
                    {item.items.map((feature, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отрасли */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Отраслевая экспертиза
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Мы работаем с разными секторами экономики, создавая решения под их уникальные задачи
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{industry.icon}</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm rounded-full">
                      {industry.projects}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {industry.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {industry.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ценности */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Наши ценности
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Принципы, которые мы не нарушаем уже 15 лет
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Готовы к сотрудничеству?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к 350+ компаниям, которые доверили нам свои проекты
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
  )
}