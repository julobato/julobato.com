'use client'

import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { Month, ReadTime } from './Dates'
import { useLang } from './LangProvider'
import { Topbar } from './Topbar'

export function PostLayout({ post, children }: { post: Post; children: React.ReactNode }) {
  const { t } = useLang()
  return (
    <div className="wrap post">
      <Topbar />
      <article className="post-article">
        <div className="post-head">
          <span className="small muted"><Month value={post.month} /> · <ReadTime minutes={post.minutes} /></span>
          <h1>{t(post.title)}</h1>
        </div>
        <div className="post-body">{children}</div>
      </article>
      <footer>
        <Link href="/">{t('back')}</Link>
        <a href="mailto:contato@julobato.com">contato@julobato.com</a>
      </footer>
    </div>
  )
}
