import { dualPriceLines } from './currency'

export type MobileAppPackageId = 'mvp' | 'cross' | 'product'

export type MobileAppPackage = {
  id: MobileAppPackageId
  title: string
  bynAmount: number
  byn: string
  rub: string
  term: string
  goal: string
  budget: string
  highlight: boolean
  items: string[]
}

const packageFrom = (
  id: MobileAppPackageId,
  title: string,
  bynAmount: number,
  term: string,
  goal: string,
  budget: string,
  highlight: boolean,
  items: string[]
): MobileAppPackage => ({
  id,
  title,
  bynAmount,
  ...dualPriceLines(bynAmount),
  term,
  goal,
  budget,
  highlight,
  items,
})

/** Ориентиры стоимости мобильной разработки — /pricing и /services/mobile-development */
export const MOBILE_APP_PACKAGES: MobileAppPackage[] = [
  packageFrom(
    'mvp',
    'MVP · одна платформа',
    12000,
    '6–10 недель',
    'mobile',
    'mobile-mvp-12k',
    false,
    [
      'UX/UI и 5–8 ключевых экранов',
      'Базовый API / бэкенд',
      'Публикация в одном сторе',
      'iOS или Android на выбор',
    ]
  ),
  packageFrom(
    'cross',
    'Кроссплатформа (React Native)',
    18000,
    '2–4 месяца',
    'mobile',
    'mobile-rn-18k',
    true,
    [
      'Один код для iOS и Android',
      'Push и аналитика',
      'Публикация в App Store и Google Play',
      'Смета после Discovery',
    ]
  ),
  packageFrom(
    'product',
    'Продукт · две платформы',
    25000,
    'от 3 месяцев',
    'mobile',
    'mobile-product-25k',
    false,
    [
      'Натив или RN+ под сложный MVP',
      'Офлайн, роли, интеграции',
      'TestFlight / внутреннее тестирование Play',
      'Сопровождение релиза',
    ]
  ),
]

export const MOBILE_APP_ENTRY_BYN = 12000

export function getMobileAppPackage(id: MobileAppPackageId): MobileAppPackage {
  return MOBILE_APP_PACKAGES.find((p) => p.id === id) ?? MOBILE_APP_PACKAGES[0]
}
