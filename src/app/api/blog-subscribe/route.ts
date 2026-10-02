import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'

/**
 * Подписка на дайджест блога.
 * Сохраняет email в .data/blog-subscribers.json (файл в .gitignore).
 * Позже можно заменить на Redis/БД — сигнатура ответа не изменится.
 */

const DATA_DIR = path.join(process.cwd(), '.data')
const FILE = path.join(DATA_DIR, 'blog-subscribers.json')

type Subscriber = { email: string; date: string; source: string }

async function readAll(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeAll(list: Subscriber[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), 'utf8')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: unknown }
    const email = typeof body.email === 'string' ? body.email.trim() : ''

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    const list = await readAll()
    const exists = list.some((s) => s.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return NextResponse.json({ ok: true, duplicate: true })
    }

    list.push({ email, date: new Date().toISOString(), source: 'blog' })
    await writeAll(list)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
