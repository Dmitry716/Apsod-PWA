/** Общее позиционирование APSOD (RU / EN) — без указания численности штата */

export const POSITIONING = {
  ru: {
    badge: 'Software engineering',
    /** Одна фраза в духе enterprise (как у крупных engineering-компаний) */
    heroTitle:
      'Мы проектируем и выпускаем digital-продукты для бизнеса — от стратегии до сопровождения',
    heroLead:
      'Сайты, приложения и digital-контуры на собственном коде: исследование, инженерия, безопасность, SEO и поддержка в эксплуатации.',
    heroTopics: [
      { label: 'Веб-разработка', href: '/services/web-development' },
      { label: 'Мобильные продукты', href: '/services/mobile-development' },
      { label: 'SEO и рост', href: '/services/seo' },
      { label: 'GEO в нейросетях', href: '/services/geo-promotion' },
    ],
    ctaPrimary: 'Связаться с нами',
    ctaSecondary: 'Смотреть кейсы',
    servicesTitle: 'Наши услуги',
    servicesSubtitle:
      'Инженерные практики полного цикла: продукт, рост и сопровождение в одной логике delivery',
    lifecycleTitle: 'Как мы работаем',
    lifecycleSubtitle:
      'Прозрачный delivery: сначала смысл и метрики, затем продукт и безопасность, затем рост и поддержка',
    principlesTitle: 'Подход APSOD',
    principles: [
      {
        title: 'Продукт как система',
        body: 'Собираем digital-контур целиком: цели, структура, заявки, аналитика, SEO и сопровождение после запуска.',
      },
      {
        title: 'Собственная разработка',
        body: 'Индивидуальная архитектура и дизайн под бизнес. Конструкторы и типовые темы не используем.',
      },
      {
        title: 'Качество в эксплуатации',
        body: 'Код-ревью, QA, защищённые интеграции, контроль доступа и резервное копирование — дисциплина продуктовой инженерии.',
      },
    ],
    lifecycle: [
      {
        step: '01',
        title: 'Discovery и стратегия',
        body: 'Цели бизнеса, аудитория, конкуренты, KPI, границы scope и структура будущего продукта.',
      },
      {
        step: '02',
        title: 'Архитектура и UX/UI',
        body: 'Прототипы, дизайн-система, сценарии пользователя, технические требования и интеграции.',
      },
      {
        step: '03',
        title: 'Инженерия и QA',
        body: 'Собственный код, интеграции, тестирование, производительность и устойчивость к нагрузкам.',
      },
      {
        step: '04',
        title: 'Запуск и рост',
        body: 'Индексация, Яндекс и Google, цели в аналитике, публикация и контроль релиза.',
      },
      {
        step: '05',
        title: 'Сопровождение',
        body: 'Мониторинг, обновления, доработки и развитие функционала по данным эксплуатации.',
      },
    ],
  },
  en: {
    badge: 'Software engineering',
    heroTitle:
      'We design and ship digital products for business — from strategy to ongoing support',
    heroLead:
      'Websites, apps and digital systems on custom code: research, engineering, security, SEO and production support.',
    heroTopics: [
      { label: 'Web development', href: '/services/web-development' },
      { label: 'Mobile products', href: '/services/mobile-development' },
      { label: 'SEO & growth', href: '/services/seo' },
      { label: 'GEO in AI', href: '/services/geo-promotion' },
    ],
    ctaPrimary: 'Contact us',
    ctaSecondary: 'View case studies',
    servicesTitle: 'Our services',
    servicesSubtitle:
      'Full-cycle engineering practices: product, growth and support in one delivery logic',
    lifecycleTitle: 'How we work',
    lifecycleSubtitle:
      'Clear delivery: meaning and metrics first, then product and security, then growth and support',
    principlesTitle: 'The APSOD approach',
    principles: [
      {
        title: 'Product as a system',
        body: 'We assemble the digital channel end to end: goals, structure, lead flow, analytics, SEO and post-launch support.',
      },
      {
        title: 'Custom development',
        body: 'Architecture and design built for your business. We do not use page builders or stock themes.',
      },
      {
        title: 'Quality in production',
        body: 'Review, QA, hardened integrations, access control and backups — the discipline of product engineering.',
      },
    ],
    lifecycle: [
      {
        step: '01',
        title: 'Discovery & strategy',
        body: 'Business goals, audience, competitors, KPIs, scope boundaries and product structure.',
      },
      {
        step: '02',
        title: 'Architecture & UX/UI',
        body: 'Prototypes, design system, user flows, technical requirements and integrations.',
      },
      {
        step: '03',
        title: 'Engineering & QA',
        body: 'Custom code, integrations, testing, performance and resilience under load.',
      },
      {
        step: '04',
        title: 'Launch & growth',
        body: 'Indexing, Yandex and Google, analytics goals, release and go-live control.',
      },
      {
        step: '05',
        title: 'Ongoing support',
        body: 'Monitoring, updates, iterations and feature growth from production data.',
      },
    ],
  },
} as const
