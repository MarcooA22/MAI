import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'
import { scrollTo } from '../lib/utils'

type Props = {
  lang: Lang
  toggleLang: () => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const navLinks = [
  { labelKey: 'home' as const, href: 'inicio' },
  { labelKey: 'howItWorks' as const, href: 'como-funciona' },
  { labelKey: 'diagnosis' as const, href: 'contacto' },
]

export function Navbar({ lang, toggleLang, theme, toggleTheme }: Props) {
  const [open, setOpen] = useState(false)

  const handleNav = (href: string) => {
    scrollTo(href)
    setOpen(false)
  }

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        height: undefined,
        borderBottom: '1px solid var(--border)',
        background: theme === 'dark' ? 'rgba(5,6,10,0.72)' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 flex items-center justify-between h-[68px] lg:h-[76px]">
        {/* Logo */}
        <button
          onClick={() => scrollTo('inicio')}
          aria-label="MAI — Inicio"
          className="text-3xl font-extrabold gradient-text tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)] rounded"
        >
          MAI
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)] rounded"
            >
              {t.nav[link.labelKey][lang]}
            </button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle lang={lang} toggle={toggleLang} />
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            onClick={() => scrollTo('contacto')}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            style={{
              background: 'linear-gradient(135deg, #2F80FF, #00C2FF, #7C3AED)',
              boxShadow: '0 0 16px rgba(47,128,255,0.3)',
            }}
          >
            {t.nav.cta[lang]}
          </button>
        </div>

        {/* Mobile actions */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageToggle lang={lang} toggle={toggleLang} small />
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden w-full border-t border-[var(--border)] py-4 px-5 flex flex-col gap-1"
          style={{
            background: theme === 'dark' ? 'rgba(5,6,10,0.96)' : 'rgba(255,255,255,0.96)',
          }}
        >
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left px-3 py-3 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-soft)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              {t.nav[link.labelKey][lang]}
            </button>
          ))}
          <button
            onClick={() => handleNav('contacto')}
            className="mt-2 mx-3 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center"
            style={{ background: 'linear-gradient(135deg, #2F80FF, #00C2FF, #7C3AED)' }}
          >
            {t.nav.cta[lang]}
          </button>
        </div>
      )}
    </header>
  )
}
