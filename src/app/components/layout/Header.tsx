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
      className="apsod-site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: isScrolled ? "var(--header-bg)" : "transparent",
        backdropFilter: isScrolled ? "blur(18px) saturate(1.35)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(18px) saturate(1.35)" : "none",
        boxShadow: "none",
        borderBottom: isScrolled
          ? "1px solid color-mix(in srgb, var(--apsod-accent) 22%, transparent)"
          : "1px solid transparent",
        zIndex: 50,
        transition: "background-color 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link
            href="/"
            className="apsod-logo font-display text-[1.85rem] leading-none md:text-[2rem] font-extrabold tracking-[-0.05em] text-slate-900 dark:text-white transition-opacity duration-300 hover:opacity-80"
          >
            APSOD
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Основная навигация">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="apsod-nav-link text-[12px] font-semibold tracking-[0.12em] uppercase text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap"
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="apsod-btn-solid apsod-cta-primary ml-1 px-4 py-2.5 rounded-md text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors"
            >
              <span>{locale === 'en' ? 'Contact' : 'Связаться'}</span>
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle size="sm" />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="apsod-burger lg:hidden relative inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200/80 dark:border-white/15 px-3 text-slate-900 dark:text-white hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors"
              aria-label={t(locale, 'header.menu')}
              title={t(locale, 'header.menu')}
              aria-expanded={isMenuOpen}
            >
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase">
                {t(locale, 'header.menu')}
              </span>
              <span
                className={`apsod-burger__lines ${isMenuOpen ? 'is-open' : ''}`}
                aria-hidden
              >
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4">
            <nav className="border border-slate-200 dark:border-slate-700/80 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl p-2" aria-label="Мобильная навигация">
              <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center">
                <span className="font-semibold tracking-[0.18em] uppercase">{t(locale, 'header.menu')}</span>
                <LanguageSwitcher compact onChange={() => setIsMenuOpen(false)} />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block p-3 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md tracking-wide"
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
