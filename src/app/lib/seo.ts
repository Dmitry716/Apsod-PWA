import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  path?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
}

export const siteConfig = {
  name: 'APSOD',
  url: 'https://apsod.com', // ← изменено с vercel.app на apsod.com
  ogImage: '/og-image.jpg',
  logo: '/icons/icon-512x512.png',
  email: 'karelin@apsod.com', // если email такой же
  phone: '+375 (44) 577-77-24',
  address: 'г. Минск, ул.Фрунзе 9',
  social: {
    whatsapp: 'https://wa.me/375445777724',
    telegram: 'https://t.me/DMITRYJS',
    facebook: 'https://www.facebook.com/share/1GuC7K2jZ1/?mibextid=wwXIfr',
  }
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = siteConfig.ogImage,
  path = '',
  type = 'website',
  publishedTime,
  author = 'APSOD',
}: SEOProps): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`
  const url = `${siteConfig.url}${path}`

  const baseMetadata: Metadata = {
    title: fullTitle,
    description,
    keywords: ['IT компания', 'веб разработка', 'мобильные приложения', ...keywords].join(', '),
    authors: [{ name: author }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ru_RU',
      type,
      ...(publishedTime && { publishedTime }),
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@apsod',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    alternates: {
      canonical: url,
    },
  }

  return baseMetadata
}

// Schema.org разметка
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: 'Минск',
      addressCountry: 'BY',
    },
    sameAs: Object.values(siteConfig.social),
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}