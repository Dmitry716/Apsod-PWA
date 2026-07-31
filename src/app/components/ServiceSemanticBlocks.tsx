import Link from 'next/link'
import { getServiceSemanticBlocks } from '../lib/semantic-core'

type ServiceKey = 'web-development' | 'seo' | 'mobile-development'

export default function ServiceSemanticBlocks({ service }: { service: ServiceKey }) {
  const blocks = getServiceSemanticBlocks(service)

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-10">
          {blocks.map((block) => (
            <div key={block.h2}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {block.h2}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Обсудить задачу
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500"
          >
            Цены
          </Link>
          <Link
            href="/services/web-development"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500"
          >
            Разработка сайтов
          </Link>
        </div>
      </div>
    </section>
  )
}
