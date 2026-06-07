import { Sun, Moon } from 'lucide-react'

type Props = {
  theme: 'dark' | 'light'
  toggle: () => void
}

export function ThemeToggle({ theme, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--blue)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
