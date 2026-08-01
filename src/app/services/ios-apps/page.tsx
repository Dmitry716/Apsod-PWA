import ServiceLanding from '../components/ServiceLanding'
import { getServiceLanding } from '../lib/landing-data'
import { buildServiceMetadata } from '../../lib/seo'

export const metadata = buildServiceMetadata('ios-apps')

export default function IosAppsPage() {
  const content = getServiceLanding('ios-apps')
  if (!content) return null
  return <ServiceLanding content={content} />
}
