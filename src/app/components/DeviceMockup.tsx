import type { ReactNode } from 'react'
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

/** Pre-composited photorealistic phone mockups (frame + screen) */
const IPHONE_MOCKUPS: Record<string, string> = {
  '/devices/app-screens/home.png': '/devices/mockups/iphone-home.png',
  '/devices/app-screens/services.png': '/devices/mockups/iphone-services.png',
  '/devices/app-screens/booking.png': '/devices/mockups/iphone-booking.png',
  '/devices/app-screens/serious/bank-home.png': '/devices/mockups/iphone-bank-home.png',
  '/devices/app-screens/serious/bank-cards.png': '/devices/mockups/iphone-bank-cards.png',
  '/devices/app-screens/serious/bank-transactions.png': '/devices/mockups/iphone-bank-transactions.png',
  '/devices/app-screens/serious/bank-transfer.png': '/devices/mockups/iphone-bank-transfer.png',
  '/devices/app-screens/serious/bank-stats.png': '/devices/mockups/iphone-bank-stats.png',
  '/devices/app-screens/serious/social-feed.jpg': '/devices/mockups/iphone-social-feed.png',
  '/devices/app-screens/serious/social-chat.jpg': '/devices/mockups/iphone-social-chat.png',
  '/devices/app-screens/serious/social-profile.jpg': '/devices/mockups/iphone-social-profile.png',
  '/devices/app-screens/serious/social-moments.jpg': '/devices/mockups/iphone-social-moments.png',
  '/devices/app-screens/serious/social-community.jpg': '/devices/mockups/iphone-social-community.png',
}

const SAMSUNG_MOCKUPS: Record<string, string> = {
  '/devices/app-screens/home.png': '/devices/mockups/samsung-home.png',
  '/devices/app-screens/services.png': '/devices/mockups/samsung-services.png',
  '/devices/app-screens/booking.png': '/devices/mockups/samsung-booking.png',
  '/devices/app-screens/serious/bank-home.png': '/devices/mockups/samsung-bank-home.png',
  '/devices/app-screens/serious/bank-cards.png': '/devices/mockups/samsung-bank-cards.png',
  '/devices/app-screens/serious/bank-transactions.png': '/devices/mockups/samsung-bank-transactions.png',
  '/devices/app-screens/serious/bank-transfer.png': '/devices/mockups/samsung-bank-transfer.png',
  '/devices/app-screens/serious/bank-stats.png': '/devices/mockups/samsung-bank-stats.png',
  '/devices/app-screens/serious/social-feed.jpg': '/devices/mockups/samsung-social-feed.png',
  '/devices/app-screens/serious/social-chat.jpg': '/devices/mockups/samsung-social-chat.png',
  '/devices/app-screens/serious/social-profile.jpg': '/devices/mockups/samsung-social-profile.png',
  '/devices/app-screens/serious/social-moments.jpg': '/devices/mockups/samsung-social-moments.png',
  '/devices/app-screens/serious/social-community.jpg': '/devices/mockups/samsung-social-community.png',
}

const IPHONE_FRAME = '/devices/iphone-17-pro-max-frame.png'
const SAMSUNG_FRAME = '/devices/samsung-s26-frame.png'

const IPHONE_ASPECT = '629 / 1283'
const SAMSUNG_ASPECT = '615 / 1000'
const PHONE_SLOT_ASPECT = '9 / 19'

const IPHONE_SCREEN_INSET = '1.71% 3.18% 1.56% 3.5%'
const SAMSUNG_SCREEN_INSET = '1.6% 2.6% 1.9% 2.6%'

function PhoneShell({
  className,
  aspect,
  children,
}: {
  className?: string
  aspect: string
  children: ReactNode
}) {
  return (
    <div className={`relative mx-auto h-full w-full max-w-[180px] ${className ?? ''}`}>
      <div className="relative mx-auto h-full w-full" style={{ aspectRatio: aspect }}>
        {children}
      </div>
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

  if (device === 'iphone') {
    const precomposed = IPHONE_MOCKUPS[screenSrc]
    if (precomposed) {
      return (
        <PhoneShell className={className} aspect={PHONE_SLOT_ASPECT}>
          <Image
            src={precomposed}
            alt={screenAlt}
            fill
            priority={priority}
            className="object-contain object-bottom"
            sizes="(max-width: 640px) 48vw, 180px"
          />
        </PhoneShell>
      )
    }

    return (
      <PhoneShell className={className} aspect={IPHONE_ASPECT}>
        <div
          className="absolute overflow-hidden rounded-[12.5%]"
          style={{ inset: IPHONE_SCREEN_INSET }}
        >
          <Image
            src={screenSrc}
            alt=""
            fill
            priority={priority}
            className="object-cover object-top"
            sizes="(max-width: 640px) 48vw, 180px"
            aria-hidden
          />
        </div>
        <Image
          src={IPHONE_FRAME}
          alt={screenAlt}
          fill
          priority={priority}
          className="pointer-events-none object-fill"
          sizes="(max-width: 640px) 48vw, 180px"
        />
      </PhoneShell>
    )
  }

  const precomposed = SAMSUNG_MOCKUPS[screenSrc]
  if (precomposed) {
    return (
      <PhoneShell className={className} aspect={PHONE_SLOT_ASPECT}>
        <Image
          src={precomposed}
          alt={screenAlt}
          fill
          priority={priority}
          className="object-contain object-bottom"
          sizes="(max-width: 640px) 48vw, 180px"
        />
      </PhoneShell>
    )
  }

  return (
    <PhoneShell className={className} aspect={SAMSUNG_ASPECT}>
      <div
        className="absolute overflow-hidden rounded-[10%]"
        style={{ inset: SAMSUNG_SCREEN_INSET }}
      >
        <Image
          src={screenSrc}
          alt=""
          fill
          priority={priority}
          className="object-cover object-top"
          sizes="(max-width: 640px) 48vw, 180px"
          aria-hidden
        />
      </div>
      <Image
        src={SAMSUNG_FRAME}
        alt={screenAlt}
        fill
        priority={priority}
        className="pointer-events-none object-fill"
        sizes="(max-width: 640px) 48vw, 180px"
      />
    </PhoneShell>
  )
}
