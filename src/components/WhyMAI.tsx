import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Section, fadeUp, transition } from './Section'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'

type Props = { lang: Lang }

const statusColors: Record<string, string> = {
  ordenado: '#22C55E',
  registrado: '#2F80FF',
  pendiente: '#F97316',
  listo: '#22C55E',
  organized: '#22C55E',
  registered: '#2F80FF',
  pending: '#F97316',
  ready: '#22C55E',
}

export function WhyMAI({ lang }: Props) {
  const bullets = t.whyMAI.bullets[lang]
  const dashboard = t.whyMAI.dashboard[lang]

  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        {/* Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={transition}
          className="flex flex-col gap-6"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: 'var(--text)' }}>
            {t.whyMAI.title[lang]}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.whyMAI.text[lang]}
          </p>
          <ul className="flex flex-col gap-3">
            {bullets.map((b, i) => (
              <motion.li
                key={b}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <span
                  className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(47,128,255,0.15)' }}
                >
                  <Check size={11} color="var(--blue)" />
                </span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {b}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Mini dashboard */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...transition, delay: 0.15 }}
          className="rounded-[28px] p-6 flex flex-col gap-3"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 0 32px rgba(47,128,255,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              MAI
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}
            >
              {lang === 'es' ? 'activo' : 'active'}
            </span>
          </div>
          {dashboard.map(item => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background: 'var(--surface-soft)', border: '1px solid var(--border)' }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                {item.label}
              </span>
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{
                  background: `${statusColors[item.status] ?? '#2F80FF'}18`,
                  color: statusColors[item.status] ?? '#2F80FF',
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
