import { NextResponse } from 'next/server';
import { deleteChatMessage, addMessageHiddenFor } from '@/app/lib/chat';
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
  let body: { conversationId?: string; messageId?: string; scope?: string; as?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Неверное тело запроса' }, { status: 400 });
  }
  const conversationId = typeof body.conversationId === 'string' ? body.conversationId.trim() : '';
  const messageId = typeof body.messageId === 'string' ? body.messageId.trim() : '';
  const scope = body.scope === 'for_everyone' ? 'for_everyone' : body.scope === 'for_me' ? 'for_me' : undefined;
  if (!conversationId || !messageId) {
    return NextResponse.json({ error: 'conversationId и messageId обязательны' }, { status: 400 });
  }
  if (!scope) {
    return NextResponse.json({ error: 'Укажите scope: for_me или for_everyone' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  const secret =
    process.env.DASHBOARD_SESSION_SECRET?.trim() ||
    process.env.NOTIFICATION_SECRET?.trim() ||
    process.env.DASHBOARD_PASSWORD?.trim();
  const isAdmin = !!(secret && value && verifySessionCookie(value, secret));

  if (scope === 'for_everyone') {
    if (!isAdmin) {
      return NextResponse.json({ error: 'Удалить для всех может только админ' }, { status: 403 });
    }
    try {
      const deleted = await deleteChatMessage(conversationId, messageId);
      return NextResponse.json({ ok: true, deleted });
    } catch (e) {
      console.error('Chat message delete error:', e);
      return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
  }

  // scope === 'for_me'
  const asRole = body.as === 'admin' ? 'admin' : 'visitor';
  if (asRole === 'admin' && !isAdmin) {
    return NextResponse.json({ error: 'Только админ может указать as: admin' }, { status: 403 });
  }
  try {
    await addMessageHiddenFor(conversationId, messageId, asRole);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Chat message hide error:', e);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
