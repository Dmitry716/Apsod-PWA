import { getIndexedPortfolioSlugs } from './data'

/** Внутренние страницы /portfolio/[slug] для sitemap.xml — только индексируемые кейсы */
export const PORTFOLIO_SITEMAP_SLUGS = getIndexedPortfolioSlugs()
