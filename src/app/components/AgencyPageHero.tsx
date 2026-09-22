import LocaleLink from "./LocaleLink";

type Props = {
  title: string;
  crumb: string;
  note?: string;
  homeLabel?: string;
};

/**
 * Page hero — заголовок слева + калейдоскоп-анимация справа.
 * Второе слово заголовка — полупрозрачное.
 */
export default function AgencyPageHero({
  title,
  crumb,
  note,
  homeLabel = "Главная",
}: Props) {
  const titleParts = title.trim().split(/\s+/);
  const titleLead = titleParts
    .slice(0, Math.max(1, titleParts.length - 1))
    .join(" ");
  const titleTail =
    titleParts.length > 1 ? titleParts[titleParts.length - 1] : "";

  return (
    <section className="apsod-bleed-hero relative overflow-hidden text-white">
      <div className="apsod-arigo-hero-bg absolute inset-0" aria-hidden />
      <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />

      {/* ─── Калейдоскоп-анимация справа ─── */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        aria-hidden
      >
        <div className="apsod-kaleido absolute inset-0">
          <div className="apsod-kaleido__ring apsod-kaleido__ring--1" />
          <div className="apsod-kaleido__ring apsod-kaleido__ring--2" />
          <div className="apsod-kaleido__ring apsod-kaleido__ring--3" />
          <div className="apsod-kaleido__ring apsod-kaleido__ring--4" />
          <div className="apsod-kaleido__dot apsod-kaleido__dot--1" />
          <div className="apsod-kaleido__dot apsod-kaleido__dot--2" />
          <div className="apsod-kaleido__dot apsod-kaleido__dot--3" />
        </div>
      </div>

      {/* ─── Контент ─── */}
      <div
        className="relative z-10 mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-24"
        style={{ paddingTop: "calc(var(--apsod-header-h) + 4rem)" }}
      >
        {/* Хлебные крошки — слева */}
        <nav
          className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/55"
          aria-label="Breadcrumb"
        >
          <LocaleLink href="/" className="transition-colors hover:text-white">
            {homeLabel}
          </LocaleLink>
          <span className="text-white/25" aria-hidden>
            /
          </span>
          <span className="text-orange-300">{crumb}</span>
        </nav>

        {/* Заголовок — слева */}
        <h1 className="apsod-hero-enter font-display max-w-4xl text-balance text-left text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]">
          <span className="text-white">{titleLead}</span>
          {titleTail ? (
            <>
              {" "}
              <span className="text-white/40">{titleTail}</span>
            </>
          ) : null}
        </h1>

        {note ? (
          <p className="apsod-hero-enter mt-6 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
