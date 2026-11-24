import type { MetadataRoute } from 'next'
import { POSTS } from '@/lib/posts'

const BASE = 'https://julobato.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE },
    ...POSTS.map((post) => ({ url: `${BASE}/blog/${post.slug}`, lastModified: `${post.month}-01` }))
  ]
}
