'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '../lib/useLocale'
import { COMPANY_ADDRESS_DISPLAY } from '../lib/seo'
import TypingCloud from './TypingCloud'

interface CardDef {
  src: string
  alt: string
  cloud: string
  cloudEn: string
  position: string
  anim: string
  delay: number
}

/**
 * 6 карточек: 3 сверху, 3 снизу.
 * Контейнер h-[1050px] — чтобы ряды не слипались.
 */
const CARDS: CardDef[] = [
  // ─── ВЕРХНИЙ РЯД ───
  {
    src: '/about/founders-1.jpg',
    alt: 'Основатели APSOD',
    cloud: 'Держим фокус на продукте',
    cloudEn: 'Product-first mindset',
    position: 'top-[0%] left-[1%] w-[30%] rotate-[-2deg]',
    anim: 'apsod-slide-tl',
    delay: 0,
  },
  {
    src: '/blog/site-vs-social.jpg',
    alt: 'Сайт vs соцсети',
    cloud: 'Строим digital-присутствие',
    cloudEn: 'We build digital presence',
    position: 'top-[1%] left-[35%] w-[30%] rotate-[0deg]',
    anim: 'apsod-slide-top',
    delay: 0.35,
  },
  {
    src: '/blog/seo-vs-ads.jpg',
    alt: 'SEO vs реклама',
    cloud: 'Усиливаем органику',
    cloudEn: 'We grow organic traffic',
    position: 'top-[0%] right-[1%] w-[30%] rotate-[2deg]',
    anim: 'apsod-slide-tr',
    delay: 0.7,
  },

  // ─── НИЖНИЙ РЯД ───
  {
    src: '/blog/seo-advantages.jpg',
    alt: 'Преимущества SEO',
    cloud: 'Считаем каждый лид',
    cloudEn: 'Every lead matters',
    position: 'bottom-[0%] left-[1%] w-[30%] rotate-[2deg]',
    anim: 'apsod-slide-bl',
    delay: 1.05,
  },
  {
    src: '/blog/pwa-vs-native.jpg',
    alt: 'PWA vs Native',
    cloud: 'Выбираем технологии',
    cloudEn: 'We pick the right stack',
    position: 'bottom-[1%] left-[35%] w-[30%] rotate-[0deg]',
    anim: 'apsod-slide-bottom',
    delay: 1.4,
  },
  {
    src: '/about/office-team.jpg',
    alt: 'Команда APSOD',
    cloud: 'Собираем сильную команду',
    cloudEn: 'We build a strong team',
    position: 'bottom-[0%] right-[1%] w-[30%] rotate-[-2deg]',
    anim: 'apsod-slide-br',
    delay: 1.75,
  },
]

export default function AboutEngineering() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="relative overflow-hidden bg-white py-16 text-slate-900 transition-colors dark:bg-black dark:text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Маркер 01 */}
        <div className="mb-10 flex items-center gap-4">
          <span className="text-xs font-medium tracking-[0.18em] text-slate-500 dark:text-white/45">
            01
          </span>
          <span className="h-px w-16 bg-slate-300 dark:bg-white/15" aria-hidden />
        </div>

        {/* Текст — ЦЕНТРИРОВАН */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="apsod-reveal font-display mb-6 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em]">
            APSOD <span className="text-slate-400 dark:text-white/40">Engineering</span>
          </h2>
          <p className="apsod-reveal mb-5 text-base leading-relaxed text-slate-600 dark:text-white/65 md:text-lg">
            {isEn
              ? 'We design and ship sites, apps and digital systems: research, architecture, engineering, security, SEO and post-launch support.'
              : 'APSOD проектирует и выпускает сайты, приложения и digital-контуры: исследование, архитектура, инженерия, безопасность, SEO и сопровождение после запуска.'}
          </p>
          <p className="apsod-reveal mb-10 text-base leading-relaxed text-slate-600 dark:text-white/65">
            {isEn
              ? `Office: ${COMPANY_ADDRESS_DISPLAY}. Meetings by appointment.`
              : `Офис: ${COMPANY_ADDRESS_DISPLAY}. Встречи по договорённости.`}
          </p>
          <Link
            href="/contact"
            className="apsod-reveal inline-flex rounded-full bg-slate-900 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-orange-100"
          >
            {isEn ? 'Contact us' : 'Связаться'}
          </Link>
        </div>

        {/* ─── DESKTOP: 6 карточек 3+3, БОЛЬШОЙ ЗАЗОР ─── */}
        <div className="relative hidden h-[1050px] w-full lg:block">
          {CARDS.map((card) => (
            <div
              key={card.src}
              className={`apsod-about-card group absolute overflow-hidden rounded-[22px] bg-slate-200 shadow-2xl dark:bg-zinc-900 ${card.position} ${card.anim}`}
              style={{ animationDelay: `${card.delay}s` }}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="30vw"
                  className="object-cover brightness-[0.85] saturate-[0.95] transition-transform duration-700 group-hover:scale-105 dark:brightness-[0.75] dark:saturate-[0.9]"
                />
                <div className="apsod-card-mask absolute inset-0" aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent dark:from-black/50" />
                <div className="apsod-card-glow absolute inset-0 rounded-[22px]" aria-hidden />
              </div>
              <TypingCloud
                text={isEn ? card.cloudEn : card.cloud}
                className="absolute left-3 top-3"
              />
            </div>
          ))}
        </div>

        {/* ─── MOBILE: горизонтальная лента ─── */}
        <div className="lg:hidden">
          <div className="apsod-mobile-strip flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {CARDS.map((card) => (
              <div
                key={card.src}
                className="relative w-[72%] shrink-0 snap-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl dark:bg-zinc-900"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="72vw"
                    className="object-cover brightness-[0.9] dark:brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="apsod-card-glow absolute inset-0 rounded-2xl" aria-hidden />
                </div>
                <TypingCloud
                  text={isEn ? card.cloudEn : card.cloud}
                  className="absolute left-3 top-3"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-white/30">
            {isEn ? 'Swipe →' : 'Свайп →'}
          </p>
        </div>
      </div>
    </section>
  )
}
