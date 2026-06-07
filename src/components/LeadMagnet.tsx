import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Section } from './Section'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'
import { siteConfig } from '../data/config'

type Props = { lang: Lang }

type Status = 'idle' | 'loading' | 'success' | 'error'

export function LeadMagnet({ lang }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    setStatus('loading')
    try {
      await fetch(siteConfig.googleScriptEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          source: 'lead-magnet',
          name,
          email,
          whatsapp: '',
          company: '',
          businessType,
          process: '',
          language: lang,
        }),
      })
      setStatus('success')
      setName('')
      setEmail('')
      setBusinessType('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[28px] p-10 md:p-8 sm:p-6 grid lg:grid-cols-2 gap-10 items-start"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: '0 0 40px rgba(47,128,255,0.06)',
        }}
      >
        {/* Left */}
        <div className="flex flex-col gap-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(47,128,255,0.12)' }}
          >
            <FileDown size={22} color="var(--blue)" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: 'var(--text)' }}>
            {t.leadMagnet.title[lang]}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.leadMagnet.text[lang]}
          </p>
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: 'rgba(47,128,255,0.08)', border: '1px solid rgba(47,128,255,0.18)' }}
          >
            <FileDown size={16} color="var(--blue)" />
            <span className="text-sm font-semibold" style={{ color: 'var(--blue)' }}>
              {t.leadMagnet.resource[lang]}
            </span>
          </div>
        </div>

        {/* Form */}
        <div>
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 size={40} color="#22C55E" />
              <p className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                {t.forms.success[lang]}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lm-name" className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t.leadMagnet.fields.name[lang]}
                </label>
                <input
                  id="lm-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--blue)] transition"
                  style={{
                    background: 'var(--surface-soft)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lm-email" className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t.leadMagnet.fields.email[lang]}
                </label>
                <input
                  id="lm-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--blue)] transition"
                  style={{
                    background: 'var(--surface-soft)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lm-business" className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t.leadMagnet.fields.businessType[lang]}
                </label>
                <input
                  id="lm-business"
                  type="text"
                  value={businessType}
                  onChange={e => setBusinessType(e.target.value)}
                  className="rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--blue)] transition"
                  style={{
                    background: 'var(--surface-soft)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-xs" style={{ color: '#F97316' }}>
                  <AlertCircle size={14} />
                  {t.forms.error[lang]}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                style={{ background: 'linear-gradient(135deg, #2F80FF, #00C2FF, #7C3AED)' }}
              >
                {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : null}
                {status === 'loading' ? t.forms.sending[lang] : t.leadMagnet.button[lang]}
              </button>

              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {t.leadMagnet.microcopy[lang]}
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </Section>
  )
}
