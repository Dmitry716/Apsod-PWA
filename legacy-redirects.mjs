/** 301 с адресов старого HTML-сайта (см. GSC Coverage 404). */
export const legacyRedirects = [
  { source: '/privacy', destination: '/legal/privacy-policy', permanent: true },
  { source: '/home', destination: '/', permanent: true },
  { source: '/index.html', destination: '/', permanent: true },
  { source: '/services/blog-dark.html', destination: '/blog', permanent: true },
  { source: '/services/web', destination: '/services/web-development', permanent: true },
  { source: '/terms', destination: '/legal/terms-of-use', permanent: true },
  { source: '/services/security', destination: '/services/technical-support', permanent: true },
  { source: '/blog/gpt-5-revolution-web-development', destination: '/blog', permanent: true },
  { source: '/о нас', destination: '/about', permanent: true },
  { source: '/о%20нас', destination: '/about', permanent: true },
]
