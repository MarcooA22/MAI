import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  MessageCircle,
  Receipt,
  FileText,
  BellRing,
  Inbox,
  Cog,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  automationCases,
  sectionCopy,
  type AutomationCase,
  type Tone,
  type Bi,
} from '../data/automationCases'
import type { Lang } from '../data/translations'

type Props = { lang: Lang }

// Mapa de íconos para no acoplar los datos a lucide-react.
const icons: Record<string, LucideIcon> = {
  MessageCircle,
  Receipt,
  FileText,
  BellRing,
}

// Paleta de tonos para los chips de estado.
const toneColor: Record<Tone, string> = {
  blue: '#2F80FF',
  green: '#22C55E',
  violet: '#7C3AED',
  orange: '#F97316',
  cyan: '#00C2FF',
  muted: '#94A3B8',
}

const tx = (b: Bi, lang: Lang) => b[lang]

function StatusChip({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  const c = toneColor[tone]
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full self-start whitespace-nowrap"
      style={{ background: `${c}1F`, color: c }}
    >
      {children}
    </span>
  )
}

function StageHeader({ icon: Icon, label, hint, color }: {
  icon: LucideIcon
  label: string
  hint?: string
  color: string
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="flex items-center justify-center rounded-lg"
        style={{ width: 28, height: 28, background: `${color}1F`, color }}
      >
        <Icon size={15} />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text)' }}>
          {label}
        </span>
        {hint && (
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            {hint}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Salida según el tipo de caso ───────────────────────────────────────────
function OutputView({ active, lang, reduced }: {
  active: AutomationCase
  lang: Lang
  reduced: boolean | null
}) {
  const out = active.output
  const stagger = (i: number) =>
    reduced ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, delay: 0.15 + i * 0.07 } }

  if (out.kind === 'cards') {
    return (
      <div className="flex flex-col gap-2">
        {out.items.map((item, i) => (
          <motion.div
            key={i}
            {...stagger(i)}
            className="rounded-xl p-3 flex items-center justify-between gap-2"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <span className="text-xs font-medium flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <CheckCircle2 size={14} color={toneColor.green} />
              {tx(item.label, lang)}
            </span>
            <StatusChip tone="green">{tx(item.status, lang)}</StatusChip>
          </motion.div>
        ))}
      </div>
    )
  }

  if (out.kind === 'table') {
    return (
      <motion.div
        {...(reduced ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, delay: 0.15 } })}
        className="rounded-xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr>
              {out.columns.map((col, i) => (
                <th
                  key={i}
                  className="text-left font-bold uppercase tracking-wide px-2.5 py-2"
                  style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
                >
                  {tx(col, lang)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {out.rows.map((row, ri) => (
              <tr key={ri}>
                {row.cells.map((cell, ci) => {
                  const isLast = ci === row.cells.length - 1
                  return (
                    <td
                      key={ci}
                      className="px-2.5 py-2 align-middle"
                      style={{
                        color: 'var(--text)',
                        borderBottom: ri < out.rows.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      {isLast ? <StatusChip tone={row.tone}>{tx(cell, lang)}</StatusChip> : tx(cell, lang)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    )
  }

  // groups
  return (
    <div className="flex flex-col gap-2.5">
      {out.groups.map((group, gi) => {
        const c = toneColor[group.tone]
        return (
          <motion.div
            key={gi}
            {...(reduced ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, delay: 0.15 + gi * 0.08 } })}
            className="rounded-xl p-3"
            style={{ background: 'var(--surface)', border: `1px solid ${c}33`, borderLeft: `3px solid ${c}` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ background: c }} />
              <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: c }}>
                {tx(group.name, lang)}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {group.items.map((item, ii) => (
                <span key={ii} className="text-xs" style={{ color: 'var(--text)' }}>
                  {tx(item, lang)}
                </span>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function Connector({ vertical }: { vertical?: boolean }) {
  const Icon = vertical ? ArrowDown : ArrowRight
  return (
    <div
      className={`flex items-center justify-center ${vertical ? 'py-1' : 'px-1'}`}
      style={{ color: 'var(--text-muted)' }}
      aria-hidden
    >
      <Icon size={18} className="opacity-50" />
    </div>
  )
}

export function AutomationDemo({ lang }: Props) {
  const [activeId, setActiveId] = useState(automationCases[0].id)
  const reduced = useReducedMotion()
  const active = automationCases.find((c) => c.id === activeId) ?? automationCases[0]
  const accent = active.accent

  return (
    <section id="como-funciona" className="section-padding">
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
            {tx(sectionCopy.title, lang)}
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {tx(sectionCopy.subtitle, lang)}
          </p>
        </div>

        {/* Selector de casos */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
          role="tablist"
          aria-label={tx(sectionCopy.title, lang)}
        >
          {automationCases.map((c) => {
            const Icon = icons[c.iconName] ?? Cog
            const isActive = c.id === activeId
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(c.id)}
                className="text-left rounded-2xl p-4 flex items-start gap-3 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background: isActive ? `${c.accent}14` : 'var(--surface)',
                  border: isActive ? `1px solid ${c.accent}66` : '1px solid var(--border)',
                  boxShadow: isActive ? `0 0 24px ${c.accent}22` : 'none',
                  outlineColor: c.accent,
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
              >
                <span
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{ width: 36, height: 36, background: `${c.accent}1F`, color: c.accent }}
                >
                  <Icon size={18} />
                </span>
                <span
                  className="text-sm font-semibold leading-snug"
                  style={{ color: isActive ? 'var(--text)' : 'var(--text-muted)' }}
                >
                  {tx(c.title, lang)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Visualización del flujo */}
        <div
          className="rounded-[32px] p-6 sm:p-7 lg:p-8"
          style={{
            background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface) 85%, transparent), color-mix(in srgb, var(--bg-soft) 70%, transparent))',
            border: '1px solid var(--border)',
            boxShadow: `0 0 40px ${accent}14`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduced ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Flujo: entrada → procesamiento → salida */}
              <div className="flex flex-col lg:flex-row lg:items-stretch gap-1 lg:gap-2">
                {/* Entrada */}
                <div className="flex-1 min-w-0">
                  <StageHeader
                    icon={Inbox}
                    label={tx(sectionCopy.stages.input, lang)}
                    hint={tx(sectionCopy.inputHint, lang)}
                    color={toneColor.muted}
                  />
                  <div className="flex flex-col gap-2">
                    {active.inputs.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={reduced ? {} : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="rounded-xl p-3 flex items-center justify-between gap-2"
                        style={{
                          background: 'var(--surface)',
                          border: '1px dashed var(--border)',
                        }}
                      >
                        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                          {tx(item.label, lang)}
                        </span>
                        <StatusChip tone="muted">{tx(item.status, lang)}</StatusChip>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Connector vertical />
                <div className="hidden lg:block"><Connector /></div>

                {/* Procesamiento */}
                <div className="flex-1 min-w-0">
                  <StageHeader
                    icon={Cog}
                    label={tx(sectionCopy.stages.processing, lang)}
                    color={accent}
                  />
                  <div className="flex flex-col gap-2">
                    {active.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={reduced ? {} : { opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                        className="rounded-xl p-3 flex items-center gap-2.5"
                        style={{ background: `${accent}0F`, border: `1px solid ${accent}2E` }}
                      >
                        <span
                          className="flex items-center justify-center rounded-full shrink-0 text-[10px] font-bold"
                          style={{ width: 20, height: 20, background: `${accent}26`, color: accent }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>
                          {tx(step, lang)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Connector vertical />
                <div className="hidden lg:block"><Connector /></div>

                {/* Salida */}
                <div className="flex-1 min-w-0">
                  <StageHeader
                    icon={CheckCircle2}
                    label={tx(sectionCopy.stages.output, lang)}
                    hint={tx(sectionCopy.outputHint, lang)}
                    color={toneColor.green}
                  />
                  <OutputView active={active} lang={lang} reduced={reduced} />
                </div>
              </div>

              {/* Problema · Solución · Resultado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-7 pt-7" style={{ borderTop: '1px solid var(--border)' }}>
                {[
                  { icon: AlertTriangle, label: sectionCopy.labels.problem, text: active.problem, color: toneColor.orange },
                  { icon: Lightbulb, label: sectionCopy.labels.solution, text: active.solution, color: accent },
                  { icon: TrendingUp, label: sectionCopy.labels.result, text: active.result, color: toneColor.green },
                ].map((block, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: block.color }}>
                      <block.icon size={14} />
                      {tx(block.label, lang)}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {tx(block.text, lang)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
