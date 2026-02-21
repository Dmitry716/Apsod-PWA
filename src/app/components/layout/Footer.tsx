import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Анимированный фон */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Колонка 1: Логотип и описание */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              APSOD
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса.
            </p>
            <div className="flex space-x-4">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/375445777724" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 group"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-white group-hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.6 4.04 1.64 5.7L2 22l4.48-1.66c1.64.96 3.53 1.52 5.56 1.52 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm0 17.92c-1.78 0-3.52-.51-5.02-1.47l-.36-.22-2.66.98.98-2.59-.23-.38c-1.03-1.55-1.58-3.39-1.58-5.33 0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2zm4.51-5.95c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.57.13-.17.25-.66.8-.81.96-.15.17-.3.19-.55.06-.87-.45-1.48-.8-2.07-1.62-.24-.34.23-.31.66-1.04.07-.13.04-.24-.02-.37-.06-.13-.57-1.37-.78-1.87-.2-.49-.41-.42-.57-.43-.14-.01-.31-.01-.48-.01-.17 0-.45.06-.68.32-.23.26-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.17 1.78 2.73 4.33 3.74.6.24 1.07.38 1.44.49.6.17 1.15.15 1.59.09.49-.07 1.51-.62 1.73-1.21.22-.59.22-1.1.16-1.21-.07-.11-.23-.18-.48-.31z"/>
                </svg>
              </a>
              
              {/* Telegram */}
              <a 
                href="https://t.me/DMITRYJS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 group"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.94 1.23-5.48 3.62-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.04-.48-.82-.27-1.47-.42-1.42-.89.03-.25.37-.5 1.03-.76 4.04-1.76 6.73-2.92 8.08-3.48 3.85-1.6 4.65-1.88 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.4-.02.11-.02.36-.05.58z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/share/1GuC7K2jZ1/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 group"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white/90">Навигация</h4>
            <ul className="space-y-2">
              {["Услуги", "О нас", "Портфолио", "Блог", "Контакты"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3: Реквизиты ИП */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white/90">Реквизиты</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p className="font-medium text-white">ИП Карелин Д.В.</p>
                  <p className="text-xs text-gray-400">Индивидуальный предприниматель</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>УНП 391853923</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+375445777724" className="hover:text-blue-400 transition-colors">
                  +375 (44) 577-77-24
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@apsod.com" className="hover:text-blue-400 transition-colors">
                  info@apsod.com
                </a>
              </div>
            </div>
          </div>

          {/* Колонка 4: Документы */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white/90">Документы</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookie-policy" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Обработка файлов cookie
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя линия с копирайтом */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} ИП Карелин Д.В. Все права защищены.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>УНП 391853923</span>
            <span>•</span>
            <span>Зарегистрировано в торговом реестре</span>
          </div>
        </div>
      </div>
    </footer>
  );
}