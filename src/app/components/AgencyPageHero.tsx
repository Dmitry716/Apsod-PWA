import LocaleLink from './LocaleLink'

type Props = {
  title: string
  crumb: string
  note?: string
  homeLabel?: string
}

/** Arigo-style page hero — gradient stage + oversized title */
export default function AgencyPageHero({
  title,
  crumb,
  note,
  homeLabel = 'Главная',
}: Props) {
  return (
    <section className="apsod-bleed-hero relative overflow-hidden text-white">
      <div className="apsod-arigo-hero-bg absolute inset-0" aria-hidden />
      <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />

      <div
        className="relative z-10 mx-auto max-w-7xl px-4 pb-16 text-left md:px-8 md:pb-24"
        style={{ paddingTop: 'calc(var(--apsod-header-h) + 4rem)' }}
      >
        <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
          <LocaleLink href="/" className="transition-colors hover:text-white">
            {homeLabel}
          </LocaleLink>
          <span className="text-white/25" aria-hidden>
            /
          </span>
          <span className="text-orange-300">{crumb}</span>
        </p>
        <h1 className="font-display max-w-4xl text-[clamp(2.25rem,7vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
          {title}
        </h1>
        {note ? (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">{note}</p>
        ) : null}
      </div>
    </section>
  )
}
