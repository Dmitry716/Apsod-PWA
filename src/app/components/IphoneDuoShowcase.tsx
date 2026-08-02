import DeviceMockup from './DeviceMockup'

type Props = {
  primarySrc?: string
  secondarySrc?: string
  className?: string
  priority?: boolean
}

/** Two realistic iPhone 17 Pro Max frames — primary + secondary screen, fluid layout */
export default function IphoneDuoShowcase({
  primarySrc = '/devices/app-screens/home.png',
  secondarySrc = '/devices/app-screens/services.png',
  className = '',
  priority = false,
}: Props) {
  return (
    <div className={`flex w-full items-end justify-center gap-[4%] ${className}`}>
      <div className="w-[48%] max-w-[210px]">
        <DeviceMockup
          device="iphone"
          screenSrc={primarySrc}
          screenAlt="Главный экран приложения на iPhone 17 Pro Max"
          priority={priority}
        />
      </div>
      <div className="mb-[6%] w-[42%] max-w-[180px] opacity-95">
        <DeviceMockup
          device="iphone"
          screenSrc={secondarySrc}
          screenAlt="Экран услуг на iPhone 17 Pro Max"
          priority={priority}
        />
      </div>
    </div>
  )
}
