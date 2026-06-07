import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react'
import { Section } from './Section'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'
import { siteConfig } from '../data/config'

type Props = { lang: Lang }
type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactSection({ lang }: Props) {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', process: '' })
  const [status, setStatus] = useState<Status>('idle')

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setStatus('loading')
    try {
      await fetch(siteConfig.googleScriptEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          source: 'contact',
          name: form.name,
          email: form.email,
          whatsapp: form.phone,
          company: form.company,
          businessType: '',
          process: form.process,
          language: lang,
        }),
      })
      setStatus('success')
      setForm({ name: '', email: '', company: '', phone: '', process: '' })
    } catch {
      setStatus('error')
    }
  }

  const fields = {
    name: t.contact.fields.name[lang],
    email: t.contact.fields.email[lang],
    company: t.contact.fields.company[lang],
    phone: t.contact.fields.phone[lang],
    process: t.contact.fields.process[lang],
  }

  return (
    <Section id="contacto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight" style={{ color: 'var(--text)' }}>
            {t.contact.title[lang]}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.contact.text[lang]}
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="flex justify-center mb-8">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            style={{
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.25)',
              color: '#22C55E',
            }}
          >
            <MessageSquare size={16} />
            {t.contact.whatsapp[lang]}
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Form */}
        <div
          className="rounded-[28px] p-8 sm:p-6"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 size={44} color="#22C55E" />
              <p className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                {t.forms.success[lang]}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="c-name" label={fields.name} value={form.name} onChange={set('name')} required />
                <Field id="c-email" label={fields.email} type="email" value={form.email} onChange={set('email')} required />
                <Field id="c-company" label={fields.company} value={form.company} onChange={set('company')} />
                <Field id="c-phone" label={fields.phone} value={form.phone} onChange={set('phone')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-process" className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {fields.process}
                </label>
                <textarea
                  id="c-process"
                  value={form.process}
                  onChange={set('process')}
                  rows={4}
                  className="rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--blue)] transition resize-none"
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
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                style={{
                  background: 'linear-gradient(135deg, #2F80FF, #00C2FF, #7C3AED)',
                  boxShadow: '0 0 20px rgba(47,128,255,0.25)',
                }}
              >
                {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : null}
                {status === 'loading' ? t.forms.sending[lang] : t.contact.submit[lang]}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </Section>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}

function Field({ id, label, value, onChange, type = 'text', required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--blue)] transition"
        style={{
          background: 'var(--surface-soft)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
      />
    </div>
  )
}
