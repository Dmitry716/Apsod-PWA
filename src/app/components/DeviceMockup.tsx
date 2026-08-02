import Image from 'next/image'

export type DeviceKind = 'iphone' | 'samsung' | 'desktop'

type Props = {
  device: DeviceKind
  screenSrc: string
  screenAlt?: string
  className?: string
  priority?: boolean
  screenPosition?: string
}

/**
 * Realistic CSS device frames.
 * iPhone 17 Pro Max ≈ 19.5:9 display; screen assets should be portrait.
 */
export default function DeviceMockup({
  device,
  screenSrc,
  screenAlt = '',
  className = '',
  priority = false,
  screenPosition = 'top',
}: Props) {
  if (device === 'desktop') {
    return (
      <div className={`relative mx-auto w-full ${className}`}>
        <div className="overflow-hidden rounded-xl bg-slate-900 shadow-[0_24px_48px_rgba(0,0,0,0.4)] ring-1 ring-white/10">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-slate-800/90 px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="ml-2 h-5 flex-1 rounded bg-slate-950/60" />
          </div>
          <div className="relative aspect-[16/10] bg-slate-950">
            <Image
              src={screenSrc}
              alt={screenAlt}
              fill
              priority={priority}
              className="object-cover object-top"
              style={{ objectPosition: screenPosition }}
              sizes="(max-width: 768px) 92vw, 560px"
            />
          </div>
        </div>
      </div>
    )
  }

  if (device === 'iphone') {
    return (
      <div className={`relative mx-auto w-full ${className}`}>
        {/* Outer titanium shell — Desert Titanium */}
        <div
          className="relative w-full rounded-[14.5%] p-[1.8%] shadow-[0_28px_60px_rgba(0,0,0,0.5)]"
          style={{
            background:
              'linear-gradient(160deg, #e8d5c4 0%, #c4a484 28%, #a88868 55%, #8a6e52 78%, #b89570 100%)',
          }}
        >
          {/* Inner black inset / glass edge */}
          <div className="rounded-[12.5%] bg-black p-[1.4%]">
            {/* Display 19.5:9 */}
            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[11%] bg-black">
              <Image
                src={screenSrc}
                alt={screenAlt}
                fill
                priority={priority}
                className="object-contain object-top"
                sizes="(max-width: 640px) 45vw, 220px"
              />
              {/* Status-bar safe shade under island */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[7%] bg-gradient-to-b from-black/35 to-transparent"
                aria-hidden
              />
              {/* Dynamic Island */}
              <div
                className="pointer-events-none absolute left-1/2 top-[1.8%] z-20 h-[2.6%] w-[34%] max-w-[78px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                aria-hidden
              />
              {/* Subtle glass reflection */}
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-[11%] bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>

        {/* Side buttons */}
        <span
          className="absolute left-[-2.5%] top-[14%] h-[3.2%] w-[2.5%] rounded-l-sm bg-[#b89570]"
          aria-hidden
        />
        <span
          className="absolute left-[-2.5%] top-[20%] h-[5.5%] w-[2.5%] rounded-l-sm bg-[#b89570]"
          aria-hidden
        />
        <span
          className="absolute left-[-2.5%] top-[28%] h-[5.5%] w-[2.5%] rounded-l-sm bg-[#b89570]"
          aria-hidden
        />
        <span
          className="absolute right-[-2.5%] top-[24%] h-[8%] w-[2.5%] rounded-r-sm bg-[#b89570]"
          aria-hidden
        />
      </div>
    )
  }

  /* Samsung / Android */
  return (
    <div className={`relative mx-auto w-full ${className}`}>
      <div className="relative w-full rounded-[12%] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 p-[1.6%] shadow-[0_28px_56px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[10%] bg-black">
          <Image
            src={screenSrc}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-contain object-top"
            sizes="(max-width: 640px) 45vw, 220px"
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[2.2%] z-20 h-[2.2%] w-[2.2%] -translate-x-1/2 rounded-full bg-slate-950 ring-1 ring-slate-600"
            aria-hidden
          />
        </div>
      </div>
      <span className="absolute right-[-2px] top-[20%] h-[5%] min-h-[18px] w-[2px] rounded-r bg-slate-700" aria-hidden />
      <span className="absolute right-[-2px] top-[30%] h-[7%] min-h-[24px] w-[2px] rounded-r bg-slate-700" aria-hidden />
    </div>
  )
}
