import SeoJsonLd from '../components/SeoJsonLd'
import ServicesIndex from '../components/ServicesIndex'
import { SERVICES_SCHEMA_ITEMS } from '../lib/services-schema'
import { buildSnippetMetadata, generateItemListSchema, SITE_URL } from '../lib/seo'

export const metadata = buildSnippetMetadata('/services')

export default function ServicesPage() {
  const servicesList = generateItemListSchema({
    name: 'IT-услуги APSOD',
    items: SERVICES_SCHEMA_ITEMS.map((service) => ({
      name: service.title,
      url: `${SITE_URL}${service.link}`,
      description: service.description,
    })),
  })

  return (
    <div className="min-h-screen bg-black">
      <SeoJsonLd data={servicesList} />
      <ServicesIndex />
    </div>
  )
}
