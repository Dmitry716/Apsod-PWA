import ServiceLanding from '../components/ServiceLanding'
import { getServiceLanding } from '../lib/landing-data'
import { buildServiceMetadata } from '../../lib/seo'

export const metadata = buildServiceMetadata('android-apps')

export default function AndroidAppsPage() {
  const content = getServiceLanding('android-apps')
  if (!content) return null
  return <ServiceLanding content={content} />
}
