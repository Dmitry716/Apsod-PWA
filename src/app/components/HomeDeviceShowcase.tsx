import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import SectionAtmosphere from './SectionAtmosphere'

const SHOWCASE = [
  {
    src: '/portfolio/legal-team.jpg',
    alt: 'Legal Team — юридическая компания',
    href: '/portfolio/legal-team',
    className: 'col-span-12 min-w-0 w-full aspect-[16/9] md:aspect-[21/9] md:min-h-[360px]',
    objectPosition: '32% center',
    priority: true,
    label: 'Legal Team · Москва',
  },
  {
    src: '/portfolio/amba.png',
    alt: 'Amba Detail',
    href: '/portfolio/amba-detail',
    className: 'col-span-12 min-w-0 w-full md:col-span-6 aspect-[16/10]',
    priority: false,
    label: undefined,
  },
  {
    src: '/portfolio/nexton.png',
    alt: 'NEXTON',
    href: '/portfolio/nexton',
    className: 'col-span-12 min-w-0 w-full md:col-span-6 aspect-[16/10]',
    priority: false,
    label: undefined,
  },
  {
    src: '/devices/showcase-iphone.png',
    alt: 'Мобильный интерфейс проекта',
    href: '/portfolio/artdetailing',
    className: 'col-span-12 min-w-0 w-full md:col-span-5 aspect-[4/5] md:aspect-auto md:min-h-full',
    priority: false,
    label: undefined,
  },
  {
    src: '/portfolio/artdetailing.png',
    alt: 'ArtDetailing',
    href: '/portfolio/artdetailing',
    className: 'col-span-12 min-w-0 w-full md:col-span-7 aspect-[16/10]',
    priority: false,
    label: undefined,
  },
] as const

export default function HomeDeviceShowcase() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-slate-50 dark:bg-gray-950 border-y border-slate-200 dark:border-slate-800">
      <SectionAtmosphere tone="slate" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="mb-12 md:mb-16 max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Интерфейс как продукт
          </h2>
        </Reveal>

        <div className="grid grid-cols-12 gap-3 md:gap-4 min-w-0">
          {SHOWCASE.map((item, i) => (
            <Reveal
              key={item.src}
              stagger={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}
              className={item.className}
            >
              <Link
                href={item.href}
                className="apsod-media-frame group relative block h-full min-h-0 overflow-hidden bg-slate-200/80 dark:bg-slate-900"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={`transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] ${
                    item.priority
                      ? 'object-cover'
                      : 'object-contain object-center p-3 md:p-4'
                  }`}
                  style={
                    'objectPosition' in item && item.objectPosition
                      ? { objectPosition: item.objectPosition }
                      : undefined
                  }
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority={item.priority}
                />
                {item.label ? (
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-slate-950/85 to-transparent">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-amber-400/90 mb-1">
                      Избранный кейс
                    </p>
                    <p className="font-display text-lg md:text-xl font-semibold text-white tracking-tight">
                      {item.label}
                    </p>
                  </div>
                ) : null}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
