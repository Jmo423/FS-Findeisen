'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** SSR-sicheres prefers-reduced-motion: liefert beim ersten Render immer false
 *  (wie auf dem Server), damit kein Hydration-Mismatch entsteht — erst nach
 *  dem Mount schaltet der Wert auf die echte Nutzereinstellung um. */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && !!reduced
}
