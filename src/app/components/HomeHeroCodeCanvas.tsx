'use client'

import { useEffect, useState } from 'react'

const CODE_LINES = [
  'export async function craftProduct() {',
  '  const brief = await discover({',
  "    goals: ['leads', 'speed', 'seo'],",
  "    stack: ['Next.js', 'Angular', 'ASP.NET Core'],",
  '  })',
  '',
  '  const system = design(brief)',
  '  const build = await engineer(system)',
  '',
  '  return ship(build, {',
  "    quality: 'production',",
  '    ownCode: true,',
  '  })',
  '}',
] as const

const FULL = CODE_LINES.join('\n')

function highlight(line: string) {
  if (!line) return <span>&nbsp;</span>

  const parts: { text: string; kind: 'plain' | 'kw' | 'str' | 'fn' | 'num' | 'punct' }[] = []
  const re =
    /('(?:\\.|[^'])*'|"(?:\\.|[^"])*")|\b(export|async|function|await|const|return|true|false)\b|\b([A-Za-z_]\w*)(?=\()|\b(\d+)\b|([{}()[\],.:])/g

  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(line))) {
    if (m.index > last) {
      parts.push({ text: line.slice(last, m.index), kind: 'plain' })
    }
    if (m[1]) parts.push({ text: m[1], kind: 'str' })
    else if (m[2]) parts.push({ text: m[2], kind: 'kw' })
    else if (m[3]) parts.push({ text: m[3], kind: 'fn' })
    else if (m[4]) parts.push({ text: m[4], kind: 'num' })
    else if (m[5]) parts.push({ text: m[5], kind: 'punct' })
    last = m.index + m[0].length
  }
  if (last < line.length) parts.push({ text: line.slice(last), kind: 'plain' })

  return parts.map((p, i) => {
    const cls =
      p.kind === 'kw'
        ? 'text-sky-300'
        : p.kind === 'str'
          ? 'text-emerald-300/90'
          : p.kind === 'fn'
            ? 'text-blue-200'
            : p.kind === 'num'
              ? 'text-amber-200/80'
              : p.kind === 'punct'
                ? 'text-slate-500'
                : 'text-slate-200'
    return (
      <span key={i} className={cls}>
        {p.text}
      </span>
    )
  })
}

/** Framed live code window for Product Lab hero */
export default function HomeHeroCodeCanvas() {
  const [chars, setChars] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduced) {
      setChars(FULL.length)
      return
    }

    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    let i = 0

    const schedule = (fn: () => void, ms: number) => {
      timer = setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
    }

    const tick = () => {
      i += 1
      if (i > FULL.length) {
        schedule(() => {
          i = 0
          setChars(0)
          schedule(tick, 480)
        }, 2600)
        return
      }
      setChars(i)
      const ch = FULL[i - 1]
      const delay = ch === '\n' ? 90 : ch === ' ' ? 28 : 18 + Math.random() * 22
      schedule(tick, delay)
    }

    schedule(tick, 600)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [reduced])

  const visible = FULL.slice(0, chars)
  const lines = visible.split('\n')

  return (
    <div className="apsod-lab-panel h-full min-h-[280px] md:min-h-[420px] overflow-hidden bg-slate-950 text-white border-slate-800 dark:border-[var(--border-color)]">
      <div className="apsod-lab-panel__head border-slate-800 bg-slate-900/90">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2 w-2 rounded-full bg-rose-400/80" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" aria-hidden />
          <span className="apsod-lab-panel__title ml-2 text-slate-400 truncate">product.ts</span>
        </div>
        <span className="apsod-lab-panel__meta text-emerald-400/80">running</span>
      </div>
      <div className="relative p-4 md:p-5 h-[calc(100%-2.5rem)] overflow-hidden">
        <div className="apsod-lab-grid-bg absolute inset-0 opacity-60" aria-hidden />
        <pre className="relative z-[1] font-mono text-[11.5px] sm:text-[12px] md:text-[13px] leading-[1.7] sm:leading-[1.75] overflow-hidden">
          {lines.map((line, idx) => {
            const isLast = idx === lines.length - 1
            return (
              <div key={idx} className="whitespace-pre">
                <span className="inline-block w-7 md:w-8 text-right text-slate-600 mr-3 md:mr-4 select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {highlight(line)}
                {isLast && !reduced && chars < FULL.length ? (
                  <span className="apsod-code-caret inline-block w-[0.55ch] h-[1.05em] align-[-0.15em] ml-0.5 bg-sky-300" />
                ) : null}
              </div>
            )
          })}
        </pre>
      </div>
    </div>
  )
}
