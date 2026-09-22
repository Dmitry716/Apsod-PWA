'use client'

import { useEffect, useRef, useState } from 'react'

interface StatDef {
  value: number
  suffix: string
  label: string
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now()
        const dur = 1500
        const animate = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(Math.round(eased * value))
          if (p < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
        obs.unobserve(el)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {display}
      {suffix ? <span className="text-orange-400">{suffix}</span> : null}
    </span>
  )
}

export default function AboutStats({ stats }: { stats: StatDef[] }) {
  return (
    <section className="border-y border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-4 py-12 text-center md:py-14 ${
                index < stats.length - 1 ? 'border-white/10 lg:border-r' : ''
              } ${index % 2 === 0 ? 'max-lg:border-r max-lg:border-white/10' : ''} ${
                index < 2 ? 'max-lg:border-b max-lg:border-white/10' : ''
              }`}
            >
              <p className="font-display mb-3 text-4xl font-extrabold tracking-tight md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
