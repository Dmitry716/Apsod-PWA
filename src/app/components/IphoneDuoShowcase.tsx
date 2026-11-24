import DeviceMockup from './DeviceMockup'

type Props = {
  primarySrc?: string
  secondarySrc?: string
  className?: string
  priority?: boolean
}

/** Two realistic iPhone frames — banking home + social feed */
export default function IphoneDuoShowcase({
  primarySrc = '/devices/app-screens/serious/bank-home.png',
  secondarySrc = '/devices/app-screens/serious/social-feed.jpg',
  className = '',
  priority = false,
}: Props) {
  return (
    <div className={`flex w-full items-end justify-center gap-[3%] ${className}`}>
      <div className="w-[50%] max-w-[220px]">
        <DeviceMockup
          device="iphone"
          screenSrc={primarySrc}
          screenAlt="Банкинг на iPhone 17 Pro Max"
          priority={priority}
        />
      </div>
      <div className="w-[44%] max-w-[190px] translate-y-[-2%] opacity-95">
        <DeviceMockup
          device="iphone"
          screenSrc={secondarySrc}
          screenAlt="Соцсеть на iPhone 17 Pro Max"
          priority={priority}
        />
      </div>
    </div>
  )
}
