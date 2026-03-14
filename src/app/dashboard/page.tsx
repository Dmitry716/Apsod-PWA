'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardAdmin from './DashboardAdmin';

export default function DashboardPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<'loading' | 'ok' | 'fail'>('loading');

  useEffect(() => {
    fetch('/api/dashboard/me')
      .then((r) => {
        if (r.ok) setAuth('ok');
        else setAuth('fail');
      })
      .catch(() => setAuth('fail'));
  }, []);

  useEffect(() => {
    if (auth === 'fail') {
      router.replace('/admin');
    }
  }, [auth, router]);

  const handleLogout = async () => {
    await fetch('/api/dashboard/logout', { method: 'POST' });
    router.replace('/admin');
  };

  if (auth === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  if (auth === 'fail') {
    return null;
  }

  return <DashboardAdmin onLogout={handleLogout} />;
}
