import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'
import { scrollTo } from '../lib/utils'

type Props = { lang: Lang }

export function MoreThanExamples({ lang }: Props) {
  const nodes = t.moreThan.nodes[lang]

  return (
    <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 pb-16 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[28px] p-10 md:p-8 sm:p-6 grid lg:grid-cols-2 gap-10 items-center"
        style={{
          background: 'linear-gradient(135deg, rgba(47,128,255,0.07), rgba(124,58,237,0.05))',
          border: '1px solid rgba(47,128,255,0.18)',
        }}
      >
        {/* Text */}
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--text)' }}>
            {t.moreThan.title[lang]}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.moreThan.text[lang]}
          </p>
          <button
            onClick={() => scrollTo('contacto')}
            className="self-start flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            style={{
              background: 'linear-gradient(135deg, #2F80FF, #00C2FF, #7C3AED)',
              boxShadow: '0 0 20px rgba(47,128,255,0.25)',
            }}
          >
            {t.moreThan.cta[lang]}
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Visual nodes */}
        <div className="flex items-center justify-center gap-4 flex-wrap sm:flex-col sm:gap-3">
          {nodes.map((node, i) => (
            <div key={node} className="flex items-center gap-3 sm:flex-col sm:gap-2">
              <div
                className="px-5 py-3 rounded-2xl text-sm font-semibold text-center"
                style={{
                  background: i === 1
                    ? 'linear-gradient(135deg, rgba(47,128,255,0.20), rgba(0,194,255,0.15))'
                    : 'var(--surface)',
                  border: i === 1
                    ? '1px solid rgba(47,128,255,0.35)'
                    : '1px solid var(--border)',
                  color: 'var(--text)',
                  minWidth: 120,
                  boxShadow: i === 1 ? '0 0 16px rgba(47,128,255,0.15)' : 'none',
                }}
              >
                {node}
              </div>
              {i < nodes.length - 1 && (
                <ArrowRight
                  size={16}
                  className="sm:rotate-90"
                  style={{ color: 'var(--blue)', flexShrink: 0 }}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
