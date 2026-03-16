import { NextResponse } from 'next/server';
import { addChatMessage, setAdminLastSeen } from '@/app/lib/chat';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'dashboard_session';
const MAX_AGE = 60 * 60 * 24;

function sign(token: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(token).digest('base64url');
}

function verifySessionCookie(cookieValue: string, secret: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(cookieValue, 'base64url').toString());
    const { t, s } = payload;
    if (!t || !s) return false;
    const age = Date.now() - Number(t);
    if (age > MAX_AGE * 1000 || age < 0) return false;
    return s === sign(t, secret);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  const secret =
    process.env.DASHBOARD_SESSION_SECRET?.trim() ||
    process.env.NOTIFICATION_SECRET?.trim() ||
    process.env.DASHBOARD_PASSWORD?.trim();
  if (!secret || !value || !verifySessionCookie(value, secret)) {
    return NextResponse.json({ error: 'Требуется авторизация' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const conversationId = body.conversationId;
    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const rawAttachments = Array.isArray(body.attachments) ? body.attachments : [];
    if (!conversationId || !text) {
      return NextResponse.json({ error: 'conversationId и text обязательны' }, { status: 400 });
    }
    let attachments: { name: string; mimeType: string; data: string }[] = [];
    const MAX_ATTACHMENTS = 3;
    const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;
    for (let i = 0; i < Math.min(rawAttachments.length, MAX_ATTACHMENTS); i++) {
      const a = rawAttachments[i];
      if (a && typeof a.name === 'string' && typeof a.mimeType === 'string' && typeof a.data === 'string') {
        const size = Math.ceil((a.data.length * 3) / 4);
        if (size <= MAX_ATTACHMENT_BYTES) {
          attachments.push({ name: a.name.slice(0, 200), mimeType: a.mimeType.slice(0, 100), data: a.data });
        }
      }
    }
    const message = await addChatMessage(conversationId, 'admin', text, undefined, attachments.length ? attachments : undefined);
    if (!message) {
      return NextResponse.json({ error: 'Не удалось отправить' }, { status: 500 });
    }
    await setAdminLastSeen();
    return NextResponse.json({ message });
  } catch (e) {
    console.error('Chat reply error:', e);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
