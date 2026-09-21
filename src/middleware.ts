import { NextRequest, NextResponse } from 'next/server'

type Locale = 'ru' | 'en'

/** Старые URL из GSC (404), в т.ч. кириллица после www→apex. */
const LEGACY_EXACT_REDIRECTS: Record<string, string> = {
  '/о нас': '/about',
  '/careers': '/contact',
}

function decodePathname(pathname: string): string {
  try {
    return decodeURIComponent(pathname)
  } catch {
    return pathname
  }
}

function legacyRedirectTarget(pathname: string): string | undefined {
  const decoded = decodePathname(pathname)
  return LEGACY_EXACT_REDIRECTS[decoded] ?? LEGACY_EXACT_REDIRECTS[pathname]
}

function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|ru)(?=\/|$)/, '')
  return stripped || '/'
}

function withEnPrefix(pathname: string): string {
  const clean = stripLocalePrefix(pathname)
  if (clean === '/') return '/en'
  return `/en${clean}`
}

function isExempt(pathname: string): boolean {
  return (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/images')
  )
}

function setLangCookie(res: NextResponse, lang: Locale) {
  res.cookies.set('lang', lang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const { pathname } = url

  const legacyTarget = legacyRedirectTarget(pathname)
  if (legacyTarget) {
    const target = new URL(legacyTarget + url.search, 'https://apsod.com')
    return NextResponse.redirect(target, 301)
  }

  const host = req.headers.get('host')?.split(':')[0]
  if (host === 'www.apsod.com') {
    const canonical = new URL(pathname + url.search, 'https://apsod.com')
    return NextResponse.redirect(canonical, 301)
  }

  if (pathname === '/Contact') {
    return NextResponse.redirect(new URL('/contact' + url.search, req.url), 301)
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/images') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  if (isExempt(pathname)) {
    return NextResponse.next()
  }

  // /ru/* → canonical unprefixed RU
  if (pathname === '/ru' || pathname.startsWith('/ru/')) {
    const clean = stripLocalePrefix(pathname)
    const res = NextResponse.redirect(new URL(clean + url.search, req.url), 308)
    setLangCookie(res, 'ru')
    return res
  }

  // /en/* → keep URL, rewrite to App Router path without prefix
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const clean = stripLocalePrefix(pathname)
    url.pathname = clean

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-apsod-locale', 'en')
    requestHeaders.set('x-apsod-pathname', pathname)

    const res = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    })
    setLangCookie(res, 'en')
    return res
  }

  // Cookie says EN but URL has no /en → soft-redirect into the EN namespace
  const cookieLang = req.cookies.get('lang')?.value
  if (cookieLang === 'en') {
    const res = NextResponse.redirect(new URL(withEnPrefix(pathname) + url.search, req.url), 307)
    setLangCookie(res, 'en')
    return res
  }

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-apsod-locale', 'ru')
  requestHeaders.set('x-apsod-pathname', pathname)

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  })
  setLangCookie(res, 'ru')
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|sw.js|notification-sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt|json|js|woff2?)$).*)',
  ],
}
