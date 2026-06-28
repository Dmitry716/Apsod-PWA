import { NextRequest, NextResponse } from 'next/server'

type Locale = 'ru' | 'en'

function stripLocalePrefix(pathname: string, locale: Locale) {
  if (locale === 'en') return pathname.replace(/^\/en/, '') || '/'
  return pathname.replace(/^\/ru/, '') || '/'
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const { pathname } = url

  // Skip Next internals, API, SEO files, and static assets
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

  // Guarantee routes:
  // - /en/* should serve existing / * routes
  // - /ru/* should serve existing / * routes
  // This avoids redirect loops and 404s.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    url.pathname = stripLocalePrefix(pathname, 'en')
    const res = NextResponse.rewrite(url)
    res.cookies.set('lang', 'en', { path: '/' })
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return res
  }

  if (pathname === '/ru' || pathname.startsWith('/ru/')) {
    url.pathname = stripLocalePrefix(pathname, 'ru')
    const res = NextResponse.rewrite(url)
    res.cookies.set('lang', 'ru', { path: '/' })
    res.headers.set('X-Robots-Tag', 'noindex, follow')
    return res
  }

  // No locale prefix: keep URL as-is, but ensure cookie exists for SSR.
  const cookieLang = req.cookies.get('lang')?.value
  const lang: Locale = cookieLang === 'en' ? 'en' : 'ru'
  const res = NextResponse.next()
  res.cookies.set('lang', lang, { path: '/' })
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|sw.js|notification-sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt|json|js|woff2?)$).*)',
  ],
}

