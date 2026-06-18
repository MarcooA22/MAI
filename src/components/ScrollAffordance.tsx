import { motion, useTransform, type MotionValue } from 'framer-motion'
import './ScrollAffordance.css'

type Props = {
  /** Progreso 0..1 del hero scroll-driven. */
  progress: MotionValue<number>
}

function Chevron() {
  return (
    <span className="sa-chevron">
      <svg viewBox="0 0 24 14" fill="none" aria-hidden="true">
        <path
          d="M2 2 L12 11 L22 2"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

/**
 * Chevrons laterales del hero desktop (izquierda + derecha).
 * Ubicados en el tercio superior para no pisar el texto centrado ni el
 * indicador de etapas (centro-derecha) ni el hint inferior.
 *
 * Opacidad atada al scroll:
 *  - fuertes al inicio,
 *  - se atenúan al empezar a scrollear (tramo intro),
 *  - reaparecen en el HOLD (frame 11),
 *  - SIGUEN visibles durante el cierre (frames 12→16) para que no se piense
 *    que la página termina en el logo.
 */
export function ScrollAffordance({ progress }: Props) {
  const sideOpacity = useTransform(
    progress,
    [0, 0.06, 0.18, 0.4, 0.5, 0.78, 1],
    [0.85, 0.85, 0.2, 0.2, 0.7, 0.7, 0.6],
  )

  return (
    <div className="scroll-affordance" aria-hidden="true">
      <motion.div className="sa-group sa-left" style={{ opacity: sideOpacity }}>
        <Chevron />
        <Chevron />
        <Chevron />
      </motion.div>

      <motion.div className="sa-group sa-right" style={{ opacity: sideOpacity }}>
        <Chevron />
        <Chevron />
        <Chevron />
      </motion.div>
    </div>
  )
}
