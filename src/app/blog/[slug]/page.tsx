import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { blogPosts } from "../data/posts";
import SeoJsonLd from "../../components/SeoJsonLd";
import BlogShare from "../../components/BlogShare";
import BlogPostSidebar, {
  getRecentPosts,
} from "../../components/BlogPostSidebar";
import {
  buildPageMetadata,
  generateArticleSchema,
  generateBreadcrumbSchema,
  SITE_NAME,
  SITE_URL,
} from "../../lib/seo";
import { blogPostSnippet } from "../../lib/page-snippets";
import { normalizeLocale, t } from "../../lib/i18n";
import ReadingProgress from "@/app/components/blog/ReadingProgress";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Статья не найдена" };
  }

  const snippet = blogPostSnippet(post.title, post.excerpt);
  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    path: `/blog/${post.slug}`,
    keywords: [...(snippet.keywords ?? []), ...post.tags],
    ogType: "article",
    publishedTime: post.date,
    images: [post.image],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value ?? null;
  const locale = normalizeLocale(cookieLang);
  const isEn = locale === "en";

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(post, 2);
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    author: SITE_NAME,
    date: post.date,
    image: post.image,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Блог", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-[var(--bg-primary)]">
      <ReadingProgress />
      <SeoJsonLd data={[articleSchema, breadcrumbSchema]} />

      <article>
        {/* Hero — обложка статьи */}
        {/* <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex w-screen -mt-16 min-h-[420px] items-center justify-center overflow-hidden bg-slate-950 md:-mt-20 md:min-h-[520px] lg:min-h-[580px]">
          <img
            src={post.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-slate-950/55" aria-hidden />
          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 pt-24 text-center md:pb-20 md:pt-28">
            <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {post.title}
            </h1>
            <p className="mt-6 text-sm font-medium text-white/85 md:mt-8 md:text-base">
              {post.date}
            </p>
          </div>
        </section> */}
        {/* Hero — обложка статьи */}
        <section className="apsod-bleed-hero relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex w-screen min-h-[520px] items-end overflow-hidden bg-slate-950 md:min-h-[620px] lg:min-h-[680px]">          <Image
            src={post.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/95"
            aria-hidden
          />
          <div
            className="apsod-grain absolute inset-0 opacity-30"
            aria-hidden
          />

          <div
            className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 md:px-8 md:pb-20"
            style={{ paddingTop: "calc(var(--apsod-header-h) + 3rem)" }}
          >
            {/* Breadcrumbs */}
            <nav
              className="mb-8 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/55"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="transition-colors hover:text-white">
                {isEn ? "Home" : "Главная"}
              </Link>
              <span className="text-white/25" aria-hidden>
                /
              </span>
              <Link href="/blog" className="transition-colors hover:text-white">
                {isEn ? "Blog" : "Блог"}
              </Link>
            </nav>

            {/* Category pill + meta */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-orange-300/40 bg-orange-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-200 backdrop-blur-sm">
                {post.category}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/60">
                {post.date}
                <span className="mx-2 opacity-50">·</span>
                {post.readTime} {isEn ? "min read" : "мин чтения"}
              </span>
            </div>

            {/* H1 с акцентным последним словом */}
            <h1 className="font-display max-w-4xl text-balance text-[clamp(1.75rem,4.5vw,3.5rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-white">
              {post.title}
            </h1>
          </div>
        </section>

        {/* Контент + сайдбар */}
        <section className="pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="container mx-auto px-4 lg:px-8">
            <nav
              className="mb-10 flex items-center gap-2 overflow-x-auto pb-2 text-sm text-slate-500 dark:text-slate-400 md:mb-12"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="whitespace-nowrap hover:text-slate-900 dark:hover:text-white"
              >
                {t(locale, "blog.breadcrumb.home")}
              </Link>
              <span aria-hidden>/</span>
              <Link
                href="/blog"
                className="whitespace-nowrap hover:text-slate-900 dark:hover:text-white"
              >
                {t(locale, "blog.breadcrumb.blog")}
              </Link>
              <span aria-hidden>/</span>
              <span className="truncate text-slate-700 dark:text-slate-300">
                {post.title}
              </span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
              <div className="min-w-0 lg:col-span-8">
                {/* Мета */}
                <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <Link
                    href="/blog"
                    className="inline-flex rounded-sm bg-[var(--apsod-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white"
                  >
                    {post.category}
                  </Link>
                  <span>{SITE_NAME}</span>
                  <span>{post.date}</span>
                  <span>
                    {post.readTime} {isEn ? "min read" : "мин чтения"}
                  </span>
                </div>

                {/* Кратко — Callout */}
                <blockquote className="blog-callout blog-callout--info mb-10">
                  <div className="blog-callout__label">
                    <span aria-hidden="true">💡</span>
                    {isEn ? "Quick summary" : "Кратко"}
                  </div>
                  <p className="!mb-0 text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
                    {post.excerpt}
                  </p>
                </blockquote>

                {/* Контент статьи */}
                <div
                  className="blog-prose prose prose-slate mb-12 max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-[var(--apsod-accent)] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-[var(--apsod-accent)] prose-blockquote:bg-slate-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic dark:prose-blockquote:bg-slate-900/50"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Теги */}
                {post.tags.length > 0 ? (
                  <div className="mb-12 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-8 dark:border-slate-800">
                    <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {isEn ? "Tagged with:" : "Теги:"}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link key={tag} href="/blog" className="blog-tag">
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Недавние статьи */}
                {recentPosts.length > 0 ? (
                  <div className="mb-12">
                    <h2 className="font-display mb-8 text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
                      {isEn ? "Recent posts" : "Недавние статьи"}
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {recentPosts.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/blog/${item.slug}`}
                          className="blog-related-card group"
                        >
                          <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-md">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                              sizes="(max-width: 640px) 100vw, 40vw"
                            />
                          </div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--apsod-accent)]">
                            {item.category}
                          </p>
                          <h3 className="font-display mb-2 text-lg font-bold leading-snug tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-[var(--apsod-accent)]">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {item.date} · {item.readTime} {isEn ? "min" : "мин"}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                <BlogShare
                  url={articleUrl}
                  title={post.title}
                  locale={isEn ? "en" : "ru"}
                />

                <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-slate-900 underline-offset-4 hover:underline dark:text-white"
                  >
                    ← {t(locale, "blog.backToBlog")}
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4">
                <BlogPostSidebar currentSlug={post.slug} locale={locale} />
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
