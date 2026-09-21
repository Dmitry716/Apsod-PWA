import type { Locale } from './i18n'

export type { Locale }

export const DEFAULT_LOCALE: Locale = 'ru'
export const LOCALES: Locale[] = ['ru', 'en']

/** Paths that must never get an /en prefix or locale cookie redirect */
export const LOCALE_EXEMPT_PREFIXES = [
  '/api',
  '/admin',
  '/dashboard',
  '/_next',
  '/icons',
  '/images',
] as const

export function isLocaleExemptPath(pathname: string): boolean {
  return LOCALE_EXEMPT_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  return 'ru'
}

/** Strip leading /en or /ru prefix */
export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|ru)(?=\/|$)/, '')
  return stripped || '/'
}

/**
 * Build a public URL path for the given locale.
 * RU (default) has no prefix; EN uses `/en/...`.
 */
export function withLocale(locale: Locale, href: string): string {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
    return href
  }

  const hashIndex = href.indexOf('#')
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : ''
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href

  const queryIndex = withoutHash.indexOf('?')
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : ''
  const pathOnly = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash

  if (pathOnly.startsWith('#')) return href

  const clean = stripLocalePrefix(pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`)

  if (locale === 'en') {
    if (clean === '/') return `/en${query}${hash}`
    return `/en${clean}${query}${hash}`
  }

  return `${clean}${query}${hash}`
}

/** Absolute canonical URL for a locale + path (path may already be localized) */
export function localizedAbsoluteUrl(siteUrl: string, locale: Locale, path: string): string {
  const base = siteUrl.replace(/\/$/, '')
  const localized = withLocale(locale, stripLocalePrefix(path))
  return `${base}${localized === '/' ? '' : localized}` || base
}

export function buildHreflangAlternates(siteUrl: string, path: string) {
  const clean = stripLocalePrefix(path)
  const ru = localizedAbsoluteUrl(siteUrl, 'ru', clean)
  const en = localizedAbsoluteUrl(siteUrl, 'en', clean)
  return {
    canonical: undefined as string | undefined, // set by caller per-locale
    languages: {
      ru,
      en,
      'x-default': ru,
    },
  }
}
