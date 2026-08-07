import Link from 'next/link'
import Image from 'next/image'
import { buildSnippetMetadata, COMPANY_ADDRESS_DISPLAY } from '../lib/seo'
import PageBreadcrumbs from '../components/PageBreadcrumbs'
import HomeAtAGlance from '../components/HomeAtAGlance'
import TechStackSection from '../components/TechStackSection'

export const metadata = buildSnippetMetadata('/about')

export default function AboutPage() {
  const approach = [
    {
      title: 'Офис',
      body: `${COMPANY_ADDRESS_DISPLAY}. Встречи по договорённости — бриф, договор, сдача.`,
    },
    {
      title: 'Инженерный delivery',
      body: 'Исследование, архитектура, разработка, проверка и релиз — в одной цепочке ответственности.',
    },
    {
      title: 'Рост после запуска',
      body: 'SEO, GEO, метрики и сопровождение: продукт развивается по данным эксплуатации.',
    },
    {
      title: 'Собственный код',
      body: 'Индивидуальная разработка на собственном коде — полный контроль над продуктом.',
    },
  ]

  const industries = [
    {
      title: 'Финансы и B2B',
      description: 'Корпоративные сайты, кабинеты и дашборды для финансового и делового сектора.',
    },
    {
      title: 'Медицина',
      description: 'Сайты клиник, запись на приём, лендинги услуг и сопровождение проектов.',
    },
    {
      title: 'Спорт и образование',
      description:
        'Сайты школ и спортивных организаций: расписание, тренеры, новости — кейсы Maxximum и Динамо-Витебск.',
    },
    {
      title: 'Автосервис и услуги',
      description:
        'Каталог услуг, прайс, онлайн-запись — Amba Detail, NEXTON, BMservice, ArtDetailing.',
    },
  ]

  const expertise = [
    {
      title: 'Веб-разработка',
      items: [
        'Next.js / React',
        'Angular / Vue / Svelte',
        'ASP.NET Core / C#',
        'Интернет-магазины и PWA',
      ],
    },
    {
      title: 'Мобильные продукты',
      items: ['iOS / Swift', 'Android / Kotlin', 'React Native', 'Flutter'],
    },
    {
      title: 'CRM и интеграции',
      items: ['Битрикс24', 'AmoCRM', 'Кастомные CRM', 'API'],
    },
    {
      title: 'ERP и учёт',
      items: ['1С интеграция', 'Кастомный учёт', 'Склад', 'Отчёты'],
    },
  ]

  const values = [
    {
      title: 'Качество',
      description:
        'Сдаём продукт после этапов тестирования и проверки сценариев — не раньше, чем он стабильно работает.',
    },
    {
      title: 'Надёжность',
      description:
        'Ответственность за результат: от договорённостей на старте до поддержки в эксплуатации.',
    },
    {
      title: 'Владение продуктом',
      description:
        'Индивидуальная разработка на собственном коде — полный контроль над продуктом.',
    },
    {
      title: 'Прозрачность',
      description:
        'Открыты на каждом этапе: аналитика, прототипы, спринты, приёмка и отчётность по развитию.',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'О нас', path: '/about' },
        ]}
      />

      <section className="pt-10 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-4">
              Компания
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight leading-tight">
              Инженерная компания
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              APSOD проектирует и выпускает сайты, приложения и digital-контуры для бизнеса:
              исследование, инженерия, безопасность, SEO и сопровождение. Офис:{' '}
              {COMPANY_ADDRESS_DISPLAY}.
            </p>
          </div>

          <div className="relative w-full max-w-5xl overflow-hidden aspect-[16/9] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-12">
            <Image
              src="/about/gallery/negotiation.jpg"
              alt="APSOD: встреча с клиентами — Дмитрий за MacBook Pro"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-w-4xl">
            {approach.map((point) => (
              <div
                key={point.title}
                className="bg-white dark:bg-gray-950 p-6 md:p-7"
              >
                <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                  {point.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeAtAGlance />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              Подход
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Строим digital как инфраструктуру бизнеса: сначала смысл и метрики, затем архитектура
              и инженерия, затем рост и сопровождение. Продукт остаётся под контролем заказчика.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 dark:bg-gray-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Экспертиза
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Практики, на которых строится delivery APSOD
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {expertise.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((feature) => (
                    <li
                      key={feature}
                      className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2"
                    >
                      <span className="h-px w-3 bg-slate-400 shrink-0" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechStackSection title="Технологический стек" />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Отрасли
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Отрасли, в которых мы запускаем и сопровождаем digital-продукты
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="bg-white dark:bg-gray-950 p-7 md:p-8"
              >
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {industry.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 dark:bg-gray-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Принципы
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              На чём строится каждый engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {values.map((value, idx) => (
              <div key={value.title}>
                <div className="font-display text-xs text-slate-400 mb-3 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              Обсудим задачу вашей компании
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Краткий бриф — коммерческое предложение с этапами, сроками и зоной ответственности.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="apsod-btn-solid inline-flex px-6 py-3 rounded-md text-sm font-semibold transition-colors"
              >
                Связаться с нами
              </Link>
              <Link
                href="/services"
                className="inline-flex px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 hover:border-slate-900 dark:hover:border-white transition-colors"
              >
                Смотреть услуги
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
