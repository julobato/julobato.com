import type { Metadata } from 'next'
import { Home } from '@/components/Home'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'Julianne Lobato', url: '/' }
}

export default function Page() {
  return <Home />
}
