'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { IMaskInput } from 'react-imask'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { formatDualPrice } from '../lib/currency'

const GOALS = [
  {
    value: 'landing',
    service: 'web',
    label: 'Лендинг / одностраничник',
    hint: 'Заявки, витрина услуги',
  },
  {
    value: 'corporate',
    service: 'web',
    label: 'Корпоративный сайт',
    hint: 'Компания, услуги, доверие',
  },
  {
    value: 'shop',
    service: 'web',
    label: 'Интернет-магазин',
    hint: 'Каталог, оплата, доставка',
  },
  {
    value: 'mobile',
    service: 'mobile',
    label: 'Мобильное приложение',
    hint: 'iOS / Android / PWA',
  },
  {
    value: 'seo',
    service: 'seo',
    label: 'SEO и рост трафика',
    hint: 'Яндекс и Google',
  },
  {
    value: 'other',
    service: 'web',
    label: 'Другое / не уверен',
    hint: 'Подскажем на созвоне',
  },
] as const

const BUDGETS = [
  { value: 'landing-8k', label: formatDualPrice(8000), hint: 'лендинг' },
  { value: 'corporate-15k', label: formatDualPrice(15000), hint: 'корп. сайт' },
  { value: 'shop-23k', label: formatDualPrice(23000), hint: 'магазин' },
  { value: 'complex', label: formatDualPrice(30000, { plus: true }), hint: 'сложный продукт' },
  { value: 'negotiable', label: 'Пока не знаю', hint: 'нужна смета' },
] as const

const TIMELINES = [
  { value: 'urgent', label: 'Срочно', hint: 'до 2 недель' },
  { value: '1month', label: 'До месяца' },
  { value: '1-3months', label: '1–3 месяца' },
  { value: '3-6months', label: '3–6 месяцев' },
  { value: '6+months', label: 'Гибко / позже' },
] as const

const COUNTRIES = [
  { code: '+375', name: 'Беларусь', mask: '(00) 000-00-00', flag: '🇧🇾' },
  { code: '+7', name: 'Россия', mask: '(000) 000-00-00', flag: '🇷🇺' },
  { code: '+1', name: 'США', mask: '(000) 000-0000', flag: '🇺🇸' },
  { code: '+49', name: 'Германия', mask: '(000) 000000', flag: '🇩🇪' },
] as const

const STEPS = ['Цель', 'Бюджет', 'Сроки', 'Контакты'] as const

type FormState = {
  goal: string
  name: string
  email: string
  phone: string
  phoneCountry: string
  company: string
  service: string
  budget: string
  timeline: string
  description: string
  newsletter: boolean
  ref: string
}

const INITIAL: FormState = {
  goal: '',
  name: '',
  email: '',
  phone: '',
  phoneCountry: '+375',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  description: '',
  newsletter: false,
  ref: '',
}

function minDigitsFor(country: string) {
  switch (country) {
    case '+375':
      return 9
    case '+7':
    case '+1':
    case '+49':
      return 10
    default:
      return 9
  }
}

export default function ContactLeadQuiz() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormState>(INITIAL)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const goal = searchParams.get('goal') || ''
    const budget = searchParams.get('budget') || ''
    const service = searchParams.get('service') || ''
    const ref = searchParams.get('ref') || ''
    const matchedGoal = GOALS.find((g) => g.value === goal || g.service === service)

    if (matchedGoal || budget || ref) {
      setFormData((prev) => ({
        ...prev,
        goal: matchedGoal?.value || prev.goal,
        service: matchedGoal?.service || service || prev.service,
        budget: BUDGETS.some((b) => b.value === budget) ? budget : prev.budget,
        ref,
      }))
      if (matchedGoal && budget) setStep(2)
      else if (matchedGoal) setStep(1)
    }
  }, [searchParams])

  const mask = useMemo(() => {
    return COUNTRIES.find((c) => c.code === formData.phoneCountry)?.mask || '(00) 000-00-00'
  }, [formData.phoneCountry])

  const progress = ((step + 1) / STEPS.length) * 100

  const canContinue = () => {
    if (step === 0) return Boolean(formData.goal)
    if (step === 1) return Boolean(formData.budget)
    if (step === 2) return Boolean(formData.timeline)
    return true
  }

  const selectGoal = (value: string) => {
    const g = GOALS.find((item) => item.value === value)
    setFormData((prev) => ({
      ...prev,
      goal: value,
      service: g?.service || prev.service,
    }))
  }

  const sendLeadNotification = async () => {
    try {
      await fetch('/api/notifications/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'new_lead',
          leadData: {
            name: formData.name,
            service: formData.service,
            email: formData.email,
          },
        }),
      })
    } catch {
      /* non-blocking */
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    if (!executeRecaptcha) {
      setErrorMessage('reCAPTCHA не доступна. Обновите страницу.')
      setIsLoading(false)
      return
    }

    try {
      const token = await executeRecaptcha('contact_form')
      const minDigits = minDigitsFor(formData.phoneCountry)
      if (formData.phone.length < minDigits) {
        setErrorMessage(`Номер телефона должен содержать минимум ${minDigits} цифр`)
        setIsLoading(false)
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setErrorMessage('Введите корректный email')
        setIsLoading(false)
        return
      }

      const fullPhone = `${formData.phoneCountry}${formData.phone}`
      const goalLabel = GOALS.find((g) => g.value === formData.goal)?.label || formData.goal
      const description = [
        formData.description.trim(),
        formData.goal ? `Цель: ${goalLabel}` : '',
        formData.ref ? `Реферер кейса: ${formData.ref}` : '',
      ]
        .filter(Boolean)
        .join('\n')

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          description,
          fullPhone,
          recaptchaToken: token,
        }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Ошибка при отправке')

      await sendLeadNotification()
      setIsSubmitted(true)
      setFormData(INITIAL)
      setStep(0)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Ошибка при отправке')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-950/30 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Заявка отправлена</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Мы свяжемся в течение рабочего дня. Обычно — быстрее. Можно написать сразу в мессенджер.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://t.me/Apsod_IT"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Написать в Telegram
          </a>
          <a
            href="https://wa.me/375445777724"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
          >
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            Отправить ещё
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
      <div className="px-6 md:px-10 pt-8 pb-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Шаг {step + 1} из {STEPS.length}: {STEPS[step]}
          </p>
          <div className="flex gap-2">
            <a
              href="https://t.me/Apsod_IT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Telegram
            </a>
            <span className="text-gray-300">·</span>
            <a
              href="https://wa.me/375445777724"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 md:px-10 pb-8 space-y-6">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Какая цель проекта?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Выберите ближайший вариант — уточним детали на следующем шаге.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {GOALS.map((goal) => {
                const active = formData.goal === goal.value
                return (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => selectGoal(goal.value)}
                    className={`text-left rounded-xl border p-4 transition-all ${
                      active
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 ring-1 ring-blue-600/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">{goal.label}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{goal.hint}</div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ориентир по бюджету
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Совпадает с пакетами на странице цен. Точная смета — после брифа.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {BUDGETS.map((budget) => {
                const active = formData.budget === budget.value
                return (
                  <button
                    key={budget.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, budget: budget.value }))}
                    className={`text-left rounded-xl border p-4 transition-all ${
                      active
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 ring-1 ring-blue-600/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">{budget.label}</div>
                    {budget.hint ? (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{budget.hint}</div>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Когда нужен результат?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {TIMELINES.map((item) => {
                const active = formData.timeline === item.value
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, timeline: item.value }))}
                    className={`text-left rounded-xl border p-4 transition-all ${
                      active
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 ring-1 ring-blue-600/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">{item.label}</div>
                    {'hint' in item && item.hint ? (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.hint}</div>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Как с вами связаться?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Компания
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Название компании"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ivan@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Телефон *
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.phoneCountry}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phoneCountry: e.target.value,
                        phone: '',
                      }))
                    }
                    className="w-28 px-2 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={`${c.code}-${c.name}`} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <IMaskInput
                    mask={mask}
                    value={formData.phone}
                    onAccept={(v: string) =>
                      setFormData((prev) => ({ ...prev, phone: v.replace(/\D/g, '') }))
                    }
                    className="flex-1 w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={mask}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Коротко о задаче *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Что нужно сделать, аудитория, срочность, пример конкурента..."
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, newsletter: e.target.checked }))
                }
                className="w-4 h-4 rounded border-gray-300"
              />
              Хочу получать новости и полезные статьи
            </label>
          </div>
        )}

        {errorMessage ? (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
            {errorMessage}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-40"
          >
            Назад
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              disabled={!canContinue()}
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              className="apsod-cta-primary px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-40"
            >
              <span>Далее</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="apsod-cta-primary px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-50"
            >
              <span>{isLoading ? 'Отправка...' : 'Отправить заявку'}</span>
            </button>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span aria-hidden>🛡</span>
          Защищено reCAPTCHA. Данные только для связи по заявке.
        </p>
      </form>
    </div>
  )
}
