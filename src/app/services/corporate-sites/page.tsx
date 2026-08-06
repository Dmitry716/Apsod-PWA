import SiteTypeLanding from '../components/SiteTypeLanding'
import { buildServiceMetadata } from '../../lib/seo'

export const metadata = buildServiceMetadata('corporate-sites')

export default function CorporateSitesPage() {
  return <SiteTypeLanding slug="corporate-sites" />
}
