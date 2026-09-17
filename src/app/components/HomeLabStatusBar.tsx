'use client'

import { useEffect, useState } from 'react'

/** Compact status strip for Product Lab homepage shell */
export default function HomeLabStatusBar() {
  const [clock, setClock] = useState('—:—:—')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setClock(
        now.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Europe/Minsk',
        })
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="apsod-lab-bar sticky top-16 md:top-20 z-40">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
        <span className="font-semibold text-slate-800 dark:text-slate-100">APSOD Lab</span>
        <span className="text-slate-300 dark:text-slate-700" aria-hidden>
          /
        </span>
        <span className="apsod-lab-bar__live">System online</span>
      </div>
      <div className="flex items-center gap-3 shrink-0 tabular-nums">
        <span>Minsk</span>
        <span className="text-slate-800 dark:text-slate-200">{clock}</span>
      </div>
    </div>
  )
}
