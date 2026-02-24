import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '../data/posts'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Статья не найдена | APSOD',
    }
  }

  return {
    title: post.title + ' | APSOD Блог',
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Похожие статьи (из той же категории, исключая текущую)
  const relatedPosts = blogPosts
    .filter(p => p.categorySlug === post.categorySlug && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Хлебные крошки с правильными отступами */}
      <div className="container mx-auto px-4 pt-24 md:pt-32">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 overflow-x-auto pb-2">
          <Link href="/" className="hover:text-blue-600 whitespace-nowrap">Главная</Link>
          <span className="whitespace-nowrap">/</span>
          <Link href="/blog" className="hover:text-blue-600 whitespace-nowrap">Блог</Link>
          <span className="whitespace-nowrap">/</span>
          <span className="text-gray-700 dark:text-gray-300 truncate">{post.title}</span>
        </div>
      </div>

      {/* Статья с правильными отступами для мобильных */}
      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Заголовок и мета-информация */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
              <span className="px-3 py-1 md:px-4 md:py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs md:text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">•</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">{post.date}</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-base md:text-xl font-bold shrink-0">
                  {post.author[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{post.author}</p>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{post.readTime} мин чтения</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Изображение (заглушка) с отступами */}
          <div className="h-48 md:h-64 lg:h-96 bg-linear-to-br from-blue-400 to-purple-500 rounded-xl md:rounded-2xl mb-6 md:mb-8 flex items-center justify-center">
            <span className="text-5xl md:text-7xl lg:text-9xl opacity-30">{post.icon}</span>
          </div>

          {/* Контент статьи с адаптивными размерами текста */}
          <div 
            className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none mb-8 md:mb-12 px-2 md:px-0"
            style={{ 
              color: 'var(--text-primary)',
              backgroundColor: 'transparent'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Навигация по статье */}
          <div className="flex justify-between items-center pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all group text-sm md:text-base"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад к блогу
            </Link>
          </div>

          {/* Похожие статьи с адаптивной сеткой */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 md:mt-16">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                Похожие статьи
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {relatedPosts.map(related => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="h-24 sm:h-28 md:h-32 bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl opacity-30">{related.icon}</span>
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors text-sm md:text-base line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-2">
                        {related.readTime} мин чтения
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}