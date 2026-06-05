"use client";

import { useEffect, useRef, useState } from "react";
import { t } from "@/app/lib/i18n";
import { useLocale } from "@/app/lib/useLocale";

type LanguageSwitcherProps = {
  compact?: boolean;
  onChange?: () => void;
};

export default function LanguageSwitcher({ compact = false, onChange }: LanguageSwitcherProps) {
  const { locale, setLang } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [labelVisible, setLabelVisible] = useState(true);
  const [menuLabelsVisible, setMenuLabelsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const currentLabel = locale === "ru" ? "RU" : "EN";

  useEffect(() => {
    setLabelVisible(false);
    const timer = window.setTimeout(() => setLabelVisible(true), 110);
    return () => window.clearTimeout(timer);
  }, [locale]);

  useEffect(() => {
    setMenuLabelsVisible(false);
    const timer = window.setTimeout(() => setMenuLabelsVisible(true), 120);
    return () => window.clearTimeout(timer);
  }, [locale]);

  const applyLang = (next: "ru" | "en") => {
    setLang(next);
    setIsOpen(false);
    onChange?.();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group inline-flex items-center gap-2 rounded-full border transition-all ${
          compact
            ? "px-3 py-1.5 text-xs bg-white/85 border-gray-300 text-gray-800 hover:bg-white dark:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/20"
            : "px-3 py-2 text-sm bg-white/85 border-gray-300 text-gray-800 hover:bg-white dark:bg-white/10 dark:border-white/20 dark:text-white/90 dark:hover:bg-white/20"
        }`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        title={locale === "ru" ? "Выбор языка" : "Language"}
      >
        <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-12 scale-110" : "group-hover:rotate-6"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18M3 12a9 9 0 0118 0 9 9 0 01-18 0z" />
        </svg>
        <span
          className={`font-medium tracking-wide transition-opacity duration-150 ${
            labelVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentLabel}
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.1 1.02l-4.25 4.5a.75.75 0 01-1.1 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      <div
        role="menu"
        className={`absolute right-0 mt-2 min-w-[190px] overflow-hidden rounded-xl border border-gray-200 bg-white/95 text-gray-900 shadow-xl backdrop-blur dark:border-white/20 dark:bg-[#111827]/95 dark:text-white transition-all duration-150 origin-top-right ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
          <button
            type="button"
            onClick={() => applyLang("ru")}
            className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
              locale === "ru"
                ? "bg-blue-100 text-blue-900 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.45)] dark:bg-blue-500/25 dark:text-white dark:shadow-[inset_0_0_0_1px_rgba(96,165,250,0.45)]"
                : "hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
            role="menuitem"
          >
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true">🇷🇺</span>
              <span
                className={`transition-opacity duration-150 ${
                  menuLabelsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {t(locale, "language.ru")}
              </span>
            </span>
            <span className="text-xs text-gray-500 dark:text-white/70">RU</span>
          </button>
          <button
            type="button"
            onClick={() => applyLang("en")}
            className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
              locale === "en"
                ? "bg-blue-100 text-blue-900 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.45)] dark:bg-blue-500/25 dark:text-white dark:shadow-[inset_0_0_0_1px_rgba(96,165,250,0.45)]"
                : "hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
            role="menuitem"
          >
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true">🇬🇧</span>
              <span
                className={`transition-opacity duration-150 ${
                  menuLabelsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {t(locale, "language.en")}
              </span>
            </span>
            <span className="text-xs text-gray-500 dark:text-white/70">EN</span>
          </button>
      </div>
    </div>
  );
}
