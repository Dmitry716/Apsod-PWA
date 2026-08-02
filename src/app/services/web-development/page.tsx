import WebDevelopmentLanding from '../components/WebDevelopmentLanding'
import { buildServiceMetadata } from '../../lib/seo'

export const metadata = buildServiceMetadata('web-development')

export default function WebDevelopmentPage() {
  return <WebDevelopmentLanding />
}
