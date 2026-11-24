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
 * CSS device chrome — screen always fills edge-to-edge.
 * No PNG frame overlays (those caused crooked / letterboxed UIs).
 */
function PhoneChassis({
  variant,
  screenSrc,
  screenAlt,
  className,
  priority,
}: {
  variant: 'iphone' | 'samsung'
  screenSrc: string
  screenAlt: string
  className?: string
  priority?: boolean
}) {
  const isIphone = variant === 'iphone'

  return (
    <div
      className={`apsod-phone relative mx-auto w-full ${className ?? ''}`}
      style={{ aspectRatio: isIphone ? '9 / 19.5' : '9 / 19' }}
    >
      {/* Body */}
      <div
        className={`absolute inset-0 ${
          isIphone
            ? 'rounded-[2.55rem] bg-gradient-to-b from-zinc-700 via-zinc-900 to-black p-[5px] shadow-[0_28px_60px_-12px_rgba(0,0,0,0.65),inset_0_0_0_1px_rgba(255,255,255,0.12)]'
            : 'rounded-[2.1rem] bg-gradient-to-b from-zinc-800 via-zinc-950 to-black p-[4px] shadow-[0_28px_60px_-12px_rgba(0,0,0,0.65),inset_0_0_0_1px_rgba(255,255,255,0.1)]'
        }`}
      >
        {/* Screen glass */}
        <div
          className={`relative h-full w-full overflow-hidden bg-black ${
            isIphone ? 'rounded-[2.2rem]' : 'rounded-[1.85rem]'
          }`}
        >
          <Image
            src={screenSrc}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-cover object-top"
            sizes="(max-width: 640px) 55vw, 260px"
          />

          {/* Dynamic Island / punch-hole */}
          {isIphone ? (
            <div
              className="pointer-events-none absolute left-1/2 top-[10px] z-10 h-[22px] w-[28%] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
              aria-hidden
            >
              <span className="absolute right-[18%] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#0a1628] ring-1 ring-sky-900/80" />
            </div>
          ) : (
            <div
              className="pointer-events-none absolute left-1/2 top-[9px] z-10 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-zinc-950 ring-1 ring-zinc-700"
              aria-hidden
            />
          )}

          {/* Home indicator */}
          <div
            className="pointer-events-none absolute bottom-[7px] left-1/2 z-10 h-[3px] w-[28%] -translate-x-1/2 rounded-full bg-white/35"
            aria-hidden
          />
        </div>
      </div>

      {/* Hardware buttons */}
      {isIphone ? (
        <>
          <span
            className="absolute -left-[2px] top-[18%] h-[14%] w-[3px] rounded-l-sm bg-zinc-600"
            aria-hidden
          />
          <span
            className="absolute -left-[2px] top-[34%] h-[8%] w-[3px] rounded-l-sm bg-zinc-600"
            aria-hidden
          />
          <span
            className="absolute -left-[2px] top-[44%] h-[8%] w-[3px] rounded-l-sm bg-zinc-600"
            aria-hidden
          />
          <span
            className="absolute -right-[2px] top-[30%] h-[12%] w-[3px] rounded-r-sm bg-zinc-600"
            aria-hidden
          />
        </>
      ) : (
        <span
          className="absolute -right-[2px] top-[22%] h-[10%] w-[3px] rounded-r-sm bg-zinc-700"
          aria-hidden
        />
      )}
    </div>
  )
}

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

  return (
    <PhoneChassis
      variant={device === 'iphone' ? 'iphone' : 'samsung'}
      screenSrc={screenSrc}
      screenAlt={screenAlt}
      className={className}
      priority={priority}
    />
  )
}
