import { formatDualPrice } from './currency'

/** Короткие ответы — без воды; schema остаётся на главной */
export const HOMEPAGE_FAQ = [
  {
    question: 'На чём разрабатываете сайты?',
    answer: 'Next.js, React, TypeScript, Node.js — стек под задачу продукта.',
  },
  {
    question: 'Сколько стоит сайт?',
    answer: `Лендинг — ${formatDualPrice(8000)}, корпоративный — ${formatDualPrice(15000)}, магазин — ${formatDualPrice(23000)}. Точная смета после брифа.`,
  },
  {
    question: 'Сроки?',
    answer: 'Лендинг 2–4 недели, корпоративный 4–8 недель, магазин от 2–3 месяцев.',
  },
  {
    question: 'Делаете SEO и мобильные?',
    answer: 'Да: SEO в Яндексе и Google, iOS/Android и PWA. Смета после исследования.',
  },
  {
    question: 'Можно только поддержку?',
    answer: 'Да — обновления, мониторинг, доработки на JS-стеке.',
  },
] as const
