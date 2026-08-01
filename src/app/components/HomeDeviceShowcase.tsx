import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import SectionAtmosphere from './SectionAtmosphere'

const SHOWCASE = [
  {
    src: '/devices/showcase-monitor.png',
    alt: 'Интерфейс проекта на Studio Display',
    href: '/portfolio/amba-detail',
    className: 'col-span-12 md:col-span-7 aspect-[16/10]',
  },
  {
    src: '/devices/showcase-iphone.png',
    alt: 'Мобильный интерфейс проекта',
    href: '/portfolio/artdetailing',
    className: 'col-span-12 md:col-span-5 aspect-[4/5] md:aspect-auto md:min-h-full',
  },
  {
    src: '/portfolio/amba.png',
    alt: 'Amba Detail',
    href: '/portfolio/amba-detail',
    className: 'col-span-12 md:col-span-6 aspect-[16/10]',
  },
  {
    src: '/portfolio/nexton.png',
    alt: 'NEXTON',
    href: '/portfolio/nexton',
    className: 'col-span-12 md:col-span-6 aspect-[16/10]',
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

        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {SHOWCASE.map((item, i) => (
            <Reveal
              key={item.src}
              stagger={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}
              className={item.className}
            >
              <Link
                href={item.href}
                className="apsod-media-frame group relative block h-full min-h-[220px] md:min-h-[300px] overflow-hidden bg-slate-200/80 dark:bg-slate-900"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority={i === 0}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
