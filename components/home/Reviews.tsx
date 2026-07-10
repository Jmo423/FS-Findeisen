'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Fahrschule+Findeisen/@50.6716961,12.8857751,17z/data=!4m8!3m7!1s0x47a74c8726c33fa5:0x894be29d1a823804!8m2!3d50.6716961!4d12.8883554!9m1!1b1!16s%2Fg%2F1w345my6'

const AUTOPLAY_MS = 6500

interface Review {
  quote: string
  author: string
  meta: string
}

/** Echte Google-Bewertungen unserer Fahrschüler (Stand: Juli 2026) */
const reviews: Review[] = [
  {
    quote: 'Habe meinen A2-Führerschein bestanden. Danke Max, mach weiter so! 👍🏍️',
    author: 'Denis Denke',
    meta: 'vor einem Monat',
  },
  {
    quote:
      'Ein super freundliches Team, von der Theorie bis zur Prüfung war alles perfekt. 👌 Und ein hohes Lob an die liebe Caro, danke für alles 😊',
    author: 'Roxanne Kehm',
    meta: 'vor 8 Monaten',
  },
  {
    quote:
      'Super kompetentes und freundliches Team! Ich kann die Fahrschule nur weiterempfehlen. Ich bin super zufrieden – vielen lieben Dank für alles, Jens.',
    author: 'Wissem Robaa',
    meta: 'vor 2 Jahren',
  },
  {
    quote:
      'Super Fahrschule, kann ich nur empfehlen – vom Büro bis zu den Fahrlehrern alle nett! Danke für eure Geduld, macht weiter so. Viele Grüße, Steffi',
    author: 'Stefanie',
    meta: 'vor 2 Jahren',
  },
  {
    quote:
      'Sehr freundliches Team, die Fahrstunden haben Spaß gemacht und ich wurde gut bis zum Führerschein begleitet!',
    author: 'Deborah Thoma',
    meta: 'vor einem Jahr',
  },
  {
    quote:
      'Kann nur für die Fahrschule Findeisen sprechen: sehr freundliche Fahrlehrer, gemütliches Ambiente, gut erreichbar, sehr flexibel und Top-Preis.',
    author: 'Thomas Fritzsch',
    meta: 'vor 7 Jahren',
  },
  {
    quote:
      'Kann diese Fahrschule nur empfehlen – freundlich, kompetent und unkompliziert bei der Terminvergabe. Empfehlenswert 👍',
    author: 'Ulla Buettner',
    meta: 'vor 6 Jahren',
  },
  {
    quote:
      'Beste Fahrschule in der Umgebung, es ist halt ein sehr familiäres Unternehmen – da gibt es wenig Probleme.',
    author: 'Felix Bretschneider',
    meta: 'vor 4 Jahren',
  },
  {
    quote: 'Beste Fahrschule for ever',
    author: 'Roblox_ Vlogs',
    meta: 'vor 3 Monaten',
  },
  {
    quote: 'Beste Praxis und Theorie, habe alles beim ersten Versuch bestanden 🫡',
    author: 'Feuerfeder _CCK',
    meta: 'vor einem Jahr',
  },
  {
    quote: 'Super nette und kompetente Fahrlehrer. Bin immer sehr zufrieden gewesen!',
    author: 'Danny Seifert',
    meta: 'vor 6 Jahren',
  },
  {
    quote: 'Super freundliches und kompetentes Team. Kann es jedem nur weiterempfehlen.',
    author: 'Tim Kramer',
    meta: 'vor 2 Jahren',
  },
  {
    quote:
      'Rene, das alte wandelnde LKW-Lexikon – nein, im Ernst: die beste Fahrschule jenseits der Milchstraße!',
    author: 'Ulf Jannsen',
    meta: 'vor 3 Jahren',
  },
  {
    quote: 'Ich habe meine BE für echt kleines Geld nachgeholt, sehr zu empfehlen!',
    author: 'Josef George',
    meta: 'vor 6 Jahren',
  },
  {
    quote:
      'Absolute Empfehlung! Das gesamte Team ist freundlich, kompetent und sorgt für einen super schnellen Ablauf. Die Fahrstunden waren verständlich, geduldig und haben mich optimal auf die Prüfung vorbereitet. Vielen Dank für die tolle Unterstützung!',
    author: 'Claudi Lii',
    meta: 'vor 6 Tagen',
  },
  {
    quote:
      'Sehr gute Ausbildung. Habe mich immer super wohl gefühlt, und der Abholungs- und Bringservice zu mir nach Hause hat auch super geklappt. Danke Georg und Tim, macht weiter so :)',
    author: 'Lucy Wicher',
    meta: 'vor 6 Tagen',
  },
  {
    quote:
      'Hervorragende Qualität der Ausbildung und toller Service für die Fahrschüler (Hol- und Bringservice). Der Zeit entsprechend faire Preise und dazu nette Fahrlehrer bzw. Fahrlehrerinnen.',
    author: 'Karsten Windisch',
    meta: 'vor 2 Wochen',
  },
  {
    quote:
      'Vielen Dank für die schnelle und tolle Ausbildung! Super unkompliziert und zuverlässig, wie auch damals beim A1-Führerschein. Großes Lob an Georg, du bist der Beste! 😉',
    author: 'Nick Hofmann',
    meta: 'vor 3 Wochen',
  },
]

function Stars() {
  return (
    <div className="flex gap-1 text-brand-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.26 6.6.7-4.9 4.5 1.35 6.54L12 16.9 6.05 20l1.35-6.54-4.9-4.5 6.6-.7z" />
        </svg>
      ))}
    </div>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'} />
    </svg>
  )
}

const SWIPE_THRESHOLD = 60

/** Auto-Carousel mit echten Google-Bewertungen — Autoplay pausiert bei Hover,
 *  Fokus und während der Nutzer per Swipe/Pfeil-Tasten navigiert. */
export default function Reviews() {
  const reduced = useReducedMotionSafe()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const count = reviews.length

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir)
      setIndex(((next % count) + count) % count)
    },
    [count],
  )

  const next = useCallback(() => goTo(index + 1, 1), [index, goTo])
  const prev = useCallback(() => goTo(index - 1, -1), [index, goTo])

  useEffect(() => {
    if (paused || reduced) return
    const id = setInterval(() => {
      if (document.hidden) return
      setIndex((i) => (i + 1) % count)
      setDirection(1)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, reduced, count])

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    }
  }, [])

  function pauseThenResume() {
    setPaused(true)
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    resumeTimeout.current = setTimeout(() => setPaused(false), 5000)
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      next()
      pauseThenResume()
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      prev()
      pauseThenResume()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      prev()
      pauseThenResume()
    } else if (e.key === 'ArrowRight') {
      next()
      pauseThenResume()
    }
  }

  const review = reviews[index]

  return (
    <section
      id="bewertungen"
      className="px-6 py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-content">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-extrabold tracking-tighter text-brand-950 sm:text-5xl"
            >
              Das sagen unsere Fahrschüler.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-3 text-sm text-brand-950/50"
            >
              Eine Auswahl echter Bewertungen unserer Fahrschüler bei Google.
            </motion.p>
          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
          >
            Alle Bewertungen auf Google ansehen
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Kundenbewertungen"
          tabIndex={0}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={handleKeyDown}
          className="focus-ring mt-14 rounded-card"
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.figure
                key={index}
                custom={direction}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -48 }}
                transition={{ duration: reduced ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag={reduced ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                aria-live={paused ? 'polite' : 'off'}
                className="glass-card flex min-h-[260px] flex-col gap-6 p-10 active:cursor-grabbing sm:p-12"
              >
                <div className="flex items-center justify-between gap-4">
                  <Stars />
                  <span className="text-xs font-medium text-brand-950/40">{review.meta}</span>
                </div>
                <blockquote className="text-xl leading-relaxed text-brand-950/80">
                  „{review.quote}&ldquo;
                </blockquote>
                <figcaption className="mt-auto text-sm font-semibold text-brand-950/60">
                  {review.author}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => {
                prev()
                pauseThenResume()
              }}
              aria-label="Vorherige Bewertung"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 bg-white/70 text-brand-950/70 transition-colors hover:border-brand-400 hover:text-brand-950"
            >
              <ChevronIcon direction="left" />
            </button>

            <div className="flex flex-wrap justify-center gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.author + i}
                  type="button"
                  onClick={() => {
                    goTo(i, i > index ? 1 : -1)
                    pauseThenResume()
                  }}
                  aria-label={`Bewertung von ${r.author} anzeigen`}
                  aria-current={i === index}
                  className={`focus-ring h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-brand-600' : 'w-2 bg-brand-950/20 hover:bg-brand-950/40'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                next()
                pauseThenResume()
              }}
              aria-label="Nächste Bewertung"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 bg-white/70 text-brand-950/70 transition-colors hover:border-brand-400 hover:text-brand-950"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
