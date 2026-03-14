import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход в админ-панель | APSOD',
  description: 'Вход для администраторов',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
