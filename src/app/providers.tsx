"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Используем useEffect с очисткой
  useEffect(() => {
    // Используем requestAnimationFrame для оптимизации
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="apsod-theme"
    >
      {children}
    </ThemeProvider>
  );
}