'use client'

import { motion } from 'framer-motion'
import { locations, mainLocation } from '@/lib/data/locations'
import LocationCard from '@/components/shared/LocationCard'
import Button from '@/components/shared/Button'

/** Abschluss-Sektion: finaler Call-to-Action mit beiden Standorten */
export default function FinalCta() {
  return (
    <section id="kontakt" className="px-6 py-28">
      <div className="mx-auto max-w-content">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-extrabold tracking-tighter text-brand-950 sm:text-5xl"
        >
          Bereit für die erste Stunde?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 max-w-2xl text-lg text-brand-950/70"
        >
          Melde dich bei uns — telefonisch unter{' '}
          <a
            href={`tel:${mainLocation.phone?.replace(/[^+\d]/g, '')}`}
            className="link-underline font-semibold text-brand-700"
          >
            {mainLocation.phone}
          </a>{' '}
          oder direkt vor Ort.
        </motion.p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {locations.map((location, i) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <LocationCard location={location} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12"
        >
          <Button href="/kontakt">Zur Kontaktseite</Button>
        </motion.div>
      </div>
    </section>
  )
}
