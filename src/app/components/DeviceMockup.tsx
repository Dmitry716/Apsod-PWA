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

/** Pre-composited photorealistic phone mockups (frame + screen, no studio bg) */
const IPHONE_MOCKUPS: Record<string, string> = {
  '/devices/app-screens/home.png': '/devices/mockups/iphone-home.png',
  '/devices/app-screens/services.png': '/devices/mockups/iphone-services.png',
  '/devices/app-screens/booking.png': '/devices/mockups/iphone-booking.png',
}

const SAMSUNG_MOCKUPS: Record<string, string> = {
  '/devices/app-screens/home.png': '/devices/mockups/samsung-home.png',
  '/devices/app-screens/services.png': '/devices/mockups/samsung-services.png',
  '/devices/app-screens/booking.png': '/devices/mockups/samsung-booking.png',
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
        <div className="relative w-full" style={{ aspectRatio: '629 / 1283' }}>
          <Image
            src={mockupSrc}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-contain object-center"
            sizes="(max-width: 640px) 48vw, 200px"
          />
        </div>
      </div>
    )
  }

  const mockupSrc = SAMSUNG_MOCKUPS[screenSrc] ?? '/devices/mockups/samsung-home.png'

  return (
    <div className={`relative mx-auto w-full ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: '615 / 1000' }}>
        <Image
          src={mockupSrc}
          alt={screenAlt}
          fill
          priority={priority}
          className="object-contain object-center"
          sizes="(max-width: 640px) 48vw, 200px"
        />
      </div>
    </div>
  )
}
