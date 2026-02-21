import Link from "next/link";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Блог | APSOD',
  description: 'Статьи о веб-разработке, искусственном интеллекте, современных технологиях и трендах в IT индустрии.',
}

// Все статьи блога
const blogPosts = [
  {
    slug: 'gpt-5-revolution-web-development',
    title: 'GPT-5 и революция в веб-разработке: что изменится в 2026',
    excerpt: 'Анализ возможностей GPT-5 и его влияния на создание веб-приложений, автоматизацию кодинга и роль разработчика.',
    author: 'Дмитрий Карелин',
    date: '2026-02-21',
    readTime: 8,
    category: 'AI',
    tags: ['GPT-5', 'Искусственный интеллект', 'Будущее разработки'],
    image: '/blog/gpt5.jpg',
    icon: '🤖'
  },
  {
    slug: 'neural-interfaces-web',
    title: 'Нейроинтерфейсы в вебе: как управлять сайтом силой мысли',
    excerpt: 'Обзор технологии Brain-Computer Interface (BCI) и её интеграции с веб-приложениями. Первые эксперименты и будущее.',
    author: 'Анна Смирнова',
    date: '2026-02-18',
    readTime: 10,
    category: 'AI',
    tags: ['Нейроинтерфейсы', 'BCI', 'Инновации'],
    image: '/blog/neural.jpg',
    icon: '🧠'
  },
  {
    slug: 'ai-code-assistants-2026',
    title: 'AI-ассистенты программиста: Copilot, Codeium и будущее парного программирования',
    excerpt: 'Сравнение лучших AI-инструментов для разработчиков в 2026 году. Как они меняют процесс написания кода.',
    author: 'Максим Петров',
    date: '2026-02-15',
    readTime: 7,
    category: 'AI',
    tags: ['AI ассистенты', 'GitHub Copilot', 'Codeium', 'Productivity'],
    image: '/blog/ai-assistants.jpg',
    icon: '👨‍💻'
  },
  {
    slug: 'webassembly-2026',
    title: 'WebAssembly 2.0: запускаем десктопные приложения в браузере',
    excerpt: 'Новые возможности WASM, интеграция с Java, Python и запуск тяжелых приложений прямо в браузере с нативной скоростью.',
    author: 'Дмитрий Карелин',
    date: '2026-02-12',
    readTime: 9,
    category: 'Web Development',
    tags: ['WebAssembly', 'WASM', 'Высокая производительность'],
    image: '/blog/wasm.jpg',
    icon: '⚡'
  },
  {
    slug: 'ai-personalization-2026',
    title: 'Гиперперсонализация на основе AI: как нейросети предсказывают желания пользователей',
    excerpt: 'Технологии real-time персонализации контента с использованием машинного обучения. От рекомендаций до предсказаний.',
    author: 'Екатерина Волкова',
    date: '2026-02-09',
    readTime: 6,
    category: 'AI',
    tags: ['Персонализация', 'Machine Learning', 'UX'],
    image: '/blog/personalization.jpg',
    icon: '🎯'
  },
  {
    slug: 'quantum-web',
    title: 'Квантовые вычисления и веб: готовимся к пост-квантовой эре',
    excerpt: 'Как квантовые компьютеры изменят веб-безопасность, криптографию и обработку данных. Что нужно знать разработчикам.',
    author: 'Дмитрий Карелин',
    date: '2026-02-06',
    readTime: 11,
    category: 'Future Tech',
    tags: ['Квантовые вычисления', 'Криптография', 'Будущее'],
    image: '/blog/quantum.jpg',
    icon: '⚛️'
  },
  {
    slug: 'serverless-ai',
    title: 'Serverless AI: как запускать нейросети без серверов',
    excerpt: 'Практическое руководство по развертыванию AI-моделей в serverless-среде. Экономия, масштабирование и примеры.',
    author: 'Анна Смирнова',
    date: '2026-02-03',
    readTime: 8,
    category: 'DevOps',
    tags: ['Serverless', 'AI', 'AWS Lambda', 'Cloud'],
    image: '/blog/serverless.jpg',
    icon: '☁️'
  },
  {
    slug: 'edge-computing-2026',
    title: 'Edge computing: почему вычисления на краю сети меняют веб',
    excerpt: 'Как обработка данных на устройствах пользователей ускоряет приложения и снижает нагрузку на серверы.',
    author: 'Максим Петров',
    date: '2026-01-30',
    readTime: 7,
    category: 'Infrastructure',
    tags: ['Edge computing', 'CDN', 'Performance'],
    image: '/blog/edge.jpg',
    icon: '🌐'
  },
  {
    slug: 'ai-ux-design',
    title: 'AI в UX/UI дизайне: от автоматической генерации до A/B тестирования',
    excerpt: 'Как нейросети помогают создавать интерфейсы, генерировать дизайн и предсказывать поведение пользователей.',
    author: 'Екатерина Волкова',
    date: '2026-01-27',
    readTime: 6,
    category: 'Design',
    tags: ['UX/UI', 'AI дизайн', 'Figma AI'],
    image: '/blog/ai-ux.jpg',
    icon: '🎨'
  },
  {
    slug: 'web3-2026',
    title: 'Web3 и децентрализация: реальные применения в 2026',
    excerpt: 'Обзор работающих Web3-проектов: децентрализованные соцсети, хранение данных и идентификация без блокчейна.',
    author: 'Дмитрий Карелин',
    date: '2026-01-24',
    readTime: 9,
    category: 'Web3',
    tags: ['Web3', 'Децентрализация', 'Blockchain'],
    image: '/blog/web3.jpg',
    icon: '🔗'
  }
];

export default function BlogPage() {
  // Сортируем по дате (новые сверху)
  const sortedPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero секция */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Блог{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                APSOD
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Статьи о веб-разработке, искусственном интеллекте и технологиях будущего
            </p>
          </div>
        </div>
      </section>

      {/* Фильтры по категориям */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              Все статьи
            </button>
            <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              AI
            </button>
            <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Web Development
            </button>
            <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Future Tech
            </button>
            <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              DevOps
            </button>
            <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Design
            </button>
          </div>
        </div>
      </section>

      {/* Сетка статей */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post, idx) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30">
                      {post.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.readTime} мин чтения
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all inline-flex items-center">
                        Читать
                        <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}