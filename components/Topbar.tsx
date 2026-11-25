'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLang } from './LangProvider'

export function Topbar() {
  const { lang, setLang, t } = useLang()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage can be unavailable (e.g. private mode); the default still works.
    }
    setTheme(next)
  }

  return (
    <div className="topbar">
      <Link className="avatar" href="/" aria-label="Julianne Lobato">
        <img src="/logo.png" alt="" width={21} height={20} />
      </Link>
      <div className="controls">
        <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <span className="sep" aria-hidden="true">/</span>
        <button type="button" aria-pressed={lang === 'pt'} onClick={() => setLang('pt')}>PT</button>
        <button
          type="button"
          className="theme-toggle"
          aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
          onClick={toggleTheme}
        >
          <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        </button>
      </div>
    </div>
  )
}
