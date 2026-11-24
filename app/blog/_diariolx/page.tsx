import type { Metadata } from 'next'
import { getPost, postMetadata } from '@/lib/posts'
import { DiarioLXPost } from './DiarioLXPost'

const post = getPost('diariolx')

export const metadata: Metadata = postMetadata(post)

export default function Page() {
  return <DiarioLXPost />
}
