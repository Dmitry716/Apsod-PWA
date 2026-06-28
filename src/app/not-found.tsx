import Link from 'next/link'
import { Metadata } from 'next'
import { buildPageMetadata } from './lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Страница не найдена',
  description: 'Запрашиваемая страница не найдена. Перейдите на главную или воспользуйтесь меню сайта APSOD.',
  path: '/404',
  noIndex: true,
})

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Страница не найдена
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Возможно, ссылка устарела или страница была перемещена.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            На главную
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:border-blue-500 transition-colors"
          >
            Услуги
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:border-blue-500 transition-colors"
          >
            Контакты
          </Link>
        </div>
      </div>
    </div>
  )
}
