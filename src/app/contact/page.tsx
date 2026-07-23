'use client'

import { Suspense } from 'react'
import { COMPANY_ADDRESS_DISPLAY, COMPANY_REMOTE_NOTE } from '../lib/seo'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import ContactLeadQuiz from '../components/ContactLeadQuiz'
import PushNotificationSubscribe from '../components/PushNotificationSubscribe'

function ContactContent() {
  const contactInfo = [
    {
      icon: '📞',
      title: 'Телефон',
      value: '+375 (44) 577-77-24',
      link: 'tel:+375445777724',
      description: 'Пн-Пт, 9:00 - 18:00',
    },
    {
      icon: '✉️',
      title: 'Email',
      value: 'karelinseo@gmail.com',
      link: 'mailto:karelinseo@gmail.com',
      description: 'Ответим в течение 24 часов',
    },
    {
      icon: '🌍',
      title: 'Формат работы',
      value: COMPANY_ADDRESS_DISPLAY,
      link: '',
      description: COMPANY_REMOTE_NOTE,
    },
    {
      icon: '💬',
      title: 'Мессенджеры',
      value: 'Telegram / WhatsApp',
      link: 'https://t.me/DMITRYJS',
      description: 'Быстрый ответ в рабочие часы',
    },
  ]

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: '📱',
      url: 'https://wa.me/375445777724',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Telegram',
      icon: '✈️',
      url: 'https://t.me/DMITRYJS',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: 'https://www.facebook.com/share/1GuC7K2jZ1/?mibextid=wwXIfr',
      color: 'from-indigo-500 to-indigo-600',
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <div className="apsod-grid-fade opacity-50" />
          <div className="apsod-mesh-blob w-[420px] h-[420px] bg-blue-400/20 top-[-80px] left-[-60px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Бриф за{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                1 минуту
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Цель → бюджет → сроки → контакты. Подготовим предложение без шаблонов и конструкторов.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="apsod-card-lift bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{item.value}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-10 text-center text-gray-500">
                Загрузка формы…
              </div>
            }
          >
            <ContactLeadQuiz />
          </Suspense>
        </div>
      </section>

      <section className="py-4">
        <div className="container mx-auto px-4 max-w-3xl">
          <PushNotificationSubscribe />
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={social.name}
              >
                <div
                  className={`w-14 h-14 bg-linear-to-r ${social.color} rounded-xl flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-110`}
                >
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ContactPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey && process.env.NODE_ENV === 'development') {
    console.warn(
      '⚠️ reCAPTCHA: задайте NEXT_PUBLIC_RECAPTCHA_SITE_KEY в .env.local для проверки на форме контактов.'
    )
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey || ''} useRecaptchaNet={true} language="ru">
      <ContactContent />
    </GoogleReCaptchaProvider>
  )
}
