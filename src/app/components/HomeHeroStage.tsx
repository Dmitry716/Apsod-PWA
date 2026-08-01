import Image from 'next/image'
import Link from 'next/link'

/** Hero product stage — craft shown, not described */
export default function HomeHeroStage() {
  return (
    <div className="relative apsod-hero-enter apsod-hero-enter-delay-3 w-full max-w-xl mx-auto lg:max-w-none">
      <div className="apsod-device-float relative aspect-[16/11]">
        <Image
          src="/devices/showcase-macbook.png"
          alt="Проект APSOD на MacBook"
          fill
          priority
          className="object-contain object-center drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
          sizes="(max-width: 1024px) 90vw, 520px"
        />
      </div>
      <Link
        href="/portfolio/maxximum"
        className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-[11px] tracking-[0.16em] uppercase text-slate-400 hover:text-white transition-colors"
      >
        Maxximum →
      </Link>
    </div>
  )
}
