import { NextResponse } from 'next/server';
import { setAdminLastSeen } from '@/app/lib/chat';
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

export async function POST() {
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
    await setAdminLastSeen();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Chat ping error:', e);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
