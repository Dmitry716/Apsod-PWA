"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Проверяем, согласился ли пользователь уже
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-96 z-50 animate-slide-up">
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg">🍪 Мы используем куки</h3>
            <p className="text-sm text-white/80 mt-1">
              Этот сайт использует файлы cookie для улучшения работы. Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
              <a href="/legal/privacy-policy" className="underline hover:text-white transition-colors">политикой конфиденциальности</a>.
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={acceptCookies}
            style={{
              background: 'white',
              color: '#667eea',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s'
            }}
            className="hover:scale-105 shadow-md flex-1"
          >
            Принять
          </button>
          <button
            onClick={declineCookies}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            className="hover:bg-white/20 transition-all flex-1"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
}