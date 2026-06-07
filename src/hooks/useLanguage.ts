import { useState } from 'react'
import type { Lang } from '../data/translations'

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('mai_lang')
    if (stored === 'en') return 'en'
    return 'es'
  })

  const toggle = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es'
    localStorage.setItem('mai_lang', next)
    setLang(next)
  }

  return { lang, toggle }
}
