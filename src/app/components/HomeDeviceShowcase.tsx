import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'

const SHOWCASE = [
  {
    src: '/portfolio/legal-team.jpg',
    alt: 'Legal Team — юридическая компания',
    href: '/portfolio/legal-team',
    className: 'col-span-12 min-w-0 w-full aspect-[16/9] md:aspect-[21/9] md:min-h-[320px]',
    objectPosition: '32% center',
    priority: true,
    label: 'Legal Team · Москва',
    id: 'LT-01',
  },
  {
    src: '/portfolio/amba.png',
    alt: 'Amba Detail',
    href: '/portfolio/amba-detail',
    className: 'col-span-12 min-w-0 w-full md:col-span-6 aspect-[16/10]',
    priority: false,
    label: 'Amba Detail',
    id: 'AD-02',
  },
  {
    src: '/portfolio/nexton.png',
    alt: 'NEXTON',
    href: '/portfolio/nexton',
    className: 'col-span-12 min-w-0 w-full md:col-span-6 aspect-[16/10]',
    priority: false,
    label: 'NEXTON',
    id: 'NX-03',
  },
  {
    src: '/devices/showcase-iphone.png',
    alt: 'Мобильный интерфейс проекта',
    href: '/portfolio/artdetailing',
    className: 'col-span-12 min-w-0 w-full md:col-span-5 aspect-[4/5] md:aspect-auto md:min-h-full',
    priority: false,
    label: 'Mobile UI',
    id: 'MB-04',
  },
  {
    src: '/portfolio/artdetailing.png',
    alt: 'ArtDetailing',
    href: '/portfolio/artdetailing',
    className: 'col-span-12 min-w-0 w-full md:col-span-7 aspect-[16/10]',
    priority: false,
    label: 'ArtDetailing',
    id: 'AR-05',
  },
] as const

export default function HomeDeviceShowcase() {
  return (
    <section className="border-b border-slate-200 dark:border-[var(--border-color)] bg-white dark:bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <Reveal>
          <div className="apsod-lab-panel overflow-hidden min-w-0">
            <div className="apsod-lab-panel__head">
              <span className="apsod-lab-panel__title">Projects / Active</span>
              <span className="apsod-lab-panel__meta">Matrix · {SHOWCASE.length}</span>
            </div>

            <div className="p-3 md:p-4">
              <div className="grid grid-cols-12 gap-2 md:gap-3 min-w-0">
                {SHOWCASE.map((item, i) => (
                  <Reveal
                    key={item.src}
                    stagger={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}
                    className={item.className}
                  >
                    <Link
                      href={item.href}
                      className="apsod-media-frame group relative block h-full min-h-0 overflow-hidden bg-slate-100 dark:bg-slate-900/80"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className={`apsod-media-zoom transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
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
                      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent z-[2]">
                        <p className="apsod-lab-mono text-[10px] text-sky-300/90 mb-0.5 tracking-[0.12em]">
                          {item.id}
                        </p>
                        <p className="font-display text-sm md:text-base font-semibold text-white tracking-tight">
                          {item.label}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
