import Image from 'next/image'
import Link from 'next/link'

const BAND = [
  {
    src: '/portfolio/legal-team.jpg',
    alt: 'Legal Team',
    href: '/portfolio/legal-team',
    tag: 'Legal Team',
  },
  {
    src: '/portfolio/amba.png',
    alt: 'Amba Detail',
    href: '/portfolio/amba-detail',
    tag: 'Amba Detail',
  },
  {
    src: '/portfolio/nexton.png',
    alt: 'NEXTON',
    href: '/portfolio/nexton',
    tag: 'NEXTON',
  },
  {
    src: '/portfolio/artdetailing.png',
    alt: 'ArtDetailing',
    href: '/portfolio/artdetailing',
    tag: 'ArtDetailing',
  },
  {
    src: '/devices/showcase-iphone.png',
    alt: 'Проект на iPhone',
    href: '/portfolio/artdetailing',
    tag: 'Mobile',
  },
  {
    src: '/portfolio/bmservice-cover.jpg',
    alt: 'BMservice',
    href: '/portfolio/bmservice',
    tag: 'BMservice',
  },
] as const

export default function VisualMarquee({ title = 'В работе' }: { title?: string }) {
  const loop = [...BAND, ...BAND]

  return (
    <section className="border-b border-slate-200 dark:border-[var(--border-color)] bg-slate-50 dark:bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4 py-5 md:py-6">
        <div className="apsod-lab-panel overflow-hidden">
          <div className="apsod-lab-panel__head">
            <span className="apsod-lab-panel__title">Ticker / {title}</span>
            <span className="apsod-lab-panel__meta">Live feed</span>
          </div>

          <div className="relative py-3 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--bg-card)] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--bg-card)] to-transparent z-10" />

            <div className="apsod-marquee gap-3 px-3">
              {loop.map((item, i) => (
                <Link
                  key={`${item.src}-${i}`}
                  href={item.href}
                  className="apsod-marquee-card relative w-[220px] sm:w-[260px] aspect-[16/10] shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-white/10"
                >
                  <div className="absolute inset-2">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain object-top"
                      sizes="260px"
                    />
                  </div>
                  <span className="absolute bottom-1.5 left-2 apsod-lab-mono text-[9px] tracking-[0.1em] uppercase text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-950/70 px-1.5 py-0.5">
                    {item.tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
