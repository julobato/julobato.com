'use client'

import { useLang } from '@/components/LangProvider'
import { PostLayout } from '@/components/PostLayout'
import { getPost } from '@/lib/posts'

const post = getPost('diariolx')

const STACK = ['Kotlin', 'Spring Boot', 'PostgreSQL', 'JDBI', 'SeaweedFS', 'React', 'TypeScript', 'Vite', 'Tiptap', 'Docker', 'Nginx', 'GitHub Actions']

const Arrow = ({ dashed }: { dashed?: boolean }) => <span className="arrow" aria-hidden="true">{dashed ? '⇢' : '→'}</span>

export function DiarioLXPost() {
  const { t } = useLang()
  return (
    <PostLayout post={post}>
      <p>{t('dlx1')}</p>
      <p>{t('dlx2')}</p>
      <p>{t('dlx3')}</p>
      <figure className="diagram">
        <div className="flow">
          <span className="node">{t('fDraft')}</span><Arrow />
          <span className="node">{t('fReview')}</span><Arrow />
          <span className="node node--accent">{t('fApproved')}</span><Arrow />
          <span className="node">{t('fLive')}</span>
        </div>
        <span className="note">{t('fBack')}</span>
        <figcaption>{t('flowCap')}</figcaption>
      </figure>
      <p>{t('dlx4')}</p>
      <figure>
        <div className="shot">{t('shotEditor')}</div>
        <figcaption>{t('shotEditorCap')}</figcaption>
      </figure>
      <p>{t('dlx5')}</p>
      <figure>
        <div className="shot">{t('shotHome')}</div>
        <figcaption>{t('shotHomeCap')}</figcaption>
      </figure>
      <p>{t('dlx6')}</p>
      <p>{t('dlx7')}</p>
      <figure className="diagram">
        <div className="flow">
          <span className="node">{t('browser')}</span><Arrow />
          <span className="node">Nginx</span><Arrow />
          <span className="node">Spring Boot · Kotlin</span><Arrow />
          <span className="node">PostgreSQL</span>
        </div>
        <div className="flow">
          <span className="node">{t('browser')}</span><Arrow dashed />
          <span className="note">{t('signed')}</span><Arrow dashed />
          <span className="node node--accent">SeaweedFS · S3</span>
        </div>
        <figcaption>{t('archCap')}</figcaption>
      </figure>
      <p>{t('dlx8')}</p>
      <p>{t('dlx9')}</p>
      <ul className="pills">
        {STACK.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <p>{t('dlx10')}</p>
    </PostLayout>
  )
}
