"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Правильные ссылки согласно вашему меню
  const navLinks = [
    { href: "/services", label: "Услуги" },
    { href: "/about", label: "О нас" },
    { href: "/portfolio", label: "Портфолио" },
    { href: "/blog", label: "Блог" },
    { href: "/contact", label: "Контакты" },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg" 
        : "bg-white dark:bg-gray-900"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Логотип */}
          <Link href="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            APSOD
          </Link>

          {/* Десктопное меню - ссылки хорошо видны */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base lg:text-lg font-medium transition-all duration-200 hover:scale-105 ${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 pb-1"
                    : "text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Кнопки справа */}
          <div className="flex items-center space-x-3">
            {/* Кнопка установки PWA - теперь более заметная */}
            <button 
              id="installButton"
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105 text-sm font-medium shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Установить</span>
            </button>
            
            {/* Кнопка переключения темы - теперь заметнее */}
            <ThemeToggle />
            
            {/* Кнопка бургер для мобильных */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Меню"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}>
          <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors text-base ${
                  pathname === link.href
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Кнопка установки в мобильном меню */}
            <button
              onClick={() => {
                // Логика установки PWA
                setIsMenuOpen(false);
              }}
              className="w-full mt-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Установить приложение</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}