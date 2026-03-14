import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Админ-панель | APSOD',
  description: 'Панель управления подписками и уведомлениями',
  robots: 'noindex, nofollow',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
