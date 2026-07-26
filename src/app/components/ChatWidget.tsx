'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { EMOJI_LIBRARY, EMOJI_CATEGORIES } from '@/app/data/emoji-library';
import { GIF_LIBRARY } from '@/app/data/gif-library';
import { t } from '@/app/lib/i18n';
import { useLocale } from '@/app/lib/useLocale';

const STORAGE_KEY = 'apsod_chat_conv';
const POLL_INTERVAL = 2500;
const STATUS_POLL_INTERVAL = 30000;
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPT_TYPES = 'image/*,.pdf,.doc,.docx,.xls,.xlsx';

function formatLastSeen(
  online: boolean,
  lastSeen: number | null,
  locale: 'ru' | 'en'
): string {
  if (online) return t(locale, 'chat.status.online');
  if (lastSeen === null) return t(locale, 'chat.status.offline');
  const diff = Date.now() - lastSeen;
  const min = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (min < 1) return t(locale, 'chat.status.justNow');
  if (min < 60) return t(locale, 'chat.status.minutesAgo').replace('{count}', String(min));
  if (h < 24) return t(locale, 'chat.status.hoursAgo').replace('{count}', String(h));
  return t(locale, 'chat.status.daysAgo').replace('{count}', String(d));
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
  status?: 'sent' | 'delivered' | 'read';
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
  const { locale } = useLocale();
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
  const [supportName, setSupportName] = useState(t(locale, 'chat.supportFallback'));
  const [supportPhotoUrl, setSupportPhotoUrl] = useState('');
  const [statusOnline, setStatusOnline] = useState(false);
  const [statusLastSeen, setStatusLastSeen] = useState<number | null>(null);
  const [adminTyping, setAdminTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const [isNarrow, setIsNarrow] = useState(false);
  const [showMessengers, setShowMessengers] = useState(false);

  const adjustTextareaHeight = () => {
    // Высота поля фиксирована — футер (скрепка, смайл, GIF, отправить) не смещается
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const threshold = 120;
    const onScroll = () => {
      setShowMessengers(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Предзагрузка звука для уведомления о новом сообщении
    if (typeof window === 'undefined') return;
    try {
      const audio = new Audio('/sounds/chat-message.wav');
      soundRef.current = audio;
    } catch {
      soundRef.current = null;
    }
  }, []);

  const playIncomingSoundAndNotification = useCallback((msg: Message) => {
    try {
      soundRef.current?.play().catch(() => {});
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          const body = msg.text.slice(0, 80) + (msg.text.length > 80 ? '…' : '');
          new Notification(t(locale, 'chat.notificationTitle'), {
            body,
            icon: supportPhotoUrl || '/icons/icon-192x192.png',
          });
        } catch {
          // ignore
        }
      }
    }
  }, [locale, supportPhotoUrl]);

  const loadMessages = useCallback(async (convId: string, options?: { fromPoll?: boolean }) => {
    try {
      const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/api/chat/messages?conversationId=${encodeURIComponent(convId)}&viewer=visitor`;
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
  }, [playIncomingSoundAndNotification]);

  useEffect(() => {
    const id = getStoredConvId();
    if (id) {
      setConversationId(id);
      loadMessages(id);
    }
  }, [loadMessages]);

  useEffect(() => {
    if (!open || !conversationId) return;
    const t = setInterval(() => loadMessages(conversationId, { fromPoll: true }), POLL_INTERVAL);
    return () => clearInterval(t);
  }, [open, conversationId, loadMessages]);

  // Опрос: печатает ли поддержка
  useEffect(() => {
    if (!open || !conversationId) {
      setAdminTyping(false);
      return;
    }
    const check = () => {
      fetch(`${typeof window !== 'undefined' ? window.location.origin : ''}/api/chat/typing?conversationId=${encodeURIComponent(conversationId)}`)
        .then((r) => r.json())
        .then((d) => setAdminTyping(d.typing === 'admin'))
        .catch(() => setAdminTyping(false));
    };
    check();
    const t = setInterval(check, 2000);
    return () => clearInterval(t);
  }, [open, conversationId]);

  // Отправка «посетитель печатает» при вводе (с задержкой)
  const typingSendRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!conversationId || !open) return;
    if (typingSendRef.current) clearTimeout(typingSendRef.current);
    if (!input.trim()) return;
    typingSendRef.current = setTimeout(() => {
      fetch(`${typeof window !== 'undefined' ? window.location.origin : ''}/api/chat/typing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, who: 'visitor' }),
      }).catch(() => {});
      typingSendRef.current = null;
    }, 400);
    return () => {
      if (typingSendRef.current) clearTimeout(typingSendRef.current);
    };
  }, [conversationId, open, input]);

  useEffect(() => {
    if (!open) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    fetch(`${origin}/api/chat/profile`)
      .then((r) => r.json())
      .then((p) => {
        setSupportName(p.name || t(locale, 'chat.supportFallback'));
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
  }, [locale, open]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  // Полная блокировка сдвига на iOS: фиксируем html и body на 100svh, класс для CSS
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY ?? window.pageYOffset;
    const html = document.documentElement;
    const body = document.body;

    html.classList.add('apsod-chat-open');
    const prevHtml = {
      overflow: html.style.overflow,
      overflowX: html.style.overflowX,
      width: html.style.width,
      height: html.style.height,
      maxHeight: html.style.maxHeight,
      position: html.style.position,
      top: html.style.top,
      left: html.style.left,
      right: html.style.right,
      bottom: html.style.bottom,
    };
    const prevBody = {
      overflow: body.style.overflow,
      overflowX: body.style.overflowX,
      width: body.style.width,
      maxWidth: body.style.maxWidth,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      height: body.style.height,
      maxHeight: body.style.maxHeight,
    };

    html.style.overflow = 'hidden';
    html.style.overflowX = 'hidden';
    html.style.width = '100%';
    html.style.height = '100svh';
    html.style.maxHeight = '100svh';
    html.style.position = 'fixed';
    html.style.top = '0';
    html.style.left = '0';
    html.style.right = '0';
    html.style.bottom = '0';

    body.style.overflow = 'hidden';
    body.style.overflowX = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.width = '100%';
    body.style.maxWidth = '100vw';
    body.style.height = '100svh';
    body.style.maxHeight = '100svh';

    return () => {
      html.classList.remove('apsod-chat-open');
      Object.assign(html.style, prevHtml);
      Object.assign(body.style, prevBody);
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    const check = () => setIsNarrow(typeof window !== 'undefined' && window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
      let data: { error?: string; conversationId?: string; message?: Message } = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) {
        const fallback =
          res.status === 503
            ? t(locale, 'chat.error.unavailable')
            : t(locale, 'chat.error.send');
        setError(data.error || fallback);
        setLoading(false);
        return;
      }
      if (data.conversationId) {
        setConversationId(data.conversationId);
        setStoredConvId(data.conversationId);
      }
      const newMessage = data.message;
      if (newMessage) setMessages((prev) => [...prev, newMessage]);
      setInput('');
      if (textareaRef.current && !isNarrow) {
        textareaRef.current.style.height = 'auto';
      }
    } catch {
      setError(t(locale, 'chat.error.connection'));
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
      {/* Мессенджеры (по скроллу) + кнопка чата */}
      {!open && (
        <div
          className="fixed z-50 flex flex-col items-center gap-2"
          style={{
            right: 'max(0.75rem, env(safe-area-inset-right, 0.75rem))',
            bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
          }}
        >
          <div
            className={`transition-all duration-300 ${
              showMessengers
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-3 pointer-events-none'
            }`}
            aria-hidden={!showMessengers}
          >
            <a
              href="https://t.me/Apsod_IT"
              target="_blank"
              rel="noopener noreferrer"
              className="apsod-messenger-fab group relative w-10 h-10 rounded-full bg-[#229ED9] text-white shadow-md hover:bg-[#1b8ec4] flex items-center justify-center transition-colors touch-none"
              aria-label={t(locale, 'chat.writeTelegram')}
              title={t(locale, 'chat.writeTelegram')}
              tabIndex={showMessengers ? 0 : -1}
            >
              <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md bg-gray-900/90 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 max-md:hidden">
                {t(locale, 'chat.writeTelegram')}
              </span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.458.02.889-.16 1.795-.96 6.14-1.36 8.145-.168.84-.499 1.121-.82 1.149-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
          <div
            className={`transition-all duration-300 ${
              showMessengers
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-3 pointer-events-none'
            }`}
            style={{ transitionDelay: showMessengers ? '60ms' : '0ms' }}
            aria-hidden={!showMessengers}
          >
            <a
              href="https://wa.me/375445777724"
              target="_blank"
              rel="noopener noreferrer"
              className="apsod-messenger-fab group relative w-10 h-10 rounded-full bg-[#25D366] text-white shadow-md hover:bg-[#1ebe57] flex items-center justify-center transition-colors touch-none"
              style={{ animationDelay: '0.6s' }}
              aria-label={t(locale, 'chat.writeWhatsApp')}
              title={t(locale, 'chat.writeWhatsApp')}
              tabIndex={showMessengers ? 0 : -1}
            >
              <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md bg-gray-900/90 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 max-md:hidden">
                {t(locale, 'chat.writeWhatsApp')}
              </span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>
          </div>
          <button
            type="button"
            onClick={handleOpen}
            className="w-12 h-12 rounded-full bg-[#1e3a5f] text-white shadow-lg hover:bg-[#2a4a7a] flex items-center justify-center transition-colors touch-none"
            aria-label={t(locale, 'chat.open')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      )}

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2147483647,
              overflow: 'hidden',
              overflowX: 'hidden',
              width: '100vw',
              maxWidth: '100%',
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              isolation: 'isolate',
            }}
          >
            <div
              className="fixed z-50 flex flex-col bg-[#1a1d21] border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden overflow-x-hidden overscroll-contain touch-manipulation"
              style={
                isNarrow
                  ? {
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: '100%',
                      minWidth: 0,
                      maxWidth: '100vw',
                      height: '100svh',
                      paddingTop: 'env(safe-area-inset-top, 0px)',
                      paddingLeft: 'env(safe-area-inset-left, 0px)',
                      paddingRight: 'env(safe-area-inset-right, 0px)',
                      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                      boxSizing: 'border-box',
                      transform: 'translateZ(0)',
                    }
                  : {
                      top: 'max(0.5rem, env(safe-area-inset-top, 0.5rem))',
                      right: 'max(0.5rem, env(safe-area-inset-right, 0.5rem))',
                      bottom: 'max(0.5rem, env(safe-area-inset-bottom, 0.5rem))',
                      left: 'auto',
                      width: '420px',
                      maxWidth: 'calc(100vw - 1rem)',
                      height: 'calc(100dvh - max(1rem, env(safe-area-inset-top)) - max(1rem, env(safe-area-inset-bottom)))',
                      maxHeight: 'min(1000px, calc(100dvh - 1rem))',
                      paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))',
                    }
              }
            >
          {/* Header: аватар (фото или буква), имя, статус, закрыть — не сжимается, имя не обрезается */}
          <div className="flex items-center gap-3 px-4 py-3 pb-3 bg-[#1a1d21] border-b border-gray-700/50 shrink-0 min-h-14">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center shrink-0 overflow-hidden relative">
              {supportPhotoUrl ? (
                <Image src={supportPhotoUrl} alt="" fill className="object-cover" sizes="40px" unoptimized />
              ) : (
                <span className="text-gray-300 font-semibold text-sm">
                  {supportName.trim() ? supportName.trim().charAt(0).toUpperCase() : 'A'}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{supportName || t(locale, 'chat.supportFallback')}</p>
              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className={`w-2 h-2 rounded-full ${statusOnline ? 'bg-green-500' : 'bg-gray-500'}`} aria-hidden />
                {formatLastSeen(statusOnline, statusLastSeen, locale)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
              aria-label={t(locale, 'chat.close')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Область сообщений; на мобильных отступ снизу — поле ввода можно прокрутить выше клавиатуры */}
          <div
            ref={listRef}
            className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden p-4 space-y-3 bg-[#1a1d21]"
            style={isNarrow ? { paddingBottom: '38vh' } : undefined}
          >
            {messages.length === 0 && !error && (
              <p className="text-sm text-gray-400 text-center py-2">
                {t(locale, 'chat.welcome')}
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.author === 'admin' ? 'justify-start' : 'justify-end'} group`}
              >
                <div
                  className={`relative max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.author === 'admin'
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-[#1e3a5f] text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap wrap-break-word">{m.text}</p>
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {m.attachments.map((att, i) => (
                        <div key={i}>
                          {att.mimeType.startsWith('image/') ? (
                            // eslint-disable-next-line @next/next/no-img-element -- вложения пользователя (base64), размер неизвестен
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
                  <p className={`text-xs mt-1.5 flex items-center gap-1.5 ${m.author === 'admin' ? 'text-gray-400' : 'text-white/70'}`}>
                    {m.author === 'admin' ? `${supportName || t(locale, 'chat.supportFallback')} • ` : ''}
                    {new Date(m.createdAt).toLocaleTimeString(locale === 'en' ? 'en-US' : 'ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    {m.author === 'visitor' && (
                      <span className="ml-0.5 inline-flex items-center" aria-label={m.status === 'read' ? t(locale, 'chat.status.read') : t(locale, 'chat.status.sent')}>
                        {m.status === 'read' ? (
                          <span className="text-[#7dd3fc]" title={t(locale, 'chat.status.read')}>
                            <svg className="w-4 h-3.5 inline" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6l4 4 10-10"/></svg>
                            <svg className="w-4 h-3.5 inline -ml-2.5" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6l4 4 10-10"/></svg>
                          </span>
                        ) : (
                          <span className="text-white/70" title={t(locale, 'chat.status.sent')}>
                            <svg className="w-4 h-3.5 inline" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6l4 4 10-10"/></svg>
                          </span>
                        )}
                      </span>
                    )}
                  </p>
                  {m.author === 'visitor' && conversationId && (
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const res = await fetch(`${typeof window !== 'undefined' ? window.location.origin : ''}/api/chat/message/delete`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ conversationId, messageId: m.id, scope: 'for_me' }),
                          });
                          if (res.ok) {
                            setMessages((prev) => prev.filter((msg) => msg.id !== m.id));
                          }
                        } catch {
                          // ignore
                        }
                      }}
                      className="absolute top-1 right-1 p-1 rounded opacity-60 hover:opacity-100 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                      title={t(locale, 'chat.deleteMine')}
                      aria-label={t(locale, 'chat.deleteMine')}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {adminTyping && (
              <div className="flex justify-start">
                <p className="text-xs text-gray-500 italic py-1 px-2">
                  {supportName || t(locale, 'chat.supportFallback')} {t(locale, 'chat.typing')}
                </p>
              </div>
            )}
            {error && <p className="text-sm text-red-400 text-center py-1">{error}</p>}
          </div>

          {/* Футер как в Cursor: поле ввода с фиксированной высотой + одна строка иконок и кнопка отправки */}
          <div className="py-3 pt-2 border-t border-gray-700/50 bg-[#1a1d21] shrink-0 min-h-0 overflow-hidden overflow-x-hidden min-w-0 w-full max-w-full box-border px-3">
            <div className="rounded-2xl bg-gray-800 border border-gray-600 overflow-hidden focus-within:ring-2 focus-within:ring-[#1e3a5f] focus-within:border-transparent w-full max-w-full box-border min-w-0 flex flex-col">
              {/* Поле ввода: фиксированная высота, скролл внутри — футер не смещается */}
              <div className="shrink-0 px-3 pt-2 min-h-0">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => {
                    requestAnimationFrame(() => {
                      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'auto' });
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={t(locale, 'chat.messagePlaceholder')}
                  rows={1}
                  className="min-w-0 w-full max-w-full py-0 bg-transparent focus:outline-none resize-none leading-6 placeholder:text-gray-400 overflow-y-auto overflow-x-hidden wrap-break-word block"
                  style={{
                    color: '#ffffff',
                    WebkitTextFillColor: '#ffffff',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    fontSize: isNarrow ? 16 : 14,
                    height: isNarrow ? '4.5rem' : '5rem',
                    maxHeight: isNarrow ? '4.5rem' : '5rem',
                    minHeight: '2.25rem',
                  }}
                />
              </div>
              {files.length > 0 && (
                <p className="text-xs text-gray-500 truncate px-3 pt-0.5 shrink-0">
                  📎 {files.map((f) => f.name).join(', ')}
                </p>
              )}
              {/* Жёстко закреплённая строка: скрепка, смайл, GIF, кнопка Отправить — как в Cursor */}
              <div className="flex items-center gap-0.5 px-2 pb-2 pt-2 border-t border-gray-700/50 shrink-0 min-h-11">
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
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 cursor-pointer transition-colors shrink-0"
                  title={t(locale, 'chat.attachFile')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </label>
                <button
                  type="button"
                  onClick={() => { setShowEmojiPicker((v) => !v); setShowGifPicker(false); setEmojiSearch(''); setEmojiCategory(''); }}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors shrink-0"
                  title={t(locale, 'chat.emoji')}
                  aria-label={t(locale, 'chat.emoji')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowGifPicker((v) => !v); setShowEmojiPicker(false); setGifSearch(''); }}
                  className="px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors text-xs font-medium border border-gray-500 shrink-0"
                  title="GIF"
                  aria-label="GIF"
                >
                  GIF
                </button>
                <div className="flex-1 min-w-2" aria-hidden />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 min-w-10 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center hover:bg-[#2a4a7a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                  aria-label={t(locale, 'chat.send')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>

            {showEmojiPicker && (
              <div className="rounded-xl bg-gray-800 border border-gray-600 p-2 max-h-64 flex flex-col">
                <input
                  type="text"
                  value={emojiSearch}
                  onChange={(e) => setEmojiSearch(e.target.value)}
                  placeholder={t(locale, 'chat.searchEmoji')}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] mb-2"
                />
                <div className="flex flex-wrap gap-1 mb-2">
                  <button
                    type="button"
                    onClick={() => setEmojiCategory('')}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${!emojiCategory ? 'bg-[#1e3a5f] text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    {t(locale, 'chat.all')}
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
                    <p className="text-sm text-gray-500 py-2 text-center">{t(locale, 'chat.nothingFound')}</p>
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
                  placeholder={t(locale, 'chat.searchGif')}
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
                        {/* eslint-disable-next-line @next/next/no-img-element -- GIF превью с внешнего CDN */}
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
                    <p className="text-sm text-gray-500 py-4 text-center">{t(locale, 'chat.nothingFound')}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
          </div>
        ,
        document.body
      )}
    </>
  );
}
