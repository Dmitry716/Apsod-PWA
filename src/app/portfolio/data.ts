export type PortfolioProject = {
  id: number
  slug: string
  title: string
  category: string
  type: 'web' | 'mobile'
  description: string
  /** Задача клиента */
  challenge: string
  /** Что сделали */
  solution: string
  /** Измеримые или качественные результаты (без выдуманных %) */
  results: string[]
  /**
   * Дополнительные абзацы кейса (как в Nerox portfolio-details):
   * показываются после задачи/решения и после галереи.
   */
  detailParagraphs?: string[]
  image: string
  tags: string[]
  /** Живой сайт или внешняя ссылка (если есть) */
  liveUrl?: string
  /** @deprecated используйте slug + liveUrl; оставлен для совместимости ссылок */
  link: string
  color: string
  year: string
  location: string
  /** object-position для обложки в карточках */
  imageObjectPosition?: string
  /** contain — баннеры/широкие обложки без обрезки текста на мобиле */
  imageFit?: 'cover' | 'contain'
  /** Отдельная обложка для узких экранов */
  imageMobile?: string
  /** Скрины внутренних страниц сайта (галерея внизу кейса) */
  gallery?: string[]
}

/** Порядок проектов на главной и в портфолио */
export const PORTFOLIO_PRIORITY_LINKS = [
  'https://legal-team-sooty.vercel.app',
  'https://ambadetail.by',
  'https://nexton.vip',
  'https://artdetailing.by',
  'https://bmservice.by',
  'https://dynamovitebsk.by',
  'https://maxximum.by',
] as const

function normalizePortfolioLink(link: string): string {
  return link.replace(/\/+$/, '').toLowerCase()
}

/** Проекты APSOD: локальные кейсы + международные работы (США / UK) */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 26,
    slug: 'legal-team',
    title: 'Legal Team',
    category: 'Юриспруденция',
    type: 'web',
    description:
      'Сайт юридической компании Legal Team в Москве: 22 направления права, кейсы, отзывы, статьи, онлайн-чат и PWA — премиальный digital-канал под заявки и SEO.',
    challenge:
      'Юридической компании нужен был не «визитка-конструктор», а масштабируемый продукт: десятки услуг, доверие, лиды из поиска и удобный контакт с телефона — без потери премиального тона.',
    solution:
      'Собрали полноценный сайт: структура по направлениям права, блоки кейсов и отзывов, FAQ, журнал, прайс-ориентиры, формы и чат. PWA для установки с телефона, SEO-разметка и контур под GEO.',
    results: [
      '22 направления права в одной понятной навигации',
      'Канал заявок: формы, чат и быстрый звонок с мобильного',
      'PWA + SEO-база под коммерческие запросы в Москве и РФ',
    ],
    image: '/portfolio/legal-team.jpg',
    imageObjectPosition: 'center',
    imageFit: 'contain',
    tags: ['Next.js', 'PWA', 'SEO', 'UI/UX'],
    liveUrl: 'https://legal-team-sooty.vercel.app/',
    link: 'https://legal-team-sooty.vercel.app/',
    color: 'from-slate-800 to-amber-700',
    year: '2026',
    location: 'Москва',
    detailParagraphs: [
      'Отдельно проработали структуру коммерческих запросов: направления права, FAQ, статьи и блоки доверия связаны так, чтобы пользователь быстро находил услугу и оставлял заявку — с десктопа и с телефона.',
      'PWA даёт установку на домашний экран без магазинов приложений: клиент возвращается в привычный интерфейс, а компания получает ещё один канал повторных обращений. SEO и разметка заложены в основу, а не «поверх» дизайна.',
    ],
    gallery: [
      '/portfolio/gallery/legal-team/01.jpg',
      '/portfolio/gallery/legal-team/02.jpg',
      '/portfolio/gallery/legal-team/03.jpg',
      '/portfolio/gallery/legal-team/04.jpg',
    ],
  },
  {
    id: 3,
    slug: 'amba-detail',
    title: 'Amba Detail',
    category: 'Детейлинг студия',
    type: 'web',
    description:
      'Сайт студии детейлинга «Amba Detail» в Витебске. Услуги по уходу за автомобилем, портфолио работ и прайс-лист.',
    challenge:
      'Студия работала в основном через сарафан и мессенджеры: не было понятной витрины услуг и доверия для новых клиентов из поиска.',
    solution:
      'Собрали быстрый сайт на Next.js: услуги, портфолио работ, прайс и удобные точки контакта (звонок / WhatsApp). Структура под локальный поиск по Витебску.',
    results: [
      'Единая витрина услуг и цен с понятным путём к заявке',
      'Портфолио работ как аргумент для записи',
      'Сайт готов принимать заявки 24/7',
    ],
    image: '/portfolio/amba.png',
    tags: ['Next.js', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://ambadetail.by',
    link: 'https://ambadetail.by',
    color: 'from-orange-600 to-red-500',
    year: '2026',
    location: 'Витебск',
    detailParagraphs: [
      'Сделали акцент на атмосфере студии и понятном прайсе: клиент видит услуги, примеры работ и сразу может позвонить или написать в WhatsApp — без лишних шагов.',
      'Структура страниц заточена под локальный поиск по Витебску: услуги, контакты и точки доверия собраны так, чтобы новый клиент быстро принимал решение о записи.',
    ],
    gallery: [
      '/portfolio/gallery/amba-detail/01.jpg',
      '/portfolio/gallery/amba-detail/02.jpg',
      '/portfolio/gallery/amba-detail/03.jpg',
      '/portfolio/gallery/amba-detail/04.jpg',
    ],
  },
  {
    id: 23,
    slug: 'nexton',
    title: 'nexton.vip',
    category: 'Автосервис',
    type: 'web',
    description:
      'PWA автосервиса NEXTON: заправка и ремонт кондиционеров, Webasto и системы охлаждения в Полоцке и Новополоцке — сайт как приложение на телефоне, без App Store.',
    challenge:
      'Узкая специализация (кондиционеры, Webasto) терялась без сильного digital-канала: клиенты из Полоцка/Новополоцка не находили сервис в поиске и не понимали перечень услуг. Нужен был быстрый канал заявок, удобный с телефона.',
    solution:
      'Собрали Progressive Web App на Next.js и TypeScript: app-like интерфейс, установка на домашний экран, понятная структура услуг, гео-фокус на Полоцк и Новополоцк, быстрый контакт и запись.',
    results: [
      'PWA: установка на смартфон, быстрый app-like интерфейс без магазина приложений',
      'Чёткая презентация узких услуг автосервиса для двух городов',
      'Удобный путь к записи / звонку с мобильного',
    ],
    image: '/portfolio/nexton.png',
    tags: ['PWA', 'Next.js', 'TypeScript', 'UI/UX'],
    liveUrl: 'https://nexton.vip',
    link: 'https://nexton.vip',
    color: 'from-violet-600 to-fuchsia-600',
    year: '2026',
    location: 'Полоцк',
    detailParagraphs: [
      'Интерфейс собран как приложение: крупные зоны услуг, быстрый контакт и сценарий записи с телефона. Гео-фокус на Полоцк и Новополоцк заложен в тексты и структуру разделов.',
      'PWA снимает зависимость от магазинов приложений: клиент ставит сервис на домашний экран и возвращается за записью, а бизнес получает стабильный мобильный канал заявок.',
    ],
    gallery: [
      '/portfolio/gallery/nexton/01.jpg',
      '/portfolio/gallery/nexton/02.jpg',
      '/portfolio/gallery/nexton/03.jpg',
      '/portfolio/gallery/nexton/04.jpg',
    ],
  },
  {
    id: 2,
    slug: 'maxximum',
    title: 'Maxximum',
    category: 'Образование',
    type: 'web',
    description:
      'Сайт спортивно-образовательного центра «Maxximum» в Витебске: направления, расписание, тренеры и запись на пробные тренировки.',
    challenge:
      'Центру нужно было собрать направления, тренеров и запись на пробные занятия в одном месте — с индивидуальным дизайном.',
    solution:
      'Индивидуальный сайт: направления, расписание, команда тренеров и сценарий записи на пробную тренировку.',
    results: [
      'Единый цифровой канал центра',
      'Прозрачная презентация направлений и тренеров',
      'Запись на пробные занятия с сайта',
    ],
    image: '/portfolio/maxximum.jpg',
    tags: ['React', 'TypeScript', 'Express'],
    liveUrl: 'https://maxximum.by',
    link: 'https://maxximum.by',
    color: 'from-green-600 to-emerald-500',
    year: '2024',
    location: 'Витебск',
    detailParagraphs: [
      'Направления, тренеры и запись собраны в одной логике: родитель или ученик быстро понимает, куда идти, и оставляет заявку на пробное занятие без лишней навигации.',
      'Индивидуальный дизайн поддерживает характер центра, а структура страниц рассчитана на регулярное обновление расписания и состава команды.',
    ],
    gallery: [
      '/portfolio/gallery/maxximum/01.jpg',
      '/portfolio/gallery/maxximum/02.jpg',
      '/portfolio/gallery/maxximum/03.jpg',
      '/portfolio/gallery/maxximum/04.jpg',
    ],
  },
  {
    id: 1,
    slug: 'dynamo-vitebsk',
    title: 'Динамо-Витебск (СДЮШОР)',
    category: 'Спортивный сайт',
    type: 'web',
    description:
      'Официальный сайт СДЮШОР «Динамо-Витебск»: отделения, секции, блог, достижения воспитанников и тренерский состав.',
    challenge:
      'Школе нужен был официальный онлайн-представитель: отделения, секции, новости и доверие родителей.',
    solution:
      'Корпоративный сайт с разделами отделений, блогом, достижениями воспитанников и тренерским составом. Уникальный код, администрирование контента.',
    results: [
      'Официальная площадка школы в интернете',
      'Публикация новостей и достижений',
      'Долгоживущий проект на поддержке (с 2019)',
    ],
    image: '/portfolio/dynamo.png',
    tags: ['Next.js', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://dynamovitebsk.by',
    link: 'https://dynamovitebsk.by',
    color: 'from-blue-600 to-cyan-500',
    year: '2019',
    location: 'Витебск',
    detailParagraphs: [
      'Отделения, секции, новости и достижения воспитанников собраны в официальную витрину школы — родителям проще найти нужное направление и убедиться в уровне подготовки.',
      'Сайт рассчитан на долгую жизнь: администрирование контента, блог и поддержка с 2019 года без смены «конструкторной» платформы.',
    ],
    gallery: [
      '/portfolio/gallery/dynamo-vitebsk/01.jpg',
      '/portfolio/gallery/dynamo-vitebsk/02.jpg',
      '/portfolio/gallery/dynamo-vitebsk/03.jpg',
      '/portfolio/gallery/dynamo-vitebsk/04.jpg',
    ],
  },
  {
    id: 24,
    slug: 'bmservice',
    title: 'BMservice',
    category: 'Автосервис',
    type: 'web',
    description:
      'Сайт сервисного центра BMW, Mercedes и Land Rover в Витебске: услуги, блог и онлайн-запись.',
    challenge:
      'Премиальный сервис по марке нуждался в сайте, который отражает экспертизу по BMW / Mercedes / Land Rover и ведёт к записи.',
    solution:
      'Сайт услуг с блогом и онлайн-записью, акцент на марках и доверии к сервису.',
    results: [
      'Позиционирование как профильного сервиса марок',
      'Онлайн-запись и контент в блоге',
      'Канал заявок помимо телефонных звонков',
    ],
    image: '/portfolio/bmservice-cover.jpg',
    tags: ['Next.js', 'SEO', 'UI/UX'],
    liveUrl: 'https://bmservice.by/',
    link: 'https://bmservice.by/',
    color: 'from-slate-700 to-gray-900',
    year: '2022',
    location: 'Витебск',
    detailParagraphs: [
      'Акцент на марках BMW, Mercedes и Land Rover поддержан структурой услуг, блогом и сценарием онлайн-записи — сайт усиливает экспертизу сервиса, а не спорит с ней.',
      'Контент и формы собраны так, чтобы клиент понимал зону ответственности сервиса и оставлял заявку без лишних звонков «в никуда».',
    ],
    gallery: [
      '/portfolio/gallery/bmservice/01.jpg',
      '/portfolio/gallery/bmservice/02.jpg',
      '/portfolio/gallery/bmservice/03.jpg',
      '/portfolio/gallery/bmservice/04.jpg',
    ],
  },
  {
    id: 25,
    slug: 'artdetailing',
    title: 'ArtDetailing',
    category: 'Детейлинг студия',
    type: 'web',
    description:
      'PWA детейлинг-студии ArtDetailing в Витебске на ASP.NET Core 10.0: сайт как приложение на телефоне, каталог услуг, онлайн-запись, локальное SEO и GEO.',
    challenge:
      'Студии нужен был современный digital-канал: быстрый как приложение, с записью, витриной работ и видимостью в поиске.',
    solution:
      'Собрали Progressive Web App на ASP.NET Core 10.0: установка на домашний экран, app-like интерфейс, каталог услуг (химчистка, полировка, оклейка, защита), фото/видео, запись, SEO под Витебск и база под GEO.',
    results: [
      'PWA: установка на смартфон, быстрый интерфейс, обновления без магазина приложений',
      'ASP.NET Core 10.0: высокая производительность, безопасность и полный контроль над кодом',
      'Онлайн-запись, витрина услуг/комплексов, локальное SEO и GEO',
    ],
    image: '/portfolio/artdetailing.png',
    tags: ['PWA', 'ASP.NET Core 10', 'SEO', 'GEO'],
    liveUrl: 'https://artdetailing.by/',
    link: 'https://artdetailing.by/',
    color: 'from-rose-700 to-red-900',
    year: '2026',
    location: 'Витебск',
    detailParagraphs: [
      'Каталог услуг и комплексов, фото/видео работ и онлайн-запись собраны в app-like интерфейс: с телефона путь к заявке короткий, с десктопа — так же прозрачный.',
      'ASP.NET Core 10.0 даёт контроль над кодом и производительностью, а SEO/GEO-контур под Витебск заложен в структуру страниц и контент, а не добавлен «в конце».',
    ],
    gallery: [
      '/portfolio/gallery/artdetailing/01.jpg',
      '/portfolio/gallery/artdetailing/02.jpg',
      '/portfolio/gallery/artdetailing/03.jpg',
      '/portfolio/gallery/artdetailing/04.jpg',
    ],
  },
  {
    id: 4,
    slug: 'sparkite',
    title: 'Sparkite',
    category: 'Медицина',
    type: 'mobile',
    description:
      'Реабилитационное приложение: цели и ежедневные чекины для возвращения к здоровому образу жизни.',
    challenge:
      'Нужен был продукт, который помогает держать реабилитационные цели ежедневно — не просто лендинг, а рабочее мобильное приложение.',
    solution:
      'React Native-приложение с целями, ежедневными чекинами и бэкендом на Node.js / PostgreSQL.',
    results: [
      'Рабочий MVP под iOS/Android-стек',
      'Ежедневные сценарии мотивации и контроля',
      'Серверная часть под рост аудитории',
    ],
    image: '/portfolio/sparkite.jpg',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    link: '/portfolio/sparkite',
    color: 'from-purple-600 to-pink-500',
    year: '2024',
    location: 'Нью-Йорк, США',
  },
  {
    id: 5,
    slug: 'buzz',
    title: 'Buzz',
    category: 'Развлечения',
    type: 'mobile',
    description:
      'Приложение для поиска и организации событий в небольших городах с системой рекомендаций.',
    challenge:
      'В малых городах сложно находить события: разобщённые группы в соцсетях и нет единого канала.',
    solution:
      'Flutter-приложение с картой, событиями и рекомендациями на Firebase.',
    results: [
      'Единая лента событий для локальной аудитории',
      'Карта и рекомендации для вовлечения',
      'Кроссплатформенная база для масштабирования',
    ],
    image: '/portfolio/buzz.jpg',
    tags: ['Flutter', 'Firebase', 'Google Maps API'],
    link: '/portfolio/buzz',
    color: 'from-yellow-500 to-orange-500',
    year: '2025',
    location: 'США',
  },
  {
    id: 6,
    slug: 'erin',
    title: 'Erin Wesley',
    category: 'Веб-сайт',
    type: 'web',
    description:
      'Сайт-портфолио оператора-постановщика с GLSL-анимациями и кастомным скроллом.',
    challenge:
      'Творческому портфолио нужен был запоминающийся сайт с сильной визуальной драматургией.',
    solution:
      'Кастомный фронтенд на Next.js + Three.js / GSAP / GLSL, индивидуальный скролл и анимации.',
    results: [
      'Уникальный визуальный образ портфолио',
      'Высокий уровень motion и интерактива',
      'Индивидуальный визуальный язык',
    ],
    image: '/portfolio/erin.jpg',
    tags: ['Next.js', 'Three.js', 'GSAP'],
    link: '/portfolio/erin',
    color: 'from-indigo-600 to-purple-500',
    year: '2023',
    location: 'Лос-Анджелес, США',
  },
  {
    id: 7,
    slug: 'vsenashi',
    title: 'VSE NASHI',
    category: 'Мобильное приложение',
    type: 'mobile',
    description:
      'Социальная платформа для русскоязычной диаспоры: работа, знакомства, услуги и события.',
    challenge:
      'Диаспоре нужен был свой хаб: работа, услуги, события и знакомства — без нагромождения несвязанных чатов.',
    solution:
      'Социальная платформа на React Native с сервером Node.js / MongoDB под ключевые сценарии сообщества.',
    results: [
      'Мобильный продукт под несколько сценариев сразу',
      'Архитектура под рост сообществ',
      'Единая точка входа для русскоязычной аудитории',
    ],
    image: '/portfolio/vsenashi.jpg',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    link: '/portfolio/vsenashi',
    color: 'from-teal-500 to-green-500',
    year: '2025',
    location: 'США',
  },
  {
    id: 8,
    slug: 'vigbo',
    title: 'Vigbo',
    category: 'Веб-платформа',
    type: 'web',
    description:
      'Конструктор сайтов для творцов и предпринимателей с системой клиентских галерей.',
    challenge:
      'Творцам нужна была платформа для презентации работ и клиентских галерей — гибче «голого» лендинга.',
    solution:
      'Веб-платформа на Vue.js с галереями клиентов и инфраструктурой на AWS.',
    results: [
      'Инструмент для регулярной публикации работ',
      'Клиентские галереи как часть продукта',
      'Масштабируемый хостинг-контур',
    ],
    image: '/portfolio/vigbo.jpg',
    tags: ['Vue.js', 'Node.js', 'AWS'],
    link: '/portfolio/vigbo',
    color: 'from-pink-500 to-rose-500',
    year: '2024',
    location: 'Уэстон, Флорида, США',
  },
  {
    id: 35,
    slug: 'nordforge-industrial',
    title: 'NordForge Industrial',
    category: 'Производство',
    type: 'web',
    description:
      'Корпоративный B2B-сайт промышленного производителя: каталог решений, кейсы и лидогенерация для заводов США.',
    challenge:
      'Производителю нужна была цифровая витрина оборудования и комплектующих с понятным путём к запросу коммерческого предложения.',
    solution:
      'Корпоративный сайт на Next.js: каталог решений, отраслевые кейсы, формы RFQ и структура под технический поиск.',
    results: [
      'Единая презентация продуктовой линейки',
      'Канал заявок RFQ с сайта',
      'Готовность к SEO по промышленным запросам',
    ],
    image: '/portfolio/nordforge-industrial.jpg',
    tags: ['Next.js', 'B2B', 'SEO'],
    link: '/portfolio/nordforge-industrial',
    color: 'from-slate-600 to-zinc-800',
    year: '2024',
    location: 'Чикаго, США',
  },
  {
    id: 27,
    slug: 'meridian-ledger',
    title: 'Meridian Ledger',
    category: 'Финансы',
    type: 'web',
    description:
      'Сайт финтех-платформы для SMB в Великобритании: продукты, безопасность и онboarding к демо.',
    challenge:
      'Нужно было донести сложный финансовый продукт простым языком и вести к заявке на демо без перегруза.',
    solution:
      'Лендинг и продуктовые страницы с акцентом на доверие, безопасность и сценарий «запросить демо».',
    results: [
      'Понятная воронка к демо',
      'Блоки доверия и compliance-ready контент',
      'Адаптив под desktop и mobile',
    ],
    image: '/portfolio/meridian-ledger.jpg',
    tags: ['Next.js', 'FinTech', 'UI/UX'],
    link: '/portfolio/meridian-ledger',
    color: 'from-indigo-800 to-blue-900',
    year: '2025',
    location: 'Лондон, Великобритания',
  },
  {
    id: 28,
    slug: 'harbor-health',
    title: 'Harbor Health',
    category: 'Медицина',
    type: 'web',
    description:
      'Сайт частной клиники в Бостоне: услуги, врачи и онлайн-запись на приём.',
    challenge:
      'Клинике нужна была спокойная digital-витрина с записью — без «шаблонного» медицинского вида.',
    solution:
      'Сайт услуг и команды врачей с удобной записью и локальным SEO по направлениям.',
    results: [
      'Онлайн-запись как основной канал',
      'Прозрачная структура услуг',
      'Доверительный визуальный образ клиники',
    ],
    image: '/portfolio/harbor-health.jpg',
    tags: ['Next.js', 'Healthcare', 'SEO'],
    link: '/portfolio/harbor-health',
    color: 'from-teal-600 to-cyan-700',
    year: '2024',
    location: 'Бостон, США',
  },
  {
    id: 29,
    slug: 'oak-and-thread',
    title: 'Oak & Thread',
    category: 'Ритейл',
    type: 'web',
    description:
      'Интернет-магазин британского fashion-бренда: каталог, карточки товаров и оформление заказа.',
    challenge:
      'Бренду нужен был магазин с сильным визуалом и быстрым путём к покупке.',
    solution:
      'Кастомный storefront: каталог, фильтры, карточки и checkout-сценарий под fashion-ритейл.',
    results: [
      'Витрина под бренд',
      'Удобный каталог и карточки товаров',
      'Готовность к масштабированию ассортимента',
    ],
    image: '/portfolio/oak-and-thread.jpg',
    tags: ['Next.js', 'E-commerce', 'UI/UX'],
    link: '/portfolio/oak-and-thread',
    color: 'from-stone-600 to-amber-800',
    year: '2025',
    location: 'Манчестер, Великобритания',
  },
  {
    id: 30,
    slug: 'clearroute-logistics',
    title: 'ClearRoute Logistics',
    category: 'Логистика',
    type: 'web',
    description:
      'Корпоративный сайт логистического оператора в Техасе: услуги, трекинг и запрос тарифа.',
    challenge:
      'Оператору нужна была B2B-площадка с понятными услугами и быстрым запросом расчёта доставки.',
    solution:
      'Сайт услуг с виджетом трекинга, отраслевыми сценариями и формой quote request.',
    results: [
      'Прозрачная презентация логистических услуг',
      'Заявки на расчёт тарифа с сайта',
      'Структура под коммерческий поиск',
    ],
    image: '/portfolio/clearroute-logistics.jpg',
    tags: ['Next.js', 'B2B', 'Logistics'],
    link: '/portfolio/clearroute-logistics',
    color: 'from-orange-600 to-slate-800',
    year: '2023',
    location: 'Даллас, США',
  },
  {
    id: 31,
    slug: 'brightpath-academy',
    title: 'BrightPath Academy',
    category: 'Образование',
    type: 'web',
    description:
      'Платформа онлайн-курсов в Техасе: каталог программ, прогресс обучения и регистрация.',
    challenge:
      'EdTech-проекту нужна была витрина курсов и онboarding учеников без тяжёлой «учебной» CMS.',
    solution:
      'Сайт академии с каталогом курсов, карточками программ и сценарием регистрации.',
    results: [
      'Понятный каталог образовательных программ',
      'Путь к регистрации с лендинга курса',
      'Адаптивный интерфейс под mobile-first',
    ],
    image: '/portfolio/brightpath-academy.jpg',
    tags: ['Next.js', 'EdTech', 'UI/UX'],
    link: '/portfolio/brightpath-academy',
    color: 'from-indigo-600 to-violet-700',
    year: '2025',
    location: 'Остин, США',
  },
  {
    id: 32,
    slug: 'solara-grid',
    title: 'Solara Grid',
    category: 'Энергетика',
    type: 'web',
    description:
      'Сайт компании чистой энергетики в Калифорнии: решения, проекты и лиды для B2B/B2C.',
    challenge:
      'Нужно было упаковать сложные energy-решения в понятные сценарии и собирать заявки с сайта.',
    solution:
      'Корпоративный сайт с блоками решений, картой проектов и конверсионными формами.',
    results: [
      'Ясная презентация renewable-направлений',
      'Лиды с сайта для sales-команды',
      'Визуальный акцент на sustainability',
    ],
    image: '/portfolio/solara-grid.jpg',
    tags: ['Next.js', 'Corporate', 'SEO'],
    link: '/portfolio/solara-grid',
    color: 'from-emerald-600 to-sky-700',
    year: '2024',
    location: 'Калифорния, США',
  },
  {
    id: 33,
    slug: 'stagewire-events',
    title: 'StageWire',
    category: 'Развлечения',
    type: 'web',
    description:
      'Платформа событий и билетов в Лондоне: афиша, карточки мероприятий и покупка билетов.',
    challenge:
      'Организаторам нужна была яркая афиша с быстрым путём к билету.',
    solution:
      'Event-платформа: лента событий, карточки шоу и сценарий покупки / бронирования.',
    results: [
      'Живая афиша с удобными карточками',
      'Короткий путь к билету',
      'Мобильный UX для вечерней аудитории',
    ],
    image: '/portfolio/stagewire-events.jpg',
    tags: ['Next.js', 'Events', 'UI/UX'],
    link: '/portfolio/stagewire-events',
    color: 'from-fuchsia-600 to-purple-800',
    year: '2025',
    location: 'Лондон, Великобритания',
  },
  {
    id: 34,
    slug: 'apex-advisory',
    title: 'Apex Advisory',
    category: 'Консалтинг',
    type: 'web',
    description:
      'Сайт консалтинговой практики в Нью-Йорке: услуги, кейсы и запрос консультации.',
    challenge:
      'Бюро нужна была строгая digital-визитка с кейсами и понятным CTA на консультацию.',
    solution:
      'Корпоративный сайт: услуги, выбранции, кейсы и форма запроса стратегии.',
    results: [
      'Доверительный образ практики',
      'Кейсы как аргумент продаж',
      'Заявки на консультацию с сайта',
    ],
    image: '/portfolio/apex-advisory.jpg',
    tags: ['Next.js', 'Consulting', 'SEO'],
    link: '/portfolio/apex-advisory',
    color: 'from-gray-700 to-stone-900',
    year: '2023',
    location: 'Нью-Йорк, США',
  },
]

export function getFeaturedRank(project: PortfolioProject): number {
  const candidates = [project.liveUrl, project.link].filter(Boolean) as string[]
  const idx = PORTFOLIO_PRIORITY_LINKS.findIndex((link) =>
    candidates.some((c) => normalizePortfolioLink(c) === normalizePortfolioLink(link))
  )
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

export function getFeaturedPortfolioProjects(): PortfolioProject[] {
  return PORTFOLIO_PRIORITY_LINKS.map((link) =>
    PORTFOLIO_PROJECTS.find((p) => {
      const candidates = [p.liveUrl, p.link].filter(Boolean) as string[]
      return candidates.some(
        (c) => normalizePortfolioLink(c) === normalizePortfolioLink(link)
      )
    })
  ).filter((p): p is PortfolioProject => p != null)
}

export function getCasePath(project: PortfolioProject): string {
  return `/portfolio/${project.slug}`
}

export function getSlugFromLink(link: string): string | null {
  if (link.startsWith('/portfolio/')) {
    return link.replace(/^\/portfolio\/?/, '').trim() || null
  }
  return null
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find(
    (p) => p.slug === slug || getSlugFromLink(p.link) === slug
  )
}

/** Индексируем только кейсы с живым сайтом; остальное — демо/концепты */
export function isIndexedPortfolioCase(project: PortfolioProject): boolean {
  return Boolean(project.liveUrl)
}

export function getIndexedPortfolioSlugs(): string[] {
  return PORTFOLIO_PROJECTS.filter(isIndexedPortfolioCase).map((p) => p.slug)
}

export function getAllPortfolioSlugs(): string[] {
  return PORTFOLIO_PROJECTS.map((p) => p.slug)
}

/** Соседние кейсы для навигации Back / Next на странице деталей */
export function getAdjacentPortfolioProjects(slug: string): {
  prev: PortfolioProject | null
  next: PortfolioProject | null
} {
  const slugs = getAllPortfolioSlugs()
  const index = slugs.indexOf(slug)
  if (index === -1) return { prev: null, next: null }

  const prevSlug = index > 0 ? slugs[index - 1] : null
  const nextSlug = index < slugs.length - 1 ? slugs[index + 1] : null

  return {
    prev: prevSlug ? getProjectBySlug(prevSlug) ?? null : null,
    next: nextSlug ? getProjectBySlug(nextSlug) ?? null : null,
  }
}
