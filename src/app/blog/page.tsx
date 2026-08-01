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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Блог', path: '/blog' },
        ]}
      />

      <section className="pt-10 pb-8 md:pb-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            {locale === 'en' ? 'Insights' : 'Блог'}
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
            {t(locale, 'blog.subtitle')}
          </p>

          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-6">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 text-sm transition-colors rounded-md border ${
                  activeCategory === cat.slug
                    ? 'apsod-btn-solid border-transparent'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {filteredPosts.map((post, index) => {
              const pos = index + 1
              const isFeaturedWide = pos % 4 === 1
              const isFeaturedAlt = pos % 8 === 1
              const isOverlay = pos % 8 === 7

              if (isFeaturedWide) {
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group w-full flex flex-col md:flex-row ${
                      isFeaturedAlt ? 'md:flex-row' : 'md:flex-row-reverse'
                    } ${
                      isFeaturedAlt
                        ? 'bg-slate-950 dark:bg-slate-900'
                        : 'bg-slate-900 dark:bg-slate-800'
                    }`}
                  >
                    <div className="md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-between min-h-[280px]">
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-4">
                          {post.category}
                        </p>
                        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug group-hover:underline decoration-1 underline-offset-4">
                          {post.title}
                        </h2>
                        <p className="mt-5 text-sm md:text-base text-white/70 leading-relaxed line-clamp-3 max-w-lg">
                          {post.excerpt}
                        </p>
                      </div>
                      <p className="mt-8 text-sm font-medium text-white/60">
                        {post.date}
                        <span className="mx-2">·</span>
                        {post.readTime} {locale === 'en' ? 'min read' : 'мин'}
                      </p>
                    </div>
                    <div className="md:w-1/2 relative min-h-[240px] md:min-h-[360px] overflow-hidden bg-slate-800">
                      <img
                        src={post.image}
                        alt=""
                        loading={index < 2 ? 'eager' : 'lazy'}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                )
              }

              if (isOverlay) {
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group relative w-full md:w-1/3 min-h-[340px] overflow-hidden flex flex-col justify-end"
                  >
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/70" />
                    <div className="relative z-10 p-8 md:p-9">
                      <h2 className="font-display text-xl font-bold text-white tracking-tight leading-snug mb-4 group-hover:underline decoration-1 underline-offset-4">
                        {post.title}
                      </h2>
                      <p className="text-sm text-white/65 line-clamp-2 mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <p className="text-sm font-medium text-white/55">{post.date}</p>
                    </div>
                  </Link>
                )
              }

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group w-full md:w-1/3 flex flex-col-reverse bg-slate-100 dark:bg-slate-900/80"
                >
                  <div className="relative min-h-[220px] md:min-h-[260px] overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 md:p-9 flex flex-col flex-1">
                    <h2 className="font-display text-xl md:text-[1.35rem] font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-4 group-hover:underline decoration-1 underline-offset-4">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 pt-2">
                      {post.date}
                      <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
                      {post.category}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-slate-500 dark:text-slate-400 py-16 text-center">
              {locale === 'en' ? 'No articles in this category.' : 'В этой категории пока нет статей.'}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
