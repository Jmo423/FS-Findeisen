'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { getLenis } from '@/components/layout/SmoothScrollProvider'

export interface SectionLink {
  id: string
  label: string
  /** Hintergrundthema der Sektion — steuert die Punktfarbe (invertiert auf dunkel) */
  theme: 'light' | 'dark'
}

/** Dünne Scroll-Fortschrittsleiste + klickbare Sektions-Punkte (Desktop, rechter Rand).
 *  Farbe kehrt sich je nach Hintergrundthema der aktiven Sektion um, Position bleibt
 *  außerhalb von `max-w-content`, damit nichts mit dem Seiteninhalt kollidiert. */
export default function ScrollProgress({ sections = [] }: { sections?: SectionLink[] }) {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // Aktiv ist die Sektion, die die Bildschirmmitte schneidet
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sections])

  function scrollToSection(id: string) {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(`#${id}`)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  const activeTheme = sections.find((s) => s.id === active)?.theme ?? 'light'
  const isDark = activeTheme === 'dark'

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400"
        style={{ scaleX: scrollYProgress }}
      />

      {sections.length > 0 && (
        <nav
          aria-label="Sektionsnavigation"
          className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 2xl:flex"
        >
          <div
            className={`flex flex-col items-center gap-3 rounded-full border px-2 py-3 backdrop-blur-md transition-colors duration-500 ${
              isDark ? 'border-white/15 bg-white/10' : 'border-brand-950/10 bg-white/60'
            }`}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                title={section.label}
                aria-label={`Zu Abschnitt ${section.label} scrollen`}
                aria-current={active === section.id ? 'true' : undefined}
                onClick={() => scrollToSection(section.id)}
                className="focus-ring group flex h-6 w-6 items-center justify-center rounded-full"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    active === section.id
                      ? isDark
                        ? 'scale-125 bg-white'
                        : 'scale-125 bg-brand-500'
                      : isDark
                        ? 'bg-white/30 group-hover:bg-white/60'
                        : 'bg-brand-900/25 group-hover:bg-brand-600/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </nav>
      )}
    </>
  )
}
