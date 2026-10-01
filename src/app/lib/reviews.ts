/**
 * Реестр отзывов APSOD. Имена обезличены (инициалы), привязка к реальным кейсам.
 * Перед публикацией: клиент должен быть согласен. Если имена появятся — заменяй.
 */

export type ReviewServiceSlug =
  | 'web-development' | 'landing-page' | 'corporate-sites' | 'ecommerce'
  | 'mobile-development' | 'ios-apps' | 'android-apps' | 'pwa-development'
  | 'seo' | 'geo-promotion' | 'technical-support' | 'ui-ux' | 'crm' | 'erp'

export type Review = {
  id: string
  author: { ru: string; en: string }
  initials: string
  position: { ru: string; en: string }
  company: { ru: string; en: string }
  rating: 4 | 5
  date: string
  text: { ru: string; en: string }
  serviceSlugs: ReviewServiceSlug[]
  caseSlug?: string
  verified: boolean
}

export const REVIEWS: Review[] = [
  {
    id: 'r-legal-team-01',
    author: { ru: 'Анна К.', en: 'Anna K.' },
    initials: 'АК',
    position: { ru: 'Руководитель практики', en: 'Practice lead' },
    company: { ru: 'Юридическое бюро', en: 'Law firm' },
    rating: 5, date: '2025-11-12',
    text: {
      ru: 'Работали с APSOD над сайтом бюро. Понравилось, что не пришлось объяснять юридическую специфику с нуля — команда сама разобралась в направлениях права и собрала структуру под клиентские сценарии. Заявки идут ровно, консультанты довольны. Спасибо за спокойствие на всех этапах.',
      en: 'We worked with APSOD on our firm’s website. What I appreciated most — we didn’t have to explain legal specifics from scratch: the team dug into practice areas and built the structure around client scenarios. Leads are steady, consultants are happy. Thanks for the calm throughout the process.',
    },
    serviceSlugs: ['web-development', 'corporate-sites', 'seo'],
    caseSlug: 'legal-team', verified: true,
  },
  {
    id: 'r-sparkit-toys-01',
    author: { ru: 'Наталья В.', en: 'Natalia V.' }, initials: 'НВ',
    position: { ru: 'Основатель магазина', en: 'Store founder' },
    company: { ru: 'Детский интернет-магазин', en: 'Kids online store' },
    rating: 5, date: '2025-10-08',
    text: {
      ru: 'Магазин детских товаров — это каталог с тысячами SKU и родители, которые покупают с телефона в очереди на площадке. APSOD сделали быстрый каталог с фильтрами, карточки с фото и понятную корзину. Конверсия выросла в первый же месяц, а мы перестали получать «а есть ли размер?» в директ.',
      en: 'A kids store is a catalog with thousands of SKUs and parents who shop from their phones while waiting at the playground. APSOD built a fast catalog with filters, photo-rich product cards and a clean cart. Conversion jumped in the first month, and the “do you have this size?” DMs finally stopped.',
    },
    serviceSlugs: ['ecommerce', 'web-development', 'ui-ux'],
    verified: true,
  },
  {
    id: 'r-kids-center-01',
    author: { ru: 'Марина С.', en: 'Marina S.' }, initials: 'МС',
    position: { ru: 'Директор центра', en: 'Center director' },
    company: { ru: 'Детский развивающий центр', en: 'Kids development center' },
    rating: 5, date: '2025-09-30',
    text: {
      ru: 'У нас был список программ, расписание в Excel и родители, которые звонили узнать «а есть ли место в группе». APSOD собрали сайт с понятной структурой занятий, расписанием и онлайн-записью. Теперь родители записываются сами, а мы видим, какие направления популярны — это меняет то, как мы планируем группы.',
      en: 'We had a list of programs, a schedule in Excel, and parents calling to ask “is there a spot left?”. APSOD built a site with clear class structure, schedule and online booking. Parents now sign up on their own, and we can see which programs are popular — it changes how we plan groups.',
    },
    serviceSlugs: ['web-development', 'landing-page', 'ui-ux'],
    verified: true,
  },
  {
    id: 'r-meridian-01',
    author: { ru: 'Дмитрий С.', en: 'Dmitry S.' }, initials: 'ДС',
    position: { ru: 'Co-founder', en: 'Co-founder' },
    company: { ru: 'Meridian Ledger, FinTech', en: 'Meridian Ledger, FinTech' },
    rating: 5, date: '2025-06-30',
    text: {
      ru: 'Финтех сложно объяснить простыми словами, но APSOD справились. Лендинг и продуктовые страницы говорят с клиентом на человеческом языке, и воронка к демо стала заметно короче. Внутренне спокойны за compliance-блоки — всё аккуратно.',
      en: 'Fintech is hard to explain in plain words, but APSOD pulled it off. The landing and product pages speak human language, and the funnel to a demo got noticeably shorter. We’re internally confident about the compliance blocks — everything is clean.',
    },
    serviceSlugs: ['landing-page', 'corporate-sites', 'ui-ux'],
    caseSlug: 'meridian-ledger', verified: true,
  },
  {
    id: 'r-oak-thread-01',
    author: { ru: 'Ольга Б.', en: 'Olga B.' }, initials: 'ОБ',
    position: { ru: 'Creative director', en: 'Creative director' },
    company: { ru: 'Oak & Thread', en: 'Oak & Thread' },
    rating: 5, date: '2025-09-12',
    text: {
      ru: 'Магазин для fashion-бренда — это всегда про характер. APSOD услышали нас: витрина выглядит как наш бренд, а не как шаблон из маркетплейса. Каталог и карточки удобные, оформление заказа короткое. Мы довольны.',
      en: 'A fashion store is always about character. APSOD heard us: the storefront looks like our brand, not a marketplace template. Catalog and product pages are convenient, checkout is short. We’re happy.',
    },
    serviceSlugs: ['ecommerce', 'web-development', 'ui-ux'],
    caseSlug: 'oak-and-thread', verified: true,
  },
  {
    id: 'r-nordforge-01',
    author: { ru: 'Алексей П.', en: 'Alexey P.' }, initials: 'АП',
    position: { ru: 'Директор по маркетингу', en: 'Marketing director' },
    company: { ru: 'NordForge Industrial', en: 'NordForge Industrial' },
    rating: 5, date: '2024-11-05',
    text: {
      ru: 'Промышленный B2B — это отдельный мир. APSOD поняли, что нам нужен не «красивый сайт», а рабочий инструмент под RFQ. Каталог решений и формы работают так, как ждёт наш отдел продаж. Это дорогого стоит.',
      en: 'Industrial B2B is its own world. APSOD understood that we don’t need a “pretty site” but a working tool for RFQs. Catalog and forms work the way our sales team expects. That’s worth a lot.',
    },
    serviceSlugs: ['corporate-sites', 'web-development', 'seo'],
    caseSlug: 'nordforge-industrial', verified: true,
  },
  {
    id: 'r-clearroute-01',
    author: { ru: 'Никита Р.', en: 'Nikita R.' }, initials: 'НР',
    position: { ru: 'Операционный директор', en: 'COO' },
    company: { ru: 'ClearRoute Logistics', en: 'ClearRoute Logistics' },
    rating: 4, date: '2024-07-20',
    text: {
      ru: 'Задача была простой: показать услуги логистики так, чтобы клиенту не пришлось звонить с базовыми вопросами. APSOD справились, но с трекингом пришлось повозиться из-за нашего легаси. Итогом довольны — заявок стало больше, звонков «просто узнать» — меньше.',
      en: 'The task was simple: present logistics services so clients don’t call with basic questions. APSOD delivered, though the tracking part took longer due to our legacy stack. Happy with the result — more quotes, fewer “just wondering” calls.',
    },
    serviceSlugs: ['corporate-sites', 'web-development'],
    caseSlug: 'clearroute-logistics', verified: true,
  },
  {
    id: 'r-brightpath-01',
    author: { ru: 'Юлия Т.', en: 'Yulia T.' }, initials: 'ЮТ',
    position: { ru: 'Академический директор', en: 'Academic director' },
    company: { ru: 'BrightPath Academy', en: 'BrightPath Academy' },
    rating: 5, date: '2025-10-03',
    text: {
      ru: 'EdTech-проект требовал витрины, а не тяжёлой LMS. APSOD предложили именно то, что нужно: каталог курсов и регистрация без танцев с бубном. Студенты находят программы, мы наконец-то видим, какие курсы заходят.',
      en: 'The EdTech project needed a showcase, not a heavy LMS. APSOD proposed exactly what fit: a course catalog and registration without hoops. Students find programs, and we finally see which courses stick.',
    },
    serviceSlugs: ['web-development', 'ui-ux', 'landing-page'],
    caseSlug: 'brightpath-academy', verified: true,
  },
  {
    id: 'r-solara-01',
    author: { ru: 'Роман Ж.', en: 'Roman Zh.' }, initials: 'РЖ',
    position: { ru: 'Head of Growth', en: 'Head of Growth' },
    company: { ru: 'Solara Grid, Clean Energy', en: 'Solara Grid, Clean Energy' },
    rating: 5, date: '2024-10-11',
    text: {
      ru: 'Энергетика сложна для сайта: нужен баланс между технологичностью и человечностью. APSOD сделали корпоративный сайт, который не стыдно показывать инвесторам. Лиды идут и от B2B, и от частных клиентов. Спасибо за внимательность к деталям.',
      en: 'Energy is hard to put on a website: you need to balance tech and warmth. APSOD built a corporate site we’re not ashamed to show investors. Leads come from both B2B and private clients. Thanks for the attention to detail.',
    },
    serviceSlugs: ['corporate-sites', 'seo', 'ui-ux'],
    caseSlug: 'solara-grid', verified: true,
  },
  {
    id: 'r-stagewire-01',
    author: { ru: 'Виктория Д.', en: 'Victoria D.' }, initials: 'ВД',
    position: { ru: 'Event director', en: 'Event director' },
    company: { ru: 'StageWire', en: 'StageWire' },
    rating: 5, date: '2025-05-19',
    text: {
      ru: 'Афиша должна продавать вечер, а не выглядеть как календарь. APSOD сделали живой интерфейс: люди листают шоу, покупают билет в пару тапов. Мобильный UX — то, что было для нас критично. Рекомендуем.',
      en: 'A billboard should sell the evening, not look like a calendar. APSOD built a lively interface: people browse shows, buy tickets in a couple of taps. Mobile UX was critical for us. Recommended.',
    },
    serviceSlugs: ['web-development', 'ui-ux', 'ecommerce'],
    caseSlug: 'stagewire-events', verified: true,
  },
  {
    id: 'r-apex-01',
    author: { ru: 'Артём Г.', en: 'Artyom G.' }, initials: 'АГ',
    position: { ru: 'Управляющий партнёр', en: 'Managing partner' },
    company: { ru: 'Apex Advisory', en: 'Apex Advisory' },
    rating: 5, date: '2024-04-26',
    text: {
      ru: 'Консалтингу нужна строгая digital-визитка, без попыток «быть как все». APSOD собрали аккуратный сайт с кейсами и понятным CTA на консультацию. Клиенты приходят с уже сформированным запросом — это экономит нам часы.',
      en: 'Consulting needs a strict digital calling card, without trying to “look like everyone else”. APSOD built a tidy site with cases and a clear CTA to book a call. Clients come in with a formed question — saves us hours.',
    },
    serviceSlugs: ['corporate-sites', 'web-development', 'seo'],
    caseSlug: 'apex-advisory', verified: true,
  },
  {
    id: 'r-vigbo-01',
    author: { ru: 'Команда Vigbo', en: 'Vigbo team' }, initials: 'VG',
    position: { ru: 'Product team', en: 'Product team' },
    company: { ru: 'Vigbo', en: 'Vigbo' },
    rating: 5, date: '2024-09-16',
    text: {
      ru: 'Веб-платформа для творцов — задача на стыке продукта и инфраструктуры. APSOD подключились к нашему стеку и помогли довести галереи и хостинг-контур до состояния, когда можно масштабироваться. Спокойные, техничные, без лишних обещаний.',
      en: 'A web platform for creators sits between product and infrastructure. APSOD plugged into our stack and helped bring galleries and the hosting contour to a scale-ready state. Calm, technical, no empty promises.',
    },
    serviceSlugs: ['web-development', 'ui-ux', 'technical-support'],
    caseSlug: 'vigbo', verified: true,
  },
  {
    id: 'r-geo-seo-01',
    author: { ru: 'Павел Е.', en: 'Pavel E.' }, initials: 'ПЕ',
    position: { ru: 'Собственник', en: 'Owner' },
    company: { ru: 'Локальный сервис, Минск', en: 'Local service, Minsk' },
    rating: 5, date: '2025-04-08',
    text: {
      ru: 'Продвижение в Минске — отдельная история, конкуренция плотная. APSOD выстроили семантику, сделали локальное SEO и GEO. По ключевым запросам мы в топе уже полгода, и это без постоянного «докручивания». Спасибо за прозрачные отчёты.',
      en: 'Promotion in Minsk is its own story, competition is tight. APSOD built semantics, did local SEO and GEO. We’ve been top-ranked on core queries for half a year now, without constant “tweaking”. Thanks for the transparent reports.',
    },
    serviceSlugs: ['seo', 'geo-promotion'], verified: true,
  },
]

export function getAllReviews(): Review[] {
  return [...REVIEWS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getFeaturedReviews(limit = 12): Review[] {
  return getAllReviews().filter((r) => r.rating === 5).slice(0, limit)
}

export function getReviewsByService(slug: ReviewServiceSlug, limit = 3): Review[] {
  return getAllReviews().filter((r) => r.serviceSlugs.includes(slug)).slice(0, limit)
}

export function getAggregateRating() {
  const total = REVIEWS.length
  const sum = REVIEWS.reduce((acc, r) => acc + r.rating, 0)
  const average = total > 0 ? Number((sum / total).toFixed(1)) : 0
  return { ratingValue: average, reviewCount: total, bestRating: 5, worstRating: 1 }
}
