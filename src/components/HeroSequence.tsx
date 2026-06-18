import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { Lang } from '../data/translations'
import { scrollTo } from '../lib/utils'
import { MobileHero } from './MobileHero'
import { ScrollAffordance } from './ScrollAffordance'

type Props = { lang: Lang }

// ─────────────────────────────────────────────────────────────────────────
// AJUSTES PRINCIPALES (todo lo editable está acá arriba)
// ─────────────────────────────────────────────────────────────────────────
// Frames de cada tramo (números de archivo: frame_XX.png). frame_04 eliminado.
const INTRO_FRAMES = [1, 2, 3, 5, 6, 7, 8, 9, 10] // Tramo A: escritorio → dashboard
const HOLD_FRAME = 11 // Tramo B: dashboard fijo de fondo + overlay
const EXIT_FRAMES = [12, 13, 14, 15, 16] // Tramo C: cierre de marca / logo
const SEQUENCE = [...INTRO_FRAMES, HOLD_FRAME, ...EXIT_FRAMES]
const HOLD_INDEX = INTRO_FRAMES.length // posición del frame fijo dentro de SEQUENCE
const LAST_INDEX = SEQUENCE.length - 1

// Alto total del scroll del hero (más alto = experiencia más lenta).
const HERO_SCROLL_HEIGHT = '500vh'
const HERO_SCROLL_HEIGHT_MOBILE = '320vh'
// Cortes de los tramos sobre el progreso 0..1 del hero.
const INTRO_END = 0.4 // fin del Tramo A
const OVERLAY_END = 0.75 // fin del Tramo B
const EXIT_END = 1.0 // fin del Tramo C
// Porción final del intervalo entre frames donde ocurre el crossfade (0..1).
// Más bajo = el frame se ve "puro" más tiempo y la mezcla es más corta.
const CROSSFADE = 0.35
// Intensidad máxima del blur del fondo durante el overlay (px).
const MAX_BLUR = 6
// Opacidad máxima de la capa oscura para legibilidad del texto.
const MAX_DIM = 0.5
// Color de fondo del lienzo (coherente con el dark mode de MAI).
const CANVAS_BG = '#05060A'

// Posición continua (float) dentro de SEQUENCE según el progreso.
// El crossfade entre frames consecutivos usa la parte decimal.
function frameFloatForProgress(p: number): number {
  let f: number
  if (p <= INTRO_END) {
    f = (p / INTRO_END) * HOLD_INDEX // 0 → frame fijo
  } else if (p <= OVERLAY_END) {
    f = HOLD_INDEX // frame_11 fijo
  } else {
    const t = (p - OVERLAY_END) / (EXIT_END - OVERLAY_END)
    f = HOLD_INDEX + t * (LAST_INDEX - HOLD_INDEX) // frame fijo → último frame
  }
  return Math.min(LAST_INDEX, Math.max(0, f))
}

// Copys del overlay y los indicadores (bilingüe ES/EN).
const copy = {
  title: {
    es: 'Convertimos procesos repetitivos en sistemas inteligentes.',
    en: 'We turn repetitive processes into intelligent systems.',
  },
  subtitle: {
    es: 'Automatización, IA e integraciones para negocios que quieren operar mejor sin sumar más carga manual.',
    en: 'Automation, AI and integrations for businesses that want to operate better without adding more manual workload.',
  },
  ctaPrimary: { es: 'Analicemos tu caso sin costo', en: 'Analyze my case' },
  ctaSecondary: { es: 'Ver ejemplos de solución', en: 'See solution examples' },
  microcopy: {
    es: 'Nos mostrás un proceso. Te decimos si tiene sentido automatizarlo.',
    en: 'You show us a process. We tell you if it makes sense to automate it.',
  },
  hintTitle: { es: '¿Listo para ordenar el caos?', en: 'Ready to turn chaos into order?' },
  hintAction: { es: 'Seguí bajando', en: 'Scroll to continue' },
  steps: {
    es: ['Transformación', 'Sistema', 'MAI'],
    en: ['Transformation', 'System', 'MAI'],
  },
} as const

const frameSrc = (num: number) =>
  `${import.meta.env.BASE_URL}hero-sequence/frame_${String(num).padStart(2, '0')}.png`

// Detecta viewport mobile (para reducir el alto del scroll).
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isMobile
}

// ─────────────────────────────────────────────────────────────────────────
// Overlay de texto + CTAs (reutiliza el mensaje del hero textual anterior)
// ─────────────────────────────────────────────────────────────────────────
function HeroOverlay({ lang }: { lang: Lang }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-6 pointer-events-none">
      <div className="max-w-2xl text-center flex flex-col items-center gap-5 pointer-events-auto">
        <h1
          className="text-3xl sm:text-5xl font-extrabold leading-tight"
          style={{ color: '#FFFFFF', textShadow: '0 2px 30px rgba(0,0,0,0.55)' }}
        >
          {copy.title[lang]}
        </h1>
        <p
          className="text-base sm:text-lg leading-relaxed max-w-xl"
          style={{ color: 'rgba(255,255,255,0.92)', textShadow: '0 2px 20px rgba(0,0,0,0.55)' }}
        >
          {copy.subtitle[lang]}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-1">
          <button
            onClick={() => scrollTo('contacto')}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            style={{
              background: 'linear-gradient(135deg, #2F80FF, #00C2FF, #7C3AED)',
              boxShadow: '0 0 24px rgba(47,128,255,0.45)',
            }}
          >
            {copy.ctaPrimary[lang]}
          </button>
          <button
            onClick={() => scrollTo('como-funciona')}
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#FFFFFF',
              backdropFilter: 'blur(8px)',
            }}
          >
            {copy.ctaSecondary[lang]}
          </button>
        </div>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.78)' }}>
          {copy.microcopy[lang]}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// Versión estática (prefers-reduced-motion): frame_11 + overlay
// ─────────────────────────────────────────────────────────────────────────
function StaticHero({ lang }: { lang: Lang }) {
  return (
    <section id="inicio" className="relative w-full overflow-hidden" style={{ minHeight: '100vh', background: CANVAS_BG }}>
      <img
        src={frameSrc(HOLD_FRAME)}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${MAX_DIM})`, backdropFilter: `blur(${MAX_BLUR}px)` }} />
      <div className="relative" style={{ minHeight: '100vh' }}>
        <HeroOverlay lang={lang} />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// Hero principal: scroll-driven image sequence sobre canvas (con crossfade)
// ─────────────────────────────────────────────────────────────────────────
export function HeroSequence({ lang }: Props) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const targetFloatRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [ready, setReady] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  // Capas controladas por scroll (CSS, sin redibujar canvas).
  const blur = useTransform(
    scrollYProgress,
    [INTRO_END, (INTRO_END + OVERLAY_END) / 2, OVERLAY_END, OVERLAY_END + 0.06],
    [0, MAX_BLUR, MAX_BLUR, 0],
  )
  const blurFilter = useMotionTemplate`blur(${blur}px)`
  const dim = useTransform(
    scrollYProgress,
    [INTRO_END, INTRO_END + 0.06, OVERLAY_END, OVERLAY_END + 0.08],
    [0, MAX_DIM, MAX_DIM, 0],
  )
  const overlayOpacity = useTransform(
    scrollYProgress,
    [INTRO_END + 0.02, INTRO_END + 0.12, OVERLAY_END - 0.05, OVERLAY_END],
    [0, 1, 1, 0],
  )
  const overlayY = useTransform(scrollYProgress, [INTRO_END + 0.02, INTRO_END + 0.12], [24, 0])
  // El hint inferior es la señal de scroll principal: fuerte al inicio, se
  // atenúa al scrollear, vuelve en el HOLD y SIGUE visible durante el cierre
  // (frames 12→16) para que no se piense que la página termina en el logo.
  const hintOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.18, 0.4, 0.5, 0.98, 1],
    [1, 1, 0.35, 0.35, 1, 1, 0.85],
  )

  // Dibuja una imagen cubriendo el canvas (object-fit: cover) con alpha.
  const drawCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement | undefined,
    cw: number,
    ch: number,
    alpha: number,
  ) => {
    if (!img || !img.complete || img.naturalWidth === 0) return
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const dw = img.naturalWidth * scale
    const dh = img.naturalHeight * scale
    ctx.globalAlpha = alpha
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    ctx.globalAlpha = 1
  }

  // Dibuja la posición continua: frame base + crossfade hacia el siguiente.
  const drawAt = (pos: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    if (cw === 0 || ch === 0) return
    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = CANVAS_BG
    ctx.fillRect(0, 0, cw, ch)

    const lo = Math.floor(pos)
    const hi = Math.min(lo + 1, LAST_INDEX)
    const frac = pos - lo

    // El frame base se mantiene puro hasta el último tramo (CROSSFADE) del
    // intervalo; ahí recién aparece y se funde el frame siguiente.
    const start = 1 - CROSSFADE
    let blend = frac <= start ? 0 : (frac - start) / CROSSFADE
    blend = blend * blend * (3 - 2 * blend) // smoothstep para una mezcla más natural

    drawCover(ctx, imagesRef.current[lo], cw, ch, 1)
    if (blend > 0 && hi !== lo) drawCover(ctx, imagesRef.current[hi], cw, ch, blend)
  }

  // Programa el dibujo en el próximo frame de animación (evita sobre-dibujar).
  const scheduleDraw = (pos: number) => {
    targetFloatRef.current = pos
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        drawAt(targetFloatRef.current)
      })
    }
  }

  // Precarga de los frames de la secuencia (no en mobile: usa MobileHero).
  useEffect(() => {
    if (reduced || isMobile) return
    let mounted = true
    let loaded = 0
    const imgs: HTMLImageElement[] = []
    SEQUENCE.forEach((num, i) => {
      const img = new Image()
      img.src = frameSrc(num)
      img.onload = () => {
        loaded++
        if (i === 0 && mounted) drawAt(0)
        if (loaded === SEQUENCE.length && mounted) setReady(true)
      }
      imgs[i] = img
    })
    imagesRef.current = imgs
    return () => {
      mounted = false
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, isMobile])

  // Redibuja según el progreso del scroll.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scheduleDraw(frameFloatForProgress(v))
    setActiveStep(v <= INTRO_END ? 0 : v <= OVERLAY_END ? 1 : 2)
  })

  // Redibuja al cambiar el tamaño de la ventana.
  useEffect(() => {
    if (reduced) return
    const onResize = () => drawAt(targetFloatRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  // Dibuja el frame inicial una vez precargado.
  useEffect(() => {
    if (ready) drawAt(frameFloatForProgress(scrollYProgress.get()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  // Mobile (≤768px): hero propio diseñado desde cero, sin frames del desktop.
  if (isMobile) return <MobileHero lang={lang} />

  if (reduced) return <StaticHero lang={lang} />

  const steps = copy.steps[lang]

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: isMobile ? HERO_SCROLL_HEIGHT_MOBILE : HERO_SCROLL_HEIGHT, background: CANVAS_BG }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: CANVAS_BG }}>
        {/* Lienzo de la secuencia (con blur controlado por scroll) */}
        <motion.div className="absolute inset-0" style={{ filter: blurFilter, willChange: 'filter' }}>
          <canvas ref={canvasRef} className="block w-full h-full" />
        </motion.div>

        {/* Capa oscura para legibilidad */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: '#000', opacity: dim }} />

        {/* Señales de scroll: chevrons laterales (el inferior va en el hint) */}
        <ScrollAffordance progress={scrollYProgress} />

        {/* Overlay de texto + CTAs */}
        <motion.div className="absolute inset-0" style={{ opacity: overlayOpacity, y: overlayY }}>
          <HeroOverlay lang={lang} />
        </motion.div>

        {/* Indicador de scroll inferior (señal principal: cascada de chevrons) */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}>
            {copy.hintAction[lang]}
          </span>
          <div className="flex flex-col items-center" style={{ lineHeight: 0.55 }}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, 7, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
                style={{ color: '#00C2FF', filter: 'drop-shadow(0 0 8px rgba(0,194,255,0.65))' }}
              >
                <ChevronDown size={26} strokeWidth={2.4} />
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Indicador de progreso (3 etapas) */}
        <div className="absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-2 justify-end">
              <span
                className="text-[10px] font-semibold uppercase tracking-wide transition-opacity duration-300"
                style={{ color: 'rgba(255,255,255,0.8)', opacity: activeStep === i ? 1 : 0.35 }}
              >
                {label}
              </span>
              <span
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeStep === i ? 22 : 7,
                  height: 7,
                  background: activeStep === i ? '#2F80FF' : 'rgba(255,255,255,0.3)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
