"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LocaleLink from "../LocaleLink";
import ThemeToggle from "../ui/ThemeToggle";
import { t } from "@/app/lib/i18n";
import { useLocale } from "@/app/lib/useLocale";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { stripLocalePrefix } from "@/app/lib/locale-path";
import {
  ServicesMegaPanel,
  ServicesMobileAccordion,
} from "./ServicesMegaMenu";

const DARK_HERO_PATHS = new Set([
  "/",
  "/services",
  "/services/web-development",
  "/about",
  "/portfolio",
  "/blog",
  "/contact",
]);
const MEGA_CLOSE_MS = 120;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale } = useLocale();
  const pathname = usePathname();
  const pathForHero = stripLocalePrefix(pathname || "/");
  const isDarkPage = DARK_HERO_PATHS.has(pathForHero);
  const headerSolid = isScrolled || isMenuOpen || isServicesOpen;
  const isDarkHeroChrome = isDarkPage;
  const servicesWrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const openServicesMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsMenuOpen(false);
    setIsServicesOpen(true);
  };

  const scheduleCloseServicesMenu = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
      closeTimerRef.current = null;
    }, MEGA_CLOSE_MS);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isServicesOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServicesOpen(false);
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isServicesOpen]);

  const navLinks = [
    { href: "/portfolio", label: t(locale, "nav.cases") },
    { href: "/about", label: t(locale, "nav.about") },
    { href: "/blog", label: t(locale, "nav.blog") },
    { href: "/contact", label: t(locale, "nav.contact") },
  ];

  const servicesLabel = t(locale, "nav.services");

  return (
    <header
      className={`apsod-site-header${isDarkHeroChrome ? " apsod-site-header--hero" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: headerSolid
          ? isDarkPage
            ? "rgba(0,0,0,0.88)"
            : "var(--header-bg)"
          : "transparent",
        backdropFilter: headerSolid ? "blur(18px) saturate(1.35)" : "none",
        WebkitBackdropFilter: headerSolid ? "blur(18px) saturate(1.35)" : "none",
        boxShadow: isScrolled || isServicesOpen ? "0 10px 25px rgba(0, 0, 0, 0.08)" : "none",
        borderBottom: headerSolid
          ? isDarkPage
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid color-mix(in srgb, var(--border-color) 80%, transparent)"
          : "1px solid transparent",
        zIndex: 50,
        transition:
          "background-color 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-[72px] md:h-[88px] lg:h-[100px]">
          <LocaleLink
            href="/"
            className={`apsod-logo relative z-10 font-display text-[1.75rem] leading-none md:text-[2rem] font-bold tracking-[0.02em] transition-opacity duration-300 hover:opacity-80 ${
              isDarkHeroChrome ? "text-white" : "text-slate-900 dark:text-white"
            }`}
          >
            APSOD
          </LocaleLink>

          <nav
            className="apsod-tpmenu absolute left-1/2 top-1/2 z-[5] hidden -translate-x-1/2 -translate-y-1/2 lg:flex items-center gap-7 xl:gap-10"
            aria-label="Основная навигация"
          >
            <div
              ref={servicesWrapRef}
              className="relative"
              onMouseEnter={openServicesMenu}
              onMouseLeave={scheduleCloseServicesMenu}
            >
              <LocaleLink
                href="/services"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-controls="services-mega-menu"
                onFocus={openServicesMenu}
                className={`apsod-nav-link apsod-nav-link--services inline-flex items-center gap-1.5 text-[14px] font-bold tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${
                  isServicesOpen ? "apsod-nav-link--open" : ""
                } ${
                  isDarkHeroChrome
                    ? "text-white/85 hover:text-white"
                    : "text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400"
                }`}
              >
                {servicesLabel}
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M2.2 4.2a.75.75 0 011.1-.1L6 6.56l2.7-2.46a.75.75 0 01.99 1.13l-3.2 2.9a.75.75 0 01-.99 0l-3.2-2.9a.75.75 0 01-.1-1.13z" />
                </svg>
              </LocaleLink>
            </div>

            {navLinks.map((link) => (
              <LocaleLink
                key={link.href}
                href={link.href}
                onClick={() => setIsServicesOpen(false)}
                className={`apsod-nav-link text-[14px] font-bold tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${
                  isDarkHeroChrome
                    ? "text-white/85 hover:text-white"
                    : "text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400"
                }`}
              >
                {link.label}
              </LocaleLink>
            ))}
          </nav>

          <ul className="apsod-header-action relative z-10 flex items-center gap-2 sm:gap-3 list-none m-0 p-0">
            <li className="hidden sm:block">
              <LanguageSwitcher circle />
            </li>
            <li>
              <ThemeToggle size="circle" />
            </li>
            <li className="lg:hidden">
              <button
                type="button"
                onClick={() => {
                  setIsServicesOpen(false);
                  setIsMenuOpen(!isMenuOpen);
                }}
                className={`apsod-header-circle ${
                  isDarkHeroChrome ? "apsod-header-circle--hero" : ""
                }`}
                aria-label={t(locale, "header.menu")}
                title={t(locale, "header.menu")}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {isServicesOpen ? (
        <div
          className="hidden lg:block"
          onMouseEnter={openServicesMenu}
          onMouseLeave={scheduleCloseServicesMenu}
        >
          <ServicesMegaPanel
            id="services-mega-menu"
            locale={locale}
            onNavigate={() => setIsServicesOpen(false)}
          />
        </div>
      ) : null}

      {isMenuOpen && (
        <div className="container mx-auto px-4 lg:px-8 lg:hidden pb-5">
          <nav
            className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl p-2 shadow-lg"
            aria-label="Мобильная навигация"
          >
            <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center">
              <span className="font-semibold tracking-[0.18em] uppercase">
                {t(locale, "header.menu")}
              </span>
              <LanguageSwitcher compact onChange={() => setIsMenuOpen(false)} />
            </div>
            <ServicesMobileAccordion
              locale={locale}
              open={isMobileServicesOpen}
              onToggle={() => setIsMobileServicesOpen((prev) => !prev)}
              onNavigate={() => setIsMenuOpen(false)}
            />
            {navLinks.map((link) => (
              <LocaleLink
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block p-3 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md tracking-wide font-semibold uppercase text-[13px]"
              >
                {link.label}
              </LocaleLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
