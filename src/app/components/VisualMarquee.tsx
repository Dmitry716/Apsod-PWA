import Image from 'next/image'
import Link from 'next/link'

const BAND = [
  {
    src: '/portfolio/legal-team.jpg',
    alt: 'Legal Team',
    href: '/portfolio/legal-team',
  },
  {
    src: '/portfolio/amba.png',
    alt: 'Amba Detail',
    href: '/portfolio/amba-detail',
  },
  {
    src: '/portfolio/nexton.png',
    alt: 'NEXTON',
    href: '/portfolio/nexton',
  },
  {
    src: '/portfolio/artdetailing.png',
    alt: 'ArtDetailing',
    href: '/portfolio/artdetailing',
  },
  {
    src: '/devices/showcase-iphone.png',
    alt: 'Проект на iPhone',
    href: '/portfolio/artdetailing',
  },
  {
    src: '/portfolio/bmservice-cover.jpg',
    alt: 'BMservice',
    href: '/portfolio/bmservice',
  },
] as const

export default function VisualMarquee({ title = 'В работе' }: { title?: string }) {
  const loop = [...BAND, ...BAND]

  return (
    <section className="apsod-grain apsod-immersive relative py-16 md:py-20 overflow-hidden text-white">
      <div className="container mx-auto px-4 mb-10 relative z-10">
        <p className="apsod-section-marker mb-3 text-slate-400">02 · Pipeline</p>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.03em]">{title}</h2>
      </div>

      <div className="relative z-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[var(--apsod-immersive)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[var(--apsod-immersive)] to-transparent z-10" />

        <div className="apsod-marquee gap-5 px-4">
          {loop.map((item, i) => (
            <Link
              key={`${item.src}-${i}`}
              href={item.href}
              className="apsod-marquee-card relative w-[300px] sm:w-[380px] md:w-[460px] aspect-[16/10] shrink-0 overflow-hidden bg-slate-900/80 ring-1 ring-white/10"
            >
              <div className="absolute inset-3">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain object-top"
                  sizes="460px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
