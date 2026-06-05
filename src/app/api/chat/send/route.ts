import { NextResponse } from 'next/server';
import { addChatMessage, createConversationId, isChatStorageAvailable } from '@/app/lib/chat';

export const runtime = 'nodejs';

const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;

export async function POST(request: Request) {
  if (!isChatStorageAvailable()) {
    return NextResponse.json(
      { error: 'Чат временно недоступен. Настройте Redis (KV_REST_API_URL) на сервере.' },
      { status: 503 }
    );
  }
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Некорректный JSON в теле запроса' }, { status: 400 });
    }
    let { conversationId, name, text, attachments: rawAttachments } = body as {
      conversationId?: string;
      name?: string;
      text?: string;
      attachments?: unknown;
    };
    const visitorNameRaw = typeof name === 'string' ? name.trim() : '';
    const visitorName = visitorNameRaw || 'Гость';
    const textStr = typeof text === 'string' ? text.trim() : '';
    if (!textStr) {
      return NextResponse.json({ error: 'Текст сообщения обязателен' }, { status: 400 });
    }
    let attachments: { name: string; mimeType: string; data: string }[] = [];
    if (Array.isArray(rawAttachments) && rawAttachments.length > 0) {
      for (let i = 0; i < Math.min(rawAttachments.length, MAX_ATTACHMENTS); i++) {
        const a = rawAttachments[i];
        if (a && typeof a.name === 'string' && typeof a.mimeType === 'string' && typeof a.data === 'string') {
          const size = Math.ceil((a.data.length * 3) / 4);
          if (size <= MAX_ATTACHMENT_BYTES) {
            attachments.push({ name: a.name.slice(0, 200), mimeType: a.mimeType.slice(0, 100), data: a.data });
          }
        }
      }
    }
    if (!conversationId) {
      conversationId = createConversationId();
    }
    const message = await addChatMessage(conversationId, 'visitor', textStr, visitorName, attachments.length ? attachments : undefined);
    if (!message) {
      return NextResponse.json({ error: 'Не удалось сохранить сообщение' }, { status: 500 });
    }
    return NextResponse.json({ conversationId, message });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error('Chat send error:', err);
    const message = process.env.NODE_ENV === 'development' ? err.message : 'Ошибка сервера';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
