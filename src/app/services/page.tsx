import Link from 'next/link'
import SeoJsonLd from '../components/SeoJsonLd'
import PageBreadcrumbs from '../components/PageBreadcrumbs'
import {
  buildSnippetMetadata,
  generateItemListSchema,
  SITE_URL,
} from '../lib/seo'

export const metadata = buildSnippetMetadata('/services')

type ServiceCard = {
  title: string
  description: string
  link: string
}

const GROUPS: {
  id: string
  title: string
  subtitle: string
  items: ServiceCard[]
}[] = [
  {
    id: 'build',
    title: 'Разработка',
    subtitle:
      'Проектируем и выпускаем digital-продукты на собственном коде — под задачи компании и дальнейший рост.',
    items: [
      {
        title: 'Веб-разработка',
        description:
          'Корпоративные сайты и лендинги: исследование, архитектура, собственный код и запуск.',
        link: '/services/web-development',
      },
      {
        title: 'Интернет-магазин',
        description:
          'Каталог, корзина, оплата, доставка и админка — витрина продаж на уникальном коде.',
        link: '/services/ecommerce',
      },
      {
        title: 'Мобильные приложения',
        description:
          'Хабы iOS и Android: от MVP до публикации в App Store и Google Play.',
        link: '/services/mobile-development',
      },
      {
        title: 'Приложения для iOS',
        description:
          'Swift / React Native под iPhone 17 Pro Max и экосистему Apple.',
        link: '/services/ios-apps',
      },
      {
        title: 'Приложения для Android',
        description:
          'Kotlin / React Native под Google Play и устройства Samsung-класса.',
        link: '/services/android-apps',
      },
      {
        title: 'PWA',
        description:
          'Прогрессивные веб-приложения: установка с сайта, офлайн-сценарии и push-уведомления.',
        link: '/services/pwa-development',
      },
      {
        title: 'UI/UX дизайн',
        description:
          'Исследование, прототипы и дизайн-система под сценарии пользователя и цели бизнеса.',
        link: '/services/ui-ux',
      },
    ],
  },
  {
    id: 'growth',
    title: 'Продвижение',
    subtitle:
      'Поиск и нейросети: трафик, видимость бренда и измеримый рост заявок.',
    items: [
      {
        title: 'SEO-продвижение',
        description:
          'Яндекс и Google: аудит, семантика, техника, контент и регулярная отчётность.',
        link: '/services/seo',
      },
      {
        title: 'GEO в нейросетях',
        description:
          'Видимость в ответах AI: структура контента, экспертность, мониторинг и итерации.',
        link: '/services/geo-promotion',
      },
    ],
  },
  {
    id: 'run',
    title: 'Сопровождение',
    subtitle:
      'После запуска: стабильность, интеграции и развитие продукта по данным эксплуатации.',
    items: [
      {
        title: 'Техподдержка',
        description:
          'Мониторинг, обновления, резервное копирование и доработки на согласованных условиях.',
        link: '/services/technical-support',
      },
      {
        title: 'CRM',
        description:
          'Внедрение и кастомные CRM для заявок, продаж и коммуникаций с клиентами.',
        link: '/services/crm',
      },
      {
        title: 'ERP и учёт',
        description:
          'Интеграции и кастомные решения для процессов, склада и управленческой отчётности.',
        link: '/services/erp',
      },
    ],
  },
]

const ALL_SERVICES = GROUPS.flatMap((g) => g.items)

export default function ServicesPage() {
  const servicesList = generateItemListSchema({
    name: 'IT-услуги APSOD',
    items: ALL_SERVICES.map((service) => ({
      name: service.title,
      url: `${SITE_URL}${service.link}`,
      description: service.description,
    })),
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Услуги', path: '/services' },
        ]}
      />
      <SeoJsonLd data={servicesList} />

      <section className="pt-10 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-4">
              Инженерия продуктов
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
              Наши услуги
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Полный цикл: сделать продукт, привести клиентов из поиска и нейросетей, сопровождать
              рост. Собственный код и полный цикл работ.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/contact"
                className="apsod-btn-solid px-6 py-3 rounded-md text-sm font-semibold transition-colors"
              >
                Связаться с нами
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 hover:border-slate-900 dark:hover:border-white transition-colors"
              >
                Стоимость и условия
              </Link>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm border-t border-slate-200 dark:border-slate-800 pt-6">
              {GROUPS.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline-offset-4 hover:underline"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 space-y-20">
          {GROUPS.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-28">
              <div className="max-w-2xl mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {group.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{group.subtitle}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {group.items.map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    className="group block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 p-7 md:p-8 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
                  >
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <span className="text-sm font-medium text-slate-900 dark:text-white underline-offset-4 group-hover:underline">
                      Подробнее
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                Собственный код
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Индивидуальная разработка под задачи компании — продукт остаётся под вашим контролем.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                Прозрачный delivery
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                После брифа — ориентир по этапам, срокам и зоне ответственности.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                Полный контур
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Продукт, SEO, GEO и поддержка — в одной логике роста.
              </p>
            </div>
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
              Краткий бриф — предложение по формату: разработка, SEO, GEO или сопровождение.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="apsod-btn-solid px-6 py-3 rounded-md text-sm font-semibold transition-colors"
              >
                Связаться с нами
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 hover:border-slate-900 dark:hover:border-white transition-colors"
              >
                Смотреть кейсы
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
