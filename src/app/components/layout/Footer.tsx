import Link from "next/link";
import PushNotificationSubscribe from "../PushNotificationSubscribe";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Колонка 1: Логотип */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              APSOD
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white/90">Навигация</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Услуги</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">О нас</Link></li>
              <li><Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">Портфолио</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Блог</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Колонка 3: Реквизиты */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white/90">Реквизиты</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <p>ИП Карелин Д.В.</p>
              <p>УНП 391853923</p>
              <p>+375 (44) 577-77-24</p>
              <p>karelinseo@gmail.com</p>
              <p>г. Минск, ул. Фрунзе, 29</p>
            </div>
          </div>

          {/* Колонка 4: Подписка на уведомления */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white/90">Подписка на новости</h4>
            <PushNotificationSubscribe compact={true} />
          </div>
        </div>

        {/* Нижняя линия с юридическими ссылками */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <span>•</span>
            <Link href="/legal/cookie-policy" className="hover:text-white transition-colors">
              Обработка cookie
            </Link>
            <span>•</span>
            <Link href="/legal/terms-of-use" className="hover:text-white transition-colors">
              Пользовательское соглашение
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          © {currentYear} ИП Карелин Д.В. Все права защищены.
        </div>
      </div>
    </footer>
  );
}