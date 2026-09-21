"use client";

import type { ReactNode } from "react";
import LocaleLink from "../LocaleLink";
import { COMPANY, COMPANY_ADDRESS_DISPLAY } from "@/app/lib/seo";
import { t } from "@/app/lib/i18n";
import { useLocale } from "@/app/lib/useLocale";
import LanguageSwitcher from "../ui/LanguageSwitcher";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const external = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-orange-400 hover:text-orange-300"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { locale } = useLocale();
  const isEn = locale === "en";

  const nav = [
    { href: "/about", label: t(locale, "nav.about") },
    { href: "/services", label: t(locale, "nav.services") },
    { href: "/portfolio", label: t(locale, "nav.cases") },
    { href: "/blog", label: t(locale, "nav.blog") },
  ];

  const legal = [
    { href: "/legal/privacy-policy", label: t(locale, "footer.privacy") },
    { href: "/legal/cookie-policy", label: t(locale, "footer.cookie") },
    { href: "/legal/terms-of-use", label: t(locale, "footer.terms") },
  ];

  return (
    <footer
      role="contentinfo"
      aria-label={isEn ? "Site footer" : "Подвал сайта"}
      className="border-t border-white/10 bg-black text-white"
    >
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 lg:px-8 lg:pt-16 lg:pb-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <LocaleLink
              href="/"
              className="font-display text-[1.75rem] font-extrabold uppercase tracking-[0.04em] transition-opacity hover:opacity-70"
            >
              APSOD
            </LocaleLink>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              {isEn
                ? "Product engineering for web and mobile."
                : "Product engineering для веба и мобильных."}
            </p>
          </div>

          <nav aria-label={t(locale, "footer.navigation")}>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <LocaleLink
                    href={item.href}
                    className="text-xs font-bold uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-orange-300"
                  >
                    {item.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex shrink-0 items-center gap-2" aria-label="Social">
            <li>
              <SocialIcon href={COMPANY.telegramUrl} label={`Telegram ${COMPANY.telegramHandle}`}>
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </SocialIcon>
            </li>
            <li>
              <SocialIcon href={COMPANY.whatsappUrl} label="WhatsApp">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </SocialIcon>
            </li>
            <li>
              <SocialIcon href={`mailto:${COMPANY.email}`} label={COMPANY.email}>
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
                </svg>
              </SocialIcon>
            </li>
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 sm:items-end sm:gap-8">
          <div>
            <h3 className="font-display mb-2 text-sm font-semibold">
              {t(locale, "footer.countryBy")}
            </h3>
            <p className="mb-0 text-sm leading-relaxed text-white/50">
              {COMPANY_ADDRESS_DISPLAY}
            </p>
            <p className="mb-0 mt-2 text-xs text-white/35">
              ИП Карелин Д.В. · УНП 391853923
            </p>
          </div>

          <div>
            <a
              href={`tel:${COMPANY.phoneE164}`}
              className="text-sm text-white transition-colors hover:text-orange-300"
            >
              {COMPANY.phone}
            </a>
          </div>

          <div className="sm:text-right">
            <LocaleLink
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-orange-300 transition-opacity hover:opacity-80"
            >
              {t(locale, "footer.contactCta")}
              <span aria-hidden>→</span>
            </LocaleLink>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="mb-0 text-sm text-white/40">© {year} APSOD</p>
            <LanguageSwitcher compact dropUp />
          </div>

          <nav
            aria-label={isEn ? "Legal" : "Юридическая информация"}
            className="text-[13px] text-white/40"
          >
            <ul className="flex flex-wrap items-center gap-y-1">
              {legal.map((item, i) => (
                <li key={item.href} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-2.5 text-white/20" aria-hidden>
                      /
                    </span>
                  )}
                  <LocaleLink
                    href={item.href}
                    className="transition-colors hover:text-orange-300"
                  >
                    {item.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
