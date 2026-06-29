export type DevelopmentPhase = {
  step: number
  title: string
  subtitle: string
  description: string
  deliverables: string[]
}

export const WEB_DEVELOPMENT_PROCESS: DevelopmentPhase[] = [
  {
    step: 1,
    title: 'Discovery и бизнес-анализ',
    subtitle: 'Погружение в задачу',
    description:
      'Проводим воркшопы со стейкхолдерами, фиксируем бизнес-цели, KPI и ограничения. Анализируем аудиторию, конкурентов и пользовательские сценарии — как на этапе pre-sales в enterprise-проектах.',
    deliverables: [
      'Product Vision & Scope',
      'Карта стейкхолдеров',
      'Бизнес-требования и KPI',
      'Анализ конкурентов',
    ],
  },
  {
    step: 2,
    title: 'Экспертиза и технический аудит',
    subtitle: 'Оценка рисков и возможностей',
    description:
      'Изучаем текущую IT-инфраструктуру, интеграции, legacy-системы и требования безопасности. Формируем рекомендации по архитектуре и оцениваем feasibility будущего решения.',
    deliverables: [
      'Technical Audit Report',
      'Карта интеграций',
      'Оценка рисков и зависимостей',
      'Рекомендации по стеку',
    ],
  },
  {
    step: 3,
    title: 'Проектирование решения',
    subtitle: 'Архитектура и ТЗ',
    description:
      'Разрабатываем системную архитектуру, структуру данных и API. Готовим детальное ТЗ, backlog, roadmap и коммерческую оценку в формате, принятом в крупных интеграторах.',
    deliverables: [
      'Solution Architecture Document',
      'Техническое задание (SRS)',
      'Backlog и roadmap',
      'Оценка сроков и этапов',
    ],
  },
  {
    step: 4,
    title: 'UX/UI и прототипирование',
    subtitle: 'Проектирование интерфейса',
    description:
      'Строим Customer Journey Map, wireframes и UI-kit. Создаём интерактивный прототип в Figma и согласовываем UX до начала разработки — чтобы снизить переделки на 40–60%.',
    deliverables: [
      'CJM и user flows',
      'Wireframes и UI-kit',
      'Кликабельный прототип',
      'UI-спецификация для разработки',
    ],
  },
  {
    step: 5,
    title: 'Agile-разработка',
    subtitle: 'Спринты и прозрачность',
    description:
      'Работаем по Scrum: спринты 2 недели, daily stand-ups, демо и ретроспективы. Code review, CI/CD, ветвление Git Flow — стандарты, которые применяют продуктовые команды в крупных IT-компаниях.',
    deliverables: [
      'Инкременты каждые 2 недели',
      'Code review и unit-тесты',
      'Staging-среда',
      'Документация API',
    ],
  },
  {
    step: 6,
    title: 'QA и тестирование',
    subtitle: 'Контроль качества',
    description:
      'Многоуровневое тестирование: функциональное, регрессионное, кроссбраузерное, нагрузочное и security-проверки. UAT с заказчиком перед выходом в production.',
    deliverables: [
      'Test Plan и чек-листы',
      'Автотесты критичных сценариев',
      'Отчёт о дефектах',
      'UAT и sign-off',
    ],
  },
  {
    step: 7,
    title: 'Запуск и DevOps',
    subtitle: 'Production-ready',
    description:
      'Настраиваем CI/CD, мониторинг, логирование и резервное копирование. Проводим плавный релиз на production с планом отката и обучением команды заказчика.',
    deliverables: [
      'Production-деплой',
      'Мониторинг и алерты',
      'Runbook и инструкции',
      'Обучение администраторов',
    ],
  },
  {
    step: 8,
    title: 'Поддержка и развитие',
    subtitle: 'Hypercare и SLA',
    description:
      'Гарантийный период hypercare после запуска, затем техподдержка по SLA. Аналитика, A/B-тесты, SEO-доработки и планирование следующих итераций продукта.',
    deliverables: [
      'SLA и регламент поддержки',
      'Аналитика и отчёты',
      'План развития v2',
      'Регулярные релизы',
    ],
  },
]

export const MOBILE_DEVELOPMENT_PROCESS: DevelopmentPhase[] = [
  {
    step: 1,
    title: 'Discovery и бизнес-анализ',
    subtitle: 'От идеи к продуктовой гипотезе',
    description:
      'Определяем ценность приложения для пользователя и бизнеса. Анализируем App Store / Google Play, целевую аудиторию и монетизацию. Формируем MVP-scope и метрики успеха.',
    deliverables: [
      'Product Canvas',
      'Анализ конкурентов в сторах',
      'MVP Scope и KPI',
      'Портреты пользователей',
    ],
  },
  {
    step: 2,
    title: 'Экспертиза и технический аудит',
    subtitle: 'Выбор платформы и стека',
    description:
      'Оцениваем native vs cross-platform (React Native / Flutter / Swift / Kotlin). Проверяем требования сторов, push-уведомления, офлайн-режим, интеграции с CRM и платёжными системами.',
    deliverables: [
      'Platform & Stack Recommendation',
      'Архитектура мобильного приложения',
      'Карта интеграций и API',
      'Compliance (GDPR, 152-ФЗ, App Store Guidelines)',
    ],
  },
  {
    step: 3,
    title: 'Проектирование и ТЗ',
    subtitle: 'Документация уровня enterprise',
    description:
      'Готовим детальное ТЗ: экраны, навигация, состояния, push-сценарии, deep links. Планируем релизы по фазам и оцениваем трудозатраты по модулям.',
    deliverables: [
      'Mobile SRS / Feature Spec',
      'Backlog по экранам',
      'Roadmap релизов',
      'Оценка и план спринтов',
    ],
  },
  {
    step: 4,
    title: 'UX/UI дизайн',
    subtitle: 'Human Interface Guidelines',
    description:
      'Проектируем UX с учётом iOS HIG и Material Design. Адаптивные макеты, dark mode, accessibility. Интерактивный прототип для тестирования с фокус-группой.',
    deliverables: [
      'User flows и wireframes',
      'UI-kit iOS / Android',
      'Интерактивный прототип',
      'Design Handoff для разработки',
    ],
  },
  {
    step: 5,
    title: 'Agile-разработка',
    subtitle: 'Спринты и CI/CD',
    description:
      'Разработка по Scrum с демо каждые 2 недели. TestFlight / Internal Testing для iOS, Firebase App Distribution для Android. Code review, автотесты, feature flags.',
    deliverables: [
      'Build каждые 2 недели',
      'Beta-версии для тестирования',
      'Автотесты и CI pipeline',
      'Техническая документация',
    ],
  },
  {
    step: 6,
    title: 'QA и тестирование',
    subtitle: 'Качество на всех устройствах',
    description:
      'Тестирование на реальных устройствах iOS и Android: функциональное, регрессионное, тестирование сети (3G/4G/Wi‑Fi/offline), производительность и безопасность данных.',
    deliverables: [
      'Device Matrix и Test Plan',
      'Crash-free rate > 99%',
      'Security audit',
      'UAT с заказчиком',
    ],
  },
  {
    step: 7,
    title: 'Публикация в сторах',
    subtitle: 'App Store & Google Play',
    description:
      'Подготовка метаданных, скриншотов, политики конфиденциальности. Прохождение модерации Apple и Google. ASO-оптимизация и настройка аналитики (Firebase / AppMetrica).',
    deliverables: [
      'Релиз в App Store и Google Play',
      'ASO: иконка, описание, ключевые слова',
      'Аналитика и crash reporting',
      'План обновлений',
    ],
  },
  {
    step: 8,
    title: 'Поддержка и развитие',
    subtitle: 'Post-launch & SLA',
    description:
      'Мониторинг отзывов и крашей, оперативные hotfix-релизы. Адаптация под новые версии iOS/Android. Планирование фич v2 по данным аналитики.',
    deliverables: [
      'SLA техподдержки',
      'Регулярные обновления ОС',
      'Отчёты по метрикам',
      'Roadmap развития продукта',
    ],
  },
]
