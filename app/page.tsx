import type { Metadata } from 'next'
import { Home } from '@/components/Home'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Julianne Lobato',
    url: '/',
    description: 'Software engineer in Lisbon, building backend systems and full-stack apps: integrations, data pipelines and automation.'
  }
}

export default function Page() {
  return <Home />
}
