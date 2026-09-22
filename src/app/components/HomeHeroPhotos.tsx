'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const PHOTOS = [
  { src: '/about/office-team.jpg', alt: 'APSOD team' },
  { src: '/blog/pwa-vs-native.jpg', alt: 'PWA vs Native' },
  { src: '/blog/site-support.jpg', alt: 'Site support' },
] as const

/**
 * Desktop: 3 карточки справа, меняются местами, крайние размыты.
 * Mobile: горизонтальная лента с автопрокруткой.
 * Декоративный — aria-hidden для скринридеров.
 */
export default function HomeHeroPhotos() {
  const [active, setActive] = useState(0)
  const stripRef = useRef<HTMLDivElement>(null)

  // Desktop: смена активного фото
  useEffect(() => {
    const t = setInterval(() => {
      setActive((i) => (i + 1) % PHOTOS.length)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  // Mobile: автопрокрутка ленты
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    let idx = 0
    const t = setInterval(() => {
      idx = (idx + 1) % PHOTOS.length
      const child = strip.children[idx] as HTMLElement | undefined
      if (child) {
        strip.scrollTo({
          left: child.offsetLeft - strip.offsetWidth / 2 + child.offsetWidth / 2,
          behavior: 'smooth',
        })
      }
    }, 3500)

    return () => clearInterval(t)
  }, [])

  return (
    <div aria-hidden="true">
      {/* ─── DESKTOP: 3 карточки справа ─── */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[44%] overflow-hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[70%] w-[85%]">
            {PHOTOS.map((photo, i) => {
              const offset = (i - active + PHOTOS.length) % PHOTOS.length
              const isCenter = offset === 0
              const isLeft = offset === 1

              return (
                <div
                  key={photo.src}
                  className={`absolute left-1/2 top-1/2 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isCenter
                      ? 'z-30 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 blur-0'
                      : isLeft
                        ? 'z-20 -translate-x-[110%] -translate-y-1/2 scale-[0.82] opacity-70 blur-sm'
                        : 'z-10 translate-x-[10%] -translate-y-1/2 scale-[0.82] opacity-70 blur-sm'
                  }`}
                  style={{
                    width: '70%',
                    aspectRatio: '4 / 3',
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="28vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/10" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── MOBILE: горизонтальная лента с автопрокруткой ─── */}
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-20 px-4 lg:hidden">
        <div
          ref={stripRef}
          className="apsod-mobile-photo-strip flex gap-3 overflow-x-auto pb-2"
        >
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl shadow-xl ring-1 ring-white/15"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>
          ))}
        </div>
        {/* Плавное затухание по краям */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/70 to-transparent" />
      </div>
    </div>
  )
}
