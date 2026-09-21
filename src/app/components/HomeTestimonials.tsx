'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { useLocale } from '../lib/useLocale'

const NOTES = [
  {
    ru: 'Legal Team: 22 направления права, формы, чат и PWA — премиальный канал под заявки и SEO в Москве.',
    en: 'Legal Team: 22 practice areas, forms, chat and PWA — a premium lead and SEO channel in Moscow.',
    name: 'Legal Team',
    roleRu: 'Кейс · юриспруденция',
    roleEn: 'Case · legal',
  },
  {
    ru: 'Amba Detail: витрина студии с услугами, атмосферой и записью — без лишнего шума в интерфейсе.',
    en: 'Amba Detail: a studio storefront with services, atmosphere and booking — no interface noise.',
    name: 'Amba Detail',
    roleRu: 'Кейс · детейлинг',
    roleEn: 'Case · detailing',
  },
  {
    ru: 'Art Detailing: коммерческий сайт с понятной навигацией — клиенты находят услуги и оставляют заявки с телефона.',
    en: 'Art Detailing: a commercial site with clear navigation — clients find services and convert on mobile.',
    name: 'Art Detailing',
    roleRu: 'Кейс · автосервис',
    roleEn: 'Case · auto care',
  },
] as const

/** Dark highlight band — Nerox TestimonialFour composition, APSOD case notes */
export default function HomeTestimonials() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % NOTES.length)
    }, 7000)
    return () => window.clearInterval(id)
  }, [])

  const note = NOTES[active]

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(56,189,248,0.18), transparent 60%)',
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
        <Reveal>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-sky-300/80">
            {isEn ? 'Selected outcomes' : 'Избранные результаты'}
          </p>
          <p className="mb-8 font-display text-xl font-medium leading-relaxed text-slate-100 md:text-2xl md:leading-relaxed">
            {isEn ? note.en : note.ru}
          </p>
          <p className="font-display text-lg font-extrabold tracking-tight">{note.name}</p>
          <p className="mt-1 text-sm text-slate-400">{isEn ? note.roleEn : note.roleRu}</p>

          <div className="mt-10 flex justify-center gap-2">
            {NOTES.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={item.name}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === active ? 'w-8 bg-sky-400' : 'w-1.5 bg-white/35 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <Link
            href="/portfolio"
            className="mt-10 inline-flex text-sm font-semibold text-sky-300 hover:text-sky-200"
          >
            {isEn ? 'See case studies →' : 'Смотреть кейсы →'}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
