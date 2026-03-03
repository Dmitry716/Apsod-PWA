"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {/* Логотип */}
          <Link
            href="/"
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
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
                    color: isActive ? "#2563eb" : "inherit",
                    fontWeight: isActive ? "600" : "400",
                    position: "relative",
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
                        background: "linear-gradient(to right, #2563eb, #9333ea)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Кнопка мобильного меню */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg"
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

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}