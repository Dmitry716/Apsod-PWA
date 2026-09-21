"use client"

import { useEffect, useRef, ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  delay?: number
  as?: keyof React.JSX.IntrinsicElements
}

export default function RevealOnScroll({ children, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className="blog-reveal">
      {children}
    </Tag>
  )
}
