import DeviceMockup from './DeviceMockup'

type Props = {
  primarySrc?: string
  secondarySrc?: string
  className?: string
  priority?: boolean
}

/** Two full iPhone frames side by side — never clipped */
export default function IphoneDuoShowcase({
  primarySrc = '/devices/app-screens/serious/bank-home.png',
  secondarySrc = '/devices/app-screens/serious/social-feed.jpg',
  className = '',
  priority = false,
}: Props) {
  return (
    <div
      className={`relative flex w-full items-end justify-center gap-3 sm:gap-4 ${className}`}
    >
      <div className="w-[48%] max-w-[230px] shrink-0">
        <DeviceMockup
          device="iphone"
          screenSrc={primarySrc}
          screenAlt="Банкинг на iPhone"
          priority={priority}
        />
      </div>
      <div className="mb-4 w-[42%] max-w-[200px] shrink-0 opacity-95 sm:mb-6">
        <DeviceMockup
          device="iphone"
          screenSrc={secondarySrc}
          screenAlt="Соцсеть на iPhone"
          priority={priority}
        />
      </div>
    </div>
  )
}
