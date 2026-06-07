import { motion } from 'framer-motion'
import {
  BellRing, MessageCircle, Boxes, BarChart3, CalendarCheck, ClipboardList, GitBranch,
  type LucideProps,
} from 'lucide-react'
import type { FC } from 'react'
import { Section, fadeUp, transition } from './Section'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'
import { useCases } from '../data/useCases'
import { scrollTo } from '../lib/utils'

const iconMap: Record<string, FC<LucideProps>> = {
  BellRing, MessageCircle, Boxes, BarChart3, CalendarCheck, ClipboardList, GitBranch,
}

type Props = { lang: Lang }

export function UseCases({ lang }: Props) {
  return (
    <Section id="casos">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
          {t.useCases.title[lang]}
        </h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          {t.useCases.subtitle[lang]}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {useCases.map((uc, i) => {
          const Icon = iconMap[uc.iconName]
          const title = lang === 'es' ? uc.titleEs : uc.titleEn
          const desc = lang === 'es' ? uc.descEs : uc.descEn
          const how = lang === 'es' ? uc.howEs : uc.howEn

          return (
            <motion.div
              key={uc.iconName}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...transition, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-[24px] p-6 flex flex-col gap-4 group cursor-default"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(47,128,255,0.30)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px rgba(47,128,255,0.08)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(47,128,255,0.10)' }}
              >
                <Icon size={20} color="var(--blue)" />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--text)' }}>
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
                {desc}
              </p>

              {/* How */}
              <div
                className="rounded-xl px-3 py-2"
                style={{ background: 'var(--surface-soft)', border: '1px solid var(--border)' }}
              >
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  {how}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollTo('contacto')}
                className="text-xs font-semibold text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)] rounded"
                style={{ color: 'var(--blue)' }}
              >
                {t.useCases.cta[lang]} →
              </button>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
