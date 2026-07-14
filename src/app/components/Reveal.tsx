'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  stagger?: 1 | 2 | 3 | 4 | 5
}

export default function Reveal({ children, className = '', stagger }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const staggerClass = stagger ? `apsod-stagger-${stagger}` : ''

  return (
    <div ref={ref} className={`apsod-reveal ${staggerClass} ${className}`.trim()}>
      {children}
    </div>
  )
}
