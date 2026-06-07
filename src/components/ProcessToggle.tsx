import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'

type Props = { lang: Lang }

export function ProcessToggle({ lang }: Props) {
  const [isAuto, setIsAuto] = useState(false)
  const reduced = useReducedMotion()

  const cards = isAuto ? t.process.automatedCards[lang] : t.process.manualCards[lang]

  return (
    <section id="como-funciona" className="section-padding">
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
            {t.process.title[lang]}
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {t.process.subtitle[lang]}
          </p>
        </div>

        {/* Container card */}
        <div
          className="rounded-[32px] p-10 md:p-6 sm:p-[22px]"
          style={{
            background: 'linear-gradient(180deg, rgba(15,23,42,0.80), rgba(11,18,32,0.60))',
            border: '1px solid var(--border)',
            boxShadow: '0 0 40px rgba(47,128,255,0.06)',
          }}
        >
          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div
              className="flex rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              role="group"
              aria-label="Modo de proceso"
            >
              <button
                onClick={() => setIsAuto(false)}
                aria-pressed={!isAuto}
                className="px-6 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                style={{
                  background: !isAuto ? 'rgba(47,128,255,0.15)' : 'transparent',
                  color: !isAuto ? 'var(--text)' : 'var(--text-muted)',
                  borderRight: '1px solid var(--border)',
                }}
              >
                {t.process.manual[lang]}
              </button>
              <button
                onClick={() => setIsAuto(true)}
                aria-pressed={isAuto}
                className="px-6 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                style={{
                  background: isAuto
                    ? 'linear-gradient(135deg, rgba(47,128,255,0.20), rgba(0,194,255,0.15))'
                    : 'transparent',
                  color: isAuto ? 'var(--text)' : 'var(--text-muted)',
                }}
              >
                {t.process.automated[lang]}
              </button>
            </div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isAuto ? 'auto' : 'manual'}
              initial={reduced ? {} : { opacity: 0.7, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? {} : { opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-3"
            >
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={reduced ? {} : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl p-4 flex flex-col gap-3"
                  style={{
                    background: isAuto
                      ? 'rgba(47,128,255,0.07)'
                      : 'rgba(255,255,255,0.03)',
                    border: isAuto
                      ? '1px solid rgba(47,128,255,0.20)'
                      : '1px dashed rgba(255,255,255,0.10)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="text-xs font-semibold leading-snug flex-1"
                      style={{ color: isAuto ? 'var(--text)' : 'var(--text-muted)' }}
                    >
                      {card.title}
                    </span>
                    {isAuto && (
                      <motion.div
                        initial={reduced ? {} : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.25, delay: i * 0.06 + 0.2 }}
                      >
                        <CheckCircle2 size={16} color="#22C55E" />
                      </motion.div>
                    )}
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full self-start"
                    style={{
                      background: isAuto ? 'rgba(34,197,94,0.15)' : 'rgba(161,161,170,0.12)',
                      color: isAuto ? '#22C55E' : 'var(--text-muted)',
                    }}
                  >
                    {card.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
