import type { Key } from './i18n'

export type Post = {
  slug: string
  /** Translation key for the title */
  title: Key
  /** English title, used for the browser tab and link previews */
  metaTitle: string
  /** English summary, used by search engines and link previews */
  metaDescription: string
  month: string
  minutes: number
}

/** Newest first; this order is used on the home page and in the sitemap. */
export const POSTS: Post[] = [
  {
    slug: 'diariolx',
    title: 'dlxTitle',
    metaTitle: 'DiárioLX, from draft to reader',
    metaDescription: 'How we built DiárioLX, a newsroom platform with an editorial workflow, block editor and Kotlin backend, as the final project of my degree at ISEL.',
    month: '2026-08',
    minutes: 3
  },
  {
    slug: 'hi',
    title: 'hiTitle',
    metaTitle: "Hi, I'm Julianne",
    metaDescription: "I'm a software engineer living in Lisbon. Technology was always around, but I got here through maths.",
    month: '2026-07',
    minutes: 1
  }
]

/**
 * The site's link-preview image. A page that sets its own openGraph replaces the site's,
 * image included, so pages have to list it again.
 */
export const SITE_IMAGE = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: 'Julianne Lobato. Tech-driven. Creatively inspired. Software Engineer, Lisbon.'
}

/** Shared link-preview metadata for a post page. */
export const postMetadata = (post: Post) => ({
  title: post.metaTitle,
  description: post.metaDescription,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: 'article' as const,
    siteName: 'Julianne Lobato',
    url: `/blog/${post.slug}`,
    title: post.metaTitle,
    description: post.metaDescription,
    publishedTime: `${post.month}-01`,
    images: [SITE_IMAGE]
  }
})

export const getPost = (slug: string) => {
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) throw new Error(`Unknown post: ${slug}`)
  return post
}
