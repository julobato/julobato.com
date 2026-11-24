import type { Metadata } from 'next'
import { getPost, postMetadata } from '@/lib/posts'
import { HiPost } from './HiPost'

const post = getPost('hi')

export const metadata: Metadata = postMetadata(post)

export default function Page() {
  return <HiPost />
}
