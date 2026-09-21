'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Locale } from './i18n'
import { normalizeLocale } from './i18n'
import {
  getLocaleFromPathname,
  stripLocalePrefix,
  withLocale,
} from './locale-path'

const LOCALE_EVENT = 'apsod:locale-change'

function readLangFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)lang=(ru|en)(?:;|$)/)
  return match?.[1] ?? null
}

function resolveLocale(pathname: string | null): Locale {
  if (typeof window !== 'undefined') {
    const fromUrl = getLocaleFromPathname(window.location.pathname)
    if (fromUrl === 'en' || window.location.pathname.startsWith('/en')) {
      return 'en'
    }
  }
  if (pathname) {
    const fromPath = getLocaleFromPathname(pathname)
    if (fromPath === 'en') return 'en'
  }
  const stored =
    typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null
  const cookieLang = readLangFromCookie()
  return normalizeLocale(stored ?? cookieLang)
}

export function useLocale() {
  const router = useRouter()
  const pathname = usePathname()
  const [locale, setLocale] = useState<Locale>(() => resolveLocale(pathname))

  useEffect(() => {
    setLocale(resolveLocale(pathname))
  }, [pathname])

  useEffect(() => {
    const syncLocale = () => setLocale(resolveLocale(pathname))

    const onStorage = (event: StorageEvent) => {
      if (event.key === 'lang') syncLocale()
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener(LOCALE_EVENT, syncLocale)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(LOCALE_EVENT, syncLocale)
    }
  }, [pathname])

  const value = useMemo(() => {
    const setLang = (next: Locale) => {
      window.localStorage.setItem('lang', next)
      document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`
      setLocale(next)
      window.dispatchEvent(new Event(LOCALE_EVENT))

      const currentPath =
        typeof window !== 'undefined' ? window.location.pathname : pathname || '/'
      const cleanPath = stripLocalePrefix(currentPath)
      const targetPath = withLocale(next, cleanPath)
      const search = window.location.search || ''
      const hash = window.location.hash || ''
      const nextUrl = `${targetPath}${search}${hash}`
      const currentUrl = `${window.location.pathname}${search}${hash}`

      if (nextUrl !== currentUrl) {
        router.push(nextUrl)
      } else {
        router.refresh()
      }
    }

    /** Localize an internal href for the active (or given) locale */
    const href = (path: string, forLocale: Locale = locale) =>
      withLocale(forLocale, path)

    return { locale, setLang, href }
  }, [locale, pathname, router])

  return value
}
