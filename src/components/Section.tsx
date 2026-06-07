import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }

type Props = {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: Props) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={transition}
      className={`section-padding ${className}`}
    >
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  )
}

export { fadeUp, transition }
