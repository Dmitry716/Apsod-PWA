/** Региональные центры и крупные города РБ для локального SEO */
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
    slug: 'minsk',
    name: 'Минск',
    nameIn: 'в Минске',
    nameGenitive: 'Минска',
    region: 'Минская область',
    population: '2 млн',
    lat: 53.9045,
    lng: 27.5615,
  },
  {
    slug: 'brest',
    name: 'Брест',
    nameIn: 'в Бресте',
    nameGenitive: 'Бреста',
    region: 'Брестская область',
    population: '350 тыс.',
    lat: 52.0976,
    lng: 23.7341,
  },
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
    slug: 'grodno',
    name: 'Гродно',
    nameIn: 'в Гродно',
    nameGenitive: 'Гродно',
    region: 'Гродненская область',
    population: '370 тыс.',
    lat: 53.6693,
    lng: 23.8131,
  },
  {
    slug: 'gomel',
    name: 'Гомель',
    nameIn: 'в Гомеле',
    nameGenitive: 'Гомеля',
    region: 'Гомельская область',
    population: '510 тыс.',
    lat: 52.4412,
    lng: 30.9878,
  },
  {
    slug: 'mogilev',
    name: 'Могилёв',
    nameIn: 'в Могилёве',
    nameGenitive: 'Могилёва',
    region: 'Могилёвская область',
    population: '380 тыс.',
    lat: 53.8948,
    lng: 30.3303,
  },
  {
    slug: 'bobruisk',
    name: 'Бобруйск',
    nameIn: 'в Бобруйске',
    nameGenitive: 'Бобруйска',
    region: 'Могилёвская область',
    population: '215 тыс.',
    lat: 53.1384,
    lng: 29.2214,
  },
  {
    slug: 'baranovichi',
    name: 'Барановичи',
    nameIn: 'в Барановичах',
    nameGenitive: 'Барановичей',
    region: 'Брестская область',
    population: '170 тыс.',
    lat: 53.1327,
    lng: 26.0139,
  },
  {
    slug: 'borisov',
    name: 'Борисов',
    nameIn: 'в Борисове',
    nameGenitive: 'Борисова',
    region: 'Минская область',
    population: '135 тыс.',
    lat: 54.2279,
    lng: 28.505,
  },
  {
    slug: 'pinsk',
    name: 'Пинск',
    nameIn: 'в Пинске',
    nameGenitive: 'Пинска',
    region: 'Брестская область',
    population: '125 тыс.',
    lat: 52.1229,
    lng: 26.0951,
  },
  {
    slug: 'orsha',
    name: 'Орша',
    nameIn: 'в Орше',
    nameGenitive: 'Орши',
    region: 'Витебская область',
    population: '115 тыс.',
    lat: 54.5153,
    lng: 30.4245,
  },
  {
    slug: 'mozyr',
    name: 'Мозырь',
    nameIn: 'в Мозыре',
    nameGenitive: 'Мозыря',
    region: 'Гомельская область',
    population: '105 тыс.',
    lat: 52.0474,
    lng: 29.2456,
  },
  {
    slug: 'soligorsk',
    name: 'Солигорск',
    nameIn: 'в Солигорске',
    nameGenitive: 'Солигорска',
    region: 'Минская область',
    population: '105 тыс.',
    lat: 52.7928,
    lng: 27.5417,
  },
  {
    slug: 'lida',
    name: 'Лида',
    nameIn: 'в Лиде',
    nameGenitive: 'Лиды',
    region: 'Гродненская область',
    population: '103 тыс.',
    lat: 53.8877,
    lng: 25.3022,
  },
  {
    slug: 'polotsk',
    name: 'Полоцк',
    nameIn: 'в Полоцке',
    nameGenitive: 'Полоцка',
    region: 'Витебская область',
    population: '85 тыс.',
    lat: 55.4856,
    lng: 28.7686,
  },
]

export function getCityBySlug(slug: string): BelarusCity | undefined {
  return BELARUS_CITIES.find((c) => c.slug === slug)
}
