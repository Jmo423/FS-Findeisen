'use client'

import { motion } from 'framer-motion'
import Button from '@/components/shared/Button'

/** Kontrastsektion: Preise auf Anfrage — bewusst ohne erfundene Zahlen */
export default function PricingCta() {
  return (
    <section id="preise" className="bg-brand-950 px-6 py-28 text-white">
      <div className="mx-auto max-w-content lg:pr-[12%]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display text-3xl font-extrabold tracking-tighter sm:text-5xl"
        >
          Faire Preise, ehrlich beraten.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg text-white/70"
        >
          Jede Ausbildung ist anders — deshalb nennen wir dir deinen Preis persönlich statt
          pauschal. Ruf an oder schreib uns, und wir stellen dein Angebot zusammen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/kontakt">Angebot anfragen</Button>
          <Button href="/preise" variant="ghost" className="text-white">
            Mehr zu den Preisen
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
