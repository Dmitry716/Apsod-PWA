import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            APSOD
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              ГЛАВНАЯ
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              О НАС
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
              УСЛУГИ
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              БЛОГ
            </Link>
            <Link href="/vacancies" className="text-gray-700 hover:text-blue-600 transition-colors">
              ВАКАНСИИ
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Кнопка установки PWA */}
            <button 
              id="installButton"
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Установить</span>
            </button>
            
            {/* Кнопка переключения темы */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}