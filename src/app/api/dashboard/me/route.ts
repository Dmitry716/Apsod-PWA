import { NextResponse } from 'next/server';
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
  const password = process.env.DASHBOARD_PASSWORD;
  const login = process.env.DASHBOARD_LOGIN;
  if (!login || !password) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const secret = process.env.DASHBOARD_SESSION_SECRET || process.env.NOTIFICATION_SECRET || password;
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;

  if (!value || !verifySessionCookie(value, secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
