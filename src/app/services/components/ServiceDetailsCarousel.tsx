'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'

type Slide = {
  src: string
  alt: string
}

export default function ServiceDetailsCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0)
  const total = slides.length

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total)
  }, [total])

  if (!total) return null
  const slide = slides[index]

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-black md:rounded-[2.25rem]">
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Предыдущий слайд"
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-950 transition hover:bg-orange-100 md:left-6 md:h-12 md:w-12"
      >
        ←
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Следующий слайд"
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-950 transition hover:bg-orange-100 md:right-6 md:h-12 md:w-12"
      >
        →
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Слайд ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
