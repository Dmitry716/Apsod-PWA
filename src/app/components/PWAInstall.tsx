"use client";

import { useEffect, useState } from "react";

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Проверяем, запущено ли приложение в режиме standalone (уже установлено)
    const checkStandalone = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone === true) {
        setIsStandalone(true);
      }
    };
    checkStandalone();

    // Определяем iOS устройство
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) || 
                (/(Mac|Mac OS|MacIntel)/.test(ua) && 'ontouchend' in document);
    setIsIOS(iOS);

    // Обработчик события beforeinstallprompt (только для Android/Chrome)
    const handler = (e: any) => {
      e.preventDefault(); // Предотвращаем стандартный мини-баннер браузера [citation:1][citation:4]
      setDeferredPrompt(e);
      
      // Показываем наш кастомный баннер для поддерживаемых браузеров
      if (!iOS) { // Для Android/Desktop показываем сразу
        setIsInstallable(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Для iOS показываем инструкции всегда, если не в standalone режиме
    if (iOS && !isStandalone) {
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isStandalone, isIOS]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Для iOS просто показываем инструкции
      return;
    }

    // Для Android/Desktop вызываем системный диалог установки [citation:4][citation:5]
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // Если приложение уже установлено, не показываем баннер
  if (isStandalone) return null;

  // Разные сообщения для разных платформ [citation:6][citation:10]
  const getInstallMessage = () => {
    if (isIOS) {
      return {
        title: "Установите приложение APSOD",
        description: "Нажмите 'Поделиться' → 'На экран домой'",
        buttonText: "Инструкция"
      };
    }
    return {
      title: "Установите приложение APSOD",
      description: "Быстрый доступ с главного экрана",
      buttonText: "Установить"
    };
  };

  const message = getInstallMessage();

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div style={{
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        color: 'white',
        borderRadius: '0.75rem',
        padding: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div className="flex items-start gap-3">
          {/* Иконка приложения */}
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg">{message.title}</h3>
            <p className="text-sm text-blue-100 mt-1">{message.description}</p>
          </div>
          
          {isIOS ? (
            // Для iOS показываем кнопку с инструкциями
            <button
              onClick={() => {
                alert('Нажмите кнопку "Поделиться" (⎙), затем выберите "На экран домой"');
              }}
              className="flex-shrink-0 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all hover:scale-105 shadow-md"
            >
              Инструкция
            </button>
          ) : (
            // Для Android/Desktop показываем кнопку установки [citation:1]
            <button
              onClick={handleInstallClick}
              className="flex-shrink-0 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all hover:scale-105 shadow-md"
            >
              {message.buttonText}
            </button>
          )}
          
          <button
            onClick={() => setIsInstallable(false)}
            className="flex-shrink-0 text-white/80 hover:text-white"
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}