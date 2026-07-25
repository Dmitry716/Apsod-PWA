import Link from 'next/link'
import Reveal from './Reveal'
import { formatDualPrice } from '../lib/currency'

/** Короткий lead-блок посреди главной — деловой запрос без ухода в конец страницы */
export default function HomeLeadStrip() {
  return (
    <section className="py-14 md:py-16 bg-slate-950 text-white relative overflow-hidden">
      <div className="apsod-mesh" aria-hidden>
        <div className="apsod-mesh-blob w-[360px] h-[360px] bg-blue-600/25 top-[-80px] right-[-40px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Есть задача по сайту, SEO или GEO?
          </h2>
          <p className="text-slate-300 mb-6 text-base md:text-lg">
            Короткий бриф — и смета за 1 рабочий день. Ориентир:{' '}
            {formatDualPrice(8000)} за лендинг, продвижение — на странице цен.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="apsod-cta-primary inline-flex px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-semibold"
            >
              <span>Обсудить проект</span>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex px-6 py-3 border border-white/25 hover:border-white/50 rounded-lg font-medium text-white/95"
            >
              Смотреть цены
            </Link>
            <a
              href="https://t.me/DMITRYJS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-6 py-3 border border-white/25 hover:border-white/50 rounded-lg font-medium text-white/95"
            >
              Написать в Telegram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
