'use client'

import { useEffect, useState } from 'react'
import { currentMonth, formatDuration, formatMonth, monthsBetween, parseMonth } from '@/lib/i18n'
import { useLang } from './LangProvider'

/** "Jul 2026" */
export function Month({ value }: { value: string }) {
  const { lang } = useLang()
  return <>{formatMonth(value, lang)}</>
}

/** "Nov 2024 — Jun 2025", or "Jul 2025 — now" when `to` is omitted */
export function Range({ from, to }: { from: string; to?: string }) {
  const { lang, t } = useLang()
  return <>{formatMonth(from, lang)} — {to ? formatMonth(to, lang) : t('now')}</>
}

/** "2 yrs 1 mo"; an open range counts up to the visitor's current month */
export function Duration({ from, to }: { from: string; to?: string }) {
  const { lang } = useLang()
  // The current month is only known in the browser, so open ranges render after mount
  // to keep the prerendered HTML and the first client render identical.
  const [now, setNow] = useState<ReturnType<typeof currentMonth> | null>(null)
  useEffect(() => setNow(currentMonth()), [])
  const end = to ? parseMonth(to) : now
  if (!end) return null
  return <>{formatDuration(monthsBetween(parseMonth(from), end), lang)}</>
}

/** "3 min read" */
export function ReadTime({ minutes }: { minutes: number }) {
  const { t } = useLang()
  return <>{minutes} {t('minRead')}</>
}
