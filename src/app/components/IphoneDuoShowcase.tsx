import DeviceMockup from './DeviceMockup'

type Props = {
  primarySrc?: string
  secondarySrc?: string
  className?: string
  priority?: boolean
}

/** Hero duo — full CSS iPhones with float motion */
export default function IphoneDuoShowcase({
  primarySrc = '/devices/app-screens/serious/bank-home.png',
  secondarySrc = '/devices/app-screens/serious/social-feed.jpg',
  className = '',
  priority = false,
}: Props) {
  return (
    <div
      className={`apsod-phone-duo relative mx-auto flex w-full max-w-[440px] items-end justify-center ${className}`}
    >
      <div
        className="apsod-phone-float relative z-20 w-[58%] max-w-[240px]"
        style={{ animationDelay: '0s' }}
      >
        <DeviceMockup
          device="iphone"
          screenSrc={primarySrc}
          screenAlt="Банкинг на iPhone"
          priority={priority}
        />
      </div>
      <div
        className="apsod-phone-float relative z-10 -ml-[14%] mb-[8%] w-[48%] max-w-[200px]"
        style={{ animationDelay: '0.6s' }}
      >
        <DeviceMockup
          device="iphone"
          screenSrc={secondarySrc}
          screenAlt="Соцсеть на iPhone"
          priority={priority}
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-[6%] left-1/2 h-[18%] w-[70%] -translate-x-1/2 rounded-[100%] bg-sky-400/20 blur-3xl"
        aria-hidden
      />
    </div>
  )
}
