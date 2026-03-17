'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { EMOJI_LIBRARY, EMOJI_CATEGORIES } from '@/app/data/emoji-library';
import { GIF_LIBRARY } from '@/app/data/gif-library';

const API_SUB = '/api/notifications/subscribe';
const API_SEND = '/api/notifications/send';
const API_POST = '/api/notifications/post';
const API_STATUS = '/api/notifications/status';

type SubRow = { endpoint?: string; createdAt?: string; userAgent?: string };

function filterEmojis(search: string, category: string) {
  const q = search.trim().toLowerCase();
  return EMOJI_LIBRARY.filter((item) => {
    const matchCategory = !category || item.category === category;
    const matchSearch = !q || item.keywords.some((k) => k.toLowerCase().includes(q));
    return matchCategory && matchSearch;
  });
}

function filterGifs(search: string) {
  const q = search.trim().toLowerCase();
  if (!q) return GIF_LIBRARY;
  return GIF_LIBRARY.filter((item) => item.tags.some((t) => t.toLowerCase().includes(q)) || (item.title?.toLowerCase().includes(q)));
}

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
  const [chatConvs, setChatConvs] = useState<{ id: string; lastMessageAt: number; lastMessagePreview?: string; lastVisitorName?: string }[]>([]);
  const [chatSelectedId, setChatSelectedId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ id: string; author: string; text: string; createdAt: string; visitorName?: string; attachments?: { name: string; mimeType: string; data: string }[]; status?: 'sent' | 'delivered' | 'read' }[]>([]);
  const [visitorTyping, setVisitorTyping] = useState(false);
  const [chatReply, setChatReply] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatReplyFiles, setChatReplyFiles] = useState<File[]>([]);
  const [showReplyEmoji, setShowReplyEmoji] = useState(false);
  const [showReplyGif, setShowReplyGif] = useState(false);
  const [replyEmojiSearch, setReplyEmojiSearch] = useState('');
  const [replyEmojiCategory, setReplyEmojiCategory] = useState('');
  const [replyGifSearch, setReplyGifSearch] = useState('');
  const replyTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const replyFileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileName, setProfileName] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [deleteMenuMessageId, setDeleteMenuMessageId] = useState<string | null>(null);
  const chatSoundRef = useRef<HTMLAudioElement | null>(null);

  const filteredReplyEmojis = useMemo(
    () => filterEmojis(replyEmojiSearch, replyEmojiCategory),
    [replyEmojiSearch, replyEmojiCategory]
  );
  const filteredReplyGifs = useMemo(
    () => filterGifs(replyGifSearch),
    [replyGifSearch]
  );

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

  const loadChatConvs = useCallback(async () => {
    try {
      const res = await fetch('/api/chat/conversations', { credentials: 'same-origin' });
      const data = await res.json();
      if (data.conversations) setChatConvs(data.conversations);
    } catch {
      setChatConvs([]);
    }
  }, []);

  const loadChatMessages = useCallback(
    async (convId: string, options?: { fromPoll?: boolean }) => {
      try {
        const res = await fetch(`/api/chat/messages?conversationId=${encodeURIComponent(convId)}&viewer=admin`, { credentials: 'same-origin' });
        const data = await res.json();
        if (data.messages) {
          setChatMessages((prev) => {
            if (options?.fromPoll) {
              const prevLastVisitor = [...prev].reverse().find((m) => m.author !== 'admin');
              const curr = data.messages as typeof prev;
              const currLastVisitor = [...curr].reverse().find((m) => m.author !== 'admin');
              if (
                currLastVisitor &&
                (!prevLastVisitor || prevLastVisitor.id !== currLastVisitor.id)
              ) {
                // Новый входящий от пользователя: звук + уведомление
                try {
                  if (chatSoundRef.current) {
                    chatSoundRef.current.play().catch(() => {});
                  }
                } catch {
                  // ignore
                }
                if (typeof window !== 'undefined' && 'Notification' in window) {
                  if (Notification.permission === 'granted') {
                    try {
                      const body =
                        currLastVisitor.text.slice(0, 80) +
                        (currLastVisitor.text.length > 80 ? '…' : '');
                      new Notification('Новое сообщение в чате APSOD', {
                        body,
                        icon: profilePhotoUrl || '/icons/icon-192x192.png',
                      });
                    } catch {
                      // ignore
                    }
                  }
                }
              }
            }
            return data.messages;
          });
        }
      } catch {
        setChatMessages([]);
      }
    },
    [profilePhotoUrl]
  );

  useEffect(() => {
    refreshSubs();
    loadChatConvs();
    fetch('/api/blog/posts')
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setPosts([]));
    fetch('/api/chat/profile')
      .then((r) => r.json())
      .then((p) => {
        setProfileName(p.name ?? '');
        setProfilePhotoUrl(p.photoUrl ?? '');
      })
      .catch(() => {});
  }, [refreshSubs, loadChatConvs]);

  useEffect(() => {
    // Звук для новых сообщений в чате админа
    if (typeof window !== 'undefined') {
      try {
        chatSoundRef.current = new Audio('/sounds/chat-message.mp3');
      } catch {
        chatSoundRef.current = null;
      }
    }
    const ping = () => {
      fetch('/api/chat/ping', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
    };
    ping();
    const t = setInterval(ping, 2 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (chatSelectedId) {
      loadChatMessages(chatSelectedId);
      const t = setInterval(() => loadChatMessages(chatSelectedId, { fromPoll: true }), 3000);
      return () => clearInterval(t);
    } else {
      setChatMessages([]);
      setVisitorTyping(false);
    }
  }, [chatSelectedId, loadChatMessages]);

  useEffect(() => {
    if (!deleteMenuMessageId) return;
    const close = () => setDeleteMenuMessageId(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [deleteMenuMessageId]);

  // Опрос: печатает ли посетитель
  useEffect(() => {
    if (!chatSelectedId) {
      setVisitorTyping(false);
      return;
    }
    const check = () => {
      fetch(`/api/chat/typing?conversationId=${encodeURIComponent(chatSelectedId)}`, { credentials: 'same-origin' })
        .then((r) => r.json())
        .then((d) => setVisitorTyping(d.typing === 'visitor'))
        .catch(() => setVisitorTyping(false));
    };
    check();
    const typingInterval = setInterval(check, 2000);
    return () => clearInterval(typingInterval);
  }, [chatSelectedId]);

  // Отправка «админ печатает» при вводе ответа
  const adminTypingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!chatSelectedId || !chatReply.trim()) return;
    if (adminTypingRef.current) clearTimeout(adminTypingRef.current);
    adminTypingRef.current = setTimeout(() => {
      fetch('/api/chat/typing', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: chatSelectedId, who: 'admin' }),
      }).catch(() => {});
      adminTypingRef.current = null;
    }, 400);
    return () => {
      if (adminTypingRef.current) clearTimeout(adminTypingRef.current);
    };
  }, [chatSelectedId, chatReply]);

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

  const fileToBase64 = (file: File): Promise<{ name: string; mimeType: string; data: string } | null> =>
    new Promise((resolve) => {
      const MAX_FILE_SIZE = 2 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.includes(',') ? result.split(',')[1] : result;
        resolve({ name: file.name, mimeType: file.type || 'application/octet-stream', data: base64 });
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });

  const insertReplyAtCursor = (text: string) => {
    const el = replyTextareaRef.current;
    if (!el) {
      setChatReply((prev) => prev + text);
      return;
    }
    const start = el.selectionStart ?? chatReply.length;
    const end = el.selectionEnd ?? chatReply.length;
    const value = chatReply;
    const next = value.slice(0, start) + text + value.slice(end);
    setChatReply(next);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const handleReplyEmojiSelect = (emoji: string) => {
    insertReplyAtCursor(emoji);
    setShowReplyEmoji(false);
  };

  const handleReplyGifSelect = (url: string) => {
    insertReplyAtCursor(url + ' ');
    setShowReplyGif(false);
    setReplyGifSearch('');
  };

  const handleReplyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const valid = files.filter((f) => f.size <= MAX_FILE_SIZE);
    setChatReplyFiles((prev) => [...prev, ...valid].slice(0, 3));
    e.target.value = '';
  };

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

        {/* Профиль поддержки */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Профиль поддержки</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Имя и фото отображаются в виджете чата у посетителей. Пока вы на этой странице, статус «В сети» обновляется каждые 2 минуты.
          </p>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px] space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Имя</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Например: Поддержка APSOD"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>
            <div className="flex-1 min-w-[200px] space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Фото профиля</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const MAX_BYTES = 512 * 1024; // ~0.5MB, достаточно для аватара как в WhatsApp
                  if (file.size > MAX_BYTES) {
                    showResult({ error: 'Максимальный размер фото 512 КБ' }, true);
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === 'string') {
                      setProfilePhotoUrl(reader.result);
                    }
                  };
                  reader.readAsDataURL(file);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Загрузите квадратное фото, аватар будет отображаться кругом примерно как в WhatsApp.
              </p>
            </div>
            <button
              type="button"
              disabled={profileSaving}
              onClick={async () => {
                setProfileSaving(true);
                setProfileSaved(false);
                try {
                  const res = await fetch('/api/chat/profile', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: profileName.trim(), photoUrl: profilePhotoUrl.trim() }),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    setProfileSaved(true);
                    setTimeout(() => setProfileSaved(false), 3000);
                  } else {
                    showResult({ error: data.error || 'Не удалось сохранить' }, true);
                  }
                } catch (e) {
                  showResult({ error: (e as Error).message }, true);
                } finally {
                  setProfileSaving(false);
                }
              }}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 disabled:opacity-50"
            >
              {profileSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
            {profileSaved && <span className="text-sm text-green-600 dark:text-green-400">Сохранено</span>}
          </div>
          {profilePhotoUrl && (
            <div className="mt-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Превью: </span>
              {/* eslint-disable-next-line @next/next/no-img-element -- превью загрузки (data URL), нужен onError */}
              <img src={profilePhotoUrl} alt="Фото" className="inline-block w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          )}
        </section>

        {/* Чат */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Чат с посетителями</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Диалоги с сайта (виджет в правом нижнем углу). Обновление каждые 3 сек.
          </p>
          <div className="flex gap-4 flex-wrap">
            <div className="w-full md:w-72 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 font-medium text-sm">Диалоги</div>
              <div className="max-h-64 overflow-y-auto">
                {chatConvs.length === 0 && <p className="p-3 text-sm text-gray-500">Нет диалогов</p>}
                {chatConvs.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setChatSelectedId(c.id)}
                    className={`w-full text-left p-3 border-b border-gray-200 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${chatSelectedId === c.id ? 'bg-sky-50 dark:bg-sky-900/30' : ''}`}
                  >
                    {c.lastMessagePreview && (
                      <p className="truncate text-xs text-gray-700 dark:text-gray-200 font-medium">{c.lastMessagePreview}</p>
                    )}
                    <span className="text-gray-400 dark:text-gray-500 font-mono text-[10px] block mt-0.5 opacity-80">{c.id}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={loadChatConvs}
                className="w-full p-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Обновить список
              </button>
            </div>
            <div className="flex-1 min-w-0 border border-gray-200 dark:border-gray-600 rounded-lg flex flex-col overflow-hidden">
              {chatSelectedId ? (
                <>
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      Чат
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 font-mono text-xs truncate shrink-0" title={chatSelectedId}>{chatSelectedId}</span>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!chatSelectedId) return;
                        if (!confirm('Удалить этот чат полностью?')) return;
                        try {
                          const res = await fetch('/api/chat/delete', {
                            method: 'POST',
                            credentials: 'same-origin',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ conversationId: chatSelectedId }),
                          });
                          const data = await res.json();
                          if (res.ok && data.ok) {
                            setChatSelectedId(null);
                            setChatMessages([]);
                            await loadChatConvs();
                          } else {
                            showResult({ error: data.error || 'Не удалось удалить чат' }, true);
                          }
                        } catch (e) {
                          showResult({ error: (e as Error).message }, true);
                        }
                      }}
                      className="ml-auto px-2 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700"
                    >
                      Удалить
                    </button>
                  </div>
                  <div className="flex-1 min-h-[200px] max-h-64 overflow-y-auto p-3 space-y-2">
                    {chatMessages.map((m, idx) => (
                      <div key={`${m.id}-${idx}`} className={`flex ${m.author === 'admin' ? 'justify-end' : 'justify-start'} group`}>
                        <div className={`relative max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.author === 'admin' ? 'bg-sky-600 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>
                          <p className="whitespace-pre-wrap wrap-break-word">{m.text}</p>
                          {m.attachments && m.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {m.attachments.map((att, i) => (
                                <div key={i}>
                                  {att.mimeType.startsWith('image/') ? (
                                    // eslint-disable-next-line @next/next/no-img-element -- вложение в чате (base64)
                                    <img src={`data:${att.mimeType};base64,${att.data}`} alt={att.name} className="max-w-full rounded max-h-32 object-contain" />
                                  ) : (
                                    <a href={`data:${att.mimeType};base64,${att.data}`} download={att.name} className="text-xs underline break-all">📎 {att.name}</a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-xs opacity-80 mt-1 flex items-center gap-1.5 flex-wrap">
                            {new Date(m.createdAt).toLocaleString('ru-RU')}
                            {m.author === 'admin' && (
                              <span className="inline-flex items-center" title={m.status === 'read' ? 'Прочитано' : 'Отправлено'}>
                                {m.status === 'read' ? (
                                  <span className="text-sky-200">
                                    <svg className="w-3.5 h-3 inline" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 6l4 4 10-10"/></svg>
                                    <svg className="w-3.5 h-3 inline -ml-2.5" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 6l4 4 10-10"/></svg>
                                  </span>
                                ) : (
                                  <span className="opacity-80">
                                    <svg className="w-3.5 h-3 inline" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 6l4 4 10-10"/></svg>
                                  </span>
                                )}
                              </span>
                            )}
                            {m.author !== 'admin' && (
                              <span className="inline-flex items-center" title={m.status === 'read' ? 'Прочитано вами' : 'Новое'}>
                                {m.status === 'read' ? (
                                  <span className="text-gray-500 dark:text-gray-400">
                                    <svg className="w-3.5 h-3 inline" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 6l4 4 10-10"/></svg>
                                    <svg className="w-3.5 h-3 inline -ml-2.5" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 6l4 4 10-10"/></svg>
                                  </span>
                                ) : null}
                              </span>
                            )}
                          </p>
                          <div className="absolute top-1 right-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteMenuMessageId((prev) => (prev === m.id ? null : m.id));
                              }}
                              className={`p-1 rounded opacity-70 hover:opacity-100 focus:opacity-100 transition-colors ${m.author === 'admin' ? 'text-sky-200 hover:text-white hover:bg-red-500/40' : 'text-gray-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30'}`}
                              title="Удалить сообщение"
                              aria-label="Удалить сообщение"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                            {deleteMenuMessageId === m.id && (
                              <div className="absolute right-0 top-full mt-0.5 z-10 min-w-[140px] rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg py-1" onClick={(e) => e.stopPropagation()}>
                                <button
                                  type="button"
                                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={async () => {
                                    if (!chatSelectedId) return;
                                    try {
                                      const res = await fetch('/api/chat/message/delete', {
                                        method: 'POST',
                                        credentials: 'same-origin',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ conversationId: chatSelectedId, messageId: m.id, scope: 'for_me', as: 'admin' }),
                                      });
                                      if (res.ok) {
                                        setChatMessages((prev) => prev.filter((msg) => msg.id !== m.id));
                                        setDeleteMenuMessageId(null);
                                      }
                                    } catch {
                                      // ignore
                                    }
                                  }}
                                >
                                  Удалить у себя
                                </button>
                                <button
                                  type="button"
                                  className="w-full text-left px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={async () => {
                                    setDeleteMenuMessageId(null);
                                    if (!chatSelectedId || !confirm('Удалить сообщение для всех безвозвратно?')) return;
                                    try {
                                      const res = await fetch('/api/chat/message/delete', {
                                        method: 'POST',
                                        credentials: 'same-origin',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ conversationId: chatSelectedId, messageId: m.id, scope: 'for_everyone' }),
                                      });
                                      const data = await res.json();
                                      if (res.ok && data.deleted) {
                                        setChatMessages((prev) => prev.filter((msg) => msg.id !== m.id));
                                        loadChatConvs();
                                      }
                                    } catch {
                                      // ignore
                                    }
                                  }}
                                >
                                  Удалить для всех
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {visitorTyping && (
                      <div className="flex justify-start">
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic py-1 px-2">Посетитель печатает...</p>
                      </div>
                    )}
                  </div>
                  <form
                    className="p-2 border-t border-gray-200 dark:border-gray-600"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const text = chatReply.trim();
                      if (!text || chatLoading || !chatSelectedId) return;
                      setChatLoading(true);
                      try {
                        let attachments: { name: string; mimeType: string; data: string }[] | undefined;
                        if (chatReplyFiles.length) {
                          const list: { name: string; mimeType: string; data: string }[] = [];
                          for (let i = 0; i < Math.min(chatReplyFiles.length, 3); i++) {
                            const base = await fileToBase64(chatReplyFiles[i]);
                            if (base) list.push(base);
                          }
                          attachments = list.length ? list : undefined;
                        }
                        const res = await fetch('/api/chat/reply', {
                          method: 'POST',
                          credentials: 'same-origin',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ conversationId: chatSelectedId, text, attachments }),
                        });
                        const data = await res.json();
                        if (res.ok && data.message) {
                          setChatMessages((prev) => [...prev, data.message]);
                          setChatReply('');
                          setChatReplyFiles([]);
                          if (replyFileInputRef.current) replyFileInputRef.current.value = '';
                          loadChatConvs();
                        }
                      } finally {
                        setChatLoading(false);
                      }
                    }}
                  >
                    <div className="rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500">
                      <div className="px-3 pt-2">
                        <textarea
                          ref={replyTextareaRef}
                          value={chatReply}
                          onChange={(e) => setChatReply(e.target.value)}
                          placeholder="Ответ..."
                          rows={2}
                          className="w-full min-w-0 bg-transparent border-0 resize-none py-0 text-sm focus:ring-0 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                      {chatReplyFiles.length > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate px-3 pb-0.5">
                          📎 {chatReplyFiles.map((f) => f.name).join(', ')}
                        </p>
                      )}
                      <div className="flex items-center gap-0.5 px-2 pb-2 pt-1.5 border-t border-gray-200 dark:border-gray-600">
                        <input
                          ref={replyFileInputRef}
                          type="file"
                          multiple
                          onChange={handleReplyFileChange}
                          className="hidden"
                          id="admin-chat-file"
                        />
                        <label
                          htmlFor="admin-chat-file"
                          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          title="Прикрепить файл"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        </label>
                        <button
                          type="button"
                          onClick={() => { setShowReplyEmoji((v) => !v); setShowReplyGif(false); }}
                          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          title="Смайлики"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShowReplyGif((v) => !v); setShowReplyEmoji(false); setReplyGifSearch(''); }}
                          className="px-2.5 py-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs font-medium border border-gray-400/60"
                          title="GIF"
                        >
                          GIF
                        </button>
                        <div className="flex-1 min-w-2" aria-hidden />
                        <button type="submit" disabled={chatLoading || !chatReply.trim()} className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 transition-colors" title="Отправить">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                      </div>
                    </div>
                    {showReplyEmoji && (
                      <div className="mt-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 max-h-52 flex flex-col gap-2">
                        <input
                          type="text"
                          value={replyEmojiSearch}
                          onChange={(e) => setReplyEmojiSearch(e.target.value)}
                          placeholder="Поиск эмодзи..."
                          className="w-full px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-xs"
                        />
                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            onClick={() => setReplyEmojiCategory('')}
                            className={`px-2 py-1 rounded-md text-[11px] font-medium ${!replyEmojiCategory ? 'bg-sky-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                          >
                            Все
                          </button>
                          {EMOJI_CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setReplyEmojiCategory(cat)}
                              className={`px-2 py-1 rounded-md text-[11px] font-medium ${replyEmojiCategory === cat ? 'bg-sky-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                        <div className="overflow-y-auto min-h-0 flex-1">
                          <div className="grid grid-cols-10 gap-1">
                            {filteredReplyEmojis.map((item, i) => (
                              <button
                                key={`${item.emoji}-${i}`}
                                type="button"
                                onClick={() => handleReplyEmojiSelect(item.emoji)}
                                className="p-1 text-lg rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                                title={item.keywords.slice(0, 3).join(', ')}
                              >
                                {item.emoji}
                              </button>
                            ))}
                          </div>
                          {filteredReplyEmojis.length === 0 && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-1.5">Ничего не найдено</p>
                          )}
                        </div>
                      </div>
                    )}
                    {showReplyGif && (
                      <div className="mt-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 max-h-56 flex flex-col gap-2">
                        <input
                          type="text"
                          value={replyGifSearch}
                          onChange={(e) => setReplyGifSearch(e.target.value)}
                          placeholder="Поиск GIF..."
                          className="w-full px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-xs"
                        />
                        <div className="overflow-y-auto min-h-0 flex-1">
                          <div className="grid grid-cols-3 gap-2">
                            {filteredReplyGifs.map((gif) => (
                              <button
                                key={gif.id}
                                type="button"
                                onClick={() => handleReplyGifSelect(gif.url)}
                                className="relative aspect-video rounded-md overflow-hidden bg-gray-700 hover:ring-2 hover:ring-sky-600"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element -- GIF превью с CDN */}
                                <img
                                  src={gif.url}
                                  alt={gif.title ?? gif.tags[0]}
                                  className="w-full h-full object-cover"
                                />
                                {gif.title && (
                                  <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] py-0.5 px-1 truncate">
                                    {gif.title}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                          {filteredReplyGifs.length === 0 && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-1.5">Ничего не найдено</p>
                          )}
                        </div>
                      </div>
                    )}
                  </form>
                </>
              ) : (
                <div className="flex-1 min-h-[200px] flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                  Выберите диалог
                </div>
              )}
            </div>
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
