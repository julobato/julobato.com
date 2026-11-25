import type { MetadataRoute } from 'next'
import { POSTS } from '@/lib/posts'

const BASE = 'https://julobato.com'

/** Pages that aren't blog posts, with the month they were last updated. */
const NOTES = [{ path: '/notes/diariolx', month: '2026-08' }]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE },
    ...POSTS.map((post) => ({ url: `${BASE}/blog/${post.slug}`, lastModified: `${post.month}-01` })),
    ...NOTES.map((note) => ({ url: `${BASE}${note.path}`, lastModified: `${note.month}-01` }))
  ]
}
