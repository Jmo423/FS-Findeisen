'use client'

import { motion } from 'framer-motion'
import { team } from '@/lib/data/team'
import { licenseClasses } from '@/lib/data/licenseClasses'
import { locations } from '@/lib/data/locations'
import AnimatedCounter from '@/components/shared/AnimatedCounter'
import TeamMemberCard from '@/components/shared/TeamMemberCard'
import Button from '@/components/shared/Button'

const stats = [
  { value: team.length, label: 'Teammitglieder' },
  { value: licenseClasses.length, label: 'Führerscheinklassen' },
  { value: locations.length, label: 'Standorte' },
]

/** Reveal-Sektion: Kennzahlen-Counter + kompakter Team-Teaser */
export default function TeamTeaser() {
  return (
    <section id="team" className="px-6 py-28">
      <div className="mx-auto max-w-content">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-extrabold tracking-tighter text-brand-950 sm:text-5xl"
        >
          Ein Team, das dich ans Ziel bringt.
        </motion.h2>

        <div className="mt-14 grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="text-center"
            >
              <AnimatedCounter
                value={stat.value}
                className="font-display text-5xl font-extrabold text-brand-600 sm:text-6xl"
              />
              <p className="mt-2 text-sm font-medium text-brand-950/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.slice(0, 4).map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <TeamMemberCard member={member} />
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
          <Button href="/ueber-uns" variant="secondary">
            Ganzes Team kennenlernen
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
