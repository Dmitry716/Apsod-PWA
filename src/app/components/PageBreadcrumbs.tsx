'use client'

import Link from 'next/link'
import SeoJsonLd from './SeoJsonLd'
import { generateBreadcrumbSchema } from '../lib/seo'

type Crumb = { name: string; path: string }

/**
 * Видимые хлебные крошки + BreadcrumbList JSON-LD
 * (навигационная цепочка в сниппете Яндекса).
 */
export default function PageBreadcrumbs({
  items,
  className = 'container mx-auto px-4 pt-8 text-sm text-gray-500',
}: {
  items: Crumb[]
  className?: string
}) {
  return (
    <>
      {items.length >= 2 ? (
        <SeoJsonLd data={generateBreadcrumbSchema(items)} />
      ) : null}
      <nav aria-label="Навигационная цепочка" className={className}>
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 list-none p-0 m-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={`${item.path}-${index}`} className="flex items-center gap-1">
                {index > 0 ? (
                  <span className="text-gray-400" aria-hidden>
                    /
                  </span>
                ) : null}
                {isLast ? (
                  <span
                    className="text-gray-700 dark:text-gray-300"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="hover:text-blue-600">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
