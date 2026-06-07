import { motion } from 'framer-motion'
import { Search, Lightbulb, Wrench, CheckCircle2 } from 'lucide-react'
import { Section, fadeUp, transition } from './Section'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'

type Props = { lang: Lang }

const stepIcons = [Search, Lightbulb, Wrench, CheckCircle2]
const stepColors = ['#2F80FF', '#7C3AED', '#F97316', '#22C55E']

export function HowWeWork({ lang }: Props) {
  const steps = t.howWeWork.steps[lang]

  return (
    <Section>
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
          {t.howWeWork.title[lang]}
        </h2>
        <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          {t.howWeWork.subtitle[lang]}
        </p>
      </div>

      {/* Timeline desktop: horizontal, mobile: vertical */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 relative">
        {/* Connector line (desktop) */}
        <div
          className="absolute top-[28px] left-[12.5%] right-[12.5%] h-px hidden lg:block"
          style={{ background: 'var(--border)' }}
          aria-hidden="true"
        />

        {steps.map((step, i) => {
          const Icon = stepIcons[i]
          const color = stepColors[i]
          return (
            <motion.div
              key={step.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...transition, delay: i * 0.10 }}
              className="flex flex-row lg:flex-col items-start lg:items-center gap-5 lg:gap-4 px-0 py-4 lg:py-0 lg:px-4 text-left lg:text-center"
            >
              {/* Number + icon */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}35`,
                  }}
                >
                  <Icon size={22} color={color} />
                </div>
                <span
                  className="text-xs font-bold"
                  style={{ color: 'var(--text-muted)' }}
                >
                  0{i + 1}
                </span>
              </div>

              <div className="flex flex-col gap-2 lg:pt-1">
                <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--text)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {step.text}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
