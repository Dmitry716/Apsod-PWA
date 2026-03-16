'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { EMOJI_LIBRARY, EMOJI_CATEGORIES } from '@/app/data/emoji-library';
import { GIF_LIBRARY } from '@/app/data/gif-library';

const STORAGE_KEY = 'apsod_chat_conv';
const POLL_INTERVAL = 2500;
const STATUS_POLL_INTERVAL = 30000;
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPT_TYPES = 'image/*,.pdf,.doc,.docx,.xls,.xlsx';

function formatLastSeen(online: boolean, lastSeen: number | null): string {
  if (online) return 'В сети';
  if (lastSeen === null) return 'Не в сети';
  const diff = Date.now() - lastSeen;
  const min = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (min < 1) return 'Только что был(а)';
  if (min < 60) return `Был(а) в сети ${min} мин назад`;
  if (h < 24) return `Был(а) в сети ${h} ч назад`;
  return `Был(а) в сети ${d} дн назад`;
}

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
  return GIF_LIBRARY.filter((item) =>
    item.tags.some((t) => t.toLowerCase().includes(q)) || (item.title?.toLowerCase().includes(q))
  );
}

type Message = {
  id: string;
  author: 'visitor' | 'admin';
  text: string;
  createdAt: string;
  visitorName?: string;
  attachments?: { name: string; mimeType: string; data: string }[];
};

function getStoredConvId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

function setStoredConvId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, id);
}

function fileToBase64(file: File): Promise<{ name: string; mimeType: string; data: string } | null> {
  return new Promise((resolve) => {
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
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [emojiSearch, setEmojiSearch] = useState('');
  const [emojiCategory, setEmojiCategory] = useState('');
  const [gifSearch, setGifSearch] = useState('');
  const [supportName, setSupportName] = useState('Поддержка APSOD');
  const [supportPhotoUrl, setSupportPhotoUrl] = useState('');
  const [statusOnline, setStatusOnline] = useState(false);
  const [statusLastSeen, setStatusLastSeen] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  // Размеры видимой области (выше клавиатуры на iPhone) — контейнер не смещается при вводе
  const [viewportRect, setViewportRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const adjustTextareaHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    const isNarrow = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxPx = isNarrow ? 72 : 160; // на мобильных не больше ~3 строк — макет не смещается
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxPx)}px`;
  };

  useEffect(() => {
    const id = getStoredConvId();
    if (id) {
      setConversationId(id);
      loadMessages(id);
    }
  }, []);

  useEffect(() => {
    // Предзагрузка звука для уведомления о новом сообщении
    if (typeof window === 'undefined') return;
    try {
      const audio = new Audio('/sounds/chat-message.mp3');
      soundRef.current = audio;
    } catch {
      soundRef.current = null;
    }
  }, []);

  const playIncomingSoundAndNotification = (msg: Message) => {
    // Звук
    try {
      soundRef.current?.play().catch(() => {});
    } catch {
      // ignore
    }
    // Браузерное уведомление (если пользователь разрешил)
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          const body = msg.text.slice(0, 80) + (msg.text.length > 80 ? '…' : '');
          new Notification('Новое сообщение от поддержки APSOD', {
            body,
            icon: supportPhotoUrl || '/icons/icon-192x192.png',
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const loadMessages = async (convId: string, options?: { fromPoll?: boolean }) => {
    try {
      const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/api/chat/messages?conversationId=${encodeURIComponent(convId)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.messages) {
        setMessages((prev) => {
          if (options?.fromPoll && prev.length > 0) {
            const prevLast = prev[prev.length - 1];
            const curr = data.messages as Message[];
            const currLast = curr[curr.length - 1];
            if (
              currLast &&
              currLast.author === 'admin' &&
              (!prevLast || prevLast.id !== currLast.id)
            ) {
              playIncomingSoundAndNotification(currLast);
            }
          }
          return data.messages;
        });
      }
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    if (!open || !conversationId) return;
    const t = setInterval(() => loadMessages(conversationId, { fromPoll: true }), POLL_INTERVAL);
    return () => clearInterval(t);
  }, [open, conversationId]);

  useEffect(() => {
    if (!open) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    fetch(`${origin}/api/chat/profile`)
      .then((r) => r.json())
      .then((p) => {
        setSupportName(p.name || 'Поддержка APSOD');
        setSupportPhotoUrl(p.photoUrl || '');
      })
      .catch(() => {});
    const fetchStatus = () => {
      fetch(`${origin}/api/chat/status`)
        .then((r) => r.json())
        .then((s) => {
          setStatusOnline(s.online ?? false);
          setStatusLastSeen(s.lastSeen ?? null);
        })
        .catch(() => {});
    };
    fetchStatus();
    const st = setInterval(fetchStatus, STATUS_POLL_INTERVAL);
    return () => clearInterval(st);
  }, [open]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  // Блокируем прокрутку страницы при открытом чате (в т.ч. горизонтальную) — макет не смещается
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevOverflowX = document.body.style.overflowX;
    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overflowX = prevOverflowX;
    };
  }, [open]);

  // На мобильных (узкий экран) подстраиваем чат под видимую область (Visual Viewport), чтобы при появлении клавиатуры контейнер не смещался
  useEffect(() => {
    if (!open || typeof window === 'undefined') return;
    const vv = window.visualViewport;
    const isNarrow = window.innerWidth < 640;
    if (!vv || !isNarrow) {
      setViewportRect(null);
      return;
    }

    const update = () => {
      setViewportRect({
        top: vv.offsetTop,
        left: vv.offsetLeft,
        width: vv.width,
        height: vv.height,
      });
    };

    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
      setViewportRect(null);
    };
  }, [open]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const sendMessage = async () => {
    const trimmedText = input.trim();
    if (!trimmedText || loading) return;
    setLoading(true);
    setError('');
    try {
      const url = `${window.location.origin}/api/chat/send`;
      const body: { name: string; text: string; conversationId?: string; attachments?: { name: string; mimeType: string; data: string }[] } = {
        name: '',
        text: trimmedText,
      };
      if (conversationId) body.conversationId = conversationId;
      if (files.length > 0) {
        const attachments: { name: string; mimeType: string; data: string }[] = [];
        for (let i = 0; i < Math.min(files.length, 3); i++) {
          const att = await fileToBase64(files[i]);
          if (att) attachments.push(att);
        }
        if (attachments.length) body.attachments = attachments;
        setFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Ошибка отправки');
        setLoading(false);
        return;
      }
      if (data.conversationId) {
        setConversationId(data.conversationId);
        setStoredConvId(data.conversationId);
      }
      if (data.message) setMessages((prev) => [...prev, data.message]);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    if (conversationId) loadMessages(conversationId);
  };

  const insertAtCursor = (text: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? input.length;
    const end = el.selectionEnd ?? input.length;
    const newValue = input.slice(0, start) + text + input.slice(end);
    setInput(newValue);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + text.length, start + text.length);
      adjustTextareaHeight();
    }, 0);
  };

  const handleEmojiSelect = (emoji: string) => {
    insertAtCursor(emoji);
    setShowEmojiPicker(false);
  };

  const filteredEmojis = useMemo(() => filterEmojis(emojiSearch, emojiCategory), [emojiSearch, emojiCategory]);
  const filteredGifs = useMemo(() => filterGifs(gifSearch), [gifSearch]);

  const handleGifSelect = (url: string) => {
    insertAtCursor(url + ' ');
    setShowGifPicker(false);
    setGifSearch('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = Array.from(e.target.files || []);
    if (chosen.length === 0) return;
    const valid: File[] = [];
    for (const f of chosen) {
      if (f.size > MAX_FILE_SIZE) {
        setError(`Файл «${f.name}» больше ${MAX_FILE_SIZE / 1024 / 1024} МБ`);
        return;
      }
      valid.push(f);
    }
    setFiles((prev) => [...prev, ...valid].slice(0, 3));
    setError('');
    e.target.value = '';
  };

  return (
    <>
      {/* Кнопка открытия чата: отступ от safe-area на мобильных */}
      <button
        type="button"
        onClick={handleOpen}
        className="fixed z-50 w-14 h-14 rounded-full bg-[#1e3a5f] text-white shadow-lg hover:bg-[#2a4a7a] flex items-center justify-center transition-colors touch-none"
        style={{
          right: 'max(1rem, env(safe-area-inset-right, 1rem))',
          bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
        }}
        aria-label="Открыть чат"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed z-50 flex flex-col bg-[#1a1d21] border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden overscroll-contain touch-manipulation w-full max-w-[100vw]"
          style={
            viewportRect
              ? {
                  top: viewportRect.top,
                  left: viewportRect.left,
                  width: viewportRect.width,
                  height: viewportRect.height,
                  maxWidth: 'none',
                  paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))',
                  boxSizing: 'border-box',
                }
              : {
                  top: 'max(0.5rem, env(safe-area-inset-top, 0.5rem))',
                  left: 'max(0.5rem, env(safe-area-inset-left, 0.5rem))',
                  right: 'max(0.5rem, env(safe-area-inset-right, 0.5rem))',
                  bottom: 'max(0.5rem, env(safe-area-inset-bottom, 0.5rem))',
                  width: 'calc(100vw - max(1rem, env(safe-area-inset-left)) - max(1rem, env(safe-area-inset-right)))',
                  maxWidth: '420px',
                  height: 'calc(100dvh - max(1rem, env(safe-area-inset-top)) - max(1rem, env(safe-area-inset-bottom)))',
                  maxHeight: 'min(1000px, calc(100dvh - 1rem))',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))',
                }
          }
        >
          {/* Header: аватар (фото или буква), имя, статус, закрыть — не сжимается, имя не обрезается */}
          <div className="flex items-center gap-3 px-4 py-3 pb-3 bg-[#1a1d21] border-b border-gray-700/50 flex-shrink-0 min-h-[3.5rem]">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {supportPhotoUrl ? (
                <img src={supportPhotoUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-300 font-semibold text-sm">
                  {supportName.trim() ? supportName.trim().charAt(0).toUpperCase() : 'П'}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{supportName || 'Поддержка APSOD'}</p>
              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className={`w-2 h-2 rounded-full ${statusOnline ? 'bg-green-500' : 'bg-gray-500'}`} aria-hidden />
                {formatLastSeen(statusOnline, statusLastSeen)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
              aria-label="Закрыть"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Область сообщений — тёмный фон, растёт по высоте чата */}
          <div ref={listRef} className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden p-4 space-y-3 bg-[#1a1d21]">
            {messages.length === 0 && !error && (
              <p className="text-sm text-gray-400 text-center py-2">
                Добро пожаловать на APSOD! Чем мы можем помочь?
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.author === 'admin' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.author === 'admin'
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-[#1e3a5f] text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{m.text}</p>
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {m.attachments.map((att, i) => (
                        <div key={i}>
                          {att.mimeType.startsWith('image/') ? (
                            <img
                              src={`data:${att.mimeType};base64,${att.data}`}
                              alt={att.name}
                              className="max-w-full rounded-lg max-h-32 object-contain"
                            />
                          ) : (
                            <a
                              href={`data:${att.mimeType};base64,${att.data}`}
                              download={att.name}
                              className="text-xs underline break-all text-white/80 hover:text-white"
                            >
                              📎 {att.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className={`text-xs mt-1.5 ${m.author === 'admin' ? 'text-gray-400' : 'text-white/70'}`}>
                    {m.author === 'admin' ? `${supportName || 'Поддержка'} • ` : ''}
                    {new Date(m.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {error && <p className="text-sm text-red-400 text-center py-1">{error}</p>}
          </div>

          {/* Футер: без горизонтальной прокрутки, текст переносится — макет не смещается */}
          <div className="px-4 py-3 pt-2 border-t border-gray-700/50 bg-[#1a1d21] flex-shrink-0 space-y-2 max-h-[11rem] min-h-0 overflow-hidden overflow-x-hidden min-w-0">
            <div className="flex items-end gap-2 rounded-2xl bg-gray-800 border border-gray-600 pl-3 pr-2 py-2 focus-within:ring-2 focus-within:ring-[#1e3a5f] focus-within:border-transparent w-full min-w-0 min-h-[2.75rem] overflow-hidden">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  adjustTextareaHeight();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Сообщение..."
                rows={1}
                className="flex-1 min-w-0 w-0 py-2 bg-transparent text-sm focus:outline-none resize-none leading-6 placeholder:text-gray-400 overflow-y-auto overflow-x-hidden break-words max-h-[4.5rem] sm:max-h-[160px]"
                style={{
                  minHeight: '2.25rem',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center hover:bg-[#2a4a7a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                aria-label="Отправить"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            {/* Блок иконок под полем: прикрепить файл, эмодзи, GIF */}
            <div className="flex items-center gap-1 rounded-2xl bg-gray-800 border border-gray-600 px-2 py-2">
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPT_TYPES}
                onChange={handleFileChange}
                className="hidden"
                id="chat-file"
                multiple
              />
              <label
                htmlFor="chat-file"
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 cursor-pointer transition-colors"
                title="Прикрепить файл (до 2 МБ, макс. 3)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </label>
              <button
                type="button"
                onClick={() => { setShowEmojiPicker((v) => !v); setShowGifPicker(false); setEmojiSearch(''); setEmojiCategory(''); }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                title="Эмодзи"
                aria-label="Эмодзи"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => { setShowGifPicker((v) => !v); setShowEmojiPicker(false); setGifSearch(''); }}
                className="px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors text-xs font-medium border border-gray-500"
                title="GIF"
                aria-label="GIF"
              >
                GIF
              </button>
            </div>

            {showEmojiPicker && (
              <div className="rounded-xl bg-gray-800 border border-gray-600 p-2 max-h-64 flex flex-col">
                <input
                  type="text"
                  value={emojiSearch}
                  onChange={(e) => setEmojiSearch(e.target.value)}
                  placeholder="Поиск эмодзи..."
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] mb-2"
                />
                <div className="flex flex-wrap gap-1 mb-2">
                  <button
                    type="button"
                    onClick={() => setEmojiCategory('')}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${!emojiCategory ? 'bg-[#1e3a5f] text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    Все
                  </button>
                  {EMOJI_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setEmojiCategory(cat)}
                      className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${emojiCategory === cat ? 'bg-[#1e3a5f] text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="overflow-y-auto min-h-0 flex-1">
                  <div className="grid grid-cols-8 gap-1">
                    {filteredEmojis.map((item, i) => (
                      <button
                        key={`${item.emoji}-${i}`}
                        type="button"
                        onClick={() => handleEmojiSelect(item.emoji)}
                        className="p-1.5 text-lg hover:bg-gray-700 rounded-lg transition-colors"
                        title={item.keywords.slice(0, 3).join(', ')}
                      >
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                  {filteredEmojis.length === 0 && (
                    <p className="text-sm text-gray-500 py-2 text-center">Ничего не найдено</p>
                  )}
                </div>
              </div>
            )}

            {showGifPicker && (
              <div className="rounded-xl bg-gray-800 border border-gray-600 p-2 max-h-72 flex flex-col">
                <input
                  type="text"
                  value={gifSearch}
                  onChange={(e) => setGifSearch(e.target.value)}
                  placeholder="Поиск GIF..."
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] mb-2"
                />
                <div className="overflow-y-auto min-h-0 flex-1">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {filteredGifs.map((gif) => (
                      <button
                        key={gif.id}
                        type="button"
                        onClick={() => handleGifSelect(gif.url)}
                        className="relative aspect-video rounded-lg overflow-hidden bg-gray-700 hover:ring-2 hover:ring-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                      >
                        <img
                          src={gif.url}
                          alt={gif.title ?? gif.tags[0]}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {gif.title && (
                          <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-0.5 px-1 truncate">
                            {gif.title}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  {filteredGifs.length === 0 && (
                    <p className="text-sm text-gray-500 py-4 text-center">Ничего не найдено</p>
                  )}
                </div>
              </div>
            )}

            {files.length > 0 && (
              <p className="text-xs text-gray-500 truncate">
                {files.map((f) => f.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
