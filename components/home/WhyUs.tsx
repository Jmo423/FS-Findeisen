'use client'

import { motion } from 'framer-motion'
import BrandMarquee from '@/components/shared/BrandMarquee'

function IconBolt() {
  return (
    <svg
      className="h-7 w-7 text-brand-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function IconHome() {
  return (
    <svg
      className="h-7 w-7 text-brand-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2h-4v-8h-6v8H5a2 2 0 0 1-2-2z" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg
      className="h-7 w-7 text-brand-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

const usps = [
  {
    title: 'Moderne Flotte',
    text: 'Vom elektrischen Hyundai Ioniq 5 bis zur BMW R1250R — du lernst auf aktueller Technik, inklusive E-Fahrzeugen.',
    Icon: IconBolt,
    span: 'md:col-span-2',
  },
  {
    title: 'Familienbetrieb',
    text: 'Fahrschule mit Herz und Geschichte: Bei den Findeisens wird Fahrausbildung seit Jahrzehnten gelebt.',
    Icon: IconHome,
    span: '',
  },
  {
    title: 'Zwei Standorte',
    text: 'Hauptsitz in Hormersdorf, Zweigstelle in Zwönitz — kurze Wege für die ganze Region.',
    Icon: IconPin,
    span: 'md:col-span-2 md:col-start-2',
  },
]

/** Reveal-Sektion: asymmetrisches USP-Grid mit gestaffeltem Einfaden + Marken-Marquee */
export default function WhyUs() {
  return (
    <section id="warum" className="px-6 py-28">
      <div className="mx-auto max-w-content">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl font-extrabold tracking-tighter text-brand-950 sm:text-5xl"
          >
            Warum Findeisen?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm text-brand-950/60"
          >
            Drei Gründe, warum Fahrschüler:innen aus der ganzen Region zu uns kommen.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
              className={`glass-card p-8 transition-shadow duration-300 hover:shadow-card-hover ${usp.span}`}
            >
              <usp.Icon />
              <h3 className="mt-4 font-display text-xl font-bold text-brand-950">{usp.title}</h3>
              <p className="mt-3 max-w-[65ch] leading-relaxed text-brand-950/70">{usp.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <BrandMarquee className="mt-24" />
    </section>
  )
}
