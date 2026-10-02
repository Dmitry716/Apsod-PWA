'use client'

import { useId, useState } from 'react'

type Status = 'idle' | 'loading' | 'ok' | 'error'

/**
 * Форма подписки на дайджест блога. Один раз в месяц — одна статья.
 * Отправляет POST /api/blog-subscribe. Доступно с клавиатуры и скринридера.
 */
export default function BlogSubscribe() {
  const uid = useId()
  const emailId = `subscribe-email-${uid}`
  const hintId = `subscribe-hint-${uid}`

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/blog-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data: { ok?: boolean; duplicate?: boolean; error?: string } = await res.json()

      if (res.ok && data.ok) {
        setStatus('ok')
        setMessage(
          data.duplicate
            ? 'Этот адрес уже в списке — спасибо, что читаете.'
            : 'Готово! Первое письмо придёт в начале следующего месяца.'
        )
        setEmail('')
      } else {
        setStatus('error')
        setMessage(
          data.error === 'invalid_email'
            ? 'Проверьте адрес — похоже, там опечатка.'
            : 'Не получилось отправить. Попробуйте, пожалуйста, ещё раз.'
        )
      }
    } catch {
      setStatus('error')
      setMessage('Ошибка соединения. Попробуйте ещё раз.')
    }
  }

  const isInvalid = status === 'error'

  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-14 text-white md:py-20"
      aria-labelledby={`subscribe-heading-${uid}`}
    >
      <div className="apsod-arigo-hero-bg absolute inset-0" aria-hidden />
      <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300/80">
            Дайджест
          </p>
          <h2
            id={`subscribe-heading-${uid}`}
            className="font-display mb-4 text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold uppercase tracking-tight"
          >
            Раз в месяц — одна сильная статья
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
            Без спама и ежедневных писем. Только разборы про веб, SEO и продукты.
            Отписаться — в один клик.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor={emailId} className="sr-only">
            Email для подписки
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status !== 'idle') {
                setStatus('idle')
                setMessage('')
              }
            }}
            aria-invalid={isInvalid || undefined}
            aria-describedby={hintId}
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/45 outline-none backdrop-blur-sm transition-colors focus:border-orange-400 focus:bg-white/15 focus-visible:ring-2 focus-visible:ring-orange-400/60"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60"
          >
            {status === 'loading' ? 'Отправляем…' : 'Подписаться'}
          </button>
        </form>

        <p
          id={hintId}
          role="status"
          aria-live="polite"
          className={`mx-auto mt-5 max-w-xl text-center text-xs md:text-sm ${
            status === 'ok'
              ? 'text-emerald-300'
              : status === 'error'
                ? 'text-orange-300'
                : 'text-white/50'
          }`}
        >
          {message || 'Никакой рассылки — только один разбор в месяц.'}
        </p>
      </div>
    </section>
  )
}
