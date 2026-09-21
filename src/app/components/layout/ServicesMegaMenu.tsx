'use client'

import type { Locale } from '@/app/lib/i18n'
import LocaleLink from '../LocaleLink'

export type MegaLink = {
  href: string
  labelRu: string
  labelEn: string
}

export type MegaColumn = {
  titleRu: string
  titleEn: string
  /** Hide title when column continues previous group */
  hideTitle?: boolean
  links: MegaLink[]
}

export const SERVICES_MEGA_COLUMNS: MegaColumn[] = [
  {
    titleRu: 'Услуги',
    titleEn: 'Services',
    links: [
      { href: '/services/web-development', labelRu: 'Веб-разработка', labelEn: 'Web development' },
      { href: '/services/mobile-development', labelRu: 'Мобильные приложения', labelEn: 'Mobile apps' },
      { href: '/services/pwa-development', labelRu: 'PWA', labelEn: 'PWA' },
      { href: '/services/ui-ux', labelRu: 'UI/UX дизайн', labelEn: 'UI/UX design' },
      { href: '/services/seo', labelRu: 'SEO-продвижение', labelEn: 'SEO promotion' },
      { href: '/services/geo-promotion', labelRu: 'GEO в нейросетях', labelEn: 'GEO in AI answers' },
      { href: '/services/technical-support', labelRu: 'Техподдержка', labelEn: 'Technical support' },
    ],
  },
  {
    titleRu: 'Решения',
    titleEn: 'Solutions',
    links: [
      { href: '/services/landing-page', labelRu: 'Лендинг', labelEn: 'Landing page' },
      { href: '/services/corporate-sites', labelRu: 'Корпоративный сайт', labelEn: 'Corporate site' },
      { href: '/services/ecommerce', labelRu: 'Интернет-магазин', labelEn: 'Online store' },
      { href: '/services/crm', labelRu: 'CRM', labelEn: 'CRM' },
    ],
  },
  {
    titleRu: 'Решения',
    titleEn: 'Solutions',
    hideTitle: true,
    links: [
      { href: '/services/erp', labelRu: 'ERP и учёт', labelEn: 'ERP & accounting' },
      { href: '/services/ios-apps', labelRu: 'iOS', labelEn: 'iOS' },
      { href: '/services/android-apps', labelRu: 'Android', labelEn: 'Android' },
      { href: '/services/pwa-development', labelRu: 'PWA', labelEn: 'PWA' },
    ],
  },
  {
    titleRu: 'Технологии',
    titleEn: 'Technologies',
    links: [
      { href: '/services#tech-stack', labelRu: 'Next.js', labelEn: 'Next.js' },
      { href: '/services#tech-stack', labelRu: 'React', labelEn: 'React' },
      { href: '/services#tech-stack', labelRu: 'ASP.NET Core', labelEn: 'ASP.NET Core' },
      { href: '/services#tech-stack', labelRu: 'Node.js', labelEn: 'Node.js' },
      { href: '/services#tech-stack', labelRu: 'Flutter', labelEn: 'Flutter' },
      { href: '/services#tech-stack', labelRu: 'React Native', labelEn: 'React Native' },
      { href: '/services#tech-stack', labelRu: 'PostgreSQL', labelEn: 'PostgreSQL' },
      { href: '/services#tech-stack', labelRu: 'Azure', labelEn: 'Azure' },
    ],
  },
]

type PanelProps = {
  locale: Locale
  onNavigate?: () => void
  id?: string
}

export function ServicesMegaPanel({ locale, onNavigate, id }: PanelProps) {
  const isEn = locale === 'en'

  return (
    <div
      id={id}
      role="region"
      aria-label={isEn ? 'Services menu' : 'Меню услуг'}
      className="border-t border-slate-200/90 bg-white dark:border-slate-700/80 dark:bg-[#0b1220]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:py-12">
          {SERVICES_MEGA_COLUMNS.map((column, index) => (
            <div
              key={`${column.titleEn}-${index}`}
              className={`lg:px-8 ${
                index > 0
                  ? 'lg:border-l lg:border-slate-200 dark:lg:border-slate-700/70'
                  : 'lg:pl-0'
              } ${index === SERVICES_MEGA_COLUMNS.length - 1 ? 'lg:pr-0' : ''}`}
            >
              <p
                className={`mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 ${
                  column.hideTitle ? 'invisible select-none lg:mb-4' : ''
                }`}
                aria-hidden={column.hideTitle || undefined}
              >
                {isEn ? column.titleEn : column.titleRu}
              </p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.titleEn}-${link.href}-${link.labelEn}`}>
                    <LocaleLink
                      href={link.href}
                      onClick={onNavigate}
                      className="font-sans text-[15px] font-normal leading-snug text-slate-800 transition-colors hover:text-[var(--apsod-accent)] dark:text-slate-100 dark:hover:text-sky-400"
                    >
                      {isEn ? link.labelEn : link.labelRu}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-slate-100 py-4 dark:border-slate-800">
          <LocaleLink
            href="/services"
            onClick={onNavigate}
            className="font-sans text-sm font-semibold text-[var(--apsod-accent)] transition-opacity hover:opacity-80"
          >
            {isEn ? 'All services →' : 'Все услуги →'}
          </LocaleLink>
          <LocaleLink
            href="/contact"
            onClick={onNavigate}
            className="apsod-btn-solid inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold"
          >
            {isEn ? 'Contact us' : 'Связаться'}
          </LocaleLink>
        </div>
      </div>
    </div>
  )
}

type MobileProps = {
  locale: Locale
  open: boolean
  onToggle: () => void
  onNavigate: () => void
}

export function ServicesMobileAccordion({ locale, open, onToggle, onNavigate }: MobileProps) {
  const isEn = locale === 'en'
  const label = isEn ? 'Services' : 'Услуги'

  return (
    <div className="border-b border-slate-100 dark:border-slate-800">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between p-3 text-left text-[13px] font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-100"
      >
        <span>{label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.1 1.02l-4.25 4.5a.75.75 0 01-1.1 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open ? (
        <div className="space-y-4 px-3 pb-4">
          {SERVICES_MEGA_COLUMNS.filter((c) => !c.hideTitle || c.links.length).map((column, index) => (
            <div key={`m-${column.titleEn}-${index}`}>
              {!column.hideTitle ? (
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  {isEn ? column.titleEn : column.titleRu}
                </p>
              ) : null}
              <ul className="space-y-1">
                {column.links.map((link) => (
                  <li key={`m-${link.href}-${link.labelEn}`}>
                    <LocaleLink
                      href={link.href}
                      onClick={onNavigate}
                      className="block rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                    >
                      {isEn ? link.labelEn : link.labelRu}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <LocaleLink
            href="/services"
            onClick={onNavigate}
            className="inline-flex px-2 py-1 text-sm font-semibold text-[var(--apsod-accent)]"
          >
            {isEn ? 'All services →' : 'Все услуги →'}
          </LocaleLink>
        </div>
      ) : null}
    </div>
  )
}
