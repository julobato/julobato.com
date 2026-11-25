import type { Metadata } from 'next'
import { SITE_IMAGE } from '@/lib/posts'
import { DiarioLXNotes } from './DiarioLXNotes'

const title = 'DiárioLX, engineering notes'
const description = 'How DiárioLX is built: the architecture, direct-to-storage uploads, editorial rules and permissions, tests, and what I would improve.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/notes/diariolx' },
  openGraph: { type: 'article', siteName: 'Julianne Lobato', url: '/notes/diariolx', title, description, images: [SITE_IMAGE] }
}

export default function Page() {
  return <DiarioLXNotes />
}
