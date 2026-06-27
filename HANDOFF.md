# APSOD Handoff (2-Minute Start)

## 1) Start project locally
- Open terminal in project root: `c:\Users\karel\apsod-pwa`
- Install deps (if needed): `npm install`
- Run dev server: `npm run dev -- --port 3000`
- Open: `http://localhost:3000`

## 2) Core areas changed recently
- Language/locale:
  - `src/app/lib/i18n.ts`
  - `src/app/lib/useLocale.ts`
  - `middleware.ts`
- Layout (header/footer + language switch):
  - `src/app/components/layout/Header.tsx`
  - `src/app/components/layout/Footer.tsx`
  - `src/app/components/ui/LanguageSwitcher.tsx`
- Portfolio:
  - `src/app/portfolio/data.ts`
  - `src/app/portfolio/page.tsx`
  - images: `public/portfolio/*`
- Blog:
  - `src/app/blog/data/posts.ts`
  - `src/app/blog/page.tsx`
  - `src/app/blog/[slug]/page.tsx`
  - images: `public/blog/*`
- Homepage:
  - `src/app/page.tsx`
- Chat widget:
  - `src/app/components/ChatWidget.tsx`
  - sound: `public/sounds/chat-message.wav`

## 3) Quick smoke test (important)
- RU/EN switch in header and footer:
  - UI text changes on current page
  - URL toggles with `/en/...` in EN mode
- Open key pages:
  - `/`, `/portfolio`, `/blog`, `/contact`
- Check chat widget:
  - opens/closes
  - EN labels appear in EN mode
  - no missing sound 404 for `/sounds/chat-message.wav`
- Portfolio:
  - Dynamo card uses new image (`/portfolio/dynamo.png`)

## 4) Known behavior
- Locale is synced via cookie + localStorage + URL prefix handling.
- If browser shows stale UI, run hard refresh: `Ctrl+F5`.

## 5) Reference docs
- Detailed progress/state: `PROJECT_CHECKLIST.md`
