import SiteTypeLanding from '../components/SiteTypeLanding'
import { buildServiceMetadata } from '../../lib/seo'

export const metadata = buildServiceMetadata('ecommerce')

export default function EcommercePage() {
  return <SiteTypeLanding slug="ecommerce" />
}
