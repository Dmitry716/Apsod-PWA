'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const apiUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/dashboard/login` : '/api/dashboard/login';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: login.trim(), password }),
        credentials: 'same-origin',
      });
      if (res.status === 404) {
        setError('API входа не найден (404). Убедитесь, что задеплоена последняя версия с маршрутами /api/dashboard/* и переразверните проект на Vercel.');
        setLoading(false);
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        if (typeof navigator !== 'undefined' && 'credentials' in navigator && 'store' in navigator.credentials) {
          try {
            const w = globalThis as unknown as { PasswordCredential?: new (data: { id: string; password: string; name?: string }) => Credential };
            if (typeof w.PasswordCredential === 'function') {
              await navigator.credentials.store(new w.PasswordCredential({ id: login.trim(), password, name: 'Админ-панель APSOD' }));
            }
          } catch {
            // Браузер отклонил сохранение или API недоступен
          }
        }
        router.replace('/dashboard');
        return;
      }
      const message =
        data?.error ||
        (res.status === 503
          ? 'Задайте DASHBOARD_LOGIN и DASHBOARD_PASSWORD в .env (локально — .env.local) и перезапустите сервер или переразверните на Vercel.'
          : 'Неверный логин или пароль.');
      setError(message);
    } catch (err) {
      setError('Ошибка соединения. На продакшене проверьте, что проект задеплоен с маршрутами /api/dashboard/login. Локально запустите npm run dev.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full"
      >
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Вход в админ-панель
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Введите логин и пароль для доступа к панели управления.
        </p>
        <div className="space-y-4">
          <label htmlFor="admin-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Логин (email)
          </label>
          <input
            id="admin-login"
            name="username"
            type="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="admin@example.com"
            autoComplete="username email"
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Пароль
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {error && (
          <p className="mt-4 text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Вход…' : 'Войти'}
        </button>
      </form>
    </div>
  );
}
