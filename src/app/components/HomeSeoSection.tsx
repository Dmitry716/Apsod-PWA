import Link from 'next/link'
import { HOMEPAGE_FAQ } from '../lib/homepage-faq'
import { SITE_NAME } from '../lib/seo'

const GEO_LINKS = [
  { href: '/belarus/vitebsk', label: 'Разработка сайтов в Витебске' },
  { href: '/belarus/minsk', label: 'Разработка сайтов в Минске' },
  { href: '/russia/moscow', label: 'Разработка сайтов в Москве' },
  { href: '/belarus', label: 'Услуги по всей Беларуси' },
  { href: '/russia', label: 'Услуги по всей России' },
]

const SERVICE_LINKS = [
  { href: '/services/web-development', label: 'Уникальная веб-разработка' },
  { href: '/services/seo', label: 'SEO и аналитика' },
  { href: '/services/geo-promotion', label: 'GEO продвижение' },
  { href: '/services/mobile-development', label: 'Безопасные мобильные приложения' },
  { href: '/services/pwa-development', label: 'PWA-разработка' },
  { href: '/services/technical-support', label: 'Поддержка и развитие' },
]

export default function HomeSeoSection() {
  return (
    <>
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 max-md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {SITE_NAME} — организация бизнеса в интернете
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              <strong>{SITE_NAME}</strong> — для клиентов, которым нужна не «страница на конструкторе»,
              а профессиональная настройка digital-канала: аналитика и стратегия, уникальный дизайн,
              безопасная разработка, SEO в Яндексе и Google, интеграции и поддержка после запуска.
            </p>
            <p>
              Мы разрабатываем <strong>только индивидуальные сайты и приложения на уникальном коде</strong>{' '}
              (Next.js, React, Node.js и мобильный стек). С Tilda, Wix и другими конструкторами не
              работаем — такие решения не дают нужного уровня безопасности, гибкости и контроля.
            </p>
            <p>
              География работы: <strong>Витебск</strong>, <strong>Минск</strong>, <strong>Москва</strong>{' '}
              и удалённые проекты по миру. Начните с{' '}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                консультации
              </Link>
              , изучите{' '}
              <Link href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">
                цены
              </Link>{' '}
              или{' '}
              <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline">
                избранные кейсы
              </Link>
              .
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Услуги
              </h3>
              <ul className="space-y-2">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                География
              </h3>
              <ul className="space-y-2">
                {GEO_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800 max-md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Частые вопросы
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
            О процессе, технологиях и формате работы
          </p>
          <div className="space-y-3">
            {HOMEPAGE_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 open:bg-white dark:open:bg-gray-800 transition-colors"
              >
                <summary className="cursor-pointer px-6 py-4 font-semibold text-gray-900 dark:text-white list-none flex justify-between items-center gap-4">
                  {item.question}
                  <span
                    className="text-blue-500 shrink-0 group-open:rotate-45 transition-transform text-xl"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
