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

/** CSS device chrome + UI screenshot — aspect matches assets so UI is never cropped */
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
              className="object-contain object-top"
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
    <div className={`relative mx-auto w-full max-w-[280px] ${className}`}>
      <div
        className={`shadow-[0_30px_60px_rgba(0,0,0,0.5)] ${
          isIphone
            ? 'rounded-[2.6rem] bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500 p-[8px]'
            : 'rounded-[2rem] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 p-[7px]'
        }`}
      >
        {/* Aspect on the screen itself (matches 1024×1536 app-screens) */}
        <div
          className={`relative aspect-[2/3] overflow-hidden bg-black ${
            isIphone ? 'rounded-[2.05rem]' : 'rounded-[1.55rem]'
          }`}
        >
          <Image
            src={screenSrc}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-cover object-top"
            sizes="(max-width: 768px) 70vw, 280px"
          />

          {isIphone ? (
            <div
              className="pointer-events-none absolute left-1/2 top-[6px] z-20 h-[16px] w-[72px] -translate-x-1/2 rounded-full bg-black/90"
              aria-hidden
            />
          ) : (
            <div
              className="pointer-events-none absolute left-1/2 top-2 z-20 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-900 ring-1 ring-slate-600"
              aria-hidden
            />
          )}
        </div>
      </div>

      {isIphone ? (
        <>
          <span className="absolute left-[-2px] top-[18%] h-6 w-[2px] rounded-l bg-slate-400" aria-hidden />
          <span className="absolute left-[-2px] top-[26%] h-10 w-[2px] rounded-l bg-slate-400" aria-hidden />
          <span className="absolute left-[-2px] top-[36%] h-10 w-[2px] rounded-l bg-slate-400" aria-hidden />
          <span className="absolute right-[-2px] top-[28%] h-14 w-[2px] rounded-r bg-slate-400" aria-hidden />
        </>
      ) : (
        <>
          <span className="absolute right-[-2px] top-[22%] h-9 w-[2px] rounded-r bg-slate-700" aria-hidden />
          <span className="absolute right-[-2px] top-[32%] h-12 w-[2px] rounded-r bg-slate-700" aria-hidden />
        </>
      )}
    </div>
  )
}
