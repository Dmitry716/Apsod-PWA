import Link from 'next/link'
import DeviceMockup from '../../components/DeviceMockup'
import Reveal from '../../components/Reveal'
import SectionAtmosphere from '../../components/SectionAtmosphere'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { COMPANY_AREA_SERVED, SITE_URL, buildServiceMetadata } from '../../lib/seo'

export const metadata = buildServiceMetadata('mobile-development')

const PLATFORMS = [
  {
    title: 'iOS',
    body: 'Swift, SwiftUI и React Native. Продукт под App Store на iPhone 17 Pro Max и всей линейке Apple.',
    href: '/services/ios-apps',
    device: 'iphone' as const,
    screen: '/devices/app-screens/home.png',
    cta: 'iOS подробнее',
  },
  {
    title: 'Android',
    body: 'Kotlin, Jetpack Compose и React Native. Google Play и широкий парк устройств — включая Samsung Galaxy S26.',
    href: '/services/android-apps',
    device: 'samsung' as const,
    screen: '/devices/app-screens/services.png',
    cta: 'Android подробнее',
  },
]

export default function MobileDevelopmentPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Разработка мобильных приложений',
    description:
      'Разработка мобильных приложений iOS и Android в Минске. React Native, Flutter, Swift, Kotlin.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: COMPANY_AREA_SERVED,
    url: `${SITE_URL}/services/mobile-development`,
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ServiceBreadcrumbs service="mobile-development" />
      <SeoJsonLd data={serviceSchema} />

      <section className="relative min-h-[min(88vh,820px)] flex items-center overflow-hidden bg-slate-950 text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 py-24 md:py-28">
          <div className="max-w-2xl">
            <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-[11px] font-medium tracking-[0.22em] uppercase text-slate-400 mb-5">
              Мобильная разработка
            </p>
            <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.08] mb-5">
              Приложения для iOS и Android
            </h1>
            <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-base md:text-lg text-slate-300 leading-relaxed mb-9 max-w-lg">
              Натив или кроссплатформа — от MVP до релиза в сторах. Выберите платформу или закажите обе.
            </p>
            <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
              <Link
                href="/services/ios-apps"
                className="apsod-btn-solid apsod-cta-primary px-7 py-3.5 rounded-md text-sm font-semibold"
              >
                <span>iOS</span>
              </Link>
              <Link
                href="/services/android-apps"
                className="px-7 py-3.5 rounded-md text-sm font-semibold border border-white/30 text-white hover:border-white transition-colors"
              >
                Android
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-md text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Начать проект →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12 md:mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Платформы
            </h2>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
            {PLATFORMS.map((item, index) => (
              <Reveal key={item.href} stagger={(Math.min(index + 1, 2) as 1 | 2)} className="h-full">
                <Link
                  href={item.href}
                  className="group grid h-full grid-cols-1 gap-6 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-8 sm:items-center"
                >
                  <div className="mx-auto w-[132px] shrink-0 sm:mx-0">
                    <DeviceMockup device={item.device} screenSrc={item.screen} screenAlt={item.title} />
                  </div>
                  <div className="min-w-0 text-center sm:text-left">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-500">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5 text-pretty">
                      {item.body}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                      {item.cta}
                      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaqBlock service="mobile-development" />

      <section className="relative py-20 md:py-28 overflow-hidden bg-slate-950 text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Обсудим приложение
            </h2>
            <Link
              href="/contact"
              className="apsod-btn-solid apsod-cta-primary inline-flex px-10 py-4 rounded-md text-sm font-semibold"
            >
              <span>Начать Discovery</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
