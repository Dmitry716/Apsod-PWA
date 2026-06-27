# APSOD Site Checklist

## Done
- Added and configured portfolio project `nexton.vip` (content, order, link).
- Added `BMservice` (`https://bmservice.by`) to portfolio with year `2022`.
- Corrected portfolio years:
  - `Динамо-Витебск` -> `2019`
  - `Maxximum` -> `2024`
- Reordered portfolio cards (including `nexton.vip` position after `Amba Detail`).
- Added/updated local portfolio images and placeholders to avoid fallback icons.
- Replaced Dynamo card image with provided screenshot (`/portfolio/dynamo.png`).
- Added business-style local blog cover images and updated blog cards.
- Updated homepage:
  - latest articles section uses blog covers
  - projects section uses real portfolio data/images/links
- Expanded industries/projects in portfolio, including `Консалтинг`.
- Added portfolio filtering/sorting by type and industry.
- Implemented RU/EN language switching across key UI areas:
  - header
  - footer
  - portfolio page
  - blog page
  - blog post page
  - chat widget
- Added modern language switcher UI (globe + dropdown, light/dark support, animations).
- Fixed routing/middleware locale behavior and related 404/hydration issues.
- Fixed `cookies()` usage for Next.js 16 server components (`await cookies()`).
- Fixed chat sound 404 by adding local audio file (`/sounds/chat-message.wav`).
- Updated footer copyright branding to `APSOD`.
- Added/kept UНП in footer requisites: `391853923`.

## Verified During Work
- Dev server starts successfully on port `3000`.
- Main route returns `200`.
- Chat sound asset returns `200` (`/sounds/chat-message.wav`).
- No linter errors in recently edited files.

## Optional / Later (if needed)
- Full legal pages bilingual content review (not only common UI labels).
- Final QA pass for all EN pages after cache clear/hard refresh.
- Accessibility pass for language dropdown (keyboard focus polish, ARIA refinements).
- Production build smoke test before deployment.

## Notes
- Current locale logic supports URL prefix format (`/en/...`) and cookie/localStorage sync.
- If language appears stale in browser, do hard refresh (`Ctrl+F5`).
