'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useLocale } from '../lib/useLocale'

type Industry = {
  id: string
  titleRu: string
  titleEn: string
  bodyRu: string
  bodyEn: string
  image: string
  imagePosition?: string
}

const INDUSTRIES: Industry[] = [
  {
    id: 'finance',
    titleRu: 'Финансы и B2B',
    titleEn: 'Finance & B2B',
    bodyRu:
      'Корпоративные сайты, кабинеты и дашборды для финансового и делового сектора — с фокусом на доверие и ясный путь к заявке.',
    bodyEn:
      'Corporate sites, portals and dashboards for finance and B2B — built for trust and a clear path to enquiry.',
    image: '/about/gallery/negotiation.jpg',
    imagePosition: 'center 25%',
  },
  {
    id: 'legal',
    titleRu: 'Юриспруденция',
    titleEn: 'Legal',
    bodyRu:
      'Премиальные digital-каналы для юрфирм: направления услуг, кейсы, формы, чат и SEO — как в кейсе Legal Team.',
    bodyEn:
      'Premium digital channels for law firms: practice areas, cases, forms, chat and SEO — as in the Legal Team case.',
    image: '/portfolio/legal-team.jpg',
    imagePosition: 'center center',
  },
  {
    id: 'medicine',
    titleRu: 'Медицина',
    titleEn: 'Healthcare',
    bodyRu:
      'Сайты клиник, запись на приём, лендинги услуг и сопровождение — понятная структура для пациента с телефона.',
    bodyEn:
      'Clinic sites, appointment booking, service landings and support — clear structure for patients on mobile.',
    image: '/about/gallery/team-lounge.jpg',
    imagePosition: 'center top',
  },
  {
    id: 'sport',
    titleRu: 'Спорт и образование',
    titleEn: 'Sport & education',
    bodyRu:
      'Сайты школ и спортивных организаций: расписание, тренеры, новости — кейсы Maxximum и Динамо-Витебск.',
    bodyEn:
      'Sites for schools and sports orgs: schedules, coaches, news — Maxximum and Dinamo Vitebsk cases.',
    image: '/about/gallery/gym.jpg',
    imagePosition: 'center top',
  },
  {
    id: 'auto',
    titleRu: 'Автосервис и услуги',
    titleEn: 'Auto & local services',
    bodyRu:
      'Каталог услуг, прайс, онлайн-запись и PWA — Amba Detail, NEXTON, BMservice, ArtDetailing.',
    bodyEn:
      'Service catalogs, pricing, booking and PWA — Amba Detail, NEXTON, BMservice, ArtDetailing.',
    image: '/portfolio/amba.png',
    imagePosition: 'center top',
  },
]

/** Itransition-style industries full-bleed slider */
export default function HomeIndustriesSlider() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const [index, setIndex] = useState(0)
  const active = INDUSTRIES[index]

  const go = useCallback((dir: -1 | 1) => {
    setIndex((prev) => (prev + dir + INDUSTRIES.length) % INDUSTRIES.length)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => go(1), 7000)
    return () => window.clearInterval(id)
  }, [go])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <section
      className="relative isolate min-h-[480px] overflow-hidden md:min-h-[560px] lg:min-h-[620px]"
      aria-roledescription="carousel"
      aria-label={isEn ? 'Industries' : 'Отрасли'}
    >
      {INDUSTRIES.map((item, i) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={item.image}
            alt=""
            fill
            priority={i === 0}
            className="object-cover object-top"
            style={{ objectPosition: item.imagePosition ?? 'center top' }}
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-slate-950/55"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-slate-950/40"
            aria-hidden
          />
        </div>
      ))}

      {/* subtle vertical grid like reference */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0, transparent calc(100% / 12 - 1px), rgba(255,255,255,0.35) calc(100% / 12), transparent calc(100% / 12))',
          backgroundSize: 'calc(100% / 12) 100%',
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[480px] flex-col justify-between px-4 py-10 md:min-h-[560px] md:px-8 md:py-14 lg:min-h-[620px] lg:px-12 lg:py-16">
        <div className="container mx-auto w-full">
          <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
            {isEn ? 'Industries' : 'Отрасли'}
          </h2>
        </div>

        <div className="container mx-auto flex w-full items-end justify-between gap-6">
          <div className="max-w-xl pb-2" aria-live="polite">
            <h3 className="font-display mb-3 text-[clamp(1.35rem,2.5vw,1.85rem)] font-bold tracking-tight text-white">
              {isEn ? active.titleEn : active.titleRu}
            </h3>
            <p className="text-[15px] leading-relaxed text-white/85 md:text-base">
              {isEn ? active.bodyEn : active.bodyRu}
            </p>
            <div className="mt-5 flex gap-1.5" aria-hidden>
              {INDUSTRIES.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === index ? 'w-8 bg-white' : 'w-3 bg-white/35 hover:bg-white/55'
                  }`}
                  aria-label={isEn ? item.titleEn : item.titleRu}
                />
              ))}
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={isEn ? 'Previous industry' : 'Предыдущая отрасль'}
              className="inline-flex h-12 w-12 items-center justify-center border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M12.7 4.3 7 10l5.7 5.7 1.1-1.1L9.2 10l4.6-4.6z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={isEn ? 'Next industry' : 'Следующая отрасль'}
              className="inline-flex h-12 w-12 items-center justify-center border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M7.3 4.3 6.2 5.4 10.8 10l-4.6 4.6 1.1 1.1L13 10z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Edge arrows like reference (desktop) */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label={isEn ? 'Previous' : 'Назад'}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 text-white/75 transition-colors hover:text-white lg:inline-flex"
      >
        <svg viewBox="0 0 20 20" className="h-7 w-7 fill-current" aria-hidden>
          <path d="M12.7 4.3 7 10l5.7 5.7 1.1-1.1L9.2 10l4.6-4.6z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label={isEn ? 'Next' : 'Вперёд'}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 text-white/75 transition-colors hover:text-white lg:inline-flex"
      >
        <svg viewBox="0 0 20 20" className="h-7 w-7 fill-current" aria-hidden>
          <path d="M7.3 4.3 6.2 5.4 10.8 10l-4.6 4.6 1.1 1.1L13 10z" />
        </svg>
      </button>
    </section>
  )
}
