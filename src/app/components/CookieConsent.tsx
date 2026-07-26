"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200/80 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-label="Согласие на cookie"
    >
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <p className="flex-1 text-sm text-slate-600 dark:text-slate-300 leading-snug">
          Мы используем cookie для работы сайта и аналитики. Подробнее — в{" "}
          <Link
            href="/legal/cookie-policy"
            className="underline underline-offset-2 text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400"
          >
            политике cookie
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={declineCookies}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Отклонить
          </button>
          <button
            type="button"
            onClick={acceptCookies}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
