"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Проверяем, установлено ли уже приложение
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                               (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);
    };
    checkStandalone();

    // Определяем iOS устройство
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) || 
                (/(Mac|Mac OS|MacIntel)/.test(ua) && 'ontouchend' in document);
    setIsIOS(iOS);

    // Слушаем событие установки
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      if (!iOS && !isDismissed) {
        setIsInstallable(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);

    // Для iOS показываем инструкцию
    if (iOS && !isStandalone && !isDismissed) {
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler as EventListener);
    };
  }, [isStandalone, isIOS, isDismissed]);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert('📱 Для установки приложения на iPhone/iPad:\n\n1. Нажмите кнопку "Поделиться" (⎙) в браузере Safari\n2. Прокрутите вниз и выберите "На экран домой"\n3. Нажмите "Добавить" в правом верхнем углу');
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  const handleClose = () => {
    setIsInstallable(false);
    setIsDismissed(true);
  };

  // Если приложение уже установлено или баннер закрыли - не показываем
  if (isStandalone || !isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div style={{
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        color: 'white',
        borderRadius: '0.75rem',
        padding: '1rem 2.5rem 1rem 1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        position: 'relative'
      }}>
        {/* Крестик закрытия */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            color: 'white',
            opacity: 0.7,
            padding: '0.25rem',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            width: '24px',
            height: '24px',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
          aria-label="Закрыть"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-3">
          {/* Иконка приложения */}
          <div className="shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg">Установите приложение APSOD</h3>
            <p className="text-sm text-blue-100 mt-1">
              {isIOS ? 'Нажмите "Поделиться" → "На экран домой"' : 'Быстрый доступ с главного экрана'}
            </p>
          </div>
          
          <button
            onClick={handleInstallClick}
            className="shrink-0 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all hover:scale-105 shadow-md"
          >
            {isIOS ? 'Инструкция' : 'Установить'}
          </button>
        </div>
      </div>
    </div>
  );
}