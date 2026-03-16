import { NextResponse } from 'next/server';
import { addChatMessage, createConversationId } from '@/app/lib/chat';
import { hasRedis } from '@/app/lib/redis';

const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production' && !hasRedis()) {
    return NextResponse.json({ error: 'Чат временно недоступен' }, { status: 503 });
  }
  try {
    const body = await request.json();
    let { conversationId, name, text, attachments: rawAttachments } = body;
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
