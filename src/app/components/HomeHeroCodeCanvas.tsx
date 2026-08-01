'use client'

import { useEffect, useState } from 'react'

const CODE_LINES = [
  'export async function craftProduct() {',
  '  const brief = await discover({',
  "    goals: ['leads', 'speed', 'seo'],",
  "    stack: ['Next.js', 'TypeScript'],",
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
        ? 'text-sky-300/90'
        : p.kind === 'str'
          ? 'text-emerald-300/80'
          : p.kind === 'fn'
            ? 'text-blue-200/90'
            : p.kind === 'num'
              ? 'text-amber-200/70'
              : p.kind === 'punct'
                ? 'text-slate-500'
                : 'text-slate-300/85'
    return (
      <span key={i} className={cls}>
        {p.text}
      </span>
    )
  })
}

/** Live typing code field — craft atmosphere, not a client mockup */
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
  const completeLines = FULL.split('\n')

  return (
    <div className="apsod-code-hero absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-slate-950" />
      <div className="apsod-code-hero-grid absolute inset-0 opacity-[0.35]" />
      <div className="apsod-code-hero-glow absolute -right-24 top-1/4 h-[55%] w-[55%] rounded-full bg-sky-500/10 blur-3xl" />
      <div className="apsod-code-hero-glow absolute left-1/3 -bottom-20 h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-3xl" />

      {/* Ghost finished code — depth */}
      <pre className="apsod-code-hero-ghost pointer-events-none absolute right-[-4%] top-[12%] hidden select-none font-mono text-[11px] leading-[1.7] text-slate-500/25 md:block lg:right-[2%] lg:text-[12.5px]">
        {completeLines.map((line, idx) => (
          <div key={`g-${idx}`} className="whitespace-pre">
            <span className="inline-block w-8 text-right text-slate-600/40 mr-4 select-none">
              {String(idx + 1).padStart(2, '0')}
            </span>
            {line || ' '}
          </div>
        ))}
      </pre>

      {/* Live typing pane */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[54%] flex items-center justify-end pr-4 md:pr-8 lg:pr-14">
        <div className="apsod-code-hero-panel relative w-full max-w-xl opacity-[0.42] md:opacity-[0.72]">
          <div className="mb-3 flex items-center gap-2 px-1">
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="ml-2 font-mono text-[10px] tracking-wide text-slate-500 uppercase">
              product.ts
            </span>
          </div>
          <pre className="font-mono text-[11px] sm:text-[12px] md:text-[13px] leading-[1.75] overflow-hidden">
            {lines.map((line, idx) => {
              const isLast = idx === lines.length - 1
              return (
                <div key={idx} className="whitespace-pre">
                  <span className="inline-block w-7 md:w-8 text-right text-slate-600 mr-3 md:mr-4 select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {highlight(line)}
                  {isLast && !reduced && chars < FULL.length ? (
                    <span className="apsod-code-caret inline-block w-[0.55ch] h-[1.05em] align-[-0.15em] ml-0.5 bg-sky-300/90" />
                  ) : null}
                </div>
              )
            })}
          </pre>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-950/25 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/70" />
    </div>
  )
}
