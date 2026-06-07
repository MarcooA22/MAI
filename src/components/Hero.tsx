import { motion } from 'framer-motion'
import { AnimatedHeroSystem } from './AnimatedHeroSystem'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'
import { scrollTo } from '../lib/utils'

type Props = { lang: Lang }

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero({ lang }: Props) {
  return (
    <section
      id="inicio"
      className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 flex items-center"
      style={{ minHeight: 'calc(100vh - 76px)', paddingTop: '64px', paddingBottom: '64px' }}
    >
      <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(47,128,255,0.12)',
                border: '1px solid rgba(47,128,255,0.25)',
                color: '#2F80FF',
              }}
            >
              {t.hero.badge[lang]}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl font-extrabold leading-tight"
            style={{ color: 'var(--text)' }}
          >
            {t.hero.title[lang]}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.hero.subtitle[lang]}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('contacto')}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
              style={{
                background: 'linear-gradient(135deg, #2F80FF, #00C2FF, #7C3AED)',
                boxShadow: '0 0 20px rgba(47,128,255,0.30)',
              }}
            >
              {t.hero.ctaPrimary[lang]}
            </button>
            <button
              onClick={() => scrollTo('casos')}
              className="px-6 py-3 rounded-xl text-sm font-semibold border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--blue)] hover:scale-[1.02] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              {t.hero.ctaSecondary[lang]}
            </button>
          </motion.div>

          {/* Microcopy */}
          <motion.p variants={item} className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.hero.microcopy[lang]}
          </motion.p>

          {/* Pills */}
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {t.hero.pills[lang].map(pill => (
              <span
                key={pill}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                {pill}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <AnimatedHeroSystem lang={lang} />
        </motion.div>
      </div>
    </section>
  )
}
