'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { I18N, type Key, type Lang } from '@/lib/i18n'

type LangContext = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: Key) => string
}

const Context = createContext<LangContext | null>(null)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'en' || saved === 'pt') setLangState(saved)
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem('lang', next)
    } catch {}
  }, [])

  const t = useCallback((key: Key) => I18N[lang][key], [lang])

  return <Context.Provider value={{ lang, setLang, t }}>{children}</Context.Provider>
}

export function useLang() {
  const context = useContext(Context)
  if (!context) throw new Error('useLang must be used inside LangProvider')
  return context
}
