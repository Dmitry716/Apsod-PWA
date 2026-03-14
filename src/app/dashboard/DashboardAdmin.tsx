'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const API_SUB = '/api/notifications/subscribe';
const API_SEND = '/api/notifications/send';
const API_POST = '/api/notifications/post';
const API_STATUS = '/api/notifications/status';

type SubRow = { endpoint?: string; createdAt?: string; userAgent?: string };

export default function DashboardAdmin({ onLogout }: { onLogout: () => void }) {
  const [subs, setSubs] = useState<SubRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string>('Нажмите на кнопку для теста...');
  const [resultError, setResultError] = useState(false);
  const [posts, setPosts] = useState<{ slug: string; title: string }[]>([]);
  const [notifyTitle, setNotifyTitle] = useState('Новое уведомление от APSOD');
  const [notifyBody, setNotifyBody] = useState('Привет! Это тестовое уведомление');
  const [notifyUrl, setNotifyUrl] = useState('/blog');
  const [notifyIcon, setNotifyIcon] = useState('/icons/icon-192x192.png');
  const [postSlug, setPostSlug] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  const showResult = useCallback((data: unknown, isError = false) => {
    setResult(JSON.stringify(data, null, 2));
    setResultError(isError);
  }, []);

  const refreshSubs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_SUB);
      const data = await res.json();
      if (data.subscriptions) setSubs(data.subscriptions);
      else setSubs([]);
    } catch (e) {
      setSubs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSubs();
    fetch('/api/blog/posts')
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, [refreshSubs]);

  const toggleSelectAll = () => {
    if (selectedIndices.size === subs.length) {
      setSelectedIndices(new Set());
    } else {
      setSelectedIndices(new Set(subs.map((_, i) => i)));
    }
  };

  const toggleOne = (index: number) => {
    const next = new Set(selectedIndices);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setSelectedIndices(next);
  };

  const getSelectedIndices = () => (selectedIndices.size > 0 ? Array.from(selectedIndices) : null);

  const run = async (
    label: string,
    fn: () => Promise<void>,
    btn?: HTMLButtonElement | null
  ) => {
    if (btn) btn.disabled = true;
    showResult(label);
    try {
      await fn();
    } catch (e) {
      showResult({ error: (e as Error).message }, true);
    } finally {
      if (btn) (btn as HTMLButtonElement).disabled = false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6 py-3 px-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← На сайт
            </Link>
            <span className="text-sm text-gray-600 dark:text-gray-400">Админ-панель</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
          >
            Выйти
          </button>
        </div>

        <h1 className="text-2xl font-bold border-b-2 border-blue-600 pb-2 mb-6">
          Админ-панель APSOD
        </h1>

        {/* Подписчики */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Подписчики на пуш-уведомления и новые статьи
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Список пользователей, подписавшихся на уведомления.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-md font-medium">
              Подписчиков: {subs.length}
            </span>
            <button
              type="button"
              onClick={refreshSubs}
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm disabled:opacity-50"
            >
              {loading ? 'Загрузка…' : 'Обновить список'}
            </button>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={subs.length > 0 && selectedIndices.size === subs.length}
                onChange={toggleSelectAll}
              />
              Выбрать всех
            </label>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-gray-500">Загрузка...</p>
            ) : subs.length === 0 ? (
              <p className="text-gray-500 py-4">
                Нет активных подписок. Они появятся после того, как пользователи разрешат
                уведомления на сайте.
              </p>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="p-2 text-left w-10">
                      <input
                        type="checkbox"
                        checked={subs.length > 0 && selectedIndices.size === subs.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="p-2 text-left">№</th>
                    <th className="p-2 text-left">Endpoint</th>
                    <th className="p-2 text-left">Дата</th>
                    <th className="p-2 text-left">User Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map((sub, i) => (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectedIndices.has(i)}
                          onChange={() => toggleOne(i)}
                        />
                      </td>
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2 font-mono text-xs break-all max-w-[240px]">
                        {sub.endpoint || '—'}
                      </td>
                      <td className="p-2 text-gray-500 whitespace-nowrap">
                        {sub.createdAt
                          ? new Date(sub.createdAt).toLocaleString('ru-RU')
                          : '—'}
                      </td>
                      <td className="p-2 text-gray-500 truncate max-w-[200px]" title={sub.userAgent}>
                        {(sub.userAgent || '—').slice(0, 50)}
                        {(sub.userAgent?.length ?? 0) > 50 ? '…' : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Управление подписками */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Управление подписками</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={(e) =>
                run('Загрузка списка...', async () => {
                  const res = await fetch(API_SUB);
                  const data = await res.json();
                  showResult({ status: res.status, data });
                  await refreshSubs();
                }, e.currentTarget)
              }
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Получить список
            </button>
            <button
              type="button"
              onClick={(e) =>
                run('Создание тестовой подписки...', async () => {
                  const res = await fetch(API_SUB, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      endpoint:
                        'https://example.com/test-' + Math.random().toString(36).slice(2, 10),
                      keys: {
                        p256dh: 'test-' + Math.random().toString(36).slice(2),
                        auth: 'auth-' + Math.random().toString(36).slice(2),
                      },
                    }),
                  });
                  const data = await res.json();
                  showResult({ status: res.status, data });
                  if (res.ok) await refreshSubs();
                }, e.currentTarget)
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Создать тестовую подписку
            </button>
            <button
              type="button"
              onClick={(e) =>
                run('Удаление всех подписок...', async () => {
                  const res = await fetch(API_SUB, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ deleteAll: true }),
                  });
                  const data = await res.json();
                  showResult({ status: res.status, data });
                  await refreshSubs();
                  setSelectedIndices(new Set());
                }, e.currentTarget)
              }
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Удалить все подписки
            </button>
          </div>
        </section>

        {/* Отправка уведомлений */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Отправка уведомлений</h2>
          <div className="space-y-3 mb-4">
            <input
              type="text"
              value={notifyTitle}
              onChange={(e) => setNotifyTitle(e.target.value)}
              placeholder="Заголовок"
              className="w-full max-w-md px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            />
            <input
              type="text"
              value={notifyBody}
              onChange={(e) => setNotifyBody(e.target.value)}
              placeholder="Текст"
              className="w-full max-w-md px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            />
            <input
              type="text"
              value={notifyUrl}
              onChange={(e) => setNotifyUrl(e.target.value)}
              placeholder="URL (опционально)"
              className="w-full max-w-md px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            />
            <input
              type="text"
              value={notifyIcon}
              onChange={(e) => setNotifyIcon(e.target.value)}
              placeholder="Иконка"
              className="w-full max-w-md px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={(e) =>
                run('Отправка...', async () => {
                  const res = await fetch(API_SEND, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: notifyTitle,
                      body: notifyBody,
                      url: notifyUrl || '/',
                    }),
                  });
                  const data = await res.json();
                  showResult({ status: res.status, data });
                }, e.currentTarget)
              }
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Отправить простое
            </button>
            <button
              type="button"
              onClick={(e) =>
                run('Отправка расширенного...', async () => {
                  const res = await fetch(API_SEND, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: notifyTitle,
                      body: notifyBody,
                      url: notifyUrl || '/',
                      icon: notifyIcon,
                      badge: '/icons/icon-72x72.png',
                      data: { from: 'APSOD', timestamp: new Date().toISOString(), type: 'test' },
                      actions: [
                        { action: 'open', title: 'Открыть' },
                        { action: 'close', title: 'Закрыть' },
                      ],
                    }),
                  });
                  const data = await res.json();
                  showResult({ status: res.status, data });
                }, e.currentTarget)
              }
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            >
              Отправить расширенное
            </button>
            <button
              type="button"
              onClick={(e) =>
                run('Отправка всем...', async () => {
                  const res = await fetch(API_SEND, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: notifyTitle + ' (всем)',
                      body: notifyBody,
                      url: notifyUrl || '/',
                      icon: notifyIcon,
                    }),
                  });
                  const data = await res.json();
                  showResult({ status: res.status, data });
                  if (res.ok) await refreshSubs();
                }, e.currentTarget)
              }
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Всем
            </button>
            <button
              type="button"
              onClick={(e) => {
                const indices = getSelectedIndices();
                if (!indices || indices.length === 0) {
                  showResult({ error: 'Выберите хотя бы одного подписчика' }, true);
                  return;
                }
                run('Отправка выбранным...', async () => {
                  const res = await fetch(API_SEND, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: notifyTitle + ' (выбранным)',
                      body: notifyBody,
                      url: notifyUrl || '/',
                      icon: notifyIcon,
                      indices,
                    }),
                  });
                  const data = await res.json();
                  showResult({ status: res.status, data });
                  if (res.ok) await refreshSubs();
                }, e.currentTarget);
              }}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Выбранным
            </button>
          </div>
        </section>

        {/* Уведомления о новых статьях */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">
            Уведомления о новых статьях
          </h2>
          <div className="space-y-3 mb-4">
            <select
              value={postSlug}
              onChange={(e) => setPostSlug(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 max-w-md w-full"
            >
              <option value="">Выберите статью...</option>
              {posts.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Секретный ключ (NOTIFICATION_SECRET)"
              className="w-full max-w-md px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            />
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Секретный ключ должен совпадать с NOTIFICATION_SECRET в .env
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={(e) => {
                if (!postSlug) {
                  showResult({ error: 'Выберите статью' }, true);
                  return;
                }
                if (!secretKey) {
                  showResult({ error: 'Введите секретный ключ' }, true);
                  return;
                }
                run('Отправка всем подписчикам...', async () => {
                  const res = await fetch(API_POST, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${secretKey}`,
                    },
                    body: JSON.stringify({ slug: postSlug }),
                  });
                  const data = await res.json();
                  showResult({ status: res.status, data });
                  if (res.ok) await refreshSubs();
                }, e.currentTarget);
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Всем подписчикам
            </button>
            <button
              type="button"
              onClick={(e) => {
                const indices = getSelectedIndices();
                if (!postSlug) {
                  showResult({ error: 'Выберите статью' }, true);
                  return;
                }
                if (!secretKey) {
                  showResult({ error: 'Введите секретный ключ' }, true);
                  return;
                }
                if (!indices || indices.length === 0) {
                  showResult({ error: 'Выберите хотя бы одного подписчика' }, true);
                  return;
                }
                run('Отправка выбранным...', async () => {
                  const res = await fetch(API_POST, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${secretKey}`,
                    },
                    body: JSON.stringify({ slug: postSlug, indices }),
                  });
                  const data = await res.json();
                  showResult({ status: res.status, data });
                  if (res.ok) await refreshSubs();
                }, e.currentTarget);
              }}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Выбранным
            </button>
          </div>
        </section>

        {/* VAPID */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Статус VAPID и хранилища</h2>
          <button
            type="button"
            onClick={(e) =>
              run('Проверка статуса...', async () => {
                const res = await fetch(API_STATUS);
                const data = await res.json();
                showResult(data);
              }, e.currentTarget)
              }
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Проверить статус
          </button>
        </section>

        {/* Результат */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h3 className="font-semibold text-blue-600 mb-2">Результат</h3>
          <pre
            className={`text-sm overflow-x-auto p-4 rounded-lg ${
              resultError
                ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                : 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700'
            }`}
          >
            {result}
          </pre>
        </div>
      </div>
    </div>
  );
}
