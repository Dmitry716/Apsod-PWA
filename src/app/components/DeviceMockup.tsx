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

/** CSS device chrome — phone frames use real flagship proportions (~19.5:9) */
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

  const isIphone = device === 'iphone'

  return (
    <div className={`relative mx-auto w-full max-w-[220px] sm:max-w-[240px] ${className}`}>
      <div
        className={`shadow-[0_28px_56px_rgba(0,0,0,0.45)] ${
          isIphone
            ? 'rounded-[2.35rem] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 p-[6px]'
            : 'rounded-[1.85rem] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 p-[5px]'
        }`}
      >
        {/* iPhone 17 Pro Max / Galaxy S26 Ultra ≈ 19.5:9 */}
        <div
          className={`relative aspect-[9/19.5] overflow-hidden bg-black ${
            isIphone ? 'rounded-[1.95rem]' : 'rounded-[1.5rem]'
          }`}
        >
          <Image
            src={screenSrc}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-cover object-top"
            sizes="(max-width: 768px) 55vw, 240px"
          />

          {isIphone ? (
            <div
              className="pointer-events-none absolute left-1/2 top-[7px] z-20 h-[18px] w-[68px] -translate-x-1/2 rounded-full bg-black"
              aria-hidden
            />
          ) : (
            <div
              className="pointer-events-none absolute left-1/2 top-[9px] z-20 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-slate-950 ring-1 ring-slate-600"
              aria-hidden
            />
          )}
        </div>
      </div>

      {isIphone ? (
        <>
          <span className="absolute left-[-2px] top-[16%] h-5 w-[2px] rounded-l bg-slate-400" aria-hidden />
          <span className="absolute left-[-2px] top-[23%] h-8 w-[2px] rounded-l bg-slate-400" aria-hidden />
          <span className="absolute left-[-2px] top-[32%] h-8 w-[2px] rounded-l bg-slate-400" aria-hidden />
          <span className="absolute right-[-2px] top-[26%] h-12 w-[2px] rounded-r bg-slate-400" aria-hidden />
        </>
      ) : (
        <>
          <span className="absolute right-[-2px] top-[20%] h-8 w-[2px] rounded-r bg-slate-700" aria-hidden />
          <span className="absolute right-[-2px] top-[30%] h-11 w-[2px] rounded-r bg-slate-700" aria-hidden />
        </>
      )}
    </div>
  )
}
