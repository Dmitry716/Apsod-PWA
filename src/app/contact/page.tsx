"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "Телефон",
      value: "+375 (44) 577-77-24",
      link: "tel:+375445777724",
      description: "Пн-Пт, 9:00 - 18:00"
    },
    {
      icon: "✉️",
      title: "Email",
      value: "info@apsod.com",
      link: "mailto:info@apsod.com",
      description: "Ответим в течение 24 часов"
    },
    {
      icon: "📍",
      title: "Офис",
      value: "г. Минск, ул. Фрунзе, 29",
      link: "https://maps.google.com/?q=Минск+Фрунзе+29",
      description: "Бизнес-центр, офис 305"
    },
    {
      icon: "🕒",
      title: "Режим работы",
      value: "Пн-Пт 9:00–18:00",
      description: "Сб-Вс - выходной"
    }
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: "📱",
      url: "https://wa.me/375445777724",
      color: "from-green-500 to-green-600",
      hoverColor: "group-hover:from-green-600 group-hover:to-green-700"
    },
    {
      name: "Telegram",
      icon: "✈️",
      url: "https://t.me/DMITRYJS",
      color: "from-blue-500 to-blue-600",
      hoverColor: "group-hover:from-blue-600 group-hover:to-blue-700"
    },
    {
      name: "Facebook",
      icon: "📘",
      url: "https://www.facebook.com/share/1GuC7K2jZ1/?mibextid=wwXIfr",
      color: "from-indigo-500 to-indigo-600",
      hoverColor: "group-hover:from-indigo-600 group-hover:to-indigo-700"
    }
  ];

  const faq = [
    {
      question: "Как быстро вы отвечаете на заявки?",
      answer: "Мы стараемся отвечать на все заявки в течение 2-3 часов в рабочее время.",
      icon: "⚡"
    },
    {
      question: "Работаете ли вы с зарубежными заказчиками?",
      answer: "Да, мы успешно реализовали проекты для клиентов из США, Европы и СНГ.",
      icon: "🌍"
    },
    {
      question: "Какие способы оплаты принимаете?",
      answer: "Работаем по безналичному расчету с НДС и без НДС для резидентов РБ и зарубежных компаний.",
      icon: "💳"
    },
    {
      question: "Нужно ли заключать договор?",
      answer: "Да, мы всегда работаем официально с заключением договора и актами выполненных работ.",
      icon: "📄"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Свяжитесь{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                с нами
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Обсудите ваш проект с экспертами APSOD. Ответим на все вопросы и подготовим предложение
            </p>
          </div>
        </div>
      </section>

      {/* Контактная информация */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="p-6">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : undefined}
                      rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{item.value}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Карта и форма */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Левая колонка - Карта и соцсети */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Как нас найти
              </h2>
              
              {/* Карта */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-xl mb-8 h-80 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.123456789!2d27.5678!3d53.9123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDU0JzQ0LjMiTiAyN8KwMzQnMDQuMSJF!5e0!3m2!1sru!2sby!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Социальные сети */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Мы в соцсетях
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-2xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      {social.icon}
                    </div>
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Правая колонка - Форма */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Напишите нам
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                      placeholder="+375 (44) 577-77-24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Компания
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                      placeholder="Название компании"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Услуга
                  </label>
                  <select
                    name="service"
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                  >
                    <option value="">Выберите услугу</option>
                    <option value="web">Веб-разработка</option>
                    <option value="mobile">Мобильное приложение</option>
                    <option value="crm">CRM система</option>
                    <option value="erp">ERP система</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all resize-none"
                    placeholder="Расскажите о вашем проекте..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Отправить сообщение
                </button>

                {isSubmitted && (
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center animate-slide-up">
                    Спасибо! Мы свяжемся с вами в ближайшее время.
                  </div>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Нажимая на кнопку, вы соглашаетесь с{' '}
                  <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    политикой конфиденциальности
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ секция */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Ответы на самые популярные вопросы
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faq.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Начнем проект?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Оставьте заявку прямо сейчас, и мы подготовим индивидуальное предложение
          </p>
          <a
            href="https://wa.me/375445777724"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Написать в WhatsApp
            <span className="ml-2 text-xl">📱</span>
          </a>
        </div>
      </section>
    </div>
  );
}