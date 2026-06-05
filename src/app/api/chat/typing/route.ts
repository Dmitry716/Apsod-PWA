import { NextResponse } from 'next/server';
import { getTyping, setTyping } from '@/app/lib/chat';
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get('conversationId');
  if (!conversationId) {
    return NextResponse.json({ error: 'Укажите conversationId' }, { status: 400 });
  }
  const typing = await getTyping(conversationId);
  return NextResponse.json({ typing: typing ?? null });
}

export async function POST(request: Request) {
  let body: { conversationId?: string; who?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Неверное тело запроса' }, { status: 400 });
  }
  const conversationId = body.conversationId;
  const who = body.who;
  if (!conversationId || !who) {
    return NextResponse.json({ error: 'Нужны conversationId и who (visitor|admin)' }, { status: 400 });
  }
  if (who !== 'visitor' && who !== 'admin') {
    return NextResponse.json({ error: 'who должен быть visitor или admin' }, { status: 400 });
  }
  if (who === 'admin') {
    const cookieStore = await cookies();
    const value = cookieStore.get(COOKIE_NAME)?.value;
    const secret =
      process.env.DASHBOARD_SESSION_SECRET?.trim() ||
      process.env.NOTIFICATION_SECRET?.trim() ||
      process.env.DASHBOARD_PASSWORD?.trim();
    if (!secret || !value || !verifySessionCookie(value, secret)) {
      return NextResponse.json({ error: 'Требуется авторизация' }, { status: 401 });
    }
  }
  await setTyping(conversationId, who);
  return NextResponse.json({ ok: true });
}
