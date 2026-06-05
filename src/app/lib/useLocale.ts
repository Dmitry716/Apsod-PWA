'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Locale } from './i18n'
import { normalizeLocale } from './i18n'

const LOCALE_EVENT = 'apsod:locale-change'

function readLangFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)lang=(ru|en)(?:;|$)/)
  return match?.[1] ?? null
}

export function useLocale() {
  const router = useRouter()
  const pathname = usePathname()
  const initialLocale = (() => {
    const stored =
      typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null
    const cookieLang = readLangFromCookie()
    return normalizeLocale(stored ?? cookieLang)
  })()

  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    const syncLocale = () => {
      const stored = window.localStorage.getItem('lang')
      const cookieLang = readLangFromCookie()
      setLocale(normalizeLocale(stored ?? cookieLang))
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === 'lang') syncLocale()
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener(LOCALE_EVENT, syncLocale)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(LOCALE_EVENT, syncLocale)
    }
  }, [])

  const value = useMemo(() => {
    const setLang = (next: Locale) => {
      window.localStorage.setItem('lang', next)
      // Cookie чтобы SSR (RootLayout и server components) тоже знали локаль.
      document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`
      setLocale(next)
      window.dispatchEvent(new Event(LOCALE_EVENT))

      const basePath = pathname || '/'
      const pathWithoutLocale = basePath.replace(/^\/(en|ru)(?=\/|$)/, '') || '/'
      const targetPath = next === 'en' ? `/en${pathWithoutLocale === '/' ? '' : pathWithoutLocale}` : pathWithoutLocale
      const search = window.location.search || ''
      const hash = window.location.hash || ''
      const nextUrl = `${targetPath}${search}${hash}`
      const currentUrl = `${window.location.pathname}${search}${hash}`
      if (nextUrl !== currentUrl) {
        router.replace(nextUrl)
      }
    }

    return { locale, setLang }
  }, [locale, pathname, router])

  return value
}

