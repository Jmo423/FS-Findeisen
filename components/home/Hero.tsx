'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/shared/Button'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

const INTRO_KEY = 'ff-intro-seen'
const headlineLines = ['Dein Weg zum', 'Führerschein.']

const heroFacts = [
  { value: '10 Klassen', label: 'Alle Führerscheine von AM bis T — aus einer Hand.' },
  { value: 'B197', label: 'Ausbildung auf Schaltung & Automatik, Prüfung auf Automatik.' },
  { value: '2 Standorte', label: 'Hormersdorf & Zwönitz — kurze Wege im Erzgebirge.' },
]

/** Pin-Szene 1: asymmetrischer Vollbild-Einstieg (Text links, Fakten-Panel rechts)
 *  mit Mask-Reveal-Headline und überspringbarem Intro (einmal pro Sitzung). */
export default function Hero() {
  const reduced = useReducedMotionSafe()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const [showIntro, setShowIntro] = useState(false)
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    // matchMedia direkt statt Hook-Wert: der SSR-sichere Hook liefert im
    // ersten Effekt-Durchlauf noch false, die Media-Query sofort korrekt
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || sessionStorage.getItem(INTRO_KEY)) {
      setIntroDone(true)
      return
    }
    setShowIntro(true)
    const timer = setTimeout(dismissIntro, 2000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function dismissIntro() {
    sessionStorage.setItem(INTRO_KEY, '1')
    setShowIntro(false)
    setIntroDone(true)
  }

  return (
    <section
      ref={ref}
      id="hero"
      className={reduced ? 'relative min-h-[100dvh]' : 'relative h-[200vh]'}
    >
      {/* Intro-Moment — nur beim ersten Besuch pro Sitzung, Klick überspringt */}
      <AnimatePresence>
        {showIntro && (
          <motion.button
            type="button"
            aria-label="Intro überspringen"
            onClick={dismissIntro}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[80] flex cursor-default items-center justify-center bg-brand-950"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
            >
              Fahrschule Findeisen
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-600">
        {/* Dekorative Glow-Fläche */}
        <div
          aria-hidden
          className="absolute -right-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-brand-400/20 blur-3xl"
        />

        <motion.div
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-content gap-14 px-6 text-white lg:grid-cols-[1.25fr_1fr] lg:items-center"
        >
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={introDone ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-brand-300"
            >
              Fahrschule Findeisen · Zwönitz &amp; Hormersdorf
            </motion.p>

            <h1 className="font-display text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl xl:text-7xl">
              {headlineLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={reduced ? false : { y: '110%' }}
                    animate={introDone ? { y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={introDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-6 max-w-xl text-lg text-white/75"
            >
              Dein Familienbetrieb im Erzgebirge — moderne Flotte, alle Klassen von AM bis T
              und ein Team, das dich wirklich ans Ziel bringt.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={introDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="/kontakt">Jetzt anmelden</Button>
              <Button href="#klassen" variant="ghost">
                Klassen ansehen
              </Button>
            </motion.div>
          </div>

          {/* Fakten-Panel — asymmetrisches Gegengewicht zur Headline */}
          <motion.aside
            initial={reduced ? false : { opacity: 0, x: 32 }}
            animate={introDone ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card-dark hidden divide-y divide-white/10 lg:block"
          >
            {heroFacts.map((fact) => (
              <div key={fact.value} className="px-8 py-6">
                <p className="font-display text-2xl font-extrabold">{fact.value}</p>
                <p className="mt-1 text-sm text-white/65">{fact.label}</p>
              </div>
            ))}
          </motion.aside>
        </motion.div>

        {/* Scroll-Hinweis */}
        {!reduced && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 left-6 sm:left-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-10 w-6 rounded-full border-2 border-white/40 p-1.5"
            >
              <div className="mx-auto h-2 w-1 rounded-full bg-white/70" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
