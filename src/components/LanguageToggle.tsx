import type { Lang } from '../data/translations'

type Props = {
  lang: Lang
  toggle: () => void
  small?: boolean
}

export function LanguageToggle({ lang, toggle, small }: Props) {
  return (
    <button
      onClick={toggle}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className={`font-semibold rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--blue)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)] ${small ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'}`}
    >
      {lang === 'es' ? 'ES | EN' : 'EN | ES'}
    </button>
  )
}
