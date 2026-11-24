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

/** Pre-composited mockups (frame + screen baked together) */
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

/** Native PNG sizes — never force a mismatched slot aspect */
const IPHONE_RATIO = 629 / 1283
const SAMSUNG_RATIO = 615 / 1000

/** Measured hole in frame PNGs */
const IPHONE_INSET = { top: '1.71%', right: '3.18%', bottom: '1.56%', left: '3.5%' }
const SAMSUNG_INSET = { top: '1.6%', right: '2.6%', bottom: '1.9%', left: '2.6%' }

function PrecomposedPhone({
  src,
  alt,
  ratio,
  className,
  priority,
}: {
  src: string
  alt: string
  ratio: number
  className?: string
  priority?: boolean
}) {
  return (
    <div
      className={`relative mx-auto w-full ${className ?? ''}`}
      style={{ aspectRatio: `${ratio}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
        sizes="(max-width: 640px) 55vw, 240px"
      />
    </div>
  )
}

function FramedPhone({
  frameSrc,
  screenSrc,
  alt,
  ratio,
  inset,
  radius,
  className,
  priority,
}: {
  frameSrc: string
  screenSrc: string
  alt: string
  ratio: number
  inset: { top: string; right: string; bottom: string; left: string }
  radius: string
  className?: string
  priority?: boolean
}) {
  return (
    <div
      className={`relative mx-auto w-full ${className ?? ''}`}
      style={{ aspectRatio: `${ratio}` }}
    >
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          top: inset.top,
          right: inset.right,
          bottom: inset.bottom,
          left: inset.left,
          borderRadius: radius,
        }}
      >
        <Image
          src={screenSrc}
          alt=""
          fill
          priority={priority}
          className="object-cover object-top"
          sizes="(max-width: 640px) 55vw, 240px"
          aria-hidden
        />
      </div>
      <Image
        src={frameSrc}
        alt={alt}
        fill
        priority={priority}
        className="pointer-events-none object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
        sizes="(max-width: 640px) 55vw, 240px"
      />
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
        <PrecomposedPhone
          src={precomposed}
          alt={screenAlt}
          ratio={IPHONE_RATIO}
          className={className}
          priority={priority}
        />
      )
    }
    return (
      <FramedPhone
        frameSrc={IPHONE_FRAME}
        screenSrc={screenSrc}
        alt={screenAlt}
        ratio={IPHONE_RATIO}
        inset={IPHONE_INSET}
        radius="12.5%"
        className={className}
        priority={priority}
      />
    )
  }

  const precomposed = SAMSUNG_MOCKUPS[screenSrc]
  if (precomposed) {
    return (
      <PrecomposedPhone
        src={precomposed}
        alt={screenAlt}
        ratio={SAMSUNG_RATIO}
        className={className}
        priority={priority}
      />
    )
  }

  return (
    <FramedPhone
      frameSrc={SAMSUNG_FRAME}
      screenSrc={screenSrc}
      alt={screenAlt}
      ratio={SAMSUNG_RATIO}
      inset={SAMSUNG_INSET}
      radius="10%"
      className={className}
      priority={priority}
    />
  )
}
