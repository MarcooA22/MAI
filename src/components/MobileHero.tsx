import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Lang } from '../data/translations'
import { scrollTo } from '../lib/utils'
import './MobileHero.css'

type Props = { lang: Lang }

// Copy del hero mobile (ES exacto según marca; EN equivalente).
const copy = {
  title: {
    es: 'Software a medida para operar mejor.',
    en: 'Custom software to operate better.',
  },
  subtitle: {
    es: 'Desarrollamos software, automatizaciones e integraciones adaptadas a cómo opera cada negocio.',
    en: 'We build software, automations and integrations adapted to how each business operates.',
  },
  cta: {
    es: 'Analizá tu caso gratis',
    en: 'Analyze your case for free',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────
// Sistema modular reconfigurable.
// Las MISMAS 7 piezas se reorganizan en distintas arquitecturas para
// comunicar versatilidad / "a medida" sin mostrar ejemplos concretos.
// ─────────────────────────────────────────────────────────────────────────
type ConfigId = 'flow' | 'grid' | 'hub' | 'tree' | 'mesh'
type Pt = { x: number; y: number; s?: number }

const ORDER: ConfigId[] = ['flow', 'grid', 'hub', 'tree', 'mesh']
const TILE_COUNT = 7
const HOLD_MS = 2100

// Posiciones (px desde el centro del stage) de cada pieza por configuración.
const LAYOUTS: Record<ConfigId, Pt[]> = {
  flow: [
    { x: 0, y: -112 },
    { x: 0, y: -37 },
    { x: 0, y: 38 },
    { x: -72, y: -74 },
    { x: 72, y: 0 },
    { x: -72, y: 76 },
    { x: 0, y: 112 },
  ],
  grid: [
    { x: -82, y: -78 },
    { x: 0, y: -78 },
    { x: 82, y: -78 },
    { x: -82, y: 2 },
    { x: 0, y: 2 },
    { x: 82, y: 2 },
    { x: 0, y: 82 },
  ],
  hub: [
    { x: 0, y: 0, s: 1.12 },
    { x: 0, y: -96 },
    { x: 84, y: -46 },
    { x: 84, y: 48 },
    { x: 0, y: 96 },
    { x: -84, y: 48 },
    { x: -84, y: -46 },
  ],
  tree: [
    { x: 0, y: -110 },
    { x: -78, y: -16 },
    { x: 78, y: -16 },
    { x: -116, y: 92 },
    { x: -42, y: 92 },
    { x: 44, y: 92 },
    { x: 116, y: 92 },
  ],
  mesh: [
    { x: -96, y: -72 },
    { x: 78, y: -96 },
    { x: 110, y: 28 },
    { x: 22, y: 104 },
    { x: -102, y: 60 },
    { x: -8, y: -14 },
    { x: 72, y: -24 },
  ],
}

// Conexiones (pares de índices) por configuración.
const LINES: Record<ConfigId, [number, number][]> = {
  flow: [[0, 1], [1, 2], [2, 6], [3, 1], [4, 2], [5, 6]],
  grid: [[0, 1], [1, 2], [1, 4], [3, 4], [4, 5], [4, 6]],
  hub: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
  tree: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]],
  mesh: [[0, 5], [5, 6], [6, 1], [6, 2], [2, 3], [3, 4], [4, 0], [5, 3]],
}

// Pulsos de datos (recorren un conector) por configuración.
const PULSES: Record<ConfigId, [number, number][]> = {
  flow: [[0, 1], [2, 6]],
  grid: [[0, 1], [4, 6]],
  hub: [[0, 1], [0, 4]],
  tree: [[0, 1], [2, 6]],
  mesh: [[0, 5], [6, 2]],
}

// Pieza con glow de "activa" por configuración.
const ACTIVE: Record<ConfigId, number> = { flow: 1, grid: 4, hub: 0, tree: 0, mesh: 5 }

// Palabra abstracta por configuración (refuerza versatilidad sin tecnicismos).
const LABEL: Record<ConfigId, { es: string; en: string }> = {
  flow: { es: 'Flujo', en: 'Flow' },
  grid: { es: 'Estructura', en: 'Structure' },
  hub: { es: 'Centralizado', en: 'Centralized' },
  tree: { es: 'Jerarquía', en: 'Hierarchy' },
  mesh: { es: 'Distribuido', en: 'Distributed' },
}

// Cada pieza muestra un glyph abstracto distinto (un "tipo" de componente),
// sin texto ni apps concretas. La pieza conserva su glyph en todas las formas
// → se lee como "las mismas partes, distintas arquitecturas".
const ACCENT = '#00C2FF'
const STRUCT = 'rgba(255,255,255,0.34)'

function Glyph({ i }: { i: number }) {
  switch (i) {
    case 0: // gráfico de barras
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="13" width="3.6" height="8" rx="1" fill={ACCENT} />
          <rect x="10.2" y="8" width="3.6" height="13" rx="1" fill={ACCENT} opacity="0.8" />
          <rect x="17.4" y="4" width="3.6" height="17" rx="1" fill={ACCENT} opacity="0.6" />
        </svg>
      )
    case 1: // medidor / gauge
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke={STRUCT} strokeWidth="2.2" />
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke={ACCENT}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="37 60"
            transform="rotate(-90 12 12)"
          />
          <circle cx="12" cy="12" r="2.2" fill={ACCENT} />
        </svg>
      )
    case 2: // lista / filas
      return (
        <svg viewBox="0 0 24 24" fill="none">
          {[5, 12, 19].map((y) => (
            <g key={y}>
              <circle cx="5" cy={y} r="1.7" fill={ACCENT} />
              <rect x="9" y={y - 1} width="11" height="2" rx="1" fill={STRUCT} />
            </g>
          ))}
        </svg>
      )
    case 3: // toggle / switch
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="8" width="18" height="8" rx="4" fill={ACCENT} opacity="0.5" />
          <circle cx="16" cy="12" r="3.1" fill="#fff" />
        </svg>
      )
    case 4: // estado / check
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8.5" stroke={ACCENT} strokeWidth="2" />
          <path d="M8 12.2 l2.6 2.6 L16 9" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 5: // campo de entrada
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="8" width="18" height="8" rx="2" stroke={STRUCT} strokeWidth="1.8" />
          <rect x="6" y="10.5" width="2" height="3" rx="1" fill={ACCENT} />
          <rect x="9.5" y="11" width="7" height="2" rx="1" fill={STRUCT} />
        </svg>
      )
    default: // nodo / conector
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <line x1="12" y1="12" x2="5" y2="5" stroke={STRUCT} strokeWidth="1.6" />
          <line x1="12" y1="12" x2="19" y2="6" stroke={STRUCT} strokeWidth="1.6" />
          <line x1="12" y1="12" x2="18" y2="18" stroke={STRUCT} strokeWidth="1.6" />
          <circle cx="5" cy="5" r="1.9" fill={ACCENT} opacity="0.8" />
          <circle cx="19" cy="6" r="1.9" fill={ACCENT} opacity="0.8" />
          <circle cx="18" cy="18" r="1.9" fill={ACCENT} opacity="0.8" />
          <circle cx="12" cy="12" r="3" fill={ACCENT} />
        </svg>
      )
  }
}

function TileInner({ i }: { i: number }) {
  return (
    <div className="mh-tile-inner" style={{ animationDelay: `${(i % 4) * 0.4}s` }}>
      <Glyph i={i} />
    </div>
  )
}

export function MobileHero({ lang }: Props) {
  const reduced = useReducedMotion()
  const [ci, setCi] = useState(0)

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setCi((c) => (c + 1) % ORDER.length), HOLD_MS)
    return () => clearInterval(t)
  }, [reduced])

  // Con reduced motion: composición estática (mesh), sin loop ni pulsos.
  const config: ConfigId = reduced ? 'mesh' : ORDER[ci]
  const pts = LAYOUTS[config]

  return (
    <section id="inicio" className="mobile-hero">
      <div className="mh-content">
        <h1 className="mh-title">{copy.title[lang]}</h1>
        <p className="mh-subtitle">{copy.subtitle[lang]}</p>
        <button className="mh-cta" onClick={() => scrollTo('contacto')}>
          {copy.cta[lang]}
        </button>
      </div>

      <div className="mobile-hero-system" aria-hidden="true">
        <svg className="mh-svg" viewBox="-180 -170 360 340" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="mhLink" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2F80FF" />
              <stop offset="100%" stopColor="#00C2FF" />
            </linearGradient>
          </defs>

          {/* Conectores: se redibujan en cada configuración */}
          <g key={`lines-${config}`}>
            {LINES[config].map(([a, b], k) => (
              <motion.line
                key={`${a}-${b}-${k}`}
                className="mh-link"
                x1={pts[a].x}
                y1={pts[a].y}
                x2={pts[b].x}
                y2={pts[b].y}
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.6, delay: 0.15 + k * 0.05, ease: 'easeOut' }}
              />
            ))}

            {/* Pulsos de datos viajando por los conectores (sistema "vivo") */}
            {!reduced &&
              PULSES[config].map(([a, b], k) => (
                <motion.circle
                  key={`pulse-${a}-${b}-${k}`}
                  className="mh-pulse"
                  r={3.2}
                  initial={{ cx: pts[a].x, cy: pts[a].y, opacity: 0 }}
                  animate={{
                    cx: [pts[a].x, pts[b].x],
                    cy: [pts[a].y, pts[b].y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + k * 0.6,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    ease: 'easeInOut',
                  }}
                />
              ))}
          </g>
        </svg>

        {Array.from({ length: TILE_COUNT }).map((_, i) => {
          const p = pts[i]
          return (
            <motion.div
              key={i}
              className={`mh-tile ${i < 3 ? 'lg' : ''}`}
              data-active={ACTIVE[config] === i}
              animate={{ x: p.x, y: p.y, scale: p.s ?? 1 }}
              transition={{ type: 'spring', stiffness: 130, damping: 18, mass: 0.9, delay: i * 0.045 }}
            >
              <TileInner i={i} />
            </motion.div>
          )
        })}
      </div>

      <div className="mh-state-label" aria-hidden="true">
        <span className="mh-state-pip" />
        <motion.span
          key={config}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {LABEL[config][lang]}
        </motion.span>
      </div>
    </section>
  )
}
