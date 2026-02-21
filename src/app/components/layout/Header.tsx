"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const checkStandalone = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone === true) {
        setIsStandalone(true);
      }
    };
    checkStandalone();

    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) || 
                (/(Mac|Mac OS|MacIntel)/.test(ua) && 'ontouchend' in document);
    setIsIOS(iOS);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (iOS && !isStandalone) {
      setShowInstallButton(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert('Для установки приложения:\n1. Нажмите кнопку "Поделиться" (⎙) в браузере Safari\n2. Выберите "На экран домой"\n3. Нажмите "Добавить"');
      return;
    }

    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  const navLinks = [
    { href: "/services", label: "Услуги" },
    { href: "/about", label: "О нас" },
    { href: "/portfolio", label: "Портфолио" },
    { href: "/blog", label: "Блог" },
    { href: "/contact", label: "Контакты" },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: isScrolled ? 'var(--bg-primary)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(8px)' : 'none',
      boxShadow: isScrolled ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none',
      zIndex: 50,
      transition: 'all 0.3s'
    }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 md:h-24">
          <Link href="/" style={{ 
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #2563eb, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            APSOD
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: pathname === link.href ? 'var(--primary-color)' : 'var(--text-secondary)',
                  fontWeight: pathname === link.href ? 'bold' : '500',
                  fontSize: '1.1rem',
                  transition: 'color 0.3s'
                }}
                className="hover:opacity-80"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {showInstallButton && !isStandalone && (
              <button
                onClick={handleInstallClick}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(to right, #2563eb, #9333ea)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                className="hidden md:flex items-center space-x-2 hover:opacity-90 transition-all hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Установить</span>
              </button>
            )}
            
            <ThemeToggle />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
              aria-label="Меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav style={{ backgroundColor: 'var(--bg-card)' }} className="rounded-lg shadow-lg p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    color: pathname === link.href ? 'var(--primary-color)' : 'var(--text-primary)',
                    backgroundColor: pathname === link.href ? 'var(--bg-secondary)' : 'transparent'
                  }}
                  className="hover:bg-opacity-80"
                >
                  {link.label}
                </Link>
              ))}
              
              {showInstallButton && !isStandalone && (
                <button
                  onClick={handleInstallClick}
                  style={{
                    width: '100%',
                    marginTop: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: 'linear-gradient(to right, #2563eb, #9333ea)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  className="hover:opacity-90 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Установить приложение</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}