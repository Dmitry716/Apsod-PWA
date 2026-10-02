#!/usr/bin/env node
/**
 * Вставляет <ReviewsByService /> ПЕРЕД финальным CTA (bg-slate-950)
 * или перед ServiceFaqBlock, если CTA не найден.
 * Идемпотентно: если блок уже есть — пропускает.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const SERVICES_DIR = 'src/app/services'
const SKIP_DIRS = ['components', 'lib']

const VALID_SLUGS = new Set([
  'web-development', 'landing-page', 'corporate-sites', 'ecommerce',
  'mobile-development', 'ios-apps', 'android-apps', 'pwa-development',
  'seo', 'geo-promotion', 'technical-support', 'ui-ux', 'crm', 'erp',
])

const IMPORT_LINE = `import ReviewsByService from '../../components/ReviewsByService'`

function insertReviews(source, slug) {
  if (source.includes('<ReviewsByService')) {
    return { changed: false, reason: 'уже есть' }
  }

  let out = source

  // Импорт — после последнего import
  if (!out.includes(IMPORT_LINE)) {
    const matches = [...out.matchAll(/^import .+$/gm)]
    if (matches.length > 0) {
      const last = matches[matches.length - 1]
      const pos = last.index + last[0].length
      out = out.slice(0, pos) + '\n' + IMPORT_LINE + out.slice(pos)
    } else {
      return { changed: false, reason: 'нет import-блока' }
    }
  }

  // Ищем ПЕРВУЮ секцию с bg-slate-950 (это финальный CTA)
  const ctaRegex = /(\n\s*<section[^>]*bg-slate-950[^>]*>)/
  const ctaMatch = out.match(ctaRegex)

  const block = `\n\n      {/* Отзывы клиентов об этой услуге */}\n      <ReviewsByService serviceSlug="${slug}" limit={3} />`

  if (ctaMatch && ctaMatch.index !== undefined) {
    // Вставить ПЕРЕД CTA-секцией
    out = out.slice(0, ctaMatch.index) + block + out.slice(ctaMatch.index)
    return { changed: true, source: out, placed: 'before-cta' }
  }

  // Fallback — перед ServiceFaqBlock
  if (/<ServiceFaqBlock/.test(out)) {
    out = out.replace(
      /(\n\s*<ServiceFaqBlock )/,
      block + '$1'
    )
    return { changed: true, source: out, placed: 'before-faq' }
  }

  return { changed: false, reason: 'нет CTA и нет FAQ' }
}

async function main() {
  const entries = await readdir(SERVICES_DIR, { withFileTypes: true })
  const dirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => !SKIP_DIRS.includes(name))
    .filter((name) => VALID_SLUGS.has(name))

  console.log(`Найдено услуг: ${dirs.length}\n`)

  let changed = 0
  for (const slug of dirs) {
    const filePath = join(SERVICES_DIR, slug, 'page.tsx')
    try {
      const source = await readFile(filePath, 'utf8')
      const res = insertReviews(source, slug)
      if (res.changed) {
        await writeFile(filePath, res.source, 'utf8')
        console.log(`✓ ${slug} → ${res.placed}`)
        changed++
      } else {
        console.log(`· ${slug} — ${res.reason}`)
      }
    } catch (err) {
      console.error(`✗ ${slug}: ${err.message}`)
    }
  }
  console.log(`\nОбновлено файлов: ${changed}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
