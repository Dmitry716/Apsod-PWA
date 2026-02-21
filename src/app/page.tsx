export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Добро пожаловать в{' '}
            <span className="text-blue-600">APSOD</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              Начать проект
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
              Наши работы
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2">Веб-разработка</h3>
              <p className="text-gray-600">Создаем современные сайты и веб-приложения</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Моб. приложения</h3>
              <p className="text-gray-600">Разрабатываем под iOS и Android</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">SEO продвижение</h3>
              <p className="text-gray-600">Выводим сайты в топ поисковых систем</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}