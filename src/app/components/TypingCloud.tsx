'use client'

import { useEffect, useState } from 'react'

interface Props {
  text: string
  speed?: number
  pause?: number
  className?: string
}

/**
 * Облачко с бесконечно печатающимся текстом.
 * Стиль: gradient cyan на светлой, glow на тёмной.
 */
export default function TypingCloud({
  text,
  speed = 70,
  pause = 2200,
  className = '',
}: Props) {
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (display.length < text.length) {
        timer = setTimeout(() => {
          setDisplay(text.slice(0, display.length + 1))
        }, speed)
      } else {
        timer = setTimeout(() => setPhase('pausing'), pause)
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('deleting'), 400)
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timer = setTimeout(() => {
          setDisplay(text.slice(0, display.length - 1))
        }, 30)
      } else {
        timer = setTimeout(() => setPhase('typing'), 300)
      }
    }

    return () => clearTimeout(timer)
  }, [display, phase, text, speed, pause])

  return (
    <div
      className={`apsod-typing-cloud ${className}`}
      role="note"
      aria-label={text}
    >
      <span className="apsod-typing-cloud__text">{display}</span>
      <span className="apsod-typing-cloud__cursor" aria-hidden="true">
        |
      </span>
    </div>
  )
}
