"use client";

import Link from "next/link";
import PushNotificationSubscribe from "../PushNotificationSubscribe";
import { COMPANY, COMPANY_ADDRESS_DISPLAY } from "@/app/lib/seo";
import { t } from "@/app/lib/i18n";
import { useLocale } from "@/app/lib/useLocale";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const linkClass =
  "text-sm text-slate-300 hover:text-white focus:text-white focus:outline-none transition-colors";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { locale } = useLocale();
  const isEn = locale === "en";

  const serviceLinks = [
    { href: "/services/web-development", label: isEn ? "Web development" : "Разработка сайтов" },
    { href: "/services/seo", label: isEn ? "SEO" : "SEO-продвижение" },
    { href: "/services/geo-promotion", label: isEn ? "GEO in AI" : "GEO в нейросетях" },
    { href: "/services/mobile-development", label: isEn ? "Mobile apps" : "Мобильные приложения" },
    { href: "/services", label: isEn ? "All services" : "Все услуги" },
  ];

  const companyLinks = [
    { href: "/pricing", label: isEn ? "Pricing" : "Цены" },
    { href: "/ready-sites", label: isEn ? "Ready sites" : "Готовые сайты" },
    { href: "/portfolio", label: t(locale, "nav.portfolio") },
    { href: "/about", label: t(locale, "nav.about") },
    { href: "/blog", label: t(locale, "nav.blog") },
    { href: "/contact", label: t(locale, "nav.contact") },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Подвал сайта"
      className="relative overflow-hidden bg-slate-950 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 0%, rgba(37,99,235,0.25), transparent), radial-gradient(ellipse 50% 40% at 90% 100%, rgba(8,145,178,0.15), transparent)",
        }}
      />

      <div className="container mx-auto px-4 pt-14 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              aria-label="APSOD — на главную"
            >
              <span className="text-2xl font-bold tracking-tight text-white">APSOD</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {isEn
                ? "IT company and web studio: custom sites, apps, SEO and GEO for clients worldwide."
                : "IT-компания и веб-студия: сайты и приложения на уникальном коде, SEO и GEO для клиентов по миру."}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors px-2.5 py-1.5 rounded-md border border-white/10 hover:border-white/25"
                aria-label={t(locale, "footer.toTop")}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {t(locale, "footer.toTop")}
              </button>
            </div>
          </div>

          {/* Services */}
          <nav className="lg:col-span-2" aria-labelledby="footer-services">
            <h4 id="footer-services" className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              {isEn ? "Services" : "Услуги"}
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav className="lg:col-span-2" aria-labelledby="footer-company">
            <h4 id="footer-company" className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              {isEn ? "Company" : "Компания"}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacts */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 id="footer-contacts" className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                {isEn ? "Contacts" : "Контакты"}
              </h4>
              <address className="not-italic space-y-2.5 text-sm text-slate-300" aria-labelledby="footer-contacts">
                <p>
                  <a href={`tel:${COMPANY.phoneE164}`} className={linkClass}>
                    {COMPANY.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${COMPANY.email}`} className={linkClass}>
                    {COMPANY.email}
                  </a>
                </p>
                <p>
                  <a
                    href={COMPANY.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Telegram {COMPANY.telegramHandle}
                  </a>
                </p>
                <p className="text-slate-500 pt-1">{COMPANY_ADDRESS_DISPLAY}</p>
                <p className="text-xs text-slate-500">ИП Карелин Д.В. · УНП 391853923</p>
              </address>
            </div>
            <div>
              <h4
                id="footer-subscribe"
                className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3"
              >
                {t(locale, "footer.subscribe")}
              </h4>
              <PushNotificationSubscribe compact={true} />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-slate-500 order-2 md:order-1">
            © {currentYear} APSOD. {t(locale, "footer.copy")}
          </p>
          <nav aria-label="Юридическая информация" className="order-1 md:order-2">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
              <li>
                <Link href="/legal/privacy-policy" className="hover:text-slate-300 transition-colors">
                  {t(locale, "footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy" className="hover:text-slate-300 transition-colors">
                  {t(locale, "footer.cookie")}
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-of-use" className="hover:text-slate-300 transition-colors">
                  {t(locale, "footer.terms")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
