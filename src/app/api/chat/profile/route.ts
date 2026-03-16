import { NextResponse } from 'next/server';
import { getAdminProfile, setAdminProfile } from '@/app/lib/chat';
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

export async function GET() {
  try {
    const profile = await getAdminProfile();
    return NextResponse.json(profile);
  } catch (e) {
    console.error('Chat profile get error:', e);
    return NextResponse.json({ name: 'Поддержка APSOD', photoUrl: '' });
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
    const name = typeof body.name === 'string' ? body.name : undefined;
    const photoUrl = typeof body.photoUrl === 'string' ? body.photoUrl : undefined;
    const profile = await setAdminProfile({ name, photoUrl });
    return NextResponse.json({ profile });
  } catch (e) {
    console.error('Chat profile set error:', e);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
