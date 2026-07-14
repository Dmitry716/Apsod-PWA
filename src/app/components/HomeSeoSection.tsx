import Link from 'next/link'
import { HOMEPAGE_FAQ } from '../lib/homepage-faq'
import { SITE_NAME } from '../lib/seo'

const GEO_LINKS = [
  { href: '/belarus/vitebsk', label: 'Разработка сайтов в Витебске' },
  { href: '/belarus/minsk', label: 'Разработка сайтов в Минске' },
  { href: '/belarus/gomel', label: 'Разработка сайтов в Гомеле' },
  { href: '/russia/moscow', label: 'Разработка сайтов в Москве' },
  { href: '/russia/saint-petersburg', label: 'Разработка сайтов в Санкт-Петербурге' },
  { href: '/russia/kazan', label: 'Разработка сайтов в Казани' },
  { href: '/belarus', label: 'Услуги по всей Беларуси' },
  { href: '/russia', label: 'Услуги по всей России' },
]

const SERVICE_LINKS = [
  { href: '/services/web-development', label: 'Разработка сайтов и интернет-магазинов' },
  { href: '/services/seo', label: 'SEO-продвижение в Яндексе и Google' },
  { href: '/services/mobile-development', label: 'Мобильные приложения iOS и Android' },
  { href: '/services/pwa-development', label: 'PWA-разработка' },
  { href: '/services/technical-support', label: 'Техподдержка сайтов' },
]

export default function HomeSeoSection() {
  return (
    <>
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 max-md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {SITE_NAME} — разработка сайтов, SEO и мобильных приложений
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              <strong>{SITE_NAME}</strong> — IT-компания полного цикла: создаём корпоративные сайты,
              интернет-магазины, мобильные приложения и занимаемся{' '}
              <Link href="/services/seo" className="text-blue-600 dark:text-blue-400 hover:underline">
                SEO-продвижением в Яндексе и Google
              </Link>
              . Работаем с бизнесом в <strong>Витебске</strong>, <strong>Минске</strong>, <strong>Москве</strong> и регионах
              Беларуси и России.
            </p>
            <p>
              Разрабатываем проекты на <strong>Next.js, React и Node.js</strong> — это даёт высокую
              скорость загрузки, хорошие позиции в поиске и удобство масштабирования. Каждый проект
              проходит этапы Discovery, технической экспертизы, проектирования, Agile-разработки и QA —
              по стандартам крупных IT-компаний.
            </p>
            <p>
              Если вам нужен сайт под ключ, интернет-магазин, мобильное приложение или вывод бизнеса
              в топ поисковой выдачи — оставьте заявку на{' '}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                бесплатную консультацию
              </Link>
              . Покажем{' '}
              <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline">
                кейсы из портфолио
              </Link>{' '}
              и предложим решение под ваш бюджет и сроки.
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
            Частые вопросы о разработке сайтов и SEO
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
            Ответы на популярные запросы клиентов из Беларуси и России
          </p>
          <div className="space-y-3">
            {HOMEPAGE_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 open:bg-white dark:open:bg-gray-800 transition-colors"
              >
                <summary className="cursor-pointer px-6 py-4 font-semibold text-gray-900 dark:text-white list-none flex justify-between items-center gap-4">
                  {item.question}
                  <span className="text-blue-500 shrink-0 group-open:rotate-45 transition-transform text-xl" aria-hidden>
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
