'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Locale } from './i18n'
import { normalizeLocale } from './i18n'

function readLangFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)lang=(ru|en)(?:;|$)/)
  return match?.[1] ?? null
}

export function useLocale() {
  const initialLocale = (() => {
    const stored =
      typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null
    const cookieLang = readLangFromCookie()
    return normalizeLocale(stored ?? cookieLang)
  })()

  const [locale, setLocale] = useState<Locale>(initialLocale)

  const value = useMemo(() => {
    const setLang = (next: Locale) => {
      window.localStorage.setItem('lang', next)
      // Cookie чтобы SSR (RootLayout и server components) тоже знали локаль.
      document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`
      setLocale(next)
    }

    return { locale, setLang }
  }, [locale])

  return value
}

