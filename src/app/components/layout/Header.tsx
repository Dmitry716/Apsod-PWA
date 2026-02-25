"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
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
      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean })
          .standalone === true
      ) {
        setIsStandalone(true);
      }
    };
    checkStandalone();

    const ua = window.navigator.userAgent;
    const iOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (/(Mac|Mac OS|MacIntel)/.test(ua) && "ontouchend" in document);

    const timer1 = setTimeout(() => setIsIOS(iOS), 0);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const timer2 = setTimeout(() => {
      if (iOS && !isStandalone) {
        setShowInstallButton(true);
      }
    }, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert(
        'Для установки приложения:\n1. Нажмите кнопку "Поделиться" (⎙) в браузере Safari\n2. Выберите "На экран домой"\n3. Нажмите "Добавить"',
      );
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
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
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: isScrolled ? "var(--header-bg)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
        boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border-color)" : "none",
        zIndex: 50,
        transition: "all 0.3s ease",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Логотип с плавной анимацией */}
          <Link
            href="/"
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
              transition: "transform 0.7s ease-in-out",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            APSOD
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive
                      ? "var(--primary-color)"
                      : "var(--text-secondary)",
                    fontWeight: isActive ? "600" : "500",
                    fontSize: "1.1rem",
                    transition: "color 0.3s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--primary-color)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-4px",
                        left: 0,
                        width: "100%",
                        height: "2px",
                        background:
                          "linear-gradient(to right, #2563eb, #9333ea)",
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Кнопка установки PWA */}
            {showInstallButton && !isStandalone && (
              <button
                onClick={handleInstallClick}
                style={{
                  padding: "0.5rem 1rem",
                  background: "linear-gradient(to right, #2563eb, #9333ea)",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  transition: "all 0.3s ease",
                }}
                className="hidden md:flex items-center space-x-2"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px -3px rgb(0 0 0 / 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgb(0 0 0 / 0.1)";
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Установить</span>
              </button>
            )}

            <ThemeToggle />

            {/* Кнопка мобильного меню */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label="Меню"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.2)",
                padding: "0.5rem",
              }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.5rem",
                      color: isActive
                        ? "var(--primary-color)"
                        : "var(--text-primary)",
                      backgroundColor: isActive
                        ? "var(--bg-secondary)"
                        : "transparent",
                      fontWeight: isActive ? "600" : "400",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor =
                          "var(--bg-secondary)";
                        e.currentTarget.style.transform = "scale(1.02)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Кнопка установки в мобильном меню */}
              {showInstallButton && !isStandalone && (
                <button
                  onClick={handleInstallClick}
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                    padding: "0.75rem 1rem",
                    background: "linear-gradient(to right, #2563eb, #9333ea)",
                    color: "white",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 25px -5px rgb(0 0 0 / 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
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
