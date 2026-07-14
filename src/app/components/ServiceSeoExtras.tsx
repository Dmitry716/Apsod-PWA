import Link from 'next/link'
import SeoJsonLd from './SeoJsonLd'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  SERVICE_SEO,
  type ServicePath,
} from '../lib/seo'
import { SERVICE_FAQS } from '../lib/service-faq'

export function ServiceBreadcrumbs({ service }: { service: ServicePath }) {
  const title = SERVICE_SEO[service]?.title?.split('—')[0]?.trim() || 'Услуга'
  return (
    <nav className="container mx-auto px-4 pt-8 text-sm text-gray-500">
      <Link href="/" className="hover:text-blue-600">
        Главная
      </Link>
      {' / '}
      <Link href="/services" className="hover:text-blue-600">
        Услуги
      </Link>
      {' / '}
      <span className="text-gray-700 dark:text-gray-300">{title}</span>
      {' · '}
      <Link href="/pricing" className="hover:text-blue-600">
        Цены
      </Link>
    </nav>
  )
}

export function ServiceFaqBlock({ service }: { service: ServicePath }) {
  const items = SERVICE_FAQS[service]
  if (!items?.length) return null

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Главная', path: '/' },
      { name: 'Услуги', path: '/services' },
      {
        name: SERVICE_SEO[service].title.split('—')[0].trim(),
        path: `/services/${service}`,
      },
    ]),
    generateFAQSchema(items),
  ]

  return (
    <>
      <SeoJsonLd data={schemas} />
      <section className="py-16 bg-gray-50 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Частые вопросы
          </h2>
          <div className="space-y-4">
            {items.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
              >
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white list-none flex justify-between gap-4">
                  {item.question}
                  <span className="text-gray-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.answer}{' '}
                  <Link href="/pricing" className="text-blue-600 hover:underline">
                    Смотреть цены
                  </Link>
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
