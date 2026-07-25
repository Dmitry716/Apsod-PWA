"use client";

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts } from './data/posts';
import { t } from '../lib/i18n';
import { useLocale } from '../lib/useLocale';
import PageBreadcrumbs from '../components/PageBreadcrumbs';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { locale } = useLocale();

  const categories = [
    { slug: 'all', name: t(locale, 'blog.categories.all'), count: blogPosts.length },
    { slug: 'business', name: t(locale, 'blog.categories.business'), count: blogPosts.filter(p => p.categorySlug === 'business').length },
    { slug: 'pwa', name: t(locale, 'blog.categories.pwa'), count: blogPosts.filter(p => p.categorySlug === 'pwa').length },
    { slug: 'seo', name: t(locale, 'blog.categories.seo'), count: blogPosts.filter(p => p.categorySlug === 'seo').length },
    { slug: 'support', name: t(locale, 'blog.categories.support'), count: blogPosts.filter(p => p.categorySlug === 'support').length },
  ];

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.categorySlug === activeCategory);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Блог', path: '/blog' },
        ]}
      />

      {/* Hero секция */}
      <section className="relative pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              {t(locale, 'blog.title')}{' '}
              <span className="text-blue-600 dark:text-blue-400">
                APSOD
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t(locale, 'blog.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Сетка статей */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-48 bg-linear-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-black/10" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 text-gray-900 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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
                        {t(locale, 'blog.read')}
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