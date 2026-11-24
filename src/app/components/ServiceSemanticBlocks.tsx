import Link from 'next/link'
import {
  getServiceSemanticBlocks,
  type SemanticServiceKey,
} from '../lib/semantic-core'

export default function ServiceSemanticBlocks({
  service,
}: {
  service: SemanticServiceKey
}) {
  const blocks = getServiceSemanticBlocks(service)

  const links: { href: string; label: string }[] = [
    { href: '/contact', label: 'Обсудить задачу' },
    { href: '/contact', label: 'Получить смету' },
  ]

  if (service === 'landing-page' || service === 'ecommerce') {
    links.push({
      href: '/services/web-development',
      label: 'Разработка сайтов',
    })
  } else if (service === 'android-apps') {
    links.push({
      href: '/services/mobile-development',
      label: 'Мобильная разработка',
    })
  } else if (service !== 'web-development') {
    links.push({
      href: '/services/web-development',
      label: 'Разработка сайтов',
    })
  } else {
    links.push({ href: '/services/landing-page', label: 'Лендинг' })
    links.push({
      href: '/services/ecommerce',
      label: 'Интернет-магазин',
    })
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-10">
          {blocks.map((block) => (
            <div key={block.h2}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {block.h2}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {block.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={
                link.label === 'Обсудить задачу'
                  ? 'px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700'
                  : 'px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500'
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
