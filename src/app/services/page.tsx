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
  icon: string
  tags: string[]
  link: string
  highlight?: boolean
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
    subtitle: 'Уникальный код без конструкторов: сайт, приложение, интерфейс',
    items: [
      {
        title: 'Веб-разработка',
        description:
          'Лендинги, корпоративные сайты и магазины на Next.js — под заявки и рост.',
        icon: '🌐',
        tags: ['Next.js', 'Без конструкторов', 'SEO-ready'],
        link: '/services/web-development',
        highlight: true,
      },
      {
        title: 'Мобильные приложения',
        description: 'iOS / Android и кроссплатформа: от MVP до публикации в сторах.',
        icon: '📱',
        tags: ['React Native', 'Flutter', 'Swift'],
        link: '/services/mobile-development',
      },
      {
        title: 'PWA',
        description: 'Прогрессивные веб-приложения: установка, офлайн, push.',
        icon: '📲',
        tags: ['Service Workers', 'Manifest'],
        link: '/services/pwa-development',
      },
      {
        title: 'UI/UX дизайн',
        description: 'Прототипы и уникальный дизайн под сценарии пользователя.',
        icon: '🎨',
        tags: ['Figma', 'Дизайн-система'],
        link: '/services/ui-ux',
      },
    ],
  },
  {
    id: 'growth',
    title: 'Продвижение',
    subtitle: 'Поиск и нейросети: трафик, видимость бренда, измеримый рост',
    items: [
      {
        title: 'SEO-продвижение',
        description: 'Яндекс и Google: аудит, семантика, техника, контент, отчётность.',
        icon: '📈',
        tags: ['Яндекс', 'Google', 'Аналитика'],
        link: '/services/seo',
        highlight: true,
      },
      {
        title: 'GEO в нейросетях',
        description:
          'AI-видимость в ChatGPT, Google AI и Алисе: аудит, факт-матрица, мониторинг.',
        icon: '🤖',
        tags: ['ChatGPT', 'AI Overviews', 'Алиса'],
        link: '/services/geo-promotion',
        highlight: true,
      },
    ],
  },
  {
    id: 'run',
    title: 'Сопровождение',
    subtitle: 'После запуска: стабильность, интеграции, развитие по данным',
    items: [
      {
        title: 'Техподдержка',
        description: 'Мониторинг, обновления, бэкапы и доработки на JS-стеке.',
        icon: '🛠️',
        tags: ['Next.js', 'SLA', 'Безопасность'],
        link: '/services/technical-support',
        highlight: true,
      },
      {
        title: 'CRM',
        description: 'Внедрение и кастомные CRM для заявок, продаж и коммуникаций.',
        icon: '🤝',
        tags: ['Bitrix24', 'AmoCRM', 'Интеграции'],
        link: '/services/crm',
      },
      {
        title: 'ERP и учёт',
        description: 'Интеграции и кастомные решения для процессов и отчётности.',
        icon: '⚙️',
        tags: ['1С', 'Кастом', 'Отчёты'],
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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Услуги', path: '/services' },
        ]}
      />
      <SeoJsonLd data={servicesList} />

      <section className="relative pt-16 pb-14 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-violet-200 dark:bg-violet-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
              Digital-контур на уникальном коде
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-5">
              Услуги APSOD
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Три направления: сделать продукт, привести клиентов из поиска и нейросетей,
              сопровождать рост. Без Tilda, Wix и шаблонных сборок.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Обсудить задачу
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-blue-500"
              >
                Цены
              </Link>
            </div>
            <nav className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
              {GROUPS.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-400"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 space-y-16">
          {GROUPS.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-28">
              <div className="mb-6 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {group.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{group.subtitle}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {group.items.map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    className={`group block rounded-2xl border p-6 bg-white dark:bg-gray-800 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                      item.highlight
                        ? 'border-blue-300 dark:border-blue-700 ring-1 ring-blue-500/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl" aria-hidden>
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-slate-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Уникальный код</h3>
              <p className="text-sm text-slate-300">
                Только индивидуальная разработка. Конструкторы не используем.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Смета за 1 день</h3>
              <p className="text-sm text-slate-300">
                Короткий бриф — понятный ориентир по срокам и бюджету в Б̶ и ₽.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Полный контур</h3>
              <p className="text-sm text-slate-300">
                Сайт, SEO, GEO и поддержка — один подрядчик, одна логика роста.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Есть деловой запрос?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Расскажите задачу — предложим формат: разработка, SEO, GEO или сопровождение.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Оставить заявку
            </Link>
            <a
              href="https://t.me/Apsod_IT"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-blue-500"
            >
              Telegram
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
