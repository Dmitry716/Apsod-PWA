"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Исправляем: убираем setState из эффекта, используем флаг
  useEffect(() => {
    // Используем requestAnimationFrame для оптимизации
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    return () => clearTimeout(timeout);
  }, []); // Пустой массив зависимостей

  // Пока не смонтировано - возвращаем children без темы
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}