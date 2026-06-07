import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, FileText, Table, Calendar, BarChart3 } from 'lucide-react'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'

type Props = { lang: Lang }

const nodes = [
  { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: '#22C55E', angle: -60 },
  { id: 'pdf', icon: FileText, label: 'PDF', color: '#2F80FF', angle: 0 },
  { id: 'excel', icon: Table, label: 'Excel', color: '#22C55E', angle: 60 },
  { id: 'agenda', icon: Calendar, label: 'Agenda', color: '#7C3AED', angle: 120 },
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard', color: '#F97316', angle: 180 },
]

const R = 140

function toXY(angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    x: Math.cos(rad) * R,
    y: Math.sin(rad) * R,
  }
}

export function AnimatedHeroSystem({ lang }: Props) {
  const reduced = useReducedMotion()

  const floatAnim = reduced
    ? {}
    : {
        y: [0, -8, 0],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
      }

  return (
    <div className="relative flex items-center justify-center" style={{ width: 340, height: 340 }}>
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(47,128,255,0.20), transparent 60%)',
        }}
      />

      {/* SVG lines */}
      <svg
        width="340"
        height="340"
        className="absolute inset-0"
        viewBox="-170 -170 340 340"
        aria-hidden="true"
      >
        {nodes.map(node => {
          const { x, y } = toXY(node.angle)
          const pathLen = Math.sqrt(x * x + y * y)
          return (
            <motion.line
              key={node.id}
              x1={0}
              y1={0}
              x2={x}
              y2={y}
              stroke={node.color}
              strokeWidth={1.5}
              strokeOpacity={0.4}
              strokeDasharray={pathLen}
              animate={
                reduced
                  ? {}
                  : {
                      strokeDashoffset: [pathLen, 0, pathLen],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: nodes.indexOf(node) * 0.6,
              }}
            />
          )
        })}
      </svg>

      {/* Central card */}
      <motion.div
        animate={reduced ? {} : floatAnim}
        className="relative z-10 flex flex-col items-center justify-center rounded-2xl px-6 py-5 text-center"
        style={{
          width: 130,
          minHeight: 80,
          background: 'linear-gradient(135deg, rgba(15,23,42,0.90), rgba(11,18,32,0.80))',
          border: '1px solid rgba(47,128,255,0.35)',
          boxShadow: '0 0 32px rgba(47,128,255,0.20)',
        }}
      >
        <span className="text-base font-bold text-white leading-tight">{t.hero.systemCard.title[lang]}</span>
        <span className="text-[10px] font-medium mt-1" style={{ color: '#A1A1AA' }}>
          {t.hero.systemCard.subtitle[lang]}
        </span>
      </motion.div>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const { x, y } = toXY(node.angle)
        const Icon = node.icon
        return (
          <motion.div
            key={node.id}
            animate={
              reduced
                ? {}
                : {
                    y: [0, -5, 0],
                    transition: { duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                  }
            }
            className="absolute flex flex-col items-center gap-1"
            style={{ left: 170 + x - 30, top: 170 + y - 30 }}
            aria-label={node.label}
          >
            <div
              className="w-[60px] h-[60px] rounded-2xl flex flex-col items-center justify-center gap-0.5"
              style={{
                background: 'rgba(15,23,42,0.85)',
                border: `1px solid ${node.color}40`,
                boxShadow: `0 0 12px ${node.color}18`,
              }}
            >
              <Icon size={20} color={node.color} />
              <span className="text-[9px] font-semibold" style={{ color: '#A1A1AA' }}>
                {node.label}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
