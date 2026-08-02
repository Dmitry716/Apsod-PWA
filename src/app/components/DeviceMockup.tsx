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

/** Pre-composited photorealistic iPhone mockups (frame + screen, no studio bg) */
const IPHONE_MOCKUPS: Record<string, string> = {
  '/devices/app-screens/home.png': '/devices/mockups/iphone-home.png',
  '/devices/app-screens/services.png': '/devices/mockups/iphone-services.png',
  '/devices/app-screens/booking.png': '/devices/mockups/iphone-booking.png',
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

  if (device === 'iphone') {
    const mockupSrc = IPHONE_MOCKUPS[screenSrc] ?? '/devices/mockups/iphone-home.png'

    return (
      <div className={`relative mx-auto w-full ${className}`}>
        <div className="relative w-full" style={{ aspectRatio: '631 / 1285' }}>
          <Image
            src={mockupSrc}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-contain object-center drop-shadow-[0_20px_36px_rgba(0,0,0,0.4)]"
            sizes="(max-width: 640px) 48vw, 200px"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative mx-auto w-full ${className}`}>
      <div className="relative w-full rounded-[2rem] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 p-[7px] shadow-[0_28px_56px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.55rem] bg-black">
          <Image
            src={screenSrc}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-cover object-top"
            sizes="(max-width: 640px) 45vw, 220px"
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[2.2%] z-20 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-slate-950 ring-1 ring-slate-600"
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}
