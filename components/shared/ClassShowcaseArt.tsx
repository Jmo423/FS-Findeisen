'use client'

import { motion, type MotionValue, useTransform } from 'framer-motion'

interface ClassShowcaseArtProps {
  src: string
  className?: string
  /** Gesamtfortschritt der Pin-Szene (0–1) */
  sceneProgress: MotionValue<number>
  /** Ob die Szene gerade gepinnt/scroll-gesteuert ist (Desktop, volle Bewegung) */
  pinned: boolean
  /** Anzahl der Klassen-Slices in der Szene */
  totalSlices: number
  /** Index der aktuell aktiven Klasse */
  sliceIndex: number
}

const ENTER_END = 0.38
const EXIT_START = 0.82
const EXIT_DISTANCE = 220

function localProgressOf(sceneValue: number, totalSlices: number, sliceIndex: number) {
  const raw = sceneValue * totalSlices
  return Math.min(1, Math.max(0, raw - sliceIndex))
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInCubic(t: number) {
  return t * t * t
}

/**
 * Freigestelltes Klassen-Bild: wächst ruhig aus dem Hintergrund heraus (klein,
 * leicht unscharf, transparent → normal groß, scharf, sichtbar), bleibt dann
 * ruhig stehen und gleitet zum Schluss nach links aus dem Bild, bevor die
 * nächste Klasse denselben Ablauf von vorn beginnt. Rein scroll-gebunden, kein
 * Mount-Timing, keine Drehung — bewusst schlicht statt verspielt.
 */
export default function ClassShowcaseArt({
  src,
  className = '',
  sceneProgress,
  pinned,
  totalSlices,
  sliceIndex,
}: ClassShowcaseArtProps) {
  const opacity = useTransform(sceneProgress, (p) => {
    const local = localProgressOf(p, totalSlices, sliceIndex)
    if (local < ENTER_END) return local / ENTER_END
    if (local > EXIT_START) return 1 - (local - EXIT_START) / (1 - EXIT_START)
    return 1
  })

  // Wächst aus der Tiefe heraus: klein (fern) → normal (vorn), dann ruhig stehend
  const scale = useTransform(sceneProgress, (p) => {
    const local = localProgressOf(p, totalSlices, sliceIndex)
    if (local < ENTER_END) return 0.35 + 0.65 * easeOutCubic(local / ENTER_END)
    return 1
  })

  // Kein Einflug von der Seite — wächst mittig aus dem Hintergrund, gleitet erst beim Verlassen nach links
  const x = useTransform(sceneProgress, (p) => {
    const local = localProgressOf(p, totalSlices, sliceIndex)
    if (local > EXIT_START) {
      const t = (local - EXIT_START) / (1 - EXIT_START)
      return -EXIT_DISTANCE * easeInCubic(t)
    }
    return 0
  })

  // Leichte Unschärfe beim Herauswachsen aus dem Hintergrund, sonst scharf
  const blur = useTransform(sceneProgress, (p) => {
    const local = localProgressOf(p, totalSlices, sliceIndex)
    if (local < ENTER_END) return 10 * (1 - easeOutCubic(local / ENTER_END))
    return 0
  })
  const filter = useTransform(blur, (b) => `blur(${b.toFixed(1)}px)`)

  if (!pinned) {
    return (
      <motion.img
        src={src}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.4 }}
        className={className}
      />
    )
  }

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      style={{ opacity, x, scale, filter }}
      className={className}
    />
  )
}
