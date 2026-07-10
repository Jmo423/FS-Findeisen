'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: Variant
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-card hover:bg-brand-500 focus-visible:outline-brand-400',
  secondary:
    'bg-white text-brand-900 border border-brand-200 shadow-card hover:border-brand-400 focus-visible:outline-brand-400',
  ghost:
    'bg-transparent text-current border border-current/40 hover:bg-white/10 focus-visible:outline-current',
}

/** Button mit magnetischem Hover-Effekt (entfällt bei prefers-reduced-motion) */
export default function Button({
  href,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  children,
}: ButtonProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 120, damping: 26 })
  const y = useSpring(0, { stiffness: 120, damping: 26 })

  function handleMouseMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.1)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.18)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold tracking-wide transition-all duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${className}`

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className={classes}>
          {children}
        </Link>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
          {children}
        </button>
      )}
    </motion.div>
  )
}
