/** Приоритетные города РБ для локального SEO (остальные — 301 на /belarus). */
export type BelarusCity = {
  slug: string
  name: string
  nameIn: string
  nameGenitive: string
  region: string
  population: string
  lat: number
  lng: number
}

export const BELARUS_CITIES: BelarusCity[] = [
  {
    slug: 'vitebsk',
    name: 'Витебск',
    nameIn: 'в Витебске',
    nameGenitive: 'Витебска',
    region: 'Витебская область',
    population: '370 тыс.',
    lat: 55.1848,
    lng: 30.2016,
  },
  {
    slug: 'minsk',
    name: 'Минск',
    nameIn: 'в Минске',
    nameGenitive: 'Минска',
    region: 'Минская область',
    population: '2 млн',
    lat: 53.9045,
    lng: 27.5615,
  },
]

/** Бывшие гео-страницы → 301 на /belarus */
export const RETIRED_BELARUS_CITY_SLUGS = [
  'brest',
  'gomel',
  'grodno',
  'mogilev',
  'bobruisk',
  'baranovichi',
  'borisov',
  'pinsk',
  'orsha',
  'mozyr',
  'soligorsk',
  'lida',
  'polotsk',
] as const

export function getCityBySlug(slug: string): BelarusCity | undefined {
  return BELARUS_CITIES.find((c) => c.slug === slug)
}
