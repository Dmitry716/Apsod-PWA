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
    { href: "/portfolio", label: locale === 'en' ? 'Case studies' : 'Кейсы' },
    { href: "/pricing", label: locale === 'en' ? 'Pricing' : 'Цены' },
    { href: "/about", label: t(locale, 'nav.about') },
    { href: "/blog", label: locale === 'en' ? 'Insights' : 'Блог' },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: isScrolled ? "var(--header-bg)" : "transparent",
        backdropFilter: isScrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(14px)" : "none",
        boxShadow: "none",
        borderBottom: isScrolled ? "1px solid var(--border-color)" : "1px solid transparent",
        zIndex: 50,
        transition: "background-color 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Логотип */}
          <Link
            href="/"
            className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
            style={{
              letterSpacing: "-0.03em",
            }}
          >
            APSOD
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Основная навигация">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="apsod-btn-solid ml-1 px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              {locale === 'en' ? 'Contact us' : 'Связаться'}
            </Link>
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
            <nav className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 p-2" aria-label="Мобильная навигация">
              <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center">
                <span className="font-semibold tracking-wide uppercase">{t(locale, 'header.menu')}</span>
                <LanguageSwitcher compact onChange={() => setIsMenuOpen(false)} />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block p-3 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="apsod-btn-solid block p-3 mt-1 rounded-md text-center font-semibold"
              >
                {locale === 'en' ? 'Contact us' : 'Связаться'}
              </Link>
              <Link
                href="/ready-sites"
                onClick={() => setIsMenuOpen(false)}
                className="block p-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
              >
                {locale === 'en' ? 'Ready sites' : 'Готовые сайты'}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}