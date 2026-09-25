"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts, type BlogPost } from "../blog/data/posts";
import { t } from "../lib/i18n";
import { useLocale } from "../lib/useLocale";

type TileVariant = "overlay" | "cyan" | "light" | "dark";

function variantForIndex(index: number): TileVariant {
  const cycle: TileVariant[] = [
    "overlay",
    "cyan",
    "light",
    "dark",
    "overlay",
    "overlay",
  ];
  return cycle[index % cycle.length];
}

function animForIndex(index: number): string {
  const anims = [
    "apsod-journal-slide-left",
    "apsod-journal-slide-bottom",
    "apsod-journal-slide-right",
    "apsod-journal-slide-left",
    "apsod-journal-slide-bottom",
    "apsod-journal-slide-right",
  ];
  return anims[index % anims.length];
}

const SPAN = [
  "md:col-span-4",
  "md:col-span-5",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
] as const;

/** Метаданные карточки — монотипная строка сверху */
function CardMeta({
  post,
  locale,
  tone,
}: {
  post: BlogPost;
  locale: "ru" | "en";
  tone: "light" | "dark";
}) {
  const cls =
    tone === "light" ? "text-slate-500 dark:text-slate-400" : "text-white/70";
  return (
    <p
      className={`mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${cls}`}
    >
      {post.category}
      <span className="mx-2 opacity-50">·</span>
      {post.date}
      <span className="mx-2 opacity-50">·</span>
      {post.readTime} {locale === "en" ? "min" : "мин"}
    </p>
  );
}

/** Крупный номер карточки */
function CardNumber({
  index,
  tone,
}: {
  index: number;
  tone: "light" | "dark";
}) {
  const cls =
    tone === "light" ? "text-slate-900/10 dark:text-white/10" : "text-white/15";
  return (
    <span
      aria-hidden
      className={`absolute right-5 top-5 font-display text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ${cls}`}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

/** Карточка с фото — текст поверх */
function OverlayTile({
  post,
  locale,
  index,
}: {
  post: BlogPost;
  locale: "ru" | "en";
  index: number;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="apsod-journal-tile group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden p-7 transition-all duration-500 hover:shadow-[0_25px_60px_-30px_rgba(251,146,60,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black md:min-h-[380px] md:p-9 lg:min-h-[440px]"
      aria-label={`Читать статью: ${post.title}`}
    >
      <Image
        src={post.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        aria-hidden
        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      {/* Градиент затемнения снизу */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 transition-opacity duration-500 group-hover:opacity-90" />
      {/* Dot-grid поверх фото — IT-стиль */}
      <div className="apsod-journal-photo-dots absolute inset-0" aria-hidden />

      <CardNumber index={index} tone="dark" />

      <div className="relative z-10">
        <CardMeta post={post} locale={locale} tone="dark" />
        <h3 className="font-display mb-3 text-balance text-[1.4rem] font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-2xl lg:text-[1.75rem]">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-white/75 md:text-[15px]">
          {post.excerpt}
        </p>
        <span
          aria-hidden
          className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition-all duration-300 group-hover:gap-3 group-hover:text-white"
        >
          {locale === "en" ? "Read" : "Читать"}
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

/** Карточки без фото — разные градиенты под стиль сайта */
function TextTile({
  post,
  locale,
  index,
  variant,
}: {
  post: BlogPost;
  locale: "ru" | "en";
  index: number;
  variant: "cyan" | "light" | "dark";
}) {
  // Каждый вариант — свой «дорогой» градиент в стиле сайта
  const styles: Record<
    "cyan" | "light" | "dark",
    { shell: string; tone: "light" | "dark" }
  > = {
    cyan: {
      shell:
        "bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 text-white shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)]",
      tone: "dark",
    },
    light: {
      shell:
        "bg-white text-slate-950 border border-slate-200 dark:bg-[#0a101c] dark:text-white dark:border-white/10",
      tone: "light",
    },
    dark: {
      shell:
        "bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white dark:from-[#050a1f] dark:via-[#0a101c] dark:to-black",
      tone: "dark",
    },
  };

  const { shell, tone } = styles[variant];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`apsod-journal-tile group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden p-7 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_25px_60px_-30px_rgba(251,146,60,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black md:min-h-[380px] md:p-9 lg:min-h-[440px] ${shell}`}
      aria-label={`Читать статью: ${post.title}`}
    >
      {/* Dot-grid фон внутри карточки */}
      <div
        className="apsod-journal-card-dots absolute inset-0 opacity-40"
        aria-hidden
      />

      <CardNumber index={index} tone={tone} />

      <div className="relative z-10">
        <CardMeta post={post} locale={locale} tone={tone} />
        <h3 className="font-display mb-4 text-balance text-[1.4rem] font-extrabold uppercase leading-[1.1] tracking-tight md:text-2xl lg:text-[1.75rem]">
          {post.title}
        </h3>
        <p
          className={`line-clamp-4 text-sm leading-relaxed md:text-[15px] ${
            tone === "light"
              ? "text-slate-600 dark:text-white/60"
              : "text-white/80"
          }`}
        >
          {post.excerpt}
        </p>
      </div>

      <span
        aria-hidden
        className={`relative z-10 mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 group-hover:gap-3 ${
          tone === "light"
            ? "text-slate-700 group-hover:text-orange-500 dark:text-white/70 dark:group-hover:text-orange-300"
            : "text-white/70 group-hover:text-white"
        }`}
      >
        {locale === "en" ? "Read" : "Читать"}
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

export default function HomeJournal() {
  const { locale } = useLocale();
  const posts = blogPosts.slice(0, 6);

  return (
    <section
      id="journal"
      className="apsod-journal-bg relative scroll-mt-24 overflow-hidden border-t border-slate-200 bg-slate-50 text-slate-900 transition-colors dark:border-white/10 dark:bg-black dark:text-white"
    >
      {/* Dot-grid фон */}
      <div
        className="apsod-journal-dots pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-slate-400 dark:text-white/45">
                05
              </span>
              <span
                className="h-px w-16 bg-slate-200 dark:bg-white/15"
                aria-hidden
              />
            </div>
            <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-slate-900 dark:text-white">
              {t(locale, "home.journal.titleLead")}{" "}
              <span className="text-slate-400 dark:text-white/40">
                {t(locale, "home.journal.titleAccent")}
              </span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-700 transition-all hover:border-orange-400/60 hover:bg-orange-50 hover:text-orange-600 dark:border-white/20 dark:text-white/70 dark:hover:border-orange-400/40 dark:hover:bg-orange-400/10 dark:hover:text-orange-300"
          >
            {t(locale, "home.journal.viewMore")}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* ─── Мозаика ─── */}
      <div className="relative grid grid-cols-1 border-y border-slate-200 dark:border-white/10 md:grid-cols-12">
        {posts.map((post, index) => {
          const variant = variantForIndex(index);
          const isOverlay = variant === "overlay";
          return (
            <div
              key={post.slug}
              className={`apsod-journal-card ${animForIndex(index)} border-b border-slate-200 dark:border-white/10 md:border-r md:border-slate-200 dark:md:border-white/10 ${SPAN[index] ?? "md:col-span-4"}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {isOverlay ? (
                <OverlayTile post={post} locale={locale} index={index} />
              ) : (
                <TextTile
                  post={post}
                  locale={locale}
                  index={index}
                  variant={variant as "cyan" | "light" | "dark"}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
