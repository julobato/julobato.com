'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Arrow, Node } from '@/components/Diagram'
import { useLang } from '@/components/LangProvider'
import { PostLayout } from '@/components/PostLayout'
import { rich } from '@/components/Rich'
import type { Key } from '@/lib/i18n'
import { REPORT_URL } from '@/lib/notes/diariolx'
import { getPost } from '@/lib/posts'

const post = getPost('diariolx')

const FULL = '(min-width: 720px) 680px, 100vw'
const HALF = '(min-width: 720px) 340px, 100vw'

export function DiarioLXPost() {
  const { t } = useLang()
  const r = (key: Key) => rich(t(key))
  return (
    <PostLayout post={post}>
      <p>{r('dlx1')}</p>
      <p>{r('dlx2')}</p>
      <p>{r('dlx3')}</p>

      <p>{r('dlx4')}</p>
      <figure>
        <div className="shot-grid">
          <Image className="shot-img" src="/blog/diariolx/editor-empty.png" alt={t('shotEditorEmpty')} width={1800} height={983} sizes={HALF} />
          <Image className="shot-img" src="/blog/diariolx/editor.png" alt={t('shotEditor')} width={1800} height={982} sizes={HALF} />
        </div>
        <figcaption>{r('shotEditorCap')}</figcaption>
      </figure>

      <p>{r('dlxPhoto')}</p>
      <figure>
        <Image className="shot-img" src="/blog/diariolx/media-upload.png" alt={t('shotMedia')} width={1800} height={985} sizes={FULL} />
        <figcaption>{r('shotMediaCap')}</figcaption>
      </figure>

      <p>{r('dlx7')}</p>
      <figure className="diagram">
        <div className="flow flow--steps">
          <Node title={t('fDraft')} sub={t('fDraftSub')} /><Arrow />
          <Node title={t('fReview')} sub={t('fReviewSub')} /><Arrow />
          <Node title={t('fApproved')} sub={t('fApprovedSub')} variant="accent" />
        </div>
        <div className="flow">
          <Node title={t('fReview')} /><Arrow />
          <Node title={t('fRejected')} sub={t('fRejectedSub')} variant="dashed" /><Arrow />
          <span className="note">{t('fBack')}</span>
        </div>
        <span className="note">{t('fEditNote')}</span>
        <figcaption>{r('flowCap')}</figcaption>
      </figure>

      <p>{r('dlx8')}</p>
      <figure>
        <Image className="shot-img" src="/blog/diariolx/homepage.png" alt={t('shotHome')} width={1800} height={1073} sizes={FULL} />
        <figcaption>{r('shotHomeCap')}</figcaption>
      </figure>

      <p>{r('dlx9')}</p>
      <figure>
        <Image className="shot-img" src="/blog/diariolx/article.png" alt={t('shotArticle')} width={1800} height={985} sizes={FULL} />
        <figcaption>{r('shotArticleCap')}</figcaption>
      </figure>

      <p>{r('dlxMore')}</p>
      <p>
        {t('dlxTechPre')} <Link href="/notes/diariolx">{rich(t('dlxTechTitle'))} →</Link>
      </p>
      <p>
        <a href={REPORT_URL} target="_blank" rel="noopener noreferrer">{t('dlxReportLink')} ↗</a>
      </p>

    </PostLayout>
  )
}
