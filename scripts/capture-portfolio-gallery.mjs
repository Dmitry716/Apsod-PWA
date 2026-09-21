/**
 * Capture inner-page screenshots for portfolio case galleries.
 * Usage: node scripts/capture-portfolio-gallery.mjs
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', 'public', 'portfolio', 'gallery')

/** @type {Record<string, string[]>} */
const TARGETS = {
  'legal-team': [
    'https://legal-team-sooty.vercel.app/',
    'https://legal-team-sooty.vercel.app/uslugi',
    'https://legal-team-sooty.vercel.app/o-nas',
    'https://legal-team-sooty.vercel.app/dela',
    'https://legal-team-sooty.vercel.app/kontakty',
  ],
  'amba-detail': [
    'https://ambadetail.by/',
    'https://ambadetail.by/services',
    'https://ambadetail.by/portfolio',
    'https://ambadetail.by/contacts',
  ],
  nexton: [
    'https://nexton.vip/',
    'https://nexton.vip/services',
    'https://nexton.vip/about',
    'https://nexton.vip/contacts',
  ],
  artdetailing: [
    'https://artdetailing.by/',
    'https://artdetailing.by/services',
    'https://artdetailing.by/portfolio',
    'https://artdetailing.by/contacts',
  ],
  bmservice: [
    'https://bmservice.by/',
    'https://bmservice.by/services',
    'https://bmservice.by/blog',
    'https://bmservice.by/contacts',
  ],
  'dynamo-vitebsk': [
    'https://dynamovitebsk.by/',
    'https://dynamovitebsk.by/otdeleniya',
    'https://dynamovitebsk.by/blog',
    'https://dynamovitebsk.by/trenery',
  ],
  maxximum: [
    'https://maxximum.by/',
    'https://maxximum.by/napravleniya',
    'https://maxximum.by/trenery',
    'https://maxximum.by/contacts',
  ],
}

async function resolveUrls(page, base, candidates) {
  const ok = []
  for (const url of candidates) {
    try {
      const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 })
      const status = res?.status() ?? 0
      if (status >= 200 && status < 400) {
        const title = await page.title()
        if (!/404|not found|не найден/i.test(title)) ok.push(page.url())
      }
    } catch {
      /* skip */
    }
  }
  if (ok.length === 0) ok.push(base)
  return [...new Set(ok)].slice(0, 4)
}

async function discoverFromHome(page, home) {
  await page.goto(home, { waitUntil: 'domcontentloaded', timeout: 30000 })
  const origin = new URL(home).origin
  const hrefs = await page.$$eval(
    'a[href]',
    (as, origin) => {
      const out = []
      for (const a of as) {
        try {
          const u = new URL(a.href, origin)
          if (u.origin !== origin) continue
          const p = u.pathname.replace(/\/+$/, '') || '/'
          if (p === '/') continue
          if (/\.(pdf|jpg|png|zip|webp)$/i.test(p)) continue
          if (p.split('/').filter(Boolean).length > 2) continue
          out.push(u.origin + u.pathname)
        } catch {
          /* skip */
        }
      }
      return [...new Set(out)]
    },
    origin,
  )

  const preferred = hrefs.filter((h) =>
    /uslug|service|about|o-nas|kontakt|contact|portfolio|rabot|dela|blog|stat|tren|naprav|otdelen|price|stoimost|zapis/i.test(
      h,
    ),
  )
  const picked = (preferred.length ? preferred : hrefs).slice(0, 6)
  return [home, ...picked]
}

async function main() {
  fs.mkdirSync(ROOT, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })

  for (const [slug, seeds] of Object.entries(TARGETS)) {
    const dir = path.join(ROOT, slug)
    fs.mkdirSync(dir, { recursive: true })
    const home = seeds[0]
    let urls = []
    try {
      const discovered = await discoverFromHome(page, home)
      urls = await resolveUrls(page, home, [...seeds, ...discovered])
    } catch (e) {
      console.warn(slug, 'discover failed', e.message)
      urls = [home]
    }

    console.log(slug, '→', urls.length, 'pages')
    let i = 1
    for (const url of urls) {
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() =>
          page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }),
        )
        await page.waitForTimeout(800)
        await page
          .addStyleTag({
            content:
              '[class*="chat"],[id*="chat"],[class*="widget"],[aria-label*="чат"],[aria-label*="Chat"]{opacity:0!important;pointer-events:none!important;}',
          })
          .catch(() => {})
        const file = path.join(dir, `${String(i).padStart(2, '0')}.jpg`)
        await page.screenshot({ path: file, type: 'jpeg', quality: 82, fullPage: false })
        console.log(' ', file)
        i += 1
      } catch (e) {
        console.warn('  fail', url, e.message)
      }
    }
  }

  await browser.close()
  console.log('done')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
