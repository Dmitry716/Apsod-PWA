import Link from 'next/link'
import PWAInstall from './components/PWAInstall'

export default function Home() {
  return (
    <>
      <PWAInstall />
      
      {/* Hero секция - исправляем градиенты */}
      <section className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Добро пожаловать в{' '}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                APSOD
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white text-lg font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Начать проект
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-lg font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all"
              >
                Наши работы
              </Link>
            </div>

            {/* Статистика */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-4">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">проектов</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-purple-600">5+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">лет опыта</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">клиентов</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">специалистов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция с услугами */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Наши{' '}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              услуги
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/services" className="group">
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🌐</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Веб-разработка</h3>
                <p className="text-gray-600 dark:text-gray-300">Создаем современные сайты и веб-приложения</p>
              </div>
            </Link>
            
            <Link href="/services" className="group">
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📱</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Мобильные приложения</h3>
                <p className="text-gray-600 dark:text-gray-300">Разрабатываем под iOS и Android</p>
              </div>
            </Link>
            
            <Link href="/services" className="group">
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📈</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">SEO продвижение</h3>
                <p className="text-gray-600 dark:text-gray-300">Выводим сайты в топ поисковых систем</p>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/services" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Все услуги
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Готовы начать проект?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами сегодня и получите бесплатную консультацию
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Связаться с нами
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}