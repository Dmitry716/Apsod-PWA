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

/** CSS device chrome + UI screenshot — clean bezel, no floating stand scraps */
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
    <div className={`relative mx-auto w-full max-w-[300px] ${className}`}>
      <div
        className={`relative aspect-[9/19.5] shadow-[0_30px_60px_rgba(0,0,0,0.5)] ${
          isIphone
            ? 'rounded-[2.75rem] bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500 p-[10px]'
            : 'rounded-[2.2rem] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 p-[9px]'
        }`}
      >
        {/* Screen: contain so UI never clips left/right */}
        <div
          className={`relative h-full w-full overflow-hidden bg-slate-950 ${
            isIphone ? 'rounded-[2.15rem]' : 'rounded-[1.7rem]'
          }`}
        >
          <Image
            src={screenSrc}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-contain object-top"
            sizes="(max-width: 768px) 70vw, 300px"
          />

          {isIphone ? (
            <div
              className="pointer-events-none absolute left-1/2 top-2 z-20 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-black"
              aria-hidden
            />
          ) : (
            <div
              className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-slate-900 ring-1 ring-slate-600"
              aria-hidden
            />
          )}
        </div>
      </div>

      {isIphone ? (
        <>
          <span className="absolute left-[-2px] top-[18%] h-7 w-[2px] rounded-l bg-slate-400" aria-hidden />
          <span className="absolute left-[-2px] top-[26%] h-12 w-[2px] rounded-l bg-slate-400" aria-hidden />
          <span className="absolute left-[-2px] top-[36%] h-12 w-[2px] rounded-l bg-slate-400" aria-hidden />
          <span className="absolute right-[-2px] top-[28%] h-16 w-[2px] rounded-r bg-slate-400" aria-hidden />
        </>
      ) : (
        <>
          <span className="absolute right-[-2px] top-[22%] h-10 w-[2px] rounded-r bg-slate-700" aria-hidden />
          <span className="absolute right-[-2px] top-[32%] h-14 w-[2px] rounded-r bg-slate-700" aria-hidden />
        </>
      )}
    </div>
  )
}
