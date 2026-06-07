import { t } from '../data/translations'
import type { Lang } from '../data/translations'
import { siteConfig } from '../data/config'
import { scrollTo } from '../lib/utils'

type Props = { lang: Lang }

const linkHrefs = ['inicio', 'casos', 'como-funciona', 'contacto']

export function Footer({ lang }: Props) {
  const links = t.footer.links[lang]

  return (
    <footer
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 py-14 md:py-9">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-extrabold gradient-text">MAI</span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t.footer.tagline[lang]}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-2.5">
              {links.map((link, i) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(linkHrefs[i])}
                    className="text-sm text-left hover:text-[var(--text)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)] rounded"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-2.5">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm hover:text-[var(--text)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)] rounded"
              style={{ color: 'var(--text-muted)' }}
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-[var(--text)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)] rounded"
              style={{ color: 'var(--text-muted)' }}
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div
          className="pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.footer.copyright[lang]}
          </p>
        </div>
      </div>
    </footer>
  )
}
