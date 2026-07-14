/** Приоритетные города РФ для локального SEO (остальные — 301 на /russia). */
export type RussiaCity = {
  slug: string
  name: string
  nameIn: string
  nameGenitive: string
  region: string
  lat: number
  lng: number
  priority: 'primary' | 'major' | 'regional'
}

export const RUSSIA_CITIES: RussiaCity[] = [
  {
    slug: 'moscow',
    name: 'Москва',
    nameIn: 'в Москве',
    nameGenitive: 'Москвы',
    region: 'Москва',
    lat: 55.7558,
    lng: 37.6173,
    priority: 'primary',
  },
]

/** Бывшие гео-страницы → 301 на /russia */
export const RETIRED_RUSSIA_CITY_SLUGS = [
  'khimki',
  'podolsk',
  'balashikha',
  'mytishchi',
  'odintsovo',
  'korolev',
  'domodedovo',
  'lyubertsy',
  'saint-petersburg',
  'novosibirsk',
  'ekaterinburg',
  'kazan',
  'nizhny-novgorod',
  'krasnodar',
  'rostov-on-don',
  'samara',
  'voronezh',
  'ufa',
  'krasnoyarsk',
] as const

export function getRussiaCityBySlug(slug: string): RussiaCity | undefined {
  return RUSSIA_CITIES.find((c) => c.slug === slug)
}

export function getRussiaCitySitemapPriority(slug: string): number {
  if (slug === 'moscow') return 0.96
  return 0.8
}
