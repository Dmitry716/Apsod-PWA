import Link from 'next/link'

/** Тонкая плашка новинки — по мотиву сильных агентских витрин (GEO) */
export default function HomeGeoBanner() {
  return (
    <div className="relative z-20 border-b border-violet-500/30 bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] uppercase tracking-wide">
            New
          </span>
          GEO в нейросетях
        </span>
        <span className="hidden sm:inline text-white/80">—</span>
        <span className="text-white/90 text-center">
          Узнайте, видит ли бренд ChatGPT, Google AI и Алиса
        </span>
        <Link
          href="/services/geo-promotion"
          className="font-semibold underline underline-offset-2 hover:text-white whitespace-nowrap"
        >
          Подробнее →
        </Link>
      </div>
    </div>
  )
}
