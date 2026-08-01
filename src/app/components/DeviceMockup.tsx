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
 * CSS device chrome + UI screenshot.
 * Avoids padded PNG frames that break percentage insets.
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
      <div className={`relative mx-auto w-full max-w-xl ${className}`}>
        <div className="rounded-[1.1rem] bg-slate-800 p-[0.55rem] shadow-[0_30px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[0.65rem] bg-slate-950">
            <Image
              src={screenSrc}
              alt={screenAlt}
              fill
              priority={priority}
              className="object-cover"
              style={{ objectPosition: screenPosition }}
              sizes="(max-width: 768px) 92vw, 560px"
            />
          </div>
        </div>
        <div className="mx-auto mt-2 h-3 w-[28%] rounded-b-md bg-slate-700" />
        <div className="mx-auto mt-1 h-1.5 w-[42%] rounded-full bg-slate-600/80" />
      </div>
    )
  }

  const isIphone = device === 'iphone'

  return (
    <div className={`relative mx-auto w-full max-w-[280px] ${className}`}>
      <div
        className={`relative aspect-[9/19.2] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] ${
          isIphone
            ? 'rounded-[2.65rem] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 p-[0.42rem]'
            : 'rounded-[2.1rem] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 p-[0.35rem]'
        }`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-slate-950">
          <Image
            src={screenSrc}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-cover"
            style={{ objectPosition: screenPosition }}
            sizes="(max-width: 768px) 70vw, 280px"
          />

          {isIphone ? (
            <div
              className="pointer-events-none absolute left-1/2 top-[1.1%] z-20 h-[3.2%] w-[32%] -translate-x-1/2 rounded-full bg-slate-950"
              aria-hidden
            />
          ) : (
            <div
              className="pointer-events-none absolute left-1/2 top-[1.35%] z-20 h-[1.15%] w-[1.15%] -translate-x-1/2 rounded-full bg-slate-900 ring-1 ring-slate-700"
              aria-hidden
            />
          )}
        </div>
      </div>

      {/* side buttons */}
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
