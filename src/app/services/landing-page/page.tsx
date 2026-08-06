import SiteTypeLanding from '../components/SiteTypeLanding'
import { buildServiceMetadata } from '../../lib/seo'

export const metadata = buildServiceMetadata('landing-page')

export default function LandingPageService() {
  return <SiteTypeLanding slug="landing-page" />
}
