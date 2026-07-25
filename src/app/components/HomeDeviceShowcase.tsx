import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { getCasePath, getProjectBySlug } from '../portfolio/data'

const SHOWCASE_SLUGS = {
  monitorLeft: 'amba-detail',
  monitorRight: 'nexton',
  laptop: 'maxximum',
  phone: 'artdetailing',
} as const

function ScreenLink({
  href,
  title,
  children,
  className = '',
}: {
  href: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`block relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
      aria-label={`Кейс: ${title}`}
    >
      {children}
    </Link>
  )
}

/** CSS-мокапы Studio Display + MacBook + iPhone с реальными скриншотами портфолио */
export default function HomeDeviceShowcase() {
  const monitorLeft = getProjectBySlug(SHOWCASE_SLUGS.monitorLeft)
  const monitorRight = getProjectBySlug(SHOWCASE_SLUGS.monitorRight)
  const laptop = getProjectBySlug(SHOWCASE_SLUGS.laptop)
  const phone = getProjectBySlug(SHOWCASE_SLUGS.phone)

  if (!monitorLeft || !monitorRight || !laptop || !phone) return null

  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      {/* «Офисный» фон: мягкий стол + свет */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-300/40 to-transparent dark:from-stone-800/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-blue-200/30 dark:bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Продукты в работе
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Сайты и приложения на экранах клиентов
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            Реальные кейсы APSOD — как в офисе продуктовой команды: мониторы, MacBook и iPhone.
          </p>
        </Reveal>

        {/* Сцена: два Studio Display + MacBook + iPhone */}
        <Reveal className="relative max-w-5xl mx-auto" stagger={2}>
          <div className="relative mx-auto min-h-[280px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[460px]">
            {/* Mobile: один монитор сверху для «офисного» ощущения */}
            <div className="apsod-device-float relative z-10 mx-auto w-[78%] max-w-[320px] mb-[-8%] md:hidden">
              <AppleMonitor
                image={monitorLeft.image}
                title={monitorLeft.title}
                href={getCasePath(monitorLeft)}
                priority={false}
                sizes="320px"
              />
            </div>

            {/* Левый монитор */}
            <div className="apsod-device-float absolute left-0 top-2 w-[42%] sm:w-[40%] max-w-[380px] z-10 max-md:hidden">
              <AppleMonitor
                image={monitorLeft.image}
                title={monitorLeft.title}
                href={getCasePath(monitorLeft)}
                priority={false}
              />
            </div>

            {/* Правый монитор */}
            <div
              className="apsod-device-float absolute right-0 top-0 w-[42%] sm:w-[40%] max-w-[380px] z-10 max-md:hidden"
              style={{ animationDelay: '1.2s' }}
            >
              <AppleMonitor
                image={monitorRight.image}
                title={monitorRight.title}
                href={getCasePath(monitorRight)}
                priority={false}
              />
            </div>

            {/* Центральный MacBook — главный на mobile */}
            <div className="apsod-device-float relative z-20 mx-auto w-[88%] sm:w-[72%] md:w-[58%] max-w-[520px] pt-4 md:pt-16 lg:pt-20">
              <MacBook
                image={laptop.image}
                title={laptop.title}
                href={getCasePath(laptop)}
                priority
              />
            </div>

            {/* iPhone — справа внизу */}
            <div
              className="apsod-device-float absolute z-30 right-[2%] sm:right-[6%] md:right-[8%] bottom-0 w-[22%] sm:w-[18%] md:w-[14%] max-w-[140px] min-w-[72px]"
              style={{ animationDelay: '0.6s' }}
            >
              <IPhone
                image={phone.image}
                title={phone.title}
                href={getCasePath(phone)}
              />
            </div>
          </div>

          {/* Подпись «стола» */}
          <div
            className="mt-2 mx-auto h-3 max-w-4xl rounded-b-2xl bg-gradient-to-b from-stone-400/50 to-stone-500/20 dark:from-stone-600/40 dark:to-transparent"
            aria-hidden
          />

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-center">
            <Link
              href="/portfolio"
              className="inline-flex px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-sm"
            >
              Смотреть портфолио
            </Link>
            <Link
              href="/contact?goal=corporate"
              className="inline-flex px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-800 dark:text-gray-100 hover:border-blue-500 text-sm"
            >
              Обсудить свой продукт
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function AppleMonitor({
  image,
  title,
  href,
  priority,
  sizes = '(max-width: 768px) 0px, 380px',
}: {
  image: string
  title: string
  href: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Рамка Studio Display */}
      <div className="w-full rounded-[1.1rem] bg-gradient-to-b from-neutral-700 to-neutral-900 p-[3%] shadow-2xl shadow-black/25 ring-1 ring-black/40">
        <div className="relative aspect-[16/10] rounded-[0.55rem] overflow-hidden bg-black">
          <ScreenLink href={href} title={title} className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-top"
              sizes={sizes}
              priority={priority}
              loading={priority ? undefined : 'lazy'}
            />
          </ScreenLink>
        </div>
      </div>
      {/* Тонкая «подставка» Apple */}
      <div className="w-[14%] h-8 md:h-10 bg-gradient-to-b from-neutral-400 to-neutral-500 dark:from-neutral-500 dark:to-neutral-700 rounded-b-sm" />
      <div className="w-[32%] h-1.5 md:h-2 rounded-full bg-neutral-400/90 dark:bg-neutral-600" />
    </div>
  )
}

function MacBook({
  image,
  title,
  href,
  priority,
}: {
  image: string
  title: string
  href: string
  priority?: boolean
}) {
  return (
    <div className="flex flex-col items-center drop-shadow-2xl">
      {/* Крышка / экран */}
      <div className="w-full rounded-t-xl bg-gradient-to-b from-neutral-600 to-neutral-800 p-[1.2%] pb-0 shadow-xl ring-1 ring-black/30">
        <div className="relative aspect-[16/10] rounded-t-lg overflow-hidden bg-black">
          {/* Камера */}
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 z-10 w-1.5 h-1.5 rounded-full bg-neutral-800 ring-1 ring-neutral-600"
            aria-hidden
          />
          <ScreenLink href={href} title={title} className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 520px"
              priority={priority}
            />
          </ScreenLink>
        </div>
      </div>
      {/* Корпус / клавиатура */}
      <div className="relative w-[108%] -mt-px">
        <div className="h-2.5 md:h-3.5 rounded-b-xl bg-gradient-to-b from-neutral-400 via-neutral-300 to-neutral-400 dark:from-neutral-500 dark:via-neutral-600 dark:to-neutral-700 shadow-lg" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0.5 w-[14%] h-1 rounded-b-md bg-neutral-500/40 dark:bg-neutral-800/50" />
      </div>
    </div>
  )
}

function IPhone({
  image,
  title,
  href,
}: {
  image: string
  title: string
  href: string
}) {
  return (
    <div className="rounded-[1.35rem] bg-gradient-to-b from-neutral-800 to-black p-[6%] shadow-2xl shadow-black/40 ring-1 ring-white/10">
      <div className="relative aspect-[9/19] rounded-[1rem] overflow-hidden bg-black">
        {/* Dynamic Island */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-[36%] h-3 rounded-full bg-black"
          aria-hidden
        />
        <ScreenLink href={href} title={title} className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top"
            sizes="140px"
            loading="lazy"
          />
        </ScreenLink>
      </div>
    </div>
  )
}
