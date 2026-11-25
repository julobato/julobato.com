'use client'

import Link from 'next/link'
import { useLang } from '@/components/LangProvider'
import { Topbar } from '@/components/Topbar'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="wrap">
      <Topbar />
      <main className="not-found">
        <span className="small muted">404</span>
        <h1>{t('notFoundTitle')}</h1>
        <p>{t('notFoundText')}</p>
        <Link href="/">{t('notFoundBack')}</Link>
      </main>
    </div>
  )
}
