import Image from 'next/image'

type Props = {
  src?: string
  alt?: string
  className?: string
  priority?: boolean
}

/** Real iPhone 17 Pro hands photo with app screens composited — scales fluidly */
export default function IosHandsShowcase({
  src = '/devices/ios-hands-mockup.png',
  alt = 'Приложение APSOD на iPhone 17 Pro и Pro Max',
  className = '',
  priority = false,
}: Props) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-contain object-center"
          sizes="(max-width: 768px) 94vw, (max-width: 1200px) 70vw, 720px"
        />
      </div>
    </div>
  )
}
