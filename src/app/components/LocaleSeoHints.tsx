import { headers } from 'next/headers'
import { SITE_URL } from '@/app/lib/seo'
import { localizedAbsoluteUrl, stripLocalePrefix } from '@/app/lib/locale-path'

/**
 * Canonical + hreflang. `/en/` закрыт в robots — всегда канонизируем на RU URL.
 */
export default async function LocaleSeoHints() {
  const h = await headers()
  const rawPath = h.get('x-apsod-pathname') || '/'
  const clean = stripLocalePrefix(rawPath)
  const ru = localizedAbsoluteUrl(SITE_URL, 'ru', clean)

  return (
    <>
      <link rel="canonical" href={ru} key="canonical-ru" />
      <link rel="alternate" hrefLang="ru" href={ru} />
      <link rel="alternate" hrefLang="x-default" href={ru} />
    </>
  )
}
