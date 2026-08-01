import ServiceLanding from '../components/ServiceLanding'
import { getServiceLanding } from '../lib/landing-data'
import { buildServiceMetadata } from '../../lib/seo'

export const metadata = buildServiceMetadata('ecommerce')

export default function EcommercePage() {
  const content = getServiceLanding('ecommerce')
  if (!content) return null
  return <ServiceLanding content={content} />
}
