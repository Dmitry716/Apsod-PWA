'use client'

import { Suspense } from 'react'
import { COMPANY_ADDRESS_DISPLAY, COMPANY_REMOTE_NOTE } from '../lib/seo'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import ContactLeadQuiz from '../components/ContactLeadQuiz'
import PushNotificationSubscribe from '../components/PushNotificationSubscribe'

function ContactContent() {
  const contactInfo = [
    {
      icon: '📍',
      title: 'Офис',
      value: COMPANY_ADDRESS_DISPLAY,
      link: 'https://yandex.by/maps/?text=Минск%2C%20ул.%20Куйбышева%2C%2035',
      description: COMPANY_REMOTE_NOTE,
      emphasize: true,
    },
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
      icon: '💬',
      title: 'Мессенджеры',
      value: '@Apsod_IT / WhatsApp',
      link: 'https://t.me/Apsod_IT',
      description: 'Быстрый ответ в рабочие часы',
    },
  ]

  const socialLinks = [
    {
      name: 'WhatsApp',
      url: 'https://wa.me/375445777724',
      color: 'bg-[#25D366] hover:bg-[#1ebe57]',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      url: 'https://t.me/Apsod_IT',
      color: 'bg-[#229ED9] hover:bg-[#1b8ec4]',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.458.02.889-.16 1.795-.96 6.14-1.36 8.145-.168.84-.499 1.121-.82 1.149-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1GuC7K2jZ1/?mibextid=wwXIfr',
      color: 'bg-[#1877F2] hover:bg-[#166fe5]',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
      ),
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
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Бриф за{' '}
              <span className="text-blue-600 dark:text-blue-400">
                1 минуту
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Цель → бюджет → сроки → контакты. Офис в Минске: ул. Куйбышева, 35.
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
                className={`apsod-card-lift bg-white dark:bg-gray-800 rounded-2xl border p-5 ${
                  item.emphasize
                    ? 'border-blue-200 dark:border-blue-800 md:col-span-2 lg:col-span-1 ring-1 ring-blue-100 dark:ring-blue-900/40'
                    : 'border-gray-100 dark:border-gray-700'
                }`}
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
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            Написать в мессенджер
          </p>
          <div className="flex justify-center gap-6 sm:gap-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
                aria-label={social.name}
              >
                <div
                  className={`w-14 h-14 ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}
                >
                  {social.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {social.name}
                </span>
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
