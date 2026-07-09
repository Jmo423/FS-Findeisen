'use client'

import { motion } from 'framer-motion'

/* PLATZHALTER-BEWERTUNGEN — durch echte Kundenstimmen ersetzen,
 * sobald der Betreiber Bewertungen freigibt. Keine realen Zitate! */
const featuredReview = {
  quote:
    'Hier steht künftig eine echte Kundenstimme. Dieser Platzhalter zeigt Layout und Länge eines ausführlichen Zitats, das die Erfahrung mit der Fahrschule beschreibt.',
  author: 'Platzhalter A.',
}

const sideReviews = [
  {
    quote:
      'Auch dieses Zitat ist ein Platzhalter und wird durch eine verifizierte Bewertung ersetzt.',
    author: 'Platzhalter B.',
  },
  {
    quote: 'Dritter Platzhalter — echte Bewertungen folgen, sobald sie vorliegen.',
    author: 'Platzhalter C.',
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

/** Reveal-Sektion: Bewertungen — asymmetrisch (Featured + Seitenspalte),
 *  bewusst als austauschbare Platzhalter markiert */
export default function Reviews() {
  return (
    <section id="bewertungen" className="px-6 py-28">
      <div className="mx-auto max-w-content">
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
          Beispielhafte Darstellung — echte Bewertungen folgen in Kürze.
        </motion.p>

        <div className="mt-14 grid gap-6 md:grid-cols-[1.5fr_1fr]">
          <motion.figure
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card flex h-full flex-col gap-6 p-10"
          >
            <Stars />
            <blockquote className="text-xl leading-relaxed text-brand-950/80">
              „{featuredReview.quote}&ldquo;
            </blockquote>
            <figcaption className="mt-auto text-sm font-semibold text-brand-950/60">
              {featuredReview.author}
            </figcaption>
          </motion.figure>

          <div className="flex flex-col gap-6">
            {sideReviews.map((review, i) => (
              <motion.figure
                key={review.author}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: 0.12 * (i + 1), ease: [0.22, 1, 0.36, 1] }}
                className="glass-card flex flex-1 flex-col gap-4 p-7"
              >
                <Stars />
                <blockquote className="leading-relaxed text-brand-950/75">
                  „{review.quote}&ldquo;
                </blockquote>
                <figcaption className="mt-auto text-sm font-semibold text-brand-950/60">
                  {review.author}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
