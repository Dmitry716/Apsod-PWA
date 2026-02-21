import Link from 'next/link'
import PWAInstall from './components/PWAInstall'

export default function Home() {
  return (
    <>
      <PWAInstall />
      
      {/* Тестовый блок */}
      <div className="test-block">
        🔍 Тест: должен быть синим на светлой теме и красным на темной
      </div>

      {/* Hero секция */}
      <section className="min-h-screen" style={{ 
        background: 'linear-gradient(to bottom right, var(--bg-primary), var(--bg-secondary))'
      }}>
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Добро пожаловать в{' '}
              <span style={{ color: 'var(--primary-color)' }}>APSOD</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Начать проект
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                Наши работы
              </Link>
            </div>

            {/* Статистика */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="card">
                <div className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>100+</div>
                <div style={{ color: 'var(--text-muted)' }}>проектов</div>
              </div>
              <div className="card">
                <div className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>5+</div>
                <div style={{ color: 'var(--text-muted)' }}>лет опыта</div>
              </div>
              <div className="card">
                <div className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>50+</div>
                <div style={{ color: 'var(--text-muted)' }}>клиентов</div>
              </div>
              <div className="card">
                <div className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>15+</div>
                <div style={{ color: 'var(--text-muted)' }}>специалистов</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}