"use client";

import Link from "next/link";
import PushNotificationSubscribe from "../PushNotificationSubscribe";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Подвал сайта"
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Колонка 1: Логотип и информация */}
          <div className="space-y-4">
            <Link
              href="/"
              className="group inline-block transition-all duration-700 ease-out hover:scale-105 focus:scale-105 focus:outline-none"
              aria-label="APSOD - на главную страницу"
            >
              <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-500 relative">
                APSOD
                <span
                  className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                ></span>
                <span
                  className="absolute -top-1 -right-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </h3>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed">
              Профессиональная команда, которая делает технологии инструментом
              для роста вашего бизнеса.
            </p>

            {/* Кнопка "Наверх" */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white/90 rounded-lg transition-all duration-300 hover:bg-white/20 hover:text-white focus:bg-white/20 focus:text-white focus:outline-none group relative overflow-hidden"
              aria-label="Прокрутить страницу вверх"
              title="Вернуться к началу страницы"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-focus:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <span>Наверх</span>
              <span
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 blur-md"
                aria-hidden="true"
              ></span>
            </button>
          </div>

          {/* Остальные колонки без изменений */}
          <nav aria-label="Навигация по сайту">
            <h4
              className="text-lg font-semibold mb-4 text-white/90"
              id="footer-nav"
            >
              Навигация
            </h4>
            <ul className="space-y-2" aria-labelledby="footer-nav">
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-gray-300 hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  Портфолио
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h4
              className="text-lg font-semibold mb-4 text-white/90"
              id="footer-contacts"
            >
              Реквизиты
            </h4>
            <address
              className="space-y-3 text-sm text-gray-300 not-italic"
              aria-labelledby="footer-contacts"
            >
              <p>ИП Карелин Д.В.</p>
              <p>УНП 391853923</p>
              <p>
                <a
                  href="tel:+375445777724"
                  className="hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  +375 (44) 577-77-24
                </a>
              </p>
              <p>
                <a
                  href="mailto:karelinseo@gmail.com"
                  className="hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  karelinseo@gmail.com
                </a>
              </p>
              <p>г. Минск, ул. Фрунзе, 29</p>
            </address>
          </div>

          <div>
            <h4
              className="text-lg font-semibold mb-4 text-white/90"
              id="footer-subscribe"
            >
              Подписка на новости
            </h4>
            <PushNotificationSubscribe compact={true} />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <nav aria-label="Юридическая информация">
            <ul className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li aria-hidden="true">•</li>
              <li>
                <Link
                  href="/legal/cookie-policy"
                  className="hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  Обработка cookie
                </Link>
              </li>
              <li aria-hidden="true">•</li>
              <li>
                <Link
                  href="/legal/terms-of-use"
                  className="hover:text-white focus:text-white focus:outline-none transition-colors"
                >
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          <span>© {currentYear} ИП Карелин Д.В. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}
