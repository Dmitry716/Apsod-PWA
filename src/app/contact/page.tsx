"use client";

import { useState } from "react";
import { IMaskInput } from 'react-imask';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

// Компонент для подписки на уведомления
function PushNotificationSubscribe() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    setSubscriptionStatus(null);

    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        throw new Error('Ваш браузер не поддерживает push-уведомления');
      }

      const registration = await navigator.serviceWorker.register('/notification-sw.js');
      await navigator.serviceWorker.ready;
      
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Вы не разрешили уведомления');
      }

      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        throw new Error('VAPID ключ не настроен на сервере');
      }

      const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      };

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubscriptionStatus('✅ Успешно подписаны!');
        setTimeout(() => setSubscriptionStatus(null), 3000);
      } else {
        throw new Error(data.error || 'Ошибка при сохранении подписки');
      }

    } catch (error) {
      setSubscriptionStatus(`❌ ${error instanceof Error ? error.message : 'Ошибка'}`);
      setTimeout(() => setSubscriptionStatus(null), 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="bg-linear-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
      <div className="flex items-start gap-4">
        <div className="text-4xl">🔔</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Получайте уведомления
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Подпишитесь на уведомления о статусе заявок и новых статьях
          </p>
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {isSubscribing ? 'Подписка...' : '🔔 Подписаться'}
          </button>
          {subscriptionStatus && (
            <p className={`mt-2 text-sm ${subscriptionStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {subscriptionStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Компонент формы с reCAPTCHA
function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phoneCountry: "+375",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    description: "",
    newsletter: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const countries = [
    { code: "+375", name: "Беларусь", mask: "(00) 000-00-00", flag: "🇧🇾", example: "29 123-45-67" },
    { code: "+7", name: "Россия", mask: "(000) 000-00-00", flag: "🇷🇺", example: "912 345-67-89" },
    { code: "+1", name: "США", mask: "(000) 000-0000", flag: "🇺🇸", example: "212 555-1234" },
    { code: "+1", name: "Канада", mask: "(000) 000-0000", flag: "🇨🇦", example: "416 555-1234" },
    { code: "+49", name: "Германия", mask: "(000) 000000", flag: "🇩🇪", example: "30 123456" },
    { code: "+33", name: "Франция", mask: "(0) 00 00 00 00", flag: "🇫🇷", example: "6 12 34 56 78" },
    { code: "+39", name: "Италия", mask: "(000) 0000000", flag: "🇮🇹", example: "02 12345678" },
  ];

  const getCurrentMask = () => {
    const selectedCountry = countries.find(c => c.code === formData.phoneCountry);
    return selectedCountry?.mask || "(00) 000-00-00";
  };

  const getMinDigits = () => {
    switch(formData.phoneCountry) {
      case "+375": return 9;
      case "+7": return 10;
      case "+1": return 10;
      case "+49": return 10;
      case "+33": return 9;
      case "+39": return 9;
      default: return 9;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    setFormData((prev) => ({
      ...prev,
      phone: digitsOnly
    }));
  };

  const handlePhoneCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      phoneCountry: e.target.value,
      phone: ""
    }));
  };

  // Функция для отправки уведомления о новой заявке
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
            email: formData.email
          }
        })
      });
      console.log('✅ Уведомление о заявке отправлено');
    } catch (error) {
      console.error('❌ Ошибка отправки уведомления:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!executeRecaptcha) {
      setErrorMessage("reCAPTCHA не доступна. Пожалуйста, обновите страницу.");
      setIsLoading(false);
      return;
    }

    try {
      const token = await executeRecaptcha('contact_form');

      const minDigits = getMinDigits();
      if (formData.phone.length < minDigits) {
        setErrorMessage(`Номер телефона должен содержать минимум ${minDigits} цифр`);
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage('Пожалуйста, введите корректный email');
        setIsLoading(false);
        return;
      }

      const fullPhone = `${formData.phoneCountry}${formData.phone}`;

      // Отправка email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, fullPhone, recaptchaToken: token }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Ошибка при отправке');

      // Отправка уведомления о новой заявке
      await sendLeadNotification();

      // Отправка в WhatsApp
      const whatsappMessage = `🔔 *Новая заявка с сайта APSOD* 🔔
      
👤 *Имя:* ${formData.name}
📧 *Email:* ${formData.email}
📞 *Телефон:* ${fullPhone}
🏢 *Компания:* ${formData.company || 'Не указано'}
🛠️ *Услуга:* ${formData.service}
💰 *Бюджет:* ${formData.budget}
⏱️ *Сроки:* ${formData.timeline}
📝 *Описание:* ${formData.description}`;

      window.open(`https://wa.me/${fullPhone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      
      setFormData({
        name: "", email: "", phone: "", phoneCountry: "+375", company: "",
        service: "", budget: "", timeline: "", description: "", newsletter: false,
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Ошибка при отправке');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: "📞", title: "Телефон", value: "+375 (44) 577-77-24", link: "tel:+375445777724", description: "Пн-Пт, 9:00 - 18:00" },
    { icon: "✉️", title: "Email", value: "karelinseo@gmail.com", link: "mailto:karelinseo@gmail.com", description: "Ответим в течение 24 часов" },
    { icon: "📍", title: "Офис", value: "г. Минск, ул. Фрунзе, 29", link: "https://maps.google.com/?q=Минск+Фрунзе+29", description: "Бизнес-центр, офис 305" },
    { icon: "💬", title: "WhatsApp", value: "+375 (44) 577-77-24", link: "https://wa.me/375445777724", description: "Быстрая связь в мессенджере" }
  ];

  const socialLinks = [
    { name: "WhatsApp", icon: "📱", url: "https://wa.me/375445777724", color: "from-green-500 to-green-600" },
    { name: "Telegram", icon: "✈️", url: "https://t.me/DMITRYJS", color: "from-blue-500 to-blue-600" },
    { name: "Facebook", icon: "📘", url: "https://www.facebook.com/share/1GuC7K2jZ1/?mibextid=wwXIfr", color: "from-indigo-500 to-indigo-600" }
  ];

  const services = [
    { value: "web", label: "🌐 Веб-разработка" },
    { value: "mobile", label: "📱 Мобильные приложения" },
    { value: "pwa", label: "📲 PWA разработка" },
    { value: "seo", label: "📈 SEO продвижение" },
    { value: "crm", label: "🤝 CRM системы" },
    { value: "erp", label: "⚙️ ERP системы" },
    { value: "uiux", label: "🎨 UI/UX дизайн" }
  ];

  const budgets = [
    { value: "1000-3000", label: "$1,000 - $3,000" },
    { value: "3000-5000", label: "$3,000 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-20000", label: "$10,000 - $20,000" },
    { value: "20000+", label: "$20,000+" },
    { value: "negotiable", label: "Договорной" }
  ];

  const timelines = [
    { value: "1month", label: "До 1 месяца" },
    { value: "1-3months", label: "1-3 месяца" },
    { value: "3-6months", label: "3-6 месяцев" },
    { value: "6+months", label: "Более 6 месяцев" },
    { value: "urgent", label: "Срочно (до 2 недель)" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero секция */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Бриф на{' '}
              <span className="text-blue-600 dark:text-blue-400">
                разработку
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Расскажите о вашем проекте — мы подготовим индивидуальное предложение
            </p>
          </div>
        </div>
      </section>

      {/* Контактная информация */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="p-6">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">{item.value}</a>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{item.value}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок подписки на уведомления */}
      <section className="py-4">
        <div className="container mx-auto px-4 max-w-3xl">
          <PushNotificationSubscribe />
        </div>
      </section>

      {/* Бриф-форма */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Имя *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                    placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Компания</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                    placeholder="Название компании" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                    placeholder="ivan@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Телефон *</label>
                  <div className="flex gap-2">
                    <select name="phoneCountry" value={formData.phoneCountry} onChange={handlePhoneCountryChange}
                      className="w-28 px-2 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all">
                      {countries.map((c) => (
                        <option key={`${c.code}-${c.name}`} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <div className="flex-1">
                      <IMaskInput mask={getCurrentMask()} value={formData.phone} onAccept={(v: string) => handlePhoneChange(v)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                        placeholder={getCurrentMask()} required />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Услуга *</label>
                  <select name="service" value={formData.service} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all">
                    <option value="">Выберите</option>
                    {services.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Бюджет *</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all">
                    <option value="">Выберите</option>
                    {budgets.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Сроки *</label>
                  <select name="timeline" value={formData.timeline} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all">
                    <option value="">Выберите</option>
                    {timelines.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Описание проекта *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all resize-none"
                  placeholder="Расскажите о вашем проекте: основные цели, функционал, целевая аудитория..."></textarea>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="newsletter" id="newsletter" checked={formData.newsletter} onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                  <label htmlFor="newsletter" className="text-sm text-gray-600 dark:text-gray-300">
                    Хочу получать новости и полезные статьи
                  </label>
                </div>
                <button type="submit" disabled={isLoading}
                  className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <span className="text-blue-600 text-lg">🛡️</span>
                <span>Защищено reCAPTCHA. Ваши данные в безопасности.</span>
              </div>

              {errorMessage && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-center">
                  ❌ {errorMessage}
                </div>
              )}
              {isSubmitted && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center animate-slide-up">
                  ✅ Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                  <br /><span className="text-sm">Вы получите уведомление о статусе заявки</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Социальные сети */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="group relative">
                <div className={`w-14 h-14 bg-linear-to-r ${social.color} rounded-xl flex items-center justify-center text-2xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  {social.icon}
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Основной экспорт с провайдером reCAPTCHA
export default function ContactPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  if (!siteKey) {
    console.warn('⚠️ reCAPTCHA site key is missing. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to .env.local');
  }

  return (
    <GoogleReCaptchaProvider 
      reCaptchaKey={siteKey || ''} 
      useRecaptchaNet={true} 
      language="ru"
    >
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}