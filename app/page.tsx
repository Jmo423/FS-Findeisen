'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Hero from '@/components/home/Hero'
import WhyUs from '@/components/home/WhyUs'
import LicenseClassesShowcase from '@/components/home/LicenseClassesShowcase'
import TeamTeaser from '@/components/home/TeamTeaser'
import Reviews from '@/components/home/Reviews'
import PricingCta from '@/components/home/PricingCta'
import FinalCta from '@/components/home/FinalCta'

const sections = [
  { id: 'hero', label: 'Start', theme: 'dark' as const },
  { id: 'warum', label: 'Warum Findeisen', theme: 'light' as const },
  { id: 'klassen', label: 'Führerscheinklassen', theme: 'dark' as const },
  { id: 'team', label: 'Team', theme: 'light' as const },
  { id: 'bewertungen', label: 'Bewertungen', theme: 'light' as const },
  { id: 'preise', label: 'Preise', theme: 'dark' as const },
  { id: 'kontakt', label: 'Kontakt', theme: 'light' as const },
]

export default function HomePage() {
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll()

  // Scroll-gesteuerter Hintergrund-Farbverlauf zwischen den hellen Sektionen
  // (Hero, Klassen-Showcase und Preis-CTA bringen eigene dunkle Flächen mit)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#f4f8fc', '#eaf3fb', '#dcecfc', '#eaf3fb', '#f4f8fc'],
  )

  return (
    <motion.div style={reduced ? undefined : { backgroundColor }} className="bg-[#f4f8fc]">
      <ScrollProgress sections={sections} />
      <Hero />
      <WhyUs />
      <LicenseClassesShowcase />
      <TeamTeaser />
      <Reviews />
      <PricingCta />
      <FinalCta />
    </motion.div>
  )
}
