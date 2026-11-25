'use client'

import { rich } from '@/components/Rich'
import { useLang } from '@/components/LangProvider'
import { PostLayout } from '@/components/PostLayout'
import { getPost } from '@/lib/posts'

const post = getPost('hi')

export function HiPost() {
  const { t } = useLang()
  return (
    <PostLayout post={post}>
      <p>{t('hi1')}</p>
      <p>{t('hi2')}</p>
      <p>{t('hi3')}</p>
      <p>{rich(t('hi4'))}</p>
      <p>{t('hi5')}</p>
      <p>{t('hi6')}</p>
    </PostLayout>
  )
}
