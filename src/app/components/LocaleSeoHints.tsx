import { headers } from 'next/headers'
import { SITE_URL } from '@/app/lib/seo'
import { localizedAbsoluteUrl, stripLocalePrefix } from '@/app/lib/locale-path'

/**
 * Corrects html lang + canonical for /en/* requests (middleware sets x-apsod-* headers).
 * Static page metadata still ships RU canonical; this overrides for English.
 */
export default async function LocaleSeoHints() {
  const h = await headers()
  const locale = h.get('x-apsod-locale') === 'en' ? 'en' : 'ru'
  const rawPath = h.get('x-apsod-pathname') || '/'
  const clean = stripLocalePrefix(rawPath)
  const canonical = localizedAbsoluteUrl(SITE_URL, locale, clean)
  const ru = localizedAbsoluteUrl(SITE_URL, 'ru', clean)
  const en = localizedAbsoluteUrl(SITE_URL, 'en', clean)

  return (
    <>
      {locale === 'en' ? <link rel="canonical" href={canonical} key="canonical-en" /> : null}
      <link rel="alternate" hrefLang="ru" href={ru} />
      <link rel="alternate" hrefLang="en" href={en} />
      <link rel="alternate" hrefLang="x-default" href={ru} />
    </>
  )
}
