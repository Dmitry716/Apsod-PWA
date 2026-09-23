"use client";

import { Suspense } from "react";
import { COMPANY_ADDRESS_DISPLAY, COMPANY_REMOTE_NOTE } from "../lib/seo";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactLeadQuiz from "../components/ContactLeadQuiz";
import PushNotificationSubscribe from "../components/PushNotificationSubscribe";
import Reveal from "../components/Reveal";

const CLIENTS = [
  "Legal Team",
  "Amba Detail",
  "NEXTON",
  "ArtDetailing",
  "BMservice",
  "Динамо-Витебск",
  "Maxximum",
  "Sparkite",
];

function ContactContent() {
  const contactInfo = [
    {
      title: "Офис",
      value: COMPANY_ADDRESS_DISPLAY,
      link: "https://yandex.by/maps/?text=Минск%2C%20ул.%20Куйбышева%2C%2035",
      description: COMPANY_REMOTE_NOTE,
      icon: "📍",
    },
    {
      title: "Телефон",
      value: "+375 (44) 577-77-24",
      link: "tel:+375445777724",
      description: "Пн-Пт, 9:00 – 18:00",
      icon: "📞",
    },
    {
      title: "Email",
      value: "karelinseo@gmail.com",
      link: "mailto:karelinseo@gmail.com",
      description: "Ответим в течение рабочего дня",
      icon: "✉️",
    },
    {
      title: "Мессенджеры",
      value: "@Apsod_IT · WhatsApp",
      link: "https://t.me/Apsod_IT",
      description: "Ответ в рабочие часы",
      icon: "💬",
    },
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/375445777724",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      url: "https://t.me/Apsod_IT",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.458.02.889-.16 1.795-.96 6.14-1.36 8.145-.168.84-.499 1.121-.82 1.149-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1GuC7K2jZ1/?mibextid=wwXIfr",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
      ),
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Отвечаем в течение дня",
      text: "Свяжемся по указанному каналу связи.",
    },
    {
      num: "02",
      title: "Обсуждаем задачу",
      text: "15–30 минут: цель, scope, ограничения.",
    },
    {
      num: "03",
      title: "Присылаем смету",
      text: "Этапы, сроки, зона ответственности.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-gray-950 dark:text-white">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
        <div
          className="apsod-contact-glow pointer-events-none absolute inset-0"
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300">
              <span className="h-px w-8 bg-orange-400/60" aria-hidden />
              Контакты
            </p>
            <h1 className="font-display mb-4 max-w-3xl text-balance text-4xl font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              Обсудим{" "}
              <span className="text-slate-400 dark:text-white/40">
                ваш проект
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Цель, scope и контакты — подготовим предложение с этапами. Офис:
              ул. Куйбышева, 35.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Быстрые CTA ─── */}
      <section className="relative pb-10" aria-label="Быстрая связь">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://t.me/Apsod_IT"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-slate-800 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-orange-100 dark:focus-visible:ring-offset-gray-950"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.458.02.889-.16 1.795-.96 6.14-1.36 8.145-.168.84-.499 1.121-.82 1.149-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Написать в Telegram
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="tel:+375445777724"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-900 transition-all hover:border-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-white dark:hover:border-white dark:hover:bg-white/5 dark:focus-visible:ring-offset-gray-950"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" />
                </svg>
                Позвонить
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Контактные карточки ─── */}
      <section className="relative pb-12" aria-label="Контактная информация">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item, index) => (
              <Reveal key={item.title} stagger={(index + 1) as 1 | 2 | 3 | 4}>
                <div className="group h-full bg-white p-6 transition-colors hover:bg-slate-50 dark:bg-gray-950 dark:hover:bg-slate-900">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                      0{index + 1}
                    </span>
                    <span className="text-xl opacity-80" aria-hidden>
                      {item.icon}
                    </span>
                  </div>

                  <h3 className="font-display mb-2 text-sm font-bold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={
                        item.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="mb-2 inline-block text-sm font-medium text-slate-800 underline-offset-4 transition-colors hover:text-orange-500 hover:underline dark:text-slate-100 dark:hover:text-orange-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                      {item.value}
                    </p>
                  )}
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Клиенты — бегущая строка ─── */}
      <section
        className="relative overflow-hidden border-y border-slate-200 py-8 dark:border-slate-800"
        aria-label="Наши клиенты"
      >
        <div className="container mx-auto px-4">
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Работаем с командами из BY · RU · EU · US
          </p>
        </div>
        <div className="apsod-marquee relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent dark:from-gray-950 md:w-32"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent dark:from-gray-950 md:w-32"
            aria-hidden
          />
          <div className="apsod-marquee__track flex gap-10 whitespace-nowrap md:gap-16">
            {[...Array(2)].flatMap((_, dup) =>
              CLIENTS.map((name) => (
                <span
                  key={`${dup}-${name}`}
                  className="font-display shrink-0 text-lg font-extrabold uppercase tracking-[0.04em] text-slate-400 transition-colors hover:text-slate-900 dark:text-white/35 dark:hover:text-white md:text-xl"
                >
                  {name}
                </span>
              )),
            )}
          </div>
        </div>
      </section>

      {/* ─── Форма ─── */}
      <section className="relative py-12" aria-label="Заявка">
        <div className="container mx-auto max-w-3xl px-4">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-slate-200 p-10 text-center text-slate-500 dark:border-slate-700">
                Загрузка формы…
              </div>
            }
          >
            <ContactLeadQuiz />
          </Suspense>
        </div>
      </section>

      {/* ─── Что будет дальше ─── */}
      <section className="relative py-12" aria-label="Что будет после заявки">
        <div className="container mx-auto px-4">
          <Reveal>
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300">
              Что будет после заявки
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.num} stagger={(index + 1) as 1 | 2 | 3}>
                <div className="relative h-full rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-orange-400/40 hover:shadow-[0_10px_30px_-15px_rgba(251,146,60,0.2)] dark:border-slate-800 dark:bg-white/[0.02] dark:hover:border-orange-400/30">
                  <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-orange-500 dark:text-orange-300">
                    {step.num}
                  </span>
                  <h3 className="font-display mb-2 text-base font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Push-подписка ─── */}
      <section className="py-6">
        <div className="container mx-auto max-w-3xl px-4">
          <PushNotificationSubscribe />
        </div>
      </section>

      {/* ─── Мессенджеры ─── */}
      <section className="border-t border-slate-200 py-12 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Написать в мессенджер
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition-all hover:border-orange-400/60 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-white/[0.02] dark:text-slate-100 dark:hover:border-orange-400/40 dark:hover:bg-orange-400/10 dark:hover:text-orange-300 dark:focus-visible:ring-offset-gray-950"
                  aria-label={`Написать в ${social.name}`}
                >
                  {social.icon}
                  {social.name}
                  <span
                    aria-hidden
                    className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey && process.env.NODE_ENV === "development") {
    console.warn(
      "⚠️ reCAPTCHA: задайте NEXT_PUBLIC_RECAPTCHA_SITE_KEY в .env.local для проверки на форме контактов.",
    );
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey || ""}
      useRecaptchaNet={true}
      language="ru"
    >
      <ContactContent />
    </GoogleReCaptchaProvider>
  );
}
