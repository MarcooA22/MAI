import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useLaunchPopup } from '../hooks/useLaunchPopup'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'
import { siteConfig } from '../data/config'
import { scrollTo } from '../lib/utils'

type Props = { lang: Lang }
type Status = 'idle' | 'loading' | 'success' | 'error'

export function LaunchPopup({ lang }: Props) {
  const { visible, close } = useLaunchPopup()
  const [form, setForm] = useState({ name: '', email: '', phone: '', process: '' })
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
          source: 'popup',
          name: form.name,
          email: form.email,
          whatsapp: form.phone,
          company: '',
          businessType: '',
          process: form.process,
          language: lang,
        }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const fields = {
    name: t.popup.fields.name[lang],
    email: t.popup.fields.email[lang],
    phone: t.popup.fields.phone[lang],
    process: t.popup.fields.process[lang],
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.popup.title[lang]}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[460px] w-full max-h-[calc(100vh-32px)] overflow-y-auto pointer-events-auto"
          >
            <div
              className="rounded-[28px] p-8 sm:p-6 flex flex-col gap-5 relative"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 0 48px rgba(47,128,255,0.15)',
              }}
            >
              {/* Close */}
              <button
                onClick={close}
                aria-label="Cerrar"
                className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-soft)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
              >
                <X size={16} />
              </button>

              {status === 'success' ? (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <CheckCircle2 size={44} color="#22C55E" />
                  <p className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                    {t.forms.success[lang]}
                  </p>
                  <button
                    onClick={close}
                    className="text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)] rounded"
                    style={{ color: 'var(--blue)' }}
                  >
                    {lang === 'es' ? 'Cerrar' : 'Close'}
                  </button>
                </div>
              ) : (
                <>
                  {/* Info */}
                  <h2 className="text-xl font-extrabold pr-6" style={{ color: 'var(--text)' }}>
                    {t.popup.title[lang]}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {t.popup.text[lang]}
                  </p>
                  <div
                    className="rounded-xl px-4 py-3 text-sm font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, rgba(47,128,255,0.12), rgba(124,58,237,0.10))',
                      border: '1px solid rgba(47,128,255,0.20)',
                      color: 'var(--text)',
                    }}
                  >
                    {t.popup.highlight[lang]}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {t.popup.clarification[lang]}
                  </p>

                  {/* Quick CTAs */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => { close(); scrollTo('contacto') }}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white hover:scale-[1.02] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                      style={{ background: 'linear-gradient(135deg, #2F80FF, #00C2FF, #7C3AED)' }}
                    >
                      {t.popup.ctaPrimary[lang]}
                    </button>
                    <button
                      onClick={() => { close(); scrollTo('casos') }}
                      className="w-full py-2.5 rounded-xl text-sm font-medium border border-[var(--border)] hover:border-[var(--blue)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {t.popup.ctaSecondary[lang]}
                    </button>
                  </div>
                  <p className="text-[10px] text-center" style={{ color: 'var(--text-muted)' }}>
                    {t.popup.microcopy[lang]}
                  </p>

                  {/* Divider */}
                  <div style={{ borderTop: '1px solid var(--border)' }} />

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                    {[
                      { id: 'p-name', label: fields.name, field: 'name' as const, required: true },
                      { id: 'p-email', label: fields.email, field: 'email' as const, type: 'email', required: true },
                      { id: 'p-phone', label: fields.phone, field: 'phone' as const },
                    ].map(f => (
                      <div key={f.id} className="flex flex-col gap-1">
                        <label htmlFor={f.id} className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          type={f.type ?? 'text'}
                          value={form[f.field]}
                          onChange={set(f.field)}
                          required={f.required}
                          className="rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--blue)] transition"
                          style={{
                            background: 'var(--surface-soft)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                          }}
                        />
                      </div>
                    ))}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="p-process" className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                        {fields.process}
                      </label>
                      <textarea
                        id="p-process"
                        value={form.process}
                        onChange={set('process')}
                        rows={3}
                        className="rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--blue)] transition resize-none"
                        style={{
                          background: 'var(--surface-soft)',
                          border: '1px solid var(--border)',
                          color: 'var(--text)',
                        }}
                      />
                    </div>
                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-xs" style={{ color: '#F97316' }}>
                        <AlertCircle size={13} />
                        {t.forms.error[lang]}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white hover:scale-[1.02] transition-all disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                      style={{ background: 'linear-gradient(135deg, #2F80FF, #00C2FF, #7C3AED)' }}
                    >
                      {status === 'loading' ? <Loader2 size={15} className="animate-spin" /> : null}
                      {status === 'loading' ? t.forms.sending[lang] : t.popup.button[lang]}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
