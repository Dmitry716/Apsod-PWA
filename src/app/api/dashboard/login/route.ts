import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'dashboard_session';
const MAX_AGE = 60 * 60 * 24; // 24 часа

function sign(token: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(token).digest('base64url');
}

function createSessionCookie(secret: string): string {
  const timestamp = Date.now().toString();
  const signature = sign(timestamp, secret);
  const payload = JSON.stringify({ t: timestamp, s: signature });
  return Buffer.from(payload).toString('base64url');
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
  const rawLogin = process.env.DASHBOARD_LOGIN ?? '';
  const rawPassword = process.env.DASHBOARD_PASSWORD ?? '';
  const expectedLogin = rawLogin.trim().toLowerCase();
  const expectedPassword = rawPassword.trim().replace(/\r?\n$/, '');
  if (!expectedLogin || !expectedPassword) {
    return NextResponse.json(
      {
        error:
          'Не настроено: добавьте DASHBOARD_LOGIN и DASHBOARD_PASSWORD в .env.local и перезапустите сервер (npm run dev).',
      },
      { status: 503 }
    );
  }

  let body: { login?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Неверный запрос' }, { status: 400 });
  }

  const login = (body.login ?? '').trim().toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';
  const loginOk = login === expectedLogin;
  const passwordOk = password === expectedPassword;

  if (process.env.NODE_ENV === 'development' && (!loginOk || !passwordOk)) {
    console.log(
      '[dashboard login]',
      loginOk ? 'логин OK' : `логин не совпал (ожид. длина ${expectedLogin.length}, получено ${login.length})`,
      passwordOk ? 'пароль OK' : `пароль не совпал (ожид. длина ${expectedPassword.length}, получено ${password.length}). Если в пароле есть }, # или пробелы — в .env.local укажите DASHBOARD_PASSWORD="пароль" в кавычках`
    );
  }

  if (!loginOk || !passwordOk) {
    let hint = '';
    if (process.env.NODE_ENV === 'development') {
      const parts: string[] = [];
      if (!loginOk)
        parts.push(`логин: в .env ${expectedLogin.length} симв., введено ${login.length}`);
      if (!passwordOk)
        parts.push(`пароль: в .env ${expectedPassword.length} симв., введено ${password.length}`);
      hint = ' Проверьте .env.local и перезапустите сервер (npm run dev). ' + parts.join('; ');
    }
    return NextResponse.json(
      { error: 'Неверный логин или пароль.' + hint },
      { status: 401 }
    );
  }

  const secret =
    process.env.DASHBOARD_SESSION_SECRET?.trim() ||
    process.env.NOTIFICATION_SECRET?.trim() ||
    expectedPassword;
  const value = createSessionCookie(secret);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });

  return NextResponse.json({ ok: true });
}
