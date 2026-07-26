"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggle";
import { t } from "@/app/lib/i18n";
import { useLocale } from "@/app/lib/useLocale";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: t(locale, 'nav.services') },
    { href: "/pricing", label: locale === 'en' ? 'Pricing' : 'Цены' },
    { href: "/ready-sites", label: locale === 'en' ? 'Ready sites' : 'Готовые сайты' },
    { href: "/about", label: t(locale, 'nav.about') },
    { href: "/portfolio", label: t(locale, 'nav.portfolio') },
    { href: "/blog", label: t(locale, 'nav.blog') },
    { href: "/contact", label: t(locale, 'nav.contact') },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: isScrolled ? "var(--header-bg)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
        boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border-color)" : "none",
        zIndex: 50,
        transition: "all 0.3s ease",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Логотип */}
          <Link
            href="/"
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            APSOD
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Основная навигация">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />

            {/* Кнопка мобильного меню — до lg, т.к. пунктов много */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg"
              aria-label={t(locale, 'header.menu')}
              title={t(locale, 'header.menu')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        {isMenuOpen && (
          <div className="lg:hidden py-4">
            <nav className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2" aria-label="Мобильная навигация">
              <div className="px-3 py-2 text-xs text-gray-600 dark:text-gray-300 flex justify-between items-center">
                <span className="font-semibold">{t(locale, 'header.menu')}</span>
                <LanguageSwitcher compact onChange={() => setIsMenuOpen(false)} />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}