import { SITE_URL, SITE_NAME, getOrganizationId } from '../lib/seo'
import { REVIEWS, getAggregateRating } from '../lib/reviews'

type Props = { reviews?: typeof REVIEWS; scopePath?: string }

/**
 * Schema.org AggregateRating + Review[]. Даёт звёзды в Google/Яндексе.
 * Разметка должна опираться на реальные отзывы — иначе Google снимет rich snippet.
 */
export default function ReviewJsonLd({ reviews, scopePath }: Props) {
  const items = reviews && reviews.length > 0 ? reviews : REVIEWS
  const agg = getAggregateRating()
  const pageUrl = scopePath
    ? `${SITE_URL.replace(/\/$/, '')}${scopePath}`
    : SITE_URL

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AggregateRating',
        '@id': `${pageUrl}#aggregate-rating`,
        itemReviewed: { '@id': getOrganizationId() },
        ratingValue: agg.ratingValue,
        reviewCount: agg.reviewCount,
        bestRating: agg.bestRating,
        worstRating: agg.worstRating,
      },
      ...items.map((r) => ({
        '@type': 'Review',
        '@id': `${pageUrl}#review-${r.id}`,
        itemReviewed: { '@type': 'Organization', '@id': getOrganizationId(), name: SITE_NAME },
        author: { '@type': 'Person', name: r.author.ru },
        datePublished: r.date,
        reviewBody: r.text.ru,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating, bestRating: 5, worstRating: 1,
        },
        ...(r.caseSlug
          ? { url: `${SITE_URL.replace(/\/$/, '')}/portfolio/${r.caseSlug}` }
          : {}),
      })),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
