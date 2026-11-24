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
  // Hidden for now. To publish again: uncomment this entry and rename app/blog/_diariolx back to app/blog/diariolx.
  // {
  //   slug: 'diariolx',
  //   title: 'dlxTitle',
  //   metaTitle: 'DiárioLX, my final project',
  //   metaDescription: 'How we built DiárioLX, a newsroom platform with an editorial workflow, block editor and Kotlin backend, as my final project at ISEL.',
  //   month: '2026-08',
  //   minutes: 3
  // },
  {
    slug: 'hi',
    title: 'hiTitle',
    metaTitle: "Hi, I'm Julianne",
    metaDescription: "I'm a software engineer living in Lisbon. Technology was always around, but I got here through maths.",
    month: '2026-07',
    minutes: 1
  }
]

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
    publishedTime: `${post.month}-01`
  }
})

export const getPost = (slug: string) => {
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) throw new Error(`Unknown post: ${slug}`)
  return post
}
