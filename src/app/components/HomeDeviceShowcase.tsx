import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'

const SHOWCASE = [
  {
    src: '/devices/showcase-monitor.png',
    alt: 'Сайт автосервиса на мониторе Apple Studio Display',
    href: '/portfolio/amba-detail',
    aspect: 'aspect-[16/10]',
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: true,
  },
  {
    src: '/devices/showcase-macbook.png',
    alt: 'Сайт спортивного клуба на экране MacBook Pro',
    href: '/portfolio/maxximum',
    aspect: 'aspect-[16/10]',
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: true,
  },
  {
    src: '/devices/showcase-iphone.png',
    alt: 'Мобильный сайт детейлинга на iPhone 17 Pro Max',
    href: '/portfolio/artdetailing',
    aspect: 'aspect-[3/4]',
    sizes: '(max-width: 768px) 80vw, 280px',
    priority: false,
  },
] as const

/** Фотореалистичные сцены: техника с открытыми проектами на экранах */
export default function HomeDeviceShowcase() {
  const desktops = SHOWCASE.filter((s) => s.src !== '/devices/showcase-iphone.png')
  const phone = SHOWCASE.find((s) => s.src === '/devices/showcase-iphone.png')

  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            Продукты в среде
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl">
            Так выглядят digital-продукты APSOD на реальных устройствах.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-end max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {desktops.map((item, i) => (
              <Reveal key={item.src} stagger={(Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)}>
                <ShowcasePhoto {...item} />
              </Reveal>
            ))}
          </div>

          {phone && (
            <Reveal className="mx-auto w-[min(100%,300px)] lg:w-[280px] shrink-0" stagger={3}>
              <ShowcasePhoto {...phone} />
            </Reveal>
          )}
        </div>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-3" stagger={4}>
          <Link
            href="/portfolio"
            className="inline-flex px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 text-sm"
          >
            Смотреть проекты
          </Link>
          <Link
            href="/contact?goal=corporate"
            className="inline-flex px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-800 dark:text-gray-100 hover:border-slate-900 dark:hover:border-white text-sm"
          >
            Запросить консультацию
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function ShowcasePhoto({
  src,
  alt,
  href,
  aspect,
  sizes,
  priority,
}: {
  src: string
  alt: string
  href: string
  aspect: string
  sizes: string
  priority: boolean
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl shadow-black/10 ring-1 ring-black/5 dark:ring-white/10 hover:shadow-2xl transition-shadow"
    >
      <div className={`relative ${aspect} bg-slate-200 dark:bg-gray-700`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes={sizes}
          priority={priority}
        />
      </div>
    </Link>
  )
}
