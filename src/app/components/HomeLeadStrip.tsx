import Link from 'next/link'
import Reveal from './Reveal'
import { formatDualPrice } from '../lib/currency'

/** Lead с тремя явными путями: сайт / приложение / продвижение */
export default function HomeLeadStrip() {
  return (
    <section className="py-14 md:py-16 bg-slate-950 text-white relative overflow-hidden">
      <div className="apsod-mesh" aria-hidden>
        <div className="apsod-mesh-blob w-[360px] h-[360px] bg-blue-600/25 top-[-80px] right-[-40px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Что нужно вашему бизнесу?
          </h2>
          <p className="text-slate-300 text-base md:text-lg">
            Смета за 1 рабочий день. Ориентир: сайт {formatDualPrice(8000)}, продвижение — на
            странице цен.
          </p>
        </Reveal>

        <Reveal className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-6" stagger={2}>
          <Link
            href="/contact?goal=corporate"
            className="rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-4 text-center transition-colors"
          >
            <div className="text-2xl mb-1" aria-hidden>
              🌐
            </div>
            <div className="font-semibold">Разработка сайта</div>
            <div className="text-xs text-slate-400 mt-1">Лендинг · корп · магазин</div>
          </Link>
          <Link
            href="/contact?goal=mobile"
            className="rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-4 text-center transition-colors"
          >
            <div className="text-2xl mb-1" aria-hidden>
              📱
            </div>
            <div className="font-semibold">Мобильное приложение</div>
            <div className="text-xs text-slate-400 mt-1">iOS · Android · PWA</div>
          </Link>
          <Link
            href="/contact?goal=seo"
            className="rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-4 text-center transition-colors"
          >
            <div className="text-2xl mb-1" aria-hidden>
              📈
            </div>
            <div className="font-semibold">Продвижение</div>
            <div className="text-xs text-slate-400 mt-1">SEO · GEO · рост заявок</div>
          </Link>
        </Reveal>

        <Reveal className="flex flex-wrap justify-center gap-3" stagger={3}>
          <a
            href="https://t.me/DMITRYJS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-6 py-3 bg-blue-500 hover:bg-blue-400 rounded-lg font-semibold"
          >
            Написать в Telegram
          </a>
          <Link
            href="/pricing"
            className="inline-flex px-6 py-3 border border-white/25 hover:border-white/50 rounded-lg font-medium text-white/95"
          >
            Смотреть цены
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
