'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { licenseClasses } from '@/lib/data/licenseClasses'
import Button from '@/components/shared/Button'
import ClassShowcaseArt from '@/components/shared/ClassShowcaseArt'

/** Pin-Szene 2: Klassen-Chips docken beim Scrollen an, Detail-Panel wechselt.
 *  Mobile & reduced motion: Tabs per Klick statt Scroll-Choreografie. */
export default function LicenseClassesShowcase() {
  const reduced = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const pinned = isDesktop && !reduced

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!pinned) return
    const raw = progress * licenseClasses.length
    const index = Math.min(licenseClasses.length - 1, Math.max(0, Math.floor(raw)))
    setActive(index)
  })

  const current = licenseClasses[active]

  const panel = (
    <div className="mt-10 grid max-w-4xl gap-8 lg:mx-auto lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
      <div className="text-center lg:text-left">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.code}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="block font-display text-[7rem] font-extrabold leading-none tracking-tighter text-brand-400 sm:text-[10rem]"
          >
            {current.code}
          </motion.span>
        </AnimatePresence>

        {current.showcaseImage && (
          <AnimatePresence mode="wait">
            <ClassShowcaseArt
              key={current.showcaseImage}
              src={current.showcaseImage}
              sceneProgress={scrollYProgress}
              pinned={pinned}
              totalSlices={licenseClasses.length}
              sliceIndex={active}
              className="mx-auto mt-6 w-full max-w-sm lg:mx-0"
            />
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.code}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card-dark flex flex-col justify-center px-7 py-12 lg:min-h-[420px]"
        >
          <h3 className="font-display text-2xl font-bold text-white">{current.title}</h3>
          <span className="mt-3 inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
            {current.minAge}
          </span>
          <p className="mt-4 leading-relaxed text-white/75">{current.description}</p>
          {current.isHighlight && (
            <p className="mt-4 inline-flex rounded-full bg-brand-400/20 px-4 py-1.5 text-sm font-bold text-brand-300">
              B197 — unser Innovations-Tipp
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )

  const chips = (
    <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
      {licenseClasses.map((licenseClass, i) => (
        <button
          key={licenseClass.code}
          type="button"
          onClick={() => !pinned && setActive(i)}
          aria-current={i === active ? 'true' : undefined}
          className={`focus-ring flex min-h-11 min-w-11 items-center justify-center rounded-full px-4 font-display text-sm font-bold transition-all duration-300 ${
            i === active
              ? 'scale-105 bg-white text-brand-900'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          } ${pinned ? 'cursor-default' : ''}`}
        >
          {licenseClass.code}
        </button>
      ))}
    </div>
  )

  const heading = (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <h2 className="font-display text-3xl font-extrabold tracking-tighter text-white sm:text-5xl">
          Alle Klassen. Ein Zuhause.
        </h2>
        <p className="mt-3 max-w-xl text-white/70">
          Von AM bis T — bei uns machst du jeden Führerschein. Inklusive Klasse B197:
          Ausbildung auf Schaltung und Automatik, Prüfung auf Automatik.
        </p>
      </div>
      <Button href="/fahrerlaubnisklassen" variant="ghost" className="text-white">
        Alle Details
      </Button>
    </div>
  )

  if (!pinned) {
    return (
      <section
        ref={ref}
        id="klassen"
        className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 px-6 py-28"
      >
        <div className="mx-auto max-w-content">
          {heading}
          <div className="mt-10">{chips}</div>
          {panel}
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="klassen" className="relative h-[400vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 px-6">
        <div className="mx-auto w-full max-w-content">
          {heading}
          <div className="mt-10">{chips}</div>
          {panel}
        </div>
      </div>
    </section>
  )
}
